const springBean = {
  id: 'spring-bean',
  title: 'Spring Bean - Understanding Spring-Managed Objects',
  description: 'What are beans and how Spring manages them',
  content: `
# Spring Bean - What Are They?

In Spring, a "Bean" is just a fancy name for an object that Spring creates and manages. That's it. Nothing complicated.

---

## What is a Bean?

A bean is an object that:
1. Spring creates
2. Spring manages
3. Spring stores in its container
4. Spring can inject into other objects

That's all. It's just a regular Java object, but Spring is in charge of it.

---

## Regular Object vs Bean

Let's see the difference:

**Regular Object (Not a Bean):**
\`\`\`java
StudentService service = new StudentService();  // You create it
\`\`\`
- You create it
- You manage it
- You destroy it
- Spring doesn't know about it

**Bean (Spring-Managed Object):**
\`\`\`java
@Service
public class StudentService {
    // Spring creates this
}

@Autowired
private StudentService service;  // Spring gives you the bean
\`\`\`
- Spring creates it
- Spring manages it
- Spring destroys it
- Spring knows about it

---

## How to Make a Class a Bean

You tell Spring to manage a class by using annotations:

### Common Bean Annotations:

1. **@Component** - Generic bean (use when no specific annotation fits)
\`\`\`java
@Component
public class UtilityClass {
    // Spring manages this
}
\`\`\`

2. **@Service** - For service layer classes
\`\`\`java
@Service
public class StudentService {
    // Spring manages this
}
\`\`\`

3. **@Repository** - For data access layer classes
\`\`\`java
@Repository
public class StudentRepository {
    // Spring manages this
}
\`\`\`

4. **@Controller** - For web controller classes
\`\`\`java
@Controller
public class StudentController {
    // Spring manages this
}
\`\`\`

All of these are just special types of @Component. They tell Spring: "Hey, manage this class as a bean."

---

## Bean Lifecycle

Spring manages the entire lifecycle of a bean:

1. **Instantiation** - Spring creates the object
2. **Dependency Injection** - Spring injects dependencies
3. **Initialization** - Spring calls initialization methods (if any)
4. **Ready to Use** - Bean is available
5. **Destruction** - When application shuts down, Spring destroys the bean

You don't write code for most of this. Spring handles it.

---

## Bean Scope - How Many Instances?

By default, Spring creates only one instance of each bean (singleton). But you can change this:

### Singleton (Default)
\`\`\`java
@Service  // Only one instance created
public class StudentService {
    // ...
}
\`\`\`

Spring creates one StudentService object and reuses it everywhere. If 100 classes need StudentService, they all get the same instance.

### Prototype
\`\`\`java
@Service
@Scope("prototype")  // New instance every time
public class StudentService {
    // ...
}
\`\`\`

Spring creates a new StudentService object every time someone asks for it.

**When to use what?**
- **Singleton** (default) - For services, repositories, controllers (stateless)
- **Prototype** - When each object needs its own state

For most cases, singleton is fine. It's more efficient.

---

## Real-Time Example: Student Management System

Let's see beans in action:

\`\`\`java
// Bean 1: Repository
@Repository
public class StudentRepository {
    public void save(Student student) {
        System.out.println("Saving student: " + student);
    }
}

// Bean 2: Service
@Service
public class StudentService {
    @Autowired
    private StudentRepository repo;  // Spring injects the bean
    
    public void saveStudent(Student student) {
        repo.save(student);
    }
}

// Bean 3: Controller
@Controller
public class StudentController {
    @Autowired
    private StudentService service;  // Spring injects the bean
    
    public void handleRequest(Student student) {
        service.saveStudent(student);
    }
}
\`\`\`

What happens:
1. Spring creates StudentRepository bean
2. Spring creates StudentService bean and injects StudentRepository into it
3. Spring creates StudentController bean and injects StudentService into it
4. All three are beans managed by Spring

---

## Getting Beans from Container

Usually, you use @Autowired and Spring injects beans automatically. But sometimes you need to get a bean manually:

\`\`\`java
ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
StudentService service = context.getBean("studentService", StudentService.class);
\`\`\`

Or with annotation-based configuration:

\`\`\`java
@Autowired
private ApplicationContext context;

public void someMethod() {
    StudentService service = context.getBean(StudentService.class);
}
\`\`\`

Most of the time, you don't need this. @Autowired is easier.

---

## Bean Naming

Spring gives beans names. By default, it uses the class name with first letter lowercase:

\`\`\`java
@Service
public class StudentService {
    // Bean name: "studentService"
}

@Service("myService")  // Custom name
public class StudentService {
    // Bean name: "myService"
}
\`\`\`

You usually don't need to worry about names. Spring figures it out.

---

## Multiple Beans of Same Type

What if you have two implementations of the same interface?

\`\`\`java
public interface PaymentService {
    void processPayment();
}

@Service("creditCardPayment")
public class CreditCardPaymentService implements PaymentService {
    public void processPayment() {
        System.out.println("Processing credit card payment");
    }
}

@Service("paypalPayment")
public class PayPalPaymentService implements PaymentService {
    public void processPayment() {
        System.out.println("Processing PayPal payment");
    }
}
\`\`\`

When you inject:

\`\`\`java
@Service
public class OrderService {
    @Autowired
    @Qualifier("creditCardPayment")  // Specify which bean
    private PaymentService paymentService;
}
\`\`\`

@Qualifier tells Spring which specific bean to inject.

---

## Real Example: E-Commerce with Multiple Payment Methods

\`\`\`java
// Interface
public interface PaymentProcessor {
    boolean process(double amount);
}

// Bean 1: Credit Card
@Service("creditCard")
public class CreditCardProcessor implements PaymentProcessor {
    public boolean process(double amount) {
        System.out.println("Processing $" + amount + " via credit card");
        return true;
    }
}

// Bean 2: PayPal
@Service("paypal")
public class PayPalProcessor implements PaymentProcessor {
    public boolean process(double amount) {
        System.out.println("Processing $" + amount + " via PayPal");
        return true;
    }
}

// Service that uses payment
@Service
public class OrderService {
    @Autowired
    @Qualifier("creditCard")  // Use credit card by default
    private PaymentProcessor paymentProcessor;
    
    public void checkout(Order order, String paymentMethod) {
        if ("paypal".equals(paymentMethod)) {
            // Get PayPal bean
            PaymentProcessor paypal = applicationContext.getBean("paypal", PaymentProcessor.class);
            paypal.process(order.getAmount());
        } else {
            paymentProcessor.process(order.getAmount());
        }
    }
}
\`\`\`

Spring manages all these beans and can inject the right one when needed.

---

## Bean Initialization and Destruction

You can run code when a bean is created or destroyed:

\`\`\`java
@Service
public class DatabaseConnection {
    
    @PostConstruct  // Runs after bean is created
    public void init() {
        System.out.println("Database connection initialized");
        // Open connection, load data, etc.
    }
    
    @PreDestroy  // Runs before bean is destroyed
    public void cleanup() {
        System.out.println("Database connection closed");
        // Close connection, cleanup resources
    }
}
\`\`\`

Spring calls these methods automatically at the right time.

---

## Common Mistakes

**Mistake 1: Forgetting to make a class a bean**
\`\`\`java
// Wrong - Spring doesn't know about this
public class StudentService {
    // ...
}

// Right - Spring manages this
@Service
public class StudentService {
    // ...
}
\`\`\`

**Mistake 2: Trying to use @Autowired on non-beans**
\`\`\`java
@Service
public class StudentService {
    @Autowired
    private UtilityClass util;  // Error if UtilityClass is not a bean
}
\`\`\`

Make sure UtilityClass is also a bean:
\`\`\`java
@Component
public class UtilityClass {
    // Now it's a bean
}
\`\`\`

**Mistake 3: Creating beans manually when Spring should do it**
\`\`\`java
@Service
public class StudentService {
    private StudentRepository repo = new StudentRepository();  // Wrong!
    // Should use @Autowired instead
}
\`\`\`

---

## Bean vs Component - What's the Difference?

People often ask: "What's the difference between a bean and a component?"

Answer: Nothing. They're the same thing.

- **Component** - Generic term for a Spring-managed object
- **Bean** - Another name for the same thing (comes from JavaBeans)

@Component makes a class a bean. @Service, @Repository, @Controller are all special types of @Component, so they also make beans.

---

## What's Next?

Now that you understand beans, let's learn about:

1. **ApplicationContext** - The container that holds all beans
2. **Configuration** - How to configure Spring (XML or annotations)
3. **Spring MVC** - Using Spring for web applications

> **Key Takeaway:** A bean is just a Spring-managed object. You mark a class with @Component (or @Service, @Repository, @Controller), and Spring creates and manages instances of that class. That's all there is to it.
`,
  code: `// Spring Bean Demo
// Understanding what beans are

public class SpringBeanDemo {
    public static void main(String[] args) {
        System.out.println("=== SPRING BEAN ===");
        System.out.println();
        
        // What is a bean?
        System.out.println("WHAT IS A BEAN?");
        System.out.println("---------------");
        System.out.println("A bean is an object that Spring creates and manages");
        System.out.println("It's just a regular Java object, but Spring is in charge");
        System.out.println();
        
        // Regular object vs Bean
        System.out.println("REGULAR OBJECT vs BEAN:");
        System.out.println("----------------------");
        System.out.println("Regular Object:");
        System.out.println("  StudentService service = new StudentService();");
        System.out.println("  - You create it");
        System.out.println("  - You manage it");
        System.out.println("  - Spring doesn't know about it");
        System.out.println();
        System.out.println("Bean:");
        System.out.println("  @Service");
        System.out.println("  class StudentService { }");
        System.out.println("  - Spring creates it");
        System.out.println("  - Spring manages it");
        System.out.println("  - Spring knows about it");
        System.out.println();
        
        // How to make a bean
        System.out.println("HOW TO MAKE A BEAN:");
        System.out.println("------------------");
        System.out.println("Use annotations:");
        System.out.println("  @Component  - Generic bean");
        System.out.println("  @Service    - Service layer");
        System.out.println("  @Repository - Data access layer");
        System.out.println("  @Controller - Web controller");
        System.out.println();
        
        // Example
        System.out.println("EXAMPLE:");
        System.out.println("--------");
        System.out.println("@Repository");
        System.out.println("class StudentRepository { }");
        System.out.println();
        System.out.println("@Service");
        System.out.println("class StudentService {");
        System.out.println("    @Autowired");
        System.out.println("    private StudentRepository repo;  // Spring injects bean");
        System.out.println("}");
        System.out.println();
        
        // Bean scope
        System.out.println("BEAN SCOPE:");
        System.out.println("-----------");
        System.out.println("Singleton (default):");
        System.out.println("  @Service  // One instance for entire application");
        System.out.println();
        System.out.println("Prototype:");
        System.out.println("  @Service");
        System.out.println("  @Scope(\\"prototype\\")  // New instance every time");
        System.out.println();
        
        // Lifecycle
        System.out.println("BEAN LIFECYCLE:");
        System.out.println("---------------");
        System.out.println("1. Spring creates the object");
        System.out.println("2. Spring injects dependencies");
        System.out.println("3. Spring calls @PostConstruct (if any)");
        System.out.println("4. Bean is ready to use");
        System.out.println("5. Spring calls @PreDestroy (if any) when app shuts down");
    }
}`,
  practiceQuestions: [
    {
      question: 'Create multiple bean classes and show how Spring manages them',
      hint: 'Use @Service, @Repository, @Component annotations',
      starterCode: `// Create multiple beans
// 1. Repository bean
@Repository
class ProductRepository {
    public void save(Product product) {
        System.out.println("Product saved: " + product);
    }
}

// 2. Service bean that uses repository
@Service
class ProductService {
    // Inject repository bean here using @Autowired
    
    public void addProduct(Product product) {
        // Use repository to save product
    }
}

// 3. Utility bean
@Component
class ProductValidator {
    public boolean isValid(Product product) {
        return product != null && product.getName() != null;
    }
}

// 4. Controller bean that uses service
@Controller
class ProductController {
    // Inject service bean here
    
    public void handleRequest(Product product) {
        // Use service to add product
    }
}

// Product class
class Product {
    private String name;
    private double price;
    
    public Product(String name, double price) {
        this.name = name;
        this.price = price;
    }
    
    public String getName() { return name; }
    public double getPrice() { return price; }
    
    public String toString() {
        return "Product{name='" + name + "', price=" + price + "}";
    }
}`
    }
  ]
};

export default springBean;

