const mavenMultiModule = {
  id: 'maven-multi-module',
  title: 'Multi-Module Project',
  description: 'Learn how to create and manage multi-module Maven projects',
  courseTitle: 'Maven',
  sectionTitle: 'Maven Basics',
  content: `
# Multi-Module Project

A **multi-module project** is a Maven project that contains multiple sub-projects (modules). This is useful for large applications, microservices, or when you want to organize code into separate modules.

## Why Multi-Module Projects?

### Benefits

1. **Code Organization**
   - Separate concerns into different modules
   - Clear boundaries between components
   - Easier to navigate large codebases

2. **Reusability**
   - Share code between modules
   - Common utilities in one module
   - Other modules depend on it

3. **Build Efficiency**
   - Build only changed modules
   - Parallel builds possible
   - Faster development cycle

4. **Dependency Management**
   - Centralized dependency versions
   - Consistent across modules
   - Easier updates

5. **Deployment Flexibility**
   - Deploy modules independently
   - Different versions per module
   - Microservices architecture

## Project Structure

A multi-module project looks like this:

\`\`\`
parent-project
 ┣ module1
 ┃ ┣ src
 ┃ ┃ ┣ main
 ┃ ┃ ┃ ┗ java
 ┃ ┃ ┗ test
 ┃ ┃ ┃ ┗ java
 ┃ ┗ pom.xml
 ┣ module2
 ┃ ┣ src
 ┃ ┃ ┣ main
 ┃ ┃ ┃ ┗ java
 ┃ ┃ ┗ test
 ┃ ┃ ┃ ┗ java
 ┃ ┗ pom.xml
 ┣ module3
 ┃ ┣ src
 ┃ ┃ ┣ main
 ┃ ┃ ┃ ┗ java
 ┃ ┃ ┗ test
 ┃ ┃ ┃ ┗ java
 ┃ ┗ pom.xml
 ┗ pom.xml  (Parent POM)
\`\`\`

## Parent POM

The parent POM is the root pom.xml. It defines the modules and common configuration.

### Basic Parent POM

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.example</groupId>
    <artifactId>parent-project</artifactId>
    <version>1.0.0</version>
    <packaging>pom</packaging>  <!-- Important: packaging is pom -->

    <name>Parent Project</name>
    <description>Multi-module project parent</description>

    <modules>
        <module>module1</module>
        <module>module2</module>
        <module>module3</module>
    </modules>

    <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>
</project>
\`\`\`

**Key points:**
- **packaging** is \`pom\` (not jar or war)
- **modules** section lists all sub-modules
- Common properties defined here

## Child Module POM

Each module has its own pom.xml that references the parent.

### Basic Child POM

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>com.example</groupId>
        <artifactId>parent-project</artifactId>
        <version>1.0.0</version>
    </parent>

    <artifactId>module1</artifactId>
    <!-- groupId and version inherited from parent -->
    <packaging>jar</packaging>

    <name>Module 1</name>
</project>
\`\`\`

**Key points:**
- **parent** section references parent POM
- **artifactId** is required (defines module name)
- **groupId** and **version** inherited from parent
- **packaging** can be jar, war, etc.

## Real-World Example

Let's create a multi-module e-commerce application:

### Structure

\`\`\`
ecommerce-app
 ┣ api-module
 ┃ ┣ src/main/java/com/example/api
 ┃ ┗ pom.xml
 ┣ service-module
 ┃ ┣ src/main/java/com/example/service
 ┃ ┗ pom.xml
 ┣ web-module
 ┃ ┣ src/main/java/com/example/web
 ┃ ┗ pom.xml
 ┗ pom.xml
\`\`\`

### Parent POM

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.example</groupId>
    <artifactId>ecommerce-app</artifactId>
    <version>1.0.0</version>
    <packaging>pom</packaging>

    <modules>
        <module>api-module</module>
        <module>service-module</module>
        <module>web-module</module>
    </modules>

    <properties>
        <java.version>17</java.version>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
        <spring.version>5.3.30</spring.version>
    </properties>

    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework</groupId>
                <artifactId>spring-core</artifactId>
                <version>\${spring.version}</version>
            </dependency>
        </dependencies>
    </dependencyManagement>
</project>
\`\`\`

### API Module POM

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>com.example</groupId>
        <artifactId>ecommerce-app</artifactId>
        <version>1.0.0</version>
    </parent>

    <artifactId>api-module</artifactId>
    <packaging>jar</packaging>

    <dependencies>
        <!-- Version from dependencyManagement -->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-core</artifactId>
        </dependency>
    </dependencies>
</project>
\`\`\`

### Service Module POM

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>com.example</groupId>
        <artifactId>ecommerce-app</artifactId>
        <version>1.0.0</version>
    </parent>

    <artifactId>service-module</artifactId>
    <packaging>jar</packaging>

    <dependencies>
        <!-- Depends on api-module -->
        <dependency>
            <groupId>com.example</groupId>
            <artifactId>api-module</artifactId>
            <version>1.0.0</version>
        </dependency>
    </dependencies>
</project>
\`\`\`

### Web Module POM

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>com.example</groupId>
        <artifactId>ecommerce-app</artifactId>
        <version>1.0.0</version>
    </parent>

    <artifactId>web-module</artifactId>
    <packaging>war</packaging>

    <dependencies>
        <!-- Depends on service-module -->
        <dependency>
            <groupId>com.example</groupId>
            <artifactId>service-module</artifactId>
            <version>1.0.0</version>
        </dependency>
    </dependencies>
</project>
\`\`\`

## Module Dependencies

Modules can depend on each other:

**Example:**
- \`web-module\` depends on \`service-module\`
- \`service-module\` depends on \`api-module\`

**Dependency chain:**
\`\`\`
web-module → service-module → api-module
\`\`\`

Maven builds modules in the correct order automatically.

## Building Multi-Module Projects

### Build All Modules

From parent directory:

\`\`\`bash
mvn clean install
\`\`\`

This:
1. Builds all modules in dependency order
2. Installs each module to local repository
3. Makes modules available to dependent modules

### Build Specific Module

\`\`\`bash
cd module1
mvn clean install
\`\`\`

Or from parent:

\`\`\`bash
mvn clean install -pl module1
\`\`\`

**-pl** = project list (specify which modules to build)

### Build Module and Dependencies

\`\`\`bash
mvn clean install -pl module1 -am
\`\`\`

**-am** = also make (build dependencies too)

## Dependency Management

Use \`<dependencyManagement>\` in parent POM:

\`\`\`xml
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-core</artifactId>
            <version>5.3.30</version>
        </dependency>
    </dependencies>
</dependencyManagement>
\`\`\`

Child modules can use dependencies without specifying version:

\`\`\`xml
<dependencies>
    <!-- Version from parent dependencyManagement -->
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-core</artifactId>
    </dependency>
</dependencies>
\`\`\`

## Plugin Management

Similarly, use \`<pluginManagement>\` in parent:

\`\`\`xml
<pluginManagement>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <version>3.11.0</version>
        </plugin>
    </plugins>
</pluginManagement>
\`\`\`

Child modules inherit plugin configuration.

## Common Patterns

### Pattern 1: Layered Architecture

\`\`\`
app
 ┣ domain (entities)
 ┣ service (business logic)
 ┣ repository (data access)
 ┗ web (controllers)
\`\`\`

### Pattern 2: Microservices

\`\`\`
services
 ┣ user-service
 ┣ order-service
 ┣ payment-service
 ┗ common (shared code)
\`\`\`

### Pattern 3: Library + Application

\`\`\`
project
 ┣ core-library
 ┗ application (uses core-library)
\`\`\`

## Best Practices

1. **Use dependencyManagement**
   - Centralized version control
   - Consistent dependencies

2. **Use pluginManagement**
   - Consistent build configuration
   - Easier maintenance

3. **Clear module boundaries**
   - Each module has a clear purpose
   - Minimize dependencies between modules

4. **Build from parent**
   - Always build from parent directory
   - Ensures correct build order

5. **Version management**
   - Use properties for versions
   - Update in one place

## Common Mistakes

### Mistake 1: Wrong Packaging in Parent

**Wrong:**
\`\`\`xml
<packaging>jar</packaging>  <!-- In parent POM -->
\`\`\`

**Correct:**
\`\`\`xml
<packaging>pom</packaging>  <!-- In parent POM -->
\`\`\`

### Mistake 2: Circular Dependencies

**Wrong:**
- Module A depends on Module B
- Module B depends on Module A

**Solution:** Refactor to remove circular dependency.

### Mistake 3: Building from Wrong Directory

**Wrong:**
\`\`\`bash
cd module1
mvn clean install  # Might miss dependencies
\`\`\`

**Correct:**
\`\`\`bash
cd parent-project
mvn clean install  # Builds all modules
\`\`\`

## Summary

Multi-module projects:
- Organize large codebases
- Enable code reuse
- Centralize dependency management
- Improve build efficiency

Key concepts:
- **Parent POM** - \`packaging\` is \`pom\`, defines modules
- **Child POM** - References parent, inherits configuration
- **Module dependencies** - Modules can depend on each other
- **Dependency management** - Centralized in parent POM

Use cases:
- Large applications
- Microservices
- Shared libraries
- Layered architectures

Next, let's learn about Maven with Spring Boot!
`
};

export default mavenMultiModule;

