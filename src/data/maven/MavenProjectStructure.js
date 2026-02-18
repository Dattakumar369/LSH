const mavenProjectStructure = {
  id: 'maven-project-structure',
  title: 'Maven Project Structure',
  description: 'Understand the standard Maven directory layout and why it matters',
  courseTitle: 'Maven',
  sectionTitle: 'Maven Basics',
  content: `
# Maven Project Structure

Maven follows a standard directory structure. This might seem restrictive at first, but it's actually one of Maven's greatest strengths. Once you learn this structure, you can understand any Maven project instantly.

## Standard Maven Directory Layout

Here's what a typical Maven project looks like:

\`\`\`
my-project
 ┣ src
 ┃ ┣ main
 ┃ ┃ ┣ java
 ┃ ┃ ┃ ┗ com
 ┃ ┃ ┃ ┃ ┗ example
 ┃ ┃ ┃ ┃ ┃ ┗ App.java
 ┃ ┃ ┗ resources
 ┃ ┃ ┃ ┗ application.properties
 ┃ ┗ test
 ┃ ┃ ┣ java
 ┃ ┃ ┃ ┗ com
 ┃ ┃ ┃ ┃ ┗ example
 ┃ ┃ ┃ ┃ ┃ ┗ AppTest.java
 ┃ ┃ ┗ resources
 ┃ ┃ ┃ ┗ test-config.properties
 ┣ target
 ┃ ┣ classes
 ┃ ┣ test-classes
 ┃ ┗ my-project-1.0.jar
 ┗ pom.xml
\`\`\`

Let me break this down for you:

## Directory Breakdown

### Root Directory

**my-project/**
- This is your project root
- Contains \`pom.xml\` (the project configuration file)
- Contains \`src\` directory (your source code)
- Contains \`target\` directory (build output)

### src/ Directory

The \`src\` directory contains all your source code and resources.

**src/main/**
- This is where your **production code** lives
- Code that will be compiled and packaged
- This is what gets deployed

**src/main/java/**
- All your Java source files go here
- Follow standard Java package structure
- Example: \`com.example.App.java\` goes in \`src/main/java/com/example/App.java\`

**src/main/resources/**
- Configuration files
- Properties files
- XML files
- Images, templates, etc.
- Anything your application needs at runtime
- Files here are copied to the classpath

**src/test/**
- This is where your **test code** lives
- Test files are NOT included in the final JAR/WAR
- Only used during testing phase

**src/test/java/**
- Your test classes (JUnit, TestNG, etc.)
- Same package structure as main code
- Example: \`com.example.AppTest.java\` goes in \`src/test/java/com/example/AppTest.java\`

**src/test/resources/**
- Test-specific configuration files
- Test data files
- Mock resources for testing

### target/ Directory

**target/**
- This is where Maven puts all build output
- Created automatically when you build
- Contains compiled classes, JAR files, test reports, etc.
- You can delete this folder anytime - Maven will recreate it
- Usually added to \`.gitignore\` (don't commit to version control)

**target/classes/**
- Compiled Java classes from \`src/main/java\`
- Resources from \`src/main/resources\`

**target/test-classes/**
- Compiled test classes from \`src/test/java\`
- Test resources from \`src/test/resources\`

**target/my-project-1.0.jar**
- The final packaged JAR file
- Created when you run \`mvn package\`

### pom.xml

**pom.xml**
- Project Object Model file
- The heart of your Maven project
- Contains all project configuration
- We'll cover this in detail in the next tutorial

## Why This Structure?

### 1. Convention Over Configuration

Maven assumes this structure. You don't need to tell Maven where your code is - it already knows. This means:
- Less configuration
- Consistent projects
- Easy to understand

### 2. Separation of Concerns

**Main vs Test:**
- Production code separate from test code
- Tests don't get packaged with your application
- Clear distinction between what runs and what tests

**Java vs Resources:**
- Code separate from configuration
- Resources copied to classpath automatically
- Easy to manage different file types

### 3. IDE Compatibility

All IDEs understand this structure:
- IntelliJ IDEA recognizes it immediately
- Eclipse imports it correctly
- VS Code works with it
- No IDE-specific configuration needed

### 4. Build Process

Maven's build process relies on this structure:
- \`mvn compile\` compiles \`src/main/java\`
- \`mvn test\` compiles and runs \`src/test/java\`
- \`mvn package\` packages \`src/main\` into JAR/WAR

## Real Example

Let's say you're building a web application:

\`\`\`
ecommerce-app
 ┣ src
 ┃ ┣ main
 ┃ ┃ ┣ java
 ┃ ┃ ┃ ┗ com
 ┃ ┃ ┃ ┃ ┗ myshop
 ┃ ┃ ┃ ┃ ┃ ┣ controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ ProductController.java
 ┃ ┃ ┃ ┃ ┃ ┣ service
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ ProductService.java
 ┃ ┃ ┃ ┃ ┃ ┣ model
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ Product.java
 ┃ ┃ ┃ ┃ ┃ ┗ App.java
 ┃ ┃ ┗ resources
 ┃ ┃ ┃ ┣ application.properties
 ┃ ┃ ┃ ┣ log4j.xml
 ┃ ┃ ┃ ┗ static
 ┃ ┃ ┃ ┃ ┣ css
 ┃ ┃ ┃ ┃ ┃ ┗ style.css
 ┃ ┃ ┃ ┃ ┗ images
 ┃ ┃ ┃ ┃ ┃ ┗ logo.png
 ┃ ┗ test
 ┃ ┃ ┣ java
 ┃ ┃ ┃ ┗ com
 ┃ ┃ ┃ ┃ ┗ myshop
 ┃ ┃ ┃ ┃ ┃ ┣ service
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ ProductServiceTest.java
 ┃ ┃ ┃ ┃ ┃ ┗ model
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ ProductTest.java
 ┃ ┃ ┗ resources
 ┃ ┃ ┃ ┗ test-data.properties
 ┣ target
 ┃ ┣ classes
 ┃ ┣ test-classes
 ┃ ┣ ecommerce-app-1.0.war
 ┃ ┗ surefire-reports
 ┗ pom.xml
\`\`\`

Notice:
- All Java code in \`src/main/java\` with proper package structure
- Configuration files in \`src/main/resources\`
- Test code mirrors the main code structure
- Build output in \`target\`

## Customizing the Structure

While Maven prefers the standard structure, you can customize it if needed:

\`\`\`xml
<build>
    <sourceDirectory>src/main/java</sourceDirectory>
    <testSourceDirectory>src/test/java</testSourceDirectory>
    <resources>
        <resource>
            <directory>src/main/resources</directory>
        </resource>
    </resources>
</build>
\`\`\`

But honestly, you rarely need to do this. The standard structure works for 99% of projects.

## Common Mistakes

### Mistake 1: Putting Code in Wrong Location

**Wrong:**
\`\`\`
my-project
 ┣ src
 ┃ ┗ App.java  (WRONG - should be in src/main/java)
\`\`\`

**Correct:**
\`\`\`
my-project
 ┣ src
 ┃ ┣ main
 ┃ ┃ ┗ java
 ┃ ┃ ┃ ┗ App.java
\`\`\`

### Mistake 2: Mixing Test and Main Code

**Wrong:**
\`\`\`
src/main/java
 ┣ App.java
 ┗ AppTest.java  (WRONG - tests should be in src/test/java)
\`\`\`

**Correct:**
\`\`\`
src/main/java/App.java
src/test/java/AppTest.java
\`\`\`

### Mistake 3: Committing target/ Directory

**Wrong:**
- Adding \`target/\` to version control

**Correct:**
- Add \`target/\` to \`.gitignore\`
- Maven recreates it on every build

## Summary

Maven's standard directory structure:
- **src/main/java** - Production Java code
- **src/main/resources** - Production resources
- **src/test/java** - Test Java code
- **src/test/resources** - Test resources
- **target/** - Build output (don't commit)
- **pom.xml** - Project configuration

Benefits:
- Consistent across all projects
- Works with all IDEs
- No configuration needed
- Easy to understand

Once you learn this structure, you can navigate any Maven project instantly. It's one of Maven's best features!

Next, let's learn about pom.xml - the file that makes it all work.
`
};

export default mavenProjectStructure;

