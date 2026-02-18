const jspProjectSetup = {
  id: 'jsp-project-setup',
  title: 'JSP Project Setup - Create & Run',
  description: 'Complete guide to create a JSP project, configure Tomcat, and run your first JSP page',
  content: `
# JSP Project Setup — Create & Run Your First JSP

This guide will walk you through creating a JSP project, setting up Tomcat, and running JSP pages.

---

## Prerequisites

Before starting, ensure you have:
- **Java JDK 8+** installed
- **Eclipse IDE** or **IntelliJ IDEA**
- **Apache Tomcat 9.x** or **10.x** downloaded and extracted
- **JSP API JAR files** (come with Tomcat)

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
│   ├── servlet-api.jar     # Required for Servlets
│   ├── jsp-api.jar         # Required for JSP
│   ├── jasper.jar          # JSP compiler (required)
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
C:\apache-tomcat-9.0.xx\lib\jasper.jar
\`\`\`

**Linux/Mac:**
\`\`\`
/opt/apache-tomcat-9.0.xx/lib/servlet-api.jar
/opt/apache-tomcat-9.0.xx/lib/jsp-api.jar
/opt/apache-tomcat-9.0.xx/lib/jasper.jar
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

1. Open Eclipse
2. **File → New → Dynamic Web Project**
3. Enter project name: \`MyFirstJSP\`
4. Select **Target runtime**: 
   - If not configured, click "New Runtime"
   - Select **Apache Tomcat v9.0**
   - Browse to your Tomcat installation folder
   - Click **Finish**
5. Click **Next**
6. **Configuration**: Keep default
7. Click **Next**
8. **Web Module**: 
   - Check **Generate web.xml deployment descriptor**
9. Click **Finish**

### Step 2: Project Structure

Your project will have this structure:

\`\`\`
MyFirstJSP/
├── src/
│   └── main/
│       └── java/          # Java classes (if needed)
├── WebContent/
│   ├── WEB-INF/
│   │   ├── lib/          # JAR files go here
│   │   └── web.xml
│   ├── index.jsp         # Your JSP files here
│   └── (other JSP files)
└── build/
\`\`\`

### Step 3: Add JSP API JAR Files

**Important:** You need to add JSP API JAR files to your project.

#### 📍 Where to Find JAR Files in Tomcat

**The JAR files are in your Tomcat installation's \`lib\` folder.**

**Full Path Examples:**

**Windows:**
\`\`\`
C:\apache-tomcat-9.0.xx\lib\servlet-api.jar
C:\apache-tomcat-9.0.xx\lib\jsp-api.jar
C:\apache-tomcat-9.0.xx\lib\jasper.jar
\`\`\`
*(Replace \`C:\apache-tomcat-9.0.xx\` with your actual Tomcat path)*

**Linux:**
\`\`\`
/opt/apache-tomcat-9.0.xx/lib/servlet-api.jar
/opt/apache-tomcat-9.0.xx/lib/jsp-api.jar
/opt/apache-tomcat-9.0.xx/lib/jasper.jar
\`\`\`

**Mac:**
\`\`\`
/usr/local/apache-tomcat-9.0.xx/lib/servlet-api.jar
/usr/local/apache-tomcat-9.0.xx/lib/jsp-api.jar
/usr/local/apache-tomcat-9.0.xx/lib/jasper.jar
\`\`\`

**To find your Tomcat path:**
1. Remember where you extracted Tomcat
2. Open that folder
3. Go into the \`lib\` subfolder
4. You'll see \`servlet-api.jar\`, \`jsp-api.jar\`, and \`jasper.jar\` there!

#### Method A: Automatic (Recommended for Eclipse)

If you configured Tomcat as the target runtime, Eclipse automatically adds the JAR files. **Skip to Step 4** if this works.

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
   - \`jsp-api.jar\` (required for JSP)
   - \`jasper.jar\` (JSP compiler)
6. Click **Open**
7. Click **Apply and Close**

**Option 2: Copy to WEB-INF/lib (Recommended)**

1. **Open File Explorer/Finder**
2. **Navigate to your Tomcat installation:**
   - Go to: \`apache-tomcat-9.0.xx\` folder
   - Open: \`lib\` folder
   - You'll see: \`servlet-api.jar\`, \`jsp-api.jar\`, \`jasper.jar\` and other JAR files
3. **Copy these files:**
   - Select \`servlet-api.jar\`, \`jsp-api.jar\`, and \`jasper.jar\`
   - Copy them (Ctrl+C / Cmd+C)
4. **Navigate to your Eclipse project:**
   - Go to: \`MyFirstJSP/WebContent/WEB-INF/\`
   - Create \`lib\` folder if it doesn't exist
   - Paste the JAR files here (Ctrl+V / Cmd+V)
5. **In Eclipse:**
   - Right-click project → **Refresh** (F5)
   - The JAR files should now appear under \`WebContent/WEB-INF/lib/\`

#### Verify JAR Files are Added

1. Expand **WebContent → WEB-INF → lib**
2. You should see:
   - \`servlet-api.jar\`
   - \`jsp-api.jar\`
3. Or check **Project Properties → Java Build Path → Libraries**

### Step 4: Create Your First JSP

1. Right-click on \`WebContent\` folder
2. **New → JSP File**
3. Enter file name: \`hello.jsp\`
4. Select template: **New JSP File (html)**
5. Click **Finish**

### Step 4: Write JSP Code

Eclipse generates a template. Update it:

\`\`\`jsp
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Hello JSP</title>
</head>
<body>
    <h1>Hello from JSP!</h1>
    
    <%-- JSP Expression --%>
    <p>Current time: <%= new java.util.Date() %></p>
    
    <%-- JSP Scriptlet --%>
    <%
        String name = request.getParameter("name");
        if (name == null || name.isEmpty()) {
            name = "Guest";
        }
    %>
    
    <p>Welcome, <%= name %>!</p>
    
    <%-- Form to get user input --%>
    <form method="get">
        <input type="text" name="name" placeholder="Enter your name" value="<%= name %>">
        <button type="submit">Submit</button>
    </form>
    
    <%-- JSP Declaration (optional) --%>
    <%!
        private int visitCount = 0;
        public int getVisitCount() {
            return ++visitCount;
        }
    %>
    
    <p>Page visits: <%= getVisitCount() %></p>
</body>
</html>
\`\`\`

### Step 5: Create index.jsp (Home Page)

Create \`index.jsp\` in \`WebContent\`:

\`\`\`jsp
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>My First JSP Application</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
        }
        .link {
            display: inline-block;
            margin: 10px;
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <h1>Welcome to My JSP Application</h1>
    
    <h2>Available Pages:</h2>
    <ul>
        <li><a href="hello.jsp">Hello JSP</a></li>
        <li><a href="calculator.jsp">Calculator</a></li>
        <li><a href="products.jsp">Products</a></li>
    </ul>
    
    <p>Server time: <%= new java.util.Date() %></p>
</body>
</html>
\`\`\`

### Step 6: Run the Project

1. Right-click on project → **Run As → Run on Server**
2. Select **Tomcat v9.0 Server**
3. Click **Finish**
4. Eclipse will start Tomcat and deploy your project
5. Open browser: \`http://localhost:8080/MyFirstJSP/\`

---

## Method 2: IntelliJ IDEA Setup

### Step 1: Create New Project

1. **File → New → Project**
2. Select **Java Enterprise**
3. Select:
   - **Application Server**: Tomcat
   - **Java**: Your JDK version
   - **Web Application**: Check this
4. Click **Next**
5. Enter project name: \`MyFirstJSP\`
6. Click **Finish**

### Step 2: Configure Tomcat

1. **File → Settings → Build, Execution, Deployment → Application Servers**
2. Click **+** → **Tomcat Server**
3. Browse to your Tomcat installation folder
4. Click **OK**

### Step 3: Create JSP File

1. Right-click on \`web\` folder
2. **New → JSP → JSP**
3. Enter name: \`hello.jsp\`
4. Click **OK**

### Step 4: Add JSP API JAR Files

**Important:** You need to add JSP API JAR files to your project.

#### 📍 Where to Find JAR Files in Tomcat

**The JAR files are in your Tomcat installation's \`lib\` folder.**

**Full Path Examples:**

**Windows:**
\`\`\`
C:\apache-tomcat-9.0.xx\lib\servlet-api.jar
C:\apache-tomcat-9.0.xx\lib\jsp-api.jar
C:\apache-tomcat-9.0.xx\lib\jasper.jar
\`\`\`
*(Replace \`C:\apache-tomcat-9.0.xx\` with your actual Tomcat path)*

**Linux/Mac:**
\`\`\`
/opt/apache-tomcat-9.0.xx/lib/servlet-api.jar
/opt/apache-tomcat-9.0.xx/lib/jsp-api.jar
/opt/apache-tomcat-9.0.xx/lib/jasper.jar
\`\`\`

**To find your Tomcat path:**
1. Remember where you extracted Tomcat
2. Open that folder → go to \`lib\` subfolder
3. You'll see \`servlet-api.jar\`, \`jsp-api.jar\`, and \`jasper.jar\` there!

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
   - \`jsp-api.jar\` (required for JSP)
   - \`jasper.jar\` (JSP compiler)
6. Click **OK**
7. Select the module to add libraries to
8. Click **OK**

**Method 2: Add to WEB-INF/lib (Recommended)**

1. **Open File Explorer/Finder**
2. **Navigate to your Tomcat installation:**
   - Go to: \`apache-tomcat-9.0.xx\` folder
   - Open: \`lib\` folder
   - You'll see: \`servlet-api.jar\`, \`jsp-api.jar\`, \`jasper.jar\` and other JAR files
3. **Copy these files:**
   - Select \`servlet-api.jar\`, \`jsp-api.jar\`, and \`jasper.jar\`
   - Copy them (Ctrl+C / Cmd+C)
4. **Navigate to your IntelliJ project:**
   - Go to: \`MyFirstJSP/web/WEB-INF/\`
   - Create \`lib\` folder if it doesn't exist
   - Paste the JAR files here (Ctrl+V / Cmd+V)
5. **In IntelliJ:**
   - Right-click on each JAR file → **Add as Library...**
   - Click **OK**

#### Verify JAR Files

1. Expand **web → WEB-INF → lib**
2. You should see the JAR files
3. Check **File → Project Structure → Libraries**

### Step 5: Write JSP Code

Update the generated JSP:

\`\`\`jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Hello JSP</title>
</head>
<body>
    <h1>Hello from JSP!</h1>
    <p>Current time: <%= new java.util.Date() %></p>
    
    <%
        String name = request.getParameter("name");
        if (name != null) {
            out.println("<p>Hello, " + name + "!</p>");
        }
    %>
    
    <form method="get">
        <input type="text" name="name" placeholder="Enter name">
        <button type="submit">Submit</button>
    </form>
</body>
</html>
\`\`\`

### Step 6: Run Configuration

1. Click **Run → Edit Configurations**
2. Click **+** → **Tomcat Server → Local**
3. Configure:
   - **Name**: MyFirstJSP
   - **Application server**: Select your Tomcat
   - **Deployment**: Add artifact → **MyFirstJSP:war exploded**
4. Click **OK**

### Step 6: Run the Project

1. Click **Run** button (green play icon)
2. IntelliJ will start Tomcat
3. Open browser: \`http://localhost:8080/MyFirstJSP_war_exploded/hello.jsp\`

---

## Method 3: Manual Setup (Maven)

### Step 1: Create Maven Project

\`\`\`bash
mvn archetype:generate -DgroupId=com.example -DartifactId=MyFirstJSP -DarchetypeArtifactId=maven-archetype-webapp
\`\`\`

### Step 2: Project Structure

\`\`\`
MyFirstJSP/
├── src/
│   └── main/
│       ├── java/          # Java classes
│       └── webapp/
│           ├── WEB-INF/
│           │   └── web.xml
│           ├── hello.jsp
│           └── index.jsp
└── pom.xml
\`\`\`

### Step 3: Add JSP API JAR (pom.xml)

**Maven automatically downloads JAR files!** Just add the dependencies in \`pom.xml\`:

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    
    <groupId>com.example</groupId>
    <artifactId>MyFirstJSP</artifactId>
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
        
        <!-- JSP API - Maven downloads this automatically -->
        <dependency>
            <groupId>javax.servlet.jsp</groupId>
            <artifactId>javax.servlet.jsp-api</artifactId>
            <version>2.3.3</version>
            <scope>provided</scope>  <!-- provided = Tomcat already has it -->
        </dependency>
        
        <!-- JSTL (Optional but recommended) -->
        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>jstl</artifactId>
            <version>1.2</version>
        </dependency>
    </dependencies>
    
    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-war-plugin</artifactId>
                <version>3.2.3</version>
            </plugin>
        </plugins>
    </build>
</project>
\`\`\`

### Step 4: Create JSP File

Create \`src/main/webapp/hello.jsp\`:

\`\`\`jsp
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Hello JSP</title>
</head>
<body>
    <h1>Hello from JSP!</h1>
    <p>Current time: <%= new java.util.Date() %></p>
</body>
</html>
\`\`\`

### Step 4: Build and Deploy

\`\`\`bash
# Maven downloads JAR files automatically on first build
# Build WAR file
mvn clean package

# Copy to Tomcat webapps folder
cp target/MyFirstJSP.war /path/to/tomcat/webapps/

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
MyFirstJSP/
├── src/
│   └── com/example/      # Java classes (if needed)
└── WebContent/
    ├── WEB-INF/
    │   ├── lib/          # JAR files go here
    │   └── web.xml
    └── hello.jsp
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
     - \`servlet-api.jar\` (required)
     - \`jsp-api.jar\` (required for JSP)
     - \`jasper.jar\` (JSP compiler)

3. **Copy the JAR files:**
   - Select \`servlet-api.jar\`, \`jsp-api.jar\`, and \`jasper.jar\`
   - Copy them (Ctrl+C / Cmd+C)

4. **Paste into your project:**
   - Navigate to: \`MyFirstJSP/WebContent/WEB-INF/\`
   - Create \`lib\` folder if it doesn't exist
   - Paste the JAR files here (Ctrl+V / Cmd+V)

5. **Verify the structure:**
   \`\`\`
   MyFirstJSP/
   └── WebContent/
       └── WEB-INF/
           └── lib/
               ├── servlet-api.jar
               ├── jsp-api.jar      (required for JSP)
               └── jasper.jar       (JSP compiler)
   \`\`\`

**Example paths:**
- **From (Tomcat):** \`C:\\apache-tomcat-9.0.xx\\lib\\jsp-api.jar\`
- **To (Project):** \`MyFirstJSP\\WebContent\\WEB-INF\\lib\\jsp-api.jar\`

### Step 3: Create JSP File

Create \`WebContent/hello.jsp\` with your JSP code.

### Step 4: Create WAR File

\`\`\`bash
# Create WAR file
cd WebContent
jar cvf ../MyFirstJSP.war *
cd ..
\`\`\`

### Step 5: Deploy to Tomcat

\`\`\`bash
# Copy WAR to Tomcat
cp MyFirstJSP.war /path/to/tomcat/webapps/
\`\`\`

---

## Advanced Example: Calculator JSP

Create \`calculator.jsp\`:

\`\`\`jsp
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Calculator</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 400px;
            margin: 50px auto;
            padding: 20px;
        }
        input, button {
            padding: 10px;
            margin: 5px;
            font-size: 16px;
        }
        .result {
            margin-top: 20px;
            padding: 10px;
            background-color: #f0f0f0;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <h1>Simple Calculator</h1>
    
    <form method="post">
        <input type="number" name="num1" placeholder="First number" 
               value="<%= request.getParameter("num1") != null ? request.getParameter("num1") : "" %>" required>
        <br>
        <input type="number" name="num2" placeholder="Second number" 
               value="<%= request.getParameter("num2") != null ? request.getParameter("num2") : "" %>" required>
        <br>
        <button type="submit" name="operation" value="add">Add</button>
        <button type="submit" name="operation" value="subtract">Subtract</button>
        <button type="submit" name="operation" value="multiply">Multiply</button>
        <button type="submit" name="operation" value="divide">Divide</button>
    </form>
    
    <%
        String num1Str = request.getParameter("num1");
        String num2Str = request.getParameter("num2");
        String operation = request.getParameter("operation");
        
        if (num1Str != null && num2Str != null && operation != null) {
            try {
                double num1 = Double.parseDouble(num1Str);
                double num2 = Double.parseDouble(num2Str);
                double result = 0;
                String opSymbol = "";
                
                switch (operation) {
                    case "add":
                        result = num1 + num2;
                        opSymbol = "+";
                        break;
                    case "subtract":
                        result = num1 - num2;
                        opSymbol = "-";
                        break;
                    case "multiply":
                        result = num1 * num2;
                        opSymbol = "×";
                        break;
                    case "divide":
                        if (num2 != 0) {
                            result = num1 / num2;
                            opSymbol = "÷";
                        } else {
                            out.println("<div class='result' style='color: red;'>Error: Division by zero!</div>");
                            return;
                        }
                        break;
                }
                
                out.println("<div class='result'>");
                out.println("<h3>Result:</h3>");
                out.println("<p>" + num1 + " " + opSymbol + " " + num2 + " = " + result + "</p>");
                out.println("</div>");
            } catch (NumberFormatException e) {
                out.println("<div class='result' style='color: red;'>Error: Invalid number format!</div>");
            }
        }
    %>
</body>
</html>
\`\`\`

---

## Testing Your JSP

### Test in Browser

1. Start Tomcat server
2. Open browser: \`http://localhost:8080/MyFirstJSP/hello.jsp\`
3. You should see your JSP page rendered

### Test with Parameters

\`\`\`bash
# With query parameters
http://localhost:8080/MyFirstJSP/hello.jsp?name=John
\`\`\`

---

## Common Issues & Solutions

### Issue 1: JSP Not Compiling or "javax.servlet.jsp cannot be resolved"

**Solution:**
- **Add JAR files:** Copy \`jsp-api.jar\` and \`servlet-api.jar\` from Tomcat \`lib\` folder to \`WEB-INF/lib/\`
- **Eclipse:** Project Properties → Java Build Path → Add External JARs
- **IntelliJ:** File → Project Structure → Libraries → Add JARs
- **Maven:** Ensure dependencies are in \`pom.xml\`
- Check Tomcat logs: \`logs/catalina.out\` for compilation errors
- Verify JSP syntax is correct

### Issue 2: 404 Not Found

**Solution:**
- Verify JSP file is in \`webapp\` or \`WebContent\` folder
- Check file name and extension (.jsp)
- Ensure Tomcat is running

### Issue 3: Chinese/Unicode Characters Not Displaying

**Solution:**
- Add to JSP page directive:
  \`\`\`jsp
  <%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
  \`\`\`
- Set response encoding:
  \`\`\`jsp
  <% response.setCharacterEncoding("UTF-8"); %>
  \`\`\`

### Issue 4: JSP Expression Not Working

**Solution:**
- Check syntax: \`<%= expression %>\` (no space after \`<%\`)
- Ensure expression returns a value
- Check for compilation errors in Tomcat logs

---

## Project Structure Best Practices

\`\`\`
MyFirstJSP/
├── src/
│   └── main/
│       ├── java/
│       │   └── com/example/
│       │       ├── servlets/      # Servlets (if using MVC)
│       │       ├── beans/         # JavaBeans
│       │       └── utils/         # Utilities
│       └── webapp/
│           ├── WEB-INF/
│           │   ├── web.xml
│           │   └── lib/           # JAR files
│           ├── css/               # Stylesheets
│           ├── js/                # JavaScript
│           ├── images/            # Images
│           ├── includes/          # JSP includes
│           │   ├── header.jsp
│           │   └── footer.jsp
│           ├── index.jsp         # Home page
│           └── pages/            # Other JSP pages
│               ├── hello.jsp
│               └── calculator.jsp
└── pom.xml (if Maven)
\`\`\`

---

## Summary

**Steps to Create JSP Project:**
1. Install Tomcat
2. Create Dynamic Web Project
3. Configure Tomcat in IDE
4. Create JSP files
5. Write JSP code
6. Run on server
7. Test in browser

**Key Points:**
- JSP files go in \`webapp\` or \`WebContent\` folder
- Use \`<%@ page %>\` directive for configuration
- Use \`<%= %>\` for expressions
- Use \`<% %>\` for scriptlets

Now you're ready to build dynamic web pages with JSP!

---

## Next Steps

- Learn about **JSP Directives**
- Understand **JSP Implicit Objects**
- Explore **JSP Expression Language (EL)**
- Learn **JSTL (JSP Standard Tag Library)**
- Build a complete **MVC application**
  `,
  code: `// JSP Project Setup Guide
// This is a reference guide - actual setup is done in IDE

/*
 * STEP-BY-STEP JSP PROJECT SETUP
 * ===============================
 */

// 1. PROJECT STRUCTURE
/*
MyFirstJSP/
├── src/
│   └── main/
│       ├── java/              # Java classes (optional)
│       └── webapp/
│           ├── WEB-INF/
│           │   └── web.xml
│           ├── index.jsp
│           └── hello.jsp
└── pom.xml (if Maven)
*/

// 2. BASIC JSP FILE EXAMPLE
/*
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Hello JSP</title>
</head>
<body>
    <h1>Hello from JSP!</h1>
    
    <%-- JSP Expression --%>
    <p>Current time: <%= new java.util.Date() %></p>
    
    <%-- JSP Scriptlet --%>
    <%
        String name = request.getParameter("name");
        if (name == null) {
            name = "Guest";
        }
    %>
    
    <p>Welcome, <%= name %>!</p>
    
    <%-- Form --%>
    <form method="get">
        <input type="text" name="name" placeholder="Enter name">
        <button type="submit">Submit</button>
    </form>
</body>
</html>
*/

// 3. MAVEN POM.XML (If using Maven)
/*
<?xml version="1.0" encoding="UTF-8"?>
<project>
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.example</groupId>
    <artifactId>MyFirstJSP</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>war</packaging>
    
    <dependencies>
        <dependency>
            <groupId>javax.servlet.jsp</groupId>
            <artifactId>javax.servlet.jsp-api</artifactId>
            <version>2.3.3</version>
            <scope>provided</scope>
        </dependency>
        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>jstl</artifactId>
            <version>1.2</version>
        </dependency>
    </dependencies>
</project>
*/

// 4. RUNNING THE PROJECT
/*
Eclipse:
1. Right-click project → Run As → Run on Server
2. Select Tomcat
3. Access: http://localhost:8080/MyFirstJSP/hello.jsp

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

// 5. JSP SYNTAX QUICK REFERENCE
/*
Expression:     <%= expression %>          Output value
Scriptlet:      <% code %>                 Execute Java code
Declaration:    <%! declaration %>         Declare variables/methods
Directive:      <%@ directive %>           Page configuration
Comment:        <%-- comment --%>          JSP comment (not in HTML)
*/

// 6. COMMON ISSUES
/*
Issue: JSP not compiling
- Check syntax
- Verify JSP API in classpath
- Check Tomcat logs

Issue: 404 Not Found
- Verify file location
- Check file name
- Ensure Tomcat running

Issue: Encoding problems
- Add pageEncoding="UTF-8"
- Set response encoding
*/`
};

export default jspProjectSetup;

