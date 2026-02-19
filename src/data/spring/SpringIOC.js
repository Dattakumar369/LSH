const springIOC = {
  id: 'spring-ioc',
  title: 'Spring IOC - Inversion of Control',
  description: 'Understanding how Spring takes control of object creation',
  content: `
# IOC - Inversion of Control

IOC stands for Inversion of Control. It's a simple concept, but it's the foundation of Spring. Let me explain it in a way that makes sense.

---

## What is Control?

In normal Java programming, you have control. You decide when to create objects, how to create them, and when to destroy them.

\`\`\`java
// You have control
StudentService service = new StudentService();
service.saveStudent(student);
\`\`\`

You're in charge. You create the object. You use it. You're responsible for everything.

---

## What is Inversion of Control?

Inversion of Control means giving up that control. Instead of you creating objects, someone else (Spring) creates them for you.

**Traditional Way (You have control):**
\`\`\`java
// You create the object
StudentService service = new StudentService();
\`\`\`

**Spring Way (Spring has control):**
\`\`\`java
// Spring creates the object
@Autowired
private StudentService service;  // Spring provides this
\`\`\`

The control is inverted. You're not creating objects anymore. Spring is.

---

## Real-Life Analogy: Restaurant vs Home Cooking

Think of it like this:

**Home Cooking (Traditional Java):**
- You go to the market
- You buy ingredients
- You cook the food
- You clean up
- You have full control, but you do everything yourself

**Restaurant (Spring IOC):**
- You sit at a table
- You order food
- The restaurant prepares it
- The restaurant serves it
- You give up control, but life is easier

Spring is like the restaurant. You just say "I need a StudentService," and Spring creates it and gives it to you.

---

## How IOC Works in Spring

Let's see a practical example:

### Without IOC (Traditional Java):

\`\`\`java
public class StudentController {
    public void saveStudent() {
        // You create the service
        StudentService service = new StudentService();
        service.save(new Student());
    }
}

public class StudentService {
    public void save(Student student) {
        // You create the repository
        StudentRepository repo = new StudentRepository();
        repo.save(student);
    }
}
\`\`\`

You're creating objects everywhere. You have control, but it's a lot of work.

### With IOC (Spring):

\`\`\`java
@Controller
public class StudentController {
    @Autowired
    private StudentService service;  // Spring creates this
    
    public void saveStudent() {
        service.save(new Student());
    }
}

@Service
public class StudentService {
    @Autowired
    private StudentRepository repo;  // Spring creates this
    
    public void save(Student student) {
        repo.save(student);
    }
}
\`\`\`

Spring creates the objects. You just use them. The control is inverted.

---

## The IOC Container

Spring uses something called an IOC Container (also called ApplicationContext). Think of it as a factory that creates and manages objects.

Here's how it works:

1. **You tell Spring what objects you need** (using annotations or XML)
2. **Spring creates those objects** (the container manages them)
3. **Spring gives you the objects when you need them** (dependency injection)

\`\`\`java
// Step 1: Tell Spring about your class
@Service
public class StudentService {
    // Your code
}

// Step 2: Spring creates the object and stores it in the container

// Step 3: When you need it, Spring gives it to you
@Controller
public class StudentController {
    @Autowired
    private StudentService service;  // Spring provides this from container
}
\`\`\`

---

## Real-Time Example: E-Commerce Application

Let's see IOC in a real scenario:

### Without IOC:

\`\`\`java
public class ProductController {
    public void showProducts() {
        // Create service
        ProductService service = new ProductService();
        List<Product> products = service.getAllProducts();
        // Display products
    }
}

public class ProductService {
    public List<Product> getAllProducts() {
        // Create repository
        ProductRepository repo = new ProductRepository();
        return repo.findAll();
    }
}

public class ProductRepository {
    public List<Product> findAll() {
        // Create connection
        Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/shop");
        // Query database
    }
}
\`\`\`

Every class creates its dependencies. It's messy.

### With IOC:

\`\`\`java
@Controller
public class ProductController {
    @Autowired
    private ProductService service;  // Spring provides
    
    public void showProducts() {
        List<Product> products = service.getAllProducts();
    }
}

@Service
public class ProductService {
    @Autowired
    private ProductRepository repo;  // Spring provides
    
    public List<Product> getAllProducts() {
        return repo.findAll();
    }
}

@Repository
public class ProductRepository {
    @Autowired
    private DataSource dataSource;  // Spring provides
    
    public List<Product> findAll() {
        // Use dataSource to query
    }
}
\`\`\`

Spring creates everything. You just use it. Much cleaner.

---

## Benefits of IOC

1. **Less Code** - You don't write object creation code
2. **Loose Coupling** - Classes don't depend on concrete implementations
3. **Easy Testing** - Can inject mocks easily
4. **Centralized Management** - Spring manages object lifecycle
5. **Configuration Flexibility** - Can change implementations without changing code

---

## How Spring Knows What to Create

Spring needs to know which classes to manage. You tell it in two ways:

### Method 1: Annotations (Modern Way)

\`\`\`java
@Service  // Tell Spring: "Manage this class"
public class StudentService {
    // Your code
}

@Repository  // Tell Spring: "Manage this class"
public class StudentRepository {
    // Your code
}

@Controller  // Tell Spring: "Manage this class"
public class StudentController {
    @Autowired
    private StudentService service;  // Spring will inject StudentService
}
\`\`\`

### Method 2: XML Configuration (Traditional Way)

\`\`\`xml
<beans>
    <bean id="studentService" class="com.example.StudentService"/>
    <bean id="studentRepository" class="com.example.StudentRepository"/>
</beans>
\`\`\`

We'll cover both methods in detail later. For now, just know that Spring needs to be told which classes to manage.

---

## The Lifecycle: When Does Spring Create Objects?

Spring creates objects when the container starts. Here's the flow:

1. **Application Starts**
2. **Spring Scans for Annotations** (or reads XML)
3. **Spring Creates Objects** (instantiates classes)
4. **Spring Stores Objects in Container**
5. **Spring Injects Dependencies** (wires them together)
6. **Your Application is Ready**

When you use @Autowired, Spring looks in the container and gives you the object that's already created.

---

## Real Example: Login System

Let's see a complete example:

\`\`\`java
// Step 1: Tell Spring to manage these classes
@Repository
public class UserRepository {
    public User findByUsername(String username) {
        // Query database
        return user;
    }
}

@Service
public class LoginService {
    @Autowired
    private UserRepository repo;  // Spring injects this
    
    public boolean login(String username, String password) {
        User user = repo.findByUsername(username);
        return user != null && user.getPassword().equals(password);
    }
}

@Controller
public class LoginController {
    @Autowired
    private LoginService service;  // Spring injects this
    
    public boolean handleLogin(String username, String password) {
        return service.login(username, password);
    }
}
\`\`\`

What happens:
1. Spring creates UserRepository object
2. Spring creates LoginService object and injects UserRepository into it
3. Spring creates LoginController object and injects LoginService into it
4. Everything is ready to use

You never wrote "new" anywhere. Spring did everything.

---

## Common Misconceptions

**Misconception 1: "IOC is complicated"**
No, it's simple. You're just letting Spring create objects instead of creating them yourself.

**Misconception 2: "IOC is only for big applications"**
No, even small applications benefit from IOC. It makes code cleaner and easier to test.

**Misconception 3: "IOC means I lose control"**
You're giving up control of object creation, but you gain control of your business logic. You focus on what matters.

---

## What's Next?

IOC is just the beginning. Now that Spring creates objects, we need to understand:

1. **Dependency Injection** - How Spring gives objects to other objects
2. **Beans** - What Spring-managed objects are called
3. **ApplicationContext** - The container that holds everything

IOC and Dependency Injection work together. IOC creates objects, DI wires them together.

> **Key Takeaway:** IOC means Spring creates objects for you. Instead of writing "new StudentService()", you use @Autowired and Spring provides it. That's the inversion - you're not in control of creation anymore, Spring is.
`,
  code: `// IOC - Inversion of Control Demo
// Understanding how Spring takes control of object creation

public class IOCDemo {
    public static void main(String[] args) {
        System.out.println("=== IOC - INVERSION OF CONTROL ===");
        System.out.println();
        
        // Traditional Way
        System.out.println("TRADITIONAL JAVA (You have control):");
        System.out.println("-----------------------------------");
        System.out.println("StudentService service = new StudentService();");
        System.out.println("You create the object");
        System.out.println("You manage the object");
        System.out.println("You have full control");
        System.out.println();
        
        // Spring Way
        System.out.println("SPRING WAY (Spring has control):");
        System.out.println("-------------------------------");
        System.out.println("@Autowired");
        System.out.println("private StudentService service;");
        System.out.println("Spring creates the object");
        System.out.println("Spring manages the object");
        System.out.println("Control is inverted");
        System.out.println();
        
        // The Analogy
        System.out.println("REAL-LIFE ANALOGY:");
        System.out.println("------------------");
        System.out.println("Traditional Java = Home Cooking");
        System.out.println("  - You buy ingredients");
        System.out.println("  - You cook");
        System.out.println("  - You clean up");
        System.out.println();
        System.out.println("Spring IOC = Restaurant");
        System.out.println("  - You order");
        System.out.println("  - Restaurant prepares");
        System.out.println("  - Restaurant serves");
        System.out.println();
        
        // How it works
        System.out.println("HOW IOC WORKS:");
        System.out.println("--------------");
        System.out.println("1. You tell Spring what objects you need");
        System.out.println("   @Service");
        System.out.println("   class StudentService { }");
        System.out.println();
        System.out.println("2. Spring creates the object");
        System.out.println("   (Stores in IOC Container)");
        System.out.println();
        System.out.println("3. Spring gives you the object when needed");
        System.out.println("   @Autowired");
        System.out.println("   private StudentService service;");
        System.out.println();
        
        // Benefits
        System.out.println("BENEFITS:");
        System.out.println("---------");
        System.out.println("1. Less code (no 'new' keywords)");
        System.out.println("2. Loose coupling");
        System.out.println("3. Easy testing");
        System.out.println("4. Centralized management");
        System.out.println();
        
        // Example
        System.out.println("EXAMPLE:");
        System.out.println("--------");
        System.out.println("@Controller");
        System.out.println("class StudentController {");
        System.out.println("    @Autowired");
        System.out.println("    private StudentService service;  // Spring provides");
        System.out.println("}");
        System.out.println();
        System.out.println("@Service");
        System.out.println("class StudentService {");
        System.out.println("    @Autowired");
        System.out.println("    private StudentRepository repo;  // Spring provides");
        System.out.println("}");
        System.out.println();
        System.out.println("No 'new' keyword anywhere!");
        System.out.println("Spring creates and wires everything.");
    }
}`,
  practiceQuestions: [
    {
      question: 'Explain IOC in your own words and give a real-world example',
      hint: 'Think about who creates objects - you or Spring?',
      starterCode: `// Explain IOC concept
public class IOCExplanation {
    public static void main(String[] args) {
        System.out.println("What is IOC?");
        System.out.println("------------");
        // Write your explanation here
        
        System.out.println();
        System.out.println("Real-world example:");
        System.out.println("------------------");
        // Give an analogy
        
        System.out.println();
        System.out.println("Traditional Java:");
        System.out.println("-----------------");
        // Show traditional way
        
        System.out.println();
        System.out.println("Spring IOC:");
        System.out.println("-----------");
        // Show Spring way
    }
}`
    }
  ]
};

export default springIOC;

