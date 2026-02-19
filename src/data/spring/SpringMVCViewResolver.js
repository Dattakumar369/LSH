const springMVCViewResolver = {
  id: 'spring-mvc-viewresolver',
  title: 'Spring MVC ViewResolver',
  description: 'How Spring resolves view names to actual views',
  content: `
# ViewResolver - Resolving Views

ViewResolver is how Spring converts view names (like "home") into actual views (like home.jsp). It's the bridge between your controller and your view files.

---

## What is ViewResolver?

When a controller returns a string like "home", Spring needs to know what that means. ViewResolver figures it out. It:
1. Takes the view name from controller
2. Resolves it to an actual view file
3. Returns the view to render

Think of it as a translator. Controller says "home", ViewResolver translates it to "/WEB-INF/views/home.jsp".

---

## How ViewResolver Works

Here's the flow:

\`\`\`
1. Controller returns "home"
   ↓
2. DispatcherServlet gets view name
   ↓
3. DispatcherServlet asks ViewResolver
   ↓
4. ViewResolver resolves "home" to "/WEB-INF/views/home.jsp"
   ↓
5. View is rendered
   ↓
6. Response sent to client
\`\`\`

You don't write code for this. Spring does it automatically.

---

## InternalResourceViewResolver

This is the most common ViewResolver. It resolves JSP files.

### Configuration (XML)

\`\`\`xml
<bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
    <property name="prefix" value="/WEB-INF/views/"/>
    <property name="suffix" value=".jsp"/>
</bean>
\`\`\`

What this does:
- **prefix** - Adds "/WEB-INF/views/" before view name
- **suffix** - Adds ".jsp" after view name

So when controller returns "home":
- prefix + "home" + suffix = "/WEB-INF/views/home.jsp"

### Configuration (Java)

\`\`\`java
@Configuration
@EnableWebMvc
public class SpringMvcConfig {
    @Bean
    public ViewResolver viewResolver() {
        InternalResourceViewResolver resolver = new InternalResourceViewResolver();
        resolver.setPrefix("/WEB-INF/views/");
        resolver.setSuffix(".jsp");
        return resolver;
    }
}
\`\`\`

---

## Real-Time Example

### Controller

\`\`\`java
@Controller
public class HomeController {
    @RequestMapping("/home")
    public String home() {
        return "home";  // Returns view name
    }
}
\`\`\`

### ViewResolver Configuration

\`\`\`xml
<bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
    <property name="prefix" value="/WEB-INF/views/"/>
    <property name="suffix" value=".jsp"/>
</bean>
\`\`\`

### JSP File

\`\`\`jsp
<!-- /WEB-INF/views/home.jsp -->
<html>
<body>
    <h1>Welcome Home!</h1>
</body>
</html>
\`\`\`

What happens:
1. User visits /home
2. Controller returns "home"
3. ViewResolver resolves to "/WEB-INF/views/home.jsp"
4. JSP is rendered
5. Response sent

---

## Different View Resolvers

Spring provides different ViewResolvers for different view technologies:

### 1. InternalResourceViewResolver (JSP)

\`\`\`xml
<bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
    <property name="prefix" value="/WEB-INF/views/"/>
    <property name="suffix" value=".jsp"/>
</bean>
\`\`\`

For JSP files.

### 2. ResourceBundleViewResolver (Properties)

\`\`\`xml
<bean class="org.springframework.web.servlet.view.ResourceBundleViewResolver">
    <property name="basename" value="views"/>
</bean>
\`\`\`

Uses properties file to map view names.

### 3. XmlViewResolver (XML)

\`\`\`xml
<bean class="org.springframework.web.servlet.view.XmlViewResolver">
    <property name="location" value="/WEB-INF/views.xml"/>
</bean>
\`\`\`

Uses XML file for view definitions.

### 4. ContentNegotiatingViewResolver

Resolves views based on content type (HTML, JSON, XML).

---

## Multiple View Resolvers

You can have multiple ViewResolvers. Spring tries them in order:

\`\`\`xml
<bean class="org.springframework.web.servlet.view.ContentNegotiatingViewResolver">
    <property name="viewResolvers">
        <list>
            <bean class="org.springframework.web.servlet.view.BeanNameViewResolver"/>
            <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
                <property name="prefix" value="/WEB-INF/views/"/>
                <property name="suffix" value=".jsp"/>
            </bean>
        </list>
    </property>
</bean>
\`\`\`

Spring tries the first one, then the second if the first fails.

---

## Custom View Resolver

You can create your own ViewResolver:

\`\`\`java
public class CustomViewResolver implements ViewResolver {
    public View resolveViewName(String viewName, Locale locale) {
        // Your custom logic
        if (viewName.startsWith("pdf:")) {
            return new PdfView(viewName);
        }
        return null;  // Try next resolver
    }
}
\`\`\`

---

## Real Example: E-Commerce Application

\`\`\`xml
<!-- ViewResolver configuration -->
<bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
    <property name="prefix" value="/WEB-INF/views/"/>
    <property name="suffix" value=".jsp"/>
</bean>
\`\`\`

\`\`\`java
@Controller
public class ProductController {
    @GetMapping("/products")
    public String showProducts(Model model) {
        model.addAttribute("products", productService.getAllProducts());
        return "products";  // Resolves to /WEB-INF/views/products.jsp
    }
    
    @GetMapping("/product/{id}")
    public String showProduct(@PathVariable int id, Model model) {
        model.addAttribute("product", productService.getProduct(id));
        return "product-detail";  // Resolves to /WEB-INF/views/product-detail.jsp
    }
}
\`\`\`

\`\`\`jsp
<!-- /WEB-INF/views/products.jsp -->
<html>
<body>
    <h1>Products</h1>
    <c:forEach items="\${products}" var="product">
        <p>\${product.name} - \${product.price}</p>
    </c:forEach>
</body>
</html>
\`\`\`

---

## View Name Patterns

You can use patterns in view names:

\`\`\`java
@GetMapping("/student/{id}")
public String showStudent(@PathVariable int id, Model model) {
    Student student = service.getStudent(id);
    model.addAttribute("student", student);
    return "student/detail";  // Resolves to /WEB-INF/views/student/detail.jsp
}
\`\`\`

ViewResolver handles the path correctly.

---

## Redirecting (No View Resolution)

When you use "redirect:", ViewResolver is not used:

\`\`\`java
@PostMapping("/save")
public String saveStudent(@ModelAttribute Student student) {
    service.saveStudent(student);
    return "redirect:/students";  // No view resolution, just redirect
}
\`\`\`

Spring sends an HTTP redirect, not a view.

---

## Forwarding

You can forward to another URL:

\`\`\`java
@GetMapping("/forward")
public String forwardExample() {
    return "forward:/another-url";  // Forwards internally
}
\`\`\`

---

## Common Mistakes

**Mistake 1: Wrong prefix/suffix**
\`\`\`xml
<!-- Wrong - Files won't be found -->
<property name="prefix" value="/views/"/>  <!-- Missing WEB-INF -->
<property name="suffix" value=".html"/>    <!-- Files are .jsp -->

<!-- Right -->
<property name="prefix" value="/WEB-INF/views/"/>
<property name="suffix" value=".jsp"/>
\`\`\`

**Mistake 2: View file not in correct location**
\`\`\`java
// Controller returns "home"
// ViewResolver expects /WEB-INF/views/home.jsp
// But file is at /views/home.jsp - Wrong location!
\`\`\`

**Mistake 3: Forgetting ViewResolver configuration**
\`\`\`xml
<!-- Wrong - No ViewResolver configured -->
<beans>
    <!-- Missing ViewResolver -->
</beans>
\`\`\`

Without ViewResolver, Spring won't know how to resolve view names.

---

## What's Next?

Now that you understand ViewResolver, let's learn about:

1. **ModelAndView** - Another way to pass data to views
2. **Building a Complete Project** - Login + Student CRUD

> **Key Takeaway:** ViewResolver converts view names (like "home") into actual view files (like home.jsp). Configure InternalResourceViewResolver with prefix and suffix, and Spring handles the rest automatically.
`,
  code: `// ViewResolver Demo
// Understanding how views are resolved

public class ViewResolverDemo {
    public static void main(String[] args) {
        System.out.println("=== VIEWRESOLVER ===");
        System.out.println();
        
        // What is ViewResolver?
        System.out.println("WHAT IS VIEWRESOLVER?");
        System.out.println("---------------------");
        System.out.println("Converts view names to actual view files");
        System.out.println("Controller returns \\"home\\"");
        System.out.println("ViewResolver resolves to \\"/WEB-INF/views/home.jsp\\"");
        System.out.println();
        
        // How it works
        System.out.println("HOW IT WORKS:");
        System.out.println("-------------");
        System.out.println("1. Controller returns view name (e.g., \\"home\\")");
        System.out.println("2. DispatcherServlet gets view name");
        System.out.println("3. DispatcherServlet asks ViewResolver");
        System.out.println("4. ViewResolver resolves to actual file");
        System.out.println("5. View is rendered");
        System.out.println();
        
        // Configuration
        System.out.println("CONFIGURATION (XML):");
        System.out.println("-------------------");
        System.out.println("<bean class=\\"org.springframework.web.servlet.view.InternalResourceViewResolver\\">");
        System.out.println("    <property name=\\"prefix\\" value=\\"/WEB-INF/views/\\"/>");
        System.out.println("    <property name=\\"suffix\\" value=\\".jsp\\"/>");
        System.out.println("</bean>");
        System.out.println();
        
        // Example
        System.out.println("EXAMPLE:");
        System.out.println("--------");
        System.out.println("Controller returns: \\"home\\"");
        System.out.println("ViewResolver adds prefix: /WEB-INF/views/");
        System.out.println("ViewResolver adds suffix: .jsp");
        System.out.println("Result: /WEB-INF/views/home.jsp");
        System.out.println();
        
        // Java configuration
        System.out.println("JAVA CONFIGURATION:");
        System.out.println("-------------------");
        System.out.println("@Bean");
        System.out.println("public ViewResolver viewResolver() {");
        System.out.println("    InternalResourceViewResolver resolver = ");
        System.out.println("        new InternalResourceViewResolver();");
        System.out.println("    resolver.setPrefix(\\"/WEB-INF/views/\\");");
        System.out.println("    resolver.setSuffix(\\".jsp\\");");
        System.out.println("    return resolver;");
        System.out.println("}");
        System.out.println();
        
        // Types
        System.out.println("TYPES OF VIEWRESOLVERS:");
        System.out.println("----------------------");
        System.out.println("1. InternalResourceViewResolver - For JSP");
        System.out.println("2. ResourceBundleViewResolver - Properties file");
        System.out.println("3. XmlViewResolver - XML configuration");
        System.out.println("4. ContentNegotiatingViewResolver - Multiple formats");
        System.out.println();
        
        // Redirect
        System.out.println("REDIRECT (No View Resolution):");
        System.out.println("------------------------------");
        System.out.println("return \\"redirect:/students\\";");
        System.out.println("No view resolution, just HTTP redirect");
    }
}`,
  practiceQuestions: [
    {
      question: 'Configure ViewResolver to resolve JSP views from /WEB-INF/views/ directory',
      hint: 'Use InternalResourceViewResolver with prefix and suffix properties',
      starterCode: `<!-- Configure ViewResolver in XML -->
<!-- 
Use InternalResourceViewResolver
Set prefix to /WEB-INF/views/
Set suffix to .jsp

Example:
<bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
    <property name="prefix" value="/WEB-INF/views/"/>
    <property name="suffix" value=".jsp"/>
</bean>
-->

<!-- Or in Java configuration -->
/*
@Configuration
@EnableWebMvc
public class SpringMvcConfig {
    @Bean
    public ViewResolver viewResolver() {
        InternalResourceViewResolver resolver = new InternalResourceViewResolver();
        resolver.setPrefix("/WEB-INF/views/");
        resolver.setSuffix(".jsp");
        return resolver;
    }
}
*/`
    }
  ]
};

export default springMVCViewResolver;

