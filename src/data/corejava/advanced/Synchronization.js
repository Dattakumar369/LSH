const synchronization = {
  id: 'synchronization',
  title: 'Synchronization in Java',
  description: 'Learn about thread synchronization and preventing race conditions',
  content: `
# Synchronization in Java

Synchronization is the mechanism that ensures only one thread can access a shared resource at a time, preventing race conditions and data inconsistency.

## Why Synchronization?

Without synchronization, multiple threads accessing shared data can lead to:
- **Race Conditions**: Unpredictable results
- **Data Corruption**: Inconsistent state
- **Lost Updates**: Changes overwritten

## Types of Synchronization

| Type | Description | Use Case |
|------|-------------|----------|
| Synchronized Method | Entire method is synchronized | Simple, method-level locking |
| Synchronized Block | Only specific code is synchronized | Fine-grained control |
| Static Synchronization | Class-level lock | Static methods/data |
| Lock Interface | Explicit locking | Advanced control |

## 🏦 Real-Time Project Example: Bank Account Synchronization

\`\`\`java
// Real-Time: Bank Account Thread Safety
// Critical for banking applications

public class BankAccountSync {
    public static void main(String[] args) {
        System.out.println("🏦 BANK ACCOUNT SYNCHRONIZATION");
        System.out.println("=================================");
        
        // The Problem: Race Condition
        System.out.println("\\nWITHOUT SYNCHRONIZATION (Race Condition):");
        System.out.println("─".repeat(50));
        
        System.out.println("\\nScenario: Two ATMs accessing same account");
        System.out.println("Initial Balance: $1000");
        System.out.println("\\n┌─────────────────────────────────────────────────┐");
        System.out.println("│ Time │ ATM-1              │ ATM-2              │");
        System.out.println("├──────┼────────────────────┼────────────────────┤");
        System.out.println("│ T1   │ Read balance=$1000 │                    │");
        System.out.println("│ T2   │                    │ Read balance=$1000 │");
        System.out.println("│ T3   │ Withdraw $800      │                    │");
        System.out.println("│ T4   │ Write balance=$200 │                    │");
        System.out.println("│ T5   │                    │ Withdraw $800      │");
        System.out.println("│ T6   │                    │ Write balance=$200 │");
        System.out.println("├──────┴────────────────────┴────────────────────┤");
        System.out.println("│ RESULT: $1600 withdrawn from $1000 account! │");
        System.out.println("│    Bank loses $600!                            │");
        System.out.println("└─────────────────────────────────────────────────┘");
        
        // The Solution: Synchronized Method
        System.out.println("\\nWITH SYNCHRONIZATION:");
        System.out.println("─".repeat(50));
        
        System.out.println("\\n// Synchronized withdraw method");
        System.out.println("public class BankAccount {");
        System.out.println("    private double balance;");
        System.out.println("    ");
        System.out.println("    public synchronized void withdraw(double amount) {");
        System.out.println("        if (balance >= amount) {");
        System.out.println("            balance -= amount;");
        System.out.println("            System.out.println(\\"Withdrawn: $\\" + amount);");
        System.out.println("        } else {");
        System.out.println("            System.out.println(\\"Insufficient funds!\\");");
        System.out.println("        }");
        System.out.println("    }");
        System.out.println("}");
        
        System.out.println("\\n┌─────────────────────────────────────────────────┐");
        System.out.println("│ Time │ ATM-1              │ ATM-2              │");
        System.out.println("├──────┼────────────────────┼────────────────────┤");
        System.out.println("│ T1   │ Acquire lock       │                    │");
        System.out.println("│ T2   │ Read balance=$1000 │ Waiting for lock...│");
        System.out.println("│ T3   │ Withdraw $800      │ Waiting...         │");
        System.out.println("│ T4   │ Write balance=$200 │ Waiting...         │");
        System.out.println("│ T5   │ Release lock       │ Acquire lock       │");
        System.out.println("│ T6   │                    │ Read balance=$200  │");
        System.out.println("│ T7   │                    │ Insufficient!      │");
        System.out.println("│ T8   │                    │ Release lock       │");
        System.out.println("├──────┴────────────────────┴────────────────────┤");
        System.out.println("│ RESULT: Only $800 withdrawn. Bank is safe!     │");
        System.out.println("└─────────────────────────────────────────────────┘");
    }
}
\`\`\`

## 🛒 Real-Time Project Example: E-Commerce Inventory

\`\`\`java
// Real-Time: Inventory Synchronization
// Prevents overselling in e-commerce

public class InventorySync {
    public static void main(String[] args) {
        System.out.println("🛒 INVENTORY SYNCHRONIZATION");
        System.out.println("=============================");
        
        // Synchronized Block Example
        System.out.println("\\n📦 SYNCHRONIZED BLOCK (Fine-grained):");
        System.out.println("─".repeat(50));
        
        System.out.println("\\npublic class Inventory {");
        System.out.println("    private Map<String, Integer> stock = new HashMap<>();");
        System.out.println("    private final Object stockLock = new Object();");
        System.out.println("    ");
        System.out.println("    public boolean reserveItem(String productId, int quantity) {");
        System.out.println("        // Non-critical code (not synchronized)");
        System.out.println("        validateProductId(productId);");
        System.out.println("        logRequest(productId, quantity);");
        System.out.println("        ");
        System.out.println("        // Critical section (synchronized)");
        System.out.println("        synchronized (stockLock) {");
        System.out.println("            int available = stock.getOrDefault(productId, 0);");
        System.out.println("            if (available >= quantity) {");
        System.out.println("                stock.put(productId, available - quantity);");
        System.out.println("                return true;");
        System.out.println("            }");
        System.out.println("            return false;");
        System.out.println("        }");
        System.out.println("    }");
        System.out.println("}");
        
        System.out.println("\\nBenefits of Synchronized Block:");
        System.out.println("   • Only critical section is locked");
        System.out.println("   • Better performance than synchronized method");
        System.out.println("   • Non-critical code runs in parallel");
        
        // Race condition in inventory
        System.out.println("\\n⚠️ INVENTORY RACE CONDITION:");
        System.out.println("─".repeat(50));
        
        System.out.println("\\nProduct: iPhone 15 Pro");
        System.out.println("Stock: 1 unit");
        System.out.println("Buyers: User A and User B (simultaneous)");
        
        System.out.println("\\nWithout Sync:");
        System.out.println("   User A: Check stock (1) → Reserve → Success");
        System.out.println("   User B: Check stock (1) → Reserve → Success");
        System.out.println("   Result: 2 orders for 1 item! 😱");
        
        System.out.println("\\nWith Sync:");
        System.out.println("   User A: Acquire lock → Check (1) → Reserve → Release");
        System.out.println("   User B: Wait → Acquire lock → Check (0) → Fail");
        System.out.println("   Result: Only 1 order. Inventory accurate!");
    }
}
\`\`\`

## 🔐 Real-Time Project Example: User Session Management

\`\`\`java
// Real-Time: Session Counter Synchronization
// Used in web applications

public class SessionSync {
    public static void main(String[] args) {
        System.out.println("🔐 SESSION MANAGEMENT SYNC");
        System.out.println("===========================");
        
        // Static Synchronization
        System.out.println("\\n📊 STATIC SYNCHRONIZATION:");
        System.out.println("─".repeat(50));
        
        System.out.println("\\npublic class SessionManager {");
        System.out.println("    private static int activeSessionCount = 0;");
        System.out.println("    private static final Object countLock = new Object();");
        System.out.println("    ");
        System.out.println("    // Static synchronized method");
        System.out.println("    public static synchronized void incrementSessions() {");
        System.out.println("        activeSessionCount++;");
        System.out.println("    }");
        System.out.println("    ");
        System.out.println("    // Or using synchronized block with class lock");
        System.out.println("    public static void decrementSessions() {");
        System.out.println("        synchronized (SessionManager.class) {");
        System.out.println("            activeSessionCount--;");
        System.out.println("        }");
        System.out.println("    }");
        System.out.println("}");
        
        System.out.println("\\n📈 Session Counter Visualization:");
        System.out.println("┌─────────────────────────────────────────────────┐");
        System.out.println("│ Active Sessions: 1,234                          │");
        System.out.println("├─────────────────────────────────────────────────┤");
        System.out.println("│ Server 1: +50 sessions (synchronized)           │");
        System.out.println("│ Server 2: +30 sessions (synchronized)           │");
        System.out.println("│ Server 3: -20 sessions (synchronized)           │");
        System.out.println("├─────────────────────────────────────────────────┤");
        System.out.println("│ New Count: 1,294 (accurate)                      │");
        System.out.println("└─────────────────────────────────────────────────┘");
        
        // ReentrantLock Example
        System.out.println("\\n🔒 REENTRANT LOCK (Advanced):");
        System.out.println("─".repeat(50));
        
        System.out.println("\\nimport java.util.concurrent.locks.ReentrantLock;");
        System.out.println("\\npublic class AdvancedInventory {");
        System.out.println("    private final ReentrantLock lock = new ReentrantLock();");
        System.out.println("    private Map<String, Integer> stock = new HashMap<>();");
        System.out.println("    ");
        System.out.println("    public boolean reserveWithTimeout(String productId, int qty) {");
        System.out.println("        try {");
        System.out.println("            // Try to acquire lock with timeout");
        System.out.println("            if (lock.tryLock(5, TimeUnit.SECONDS)) {");
        System.out.println("                try {");
        System.out.println("                    // Critical section");
        System.out.println("                    return doReserve(productId, qty);");
        System.out.println("                } finally {");
        System.out.println("                    lock.unlock();");
        System.out.println("                }");
        System.out.println("            } else {");
        System.out.println("                // Couldn't acquire lock in time");
        System.out.println("                return false;");
        System.out.println("            }");
        System.out.println("        } catch (InterruptedException e) {");
        System.out.println("            return false;");
        System.out.println("        }");
        System.out.println("    }");
        System.out.println("}");
        
        System.out.println("\\nReentrantLock Advantages:");
        System.out.println("   • tryLock() with timeout");
        System.out.println("   • lockInterruptibly() for cancellation");
        System.out.println("   • Fair locking option");
        System.out.println("   • Multiple condition variables");
    }
}
\`\`\`

## Synchronization Best Practices

| Practice | Description |
|----------|-------------|
| Minimize scope | Synchronize only critical sections |
| Avoid nested locks | Prevents deadlocks |
| Use private locks | Prevents external interference |
| Prefer concurrent collections | ConcurrentHashMap, etc. |
| Consider alternatives | Atomic classes, volatile |

## Common Synchronization Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| Deadlock | Circular lock dependency | Lock ordering |
| Livelock | Threads keep responding | Backoff strategy |
| Starvation | Thread never gets lock | Fair locks |
| Race Condition | Unsynchronized access | Proper synchronization |

> **Industry Insight**: Amazon's inventory system uses optimistic locking with version numbers instead of pessimistic synchronization for better performance. Netflix uses lock-free data structures (ConcurrentHashMap) for their recommendation engine to handle millions of concurrent users.
`,
  code: `// Real-Time: Complete Synchronization Demo
// Banking system with thread safety

public class SynchronizationDemo {
    public static void main(String[] args) {
        System.out.println("╔════════════════════════════════════════════════╗");
        System.out.println("║    🔒 SYNCHRONIZATION DEMONSTRATION            ║");
        System.out.println("╚════════════════════════════════════════════════╝");
        
        // ═══════════════════════════════════════════════════
        // PART 1: Race Condition Problem
        // ═══════════════════════════════════════════════════
        System.out.println("\\n" + "═".repeat(50));
        System.out.println("PART 1: RACE CONDITION (Without Sync)");
        System.out.println("═".repeat(50));
        
        System.out.println("\\n// Unsafe Bank Account");
        System.out.println("class UnsafeBankAccount {");
        System.out.println("    private double balance = 1000;");
        System.out.println("    ");
        System.out.println("    public void withdraw(double amount) {");
        System.out.println("        if (balance >= amount) {");
        System.out.println("            // Simulate processing delay");
        System.out.println("            Thread.sleep(100);");
        System.out.println("            balance -= amount;");
        System.out.println("        }");
        System.out.println("    }");
        System.out.println("}");
        
        System.out.println("\\n📋 Simulation: Two ATMs withdrawing $800 each");
        System.out.println("─".repeat(50));
        System.out.println("Initial Balance: $1000");
        System.out.println("\\n[ATM-1] Checking balance: $1000");
        System.out.println("[ATM-2] Checking balance: $1000");
        System.out.println("[ATM-1] Processing withdrawal...");
        System.out.println("[ATM-2] Processing withdrawal...");
        System.out.println("[ATM-1] Withdrawn $800. New balance: $200");
        System.out.println("[ATM-2] Withdrawn $800. New balance: $200");
        System.out.println("\\nPROBLEM: $1600 withdrawn from $1000!");
        System.out.println("   Final Balance: $200 (should be $200 or -$600)");
        System.out.println("   Bank lost: $600");
        
        // ═══════════════════════════════════════════════════
        // PART 2: Synchronized Method Solution
        // ═══════════════════════════════════════════════════
        System.out.println("\\n" + "═".repeat(50));
        System.out.println("PART 2: SYNCHRONIZED METHOD");
        System.out.println("═".repeat(50));
        
        System.out.println("\\n// Safe Bank Account with synchronized method");
        System.out.println("class SafeBankAccount {");
        System.out.println("    private double balance = 1000;");
        System.out.println("    ");
        System.out.println("    public synchronized void withdraw(double amount) {");
        System.out.println("        System.out.println(Thread.currentThread().getName() + ");
        System.out.println("            \\": Acquired lock\\");");
        System.out.println("        ");
        System.out.println("        if (balance >= amount) {");
        System.out.println("            Thread.sleep(100);");
        System.out.println("            balance -= amount;");
        System.out.println("            System.out.println(\\"Withdrawn: $\\" + amount);");
        System.out.println("        } else {");
        System.out.println("            System.out.println(\\"Insufficient funds!\\");");
        System.out.println("        }");
        System.out.println("        ");
        System.out.println("        System.out.println(Thread.currentThread().getName() + ");
        System.out.println("            \\": Released lock\\");");
        System.out.println("    }");
        System.out.println("}");
        
        System.out.println("\\n📋 Simulation with Synchronization:");
        System.out.println("─".repeat(50));
        System.out.println("Initial Balance: $1000");
        System.out.println("\\n[ATM-1] Acquired lock");
        System.out.println("[ATM-2] Waiting for lock...");
        System.out.println("[ATM-1] Checking balance: $1000");
        System.out.println("[ATM-1] Processing withdrawal...");
        System.out.println("[ATM-1] Withdrawn $800. Balance: $200");
        System.out.println("[ATM-1] Released lock");
        System.out.println("[ATM-2] Acquired lock");
        System.out.println("[ATM-2] Checking balance: $200");
        System.out.println("[ATM-2] Insufficient funds!");
        System.out.println("[ATM-2] Released lock");
        System.out.println("\\nSUCCESS: Only $800 withdrawn");
        System.out.println("   Final Balance: $200");
        
        // ═══════════════════════════════════════════════════
        // PART 3: Synchronized Block
        // ═══════════════════════════════════════════════════
        System.out.println("\\n" + "═".repeat(50));
        System.out.println("🎯 PART 3: SYNCHRONIZED BLOCK");
        System.out.println("═".repeat(50));
        
        System.out.println("\\n// Fine-grained synchronization");
        System.out.println("class Inventory {");
        System.out.println("    private Map<String, Integer> stock = new HashMap<>();");
        System.out.println("    private final Object lock = new Object();");
        System.out.println("    ");
        System.out.println("    public boolean purchase(String productId, int qty) {");
        System.out.println("        // Non-critical: validation (parallel)");
        System.out.println("        validateProduct(productId);");
        System.out.println("        logPurchaseAttempt(productId, qty);");
        System.out.println("        ");
        System.out.println("        // Critical section only");
        System.out.println("        synchronized (lock) {");
        System.out.println("            int available = stock.get(productId);");
        System.out.println("            if (available >= qty) {");
        System.out.println("                stock.put(productId, available - qty);");
        System.out.println("                return true;");
        System.out.println("            }");
        System.out.println("            return false;");
        System.out.println("        }");
        System.out.println("    }");
        System.out.println("}");
        
        System.out.println("\\n📊 Performance Comparison:");
        System.out.println("┌─────────────────────────────────────────────────┐");
        System.out.println("│ Approach              │ Lock Duration │ Perf   │");
        System.out.println("├───────────────────────┼───────────────┼────────┤");
        System.out.println("│ Synchronized Method   │ Entire method │ Slower │");
        System.out.println("│ Synchronized Block    │ Critical only │ Faster │");
        System.out.println("└───────────────────────┴───────────────┴────────┘");
        
        // ═══════════════════════════════════════════════════
        // PART 4: ReentrantLock
        // ═══════════════════════════════════════════════════
        System.out.println("\\n" + "═".repeat(50));
        System.out.println("🔐 PART 4: REENTRANT LOCK");
        System.out.println("═".repeat(50));
        
        System.out.println("\\nimport java.util.concurrent.locks.*;");
        System.out.println("\\nclass AdvancedAccount {");
        System.out.println("    private double balance = 1000;");
        System.out.println("    private final ReentrantLock lock = new ReentrantLock();");
        System.out.println("    ");
        System.out.println("    public boolean withdrawWithTimeout(double amount) {");
        System.out.println("        try {");
        System.out.println("            // Try to get lock with 5 second timeout");
        System.out.println("            if (lock.tryLock(5, TimeUnit.SECONDS)) {");
        System.out.println("                try {");
        System.out.println("                    if (balance >= amount) {");
        System.out.println("                        balance -= amount;");
        System.out.println("                        return true;");
        System.out.println("                    }");
        System.out.println("                    return false;");
        System.out.println("                } finally {");
        System.out.println("                    lock.unlock(); // Always unlock!");
        System.out.println("                }");
        System.out.println("            } else {");
        System.out.println("                System.out.println(\\"Could not acquire lock\\");");
        System.out.println("                return false;");
        System.out.println("            }");
        System.out.println("        } catch (InterruptedException e) {");
        System.out.println("            return false;");
        System.out.println("        }");
        System.out.println("    }");
        System.out.println("}");
        
        System.out.println("\\nReentrantLock Features:");
        System.out.println("   • tryLock() - Non-blocking attempt");
        System.out.println("   • tryLock(timeout) - Timeout-based");
        System.out.println("   • lockInterruptibly() - Cancellable");
        System.out.println("   • Fair mode - FIFO ordering");
        
        // ═══════════════════════════════════════════════════
        // PART 5: Deadlock Prevention
        // ═══════════════════════════════════════════════════
        System.out.println("\\n" + "═".repeat(50));
        System.out.println("⚠️ PART 5: DEADLOCK PREVENTION");
        System.out.println("═".repeat(50));
        
        System.out.println("\\nDeadlock Scenario:");
        System.out.println("┌─────────────────────────────────────────────────┐");
        System.out.println("│ Thread-1: Lock A → Waiting for Lock B          │");
        System.out.println("│ Thread-2: Lock B → Waiting for Lock A          │");
        System.out.println("│                                                 │");
        System.out.println("│ Both threads waiting forever! 💀               │");
        System.out.println("└─────────────────────────────────────────────────┘");
        
        System.out.println("\\nPrevention: Lock Ordering");
        System.out.println("// Always acquire locks in same order");
        System.out.println("public void transfer(Account from, Account to, double amount) {");
        System.out.println("    // Order by account ID to prevent deadlock");
        System.out.println("    Account first = from.getId() < to.getId() ? from : to;");
        System.out.println("    Account second = from.getId() < to.getId() ? to : from;");
        System.out.println("    ");
        System.out.println("    synchronized (first) {");
        System.out.println("        synchronized (second) {");
        System.out.println("            from.withdraw(amount);");
        System.out.println("            to.deposit(amount);");
        System.out.println("        }");
        System.out.println("    }");
        System.out.println("}");
        
        // ═══════════════════════════════════════════════════
        // SUMMARY
        // ═══════════════════════════════════════════════════
        System.out.println("\\n" + "═".repeat(50));
        System.out.println("📋 SYNCHRONIZATION SUMMARY");
        System.out.println("═".repeat(50));
        
        System.out.println("\\n| Method              | Use Case                    |");
        System.out.println("|---------------------|----------------------------|");
        System.out.println("| synchronized method | Simple, entire method lock |");
        System.out.println("| synchronized block  | Fine-grained control       |");
        System.out.println("| ReentrantLock       | Timeout, interruptible     |");
        System.out.println("| ReadWriteLock       | Many readers, few writers  |");
        System.out.println("| Atomic classes      | Single variable operations |");
        
        System.out.println("\\n🏆 Best Practices:");
        System.out.println("   1. Minimize synchronized scope");
        System.out.println("   2. Use private lock objects");
        System.out.println("   3. Avoid nested locks (deadlock risk)");
        System.out.println("   4. Prefer concurrent collections");
        System.out.println("   5. Always unlock in finally block");
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a thread-safe ticket booking system that prevents overbooking',
      hint: 'Use synchronized methods or blocks to ensure only available tickets can be booked',
      starterCode: `public class TicketBookingSystem {
    public static void main(String[] args) {
        // Available tickets: 5
        // Multiple users trying to book simultaneously
        
        // Implement synchronized booking
        // Show what happens without sync (overbooking)
        // Show correct behavior with sync
    }
}`
    }
  ]
};

export default synchronization;
