const encapsulation = {
  id: 'encapsulation',
  title: 'Encapsulation',
  description: 'Protecting data and hiding implementation details',
  content: `
# Encapsulation — Protecting Your Data

Imagine a bank account where anyone could directly change your balance to zero. Scary, right? That's why we need encapsulation — it protects your data from unauthorized access and modification.

**Encapsulation** = Data hiding + Controlled access

---

## The Problem Without Encapsulation

\`\`\`java
public class BankAccount {
    public double balance;  // Anyone can access!
}

BankAccount account = new BankAccount();
account.balance = 1000;
account.balance = -5000;  // Oops! Negative balance!
account.balance = 0;      // Someone just stole all the money!
\`\`\`

No validation, no protection, no control. This is dangerous.

---

## The Solution: Encapsulation

\`\`\`java
public class BankAccount {
    private double balance;  // Hidden from outside
    
    public double getBalance() {
        return balance;
    }
    
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        }
    }
    
    public boolean withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            return true;
        }
        return false;
    }
}
\`\`\`

Now:
- Balance can't be set directly
- Deposits must be positive
- Withdrawals can't exceed balance
- All access goes through controlled methods

---

## How to Implement Encapsulation

### Step 1: Make Fields Private

\`\`\`java
public class Person {
    private String name;
    private int age;
    private String email;
}
\`\`\`

### Step 2: Provide Getters (Read Access)

\`\`\`java
public String getName() {
    return name;
}

public int getAge() {
    return age;
}

public String getEmail() {
    return email;
}
\`\`\`

### Step 3: Provide Setters (Write Access with Validation)

\`\`\`java
public void setName(String name) {
    if (name != null && !name.trim().isEmpty()) {
        this.name = name;
    }
}

public void setAge(int age) {
    if (age >= 0 && age <= 150) {
        this.age = age;
    }
}

public void setEmail(String email) {
    if (email != null && email.contains("@")) {
        this.email = email;
    }
}
\`\`\`

---

## Access Modifiers

Java provides four access levels:

| Modifier | Class | Package | Subclass | World |
|----------|-------|---------|----------|-------|
| private | Yes | No | No | No |
| (default) | Yes | Yes | No | No |
| protected | Yes | Yes | Yes | No |
| public | Yes | Yes | Yes | Yes |

**Rule of thumb:** Start with \`private\`, only increase access when necessary.

---

## Getter and Setter Patterns

### Standard Pattern

\`\`\`java
private String name;

public String getName() {
    return name;
}

public void setName(String name) {
    this.name = name;
}
\`\`\`

### Boolean Getter (isXxx)

\`\`\`java
private boolean active;

public boolean isActive() {  // Not getActive()
    return active;
}

public void setActive(boolean active) {
    this.active = active;
}
\`\`\`

### Read-Only (No Setter)

\`\`\`java
private final String id;

public String getId() {
    return id;
}
// No setter - id can't be changed after creation
\`\`\`

### Computed Getter

\`\`\`java
private double price;
private int quantity;

public double getTotal() {
    return price * quantity;  // Calculated, not stored
}
\`\`\`

---

## Benefits of Encapsulation

### 1. Data Validation

\`\`\`java
public void setAge(int age) {
    if (age < 0) {
        throw new IllegalArgumentException("Age cannot be negative");
    }
    if (age > 150) {
        throw new IllegalArgumentException("Age seems unrealistic");
    }
    this.age = age;
}
\`\`\`

### 2. Flexibility to Change Implementation

\`\`\`java
// Original
private int ageInYears;

public int getAge() {
    return ageInYears;
}

// Changed to store birthdate instead
private LocalDate birthDate;

public int getAge() {
    return Period.between(birthDate, LocalDate.now()).getYears();
}
// External code doesn't need to change!
\`\`\`

### 3. Controlled Access

\`\`\`java
public class Order {
    private String status;
    
    // Can only set valid statuses
    public void setStatus(String status) {
        if (status.equals("PENDING") || 
            status.equals("PROCESSING") || 
            status.equals("SHIPPED") || 
            status.equals("DELIVERED")) {
            this.status = status;
        }
    }
}
\`\`\`

### 4. Debugging Made Easier

\`\`\`java
public void setBalance(double balance) {
    System.out.println("Balance changing from " + this.balance + " to " + balance);
    this.balance = balance;
}
// Now you can track every change!
\`\`\`

---

## Real-World Example: User Account

\`\`\`java
public class UserAccount {
    private String username;
    private String email;
    private String passwordHash;
    private boolean isLocked;
    private int failedLoginAttempts;
    private LocalDateTime lastLogin;
    
    // Username: read-only after creation
    public String getUsername() {
        return username;
    }
    
    // Email: validated
    public void setEmail(String email) {
        if (email != null && email.matches("^[\\\\w-\\\\.]+@[\\\\w-]+\\\\.[a-z]{2,}$")) {
            this.email = email;
        } else {
            throw new IllegalArgumentException("Invalid email format");
        }
    }
    
    // Password: never exposed, only verified
    public boolean verifyPassword(String password) {
        return hashPassword(password).equals(this.passwordHash);
    }
    
    public void changePassword(String oldPassword, String newPassword) {
        if (!verifyPassword(oldPassword)) {
            throw new SecurityException("Invalid current password");
        }
        if (newPassword.length() < 8) {
            throw new IllegalArgumentException("Password too short");
        }
        this.passwordHash = hashPassword(newPassword);
    }
    
    // Login attempts: controlled increment
    public void recordFailedLogin() {
        failedLoginAttempts++;
        if (failedLoginAttempts >= 5) {
            isLocked = true;
        }
    }
    
    public void recordSuccessfulLogin() {
        failedLoginAttempts = 0;
        lastLogin = LocalDateTime.now();
    }
    
    private String hashPassword(String password) {
        // Real implementation would use proper hashing
        return "hashed_" + password;
    }
}
\`\`\`

This is how real applications protect sensitive data!
`,
  code: `// Encapsulation Demo

public class EncapsulationDemo {
    public static void main(String[] args) {
        System.out.println("=== Encapsulation Demo ===\\n");
        
        // 1. WITHOUT ENCAPSULATION (Bad)
        System.out.println("1. WITHOUT ENCAPSULATION (Dangerous!)");
        System.out.println("   -----------------------------------");
        
        BadAccount badAccount = new BadAccount();
        badAccount.balance = 1000;
        System.out.println("   Initial balance: $" + badAccount.balance);
        
        badAccount.balance = -5000;  // No validation!
        System.out.println("   After setting -5000: $" + badAccount.balance);
        System.out.println("   (This should NOT be allowed!)");
        System.out.println();
        
        // 2. WITH ENCAPSULATION (Good)
        System.out.println("2. WITH ENCAPSULATION (Safe!)");
        System.out.println("   ---------------------------");
        
        GoodAccount goodAccount = new GoodAccount("Alice", 1000);
        System.out.println("   " + goodAccount);
        
        // Try valid operations
        goodAccount.deposit(500);
        System.out.println("   After deposit $500: " + goodAccount);
        
        goodAccount.withdraw(200);
        System.out.println("   After withdraw $200: " + goodAccount);
        
        // Try invalid operations
        System.out.println("\\n   Trying invalid operations:");
        goodAccount.deposit(-100);  // Rejected
        goodAccount.withdraw(5000); // Rejected
        System.out.println("   Balance unchanged: " + goodAccount);
        System.out.println();
        
        // 3. VALIDATION IN SETTERS
        System.out.println("3. VALIDATION IN SETTERS");
        System.out.println("   ----------------------");
        
        Person person = new Person();
        
        // Valid values
        person.setName("John Doe");
        person.setAge(25);
        person.setEmail("john@example.com");
        System.out.println("   " + person);
        
        // Invalid values (rejected)
        System.out.println("\\n   Trying invalid values:");
        person.setName("");        // Rejected
        person.setAge(-5);         // Rejected
        person.setEmail("invalid"); // Rejected
        System.out.println("   Values unchanged: " + person);
        System.out.println();
        
        // 4. READ-ONLY PROPERTIES
        System.out.println("4. READ-ONLY PROPERTIES");
        System.out.println("   ---------------------");
        
        Product product = new Product("P001", "Laptop", 999.99);
        System.out.println("   " + product);
        System.out.println("   Product ID: " + product.getId() + " (cannot be changed)");
        // product.setId("P002");  // No such method!
        System.out.println();
        
        // 5. COMPUTED PROPERTIES
        System.out.println("5. COMPUTED PROPERTIES");
        System.out.println("   --------------------");
        
        Rectangle rect = new Rectangle(5, 3);
        System.out.println("   Width: " + rect.getWidth());
        System.out.println("   Height: " + rect.getHeight());
        System.out.println("   Area: " + rect.getArea() + " (computed)");
        System.out.println("   Perimeter: " + rect.getPerimeter() + " (computed)");
        System.out.println();
        
        // 6. REAL-WORLD EXAMPLE
        System.out.println("6. REAL-WORLD EXAMPLE - User Account");
        System.out.println("   -----------------------------------");
        
        UserAccount user = new UserAccount("alice", "alice@email.com", "password123");
        System.out.println("   Created: " + user.getUsername());
        
        // Login attempts
        System.out.println("\\n   Simulating login attempts:");
        user.login("wrongpassword");
        user.login("wrongpassword");
        user.login("password123");  // Success
        
        System.out.println("\\n   Account status: " + (user.isLocked() ? "LOCKED" : "ACTIVE"));
    }
}

// Bad example - no encapsulation
class BadAccount {
    public double balance;  // Anyone can modify!
}

// Good example - proper encapsulation
class GoodAccount {
    private String owner;
    private double balance;
    
    public GoodAccount(String owner, double initialBalance) {
        this.owner = owner;
        this.balance = Math.max(0, initialBalance);
    }
    
    public String getOwner() {
        return owner;
    }
    
    public double getBalance() {
        return balance;
    }
    
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("   Deposited: $" + amount);
        } else {
            System.out.println("   Deposit rejected: amount must be positive");
        }
    }
    
    public boolean withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            System.out.println("   Withdrew: $" + amount);
            return true;
        }
        System.out.println("   Withdrawal rejected: insufficient funds or invalid amount");
        return false;
    }
    
    public String toString() {
        return owner + "'s account: $" + balance;
    }
}

// Person with validated setters
class Person {
    private String name;
    private int age;
    private String email;
    
    public String getName() { return name; }
    public int getAge() { return age; }
    public String getEmail() { return email; }
    
    public void setName(String name) {
        if (name != null && !name.trim().isEmpty()) {
            this.name = name;
        } else {
            System.out.println("   Name rejected: cannot be empty");
        }
    }
    
    public void setAge(int age) {
        if (age >= 0 && age <= 150) {
            this.age = age;
        } else {
            System.out.println("   Age rejected: must be 0-150");
        }
    }
    
    public void setEmail(String email) {
        if (email != null && email.contains("@") && email.contains(".")) {
            this.email = email;
        } else {
            System.out.println("   Email rejected: invalid format");
        }
    }
    
    public String toString() {
        return name + ", " + age + " years, " + email;
    }
}

// Product with read-only ID
class Product {
    private final String id;  // Cannot change after creation
    private String name;
    private double price;
    
    public Product(String id, String name, double price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
    
    public String getId() { return id; }
    public String getName() { return name; }
    public double getPrice() { return price; }
    
    public void setName(String name) { this.name = name; }
    public void setPrice(double price) { 
        if (price >= 0) this.price = price; 
    }
    
    public String toString() {
        return "[" + id + "] " + name + " - $" + price;
    }
}

// Rectangle with computed properties
class Rectangle {
    private double width;
    private double height;
    
    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }
    
    public double getWidth() { return width; }
    public double getHeight() { return height; }
    
    // Computed properties
    public double getArea() {
        return width * height;
    }
    
    public double getPerimeter() {
        return 2 * (width + height);
    }
}

// User account with security
class UserAccount {
    private String username;
    private String email;
    private String passwordHash;
    private boolean locked;
    private int failedAttempts;
    
    public UserAccount(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.passwordHash = hash(password);
        this.locked = false;
        this.failedAttempts = 0;
    }
    
    public String getUsername() { return username; }
    public boolean isLocked() { return locked; }
    
    public boolean login(String password) {
        if (locked) {
            System.out.println("   Account is locked!");
            return false;
        }
        
        if (hash(password).equals(passwordHash)) {
            failedAttempts = 0;
            System.out.println("   Login successful!");
            return true;
        } else {
            failedAttempts++;
            System.out.println("   Login failed! Attempts: " + failedAttempts);
            if (failedAttempts >= 3) {
                locked = true;
                System.out.println("   Account locked after 3 failed attempts!");
            }
            return false;
        }
    }
    
    private String hash(String password) {
        return "hash_" + password;  // Simplified
    }
}`,
  practiceQuestions: [
    {
      question: 'Create an Employee class with proper encapsulation',
      hint: 'Use private fields, getters/setters with validation',
      starterCode: `public class EmployeeDemo {
    public static void main(String[] args) {
        System.out.println("=== Employee Management ===\\n");
        
        Employee emp = new Employee("E001", "John Doe");
        
        // Set valid values
        emp.setDepartment("Engineering");
        emp.setSalary(75000);
        emp.setEmail("john.doe@company.com");
        
        emp.display();
        
        // Try invalid values
        System.out.println("\\nTrying invalid values:");
        emp.setSalary(-5000);      // Should reject
        emp.setEmail("invalid");   // Should reject
        
        // Give a raise
        System.out.println("\\nGiving 10% raise:");
        emp.giveRaise(10);
        emp.display();
    }
}

class Employee {
    private final String id;
    private String name;
    private String department;
    private double salary;
    private String email;
    
    public Employee(String id, String name) {
        this.id = id;
        this.name = name;
        this.department = "Unassigned";
        this.salary = 0;
    }
    
    // Getters
    public String getId() { return id; }
    public String getName() { return name; }
    public String getDepartment() { return department; }
    public double getSalary() { return salary; }
    public String getEmail() { return email; }
    
    // Setters with validation
    public void setDepartment(String department) {
        if (department != null && !department.isEmpty()) {
            this.department = department;
        }
    }
    
    public void setSalary(double salary) {
        if (salary >= 0) {
            this.salary = salary;
        } else {
            System.out.println("Salary cannot be negative!");
        }
    }
    
    public void setEmail(String email) {
        if (email != null && email.contains("@") && email.contains(".")) {
            this.email = email;
        } else {
            System.out.println("Invalid email format!");
        }
    }
    
    public void giveRaise(double percentage) {
        if (percentage > 0) {
            double raise = salary * (percentage / 100);
            salary += raise;
            System.out.println("Raise of $" + raise + " applied!");
        }
    }
    
    public void display() {
        System.out.println("ID: " + id);
        System.out.println("Name: " + name);
        System.out.println("Department: " + department);
        System.out.println("Salary: $" + salary);
        System.out.println("Email: " + email);
    }
}`
    }
  ]
};

export default encapsulation;
