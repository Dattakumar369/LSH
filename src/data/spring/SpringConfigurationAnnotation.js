const springConfigurationAnnotation = {
  id: 'spring-configuration-annotation',
  title: 'Spring Annotation Configuration',
  description: 'The modern way to configure Spring using annotations',
  content: `
# Spring Annotation Configuration

Annotation-based configuration is the modern way to configure Spring. It's cleaner, easier, and what most developers use today. Let's learn how it works.

---

## Why Annotations?

Annotations keep configuration close to code. Instead of writing XML files, you add annotations directly to your classes. It's simpler and more intuitive.

---

## Enabling Annotation Configuration

First, tell Spring to scan for annotations. You can do this in two ways:

### Method 1: XML Configuration (Enable Component Scanning)

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
                           http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/context
                           http://www.springframework.org/schema/context/spring-context.xsd">

    <context:component-scan base-package="com.example"/>

</beans>
\`\`\`

\`<context:component-scan>\` tells Spring to scan the \`com.example\` package for annotated classes.

### Method 2: Java Configuration (Recommended)

\`\`\`java
@Configuration
@ComponentScan("com.example")
public class AppConfig {
    // Configuration class
}
\`\`\`

\`@Configuration\` marks this as a configuration class.
\`@ComponentScan\` tells Spring to scan for components in the specified package.

---

## Core Annotations

### @Component - Generic Bean

\`\`\`java
@Component
public class UtilityClass {
    public void doSomething() {
        System.out.println("Doing something");
    }
}
\`\`\`

Marks a class as a Spring component (bean). Spring will create and manage instances.

### @Service - Service Layer

\`\`\`java
@Service
public class StudentService {
    public void saveStudent(Student student) {
        System.out.println("Saving student: " + student);
    }
}
\`\`\`

Use for service layer classes. It's the same as @Component, but more semantic.

### @Repository - Data Access Layer

\`\`\`java
@Repository
public class StudentRepository {
    public void save(Student student) {
        System.out.println("Saving to database: " + student);
    }
}
\`\`\`

Use for data access classes. Spring provides additional features like exception translation.

### @Controller - Web Controller

\`\`\`java
@Controller
public class StudentController {
    public void handleRequest() {
        System.out.println("Handling request");
    }
}
\`\`\`

Use for web controllers (Spring MVC). We'll cover this in detail later.

---

## Dependency Injection with Annotations

### @Autowired - Automatic Injection

\`\`\`java
@Service
public class StudentService {
    @Autowired
    private StudentRepository repo;  // Spring injects this automatically
    
    public void saveStudent(Student student) {
        repo.save(student);
    }
}
\`\`\`

\`@Autowired\` tells Spring to inject a dependency. Spring finds the matching bean and injects it.

---

## Real-Time Example: Complete Application

Let's build a complete student management system using annotations:

### Step 1: Configuration Class

\`\`\`java
@Configuration
@ComponentScan("com.example")
public class AppConfig {
    // Spring will scan com.example package for beans
}
\`\`\`

### Step 2: Repository Layer

\`\`\`java
@Repository
public class StudentRepository {
    public void save(Student student) {
        System.out.println("Saving student: " + student.getName());
    }
    
    public Student findById(int id) {
        return new Student("John", 20);
    }
}
\`\`\`

### Step 3: Service Layer

\`\`\`java
@Service
public class StudentService {
    @Autowired
    private StudentRepository repo;  // Injected automatically
    
    public void saveStudent(Student student) {
        repo.save(student);
    }
    
    public Student getStudent(int id) {
        return repo.findById(id);
    }
}
\`\`\`

### Step 4: Controller Layer

\`\`\`java
@Controller
public class StudentController {
    @Autowired
    private StudentService service;  // Injected automatically
    
    public void handleSaveRequest(Student student) {
        service.saveStudent(student);
    }
}
\`\`\`

### Step 5: Main Class

\`\`\`java
public class Main {
    public static void main(String[] args) {
        ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
        
        StudentController controller = context.getBean(StudentController.class);
        controller.handleSaveRequest(new Student("John", 20));
    }
}
\`\`\`

What happens:
1. Spring scans \`com.example\` package
2. Finds @Repository, @Service, @Controller classes
3. Creates beans for them
4. Injects dependencies using @Autowired
5. Application is ready

---

## Constructor Injection with Annotations

You can use constructor injection instead of field injection:

\`\`\`java
@Service
public class StudentService {
    private StudentRepository repo;
    
    @Autowired  // Optional in newer Spring versions
    public StudentService(StudentRepository repo) {
        this.repo = repo;
    }
}
\`\`\`

In Spring 4.3+, if a class has only one constructor, @Autowired is optional.

---

## Setter Injection with Annotations

\`\`\`java
@Service
public class StudentService {
    private StudentRepository repo;
    
    @Autowired
    public void setRepository(StudentRepository repo) {
        this.repo = repo;
    }
}
\`\`\`

---

## @Qualifier - Choosing Between Multiple Beans

If you have multiple beans of the same type:

\`\`\`java
public interface PaymentService {
    void processPayment();
}

@Service("creditCard")
public class CreditCardService implements PaymentService {
    public void processPayment() {
        System.out.println("Processing via credit card");
    }
}

@Service("paypal")
public class PayPalService implements PaymentService {
    public void processPayment() {
        System.out.println("Processing via PayPal");
    }
}
\`\`\`

When injecting, use @Qualifier to specify which one:

\`\`\`java
@Service
public class OrderService {
    @Autowired
    @Qualifier("creditCard")  // Specify which implementation
    private PaymentService paymentService;
}
\`\`\`

---

## @Primary - Default Bean

You can mark one bean as primary:

\`\`\`java
@Service
@Primary  // This will be injected by default
public class CreditCardService implements PaymentService {
    // ...
}

@Service
public class PayPalService implements PaymentService {
    // ...
}
\`\`\`

When you inject PaymentService without @Qualifier, Spring uses the @Primary one.

---

## @Value - Injecting Properties

You can inject values from properties files:

\`\`\`java
@Service
public class DatabaseConfig {
    @Value("\${db.url}")
    private String url;
    
    @Value("\${db.username}")
    private String username;
    
    @Value("\${db.password}")
    private String password;
}
\`\`\`

Properties file (\`application.properties\`):
\`\`\`
db.url=jdbc:mysql://localhost:3306/mydb
db.username=root
db.password=password123
\`\`\`

Enable property loading:
\`\`\`java
@Configuration
@PropertySource("classpath:application.properties")
@ComponentScan("com.example")
public class AppConfig {
}
\`\`\`

---

## @PostConstruct and @PreDestroy

Run code when bean is created or destroyed:

\`\`\`java
@Service
public class DatabaseConnection {
    
    @PostConstruct
    public void init() {
        System.out.println("Database connection initialized");
        // Open connection, load data
    }
    
    @PreDestroy
    public void cleanup() {
        System.out.println("Closing database connection");
        // Close connection, cleanup
    }
}
\`\`\`

---

## Real Example: E-Commerce with Annotations

\`\`\`java
@Configuration
@ComponentScan("com.shop")
@PropertySource("classpath:application.properties")
public class ShopConfig {
}

@Repository
public class ProductRepository {
    @Autowired
    private DataSource dataSource;
    
    public List<Product> findAll() {
        // Query using dataSource
        return products;
    }
}

@Service
public class ProductService {
    @Autowired
    private ProductRepository repo;
    
    @Autowired
    private EmailService emailService;
    
    public void addProduct(Product product) {
        repo.save(product);
        emailService.sendNotification("New product added");
    }
}

@Controller
public class ProductController {
    @Autowired
    private ProductService service;
    
    public void handleAddProduct(Product product) {
        service.addProduct(product);
    }
}
\`\`\`

All configured with annotations. No XML needed.

---

## Annotation vs XML - When to Use What?

**Use Annotations When:**
- Building new applications
- Want cleaner, more readable code
- Configuration is stable (doesn't change often)
- Team is comfortable with annotations

**Use XML When:**
- Working with legacy applications
- Configuration needs to change without recompiling
- Prefer centralized configuration
- Team prefers XML

Most modern projects use annotations. They're easier and more intuitive.

---

## Common Mistakes

**Mistake 1: Forgetting @ComponentScan**
\`\`\`java
// Wrong - Spring won't find your beans
@Configuration
public class AppConfig {
    // Missing @ComponentScan
}

// Right
@Configuration
@ComponentScan("com.example")
public class AppConfig {
}
\`\`\`

**Mistake 2: Wrong package in @ComponentScan**
\`\`\`java
// Wrong - Scanning wrong package
@ComponentScan("com.other")  // Your beans are in com.example

// Right
@ComponentScan("com.example")  // Correct package
\`\`\`

**Mistake 3: Forgetting to make dependency a bean**
\`\`\`java
@Service
public class StudentService {
    @Autowired
    private UtilityClass util;  // Error if UtilityClass is not a bean
}

// Solution: Make it a bean
@Component
public class UtilityClass {
    // Now it's a bean
}
\`\`\`

---

## What's Next?

Now that you understand annotation configuration, let's learn:

1. **Spring MVC** - Building web applications with Spring
2. **DispatcherServlet** - The front controller
3. **Controllers** - Handling web requests
4. **ViewResolver** - Resolving views
5. **ModelAndView** - Passing data to views

> **Key Takeaway:** Annotation configuration is the modern way to configure Spring. Use @Component, @Service, @Repository, @Controller to mark beans, and @Autowired to inject dependencies. It's cleaner and easier than XML.
`,
  code: `// Annotation Configuration Demo
// Understanding how to configure Spring with annotations

public class AnnotationConfigurationDemo {
    public static void main(String[] args) {
        System.out.println("=== ANNOTATION CONFIGURATION ===");
        System.out.println();
        
        // What is annotation configuration?
        System.out.println("WHAT IS ANNOTATION CONFIGURATION?");
        System.out.println("----------------------------------");
        System.out.println("Configuration using annotations instead of XML");
        System.out.println("Add annotations to classes, Spring does the rest");
        System.out.println("Modern, cleaner, easier way");
        System.out.println();
        
        // Core annotations
        System.out.println("CORE ANNOTATIONS:");
        System.out.println("-----------------");
        System.out.println("@Component  - Generic bean");
        System.out.println("@Service    - Service layer");
        System.out.println("@Repository - Data access layer");
        System.out.println("@Controller - Web controller");
        System.out.println();
        
        // Enabling annotation scanning
        System.out.println("ENABLING ANNOTATION SCANNING:");
        System.out.println("----------------------------");
        System.out.println("@Configuration");
        System.out.println("@ComponentScan(\\"com.example\\")");
        System.out.println("class AppConfig { }");
        System.out.println();
        
        // Dependency injection
        System.out.println("DEPENDENCY INJECTION:");
        System.out.println("--------------------");
        System.out.println("@Service");
        System.out.println("class StudentService {");
        System.out.println("    @Autowired");
        System.out.println("    private StudentRepository repo;  // Injected");
        System.out.println("}");
        System.out.println();
        
        // Complete example
        System.out.println("COMPLETE EXAMPLE:");
        System.out.println("----------------");
        System.out.println("@Configuration");
        System.out.println("@ComponentScan(\\"com.example\\")");
        System.out.println("class AppConfig { }");
        System.out.println();
        System.out.println("@Repository");
        System.out.println("class StudentRepository { }");
        System.out.println();
        System.out.println("@Service");
        System.out.println("class StudentService {");
        System.out.println("    @Autowired");
        System.out.println("    private StudentRepository repo;");
        System.out.println("}");
        System.out.println();
        System.out.println("@Controller");
        System.out.println("class StudentController {");
        System.out.println("    @Autowired");
        System.out.println("    private StudentService service;");
        System.out.println("}");
        System.out.println();
        
        // Benefits
        System.out.println("BENEFITS:");
        System.out.println("---------");
        System.out.println("1. Cleaner code");
        System.out.println("2. Configuration close to code");
        System.out.println("3. Less verbose than XML");
        System.out.println("4. Type-safe");
        System.out.println("5. IDE support");
        System.out.println();
        
        // When to use
        System.out.println("WHEN TO USE:");
        System.out.println("------------");
        System.out.println("- New applications");
        System.out.println("- Want cleaner code");
        System.out.println("- Configuration is stable");
        System.out.println();
        System.out.println("Most modern projects use annotations");
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a complete Spring application using annotations with service, repository, and controller layers',
      hint: 'Use @Configuration, @ComponentScan, @Service, @Repository, @Controller, and @Autowired',
      starterCode: `// Configuration class
@Configuration
@ComponentScan("com.example")
class AppConfig {
    // Enable component scanning
}

// Repository layer
@Repository
class UserRepository {
    public void save(User user) {
        System.out.println("User saved: " + user);
    }
    
    public User findById(int id) {
        return new User(id, "John");
    }
}

// Service layer
@Service
class UserService {
    // Inject repository using @Autowired
    
    public void saveUser(User user) {
        // Use repository to save
    }
    
    public User getUser(int id) {
        // Use repository to find
        return null;
    }
}

// Controller layer
@Controller
class UserController {
    // Inject service using @Autowired
    
    public void handleRequest(User user) {
        // Use service to save user
    }
}

// User class
class User {
    private int id;
    private String name;
    
    public User(int id, String name) {
        this.id = id;
        this.name = name;
    }
    
    public String toString() {
        return "User{id=" + id + ", name='" + name + "'}";
    }
}

// Main class
public class AnnotationExample {
    public static void main(String[] args) {
        // Create ApplicationContext
        // Get controller bean
        // Use controller
    }
}`
    }
  ]
};

export default springConfigurationAnnotation;

