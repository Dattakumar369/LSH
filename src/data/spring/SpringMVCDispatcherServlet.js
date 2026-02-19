const springMVCDispatcherServlet = {
  id: 'spring-mvc-dispatcherservlet',
  title: 'Spring MVC DispatcherServlet',
  description: 'Understanding the front controller of Spring MVC',
  content: `
# DispatcherServlet - The Front Controller

DispatcherServlet is the heart of Spring MVC. It's the entry point for all web requests. Think of it as a traffic controller that receives all requests and routes them to the right handlers.

---

## What is DispatcherServlet?

DispatcherServlet is a servlet that acts as the front controller. It:
1. Receives all incoming HTTP requests
2. Dispatches them to the right controller
3. Processes the response
4. Sends it back to the client

It's like a receptionist in an office building. Everyone comes through the front door (DispatcherServlet), and it directs them to the right department (Controller).

---

## How DispatcherServlet Works

Here's the flow:

\`\`\`
1. Client sends HTTP request
   ↓
2. DispatcherServlet receives request
   ↓
3. DispatcherServlet finds the right Controller
   ↓
4. Controller processes request
   ↓
5. Controller returns ModelAndView
   ↓
6. DispatcherServlet finds the right View
   ↓
7. View renders response
   ↓
8. DispatcherServlet sends response to client
\`\`\`

DispatcherServlet coordinates everything. You don't write code for this - Spring handles it.

---

## Configuring DispatcherServlet

### Method 1: web.xml (Traditional)

\`\`\`xml
<web-app>
    <servlet>
        <servlet-name>spring</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath:spring-mvc-config.xml</param-value>
        </init-param>
        <load-on-startup>1</load-on-startup>
    </servlet>
    
    <servlet-mapping>
        <servlet-name>spring</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>
</web-app>
\`\`\`

This tells the web container:
- Create a DispatcherServlet named "spring"
- Load configuration from \`spring-mvc-config.xml\`
- Map all URLs (/) to this servlet

### Method 2: Java Configuration (Modern)

\`\`\`java
public class WebAppInitializer implements WebApplicationInitializer {
    public void onStartup(ServletContext servletContext) {
        AnnotationConfigWebApplicationContext context = new AnnotationConfigWebApplicationContext();
        context.register(SpringMvcConfig.class);
        
        DispatcherServlet servlet = new DispatcherServlet(context);
        ServletRegistration.Dynamic registration = servletContext.addServlet("spring", servlet);
        registration.setLoadOnStartup(1);
        registration.addMapping("/");
    }
}
\`\`\`

This is the programmatic way. No web.xml needed.

---

## Spring MVC Configuration

You need to configure Spring MVC. Create a configuration class:

\`\`\`java
@Configuration
@EnableWebMvc
@ComponentScan("com.example")
public class SpringMvcConfig {
    // Configuration
}
\`\`\`

Or XML:

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="...">
    
    <mvc:annotation-driven/>
    <context:component-scan base-package="com.example"/>
    
</beans>
\`\`\`

---

## URL Mapping

DispatcherServlet needs to know which URLs to handle. By default, it handles all URLs (\`/\`).

You can be more specific:

\`\`\`xml
<servlet-mapping>
    <servlet-name>spring</servlet-name>
    <url-pattern>*.html</url-pattern>  <!-- Only .html files -->
</servlet-mapping>
\`\`\`

Or:

\`\`\`xml
<servlet-mapping>
    <servlet-name>spring</servlet-name>
    <url-pattern>/app/*</url-pattern>  <!-- Only /app/* URLs -->
</servlet-mapping>
\`\`\`

Most applications use \`/\` to handle everything.

---

## Real-Time Example: Complete Setup

Let's set up a complete Spring MVC application:

### Step 1: web.xml

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app>
    <servlet>
        <servlet-name>spring</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath:spring-mvc-config.xml</param-value>
        </init-param>
        <load-on-startup>1</load-on-startup>
    </servlet>
    
    <servlet-mapping>
        <servlet-name>spring</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>
</web-app>
\`\`\`

### Step 2: spring-mvc-config.xml

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="...">
    
    <mvc:annotation-driven/>
    <context:component-scan base-package="com.example"/>
    
    <!-- View Resolver -->
    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
        <property name="prefix" value="/WEB-INF/views/"/>
        <property name="suffix" value=".jsp"/>
    </bean>
    
</beans>
\`\`\`

### Step 3: Controller

\`\`\`java
@Controller
public class HomeController {
    @RequestMapping("/home")
    public String home() {
        return "home";  // Resolves to /WEB-INF/views/home.jsp
    }
}
\`\`\`

### Step 4: JSP View

\`\`\`jsp
<!-- /WEB-INF/views/home.jsp -->
<html>
<body>
    <h1>Welcome Home!</h1>
</body>
</html>
\`\`\`

When user visits \`http://localhost:8080/app/home\`:
1. DispatcherServlet receives request
2. Finds HomeController
3. Calls home() method
4. Returns "home"
5. ViewResolver resolves to home.jsp
6. Response sent to client

---

## What DispatcherServlet Does

DispatcherServlet handles:

1. **Request Mapping** - Finds the right controller method
2. **Handler Execution** - Calls the controller method
3. **View Resolution** - Finds the right view
4. **Exception Handling** - Handles exceptions
5. **Model Binding** - Binds request parameters to model
6. **Response Rendering** - Renders the final response

You don't write code for most of this. Spring does it automatically.

---

## DispatcherServlet Components

DispatcherServlet uses several components:

1. **HandlerMapping** - Maps URLs to controllers
2. **HandlerAdapter** - Executes controller methods
3. **ViewResolver** - Resolves view names to actual views
4. **HandlerExceptionResolver** - Handles exceptions
5. **LocaleResolver** - Handles internationalization
6. **ThemeResolver** - Handles themes

Spring provides default implementations. You usually don't need to configure them.

---

## Real Example: E-Commerce Application

\`\`\`xml
<!-- web.xml -->
<servlet>
    <servlet-name>spring</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <init-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>classpath:spring-config.xml</param-value>
    </init-param>
</servlet>

<servlet-mapping>
    <servlet-name>spring</servlet-name>
    <url-pattern>/</url-pattern>
</servlet-mapping>
\`\`\`

\`\`\`java
@Controller
public class ProductController {
    @Autowired
    private ProductService service;
    
    @RequestMapping("/products")
    public String showProducts(Model model) {
        List<Product> products = service.getAllProducts();
        model.addAttribute("products", products);
        return "products";  // products.jsp
    }
    
    @RequestMapping("/product/{id}")
    public String showProduct(@PathVariable int id, Model model) {
        Product product = service.getProduct(id);
        model.addAttribute("product", product);
        return "product";  // product.jsp
    }
}
\`\`\`

When user visits \`/products\`:
1. DispatcherServlet receives request
2. Maps to ProductController.showProducts()
3. Executes method
4. Returns "products"
5. ViewResolver finds products.jsp
6. Response rendered and sent

---

## Common Mistakes

**Mistake 1: Wrong URL pattern**
\`\`\`xml
<!-- Wrong - Only handles .html -->
<url-pattern>*.html</url-pattern>

<!-- Right - Handles all URLs -->
<url-pattern>/</url-pattern>
\`\`\`

**Mistake 2: Missing component scan**
\`\`\`xml
<!-- Wrong - Controllers won't be found -->
<beans>
    <!-- Missing component-scan -->
</beans>

<!-- Right -->
<context:component-scan base-package="com.example"/>
\`\`\`

**Mistake 3: Wrong context config location**
\`\`\`xml
<!-- Wrong - File doesn't exist -->
<param-value>classpath:wrong-file.xml</param-value>

<!-- Right - Correct file path -->
<param-value>classpath:spring-mvc-config.xml</param-value>
\`\`\`

---

## What's Next?

Now that you understand DispatcherServlet, let's learn about:

1. **Controllers** - How to handle requests
2. **ViewResolver** - How views are resolved
3. **ModelAndView** - How to pass data to views

> **Key Takeaway:** DispatcherServlet is the front controller of Spring MVC. It receives all requests, finds the right controller, executes it, resolves the view, and sends the response. You configure it once in web.xml, and it handles everything automatically.
`,
  code: `// DispatcherServlet Demo
// Understanding the front controller

public class DispatcherServletDemo {
    public static void main(String[] args) {
        System.out.println("=== DISPATCHERSERVLET ===");
        System.out.println();
        
        // What is DispatcherServlet?
        System.out.println("WHAT IS DISPATCHERSERVLET?");
        System.out.println("--------------------------");
        System.out.println("Front controller of Spring MVC");
        System.out.println("Receives all HTTP requests");
        System.out.println("Routes them to the right controller");
        System.out.println("Processes response and sends back");
        System.out.println();
        
        // How it works
        System.out.println("HOW IT WORKS:");
        System.out.println("-------------");
        System.out.println("1. Client sends HTTP request");
        System.out.println("2. DispatcherServlet receives");
        System.out.println("3. Finds the right Controller");
        System.out.println("4. Controller processes request");
        System.out.println("5. Controller returns ModelAndView");
        System.out.println("6. DispatcherServlet finds View");
        System.out.println("7. View renders response");
        System.out.println("8. Response sent to client");
        System.out.println();
        
        // Configuration
        System.out.println("CONFIGURATION (web.xml):");
        System.out.println("-----------------------");
        System.out.println("<servlet>");
        System.out.println("    <servlet-name>spring</servlet-name>");
        System.out.println("    <servlet-class>");
        System.out.println("        org.springframework.web.servlet.DispatcherServlet");
        System.out.println("    </servlet-class>");
        System.out.println("    <init-param>");
        System.out.println("        <param-name>contextConfigLocation</param-name>");
        System.out.println("        <param-value>classpath:spring-mvc-config.xml</param-value>");
        System.out.println("    </init-param>");
        System.out.println("</servlet>");
        System.out.println();
        System.out.println("<servlet-mapping>");
        System.out.println("    <servlet-name>spring</servlet-name>");
        System.out.println("    <url-pattern>/</url-pattern>");
        System.out.println("</servlet-mapping>");
        System.out.println();
        
        // Example flow
        System.out.println("EXAMPLE FLOW:");
        System.out.println("------------");
        System.out.println("User visits: http://localhost:8080/app/home");
        System.out.println();
        System.out.println("1. DispatcherServlet receives /home request");
        System.out.println("2. Maps to HomeController.home()");
        System.out.println("3. Executes home() method");
        System.out.println("4. Returns \\"home\\"");
        System.out.println("5. ViewResolver resolves to home.jsp");
        System.out.println("6. Response sent to browser");
        System.out.println();
        
        // Components
        System.out.println("DISPATCHERSERVLET COMPONENTS:");
        System.out.println("----------------------------");
        System.out.println("- HandlerMapping: Maps URLs to controllers");
        System.out.println("- HandlerAdapter: Executes controller methods");
        System.out.println("- ViewResolver: Resolves view names");
        System.out.println("- ExceptionResolver: Handles exceptions");
        System.out.println();
        
        // Benefits
        System.out.println("BENEFITS:");
        System.out.println("---------");
        System.out.println("1. Single entry point for all requests");
        System.out.println("2. Centralized request handling");
        System.out.println("3. Automatic routing to controllers");
        System.out.println("4. Consistent exception handling");
        System.out.println("5. Easy to configure and extend");
    }
}`,
  practiceQuestions: [
    {
      question: 'Configure DispatcherServlet in web.xml for a Spring MVC application',
      hint: 'Use <servlet> and <servlet-mapping> tags with DispatcherServlet class',
      starterCode: `<!-- Configure DispatcherServlet in web.xml -->
<!-- 
1. Define servlet with DispatcherServlet class
2. Set contextConfigLocation parameter
3. Map servlet to URL pattern

Example structure:
<?xml version="1.0" encoding="UTF-8"?>
<web-app>
    <servlet>
        <servlet-name>spring</servlet-name>
        <servlet-class>
            org.springframework.web.servlet.DispatcherServlet
        </servlet-class>
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath:spring-mvc-config.xml</param-value>
        </init-param>
        <load-on-startup>1</load-on-startup>
    </servlet>
    
    <servlet-mapping>
        <servlet-name>spring</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>
</web-app>
-->`
    }
  ]
};

export default springMVCDispatcherServlet;

