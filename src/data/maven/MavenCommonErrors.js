const mavenCommonErrors = {
  id: 'maven-common-errors',
  title: 'Common Errors & Fixes',
  description: 'Learn how to fix common Maven errors',
  courseTitle: 'Maven',
  sectionTitle: 'Maven Basics',
  content: `
# Common Errors & Fixes

Maven errors can be frustrating, but most have simple solutions. Here are the most common errors you'll encounter and how to fix them.

## Error 1: Dependency Not Found

**Error Message:**
\`\`\`
Could not find artifact com.example:my-lib:jar:1.0.0
\`\`\`

**Causes:**
- Wrong dependency coordinates
- Version doesn't exist
- Repository not accessible
- Network issues

**Solutions:**

1. **Verify dependency coordinates:**
   - Check groupId, artifactId, and version
   - Visit https://mvnrepository.com/ to verify

2. **Check version exists:**
   - Verify the version number is correct
   - Some versions might not exist

3. **Clear local repository:**
   \`\`\`bash
   rm -rf ~/.m2/repository/com/example/my-lib
   mvn clean install
   \`\`\`

4. **Check repository access:**
   - Verify internet connection
   - Check if repository URL is correct
   - Try accessing repository in browser

5. **Add repository:**
   \`\`\`xml
   <repositories>
       <repository>
           <id>custom-repo</id>
           <url>https://repo.example.com/maven</url>
       </repository>
   </repositories>
   \`\`\`

## Error 2: JAVA_HOME Not Set

**Error Message:**
\`\`\`
JAVA_HOME environment variable is not set
\`\`\`

**Cause:**
- JAVA_HOME environment variable not configured
- Points to wrong location

**Solutions:**

1. **Set JAVA_HOME:**
   
   **Windows:**
   - Set environment variable: \`JAVA_HOME=C:\\Program Files\\Java\\jdk-17\`
   - Add to PATH: \`%JAVA_HOME%\\bin\`
   
   **Mac/Linux:**
   \`\`\`bash
   export JAVA_HOME=/usr/lib/jvm/java-17-openjdk
   export PATH=$JAVA_HOME/bin:$PATH
   \`\`\`

2. **Verify:**
   \`\`\`bash
   echo $JAVA_HOME  # Mac/Linux
   echo %JAVA_HOME%  # Windows
   \`\`\`

3. **Check Java version:**
   \`\`\`bash
   java -version
   \`\`\`

## Error 3: Plugin Execution Failed

**Error Message:**
\`\`\`
Plugin execution failed: maven-compiler-plugin
\`\`\`

**Causes:**
- Java version mismatch
- Plugin configuration error
- Corrupted build

**Solutions:**

1. **Check Java version:**
   - Verify Java version matches pom.xml
   - Update pom.xml or Java installation

2. **Update plugin version:**
   \`\`\`xml
   <plugin>
       <groupId>org.apache.maven.plugins</groupId>
       <artifactId>maven-compiler-plugin</artifactId>
       <version>3.11.0</version>
   </plugin>
   \`\`\`

3. **Clean and rebuild:**
   \`\`\`bash
   mvn clean install
   \`\`\`

4. **Check plugin configuration:**
   - Verify source and target versions
   - Check for typos in configuration

## Error 4: Compilation Failure

**Error Message:**
\`\`\`
Compilation failure: [ERROR] cannot find symbol
\`\`\`

**Causes:**
- Missing dependencies
- Wrong Java version
- Syntax errors

**Solutions:**

1. **Check missing dependencies:**
   - Add required dependencies to pom.xml
   - Verify all imports are available

2. **Verify Java version:**
   - Check source/target in pom.xml
   - Match with installed Java version

3. **Clean build:**
   \`\`\`bash
   mvn clean compile
   \`\`\`

4. **Check for syntax errors:**
   - Review error messages
   - Fix compilation errors

## Error 5: Test Failure

**Error Message:**
\`\`\`
Tests run: 5, Failures: 1, Errors: 1
\`\`\`

**Causes:**
- Test code has bugs
- Missing test dependencies
- Configuration issues

**Solutions:**

1. **Read test output:**
   - Check \`target/surefire-reports\` for details
   - Understand why test failed

2. **Fix test code:**
   - Correct test logic
   - Update assertions

3. **Skip tests temporarily:**
   \`\`\`bash
   mvn clean package -DskipTests
   \`\`\`
   (Only during development, not production)

4. **Check test dependencies:**
   - Ensure test scope dependencies are present
   - Verify test framework version

## Error 6: Port Already in Use

**Error Message:**
\`\`\`
Port 8080 is already in use
\`\`\`

**Causes:**
- Another application using the port
- Previous instance not stopped

**Solutions:**

1. **Change port:**
   \`\`\`properties
   server.port=8081
   \`\`\`

2. **Kill process using port:**
   
   **Windows:**
   \`\`\`bash
   netstat -ano | findstr :8080
   taskkill /PID <pid> /F
   \`\`\`
   
   **Mac/Linux:**
   \`\`\`bash
   lsof -ti:8080 | xargs kill -9
   \`\`\`

3. **Stop previous instance:**
   - Stop the application properly
   - Check for background processes

## Error 7: Out of Memory

**Error Message:**
\`\`\`
java.lang.OutOfMemoryError: Java heap space
\`\`\`

**Causes:**
- Large project
- Insufficient memory
- Memory leaks

**Solutions:**

1. **Increase Maven memory:**
   \`\`\`bash
   export MAVEN_OPTS="-Xmx2048m -Xms1024m"
   mvn clean install
   \`\`\`

2. **Increase Java heap:**
   \`\`\`bash
   mvn clean install -Dmaven.test.skip=true -Xmx2048m
   \`\`\`

3. **Optimize build:**
   - Skip unnecessary plugins
   - Build modules separately

## Error 8: Encoding Issues

**Error Message:**
\`\`\`
unmappable character for encoding
\`\`\`

**Causes:**
- File encoding mismatch
- Special characters in code

**Solutions:**

1. **Set encoding in pom.xml:**
   \`\`\`xml
   <properties>
       <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
   </properties>
   \`\`\`

2. **Configure compiler plugin:**
   \`\`\`xml
   <plugin>
       <groupId>org.apache.maven.plugins</groupId>
       <artifactId>maven-compiler-plugin</artifactId>
       <configuration>
           <encoding>UTF-8</encoding>
       </configuration>
   </plugin>
   \`\`\`

3. **Check file encoding:**
   - Ensure source files are UTF-8
   - Configure IDE to use UTF-8

## Error 9: Circular Dependency

**Error Message:**
\`\`\`
Circular dependency detected
\`\`\`

**Causes:**
- Module A depends on Module B
- Module B depends on Module A

**Solutions:**

1. **Refactor code:**
   - Extract common code to shared module
   - Break circular dependency

2. **Review architecture:**
   - Reorganize modules
   - Create proper dependency hierarchy

3. **Use interfaces:**
   - Depend on interfaces, not implementations
   - Reduces coupling

## Error 10: Version Conflict

**Error Message:**
\`\`\`
Dependency convergence error
\`\`\`

**Causes:**
- Different versions of same dependency
- Transitive dependency conflicts

**Solutions:**

1. **Use dependencyManagement:**
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

2. **Exclude conflicting dependency:**
   \`\`\`xml
   <dependency>
       <groupId>com.example</groupId>
       <artifactId>my-lib</artifactId>
       <exclusions>
           <exclusion>
               <groupId>org.springframework</groupId>
               <artifactId>spring-core</artifactId>
           </exclusion>
       </exclusions>
   </dependency>
   \`\`\`

3. **View dependency tree:**
   \`\`\`bash
   mvn dependency:tree
   \`\`\`
   Identify conflicts and resolve

## General Troubleshooting Tips

### 1. Clean Build

Always try clean build first:
\`\`\`bash
mvn clean install
\`\`\`

### 2. Check Maven Version

Verify Maven is installed correctly:
\`\`\`bash
mvn -version
\`\`\`

### 3. Check Java Version

Verify Java version:
\`\`\`bash
java -version
javac -version
\`\`\`

### 4. Clear Local Repository

If dependencies seem corrupted:
\`\`\`bash
rm -rf ~/.m2/repository
mvn clean install
\`\`\`

### 5. Update Dependencies

Force update:
\`\`\`bash
mvn clean install -U
\`\`\`

### 6. Check Logs

Enable debug output:
\`\`\`bash
mvn clean install -X
\`\`\`

### 7. Verify pom.xml

Check for syntax errors:
\`\`\`bash
mvn validate
\`\`\`

### 8. Check Effective POM

See what Maven actually uses:
\`\`\`bash
mvn help:effective-pom
\`\`\`

## Prevention Tips

1. **Keep Maven updated**
   - Use latest stable version
   - Bug fixes and improvements

2. **Use consistent versions**
   - Use properties for versions
   - Use dependencyManagement

3. **Test regularly**
   - Run \`mvn test\` frequently
   - Catch issues early

4. **Clean builds**
   - Use \`mvn clean install\` regularly
   - Prevents stale artifacts

5. **Document configuration**
   - Add comments in pom.xml
   - Explain non-obvious settings

## Summary

Common errors and quick fixes:
- **Dependency not found** - Check coordinates, clear repository
- **JAVA_HOME not set** - Configure environment variable
- **Plugin execution failed** - Update plugin, check configuration
- **Compilation failure** - Check dependencies, Java version
- **Test failure** - Fix test code, check dependencies
- **Port in use** - Change port or kill process
- **Out of memory** - Increase Maven memory
- **Encoding issues** - Set UTF-8 encoding
- **Circular dependency** - Refactor architecture
- **Version conflict** - Use dependencyManagement

General troubleshooting:
- Clean build first
- Check versions
- Clear repository if needed
- Enable debug output
- Verify configuration

Most errors have simple solutions. Don't panic, follow the steps, and you'll resolve them!

Next, let's compare Maven with Gradle!
`
};

export default mavenCommonErrors;

