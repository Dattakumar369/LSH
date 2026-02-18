const threadIntroduction = {
  id: 'thread-introduction',
  title: 'Multithreading in Java - Complete Guide',
  description: 'Complete guide to multithreading - threads, concurrency, and parallel processing',
  content: `
# Multithreading in Java - Complete Guide

Multithreading is a Java feature that allows concurrent execution of two or more parts of a program for maximum utilization of CPU resources.

## What is a Thread?

A thread is a **lightweight sub-process**, the smallest unit of processing. It is a separate path of execution within a program.

\`\`\`
┌─────────────────────────────────────────────────────────────────────┐
│                    PROCESS vs THREAD                                 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  PROCESS                           THREAD                           │
│  ───────                           ──────                           │
│  ┌─────────────────────┐          ┌─────────────────────┐          │
│  │      Process 1      │          │      Process        │          │
│  │                     │          │  ┌───┐ ┌───┐ ┌───┐  │          │
│  │  [Own Memory Space] │          │  │T1 │ │T2 │ │T3 │  │          │
│  │  [Own Resources]    │          │  └───┘ └───┘ └───┘  │          │
│  │                     │          │  [Shared Memory]    │          │
│  └─────────────────────┘          │  [Shared Resources] │          │
│                                   └─────────────────────┘          │
│  • Heavy-weight                   • Light-weight                   │
│  • Own memory space               • Shared memory                  │
│  • Expensive communication        • Easy communication             │
│  • Costly context switch          • Cheap context switch           │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
\`\`\`

---

## Process vs Thread Comparison

| Feature | Process | Thread |
|---------|---------|--------|
| **Definition** | Independent program | Part of a process |
| **Weight** | Heavy-weight | Light-weight |
| **Memory** | Own memory space | Shared memory |
| **Communication** | IPC (expensive) | Shared variables (easy) |
| **Context Switch** | Slow | Fast |
| **Creation** | Slow | Fast |
| **Isolation** | Isolated | Shares resources |
| **Failure Impact** | Other processes unaffected | May affect other threads |

---

## Why Multithreading?

\`\`\`
┌─────────────────────────────────────────────────────────────────────┐
│                    BENEFITS OF MULTITHREADING                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  1. BETTER CPU UTILIZATION                                          │
│     ─────────────────────                                           │
│     • Use idle CPU time while waiting for I/O                       │
│     • Utilize multiple CPU cores                                    │
│                                                                     │
│  2. IMPROVED PERFORMANCE                                            │
│     ─────────────────────                                           │
│     • Parallel task execution                                       │
│     • Faster completion of tasks                                    │
│                                                                     │
│  3. BETTER USER EXPERIENCE                                          │
│     ────────────────────────                                        │
│     • Responsive applications                                       │
│     • UI doesn't freeze during long operations                      │
│                                                                     │
│  4. RESOURCE SHARING                                                │
│     ────────────────────                                            │
│     • Threads share process resources                               │
│     • Efficient memory usage                                        │
│                                                                     │
│  5. SIMPLIFIED MODELING                                             │
│     ─────────────────────                                           │
│     • Model real-world concurrent activities                        │
│     • Separate concerns into different threads                      │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
\`\`\`

---

## Thread Lifecycle (States)

\`\`\`
┌─────────────────────────────────────────────────────────────────────┐
│                    THREAD LIFECYCLE                                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│                        ┌─────────────┐                              │
│                        │    NEW      │                              │
│                        │  (Created)  │                              │
│                        └──────┬──────┘                              │
│                               │ start()                             │
│                               ▼                                     │
│                        ┌─────────────┐                              │
│                        │  RUNNABLE   │◄─────────────────┐           │
│                        │  (Ready)    │                  │           │
│                        └──────┬──────┘                  │           │
│                               │ Scheduler               │           │
│                               ▼                         │           │
│                        ┌─────────────┐                  │           │
│                        │   RUNNING   │──────────────────┤           │
│                        │             │  yield()         │           │
│                        └──────┬──────┘                  │           │
│                               │                         │           │
│         ┌─────────────────────┼─────────────────────┐   │           │
│         │                     │                     │   │           │
│         ▼                     ▼                     ▼   │           │
│  ┌─────────────┐      ┌─────────────┐      ┌─────────────┐         │
│  │   BLOCKED   │      │   WAITING   │      │TIMED_WAITING│         │
│  │ (Lock wait) │      │  (wait())   │      │  (sleep())  │         │
│  └──────┬──────┘      └──────┬──────┘      └──────┬──────┘         │
│         │                    │                    │                 │
│         │ Lock acquired      │ notify()          │ Time elapsed    │
│         └────────────────────┴────────────────────┘                 │
│                               │                                     │
│                               ▼                                     │
│                        ┌─────────────┐                              │
│                        │ TERMINATED  │                              │
│                        │   (Dead)    │                              │
│                        └─────────────┘                              │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
\`\`\`

### Thread States Explained

| State | Description | Transition |
|-------|-------------|------------|
| **NEW** | Thread created but not started | \`new Thread()\` |
| **RUNNABLE** | Ready to run, waiting for CPU | \`start()\` |
| **RUNNING** | Currently executing | Scheduler picks |
| **BLOCKED** | Waiting for lock | Trying to enter synchronized |
| **WAITING** | Waiting indefinitely | \`wait()\`, \`join()\` |
| **TIMED_WAITING** | Waiting for specified time | \`sleep()\`, \`wait(timeout)\` |
| **TERMINATED** | Execution completed | \`run()\` completes |

---

## Ways to Create a Thread

### 1. Extending Thread Class

\`\`\`java
class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("Thread running: " + getName());
    }
}

// Usage
MyThread t = new MyThread();
t.start();  // NOT run()!
\`\`\`

### 2. Implementing Runnable Interface (Recommended)

\`\`\`java
class MyRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println("Runnable running");
    }
}

// Usage
Thread t = new Thread(new MyRunnable());
t.start();
\`\`\`

### 3. Using Lambda Expression (Java 8+)

\`\`\`java
Thread t = new Thread(() -> {
    System.out.println("Lambda thread running");
});
t.start();
\`\`\`

### 4. Using Executor Framework

\`\`\`java
ExecutorService executor = Executors.newFixedThreadPool(5);
executor.submit(() -> {
    System.out.println("Executor thread running");
});
executor.shutdown();
\`\`\`

---

## Thread vs Runnable

| Feature | Thread Class | Runnable Interface |
|---------|--------------|-------------------|
| **Inheritance** | Extends Thread | Implements Runnable |
| **Multiple Inheritance** | No (Java limitation) | Yes (can extend other class) |
| **Resource Sharing** | Difficult | Easy |
| **Flexibility** | Less | More |
| **Recommended** | No | Yes |

---

## Important Thread Methods

| Method | Description |
|--------|-------------|
| \`start()\` | Starts thread execution |
| \`run()\` | Contains thread's task (don't call directly) |
| \`sleep(ms)\` | Pauses thread for specified time |
| \`join()\` | Waits for thread to complete |
| \`yield()\` | Hints scheduler to give other threads a chance |
| \`interrupt()\` | Interrupts a sleeping/waiting thread |
| \`isAlive()\` | Checks if thread is still running |
| \`getName()\` | Returns thread name |
| \`setName()\` | Sets thread name |
| \`getPriority()\` | Returns thread priority (1-10) |
| \`setPriority()\` | Sets thread priority |
| \`currentThread()\` | Returns reference to current thread |

---

## Thread Priority

\`\`\`
┌─────────────────────────────────────────────────────────────────────┐
│                    THREAD PRIORITY                                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Priority Range: 1 (MIN) to 10 (MAX)                                │
│  Default: 5 (NORM)                                                  │
│                                                                     │
│  Constants:                                                         │
│  • Thread.MIN_PRIORITY  = 1                                         │
│  • Thread.NORM_PRIORITY = 5                                         │
│  • Thread.MAX_PRIORITY  = 10                                        │
│                                                                     │
│  Note: Priority is a hint to scheduler, not guaranteed!             │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
\`\`\`

---

## 🏢 Real-Time Project Example: E-Commerce Order Processing

\`\`\`java
// Real-Time: Parallel Order Processing
// Used in Amazon, Flipkart for handling multiple orders

public class ECommerceMultithreading {
    public static void main(String[] args) {
        System.out.println("╔════════════════════════════════════════════════╗");
        System.out.println("║    🛒 E-COMMERCE MULTITHREADING                ║");
        System.out.println("╚════════════════════════════════════════════════╝");
        
        // ═══════════════════════════════════════════════════
        // Without Multithreading (Sequential)
        // ═══════════════════════════════════════════════════
        System.out.println("\\nWITHOUT MULTITHREADING (Sequential):");
        System.out.println("─".repeat(50));
        System.out.println("\\nOrder Processing Flow:");
        System.out.println("┌─────────────────────────────────────────────────┐");
        System.out.println("│ Order 1 → Order 2 → Order 3 → Order 4 → Order 5 │");
        System.out.println("│ [2 sec]   [2 sec]   [2 sec]   [2 sec]   [2 sec] │");
        System.out.println("│                                                 │");
        System.out.println("│ Total Time: 10 seconds ⏱️                       │");
        System.out.println("└─────────────────────────────────────────────────┘");
        
        // ═══════════════════════════════════════════════════
        // With Multithreading (Parallel)
        // ═══════════════════════════════════════════════════
        System.out.println("\\nWITH MULTITHREADING (Parallel):");
        System.out.println("─".repeat(50));
        System.out.println("\\nParallel Order Processing:");
        System.out.println("┌─────────────────────────────────────────────────┐");
        System.out.println("│ Thread-1: Order 1 ████████ [2 sec]              │");
        System.out.println("│ Thread-2: Order 2 ████████ [2 sec]              │");
        System.out.println("│ Thread-3: Order 3 ████████ [2 sec]              │");
        System.out.println("│ Thread-4: Order 4 ████████ [2 sec]              │");
        System.out.println("│ Thread-5: Order 5 ████████ [2 sec]              │");
        System.out.println("│                                                 │");
        System.out.println("│ Total Time: ~2 seconds ⏱️ (5x faster!)          │");
        System.out.println("└─────────────────────────────────────────────────┘");
        
        // ═══════════════════════════════════════════════════
        // Real-World Scenario
        // ═══════════════════════════════════════════════════
        System.out.println("\\n📊 REAL-WORLD SCENARIO:");
        System.out.println("─".repeat(50));
        System.out.println("\\nAmazon processes ~66,000 orders per hour");
        System.out.println("That's ~18 orders per second!");
        System.out.println("\\nWithout multithreading:");
        System.out.println("  • 1 order takes 2 seconds");
        System.out.println("  • 18 orders would take 36 seconds");
        System.out.println("  • System would crash under load!");
        System.out.println("\\nWith multithreading (100 threads):");
        System.out.println("  • 100 orders processed in parallel");
        System.out.println("  • 18 orders take ~0.36 seconds");
        System.out.println("  • System handles load easily!");
        
        // ═══════════════════════════════════════════════════
        // E-Commerce Thread Usage
        // ═══════════════════════════════════════════════════
        System.out.println("\\n🔧 THREADS IN E-COMMERCE:");
        System.out.println("─".repeat(50));
        System.out.println("\\n1. Order Processing Thread");
        System.out.println("   • Validates order");
        System.out.println("   • Checks inventory");
        System.out.println("   • Processes payment");
        
        System.out.println("\\n2. Notification Thread");
        System.out.println("   • Sends order confirmation email");
        System.out.println("   • Sends SMS notification");
        System.out.println("   • Push notifications");
        
        System.out.println("\\n3. Inventory Thread");
        System.out.println("   • Updates stock levels");
        System.out.println("   • Triggers reorder alerts");
        
        System.out.println("\\n4. Analytics Thread");
        System.out.println("   • Logs user activity");
        System.out.println("   • Updates dashboards");
    }
}
\`\`\`

---

## 🏦 Real-Time Project Example: Banking System

\`\`\`java
// Real-Time: Banking Transaction Processing
// Used in HDFC, ICICI, SBI applications

public class BankingMultithreading {
    public static void main(String[] args) {
        System.out.println("╔════════════════════════════════════════════════╗");
        System.out.println("║    🏦 BANKING MULTITHREADING                   ║");
        System.out.println("╚════════════════════════════════════════════════╝");
        
        // ═══════════════════════════════════════════════════
        // Banking Thread Usage
        // ═══════════════════════════════════════════════════
        System.out.println("\\n🔧 THREADS IN BANKING:");
        System.out.println("─".repeat(50));
        
        System.out.println("\\n1. Transaction Processing Thread");
        System.out.println("   • Handles deposits/withdrawals");
        System.out.println("   • Processes fund transfers");
        System.out.println("   • Updates account balances");
        
        System.out.println("\\n2. Fraud Detection Thread");
        System.out.println("   • Monitors suspicious activities");
        System.out.println("   • Real-time transaction analysis");
        System.out.println("   • Alerts security team");
        
        System.out.println("\\n3. Interest Calculation Thread");
        System.out.println("   • Calculates daily interest");
        System.out.println("   • Updates account balances");
        System.out.println("   • Runs during off-peak hours");
        
        System.out.println("\\n4. Statement Generation Thread");
        System.out.println("   • Generates monthly statements");
        System.out.println("   • Sends to customers");
        System.out.println("   • Runs in batch mode");
        
        // ═══════════════════════════════════════════════════
        // Concurrent ATM Transactions
        // ═══════════════════════════════════════════════════
        System.out.println("\\n📊 CONCURRENT ATM TRANSACTIONS:");
        System.out.println("─".repeat(50));
        System.out.println("\\n┌─────────────────────────────────────────────────┐");
        System.out.println("│ ATM-1: Withdrawal ████████ Thread-1             │");
        System.out.println("│ ATM-2: Deposit    ████████ Thread-2             │");
        System.out.println("│ ATM-3: Balance    ████████ Thread-3             │");
        System.out.println("│ ATM-4: Transfer   ████████ Thread-4             │");
        System.out.println("│                                                 │");
        System.out.println("│ All transactions processed simultaneously!      │");
        System.out.println("└─────────────────────────────────────────────────┘");
        
        // ═══════════════════════════════════════════════════
        // Thread Safety in Banking
        // ═══════════════════════════════════════════════════
        System.out.println("\\n🔒 THREAD SAFETY IN BANKING:");
        System.out.println("─".repeat(50));
        System.out.println("\\nProblem: Two threads accessing same account");
        System.out.println("\\nThread-1: Withdraw $500 from Account A");
        System.out.println("Thread-2: Withdraw $500 from Account A");
        System.out.println("Balance: $800");
        System.out.println("\\nWithout synchronization:");
        System.out.println("  Both read balance: $800");
        System.out.println("  Both withdraw: $500");
        System.out.println("  Final balance: $300 (should be $-200 or rejected!)");
        System.out.println("\\nWith synchronization:");
        System.out.println("  Thread-1 locks account, withdraws $500");
        System.out.println("  Balance: $300");
        System.out.println("  Thread-2 tries to withdraw $500");
        System.out.println("  Rejected: Insufficient balance!");
    }
}
\`\`\`

---

## Multithreading Use Cases

| Application | Thread Usage |
|-------------|--------------|
| **Web Server** | Thread per request |
| **Database** | Connection pool threads |
| **GUI Application** | UI thread + background threads |
| **Game** | Rendering, physics, AI threads |
| **Video Player** | Decoding, rendering, audio threads |
| **Download Manager** | Thread per download |
| **Chat Application** | Send/receive threads |

---

## Summary

| Concept | Description |
|---------|-------------|
| **Thread** | Lightweight sub-process |
| **Multithreading** | Concurrent execution of threads |
| **Process vs Thread** | Heavy vs light, isolated vs shared |
| **Thread States** | NEW, RUNNABLE, RUNNING, BLOCKED, WAITING, TERMINATED |
| **Creating Threads** | Thread class, Runnable interface, Lambda |
| **Thread Methods** | start(), sleep(), join(), yield() |
| **Thread Priority** | 1 (MIN) to 10 (MAX), default 5 |

> **Industry Insight**: Multithreading is essential in enterprise applications. E-commerce platforms use thread pools for order processing, banks use synchronized threads for transactions, and web servers use threads to handle concurrent requests. Understanding multithreading is crucial for building scalable applications.
`,
  code: `// Complete Multithreading Demo
// Understanding threads, states, and methods

public class MultithreadingCompleteDemo {
    public static void main(String[] args) {
        System.out.println("╔════════════════════════════════════════════════╗");
        System.out.println("║    🧵 MULTITHREADING - COMPLETE GUIDE          ║");
        System.out.println("╚════════════════════════════════════════════════╝");
        
        // ═══════════════════════════════════════════════════
        // PART 1: What is a Thread?
        // ═══════════════════════════════════════════════════
        System.out.println("\\n" + "═".repeat(50));
        System.out.println("📌 PART 1: WHAT IS A THREAD?");
        System.out.println("═".repeat(50));
        
        System.out.println("\\nThread = Lightweight sub-process");
        System.out.println("       = Smallest unit of processing");
        System.out.println("       = Separate path of execution");
        
        System.out.println("\\nProcess vs Thread:");
        System.out.println("| Feature    | Process      | Thread       |");
        System.out.println("|------------|--------------|--------------|");
        System.out.println("| Weight     | Heavy        | Light        |");
        System.out.println("| Memory     | Own space    | Shared       |");
        System.out.println("| Switch     | Slow         | Fast         |");
        
        // ═══════════════════════════════════════════════════
        // PART 2: Thread Lifecycle
        // ═══════════════════════════════════════════════════
        System.out.println("\\n" + "═".repeat(50));
        System.out.println("📌 PART 2: THREAD LIFECYCLE");
        System.out.println("═".repeat(50));
        
        System.out.println("\\n        NEW");
        System.out.println("         │ start()");
        System.out.println("         ▼");
        System.out.println("      RUNNABLE ◄──────┐");
        System.out.println("         │            │");
        System.out.println("         ▼            │");
        System.out.println("      RUNNING ────────┤");
        System.out.println("         │            │");
        System.out.println("    ┌────┴────┐       │");
        System.out.println("    ▼         ▼       │");
        System.out.println(" BLOCKED   WAITING ───┘");
        System.out.println("    │         │");
        System.out.println("    └────┬────┘");
        System.out.println("         ▼");
        System.out.println("     TERMINATED");
        
        // ═══════════════════════════════════════════════════
        // PART 3: Creating Threads
        // ═══════════════════════════════════════════════════
        System.out.println("\\n" + "═".repeat(50));
        System.out.println("📌 PART 3: CREATING THREADS");
        System.out.println("═".repeat(50));
        
        System.out.println("\\n1. Extending Thread class:");
        System.out.println("   class MyThread extends Thread {");
        System.out.println("       public void run() { ... }");
        System.out.println("   }");
        
        System.out.println("\\n2. Implementing Runnable (Recommended):");
        System.out.println("   class MyRunnable implements Runnable {");
        System.out.println("       public void run() { ... }");
        System.out.println("   }");
        
        System.out.println("\\n3. Lambda Expression (Java 8+):");
        System.out.println("   Thread t = new Thread(() -> { ... });");
        
        // ═══════════════════════════════════════════════════
        // PART 4: Thread Demo
        // ═══════════════════════════════════════════════════
        System.out.println("\\n" + "═".repeat(50));
        System.out.println("📌 PART 4: THREAD DEMO");
        System.out.println("═".repeat(50));
        
        // Get main thread info
        Thread mainThread = Thread.currentThread();
        System.out.println("\\nMain Thread Info:");
        System.out.println("  Name: " + mainThread.getName());
        System.out.println("  Priority: " + mainThread.getPriority());
        System.out.println("  State: " + mainThread.getState());
        
        // Create and run threads
        System.out.println("\\nCreating 3 threads...");
        
        for(int i = 1; i <= 3; i++) {
            final int threadNum = i;
            Thread t = new Thread(() -> {
                System.out.println("  Thread-" + threadNum + " running");
                System.out.println("  Thread-" + threadNum + " completed");
            });
            t.setName("Worker-" + i);
            t.start();
        }
        
        // Wait for threads to complete
        try {
            Thread.sleep(100);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        // ═══════════════════════════════════════════════════
        // PART 5: Thread Methods
        // ═══════════════════════════════════════════════════
        System.out.println("\\n" + "═".repeat(50));
        System.out.println("📌 PART 5: THREAD METHODS");
        System.out.println("═".repeat(50));
        
        System.out.println("\\n| Method          | Description                |");
        System.out.println("|-----------------|----------------------------|");
        System.out.println("| start()         | Starts thread execution    |");
        System.out.println("| run()           | Thread's task (don't call) |");
        System.out.println("| sleep(ms)       | Pauses thread              |");
        System.out.println("| join()          | Waits for completion       |");
        System.out.println("| yield()         | Gives chance to others     |");
        System.out.println("| interrupt()     | Interrupts thread          |");
        System.out.println("| isAlive()       | Checks if running          |");
        System.out.println("| getName()       | Returns thread name        |");
        System.out.println("| getPriority()   | Returns priority (1-10)    |");
        
        // ═══════════════════════════════════════════════════
        // PART 6: Thread Priority
        // ═══════════════════════════════════════════════════
        System.out.println("\\n" + "═".repeat(50));
        System.out.println("📌 PART 6: THREAD PRIORITY");
        System.out.println("═".repeat(50));
        
        System.out.println("\\nPriority Range: 1 (MIN) to 10 (MAX)");
        System.out.println("Default: 5 (NORM)");
        System.out.println("\\nConstants:");
        System.out.println("  Thread.MIN_PRIORITY  = " + Thread.MIN_PRIORITY);
        System.out.println("  Thread.NORM_PRIORITY = " + Thread.NORM_PRIORITY);
        System.out.println("  Thread.MAX_PRIORITY  = " + Thread.MAX_PRIORITY);
        
        // ═══════════════════════════════════════════════════
        // PART 7: Real-World Usage
        // ═══════════════════════════════════════════════════
        System.out.println("\\n" + "═".repeat(50));
        System.out.println("📌 PART 7: REAL-WORLD USAGE");
        System.out.println("═".repeat(50));
        
        System.out.println("\\n| Application     | Thread Usage               |");
        System.out.println("|-----------------|----------------------------|");
        System.out.println("| Web Server      | Thread per request         |");
        System.out.println("| E-Commerce      | Order processing pool      |");
        System.out.println("| Banking         | Transaction threads        |");
        System.out.println("| GUI App         | UI + background threads    |");
        System.out.println("| Game            | Render, physics, AI        |");
        
        // ═══════════════════════════════════════════════════
        // SUMMARY
        // ═══════════════════════════════════════════════════
        System.out.println("\\n" + "═".repeat(50));
        System.out.println("📋 SUMMARY");
        System.out.println("═".repeat(50));
        
        System.out.println("\\nKey Takeaways:");
        System.out.println("   • Thread = Lightweight sub-process");
        System.out.println("   • States: NEW → RUNNABLE → RUNNING → TERMINATED");
        System.out.println("   • Create: Thread class or Runnable interface");
        System.out.println("   • Methods: start(), sleep(), join(), yield()");
        System.out.println("   • Priority: 1-10 (hint to scheduler)");
        System.out.println("   • Use cases: Web servers, banking, e-commerce");
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a multi-threaded download manager that downloads 3 files simultaneously',
      hint: 'Create 3 threads, each simulating a file download with progress updates',
      starterCode: `public class DownloadManager {
    public static void main(String[] args) {
        System.out.println("=== DOWNLOAD MANAGER ===");
        
        // Create 3 download threads
        String[] files = {"file1.zip", "file2.mp4", "file3.pdf"};
        
        for(String file : files) {
            Thread downloadThread = new Thread(() -> {
                System.out.println("Starting download: " + file);
                
                // Simulate download progress
                for(int progress = 0; progress <= 100; progress += 20) {
                    System.out.println(file + ": " + progress + "%");
                    try {
                        Thread.sleep(500); // Simulate download time
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
                
                System.out.println(file + ": Download complete!");
            });
            
            downloadThread.start();
        }
        
        System.out.println("All downloads started!");
    }
}`
    }
  ]
};

export default threadIntroduction;
