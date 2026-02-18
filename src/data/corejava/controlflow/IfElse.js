const ifElse = {
  id: 'if-else',
  title: 'If-Else Statements',
  description: 'Making decisions in your code',
  content: `
# If-Else — Making Decisions in Code

Programs need to make decisions. Should we show the login page or the dashboard? Is the user old enough? Is the password correct? The if-else statement is how your code makes these choices.

---

## The Basic If Statement

\`\`\`java
if (condition) {
    // Code runs if condition is true
}
\`\`\`

**Example:**
\`\`\`java
int age = 20;

if (age >= 18) {
    System.out.println("You can vote!");
}
\`\`\`

---

## If-Else Statement

\`\`\`java
if (condition) {
    // Runs if true
} else {
    // Runs if false
}
\`\`\`

**Example:**
\`\`\`java
int score = 75;

if (score >= 60) {
    System.out.println("You passed!");
} else {
    System.out.println("You failed.");
}
\`\`\`

---

## If-Else-If Ladder

For multiple conditions:

\`\`\`java
if (condition1) {
    // First condition true
} else if (condition2) {
    // Second condition true
} else if (condition3) {
    // Third condition true
} else {
    // None of the above
}
\`\`\`

**Example — Grade Calculator:**
\`\`\`java
int score = 85;
String grade;

if (score >= 90) {
    grade = "A";
} else if (score >= 80) {
    grade = "B";
} else if (score >= 70) {
    grade = "C";
} else if (score >= 60) {
    grade = "D";
} else {
    grade = "F";
}

System.out.println("Grade: " + grade);  // Grade: B
\`\`\`

---

## Nested If Statements

If statements inside if statements:

\`\`\`java
int age = 25;
boolean hasLicense = true;

if (age >= 18) {
    if (hasLicense) {
        System.out.println("You can drive!");
    } else {
        System.out.println("Get a license first.");
    }
} else {
    System.out.println("Too young to drive.");
}
\`\`\`

**Tip:** Avoid deep nesting — it makes code hard to read. Consider using early returns or combining conditions.

---

## Combining Conditions

### AND (&&) — Both must be true

\`\`\`java
if (age >= 18 && hasLicense) {
    System.out.println("Can drive");
}
\`\`\`

### OR (||) — At least one must be true

\`\`\`java
if (isAdmin || isOwner) {
    System.out.println("Has access");
}
\`\`\`

### NOT (!) — Reverses the condition

\`\`\`java
if (!isLoggedIn) {
    System.out.println("Please log in");
}
\`\`\`

---

## Common Patterns

### Null Check

\`\`\`java
if (user != null) {
    System.out.println("Hello, " + user.getName());
}

// Or with short-circuit
if (user != null && user.isActive()) {
    // Safe - won't call isActive() if user is null
}
\`\`\`

### Range Check

\`\`\`java
if (age >= 13 && age <= 19) {
    System.out.println("Teenager");
}
\`\`\`

### Empty Check

\`\`\`java
if (name != null && !name.isEmpty()) {
    System.out.println("Name: " + name);
}

// Java 11+
if (name != null && !name.isBlank()) {
    System.out.println("Name: " + name);
}
\`\`\`

---

## Ternary Operator — Shorthand If-Else

For simple assignments:

\`\`\`java
// Instead of:
String status;
if (age >= 18) {
    status = "Adult";
} else {
    status = "Minor";
}

// Write:
String status = (age >= 18) ? "Adult" : "Minor";
\`\`\`

**Use ternary for simple cases only.** Complex logic should use regular if-else.

---

## Best Practices

### 1. Always Use Braces

\`\`\`java
// BAD - error-prone
if (condition)
    doSomething();
    doSomethingElse();  // Always runs! Not part of if

// GOOD
if (condition) {
    doSomething();
    doSomethingElse();
}
\`\`\`

### 2. Positive Conditions First

\`\`\`java
// Harder to read
if (!isInvalid) {
    // valid case
}

// Easier to read
if (isValid) {
    // valid case
}
\`\`\`

### 3. Early Return Pattern

\`\`\`java
// Instead of deep nesting:
if (user != null) {
    if (user.isActive()) {
        if (user.hasPermission()) {
            // do something
        }
    }
}

// Use early returns:
if (user == null) return;
if (!user.isActive()) return;
if (!user.hasPermission()) return;
// do something
\`\`\`

---

## Real-World Example: Login Validation

\`\`\`java
public String login(String username, String password) {
    // Check for empty input
    if (username == null || username.isEmpty()) {
        return "Username is required";
    }
    
    if (password == null || password.isEmpty()) {
        return "Password is required";
    }
    
    // Find user
    User user = findUser(username);
    
    if (user == null) {
        return "User not found";
    }
    
    // Check if account is locked
    if (user.isLocked()) {
        return "Account is locked";
    }
    
    // Verify password
    if (!user.checkPassword(password)) {
        user.incrementFailedAttempts();
        if (user.getFailedAttempts() >= 3) {
            user.lock();
            return "Account locked due to too many failed attempts";
        }
        return "Invalid password";
    }
    
    // Success!
    user.resetFailedAttempts();
    return "Login successful";
}
\`\`\`
`,
  code: `// If-Else Demo

public class IfElseDemo {
    public static void main(String[] args) {
        System.out.println("=== If-Else Statements Demo ===\\n");
        
        // 1. BASIC IF
        System.out.println("1. BASIC IF");
        System.out.println("   ---------");
        
        int temperature = 30;
        System.out.println("   Temperature: " + temperature + "°C");
        
        if (temperature > 25) {
            System.out.println("   It's hot today!");
        }
        System.out.println();
        
        // 2. IF-ELSE
        System.out.println("2. IF-ELSE");
        System.out.println("   --------");
        
        int age = 16;
        System.out.println("   Age: " + age);
        
        if (age >= 18) {
            System.out.println("   You can vote!");
        } else {
            System.out.println("   Too young to vote.");
        }
        System.out.println();
        
        // 3. IF-ELSE-IF LADDER
        System.out.println("3. IF-ELSE-IF LADDER (Grade Calculator)");
        System.out.println("   -------------------------------------");
        
        int[] scores = {95, 82, 73, 65, 45};
        
        for (int score : scores) {
            String grade;
            if (score >= 90) {
                grade = "A";
            } else if (score >= 80) {
                grade = "B";
            } else if (score >= 70) {
                grade = "C";
            } else if (score >= 60) {
                grade = "D";
            } else {
                grade = "F";
            }
            System.out.println("   Score: " + score + " -> Grade: " + grade);
        }
        System.out.println();
        
        // 4. COMBINING CONDITIONS
        System.out.println("4. COMBINING CONDITIONS");
        System.out.println("   ---------------------");
        
        int userAge = 25;
        boolean hasLicense = true;
        boolean hasCar = false;
        
        System.out.println("   Age: " + userAge + ", License: " + hasLicense + ", Car: " + hasCar);
        
        // AND
        if (userAge >= 18 && hasLicense) {
            System.out.println("   Can legally drive");
        }
        
        // OR
        if (hasLicense || hasCar) {
            System.out.println("   Has license OR car");
        }
        
        // Complex
        if (userAge >= 18 && hasLicense && !hasCar) {
            System.out.println("   Can drive but needs to rent a car");
        }
        System.out.println();
        
        // 5. NESTED IF
        System.out.println("5. NESTED IF");
        System.out.println("   ----------");
        
        String userType = "premium";
        int purchaseAmount = 150;
        
        System.out.println("   User: " + userType + ", Purchase: $" + purchaseAmount);
        
        if (userType.equals("premium")) {
            if (purchaseAmount >= 100) {
                System.out.println("   20% discount applied!");
            } else {
                System.out.println("   10% discount applied!");
            }
        } else {
            if (purchaseAmount >= 100) {
                System.out.println("   5% discount applied!");
            } else {
                System.out.println("   No discount");
            }
        }
        System.out.println();
        
        // 6. TERNARY OPERATOR
        System.out.println("6. TERNARY OPERATOR");
        System.out.println("   -----------------");
        
        int num = 7;
        String evenOdd = (num % 2 == 0) ? "even" : "odd";
        System.out.println("   " + num + " is " + evenOdd);
        
        int a = 10, b = 20;
        int max = (a > b) ? a : b;
        System.out.println("   Max of " + a + " and " + b + " is " + max);
        
        // Nested ternary (use sparingly!)
        int score = 85;
        String result = (score >= 90) ? "Excellent" :
                        (score >= 70) ? "Good" :
                        (score >= 50) ? "Pass" : "Fail";
        System.out.println("   Score " + score + ": " + result);
        System.out.println();
        
        // 7. REAL-WORLD EXAMPLE
        System.out.println("7. REAL-WORLD EXAMPLE - Login System");
        System.out.println("   -----------------------------------");
        
        LoginSystem login = new LoginSystem();
        
        System.out.println("   " + login.authenticate("", "pass123"));
        System.out.println("   " + login.authenticate("john", ""));
        System.out.println("   " + login.authenticate("unknown", "pass123"));
        System.out.println("   " + login.authenticate("john", "wrong"));
        System.out.println("   " + login.authenticate("john", "password123"));
    }
}

class LoginSystem {
    public String authenticate(String username, String password) {
        // Validate input
        if (username == null || username.isEmpty()) {
            return "Error: Username required";
        }
        
        if (password == null || password.isEmpty()) {
            return "Error: Password required";
        }
        
        // Check user exists (simulated)
        if (!username.equals("john") && !username.equals("jane")) {
            return "Error: User not found";
        }
        
        // Verify password (simulated)
        if (!password.equals("password123")) {
            return "Error: Invalid password";
        }
        
        return "Success: Welcome, " + username + "!";
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a ticket pricing system based on age and day',
      hint: 'Different prices for children, adults, seniors, and weekends',
      starterCode: `public class TicketPricing {
    public static void main(String[] args) {
        System.out.println("=== Movie Ticket Pricing ===\\n");
        
        // Test different scenarios
        System.out.println(getTicketPrice(8, "Monday"));    // Child, weekday
        System.out.println(getTicketPrice(25, "Monday"));   // Adult, weekday
        System.out.println(getTicketPrice(65, "Monday"));   // Senior, weekday
        System.out.println(getTicketPrice(25, "Saturday")); // Adult, weekend
        System.out.println(getTicketPrice(8, "Sunday"));    // Child, weekend
    }
    
    public static String getTicketPrice(int age, String day) {
        double basePrice;
        String category;
        
        // Determine category and base price
        if (age < 12) {
            category = "Child";
            basePrice = 8.00;
        } else if (age >= 65) {
            category = "Senior";
            basePrice = 9.00;
        } else {
            category = "Adult";
            basePrice = 12.00;
        }
        
        // Weekend surcharge
        boolean isWeekend = day.equals("Saturday") || day.equals("Sunday");
        if (isWeekend) {
            basePrice += 3.00;
        }
        
        // Format result
        String dayType = isWeekend ? "Weekend" : "Weekday";
        return String.format("%s (%s, %s): $%.2f", category, day, dayType, basePrice);
    }
}`
    }
  ]
};

export default ifElse;
