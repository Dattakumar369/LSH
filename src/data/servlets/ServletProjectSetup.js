const servletProjectSetup = {
  id: 'servlet-project-setup',
  title: 'Servlet Project Setup - Create & Run',
  description: 'Step-by-step guide to create a Servlet project in Eclipse/IntelliJ, configure Tomcat, and run your first Servlet',
  content: `
# Servlet Project Setup — Create & Run Your First Servlet

This guide will walk you through creating a Servlet project from scratch, setting up Tomcat, and running it.

---

## Prerequisites

Before starting, ensure you have:
- **Java JDK 8+** installed
- **Eclipse IDE** or **IntelliJ IDEA**
- **Apache Tomcat 9.x** or **10.x** downloaded and extracted
- **Servlet API JAR** (comes with Tomcat)

---

## 📦 Where to Find JAR Files - Complete Guide

### Step 1: Download and Install Apache Tomcat

If you don't have Tomcat yet:

1. **Visit:** https://tomcat.apache.org/
2. **Download:** Latest version (9.x or 10.x recommended)
   - For Windows: Download \`.zip\` file
   - For Linux/Mac: Download \`.tar.gz\` file
3. **Extract** the downloaded file to a location:
   - **Windows:** \`C:\\apache-tomcat-9.0.xx\` or \`D:\\apache-tomcat-9.0.xx\`
   - **Linux/Mac:** \`/opt/apache-tomcat-9.0.xx\` or \`/usr/local/apache-tomcat-9.0.xx\`

### Step 2: Locate JAR Files in Tomcat

**The JAR files you need are located inside the Tomcat installation folder.**

#### Tomcat Folder Structure

After extracting Tomcat, you'll see this structure:

\`\`\`
apache-tomcat-9.0.xx/
├── bin/                    # Executable files (startup.sh, startup.bat)
├── conf/                   # Configuration files
├── lib/                    # ⭐ JAR FILES ARE HERE ⭐
│   ├── servlet-api.jar     # This is what you need!
│   ├── jsp-api.jar         # For JSP (if using JSP)
│   ├── jasper.jar          # JSP compiler
│   └── (other JAR files)
├── logs/                   # Log files
├── webapps/                # Deploy your WAR files here
├── work/                   # Temporary files
└── (other folders)
\`\`\`

#### Exact Paths to JAR Files

**Windows:**
\`\`\`
C:\apache-tomcat-9.0.xx\lib\servlet-api.jar
C:\apache-tomcat-9.0.xx\lib\jsp-api.jar
\`\`\`

**Linux/Mac:**
\`\`\`
/opt/apache-tomcat-9.0.xx/lib/servlet-api.jar
/opt/apache-tomcat-9.0.xx/lib/jsp-api.jar
\`\`\`

**Or if you installed in a different location:**
- Replace \`C:\\apache-tomcat-9.0.xx\` with your actual Tomcat path
- Replace \`/opt/apache-tomcat-9.0.xx\` with your actual Tomcat path

#### How to Verify You Have the Right Files

1. **Navigate to your Tomcat installation folder**
2. **Open the \`lib\` folder**
3. **Look for these files:**
   - \`servlet-api.jar\` (required for Servlets)
   - \`jsp-api.jar\` (required for JSP)
   - \`jasper.jar\` (JSP compiler)

**If you see these files, you're ready!** These are the JAR files you need to add to your project.

#### What If You Don't Have Tomcat?

**Download Tomcat:**
1. Go to: https://tomcat.apache.org/download-90.cgi (for Tomcat 9)
   or https://tomcat.apache.org/download-100.cgi (for Tomcat 10)
2. Under **"Binary Distributions"** → **"Core"**
3. Download:
   - **Windows:** \`apache-tomcat-9.0.xx-windows-x64.zip\`
   - **Linux:** \`apache-tomcat-9.0.xx.tar.gz\`
   - **Mac:** \`apache-tomcat-9.0.xx.tar.gz\`
4. Extract the ZIP/TAR file
5. Remember the extraction path — this is where your JAR files are!

---

## Method 1: Eclipse IDE Setup

### Step 1: Create Dynamic Web Project

### Step 2: Create Dynamic Web Project

1. Open Eclipse
2. **File → New → Dynamic Web Project**
3. Enter project name: \`MyFirstServlet\`
4. Select **Target runtime**: Click "New Runtime"
   - Select **Apache Tomcat v9.0** (or your version)
   - Browse to your Tomcat installation folder
   - Click **Finish**
5. Click **Next**
6. **Configuration**: Keep default (or select "Generate web.xml")
7. Click **Next**
8. **Web Module**: 
   - Check **Generate web.xml deployment descriptor**
9. Click **Finish**

### Step 3: Project Structure

Your project will have this structure:

\`\`\`
MyFirstServlet/
├── src/
│   └── main/
│       └── java/
│           └── (your servlet classes here)
├── WebContent/
│   ├── WEB-INF/
│   │   ├── lib/          # JAR files go here
│   │   └── web.xml
│   └── (HTML, JSP files here)
└── build/
\`\`\`

### Step 4: Add Servlet API JAR Files

**Important:** You need to add Servlet API JAR files to your project.

#### 📍 Where to Find JAR Files in Tomcat

**The JAR files are in your Tomcat installation's \`lib\` folder.**

**Full Path Examples:**

**Windows:**
\`\`\`
C:\apache-tomcat-9.0.xx\lib\servlet-api.jar
\`\`\`
*(Replace \`C:\apache-tomcat-9.0.xx\` with your actual Tomcat path)*

**Linux:**
\`\`\`
/opt/apache-tomcat-9.0.xx/lib/servlet-api.jar
\`\`\`
*(Replace \`/opt/apache-tomcat-9.0.xx\` with your actual Tomcat path)*

**Mac:**
\`\`\`
/usr/local/apache-tomcat-9.0.xx/lib/servlet-api.jar
\`\`\`

**To find your Tomcat path:**
1. Remember where you extracted Tomcat
2. Open that folder
3. Go into the \`lib\` subfolder
4. You'll see \`servlet-api.jar\` there!

#### Method A: Automatic (Recommended for Eclipse)

If you configured Tomcat as the target runtime in Step 2, Eclipse automatically adds the JAR files. **Skip to Step 5** if this works.

#### Method B: Manual Addition in Eclipse

If you still get compilation errors:

**Option 1: Add via Project Properties**

1. **Right-click on project** → **Properties**
2. Go to **Java Build Path** → **Libraries** tab
3. Click **Add External JARs...**
4. **Navigate to your Tomcat \`lib\` folder:**
   - Windows: \`C:\\apache-tomcat-9.0.xx\\lib\\\`
   - Linux/Mac: \`/opt/apache-tomcat-9.0.xx/lib/\`
   - *(Use your actual Tomcat installation path)*
5. **Select the JAR files:**
   - \`servlet-api.jar\`
   - \`jsp-api.jar\` (if using JSP)
6. Click **Open**
7. Click **Apply and Close**

**Option 2: Copy to WEB-INF/lib (Recommended)**

1. **Open File Explorer/Finder**
2. **Navigate to your Tomcat installation:**
   - Go to: \`apache-tomcat-9.0.xx\` folder
   - Open: \`lib\` folder
   - You'll see: \`servlet-api.jar\` and other JAR files
3. **Copy these files:**
   - Select \`servlet-api.jar\`
   - Copy (Ctrl+C / Cmd+C)
4. **Navigate to your Eclipse project:**
   - Go to: \`MyFirstServlet/WebContent/WEB-INF/\`
   - Create \`lib\` folder if it doesn't exist
   - Paste the JAR file here (Ctrl+V / Cmd+V)
5. **In Eclipse:**
   - Right-click project → **Refresh** (F5)
   - The JAR file should now appear under \`WebContent/WEB-INF/lib/\`

#### Verify JAR Files are Added

1. Expand **WebContent → WEB-INF → lib**
2. You should see \`servlet-api.jar\`
3. Or check **Project Properties → Java Build Path → Libraries**

### Step 5: Create Your First Servlet

1. Right-click on \`src/main/java\` (or create package)
2. **New → Servlet**
3. Enter:
   - **Java package**: \`com.example\`
   - **Class name**: \`HelloServlet\`
4. Click **Next**
5. **URL mappings**: \`/hello\` (default)
6. Click **Next**
7. Select methods: **doGet** and **doPost**
8. Click **Finish**

### Step 5: Write Servlet Code

Eclipse generates a template. Update it:

\`\`\`java
package com.example;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/hello")
public class HelloServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    
    protected void doGet(HttpServletRequest request, 
                        HttpServletResponse response) 
            throws ServletException, IOException {
        
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        
        out.println("<!DOCTYPE html>");
        out.println("<html>");
        out.println("<head><title>Hello Servlet</title></head>");
        out.println("<body>");
        out.println("<h1>Hello from Servlet!</h1>");
        out.println("<p>Current time: " + new java.util.Date() + "</p>");
        out.println("</body>");
        out.println("</html>");
    }
}
\`\`\`

### Step 6: Configure web.xml (If Not Using Annotations)

If you're using **web.xml** instead of \`@WebServlet\` annotation:

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee
         http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">
    
    <servlet>
        <servlet-name>HelloServlet</servlet-name>
        <servlet-class>com.example.HelloServlet</servlet-class>
    </servlet>
    
    <servlet-mapping>
        <servlet-name>HelloServlet</servlet-name>
        <url-pattern>/hello</url-pattern>
    </servlet-mapping>
</web-app>
\`\`\`

### Step 7: Run the Project

1. Right-click on project → **Run As → Run on Server**
2. Select **Tomcat v9.0 Server**
3. Click **Finish**
4. Eclipse will start Tomcat and deploy your project
5. Open browser: \`http://localhost:8080/MyFirstServlet/hello\`

---

## Method 2: IntelliJ IDEA Setup

### Step 1: Create New Project

1. **File → New → Project**
2. Select **Java Enterprise**
3. Select:
   - **Application Server**: Tomcat (configure if needed)
   - **Java**: Your JDK version
   - **Web Application**: Check this
4. Click **Next**
5. Enter project name: \`MyFirstServlet\`
6. Click **Finish**

### Step 2: Configure Tomcat

1. **File → Settings → Build, Execution, Deployment → Application Servers**
2. Click **+** → **Tomcat Server**
3. Browse to your Tomcat installation folder
4. Click **OK**

### Step 3: Create Servlet

1. Right-click on \`src\` folder
2. **New → Servlet**
3. Enter:
   - **Name**: \`HelloServlet\`
   - **Package**: \`com.example\`
4. Check **Create web.xml**
5. Click **OK**

### Step 4: Add Servlet API JAR Files

**Important:** You need to add Servlet API JAR files to your project.

#### 📍 Where to Find JAR Files in Tomcat

**The JAR files are in your Tomcat installation's \`lib\` folder.**

**Full Path Examples:**

**Windows:**
\`\`\`
C:\apache-tomcat-9.0.xx\lib\servlet-api.jar
\`\`\`
*(Replace \`C:\apache-tomcat-9.0.xx\` with your actual Tomcat path)*

**Linux/Mac:**
\`\`\`
/opt/apache-tomcat-9.0.xx/lib/servlet-api.jar
\`\`\`

**To find your Tomcat path:**
1. Remember where you extracted Tomcat
2. Open that folder → go to \`lib\` subfolder
3. You'll see \`servlet-api.jar\` there!

#### Add JAR Files in IntelliJ

**Method 1: Add to Project Library**

1. **File → Project Structure** (or press \`Ctrl+Alt+Shift+S\` / \`Cmd+;\` on Mac)
2. Go to **Libraries**
3. Click **+** → **Java**
4. **Navigate to your Tomcat \`lib\` folder:**
   - Windows: \`C:\\apache-tomcat-9.0.xx\\lib\\\`
   - Linux/Mac: \`/opt/apache-tomcat-9.0.xx/lib/\`
   - *(Use your actual Tomcat installation path)*
5. **Select:**
   - \`servlet-api.jar\`
   - \`jsp-api.jar\` (if using JSP)
6. Click **OK**
7. Select the module to add libraries to
8. Click **OK**

**Method 2: Add to WEB-INF/lib (Recommended)**

1. **Open File Explorer/Finder**
2. **Navigate to your Tomcat installation:**
   - Go to: \`apache-tomcat-9.0.xx\` folder
   - Open: \`lib\` folder
   - You'll see: \`servlet-api.jar\` and other JAR files
3. **Copy these files:**
   - Select \`servlet-api.jar\`
   - Copy (Ctrl+C / Cmd+C)
4. **Navigate to your IntelliJ project:**
   - Go to: \`MyFirstServlet/web/WEB-INF/\`
   - Create \`lib\` folder if it doesn't exist
   - Paste the JAR file here (Ctrl+V / Cmd+V)
5. **In IntelliJ:**
   - Right-click on the JAR file → **Add as Library...**
   - Click **OK**

#### Verify JAR Files

1. Expand **web → WEB-INF → lib**
2. You should see the JAR files
3. Check **File → Project Structure → Libraries**

### Step 5: Write Servlet Code

Update the generated servlet:

\`\`\`java
package com.example;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/hello")
public class HelloServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, 
                        HttpServletResponse response) 
            throws ServletException, IOException {
        
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        
        out.println("<!DOCTYPE html>");
        out.println("<html><head>");
        out.println("<title>Hello Servlet</title>");
        out.println("</head><body>");
        out.println("<h1>Hello from Servlet!</h1>");
        out.println("<p>Current time: " + new java.util.Date() + "</p>");
        out.println("</body></html>");
    }
}
\`\`\`

### Step 6: Run Configuration

1. Click **Run → Edit Configurations**
2. Click **+** → **Tomcat Server → Local**
3. Configure:
   - **Name**: MyFirstServlet
   - **Application server**: Select your Tomcat
   - **Deployment**: Add artifact → **MyFirstServlet:war exploded**
4. Click **OK**

### Step 7: Run the Project

1. Click **Run** button (green play icon)
2. IntelliJ will start Tomcat
3. Open browser: \`http://localhost:8080/MyFirstServlet_war_exploded/hello\`

---

## Method 3: Manual Setup (Maven)

### Step 1: Create Maven Project

\`\`\`bash
mvn archetype:generate -DgroupId=com.example -DartifactId=MyFirstServlet -DarchetypeArtifactId=maven-archetype-webapp
\`\`\`

### Step 2: Project Structure

\`\`\`
MyFirstServlet/
├── src/
│   └── main/
│       ├── java/
│       │   └── com/example/
│       │       └── HelloServlet.java
│       └── webapp/
│           ├── WEB-INF/
│           │   └── web.xml
│           └── index.jsp
└── pom.xml
\`\`\`

### Step 3: Add Servlet API JAR (pom.xml)

**Maven automatically downloads JAR files!** Just add the dependency in \`pom.xml\`:

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    
    <groupId>com.example</groupId>
    <artifactId>MyFirstServlet</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>war</packaging>
    
    <properties>
        <maven.compiler.source>11</maven.compiler.source>
        <maven.compiler.target>11</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>
    
    <dependencies>
        <!-- Servlet API - Maven downloads this automatically -->
        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>javax.servlet-api</artifactId>
            <version>4.0.1</version>
            <scope>provided</scope>  <!-- provided = Tomcat already has it -->
        </dependency>
        
        <!-- JSP API (if using JSP) -->
        <dependency>
            <groupId>javax.servlet.jsp</groupId>
            <artifactId>javax.servlet.jsp-api</artifactId>
            <version>2.3.3</version>
            <scope>provided</scope>
        </dependency>
    </dependencies>
    
    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-war-plugin</artifactId>
                <version>3.2.3</version>
            </plugin>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.8.1</version>
                <configuration>
                    <source>11</source>
                    <target>11</target>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
\`\`\`

### Step 4: Create Servlet

\`\`\`java
package com.example;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/hello")
public class HelloServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, 
                        HttpServletResponse response) 
            throws IOException {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        out.println("<h1>Hello from Maven Servlet!</h1>");
    }
}
\`\`\`

### Step 4: Build and Deploy

\`\`\`bash
# Maven downloads JAR files automatically on first build
# Build WAR file
mvn clean package

# Copy to Tomcat webapps folder
cp target/MyFirstServlet.war /path/to/tomcat/webapps/

# Start Tomcat
/path/to/tomcat/bin/startup.sh  # Linux/Mac
# or
/path/to/tomcat/bin/startup.bat  # Windows
\`\`\`

**Note:** With Maven, you don't need to manually add JAR files. Maven downloads them from Maven Central Repository when you run \`mvn clean package\`.

---

## Method 4: Manual Setup (Without Maven)

If you're not using Maven or an IDE:

### Step 1: Create Project Structure

\`\`\`
MyFirstServlet/
├── src/
│   └── com/example/
│       └── HelloServlet.java
└── WebContent/
    └── WEB-INF/
        ├── lib/              # JAR files go here
        └── web.xml
\`\`\`

### Step 2: Add JAR Files Manually

**Step-by-step instructions:**

1. **Locate your Tomcat installation folder**
   - If you don't remember where it is:
     - Windows: Check \`C:\\\` or \`D:\\\` drive
     - Linux/Mac: Check \`/opt/\` or \`/usr/local/\`
   - Look for folder named: \`apache-tomcat-9.0.xx\` or similar

2. **Open Tomcat's \`lib\` folder:**
   - Navigate to: \`apache-tomcat-9.0.xx/lib/\`
   - You should see many JAR files including:
     - \`servlet-api.jar\` (this is what you need!)
     - \`jsp-api.jar\` (if using JSP)

3. **Copy the JAR files:**
   - Select \`servlet-api.jar\`
   - Copy it (Ctrl+C / Cmd+C)

4. **Paste into your project:**
   - Navigate to: \`MyFirstServlet/WebContent/WEB-INF/\`
   - Create \`lib\` folder if it doesn't exist
   - Paste the JAR file here (Ctrl+V / Cmd+V)

5. **Verify the structure:**
   \`\`\`
   MyFirstServlet/
   └── WebContent/
       └── WEB-INF/
           └── lib/
               └── servlet-api.jar  (should be here)
   \`\`\`

**Example paths:**
- **From (Tomcat):** \`C:\\apache-tomcat-9.0.xx\\lib\\servlet-api.jar\`
- **To (Project):** \`MyFirstServlet\\WebContent\\WEB-INF\\lib\\servlet-api.jar\`

### Step 3: Compile Servlet

\`\`\`bash
# Compile with classpath including JAR files
javac -cp "WebContent/WEB-INF/lib/servlet-api.jar" -d WebContent/WEB-INF/classes src/com/example/HelloServlet.java
\`\`\`

### Step 4: Create WAR File

\`\`\`bash
# Create WAR file
cd WebContent
jar cvf ../MyFirstServlet.war *
cd ..
\`\`\`

### Step 5: Deploy to Tomcat

\`\`\`bash
# Copy WAR to Tomcat
cp MyFirstServlet.war /path/to/tomcat/webapps/
\`\`\`

---

## Testing Your Servlet

### Test in Browser

1. Start Tomcat server
2. Open browser: \`http://localhost:8080/MyFirstServlet/hello\`
3. You should see: "Hello from Servlet!"

### Test with cURL

\`\`\`bash
curl http://localhost:8080/MyFirstServlet/hello
\`\`\`

---

## Common Issues & Solutions

### Issue 1: 404 Not Found

**Solution:**
- Check URL mapping in \`@WebServlet\` or \`web.xml\`
- Ensure servlet is in correct package
- Verify Tomcat is running

### Issue 2: ClassNotFoundException or "javax.servlet cannot be resolved"

**Solution:**
- **Eclipse:** Add JAR files to \`WebContent/WEB-INF/lib/\` or via Project Properties → Java Build Path
- **IntelliJ:** Add JAR files to \`web/WEB-INF/lib/\` and mark as library
- **Maven:** Ensure dependency is in \`pom.xml\` with \`provided\` scope
- **Manual:** Copy \`servlet-api.jar\` from Tomcat \`lib\` folder to \`WEB-INF/lib/\`

**Verify JAR files are added:**
- Check \`WEB-INF/lib/\` folder contains \`servlet-api.jar\`
- Refresh project in IDE
- Rebuild project

### Issue 3: Port Already in Use

**Solution:**
- Change Tomcat port in \`server.xml\`
- Or stop other application using port 8080

### Issue 4: Servlet Not Found

**Solution:**
- Check \`web.xml\` configuration
- Verify \`@WebServlet\` annotation
- Ensure servlet is compiled

---

## Project Structure Best Practices

\`\`\`
MyFirstServlet/
├── src/
│   └── main/
│       ├── java/
│       │   └── com/
│       │       └── example/
│       │           ├── servlets/      # All servlets
│       │           ├── models/        # Data models
│       │           ├── dao/           # Data access
│       │           └── utils/         # Utilities
│       └── webapp/
│           ├── WEB-INF/
│           │   ├── web.xml
│           │   └── lib/               # JAR files
│           ├── css/                   # Stylesheets
│           ├── js/                    # JavaScript
│           ├── images/                # Images
│           └── index.jsp              # Home page
└── pom.xml (if Maven)
\`\`\`

---

## Summary

**Steps to Create Servlet Project:**
1. Install Tomcat
2. Create Dynamic Web Project
3. Configure Tomcat in IDE
4. Create Servlet class
5. Write servlet code
6. Run on server
7. Test in browser

**Key Files:**
- \`web.xml\` - Deployment descriptor
- \`@WebServlet\` - Annotation-based mapping
- Servlet class extends \`HttpServlet\`

Now you're ready to build web applications with Servlets!

---

## Next Steps

- Learn about **Servlet Lifecycle**
- Understand **Request & Response** objects
- Explore **Session Management**
- Build a complete **CRUD application**
  `,
  code: `// Servlet Project Setup Guide
// This is a reference guide - actual setup is done in IDE

/*
 * STEP-BY-STEP SERVLET PROJECT SETUP
 * ===================================
 */

// 1. PROJECT STRUCTURE
/*
MyFirstServlet/
├── src/
│   └── main/
│       ├── java/
│       │   └── com/example/
│       │       └── HelloServlet.java
│       └── webapp/
│           ├── WEB-INF/
│           │   └── web.xml
│           └── index.html
└── pom.xml (if Maven)
*/

// 2. SERVLET CODE EXAMPLE
package com.example;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/hello")
public class HelloServlet extends HttpServlet {
    
    @Override
    protected void doGet(HttpServletRequest request, 
                        HttpServletResponse response) 
            throws IOException {
        
        // Set content type
        response.setContentType("text/html;charset=UTF-8");
        
        // Get writer
        PrintWriter out = response.getWriter();
        
        // Write HTML response
        out.println("<!DOCTYPE html>");
        out.println("<html>");
        out.println("<head>");
        out.println("<title>Hello Servlet</title>");
        out.println("</head>");
        out.println("<body>");
        out.println("<h1>Hello from Servlet!</h1>");
        out.println("<p>Current time: " + new java.util.Date() + "</p>");
        out.println("</body>");
        out.println("</html>");
    }
}

// 3. WEB.XML CONFIGURATION (Alternative to @WebServlet)
/*
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee
         http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">
    
    <servlet>
        <servlet-name>HelloServlet</servlet-name>
        <servlet-class>com.example.HelloServlet</servlet-class>
    </servlet>
    
    <servlet-mapping>
        <servlet-name>HelloServlet</servlet-name>
        <url-pattern>/hello</url-pattern>
    </servlet-mapping>
</web-app>
*/

// 4. MAVEN POM.XML (If using Maven)
/*
<?xml version="1.0" encoding="UTF-8"?>
<project>
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.example</groupId>
    <artifactId>MyFirstServlet</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>war</packaging>
    
    <dependencies>
        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>javax.servlet-api</artifactId>
            <version>4.0.1</version>
            <scope>provided</scope>
        </dependency>
    </dependencies>
</project>
*/

// 5. RUNNING THE PROJECT
/*
Eclipse:
1. Right-click project → Run As → Run on Server
2. Select Tomcat
3. Access: http://localhost:8080/MyFirstServlet/hello

IntelliJ:
1. Run → Edit Configurations
2. Add Tomcat Server
3. Deploy artifact
4. Run → Access URL

Manual:
1. mvn clean package
2. Copy WAR to Tomcat webapps/
3. Start Tomcat
4. Access URL
*/

// 6. COMMON ISSUES
/*
Issue: 404 Not Found
- Check URL mapping
- Verify servlet package
- Check web.xml configuration

Issue: ClassNotFoundException
- Add Servlet API to classpath
- Check Maven dependencies

Issue: Port 8080 in use
- Change port in server.xml
- Or stop other application
*/`
};

export default servletProjectSetup;

