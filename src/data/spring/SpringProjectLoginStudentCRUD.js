const springProjectLoginStudentCRUD = {
  id: 'spring-project-login-student-crud',
  title: 'Spring Project - Login + Student CRUD',
  description: 'Building a complete Spring MVC application with login and student management',
  content: `
# Complete Spring Project - Login + Student CRUD

Let's build a complete Spring MVC application from scratch. We'll create a login system and a student management system with full CRUD operations.

---

## Project Structure

Here's what we'll build:

\`\`\`
src/
  main/
    java/
      com/example/
        controller/
          LoginController.java
          StudentController.java
        service/
          LoginService.java
          StudentService.java
        repository/
          StudentRepository.java
        model/
          User.java
          Student.java
        config/
          SpringMvcConfig.java
    webapp/
      WEB-INF/
        views/
          login.jsp
          dashboard.jsp
          student-list.jsp
          student-form.jsp
          student-detail.jsp
        web.xml
    resources/
      application.properties
\`\`\`

---

## Step 1: Project Setup

### Maven Dependencies (pom.xml)

\`\`\`xml
<dependencies>
    <!-- Spring MVC -->
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-webmvc</artifactId>
        <version>5.3.21</version>
    </dependency>
    
    <!-- JSP Support -->
    <dependency>
        <groupId>javax.servlet</groupId>
        <artifactId>jstl</artifactId>
        <version>1.2</version>
    </dependency>
    
    <!-- JSP API -->
    <dependency>
        <groupId>javax.servlet.jsp</groupId>
        <artifactId>javax.servlet.jsp-api</artifactId>
        <version>2.3.3</version>
    </dependency>
    
    <!-- Servlet API -->
    <dependency>
        <groupId>javax.servlet</groupId>
        <artifactId>javax.servlet-api</artifactId>
        <version>4.0.1</version>
        <scope>provided</scope>
    </dependency>
</dependencies>
\`\`\`

---

## Step 2: Model Classes

### User.java

\`\`\`java
package com.example.model;

public class User {
    private String username;
    private String password;
    
    public User() {}
    
    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }
    
    // Getters and setters
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
\`\`\`

### Student.java

\`\`\`java
package com.example.model;

public class Student {
    private int id;
    private String name;
    private int age;
    private String email;
    
    public Student() {}
    
    public Student(String name, int age, String email) {
        this.name = name;
        this.age = age;
        this.email = email;
    }
    
    // Getters and setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
\`\`\`

---

## Step 3: Repository Layer

### StudentRepository.java

\`\`\`java
package com.example.repository;

import com.example.model.Student;
import org.springframework.stereotype.Repository;
import java.util.*;

@Repository
public class StudentRepository {
    private Map<Integer, Student> students = new HashMap<>();
    private int nextId = 1;
    
    public List<Student> findAll() {
        return new ArrayList<>(students.values());
    }
    
    public Student findById(int id) {
        return students.get(id);
    }
    
    public void save(Student student) {
        if (student.getId() == 0) {
            student.setId(nextId++);
        }
        students.put(student.getId(), student);
    }
    
    public void delete(int id) {
        students.remove(id);
    }
}
\`\`\`

---

## Step 4: Service Layer

### LoginService.java

\`\`\`java
package com.example.service;

import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class LoginService {
    // In real app, this would check database
    private Map<String, String> users = new HashMap<>();
    
    public LoginService() {
        // Hardcoded users for demo
        users.put("admin", "admin123");
        users.put("user", "user123");
    }
    
    public boolean validate(String username, String password) {
        String storedPassword = users.get(username);
        return storedPassword != null && storedPassword.equals(password);
    }
}
\`\`\`

### StudentService.java

\`\`\`java
package com.example.service;

import com.example.model.Student;
import com.example.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class StudentService {
    @Autowired
    private StudentRepository repository;
    
    public List<Student> getAllStudents() {
        return repository.findAll();
    }
    
    public Student getStudent(int id) {
        return repository.findById(id);
    }
    
    public void saveStudent(Student student) {
        repository.save(student);
    }
    
    public void deleteStudent(int id) {
        repository.delete(id);
    }
}
\`\`\`

---

## Step 5: Controller Layer

### LoginController.java

\`\`\`java
package com.example.controller;

import com.example.model.User;
import com.example.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import javax.servlet.http.HttpSession;

@Controller
public class LoginController {
    @Autowired
    private LoginService loginService;
    
    @GetMapping("/login")
    public ModelAndView showLoginForm() {
        ModelAndView mav = new ModelAndView("login");
        mav.addObject("user", new User());
        return mav;
    }
    
    @PostMapping("/login")
    public ModelAndView processLogin(
            @ModelAttribute User user,
            HttpSession session) {
        
        boolean isValid = loginService.validate(user.getUsername(), user.getPassword());
        
        if (isValid) {
            session.setAttribute("username", user.getUsername());
            return new ModelAndView("redirect:/dashboard");
        } else {
            ModelAndView mav = new ModelAndView("login");
            mav.addObject("error", "Invalid username or password");
            mav.addObject("user", user);
            return mav;
        }
    }
    
    @GetMapping("/logout")
    public ModelAndView logout(HttpSession session) {
        session.invalidate();
        return new ModelAndView("redirect:/login");
    }
}
\`\`\`

### StudentController.java

\`\`\`java
package com.example.controller;

import com.example.model.Student;
import com.example.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/student")
public class StudentController {
    @Autowired
    private StudentService studentService;
    
    @GetMapping("/list")
    public ModelAndView listStudents(HttpSession session) {
        if (session.getAttribute("username") == null) {
            return new ModelAndView("redirect:/login");
        }
        
        ModelAndView mav = new ModelAndView("student-list");
        mav.addObject("students", studentService.getAllStudents());
        mav.addObject("username", session.getAttribute("username"));
        return mav;
    }
    
    @GetMapping("/add")
    public ModelAndView showAddForm(HttpSession session) {
        if (session.getAttribute("username") == null) {
            return new ModelAndView("redirect:/login");
        }
        
        ModelAndView mav = new ModelAndView("student-form");
        mav.addObject("student", new Student());
        mav.addObject("action", "save");
        return mav;
    }
    
    @PostMapping("/save")
    public ModelAndView saveStudent(@ModelAttribute Student student, HttpSession session) {
        if (session.getAttribute("username") == null) {
            return new ModelAndView("redirect:/login");
        }
        
        studentService.saveStudent(student);
        return new ModelAndView("redirect:/student/list");
    }
    
    @GetMapping("/{id}")
    public ModelAndView showStudent(@PathVariable int id, HttpSession session) {
        if (session.getAttribute("username") == null) {
            return new ModelAndView("redirect:/login");
        }
        
        Student student = studentService.getStudent(id);
        if (student == null) {
            return new ModelAndView("redirect:/student/list");
        }
        
        ModelAndView mav = new ModelAndView("student-detail");
        mav.addObject("student", student);
        return mav;
    }
    
    @GetMapping("/edit/{id}")
    public ModelAndView showEditForm(@PathVariable int id, HttpSession session) {
        if (session.getAttribute("username") == null) {
            return new ModelAndView("redirect:/login");
        }
        
        Student student = studentService.getStudent(id);
        ModelAndView mav = new ModelAndView("student-form");
        mav.addObject("student", student);
        mav.addObject("action", "update");
        return mav;
    }
    
    @PostMapping("/update")
    public ModelAndView updateStudent(@ModelAttribute Student student, HttpSession session) {
        if (session.getAttribute("username") == null) {
            return new ModelAndView("redirect:/login");
        }
        
        studentService.saveStudent(student);
        return new ModelAndView("redirect:/student/list");
    }
    
    @GetMapping("/delete/{id}")
    public ModelAndView deleteStudent(@PathVariable int id, HttpSession session) {
        if (session.getAttribute("username") == null) {
            return new ModelAndView("redirect:/login");
        }
        
        studentService.deleteStudent(id);
        return new ModelAndView("redirect:/student/list");
    }
}
\`\`\`

---

## Step 6: Configuration

### SpringMvcConfig.java

\`\`\`java
package com.example.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

@Configuration
@EnableWebMvc
@ComponentScan("com.example")
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

### WebAppInitializer.java

\`\`\`java
package com.example.config;

import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

public class WebAppInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {
    @Override
    protected Class<?>[] getRootConfigClasses() {
        return null;
    }
    
    @Override
    protected Class<?>[] getServletConfigClasses() {
        return new Class[]{SpringMvcConfig.class};
    }
    
    @Override
    protected String[] getServletMappings() {
        return new String[]{"/"};
    }
}
\`\`\`

---

## Step 7: JSP Views

### login.jsp

\`\`\`jsp
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>Login</title>
</head>
<body>
    <h1>Login</h1>
    <c:if test="\${not empty error}">
        <p style="color: red;">\${error}</p>
    </c:if>
    <form action="/login" method="post">
        <label>Username:</label>
        <input type="text" name="username" value="\${user.username}" required/><br/>
        <label>Password:</label>
        <input type="password" name="password" required/><br/>
        <button type="submit">Login</button>
    </form>
</body>
</html>
\`\`\`

### dashboard.jsp

\`\`\`jsp
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>Dashboard</title>
</head>
<body>
    <h1>Welcome, \${username}!</h1>
    <a href="/student/list">Manage Students</a> | 
    <a href="/logout">Logout</a>
</body>
</html>
\`\`\`

### student-list.jsp

\`\`\`jsp
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <title>Student List</title>
</head>
<body>
    <h1>Student List</h1>
    <p>Welcome, \${username} | <a href="/logout">Logout</a></p>
    <a href="/student/add">Add New Student</a>
    <table border="1">
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Actions</th>
        </tr>
        <c:forEach items="\${students}" var="student">
            <tr>
                <td>\${student.id}</td>
                <td>\${student.name}</td>
                <td>\${student.age}</td>
                <td>\${student.email}</td>
                <td>
                    <a href="/student/\${student.id}">View</a> |
                    <a href="/student/edit/\${student.id}">Edit</a> |
                    <a href="/student/delete/\${student.id}">Delete</a>
                </td>
            </tr>
        </c:forEach>
    </table>
</body>
</html>
\`\`\`

### student-form.jsp

\`\`\`jsp
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>Student Form</title>
</head>
<body>
    <h1>\${action == 'save' ? 'Add' : 'Edit'} Student</h1>
    <form action="/student/\${action}" method="post">
        <input type="hidden" name="id" value="\${student.id}"/>
        <label>Name:</label>
        <input type="text" name="name" value="\${student.name}" required/><br/>
        <label>Age:</label>
        <input type="number" name="age" value="\${student.age}" required/><br/>
        <label>Email:</label>
        <input type="email" name="email" value="\${student.email}" required/><br/>
        <button type="submit">Save</button>
        <a href="/student/list">Cancel</a>
    </form>
</body>
</html>
\`\`\`

### student-detail.jsp

\`\`\`jsp
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>Student Details</title>
</head>
<body>
    <h1>Student Details</h1>
    <p><strong>ID:</strong> \${student.id}</p>
    <p><strong>Name:</strong> \${student.name}</p>
    <p><strong>Age:</strong> \${student.age}</p>
    <p><strong>Email:</strong> \${student.email}</p>
    <a href="/student/edit/\${student.id}">Edit</a> |
    <a href="/student/list">Back to List</a>
</body>
</html>
\`\`\`

---

## Step 8: Running the Application

1. Deploy to Tomcat server
2. Access: http://localhost:8080/login
3. Login with:
   - Username: admin, Password: admin123
   - Username: user, Password: user123
4. After login, you'll see the dashboard
5. Click "Manage Students" to access CRUD operations

---

## Features Implemented

1. **Login System**
   - Login form
   - Session management
   - Logout functionality
   - Protected routes

2. **Student CRUD**
   - List all students
   - Add new student
   - View student details
   - Edit student
   - Delete student

3. **Spring MVC Features**
   - DispatcherServlet configuration
   - Controller mapping
   - View resolution
   - Model binding
   - Session management

---

## What You Learned

This project demonstrates:
- Complete Spring MVC setup
- IOC and Dependency Injection
- Controller handling requests
- Service layer business logic
- Repository layer data access
- View resolution with JSP
- Session management
- Form handling
- CRUD operations

You now have a working Spring MVC application!

> **Key Takeaway:** This complete project shows how all Spring concepts work together. You've built a real application with login, session management, and full CRUD operations. This is the foundation for building larger Spring applications.
`,
  code: `// Complete Spring Project Demo
// Login + Student CRUD Application

public class SpringProjectDemo {
    public static void main(String[] args) {
        System.out.println("=== COMPLETE SPRING PROJECT ===");
        System.out.println();
        
        System.out.println("PROJECT STRUCTURE:");
        System.out.println("------------------");
        System.out.println("src/main/java/com/example/");
        System.out.println("  controller/");
        System.out.println("    LoginController.java");
        System.out.println("    StudentController.java");
        System.out.println("  service/");
        System.out.println("    LoginService.java");
        System.out.println("    StudentService.java");
        System.out.println("  repository/");
        System.out.println("    StudentRepository.java");
        System.out.println("  model/");
        System.out.println("    User.java");
        System.out.println("    Student.java");
        System.out.println("  config/");
        System.out.println("    SpringMvcConfig.java");
        System.out.println();
        System.out.println("src/main/webapp/WEB-INF/views/");
        System.out.println("  login.jsp");
        System.out.println("  dashboard.jsp");
        System.out.println("  student-list.jsp");
        System.out.println("  student-form.jsp");
        System.out.println("  student-detail.jsp");
        System.out.println();
        
        System.out.println("FEATURES:");
        System.out.println("---------");
        System.out.println("1. Login System");
        System.out.println("   - Login form");
        System.out.println("   - Session management");
        System.out.println("   - Logout");
        System.out.println();
        System.out.println("2. Student CRUD");
        System.out.println("   - List students");
        System.out.println("   - Add student");
        System.out.println("   - View student");
        System.out.println("   - Edit student");
        System.out.println("   - Delete student");
        System.out.println();
        
        System.out.println("SPRING CONCEPTS USED:");
        System.out.println("--------------------");
        System.out.println("- IOC Container");
        System.out.println("- Dependency Injection");
        System.out.println("- @Controller, @Service, @Repository");
        System.out.println("- @Autowired");
        System.out.println("- DispatcherServlet");
        System.out.println("- ViewResolver");
        System.out.println("- ModelAndView");
        System.out.println("- @RequestMapping");
        System.out.println("- @ModelAttribute");
        System.out.println("- Session management");
        System.out.println();
        
        System.out.println("URL MAPPINGS:");
        System.out.println("-------------");
        System.out.println("GET  /login              - Show login form");
        System.out.println("POST /login              - Process login");
        System.out.println("GET  /logout              - Logout");
        System.out.println("GET  /dashboard          - Dashboard");
        System.out.println("GET  /student/list       - List students");
        System.out.println("GET  /student/add        - Show add form");
        System.out.println("POST /student/save       - Save student");
        System.out.println("GET  /student/{id}       - View student");
        System.out.println("GET  /student/edit/{id}  - Show edit form");
        System.out.println("POST /student/update     - Update student");
        System.out.println("GET  /student/delete/{id} - Delete student");
    }
}`,
  practiceQuestions: [
    {
      question: 'Build a complete Spring MVC application with login and student CRUD operations',
      hint: 'Create all layers: model, repository, service, controller, and JSP views',
      starterCode: `// This is a complete project - create all files as shown in the lesson
// Start with:
// 1. Model classes (User, Student)
// 2. Repository (StudentRepository)
// 3. Services (LoginService, StudentService)
// 4. Controllers (LoginController, StudentController)
// 5. Configuration (SpringMvcConfig, WebAppInitializer)
// 6. JSP views (login, dashboard, student-list, student-form, student-detail)

// Follow the complete structure from the lesson`
    }
  ]
};

export default springProjectLoginStudentCRUD;

