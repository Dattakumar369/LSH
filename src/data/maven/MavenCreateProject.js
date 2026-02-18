const mavenCreateProject = {
  id: 'maven-create-project',
  title: 'Create Maven Project',
  description: 'Learn different ways to create a new Maven project',
  courseTitle: 'Maven',
  sectionTitle: 'Maven Basics',
  content: `
# Create Maven Project

There are several ways to create a Maven project. Let's explore the most common methods, from command line to IDE-based approaches.

## Method 1: Using Maven Archetype (Command Line)

Maven archetypes are project templates. They generate a project structure with sample code.

### Basic Command

\`\`\`bash
mvn archetype:generate
\`\`\`

This command will:
1. Show you a list of available archetypes
2. Ask you to choose one
3. Ask for project details
4. Generate the project structure

### Quick Start (Non-Interactive)

To skip the interactive prompts:

\`\`\`bash
mvn archetype:generate -DgroupId=com.example -DartifactId=my-app -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false
\`\`\`

This creates a project with:
- **groupId**: \`com.example\`
- **artifactId**: \`my-app\`
- **Archetype**: \`maven-archetype-quickstart\` (basic Java project)

### What You Get

After running the command, you'll have:

\`\`\`
my-app
 ┣ src
 ┃ ┣ main
 ┃ ┃ ┣ java
 ┃ ┃ ┃ ┗ com
 ┃ ┃ ┃ ┃ ┗ example
 ┃ ┃ ┃ ┃ ┃ ┗ App.java
 ┃ ┃ ┗ resources
 ┃ ┗ test
 ┃ ┃ ┣ java
 ┃ ┃ ┃ ┗ com
 ┃ ┃ ┃ ┃ ┗ example
 ┃ ┃ ┃ ┃ ┃ ┗ AppTest.java
 ┃ ┃ ┗ resources
 ┣ pom.xml
 ┗ target
\`\`\`

### Common Archetypes

**maven-archetype-quickstart**
- Basic Java project
- Good for learning
- Command: \`-DarchetypeArtifactId=maven-archetype-quickstart\`

**maven-archetype-webapp**
- Web application project
- Creates WAR packaging
- Command: \`-DarchetypeArtifactId=maven-archetype-webapp\`

**spring-boot-archetype**
- Spring Boot project
- Command: \`-DarchetypeArtifactId=spring-boot-archetype\`

## Method 2: Using IntelliJ IDEA

IntelliJ IDEA has excellent Maven support built-in.

### Steps:

1. **File → New → Project**

2. **Select "Maven"** from the left sidebar

3. **Configure Project:**
   - **Name**: Your project name
   - **Location**: Where to create the project
   - **GroupId**: \`com.example\`
   - **ArtifactId**: \`my-app\`
   - **Version**: \`1.0-SNAPSHOT\`

4. **Click "Create"**

5. IntelliJ will:
   - Create the project structure
   - Generate pom.xml
   - Set up Maven integration
   - Download dependencies automatically

### Benefits:
- Visual interface
- Automatic Maven integration
- Built-in terminal for Maven commands
- Dependency management UI

## Method 3: Using Eclipse

Eclipse also supports Maven projects.

### Steps:

1. **File → New → Other**

2. **Maven → Maven Project**

3. **Select Archetype:**
   - Choose \`maven-archetype-quickstart\` for basic project
   - Or \`maven-archetype-webapp\` for web project

4. **Configure Project:**
   - **Group Id**: \`com.example\`
   - **Artifact Id**: \`my-app\`
   - **Version**: \`1.0-SNAPSHOT\`

5. **Click "Finish"**

### Note:
Eclipse requires M2Eclipse plugin. Most modern Eclipse versions include it.

## Method 4: Using VS Code

VS Code can work with Maven projects too.

### Steps:

1. **Install Extensions:**
   - "Extension Pack for Java" (includes Maven support)

2. **Create Project:**
   - Open Command Palette (Ctrl+Shift+P)
   - Type "Java: Create Java Project"
   - Select "Maven" as build tool
   - Choose archetype
   - Enter project details

3. **Or Create Manually:**
   - Create folder structure
   - Create pom.xml
   - VS Code will recognize it

## Method 5: Manual Creation

You can also create a Maven project manually:

### Steps:

1. **Create Project Directory:**
   \`\`\`bash
   mkdir my-app
   cd my-app
   \`\`\`

2. **Create Directory Structure:**
   \`\`\`bash
   mkdir -p src/main/java/com/example
   mkdir -p src/main/resources
   mkdir -p src/test/java/com/example
   mkdir -p src/test/resources
   \`\`\`

3. **Create pom.xml:**
   \`\`\`xml
   <?xml version="1.0" encoding="UTF-8"?>
   <project xmlns="http://maven.apache.org/POM/4.0.0"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
            http://maven.apache.org/xsd/maven-4.0.0.xsd">
       <modelVersion>4.0.0</modelVersion>
       
       <groupId>com.example</groupId>
       <artifactId>my-app</artifactId>
       <version>1.0-SNAPSHOT</version>
       
       <properties>
           <maven.compiler.source>17</maven.compiler.source>
           <maven.compiler.target>17</maven.compiler.target>
       </properties>
   </project>
   \`\`\`

4. **Create a Java Class:**
   \`\`\`java
   // src/main/java/com/example/App.java
   package com.example;
   
   public class App {
       public static void main(String[] args) {
           System.out.println("Hello Maven!");
       }
   }
   \`\`\`

5. **Test It:**
   \`\`\`bash
   mvn compile
   mvn exec:java -Dexec.mainClass="com.example.App"
   \`\`\`

## Which Method to Use?

**Command Line (archetype):**
- Fast and simple
- Good for learning
- Works everywhere
- No IDE needed

**IntelliJ IDEA:**
- Best IDE experience
- Great for beginners
- Automatic setup
- Visual dependency management

**Eclipse:**
- Free and open source
- Good Maven support
- Popular in enterprise

**VS Code:**
- Lightweight
- Good for small projects
- Free

**Manual:**
- Full control
- Good for understanding structure
- Time-consuming

## Verifying Your Project

After creating a project, verify it works:

\`\`\`bash
# Navigate to project directory
cd my-app

# Compile the project
mvn compile

# Run tests
mvn test

# Package the project
mvn package

# Run the application (if you have exec plugin)
mvn exec:java -Dexec.mainClass="com.example.App"
\`\`\`

## Common Issues

### Issue 1: "mvn: command not found"

**Solution:** Maven is not in your PATH. Check Maven installation.

### Issue 2: Archetype not found

**Solution:** Maven needs to download archetypes. Make sure you have internet connection. First run might take time.

### Issue 3: Project created but can't compile

**Solution:** 
- Check Java version matches pom.xml
- Verify directory structure is correct
- Check pom.xml syntax

### Issue 4: IDE doesn't recognize Maven project

**Solution:**
- In IntelliJ: Right-click pom.xml → "Add as Maven Project"
- In Eclipse: Right-click project → "Configure" → "Convert to Maven Project"
- In VS Code: Reload window or install Java extensions

## Next Steps

After creating your project:
1. Explore the generated pom.xml
2. Understand the directory structure
3. Add your first dependency
4. Write some code
5. Build and run the project

## Summary

Ways to create Maven project:
- **Command line**: \`mvn archetype:generate\` - Fast, works everywhere
- **IntelliJ**: Visual interface, best IDE experience
- **Eclipse**: Free, good Maven support
- **VS Code**: Lightweight, good for small projects
- **Manual**: Full control, educational

Choose the method that works best for you. For beginners, I recommend starting with IntelliJ or the command line archetype.

Once you have a project, let's learn about Maven's build lifecycle!
`
};

export default mavenCreateProject;

