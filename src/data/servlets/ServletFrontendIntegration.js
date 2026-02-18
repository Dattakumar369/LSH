const servletFrontendIntegration = {
  id: 'servlet-frontend-integration',
  title: 'HTML/CSS Frontend with Servlets - Complete Project',
  description: 'Learn how to connect HTML forms and CSS styling with Servlet classes - Complete working project example',
  content: `
# HTML/CSS Frontend with Servlets — Complete Integration Guide

Understanding how HTML forms and CSS styling connect with Servlet classes is crucial for building real web applications. This guide shows you the complete flow from frontend to backend.

---

## The Complete Flow: Frontend to Backend

Here's how data flows in a Servlet-based web application:

\`\`\`
User fills HTML form
        ↓
Submits form (HTTP POST/GET)
        ↓
Request reaches Servlet
        ↓
Servlet processes data
        ↓
Servlet generates response (HTML)
        ↓
Response sent back to browser
        ↓
User sees result
\`\`\`

---

## Project Structure

Let's create a complete **User Registration System** with HTML, CSS, and Servlets:

\`\`\`
UserRegistrationApp/
├── src/
│   └── com/example/
│       └── RegisterServlet.java
├── WebContent/
│   ├── WEB-INF/
│   │   └── web.xml
│   ├── css/
│   │   └── style.css
│   ├── register.html
│   └── success.html
└── lib/
    └── servlet-api.jar
\`\`\`

---

## Step 1: Create HTML Form with CSS Styling

**File:** \`WebContent/register.html\`

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Registration</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container">
        <div class="form-wrapper">
            <h1>User Registration</h1>
            <form action="register" method="POST" class="registration-form">
                <div class="form-group">
                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username" required 
                           placeholder="Enter your username">
                </div>
                
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required 
                           placeholder="Enter your email">
                </div>
                
                <div class="form-group">
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" required 
                           placeholder="Enter your password">
                </div>
                
                <div class="form-group">
                    <label for="age">Age:</label>
                    <input type="number" id="age" name="age" required 
                           placeholder="Enter your age" min="18" max="100">
                </div>
                
                <div class="form-group">
                    <label for="city">City:</label>
                    <select id="city" name="city" required>
                        <option value="">Select City</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Hyderabad">Hyderabad</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label>Gender:</label>
                    <div class="radio-group">
                        <input type="radio" id="male" name="gender" value="Male" required>
                        <label for="male">Male</label>
                        
                        <input type="radio" id="female" name="gender" value="Female">
                        <label for="female">Female</label>
                        
                        <input type="radio" id="other" name="gender" value="Other">
                        <label for="other">Other</label>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>
                        <input type="checkbox" name="terms" required>
                        I agree to the Terms and Conditions
                    </label>
                </div>
                
                <button type="submit" class="submit-btn">Register</button>
            </form>
        </div>
    </div>
</body>
</html>
\`\`\`

**Key Points:**
- \`action="register"\` - This is the URL pattern that maps to your Servlet
- \`method="POST"\` - Sends form data in the request body
- \`name\` attributes - These are used by Servlet to retrieve form values
- CSS file linked: \`href="css/style.css"\`

---

## Step 2: Create CSS Styling

**File:** \`WebContent/css/style.css\`

\`\`\`css
/* Reset and Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

.container {
    width: 100%;
    max-width: 500px;
}

.form-wrapper {
    background: white;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

h1 {
    color: #333;
    text-align: center;
    margin-bottom: 30px;
    font-size: 28px;
}

.registration-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

label {
    color: #555;
    font-weight: 600;
    font-size: 14px;
}

input[type="text"],
input[type="email"],
input[type="password"],
input[type="number"],
select {
    padding: 12px;
    border: 2px solid #e0e0e0;
    border-radius: 5px;
    font-size: 16px;
    transition: border-color 0.3s;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="password"]:focus,
input[type="number"]:focus,
select:focus {
    outline: none;
    border-color: #667eea;
}

.radio-group {
    display: flex;
    gap: 20px;
    flex-direction: row;
}

.radio-group input[type="radio"] {
    margin-right: 5px;
}

.radio-group label {
    font-weight: normal;
    cursor: pointer;
}

input[type="checkbox"] {
    margin-right: 8px;
    cursor: pointer;
}

.submit-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 14px;
    border: none;
    border-radius: 5px;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    margin-top: 10px;
}

.submit-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.submit-btn:active {
    transform: translateY(0);
}
\`\`\`

**Key Points:**
- Modern, responsive design
- Form validation styling
- Hover effects for better UX
- Professional color scheme

---

## Step 3: Create Servlet to Handle Form Submission

**File:** \`src/com/example/RegisterServlet.java\`

\`\`\`java
package com.example;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/register")
public class RegisterServlet extends HttpServlet {
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        // Set response content type
        response.setContentType("text/html;charset=UTF-8");
        
        // Get form parameters from HTML form
        String username = request.getParameter("username");
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        String ageStr = request.getParameter("age");
        String city = request.getParameter("city");
        String gender = request.getParameter("gender");
        String terms = request.getParameter("terms");
        
        // Convert age to integer
        int age = 0;
        try {
            age = Integer.parseInt(ageStr);
        } catch (NumberFormatException e) {
            age = 0;
        }
        
        // Validate form data
        if (username == null || username.trim().isEmpty()) {
            sendErrorResponse(response, "Username is required!");
            return;
        }
        
        if (email == null || !email.contains("@")) {
            sendErrorResponse(response, "Valid email is required!");
            return;
        }
        
        if (terms == null) {
            sendErrorResponse(response, "You must agree to terms and conditions!");
            return;
        }
        
        // Process the registration (in real app, save to database)
        // For now, we'll just display the data
        
        // Generate HTML response
        PrintWriter out = response.getWriter();
        out.println("<!DOCTYPE html>");
        out.println("<html>");
        out.println("<head>");
        out.println("<title>Registration Success</title>");
        out.println("<link rel='stylesheet' href='css/style.css'>");
        out.println("<style>");
        out.println(".success-container {");
        out.println("    background: white;");
        out.println("    padding: 40px;");
        out.println("    border-radius: 10px;");
        out.println("    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);");
        out.println("    max-width: 600px;");
        out.println("    margin: 50px auto;");
        out.println("}");
        out.println(".success-message {");
        out.println("    color: #4CAF50;");
        out.println("    font-size: 24px;");
        out.println("    margin-bottom: 20px;");
        out.println("}");
        out.println(".user-info {");
        out.println("    background: #f5f5f5;");
        out.println("    padding: 20px;");
        out.println("    border-radius: 5px;");
        out.println("    margin: 20px 0;");
        out.println("}");
        out.println(".info-row {");
        out.println("    padding: 10px 0;");
        out.println("    border-bottom: 1px solid #ddd;");
        out.println("}");
        out.println(".info-label {");
        out.println("    font-weight: bold;");
        out.println("    color: #333;");
        out.println("}");
        out.println("</style>");
        out.println("</head>");
        out.println("<body>");
        out.println("<div class='container'>");
        out.println("<div class='success-container'>");
        out.println("<h1 class='success-message'>Registration Successful!</h1>");
        out.println("<div class='user-info'>");
        out.println("<h2>User Details:</h2>");
        out.println("<div class='info-row'>");
        out.println("<span class='info-label'>Username:</span> " + escapeHtml(username));
        out.println("</div>");
        out.println("<div class='info-row'>");
        out.println("<span class='info-label'>Email:</span> " + escapeHtml(email));
        out.println("</div>");
        out.println("<div class='info-row'>");
        out.println("<span class='info-label'>Age:</span> " + age);
        out.println("</div>");
        out.println("<div class='info-row'>");
        out.println("<span class='info-label'>City:</span> " + escapeHtml(city));
        out.println("</div>");
        out.println("<div class='info-row'>");
        out.println("<span class='info-label'>Gender:</span> " + escapeHtml(gender));
        out.println("</div>");
        out.println("</div>");
        out.println("<a href='register.html' style='display: inline-block; margin-top: 20px; padding: 10px 20px; background: #667eea; color: white; text-decoration: none; border-radius: 5px;'>Register Another User</a>");
        out.println("</div>");
        out.println("</div>");
        out.println("</body>");
        out.println("</html>");
        
        out.close();
    }
    
    // Helper method to prevent XSS attacks
    private String escapeHtml(String input) {
        if (input == null) return "";
        return input.replace("&", "&amp;")
                   .replace("<", "&lt;")
                   .replace(">", "&gt;")
                   .replace("\"", "&quot;")
                   .replace("'", "&#39;");
    }
    
    // Helper method to send error response
    private void sendErrorResponse(HttpServletResponse response, String message) 
            throws IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        out.println("<!DOCTYPE html>");
        out.println("<html>");
        out.println("<head><title>Error</title></head>");
        out.println("<body>");
        out.println("<h2 style='color: red;'>Error: " + message + "</h2>");
        out.println("<a href='register.html'>Go Back</a>");
        out.println("</body>");
        out.println("</html>");
        out.close();
    }
}
\`\`\`

**Key Points:**
- \`@WebServlet("/register")\` - Maps URL pattern to this Servlet
- \`request.getParameter("username")\` - Gets form field value by name
- \`response.setContentType("text/html")\` - Sets response type
- \`PrintWriter\` - Used to write HTML response
- \`escapeHtml()\` - Prevents XSS attacks

---

## Step 4: Configure web.xml (Alternative to Annotations)

**File:** \`WebContent/WEB-INF/web.xml\`

If you're not using \`@WebServlet\` annotation, configure in web.xml:

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee
         http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">
    
    <servlet>
        <servlet-name>RegisterServlet</servlet-name>
        <servlet-class>com.example.RegisterServlet</servlet-class>
    </servlet>
    
    <servlet-mapping>
        <servlet-name>RegisterServlet</servlet-name>
        <url-pattern>/register</url-pattern>
    </servlet-mapping>
    
    <welcome-file-list>
        <welcome-file>register.html</welcome-file>
    </welcome-file-list>
</web-app>
\`\`\`

---

## How HTML Form Connects to Servlet

### 1. **Form Action Attribute**

\`\`\`html
<form action="register" method="POST">
\`\`\`

- \`action="register"\` - This URL is sent to the server
- Server looks for Servlet mapped to \`/register\`
- Servlet's \`doPost()\` method is called

### 2. **Form Field Names**

\`\`\`html
<input name="username" ...>
<input name="email" ...>
\`\`\`

- \`name\` attribute becomes the parameter name
- Servlet uses: \`request.getParameter("username")\`

### 3. **HTTP Methods**

- **GET**: Data in URL (visible in address bar)
  - \`form.html?username=john&email=john@example.com\`
- **POST**: Data in request body (hidden, more secure)
  - Better for forms with passwords

---

## Complete Request-Response Flow

### Step-by-Step Flow:

1. **User fills form** in \`register.html\`
2. **User clicks Submit** button
3. **Browser sends HTTP POST** request to \`/register\`
4. **Tomcat receives request** and finds Servlet mapped to \`/register\`
5. **Servlet's doPost()** method is called
6. **Servlet reads form data** using \`request.getParameter()\`
7. **Servlet processes data** (validation, business logic)
8. **Servlet generates HTML** response using \`PrintWriter\`
9. **Response sent back** to browser
10. **Browser displays** the HTML response

---

## Real-Time Scenarios: HTML/CSS + Servlets in Daily Life

### Scenario 1: E-commerce Login Page

**Daily Life:** When you log in to Amazon, Flipkart, or any shopping site:

1. **HTML Form:**
   \`\`\`html
   <form action="login" method="POST">
       <input name="email" type="email">
       <input name="password" type="password">
       <button>Login</button>
   </form>
   \`\`\`

2. **Servlet:**
   \`\`\`java
   @WebServlet("/login")
   public class LoginServlet extends HttpServlet {
       protected void doPost(HttpServletRequest request, 
                            HttpServletResponse response) {
           String email = request.getParameter("email");
           String password = request.getParameter("password");
           
           // Validate credentials against database
           if (isValidUser(email, password)) {
               // Redirect to dashboard
               response.sendRedirect("dashboard.html");
           } else {
               // Show error message
               response.getWriter().println("Invalid credentials!");
           }
       }
   }
   \`\`\`

### Scenario 2: Online Banking - Money Transfer Form

**Daily Life:** Transferring money from your bank account:

1. **HTML Form:**
   \`\`\`html
   <form action="transfer" method="POST">
       <input name="accountNumber" placeholder="Recipient Account">
       <input name="amount" type="number" placeholder="Amount">
       <input name="remarks" placeholder="Remarks">
       <button>Transfer</button>
   </form>
   \`\`\`

2. **Servlet:**
   \`\`\`java
   @WebServlet("/transfer")
   public class TransferServlet extends HttpServlet {
       protected void doPost(HttpServletRequest request, 
                            HttpServletResponse response) {
           String accountNumber = request.getParameter("accountNumber");
           double amount = Double.parseDouble(request.getParameter("amount"));
           
           // Process transfer (update database)
           boolean success = processTransfer(accountNumber, amount);
           
           if (success) {
               response.getWriter().println("Transfer successful!");
           } else {
               response.getWriter().println("Transfer failed!");
           }
       }
   }
   \`\`\`

### Scenario 3: Social Media - Post Creation

**Daily Life:** Creating a post on Facebook, Instagram:

1. **HTML Form:**
   \`\`\`html
   <form action="createPost" method="POST" enctype="multipart/form-data">
       <textarea name="content" placeholder="What's on your mind?"></textarea>
       <input name="image" type="file">
       <button>Post</button>
   </form>
   \`\`\`

2. **Servlet:**
   \`\`\`java
   @WebServlet("/createPost")
   @MultipartConfig
   public class PostServlet extends HttpServlet {
       protected void doPost(HttpServletRequest request, 
                            HttpServletResponse response) {
           String content = request.getParameter("content");
           Part imagePart = request.getPart("image");
           
           // Save post to database
           // Upload image to server
           // Return success response
       }
   }
   \`\`\`

---

## Advanced: Using JSP for Better Response

Instead of writing HTML in Servlet (not recommended for large pages), use JSP:

**Servlet:**
\`\`\`java
@WebServlet("/register")
public class RegisterServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, 
                         HttpServletResponse response) {
        String username = request.getParameter("username");
        String email = request.getParameter("email");
        
        // Store data in request scope
        request.setAttribute("username", username);
        request.setAttribute("email", email);
        
        // Forward to JSP
        RequestDispatcher dispatcher = 
            request.getRequestDispatcher("success.jsp");
        dispatcher.forward(request, response);
    }
}
\`\`\`

**JSP (success.jsp):**
\`\`\`jsp
<!DOCTYPE html>
<html>
<head><title>Success</title></head>
<body>
    <h1>Welcome, <%= request.getAttribute("username") %>!</h1>
    <p>Email: <%= request.getAttribute("email") %></p>
</body>
</html>
\`\`\`

---

## Best Practices

### 1. **Always Validate Input**
\`\`\`java
if (username == null || username.trim().isEmpty()) {
    // Show error
    return;
}
\`\`\`

### 2. **Prevent XSS Attacks**
\`\`\`java
String safeOutput = escapeHtml(userInput);
\`\`\`

### 3. **Use POST for Sensitive Data**
- Passwords, credit cards → Always use POST
- Search queries → Can use GET

### 4. **Separate CSS/JS Files**
- Don't inline all CSS in Servlet
- Link external CSS files: \`<link rel="stylesheet" href="css/style.css">\`

### 5. **Use RequestDispatcher for Forwarding**
- Better than writing HTML in Servlet
- Separates presentation from logic

---

## Common Issues and Solutions

### Issue 1: Form data not reaching Servlet

**Problem:** \`request.getParameter()\` returns \`null\`

**Solutions:**
- Check \`name\` attribute matches parameter name
- Verify form \`action\` matches Servlet URL pattern
- Ensure \`method="POST"\` and Servlet has \`doPost()\`

### Issue 2: CSS not loading

**Problem:** Styles not applied

**Solutions:**
- Check CSS file path: \`href="css/style.css"\`
- Verify file is in \`WebContent/css/\` folder
- Check browser console for 404 errors

### Issue 3: Servlet not found (404)

**Problem:** Server can't find Servlet

**Solutions:**
- Verify \`@WebServlet("/register")\` annotation
- Check \`web.xml\` mapping if using XML config
- Ensure Servlet is in correct package

---

## Summary

**HTML/CSS Frontend + Servlet Backend Flow:**

1. **HTML Form** - User interface with \`action\` and \`method\`
2. **CSS Styling** - External stylesheet for professional look
3. **Servlet** - Receives form data via \`request.getParameter()\`
4. **Processing** - Business logic, validation, database operations
5. **Response** - HTML output sent back to browser

**Key Concepts:**
- \`action\` attribute maps to Servlet URL
- \`name\` attributes become parameter names
- \`request.getParameter()\` retrieves form values
- \`PrintWriter\` generates HTML response
- CSS files are static resources in \`WebContent/\`

This is the foundation of all web applications - HTML/CSS for presentation, Servlets for processing!
`,
  code: `// HTML/CSS Frontend with Servlets - Complete Integration
// This shows how HTML forms connect with Servlet classes

/*
 * COMPLETE PROJECT STRUCTURE
 * ==========================
 * 
 * UserRegistrationApp/
 * ├── src/
 * │   └── com/example/
 * │       └── RegisterServlet.java
 * ├── WebContent/
 * │   ├── WEB-INF/
 * │   │   └── web.xml
 * │   ├── css/
 * │   │   └── style.css
 * │   └── register.html
 * └── lib/
 *     └── servlet-api.jar
 */

// ============================================
// 1. HTML FORM (register.html)
// ============================================
/*
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <form action="register" method="POST">
        <input type="text" name="username" required>
        <input type="email" name="email" required>
        <input type="password" name="password" required>
        <button type="submit">Register</button>
    </form>
</body>
</html>
*/

// ============================================
// 2. SERVLET CLASS (RegisterServlet.java)
// ============================================
/*
package com.example;

import java.io.*;
import javax.servlet.*;
import javax.servlet.annotation.*;
import javax.servlet.http.*;

@WebServlet("/register")  // Maps to form action="register"
public class RegisterServlet extends HttpServlet {
    
    @Override
    protected void doPost(HttpServletRequest request, 
                         HttpServletResponse response)
            throws ServletException, IOException {
        
        // 1. Get form parameters (from HTML name attributes)
        String username = request.getParameter("username");
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        
        // 2. Validate input
        if (username == null || username.trim().isEmpty()) {
            response.getWriter().println("Username required!");
            return;
        }
        
        // 3. Process data (save to database, etc.)
        // ... business logic here ...
        
        // 4. Generate HTML response
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        out.println("<!DOCTYPE html>");
        out.println("<html>");
        out.println("<head><title>Success</title></head>");
        out.println("<body>");
        out.println("<h1>Welcome, " + username + "!</h1>");
        out.println("<p>Email: " + email + "</p>");
        out.println("</body>");
        out.println("</html>");
        out.close();
    }
}
*/

// ============================================
// 3. HOW IT WORKS - REQUEST FLOW
// ============================================
/*
STEP 1: User fills HTML form
  ↓
STEP 2: User clicks Submit button
  ↓
STEP 3: Browser sends HTTP POST to "/register"
  ↓
STEP 4: Tomcat finds Servlet mapped to "/register"
  ↓
STEP 5: Servlet's doPost() method is called
  ↓
STEP 6: Servlet reads form data:
  - request.getParameter("username")
  - request.getParameter("email")
  ↓
STEP 7: Servlet processes data
  ↓
STEP 8: Servlet generates HTML response
  ↓
STEP 9: Response sent back to browser
  ↓
STEP 10: Browser displays result
*/

// ============================================
// 4. KEY CONNECTIONS
// ============================================
/*
HTML Form          →  Servlet
-----------------      -----------------
action="register"  →  @WebServlet("/register")
name="username"    →  request.getParameter("username")
method="POST"      →  doPost() method
method="GET"       →  doGet() method
*/

// ============================================
// 5. CSS INTEGRATION
// ============================================
/*
HTML:
  <link rel="stylesheet" href="css/style.css">

File Location:
  WebContent/css/style.css

Servlet can also set CSS in response:
  out.println("<style>body { color: blue; }</style>");
*/

// ============================================
// 6. REAL-TIME EXAMPLE: LOGIN FORM
// ============================================
/*
HTML:
  <form action="login" method="POST">
      <input name="email" type="email">
      <input name="password" type="password">
      <button>Login</button>
  </form>

Servlet:
  @WebServlet("/login")
  public class LoginServlet extends HttpServlet {
      protected void doPost(...) {
          String email = request.getParameter("email");
          String password = request.getParameter("password");
          
          if (validateUser(email, password)) {
              response.sendRedirect("dashboard.html");
          } else {
              response.getWriter().println("Invalid credentials!");
          }
      }
  }
*/

// ============================================
// 7. BEST PRACTICES
// ============================================
/*
Always validate input in Servlet
Use POST for sensitive data (passwords)
Escape HTML to prevent XSS attacks
Use external CSS files (not inline in Servlet)
Separate presentation (HTML) from logic (Servlet)
Use RequestDispatcher to forward to JSP for complex pages
*/
`
};

export default servletFrontendIntegration;


