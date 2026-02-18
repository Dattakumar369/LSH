const hibernateBatchProcessing = {
  id: 'hibernate-batch-processing',
  title: 'Hibernate Batch Processing - Handling Large Data',
  description: 'Learn how to efficiently process thousands of records using Hibernate batch operations',
  content: `
# Hibernate Batch Processing — Handle Thousands of Records Efficiently

When you need to insert, update, or delete thousands of records, doing it one by one is extremely slow. Batch processing allows you to process multiple records in a single database round-trip, dramatically improving performance.

---

## The Problem: Processing Large Data

### Without Batch Processing

\`\`\`java
// Inserting 10,000 records - VERY SLOW!
for (int i = 0; i < 10000; i++) {
    Product product = new Product("Product " + i, 99.99);
    session.save(product); // Each save = 1 database round-trip
}
// Result: 10,000 database round-trips = VERY SLOW!
\`\`\`

**Problems:**
- 10,000 records = 10,000 database round-trips
- Each round-trip has network latency
- Extremely slow (could take minutes)
- High database load

### With Batch Processing

\`\`\`java
// Inserting 10,000 records - FAST!
for (int i = 0; i < 10000; i++) {
    Product product = new Product("Product " + i, 99.99);
    session.save(product);
    
    if (i % 50 == 0) { // Batch size = 50
        session.flush(); // Send batch to database
        session.clear(); // Clear cache
    }
}
// Result: 200 database round-trips (50x faster!)
\`\`\`

**Benefits:**
- 10,000 records = 200 database round-trips (with batch size 50)
- 50x faster!
- Lower database load
- Better memory management

---

## Configuration for Batch Processing

### Enable Batch Processing

\`\`\`xml
<!-- hibernate.cfg.xml -->
<property name="hibernate.jdbc.batch_size">50</property>
<property name="hibernate.order_inserts">true</property>
<property name="hibernate.order_updates">true</property>
<property name="hibernate.jdbc.batch_versioned_data">true</property>
\`\`\`

**Key Properties:**
- **hibernate.jdbc.batch_size** - Number of statements per batch (recommended: 20-50)
- **hibernate.order_inserts** - Order INSERT statements for better batching
- **hibernate.order_updates** - Order UPDATE statements for better batching

---

## Batch Insert

### Basic Batch Insert

\`\`\`java
Session session = sessionFactory.openSession();
Transaction tx = session.beginTransaction();

for (int i = 0; i < 10000; i++) {
    Product product = new Product("Product " + i, 99.99);
    session.save(product);
    
    // Flush and clear every 50 records
    if (i % 50 == 0) {
        session.flush(); // Execute batch
        session.clear(); // Clear session cache
    }
}

tx.commit();
session.close();
\`\`\`

### Real-World Example: Import Products from CSV

\`\`\`java
public void importProductsFromCSV(String csvFile) {
    Session session = sessionFactory.openSession();
    Transaction tx = session.beginTransaction();
    
    int batchSize = 50;
    int count = 0;
    
    try (BufferedReader reader = new BufferedReader(new FileReader(csvFile))) {
        String line;
        while ((line = reader.readLine()) != null) {
            String[] data = line.split(",");
            Product product = new Product(data[0], Double.parseDouble(data[1]));
            session.save(product);
            
            count++;
            if (count % batchSize == 0) {
                session.flush();
                session.clear();
                System.out.println("Processed " + count + " products");
            }
        }
        
        // Flush remaining
        session.flush();
        session.clear();
        
        tx.commit();
        System.out.println("Total products imported: " + count);
    } catch (Exception e) {
        tx.rollback();
        throw e;
    } finally {
        session.close();
    }
}
\`\`\`

---

## Batch Update

### Batch Update Example

\`\`\`java
public void updateProductPrices(double discountPercent) {
    Session session = sessionFactory.openSession();
    Transaction tx = session.beginTransaction();
    
    // Load products in batches
    String hql = "FROM Product";
    Query<Product> query = session.createQuery(hql, Product.class);
    query.setFirstResult(0);
    query.setMaxResults(1000); // Process 1000 at a time
    
    List<Product> products = query.list();
    int batchSize = 50;
    int count = 0;
    
    for (Product product : products) {
        double newPrice = product.getPrice() * (1 - discountPercent / 100);
        product.setPrice(newPrice);
        session.update(product);
        
        count++;
        if (count % batchSize == 0) {
            session.flush();
            session.clear();
        }
    }
    
    session.flush();
    session.clear();
    tx.commit();
    session.close();
}
\`\`\`

---

## Batch Delete

### Using HQL for Batch Delete (Recommended)

\`\`\`java
// Efficient batch delete using HQL
public void deleteOldOrders(LocalDate beforeDate) {
    Session session = sessionFactory.openSession();
    Transaction tx = session.beginTransaction();
    
    String hql = "DELETE FROM Order WHERE orderDate < :date";
    Query query = session.createQuery(hql);
    query.setParameter("date", beforeDate);
    
    int deletedCount = query.executeUpdate();
    
    tx.commit();
    session.close();
    
    System.out.println("Deleted " + deletedCount + " orders");
}
\`\`\`

### Batch Delete with Entities (Less Efficient)

\`\`\`java
public void deleteProductsInBatches(List<Long> productIds) {
    Session session = sessionFactory.openSession();
    Transaction tx = session.beginTransaction();
    
    int batchSize = 50;
    int count = 0;
    
    for (Long id : productIds) {
        Product product = session.get(Product.class, id);
        if (product != null) {
            session.delete(product);
            
            count++;
            if (count % batchSize == 0) {
                session.flush();
                session.clear();
            }
        }
    }
    
    session.flush();
    session.clear();
    tx.commit();
    session.close();
}
\`\`\`

---

## StatelessSession for Large Batch Operations

For very large operations, use **StatelessSession** (no cache, no dirty checking).

\`\`\`java
public void bulkInsertProducts(List<Product> products) {
    StatelessSession statelessSession = sessionFactory.openStatelessSession();
    Transaction tx = statelessSession.beginTransaction();
    
    int batchSize = 50;
    int count = 0;
    
    for (Product product : products) {
        statelessSession.insert(product);
        
        count++;
        if (count % batchSize == 0) {
            // StatelessSession doesn't need flush/clear
            // But you can commit in batches for better control
        }
    }
    
    tx.commit();
    statelessSession.close();
}
\`\`\`

**StatelessSession Characteristics:**
- No first-level cache
- No dirty checking
- Lower memory usage
- Faster for bulk operations
- No lazy loading
- No automatic relationship handling

---

## Real-World Example: Data Migration

### Migrating Data from Old System

\`\`\`java
public void migrateUsersFromOldSystem(List<OldUser> oldUsers) {
    Session session = sessionFactory.openSession();
    Transaction tx = session.beginTransaction();
    
    int batchSize = 50;
    int successCount = 0;
    int errorCount = 0;
    
    for (OldUser oldUser : oldUsers) {
        try {
            // Convert old user to new user
            User newUser = convertToNewUser(oldUser);
            session.save(newUser);
            
            successCount++;
            if (successCount % batchSize == 0) {
                session.flush();
                session.clear();
                System.out.println("Migrated " + successCount + " users");
            }
        } catch (Exception e) {
            errorCount++;
            System.err.println("Error migrating user: " + oldUser.getId());
            // Continue with next user
        }
    }
    
    // Final flush
    session.flush();
    session.clear();
    
    tx.commit();
    session.close();
    
    System.out.println("Migration complete. Success: " + successCount + 
                      ", Errors: " + errorCount);
}

private User convertToNewUser(OldUser oldUser) {
    User user = new User();
    user.setUsername(oldUser.getUsername());
    user.setEmail(oldUser.getEmail());
    // ... other conversions
    return user;
}
\`\`\`

---

## Performance Comparison

### Without Batching (10,000 records)

\`\`\`java
// 10,000 individual saves
// Time: ~60 seconds
// Database round-trips: 10,000
\`\`\`

### With Batching (batch size 50)

\`\`\`java
// 10,000 records in batches of 50
// Time: ~2 seconds (30x faster!)
// Database round-trips: 200
\`\`\`

### With StatelessSession (10,000 records)

\`\`\`java
// Using StatelessSession
// Time: ~1.5 seconds (40x faster!)
// Memory: Much lower
\`\`\`

---

## Best Practices

### 1. Choose Appropriate Batch Size

\`\`\`java
// Small batch (20-30): Better for memory-constrained environments
// Medium batch (50): Good balance (recommended)
// Large batch (100+): Faster but uses more memory
\`\`\`

### 2. Always Flush and Clear

\`\`\`java
if (count % batchSize == 0) {
    session.flush();  // Execute batch
    session.clear();  // Free memory
}
\`\`\`

### 3. Use HQL for Bulk Operations

\`\`\`java
// Better for bulk updates/deletes
String hql = "UPDATE Product SET price = price * 0.9 WHERE category = :cat";
Query query = session.createQuery(hql);
query.setParameter("cat", "Electronics");
query.executeUpdate();
\`\`\`

### 4. Use StatelessSession for Very Large Operations

\`\`\`java
// When processing millions of records
StatelessSession statelessSession = sessionFactory.openStatelessSession();
\`\`\`

### 5. Handle Errors Gracefully

\`\`\`java
try {
    // Batch operation
} catch (Exception e) {
    tx.rollback();
    // Log error and continue or stop
}
\`\`\`

---

## Complete Example: E-Commerce Inventory Update

\`\`\`java
public class InventoryService {
    private SessionFactory sessionFactory;
    
    // Bulk update inventory from supplier feed
    public void updateInventoryFromFeed(List<InventoryUpdate> updates) {
        Session session = sessionFactory.openSession();
        Transaction tx = session.beginTransaction();
        
        int batchSize = 50;
        int processed = 0;
        int updated = 0;
        int created = 0;
        
        for (InventoryUpdate update : updates) {
            Product product = session.get(Product.class, update.getProductId());
            
            if (product != null) {
                // Update existing
                product.setStock(update.getStock());
                product.setPrice(update.getPrice());
                session.update(product);
                updated++;
            } else {
                // Create new
                product = new Product();
                product.setId(update.getProductId());
                product.setName(update.getName());
                product.setPrice(update.getPrice());
                product.setStock(update.getStock());
                session.save(product);
                created++;
            }
            
            processed++;
            if (processed % batchSize == 0) {
                session.flush();
                session.clear();
                System.out.println("Processed: " + processed + 
                                 ", Updated: " + updated + 
                                 ", Created: " + created);
            }
        }
        
        session.flush();
        session.clear();
        tx.commit();
        session.close();
        
        System.out.println("Inventory update complete. " +
                         "Total: " + processed + 
                         ", Updated: " + updated + 
                         ", Created: " + created);
    }
}
\`\`\`

---

## Summary

Batch processing enables:
- **Faster Operations** - 10-50x performance improvement
- **Lower Database Load** - Fewer round-trips
- **Better Memory Management** - Clear cache regularly
- **Scalability** - Handle millions of records

**Key Techniques:**
- Configure batch size (20-50 recommended)
- Use flush() and clear() regularly
- Use HQL for bulk operations
- Use StatelessSession for very large operations
- Handle errors gracefully

Master batch processing, and you can handle any data volume efficiently!

---

## Practice Question

**Q:** You need to import 100,000 products from a CSV file. What batch size would you use, and how would you structure the code for optimal performance?

**Answer:**
- **Batch Size**: 50 (good balance between performance and memory)
- **Structure**: 
  - Read CSV line by line
  - Create Product objects
  - Save in batches of 50
  - Flush and clear every 50 records
  - Use try-catch for error handling
  - Log progress every 1000 records
- **Expected Performance**: ~5-10 seconds (vs 10+ minutes without batching)
  `,
  code: `// Hibernate Batch Processing Examples
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.StatelessSession;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import javax.persistence.*;
import java.io.BufferedReader;
import java.io.FileReader;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private Double price;
    private Integer stock;
    
    public Product() {}
    
    public Product(String name, Double price) {
        this.name = name;
        this.price = price;
    }
    
    // Getters and setters
}

// Batch Insert Example
public class BatchInsertExample {
    private SessionFactory sessionFactory;
    
    public void insertProductsInBatches(List<Product> products) {
        Session session = sessionFactory.openSession();
        Transaction tx = session.beginTransaction();
        
        int batchSize = 50;
        int count = 0;
        
        for (Product product : products) {
            session.save(product);
            
            count++;
            if (count % batchSize == 0) {
                session.flush(); // Execute batch
                session.clear(); // Clear cache
                System.out.println("Inserted " + count + " products");
            }
        }
        
        // Flush remaining
        session.flush();
        session.clear();
        
        tx.commit();
        session.close();
        
        System.out.println("Total products inserted: " + count);
    }
    
    // Import from CSV
    public void importFromCSV(String csvFile) {
        Session session = sessionFactory.openSession();
        Transaction tx = session.beginTransaction();
        
        int batchSize = 50;
        int count = 0;
        
        try (BufferedReader reader = new BufferedReader(new FileReader(csvFile))) {
            String line;
            reader.readLine(); // Skip header
            
            while ((line = reader.readLine()) != null) {
                String[] data = line.split(",");
                Product product = new Product(data[0], Double.parseDouble(data[1]));
                session.save(product);
                
                count++;
                if (count % batchSize == 0) {
                    session.flush();
                    session.clear();
                }
            }
            
            session.flush();
            session.clear();
            tx.commit();
            
            System.out.println("Imported " + count + " products from CSV");
        } catch (Exception e) {
            tx.rollback();
            throw new RuntimeException("Import failed", e);
        } finally {
            session.close();
        }
    }
}

// Batch Update Example
public class BatchUpdateExample {
    private SessionFactory sessionFactory;
    
    public void updatePricesInBatches(double discountPercent) {
        Session session = sessionFactory.openSession();
        Transaction tx = session.beginTransaction();
        
        // Load products in batches
        int offset = 0;
        int batchSize = 1000;
        int updateBatchSize = 50;
        
        while (true) {
            String hql = "FROM Product";
            Query<Product> query = session.createQuery(hql, Product.class);
            query.setFirstResult(offset);
            query.setMaxResults(batchSize);
            
            List<Product> products = query.list();
            if (products.isEmpty()) break;
            
            int count = 0;
            for (Product product : products) {
                double newPrice = product.getPrice() * (1 - discountPercent / 100);
                product.setPrice(newPrice);
                session.update(product);
                
                count++;
                if (count % updateBatchSize == 0) {
                    session.flush();
                    session.clear();
                }
            }
            
            session.flush();
            session.clear();
            offset += batchSize;
        }
        
        tx.commit();
        session.close();
    }
    
    // Bulk update using HQL (more efficient)
    public void bulkUpdatePrices(String category, double newPrice) {
        Session session = sessionFactory.openSession();
        Transaction tx = session.beginTransaction();
        
        String hql = "UPDATE Product SET price = :price WHERE category = :category";
        Query query = session.createQuery(hql);
        query.setParameter("price", newPrice);
        query.setParameter("category", category);
        
        int updated = query.executeUpdate();
        
        tx.commit();
        session.close();
        
        System.out.println("Updated " + updated + " products");
    }
}

// Batch Delete Example
public class BatchDeleteExample {
    private SessionFactory sessionFactory;
    
    // Efficient bulk delete using HQL
    public void deleteOldOrders(LocalDate beforeDate) {
        Session session = sessionFactory.openSession();
        Transaction tx = session.beginTransaction();
        
        String hql = "DELETE FROM Order WHERE orderDate < :date";
        Query query = session.createQuery(hql);
        query.setParameter("date", beforeDate);
        
        int deleted = query.executeUpdate();
        
        tx.commit();
        session.close();
        
        System.out.println("Deleted " + deleted + " orders");
    }
}

// StatelessSession for Very Large Operations
public class StatelessSessionExample {
    private SessionFactory sessionFactory;
    
    public void bulkInsertWithStatelessSession(List<Product> products) {
        StatelessSession statelessSession = sessionFactory.openStatelessSession();
        Transaction tx = statelessSession.beginTransaction();
        
        int count = 0;
        for (Product product : products) {
            statelessSession.insert(product);
            count++;
            
            if (count % 1000 == 0) {
                System.out.println("Inserted " + count + " products");
            }
        }
        
        tx.commit();
        statelessSession.close();
        
        System.out.println("Total inserted: " + count);
    }
}

// Real-World: Data Migration
public class DataMigrationService {
    private SessionFactory sessionFactory;
    
    public void migrateProducts(List<OldProduct> oldProducts) {
        Session session = sessionFactory.openSession();
        Transaction tx = session.beginTransaction();
        
        int batchSize = 50;
        int success = 0;
        int errors = 0;
        
        for (OldProduct old : oldProducts) {
            try {
                Product newProduct = convert(old);
                session.save(newProduct);
                
                success++;
                if (success % batchSize == 0) {
                    session.flush();
                    session.clear();
                }
            } catch (Exception e) {
                errors++;
                System.err.println("Error migrating product: " + old.getId());
            }
        }
        
        session.flush();
        session.clear();
        tx.commit();
        session.close();
        
        System.out.println("Migration: Success=" + success + ", Errors=" + errors);
    }
    
    private Product convert(OldProduct old) {
        Product product = new Product();
        product.setName(old.getName());
        product.setPrice(old.getPrice());
        return product;
    }
}`
};

export default hibernateBatchProcessing;


