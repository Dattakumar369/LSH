const hibernateIntroduction = {
  id: 'hibernate-introduction',
  title: 'Introduction to Hibernate',
  description: 'Learn what Hibernate is, why it exists, and how it simplifies database operations in Java',
  content: `
# Hibernate — The ORM Framework That Changed Everything

Imagine you're building a Java application. You need to save user data, product information, orders — everything goes to a database. With JDBC, you write a lot of boilerplate code: connections, statements, result sets, mapping data manually. It works, but it's tedious and error-prone.

**Hibernate** changes all that. It's an **ORM (Object-Relational Mapping)** framework that lets you work with databases using Java objects instead of SQL queries.

---

## What is Hibernate?

**Hibernate** is a powerful, open-source ORM framework for Java. It provides a framework for mapping an object-oriented domain model to a relational database.

Think of it this way:
- **Without Hibernate**: You write SQL, map results to objects manually, handle connections
- **With Hibernate**: You work with Java objects, and Hibernate handles the SQL for you

---

## Why Hibernate Exists

### The Problem with JDBC

With JDBC, here's what you do to save a simple object:

\`\`\`java
// JDBC way - lots of boilerplate
String sql = "INSERT INTO users (name, email, age) VALUES (?, ?, ?)";
PreparedStatement stmt = conn.prepareStatement(sql);
stmt.setString(1, user.getName());
stmt.setString(2, user.getEmail());
stmt.setInt(3, user.getAge());
stmt.executeUpdate();
\`\`\`

Now imagine doing this for every object, every table, every operation. It gets repetitive fast.

### The Hibernate Solution

With Hibernate, the same operation becomes:

\`\`\`java
// Hibernate way - simple and clean
session.save(user);
\`\`\`

That's it! Hibernate generates the SQL, handles the connection, and maps the data automatically.

---

## Key Benefits of Hibernate

### 1. **Less Boilerplate Code**
No more writing repetitive JDBC code. Hibernate handles the SQL generation.

### 2. **Database Independence**
Switch from MySQL to PostgreSQL? Just change the configuration. Your code stays the same.

### 3. **Automatic Mapping**
Hibernate automatically maps Java objects to database tables and vice versa.

### 4. **Lazy Loading**
Load related data only when needed, improving performance.

### 5. **Caching**
Built-in caching mechanisms improve application performance.

### 6. **HQL (Hibernate Query Language)**
Object-oriented query language instead of SQL.

---

## How Hibernate Works

Here's the basic architecture:

\`\`\`
Java Application
      ↓
  Hibernate API
      ↓
Hibernate Configuration
      ↓
   JDBC Driver
      ↓
   Database
\`\`\`

**The Flow:**
1. Your Java code uses Hibernate API
2. Hibernate reads configuration (hibernate.cfg.xml or annotations)
3. Hibernate generates SQL based on your objects
4. Uses JDBC to execute SQL
5. Maps results back to Java objects

---

## Core Concepts

### 1. **Session**
The main interface for interacting with Hibernate. Think of it as a connection to the database.

\`\`\`java
Session session = sessionFactory.openSession();
\`\`\`

### 2. **SessionFactory**
Creates Session instances. It's expensive to create, so you typically create one per application.

\`\`\`java
SessionFactory sessionFactory = new Configuration()
    .configure()
    .buildSessionFactory();
\`\`\`

### 3. **Entity**
A Java class that maps to a database table.

\`\`\`java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    // ...
}
\`\`\`

### 4. **Mapping**
Defines how Java objects map to database tables. Can be done via XML or annotations.

---

## Real-Time Scenarios: Where Hibernate is Used in Daily Life

### Scenario 1: E-Commerce Platform (Amazon, Flipkart)

**Daily Life Example:** When you shop online, every action uses Hibernate behind the scenes:

1. **User Registration:**
   - You create an account → Hibernate saves your User object
   - No need to write SQL for INSERT INTO users...

2. **Product Browsing:**
   - You search for "laptop" → Hibernate loads Product objects
   - Filters by price, brand → Hibernate generates optimized SQL

3. **Shopping Cart:**
   - Add items to cart → Hibernate manages Cart and CartItem relationships
   - Update quantity → Hibernate handles the UPDATE automatically

4. **Order Processing:**
   - Place order → Hibernate saves Order, OrderItems, Payment in one transaction
   - Track order → Hibernate loads order with all related data

**Without Hibernate:** Developers write 100+ lines of JDBC code for each operation.
**With Hibernate:** Just \`session.save(order)\` - done!

### Scenario 2: Social Media Platform (Facebook, Instagram)

**Daily Life Example:** Every social media action uses Hibernate:

1. **User Posts:**
   - You post a photo → Hibernate saves Post entity with image URL
   - Post includes user, timestamp, likes, comments → All relationships handled automatically

2. **Friend Requests:**
   - Send friend request → Hibernate manages User-User relationship
   - Accept request → Hibernate updates relationship status

3. **News Feed:**
   - Load feed → Hibernate fetches posts from friends using relationships
   - Lazy loading ensures only needed data is loaded

4. **Comments & Likes:**
   - Comment on post → Hibernate saves Comment with Post relationship
   - Like a post → Hibernate updates like count efficiently

### Scenario 3: Banking Application

**Daily Life Example:** Banking operations require Hibernate for data integrity:

1. **Account Creation:**
   - Open bank account → Hibernate saves Account entity
   - Link to User → Relationship handled automatically

2. **Money Transfer:**
   - Transfer $100 → Hibernate ensures transaction (both accounts updated or none)
   - Transaction management prevents data corruption

3. **Transaction History:**
   - View statements → Hibernate loads Transaction objects with relationships
   - Filter by date, amount → Hibernate generates optimized queries

4. **Loan Processing:**
   - Apply for loan → Hibernate saves Loan application
   - Link to account, user → All relationships maintained

### Scenario 4: Hospital Management System

**Daily Life Example:** Hospital systems use Hibernate extensively:

1. **Patient Registration:**
   - Register patient → Hibernate saves Patient entity
   - Link to appointments, medical records → Relationships managed

2. **Appointment Booking:**
   - Book appointment → Hibernate saves Appointment with Doctor and Patient relationships
   - Check availability → Hibernate queries existing appointments

3. **Medical Records:**
   - Store diagnosis → Hibernate saves MedicalRecord linked to Patient
   - Prescription → Hibernate manages Medicine-Prescription relationships

4. **Billing:**
   - Generate bill → Hibernate loads all services, calculates total
   - Payment processing → Transaction ensures data consistency

### Scenario 5: Online Food Delivery (Swiggy, Zomato)

**Daily Life Example:** Food delivery apps rely on Hibernate:

1. **Restaurant Listing:**
   - Browse restaurants → Hibernate loads Restaurant entities
   - Filter by cuisine, rating → Hibernate generates dynamic queries

2. **Menu Display:**
   - View menu → Hibernate loads MenuItems with Restaurant relationship
   - Add to cart → Hibernate manages CartItem relationships

3. **Order Placement:**
   - Place order → Hibernate saves Order with multiple OrderItems
   - Track delivery → Hibernate loads Order with DeliveryPerson relationship

4. **Reviews & Ratings:**
   - Rate restaurant → Hibernate saves Review with Restaurant and User relationships
   - Update average rating → Hibernate calculates and updates automatically

---

## A Simple Example

Let's see Hibernate in action with a real-world scenario. Here's a complete example:

\`\`\`java
// Entity class
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "name")
    private String name;
    
    @Column(name = "email")
    private String email;
    
    // Constructors, getters, setters
    public User() {}
    
    public User(String name, String email) {
        this.name = name;
        this.email = email;
    }
    
    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}

// Using Hibernate
public class UserDAO {
    private SessionFactory sessionFactory;
    
    public UserDAO() {
        sessionFactory = new Configuration()
            .configure("hibernate.cfg.xml")
            .buildSessionFactory();
    }
    
    public void saveUser(User user) {
        Session session = sessionFactory.openSession();
        Transaction tx = null;
        
        try {
            tx = session.beginTransaction();
            session.save(user);
            tx.commit();
            System.out.println("User saved successfully!");
        } catch (Exception e) {
            if (tx != null) tx.rollback();
            e.printStackTrace();
        } finally {
            session.close();
        }
    }
    
    public User getUser(Long id) {
        Session session = sessionFactory.openSession();
        try {
            User user = session.get(User.class, id);
            return user;
        } finally {
            session.close();
        }
    }
}
\`\`\`

---

## Hibernate vs JDBC

| Feature | JDBC | Hibernate |
|---------|------|-----------|
| **Code** | More boilerplate | Less code |
| **SQL** | Write SQL manually | Generated automatically |
| **Mapping** | Manual mapping | Automatic mapping |
| **Database** | Database-specific | Database independent |
| **Learning Curve** | Easier to start | Steeper but powerful |
| **Performance** | More control | Optimized with caching |

---

## When to Use Hibernate

**Use Hibernate when:**
- Building complex applications with many entities
- Need database independence
- Want to reduce boilerplate code
- Working with object-oriented design
- Need advanced features (caching, lazy loading)

**Stick with JDBC when:**
- Simple applications with few database operations
- Need fine-grained control over SQL
- Working with stored procedures
- Performance is critical and you need to optimize every query

---

## Getting Started

To use Hibernate, you need:

1. **Hibernate JAR files** (or Maven/Gradle dependency)
2. **Database driver** (MySQL, PostgreSQL, etc.)
3. **Configuration file** (hibernate.cfg.xml)
4. **Entity classes** with mapping

### Maven Dependency

\`\`\`xml
<dependency>
    <groupId>org.hibernate</groupId>
    <artifactId>hibernate-core</artifactId>
    <version>5.6.15.Final</version>
</dependency>
\`\`\`

---

## Summary

Hibernate is a powerful ORM framework that:
- Reduces boilerplate code
- Provides database independence
- Automatically maps objects to tables
- Offers advanced features like caching and lazy loading
- Makes database operations more intuitive

In the next tutorials, we'll dive deeper into Hibernate configuration, mapping, queries, and advanced features. Get ready to write less code and build more powerful applications!

---

## Practice Question

**Q:** Why would you choose Hibernate over JDBC for a large enterprise application?

**Hint:** Think about code maintainability, database independence, and advanced features.

**Answer:** Hibernate reduces boilerplate code, provides database independence (easy to switch databases), offers automatic mapping, caching for performance, and makes the codebase more maintainable for large applications with many entities and relationships.
  `,
  code: `// Hibernate Introduction Example
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import javax.persistence.*;

// Entity class
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "name", nullable = false)
    private String name;
    
    @Column(name = "email", unique = true)
    private String email;
    
    // Default constructor (required by Hibernate)
    public User() {}
    
    // Constructor
    public User(String name, String email) {
        this.name = name;
        this.email = email;
    }
    
    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    @Override
    public String toString() {
        return "User{id=" + id + ", name='" + name + "', email='" + email + "'}";
    }
}

// Main class demonstrating Hibernate
public class HibernateDemo {
    public static void main(String[] args) {
        // Create SessionFactory (expensive operation, do once)
        SessionFactory sessionFactory = new Configuration()
            .configure("hibernate.cfg.xml")
            .addAnnotatedClass(User.class)
            .buildSessionFactory();
        
        // Create a user
        User user = new User("John Doe", "john@example.com");
        
        // Save user using Hibernate
        Session session = sessionFactory.openSession();
        Transaction tx = null;
        
        try {
            tx = session.beginTransaction();
            session.save(user);
            tx.commit();
            System.out.println("User saved: " + user);
        } catch (Exception e) {
            if (tx != null) {
                tx.rollback();
            }
            e.printStackTrace();
        } finally {
            session.close();
        }
        
        // Retrieve user
        session = sessionFactory.openSession();
        try {
            User retrievedUser = session.get(User.class, user.getId());
            System.out.println("Retrieved user: " + retrievedUser);
        } finally {
            session.close();
        }
        
        // Close SessionFactory
        sessionFactory.close();
    }
}`
};

export default hibernateIntroduction;

