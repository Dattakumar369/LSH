const springAOPAspectOrdering = {
  id: 'spring-aop-aspect-ordering',
  title: 'Spring AOP - Aspect Ordering',
  description: 'Controlling the order in which multiple aspects are applied',
  content: `
# Spring AOP - Aspect Ordering

When multiple aspects apply to the same method, the order matters. Spring AOP provides ways to control this order.

---

## Why Aspect Ordering Matters

Consider this scenario:

\`\`\`java
@Service
public class OrderService {
    @Transactional
    @LogExecution
    @SecurityCheck
    public void placeOrder(Order order) {
        // Business logic
    }
}
\`\`\`

Three aspects apply. What order should they execute?
1. Security check first (before transaction)
2. Logging second
3. Transaction management last

If security fails, we don't want to start a transaction or log.

---

## Default Ordering

By default, Spring doesn't guarantee aspect order. Aspects may execute in any order. This can cause problems.

---

## Controlling Order with @Order

Use @Order annotation to specify execution order:

\`\`\`java
@Aspect
@Component
@Order(1)  // Lower number = higher priority (executes first)
public class SecurityAspect {
    @Before("execution(* com.example.service.*.*(..))")
    public void checkSecurity(JoinPoint joinPoint) {
        // Security check - should run first
    }
}

@Aspect
@Component
@Order(2)
public class LoggingAspect {
    @Before("execution(* com.example.service.*.*(..))")
    public void logBefore(JoinPoint joinPoint) {
        // Logging - runs after security
    }
}

@Aspect
@Component
@Order(3)
public class TransactionAspect {
    @Around("execution(* com.example.service.*.*(..))")
    public Object manageTransaction(ProceedingJoinPoint joinPoint) throws Throwable {
        // Transaction - runs last
    }
}
\`\`\`

**Rule:** Lower @Order value = Higher priority = Executes first

---

## Real-Time Example: Complete Aspect Chain

### Step 1: Security Aspect (Order 1)

\`\`\`java
@Aspect
@Component
@Order(1)
public class SecurityAspect {
    @Before("execution(* com.example.service.*.*(..))")
    public void checkSecurity(JoinPoint joinPoint) {
        System.out.println("1. Security check");
        // Check if user is authenticated
        if (!securityService.isAuthenticated()) {
            throw new SecurityException("Not authenticated");
        }
    }
}
\`\`\`

### Step 2: Logging Aspect (Order 2)

\`\`\`java
@Aspect
@Component
@Order(2)
public class LoggingAspect {
    @Before("execution(* com.example.service.*.*(..))")
    public void logBefore(JoinPoint joinPoint) {
        System.out.println("2. Logging before: " + joinPoint.getSignature());
    }
    
    @After("execution(* com.example.service.*.*(..))")
    public void logAfter(JoinPoint joinPoint) {
        System.out.println("2. Logging after: " + joinPoint.getSignature());
    }
}
\`\`\`

### Step 3: Transaction Aspect (Order 3)

\`\`\`java
@Aspect
@Component
@Order(3)
public class TransactionAspect {
    @Around("execution(* com.example.service.*.*(..))")
    public Object manageTransaction(ProceedingJoinPoint joinPoint) throws Throwable {
        System.out.println("3. Starting transaction");
        try {
            Object result = joinPoint.proceed();
            System.out.println("3. Committing transaction");
            return result;
        } catch (Exception e) {
            System.out.println("3. Rolling back transaction");
            throw e;
        }
    }
}
\`\`\`

### Execution Order

When calling a service method:
1. Security check (Order 1)
2. Logging before (Order 2)
3. Transaction start (Order 3)
4. Method execution
5. Transaction commit (Order 3)
6. Logging after (Order 2)

---

## Ordering Around Advice

Around advice is special - it wraps the entire execution:

\`\`\`java
@Aspect
@Component
@Order(1)
public class OuterAspect {
    @Around("execution(* com.example.service.*.*(..))")
    public Object outer(ProceedingJoinPoint joinPoint) throws Throwable {
        System.out.println("Outer: Before");
        Object result = joinPoint.proceed();  // Calls next aspect or method
        System.out.println("Outer: After");
        return result;
    }
}

@Aspect
@Component
@Order(2)
public class InnerAspect {
    @Around("execution(* com.example.service.*.*(..))")
    public Object inner(ProceedingJoinPoint joinPoint) throws Throwable {
        System.out.println("Inner: Before");
        Object result = joinPoint.proceed();  // Calls method
        System.out.println("Inner: After");
        return result;
    }
}
\`\`\`

Execution:
1. Outer: Before
2. Inner: Before
3. Method execution
4. Inner: After
5. Outer: After

---

## Ordering Different Advice Types

When you have different advice types on the same pointcut:

\`\`\`java
@Aspect
@Component
@Order(1)
public class Aspect1 {
    @Before("execution(* com.example.service.*.*(..))")
    public void before1() {
        System.out.println("Before 1");
    }
    
    @After("execution(* com.example.service.*.*(..))")
    public void after1() {
        System.out.println("After 1");
    }
}

@Aspect
@Component
@Order(2)
public class Aspect2 {
    @Before("execution(* com.example.service.*.*(..))")
    public void before2() {
        System.out.println("Before 2");
    }
    
    @After("execution(* com.example.service.*.*(..))")
    public void after2() {
        System.out.println("After 2");
    }
}
\`\`\`

Execution:
1. Before 1 (Order 1)
2. Before 2 (Order 2)
3. Method execution
4. After 2 (Order 2 - reverse order)
5. After 1 (Order 1 - reverse order)

**Rule:** Before advice executes in order, After advice executes in reverse order.

---

## Real-Time Example: E-Commerce Order Processing

\`\`\`java
// Order 1: Validation
@Aspect
@Component
@Order(1)
public class ValidationAspect {
    @Before("execution(* com.example.service.OrderService.*(..))")
    public void validate(JoinPoint joinPoint) {
        System.out.println("Validating input");
        // Validate parameters
    }
}

// Order 2: Security
@Aspect
@Component
@Order(2)
public class SecurityAspect {
    @Before("execution(* com.example.service.OrderService.*(..))")
    public void checkSecurity(JoinPoint joinPoint) {
        System.out.println("Checking security");
        // Check permissions
    }
}

// Order 3: Logging
@Aspect
@Component
@Order(3)
public class LoggingAspect {
    @Before("execution(* com.example.service.OrderService.*(..))")
    public void logBefore(JoinPoint joinPoint) {
        System.out.println("Logging before");
    }
}

// Order 4: Transaction
@Aspect
@Component
@Order(4)
public class TransactionAspect {
    @Around("execution(* com.example.service.OrderService.*(..))")
    public Object manageTransaction(ProceedingJoinPoint joinPoint) throws Throwable {
        System.out.println("Starting transaction");
        try {
            return joinPoint.proceed();
        } finally {
            System.out.println("Ending transaction");
        }
    }
}

// Order 5: Performance
@Aspect
@Component
@Order(5)
public class PerformanceAspect {
    @Around("execution(* com.example.service.OrderService.*(..))")
    public Object measureTime(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();
        Object result = joinPoint.proceed();
        long duration = System.currentTimeMillis() - start;
        System.out.println("Execution time: " + duration + "ms");
        return result;
    }
}
\`\`\`

Execution order:
1. Validation
2. Security
3. Logging before
4. Transaction start
5. Performance start
6. Method execution
7. Performance end
8. Transaction end
9. Logging after

---

## Using Ordered Interface

Instead of @Order annotation, implement Ordered interface:

\`\`\`java
@Aspect
@Component
public class SecurityAspect implements Ordered {
    @Override
    public int getOrder() {
        return 1;  // Lower number = higher priority
    }
    
    @Before("execution(* com.example.service.*.*(..))")
    public void checkSecurity(JoinPoint joinPoint) {
        // Security check
    }
}
\`\`\`

---

## Best Practices

1. **Document order** - Add comments explaining why aspects are ordered
2. **Use constants** - Define order values as constants
3. **Keep it simple** - Don't create too many aspects
4. **Test order** - Verify aspects execute in expected order
5. **Consider dependencies** - Order aspects based on dependencies

### Example with Constants

\`\`\`java
public class AspectOrder {
    public static final int SECURITY = 1;
    public static final int VALIDATION = 2;
    public static final int LOGGING = 3;
    public static final int TRANSACTION = 4;
    public static final int PERFORMANCE = 5;
}

@Aspect
@Component
@Order(AspectOrder.SECURITY)
public class SecurityAspect {
    // ...
}
\`\`\`

---

## Common Mistakes

**Mistake 1: Not specifying order**
\`\`\`java
// Wrong - Order is unpredictable
@Aspect
@Component
public class Aspect1 {
    // ...
}

// Right - Specify order
@Aspect
@Component
@Order(1)
public class Aspect1 {
    // ...
}
\`\`\`

**Mistake 2: Wrong order values**
\`\`\`java
// Wrong - Security runs after transaction
@Order(10)  // Higher number = lower priority
public class SecurityAspect {}

@Order(5)   // Lower number = higher priority
public class TransactionAspect {}

// Right - Security runs first
@Order(1)
public class SecurityAspect {}

@Order(5)
public class TransactionAspect {}
\`\`\`

**Mistake 3: Confusing order for different advice types**
\`\`\`java
// Remember: Before executes in order, After executes in reverse
@Order(1)
@Before(...)  // Executes first
@After(...)   // Executes last (reverse order)
\`\`\`

---

## What's Next?

Now that you understand aspect ordering, learn about:
- AOP with Spring Boot

> **Key Takeaway:** Use @Order annotation to control aspect execution order. Lower numbers execute first. Before advice executes in order, After advice executes in reverse order. Around advice wraps everything.
`,
  code: `// Aspect Ordering Demo
// Understanding how to control aspect execution order

public class AspectOrderingDemo {
    public static void main(String[] args) {
        System.out.println("=== ASPECT ORDERING ===");
        System.out.println();
        
        System.out.println("WHY ORDER MATTERS:");
        System.out.println("------------------");
        System.out.println("Multiple aspects may apply to same method");
        System.out.println("Order affects execution flow");
        System.out.println("Example: Security should run before transaction");
        System.out.println();
        
        System.out.println("USING @ORDER:");
        System.out.println("-------------");
        System.out.println("@Aspect");
        System.out.println("@Component");
        System.out.println("@Order(1)  // Lower number = higher priority");
        System.out.println("class SecurityAspect { }");
        System.out.println();
        System.out.println("@Aspect");
        System.out.println("@Component");
        System.out.println("@Order(2)  // Runs after Order 1");
        System.out.println("class LoggingAspect { }");
        System.out.println();
        
        System.out.println("EXECUTION ORDER:");
        System.out.println("---------------");
        System.out.println("Before advice: Order 1 → Order 2 → Method");
        System.out.println("After advice:  Method → Order 2 → Order 1 (reverse)");
        System.out.println();
        
        System.out.println("AROUND ADVICE:");
        System.out.println("-------------");
        System.out.println("Wraps entire execution:");
        System.out.println("  Order 1: Before");
        System.out.println("    Order 2: Before");
        System.out.println("      Method execution");
        System.out.println("    Order 2: After");
        System.out.println("  Order 1: After");
        System.out.println();
        
        System.out.println("BEST PRACTICES:");
        System.out.println("---------------");
        System.out.println("1. Document order");
        System.out.println("2. Use constants");
        System.out.println("3. Keep it simple");
        System.out.println("4. Test order");
        System.out.println("5. Consider dependencies");
    }
}`,
  practiceQuestions: [
    {
      question: 'Create multiple aspects with proper ordering for a service method',
      hint: 'Use @Order annotation, create Security (1), Validation (2), Logging (3), Transaction (4) aspects',
      starterCode: `// Define order constants
class AspectOrder {
    public static final int SECURITY = 1;
    public static final int VALIDATION = 2;
    public static final int LOGGING = 3;
    public static final int TRANSACTION = 4;
}

// Security aspect - Order 1
@Aspect
@Component
@Order(AspectOrder.SECURITY)
class SecurityAspect {
    // @Before advice for security check
}

// Validation aspect - Order 2
@Aspect
@Component
@Order(AspectOrder.VALIDATION)
class ValidationAspect {
    // @Before advice for validation
}

// Logging aspect - Order 3
@Aspect
@Component
@Order(AspectOrder.LOGGING)
class LoggingAspect {
    // @Before and @After advice for logging
}

// Transaction aspect - Order 4
@Aspect
@Component
@Order(AspectOrder.TRANSACTION)
class TransactionAspect {
    // @Around advice for transaction management
}`
    }
  ]
};

export default springAOPAspectOrdering;

