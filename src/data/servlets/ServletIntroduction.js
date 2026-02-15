const servletIntroduction = {
  id: 'servlet-introduction',
  title: 'Introduction to Servlets',
  description: 'How Java powers the web — from request to response',
  content: `
# Servlets — Java on the Web

You click a button on a website. A few milliseconds later, you see a response. Ever wondered what happens in between? On many websites, especially enterprise ones, there's a Java Servlet handling that request.

**Servlets** are Java programs that run on a server and handle web requests. They're the backbone of Java web development — and understanding them is essential if you want to build web applications with Java.

---

## Real-Time Scenarios: Servlets in Daily Web Applications

### Scenario 1: User Login (E-Commerce, Banking, Social Media)

**Daily Life:** When you login to any website, a Servlet handles it:

\`\`\`java
// Real-world: Login on Amazon/Flipkart/Banking
@WebServlet("/login")
public class LoginServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) {
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        
        // Validate credentials with database
        User user = userDAO.authenticate(username, password);
        
        if (user != null) {
            // Create session
            HttpSession session = request.getSession();
            session.setAttribute("user", user);
            
            // Redirect to home page
            response.sendRedirect("home.jsp");
        } else {
            // Show error
            request.setAttribute("error", "Invalid credentials");
            request.getRequestDispatcher("login.jsp").forward(request, response);
        }
    }
}
\`\`\`

**What Happens:**
1. You enter username/password and click "Login"
2. Browser sends POST request to `/login`
3. Servlet receives request
4. Servlet validates credentials with database
5. If valid, creates session and redirects to home
6. If invalid, shows error message

### Scenario 2: Product Search (E-Commerce)

**Daily Life:** When you search for products, a Servlet processes it:

\`\`\`java
// Real-world: Search products on Amazon
@WebServlet("/search")
public class SearchServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) {
        String searchTerm = request.getParameter("q");
        String category = request.getParameter("category");
        double maxPrice = Double.parseDouble(request.getParameter("maxPrice"));
        
        // Search products in database
        List<Product> products = productDAO.search(searchTerm, category, maxPrice);
        
        // Set results in request
        request.setAttribute("products", products);
        request.setAttribute("searchTerm", searchTerm);
        
        // Forward to results page
        request.getRequestDispatcher("searchResults.jsp").forward(request, response);
    }
}
\`\`\`

**What Happens:**
1. You type "laptop" in search box and click "Search"
2. Browser sends GET request: \`/search?q=laptop&category=electronics&maxPrice=50000\`
3. Servlet extracts search parameters
4. Servlet queries database for matching products
5. Servlet forwards results to JSP page
6. JSP displays products on your screen

### Scenario 3: Online Shopping Cart (E-Commerce)

**Daily Life:** When you add items to cart, a Servlet manages it:

\`\`\`java
// Real-world: Add to cart on Amazon
@WebServlet("/addToCart")
public class AddToCartServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) {
        // Get user from session
        HttpSession session = request.getSession();
        User user = (User) session.getAttribute("user");
        
        int productId = Integer.parseInt(request.getParameter("productId"));
        int quantity = Integer.parseInt(request.getParameter("quantity"));
        
        // Add to cart in database
        cartDAO.addItem(user.getId(), productId, quantity);
        
        // Update session cart count
        int cartCount = cartDAO.getCartCount(user.getId());
        session.setAttribute("cartCount", cartCount);
        
        response.sendRedirect("cart.jsp?message=Item added to cart");
    }
}
\`\`\`

**What Happens:**
1. You click "Add to Cart" button
2. Browser sends POST request with product ID and quantity
3. Servlet gets user from session
4. Servlet saves item to cart in database
5. Servlet updates cart count in session
6. Servlet redirects to cart page with success message

### Scenario 4: Online Banking Money Transfer

**Daily Life:** When you transfer money online, a Servlet handles it:

\`\`\`java
// Real-world: Transfer money in banking app
@WebServlet("/transfer")
public class TransferServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession();
        User user = (User) session.getAttribute("user");
        
        String toAccount = request.getParameter("toAccount");
        double amount = Double.parseDouble(request.getParameter("amount"));
        
        // Validate and transfer
        try {
            accountService.transfer(user.getAccountNumber(), toAccount, amount);
            request.setAttribute("success", "Transfer successful!");
        } catch (InsufficientBalanceException e) {
            request.setAttribute("error", "Insufficient balance");
        } catch (Exception e) {
            request.setAttribute("error", "Transfer failed");
        }
        
        request.getRequestDispatcher("transfer.jsp").forward(request, response);
    }
}
\`\`\`

**What Happens:**
1. You enter recipient account and amount, click "Transfer"
2. Browser sends POST request
3. Servlet validates user session
4. Servlet processes transfer (updates both accounts)
5. Servlet shows success or error message
6. Transaction recorded in database

### Scenario 5: Online Food Ordering (Swiggy, Zomato)

**Daily Life:** When you place a food order, a Servlet processes it:

\`\`\`java
// Real-world: Place order on Swiggy/Zomato
@WebServlet("/placeOrder")
public class PlaceOrderServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession();
        User user = (User) session.getAttribute("user");
        Cart cart = (Cart) session.getAttribute("cart");
        
        String deliveryAddress = request.getParameter("address");
        String paymentMethod = request.getParameter("payment");
        
        // Create order
        Order order = orderService.createOrder(user, cart, deliveryAddress, paymentMethod);
        
        // Clear cart
        session.removeAttribute("cart");
        
        // Redirect to order confirmation
        response.sendRedirect("orderConfirmation.jsp?orderId=" + order.getId());
    }
}
\`\`\`

**What Happens:**
1. You click "Place Order" after adding items
2. Browser sends POST request with address and payment info
3. Servlet creates order in database
4. Servlet clears cart from session
5. Servlet redirects to order confirmation page
6. You see order details and tracking info

---

## What Exactly is a Servlet?

In simple terms, a Servlet is a Java class that:
1. Receives a request from a browser
2. Processes it (maybe talks to a database)
3. Sends back a response

That's it. Request in, response out.

But here's what makes Servlets special: they're managed by a **Servlet Container** (like Apache Tomcat). The container handles all the messy stuff — creating threads, managing connections, handling security. You just write the business logic.

---

## The Old Way: CGI

Before Servlets, we had **CGI (Common Gateway Interface)**. Here's why it was problematic:

With CGI, every request created a new **process**. Imagine 1000 users hitting your site simultaneously — that's 1000 processes. Your server would melt.

Servlets fixed this. Instead of processes, they use **threads**. One Servlet instance handles multiple requests, each in its own thread. Much more efficient.

| CGI | Servlets |
|-----|----------|
| New process per request | New thread per request |
| Heavy and slow | Lightweight and fast |
| Limited scalability | Handles thousands of requests |
| Platform dependent | Platform independent |

---

## How Servlets Work

Here's the flow:

\`\`\`
Browser sends request
        ↓
    Web Server (Apache/Nginx)
        ↓
    Servlet Container (Tomcat)
        ↓
    Your Servlet
        ↓
    Response sent back
\`\`\`

The Servlet Container does a lot of heavy lifting:
- Loads your Servlet when needed
- Creates threads for each request
- Calls the right method (doGet, doPost, etc.)
- Manages the Servlet's lifecycle

You just focus on what happens when a request comes in.

---

## Your First Servlet

Let's write a simple Servlet that says hello:

\`\`\`java
import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;

public class HelloServlet extends HttpServlet {
    
    @Override
    protected void doGet(HttpServletRequest request, 
                        HttpServletResponse response) 
            throws IOException {
        
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        
        out.println("<html>");
        out.println("<body>");
        out.println("<h1>Hello from Servlet!</h1>");
        out.println("</body>");
        out.println("</html>");
    }
}
\`\`\`

Let me break this down:

1. **extends HttpServlet** — All HTTP Servlets extend this class
2. **doGet()** — Called when someone makes a GET request (like typing a URL)
3. **HttpServletRequest** — Contains everything about the incoming request
4. **HttpServletResponse** — Used to send the response back
5. **PrintWriter** — Writes the HTML response

---

## GET vs POST

You'll mostly deal with two HTTP methods:

**GET** — Used to retrieve data
- When you type a URL and hit enter
- When you click a link
- Parameters visible in URL (\`?name=John&age=25\`)

**POST** — Used to submit data
- When you submit a form
- When you upload a file
- Parameters hidden in request body

In your Servlet:
\`\`\`java
protected void doGet(HttpServletRequest req, HttpServletResponse res) {
    // Handle GET requests
}

protected void doPost(HttpServletRequest req, HttpServletResponse res) {
    // Handle POST requests
}
\`\`\`

---

## Getting Request Parameters

Users send data to your Servlet through parameters. Here's how to get them:

\`\`\`java
// URL: /search?query=java&page=1

protected void doGet(HttpServletRequest request, 
                    HttpServletResponse response) throws IOException {
    
    String query = request.getParameter("query");  // "java"
    String page = request.getParameter("page");    // "1"
    
    // Now use these values
}
\`\`\`

For a login form:
\`\`\`java
protected void doPost(HttpServletRequest request, 
                     HttpServletResponse response) throws IOException {
    
    String username = request.getParameter("username");
    String password = request.getParameter("password");
    
    // Validate credentials
    if (isValidUser(username, password)) {
        // Login successful
    } else {
        // Login failed
    }
}
\`\`\`

---

## Mapping URLs to Servlets

How does the container know which Servlet to call? Through URL mapping.

**Old way (web.xml):**
\`\`\`xml
<servlet>
    <servlet-name>HelloServlet</servlet-name>
    <servlet-class>com.example.HelloServlet</servlet-class>
</servlet>
<servlet-mapping>
    <servlet-name>HelloServlet</servlet-name>
    <url-pattern>/hello</url-pattern>
</servlet-mapping>
\`\`\`

**Modern way (annotations):**
\`\`\`java
@WebServlet("/hello")
public class HelloServlet extends HttpServlet {
    // ...
}
\`\`\`

Much cleaner, right? The annotation approach was introduced in Servlet 3.0.

---

## Real-World Example: Login System

Let's build something practical — a login page:

\`\`\`java
@WebServlet("/login")
public class LoginServlet extends HttpServlet {
    
    @Override
    protected void doPost(HttpServletRequest request, 
                         HttpServletResponse response) 
            throws IOException, ServletException {
        
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        
        // In real apps, you'd check against a database
        if ("admin".equals(username) && "password123".equals(password)) {
            // Create a session
            HttpSession session = request.getSession();
            session.setAttribute("user", username);
            
            out.println("<h1>Welcome, " + username + "!</h1>");
            out.println("<a href='dashboard'>Go to Dashboard</a>");
        } else {
            out.println("<h1>Login Failed</h1>");
            out.println("<p>Invalid username or password</p>");
            out.println("<a href='login.html'>Try Again</a>");
        }
    }
}
\`\`\`

This is a simplified example, but it shows the pattern:
1. Get user input
2. Validate it
3. Create session if valid
4. Send appropriate response

---

## Sessions — Remembering Users

HTTP is stateless. Each request is independent. But you need to remember that a user is logged in. That's what sessions are for.

\`\`\`java
// Create or get existing session
HttpSession session = request.getSession();

// Store data in session
session.setAttribute("user", "john");
session.setAttribute("role", "admin");

// Retrieve data later
String user = (String) session.getAttribute("user");

// Invalidate session (logout)
session.invalidate();
\`\`\`

The container handles all the cookie management behind the scenes. You just work with the session object.

---

## Common Mistakes

**1. Not setting content type**
\`\`\`java
response.setContentType("text/html");  // Do this first!
\`\`\`

**2. Writing after getting PrintWriter**
Get the PrintWriter after setting headers, not before.

**3. Not handling null parameters**
\`\`\`java
String name = request.getParameter("name");
if (name != null && !name.isEmpty()) {
    // Safe to use
}
\`\`\`

**4. Storing sensitive data in sessions**
Don't store passwords in sessions. Store user IDs and look up data when needed.

---

## Servlet Containers

You need a Servlet Container to run Servlets. Popular options:

| Container | Description |
|-----------|-------------|
| **Apache Tomcat** | Most popular, lightweight |
| **Jetty** | Embedded, great for microservices |
| **WildFly** | Full Java EE server |
| **GlassFish** | Reference implementation |

For learning, Tomcat is perfect. It's free, easy to set up, and widely used in production.

---

## What's Next?

This was just the beginning. Servlets are powerful, but there's more to learn:

- **Servlet Lifecycle** — How Servlets are created and destroyed
- **Filters** — Intercept requests before they reach Servlets
- **Listeners** — React to events in your application
- **JSP** — Easier way to write HTML with Java

But before moving on, try building a simple Servlet yourself. Create a form, submit it to a Servlet, process the data. That hands-on experience is invaluable.

> **Pro Tip:** Download Tomcat, deploy a simple Servlet, and see it work. There's no substitute for actually running code.
`,
  code: `// Servlet Basics Demo
// Understanding how Servlets work

public class ServletBasicsDemo {
    public static void main(String[] args) {
        System.out.println("=== Servlet Basics Demo ===");
        System.out.println();
        
        // What is a Servlet?
        System.out.println("WHAT IS A SERVLET?");
        System.out.println("------------------");
        System.out.println("A Java class that handles web requests.");
        System.out.println("Request comes in -> Servlet processes -> Response goes out");
        System.out.println();
        
        // Why Servlets?
        System.out.println("WHY SERVLETS OVER CGI?");
        System.out.println("----------------------");
        System.out.println("CGI:     New PROCESS per request (heavy)");
        System.out.println("Servlet: New THREAD per request (lightweight)");
        System.out.println();
        
        // The flow
        System.out.println("HOW IT WORKS:");
        System.out.println("-------------");
        System.out.println("Browser -> Web Server -> Servlet Container -> Your Servlet");
        System.out.println();
        
        // Key methods
        System.out.println("KEY METHODS:");
        System.out.println("------------");
        System.out.println("doGet()  - Handles GET requests (viewing pages)");
        System.out.println("doPost() - Handles POST requests (form submissions)");
        System.out.println();
        
        // Simple example
        System.out.println("SIMPLE SERVLET:");
        System.out.println("---------------");
        System.out.println("@WebServlet(\\"/hello\\")");
        System.out.println("public class HelloServlet extends HttpServlet {");
        System.out.println("    protected void doGet(HttpServletRequest req,");
        System.out.println("                        HttpServletResponse res) {");
        System.out.println("        res.setContentType(\\"text/html\\");");
        System.out.println("        PrintWriter out = res.getWriter();");
        System.out.println("        out.println(\\"<h1>Hello!</h1>\\");");
        System.out.println("    }");
        System.out.println("}");
        System.out.println();
        
        // Getting parameters
        System.out.println("GETTING USER INPUT:");
        System.out.println("-------------------");
        System.out.println("String name = request.getParameter(\\"name\\");");
        System.out.println("String email = request.getParameter(\\"email\\");");
        System.out.println();
        
        // Sessions
        System.out.println("SESSIONS (Remembering Users):");
        System.out.println("-----------------------------");
        System.out.println("HttpSession session = request.getSession();");
        System.out.println("session.setAttribute(\\"user\\", \\"john\\");");
        System.out.println("String user = (String) session.getAttribute(\\"user\\");");
        System.out.println();
        
        // Popular containers
        System.out.println("SERVLET CONTAINERS:");
        System.out.println("-------------------");
        System.out.println("- Apache Tomcat (most popular)");
        System.out.println("- Jetty (lightweight)");
        System.out.println("- WildFly (full Java EE)");
        System.out.println();
        
        System.out.println("Ready to build web apps with Java? Let's go!");
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a simple Servlet that displays a welcome message',
      hint: 'Extend HttpServlet and override doGet()',
      starterCode: `import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.*;

@WebServlet("/welcome")
public class WelcomeServlet extends HttpServlet {
    
    @Override
    protected void doGet(HttpServletRequest request,
                        HttpServletResponse response)
            throws IOException {
        
        // Set the content type
        response.setContentType("text/html");
        
        // Get the writer
        PrintWriter out = response.getWriter();
        
        // Write the HTML response
        out.println("<html>");
        out.println("<head><title>Welcome</title></head>");
        out.println("<body>");
        out.println("<h1>Welcome to My First Servlet!</h1>");
        out.println("<p>Current time: " + new java.util.Date() + "</p>");
        out.println("</body>");
        out.println("</html>");
    }
}`
    }
  ]
};

export default servletIntroduction;
