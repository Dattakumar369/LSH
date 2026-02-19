const springApplicationContext = {
  id: 'spring-applicationcontext',
  title: 'Spring ApplicationContext - The Container',
  description: 'Understanding the container that holds all Spring beans',
  content: `
# ApplicationContext - The Spring Container

ApplicationContext is Spring's container. It's where Spring stores all the beans. Think of it as a warehouse where Spring keeps all the objects it creates.

---

## What is ApplicationContext?

ApplicationContext is an interface that represents Spring's container. It:
1. Creates beans
2. Stores beans
3. Manages bean lifecycle
4. Injects dependencies
5. Provides beans when you need them

It's the heart of Spring Framework.

---

## Real-Life Analogy: Warehouse

Think of ApplicationContext as a warehouse:

- **Warehouse (ApplicationContext)** - Stores all products
- **Products (Beans)** - The objects you need
- **Worker (Spring)** - Fetches products when you ask

When you need a StudentService, you ask the warehouse (ApplicationContext), and it gives you the StudentService bean.

---

## Types of ApplicationContext

Spring provides different implementations of ApplicationContext:

### 1. ClassPathXmlApplicationContext (XML Configuration)

\`\`\`java
ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
StudentService service = context.getBean("studentService", StudentService.class);
\`\`\`

Uses XML file for configuration. Traditional way, but still used.

### 2. AnnotationConfigApplicationContext (Annotation Configuration)

\`\`\`java
ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
StudentService service = context.getBean(StudentService.class);
\`\`\`

Uses Java classes with annotations. Modern way.

### 3. WebApplicationContext (For Web Applications)

Used in web applications. Spring MVC uses this automatically. You usually don't create it manually.

---

## How ApplicationContext Works

Here's the flow:

1. **You create ApplicationContext**
\`\`\`java
ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
\`\`\`

2. **Spring reads configuration** (XML or annotations)

3. **Spring creates all beans** defined in configuration

4. **Spring stores beans in container**

5. **Spring injects dependencies** (wires beans together)

6. **Application is ready**

7. **You can get beans from context**

---

## Getting Beans from ApplicationContext

### Method 1: By Type
\`\`\`java
ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
StudentService service = context.getBean(StudentService.class);
\`\`\`

### Method 2: By Name
\`\`\`java
ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
StudentService service = context.getBean("studentService", StudentService.class);
\`\`\`

### Method 3: By Name Only (Returns Object)
\`\`\`java
Object bean = context.getBean("studentService");
StudentService service = (StudentService) bean;
\`\`\`

Usually, you don't need to get beans manually. You use @Autowired and Spring does it automatically.

---

## Real-Time Example: Complete Application

Let's see ApplicationContext in action:

### Step 1: Configuration Class
\`\`\`java
@Configuration
@ComponentScan("com.example")
public class AppConfig {
    // Spring will scan com.example package for beans
}
\`\`\`

### Step 2: Bean Classes
\`\`\`java
@Repository
public class StudentRepository {
    public void save(Student student) {
        System.out.println("Saving: " + student);
    }
}

@Service
public class StudentService {
    @Autowired
    private StudentRepository repo;
    
    public void saveStudent(Student student) {
        repo.save(student);
    }
}
\`\`\`

### Step 3: Create ApplicationContext
\`\`\`java
public class Main {
    public static void main(String[] args) {
        // Create ApplicationContext
        ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
        
        // Get bean from context
        StudentService service = context.getBean(StudentService.class);
        
        // Use the bean
        service.saveStudent(new Student("John", 20));
    }
}
\`\`\`

What happens:
1. ApplicationContext is created
2. Spring scans for @Repository, @Service, etc.
3. Spring creates StudentRepository bean
4. Spring creates StudentService bean and injects StudentRepository
5. Beans are stored in ApplicationContext
6. You get StudentService from context
7. You use it

---

## ApplicationContext vs BeanFactory

You might hear about BeanFactory. What's the difference?

**BeanFactory** - Basic container (lazy loading, simpler)
**ApplicationContext** - Advanced container (eager loading, more features)

ApplicationContext extends BeanFactory and adds:
- Internationalization
- Event publishing
- Application-layer specific contexts
- Better integration with Spring AOP

For most applications, use ApplicationContext. It's what everyone uses.

---

## ApplicationContext in Web Applications

In web applications (Spring MVC), you don't create ApplicationContext manually. Spring does it automatically.

### web.xml (Traditional)
\`\`\`xml
<context-param>
    <param-name>contextConfigLocation</param-name>
    <param-value>classpath:applicationContext.xml</param-value>
</context-param>

<listener>
    <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
</listener>
\`\`\`

Spring creates ApplicationContext when the web application starts.

### Annotation-Based (Modern)
\`\`\`java
public class WebAppInitializer implements WebApplicationInitializer {
    public void onStartup(ServletContext servletContext) {
        AnnotationConfigWebApplicationContext context = new AnnotationConfigWebApplicationContext();
        context.register(AppConfig.class);
        // Spring manages this
    }
}
\`\`\`

---

## Real Example: E-Commerce Application

\`\`\`java
@Configuration
@ComponentScan("com.shop")
public class ShopConfig {
    // Configuration
}

@Repository
public class ProductRepository {
    public List<Product> findAll() {
        return Arrays.asList(
            new Product("Laptop", 50000),
            new Product("Phone", 20000)
        );
    }
}

@Service
public class ProductService {
    @Autowired
    private ProductRepository repo;
    
    public List<Product> getAllProducts() {
        return repo.findAll();
    }
}

@Controller
public class ProductController {
    @Autowired
    private ProductService service;
    
    public void showProducts() {
        List<Product> products = service.getAllProducts();
        // Display products
    }
}

// Main class
public class Main {
    public static void main(String[] args) {
        ApplicationContext context = new AnnotationConfigApplicationContext(ShopConfig.class);
        
        ProductController controller = context.getBean(ProductController.class);
        controller.showProducts();
    }
}
\`\`\`

ApplicationContext:
1. Creates ProductRepository bean
2. Creates ProductService bean and injects ProductRepository
3. Creates ProductController bean and injects ProductService
4. Stores all beans
5. Provides them when needed

---

## Checking if Bean Exists

You can check if a bean exists in the context:

\`\`\`java
ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);

// Check by type
if (context.containsBean(StudentService.class)) {
    System.out.println("StudentService bean exists");
}

// Check by name
if (context.containsBean("studentService")) {
    System.out.println("studentService bean exists");
}
\`\`\`

---

## Getting All Beans of a Type

You can get all beans that implement a specific interface:

\`\`\`java
ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);

Map<String, PaymentService> paymentServices = context.getBeansOfType(PaymentService.class);

for (String name : paymentServices.keySet()) {
    PaymentService service = paymentServices.get(name);
    System.out.println("Found payment service: " + name);
}
\`\`\`

Useful when you have multiple implementations.

---

## ApplicationContext Lifecycle

1. **Creation** - ApplicationContext is created
2. **Initialization** - Beans are created and dependencies injected
3. **Ready** - Application is ready to use
4. **Shutdown** - ApplicationContext is closed, beans are destroyed

### Closing ApplicationContext

\`\`\`java
AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
// Use context
context.close();  // Shuts down and destroys beans
\`\`\`

In web applications, Spring closes it automatically when the application shuts down.

---

## Common Mistakes

**Mistake 1: Creating multiple ApplicationContext instances**
\`\`\`java
// Wrong - Creates multiple containers
ApplicationContext context1 = new AnnotationConfigApplicationContext(AppConfig.class);
ApplicationContext context2 = new AnnotationConfigApplicationContext(AppConfig.class);

// Right - Create once, reuse
ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
\`\`\`

**Mistake 2: Not closing ApplicationContext in standalone apps**
\`\`\`java
// In standalone applications, close when done
AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
try {
    // Use context
} finally {
    context.close();
}
\`\`\`

**Mistake 3: Trying to get bean that doesn't exist**
\`\`\`java
// This throws NoSuchBeanDefinitionException if bean doesn't exist
StudentService service = context.getBean(StudentService.class);

// Check first
if (context.containsBean(StudentService.class)) {
    StudentService service = context.getBean(StudentService.class);
}
\`\`\`

---

## What's Next?

Now that you understand ApplicationContext, let's learn about:

1. **Spring Configuration** - How to configure Spring (XML or annotations)
2. **Spring MVC** - Using Spring for web applications

> **Key Takeaway:** ApplicationContext is Spring's container. It creates beans, stores them, manages their lifecycle, and provides them when you need them. In most cases, you don't interact with it directly - you use @Autowired and Spring handles everything.
`,
  code: `// ApplicationContext Demo
// Understanding the Spring container

public class ApplicationContextDemo {
    public static void main(String[] args) {
        System.out.println("=== APPLICATIONCONTEXT ===");
        System.out.println();
        
        // What is ApplicationContext?
        System.out.println("WHAT IS APPLICATIONCONTEXT?");
        System.out.println("--------------------------");
        System.out.println("ApplicationContext is Spring's container");
        System.out.println("It stores all the beans (Spring-managed objects)");
        System.out.println();
        
        // Analogy
        System.out.println("REAL-LIFE ANALOGY:");
        System.out.println("------------------");
        System.out.println("ApplicationContext = Warehouse");
        System.out.println("Beans = Products in warehouse");
        System.out.println("When you need a bean, you ask the warehouse");
        System.out.println();
        
        // Types
        System.out.println("TYPES OF APPLICATIONCONTEXT:");
        System.out.println("----------------------------");
        System.out.println("1. ClassPathXmlApplicationContext");
        System.out.println("   - Uses XML configuration");
        System.out.println("   - Traditional way");
        System.out.println();
        System.out.println("2. AnnotationConfigApplicationContext");
        System.out.println("   - Uses annotation configuration");
        System.out.println("   - Modern way");
        System.out.println();
        System.out.println("3. WebApplicationContext");
        System.out.println("   - For web applications");
        System.out.println("   - Spring MVC uses this");
        System.out.println();
        
        // How it works
        System.out.println("HOW IT WORKS:");
        System.out.println("-------------");
        System.out.println("1. You create ApplicationContext");
        System.out.println("2. Spring reads configuration");
        System.out.println("3. Spring creates all beans");
        System.out.println("4. Spring stores beans in container");
        System.out.println("5. Spring injects dependencies");
        System.out.println("6. Application is ready");
        System.out.println();
        
        // Example
        System.out.println("EXAMPLE:");
        System.out.println("--------");
        System.out.println("// Create context");
        System.out.println("ApplicationContext context = ");
        System.out.println("    new AnnotationConfigApplicationContext(AppConfig.class);");
        System.out.println();
        System.out.println("// Get bean");
        System.out.println("StudentService service = context.getBean(StudentService.class);");
        System.out.println();
        System.out.println("// Use bean");
        System.out.println("service.saveStudent(new Student());");
        System.out.println();
        
        // Getting beans
        System.out.println("WAYS TO GET BEANS:");
        System.out.println("------------------");
        System.out.println("1. By type:");
        System.out.println("   context.getBean(StudentService.class);");
        System.out.println();
        System.out.println("2. By name:");
        System.out.println("   context.getBean(\\"studentService\\", StudentService.class);");
        System.out.println();
        System.out.println("3. Using @Autowired (most common):");
        System.out.println("   @Autowired");
        System.out.println("   private StudentService service;");
        System.out.println();
        
        // In web apps
        System.out.println("IN WEB APPLICATIONS:");
        System.out.println("--------------------");
        System.out.println("You don't create ApplicationContext manually");
        System.out.println("Spring creates it automatically when app starts");
        System.out.println("You just use @Autowired");
    }
}`,
  practiceQuestions: [
    {
      question: 'Create an ApplicationContext and retrieve beans from it',
      hint: 'Use AnnotationConfigApplicationContext and getBean() method',
      starterCode: `import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

// Configuration class
@Configuration
@ComponentScan("com.example")
class AppConfig {
    // Spring will scan for beans
}

// Service bean
@Service
class UserService {
    public void processUser(String name) {
        System.out.println("Processing user: " + name);
    }
}

// Main class
public class ApplicationContextExample {
    public static void main(String[] args) {
        // Create ApplicationContext
        // Use AnnotationConfigApplicationContext with AppConfig.class
        
        // Get UserService bean from context
        
        // Use the service
        // service.processUser("John");
        
        // Close the context when done
    }
}`
    }
  ]
};

export default springApplicationContext;

