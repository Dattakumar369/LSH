const customExceptions = {
  id: 'custom-exceptions',
  title: 'Custom Exceptions',
  description: 'Creating your own exception classes',
  content: `
# Custom Exceptions — When Built-in Isn't Enough

Java provides many built-in exceptions, but sometimes you need exceptions specific to your application. A \`UserNotFoundException\` is more meaningful than a generic \`RuntimeException\`.

---

## Why Create Custom Exceptions?

1. **Clarity** — \`InsufficientFundsException\` is clearer than \`Exception\`
2. **Specific handling** — Catch specific business errors
3. **Additional data** — Include relevant information
4. **Documentation** — Self-documenting code

---

## Creating a Custom Exception

### Basic Custom Exception

\`\`\`java
public class UserNotFoundException extends Exception {
    public UserNotFoundException(String message) {
        super(message);
    }
}
\`\`\`

### With Additional Data

\`\`\`java
public class UserNotFoundException extends Exception {
    private Long userId;
    
    public UserNotFoundException(Long userId) {
        super("User not found with ID: " + userId);
        this.userId = userId;
    }
    
    public Long getUserId() {
        return userId;
    }
}
\`\`\`

---

## Checked vs Unchecked Custom Exceptions

### Checked Exception (extends Exception)

Caller MUST handle or declare:

\`\`\`java
public class InsufficientFundsException extends Exception {
    public InsufficientFundsException(String message) {
        super(message);
    }
}

// Caller must handle
public void withdraw(double amount) throws InsufficientFundsException {
    if (amount > balance) {
        throw new InsufficientFundsException("Not enough funds");
    }
}
\`\`\`

### Unchecked Exception (extends RuntimeException)

Caller doesn't have to handle:

\`\`\`java
public class InvalidInputException extends RuntimeException {
    public InvalidInputException(String message) {
        super(message);
    }
}

// Caller doesn't have to handle
public void setAge(int age) {
    if (age < 0) {
        throw new InvalidInputException("Age cannot be negative");
    }
}
\`\`\`

---

## When to Use Which

| Use Checked Exception When | Use Unchecked Exception When |
|---------------------------|------------------------------|
| Caller can recover | Programming error |
| Business rule violation | Invalid argument |
| External resource failure | Null pointer |
| Caller should be forced to handle | Caller can't reasonably recover |

---

## Complete Custom Exception Template

\`\`\`java
public class BusinessException extends Exception {
    private String errorCode;
    private Map<String, Object> details;
    
    // Basic constructor
    public BusinessException(String message) {
        super(message);
    }
    
    // With error code
    public BusinessException(String message, String errorCode) {
        super(message);
        this.errorCode = errorCode;
    }
    
    // With cause
    public BusinessException(String message, Throwable cause) {
        super(message, cause);
    }
    
    // Full constructor
    public BusinessException(String message, String errorCode, Throwable cause) {
        super(message, cause);
        this.errorCode = errorCode;
    }
    
    // Getters
    public String getErrorCode() { return errorCode; }
    
    // Add details
    public BusinessException addDetail(String key, Object value) {
        if (details == null) {
            details = new HashMap<>();
        }
        details.put(key, value);
        return this;
    }
    
    public Map<String, Object> getDetails() {
        return details != null ? details : Collections.emptyMap();
    }
}
\`\`\`

---

## Exception Hierarchy for Your Application

\`\`\`java
// Base exception for your application
public class AppException extends Exception {
    public AppException(String message) { super(message); }
    public AppException(String message, Throwable cause) { super(message, cause); }
}

// Service layer exceptions
public class ServiceException extends AppException {
    public ServiceException(String message) { super(message); }
}

// Data access exceptions
public class DataAccessException extends AppException {
    public DataAccessException(String message, Throwable cause) { 
        super(message, cause); 
    }
}

// Specific exceptions
public class UserNotFoundException extends ServiceException {
    private Long userId;
    
    public UserNotFoundException(Long userId) {
        super("User not found: " + userId);
        this.userId = userId;
    }
}

public class DuplicateEmailException extends ServiceException {
    private String email;
    
    public DuplicateEmailException(String email) {
        super("Email already exists: " + email);
        this.email = email;
    }
}
\`\`\`

---

## Real-World Example: E-Commerce

\`\`\`java
// Base exception
public class ECommerceException extends Exception {
    private String errorCode;
    
    public ECommerceException(String message, String errorCode) {
        super(message);
        this.errorCode = errorCode;
    }
    
    public String getErrorCode() { return errorCode; }
}

// Order exceptions
public class OrderException extends ECommerceException {
    private Long orderId;
    
    public OrderException(String message, String errorCode, Long orderId) {
        super(message, errorCode);
        this.orderId = orderId;
    }
}

public class OrderNotFoundException extends OrderException {
    public OrderNotFoundException(Long orderId) {
        super("Order not found", "ORDER_NOT_FOUND", orderId);
    }
}

public class OrderAlreadyShippedException extends OrderException {
    public OrderAlreadyShippedException(Long orderId) {
        super("Order already shipped", "ORDER_SHIPPED", orderId);
    }
}

// Payment exceptions
public class PaymentException extends ECommerceException {
    private Double amount;
    
    public PaymentException(String message, String errorCode, Double amount) {
        super(message, errorCode);
        this.amount = amount;
    }
}

public class PaymentDeclinedException extends PaymentException {
    private String reason;
    
    public PaymentDeclinedException(Double amount, String reason) {
        super("Payment declined: " + reason, "PAYMENT_DECLINED", amount);
        this.reason = reason;
    }
}

// Inventory exceptions
public class InsufficientStockException extends ECommerceException {
    private String productId;
    private int requested;
    private int available;
    
    public InsufficientStockException(String productId, int requested, int available) {
        super("Insufficient stock for product: " + productId, "INSUFFICIENT_STOCK");
        this.productId = productId;
        this.requested = requested;
        this.available = available;
    }
}
\`\`\`

---

## Best Practices

### 1. Meaningful Names

\`\`\`java
// BAD
class MyException extends Exception { }

// GOOD
class UserNotFoundException extends Exception { }
\`\`\`

### 2. Include Relevant Data

\`\`\`java
// BAD
throw new UserNotFoundException("User not found");

// GOOD
throw new UserNotFoundException(userId);  // Exception stores the ID
\`\`\`

### 3. Provide Multiple Constructors

\`\`\`java
public class ServiceException extends Exception {
    public ServiceException(String message) {
        super(message);
    }
    
    public ServiceException(String message, Throwable cause) {
        super(message, cause);
    }
}
\`\`\`

### 4. Document Your Exceptions

\`\`\`java
/**
 * Thrown when a user attempts to withdraw more than their balance.
 * Contains the available balance and requested amount for error handling.
 */
public class InsufficientFundsException extends Exception {
    // ...
}
\`\`\`
`,
  code: `// Custom Exceptions Demo

import java.util.*;

public class CustomExceptionsDemo {
    public static void main(String[] args) {
        System.out.println("=== Custom Exceptions Demo ===\\n");
        
        // 1. BASIC CUSTOM EXCEPTION
        System.out.println("1. BASIC CUSTOM EXCEPTION");
        System.out.println("   ------------------------");
        
        UserService userService = new UserService();
        
        try {
            userService.findUser(999L);
        } catch (UserNotFoundException e) {
            System.out.println("   Caught: " + e.getMessage());
            System.out.println("   User ID: " + e.getUserId());
        }
        System.out.println();
        
        // 2. EXCEPTION WITH ADDITIONAL DATA
        System.out.println("2. EXCEPTION WITH ADDITIONAL DATA");
        System.out.println("   --------------------------------");
        
        BankService bankService = new BankService();
        
        try {
            bankService.withdraw("ACC001", 5000);
        } catch (InsufficientFundsException e) {
            System.out.println("   Caught: " + e.getMessage());
            System.out.println("   Account: " + e.getAccountId());
            System.out.println("   Requested: $" + e.getRequestedAmount());
            System.out.println("   Available: $" + e.getAvailableBalance());
        }
        System.out.println();
        
        // 3. EXCEPTION HIERARCHY
        System.out.println("3. EXCEPTION HIERARCHY");
        System.out.println("   --------------------");
        
        OrderService orderService = new OrderService();
        
        try {
            orderService.cancelOrder(123L);
        } catch (OrderAlreadyShippedException e) {
            System.out.println("   Caught: " + e.getMessage());
            System.out.println("   Error Code: " + e.getErrorCode());
            System.out.println("   Order ID: " + e.getOrderId());
        } catch (OrderException e) {
            System.out.println("   Generic order error: " + e.getMessage());
        }
        System.out.println();
        
        // 4. VALIDATION EXCEPTIONS
        System.out.println("4. VALIDATION EXCEPTIONS");
        System.out.println("   ----------------------");
        
        RegistrationService regService = new RegistrationService();
        
        // Test various invalid inputs
        String[][] testCases = {
            {"", "test@email.com", "password123"},
            {"John", "invalid-email", "password123"},
            {"John", "john@email.com", "123"},
            {"John", "john@email.com", "password123"}
        };
        
        for (String[] testCase : testCases) {
            try {
                regService.register(testCase[0], testCase[1], testCase[2]);
                System.out.println("   Registration successful for: " + testCase[0]);
            } catch (ValidationException e) {
                System.out.println("   Validation failed: " + e.getMessage());
                System.out.println("     Field: " + e.getFieldName());
            }
        }
        System.out.println();
        
        // 5. CHAINED EXCEPTIONS
        System.out.println("5. CHAINED EXCEPTIONS");
        System.out.println("   -------------------");
        
        DataService dataService = new DataService();
        
        try {
            dataService.fetchData();
        } catch (ServiceException e) {
            System.out.println("   Service error: " + e.getMessage());
            System.out.println("   Caused by: " + e.getCause().getMessage());
        }
        System.out.println();
        
        // 6. REAL-WORLD E-COMMERCE EXAMPLE
        System.out.println("6. REAL-WORLD E-COMMERCE EXAMPLE");
        System.out.println("   -------------------------------");
        
        ECommerceService ecommerce = new ECommerceService();
        
        // Test insufficient stock
        try {
            ecommerce.placeOrder("PROD001", 100);
        } catch (InsufficientStockException e) {
            System.out.println("   Stock error: " + e.getMessage());
            System.out.println("   Product: " + e.getProductId());
            System.out.println("   Requested: " + e.getRequested());
            System.out.println("   Available: " + e.getAvailable());
        } catch (ECommerceException e) {
            System.out.println("   E-commerce error: " + e.getMessage());
        }
        
        // Test payment declined
        try {
            ecommerce.processPayment(1000, "4111111111111111");
        } catch (PaymentDeclinedException e) {
            System.out.println("\\n   Payment error: " + e.getMessage());
            System.out.println("   Amount: $" + e.getAmount());
            System.out.println("   Reason: " + e.getReason());
        } catch (ECommerceException e) {
            System.out.println("   E-commerce error: " + e.getMessage());
        }
    }
}

// ============ Custom Exception Classes ============

// Basic custom exception
class UserNotFoundException extends Exception {
    private Long userId;
    
    public UserNotFoundException(Long userId) {
        super("User not found with ID: " + userId);
        this.userId = userId;
    }
    
    public Long getUserId() { return userId; }
}

// Exception with additional data
class InsufficientFundsException extends Exception {
    private String accountId;
    private double requestedAmount;
    private double availableBalance;
    
    public InsufficientFundsException(String accountId, double requested, double available) {
        super("Insufficient funds in account: " + accountId);
        this.accountId = accountId;
        this.requestedAmount = requested;
        this.availableBalance = available;
    }
    
    public String getAccountId() { return accountId; }
    public double getRequestedAmount() { return requestedAmount; }
    public double getAvailableBalance() { return availableBalance; }
}

// Exception hierarchy
class OrderException extends Exception {
    private String errorCode;
    private Long orderId;
    
    public OrderException(String message, String errorCode, Long orderId) {
        super(message);
        this.errorCode = errorCode;
        this.orderId = orderId;
    }
    
    public String getErrorCode() { return errorCode; }
    public Long getOrderId() { return orderId; }
}

class OrderNotFoundException extends OrderException {
    public OrderNotFoundException(Long orderId) {
        super("Order not found", "ORDER_NOT_FOUND", orderId);
    }
}

class OrderAlreadyShippedException extends OrderException {
    public OrderAlreadyShippedException(Long orderId) {
        super("Cannot cancel - order already shipped", "ORDER_SHIPPED", orderId);
    }
}

// Validation exception
class ValidationException extends RuntimeException {
    private String fieldName;
    
    public ValidationException(String fieldName, String message) {
        super(message);
        this.fieldName = fieldName;
    }
    
    public String getFieldName() { return fieldName; }
}

// Service exception with cause
class ServiceException extends Exception {
    public ServiceException(String message, Throwable cause) {
        super(message, cause);
    }
}

// E-Commerce exceptions
class ECommerceException extends Exception {
    private String errorCode;
    
    public ECommerceException(String message, String errorCode) {
        super(message);
        this.errorCode = errorCode;
    }
    
    public String getErrorCode() { return errorCode; }
}

class InsufficientStockException extends ECommerceException {
    private String productId;
    private int requested;
    private int available;
    
    public InsufficientStockException(String productId, int requested, int available) {
        super("Insufficient stock for product: " + productId, "INSUFFICIENT_STOCK");
        this.productId = productId;
        this.requested = requested;
        this.available = available;
    }
    
    public String getProductId() { return productId; }
    public int getRequested() { return requested; }
    public int getAvailable() { return available; }
}

class PaymentDeclinedException extends ECommerceException {
    private double amount;
    private String reason;
    
    public PaymentDeclinedException(double amount, String reason) {
        super("Payment declined: " + reason, "PAYMENT_DECLINED");
        this.amount = amount;
        this.reason = reason;
    }
    
    public double getAmount() { return amount; }
    public String getReason() { return reason; }
}

// ============ Service Classes ============

class UserService {
    public void findUser(Long userId) throws UserNotFoundException {
        // Simulating user not found
        throw new UserNotFoundException(userId);
    }
}

class BankService {
    public void withdraw(String accountId, double amount) throws InsufficientFundsException {
        double balance = 1000;  // Simulated balance
        if (amount > balance) {
            throw new InsufficientFundsException(accountId, amount, balance);
        }
    }
}

class OrderService {
    public void cancelOrder(Long orderId) throws OrderException {
        // Simulating order already shipped
        throw new OrderAlreadyShippedException(orderId);
    }
}

class RegistrationService {
    public void register(String name, String email, String password) {
        if (name == null || name.trim().isEmpty()) {
            throw new ValidationException("name", "Name is required");
        }
        if (email == null || !email.contains("@")) {
            throw new ValidationException("email", "Valid email is required");
        }
        if (password == null || password.length() < 8) {
            throw new ValidationException("password", "Password must be at least 8 characters");
        }
    }
}

class DataService {
    public void fetchData() throws ServiceException {
        try {
            // Simulating database error
            throw new RuntimeException("Database connection failed");
        } catch (RuntimeException e) {
            throw new ServiceException("Failed to fetch data", e);
        }
    }
}

class ECommerceService {
    public void placeOrder(String productId, int quantity) throws ECommerceException {
        int stock = 50;  // Simulated stock
        if (quantity > stock) {
            throw new InsufficientStockException(productId, quantity, stock);
        }
    }
    
    public void processPayment(double amount, String cardNumber) throws ECommerceException {
        // Simulating payment decline
        throw new PaymentDeclinedException(amount, "Card expired");
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a library management system with custom exceptions',
      hint: 'Create exceptions for book not found, already borrowed, overdue, etc.',
      starterCode: `import java.util.*;

public class LibraryDemo {
    public static void main(String[] args) {
        System.out.println("=== Library Management System ===\\n");
        
        Library library = new Library();
        
        // Add some books
        library.addBook(new Book("B001", "Java Programming", "John Doe"));
        library.addBook(new Book("B002", "Python Basics", "Jane Smith"));
        
        // Test scenarios
        try {
            // Borrow a book
            library.borrowBook("B001", "Alice");
            System.out.println("Alice borrowed B001");
            
            // Try to borrow same book
            library.borrowBook("B001", "Bob");
        } catch (BookNotAvailableException e) {
            System.out.println(e.getMessage());
            System.out.println("  Borrowed by: " + e.getCurrentBorrower());
        }
        
        try {
            // Return a book
            library.returnBook("B001", "Alice");
            System.out.println("Alice returned B001");
            
            // Try to return book not borrowed
            library.returnBook("B002", "Alice");
        } catch (BookNotBorrowedException e) {
            System.out.println(e.getMessage());
        }
        
        try {
            // Find non-existent book
            library.findBook("B999");
        } catch (BookNotFoundException e) {
            System.out.println(e.getMessage());
            System.out.println("  Book ID: " + e.getBookId());
        }
    }
}

// Custom exceptions
class LibraryException extends Exception {
    public LibraryException(String message) {
        super(message);
    }
}

class BookNotFoundException extends LibraryException {
    private String bookId;
    
    public BookNotFoundException(String bookId) {
        super("Book not found: " + bookId);
        this.bookId = bookId;
    }
    
    public String getBookId() { return bookId; }
}

class BookNotAvailableException extends LibraryException {
    private String bookId;
    private String currentBorrower;
    
    public BookNotAvailableException(String bookId, String borrower) {
        super("Book " + bookId + " is not available");
        this.bookId = bookId;
        this.currentBorrower = borrower;
    }
    
    public String getBookId() { return bookId; }
    public String getCurrentBorrower() { return currentBorrower; }
}

class BookNotBorrowedException extends LibraryException {
    public BookNotBorrowedException(String bookId) {
        super("Book " + bookId + " was not borrowed");
    }
}

// Book class
class Book {
    String id;
    String title;
    String author;
    String borrowedBy;
    
    public Book(String id, String title, String author) {
        this.id = id;
        this.title = title;
        this.author = author;
    }
    
    public boolean isAvailable() {
        return borrowedBy == null;
    }
}

// Library class
class Library {
    private Map<String, Book> books = new HashMap<>();
    
    public void addBook(Book book) {
        books.put(book.id, book);
    }
    
    public Book findBook(String bookId) throws BookNotFoundException {
        Book book = books.get(bookId);
        if (book == null) {
            throw new BookNotFoundException(bookId);
        }
        return book;
    }
    
    public void borrowBook(String bookId, String borrower) 
            throws BookNotFoundException, BookNotAvailableException {
        Book book = findBook(bookId);
        if (!book.isAvailable()) {
            throw new BookNotAvailableException(bookId, book.borrowedBy);
        }
        book.borrowedBy = borrower;
    }
    
    public void returnBook(String bookId, String borrower) 
            throws BookNotFoundException, BookNotBorrowedException {
        Book book = findBook(bookId);
        if (book.isAvailable() || !book.borrowedBy.equals(borrower)) {
            throw new BookNotBorrowedException(bookId);
        }
        book.borrowedBy = null;
    }
}`
    }
  ]
};

export default customExceptions;
