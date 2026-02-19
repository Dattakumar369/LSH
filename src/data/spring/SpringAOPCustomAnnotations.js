const springAOPCustomAnnotations = {
  id: 'spring-aop-custom-annotations',
  title: 'Spring AOP - Custom Annotations',
  description: 'Creating custom annotations to mark methods for aspect processing',
  content: `
# Spring AOP - Custom Annotations

Custom annotations make your AOP code more readable and maintainable. Instead of complex pointcut expressions, you can create simple annotations to mark methods.

---

## Why Custom Annotations?

Custom annotations provide:
- **Readability** - Clear intent in code
- **Simplicity** - No complex pointcut expressions
- **Reusability** - Use same annotation in multiple places
- **Maintainability** - Change aspect logic in one place

---

## Creating Custom Annotations

### Step 1: Define the Annotation

\`\`\`java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface LogExecution {
    String value() default "";
}
\`\`\`

- \`@Target(ElementType.METHOD)\` - Can be used on methods
- \`@Retention(RetentionPolicy.RUNTIME)\` - Available at runtime (needed for AOP)
- \`String value() default ""\` - Optional parameter

### Step 2: Create Aspect Using Annotation

\`\`\`java
@Aspect
@Component
public class LoggingAspect {
    @Around("@annotation(com.example.annotation.LogExecution)")
    public Object logExecution(ProceedingJoinPoint joinPoint) throws Throwable {
        String methodName = joinPoint.getSignature().getName();
        System.out.println("Executing: " + methodName);
        
        long start = System.currentTimeMillis();
        Object result = joinPoint.proceed();
        long duration = System.currentTimeMillis() - start;
        
        System.out.println("Completed: " + methodName + " in " + duration + "ms");
        return result;
    }
}
\`\`\`

### Step 3: Use the Annotation

\`\`\`java
@Service
public class StudentService {
    @LogExecution
    public void saveStudent(Student student) {
        repository.save(student);
    }
    
    @LogExecution
    public Student getStudent(int id) {
        return repository.findById(id);
    }
}
\`\`\`

Much cleaner than pointcut expressions!

---

## Real-Time Example: Performance Monitoring

### Create Annotation

\`\`\`java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface MeasureTime {
    String description() default "";
}
\`\`\`

### Create Aspect

\`\`\`java
@Aspect
@Component
public class PerformanceAspect {
    @Around("@annotation(com.example.annotation.MeasureTime)")
    public Object measureTime(ProceedingJoinPoint joinPoint, MeasureTime measureTime) throws Throwable {
        String description = measureTime.description();
        if (description.isEmpty()) {
            description = joinPoint.getSignature().getName();
        }
        
        long start = System.currentTimeMillis();
        Object result = joinPoint.proceed();
        long duration = System.currentTimeMillis() - start;
        
        System.out.println(description + " took " + duration + "ms");
        return result;
    }
}
\`\`\`

### Use It

\`\`\`java
@Service
public class OrderService {
    @MeasureTime(description = "Order Processing")
    public void processOrder(Order order) {
        // Process order
    }
    
    @MeasureTime
    public void calculateTotal(Order order) {
        // Calculate total
    }
}
\`\`\`

---

## Real-Time Example: Security Annotation

### Create Annotation

\`\`\`java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface RequiresRole {
    String value();
}
\`\`\`

### Create Aspect

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

### Use It

\`\`\`java
@Service
public class AdminService {
    @RequiresRole("ADMIN")
    public void deleteUser(int userId) {
        userRepository.deleteById(userId);
    }
    
    @RequiresRole("ADMIN")
    public void updateSystemSettings(Settings settings) {
        settingsRepository.save(settings);
    }
}
\`\`\`

---

## Real-Time Example: Caching Annotation

### Create Annotation

\`\`\`java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface CacheResult {
    int duration() default 3600;  // seconds
    String key() default "";
}
\`\`\`

### Create Aspect

\`\`\`java
@Aspect
@Component
public class CachingAspect {
    private Map<String, CacheEntry> cache = new ConcurrentHashMap<>();
    
    @Around("@annotation(com.example.annotation.CacheResult)")
    public Object cacheResult(ProceedingJoinPoint joinPoint, CacheResult cacheResult) throws Throwable {
        String key = generateKey(joinPoint, cacheResult);
        
        // Check cache
        CacheEntry entry = cache.get(key);
        if (entry != null && !entry.isExpired(cacheResult.duration())) {
            return entry.getValue();
        }
        
        // Execute method
        Object result = joinPoint.proceed();
        
        // Store in cache
        cache.put(key, new CacheEntry(result, System.currentTimeMillis()));
        
        return result;
    }
    
    private String generateKey(ProceedingJoinPoint joinPoint, CacheResult cacheResult) {
        if (!cacheResult.key().isEmpty()) {
            return cacheResult.key();
        }
        return joinPoint.getSignature().getName() + Arrays.toString(joinPoint.getArgs());
    }
}
\`\`\`

### Use It

\`\`\`java
@Service
public class ProductService {
    @CacheResult(duration = 1800, key = "allProducts")
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
    
    @CacheResult(duration = 3600)
    public Product getProduct(int id) {
        return productRepository.findById(id);
    }
}
\`\`\`

---

## Real-Time Example: Retry Annotation

### Create Annotation

\`\`\`java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Retry {
    int maxAttempts() default 3;
    long delay() default 1000;  // milliseconds
    Class<? extends Exception>[] retryOn() default {Exception.class};
}
\`\`\`

### Create Aspect

\`\`\`java
@Aspect
@Component
public class RetryAspect {
    @Around("@annotation(com.example.annotation.Retry)")
    public Object retry(ProceedingJoinPoint joinPoint, Retry retry) throws Throwable {
        int attempts = 0;
        Exception lastException = null;
        
        while (attempts < retry.maxAttempts()) {
            try {
                return joinPoint.proceed();
            } catch (Exception e) {
                lastException = e;
                attempts++;
                
                // Check if exception should be retried
                if (!shouldRetry(e, retry.retryOn())) {
                    throw e;
                }
                
                // Wait before retry
                if (attempts < retry.maxAttempts()) {
                    Thread.sleep(retry.delay());
                }
            }
        }
        
        throw lastException;
    }
    
    private boolean shouldRetry(Exception e, Class<? extends Exception>[] retryOn) {
        for (Class<? extends Exception> exceptionClass : retryOn) {
            if (exceptionClass.isInstance(e)) {
                return true;
            }
        }
        return false;
    }
}
\`\`\`

### Use It

\`\`\`java
@Service
public class PaymentService {
    @Retry(maxAttempts = 5, delay = 2000, retryOn = {NetworkException.class})
    public void processPayment(Payment payment) {
        // Process payment - will retry on network errors
    }
}
\`\`\`

---

## Real-Time Example: Transaction Annotation

### Create Annotation

\`\`\`java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface CustomTransactional {
    boolean readOnly() default false;
    int timeout() default -1;
}
\`\`\`

### Create Aspect

\`\`\`java
@Aspect
@Component
public class TransactionAspect {
    @Autowired
    private PlatformTransactionManager transactionManager;
    
    @Around("@annotation(com.example.annotation.CustomTransactional)")
    public Object manageTransaction(ProceedingJoinPoint joinPoint, CustomTransactional customTransactional) throws Throwable {
        DefaultTransactionDefinition definition = new DefaultTransactionDefinition();
        definition.setReadOnly(customTransactional.readOnly());
        if (customTransactional.timeout() > 0) {
            definition.setTimeout(customTransactional.timeout());
        }
        
        TransactionStatus status = transactionManager.getTransaction(definition);
        
        try {
            Object result = joinPoint.proceed();
            transactionManager.commit(status);
            return result;
        } catch (Exception e) {
            transactionManager.rollback(status);
            throw e;
        }
    }
}
\`\`\`

### Use It

\`\`\`java
@Service
public class OrderService {
    @CustomTransactional(readOnly = false, timeout = 30)
    public void placeOrder(Order order) {
        // Multiple database operations in transaction
    }
    
    @CustomTransactional(readOnly = true)
    public Order getOrder(int id) {
        // Read-only transaction
        return orderRepository.findById(id);
    }
}
\`\`\`

---

## Accessing Annotation Parameters

You can access annotation parameters in your aspect:

\`\`\`java
@Aspect
@Component
public class LoggingAspect {
    @Before("@annotation(logExecution)")
    public void logBefore(JoinPoint joinPoint, LogExecution logExecution) {
        String message = logExecution.value();
        if (message.isEmpty()) {
            message = "Executing: " + joinPoint.getSignature().getName();
        }
        System.out.println(message);
    }
}
\`\`\`

---

## Combining Annotations

You can use multiple annotations:

\`\`\`java
@Service
public class OrderService {
    @LogExecution
    @MeasureTime(description = "Order Processing")
    @RequiresRole("USER")
    @CustomTransactional
    public void placeOrder(Order order) {
        // Multiple aspects applied
    }
}
\`\`\`

---

## Annotation on Classes

You can also create class-level annotations:

### Create Annotation

\`\`\`java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface Audited {
    String auditor() default "system";
}
\`\`\`

### Create Aspect

\`\`\`java
@Aspect
@Component
public class AuditAspect {
    @Around("@within(com.example.annotation.Audited)")
    public Object audit(ProceedingJoinPoint joinPoint) throws Throwable {
        // Audit logic for all methods in audited classes
        return joinPoint.proceed();
    }
}
\`\`\`

### Use It

\`\`\`java
@Audited(auditor = "admin")
@Service
public class StudentService {
    // All methods are audited
}
\`\`\`

---

## Best Practices

1. **Clear naming** - Annotation name should clearly indicate purpose
2. **Default values** - Provide sensible defaults for parameters
3. **Documentation** - Document what the annotation does
4. **Single responsibility** - One annotation, one purpose
5. **Reusability** - Design for reuse across different classes

---

## Common Mistakes

**Mistake 1: Missing @Retention(RUNTIME)**
\`\`\`java
// Wrong - Not available at runtime
@Target(ElementType.METHOD)
public @interface LogExecution {}

// Right
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface LogExecution {}
\`\`\`

**Mistake 2: Wrong parameter name in aspect**
\`\`\`java
// Wrong - Parameter name must match annotation
@Before("@annotation(log)")
public void logBefore(JoinPoint joinPoint, LogExecution logExecution) {}

// Right
@Before("@annotation(logExecution)")
public void logBefore(JoinPoint joinPoint, LogExecution logExecution) {}
\`\`\`

**Mistake 3: Not importing annotation**
\`\`\`java
// Wrong - Can't find annotation
@Around("@annotation(LogExecution)")

// Right - Full package name or import
@Around("@annotation(com.example.annotation.LogExecution)")
\`\`\`

---

## What's Next?

Now that you understand custom annotations, learn about:
- Aspect ordering
- AOP with Spring Boot

> **Key Takeaway:** Custom annotations make AOP code more readable and maintainable. Create annotations with @Target and @Retention(RUNTIME), then use @annotation() pointcut to apply aspects. Access annotation parameters in your advice methods.
`,
  code: `// Custom Annotations Demo
// Understanding how to create and use custom annotations for AOP

public class CustomAnnotationsDemo {
    public static void main(String[] args) {
        System.out.println("=== CUSTOM ANNOTATIONS ===");
        System.out.println();
        
        System.out.println("WHY CUSTOM ANNOTATIONS?");
        System.out.println("-----------------------");
        System.out.println("- Readability");
        System.out.println("- Simplicity");
        System.out.println("- Reusability");
        System.out.println("- Maintainability");
        System.out.println();
        
        System.out.println("CREATING ANNOTATION:");
        System.out.println("-------------------");
        System.out.println("@Target(ElementType.METHOD)");
        System.out.println("@Retention(RetentionPolicy.RUNTIME)");
        System.out.println("public @interface LogExecution {");
        System.out.println("    String value() default \\"\\";");
        System.out.println("}");
        System.out.println();
        
        System.out.println("CREATING ASPECT:");
        System.out.println("---------------");
        System.out.println("@Aspect");
        System.out.println("@Component");
        System.out.println("class LoggingAspect {");
        System.out.println("    @Around(\\"@annotation(LogExecution)\\")");
        System.out.println("    public Object log(ProceedingJoinPoint jp, LogExecution log) {");
        System.out.println("        // Aspect logic");
        System.out.println("    }");
        System.out.println("}");
        System.out.println();
        
        System.out.println("USING ANNOTATION:");
        System.out.println("----------------");
        System.out.println("@Service");
        System.out.println("class StudentService {");
        System.out.println("    @LogExecution");
        System.out.println("    public void saveStudent(Student s) { }");
        System.out.println("}");
        System.out.println();
        
        System.out.println("EXAMPLES:");
        System.out.println("---------");
        System.out.println("- @MeasureTime - Performance monitoring");
        System.out.println("- @RequiresRole - Security");
        System.out.println("- @CacheResult - Caching");
        System.out.println("- @Retry - Retry logic");
        System.out.println("- @CustomTransactional - Transactions");
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a custom annotation for method timing and implement the aspect',
      hint: 'Create @MeasureTime annotation with description parameter, then create aspect using @Around',
      starterCode: `// Create annotation
// @Target(ElementType.METHOD)
// @Retention(RetentionPolicy.RUNTIME)
// public @interface MeasureTime {
//     String description() default "";
// }

// Create aspect
@Aspect
@Component
class PerformanceAspect {
    // Use @Around("@annotation(MeasureTime)")
    // Access annotation parameter
    // Measure execution time
    // Log the result
}

// Use annotation
@Service
class StudentService {
    // Add @MeasureTime to methods
}`
    }
  ]
};

export default springAOPCustomAnnotations;

