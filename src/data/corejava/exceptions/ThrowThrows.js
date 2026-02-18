const throwThrows = {
  id: 'throw-throws',
  title: 'Throw and Throws',
  description: 'Creating and declaring exceptions',
  content: `
# Throw and Throws — Taking Control of Exceptions

Sometimes you need to create your own exceptions or tell callers that your method might throw one. That's where \`throw\` and \`throws\` come in.

**throw** — Actually throws an exception
**throws** — Declares that a method might throw an exception

---

## The \`throw\` Keyword

Use \`throw\` to explicitly throw an exception:

\`\`\`java
public void setAge(int age) {
    if (age < 0) {
        throw new IllegalArgumentException("Age cannot be negative");
    }
    this.age = age;
}
\`\`\`

When you \`throw\`:
1. An exception object is created
2. Normal execution stops
3. JVM looks for a catch block
4. If not found, program terminates

---

## Creating Exception Objects

\`\`\`java
// With message
throw new IllegalArgumentException("Invalid input");

// With message and cause
throw new RuntimeException("Operation failed", originalException);

// Without message
throw new NullPointerException();
\`\`\`

---

## The \`throws\` Keyword

Use \`throws\` in the method signature to declare checked exceptions:

\`\`\`java
public void readFile(String path) throws IOException {
    FileReader reader = new FileReader(path);
    // ...
}
\`\`\`

This tells callers: "This method might throw an IOException. You need to handle it."

---

## throw vs throws

| throw | throws |
|-------|--------|
| Actually throws an exception | Declares possible exceptions |
| Used inside method body | Used in method signature |
| Followed by exception object | Followed by exception class(es) |
| Can throw one at a time | Can declare multiple |

\`\`\`java
// throws - declaration
public void process() throws IOException, SQLException {
    // throw - actually throwing
    if (error) {
        throw new IOException("File error");
    }
}
\`\`\`

---

## When to Use throws

### Checked Exceptions — Must Declare

\`\`\`java
// Must declare or handle
public void readFile() throws IOException {
    FileReader fr = new FileReader("file.txt");
}

// Or handle it
public void readFile() {
    try {
        FileReader fr = new FileReader("file.txt");
    } catch (IOException e) {
        // handle
    }
}
\`\`\`

### Unchecked Exceptions — Optional

\`\`\`java
// Not required (but can be documented)
public void divide(int a, int b) {
    if (b == 0) {
        throw new ArithmeticException("Cannot divide by zero");
    }
}
\`\`\`

---

## Propagating Exceptions

You can let exceptions bubble up to the caller:

\`\`\`java
public void methodA() throws IOException {
    methodB();  // Don't catch, let it propagate
}

public void methodB() throws IOException {
    methodC();  // Don't catch, let it propagate
}

public void methodC() throws IOException {
    throw new IOException("Original error");
}
\`\`\`

The caller of \`methodA\` must handle the exception.

---

## Re-throwing Exceptions

Catch, do something, then re-throw:

\`\`\`java
public void process() throws IOException {
    try {
        readFile();
    } catch (IOException e) {
        logger.error("Error reading file", e);
        throw e;  // Re-throw same exception
    }
}
\`\`\`

Or wrap in a different exception:

\`\`\`java
public void process() throws ServiceException {
    try {
        readFile();
    } catch (IOException e) {
        throw new ServiceException("Processing failed", e);
    }
}
\`\`\`

---

## Exception Chaining

Preserve the original cause:

\`\`\`java
try {
    // database operation
} catch (SQLException e) {
    throw new DataAccessException("Failed to fetch user", e);
}
\`\`\`

Later, you can get the original cause:

\`\`\`java
catch (DataAccessException e) {
    Throwable cause = e.getCause();  // Original SQLException
}
\`\`\`

---

## Validation with throw

Common pattern for input validation:

\`\`\`java
public void createUser(String name, String email, int age) {
    // Validate name
    if (name == null || name.trim().isEmpty()) {
        throw new IllegalArgumentException("Name cannot be empty");
    }
    
    // Validate email
    if (email == null || !email.contains("@")) {
        throw new IllegalArgumentException("Invalid email format");
    }
    
    // Validate age
    if (age < 0 || age > 150) {
        throw new IllegalArgumentException("Age must be between 0 and 150");
    }
    
    // All valid, proceed
    // ...
}
\`\`\`

---

## Objects.requireNonNull

Java provides a utility for null checks:

\`\`\`java
import java.util.Objects;

public void setName(String name) {
    this.name = Objects.requireNonNull(name, "Name cannot be null");
}
\`\`\`

---

## Best Practices

### 1. Use Specific Exceptions

\`\`\`java
// BAD
throw new Exception("Something went wrong");

// GOOD
throw new IllegalArgumentException("Age must be positive");
\`\`\`

### 2. Include Meaningful Messages

\`\`\`java
// BAD
throw new IllegalArgumentException();

// GOOD
throw new IllegalArgumentException("Expected positive number, got: " + value);
\`\`\`

### 3. Don't Catch and Ignore

\`\`\`java
// BAD
catch (Exception e) { }

// GOOD
catch (Exception e) {
    logger.error("Operation failed", e);
    throw new ServiceException("Operation failed", e);
}
\`\`\`

### 4. Document with Javadoc

\`\`\`java
/**
 * Withdraws money from account.
 * @param amount The amount to withdraw
 * @throws IllegalArgumentException if amount is negative
 * @throws InsufficientFundsException if balance is too low
 */
public void withdraw(double amount) throws InsufficientFundsException {
    // ...
}
\`\`\`

---

## Real-World Example: User Service

\`\`\`java
public class UserService {
    
    public User findById(Long id) throws UserNotFoundException {
        Objects.requireNonNull(id, "User ID cannot be null");
        
        User user = userRepository.findById(id);
        if (user == null) {
            throw new UserNotFoundException("User not found with ID: " + id);
        }
        return user;
    }
    
    public void updateEmail(Long userId, String newEmail) 
            throws UserNotFoundException, InvalidEmailException {
        
        if (!isValidEmail(newEmail)) {
            throw new InvalidEmailException("Invalid email format: " + newEmail);
        }
        
        User user = findById(userId);  // May throw UserNotFoundException
        user.setEmail(newEmail);
        userRepository.save(user);
    }
}
\`\`\`
`,
  code: `// Throw and Throws Demo

import java.util.*;

public class ThrowThrowsDemo {
    public static void main(String[] args) {
        System.out.println("=== Throw and Throws Demo ===\\n");
        
        // 1. BASIC THROW
        System.out.println("1. BASIC THROW");
        System.out.println("   ------------");
        
        try {
            validateAge(-5);
        } catch (IllegalArgumentException e) {
            System.out.println("   Caught: " + e.getMessage());
        }
        
        try {
            validateAge(25);
            System.out.println("   Age 25 is valid");
        } catch (IllegalArgumentException e) {
            System.out.println("   Caught: " + e.getMessage());
        }
        System.out.println();
        
        // 2. THROWS DECLARATION
        System.out.println("2. THROWS DECLARATION");
        System.out.println("   -------------------");
        
        try {
            processFile("data.txt");
        } catch (Exception e) {
            System.out.println("   Caught: " + e.getClass().getSimpleName());
            System.out.println("   Message: " + e.getMessage());
        }
        System.out.println();
        
        // 3. EXCEPTION CHAINING
        System.out.println("3. EXCEPTION CHAINING");
        System.out.println("   -------------------");
        
        try {
            performOperation();
        } catch (ServiceException e) {
            System.out.println("   Caught: " + e.getMessage());
            System.out.println("   Caused by: " + e.getCause().getMessage());
        }
        System.out.println();
        
        // 4. RE-THROWING EXCEPTIONS
        System.out.println("4. RE-THROWING EXCEPTIONS");
        System.out.println("   -----------------------");
        
        try {
            outerMethod();
        } catch (Exception e) {
            System.out.println("   Final catch: " + e.getMessage());
        }
        System.out.println();
        
        // 5. VALIDATION PATTERN
        System.out.println("5. VALIDATION PATTERN");
        System.out.println("   -------------------");
        
        UserValidator validator = new UserValidator();
        
        String[] testNames = {"John", "", null};
        String[] testEmails = {"john@email.com", "invalid", null};
        int[] testAges = {25, -5, 200};
        
        for (int i = 0; i < 3; i++) {
            try {
                validator.validate(testNames[i], testEmails[i], testAges[i]);
                System.out.println("   Valid: " + testNames[i]);
            } catch (IllegalArgumentException e) {
                System.out.println("   Invalid: " + e.getMessage());
            }
        }
        System.out.println();
        
        // 6. OBJECTS.REQUIRENONNULL
        System.out.println("6. OBJECTS.REQUIRENONNULL");
        System.out.println("   -----------------------");
        
        try {
            setUsername(null);
        } catch (NullPointerException e) {
            System.out.println("   Caught: " + e.getMessage());
        }
        
        try {
            setUsername("john_doe");
            System.out.println("   Username set successfully");
        } catch (NullPointerException e) {
            System.out.println("   Caught: " + e.getMessage());
        }
        System.out.println();
        
        // 7. REAL-WORLD EXAMPLE
        System.out.println("7. REAL-WORLD EXAMPLE - Bank Account");
        System.out.println("   -----------------------------------");
        
        BankAccount account = new BankAccount("Alice", 1000);
        
        try {
            account.deposit(500);
            account.withdraw(200);
            account.withdraw(2000);  // Should fail
        } catch (InsufficientFundsException e) {
            System.out.println("   Error: " + e.getMessage());
            System.out.println("   Available: $" + e.getAvailableBalance());
            System.out.println("   Requested: $" + e.getRequestedAmount());
        } catch (IllegalArgumentException e) {
            System.out.println("   Error: " + e.getMessage());
        }
        
        System.out.println("   Final balance: $" + account.getBalance());
    }
    
    // Basic throw
    static void validateAge(int age) {
        if (age < 0) {
            throw new IllegalArgumentException("Age cannot be negative: " + age);
        }
        if (age > 150) {
            throw new IllegalArgumentException("Age seems unrealistic: " + age);
        }
    }
    
    // Throws declaration
    static void processFile(String filename) throws FileProcessingException {
        // Simulating file processing that might fail
        throw new FileProcessingException("Could not process: " + filename);
    }
    
    // Exception chaining
    static void performOperation() throws ServiceException {
        try {
            // Simulating a low-level error
            throw new RuntimeException("Database connection failed");
        } catch (RuntimeException e) {
            throw new ServiceException("Service operation failed", e);
        }
    }
    
    // Re-throwing
    static void outerMethod() throws Exception {
        try {
            innerMethod();
        } catch (Exception e) {
            System.out.println("   Logging error: " + e.getMessage());
            throw e;  // Re-throw
        }
    }
    
    static void innerMethod() throws Exception {
        throw new Exception("Something went wrong in inner method");
    }
    
    // Objects.requireNonNull
    static void setUsername(String username) {
        String validated = Objects.requireNonNull(username, "Username cannot be null");
        System.out.println("   Setting username: " + validated);
    }
}

// Custom exceptions
class FileProcessingException extends Exception {
    public FileProcessingException(String message) {
        super(message);
    }
}

class ServiceException extends Exception {
    public ServiceException(String message, Throwable cause) {
        super(message, cause);
    }
}

class InsufficientFundsException extends Exception {
    private double availableBalance;
    private double requestedAmount;
    
    public InsufficientFundsException(String message, double available, double requested) {
        super(message);
        this.availableBalance = available;
        this.requestedAmount = requested;
    }
    
    public double getAvailableBalance() { return availableBalance; }
    public double getRequestedAmount() { return requestedAmount; }
}

// Validator class
class UserValidator {
    public void validate(String name, String email, int age) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Name cannot be empty");
        }
        if (email == null || !email.contains("@")) {
            throw new IllegalArgumentException("Invalid email: " + email);
        }
        if (age < 0 || age > 150) {
            throw new IllegalArgumentException("Invalid age: " + age);
        }
    }
}

// Bank Account with custom exception
class BankAccount {
    private String owner;
    private double balance;
    
    public BankAccount(String owner, double initialBalance) {
        this.owner = Objects.requireNonNull(owner, "Owner cannot be null");
        if (initialBalance < 0) {
            throw new IllegalArgumentException("Initial balance cannot be negative");
        }
        this.balance = initialBalance;
    }
    
    public void deposit(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Deposit amount must be positive");
        }
        balance += amount;
        System.out.println("   Deposited: $" + amount);
    }
    
    public void withdraw(double amount) throws InsufficientFundsException {
        if (amount <= 0) {
            throw new IllegalArgumentException("Withdrawal amount must be positive");
        }
        if (amount > balance) {
            throw new InsufficientFundsException(
                "Insufficient funds for withdrawal",
                balance,
                amount
            );
        }
        balance -= amount;
        System.out.println("   Withdrew: $" + amount);
    }
    
    public double getBalance() { return balance; }
}`,
  practiceQuestions: [
    {
      question: 'Create a password validator that throws custom exceptions',
      hint: 'Create different exceptions for different validation failures',
      starterCode: `import java.util.*;

public class PasswordValidatorDemo {
    public static void main(String[] args) {
        System.out.println("=== Password Validator ===\\n");
        
        PasswordValidator validator = new PasswordValidator();
        
        String[] passwords = {
            "abc",           // Too short
            "abcdefgh",      // No uppercase
            "ABCDEFGH",      // No lowercase
            "Abcdefgh",      // No digit
            "Abcdefg1",      // No special char
            "Abcdef1!",      // Valid!
            null             // Null
        };
        
        for (String password : passwords) {
            try {
                validator.validate(password);
                System.out.println("Valid password: " + password);
            } catch (PasswordValidationException e) {
                System.out.println("Invalid: " + e.getMessage());
            }
        }
    }
}

// Custom exception
class PasswordValidationException extends Exception {
    private String rule;
    
    public PasswordValidationException(String message, String rule) {
        super(message);
        this.rule = rule;
    }
    
    public String getRule() { return rule; }
}

class PasswordValidator {
    private static final int MIN_LENGTH = 8;
    
    public void validate(String password) throws PasswordValidationException {
        // Check null
        if (password == null) {
            throw new PasswordValidationException("Password cannot be null", "NOT_NULL");
        }
        
        // Check length
        if (password.length() < MIN_LENGTH) {
            throw new PasswordValidationException(
                "Password must be at least " + MIN_LENGTH + " characters",
                "MIN_LENGTH"
            );
        }
        
        // Check uppercase
        if (!password.matches(".*[A-Z].*")) {
            throw new PasswordValidationException(
                "Password must contain at least one uppercase letter",
                "UPPERCASE"
            );
        }
        
        // Check lowercase
        if (!password.matches(".*[a-z].*")) {
            throw new PasswordValidationException(
                "Password must contain at least one lowercase letter",
                "LOWERCASE"
            );
        }
        
        // Check digit
        if (!password.matches(".*[0-9].*")) {
            throw new PasswordValidationException(
                "Password must contain at least one digit",
                "DIGIT"
            );
        }
        
        // Check special character
        if (!password.matches(".*[!@#$%^&*()_+\\\\-=\\\\[\\\\]{};':\"\\\\\\\\|,.<>/?].*")) {
            throw new PasswordValidationException(
                "Password must contain at least one special character",
                "SPECIAL_CHAR"
            );
        }
    }
}`
    }
  ]
};

export default throwThrows;
