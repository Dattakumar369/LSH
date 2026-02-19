const springAOPAdvancedPointcuts = {
  id: 'spring-aop-advanced-pointcuts',
  title: 'Spring AOP - Advanced Pointcut Expressions',
  description: 'Mastering complex pointcut expressions for precise aspect targeting',
  content: `
# Spring AOP - Advanced Pointcut Expressions

Pointcut expressions are the heart of AOP. They define exactly where your aspects should be applied. Let's master advanced pointcut expressions.

---

## Pointcut Expression Syntax

Pointcut expressions use AspectJ syntax. The basic format is:

\`\`\`
execution(modifiers? return-type declaring-type? method-name(parameters) throws?)
\`\`\`

Let's break it down with examples.

---

## Basic Execution Pointcuts

### Match All Methods

\`\`\`java
@Pointcut("execution(* *(..))")
public void allMethods() {}
\`\`\`

- \`*\` - Any return type
- \`*(..)\` - Any method name with any parameters

### Match All Methods in a Package

\`\`\`java
@Pointcut("execution(* com.example.service.*.*(..))")
public void allServiceMethods() {}
\`\`\`

- \`com.example.service.*\` - All classes in service package
- \`.*(..)\` - All methods in those classes

### Match Specific Method

\`\`\`java
@Pointcut("execution(* com.example.service.StudentService.saveStudent(..))")
public void saveStudentMethod() {}
\`\`\`

---

## Return Type Patterns

### Match Methods Returning Specific Type

\`\`\`java
// Methods returning Student
@Pointcut("execution(Student com.example.service.*.*(..))")
public void methodsReturningStudent() {}

// Methods returning List
@Pointcut("execution(java.util.List com.example.service.*.*(..))")
public void methodsReturningList() {}

// Methods returning void
@Pointcut("execution(void com.example.service.*.*(..))")
public void voidMethods() {}
\`\`\`

---

## Parameter Patterns

### No Parameters

\`\`\`java
@Pointcut("execution(* com.example.service.*.*())")
public void methodsWithNoParams() {}
\`\`\`

### Specific Number of Parameters

\`\`\`java
// One parameter of any type
@Pointcut("execution(* com.example.service.*.*(*))")
public void methodsWithOneParam() {}

// Two parameters
@Pointcut("execution(* com.example.service.*.*(*, *))")
public void methodsWithTwoParams() {}
\`\`\`

### Specific Parameter Types

\`\`\`java
// Method with int parameter
@Pointcut("execution(* com.example.service.*.*(int))")
public void methodsWithIntParam() {}

// Method with String parameter
@Pointcut("execution(* com.example.service.*.*(String))")
public void methodsWithStringParam() {}

// Method with Student parameter
@Pointcut("execution(* com.example.service.*.*(Student))")
public void methodsWithStudentParam() {}

// Multiple specific types
@Pointcut("execution(* com.example.service.*.*(int, String))")
public void methodsWithIntAndString() {}
\`\`\`

### Any Parameters

\`\`\`java
// Any number of parameters
@Pointcut("execution(* com.example.service.*.*(..))")
public void methodsWithAnyParams() {}
\`\`\`

---

## Modifier Patterns

### Public Methods Only

\`\`\`java
@Pointcut("execution(public * com.example.service.*.*(..))")
public void publicMethods() {}
\`\`\`

### Protected Methods

\`\`\`java
@Pointcut("execution(protected * com.example.service.*.*(..))")
public void protectedMethods() {}
\`\`\`

---

## Combining Pointcuts

### AND (&&)

\`\`\`java
@Pointcut("execution(* com.example.service.*.*(..)) && execution(* *Student*(..))")
public void studentMethods() {}
// Methods in service package AND method name contains "Student"
\`\`\`

### OR (||)

\`\`\`java
@Pointcut("execution(* com.example.service.*.save*(..)) || execution(* com.example.service.*.update*(..))")
public void saveOrUpdateMethods() {}
// Methods starting with "save" OR "update"
\`\`\`

### NOT (!)

\`\`\`java
@Pointcut("execution(* com.example.service.*.*(..)) && !execution(* *get*(..))")
public void nonGetterMethods() {}
// All methods except getters
\`\`\`

---

## Annotation-Based Pointcuts

### Methods with Specific Annotation

\`\`\`java
@Pointcut("@annotation(org.springframework.transaction.annotation.Transactional)")
public void transactionalMethods() {}
\`\`\`

### Classes with Specific Annotation

\`\`\`java
@Pointcut("@within(org.springframework.stereotype.Service)")
public void serviceClasses() {}
\`\`\`

### Methods in Annotated Classes

\`\`\`java
@Pointcut("@target(org.springframework.stereotype.Service)")
public void methodsInServiceClasses() {}
\`\`\`

---

## Real-Time Examples

### Example 1: Log All Service Methods Except Getters

\`\`\`java
@Aspect
@Component
public class LoggingAspect {
    @Pointcut("execution(* com.example.service.*.*(..))")
    public void serviceMethods() {}
    
    @Pointcut("execution(* com.example.service.*.get*(..))")
    public void getterMethods() {}
    
    @Pointcut("serviceMethods() && !getterMethods()")
    public void serviceMethodsExceptGetters() {}
    
    @Before("serviceMethodsExceptGetters()")
    public void logBefore(JoinPoint joinPoint) {
        System.out.println("Before: " + joinPoint.getSignature());
    }
}
\`\`\`

### Example 2: Transaction Management for Save/Update Methods

\`\`\`java
@Aspect
@Component
public class TransactionAspect {
    @Pointcut("execution(* com.example.service.*.save*(..))")
    public void saveMethods() {}
    
    @Pointcut("execution(* com.example.service.*.update*(..))")
    public void updateMethods() {}
    
    @Pointcut("execution(* com.example.service.*.delete*(..))")
    public void deleteMethods() {}
    
    @Pointcut("saveMethods() || updateMethods() || deleteMethods()")
    public void modifyingMethods() {}
    
    @Around("modifyingMethods()")
    public Object manageTransaction(ProceedingJoinPoint joinPoint) throws Throwable {
        // Transaction logic
        return joinPoint.proceed();
    }
}
\`\`\`

### Example 3: Performance Monitoring for Slow Methods

\`\`\`java
@Aspect
@Component
public class PerformanceAspect {
    @Pointcut("execution(* com.example.service.*.*(..))")
    public void allServiceMethods() {}
    
    @Around("allServiceMethods()")
    public Object measureTime(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();
        Object result = joinPoint.proceed();
        long duration = System.currentTimeMillis() - start;
        
        if (duration > 1000) {  // Log slow methods
            System.out.println("Slow method: " + joinPoint.getSignature() + " took " + duration + "ms");
        }
        
        return result;
    }
}
\`\`\`

---

## Within Pointcut

Matches all methods within a type or package:

\`\`\`java
// All methods in StudentService
@Pointcut("within(com.example.service.StudentService)")
public void withinStudentService() {}

// All methods in service package
@Pointcut("within(com.example.service.*)")
public void withinServicePackage() {}

// All methods in service package and subpackages
@Pointcut("within(com.example.service..*)")
public void withinServicePackageAndSubpackages() {}
\`\`\`

---

## Args Pointcut

Matches methods with specific parameter types:

\`\`\`java
// Methods with Student as first parameter
@Pointcut("args(Student)")
public void methodsWithStudentParam() {}

// Methods with int as first parameter
@Pointcut("args(int)")
public void methodsWithIntParam() {}

// Methods with Student and String parameters
@Pointcut("args(Student, String)")
public void methodsWithStudentAndString() {}
\`\`\`

---

## This and Target Pointcuts

### This - Matches when proxy is of specified type

\`\`\`java
@Pointcut("this(com.example.service.StudentService)")
public void thisStudentService() {}
\`\`\`

### Target - Matches when target object is of specified type

\`\`\`java
@Pointcut("target(com.example.service.StudentService)")
public void targetStudentService() {}
\`\`\`

---

## Bean Pointcut

Matches methods in beans with specific names:

\`\`\`java
// Methods in bean named "studentService"
@Pointcut("bean(studentService)")
public void studentServiceBean() {}

// Methods in beans whose name starts with "student"
@Pointcut("bean(student*)")
public void studentBeans() {}
\`\`\`

---

## Combining Multiple Pointcuts

### Complex Example: Logging for Specific Scenarios

\`\`\`java
@Aspect
@Component
public class ComplexLoggingAspect {
    // Base pointcuts
    @Pointcut("execution(* com.example.service.*.*(..))")
    public void serviceMethods() {}
    
    @Pointcut("execution(* com.example.service.*.save*(..))")
    public void saveMethods() {}
    
    @Pointcut("execution(* com.example.service.*.get*(..))")
    public void getterMethods() {}
    
    @Pointcut("@annotation(org.springframework.transaction.annotation.Transactional)")
    public void transactionalMethods() {}
    
    // Combined pointcuts
    @Pointcut("serviceMethods() && saveMethods() && transactionalMethods()")
    public void transactionalSaveMethods() {}
    
    @Pointcut("serviceMethods() && !getterMethods()")
    public void nonGetterServiceMethods() {}
    
    @Pointcut("serviceMethods() && args(Student)")
    public void methodsWithStudentParam() {}
    
    // Apply advice
    @Before("transactionalSaveMethods()")
    public void logTransactionalSave(JoinPoint joinPoint) {
        System.out.println("Transactional save: " + joinPoint.getSignature());
    }
    
    @Before("nonGetterServiceMethods()")
    public void logNonGetters(JoinPoint joinPoint) {
        System.out.println("Non-getter method: " + joinPoint.getSignature());
    }
}
\`\`\`

---

## Real Example: E-Commerce Security Aspect

\`\`\`java
@Aspect
@Component
public class SecurityAspect {
    // Admin methods
    @Pointcut("execution(* com.example.service.*.delete*(..))")
    public void deleteMethods() {}
    
    @Pointcut("execution(* com.example.service.*.update*(..))")
    public void updateMethods() {}
    
    // User methods
    @Pointcut("execution(* com.example.service.*.get*(..))")
    public void getterMethods() {}
    
    @Pointcut("execution(* com.example.service.*.find*(..))")
    public void findMethods() {}
    
    // Admin operations
    @Pointcut("deleteMethods() || updateMethods()")
    public void adminOperations() {}
    
    // User operations
    @Pointcut("getterMethods() || findMethods()")
    public void userOperations() {}
    
    @Before("adminOperations()")
    public void checkAdminAccess(JoinPoint joinPoint) {
        // Check if user is admin
        if (!securityService.isAdmin()) {
            throw new SecurityException("Admin access required");
        }
    }
    
    @Before("userOperations()")
    public void checkUserAccess(JoinPoint joinPoint) {
        // Check if user is logged in
        if (!securityService.isLoggedIn()) {
            throw new SecurityException("Login required");
        }
    }
}
\`\`\`

---

## Pointcut Best Practices

1. **Use named pointcuts** - More readable and reusable
2. **Combine simple pointcuts** - Build complex ones from simple ones
3. **Be specific** - Don't match more than you need
4. **Document pointcuts** - Add comments explaining what they match
5. **Test pointcuts** - Verify they match what you expect

---

## Common Mistakes

**Mistake 1: Wrong package syntax**
\`\`\`java
// Wrong - Missing .* for methods
@Pointcut("execution(* com.example.service.*)")

// Right
@Pointcut("execution(* com.example.service.*.*(..))")
\`\`\`

**Mistake 2: Wrong parameter syntax**
\`\`\`java
// Wrong - Missing parentheses
@Pointcut("execution(* com.example.service.*.*")

// Right
@Pointcut("execution(* com.example.service.*.*(..))")
\`\`\`

**Mistake 3: Not escaping special characters**
\`\`\`java
// Wrong - Special characters in package name
@Pointcut("execution(* com.example.service-impl.*.*(..))")

// Right - Escape or use different syntax
@Pointcut("within(com.example.service-impl)")
\`\`\`

---

## What's Next?

Now that you understand advanced pointcuts, learn about:
- Custom annotations for aspects
- Aspect ordering
- AOP with Spring Boot

> **Key Takeaway:** Advanced pointcut expressions let you precisely target where aspects apply. Combine simple pointcuts to create complex ones. Use execution, within, args, and annotation-based pointcuts for maximum flexibility.
`,
  code: `// Advanced Pointcuts Demo
// Understanding complex pointcut expressions

public class AdvancedPointcutsDemo {
    public static void main(String[] args) {
        System.out.println("=== ADVANCED POINTCUTS ===");
        System.out.println();
        
        System.out.println("BASIC SYNTAX:");
        System.out.println("-------------");
        System.out.println("execution(modifiers? return-type declaring-type? method-name(parameters))");
        System.out.println();
        
        System.out.println("EXAMPLES:");
        System.out.println("---------");
        System.out.println("All methods:");
        System.out.println("  execution(* *(..))");
        System.out.println();
        System.out.println("All service methods:");
        System.out.println("  execution(* com.example.service.*.*(..))");
        System.out.println();
        System.out.println("Methods returning Student:");
        System.out.println("  execution(Student com.example.service.*.*(..))");
        System.out.println();
        System.out.println("Methods with int parameter:");
        System.out.println("  execution(* com.example.service.*.*(int))");
        System.out.println();
        
        System.out.println("COMBINING POINTCUTS:");
        System.out.println("-------------------");
        System.out.println("AND: pointcut1() && pointcut2()");
        System.out.println("OR:  pointcut1() || pointcut2()");
        System.out.println("NOT: !pointcut1()");
        System.out.println();
        
        System.out.println("ANNOTATION-BASED:");
        System.out.println("-----------------");
        System.out.println("@annotation(Transactional)");
        System.out.println("@within(Service)");
        System.out.println("@target(Service)");
        System.out.println();
        
        System.out.println("OTHER POINTCUTS:");
        System.out.println("---------------");
        System.out.println("within(com.example.service.*)");
        System.out.println("args(Student)");
        System.out.println("bean(studentService)");
        System.out.println();
        
        System.out.println("BEST PRACTICES:");
        System.out.println("---------------");
        System.out.println("1. Use named pointcuts");
        System.out.println("2. Combine simple pointcuts");
        System.out.println("3. Be specific");
        System.out.println("4. Document pointcuts");
        System.out.println("5. Test pointcuts");
    }
}`,
  practiceQuestions: [
    {
      question: 'Create complex pointcut expressions for different scenarios',
      hint: 'Use execution, within, args, annotation-based pointcuts, and combine them with &&, ||, !',
      starterCode: `@Aspect
@Component
class ComplexPointcutAspect {
    // Create pointcut for all service methods
    // Create pointcut for save methods
    // Create pointcut for getter methods
    // Create pointcut for methods with @Transactional
    
    // Combine: service methods that are transactional saves
    // Combine: service methods except getters
    // Combine: methods with Student parameter
    
    // Apply advice to combined pointcuts
}`
    }
  ]
};

export default springAOPAdvancedPointcuts;

