const jdbcDrivers = {
  id: 'jdbc-drivers',
  title: 'JDBC Drivers',
  description: 'Understanding the four types of JDBC drivers',
  content: `
# JDBC Drivers — The Bridge Between Java and Databases

A JDBC driver is like a translator. Your Java code speaks Java, your database speaks SQL. The driver translates between them. Understanding driver types helps you choose the right one for your project.

---

## The Four Types of JDBC Drivers

### Type 1: JDBC-ODBC Bridge Driver

\`\`\`
Java Application
      ↓
JDBC-ODBC Bridge
      ↓
ODBC Driver
      ↓
Database
\`\`\`

**How it works:** Converts JDBC calls to ODBC calls, then ODBC driver talks to database.

**Pros:**
- Can connect to any ODBC-supported database
- Good for prototyping

**Cons:**
- Slow (two translations)
- Requires ODBC driver installed
- Not portable
- **Removed in Java 8!**

**Verdict:** Don't use. It's obsolete.

---

### Type 2: Native-API Driver

\`\`\`
Java Application
      ↓
JDBC Driver (Java)
      ↓
Native Database Library (C/C++)
      ↓
Database
\`\`\`

**How it works:** Uses database vendor's native client library.

**Pros:**
- Faster than Type 1
- Uses optimized native code

**Cons:**
- Requires native library on client
- Platform-dependent
- Not portable

**Example:** Oracle OCI driver

**Verdict:** Use only when performance is critical and you control the client environment.

---

### Type 3: Network Protocol Driver

\`\`\`
Java Application
      ↓
JDBC Driver (Java)
      ↓
Middleware Server
      ↓
Database
\`\`\`

**How it works:** Pure Java driver talks to middleware, which talks to database.

**Pros:**
- Pure Java (portable)
- No client installation needed
- Can connect to multiple databases

**Cons:**
- Requires middleware server
- Extra network hop
- More complex setup

**Verdict:** Good for enterprise environments with existing middleware.

---

### Type 4: Thin Driver (Pure Java)

\`\`\`
Java Application
      ↓
JDBC Driver (Pure Java)
      ↓
Database (via network protocol)
\`\`\`

**How it works:** Pure Java driver communicates directly with database using its native protocol.

**Pros:**
- Pure Java (100% portable)
- No native libraries needed
- Direct connection (fast)
- Easy to deploy

**Cons:**
- Database-specific driver needed

**Verdict:** **This is what you should use!** It's the standard choice for modern applications.

---

## Type 4 Drivers for Popular Databases

### MySQL

\`\`\`xml
<!-- Maven dependency -->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.33</version>
</dependency>
\`\`\`

\`\`\`java
// Driver class
Class.forName("com.mysql.cj.jdbc.Driver");

// Connection URL
String url = "jdbc:mysql://localhost:3306/mydb";
\`\`\`

### PostgreSQL

\`\`\`xml
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <version>42.6.0</version>
</dependency>
\`\`\`

\`\`\`java
Class.forName("org.postgresql.Driver");
String url = "jdbc:postgresql://localhost:5432/mydb";
\`\`\`

### Oracle

\`\`\`xml
<dependency>
    <groupId>com.oracle.database.jdbc</groupId>
    <artifactId>ojdbc8</artifactId>
    <version>21.9.0.0</version>
</dependency>
\`\`\`

\`\`\`java
Class.forName("oracle.jdbc.driver.OracleDriver");
String url = "jdbc:oracle:thin:@localhost:1521:xe";
\`\`\`

### SQL Server

\`\`\`xml
<dependency>
    <groupId>com.microsoft.sqlserver</groupId>
    <artifactId>mssql-jdbc</artifactId>
    <version>12.2.0.jre11</version>
</dependency>
\`\`\`

\`\`\`java
Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
String url = "jdbc:sqlserver://localhost:1433;databaseName=mydb";
\`\`\`

---

## Driver Comparison

| Type | Speed | Portability | Setup | Use Case |
|------|-------|-------------|-------|----------|
| Type 1 | Slowest | No | Complex | Obsolete |
| Type 2 | Fast | No | Complex | Legacy systems |
| Type 3 | Medium | Yes | Complex | Enterprise middleware |
| Type 4 | Fast | Yes | Simple | **Modern applications** |

---

## Loading Drivers

### Modern Way (JDBC 4.0+)

Since JDBC 4.0, drivers are auto-loaded via ServiceLoader. Just add the JAR to classpath:

\`\`\`java
// No Class.forName needed!
Connection conn = DriverManager.getConnection(url, user, password);
\`\`\`

### Legacy Way

For older drivers or explicit loading:

\`\`\`java
Class.forName("com.mysql.cj.jdbc.Driver");
Connection conn = DriverManager.getConnection(url, user, password);
\`\`\`

---

## Real-World Setup: MySQL with Maven

### 1. Add Dependency

\`\`\`xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.33</version>
</dependency>
\`\`\`

### 2. Create Connection

\`\`\`java
public class DatabaseConfig {
    private static final String URL = "jdbc:mysql://localhost:3306/ecommerce";
    private static final String USER = "root";
    private static final String PASSWORD = "password";
    
    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }
}
\`\`\`

### 3. Use Connection

\`\`\`java
try (Connection conn = DatabaseConfig.getConnection()) {
    // Use connection
    System.out.println("Connected successfully!");
} catch (SQLException e) {
    System.err.println("Connection failed: " + e.getMessage());
}
\`\`\`
`,
  code: `// JDBC Drivers Demo

import java.sql.*;

public class JdbcDriversDemo {
    public static void main(String[] args) {
        System.out.println("=== JDBC Drivers Demo ===\\n");
        
        // 1. DRIVER TYPES OVERVIEW
        System.out.println("1. JDBC DRIVER TYPES");
        System.out.println("   ------------------");
        System.out.println("   Type 1: JDBC-ODBC Bridge (Obsolete)");
        System.out.println("   Type 2: Native-API Driver");
        System.out.println("   Type 3: Network Protocol Driver");
        System.out.println("   Type 4: Thin Driver (Recommended!)");
        System.out.println();
        
        // 2. POPULAR TYPE 4 DRIVERS
        System.out.println("2. POPULAR TYPE 4 DRIVERS");
        System.out.println("   -----------------------");
        
        String[][] drivers = {
            {"MySQL", "com.mysql.cj.jdbc.Driver", "jdbc:mysql://localhost:3306/db"},
            {"PostgreSQL", "org.postgresql.Driver", "jdbc:postgresql://localhost:5432/db"},
            {"Oracle", "oracle.jdbc.driver.OracleDriver", "jdbc:oracle:thin:@localhost:1521:xe"},
            {"SQL Server", "com.microsoft.sqlserver.jdbc.SQLServerDriver", "jdbc:sqlserver://localhost:1433;databaseName=db"},
            {"H2 (In-Memory)", "org.h2.Driver", "jdbc:h2:mem:testdb"}
        };
        
        for (String[] driver : drivers) {
            System.out.println("   " + driver[0] + ":");
            System.out.println("     Driver: " + driver[1]);
            System.out.println("     URL: " + driver[2]);
            System.out.println();
        }
        
        // 3. CHECKING AVAILABLE DRIVERS
        System.out.println("3. REGISTERED DRIVERS");
        System.out.println("   -------------------");
        
        java.util.Enumeration<Driver> driverList = DriverManager.getDrivers();
        int count = 0;
        while (driverList.hasMoreElements()) {
            Driver d = driverList.nextElement();
            System.out.println("   " + (++count) + ". " + d.getClass().getName());
        }
        if (count == 0) {
            System.out.println("   No drivers registered (add driver JAR to classpath)");
        }
        System.out.println();
        
        // 4. CONNECTION URL FORMATS
        System.out.println("4. CONNECTION URL FORMATS");
        System.out.println("   -----------------------");
        System.out.println("   MySQL:");
        System.out.println("     jdbc:mysql://host:port/database?param=value");
        System.out.println("     jdbc:mysql://localhost:3306/mydb?useSSL=false");
        System.out.println();
        System.out.println("   PostgreSQL:");
        System.out.println("     jdbc:postgresql://host:port/database");
        System.out.println("     jdbc:postgresql://localhost:5432/mydb");
        System.out.println();
        System.out.println("   Oracle:");
        System.out.println("     jdbc:oracle:thin:@host:port:sid");
        System.out.println("     jdbc:oracle:thin:@localhost:1521:xe");
        System.out.println();
        
        // 5. MAVEN DEPENDENCIES
        System.out.println("5. MAVEN DEPENDENCIES");
        System.out.println("   -------------------");
        System.out.println("   MySQL:");
        System.out.println("     <groupId>mysql</groupId>");
        System.out.println("     <artifactId>mysql-connector-java</artifactId>");
        System.out.println("     <version>8.0.33</version>");
        System.out.println();
        System.out.println("   PostgreSQL:");
        System.out.println("     <groupId>org.postgresql</groupId>");
        System.out.println("     <artifactId>postgresql</artifactId>");
        System.out.println("     <version>42.6.0</version>");
        System.out.println();
        
        // 6. SIMULATED CONNECTION
        System.out.println("6. CONNECTION EXAMPLE (Simulated)");
        System.out.println("   -------------------------------");
        
        // This would work with actual driver
        String url = "jdbc:mysql://localhost:3306/ecommerce";
        String user = "root";
        String password = "password";
        
        System.out.println("   URL: " + url);
        System.out.println("   User: " + user);
        System.out.println();
        System.out.println("   Code:");
        System.out.println("   Connection conn = DriverManager.getConnection(url, user, password);");
        System.out.println();
        
        // 7. BEST PRACTICES
        System.out.println("7. BEST PRACTICES");
        System.out.println("   ---------------");
        System.out.println("   Use Type 4 drivers for new projects");
        System.out.println("   Use connection pooling in production");
        System.out.println("   Store credentials in config files, not code");
        System.out.println("   Use try-with-resources for auto-closing");
        System.out.println("   Keep driver version updated");
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a database connection utility class',
      hint: 'Create a class that manages connection configuration',
      starterCode: `import java.sql.*;
import java.util.Properties;

public class DatabaseUtilDemo {
    public static void main(String[] args) {
        System.out.println("=== Database Connection Utility ===\\n");
        
        // Configure for MySQL
        DatabaseUtil.configure(
            "jdbc:mysql://localhost:3306/testdb",
            "root",
            "password"
        );
        
        System.out.println("Configuration:");
        System.out.println("  URL: " + DatabaseUtil.getUrl());
        System.out.println("  User: " + DatabaseUtil.getUser());
        System.out.println();
        
        // Test connection (would work with actual database)
        System.out.println("Testing connection...");
        System.out.println("(Simulated - add MySQL driver to test with real DB)");
        
        // Example usage pattern
        System.out.println("\\nUsage pattern:");
        System.out.println("  try (Connection conn = DatabaseUtil.getConnection()) {");
        System.out.println("      // Use connection");
        System.out.println("  }");
    }
}

class DatabaseUtil {
    private static String url;
    private static String user;
    private static String password;
    
    public static void configure(String dbUrl, String dbUser, String dbPassword) {
        url = dbUrl;
        user = dbUser;
        password = dbPassword;
    }
    
    public static Connection getConnection() throws SQLException {
        if (url == null) {
            throw new SQLException("Database not configured. Call configure() first.");
        }
        return DriverManager.getConnection(url, user, password);
    }
    
    public static String getUrl() { return url; }
    public static String getUser() { return user; }
    
    public static void testConnection() {
        try (Connection conn = getConnection()) {
            System.out.println("Connection successful!");
            DatabaseMetaData meta = conn.getMetaData();
            System.out.println("Database: " + meta.getDatabaseProductName());
            System.out.println("Version: " + meta.getDatabaseProductVersion());
        } catch (SQLException e) {
            System.out.println("Connection failed: " + e.getMessage());
        }
    }
}`
    }
  ]
};

export default jdbcDrivers;
