const breakContinue = {
  id: 'break-continue',
  title: 'Break and Continue',
  description: 'Learn how to control loop execution with break and continue statements',
  content: `
# Break and Continue Statements

Break and continue are control statements that alter the normal flow of loops.

## Break Statement
- Exits the loop immediately
- Skips remaining iterations
- Used to stop when condition is met

## Continue Statement
- Skips current iteration
- Continues with next iteration
- Used to skip specific cases

## Syntax

\`\`\`java
// Break - exits loop
for (int i = 0; i < 10; i++) {
    if (i == 5) break;  // Exits when i is 5
    System.out.println(i);
}

// Continue - skips iteration
for (int i = 0; i < 10; i++) {
    if (i == 5) continue;  // Skips when i is 5
    System.out.println(i);
}
\`\`\`

## 🏢 Real-Time Project Example: Search Engine Results

\`\`\`java
// Real-Time: Search Results Processing
// Used in Google, Amazon search systems

public class SearchEngine {
    public static void main(String[] args) {
        System.out.println("🔍 SEARCH ENGINE RESULTS");
        System.out.println("=========================");
        
        String searchQuery = "java programming";
        int maxResults = 5;
        int resultsFound = 0;
        
        // Simulated search results from database
        String[] titles = {
            "Java Programming Tutorial",
            "[AD] Buy Java Books - 50% Off",
            "Learn Java in 30 Days",
            "[BLOCKED] Suspicious Content",
            "Java for Beginners Guide",
            "[AD] Java Certification Course",
            "Advanced Java Concepts",
            "Java Interview Questions",
            "[BLOCKED] Malware Site",
            "Java Best Practices"
        };
        
        String[] urls = {
            "tutorial.com/java",
            "ads.bookstore.com",
            "learn-java.com",
            "blocked-site.com",
            "beginners-java.com",
            "ads.certification.com",
            "advanced-java.com",
            "interview-java.com",
            "malware.com",
            "best-practices.com"
        };
        
        double[] relevanceScores = {0.95, 0.30, 0.88, 0.10, 0.92, 0.25, 0.85, 0.90, 0.05, 0.87};
        
        System.out.println("\\nSearch: \\"" + searchQuery + "\\"");
        System.out.println("─".repeat(50));
        
        for (int i = 0; i < titles.length; i++) {
            // Skip blocked content using continue
            if (titles[i].contains("[BLOCKED]")) {
                System.out.println("⚠️ Skipped: Blocked content at index " + i);
                continue; // Skip this result
            }
            
            // Skip ads using continue
            if (titles[i].contains("[AD]")) {
                System.out.println("📢 Skipped: Advertisement at index " + i);
                continue; // Skip ads
            }
            
            // Skip low relevance using continue
            if (relevanceScores[i] < 0.50) {
                continue; // Skip low relevance silently
            }
            
            // Display result
            resultsFound++;
            System.out.println("\\n📄 Result #" + resultsFound);
            System.out.println("   Title: " + titles[i]);
            System.out.println("   URL: " + urls[i]);
            System.out.println("   Relevance: " + (int)(relevanceScores[i] * 100) + "%");
            
            // Stop when max results reached using break
            if (resultsFound >= maxResults) {
                System.out.println("\\nShowing top " + maxResults + " results");
                break; // Exit loop
            }
        }
        
        System.out.println("\\n─".repeat(50));
        System.out.println("Found " + resultsFound + " relevant results");
    }
}
\`\`\`

## 🏦 Real-Time Project Example: Transaction Fraud Detection

\`\`\`java
// Real-Time: Fraud Detection System
// Used in banking and payment systems

public class FraudDetection {
    public static void main(String[] args) {
        System.out.println("🔒 FRAUD DETECTION SYSTEM");
        System.out.println("==========================");
        
        // Transaction data
        String[] transactionIds = {"TXN001", "TXN002", "TXN003", "TXN004", "TXN005", "TXN006"};
        double[] amounts = {150.00, 5000.00, 75.00, 15000.00, 200.00, 50000.00};
        String[] locations = {"New York", "Nigeria", "New York", "Russia", "New York", "New York"};
        String[] merchants = {"Amazon", "Unknown", "Walmart", "CryptoExchange", "Target", "Unknown"};
        boolean[] isInternational = {false, true, false, true, false, false};
        
        // Fraud detection thresholds
        double highAmountThreshold = 10000.00;
        String[] blockedCountries = {"Nigeria", "Russia"};
        String[] suspiciousMerchants = {"Unknown", "CryptoExchange"};
        
        int processedCount = 0;
        int flaggedCount = 0;
        int blockedCount = 0;
        boolean criticalFraudDetected = false;
        
        System.out.println("\\n🔍 Scanning Transactions...");
        System.out.println("─".repeat(60));
        
        for (int i = 0; i < transactionIds.length; i++) {
            processedCount++;
            boolean isFlagged = false;
            boolean isBlocked = false;
            String flagReason = "";
            
            System.out.println("\\n📋 " + transactionIds[i] + " - $" + amounts[i]);
            System.out.println("   Location: " + locations[i]);
            System.out.println("   Merchant: " + merchants[i]);
            
            // Check blocked countries - BLOCK immediately
            for (String country : blockedCountries) {
                if (locations[i].equals(country)) {
                    isBlocked = true;
                    flagReason = "Blocked country: " + country;
                    break; // No need to check other countries
                }
            }
            
            if (isBlocked) {
                blockedCount++;
                System.out.println("   🚫 BLOCKED: " + flagReason);
                continue; // Skip to next transaction
            }
            
            // Check suspicious merchants
            for (String merchant : suspiciousMerchants) {
                if (merchants[i].equals(merchant)) {
                    isFlagged = true;
                    flagReason = "Suspicious merchant";
                    break;
                }
            }
            
            // Check high amount
            if (amounts[i] > highAmountThreshold) {
                isFlagged = true;
                flagReason = "High amount transaction";
                
                // Critical fraud - stop processing
                if (amounts[i] > 25000) {
                    criticalFraudDetected = true;
                    System.out.println("   🚨 CRITICAL: Amount exceeds $25,000!");
                    System.out.println("   ⛔ Stopping all transactions!");
                    break; // Exit loop completely
                }
            }
            
            // Check international + high amount combo
            if (isInternational[i] && amounts[i] > 1000) {
                isFlagged = true;
                flagReason = "International high-value transaction";
            }
            
            if (isFlagged) {
                flaggedCount++;
                System.out.println("   ⚠️ FLAGGED: " + flagReason);
                System.out.println("   → Sent for manual review");
            } else {
                System.out.println("   APPROVED");
            }
        }
        
        // Summary
        System.out.println("\\n" + "═".repeat(60));
        System.out.println("📊 DETECTION SUMMARY");
        System.out.println("═".repeat(60));
        System.out.println("Transactions Processed: " + processedCount);
        System.out.println("Approved: " + (processedCount - flaggedCount - blockedCount));
        System.out.println("Flagged for Review: " + flaggedCount);
        System.out.println("Blocked: " + blockedCount);
        
        if (criticalFraudDetected) {
            System.out.println("\\n🚨 ALERT: Critical fraud detected!");
            System.out.println("   Account has been temporarily frozen.");
        }
    }
}
\`\`\`

## 📦 Real-Time Project Example: Inventory Scanner

\`\`\`java
// Real-Time: Warehouse Inventory Check
// Used in Amazon, Walmart warehouses

public class InventoryScanner {
    public static void main(String[] args) {
        System.out.println("📦 WAREHOUSE INVENTORY SCANNER");
        System.out.println("===============================");
        
        // Product data
        String[] products = {"Laptop", "Phone", "Tablet", "Headphones", "Watch", "Camera"};
        int[] quantities = {50, 0, 25, 100, 0, 15};
        int[] reorderLevels = {20, 30, 15, 50, 25, 10};
        String[] locations = {"A1", "B2", "A3", "C1", "B4", "D2"};
        
        int scannedCount = 0;
        int outOfStockCount = 0;
        int lowStockCount = 0;
        boolean criticalShortage = false;
        
        System.out.println("\\n🔍 Scanning inventory...");
        System.out.println("─".repeat(50));
        
        for (int i = 0; i < products.length; i++) {
            scannedCount++;
            
            // Skip out of stock items - just count them
            if (quantities[i] == 0) {
                outOfStockCount++;
                System.out.println("\\n" + products[i] + " - OUT OF STOCK");
                System.out.println("   Location: " + locations[i]);
                
                // Check if critical item
                if (products[i].equals("Phone") || products[i].equals("Laptop")) {
                    criticalShortage = true;
                    System.out.println("   🚨 CRITICAL: High-demand item!");
                }
                
                continue; // Skip to next product
            }
            
            // Check stock levels
            System.out.println("\\n📦 " + products[i]);
            System.out.println("   Quantity: " + quantities[i]);
            System.out.println("   Location: " + locations[i]);
            
            if (quantities[i] < reorderLevels[i]) {
                lowStockCount++;
                System.out.println("   ⚠️ LOW STOCK - Reorder needed");
                System.out.println("   Reorder Level: " + reorderLevels[i]);
            } else {
                System.out.println("   Stock OK");
            }
            
            // Stop if too many issues found
            if (outOfStockCount + lowStockCount > 3) {
                System.out.println("\\n⛔ Multiple stock issues detected!");
                System.out.println("   Generating urgent report...");
                break;
            }
        }
        
        // Summary
        System.out.println("\\n" + "═".repeat(50));
        System.out.println("📊 INVENTORY SUMMARY");
        System.out.println("═".repeat(50));
        System.out.println("Products Scanned: " + scannedCount + "/" + products.length);
        System.out.println("In Stock: " + (scannedCount - outOfStockCount - lowStockCount));
        System.out.println("Low Stock: " + lowStockCount);
        System.out.println("Out of Stock: " + outOfStockCount);
        
        if (criticalShortage) {
            System.out.println("\\n🚨 URGENT: Critical items out of stock!");
        }
    }
}
\`\`\`

> **Industry Insight**: Break and continue are essential in data processing pipelines. Netflix uses these to skip invalid data records (continue) or stop processing when critical errors occur (break) in their recommendation engine.
`,
  code: `// Real-Time: Complete Fraud Detection System
// Demonstrates break and continue in security systems

public class FraudDetection {
    public static void main(String[] args) {
        System.out.println("╔════════════════════════════════════════════╗");
        System.out.println("║     🔒 FRAUD DETECTION SYSTEM v2.0         ║");
        System.out.println("╚════════════════════════════════════════════╝");
        
        // Transaction database (simulated)
        String[] txnIds = {"TXN-001", "TXN-002", "TXN-003", "TXN-004", "TXN-005", 
                          "TXN-006", "TXN-007", "TXN-008"};
        double[] amounts = {250.00, 15000.00, 50.00, 8500.00, 100.00, 
                           75000.00, 300.00, 1200.00};
        String[] countries = {"USA", "Nigeria", "USA", "Russia", "USA", 
                             "USA", "Canada", "USA"};
        String[] merchants = {"Amazon", "Unknown", "Starbucks", "CryptoEx", "Walmart",
                             "WireTransfer", "BestBuy", "Target"};
        String[] cardTypes = {"Visa", "Visa", "Mastercard", "Visa", "Amex",
                             "Visa", "Visa", "Mastercard"};
        long[] timestamps = {1000, 1005, 1010, 1015, 1020, 1025, 1030, 1035};
        
        // Risk rules
        String[] blockedCountries = {"Nigeria", "Russia", "North Korea"};
        String[] suspiciousMerchants = {"Unknown", "CryptoEx", "WireTransfer"};
        double highRiskAmount = 10000.00;
        double criticalAmount = 50000.00;
        int maxFlagsBeforeFreeze = 3;
        
        // Counters
        int totalProcessed = 0;
        int approved = 0;
        int flagged = 0;
        int blocked = 0;
        double totalApprovedAmount = 0;
        double totalBlockedAmount = 0;
        boolean accountFrozen = false;
        String freezeReason = "";
        
        System.out.println("\\n🔍 REAL-TIME TRANSACTION MONITORING");
        System.out.println("════════════════════════════════════");
        
        for (int i = 0; i < txnIds.length; i++) {
            totalProcessed++;
            
            System.out.println("\\n┌─────────────────────────────────────────┐");
            System.out.println("│ Transaction: " + txnIds[i]);
            System.out.println("├─────────────────────────────────────────┤");
            System.out.println("│ Amount:   $" + String.format("%,.2f", amounts[i]));
            System.out.println("│ Country:  " + countries[i]);
            System.out.println("│ Merchant: " + merchants[i]);
            System.out.println("│ Card:     " + cardTypes[i]);
            System.out.println("└─────────────────────────────────────────┘");
            
            // Risk Assessment
            System.out.println("\\n   🔍 Risk Assessment:");
            int riskScore = 0;
            boolean shouldBlock = false;
            boolean shouldFlag = false;
            String riskReasons = "";
            
            // Rule 1: Check blocked countries
            for (String country : blockedCountries) {
                if (countries[i].equals(country)) {
                    shouldBlock = true;
                    riskReasons = "Blocked country: " + country;
                    break; // Found blocked country, no need to check more
                }
            }
            
            if (shouldBlock) {
                blocked++;
                totalBlockedAmount += amounts[i];
                System.out.println("   🚫 BLOCKED: " + riskReasons);
                System.out.println("   → Transaction rejected");
                continue; // Skip to next transaction
            }
            
            // Rule 2: Check suspicious merchants
            for (String merchant : suspiciousMerchants) {
                if (merchants[i].equals(merchant)) {
                    riskScore += 40;
                    riskReasons += "Suspicious merchant; ";
                    break; // Found suspicious merchant
                }
            }
            
            // Rule 3: Check amount thresholds
            if (amounts[i] >= criticalAmount) {
                riskScore += 60;
                riskReasons += "Critical amount; ";
                
                // CRITICAL - Freeze account immediately
                accountFrozen = true;
                freezeReason = "Transaction of $" + String.format("%,.2f", amounts[i]) + " detected";
                System.out.println("   🚨 CRITICAL ALERT!");
                System.out.println("   ⛔ Account frozen immediately!");
                System.out.println("   → Reason: " + freezeReason);
                break; // Stop all processing
                
            } else if (amounts[i] >= highRiskAmount) {
                riskScore += 30;
                riskReasons += "High amount; ";
            }
            
            // Rule 4: International transaction check
            if (!countries[i].equals("USA") && amounts[i] > 500) {
                riskScore += 20;
                riskReasons += "International high-value; ";
            }
            
            // Determine action based on risk score
            System.out.println("   📊 Risk Score: " + riskScore + "/100");
            
            if (riskScore >= 50) {
                shouldFlag = true;
            }
            
            if (shouldFlag) {
                flagged++;
                System.out.println("   ⚠️ FLAGGED FOR REVIEW");
                System.out.println("   → Reasons: " + riskReasons);
                
                // Check if too many flags
                if (flagged >= maxFlagsBeforeFreeze) {
                    accountFrozen = true;
                    freezeReason = "Multiple suspicious transactions (" + flagged + " flagged)";
                    System.out.println("\\n   🚨 SECURITY ALERT!");
                    System.out.println("   ⛔ Account frozen: Too many flagged transactions");
                    break; // Stop processing
                }
            } else {
                approved++;
                totalApprovedAmount += amounts[i];
                System.out.println("   APPROVED");
            }
        }
        
        // Final Report
        System.out.println("\\n╔════════════════════════════════════════════╗");
        System.out.println("║           📊 MONITORING REPORT              ║");
        System.out.println("╚════════════════════════════════════════════╝");
        System.out.println("\\nTransactions Processed: " + totalProcessed + "/" + txnIds.length);
        System.out.println("\\n📈 RESULTS:");
        System.out.println("   Approved: " + approved + " ($" + String.format("%,.2f", totalApprovedAmount) + ")");
        System.out.println("   ⚠️ Flagged:  " + flagged);
        System.out.println("   🚫 Blocked:  " + blocked + " ($" + String.format("%,.2f", totalBlockedAmount) + ")");
        
        System.out.println("\\n🔒 ACCOUNT STATUS:");
        if (accountFrozen) {
            System.out.println("   ⛔ FROZEN");
            System.out.println("   Reason: " + freezeReason);
            System.out.println("   Action: Contact security team");
        } else {
            System.out.println("   ACTIVE");
        }
        
        // Risk Summary
        double riskPercentage = ((double)(flagged + blocked) / totalProcessed) * 100;
        System.out.println("\\n📉 Risk Level: " + String.format("%.1f", riskPercentage) + "% suspicious activity");
    }
}`,
  practiceQuestions: [
    {
      question: 'Create an Email Filter System that skips spam and stops on virus detection',
      hint: 'Use continue to skip spam emails, break when virus is detected',
      starterCode: `public class EmailFilter {
    public static void main(String[] args) {
        String[] subjects = {"Meeting Tomorrow", "WIN $1000000", 
                            "Project Update", "VIRUS.exe attached"};
        String[] senders = {"boss@company.com", "spam@unknown.com",
                           "team@company.com", "hacker@malware.com"};
        
        // Process emails
        // Skip spam (continue)
        // Stop on virus (break)
        // Display safe emails
    }
}`
    }
  ]
};

export default breakContinue;
