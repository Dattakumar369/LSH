const springAOPIntroduction = {
  id: 'spring-aop-introduction',
  title: 'Spring AOP - Introduction',
  description: 'Understanding Aspect-Oriented Programming and cross-cutting concerns',
  content: `
# Spring AOP - Aspect-Oriented Programming

Have you ever found yourself writing the same code in multiple places? Like logging in every method, or transaction management scattered everywhere? Spring AOP solves this problem by allowing you to separate cross-cutting concerns from your business logic.

---

## What is AOP?

AOP stands for **Aspect-Oriented Programming**. It's a programming paradigm that allows you to separate cross-cutting concerns from your main business logic.

**Cross-cutting concerns** are features that affect multiple parts of your application:
- Logging
- Transaction management
- Security
- Performance monitoring
- Error handling

---

## The Problem: Code Scattered Everywhere

Let's see the problem with traditional approach:

### Without AOP

\`\`\`java
@Service
public class StudentService {
    public void saveStudent(Student student) {
        // Logging code
        System.out.println("Method: saveStudent, Parameters: " + student);
        
        // Transaction code
        try {
            // Business logic
            repository.save(student);
            
            // Logging code
            System.out.println("Student saved successfully");
        } catch (Exception e) {
            // Error handling code
            System.out.println("Error: " + e.getMessage());
            throw e;
        }
    }
    
    public Student getStudent(int id) {
        // Logging code
        System.out.println("Method: getStudent, Parameters: " + id);
        
        // Business logic
        Student student = repository.findById(id);
        
        // Logging code
        System.out.println("Student retrieved: " + student);
        return student;
    }
    
    public void deleteStudent(int id) {
        // Logging code
        System.out.println("Method: deleteStudent, Parameters: " + id);
        
        // Business logic
        repository.deleteById(id);
        
        // Logging code
        System.out.println("Student deleted successfully");
    }
}
\`\`\`

Problems:
1. Logging code is repeated in every method
2. Business logic is mixed with logging
3. If you want to change logging, you must change every method
4. Code is harder to read and maintain

---

## AOP Solution: Separate Concerns

With AOP, you write the logging code once and apply it to multiple methods:

### With AOP

\`\`\`java
@Service
public class StudentService {
    public void saveStudent(Student student) {
        // Only business logic
        repository.save(student);
    }
    
    public Student getStudent(int id) {
        // Only business logic
        return repository.findById(id);
    }
    
    public void deleteStudent(int id) {
        // Only business logic
        repository.deleteById(id);
    }
}
\`\`\`

Clean business logic! Now the logging is handled by an **Aspect** (separate class).

---

## Key AOP Concepts

### 1. Aspect
A class that contains cross-cutting concerns (like logging, transactions).

\`\`\`java
@Aspect
@Component
public class LoggingAspect {
    // Logging logic here
}
\`\`\`

### 2. Join Point
A point in your application where you can apply an aspect (like method execution).

### 3. Pointcut
An expression that defines where the aspect should be applied.

\`\`\`java
@Pointcut("execution(* com.example.service.*.*(..))")
public void serviceMethods() {}
\`\`\`

This means: "Apply to all methods in all classes in com.example.service package"

### 4. Advice
The action taken by an aspect at a join point. Types:
- **Before** - Execute before method
- **After** - Execute after method (success or failure)
- **AfterReturning** - Execute after successful return
- **AfterThrowing** - Execute after exception
- **Around** - Execute before and after (most powerful)

### 5. Target Object
The object where the aspect is applied (like StudentService).

---

## Real-Time Example: Logging Aspect

Let's create a logging aspect:

### Step 1: Enable AOP

\`\`\`java
@Configuration
@EnableAspectJAutoProxy
@ComponentScan("com.example")
public class AppConfig {
}
\`\`\`

### Step 2: Create Logging Aspect

\`\`\`java
@Aspect
@Component
public class LoggingAspect {
    
    // Define pointcut - all methods in service package
    @Pointcut("execution(* com.example.service.*.*(..))")
    public void serviceMethods() {}
    
    // Before advice - runs before method execution
    @Before("serviceMethods()")
    public void logBefore(JoinPoint joinPoint) {
        String methodName = joinPoint.getSignature().getName();
        Object[] args = joinPoint.getArgs();
        System.out.println("Before method: " + methodName + " with args: " + Arrays.toString(args));
    }
    
    // After advice - runs after method execution (success or failure)
    @After("serviceMethods()")
    public void logAfter(JoinPoint joinPoint) {
        String methodName = joinPoint.getSignature().getName();
        System.out.println("After method: " + methodName);
    }
    
    // AfterReturning - runs after successful return
    @AfterReturning(pointcut = "serviceMethods()", returning = "result")
    public void logAfterReturning(JoinPoint joinPoint, Object result) {
        String methodName = joinPoint.getSignature().getName();
        System.out.println("Method " + methodName + " returned: " + result);
    }
    
    // AfterThrowing - runs after exception
    @AfterThrowing(pointcut = "serviceMethods()", throwing = "exception")
    public void logAfterThrowing(JoinPoint joinPoint, Exception exception) {
        String methodName = joinPoint.getSignature().getName();
        System.out.println("Method " + methodName + " threw exception: " + exception.getMessage());
    }
}
\`\`\`

### Step 3: Use Service (No Changes Needed!)

\`\`\`java
@Service
public class StudentService {
    @Autowired
    private StudentRepository repository;
    
    public void saveStudent(Student student) {
        repository.save(student);  // Logging happens automatically!
    }
    
    public Student getStudent(int id) {
        return repository.findById(id);  // Logging happens automatically!
    }
}
\`\`\`

When you call these methods, the logging aspect automatically runs before and after!

---

## Real Example: Transaction Management

AOP is commonly used for transaction management:

\`\`\`java
@Aspect
@Component
public class TransactionAspect {
    
    @Autowired
    private PlatformTransactionManager transactionManager;
    
    @Around("@annotation(com.example.annotation.Transactional)")
    public Object manageTransaction(ProceedingJoinPoint joinPoint) throws Throwable {
        TransactionStatus status = transactionManager.getTransaction(new DefaultTransactionDefinition());
        
        try {
            // Execute the method
            Object result = joinPoint.proceed();
            
            // Commit transaction
            transactionManager.commit(status);
            return result;
        } catch (Exception e) {
            // Rollback on error
            transactionManager.rollback(status);
            throw e;
        }
    }
}
\`\`\`

Now you can use it:

\`\`\`java
@Service
public class OrderService {
    @Transactional  // Custom annotation
    public void placeOrder(Order order) {
        // Multiple database operations
        orderRepository.save(order);
        inventoryService.updateStock(order);
        paymentService.processPayment(order);
        // All in one transaction automatically!
    }
}
\`\`\`

---

## Real Example: Performance Monitoring

\`\`\`java
@Aspect
@Component
public class PerformanceAspect {
    
    @Around("execution(* com.example.service.*.*(..))")
    public Object measureExecutionTime(ProceedingJoinPoint joinPoint) throws Throwable {
        long startTime = System.currentTimeMillis();
        
        try {
            Object result = joinPoint.proceed();
            return result;
        } finally {
            long endTime = System.currentTimeMillis();
            long executionTime = endTime - startTime;
            String methodName = joinPoint.getSignature().getName();
            System.out.println("Method " + methodName + " took " + executionTime + " ms");
        }
    }
}
\`\`\`

This automatically measures execution time of all service methods!

---

## Pointcut Expressions

Pointcuts define where to apply aspects. Common expressions:

### Execution Pointcut
\`\`\`java
// All methods in StudentService
@Pointcut("execution(* com.example.service.StudentService.*(..))")

// All public methods in service package
@Pointcut("execution(public * com.example.service.*.*(..))")

// Methods returning Student
@Pointcut("execution(Student com.example.service.*.*(..))")

// Methods with specific parameters
@Pointcut("execution(* com.example.service.*.*(int, String))")
\`\`\`

### Annotation Pointcut
\`\`\`java
// Methods annotated with @Transactional
@Pointcut("@annotation(org.springframework.transaction.annotation.Transactional)")

// Classes annotated with @Service
@Pointcut("@within(org.springframework.stereotype.Service)")
\`\`\`

### Combined Pointcuts
\`\`\`java
// Methods in service package AND annotated with @Cacheable
@Pointcut("execution(* com.example.service.*.*(..)) && @annotation(org.springframework.cache.annotation.Cacheable)")
\`\`\`

---

## Real Example: Security Aspect

\`\`\`java
@Aspect
@Component
public class SecurityAspect {
    
    @Autowired
    private SecurityService securityService;
    
    @Before("@annotation(com.example.annotation.RequiresRole)")
    public void checkRole(JoinPoint joinPoint, RequiresRole requiresRole) {
        String requiredRole = requiresRole.value();
        if (!securityService.hasRole(requiredRole)) {
            throw new SecurityException("Access denied. Required role: " + requiredRole);
        }
    }
}
\`\`\`

Usage:

\`\`\`java
@Service
public class AdminService {
    @RequiresRole("ADMIN")
    public void deleteUser(int userId) {
        // Only admins can call this
        userRepository.deleteById(userId);
    }
}
\`\`\`

---

## Around Advice - Most Powerful

Around advice can control whether the method executes and modify the result:

\`\`\`java
@Aspect
@Component
public class CachingAspect {
    private Map<String, Object> cache = new HashMap<>();
    
    @Around("execution(* com.example.service.*.get*(..))")
    public Object cacheResult(ProceedingJoinPoint joinPoint) throws Throwable {
        String key = joinPoint.getSignature().getName() + Arrays.toString(joinPoint.getArgs());
        
        // Check cache
        if (cache.containsKey(key)) {
            System.out.println("Returning from cache");
            return cache.get(key);
        }
        
        // Execute method
        Object result = joinPoint.proceed();
        
        // Store in cache
        cache.put(key, result);
        return result;
    }
}
\`\`\`

This automatically caches results of all getter methods!

---

## Benefits of AOP

1. **Separation of Concerns** - Business logic separate from cross-cutting concerns
2. **Code Reusability** - Write once, apply everywhere
3. **Maintainability** - Change logging in one place, affects all methods
4. **Clean Code** - Business logic is cleaner and easier to read
5. **Flexibility** - Easy to add/remove aspects

---

## Common Use Cases

1. **Logging** - Log method entry/exit, parameters, return values
2. **Transactions** - Automatic transaction management
3. **Security** - Authorization checks
4. **Caching** - Automatic result caching
5. **Performance Monitoring** - Measure execution time
6. **Error Handling** - Centralized exception handling
7. **Validation** - Parameter validation

---

## Setting Up Spring AOP

### Maven Dependencies

\`\`\`xml
<dependencies>
    <!-- Spring AOP -->
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-aop</artifactId>
        <version>5.3.21</version>
    </dependency>
    
    <!-- AspectJ Weaver -->
    <dependency>
        <groupId>org.aspectj</groupId>
        <artifactId>aspectjweaver</artifactId>
        <version>1.9.7</version>
    </dependency>
</dependencies>
\`\`\`

### Enable AOP

\`\`\`java
@Configuration
@EnableAspectJAutoProxy
@ComponentScan("com.example")
public class AppConfig {
}
\`\`\`

---

## Common Mistakes

**Mistake 1: Not enabling AOP**
\`\`\`java
// Wrong - AOP won't work
@Configuration
@ComponentScan("com.example")
public class AppConfig {
    // Missing @EnableAspectJAutoProxy
}

// Right
@Configuration
@EnableAspectJAutoProxy
@ComponentScan("com.example")
public class AppConfig {
}
\`\`\`

**Mistake 2: Aspect not a Spring bean**
\`\`\`java
// Wrong - Spring doesn't manage this
@Aspect
public class LoggingAspect {
    // Won't work
}

// Right - Add @Component
@Aspect
@Component
public class LoggingAspect {
    // Works!
}
\`\`\`

**Mistake 3: Wrong pointcut expression**
\`\`\`java
// Wrong - Syntax error
@Pointcut("execution(* com.example.service.*.*)")  // Missing (..)

// Right
@Pointcut("execution(* com.example.service.*.*(..))")
\`\`\`

---

## What's Next?

Now that you understand AOP basics, you can learn:
- Advanced pointcut expressions
- Custom annotations for aspects
- Aspect ordering
- AOP with Spring Boot

> **Key Takeaway:** AOP allows you to separate cross-cutting concerns (logging, transactions, security) from business logic. Write the code once in an Aspect, and it automatically applies to multiple methods. This makes your code cleaner, more maintainable, and easier to understand.
`,
  code: `// Spring AOP Introduction Demo
// Understanding Aspect-Oriented Programming

public class SpringAOPDemo {
    public static void main(String[] args) {
        System.out.println("=== SPRING AOP ===");
        System.out.println();
        
        System.out.println("WHAT IS AOP?");
        System.out.println("-------------");
        System.out.println("Aspect-Oriented Programming");
        System.out.println("Separates cross-cutting concerns from business logic");
        System.out.println();
        
        System.out.println("CROSS-CUTTING CONCERNS:");
        System.out.println("----------------------");
        System.out.println("- Logging");
        System.out.println("- Transaction management");
        System.out.println("- Security");
        System.out.println("- Performance monitoring");
        System.out.println("- Error handling");
        System.out.println();
        
        System.out.println("THE PROBLEM:");
        System.out.println("-----------");
        System.out.println("Without AOP:");
        System.out.println("  - Logging code in every method");
        System.out.println("  - Transaction code scattered");
        System.out.println("  - Business logic mixed with concerns");
        System.out.println("  - Hard to maintain");
        System.out.println();
        
        System.out.println("AOP SOLUTION:");
        System.out.println("-------------");
        System.out.println("Write cross-cutting code once in an Aspect");
        System.out.println("Apply it to multiple methods automatically");
        System.out.println("Business logic stays clean");
        System.out.println();
        
        System.out.println("KEY CONCEPTS:");
        System.out.println("-------------");
        System.out.println("1. Aspect - Class with cross-cutting code");
        System.out.println("2. Join Point - Where aspect is applied");
        System.out.println("3. Pointcut - Expression defining where");
        System.out.println("4. Advice - Action taken (Before, After, Around)");
        System.out.println("5. Target - Object where aspect is applied");
        System.out.println();
        
        System.out.println("EXAMPLE:");
        System.out.println("--------");
        System.out.println("@Aspect");
        System.out.println("@Component");
        System.out.println("class LoggingAspect {");
        System.out.println("    @Before(\\"execution(* service.*.*(..))\\")");
        System.out.println("    public void logBefore(JoinPoint jp) {");
        System.out.println("        System.out.println(\\"Before: \\" + jp.getSignature());");
        System.out.println("    }");
        System.out.println("}");
        System.out.println();
        System.out.println("This automatically logs before all service methods!");
        System.out.println();
        
        System.out.println("BENEFITS:");
        System.out.println("---------");
        System.out.println("1. Separation of concerns");
        System.out.println("2. Code reusability");
        System.out.println("3. Maintainability");
        System.out.println("4. Clean business logic");
        System.out.println("5. Flexibility");
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a logging aspect that logs before and after all service methods',
      hint: 'Use @Aspect, @Component, @Before, @After, and @Pointcut annotations',
      starterCode: `@Aspect
@Component
class LoggingAspect {
    // Define pointcut for all service methods
    // Use: execution(* com.example.service.*.*(..))
    
    // Create @Before advice to log method entry
    // Log method name and parameters
    
    // Create @After advice to log method exit
    // Log method name
    
    // Create @AfterReturning to log return value
    // Use returning parameter
    
    // Create @AfterThrowing to log exceptions
    // Use throwing parameter
}`
    }
  ]
};

export default springAOPIntroduction;

