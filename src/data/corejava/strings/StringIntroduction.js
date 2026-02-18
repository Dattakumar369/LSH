const stringIntroduction = {
  id: 'string-introduction',
  title: 'Introduction to Strings',
  description: 'Learn about String class in Java and string manipulation',
  content: `
# Introduction to Strings in Java

A String in Java is an object that represents a sequence of characters. Strings are immutable - once created, their values cannot be changed.

## String Creation

\`\`\`java
// Using string literal (recommended)
String name = "John";

// Using new keyword
String name = new String("John");
\`\`\`

## String Pool

Java maintains a special memory area called "String Pool" for string literals to optimize memory usage.

\`\`\`
String s1 = "Hello";  // Creates in String Pool
String s2 = "Hello";  // Reuses from String Pool
String s3 = new String("Hello");  // Creates in Heap

s1 == s2  // true (same reference)
s1 == s3  // false (different objects)
s1.equals(s3)  // true (same content)
\`\`\`

## String Immutability

\`\`\`java
String str = "Hello";
str.concat(" World");  // Creates new string, original unchanged
System.out.println(str);  // Still "Hello"

str = str.concat(" World");  // Reassign to get new value
System.out.println(str);  // Now "Hello World"
\`\`\`

## 🏢 Real-Time Project Example: E-Commerce Product Search

\`\`\`java
// Real-Time: Product Search and Filtering
// Used in Amazon, Flipkart search functionality

public class ProductSearch {
    public static void main(String[] args) {
        System.out.println("🔍 PRODUCT SEARCH SYSTEM");
        System.out.println("=========================");
        
        // Product catalog
        String[] products = {
            "Apple iPhone 15 Pro Max 256GB Blue",
            "Samsung Galaxy S24 Ultra 512GB Black",
            "Google Pixel 8 Pro 128GB White",
            "Apple MacBook Pro 16-inch M3 Max",
            "Samsung Galaxy Tab S9 Ultra WiFi",
            "Apple AirPods Pro 2nd Generation",
            "Sony WH-1000XM5 Wireless Headphones"
        };
        
        // Search query
        String searchQuery = "Apple";
        
        System.out.println("\\n📋 Search Query: \\"" + searchQuery + "\\"");
        System.out.println("─".repeat(50));
        
        // String operations for search
        System.out.println("\\n🔧 STRING OPERATIONS USED:");
        System.out.println("─".repeat(50));
        
        // 1. Case-insensitive search
        System.out.println("\\n1️⃣ toLowerCase() - Case Insensitive Search");
        String queryLower = searchQuery.toLowerCase();
        System.out.println("   Query: \\"" + searchQuery + "\\" → \\"" + queryLower + "\\"");
        
        // 2. Contains check
        System.out.println("\\n2️⃣ contains() - Check if product contains query");
        int matchCount = 0;
        System.out.println("\\n📦 Search Results:");
        System.out.println("┌────┬─────────────────────────────────────────┐");
        System.out.println("│ #  │ Product                                 │");
        System.out.println("├────┼─────────────────────────────────────────┤");
        
        for (int i = 0; i < products.length; i++) {
            if (products[i].toLowerCase().contains(queryLower)) {
                matchCount++;
                String displayName = products[i];
                if (displayName.length() > 39) {
                    displayName = displayName.substring(0, 36) + "...";
                }
                System.out.printf("│ %d  │ %-39s │%n", matchCount, displayName);
            }
        }
        System.out.println("└────┴─────────────────────────────────────────┘");
        System.out.println("\\n📊 Found: " + matchCount + " products");
        
        // 3. More string operations
        System.out.println("\\n3️⃣ More String Operations:");
        String product = products[0];
        System.out.println("   Product: " + product);
        System.out.println("   ─".repeat(40));
        System.out.println("   length()        → " + product.length());
        System.out.println("   startsWith()    → " + product.startsWith("Apple"));
        System.out.println("   endsWith()      → " + product.endsWith("Blue"));
        System.out.println("   indexOf(\\"Pro\\") → " + product.indexOf("Pro"));
        System.out.println("   substring(6,12) → " + product.substring(6, 12));
        
        // 4. Split for parsing
        System.out.println("\\n4️⃣ split() - Parse Product Details");
        String[] parts = product.split(" ");
        System.out.println("   Brand: " + parts[0]);
        System.out.println("   Model: " + parts[1] + " " + parts[2] + " " + parts[3] + " " + parts[4]);
        System.out.println("   Storage: " + parts[5]);
        System.out.println("   Color: " + parts[6]);
    }
}
\`\`\`

## 🏦 Real-Time Project Example: Banking Account Masking

\`\`\`java
// Real-Time: Sensitive Data Masking
// Used in banking for security

public class DataMasking {
    public static void main(String[] args) {
        System.out.println("🏦 DATA MASKING SYSTEM");
        System.out.println("=======================");
        
        // Sensitive data
        String accountNumber = "1234567890123456";
        String cardNumber = "4532015112830366";
        String email = "john.doe@company.com";
        String phone = "+1-555-123-4567";
        String ssn = "123-45-6789";
        
        System.out.println("\\n🔒 MASKING SENSITIVE DATA:");
        System.out.println("─".repeat(50));
        
        // 1. Account Number Masking
        System.out.println("\\n1️⃣ Account Number Masking");
        String maskedAccount = maskAccountNumber(accountNumber);
        System.out.println("   Original: " + accountNumber);
        System.out.println("   Masked:   " + maskedAccount);
        System.out.println("   Method:   Show last 4 digits only");
        
        // 2. Card Number Masking
        System.out.println("\\n2️⃣ Credit Card Masking");
        String maskedCard = maskCardNumber(cardNumber);
        System.out.println("   Original: " + cardNumber);
        System.out.println("   Masked:   " + maskedCard);
        System.out.println("   Method:   Show first 4 and last 4");
        
        // 3. Email Masking
        System.out.println("\\n3️⃣ Email Masking");
        String maskedEmail = maskEmail(email);
        System.out.println("   Original: " + email);
        System.out.println("   Masked:   " + maskedEmail);
        System.out.println("   Method:   Show first 2 chars + domain");
        
        // 4. Phone Masking
        System.out.println("\\n4️⃣ Phone Number Masking");
        String maskedPhone = maskPhone(phone);
        System.out.println("   Original: " + phone);
        System.out.println("   Masked:   " + maskedPhone);
        System.out.println("   Method:   Show last 4 digits");
        
        // String methods used
        System.out.println("\\n🔧 STRING METHODS USED:");
        System.out.println("─".repeat(50));
        System.out.println("   • substring(start, end) - Extract portion");
        System.out.println("   • length() - Get string length");
        System.out.println("   • replace() - Replace characters");
        System.out.println("   • indexOf() - Find character position");
        System.out.println("   • repeat() - Repeat character (Java 11+)");
    }
    
    static String maskAccountNumber(String account) {
        // Show only last 4 digits
        int len = account.length();
        return "*".repeat(len - 4) + account.substring(len - 4);
    }
    
    static String maskCardNumber(String card) {
        // Show first 4 and last 4
        return card.substring(0, 4) + " **** **** " + card.substring(12);
    }
    
    static String maskEmail(String email) {
        int atIndex = email.indexOf("@");
        return email.substring(0, 2) + "***" + email.substring(atIndex);
    }
    
    static String maskPhone(String phone) {
        int len = phone.length();
        return "***-***-" + phone.substring(len - 4);
    }
}
\`\`\`

## 📧 Real-Time Project Example: Email Validation

\`\`\`java
// Real-Time: Form Validation
// Used in registration forms

public class EmailValidation {
    public static void main(String[] args) {
        System.out.println("📧 EMAIL VALIDATION SYSTEM");
        System.out.println("===========================");
        
        String[] emails = {
            "john.doe@company.com",
            "invalid-email",
            "user@domain",
            "test@test.co.uk",
            "@nodomain.com",
            "spaces in@email.com"
        };
        
        System.out.println("\\n📋 Validating Emails:");
        System.out.println("─".repeat(50));
        
        for (String email : emails) {
            boolean isValid = validateEmail(email);
            String status = isValid ? "Valid" : "Invalid";
            System.out.println("   " + email);
            System.out.println("   → " + status);
            System.out.println();
        }
        
        // Validation rules
        System.out.println("🔧 VALIDATION RULES:");
        System.out.println("─".repeat(50));
        System.out.println("   1. Must contain exactly one @");
        System.out.println("   2. Must have text before @");
        System.out.println("   3. Must have domain after @");
        System.out.println("   4. Domain must contain .");
        System.out.println("   5. No spaces allowed");
        
        // String methods used
        System.out.println("\\n🔧 STRING METHODS USED:");
        System.out.println("─".repeat(50));
        System.out.println("   • contains() - Check for @");
        System.out.println("   • indexOf() - Find @ position");
        System.out.println("   • lastIndexOf() - Find last .");
        System.out.println("   • trim() - Remove whitespace");
        System.out.println("   • isEmpty() - Check if empty");
    }
    
    static boolean validateEmail(String email) {
        // Basic validation using String methods
        if (email == null || email.trim().isEmpty()) return false;
        if (email.contains(" ")) return false;
        if (!email.contains("@")) return false;
        
        int atIndex = email.indexOf("@");
        if (atIndex == 0) return false; // @ at start
        if (atIndex == email.length() - 1) return false; // @ at end
        
        String domain = email.substring(atIndex + 1);
        if (!domain.contains(".")) return false;
        if (domain.startsWith(".") || domain.endsWith(".")) return false;
        
        return true;
    }
}
\`\`\`

## String vs StringBuilder vs StringBuffer

| Feature | String | StringBuilder | StringBuffer |
|---------|--------|---------------|--------------|
| Mutability | Immutable | Mutable | Mutable |
| Thread-safe | Yes (immutable) | No | Yes |
| Performance | Slow for concat | Fast | Slower than StringBuilder |
| Use case | Fixed strings | Single-threaded | Multi-threaded |

## Common String Methods

| Method | Description | Example |
|--------|-------------|---------|
| length() | String length | "Hello".length() → 5 |
| charAt(i) | Character at index | "Hello".charAt(0) → 'H' |
| substring(s,e) | Extract portion | "Hello".substring(0,2) → "He" |
| toLowerCase() | Convert to lowercase | "HELLO".toLowerCase() → "hello" |
| toUpperCase() | Convert to uppercase | "hello".toUpperCase() → "HELLO" |
| trim() | Remove whitespace | " Hi ".trim() → "Hi" |
| contains() | Check substring | "Hello".contains("ell") → true |
| equals() | Compare content | "Hi".equals("Hi") → true |
| split() | Split by delimiter | "a,b,c".split(",") → ["a","b","c"] |

> **Industry Insight**: String manipulation is crucial in web development. Amazon uses string operations for product search and filtering. Banks use string masking for security compliance (PCI-DSS). Email services use string validation for spam filtering.
`,
  code: `// Real-Time: Complete String Operations Demo
// User registration and data processing

public class StringOperationsDemo {
    public static void main(String[] args) {
        System.out.println("╔════════════════════════════════════════════════╗");
        System.out.println("║    📝 STRING OPERATIONS DEMONSTRATION          ║");
        System.out.println("╚════════════════════════════════════════════════╝");
        
        // ═══════════════════════════════════════════════════
        // PART 1: String Creation
        // ═══════════════════════════════════════════════════
        System.out.println("\\n" + "═".repeat(50));
        System.out.println("📌 PART 1: STRING CREATION");
        System.out.println("═".repeat(50));
        
        System.out.println("\\n// String Literal (uses String Pool)");
        System.out.println("String s1 = \\"Hello\\";");
        System.out.println("String s2 = \\"Hello\\";");
        System.out.println("s1 == s2 → true (same reference in pool)");
        
        System.out.println("\\n// Using new keyword (creates in Heap)");
        System.out.println("String s3 = new String(\\"Hello\\");");
        System.out.println("s1 == s3 → false (different objects)");
        System.out.println("s1.equals(s3) → true (same content)");
        
        // ═══════════════════════════════════════════════════
        // PART 2: User Registration Example
        // ═══════════════════════════════════════════════════
        System.out.println("\\n" + "═".repeat(50));
        System.out.println("👤 PART 2: USER REGISTRATION");
        System.out.println("═".repeat(50));
        
        // Raw input (simulating form data)
        String rawName = "  John DOE  ";
        String rawEmail = "JOHN.DOE@COMPANY.COM";
        String rawPhone = "  +1-555-123-4567  ";
        String rawPassword = "MyP@ssw0rd123";
        
        System.out.println("\\n📋 Raw Input:");
        System.out.println("   Name:     \\"" + rawName + "\\"");
        System.out.println("   Email:    \\"" + rawEmail + "\\"");
        System.out.println("   Phone:    \\"" + rawPhone + "\\"");
        System.out.println("   Password: \\"" + rawPassword + "\\"");
        
        // Process input
        System.out.println("\\n🔧 Processing with String Methods:");
        System.out.println("─".repeat(50));
        
        // Name processing
        String name = rawName.trim();
        String[] nameParts = name.split(" ");
        String firstName = capitalize(nameParts[0]);
        String lastName = capitalize(nameParts[1]);
        String fullName = firstName + " " + lastName;
        
        System.out.println("\\n[NAME PROCESSING]");
        System.out.println("   trim()       → \\"" + name + "\\"");
        System.out.println("   split(\\" \\")  → [\\"" + nameParts[0] + "\\", \\"" + nameParts[1] + "\\"]");
        System.out.println("   capitalize() → \\"" + fullName + "\\"");
        
        // Email processing
        String email = rawEmail.trim().toLowerCase();
        String username = email.substring(0, email.indexOf("@"));
        String domain = email.substring(email.indexOf("@") + 1);
        
        System.out.println("\\n[EMAIL PROCESSING]");
        System.out.println("   trim()        → \\"" + rawEmail.trim() + "\\"");
        System.out.println("   toLowerCase() → \\"" + email + "\\"");
        System.out.println("   username      → \\"" + username + "\\"");
        System.out.println("   domain        → \\"" + domain + "\\"");
        
        // Phone processing
        String phone = rawPhone.trim().replaceAll("[^0-9]", "");
        String formattedPhone = formatPhone(phone);
        
        System.out.println("\\n[PHONE PROCESSING]");
        System.out.println("   trim()        → \\"" + rawPhone.trim() + "\\"");
        System.out.println("   digits only   → \\"" + phone + "\\"");
        System.out.println("   formatted     → \\"" + formattedPhone + "\\"");
        
        // Password validation
        System.out.println("\\n[PASSWORD VALIDATION]");
        boolean hasUpper = !rawPassword.equals(rawPassword.toLowerCase());
        boolean hasLower = !rawPassword.equals(rawPassword.toUpperCase());
        boolean hasDigit = rawPassword.matches(".*\\\\d.*");
        boolean hasSpecial = rawPassword.matches(".*[!@#$%^&*].*");
        boolean validLength = rawPassword.length() >= 8;
        
        System.out.println("   Length >= 8:  " + (validLength ? "Yes" : "No"));
        System.out.println("   Has Upper:    " + (hasUpper ? "Yes" : "No"));
        System.out.println("   Has Lower:    " + (hasLower ? "Yes" : "No"));
        System.out.println("   Has Digit:    " + (hasDigit ? "Yes" : "No"));
        System.out.println("   Has Special:  " + (hasSpecial ? "Yes" : "No"));
        
        // ═══════════════════════════════════════════════════
        // PART 3: Final Processed Data
        // ═══════════════════════════════════════════════════
        System.out.println("\\n" + "═".repeat(50));
        System.out.println("PART 3: PROCESSED USER DATA");
        System.out.println("═".repeat(50));
        
        System.out.println("\\n┌─────────────────────────────────────────────────┐");
        System.out.println("│ USER PROFILE                                    │");
        System.out.println("├─────────────────────────────────────────────────┤");
        System.out.println("│ Name:     " + padRight(fullName, 38) + "│");
        System.out.println("│ Email:    " + padRight(email, 38) + "│");
        System.out.println("│ Phone:    " + padRight(formattedPhone, 38) + "│");
        System.out.println("│ Username: " + padRight(username, 38) + "│");
        System.out.println("│ Password: " + padRight("********", 38) + "│");
        System.out.println("└─────────────────────────────────────────────────┘");
        
        // ═══════════════════════════════════════════════════
        // PART 4: String Methods Summary
        // ═══════════════════════════════════════════════════
        System.out.println("\\n" + "═".repeat(50));
        System.out.println("📚 PART 4: STRING METHODS USED");
        System.out.println("═".repeat(50));
        
        System.out.println("\\n| Method          | Purpose                    |");
        System.out.println("|-----------------|----------------------------|");
        System.out.println("| trim()          | Remove whitespace          |");
        System.out.println("| toLowerCase()   | Convert to lowercase       |");
        System.out.println("| toUpperCase()   | Convert to uppercase       |");
        System.out.println("| split()         | Split by delimiter         |");
        System.out.println("| substring()     | Extract portion            |");
        System.out.println("| indexOf()       | Find character position    |");
        System.out.println("| replaceAll()    | Replace with regex         |");
        System.out.println("| matches()       | Regex matching             |");
        System.out.println("| length()        | Get string length          |");
        System.out.println("| equals()        | Compare content            |");
        
        // ═══════════════════════════════════════════════════
        // PART 5: String Immutability
        // ═══════════════════════════════════════════════════
        System.out.println("\\n" + "═".repeat(50));
        System.out.println("🔒 PART 5: STRING IMMUTABILITY");
        System.out.println("═".repeat(50));
        
        System.out.println("\\nString str = \\"Hello\\";");
        System.out.println("str.concat(\\" World\\");");
        System.out.println("System.out.println(str); // Still \\"Hello\\"");
        System.out.println("\\n// Must reassign to get new value:");
        System.out.println("str = str.concat(\\" World\\");");
        System.out.println("System.out.println(str); // Now \\"Hello World\\"");
        
        System.out.println("\\n💡 Why Immutable?");
        System.out.println("   • Thread-safe (no synchronization needed)");
        System.out.println("   • String Pool optimization");
        System.out.println("   • Security (can't modify after creation)");
        System.out.println("   • Hashcode caching");
    }
    
    static String capitalize(String str) {
        if (str == null || str.isEmpty()) return str;
        return str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase();
    }
    
    static String formatPhone(String digits) {
        if (digits.length() == 11) {
            return "+" + digits.substring(0, 1) + "-" + 
                   digits.substring(1, 4) + "-" + 
                   digits.substring(4, 7) + "-" + 
                   digits.substring(7);
        }
        return digits;
    }
    
    static String padRight(String str, int length) {
        if (str.length() >= length) return str.substring(0, length);
        return str + " ".repeat(length - str.length());
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a URL Parser that extracts protocol, domain, path, and query parameters from a URL',
      hint: 'Use indexOf(), substring(), split() to parse URL components',
      starterCode: `public class URLParser {
    public static void main(String[] args) {
        String url = "https://www.example.com/products/search?category=electronics&sort=price";
        
        // Extract protocol (https)
        // Extract domain (www.example.com)
        // Extract path (/products/search)
        // Extract query parameters (category=electronics, sort=price)
        // Display all components
    }
}`
    }
  ]
};

export default stringIntroduction;




