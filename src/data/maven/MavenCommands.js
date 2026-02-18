const mavenCommands = {
  id: 'maven-commands',
  title: 'Useful Maven Commands',
  description: 'Essential Maven commands every developer should know',
  courseTitle: 'Maven',
  sectionTitle: 'Maven Basics',
  content: `
# Useful Maven Commands

Here are the most useful Maven commands you'll use daily. Mastering these will make you productive with Maven.

## Basic Build Commands

### mvn clean

\`\`\`bash
mvn clean
\`\`\`

- Deletes the \`target\` directory
- Removes all compiled classes and generated files
- Use when you want a fresh build

**When to use:**
- After changing build configuration
- When build seems corrupted
- Before important builds

### mvn compile

\`\`\`bash
mvn compile
\`\`\`

- Compiles source code from \`src/main/java\`
- Puts compiled classes in \`target/classes\`
- Does NOT run tests
- Does NOT create JAR

**When to use:**
- Quick compilation check
- During development
- Fast feedback loop

### mvn test

\`\`\`bash
mvn test
\`\`\`

- Compiles source and test code
- Runs all tests
- Generates test reports in \`target/surefire-reports\`
- Does NOT create JAR

**When to use:**
- Before committing code
- To verify everything works
- During development

### mvn package

\`\`\`bash
mvn package
\`\`\`

- Compiles code
- Runs tests
- Packages into JAR/WAR/EAR
- Creates file in \`target\` directory

**When to use:**
- Creating deployable artifact
- Before deployment
- Creating release

### mvn install

\`\`\`bash
mvn install
\`\`\`

- Does everything \`package\` does
- Installs artifact to local repository (\`~/.m2/repository\`)
- Makes it available for other projects

**When to use:**
- Building library for other projects
- Multi-module projects
- Most common build command

### mvn clean install

\`\`\`bash
mvn clean install
\`\`\`

- Combines clean and install
- Most commonly used command
- Ensures fresh build

**When to use:**
- Default build command
- Before committing
- Creating release

## Dependency Commands

### mvn dependency:tree

\`\`\`bash
mvn dependency:tree
\`\`\`

Shows all dependencies (direct and transitive) in a tree structure.

**Example output:**
\`\`\`
com.example:my-app:jar:1.0.0
+- org.springframework:spring-core:jar:5.3.30:compile
|  +- org.springframework:spring-jcl:jar:5.3.30:compile
+- junit:junit:jar:4.13.2:test
\`\`\`

**When to use:**
- Understanding dependency chain
- Finding version conflicts
- Debugging dependency issues

### mvn dependency:analyze

\`\`\`bash
mvn dependency:analyze
\`\`\`

Analyzes dependencies and reports:
- Unused declared dependencies
- Used undeclared dependencies

**When to use:**
- Cleaning up pom.xml
- Finding unused dependencies
- Optimizing dependencies

### mvn dependency:resolve

\`\`\`bash
mvn dependency:resolve
\`\`\`

Downloads all dependencies without building the project.

**When to use:**
- Pre-downloading dependencies
- Offline preparation
- Checking dependency availability

### mvn dependency:copy-dependencies

\`\`\`bash
mvn dependency:copy-dependencies
\`\`\`

Copies all dependencies to \`target/dependency\` directory.

**When to use:**
- Manual deployment
- Creating deployment package
- Analyzing dependencies

## Plugin Commands

### mvn compiler:compile

\`\`\`bash
mvn compiler:compile
\`\`\`

Runs compiler plugin directly (same as \`mvn compile\`).

### mvn surefire:test

\`\`\`bash
mvn surefire:test
\`\`\`

Runs test plugin directly (same as \`mvn test\`).

### mvn spring-boot:run

\`\`\`bash
mvn spring-boot:run
\`\`\`

Runs Spring Boot application directly.

**When to use:**
- Running Spring Boot apps
- Development
- Quick testing

### mvn exec:java

\`\`\`bash
mvn exec:java -Dexec.mainClass="com.example.App"
\`\`\`

Runs a Java class directly.

**When to use:**
- Running main classes
- Quick testing
- Development

## Advanced Commands

### mvn clean package -DskipTests

\`\`\`bash
mvn clean package -DskipTests
\`\`\`

Builds without running tests.

**When to use:**
- Quick builds during development
- When tests are broken but you need JAR
- NOT for production builds

### mvn clean package -Dmaven.test.skip=true

\`\`\`bash
mvn clean package -Dmaven.test.skip=true
\`\`\`

Skips test compilation and execution.

**Difference from -DskipTests:**
- \`-DskipTests\` - Compiles tests but doesn't run
- \`-Dmaven.test.skip=true\` - Skips test compilation entirely

### mvn clean install -pl module1

\`\`\`bash
mvn clean install -pl module1
\`\`\`

Builds only specific module (multi-module projects).

**-pl** = project list

### mvn clean install -pl module1 -am

\`\`\`bash
mvn clean install -pl module1 -am
\`\`\`

Builds module1 and its dependencies.

**-am** = also make

### mvn versions:display-dependency-updates

\`\`\`bash
mvn versions:display-dependency-updates
\`\`\`

Shows which dependencies have newer versions available.

**Requires:** \`versions-maven-plugin\`

**When to use:**
- Checking for updates
- Security updates
- Staying current

### mvn help:effective-pom

\`\`\`bash
mvn help:effective-pom
\`\`\`

Shows the effective POM (after inheritance and interpolation).

**When to use:**
- Debugging configuration
- Understanding inherited settings
- Verifying plugin configuration

### mvn help:describe

\`\`\`bash
mvn help:describe -Dplugin=compiler
\`\`\`

Describes a plugin and its goals.

**When to use:**
- Learning about plugins
- Finding plugin goals
- Understanding plugin configuration

## Information Commands

### mvn -version

\`\`\`bash
mvn -version
\`\`\`

Shows Maven version and Java information.

### mvn help:effective-settings

\`\`\`bash
mvn help:effective-settings
\`\`\`

Shows effective settings (from settings.xml).

### mvn validate

\`\`\`bash
mvn validate
\`\`\`

Validates project structure and configuration.

**When to use:**
- Checking project setup
- Verifying configuration
- Quick validation

## Multi-Module Commands

### mvn clean install -rf :module1

\`\`\`bash
mvn clean install -rf :module1
\`\`\`

Resumes build from specific module.

**-rf** = resume from

**When to use:**
- After build failure
- Continuing from specific point

### mvn clean install -N

\`\`\`bash
mvn clean install -N
\`\`\`

Builds only parent POM, not modules.

**-N** = non-recursive

## Useful Command Combinations

### Daily Development

\`\`\`bash
# Quick compile check
mvn compile

# Run tests
mvn test

# Full build
mvn clean install
\`\`\`

### Before Commit

\`\`\`bash
# Clean build with tests
mvn clean install

# Check dependencies
mvn dependency:tree
\`\`\`

### Production Build

\`\`\`bash
# Full clean build
mvn clean package

# Verify
mvn verify
\`\`\`

### Debugging

\`\`\`bash
# See effective POM
mvn help:effective-pom

# Analyze dependencies
mvn dependency:tree
mvn dependency:analyze

# Check for updates
mvn versions:display-dependency-updates
\`\`\`

## Command Options

### -X (Debug)

\`\`\`bash
mvn clean install -X
\`\`\`

Shows debug output.

### -e (Errors)

\`\`\`bash
mvn clean install -e
\`\`\`

Shows full error stack traces.

### -q (Quiet)

\`\`\`bash
mvn clean install -q
\`\`\`

Suppresses most output.

### -U (Update)

\`\`\`bash
mvn clean install -U
\`\`\`

Forces update of dependencies.

## Tips

1. **Use clean install regularly**
   - Most common command
   - Ensures fresh build

2. **Check dependency tree**
   - Understand what's included
   - Find conflicts

3. **Run tests before committing**
   - \`mvn test\` or \`mvn clean install\`

4. **Use -DskipTests carefully**
   - Only during development
   - Never in production

5. **Learn plugin goals**
   - \`mvn help:describe\` to learn plugins
   - Extend Maven functionality

## Summary

Essential commands:
- **mvn clean install** - Most common
- **mvn test** - Run tests
- **mvn package** - Create JAR/WAR
- **mvn dependency:tree** - View dependencies
- **mvn spring-boot:run** - Run Spring Boot apps

Command options:
- **-DskipTests** - Skip tests
- **-pl** - Build specific module
- **-X** - Debug output
- **-U** - Update dependencies

Master these commands and you'll be productive with Maven!

Next, let's learn about common errors and how to fix them!
`
};

export default mavenCommands;

