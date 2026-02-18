const whileLoop = {
  id: 'while-loop',
  title: 'While Loop',
  description: 'Learn how to use while loops for conditional iteration',
  content: `
# While Loop

While loop executes a block of code as long as a specified condition is true. It's used when the number of iterations is not known beforehand.

## Syntax

\`\`\`java
while (condition) {
    // code to be executed
}
\`\`\`

## When to Use While Loop

| Scenario | Example |
|----------|---------|
| Unknown iterations | Reading file until EOF |
| User input validation | Keep asking until valid |
| Game loops | Run until game over |
| Server processes | Listen for connections |

## 🏢 Real-Time Project Example: ATM Machine Simulation

\`\`\`java
// Real-Time: ATM Banking System
// Used in actual ATM software

public class ATMMachine {
    public static void main(String[] args) {
        System.out.println("🏧 WELCOME TO SECURE BANK ATM");
        System.out.println("==============================");
        
        // Account setup
        double balance = 5000.00;
        int pin = 1234;
        int maxAttempts = 3;
        int attempts = 0;
        boolean authenticated = false;
        boolean sessionActive = true;
        
        // PIN verification with while loop
        System.out.println("\\n🔐 PIN VERIFICATION");
        int enteredPin = 1234; // Simulated input
        
        while (attempts < maxAttempts && !authenticated) {
            attempts++;
            
            if (enteredPin == pin) {
                authenticated = true;
                System.out.println("PIN Verified Successfully!");
            } else {
                System.out.println("Incorrect PIN. Attempts: " + attempts + "/" + maxAttempts);
                if (attempts >= maxAttempts) {
                    System.out.println("🔒 Card blocked! Contact bank.");
                    return;
                }
            }
        }
        
        // ATM Menu Loop
        int menuChoice = 0;
        int transactionCount = 0;
        
        System.out.println("\\n" + "═".repeat(40));
        System.out.println("       ATM MAIN MENU");
        System.out.println("═".repeat(40));
        
        // Simulate menu selections
        int[] selections = {1, 2, 3, 1, 5}; // User selections
        int selectionIndex = 0;
        
        while (sessionActive && selectionIndex < selections.length) {
            menuChoice = selections[selectionIndex];
            selectionIndex++;
            transactionCount++;
            
            System.out.println("\\n📋 Selection: " + menuChoice);
            
            switch (menuChoice) {
                case 1: // Check Balance
                    System.out.println("\\n💰 BALANCE INQUIRY");
                    System.out.println("   Available Balance: $" + String.format("%,.2f", balance));
                    break;
                    
                case 2: // Withdraw
                    System.out.println("\\n💵 CASH WITHDRAWAL");
                    double withdrawAmount = 500.00;
                    
                    if (withdrawAmount > balance) {
                        System.out.println("   Insufficient funds!");
                    } else if (withdrawAmount > 1000) {
                        System.out.println("   Daily limit exceeded!");
                    } else {
                        balance -= withdrawAmount;
                        System.out.println("   Dispensing: $" + withdrawAmount);
                        System.out.println("   New Balance: $" + String.format("%,.2f", balance));
                    }
                    break;
                    
                case 3: // Deposit
                    System.out.println("\\n📥 CASH DEPOSIT");
                    double depositAmount = 1000.00;
                    balance += depositAmount;
                    System.out.println("   Deposited: $" + depositAmount);
                    System.out.println("   New Balance: $" + String.format("%,.2f", balance));
                    break;
                    
                case 4: // Transfer
                    System.out.println("\\n🔄 FUND TRANSFER");
                    System.out.println("   Feature coming soon!");
                    break;
                    
                case 5: // Exit
                    System.out.println("\\n👋 Thank you for using SecureBank ATM!");
                    sessionActive = false;
                    break;
                    
                default:
                    System.out.println("   Invalid option!");
            }
        }
        
        System.out.println("\\n📊 Session Summary:");
        System.out.println("   Transactions: " + transactionCount);
        System.out.println("   Final Balance: $" + String.format("%,.2f", balance));
    }
}
\`\`\`

## 🎮 Real-Time Project Example: Game Score Tracker

\`\`\`java
// Real-Time: Multiplayer Game Session
// Used in online gaming platforms

public class GameSession {
    public static void main(String[] args) {
        System.out.println("🎮 BATTLE ROYALE - GAME SESSION");
        System.out.println("================================");
        
        // Game settings
        int maxPlayers = 100;
        int playersAlive = 100;
        int playerScore = 0;
        int kills = 0;
        int round = 0;
        boolean gameOver = false;
        boolean playerAlive = true;
        
        String playerName = "ProGamer123";
        int playerHealth = 100;
        int playerShield = 50;
        
        System.out.println("\\n👤 Player: " + playerName);
        System.out.println("🎯 Starting Match...");
        System.out.println("👥 Players: " + playersAlive);
        
        // Game loop
        while (!gameOver && playerAlive) {
            round++;
            System.out.println("\\n" + "─".repeat(40));
            System.out.println("⚔️ ROUND " + round);
            System.out.println("─".repeat(40));
            
            // Simulate game events
            int event = round % 4;
            
            switch (event) {
                case 0: // Combat
                    System.out.println("🔫 Enemy encountered!");
                    int damage = 25;
                    
                    if (playerShield > 0) {
                        playerShield -= damage;
                        if (playerShield < 0) {
                            playerHealth += playerShield;
                            playerShield = 0;
                        }
                    } else {
                        playerHealth -= damage;
                    }
                    
                    kills++;
                    playerScore += 100;
                    playersAlive -= 5;
                    System.out.println("   Enemy eliminated! +100 points");
                    break;
                    
                case 1: // Loot
                    System.out.println("📦 Found supply crate!");
                    playerShield = Math.min(playerShield + 25, 100);
                    playerScore += 25;
                    System.out.println("   +25 Shield");
                    break;
                    
                case 2: // Zone damage
                    System.out.println("⚠️ Storm approaching!");
                    playersAlive -= 10;
                    System.out.println("   " + playersAlive + " players remaining");
                    break;
                    
                case 3: // Heal
                    System.out.println("💊 Using medkit...");
                    playerHealth = Math.min(playerHealth + 30, 100);
                    System.out.println("   Health restored to " + playerHealth);
                    break;
            }
            
            // Display status
            System.out.println("\\n📊 Status:");
            System.out.println("   ❤️ Health: " + playerHealth);
            System.out.println("   🛡️ Shield: " + playerShield);
            System.out.println("   🎯 Kills: " + kills);
            System.out.println("   ⭐ Score: " + playerScore);
            System.out.println("   👥 Alive: " + playersAlive);
            
            // Check game end conditions
            if (playerHealth <= 0) {
                playerAlive = false;
                System.out.println("\\n💀 YOU WERE ELIMINATED!");
            } else if (playersAlive <= 1) {
                gameOver = true;
                System.out.println("\\n🏆 VICTORY ROYALE!");
                playerScore += 500;
            } else if (round >= 10) {
                gameOver = true;
                System.out.println("\\n⏱️ Match ended (time limit)");
            }
        }
        
        // Final stats
        System.out.println("\\n" + "═".repeat(40));
        System.out.println("📊 MATCH SUMMARY");
        System.out.println("═".repeat(40));
        System.out.println("Player: " + playerName);
        System.out.println("Placement: #" + playersAlive);
        System.out.println("Kills: " + kills);
        System.out.println("Score: " + playerScore);
        System.out.println("Rounds Survived: " + round);
    }
}
\`\`\`

## 📡 Real-Time Project Example: Server Request Handler

\`\`\`java
// Real-Time: Web Server Request Processing
// Used in web servers like Tomcat, Jetty

public class RequestHandler {
    public static void main(String[] args) {
        System.out.println("🌐 WEB SERVER - REQUEST HANDLER");
        System.out.println("================================");
        
        boolean serverRunning = true;
        int requestCount = 0;
        int maxRequests = 5; // Simulate 5 requests
        long startTime = System.currentTimeMillis();
        
        System.out.println("Server started on port 8080");
        System.out.println("📡 Listening for connections...");
        
        // Server loop
        while (serverRunning && requestCount < maxRequests) {
            requestCount++;
            
            // Simulate incoming request
            String[] methods = {"GET", "POST", "GET", "PUT", "DELETE"};
            String[] endpoints = {"/api/users", "/api/orders", "/api/products", 
                                 "/api/users/1", "/api/orders/5"};
            int[] responseCodes = {200, 201, 200, 200, 204};
            
            int idx = requestCount - 1;
            String method = methods[idx];
            String endpoint = endpoints[idx];
            int responseCode = responseCodes[idx];
            
            System.out.println("\\n─────────────────────────────────");
            System.out.println("📥 Request #" + requestCount);
            System.out.println("   Method: " + method);
            System.out.println("   Endpoint: " + endpoint);
            
            // Process request
            long processStart = System.currentTimeMillis();
            
            // Simulate processing
            String response = "";
            switch (method) {
                case "GET":
                    response = "Data retrieved successfully";
                    break;
                case "POST":
                    response = "Resource created";
                    break;
                case "PUT":
                    response = "Resource updated";
                    break;
                case "DELETE":
                    response = "Resource deleted";
                    break;
            }
            
            long processTime = System.currentTimeMillis() - processStart;
            
            System.out.println("📤 Response:");
            System.out.println("   Status: " + responseCode);
            System.out.println("   Message: " + response);
            System.out.println("   Time: " + processTime + "ms");
        }
        
        // Server stats
        long totalTime = System.currentTimeMillis() - startTime;
        System.out.println("\\n" + "═".repeat(40));
        System.out.println("📊 SERVER STATISTICS");
        System.out.println("═".repeat(40));
        System.out.println("Total Requests: " + requestCount);
        System.out.println("Uptime: " + totalTime + "ms");
        System.out.println("Avg Response: " + (totalTime / requestCount) + "ms");
    }
}
\`\`\`

> **Industry Insight**: While loops are fundamental in server programming. Web servers like Apache Tomcat use while loops to continuously listen for incoming HTTP requests, process them, and send responses.
`,
  code: `// Real-Time: ATM Banking System
// Complete ATM simulation with while loops

public class ATMMachine {
    public static void main(String[] args) {
        System.out.println("╔════════════════════════════════════════╗");
        System.out.println("║     🏧 SECURE BANK ATM SYSTEM          ║");
        System.out.println("╚════════════════════════════════════════╝");
        
        // Account data
        String accountNumber = "****-****-1234";
        String accountHolder = "John Smith";
        double balance = 7500.00;
        double dailyLimit = 2000.00;
        double withdrawnToday = 0;
        int correctPin = 1234;
        
        // Session variables
        int attempts = 0;
        int maxAttempts = 3;
        boolean authenticated = false;
        boolean sessionActive = true;
        int transactionCount = 0;
        
        // PIN Authentication Loop
        System.out.println("\\n🔐 AUTHENTICATION REQUIRED");
        System.out.println("──────────────────────────");
        
        int enteredPin = 1234; // Simulated correct PIN
        
        while (attempts < maxAttempts && !authenticated) {
            attempts++;
            System.out.println("Attempt " + attempts + "/" + maxAttempts);
            
            if (enteredPin == correctPin) {
                authenticated = true;
                System.out.println("Authentication Successful!");
                System.out.println("\\nWelcome, " + accountHolder + "!");
            } else {
                System.out.println("Incorrect PIN");
                if (attempts >= maxAttempts) {
                    System.out.println("\\n🔒 CARD BLOCKED");
                    System.out.println("Please contact customer service.");
                    return;
                }
                // In real ATM, would prompt for new PIN
                enteredPin = 1234; // Retry with correct PIN
            }
        }
        
        // Simulated menu selections
        int[] menuSelections = {1, 2, 3, 2, 4, 1, 5};
        int selectionIndex = 0;
        
        // Main ATM Menu Loop
        while (sessionActive && selectionIndex < menuSelections.length) {
            System.out.println("\\n╔════════════════════════════════════════╗");
            System.out.println("║           MAIN MENU                    ║");
            System.out.println("╠════════════════════════════════════════╣");
            System.out.println("║  1. 💰 Check Balance                   ║");
            System.out.println("║  2. 💵 Withdraw Cash                   ║");
            System.out.println("║  3. 📥 Deposit Cash                    ║");
            System.out.println("║  4. 🔄 Fund Transfer                   ║");
            System.out.println("║  5. 👋 Exit                            ║");
            System.out.println("╚════════════════════════════════════════╝");
            
            int choice = menuSelections[selectionIndex];
            selectionIndex++;
            System.out.println("\\nSelected: " + choice);
            
            switch (choice) {
                case 1: // Balance Inquiry
                    transactionCount++;
                    System.out.println("\\n💰 BALANCE INQUIRY");
                    System.out.println("────────────────────");
                    System.out.println("Account: " + accountNumber);
                    System.out.println("Available Balance: $" + String.format("%,.2f", balance));
                    System.out.println("Daily Limit Remaining: $" + 
                        String.format("%,.2f", dailyLimit - withdrawnToday));
                    break;
                    
                case 2: // Withdraw
                    transactionCount++;
                    System.out.println("\\n💵 CASH WITHDRAWAL");
                    System.out.println("────────────────────");
                    
                    double withdrawAmount = 500.00;
                    System.out.println("Amount: $" + withdrawAmount);
                    
                    // Validation checks
                    if (withdrawAmount > balance) {
                        System.out.println("Insufficient balance!");
                    } else if (withdrawAmount + withdrawnToday > dailyLimit) {
                        System.out.println("Daily limit exceeded!");
                        System.out.println("   Remaining limit: $" + 
                            String.format("%,.2f", dailyLimit - withdrawnToday));
                    } else if (withdrawAmount % 20 != 0) {
                        System.out.println("Amount must be multiple of $20");
                    } else {
                        balance -= withdrawAmount;
                        withdrawnToday += withdrawAmount;
                        System.out.println("Please collect your cash");
                        System.out.println("   Dispensed: $" + String.format("%,.2f", withdrawAmount));
                        System.out.println("   New Balance: $" + String.format("%,.2f", balance));
                    }
                    break;
                    
                case 3: // Deposit
                    transactionCount++;
                    System.out.println("\\n📥 CASH DEPOSIT");
                    System.out.println("────────────────────");
                    
                    double depositAmount = 1000.00;
                    System.out.println("Amount: $" + depositAmount);
                    
                    // Count bills (simulated)
                    System.out.println("Counting bills...");
                    System.out.println("Verifying authenticity...");
                    
                    balance += depositAmount;
                    System.out.println("Deposit successful!");
                    System.out.println("   Deposited: $" + String.format("%,.2f", depositAmount));
                    System.out.println("   New Balance: $" + String.format("%,.2f", balance));
                    break;
                    
                case 4: // Transfer
                    transactionCount++;
                    System.out.println("\\n🔄 FUND TRANSFER");
                    System.out.println("────────────────────");
                    
                    String targetAccount = "****-****-5678";
                    double transferAmount = 200.00;
                    
                    System.out.println("To Account: " + targetAccount);
                    System.out.println("Amount: $" + transferAmount);
                    
                    if (transferAmount > balance) {
                        System.out.println("Insufficient balance!");
                    } else {
                        balance -= transferAmount;
                        System.out.println("Transfer successful!");
                        System.out.println("   Transferred: $" + String.format("%,.2f", transferAmount));
                        System.out.println("   New Balance: $" + String.format("%,.2f", balance));
                    }
                    break;
                    
                case 5: // Exit
                    sessionActive = false;
                    System.out.println("\\n👋 THANK YOU FOR BANKING WITH US!");
                    break;
                    
                default:
                    System.out.println("Invalid selection!");
            }
            
            // Print receipt option
            if (choice >= 1 && choice <= 4) {
                System.out.println("\\n📄 Receipt printed.");
            }
        }
        
        // Session Summary
        System.out.println("\\n╔════════════════════════════════════════╗");
        System.out.println("║         SESSION SUMMARY                ║");
        System.out.println("╚════════════════════════════════════════╝");
        System.out.println("Transactions: " + transactionCount);
        System.out.println("Final Balance: $" + String.format("%,.2f", balance));
        System.out.println("\\n🔒 Please take your card.");
        System.out.println("Have a great day!");
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a Customer Support Chatbot that keeps responding until user types "exit"',
      hint: 'Use while loop to keep the conversation going, handle different query types',
      starterCode: `public class SupportChatbot {
    public static void main(String[] args) {
        boolean chatActive = true;
        
        // Simulate user messages
        String[] userMessages = {"hello", "order status", "refund", "exit"};
        int msgIndex = 0;
        
        while (chatActive) {
            // Process each message
            // Respond based on query type
            // Exit when user says "exit"
        }
    }
}`
    }
  ]
};

export default whileLoop;
