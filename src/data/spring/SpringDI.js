const springDI = {
  id: 'spring-di',
  title: 'Spring DI - Dependency Injection',
  description: 'How Spring automatically wires dependencies together',
  content: `
# DI - Dependency Injection

Dependency Injection is how Spring gives objects to other objects. It sounds fancy, but it's simple. Let me explain.

---

## What is a Dependency?

First, let's understand what a dependency is.

If Class A uses Class B, then A depends on B. Class B is a dependency of Class A.

\`\`\`java
public class StudentService {
    private StudentRepository repo;  // StudentService depends on StudentRepository
    
    public void saveStudent(Student student) {
        repo.save(student);  // Uses StudentRepository
    }
}
\`\`\`

Here, StudentService depends on StudentRepository. StudentRepository is a dependency.

---

## What is Dependency Injection?

Dependency Injection means giving dependencies to a class from outside, instead of the class creating them itself.

**Without DI (Class creates its own dependency):**
\`\`\`java
public class StudentService {
    private StudentRepository repo = new StudentRepository();  // Creates it itself
}
\`\`\`

**With DI (Dependency is injected from outside):**
\`\`\`java
public class StudentService {
    private StudentRepository repo;  // Will be injected
    
    // Constructor injection
    public StudentService(StudentRepository repo) {
        this.repo = repo;  // Dependency is injected
    }
}
\`\`\`

The dependency (StudentRepository) is injected into StudentService. StudentService doesn't create it - it receives it.

---

## Real-Life Analogy: Car and Engine

Think of a car and its engine:

**Without DI:**
- Car builds its own engine
- Car is tightly coupled to that specific engine
- Can't easily replace the engine

**With DI:**
- Engine is built separately
- Engine is injected into the car
- Can easily replace with a different engine

That's dependency injection. The dependency (engine) is provided from outside.

---

## How Spring Does Dependency Injection

Spring automatically injects dependencies. You don't need to write injection code. Spring does it for you.

### Step 1: Tell Spring to Manage Classes

\`\`\`java
@Repository
public class StudentRepository {
    public void save(Student student) {
        // Save to database
    }
}

@Service
public class StudentService {
    // We'll inject StudentRepository here
}
\`\`\`

### Step 2: Tell Spring What Dependencies You Need

\`\`\`java
@Service
public class StudentService {
    @Autowired  // Tell Spring: "I need StudentRepository"
    private StudentRepository repo;
    
    public void saveStudent(Student student) {
        repo.save(student);
    }
}
\`\`\`

### Step 3: Spring Injects the Dependency

When Spring creates StudentService, it sees @Autowired and automatically injects StudentRepository. You don't write any code for this. Spring does it.

---

## Types of Dependency Injection

Spring supports three ways to inject dependencies:

### 1. Constructor Injection (Recommended)

\`\`\`java
@Service
public class StudentService {
    private StudentRepository repo;
    
    // Constructor injection
    public StudentService(StudentRepository repo) {
        this.repo = repo;  // Dependency injected via constructor
    }
}
\`\`\`

**Benefits:**
- Dependencies are required (can't create object without them)
- Easy to test (just pass mock in constructor)
- Immutable (can make field final)

### 2. Setter Injection

\`\`\`java
@Service
public class StudentService {
    private StudentRepository repo;
    
    // Setter injection
    @Autowired
    public void setRepository(StudentRepository repo) {
        this.repo = repo;  // Dependency injected via setter
    }
}
\`\`\`

**Benefits:**
- Dependencies are optional
- Can change dependencies after object creation

### 3. Field Injection (Most Common)

\`\`\`java
@Service
public class StudentService {
    @Autowired
    private StudentRepository repo;  // Dependency injected directly into field
}
\`\`\`

**Benefits:**
- Simplest to write
- Less boilerplate code

**Drawbacks:**
- Harder to test (can't easily inject mocks)
- Field can't be final

For learning, field injection is fine. In production, many prefer constructor injection.

---

## Real-Time Example: E-Commerce System

Let's see DI in a complete example:

\`\`\`java
// Repository Layer
@Repository
public class ProductRepository {
    public List<Product> findAll() {
        // Query database
        return products;
    }
}

// Service Layer
@Service
public class ProductService {
    @Autowired
    private ProductRepository repo;  // DI: Spring injects ProductRepository
    
    public List<Product> getAllProducts() {
        return repo.findAll();
    }
}

// Controller Layer
@Controller
public class ProductController {
    @Autowired
    private ProductService service;  // DI: Spring injects ProductService
    
    public void showProducts() {
        List<Product> products = service.getAllProducts();
        // Display products
    }
}
\`\`\`

What happens:
1. Spring creates ProductRepository
2. Spring creates ProductService and injects ProductRepository into it
3. Spring creates ProductController and injects ProductService into it
4. Everything is wired together automatically

You never wrote code to connect them. Spring did it.

---

## Multiple Dependencies

A class can have multiple dependencies:

\`\`\`java
@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepo;  // First dependency
    
    @Autowired
    private EmailService emailService;  // Second dependency
    
    @Autowired
    private PaymentService paymentService;  // Third dependency
    
    public void placeOrder(Order order) {
        orderRepo.save(order);
        emailService.sendConfirmation(order);
        paymentService.processPayment(order);
    }
}
\`\`\`

Spring injects all three dependencies automatically. No problem.

---

## Dependency Chain

Dependencies can have their own dependencies:

\`\`\`java
@Repository
public class UserRepository {
    @Autowired
    private DataSource dataSource;  // UserRepository depends on DataSource
}

@Service
public class UserService {
    @Autowired
    private UserRepository repo;  // UserService depends on UserRepository
}

@Controller
public class UserController {
    @Autowired
    private UserService service;  // UserController depends on UserService
}
\`\`\`

Spring handles the entire chain:
1. Creates DataSource
2. Creates UserRepository and injects DataSource
3. Creates UserService and injects UserRepository
4. Creates UserController and injects UserService

Spring figures out the order automatically.

---

## Real Example: Login System with Multiple Dependencies

\`\`\`java
@Repository
public class UserRepository {
    @Autowired
    private DataSource dataSource;
    
    public User findByUsername(String username) {
        // Query using dataSource
        return user;
    }
}

@Service
public class LoginService {
    @Autowired
    private UserRepository userRepo;  // First dependency
    
    @Autowired
    private PasswordEncoder encoder;  // Second dependency
    
    @Autowired
    private SessionManager sessionManager;  // Third dependency
    
    public boolean login(String username, String password) {
        User user = userRepo.findByUsername(username);
        if (user == null) return false;
        
        boolean isValid = encoder.matches(password, user.getPassword());
        if (isValid) {
            sessionManager.createSession(user);
        }
        return isValid;
    }
}

@Controller
public class LoginController {
    @Autowired
    private LoginService loginService;  // Dependency
    
    public boolean handleLogin(String username, String password) {
        return loginService.login(username, password);
    }
}
\`\`\`

Spring injects:
- DataSource into UserRepository
- UserRepository, PasswordEncoder, SessionManager into LoginService
- LoginService into LoginController

All automatically. You just use them.

---

## What if Spring Can't Find a Dependency?

If Spring can't find a dependency to inject, it throws an error:

\`\`\`java
@Service
public class StudentService {
    @Autowired
    private StudentRepository repo;  // Spring looks for StudentRepository
}
\`\`\`

If StudentRepository is not marked with @Repository (or @Component), Spring can't find it and throws:
\`NoSuchBeanDefinitionException: No qualifying bean of type 'StudentRepository'\`

**Solution:** Make sure the dependency class is also managed by Spring:
\`\`\`java
@Repository  // This tells Spring to manage this class
public class StudentRepository {
    // ...
}
\`\`\`

---

## Benefits of Dependency Injection

1. **Loose Coupling** - Classes don't depend on concrete implementations
2. **Easy Testing** - Can inject mocks for testing
3. **Flexibility** - Can change implementations easily
4. **Clean Code** - No object creation code in business logic
5. **Centralized Management** - Spring manages all dependencies

---

## Common Mistakes

**Mistake 1: Forgetting @Repository/@Service/@Component**
\`\`\`java
// Wrong - Spring doesn't know about this class
public class StudentRepository {
    // ...
}

// Right - Spring manages this class
@Repository
public class StudentRepository {
    // ...
}
\`\`\`

**Mistake 2: Circular Dependencies**
\`\`\`java
@Service
public class ServiceA {
    @Autowired
    private ServiceB serviceB;  // Depends on ServiceB
}

@Service
public class ServiceB {
    @Autowired
    private ServiceA serviceA;  // Depends on ServiceA - Circular!
}
\`\`\`

This creates a circular dependency. Avoid this by restructuring your code.

**Mistake 3: Using @Autowired on Static Fields**
\`\`\`java
// Wrong - @Autowired doesn't work on static fields
@Autowired
private static StudentRepository repo;

// Right - Use instance fields
@Autowired
private StudentRepository repo;
\`\`\`

---

## IOC vs DI - What's the Difference?

People often confuse IOC and DI. Here's the difference:

- **IOC (Inversion of Control)** - Spring creates objects (you don't use "new")
- **DI (Dependency Injection)** - Spring gives dependencies to objects (wires them together)

IOC is about who creates objects. DI is about how dependencies are provided.

They work together:
1. IOC: Spring creates StudentService and StudentRepository
2. DI: Spring injects StudentRepository into StudentService

---

## What's Next?

Now that you understand DI, let's learn about:

1. **Beans** - What Spring-managed objects are called
2. **ApplicationContext** - The container that holds all beans
3. **Configuration** - How to tell Spring which classes to manage

> **Key Takeaway:** Dependency Injection means Spring automatically provides dependencies to your classes. Instead of writing "new StudentRepository()", you use @Autowired and Spring gives you the StudentRepository object. It's that simple.
`,
  code: `// Dependency Injection Demo
// Understanding how Spring injects dependencies

public class DependencyInjectionDemo {
    public static void main(String[] args) {
        System.out.println("=== DEPENDENCY INJECTION ===");
        System.out.println();
        
        // What is a dependency?
        System.out.println("WHAT IS A DEPENDENCY?");
        System.out.println("---------------------");
        System.out.println("If Class A uses Class B, then A depends on B");
        System.out.println();
        System.out.println("Example:");
        System.out.println("  class StudentService {");
        System.out.println("      private StudentRepository repo;  // Dependency");
        System.out.println("  }");
        System.out.println();
        
        // Without DI
        System.out.println("WITHOUT DI (Class creates dependency):");
        System.out.println("--------------------------------------");
        System.out.println("class StudentService {");
        System.out.println("    private StudentRepository repo = new StudentRepository();");
        System.out.println("}");
        System.out.println("Problem: Tightly coupled, hard to test");
        System.out.println();
        
        // With DI
        System.out.println("WITH DI (Dependency injected from outside):");
        System.out.println("-------------------------------------------");
        System.out.println("class StudentService {");
        System.out.println("    @Autowired");
        System.out.println("    private StudentRepository repo;  // Injected");
        System.out.println("}");
        System.out.println("Benefit: Loose coupling, easy to test");
        System.out.println();
        
        // Types of DI
        System.out.println("TYPES OF DEPENDENCY INJECTION:");
        System.out.println("------------------------------");
        System.out.println("1. Constructor Injection:");
        System.out.println("   public StudentService(StudentRepository repo) {");
        System.out.println("       this.repo = repo;");
        System.out.println("   }");
        System.out.println();
        System.out.println("2. Setter Injection:");
        System.out.println("   @Autowired");
        System.out.println("   public void setRepo(StudentRepository repo) {");
        System.out.println("       this.repo = repo;");
        System.out.println("   }");
        System.out.println();
        System.out.println("3. Field Injection (Most Common):");
        System.out.println("   @Autowired");
        System.out.println("   private StudentRepository repo;");
        System.out.println();
        
        // Example
        System.out.println("COMPLETE EXAMPLE:");
        System.out.println("-----------------");
        System.out.println("@Repository");
        System.out.println("class StudentRepository { }");
        System.out.println();
        System.out.println("@Service");
        System.out.println("class StudentService {");
        System.out.println("    @Autowired");
        System.out.println("    private StudentRepository repo;  // DI happens here");
        System.out.println("}");
        System.out.println();
        System.out.println("Spring automatically injects StudentRepository into StudentService");
        System.out.println();
        
        // Benefits
        System.out.println("BENEFITS:");
        System.out.println("---------");
        System.out.println("1. Loose coupling");
        System.out.println("2. Easy testing (inject mocks)");
        System.out.println("3. Flexible (change implementations)");
        System.out.println("4. Clean code (no 'new' keywords)");
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a service class with multiple dependencies using @Autowired',
      hint: 'Use @Service annotation and @Autowired for each dependency',
      starterCode: `// Create a service with multiple dependencies
@Service
public class OrderService {
    // Add dependencies here using @Autowired
    // 1. OrderRepository
    // 2. EmailService
    // 3. PaymentService
    
    public void placeOrder(Order order) {
        // Use the dependencies here
        // 1. Save order using repository
        // 2. Send email using email service
        // 3. Process payment using payment service
    }
}

// Create the dependency classes
@Repository
class OrderRepository {
    public void save(Order order) {
        System.out.println("Order saved: " + order);
    }
}

@Service
class EmailService {
    public void sendEmail(String to, String message) {
        System.out.println("Email sent to: " + to);
    }
}

@Service
class PaymentService {
    public void processPayment(Order order) {
        System.out.println("Payment processed for order: " + order);
    }
}

// Order class
class Order {
    private String id;
    private double amount;
    
    public Order(String id, double amount) {
        this.id = id;
        this.amount = amount;
    }
    
    public String toString() {
        return "Order{id='" + id + "', amount=" + amount + "}";
    }
}`
    }
  ]
};

export default springDI;

