const javaEnvironmentSetup = {
  id: 'java-environment-setup',
  title: 'Java Environment Setup',
  description: 'Installing and configuring Java on your computer',
  content: `
# Setting Up Java — Getting Your Machine Ready

Before you can write Java code, you need to set up your development environment. Don't worry — it's straightforward, and I'll walk you through every step.

---

## What You Need

To develop Java applications, you need:

1. **JDK (Java Development Kit)** — The tools to compile and run Java
2. **IDE (Integrated Development Environment)** — Where you write code (optional but recommended)

---

## JDK vs JRE vs JVM

Let's clear up the confusion:

| Component | What It Is | Who Needs It |
|-----------|------------|--------------|
| **JVM** | Java Virtual Machine — runs bytecode | Everyone running Java |
| **JRE** | JVM + libraries — runs Java programs | End users |
| **JDK** | JRE + compiler + tools — develops Java | Developers (you!) |

\`\`\`
JDK (Development Kit)
├── JRE (Runtime Environment)
│   ├── JVM (Virtual Machine)
│   └── Core Libraries
├── Compiler (javac)
├── Debugger (jdb)
└── Other Tools (jar, javadoc, etc.)
\`\`\`

**As a developer, always install the JDK.**

---

## Step 1: Download JDK

### Option A: Oracle JDK
1. Go to [oracle.com/java/technologies/downloads](https://www.oracle.com/java/technologies/downloads/)
2. Select your operating system
3. Download the installer

### Option B: OpenJDK (Free, Open Source)
1. Go to [adoptium.net](https://adoptium.net/) (Eclipse Temurin)
2. Select your OS and architecture
3. Download the installer

**Recommendation:** Use OpenJDK/Adoptium for learning. It's free and works great.

---

## Step 2: Install JDK

### Windows
1. Run the downloaded \`.exe\` or \`.msi\` file
2. Follow the installation wizard
3. Note the installation path (usually \`C:\\Program Files\\Java\\jdk-XX\`)

### macOS
1. Run the downloaded \`.dmg\` file
2. Drag to Applications or run the \`.pkg\` installer
3. Path is usually \`/Library/Java/JavaVirtualMachines/jdk-XX.jdk\`

### Linux (Ubuntu/Debian)
\`\`\`bash
sudo apt update
sudo apt install openjdk-17-jdk
\`\`\`

---

## Step 3: Set Environment Variables

This tells your system where Java is installed.

### Windows

1. Open System Properties → Advanced → Environment Variables
2. Under "System Variables", find \`Path\` and click Edit
3. Add: \`C:\\Program Files\\Java\\jdk-XX\\bin\`
4. Create new variable \`JAVA_HOME\` = \`C:\\Program Files\\Java\\jdk-XX\`

Or via Command Prompt (Admin):
\`\`\`cmd
setx JAVA_HOME "C:\\Program Files\\Java\\jdk-17"
setx PATH "%PATH%;%JAVA_HOME%\\bin"
\`\`\`

### macOS/Linux

Add to \`~/.bashrc\` or \`~/.zshrc\`:
\`\`\`bash
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-17.jdk/Contents/Home
export PATH=$JAVA_HOME/bin:$PATH
\`\`\`

Then run:
\`\`\`bash
source ~/.bashrc
\`\`\`

---

## Step 4: Verify Installation

Open a terminal/command prompt and run:

\`\`\`bash
java -version
\`\`\`

You should see something like:
\`\`\`
openjdk version "17.0.1" 2021-10-19
OpenJDK Runtime Environment (build 17.0.1+12)
OpenJDK 64-Bit Server VM (build 17.0.1+12, mixed mode)
\`\`\`

Also verify the compiler:
\`\`\`bash
javac -version
\`\`\`

Output:
\`\`\`
javac 17.0.1
\`\`\`

**If you see version numbers, you're all set!**

---

## Step 5: Choose an IDE

While you can write Java in Notepad, an IDE makes life much easier:

### IntelliJ IDEA (Recommended)
- **Best for:** Professional development
- **Download:** [jetbrains.com/idea](https://www.jetbrains.com/idea/)
- **Community Edition is free!**

### Eclipse
- **Best for:** Enterprise Java
- **Download:** [eclipse.org](https://www.eclipse.org/)
- **Free and open source**

### VS Code
- **Best for:** Lightweight editing
- **Download:** [code.visualstudio.com](https://code.visualstudio.com/)
- **Install "Extension Pack for Java"**

### NetBeans
- **Best for:** Beginners
- **Download:** [netbeans.apache.org](https://netbeans.apache.org/)
- **Free and open source**

---

## Your First Program (Without IDE)

Let's verify everything works:

### 1. Create a file called \`HelloWorld.java\`:
\`\`\`java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        System.out.println("Java is working!");
    }
}
\`\`\`

### 2. Compile it:
\`\`\`bash
javac HelloWorld.java
\`\`\`

This creates \`HelloWorld.class\` (bytecode).

### 3. Run it:
\`\`\`bash
java HelloWorld
\`\`\`

Output:
\`\`\`
Hello, World!
Java is working!
\`\`\`

**Congratulations! You've set up Java and run your first program!**

---

## Troubleshooting

### "java is not recognized"
- Environment variables not set correctly
- Restart your terminal after setting variables
- Check the path is correct

### "javac is not recognized"
- You installed JRE instead of JDK
- Download and install JDK

### Wrong version showing
- Multiple Java versions installed
- Update JAVA_HOME to point to correct version

### Permission denied (Linux/Mac)
- Use \`sudo\` for installation
- Check file permissions

---

## Project Structure

A typical Java project looks like:

\`\`\`
my-project/
├── src/
│   └── com/
│       └── mycompany/
│           └── Main.java
├── bin/           (compiled classes)
├── lib/           (external libraries)
└── README.md
\`\`\`

IDEs handle this structure automatically.
`,
  code: `// Environment Verification Program
// Save this as EnvironmentCheck.java and run it to verify your setup

public class EnvironmentCheck {
    public static void main(String[] args) {
        System.out.println("=== Java Environment Check ===\\n");
        
        // 1. Java Version
        System.out.println("1. JAVA VERSION");
        System.out.println("   -------------");
        String javaVersion = System.getProperty("java.version");
        String javaVendor = System.getProperty("java.vendor");
        System.out.println("   Version: " + javaVersion);
        System.out.println("   Vendor: " + javaVendor);
        System.out.println();
        
        // 2. JVM Information
        System.out.println("2. JVM INFORMATION");
        System.out.println("   ----------------");
        String jvmName = System.getProperty("java.vm.name");
        String jvmVersion = System.getProperty("java.vm.version");
        System.out.println("   JVM Name: " + jvmName);
        System.out.println("   JVM Version: " + jvmVersion);
        System.out.println();
        
        // 3. Java Home
        System.out.println("3. JAVA HOME");
        System.out.println("   ----------");
        String javaHome = System.getProperty("java.home");
        System.out.println("   Path: " + javaHome);
        System.out.println();
        
        // 4. Operating System
        System.out.println("4. OPERATING SYSTEM");
        System.out.println("   -----------------");
        String osName = System.getProperty("os.name");
        String osVersion = System.getProperty("os.version");
        String osArch = System.getProperty("os.arch");
        System.out.println("   OS: " + osName);
        System.out.println("   Version: " + osVersion);
        System.out.println("   Architecture: " + osArch);
        System.out.println();
        
        // 5. User Information
        System.out.println("5. USER INFORMATION");
        System.out.println("   -----------------");
        String userName = System.getProperty("user.name");
        String userHome = System.getProperty("user.home");
        String userDir = System.getProperty("user.dir");
        System.out.println("   User: " + userName);
        System.out.println("   Home: " + userHome);
        System.out.println("   Working Dir: " + userDir);
        System.out.println();
        
        // 6. Memory Information
        System.out.println("6. MEMORY INFORMATION");
        System.out.println("   -------------------");
        Runtime runtime = Runtime.getRuntime();
        long maxMemory = runtime.maxMemory() / (1024 * 1024);
        long totalMemory = runtime.totalMemory() / (1024 * 1024);
        long freeMemory = runtime.freeMemory() / (1024 * 1024);
        System.out.println("   Max Memory: " + maxMemory + " MB");
        System.out.println("   Total Memory: " + totalMemory + " MB");
        System.out.println("   Free Memory: " + freeMemory + " MB");
        System.out.println();
        
        // 7. Available Processors
        System.out.println("7. PROCESSORS");
        System.out.println("   -----------");
        int processors = runtime.availableProcessors();
        System.out.println("   Available: " + processors + " cores");
        System.out.println();
        
        // 8. Class Path
        System.out.println("8. CLASS PATH");
        System.out.println("   -----------");
        String classPath = System.getProperty("java.class.path");
        System.out.println("   " + classPath);
        System.out.println();
        
        // Summary
        System.out.println("=== SUMMARY ===");
        System.out.println("Your Java environment is set up correctly!");
        System.out.println("Java " + javaVersion + " is ready to use.");
        System.out.println();
        System.out.println("Next steps:");
        System.out.println("1. Install an IDE (IntelliJ IDEA recommended)");
        System.out.println("2. Create your first project");
        System.out.println("3. Start coding!");
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a program that displays system properties',
      hint: 'Use System.getProperty() to access various properties',
      starterCode: `public class SystemInfo {
    public static void main(String[] args) {
        System.out.println("=== System Information ===\\n");
        
        // Java Information
        System.out.println("Java Version: " + System.getProperty("java.version"));
        System.out.println("Java Home: " + System.getProperty("java.home"));
        
        // OS Information
        System.out.println("\\nOperating System: " + System.getProperty("os.name"));
        System.out.println("OS Version: " + System.getProperty("os.version"));
        System.out.println("Architecture: " + System.getProperty("os.arch"));
        
        // User Information
        System.out.println("\\nUser Name: " + System.getProperty("user.name"));
        System.out.println("User Home: " + System.getProperty("user.home"));
        System.out.println("Working Directory: " + System.getProperty("user.dir"));
        
        // Memory
        Runtime rt = Runtime.getRuntime();
        System.out.println("\\nMax Memory: " + (rt.maxMemory() / 1024 / 1024) + " MB");
        System.out.println("Processors: " + rt.availableProcessors());
        
        System.out.println("\\nEnvironment is configured correctly!");
    }
}`
    }
  ]
};

export default javaEnvironmentSetup;
