const springIntroduction = {
  id: 'spring-introduction',
  title: 'Why Spring? Problems in Traditional Java',
  description: 'Understanding why Spring exists and the real problems it solves',
  content: `
# Why Spring? The Real Problems in Traditional Java

Let me tell you a story. You're building a student management system. You need to save student data, retrieve it, update it. Simple, right? But as your application grows, you start facing problems. Real problems. That's where Spring comes in.

Before we dive into Spring, let's understand what problems it solves. Because if you don't understand the problem, you won't appreciate the solution.

---

## The Traditional Java Way - What We Used to Do

Let's say you're building a Student Management System. Here's how you'd do it in traditional Java:

\`\`\`java
public class StudentService {
    private StudentRepository repository;
    
    public StudentService() {
        this.repository = new StudentRepository();
    }
    
    public void saveStudent(Student student) {
        repository.save(student);
    }
}
\`\`\`

And your repository:

\`\`\`java
public class StudentRepository {
    private Connection connection;
    
    public StudentRepository() {
        // Create database connection
        this.connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/studentdb");
    }
    
    public void save(Student student) {
        // Save to database
    }
}
\`\`\`

Looks simple, right? But here's where the problems start.

---

## Problem 1: Tight Coupling - Classes Are Too Dependent

Look at this code:

\`\`\`java
public class StudentService {
    private StudentRepository repository = new StudentRepository();
}
\`\`\`

The problem? StudentService is tightly coupled to StudentRepository. It directly creates the repository. 

What if tomorrow you want to:
- Use a different database (Oracle instead of MySQL)?
- Use a mock repository for testing?
- Switch to a NoSQL database?

You'd have to modify StudentService. And if StudentService is used in 50 places? You're in trouble.

**Real Example:**
Imagine you built an e-commerce app with MySQL. After 6 months, your boss says "We need to support Oracle database for enterprise clients." 

With traditional Java, you'd need to:
1. Change StudentRepository implementation
2. Change all places where it's created
3. Recompile everything
4. Test everything again

That's days of work. With Spring? Minutes.

---

## Problem 2: Object Creation is Scattered Everywhere

In traditional Java, you create objects everywhere:

\`\`\`java
public class StudentController {
    private StudentService service = new StudentService();
}

public class StudentService {
    private StudentRepository repo = new StudentRepository();
}

public class StudentRepository {
    private Connection conn = new Connection();
}
\`\`\`

Every class is responsible for creating its dependencies. This leads to:
- Duplicate code
- Hard to maintain
- Hard to test
- Hard to change

**Real Example:**
You have 20 services, each creating its own repository. Tomorrow you need to add logging to all repositories. You'd have to modify 20 places. With Spring? One configuration change.

---

## Problem 3: Hard to Test - Can't Mock Dependencies

Testing becomes a nightmare:

\`\`\`java
public class StudentService {
    private StudentRepository repo = new StudentRepository();
    
    public void saveStudent(Student student) {
        repo.save(student);
    }
}
\`\`\`

How do you test this without actually connecting to a database? You can't easily replace StudentRepository with a mock. You're stuck.

**Real Example:**
You want to test your service logic, but it always hits the real database. Your tests are slow. They fail if the database is down. They leave test data in your database. Not ideal.

---

## Problem 4: Lifecycle Management - Who Creates? Who Destroys?

In traditional Java:

\`\`\`java
StudentService service = new StudentService();
// Use it
// But when do you destroy it? How do you manage it?
\`\`\`

You create objects, but who manages their lifecycle? When should they be destroyed? How do you ensure only one instance exists (singleton)? You have to write all this code yourself.

**Real Example:**
Database connections are expensive. You want to reuse them. But in traditional Java, every service creates its own connection. You end up with 100 connections when you only need 10. Your database server crashes.

---

## Problem 5: Configuration is Mixed with Code

Look at this:

\`\`\`java
public class StudentRepository {
    private Connection conn;
    
    public StudentRepository() {
        String url = "jdbc:mysql://localhost:3306/studentdb";
        String user = "root";
        String password = "mypassword";
        this.conn = DriverManager.getConnection(url, user, password);
    }
}
\`\`\`

Database URL, username, password - all hardcoded in your Java code. Want to change the database? Change the code. Want different configs for development and production? Good luck.

**Real Example:**
Your app works fine on your laptop. You deploy it to production. But production uses a different database server. You have to change code, recompile, redeploy. With Spring? Change a config file. Done.

---

## Real-World Scenario: Building an E-Commerce Application

Let's see how these problems show up in a real application:

### Without Spring:

\`\`\`java
// ProductController.java
public class ProductController {
    private ProductService service = new ProductService();
    
    public void showProducts() {
        List<Product> products = service.getAllProducts();
        // Display products
    }
}

// ProductService.java
public class ProductService {
    private ProductRepository repo = new ProductRepository();
    private EmailService emailService = new EmailService();
    private Logger logger = new Logger();
    
    public List<Product> getAllProducts() {
        logger.log("Fetching products");
        List<Product> products = repo.findAll();
        return products;
    }
}

// ProductRepository.java
public class ProductRepository {
    private Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/shop");
    
    public List<Product> findAll() {
        // Query database
    }
}
\`\`\`

Problems:
1. ProductController creates ProductService
2. ProductService creates ProductRepository, EmailService, Logger
3. ProductRepository creates Connection
4. Everything is tightly coupled
5. Can't test ProductService without a real database
6. Can't easily replace EmailService with a mock
7. Configuration (database URL) is in code

### With Spring:

\`\`\`java
// ProductController.java
@Controller
public class ProductController {
    @Autowired
    private ProductService service;  // Spring injects this
    
    public void showProducts() {
        List<Product> products = service.getAllProducts();
    }
}

// ProductService.java
@Service
public class ProductService {
    @Autowired
    private ProductRepository repo;  // Spring injects this
    
    @Autowired
    private EmailService emailService;  // Spring injects this
    
    public List<Product> getAllProducts() {
        return repo.findAll();
    }
}
\`\`\`

Benefits:
1. No "new" keyword - Spring creates objects
2. Dependencies are injected automatically
3. Easy to test - can inject mocks
4. Configuration is separate from code
5. Lifecycle is managed by Spring

---

## The Solution: Spring Framework

Spring Framework solves all these problems by providing:

1. **IOC Container** - Spring creates and manages objects for you
2. **Dependency Injection** - Spring injects dependencies automatically
3. **Configuration Management** - Separate configuration from code
4. **Lifecycle Management** - Spring handles object creation and destruction
5. **Testing Support** - Easy to inject mocks for testing

Think of Spring as a smart factory. You tell it what objects you need, and it creates them, wires them together, and manages their lifecycle. You just focus on your business logic.

---

## Real-Time Example: Login System

Let's see a practical example. You're building a login system.

### Without Spring:

\`\`\`java
public class LoginController {
    private LoginService service = new LoginService();
    
    public boolean login(String username, String password) {
        return service.validate(username, password);
    }
}

public class LoginService {
    private UserRepository repo = new UserRepository();
    private PasswordEncoder encoder = new PasswordEncoder();
    
    public boolean validate(String username, String password) {
        User user = repo.findByUsername(username);
        if (user == null) return false;
        
        String hashedPassword = encoder.encode(password);
        return hashedPassword.equals(user.getPassword());
    }
}

public class UserRepository {
    private Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/app");
    
    public User findByUsername(String username) {
        // Query database
    }
}
\`\`\`

Problems:
- LoginController creates LoginService
- LoginService creates UserRepository and PasswordEncoder
- UserRepository creates Connection
- Can't test LoginService without database
- Database URL hardcoded

### With Spring:

\`\`\`java
@Controller
public class LoginController {
    @Autowired
    private LoginService service;  // Spring provides this
}

@Service
public class LoginService {
    @Autowired
    private UserRepository repo;  // Spring provides this
    
    @Autowired
    private PasswordEncoder encoder;  // Spring provides this
    
    public boolean validate(String username, String password) {
        User user = repo.findByUsername(username);
        if (user == null) return false;
        
        String hashedPassword = encoder.encode(password);
        return hashedPassword.equals(user.getPassword());
    }
}

@Repository
public class UserRepository {
    @Autowired
    private DataSource dataSource;  // Spring provides connection
    
    public User findByUsername(String username) {
        // Query database
    }
}
\`\`\`

Benefits:
- No manual object creation
- Dependencies injected automatically
- Easy to test - inject mock repositories
- Configuration in separate files
- Spring manages everything

---

## What Spring Gives You

Spring Framework is not just one thing. It's a collection of modules:

1. **Spring Core** - IOC and Dependency Injection (what we'll focus on first)
2. **Spring MVC** - For building web applications
3. **Spring Data** - For database operations
4. **Spring Security** - For authentication and authorization
5. **Spring AOP** - For cross-cutting concerns (logging, transactions)
6. **Spring Boot** - Makes Spring even easier (but that's for later)

In this course, we'll cover:
- **Spring Core** - IOC, DI, Beans, ApplicationContext
- **Spring MVC** - Building web applications
- **Spring Data** - Simplifying database operations
- **Spring AOP** - Handling cross-cutting concerns

These are the foundations you need to build Spring applications.

---

## The Bottom Line

Traditional Java forces you to:
- Create objects manually
- Manage dependencies yourself
- Mix configuration with code
- Write a lot of boilerplate

Spring Framework:
- Creates objects for you
- Injects dependencies automatically
- Separates configuration from code
- Reduces boilerplate

The result? Cleaner code, easier testing, better maintainability, and faster development.

---

## What's Next?

Now that you understand why Spring exists, let's learn how it works:

1. **IOC (Inversion of Control)** - How Spring creates objects
2. **DI (Dependency Injection)** - How Spring wires dependencies
3. **Beans** - What Spring-managed objects are called
4. **ApplicationContext** - The container that manages everything

These are the building blocks. Master these, and Spring will make sense.

> **Remember:** Spring doesn't change what Java can do. It changes how you write Java code. It makes your code cleaner, more testable, and easier to maintain. That's the real value.
`,
  code: `// Traditional Java vs Spring - Understanding the Problem
// This demonstrates why Spring exists

public class TraditionalJavaProblems {
    public static void main(String[] args) {
        System.out.println("=== TRADITIONAL JAVA PROBLEMS ===");
        System.out.println();
        
        // Problem 1: Tight Coupling
        System.out.println("PROBLEM 1: TIGHT COUPLING");
        System.out.println("-------------------------");
        System.out.println("Traditional Java:");
        System.out.println("  class StudentService {");
        System.out.println("      private StudentRepository repo = new StudentRepository();");
        System.out.println("  }");
        System.out.println("Problem: Can't easily replace StudentRepository");
        System.out.println();
        
        // Problem 2: Object Creation Scattered
        System.out.println("PROBLEM 2: OBJECT CREATION EVERYWHERE");
        System.out.println("-------------------------------------");
        System.out.println("Every class creates its own dependencies:");
        System.out.println("  Controller creates Service");
        System.out.println("  Service creates Repository");
        System.out.println("  Repository creates Connection");
        System.out.println("Problem: Hard to maintain, hard to test");
        System.out.println();
        
        // Problem 3: Hard to Test
        System.out.println("PROBLEM 3: HARD TO TEST");
        System.out.println("-----------------------");
        System.out.println("Can't easily mock dependencies:");
        System.out.println("  Service always uses real Repository");
        System.out.println("  Repository always uses real Database");
        System.out.println("Problem: Tests are slow, need real database");
        System.out.println();
        
        // Problem 4: Configuration in Code
        System.out.println("PROBLEM 4: CONFIGURATION IN CODE");
        System.out.println("-------------------------------");
        System.out.println("Database details hardcoded:");
        System.out.println("  String url = \\"jdbc:mysql://localhost:3306/db\\";");
        System.out.println("  String user = \\"root\\";");
        System.out.println("Problem: Can't change config without recompiling");
        System.out.println();
        
        // Spring Solution
        System.out.println("=== SPRING SOLUTION ===");
        System.out.println();
        System.out.println("Spring provides:");
        System.out.println("1. IOC Container - Creates objects for you");
        System.out.println("2. Dependency Injection - Injects dependencies automatically");
        System.out.println("3. Configuration Management - Separate config from code");
        System.out.println("4. Lifecycle Management - Handles object creation/destruction");
        System.out.println();
        
        System.out.println("With Spring:");
        System.out.println("  @Service");
        System.out.println("  class StudentService {");
        System.out.println("      @Autowired");
        System.out.println("      private StudentRepository repo;  // Spring injects this");
        System.out.println("  }");
        System.out.println();
        
        System.out.println("Benefits:");
        System.out.println("- No manual object creation");
        System.out.println("- Easy to test (inject mocks)");
        System.out.println("- Configuration separate from code");
        System.out.println("- Cleaner, more maintainable code");
    }
}`,
  practiceQuestions: [
    {
      question: 'Explain the main problems with traditional Java that Spring solves',
      hint: 'Think about object creation, dependencies, testing, and configuration',
      starterCode: `// Write your explanation here
// What are the problems with traditional Java?
// How does Spring solve them?

public class SpringBenefits {
    public static void main(String[] args) {
        System.out.println("Traditional Java Problems:");
        System.out.println("1. ");
        System.out.println("2. ");
        System.out.println("3. ");
        System.out.println();
        System.out.println("How Spring Solves Them:");
        System.out.println("1. ");
        System.out.println("2. ");
        System.out.println("3. ");
    }
}`
    }
  ]
};

export default springIntroduction;

