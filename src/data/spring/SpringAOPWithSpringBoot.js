const springAOPWithSpringBoot = {
  id: 'spring-aop-spring-boot',
  title: 'Spring AOP with Spring Boot',
  description: 'Using AOP in Spring Boot applications with auto-configuration',
  content: `
# Spring AOP with Spring Boot

Spring Boot makes AOP even easier with auto-configuration. Let's see how to use AOP in Spring Boot applications.

---

## Spring Boot AOP Auto-Configuration

Spring Boot automatically configures AOP when it detects:
- Spring AOP on classpath
- @EnableAspectJAutoProxy or @Aspect annotations

You don't need to manually enable AOP in Spring Boot!

---

## Setting Up AOP in Spring Boot

### Step 1: Add Dependencies (pom.xml)

\`\`\`xml
<dependencies>
    <!-- Spring Boot Starter AOP -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-aop</artifactId>
    </dependency>
</dependencies>
\`\`\`

That's it! Spring Boot handles the rest.

### Step 2: Create Aspect

\`\`\`java
@Aspect
@Component
public class LoggingAspect {
    @Before("execution(* com.example.service.*.*(..))")
    public void logBefore(JoinPoint joinPoint) {
        System.out.println("Before: " + joinPoint.getSignature());
    }
}
\`\`\`

No @EnableAspectJAutoProxy needed! Spring Boot does it automatically.

---

## Real-Time Example: Complete Spring Boot AOP Setup

### Application Class

\`\`\`java
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
\`\`\`

No AOP configuration needed!

### Logging Aspect

\`\`\`java
@Aspect
@Component
@Slf4j  // Lombok for logging
public class LoggingAspect {
    @Before("execution(* com.example.service.*.*(..))")
    public void logBefore(JoinPoint joinPoint) {
        log.info("Before method: {}", joinPoint.getSignature());
    }
    
    @AfterReturning(pointcut = "execution(* com.example.service.*.*(..))", returning = "result")
    public void logAfterReturning(JoinPoint joinPoint, Object result) {
        log.info("Method {} returned: {}", joinPoint.getSignature(), result);
    }
    
    @AfterThrowing(pointcut = "execution(* com.example.service.*.*(..))", throwing = "exception")
    public void logAfterThrowing(JoinPoint joinPoint, Exception exception) {
        log.error("Method {} threw exception: {}", joinPoint.getSignature(), exception.getMessage());
    }
}
\`\`\`

### Service

\`\`\`java
@Service
public class StudentService {
    @Autowired
    private StudentRepository repository;
    
    public Student saveStudent(Student student) {
        return repository.save(student);  // Logging happens automatically
    }
    
    public Student getStudent(int id) {
        return repository.findById(id).orElse(null);  // Logging happens automatically
    }
}
\`\`\`

---

## Spring Boot AOP Properties

You can configure AOP behavior in application.properties:

\`\`\`properties
# Enable/disable AOP
spring.aop.auto=true

# Use CGLIB proxy instead of JDK proxy
spring.aop.proxy-target-class=true
\`\`\`

---

## Real-Time Example: Performance Monitoring

\`\`\`java
@Aspect
@Component
@Slf4j
public class PerformanceAspect {
    @Around("@annotation(com.example.annotation.MeasureTime)")
    public Object measureTime(ProceedingJoinPoint joinPoint, MeasureTime measureTime) throws Throwable {
        long start = System.currentTimeMillis();
        
        try {
            Object result = joinPoint.proceed();
            long duration = System.currentTimeMillis() - start;
            
            log.info("Method {} took {}ms", joinPoint.getSignature(), duration);
            
            // Log slow methods
            if (duration > 1000) {
                log.warn("Slow method detected: {} took {}ms", joinPoint.getSignature(), duration);
            }
            
            return result;
        } catch (Exception e) {
            long duration = System.currentTimeMillis() - start;
            log.error("Method {} failed after {}ms", joinPoint.getSignature(), duration);
            throw e;
        }
    }
}
\`\`\`

---

## Real-Time Example: Transaction Management

Spring Boot provides @Transactional, but you can create custom transaction aspects:

\`\`\`java
@Aspect
@Component
@Slf4j
public class TransactionAspect {
    @Autowired
    private PlatformTransactionManager transactionManager;
    
    @Around("@annotation(com.example.annotation.CustomTransactional)")
    public Object manageTransaction(ProceedingJoinPoint joinPoint, CustomTransactional customTransactional) throws Throwable {
        DefaultTransactionDefinition definition = new DefaultTransactionDefinition();
        definition.setReadOnly(customTransactional.readOnly());
        
        TransactionStatus status = transactionManager.getTransaction(definition);
        log.debug("Transaction started for: {}", joinPoint.getSignature());
        
        try {
            Object result = joinPoint.proceed();
            transactionManager.commit(status);
            log.debug("Transaction committed for: {}", joinPoint.getSignature());
            return result;
        } catch (Exception e) {
            transactionManager.rollback(status);
            log.error("Transaction rolled back for: {}", joinPoint.getSignature(), e);
            throw e;
        }
    }
}
\`\`\`

---

## Real-Time Example: Caching with AOP

\`\`\`java
@Aspect
@Component
@Slf4j
public class CachingAspect {
    private final Map<String, CacheEntry> cache = new ConcurrentHashMap<>();
    
    @Around("@annotation(com.example.annotation.Cacheable)")
    public Object cacheResult(ProceedingJoinPoint joinPoint, Cacheable cacheable) throws Throwable {
        String key = generateKey(joinPoint, cacheable);
        
        // Check cache
        CacheEntry entry = cache.get(key);
        if (entry != null && !entry.isExpired(cacheable.duration())) {
            log.debug("Cache hit for: {}", key);
            return entry.getValue();
        }
        
        // Cache miss - execute method
        log.debug("Cache miss for: {}", key);
        Object result = joinPoint.proceed();
        
        // Store in cache
        cache.put(key, new CacheEntry(result, System.currentTimeMillis()));
        
        return result;
    }
    
    private String generateKey(ProceedingJoinPoint joinPoint, Cacheable cacheable) {
        if (!cacheable.key().isEmpty()) {
            return cacheable.key();
        }
        return joinPoint.getSignature().getName() + Arrays.toString(joinPoint.getArgs());
    }
}
\`\`\`

---

## Real-Time Example: Security with AOP

\`\`\`java
@Aspect
@Component
@Slf4j
public class SecurityAspect {
    @Autowired
    private SecurityService securityService;
    
    @Before("@annotation(com.example.annotation.RequiresRole)")
    public void checkRole(JoinPoint joinPoint, RequiresRole requiresRole) {
        String requiredRole = requiresRole.value();
        String currentUser = securityService.getCurrentUser();
        
        log.debug("Checking role {} for user {} on method {}", 
                 requiredRole, currentUser, joinPoint.getSignature());
        
        if (!securityService.hasRole(currentUser, requiredRole)) {
            log.warn("Access denied for user {} on method {}", 
                    currentUser, joinPoint.getSignature());
            throw new SecurityException("Access denied. Required role: " + requiredRole);
        }
        
        log.debug("Access granted for user {} on method {}", 
                 currentUser, joinPoint.getSignature());
    }
}
\`\`\`

---

## Real-Time Example: API Request/Response Logging

\`\`\`java
@Aspect
@Component
@Slf4j
public class ApiLoggingAspect {
    @Around("@within(org.springframework.web.bind.annotation.RestController)")
    public Object logApiCall(ProceedingJoinPoint joinPoint) throws Throwable {
        String methodName = joinPoint.getSignature().getName();
        Object[] args = joinPoint.getArgs();
        
        log.info("API Call - Method: {}, Arguments: {}", methodName, Arrays.toString(args));
        
        long start = System.currentTimeMillis();
        try {
            Object result = joinPoint.proceed();
            long duration = System.currentTimeMillis() - start;
            
            log.info("API Response - Method: {}, Duration: {}ms, Result: {}", 
                    methodName, duration, result);
            
            return result;
        } catch (Exception e) {
            long duration = System.currentTimeMillis() - start;
            log.error("API Error - Method: {}, Duration: {}ms, Error: {}", 
                     methodName, duration, e.getMessage());
            throw e;
        }
    }
}
\`\`\`

---

## Testing AOP in Spring Boot

### Unit Test

\`\`\`java
@SpringBootTest
class LoggingAspectTest {
    @Autowired
    private StudentService studentService;
    
    @Test
    void testAspectApplied() {
        // When service method is called, aspect should execute
        studentService.saveStudent(new Student("John", 20));
        
        // Verify aspect executed (check logs or use mock)
    }
}
\`\`\`

---

## Spring Boot AOP Best Practices

1. **Use @Component** - Make aspects Spring beans
2. **Use SLF4J** - For logging in aspects
3. **Order aspects** - Use @Order for multiple aspects
4. **Test aspects** - Verify they work correctly
5. **Monitor performance** - AOP adds overhead
6. **Use custom annotations** - More readable than pointcuts

---

## Common Mistakes

**Mistake 1: Not adding dependency**
\`\`\`xml
<!-- Wrong - AOP won't work -->
<dependencies>
    <!-- Missing spring-boot-starter-aop -->
</dependencies>

<!-- Right -->
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-aop</artifactId>
    </dependency>
</dependencies>
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

**Mistake 3: Calling method on same class**
\`\`\`java
@Service
public class StudentService {
    public void method1() {
        method2();  // AOP won't work - internal call
    }
    
    public void method2() {
        // Aspect won't apply here
    }
}

// Solution: Use self-injection or extract to separate service
\`\`\`

---

## What's Next?

You've now mastered Spring AOP! You can:
- Create complex pointcut expressions
- Use custom annotations
- Control aspect ordering
- Use AOP in Spring Boot

> **Key Takeaway:** Spring Boot makes AOP easier with auto-configuration. Just add spring-boot-starter-aop dependency and create @Aspect classes with @Component. Spring Boot handles the rest automatically. Use SLF4J for logging and @Order for controlling execution order.
`,
  code: `// Spring Boot AOP Demo
// Understanding AOP in Spring Boot

public class SpringBootAOPDemo {
    public static void main(String[] args) {
        System.out.println("=== SPRING BOOT AOP ===");
        System.out.println();
        
        System.out.println("AUTO-CONFIGURATION:");
        System.out.println("-------------------");
        System.out.println("Spring Boot automatically configures AOP");
        System.out.println("No @EnableAspectJAutoProxy needed");
        System.out.println("Just add dependency and create aspects");
        System.out.println();
        
        System.out.println("DEPENDENCY:");
        System.out.println("----------");
        System.out.println("<dependency>");
        System.out.println("    <groupId>org.springframework.boot</groupId>");
        System.out.println("    <artifactId>spring-boot-starter-aop</artifactId>");
        System.out.println("</dependency>");
        System.out.println();
        
        System.out.println("CREATING ASPECT:");
        System.out.println("---------------");
        System.out.println("@Aspect");
        System.out.println("@Component");
        System.out.println("class LoggingAspect {");
        System.out.println("    @Before(\\"execution(* service.*.*(..))\\")");
        System.out.println("    public void log(JoinPoint jp) { }");
        System.out.println("}");
        System.out.println();
        
        System.out.println("NO CONFIGURATION NEEDED:");
        System.out.println("----------------------");
        System.out.println("@SpringBootApplication");
        System.out.println("class Application { }");
        System.out.println("// AOP works automatically!");
        System.out.println();
        
        System.out.println("PROPERTIES:");
        System.out.println("----------");
        System.out.println("spring.aop.auto=true");
        System.out.println("spring.aop.proxy-target-class=true");
        System.out.println();
        
        System.out.println("BEST PRACTICES:");
        System.out.println("---------------");
        System.out.println("1. Use @Component for aspects");
        System.out.println("2. Use SLF4J for logging");
        System.out.println("3. Use @Order for multiple aspects");
        System.out.println("4. Test aspects");
        System.out.println("5. Monitor performance");
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a complete Spring Boot application with AOP for logging and performance monitoring',
      hint: 'Add spring-boot-starter-aop dependency, create aspects with @Aspect and @Component, use SLF4J for logging',
      starterCode: `// Spring Boot Application
@SpringBootApplication
class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

// Logging Aspect
@Aspect
@Component
@Slf4j
class LoggingAspect {
    // @Before advice for all service methods
    // Log method entry with parameters
    
    // @AfterReturning advice
    // Log method exit with return value
    
    // @AfterThrowing advice
    // Log exceptions
}

// Performance Aspect
@Aspect
@Component
@Slf4j
class PerformanceAspect {
    // @Around advice for all service methods
    // Measure execution time
    // Log slow methods (> 1000ms)
}

// Service
@Service
class StudentService {
    // Methods that will be intercepted
}`
    }
  ]
};

export default springAOPWithSpringBoot;

