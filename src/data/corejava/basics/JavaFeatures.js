const javaFeatures = {
  id: 'java-features',
  title: 'Java Features',
  description: 'What makes Java special and why developers love it',
  content: `
# Java Features — Why Java Has Stood the Test of Time

Java has been around since 1995, and it's still one of the most popular programming languages. Why? Because it was designed with features that solve real problems developers face every day.

Let's explore what makes Java special.

---

## The Big 12: Java's Key Features

### 1. Simple

Java was designed to be easy to learn. If you know C or C++, Java feels familiar — but without the complexity.

**What Java removed:**
- Pointers (explicit memory addresses)
- Operator overloading
- Multiple inheritance (of classes)
- Manual memory management

\`\`\`java
// Java is straightforward
String name = "John";
int age = 25;
System.out.println(name + " is " + age);
\`\`\`

### 2. Object-Oriented

Everything in Java revolves around objects. This makes code:
- Organized
- Reusable
- Easier to maintain

\`\`\`java
// Real-world modeling
class Car {
    String brand;
    int speed;
    
    void accelerate() {
        speed += 10;
    }
}
\`\`\`

### 3. Platform Independent (Write Once, Run Anywhere)

This is Java's superpower. Write code once, run it on any device with a JVM.

\`\`\`
Your Code (.java)
      ↓
   Compiler
      ↓
Bytecode (.class)
      ↓
   JVM (Windows) → Runs!
   JVM (Mac)     → Runs!
   JVM (Linux)   → Runs!
\`\`\`

**Real impact:** Deploy the same application to Windows servers, Mac laptops, and Linux containers without changing a single line of code.

### 4. Secure

Java was built with security in mind:

- **No pointers** — Can't access arbitrary memory
- **Bytecode verification** — Code is checked before running
- **Security Manager** — Controls what code can do
- **Sandbox execution** — Applets run in isolated environment

\`\`\`java
// Java prevents buffer overflows
int[] arr = new int[5];
arr[10] = 100;  // ArrayIndexOutOfBoundsException!
\`\`\`

### 5. Robust

Java is designed to be reliable:

- **Strong type checking** — Catch errors at compile time
- **Exception handling** — Graceful error recovery
- **Automatic garbage collection** — No memory leaks
- **No pointer arithmetic** — No segmentation faults

\`\`\`java
// Compile-time error catching
int x = "hello";  // ERROR! Type mismatch
\`\`\`

### 6. Portable

Java programs are portable because:
- Bytecode is the same everywhere
- Data types have fixed sizes (int is always 32 bits)
- No implementation-dependent features

### 7. High Performance

Java is fast thanks to:

- **JIT (Just-In-Time) Compilation** — Bytecode compiled to native code at runtime
- **Adaptive optimization** — JVM optimizes hot code paths
- **Efficient garbage collection** — Modern GC algorithms

**Myth busted:** "Java is slow" was true in 1995. Modern Java is incredibly fast.

### 8. Multithreaded

Built-in support for concurrent programming:

\`\`\`java
// Easy thread creation
Thread thread = new Thread(() -> {
    System.out.println("Running in parallel!");
});
thread.start();
\`\`\`

**Why it matters:** Modern apps need to handle multiple users, process data in parallel, and stay responsive.

### 9. Distributed

Java was designed for networked environments:

- Built-in networking libraries
- RMI (Remote Method Invocation)
- Support for distributed computing

\`\`\`java
// Easy network communication
URL url = new URL("https://api.example.com/data");
InputStream stream = url.openStream();
\`\`\`

### 10. Dynamic

Java can adapt at runtime:

- **Reflection** — Inspect and modify code at runtime
- **Dynamic class loading** — Load classes on demand
- **Late binding** — Resolve method calls at runtime

\`\`\`java
// Load a class dynamically
Class<?> clazz = Class.forName("com.example.MyClass");
Object obj = clazz.newInstance();
\`\`\`

### 11. Architecture Neutral

Java bytecode doesn't depend on any processor architecture:
- Same bytecode runs on x86, ARM, SPARC
- JVM handles architecture differences
- No recompilation needed

### 12. Interpreted (and Compiled)

Java uses a hybrid approach:

\`\`\`
Source Code → Compiler → Bytecode → JVM Interpreter → Execution
                                  ↓
                            JIT Compiler → Native Code (faster!)
\`\`\`

---

## Feature Comparison

| Feature | Java | C++ | Python |
|---------|------|-----|--------|
| Platform Independent | Yes | No | Yes |
| Memory Management | Automatic | Manual | Automatic |
| Type Safety | Strong | Strong | Weak |
| Performance | High | Very High | Moderate |
| Learning Curve | Moderate | Steep | Easy |
| Enterprise Support | Excellent | Good | Growing |

---

## Real-World Impact

### Banking Systems
- **Security** — Protects financial data
- **Robustness** — No crashes, no data loss
- **Portability** — Runs on mainframes and servers

### Android Apps
- **Object-Oriented** — Clean app architecture
- **Multithreaded** — Smooth UI + background tasks
- **Portable** — Runs on thousands of device types

### Enterprise Applications
- **Distributed** — Microservices architecture
- **Scalable** — Handle millions of users
- **Maintainable** — Large codebases stay organized

---

## Why Companies Choose Java

1. **Stability** — 25+ years of proven reliability
2. **Talent pool** — Millions of Java developers
3. **Ecosystem** — Massive library and framework support
4. **Backward compatibility** — Old code still works
5. **Performance** — Handles enterprise scale
6. **Security** — Battle-tested in banking and government
`,
  code: `// Java Features Demo - Showcasing what makes Java special

public class JavaFeaturesDemo {
    public static void main(String[] args) {
        System.out.println("=== Java Features Demo ===\\n");
        
        // 1. SIMPLE - Clean, readable syntax
        System.out.println("1. SIMPLE");
        System.out.println("   -------");
        String message = "Java is easy to read and write";
        int number = 42;
        System.out.println("   " + message);
        System.out.println("   The answer is: " + number);
        System.out.println();
        
        // 2. OBJECT-ORIENTED - Everything is an object
        System.out.println("2. OBJECT-ORIENTED");
        System.out.println("   -----------------");
        Car myCar = new Car("Toyota", "Camry");
        myCar.displayInfo();
        myCar.accelerate();
        myCar.displayInfo();
        System.out.println();
        
        // 3. PLATFORM INDEPENDENT
        System.out.println("3. PLATFORM INDEPENDENT");
        System.out.println("   ---------------------");
        System.out.println("   OS: " + System.getProperty("os.name"));
        System.out.println("   This same code runs on Windows, Mac, Linux!");
        System.out.println();
        
        // 4. SECURE - Type safety and bounds checking
        System.out.println("4. SECURE");
        System.out.println("   -------");
        try {
            int[] arr = {1, 2, 3};
            // arr[10] = 100;  // Would throw exception
            System.out.println("   Array bounds are checked automatically");
            System.out.println("   No buffer overflow vulnerabilities!");
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("   Caught: " + e.getClass().getSimpleName());
        }
        System.out.println();
        
        // 5. ROBUST - Exception handling
        System.out.println("5. ROBUST");
        System.out.println("   -------");
        try {
            int result = divide(10, 0);
        } catch (ArithmeticException e) {
            System.out.println("   Gracefully handled: Division by zero");
            System.out.println("   Program continues running!");
        }
        System.out.println();
        
        // 6. MULTITHREADED
        System.out.println("6. MULTITHREADED");
        System.out.println("   ---------------");
        System.out.println("   Available processors: " + 
                          Runtime.getRuntime().availableProcessors());
        
        Thread thread1 = new Thread(() -> 
            System.out.println("   Thread 1: Running in parallel!"));
        Thread thread2 = new Thread(() -> 
            System.out.println("   Thread 2: Also running!"));
        
        thread1.start();
        thread2.start();
        
        try {
            thread1.join();
            thread2.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println();
        
        // 7. AUTOMATIC MEMORY MANAGEMENT
        System.out.println("7. AUTOMATIC MEMORY MANAGEMENT");
        System.out.println("   -----------------------------");
        Runtime runtime = Runtime.getRuntime();
        System.out.println("   Total Memory: " + 
                          (runtime.totalMemory() / 1024 / 1024) + " MB");
        System.out.println("   Free Memory: " + 
                          (runtime.freeMemory() / 1024 / 1024) + " MB");
        System.out.println("   Garbage collection happens automatically!");
        System.out.println();
        
        // 8. DYNAMIC - Reflection
        System.out.println("8. DYNAMIC (Reflection)");
        System.out.println("   ---------------------");
        Class<?> carClass = myCar.getClass();
        System.out.println("   Class name: " + carClass.getName());
        System.out.println("   Methods: " + carClass.getDeclaredMethods().length);
        System.out.println("   Fields: " + carClass.getDeclaredFields().length);
        System.out.println();
        
        // Summary
        System.out.println("=== SUMMARY ===");
        System.out.println("Java combines:");
        System.out.println("Simplicity of high-level languages");
        System.out.println("Power of object-oriented design");
        System.out.println("Security of managed runtime");
        System.out.println("Portability across all platforms");
        System.out.println("Performance of JIT compilation");
    }
    
    public static int divide(int a, int b) {
        return a / b;
    }
}

// Simple class to demonstrate OOP
class Car {
    private String brand;
    private String model;
    private int speed;
    
    public Car(String brand, String model) {
        this.brand = brand;
        this.model = model;
        this.speed = 0;
    }
    
    public void accelerate() {
        speed += 20;
        System.out.println("   Accelerating... Speed is now " + speed + " km/h");
    }
    
    public void displayInfo() {
        System.out.println("   " + brand + " " + model + " - Speed: " + speed + " km/h");
    }
}`,
  practiceQuestions: [
    {
      question: 'Demonstrate Java features with a practical example',
      hint: 'Create a class that shows OOP, exception handling, and platform info',
      starterCode: `public class FeaturesPractice {
    public static void main(String[] args) {
        System.out.println("=== Java Features in Action ===\\n");
        
        // Platform Independence
        System.out.println("Running on: " + System.getProperty("os.name"));
        System.out.println("Java Version: " + System.getProperty("java.version"));
        System.out.println();
        
        // Object-Oriented
        BankAccount account = new BankAccount("John Doe", 1000.0);
        account.display();
        
        // Robust - Exception Handling
        try {
            account.withdraw(500);
            account.withdraw(600);  // This will fail
        } catch (Exception e) {
            System.out.println("Handled: " + e.getMessage());
        }
        
        account.display();
        
        // Automatic Memory Management
        System.out.println("\\nMemory managed automatically by JVM!");
    }
}

class BankAccount {
    private String owner;
    private double balance;
    
    public BankAccount(String owner, double balance) {
        this.owner = owner;
        this.balance = balance;
    }
    
    public void withdraw(double amount) throws Exception {
        if (amount > balance) {
            throw new Exception("Insufficient funds!");
        }
        balance -= amount;
        System.out.println("Withdrew: $" + amount);
    }
    
    public void display() {
        System.out.println("Account: " + owner + " | Balance: $" + balance);
    }
}`
    }
  ]
};

export default javaFeatures;
