const hibernateCaching = {
  id: 'hibernate-caching',
  title: 'Hibernate Caching - Performance Optimization',
  description: 'Master Hibernate caching strategies: first-level, second-level, and query cache for high-performance applications',
  content: `
# Hibernate Caching — Boost Your Application Performance

Caching is one of Hibernate's most powerful features for improving performance. Understanding caching is crucial for building high-performance applications that can handle thousands of concurrent users.

---

## Why Caching Matters

**Without Caching:**
- Every request hits the database
- Slow response times
- Database becomes a bottleneck
- High database load
- Poor scalability

**With Caching:**
- Data served from memory (100x faster)
- Reduced database load
- Better scalability
- Faster response times
- Lower infrastructure costs

---

## Types of Hibernate Caching

Hibernate provides three levels of caching:

1. **First-Level Cache** (Session Cache) - Automatic, always enabled
2. **Second-Level Cache** (SessionFactory Cache) - Optional, shared across sessions
3. **Query Cache** - Optional, caches query results

---

## 1. First-Level Cache (Session Cache)

### What It Is

Every Session maintains its own cache. This is called the **first-level cache** or **session cache**.

**Characteristics:**
- **Automatic** - No configuration needed
- **Per-Session** - Each session has its own cache
- **Short-Lived** - Exists only during session lifetime
- **No Configuration** - Always enabled

### How It Works

\`\`\`java
Session session = sessionFactory.openSession();

// First call - hits database
User user1 = session.get(User.class, 1L);
// SQL: SELECT * FROM users WHERE id = 1

// Second call - returns from cache (NO database query!)
User user2 = session.get(User.class, 1L);
// No SQL executed - returned from session cache

// Same object instance
System.out.println(user1 == user2); // true

session.close(); // Cache is cleared
\`\`\`

### Real-World Example: E-Commerce Cart

\`\`\`java
// User adds multiple items to cart
// Without caching: Each item lookup hits database
// With first-level cache: Only first lookup hits database

Session session = sessionFactory.openSession();
Transaction tx = session.beginTransaction();

// First product - database query
Product p1 = session.get(Product.class, 101L); // SQL executed

// Same product added again - from cache (no SQL)
Product p2 = session.get(Product.class, 101L); // No SQL!

// Different product - database query
Product p3 = session.get(Product.class, 102L); // SQL executed

// Same product as first - from cache
Product p4 = session.get(Product.class, 101L); // No SQL!

tx.commit();
session.close();
\`\`\`

### Benefits

- **Reduces Database Queries** - Same entity loaded multiple times in one session
- **Maintains Object Identity** - Same object instance returned
- **Automatic** - No configuration needed
- **No Overhead** - Very lightweight

---

## 2. Second-Level Cache (SessionFactory Cache)

### What It Is

Second-level cache is **shared across all sessions** in a SessionFactory. It persists beyond session lifetime.

**Characteristics:**
- **Optional** - Must be configured
- **Shared** - All sessions share the same cache
- **Persistent** - Survives session closure
- **High Performance** - Significantly reduces database load

### When to Use

**Read-Heavy Applications** - Data read more than written
**Reference Data** - Data that rarely changes (categories, countries)
**Expensive Queries** - Complex queries that take time
**High Traffic** - Applications with many concurrent users

### Configuration

#### Step 1: Add Cache Provider Dependency

**Maven:**
\`\`\`xml
<dependency>
    <groupId>org.hibernate</groupId>
    <artifactId>hibernate-ehcache</artifactId>
    <version>5.6.15.Final</version>
</dependency>
\`\`\`

#### Step 2: Configure in hibernate.cfg.xml

\`\`\`xml
<property name="hibernate.cache.use_second_level_cache">true</property>
<property name="hibernate.cache.region.factory_class">
    org.hibernate.cache.ehcache.EhCacheRegionFactory
</property>
<property name="hibernate.cache.use_query_cache">true</property>
\`\`\`

#### Step 3: Enable Caching on Entity

\`\`\`java
@Entity
@Cacheable
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue
    private Long id;
    
    private String name;
    private Double price;
    // ...
}
\`\`\`

### Cache Concurrency Strategies

#### READ_ONLY
For entities that never change.

\`\`\`java
@Cache(usage = CacheConcurrencyStrategy.READ_ONLY)
public class Country {
    // Countries don't change often
}
\`\`\`

#### READ_WRITE
For entities that are read and updated.

\`\`\`java
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Product {
    // Products are read and updated
}
\`\`\`

#### NONSTRICT_READ_WRITE
Allows occasional stale data.

\`\`\`java
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Category {
    // Categories rarely change
}
\`\`\`

#### TRANSACTIONAL
Full transactional support (requires JTA).

\`\`\`java
@Cache(usage = CacheConcurrencyStrategy.TRANSACTIONAL)
public class Order {
    // Critical data requiring transactional cache
}
\`\`\`

### Real-World Example: Product Catalog

\`\`\`java
@Entity
@Cacheable
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue
    private Long id;
    
    private String name;
    private Double price;
    private String description;
    
    // Getters and setters
}

// Usage - Multiple sessions benefit from cache
public class ProductService {
    // Session 1
    public Product getProduct(Long id) {
        Session session1 = sessionFactory.openSession();
        Product p1 = session1.get(Product.class, id); // Database query
        session1.close();
        return p1;
    }
    
    // Session 2 (different session, same SessionFactory)
    public Product getProductAgain(Long id) {
        Session session2 = sessionFactory.openSession();
        // Returns from second-level cache (NO database query!)
        Product p2 = session2.get(Product.class, id);
        session2.close();
        return p2;
    }
}
\`\`\`

### Performance Impact

**Without Second-Level Cache:**
- 1000 requests = 1000 database queries
- Database becomes bottleneck
- Slow response times

**With Second-Level Cache:**
- 1000 requests = 1 database query (first request)
- 999 requests served from cache
- 100x faster response
- Database load reduced by 99%

---

## 3. Query Cache

### What It Is

Query cache stores the **results of queries**, not just entities.

**Use Case:** When the same query is executed multiple times with the same parameters.

### Configuration

\`\`\`xml
<property name="hibernate.cache.use_query_cache">true</property>
\`\`\`

### Usage

\`\`\`java
String hql = "FROM Product WHERE category = :category";
Query<Product> query = session.createQuery(hql, Product.class);
query.setParameter("category", "Electronics");
query.setCacheable(true); // Enable query cache
List<Product> products = query.list(); // First call - database query

// Same query, same parameters - returns from cache
query = session.createQuery(hql, Product.class);
query.setParameter("category", "Electronics");
query.setCacheable(true);
List<Product> cachedProducts = query.list(); // From cache!
\`\`\`

### Real-World Example: Product Search

\`\`\`java
// User searches for "laptop" - database query
List<Product> results1 = searchProducts("laptop"); // SQL executed

// Another user searches for "laptop" - from query cache
List<Product> results2 = searchProducts("laptop"); // No SQL!

public List<Product> searchProducts(String keyword) {
    Session session = sessionFactory.openSession();
    String hql = "FROM Product WHERE name LIKE :keyword";
    Query<Product> query = session.createQuery(hql, Product.class);
    query.setParameter("keyword", "%" + keyword + "%");
    query.setCacheable(true); // Cache this query
    return query.list();
}
\`\`\`

---

## Complete Real-World Example: E-Commerce Application

### Scenario: High-Traffic Product Catalog

\`\`\`java
// Entity with caching enabled
@Entity
@Cacheable
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "product_name")
    private String name;
    
    @Column(name = "price")
    private Double price;
    
    @Column(name = "category")
    private String category;
    
    @Column(name = "stock")
    private Integer stock;
    
    // Getters and setters
}

// Service with caching
public class ProductService {
    private SessionFactory sessionFactory;
    
    // Get product by ID - uses second-level cache
    public Product getProduct(Long id) {
        Session session = sessionFactory.openSession();
        try {
            // First call: Database query
            // Subsequent calls: Second-level cache
            return session.get(Product.class, id);
        } finally {
            session.close();
        }
    }
    
    // Search products - uses query cache
    public List<Product> searchProducts(String category) {
        Session session = sessionFactory.openSession();
        try {
            String hql = "FROM Product WHERE category = :category";
            Query<Product> query = session.createQuery(hql, Product.class);
            query.setParameter("category", category);
            query.setCacheable(true); // Enable query cache
            return query.list();
        } finally {
            session.close();
        }
    }
    
    // Get popular products - uses query cache
    public List<Product> getPopularProducts() {
        Session session = sessionFactory.openSession();
        try {
            String hql = "FROM Product ORDER BY views DESC";
            Query<Product> query = session.createQuery(hql, Product.class);
            query.setMaxResults(10);
            query.setCacheable(true);
            return query.list();
        } finally {
            session.close();
        }
    }
}
\`\`\`

### Performance Comparison

**Without Caching:**
- 10,000 product views = 10,000 database queries
- Average response time: 200ms
- Database CPU: 80%

**With Second-Level Cache:**
- 10,000 product views = 100 database queries (first 100)
- Average response time: 5ms (40x faster!)
- Database CPU: 5%

---

## Cache Eviction and Invalidation

### Manual Cache Eviction

\`\`\`java
// Clear second-level cache for specific entity
SessionFactory sessionFactory = ...;
sessionFactory.getCache().evictEntity(Product.class);

// Clear all second-level cache
sessionFactory.getCache().evictAllRegions();

// Clear query cache
sessionFactory.getCache().evictQueryRegions();
\`\`\`

### Automatic Invalidation

When you update an entity, Hibernate automatically invalidates the cache:

\`\`\`java
Product product = session.get(Product.class, 1L);
product.setPrice(99.99);
session.update(product);
// Cache is automatically invalidated
\`\`\`

---

## Best Practices

### 1. Cache Read-Heavy Data
Cache data that is read frequently but updated rarely.

### 2. Don't Cache Frequently Updated Data
Avoid caching data that changes constantly.

### 3. Use Appropriate Strategy
- **READ_ONLY** for immutable data
- **READ_WRITE** for read-write data
- **NONSTRICT_READ_WRITE** when occasional stale data is acceptable

### 4. Monitor Cache Hit Ratio
Track cache performance:
\`\`\`java
Statistics stats = sessionFactory.getStatistics();
double hitRatio = stats.getSecondLevelCacheHitCount() / 
                  (stats.getSecondLevelCacheHitCount() + 
                   stats.getSecondLevelCacheMissCount());
System.out.println("Cache hit ratio: " + hitRatio);
\`\`\`

### 5. Set Appropriate Cache Size
Configure cache size based on available memory:
\`\`\`xml
<!-- ehcache.xml -->
<cache name="com.example.Product"
       maxElementsInMemory="10000"
       eternal="false"
       timeToLiveSeconds="3600"/>
\`\`\`

---

## Cache Providers Comparison

| Provider | Pros | Cons | Best For |
|----------|------|------|----------|
| **EHCache** | Easy setup, good performance | Limited clustering | Small to medium apps |
| **Infinispan** | Clustering, distributed | Complex setup | Large distributed apps |
| **Hazelcast** | Distributed, fast | Memory intensive | Cloud applications |
| **Redis** | External, scalable | Network latency | Microservices |

---

## Summary

Hibernate caching provides:
- **First-Level Cache** - Automatic, per-session
- **Second-Level Cache** - Shared, configurable, high performance
- **Query Cache** - Caches query results
- **Performance Boost** - 10-100x faster for cached data
- **Scalability** - Reduces database load significantly

**Key Takeaways:**
- Use first-level cache (automatic)
- Enable second-level cache for read-heavy data
- Use query cache for frequently executed queries
- Monitor cache hit ratio
- Choose appropriate cache strategy

Master caching, and your application will handle thousands of concurrent users with ease!

---

## Practice Question

**Q:** In an e-commerce application with 1000 products, you have 10,000 users viewing products per hour. Without caching, this means 10,000 database queries. With second-level cache, how many database queries would you have, and what's the performance improvement?

**Hint:** Think about cache hit ratio and first request vs subsequent requests.

**Answer:**
- **Without cache**: 10,000 database queries
- **With second-level cache**: ~100-200 queries (first requests for each unique product)
- **Cache hit ratio**: ~98-99%
- **Performance improvement**: 50-100x faster response times
- **Database load reduction**: 98-99%
- **Scalability**: Can handle 10x more traffic with same database
  `,
  code: `// Hibernate Caching Examples
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Statistics;
import org.hibernate.query.Query;
import javax.persistence.*;
import java.util.List;

// Entity with Second-Level Cache
@Entity
@Cacheable
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "product_name")
    private String name;
    
    @Column(name = "price")
    private Double price;
    
    @Column(name = "category")
    private String category;
    
    @Column(name = "stock")
    private Integer stock;
    
    public Product() {}
    
    public Product(String name, Double price, String category) {
        this.name = name;
        this.price = price;
        this.category = category;
    }
    
    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
}

// Demonstrating First-Level Cache
public class FirstLevelCacheDemo {
    private SessionFactory sessionFactory;
    
    public void demonstrateFirstLevelCache() {
        Session session = sessionFactory.openSession();
        
        System.out.println("=== First-Level Cache Demo ===");
        
        // First call - database query
        System.out.println("1. First get() call:");
        Product p1 = session.get(Product.class, 1L);
        // SQL: SELECT * FROM products WHERE id = 1
        
        // Second call - from cache (no database query)
        System.out.println("2. Second get() call (same ID):");
        Product p2 = session.get(Product.class, 1L);
        // No SQL executed!
        
        // Same object instance
        System.out.println("Same instance? " + (p1 == p2)); // true
        
        session.close();
    }
}

// Demonstrating Second-Level Cache
public class SecondLevelCacheDemo {
    private SessionFactory sessionFactory;
    
    public void demonstrateSecondLevelCache() {
        System.out.println("=== Second-Level Cache Demo ===");
        
        // Session 1 - First call hits database
        Session session1 = sessionFactory.openSession();
        System.out.println("Session 1 - First get():");
        Product p1 = session1.get(Product.class, 1L);
        // SQL executed
        session1.close();
        
        // Session 2 - Returns from second-level cache
        Session session2 = sessionFactory.openSession();
        System.out.println("Session 2 - get() (different session):");
        Product p2 = session2.get(Product.class, 1L);
        // No SQL! Returned from second-level cache
        session2.close();
        
        // Session 3 - Also from cache
        Session session3 = sessionFactory.openSession();
        System.out.println("Session 3 - get() (another session):");
        Product p3 = session3.get(Product.class, 1L);
        // No SQL! Still from cache
        session3.close();
    }
}

// Demonstrating Query Cache
public class QueryCacheDemo {
    private SessionFactory sessionFactory;
    
    public void demonstrateQueryCache() {
        Session session = sessionFactory.openSession();
        
        System.out.println("=== Query Cache Demo ===");
        
        // First query - hits database
        String hql = "FROM Product WHERE category = :category";
        Query<Product> query1 = session.createQuery(hql, Product.class);
        query1.setParameter("category", "Electronics");
        query1.setCacheable(true); // Enable query cache
        List<Product> products1 = query1.list();
        // SQL executed
        
        // Same query, same parameters - from query cache
        Query<Product> query2 = session.createQuery(hql, Product.class);
        query2.setParameter("category", "Electronics");
        query2.setCacheable(true);
        List<Product> products2 = query2.list();
        // No SQL! Returned from query cache
        
        session.close();
    }
}

// Real-World E-Commerce Service
public class ProductService {
    private SessionFactory sessionFactory;
    
    // Get product - uses second-level cache
    public Product getProduct(Long id) {
        Session session = sessionFactory.openSession();
        try {
            // First call: Database
            // Subsequent calls: Second-level cache
            return session.get(Product.class, id);
        } finally {
            session.close();
        }
    }
    
    // Search products - uses query cache
    public List<Product> searchByCategory(String category) {
        Session session = sessionFactory.openSession();
        try {
            String hql = "FROM Product WHERE category = :category";
            Query<Product> query = session.createQuery(hql, Product.class);
            query.setParameter("category", category);
            query.setCacheable(true); // Cache query results
            return query.list();
        } finally {
            session.close();
        }
    }
    
    // Get popular products - uses query cache
    public List<Product> getPopularProducts(int limit) {
        Session session = sessionFactory.openSession();
        try {
            String hql = "FROM Product ORDER BY views DESC";
            Query<Product> query = session.createQuery(hql, Product.class);
            query.setMaxResults(limit);
            query.setCacheable(true);
            return query.list();
        } finally {
            session.close();
        }
    }
    
    // Monitor cache performance
    public void printCacheStatistics() {
        Statistics stats = sessionFactory.getStatistics();
        
        long secondLevelHitCount = stats.getSecondLevelCacheHitCount();
        long secondLevelMissCount = stats.getSecondLevelCacheMissCount();
        long total = secondLevelHitCount + secondLevelMissCount;
        
        if (total > 0) {
            double hitRatio = (double) secondLevelHitCount / total * 100;
            System.out.println("Second-Level Cache Hit Ratio: " + 
                             String.format("%.2f", hitRatio) + "%");
            System.out.println("Hits: " + secondLevelHitCount);
            System.out.println("Misses: " + secondLevelMissCount);
        }
        
        long queryCacheHitCount = stats.getQueryCacheHitCount();
        long queryCacheMissCount = stats.getQueryCacheMissCount();
        long queryTotal = queryCacheHitCount + queryCacheMissCount;
        
        if (queryTotal > 0) {
            double queryHitRatio = (double) queryCacheHitCount / queryTotal * 100;
            System.out.println("Query Cache Hit Ratio: " + 
                             String.format("%.2f", queryHitRatio) + "%");
        }
    }
    
    // Clear cache manually
    public void clearCache() {
        sessionFactory.getCache().evictAllRegions();
        System.out.println("All caches cleared");
    }
    
    // Clear cache for specific entity
    public void clearProductCache() {
        sessionFactory.getCache().evictEntity(Product.class);
        System.out.println("Product cache cleared");
    }
}`
};

export default hibernateCaching;


