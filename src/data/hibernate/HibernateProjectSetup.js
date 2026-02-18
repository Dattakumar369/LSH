const hibernateProjectSetup = {
  id: 'hibernate-project-setup',
  title: 'Hibernate Project Setup - Maven Project',
  description: 'Complete guide to create Hibernate Maven project with current dependencies, configure Hibernate, and run your first Hibernate application',
  content: `
# Hibernate Project Setup — Maven Project with Current Dependencies

This guide will walk you through creating a Hibernate project using **Maven** (modern standard). Maven automatically downloads all required dependencies - no manual JAR file downloads needed!

---

## Prerequisites

Before starting, ensure you have:
- **Java JDK 11+** installed (recommended: JDK 17 or 21)
- **Maven 3.6+** installed
- **Eclipse IDE** or **IntelliJ IDEA** (with Maven support)
- **MySQL Server** installed and running

---

## Why Maven?

**Maven is the modern standard** for Java projects:
- **Automatic dependency management** - No manual JAR downloads
- **Version compatibility** - Maven handles transitive dependencies
- **Industry standard** - Used in all modern Java projects
- **Easy updates** - Just change version numbers
- **Build automation** - Compile, test, package with one command

**Note:** Manual JAR file approach is outdated and not recommended for new projects.

---

## Method 1: Create Maven Project in IntelliJ IDEA

### Step 1: Create New Maven Project

1. **File → New → Project**
2. Select **Maven**
3. Check **Create from archetype**
4. Select **maven-archetype-quickstart**
5. Click **Next**
6. Enter:
   - **GroupId:** \`com.example\`
   - **ArtifactId:** \`HibernateExample\`
   - **Version:** \`1.0-SNAPSHOT\`
7. Click **Next** → **Finish**

### Step 2: Add Hibernate Dependencies

**File:** \`pom.xml\`

Replace the content with:

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    
    <groupId>com.example</groupId>
    <artifactId>HibernateExample</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>jar</packaging>
    
    <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <hibernate.version>6.4.4.Final</hibernate.version>
    </properties>
    
    <dependencies>
        <!-- Hibernate Core - Latest Version -->
        <dependency>
            <groupId>org.hibernate.orm</groupId>
            <artifactId>hibernate-core</artifactId>
            <version>\${hibernate.version}</version>
        </dependency>
        
        <!-- MySQL Connector/J - Latest Version -->
        <dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
            <version>8.3.0</version>
        </dependency>
        
        <!-- Jakarta Persistence API (JPA) - Required for Hibernate 6.x -->
        <dependency>
            <groupId>jakarta.persistence</groupId>
            <artifactId>jakarta.persistence-api</artifactId>
            <version>3.1.0</version>
        </dependency>
        
        <!-- SLF4J API (Logging) -->
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-api</artifactId>
            <version>2.0.9</version>
        </dependency>
        
        <!-- SLF4J Simple Implementation -->
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-simple</artifactId>
            <version>2.0.9</version>
        </dependency>
    </dependencies>
    
    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.11.0</version>
                <configuration>
                    <source>17</source>
                    <target>17</target>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
\`\`\`

**Maven will automatically download all dependencies!**

### Step 3: Maven Dependencies Explained

**Current Versions (2024):**
- **Hibernate Core:** \`6.4.4.Final\` (latest stable)
- **MySQL Connector:** \`8.3.0\` (latest)
- **Jakarta Persistence:** \`3.1.0\` (Hibernate 6.x uses Jakarta, not javax)
- **SLF4J:** \`2.0.9\` (latest)

**Note:** Hibernate 6.x uses **Jakarta Persistence API** instead of **javax.persistence**. This is important!

---

## Method 2: Create Maven Project in Eclipse

### Step 1: Create Maven Project

1. **File → New → Maven Project**
2. Check **Create a simple project**
3. Click **Next**
4. Enter:
   - **Group Id:** \`com.example\`
   - **Artifact Id:** \`HibernateExample\`
   - **Version:** \`1.0-SNAPSHOT\`
   - **Packaging:** \`jar\`
5. Click **Finish**

### Step 2: Add Dependencies

**Same as IntelliJ** - Edit \`pom.xml\` with the dependencies above.

**Eclipse will automatically download dependencies** when you save the file.

---

## Method 3: Create Maven Project via Command Line

### Step 1: Create Project

\`\`\`bash
mvn archetype:generate -DgroupId=com.example -DartifactId=HibernateExample -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false
\`\`\`

### Step 2: Add Dependencies

Edit \`pom.xml\` with the dependencies above.

### Step 3: Download Dependencies

\`\`\`bash
cd HibernateExample
mvn clean install
\`\`\`

Maven downloads all dependencies automatically!

---

## Project Structure

After creating the Maven project:

\`\`\`
HibernateExample/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/
│   │   │       ├── Employee.java
│   │   │       ├── HibernateUtil.java
│   │   │       └── HibernateMain.java
│   │   └── resources/
│   │       └── hibernate.cfg.xml
│   └── test/
│       └── java/
└── pom.xml
\`\`\`

---

## Step 4: Create Hibernate Configuration

**File:** \`src/main/resources/hibernate.cfg.xml\`

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE hibernate-configuration PUBLIC
    "-//Hibernate/Hibernate Configuration DTD 3.0//EN"
    "http://www.hibernate.org/dtd/hibernate-configuration-3.0.dtd">

<hibernate-configuration>
    <session-factory>
        <!-- Database connection settings -->
        <property name="hibernate.connection.driver_class">com.mysql.cj.jdbc.Driver</property>
        <property name="hibernate.connection.url">jdbc:mysql://localhost:3306/hibernatedb?serverTimezone=UTC</property>
        <property name="hibernate.connection.username">root</property>
        <property name="hibernate.connection.password">your_password</property>
        
        <!-- JDBC connection pool settings -->
        <property name="hibernate.connection.pool_size">10</property>
        
        <!-- SQL dialect for MySQL 8.0+ -->
        <property name="hibernate.dialect">org.hibernate.dialect.MySQLDialect</property>
        
        <!-- Echo all executed SQL to console -->
        <property name="hibernate.show_sql">true</property>
        <property name="hibernate.format_sql">true</property>
        
        <!-- Auto create/update database schema -->
        <property name="hibernate.hbm2ddl.auto">update</property>
        
        <!-- For Hibernate 6.x with annotations -->
        <property name="hibernate.mapping.packages">com.example</property>
    </session-factory>
</hibernate-configuration>
\`\`\`

---

## Step 5: Create Database

\`\`\`sql
-- Connect to MySQL
mysql -u root -p

-- Create database
CREATE DATABASE hibernatedb;

-- Use the database
USE hibernatedb;
\`\`\`

---

## Step 6: Create Entity Class

**File:** \`src/main/java/com/example/Employee.java\`

\`\`\`java
package com.example;

import jakarta.persistence.*;

@Entity
@Table(name = "employees")
public class Employee {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    
    @Column(name = "name", nullable = false)
    private String name;
    
    @Column(name = "email", unique = true, nullable = false)
    private String email;
    
    @Column(name = "salary")
    private double salary;
    
    // Default constructor (required by Hibernate)
    public Employee() {
    }
    
    // Parameterized constructor
    public Employee(String name, String email, double salary) {
        this.name = name;
        this.email = email;
        this.salary = salary;
    }
    
    // Getters and Setters
    public int getId() {
        return id;
    }
    
    public void setId(int id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public double getSalary() {
        return salary;
    }
    
    public void setSalary(double salary) {
        this.salary = salary;
    }
    
    @Override
    public String toString() {
        return "Employee [id=" + id + ", name=" + name + ", email=" + email + ", salary=" + salary + "]";
    }
}
\`\`\`

**Important:** Hibernate 6.x uses \`jakarta.persistence\` instead of \`javax.persistence\`!

---

## Step 7: Create Hibernate Utility Class

**File:** \`src/main/java/com/example/HibernateUtil.java\`

\`\`\`java
package com.example;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class HibernateUtil {
    
    private static SessionFactory sessionFactory;
    
    static {
        try {
            // Create SessionFactory from hibernate.cfg.xml
            sessionFactory = new Configuration()
                    .configure("hibernate.cfg.xml")
                    .addAnnotatedClass(Employee.class)
                    .buildSessionFactory();
            
            System.out.println("Hibernate SessionFactory created successfully!");
            
        } catch (Exception e) {
            System.err.println("Initial SessionFactory creation failed: " + e);
            throw new ExceptionInInitializerError(e);
        }
    }
    
    public static SessionFactory getSessionFactory() {
        return sessionFactory;
    }
    
    public static void shutdown() {
        if (sessionFactory != null) {
            sessionFactory.close();
            System.out.println("SessionFactory closed.");
        }
    }
}
\`\`\`

---

## Step 8: Create Main Class with CRUD Operations

**File:** \`src/main/java/com/example/HibernateMain.java\`

\`\`\`java
package com.example;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import java.util.List;

public class HibernateMain {
    
    public static void main(String[] args) {
        SessionFactory sessionFactory = HibernateUtil.getSessionFactory();
        Session session = sessionFactory.openSession();
        Transaction transaction = null;
        
        try {
            transaction = session.beginTransaction();
            
            // CREATE - Insert a new employee
            System.out.println("\\n=== Creating Employee ===");
            Employee emp1 = new Employee("John Doe", "john@example.com", 50000.0);
            session.persist(emp1);
            System.out.println("Employee saved: " + emp1);
            
            Employee emp2 = new Employee("Jane Smith", "jane@example.com", 60000.0);
            session.persist(emp2);
            System.out.println("Employee saved: " + emp2);
            
            transaction.commit();
            
            // READ - Retrieve all employees
            System.out.println("\\n=== Reading All Employees ===");
            transaction = session.beginTransaction();
            List<Employee> employees = session.createQuery("FROM Employee", Employee.class).list();
            for (Employee emp : employees) {
                System.out.println(emp);
            }
            transaction.commit();
            
            // UPDATE - Update an employee
            System.out.println("\\n=== Updating Employee ===");
            transaction = session.beginTransaction();
            Employee emp = session.get(Employee.class, 1);
            if (emp != null) {
                emp.setSalary(55000.0);
                session.merge(emp);
                System.out.println("Employee updated: " + emp);
            }
            transaction.commit();
            
            // DELETE - Delete an employee
            System.out.println("\\n=== Deleting Employee ===");
            transaction = session.beginTransaction();
            Employee empToDelete = session.get(Employee.class, 2);
            if (empToDelete != null) {
                session.remove(empToDelete);
                System.out.println("Employee deleted: " + empToDelete);
            }
            transaction.commit();
            
            // Final list
            System.out.println("\\n=== Final Employee List ===");
            transaction = session.beginTransaction();
            employees = session.createQuery("FROM Employee", Employee.class).list();
            for (Employee e : employees) {
                System.out.println(e);
            }
            transaction.commit();
            
        } catch (Exception e) {
            if (transaction != null) {
                transaction.rollback();
            }
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
        } finally {
            session.close();
            HibernateUtil.shutdown();
        }
    }
}
\`\`\`

**Note:** Hibernate 6.x uses \`persist()\`, \`merge()\`, and \`remove()\` instead of \`save()\`, \`update()\`, and \`delete()\`.

---

## Step 9: Run the Project

### IntelliJ IDEA

1. **Right-click on \`HibernateMain.java\`**
2. **Run 'HibernateMain.main()'**
3. Check console output

### Eclipse

1. **Right-click on \`HibernateMain.java\`**
2. **Run As → Java Application**
3. Check console output

### Command Line (Maven)

\`\`\`bash
# Compile and run
mvn clean compile exec:java -Dexec.mainClass="com.example.HibernateMain"
\`\`\`

---

## Verify It Works

1. **Check console:** "Hibernate SessionFactory created successfully!"
2. **Check SQL queries:** Should see SQL being printed
3. **Check database:** Table \`employees\` should be created automatically
4. **Check CRUD operations:** All operations should execute successfully

---

## Common Issues and Solutions

### Issue 1: ClassNotFoundException: jakarta.persistence.Entity

**Error:** \`java.lang.ClassNotFoundException: jakarta.persistence.Entity\`

**Solution:**
- Add Jakarta Persistence API dependency in \`pom.xml\`
- Use \`jakarta.persistence\` imports (not \`javax.persistence\`)
- This is required for Hibernate 6.x

### Issue 2: NoSuchMethodError with Hibernate 6.x

**Error:** Methods like \`save()\`, \`update()\`, \`delete()\` not found

**Solution:**
- Hibernate 6.x uses different method names:
  - \`save()\` → \`persist()\`
  - \`update()\` → \`merge()\`
  - \`delete()\` → \`remove()\`

### Issue 3: Maven Dependencies Not Downloading

**Solution:**
- Check internet connection
- Verify Maven is installed: \`mvn -version\`
- Update Maven: \`mvn clean install -U\`
- Check \`pom.xml\` syntax

### Issue 4: Connection Failed

**Solution:**
- Verify MySQL is running
- Check database name, username, password in \`hibernate.cfg.xml\`
- Verify connection URL format

---

## Maven Dependency Versions (Current - 2024)

\`\`\`xml
<!-- Hibernate 6.x (Latest) -->
<dependency>
    <groupId>org.hibernate.orm</groupId>
    <artifactId>hibernate-core</artifactId>
    <version>6.4.4.Final</version>
</dependency>

<!-- MySQL Connector (Latest) -->
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
    <version>8.3.0</version>
</dependency>

<!-- Jakarta Persistence API (Required for Hibernate 6.x) -->
<dependency>
    <groupId>jakarta.persistence</groupId>
    <artifactId>jakarta.persistence-api</artifactId>
    <version>3.1.0</version>
</dependency>

<!-- SLF4J (Latest) -->
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-api</artifactId>
    <version>2.0.9</version>
</dependency>
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-simple</artifactId>
    <version>2.0.9</version>
</dependency>
\`\`\`

---

## Summary

**Steps to Create Hibernate Maven Project:**
1. Create Maven project in IDE
2. Add Hibernate dependencies in \`pom.xml\`
3. Maven downloads all JAR files automatically
4. Create \`hibernate.cfg.xml\` in \`src/main/resources/\`
5. Create entity class with Jakarta annotations
6. Create HibernateUtil class
7. Create main class with CRUD operations
8. Run and test

**Key Points:**
- **Use Maven** - Modern standard, no manual JAR downloads
- **Hibernate 6.x** - Latest version with Jakarta Persistence
- **Current dependencies** - All versions are up-to-date (2024)
- **Jakarta, not javax** - Hibernate 6.x uses \`jakarta.persistence\`

**No JAR file downloads needed!** Maven handles everything automatically.

---

## Legacy Method: Manual JAR Files (Not Recommended)

> **Note:** Manual JAR file approach is outdated. Modern projects use Maven. This section is for reference only.

If you must use manual JAR files (not recommended):

1. Download Hibernate from: https://hibernate.org/orm/releases/
2. Extract and copy JAR files to \`lib/\` folder
3. Add to Build Path manually

**But we strongly recommend using Maven instead!**

---

## Next Steps

- Learn about **Hibernate Session** and **Transaction Management**
- Explore **HQL (Hibernate Query Language)**
- Understand **Relationships** (One-to-One, One-to-Many, Many-to-Many)
- Learn about **Caching** and **Performance Optimization**
  `,
  code: `// Hibernate Maven Project Setup Guide
// Modern approach using Maven - No manual JAR downloads needed!

/*
 * HIBERNATE MAVEN PROJECT SETUP
 * ==============================
 * Modern standard: Use Maven for dependency management
 */

// 1. CREATE MAVEN PROJECT
/*
IntelliJ:
  File → New → Project → Maven → Create from archetype

Eclipse:
  File → New → Maven Project

Command Line:
  mvn archetype:generate -DgroupId=com.example -DartifactId=HibernateExample
*/

// 2. ADD DEPENDENCIES (pom.xml) - CURRENT VERSIONS (2024)
/*
<dependencies>
    <!-- Hibernate 6.x (Latest) -->
    <dependency>
        <groupId>org.hibernate.orm</groupId>
        <artifactId>hibernate-core</artifactId>
        <version>6.4.4.Final</version>
    </dependency>
    
    <!-- MySQL Connector (Latest) -->
    <dependency>
        <groupId>com.mysql</groupId>
        <artifactId>mysql-connector-j</artifactId>
        <version>8.3.0</version>
    </dependency>
    
    <!-- Jakarta Persistence API (Required for Hibernate 6.x) -->
    <dependency>
        <groupId>jakarta.persistence</groupId>
        <artifactId>jakarta.persistence-api</artifactId>
        <version>3.1.0</version>
    </dependency>
    
    <!-- SLF4J (Latest) -->
    <dependency>
        <groupId>org.slf4j</groupId>
        <artifactId>slf4j-api</artifactId>
        <version>2.0.9</version>
    </dependency>
    <dependency>
        <groupId>org.slf4j</groupId>
        <artifactId>slf4j-simple</artifactId>
        <version>2.0.9</version>
    </dependency>
</dependencies>
*/

// 3. PROJECT STRUCTURE
/*
HibernateExample/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/
│   │   │       ├── Employee.java
│   │   │       ├── HibernateUtil.java
│   │   │       └── HibernateMain.java
│   │   └── resources/
│   │       └── hibernate.cfg.xml
│   └── test/
└── pom.xml
*/

// 4. ENTITY CLASS (Hibernate 6.x uses Jakarta)
/*
package com.example;

import jakarta.persistence.*;  // Not javax.persistence!

@Entity
@Table(name = "employees")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    @Column(name = "name")
    private String name;
    
    // Constructors, getters, setters
}
*/

// 5. HIBERNATE METHODS (Hibernate 6.x)
/*
CREATE:  session.persist(employee);  // Not save()
UPDATE:  session.merge(employee);    // Not update()
DELETE:  session.remove(employee);  // Not delete()
*/

// 6. RUN PROJECT
/*
IntelliJ: Right-click → Run
Eclipse:  Right-click → Run As → Java Application
Maven:    mvn clean compile exec:java -Dexec.mainClass="com.example.HibernateMain"
*/

// 7. KEY DIFFERENCES (Hibernate 6.x)
/*
- Uses jakarta.persistence (not javax.persistence)
- Methods: persist(), merge(), remove() (not save(), update(), delete())
- Requires Jakarta Persistence API dependency
- Latest version: 6.4.4.Final
*/

// 8. MAVEN ADVANTAGES
/*
Automatic dependency download
Version management
Transitive dependencies handled
Industry standard
No manual JAR file management
*/`
};

export default hibernateProjectSetup;
