const jdbcProjectSetup = {
  id: 'jdbc-project-setup',
  title: 'JDBC Project Setup - MySQL Connection',
  description: 'Complete guide to create JDBC project, download MySQL Connector/J, add JAR file, and connect to MySQL database',
  content: `
# JDBC Project Setup — MySQL Database Connection

This guide will walk you through creating a JDBC project, downloading MySQL Connector/J, adding the JAR file, and connecting to MySQL database.

---

## Prerequisites

Before starting, ensure you have:
- **Java JDK 8+** installed
- **Eclipse IDE** or **IntelliJ IDEA**
- **MySQL Server** installed and running
- **MySQL Connector/J** JAR file (we'll download this)

---

## 📦 Step 1: Download MySQL Connector/J

### What is MySQL Connector/J?

**MySQL Connector/J** is the official JDBC driver for MySQL. It allows Java applications to connect to MySQL databases.

### Where to Download

1. **Visit:** https://dev.mysql.com/downloads/connector/j/
2. **Select Platform:** Platform Independent
3. **Download:**
   - **ZIP Archive:** \`mysql-connector-j-8.0.xx.zip\` (recommended)
   - Or **TAR Archive:** \`mysql-connector-j-8.0.xx.tar.gz\`

### Extract the JAR File

1. **Extract the downloaded ZIP/TAR file**
2. **Navigate to the extracted folder**
3. **Find the JAR file:**
   \`\`\`
   mysql-connector-j-8.0.xx/
   └── mysql-connector-j-8.0.xx.jar  ⭐ This is what you need!
   \`\`\`

**File name examples:**
- \`mysql-connector-j-8.0.33.jar\`
- \`mysql-connector-java-8.0.33.jar\`

**Note:** The exact name may vary by version, but it will contain "mysql-connector" and end with ".jar"

### Alternative: Direct JAR Download

**Maven Central Repository:**
- Visit: https://repo1.maven.org/maven2/mysql/mysql-connector-java/
- Navigate to latest version (e.g., 8.0.33)
- Download: \`mysql-connector-java-8.0.33.jar\`

---

## Method 1: Eclipse IDE Setup

### Step 1: Create Java Project

1. Open Eclipse
2. **File → New → Java Project**
3. Enter project name: \`JDBCExample\`
4. Click **Finish**

### Step 2: Add MySQL Connector/J JAR File

**Option A: Add to Build Path (Recommended)**

1. **Right-click on project** → **Properties**
2. Go to **Java Build Path** → **Libraries** tab
3. Click **Add External JARs...**
4. **Navigate to where you extracted MySQL Connector/J:**
   - Find: \`mysql-connector-j-8.0.xx.jar\`
   - Select it
5. Click **Open**
6. Click **Apply and Close**

**Option B: Create lib Folder**

1. **Right-click on project** → **New → Folder**
2. Name it: \`lib\`
3. **Copy the JAR file:**
   - From: Where you extracted MySQL Connector/J
   - To: \`JDBCExample/lib/mysql-connector-j-8.0.xx.jar\`
4. **Right-click on JAR file** → **Build Path → Add to Build Path**
5. You should see it under "Referenced Libraries"

### Step 3: Verify JAR File is Added

1. **Expand your project** in Package Explorer
2. **Look for:**
   - \`Referenced Libraries\` → \`mysql-connector-j-8.0.xx.jar\`
   - Or \`lib/\` folder → \`mysql-connector-j-8.0.xx.jar\`

### Step 4: Create Database Connection Class

Create a new Java class:

**File:** \`src/com/example/DatabaseConnection.java\`

\`\`\`java
package com.example;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnection {
    
    // Database connection parameters
    private static final String URL = "jdbc:mysql://localhost:3306/testdb";
    private static final String USERNAME = "root";
    private static final String PASSWORD = "your_password";
    
    public static Connection getConnection() {
        Connection connection = null;
        
        try {
            // Load MySQL JDBC Driver
            Class.forName("com.mysql.cj.jdbc.Driver");
            
            // Establish connection
            connection = DriverManager.getConnection(URL, USERNAME, PASSWORD);
            
            if (connection != null) {
                System.out.println("Successfully connected to MySQL database!");
            }
            
        } catch (ClassNotFoundException e) {
            System.err.println("MySQL JDBC Driver not found!");
            System.err.println("Make sure mysql-connector-j-8.0.xx.jar is in your classpath");
            e.printStackTrace();
        } catch (SQLException e) {
            System.err.println("Connection failed!");
            e.printStackTrace();
        }
        
        return connection;
    }
    
    public static void main(String[] args) {
        Connection conn = getConnection();
        
        if (conn != null) {
            try {
                conn.close();
                System.out.println("Connection closed.");
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}
\`\`\`

### Step 5: Create Database (If Not Exists)

Before running, create a database in MySQL:

\`\`\`sql
-- Connect to MySQL
mysql -u root -p

-- Create database
CREATE DATABASE testdb;

-- Use the database
USE testdb;

-- Create a sample table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);
\`\`\`

### Step 6: Run the Project

1. **Right-click on \`DatabaseConnection.java\`**
2. **Run As → Java Application**
3. **Check console output:**
   - "Successfully connected to MySQL database!" = Success!
   - Error messages = Check configuration

---

## Method 2: IntelliJ IDEA Setup

### Step 1: Create Java Project

1. **File → New → Project**
2. Select **Java**
3. Select **JDK** version
4. Click **Next**
5. Enter project name: \`JDBCExample\`
6. Click **Finish**

### Step 2: Add MySQL Connector/J JAR File

**Option A: Add as Library**

1. **File → Project Structure** (or \`Ctrl+Alt+Shift+S\` / \`Cmd+;\` on Mac)
2. Go to **Libraries**
3. Click **+** → **Java**
4. **Navigate to MySQL Connector/J JAR file:**
   - Find: \`mysql-connector-j-8.0.xx.jar\`
   - Select it
5. Click **OK**
6. Select the module to add library to
7. Click **OK**

**Option B: Create lib Folder**

1. **Right-click on project** → **New → Directory**
2. Name it: \`lib\`
3. **Copy JAR file** to \`lib/\` folder
4. **Right-click on JAR file** → **Add as Library...**
5. Click **OK**

### Step 3: Verify JAR File

1. **Expand project** → **External Libraries**
2. You should see: \`mysql-connector-j-8.0.xx.jar\`

### Step 4: Create Database Connection Class

Same as Eclipse (create \`DatabaseConnection.java\`)

### Step 5: Run the Project

1. **Right-click on \`DatabaseConnection.java\`**
2. **Run 'DatabaseConnection.main()'**
3. Check console output

---

## Method 3: Maven Project Setup

### Step 1: Create Maven Project

\`\`\`bash
mvn archetype:generate -DgroupId=com.example -DartifactId=JDBCExample -DarchetypeArtifactId=maven-archetype-quickstart
\`\`\`

### Step 2: Add MySQL Dependency (pom.xml)

**Maven automatically downloads the JAR file!**

Edit \`pom.xml\`:

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    
    <groupId>com.example</groupId>
    <artifactId>JDBCExample</artifactId>
    <version>1.0-SNAPSHOT</version>
    
    <properties>
        <maven.compiler.source>11</maven.compiler.source>
        <maven.compiler.target>11</maven.compiler.target>
    </properties>
    
    <dependencies>
        <!-- MySQL Connector/J - Maven downloads this automatically -->
        <dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
            <version>8.0.33</version>
        </dependency>
        
        <!-- Or for older versions: -->
        <!--
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>8.0.33</version>
        </dependency>
        -->
    </dependencies>
</project>
\`\`\`

### Step 3: Build Project

\`\`\`bash
# Maven downloads MySQL Connector/J automatically
mvn clean compile

# Run the project
mvn exec:java -Dexec.mainClass="com.example.DatabaseConnection"
\`\`\`

**Note:** With Maven, you don't need to manually download or add JAR files. Maven downloads them from Maven Central Repository.

---

## Method 4: Manual Setup (Command Line)

### Step 1: Create Project Structure

\`\`\`
JDBCExample/
├── src/
│   └── com/example/
│       └── DatabaseConnection.java
└── lib/
    └── mysql-connector-j-8.0.xx.jar
\`\`\`

### Step 2: Compile with Classpath

\`\`\`bash
# Compile Java file with MySQL JAR in classpath
javac -cp "lib/mysql-connector-j-8.0.xx.jar" src/com/example/DatabaseConnection.java -d out/

# Run with classpath
java -cp "out:lib/mysql-connector-j-8.0.xx.jar" com.example.DatabaseConnection

# Windows:
java -cp "out;lib/mysql-connector-j-8.0.xx.jar" com.example.DatabaseConnection
\`\`\`

---

## Complete Example: CRUD Operations

Create \`UserDAO.java\`:

\`\`\`java
package com.example;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class UserDAO {
    private static final String URL = "jdbc:mysql://localhost:3306/testdb";
    private static final String USERNAME = "root";
    private static final String PASSWORD = "your_password";
    
    // Get connection
    private Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USERNAME, PASSWORD);
    }
    
    // Create (Insert)
    public void createUser(String name, String email) {
        String sql = "INSERT INTO users (name, email) VALUES (?, ?)";
        
        try (Connection conn = getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setString(1, name);
            pstmt.setString(2, email);
            pstmt.executeUpdate();
            
            System.out.println("User created successfully!");
            
        } catch (SQLException e) {
            System.err.println("Error creating user: " + e.getMessage());
        }
    }
    
    // Read (Select)
    public List<User> getAllUsers() {
        List<User> users = new ArrayList<>();
        String sql = "SELECT * FROM users";
        
        try (Connection conn = getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            
            while (rs.next()) {
                User user = new User();
                user.setId(rs.getInt("id"));
                user.setName(rs.getString("name"));
                user.setEmail(rs.getString("email"));
                users.add(user);
            }
            
        } catch (SQLException e) {
            System.err.println("Error reading users: " + e.getMessage());
        }
        
        return users;
    }
    
    // Update
    public void updateUser(int id, String name, String email) {
        String sql = "UPDATE users SET name = ?, email = ? WHERE id = ?";
        
        try (Connection conn = getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setString(1, name);
            pstmt.setString(2, email);
            pstmt.setInt(3, id);
            pstmt.executeUpdate();
            
            System.out.println("User updated successfully!");
            
        } catch (SQLException e) {
            System.err.println("Error updating user: " + e.getMessage());
        }
    }
    
    // Delete
    public void deleteUser(int id) {
        String sql = "DELETE FROM users WHERE id = ?";
        
        try (Connection conn = getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setInt(1, id);
            pstmt.executeUpdate();
            
            System.out.println("User deleted successfully!");
            
        } catch (SQLException e) {
            System.err.println("Error deleting user: " + e.getMessage());
        }
    }
}
\`\`\`

---

## Common Issues and Solutions

### Issue 1: ClassNotFoundException: com.mysql.cj.jdbc.Driver

**Error:** \`java.lang.ClassNotFoundException: com.mysql.cj.jdbc.Driver\`

**Solution:**
- **Verify JAR file is added to classpath**
- **Check JAR file name** (should be mysql-connector-j-8.0.xx.jar)
- **Refresh project** in IDE
- **Rebuild project**

### Issue 2: No Suitable Driver Found

**Error:** \`No suitable driver found for jdbc:mysql://...\`

**Solution:**
- **Check URL format:** \`jdbc:mysql://localhost:3306/dbname\`
- **Verify MySQL is running:** \`mysql -u root -p\`
- **Check JAR file is in classpath**
- **For MySQL 8.0+:** Use \`com.mysql.cj.jdbc.Driver\`
- **For MySQL 5.x:** Use \`com.mysql.jdbc.Driver\`

### Issue 3: Access Denied

**Error:** \`Access denied for user 'root'@'localhost'\`

**Solution:**
- **Check username and password**
- **Verify MySQL user exists:**
  \`\`\`sql
  SELECT User, Host FROM mysql.user;
  \`\`\`
- **Grant permissions:**
  \`\`\`sql
  GRANT ALL PRIVILEGES ON testdb.* TO 'root'@'localhost';
  FLUSH PRIVILEGES;
  \`\`\`

### Issue 4: Connection Refused

**Error:** \`Communications link failure\`

**Solution:**
- **Check MySQL is running:**
  \`\`\`bash
  # Windows
  net start MySQL
  
  # Linux/Mac
  sudo systemctl status mysql
  \`\`\`
- **Verify port 3306 is open**
- **Check firewall settings**

### Issue 5: Timezone Error (MySQL 8.0+)

**Error:** \`The server time zone value 'xxx' is unrecognized\`

**Solution:**
- **Add timezone to URL:**
  \`\`\`java
  String URL = "jdbc:mysql://localhost:3306/testdb?serverTimezone=UTC";
  \`\`\`
- **Or set MySQL timezone:**
  \`\`\`sql
  SET GLOBAL time_zone = '+00:00';
  \`\`\`

---

## Project Structure Best Practices

\`\`\`
JDBCExample/
├── src/
│   └── com/example/
│       ├── DatabaseConnection.java    # Connection utility
│       ├── UserDAO.java               # Data Access Object
│       ├── User.java                  # Entity class
│       └── Main.java                  # Main class
├── lib/                                # JAR files
│   └── mysql-connector-j-8.0.xx.jar
└── README.md
\`\`\`

---

## Summary

**Steps to Create JDBC Project:**
1. Download MySQL Connector/J from https://dev.mysql.com/downloads/connector/j/
2. Create Java project in IDE
3. Add JAR file to project (lib folder or Build Path)
4. Create database connection class
5. Test connection
6. Implement CRUD operations

**Key Points:**
- **JAR file location:** \`lib/\` folder or Build Path
- **Download from:** https://dev.mysql.com/downloads/connector/j/
- **Driver class:** \`com.mysql.cj.jdbc.Driver\` (MySQL 8.0+)
- **Connection URL:** \`jdbc:mysql://localhost:3306/dbname\`

**With Maven:**
- Add dependency in \`pom.xml\`
- Maven downloads JAR automatically
- No manual download needed!

Now you're ready to connect Java applications to MySQL databases!

---

## Next Steps

- Learn about **PreparedStatement** for parameterized queries
- Understand **ResultSet** for retrieving data
- Explore **Transaction Management**
- Build a complete **CRUD application**
  `,
  code: `// JDBC Project Setup Guide
// This is a reference guide for JDBC project setup

/*
 * JDBC PROJECT SETUP CHECKLIST
 * =============================
 */

// 1. DOWNLOAD MYSQL CONNECTOR/J
/*
Visit: https://dev.mysql.com/downloads/connector/j/
Download: mysql-connector-j-8.0.xx.zip
Extract and find: mysql-connector-j-8.0.xx.jar

Alternative: Maven Central
https://repo1.maven.org/maven2/mysql/mysql-connector-java/
*/

// 2. PROJECT STRUCTURE
/*
JDBCExample/
├── src/
│   └── com/example/
│       └── DatabaseConnection.java
└── lib/
    └── mysql-connector-j-8.0.xx.jar  ⭐ JAR file here
*/

// 3. ADD JAR FILE TO PROJECT
/*
Eclipse:
  - Right-click project → Properties
  - Java Build Path → Libraries
  - Add External JARs → Select mysql-connector-j-8.0.xx.jar
  - OR: Copy to lib/ folder → Add to Build Path

IntelliJ:
  - File → Project Structure → Libraries
  - Add JAR → Select mysql-connector-j-8.0.xx.jar
  - OR: Copy to lib/ → Add as Library

Maven:
  - Add dependency in pom.xml
  - Maven downloads automatically
*/

// 4. DATABASE CONNECTION CODE
/*
import java.sql.*;

public class DatabaseConnection {
    private static final String URL = "jdbc:mysql://localhost:3306/testdb";
    private static final String USERNAME = "root";
    private static final String PASSWORD = "your_password";
    
    public static Connection getConnection() {
        try {
            // Load driver (MySQL 8.0+)
            Class.forName("com.mysql.cj.jdbc.Driver");
            
            // Establish connection
            Connection conn = DriverManager.getConnection(URL, USERNAME, PASSWORD);
            return conn;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
*/

// 5. MYSQL CONNECTION URL FORMAT
/*
jdbc:mysql://host:port/database?parameters

Examples:
  jdbc:mysql://localhost:3306/testdb
  jdbc:mysql://localhost:3306/testdb?serverTimezone=UTC
  jdbc:mysql://192.168.1.100:3306/mydb
*/

// 6. DRIVER CLASS NAMES
/*
MySQL 8.0+: com.mysql.cj.jdbc.Driver
MySQL 5.x:  com.mysql.jdbc.Driver
*/

// 7. COMMON ERRORS AND SOLUTIONS
/*
ClassNotFoundException:
  - JAR file not in classpath
  - Wrong JAR file name
  - Solution: Add JAR to Build Path

No suitable driver:
  - Wrong URL format
  - MySQL not running
  - Solution: Check URL and MySQL status

Access denied:
  - Wrong username/password
  - User doesn't have permissions
  - Solution: Check credentials and grants

Connection refused:
  - MySQL not running
  - Wrong port
  - Solution: Start MySQL, check port
*/

// 8. MAVEN DEPENDENCY (pom.xml)
/*
<dependencies>
    <dependency>
        <groupId>com.mysql</groupId>
        <artifactId>mysql-connector-j</artifactId>
        <version>8.0.33</version>
    </dependency>
</dependencies>
*/

// 9. COMPILE AND RUN (Command Line)
/*
# Compile
javac -cp "lib/mysql-connector-j-8.0.xx.jar" src/com/example/*.java

# Run
java -cp ".:lib/mysql-connector-j-8.0.xx.jar" com.example.DatabaseConnection

# Windows:
java -cp ".;lib/mysql-connector-j-8.0.xx.jar" com.example.DatabaseConnection
*/

// 10. VERIFY CONNECTION
/*
1. MySQL server running
2. Database created
3. JAR file in classpath
4. Correct URL, username, password
5. Run connection test
*/`
};

export default jdbcProjectSetup;


