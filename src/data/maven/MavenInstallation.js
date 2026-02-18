const mavenInstallation = {
  id: 'maven-installation',
  title: 'Install Maven',
  description: 'Step-by-step guide to install Maven on Windows, Mac, and Linux',
  courseTitle: 'Maven',
  sectionTitle: 'Maven Basics',
  content: `
# Install Maven

Before you can use Maven, you need to install it on your computer. This tutorial will guide you through the installation process on Windows, Mac, and Linux.

## Prerequisites

Maven requires Java to be installed. Maven is a Java application, so it needs the Java Development Kit (JDK) to run.

### Step 1: Check Java Installation

First, verify that Java is installed on your system:

\`\`\`bash
java -version
\`\`\`

You should see output like:

\`\`\`
java version "17.0.1" 2021-10-19 LTS
Java(TM) SE Runtime Environment (build 17.0.1+12-LTS-39)
Java HotSpot(TM) 64-Bit Server VM (build 17.0.1+12-LTS-39, mixed mode, sharing)
\`\`\`

**If Java is not installed:**
- Download JDK from Oracle or use OpenJDK
- Java 8 or higher is recommended (Java 11 or 17 is ideal)
- Install it and set JAVA_HOME environment variable

## Step 2: Download Maven

1. Go to the official Maven website: https://maven.apache.org/download.cgi

2. Download the **Binary zip archive** (apache-maven-X.X.X-bin.zip)
   - Don't download the source code version
   - Get the latest stable version (3.9.x or 3.8.x)

3. The file will be something like: \`apache-maven-3.9.5-bin.zip\`

## Step 3: Extract Maven

Extract the downloaded zip file to a location on your computer.

**Recommended locations:**
- **Windows:** \`C:\\Program Files\\Apache\\Maven\`
- **Mac/Linux:** \`/usr/local/apache-maven\` or \`/opt/maven\`

After extraction, you should have a folder like:
- \`C:\\Program Files\\Apache\\Maven\\apache-maven-3.9.5\`

## Step 4: Set Environment Variables

Maven needs to know where it's installed, and your system needs to know where to find Maven commands.

### Windows Installation

1. **Set MAVEN_HOME:**
   - Right-click "This PC" or "My Computer"
   - Select "Properties"
   - Click "Advanced system settings"
   - Click "Environment Variables"
   - Under "System variables", click "New"
   - Variable name: \`MAVEN_HOME\`
   - Variable value: \`C:\\Program Files\\Apache\\Maven\\apache-maven-3.9.5\`
   - Click "OK"

2. **Add Maven to PATH:**
   - In the same "Environment Variables" window
   - Find "Path" in System variables
   - Click "Edit"
   - Click "New"
   - Add: \`%MAVEN_HOME%\\bin\`
   - Click "OK" on all windows

3. **Verify Installation:**
   - Open a **new** Command Prompt (important - close and reopen)
   - Run: \`mvn -version\`

### Mac Installation

1. **Extract Maven:**
   \`\`\`bash
   sudo tar -xzf apache-maven-3.9.5-bin.tar.gz -C /usr/local
   \`\`\`

2. **Set Environment Variables:**
   
   Edit your shell profile file:
   - For Bash: \`~/.bash_profile\` or \`~/.bashrc\`
   - For Zsh: \`~/.zshrc\`
   
   Add these lines:
   \`\`\`bash
   export MAVEN_HOME=/usr/local/apache-maven-3.9.5
   export PATH=$MAVEN_HOME/bin:$PATH
   \`\`\`

3. **Reload your profile:**
   \`\`\`bash
   source ~/.bash_profile
   # or
   source ~/.zshrc
   \`\`\`

4. **Verify Installation:**
   \`\`\`bash
   mvn -version
   \`\`\`

### Linux Installation

1. **Extract Maven:**
   \`\`\`bash
   sudo tar -xzf apache-maven-3.9.5-bin.tar.gz -C /opt
   \`\`\`

2. **Set Environment Variables:**
   
   Edit \`~/.bashrc\` or \`~/.profile\`:
   \`\`\`bash
   export MAVEN_HOME=/opt/apache-maven-3.9.5
   export PATH=$MAVEN_HOME/bin:$PATH
   \`\`\`

3. **Reload your profile:**
   \`\`\`bash
   source ~/.bashrc
   \`\`\`

4. **Verify Installation:**
   \`\`\`bash
   mvn -version
   \`\`\`

## Step 5: Verify Installation

After setting up environment variables, verify that Maven is installed correctly:

\`\`\`bash
mvn -version
\`\`\`

You should see output like:

\`\`\`
Apache Maven 3.9.5 (c8d5c9b17484f4a8d3f2954461459fd5d32a959e)
Maven home: C:\\Program Files\\Apache\\Maven\\apache-maven-3.9.5
Java version: 17.0.1, vendor: Oracle Corporation
Java home: C:\\Program Files\\Java\\jdk-17.0.1
Default locale: en_US, platform encoding: Cp1252
OS name: "windows 10", version: "10.0", arch: "amd64", family: "windows"
\`\`\`

If you see this output, congratulations! Maven is installed correctly.

## Troubleshooting

### Problem: "mvn is not recognized as an internal or external command"

**Solution:**
- Make sure you closed and reopened your terminal/command prompt after setting environment variables
- Verify that MAVEN_HOME is set correctly
- Verify that %MAVEN_HOME%\\bin is in your PATH
- On Windows, check both User and System environment variables

### Problem: "JAVA_HOME is not set"

**Solution:**
- Set JAVA_HOME environment variable pointing to your JDK installation
- Example: \`C:\\Program Files\\Java\\jdk-17\`
- Make sure JAVA_HOME points to JDK, not JRE

### Problem: "Maven version shows but can't run Maven commands"

**Solution:**
- Check that the Maven bin directory is in your PATH
- Try using the full path: \`C:\\Program Files\\Apache\\Maven\\apache-maven-3.9.5\\bin\\mvn.cmd -version\`

### Problem: Permission denied (Mac/Linux)

**Solution:**
- Make sure Maven directory has correct permissions
- You might need to use \`sudo\` for installation
- Check that the bin directory is executable: \`chmod +x $MAVEN_HOME/bin/mvn\`

## Alternative: Using Package Managers

### Mac (Homebrew)

\`\`\`bash
brew install maven
\`\`\`

### Linux (Ubuntu/Debian)

\`\`\`bash
sudo apt update
sudo apt install maven
\`\`\`

### Linux (CentOS/RHEL)

\`\`\`bash
sudo yum install maven
\`\`\`

Using package managers is easier, but you might get an older version. Manual installation gives you the latest version.

## What's Next?

Now that Maven is installed, you're ready to:
1. Create your first Maven project
2. Understand Maven project structure
3. Work with pom.xml

Let's move to the next tutorial and create a Maven project!
`
};

export default mavenInstallation;

