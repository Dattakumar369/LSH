const hibernateLocking = {
  id: 'hibernate-locking',
  title: 'Hibernate Locking Mechanisms',
  description: 'Learn about optimistic and pessimistic locking in Hibernate, and why it\'s crucial for concurrent applications',
  content: `
# Hibernate Locking — Managing Concurrent Access

When multiple users access the same data simultaneously, you need a way to prevent conflicts. This is where **locking** comes in. Hibernate provides powerful locking mechanisms that JDBC doesn't offer out of the box.

---

## Real-Time Scenarios: Why Locking is Critical

### Scenario 1: Movie Ticket Booking (Concurrent Access Problem)

**Daily Life:** When you book movie tickets online, multiple users might try to book the same seat:

**Without Locking:**
1. User A checks seat #5 → Available
2. User B checks seat #5 → Available (same time)
3. User A books seat #5 → Success
4. User B books seat #5 → Success (overwrites A's booking!)
5. **Problem:** Both users think they booked the seat → Double booking!

**With Hibernate Locking:**
1. User A checks seat #5 → Optimistic lock (version = 1)
2. User B checks seat #5 → Optimistic lock (version = 1)
3. User A books seat #5 → Version updated to 2, booking saved
4. User B tries to book → Version mismatch detected → Booking rejected
5. **Result:** Only one booking succeeds → No double booking!

### Scenario 2: E-Commerce Inventory Management

**Daily Life:** When multiple customers buy the last item simultaneously:

**Without Locking:**
1. Customer A adds last iPhone to cart (stock = 1)
2. Customer B adds same iPhone to cart (stock = 1, same time)
3. Customer A checks out → Stock becomes 0
4. Customer B checks out → Stock becomes -1 (negative stock!)
5. **Problem:** Sold more items than available → Inventory error!

**With Hibernate Locking:**
1. Customer A loads product → Optimistic lock (version = 5)
2. Customer B loads product → Optimistic lock (version = 5)
3. Customer A purchases → Stock = 0, version = 6
4. Customer B tries to purchase → Version mismatch → Order rejected
5. **Result:** Only one purchase succeeds → Inventory accurate!

### Scenario 3: Banking Account Balance Update

**Daily Life:** When multiple transactions happen on same account:

**Without Locking:**
1. Transaction A: Load account balance → $1000
2. Transaction B: Load account balance → $1000 (same time)
3. Transaction A: Withdraw $200 → Balance = $800
4. Transaction B: Withdraw $300 → Balance = $700 (overwrites!)
5. **Problem:** Account shows $700, but $500 was actually withdrawn → Money lost!

**With Hibernate Locking:**
1. Transaction A: Load account → Version = 10
2. Transaction B: Load account → Version = 10
3. Transaction A: Withdraw $200 → Balance = $800, Version = 11
4. Transaction B: Tries to withdraw → Version mismatch → Transaction rejected
5. **Result:** Second transaction retries with correct balance → Accurate!

---

## The Problem: Concurrent Access

Imagine this scenario:
1. User A loads a product with price $100
2. User B loads the same product with price $100
3. User A updates price to $90
4. User B updates price to $110
5. **Problem**: User B's update overwrites User A's update (lost update problem)

**Without proper locking:**
- Last write wins (data loss)
- Inconsistent data
- Race conditions
- Lost updates

---

## Why Hibernate Locking is Better Than JDBC

### JDBC Approach (Manual)

With JDBC, you have to manually implement locking:

\`\`\`java
// JDBC - Manual locking (complex and error-prone)
Connection conn = getConnection();
conn.setAutoCommit(false);

// Manual optimistic locking
PreparedStatement stmt = conn.prepareStatement(
    "SELECT id, name, price, version FROM products WHERE id = ? FOR UPDATE"
);
stmt.setLong(1, productId);
ResultSet rs = stmt.executeQuery();

// Check version before update
int currentVersion = rs.getInt("version");
if (currentVersion != expectedVersion) {
    throw new OptimisticLockException("Data was modified");
}

// Update with version check
PreparedStatement updateStmt = conn.prepareStatement(
    "UPDATE products SET name = ?, price = ?, version = version + 1 " +
    "WHERE id = ? AND version = ?"
);
updateStmt.setString(1, newName);
updateStmt.setDouble(2, newPrice);
updateStmt.setLong(3, productId);
updateStmt.setInt(4, expectedVersion);

int rows = updateStmt.executeUpdate();
if (rows == 0) {
    throw new OptimisticLockException("Update failed - version mismatch");
}
\`\`\`

**Problems with JDBC:**
- Manual version checking
- Easy to forget locking
- Error-prone
- Lots of boilerplate code
- No automatic conflict detection

### Hibernate Approach (Automatic)

Hibernate handles locking automatically:

\`\`\`java
// Hibernate - Automatic locking (simple and safe)
@Entity
public class Product {
    @Id
    @GeneratedValue
    private Long id;
    
    private String name;
    private Double price;
    
    @Version  // Automatic optimistic locking
    private Integer version;
}

// Usage - Hibernate handles everything
Product product = session.get(Product.class, 1L);
product.setPrice(90.0);
session.update(product); // Hibernate checks version automatically
\`\`\`

**Benefits:**
- Automatic version checking
- Built-in conflict detection
- Less code
- Type-safe
- Database-independent

---

## Types of Locking in Hibernate

Hibernate supports two main locking strategies:

1. **Optimistic Locking** - Assume conflicts are rare
2. **Pessimistic Locking** - Assume conflicts are common

---

## 1. Optimistic Locking

**Concept**: Assume that conflicts between transactions are rare. Check for conflicts only when committing.

### How It Works

1. Load entity with version number
2. Make changes
3. On update, check if version matches
4. If version matches → update succeeds, version increments
5. If version doesn't match → throw exception (someone else modified it)

### Implementation with @Version

\`\`\`java
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private Double price;
    
    @Version  // Enables optimistic locking
    private Integer version;
    
    // Constructors, getters, setters
}
\`\`\`

### How Hibernate Uses Version

**On Load:**
\`\`\`sql
SELECT id, name, price, version FROM products WHERE id = 1
-- Returns: id=1, name="Laptop", price=1000, version=5
\`\`\`

**On Update:**
\`\`\`sql
UPDATE products 
SET name = 'Updated Laptop', price = 950, version = version + 1 
WHERE id = 1 AND version = 5
-- If version is still 5, update succeeds
-- If version changed (someone else updated), update fails (0 rows affected)
\`\`\`

### Handling Optimistic Lock Exceptions

\`\`\`java
try {
    Product product = session.get(Product.class, 1L);
    product.setPrice(90.0);
    session.update(product);
    tx.commit();
} catch (OptimisticLockException e) {
    // Someone else modified the product
    System.out.println("Update failed - product was modified by another user");
    // Reload and retry, or show error to user
}
\`\`\`

### Benefits of Optimistic Locking

**Better Performance** - No database locks held
**Scalability** - Multiple users can read simultaneously
**No Deadlocks** - No locks to cause deadlocks
**Automatic** - Hibernate handles it

### When to Use Optimistic Locking

- Read-heavy applications
- Low conflict probability
- Web applications (most common)
- When you want better performance

---

## 2. Pessimistic Locking

**Concept**: Lock the data immediately when reading, preventing others from modifying it.

### How It Works

1. Load entity with lock (SELECT ... FOR UPDATE)
2. Database locks the row
3. Other transactions must wait
4. Make changes
5. Commit releases the lock

### Types of Pessimistic Locks

#### PESSIMISTIC_READ
Shared lock - others can read but not write.

\`\`\`java
Product product = session.get(Product.class, 1L, 
    LockMode.PESSIMISTIC_READ);
\`\`\`

#### PESSIMISTIC_WRITE
Exclusive lock - others cannot read or write.

\`\`\`java
Product product = session.get(Product.class, 1L, 
    LockMode.PESSIMISTIC_WRITE);
\`\`\`

#### PESSIMISTIC_FORCE_INCREMENT
Locks and increments version.

\`\`\`java
Product product = session.get(Product.class, 1L, 
    LockMode.PESSIMISTIC_FORCE_INCREMENT);
\`\`\`

### Using Pessimistic Locking

\`\`\`java
Session session = sessionFactory.openSession();
Transaction tx = session.beginTransaction();

// Lock the entity pessimistically
Product product = session.get(Product.class, 1L, 
    LockMode.PESSIMISTIC_WRITE);

// Now this row is locked in database
// Other transactions must wait
product.setPrice(90.0);
session.update(product);

tx.commit(); // Lock released
session.close();
\`\`\`

### SQL Generated

\`\`\`sql
-- Pessimistic lock query
SELECT * FROM products WHERE id = 1 FOR UPDATE;

-- Other transactions trying to access this row will wait
\`\`\`

### Benefits of Pessimistic Locking

**Prevents Conflicts** - Guarantees no concurrent modifications
**Immediate Protection** - Lock held from read to commit
**Simple Logic** - No exception handling needed

### Drawbacks

**Performance Impact** - Locks held longer
**Deadlock Risk** - Can cause deadlocks
**Scalability** - Limits concurrent access
**Database Dependent** - Behavior varies by database

### When to Use Pessimistic Locking

- High conflict probability
- Critical data (financial transactions)
- When you need guaranteed consistency
- Short transactions

---

## Comparison: Optimistic vs Pessimistic

| Feature | Optimistic | Pessimistic |
|---------|-----------|-------------|
| **Lock Timing** | On commit | On read |
| **Database Locks** | No | Yes |
| **Performance** | Better | Slower |
| **Scalability** | High | Lower |
| **Conflict Handling** | Exception | Blocking |
| **Deadlock Risk** | None | Possible |
| **Best For** | Read-heavy | Write-heavy |

---

## Locking in HQL Queries

You can also use locking in HQL:

\`\`\`java
// Optimistic lock
String hql = "FROM Product WHERE id = :id";
Query<Product> query = session.createQuery(hql, Product.class);
query.setParameter("id", 1L);
query.setLockMode(LockModeType.OPTIMISTIC);
Product product = query.uniqueResult();

// Pessimistic lock
query.setLockMode(LockModeType.PESSIMISTIC_WRITE);
Product product = query.uniqueResult();
\`\`\`

---

## Complete Example: E-Commerce Product Update

### Scenario: Multiple users updating product price

\`\`\`java
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private Double price;
    private Integer stock;
    
    @Version  // Optimistic locking
    private Integer version;
    
    // Constructors, getters, setters
}

// Service class with optimistic locking
public class ProductService {
    private SessionFactory sessionFactory;
    
    public void updateProductPrice(Long productId, Double newPrice) {
        Session session = sessionFactory.openSession();
        Transaction tx = null;
        
        try {
            tx = session.beginTransaction();
            
            // Load product (version is loaded automatically)
            Product product = session.get(Product.class, productId);
            if (product == null) {
                throw new ProductNotFoundException();
            }
            
            // Update price
            product.setPrice(newPrice);
            
            // Hibernate automatically:
            // 1. Checks version matches
            // 2. Updates with version increment
            // 3. Throws exception if version mismatch
            session.update(product);
            
            tx.commit();
            System.out.println("Price updated successfully");
            
        } catch (OptimisticLockException e) {
            if (tx != null) tx.rollback();
            System.out.println("Update failed - product was modified by another user");
            // Reload and show current state to user
            throw new ConcurrentModificationException(
                "Product was modified. Please refresh and try again.");
        } catch (Exception e) {
            if (tx != null) tx.rollback();
            throw e;
        } finally {
            session.close();
        }
    }
    
    // Alternative: Pessimistic locking for critical updates
    public void updateProductPricePessimistic(Long productId, Double newPrice) {
        Session session = sessionFactory.openSession();
        Transaction tx = null;
        
        try {
            tx = session.beginTransaction();
            
            // Lock pessimistically - others must wait
            Product product = session.get(Product.class, productId, 
                LockMode.PESSIMISTIC_WRITE);
            
            if (product == null) {
                throw new ProductNotFoundException();
            }
            
            // Safe to update - row is locked
            product.setPrice(newPrice);
            session.update(product);
            
            tx.commit();
            
        } catch (Exception e) {
            if (tx != null) tx.rollback();
            throw e;
        } finally {
            session.close();
        }
    }
}
\`\`\`

---

## Why Use Hibernate Locking Instead of JDBC?

### 1. **Automatic Version Management**
- Hibernate: Just add @Version annotation
- JDBC: Manual version column management

### 2. **Exception Handling**
- Hibernate: Automatic OptimisticLockException
- JDBC: Manual checking and exception throwing

### 3. **Database Independence**
- Hibernate: Works with any database
- JDBC: Database-specific locking syntax

### 4. **Type Safety**
- Hibernate: Compile-time checking
- JDBC: Runtime SQL errors

### 5. **Less Code**
- Hibernate: Minimal code needed
- JDBC: Lots of boilerplate

### 6. **Built-in Support**
- Hibernate: Optimistic and pessimistic built-in
- JDBC: Must implement everything manually

---

## Best Practices

### 1. Use Optimistic Locking by Default
Most applications benefit from optimistic locking.

### 2. Add @Version to Critical Entities
\`\`\`java
@Entity
public class Order {
    @Version
    private Integer version; // Prevents lost updates
}
\`\`\`

### 3. Handle OptimisticLockException Gracefully
\`\`\`java
try {
    // Update operation
} catch (OptimisticLockException e) {
    // Reload entity and show current state
    // Let user decide to retry or cancel
}
\`\`\`

### 4. Use Pessimistic Locking Sparingly
Only for critical operations with high conflict probability.

### 5. Keep Transactions Short
Long transactions hold locks longer, reducing concurrency.

---

## Summary

Hibernate locking provides:
- **Optimistic Locking** - @Version annotation, automatic conflict detection
- **Pessimistic Locking** - LockMode, database-level locks
- **Automatic Handling** - Less code than JDBC
- **Database Independence** - Works with any database
- **Type Safety** - Compile-time checking

**Key Difference from JDBC:**
- **JDBC**: Manual locking, lots of code, error-prone
- **Hibernate**: Automatic locking, minimal code, built-in support

Use optimistic locking for most cases, pessimistic for critical operations!

---

## Practice Question

**Q:** Why is optimistic locking generally preferred over pessimistic locking in web applications?

**Hint:** Think about performance, scalability, and the nature of web applications.

**Answer:** Optimistic locking is preferred because:
1. **Better Performance** - No database locks held, allowing concurrent reads
2. **Higher Scalability** - Multiple users can access data simultaneously
3. **No Deadlocks** - No locks means no deadlock risk
4. **Web App Nature** - Web apps are read-heavy with low conflict probability
5. **User Experience** - Users can read data even when others are updating

Pessimistic locking is better for high-conflict scenarios like financial transactions.
  `,
  code: `// Hibernate Locking Examples
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.LockMode;
import org.hibernate.OptimisticLockException;
import javax.persistence.*;

// Entity with Optimistic Locking
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "product_name")
    private String name;
    
    @Column(name = "price")
    private Double price;
    
    @Column(name = "stock")
    private Integer stock;
    
    @Version  // Enables optimistic locking
    @Column(name = "version")
    private Integer version;
    
    public Product() {}
    
    public Product(String name, Double price, Integer stock) {
        this.name = name;
        this.price = price;
        this.stock = stock;
    }
    
    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    
    public Integer getStock() { return stock; }
    public void setStock(Integer stock) { this.stock = stock; }
    
    public Integer getVersion() { return version; }
    public void setVersion(Integer version) { this.version = version; }
}

// Demonstrating Optimistic Locking
public class OptimisticLockingDemo {
    private SessionFactory sessionFactory;
    
    public void updateProductOptimistic(Long productId, Double newPrice) {
        Session session = sessionFactory.openSession();
        Transaction tx = null;
        
        try {
            tx = session.beginTransaction();
            
            // Load product (version is automatically loaded)
            Product product = session.get(Product.class, productId);
            System.out.println("Current version: " + product.getVersion());
            
            // Update price
            product.setPrice(newPrice);
            
            // Hibernate automatically:
            // 1. Checks version in WHERE clause
            // 2. Increments version on update
            // 3. Throws OptimisticLockException if version mismatch
            session.update(product);
            
            tx.commit();
            System.out.println("Update successful! New version: " + product.getVersion());
            
        } catch (OptimisticLockException e) {
            if (tx != null) tx.rollback();
            System.out.println("Optimistic lock failed - product was modified by another user");
            // Reload and show current state
            Product current = session.get(Product.class, productId);
            System.out.println("Current state - Price: " + current.getPrice() + 
                             ", Version: " + current.getVersion());
        } catch (Exception e) {
            if (tx != null) tx.rollback();
            e.printStackTrace();
        } finally {
            session.close();
        }
    }
}

// Demonstrating Pessimistic Locking
public class PessimisticLockingDemo {
    private SessionFactory sessionFactory;
    
    public void updateProductPessimistic(Long productId, Double newPrice) {
        Session session = sessionFactory.openSession();
        Transaction tx = null;
        
        try {
            tx = session.beginTransaction();
            
            // Lock pessimistically - others must wait
            // SQL: SELECT * FROM products WHERE id = ? FOR UPDATE
            Product product = session.get(Product.class, productId, 
                LockMode.PESSIMISTIC_WRITE);
            
            System.out.println("Product locked - others must wait");
            
            // Safe to update - row is locked in database
            product.setPrice(newPrice);
            session.update(product);
            
            tx.commit(); // Lock released
            System.out.println("Update successful");
            
        } catch (Exception e) {
            if (tx != null) tx.rollback();
            e.printStackTrace();
        } finally {
            session.close();
        }
    }
    
    // Different lock modes
    public void demonstrateLockModes(Long productId) {
        Session session = sessionFactory.openSession();
        Transaction tx = session.beginTransaction();
        
        // PESSIMISTIC_READ - Shared lock
        Product p1 = session.get(Product.class, productId, 
            LockMode.PESSIMISTIC_READ);
        
        // PESSIMISTIC_WRITE - Exclusive lock
        Product p2 = session.get(Product.class, productId, 
            LockMode.PESSIMISTIC_WRITE);
        
        // PESSIMISTIC_FORCE_INCREMENT - Lock and increment version
        Product p3 = session.get(Product.class, productId, 
            LockMode.PESSIMISTIC_FORCE_INCREMENT);
        
        tx.commit();
        session.close();
    }
}

// Comparison: JDBC vs Hibernate
class JDBCLockingExample {
    // JDBC - Manual optimistic locking (complex)
    public void updateProductJDBC(Long productId, Double newPrice, int expectedVersion) {
        Connection conn = getConnection();
        try {
            conn.setAutoCommit(false);
            
            // Check version
            PreparedStatement checkStmt = conn.prepareStatement(
                "SELECT version FROM products WHERE id = ?"
            );
            checkStmt.setLong(1, productId);
            ResultSet rs = checkStmt.executeQuery();
            
            if (rs.next()) {
                int currentVersion = rs.getInt("version");
                if (currentVersion != expectedVersion) {
                    throw new OptimisticLockException("Version mismatch");
                }
            }
            
            // Update with version check
            PreparedStatement updateStmt = conn.prepareStatement(
                "UPDATE products SET price = ?, version = version + 1 " +
                "WHERE id = ? AND version = ?"
            );
            updateStmt.setDouble(1, newPrice);
            updateStmt.setLong(2, productId);
            updateStmt.setInt(3, expectedVersion);
            
            int rows = updateStmt.executeUpdate();
            if (rows == 0) {
                throw new OptimisticLockException("Update failed");
            }
            
            conn.commit();
        } catch (SQLException e) {
            conn.rollback();
            throw new RuntimeException(e);
        }
    }
    
    // Hibernate - Automatic (simple)
    public void updateProductHibernate(Long productId, Double newPrice) {
        Session session = sessionFactory.openSession();
        Transaction tx = session.beginTransaction();
        
        Product product = session.get(Product.class, productId);
        product.setPrice(newPrice);
        session.update(product); // Hibernate handles version check automatically
        
        tx.commit();
        session.close();
    }
}`
};

export default hibernateLocking;

