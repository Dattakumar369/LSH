const tomcatServer = {
  id: 'tomcat-server',
  title: 'Apache Tomcat Server - Installation & Configuration',
  description: 'Complete guide to Apache Tomcat: download, install, configure, deploy applications, and manage the server',
  content: `
# Apache Tomcat Server — Complete Guide

Apache Tomcat is an open-source web server and servlet container that implements Java Servlet, JavaServer Pages (JSP), and WebSocket technologies. It's the most popular choice for running Java web applications.

---

## What is Apache Tomcat?

**Apache Tomcat** is:
- A **web server** that serves web applications
- A **servlet container** that runs Java Servlets
- A **JSP container** that processes JSP pages
- **Free and open-source**
- **Lightweight** and easy to use
- **Production-ready** for enterprise applications

---

## Tomcat vs Other Servers

| Feature | Tomcat | Full Java EE Server |
|---------|--------|---------------------|
| Size | Lightweight (~10MB) | Heavy (~100MB+) |
| Purpose | Servlet/JSP container | Full Java EE stack |
| Learning Curve | Easy | Complex |
| Use Case | Web applications | Enterprise applications |
| Examples | Tomcat, Jetty | WildFly, GlassFish, WebLogic |

**Tomcat is perfect for:**
- Learning Java web development
- Small to medium web applications
- Servlet and JSP applications
- Spring Boot applications (embedded)

---

## Download and Installation

### Step 1: Check Java Installation

Tomcat requires **Java JDK 8 or higher**.

\`\`\`bash
# Check Java version
java -version

# Should show:
# java version "1.8.0_xxx" or higher
\`\`\`

**If Java is not installed:**
- Download from: https://www.oracle.com/java/technologies/downloads/
- Or use OpenJDK: https://adoptium.net/

### Step 2: Download Tomcat

1. **Visit:** https://tomcat.apache.org/
2. **Click:** "Download" in the left menu
3. **Select version:**
   - **Tomcat 9.x** - Recommended (Java 8+)
   - **Tomcat 10.x** - Latest (Java 11+)
4. **Download:**
   - **Windows:** \`apache-tomcat-9.0.xx-windows-x64.zip\`
   - **Linux:** \`apache-tomcat-9.0.xx.tar.gz\`
   - **Mac:** \`apache-tomcat-9.0.xx.tar.gz\`

### Step 3: Install Tomcat

#### Windows Installation

1. **Extract the ZIP file:**
   - Right-click → Extract All
   - Extract to: \`C:\\apache-tomcat-9.0.xx\` (or \`D:\\\`)

2. **Set JAVA_HOME (if not set):**
   - Right-click "This PC" → Properties
   - Advanced System Settings → Environment Variables
   - Add new System Variable:
     - **Variable name:** \`JAVA_HOME\`
     - **Variable value:** \`C:\\Program Files\\Java\\jdk1.8.0_xxx\` (your JDK path)
   - Click OK

3. **Verify installation:**
   - Open Command Prompt
   - Navigate to: \`C:\\apache-tomcat-9.0.xx\\bin\`
   - Run: \`version.bat\`
   - Should show Tomcat version

#### Linux/Mac Installation

\`\`\`bash
# Extract Tomcat
tar -xzf apache-tomcat-9.0.xx.tar.gz

# Move to /opt (optional, requires sudo)
sudo mv apache-tomcat-9.0.xx /opt/

# Set permissions
sudo chmod +x /opt/apache-tomcat-9.0.xx/bin/*.sh

# Set JAVA_HOME (if not set)
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk
# Add to ~/.bashrc or ~/.zshrc for permanent:
echo 'export JAVA_HOME=/usr/lib/jvm/java-8-openjdk' >> ~/.bashrc
\`\`\`

---

## Tomcat Directory Structure

After installation, your Tomcat folder looks like this:

\`\`\`
apache-tomcat-9.0.xx/
├── bin/                    # Executable files
│   ├── startup.sh          # Start Tomcat (Linux/Mac)
│   ├── startup.bat         # Start Tomcat (Windows)
│   ├── shutdown.sh         # Stop Tomcat (Linux/Mac)
│   ├── shutdown.bat        # Stop Tomcat (Windows)
│   ├── catalina.sh/bat     # Main script
│   └── version.sh/bat      # Check version
│
├── conf/                   # Configuration files
│   ├── server.xml          # Main server configuration
│   ├── web.xml             # Default web app configuration
│   ├── context.xml         # Context configuration
│   ├── tomcat-users.xml    # User management
│   └── logging.properties  # Logging configuration
│
├── lib/                    # ⭐ JAR FILES ARE HERE ⭐
│   ├── servlet-api.jar     # Servlet API
│   ├── jsp-api.jar         # JSP API
│   ├── jasper.jar          # JSP compiler
│   └── (other JAR files)
│
├── logs/                   # Log files
│   ├── catalina.out        # Main log file
│   ├── localhost.log       # Application logs
│   └── manager.log          # Manager app logs
│
├── webapps/                # ⭐ DEPLOY YOUR APPS HERE ⭐
│   ├── ROOT/               # Root application (http://localhost:8080/)
│   ├── docs/               # Tomcat documentation
│   ├── examples/           # Example applications
│   ├── host-manager/       # Host manager
│   ├── manager/            # Manager application
│   └── YourApp.war         # Your deployed WAR file
│
├── work/                   # Temporary files (JSP compiled classes)
├── temp/                   # Temporary files
└── LICENSE, NOTICE, etc.   # License files
\`\`\`

### Important Folders Explained

- **\`bin/\`** - Scripts to start/stop Tomcat
- **\`conf/\`** - Configuration files
- **\`lib/\`** - JAR files (servlet-api.jar, jsp-api.jar)
- **\`webapps/\`** - Deploy your WAR files here
- **\`logs/\`** - Check here for errors
- **\`work/\`** - JSP compiled classes (can be deleted)

---

## Starting and Stopping Tomcat

### Windows

\`\`\`bash
# Start Tomcat
cd C:\\apache-tomcat-9.0.xx\\bin
startup.bat

# Stop Tomcat
shutdown.bat

# Or double-click the .bat files
\`\`\`

### Linux/Mac

\`\`\`bash
# Start Tomcat
cd /opt/apache-tomcat-9.0.xx/bin
./startup.sh

# Stop Tomcat
./shutdown.sh

# Or make executable and run directly:
chmod +x startup.sh shutdown.sh
./startup.sh
\`\`\`

### Verify Tomcat is Running

1. **Open browser:** http://localhost:8080
2. **You should see:** Tomcat welcome page
3. **Check logs:** \`logs/catalina.out\` for any errors

---

## Configuration

### 1. Change Port (server.xml)

Tomcat runs on port **8080** by default. To change it:

**File:** \`conf/server.xml\`

\`\`\`xml
<!-- Find this line (around line 69) -->
<Connector port="8080" protocol="HTTP/1.1"
           connectionTimeout="20000"
           redirectPort="8443" />

<!-- Change port to 9090 -->
<Connector port="9090" protocol="HTTP/1.1"
           connectionTimeout="20000"
           redirectPort="8443" />
\`\`\`

**Restart Tomcat** for changes to take effect.

### 2. Enable Manager App (tomcat-users.xml)

To access Tomcat Manager:

**File:** \`conf/tomcat-users.xml\`

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<tomcat-users>
    <!-- Add these roles and user -->
    <role rolename="manager-gui"/>
    <role rolename="admin-gui"/>
    <user username="admin" password="admin123" 
          roles="manager-gui,admin-gui"/>
</tomcat-users>
\`\`\`

**Access Manager:** http://localhost:8080/manager/html
- Username: \`admin\`
- Password: \`admin123\`

### 3. Set Memory (Optional)

For large applications, increase memory:

**Windows:** Create \`setenv.bat\` in \`bin/\` folder:

\`\`\`bat
set JAVA_OPTS=-Xms512m -Xmx1024m
\`\`\`

**Linux/Mac:** Create \`setenv.sh\` in \`bin/\` folder:

\`\`\`bash
#!/bin/sh
export JAVA_OPTS="-Xms512m -Xmx1024m"
\`\`\`

---

## Deploying Applications

### Method 1: Copy WAR File (Easiest)

1. **Build your WAR file:**
   - Eclipse: Right-click project → Export → WAR file
   - Maven: \`mvn clean package\` (creates WAR in \`target/\`)

2. **Copy to webapps:**
   \`\`\`bash
   # Copy WAR file
   cp MyApp.war /opt/apache-tomcat-9.0.xx/webapps/
   
   # Or on Windows:
   copy MyApp.war C:\\apache-tomcat-9.0.xx\\webapps\\
   \`\`\`

3. **Tomcat automatically:**
   - Extracts the WAR file
   - Deploys the application
   - Makes it available at: http://localhost:8080/MyApp/

### Method 2: Exploded Directory

1. **Extract WAR file:**
   \`\`\`bash
   unzip MyApp.war -d webapps/MyApp/
   \`\`\`

2. **Or copy project files directly:**
   - Copy \`WebContent\` or \`webapp\` folder contents
   - Paste into \`webapps/MyApp/\`

### Method 3: Manager Application

1. **Access Manager:** http://localhost:8080/manager/html
2. **Login** with credentials from \`tomcat-users.xml\`
3. **Scroll to "WAR file to deploy"**
4. **Select WAR file** and click "Deploy"

### Method 4: IDE Integration

**Eclipse:**
- Right-click project → Run As → Run on Server
- Select Tomcat → Finish

**IntelliJ:**
- Run → Edit Configurations
- Add Tomcat Server
- Deploy artifact

---

## Accessing Your Application

After deployment:

\`\`\`bash
# If WAR file is MyApp.war
http://localhost:8080/MyApp/

# If deployed as ROOT
http://localhost:8080/

# With context path
http://localhost:8080/MyApp/servlet-name
\`\`\`

---

## Common Issues and Solutions

### Issue 1: Port 8080 Already in Use

**Error:** \`Address already in use: JVM_Bind\`

**Solution:**
\`\`\`bash
# Find process using port 8080
# Windows:
netstat -ano | findstr :8080
taskkill /PID <process_id> /F

# Linux/Mac:
lsof -i :8080
kill -9 <process_id>

# Or change port in server.xml
\`\`\`

### Issue 2: JAVA_HOME Not Set

**Error:** \`JAVA_HOME environment variable is not defined\`

**Solution:**
\`\`\`bash
# Windows: Set in Environment Variables
JAVA_HOME=C:\\Program Files\\Java\\jdk1.8.0_xxx

# Linux/Mac:
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk
\`\`\`

### Issue 3: Permission Denied (Linux/Mac)

**Error:** \`Permission denied\`

**Solution:**
\`\`\`bash
# Make scripts executable
chmod +x bin/*.sh

# Or run with sudo (not recommended)
sudo ./startup.sh
\`\`\`

### Issue 4: Application Not Deploying

**Check:**
1. **Logs:** \`logs/catalina.out\`
2. **WAR file:** Ensure it's valid
3. **Permissions:** Ensure Tomcat can read/write
4. **Port:** Ensure Tomcat is running

---

## Tomcat Manager

Tomcat Manager is a web application for managing deployed applications.

### Enable Manager

**File:** \`conf/tomcat-users.xml\`

\`\`\`xml
<role rolename="manager-gui"/>
<user username="admin" password="admin123" roles="manager-gui"/>
\`\`\`

### Access Manager

- **URL:** http://localhost:8080/manager/html
- **Features:**
  - List deployed applications
  - Deploy/undeploy applications
  - Start/stop applications
  - View server status

---

## Best Practices

### 1. Security

- **Change default passwords**
- **Remove unused applications** from webapps
- **Disable Manager** in production (or secure it)
- **Use HTTPS** for production

### 2. Performance

- **Set appropriate memory** (JAVA_OPTS)
- **Configure connection pool** in server.xml
- **Enable compression** for static resources
- **Monitor logs** regularly

### 3. Maintenance

- **Regular backups** of webapps and conf
- **Clean work/** folder periodically
- **Monitor disk space** (logs can grow large)
- **Update Tomcat** regularly

### 4. Production Deployment

- **Run as service** (not from command line)
- **Use reverse proxy** (Nginx, Apache)
- **Configure logging** properly
- **Set up monitoring**

---

## Running Tomcat as a Service

### Windows Service

1. **Download:** Tomcat Windows Service Installer
2. **Or use:** \`service.bat\` in bin folder
3. **Install service:**
   \`\`\`bash
   service.bat install
   \`\`\`

### Linux Service

Create \`/etc/systemd/system/tomcat.service\`:

\`\`\`ini
[Unit]
Description=Apache Tomcat Server
After=network.target

[Service]
Type=forking
Environment="JAVA_HOME=/usr/lib/jvm/java-8-openjdk"
ExecStart=/opt/apache-tomcat-9.0.xx/bin/startup.sh
ExecStop=/opt/apache-tomcat-9.0.xx/bin/shutdown.sh
User=tomcat
Group=tomcat

[Install]
WantedBy=multi-user.target
\`\`\`

**Enable and start:**
\`\`\`bash
sudo systemctl enable tomcat
sudo systemctl start tomcat
\`\`\`

---

## Summary

**Key Points:**
- Tomcat is a servlet/JSP container
- Download from apache.org
- JAR files are in \`lib/\` folder
- Deploy WAR files to \`webapps/\`
- Default port: 8080
- Access: http://localhost:8080

**Important Folders:**
- \`bin/\` - Start/stop scripts
- \`conf/\` - Configuration
- \`lib/\` - JAR files (servlet-api.jar, jsp-api.jar)
- \`webapps/\` - Deploy applications here
- \`logs/\` - Check for errors

Master Tomcat, and you can deploy any Java web application!

---

## Next Steps

- Deploy your first Servlet application
- Configure Tomcat for production
- Learn about Tomcat clustering
- Explore Tomcat performance tuning
  `,
  code: `// Apache Tomcat Server Guide
// This is a reference guide for Tomcat installation and configuration

/*
 * TOMCAT INSTALLATION CHECKLIST
 * ==============================
 */

// 1. PREREQUISITES
/*
Java JDK 8+ installed
JAVA_HOME environment variable set
Download Tomcat from apache.org
Extract to a folder
*/

// 2. TOMCAT DIRECTORY STRUCTURE
/*
apache-tomcat-9.0.xx/
├── bin/          # startup.sh, shutdown.sh
├── conf/         # server.xml, web.xml, tomcat-users.xml
├── lib/          # servlet-api.jar, jsp-api.jar ⭐
├── logs/         # catalina.out (check for errors)
├── webapps/      # Deploy WAR files here ⭐
├── work/         # JSP compiled classes
└── temp/         # Temporary files
*/

// 3. STARTING TOMCAT
/*
Windows:
  cd C:\apache-tomcat-9.0.xx\bin
  startup.bat

Linux/Mac:
  cd /opt/apache-tomcat-9.0.xx/bin
  ./startup.sh

Verify: http://localhost:8080
*/

// 4. STOPPING TOMCAT
/*
Windows:
  shutdown.bat

Linux/Mac:
  ./shutdown.sh
*/

// 5. DEPLOYING APPLICATION
/*
Method 1: Copy WAR file
  cp MyApp.war webapps/

Method 2: Exploded directory
  unzip MyApp.war -d webapps/MyApp/

Method 3: Manager App
  http://localhost:8080/manager/html
*/

// 6. CONFIGURATION FILES
/*
server.xml      - Main server config (port, connectors)
web.xml         - Default web app config
tomcat-users.xml - User management (for Manager)
context.xml     - Context configuration
*/

// 7. COMMON CONFIGURATIONS
/*
Change Port (server.xml):
  <Connector port="9090" ... />

Enable Manager (tomcat-users.xml):
  <role rolename="manager-gui"/>
  <user username="admin" password="admin123" roles="manager-gui"/>

Set Memory (setenv.sh/bat):
  JAVA_OPTS="-Xms512m -Xmx1024m"
*/

// 8. TROUBLESHOOTING
/*
Port 8080 in use:
  - Change port in server.xml
  - Or kill process using port

JAVA_HOME not set:
  - Set JAVA_HOME environment variable
  - Point to JDK installation folder

Permission denied (Linux):
  - chmod +x bin/*.sh
  - Or run with appropriate user

Check logs:
  - logs/catalina.out
  - logs/localhost.log
*/

// 9. ACCESSING APPLICATIONS
/*
After deploying MyApp.war:
  http://localhost:8080/MyApp/

Manager App:
  http://localhost:8080/manager/html

Host Manager:
  http://localhost:8080/host-manager/html
*/

// 10. JAR FILES LOCATION
/*
Required JAR files are in:
  apache-tomcat-9.0.xx/lib/

Files needed:
  - servlet-api.jar (for Servlets)
  - jsp-api.jar (for JSP)
  - jasper.jar (JSP compiler)

Copy to project:
  WebContent/WEB-INF/lib/ (Eclipse)
  web/WEB-INF/lib/ (IntelliJ)
*/`
};

export default tomcatServer;


