const springConfigurationXML = {
  id: 'spring-configuration-xml',
  title: 'Spring XML Configuration',
  description: 'How to configure Spring using XML files',
  content: `
# Spring XML Configuration

Before annotations became popular, Spring was configured using XML files. It's the traditional way, and many projects still use it. Let's learn how it works.

---

## Why XML Configuration?

XML configuration separates configuration from code. You can change beans, dependencies, and properties without recompiling Java code. This was especially useful before annotations existed.

---

## Basic XML Configuration

Create a file called \`applicationContext.xml\`:

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
                           http://www.springframework.org/schema/beans/spring-beans.xsd">

    <!-- Define beans here -->
    
</beans>
\`\`\`

This is the basic structure. Now let's add beans.

---

## Defining Beans in XML

### Simple Bean

\`\`\`xml
<bean id="studentRepository" class="com.example.StudentRepository"/>
\`\`\`

- **id** - Name of the bean
- **class** - Fully qualified class name

### Bean with Constructor Injection

\`\`\`java
public class StudentService {
    private StudentRepository repo;
    
    public StudentService(StudentRepository repo) {
        this.repo = repo;
    }
}
\`\`\`

XML configuration:

\`\`\`xml
<bean id="studentRepository" class="com.example.StudentRepository"/>

<bean id="studentService" class="com.example.StudentService">
    <constructor-arg ref="studentRepository"/>
</bean>
\`\`\`

\`<constructor-arg ref="studentRepository"/>\` tells Spring to pass the studentRepository bean to the constructor.

---

## Real-Time Example: Student Management

Let's configure a complete student management system:

### Java Classes

\`\`\`java
public class StudentRepository {
    public void save(Student student) {
        System.out.println("Saving student: " + student);
    }
}

public class StudentService {
    private StudentRepository repo;
    
    public StudentService(StudentRepository repo) {
        this.repo = repo;
    }
    
    public void saveStudent(Student student) {
        repo.save(student);
    }
}

public class StudentController {
    private StudentService service;
    
    public StudentController(StudentService service) {
        this.service = service;
    }
    
    public void handleRequest(Student student) {
        service.saveStudent(student);
    }
}
\`\`\`

### XML Configuration

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
                           http://www.springframework.org/schema/beans/spring-beans.xsd">

    <!-- Repository bean -->
    <bean id="studentRepository" class="com.example.StudentRepository"/>

    <!-- Service bean with constructor injection -->
    <bean id="studentService" class="com.example.StudentService">
        <constructor-arg ref="studentRepository"/>
    </bean>

    <!-- Controller bean with constructor injection -->
    <bean id="studentController" class="com.example.StudentController">
        <constructor-arg ref="studentService"/>
    </bean>

</beans>
\`\`\`

### Using the Configuration

\`\`\`java
public class Main {
    public static void main(String[] args) {
        ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
        
        StudentController controller = context.getBean("studentController", StudentController.class);
        controller.handleRequest(new Student("John", 20));
    }
}
\`\`\`

Spring reads the XML, creates beans, and injects dependencies.

---

## Setter Injection in XML

If your class uses setters instead of constructors:

\`\`\`java
public class StudentService {
    private StudentRepository repo;
    
    public void setRepository(StudentRepository repo) {
        this.repo = repo;
    }
}
\`\`\`

XML configuration:

\`\`\`xml
<bean id="studentService" class="com.example.StudentService">
    <property name="repository" ref="studentRepository"/>
</bean>
\`\`\`

\`<property>\` calls the setter method. \`name="repository"\` means it calls \`setRepository()\`.

---

## Injecting Primitive Values

You can inject primitive values (String, int, etc.):

\`\`\`java
public class DatabaseConfig {
    private String url;
    private String username;
    private String password;
    
    public DatabaseConfig(String url, String username, String password) {
        this.url = url;
        this.username = username;
        this.password = password;
    }
}
\`\`\`

XML:

\`\`\`xml
<bean id="dbConfig" class="com.example.DatabaseConfig">
    <constructor-arg value="jdbc:mysql://localhost:3306/mydb"/>
    <constructor-arg value="root"/>
    <constructor-arg value="password123"/>
</bean>
\`\`\`

\`value\` is for primitives, \`ref\` is for beans.

---

## Injecting Collections

You can inject lists, sets, and maps:

\`\`\`java
public class ProductService {
    private List<String> categories;
    
    public void setCategories(List<String> categories) {
        this.categories = categories;
    }
}
\`\`\`

XML:

\`\`\`xml
<bean id="productService" class="com.example.ProductService">
    <property name="categories">
        <list>
            <value>Electronics</value>
            <value>Clothing</value>
            <value>Books</value>
        </list>
    </property>
</bean>
\`\`\`

---

## Bean Scope in XML

By default, beans are singletons. You can change this:

\`\`\`xml
<!-- Singleton (default) -->
<bean id="studentService" class="com.example.StudentService" scope="singleton"/>

<!-- Prototype (new instance every time) -->
<bean id="studentService" class="com.example.StudentService" scope="prototype"/>
\`\`\`

---

## Real Example: E-Commerce Configuration

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
                           http://www.springframework.org/schema/beans/spring-beans.xsd">

    <!-- Database Configuration -->
    <bean id="dataSource" class="com.example.DataSource">
        <constructor-arg value="jdbc:mysql://localhost:3306/shop"/>
        <constructor-arg value="root"/>
        <constructor-arg value="password"/>
    </bean>

    <!-- Repository -->
    <bean id="productRepository" class="com.example.ProductRepository">
        <constructor-arg ref="dataSource"/>
    </bean>

    <!-- Service -->
    <bean id="productService" class="com.example.ProductService">
        <constructor-arg ref="productRepository"/>
    </bean>

    <!-- Controller -->
    <bean id="productController" class="com.example.ProductController">
        <constructor-arg ref="productService"/>
    </bean>

</beans>
\`\`\`

---

## Multiple XML Files

For large applications, split configuration into multiple files:

\`\`\`xml
<!-- applicationContext.xml -->
<beans>
    <import resource="repository-config.xml"/>
    <import resource="service-config.xml"/>
    <import resource="controller-config.xml"/>
</beans>
\`\`\`

---

## Loading XML Configuration

### In Standalone Application

\`\`\`java
ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
\`\`\`

### In Web Application (web.xml)

\`\`\`xml
<context-param>
    <param-name>contextConfigLocation</param-name>
    <param-value>classpath:applicationContext.xml</param-value>
</context-param>

<listener>
    <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
</listener>
\`\`\`

---

## XML vs Annotations

| XML Configuration | Annotation Configuration |
|-------------------|--------------------------|
| Separate from code | Mixed with code |
| No recompilation needed | Requires recompilation |
| Verbose | Concise |
| Centralized | Scattered |
| Traditional | Modern |

Most new projects use annotations, but XML is still common in enterprise applications.

---

## Common Mistakes

**Mistake 1: Wrong class path**
\`\`\`xml
<!-- Wrong -->
<bean id="service" class="StudentService"/>

<!-- Right - Full package name -->
<bean id="service" class="com.example.StudentService"/>
\`\`\`

**Mistake 2: Circular dependencies**
\`\`\`xml
<bean id="serviceA" class="com.example.ServiceA">
    <constructor-arg ref="serviceB"/>
</bean>

<bean id="serviceB" class="com.example.ServiceB">
    <constructor-arg ref="serviceA"/>  <!-- Circular! -->
</bean>
\`\`\`

**Mistake 3: Wrong property name**
\`\`\`xml
<!-- Wrong - property name must match setter -->
<bean id="service" class="com.example.StudentService">
    <property name="repo" ref="repository"/>  <!-- Calls setRepo() -->
</bean>
\`\`\`

---

## What's Next?

Now that you understand XML configuration, let's learn:

1. **Annotation Configuration** - The modern way (easier and cleaner)
2. **Spring MVC** - Using Spring for web applications

> **Key Takeaway:** XML configuration lets you define beans and their dependencies in XML files. Spring reads the XML, creates beans, and wires them together. It's the traditional way, but annotations are more popular now.
`,
  code: `// XML Configuration Demo
// Understanding how to configure Spring with XML

public class XMLConfigurationDemo {
    public static void main(String[] args) {
        System.out.println("=== XML CONFIGURATION ===");
        System.out.println();
        
        // What is XML configuration?
        System.out.println("WHAT IS XML CONFIGURATION?");
        System.out.println("--------------------------");
        System.out.println("XML configuration separates config from code");
        System.out.println("You define beans and dependencies in XML file");
        System.out.println("Spring reads XML and creates beans");
        System.out.println();
        
        // Basic structure
        System.out.println("BASIC XML STRUCTURE:");
        System.out.println("--------------------");
        System.out.println("<?xml version=\\"1.0\\" encoding=\\"UTF-8\\"?>");
        System.out.println("<beans xmlns=\\"http://www.springframework.org/schema/beans\\">");
        System.out.println("    <!-- Define beans here -->");
        System.out.println("</beans>");
        System.out.println();
        
        // Defining beans
        System.out.println("DEFINING BEANS:");
        System.out.println("---------------");
        System.out.println("Simple bean:");
        System.out.println("  <bean id=\\"repo\\" class=\\"com.example.StudentRepository\\"/>");
        System.out.println();
        System.out.println("Bean with constructor injection:");
        System.out.println("  <bean id=\\"service\\" class=\\"com.example.StudentService\\">");
        System.out.println("      <constructor-arg ref=\\"repo\\"/>");
        System.out.println("  </bean>");
        System.out.println();
        System.out.println("Bean with setter injection:");
        System.out.println("  <bean id=\\"service\\" class=\\"com.example.StudentService\\">");
        System.out.println("      <property name=\\"repository\\" ref=\\"repo\\"/>");
        System.out.println("  </bean>");
        System.out.println();
        
        // Injecting values
        System.out.println("INJECTING VALUES:");
        System.out.println("-----------------");
        System.out.println("Primitive values:");
        System.out.println("  <constructor-arg value=\\"jdbc:mysql://localhost:3306/db\\"/>");
        System.out.println();
        System.out.println("Bean references:");
        System.out.println("  <constructor-arg ref=\\"studentRepository\\"/>");
        System.out.println();
        
        // Example
        System.out.println("COMPLETE EXAMPLE:");
        System.out.println("----------------");
        System.out.println("applicationContext.xml:");
        System.out.println("  <bean id=\\"repo\\" class=\\"com.example.StudentRepository\\"/>");
        System.out.println("  <bean id=\\"service\\" class=\\"com.example.StudentService\\">");
        System.out.println("      <constructor-arg ref=\\"repo\\"/>");
        System.out.println("  </bean>");
        System.out.println();
        System.out.println("Java code:");
        System.out.println("  ApplicationContext context = ");
        System.out.println("      new ClassPathXmlApplicationContext(\\"applicationContext.xml\\");");
        System.out.println("  StudentService service = context.getBean(\\"service\\", StudentService.class);");
        System.out.println();
        
        // Benefits
        System.out.println("BENEFITS:");
        System.out.println("---------");
        System.out.println("1. Configuration separate from code");
        System.out.println("2. No recompilation needed to change config");
        System.out.println("3. Centralized configuration");
        System.out.println();
        
        // When to use
        System.out.println("WHEN TO USE XML:");
        System.out.println("----------------");
        System.out.println("- Legacy applications");
        System.out.println("- When config needs to change without recompiling");
        System.out.println("- Team prefers XML");
        System.out.println();
        System.out.println("Most new projects use annotations (easier)");
    }
}`,
  practiceQuestions: [
    {
      question: 'Create an XML configuration file for a service with repository dependency',
      hint: 'Use <bean> tag with id and class, then use <constructor-arg> or <property> for injection',
      starterCode: `<!-- Create applicationContext.xml -->
<!-- Define a repository bean -->
<!-- Define a service bean that depends on repository -->
<!-- Use constructor injection -->

<!-- Example structure:
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
                           http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="studentRepository" class="com.example.StudentRepository"/>
    
    <bean id="studentService" class="com.example.StudentService">
        <constructor-arg ref="studentRepository"/>
    </bean>

</beans>
-->`
    }
  ]
};

export default springConfigurationXML;

