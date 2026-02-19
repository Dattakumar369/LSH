const springMVCController = {
  id: 'spring-mvc-controller',
  title: 'Spring MVC Controller',
  description: 'How to create controllers to handle web requests',
  content: `
# Spring MVC Controller

Controllers handle web requests in Spring MVC. They're the classes that process user input and return responses. Let's learn how to create them.

---

## What is a Controller?

A controller is a class that handles HTTP requests. It:
1. Receives requests from DispatcherServlet
2. Processes the request (maybe calls service layer)
3. Returns a response (view name or data)

Think of it as a waiter in a restaurant. The customer (browser) makes a request, the waiter (controller) takes it to the kitchen (service), and brings back the food (response).

---

## Creating a Controller

Mark a class with @Controller annotation:

\`\`\`java
@Controller
public class HomeController {
    @RequestMapping("/home")
    public String home() {
        return "home";  // Returns view name
    }
}
\`\`\`

That's it. Spring will:
1. Detect the @Controller annotation
2. Map /home URL to home() method
3. When user visits /home, call home()
4. Return "home" which resolves to home.jsp

---

## @RequestMapping - Mapping URLs

@RequestMapping maps URLs to controller methods:

### Basic Mapping

\`\`\`java
@Controller
public class StudentController {
    @RequestMapping("/students")
    public String showStudents() {
        return "students";
    }
}
\`\`\`

When user visits \`/students\`, this method is called.

### HTTP Methods

You can specify which HTTP methods to handle:

\`\`\`java
@RequestMapping(value = "/students", method = RequestMethod.GET)
public String showStudents() {
    return "students";
}

@RequestMapping(value = "/students", method = RequestMethod.POST)
public String saveStudent() {
    return "redirect:/students";
}
\`\`\`

Or use shortcuts:

\`\`\`java
@GetMapping("/students")
public String showStudents() {
    return "students";
}

@PostMapping("/students")
public String saveStudent() {
    return "redirect:/students";
}
\`\`\`

### Multiple URLs

\`\`\`java
@RequestMapping({"/students", "/student-list", "/all-students"})
public String showStudents() {
    return "students";
}
\`\`\`

All three URLs map to the same method.

---

## Getting Request Parameters

### Using @RequestParam

\`\`\`java
@GetMapping("/student")
public String showStudent(@RequestParam int id, Model model) {
    Student student = studentService.getStudent(id);
    model.addAttribute("student", student);
    return "student";
}
\`\`\`

URL: \`/student?id=123\`
Spring automatically extracts \`id\` parameter and passes it to the method.

### Optional Parameters

\`\`\`java
@GetMapping("/students")
public String showStudents(@RequestParam(required = false) String search, Model model) {
    List<Student> students;
    if (search != null) {
        students = studentService.searchStudents(search);
    } else {
        students = studentService.getAllStudents();
    }
    model.addAttribute("students", students);
    return "students";
}
\`\`\`

\`required = false\` makes the parameter optional.

### Default Values

\`\`\`java
@GetMapping("/students")
public String showStudents(@RequestParam(defaultValue = "1") int page, Model model) {
    // If page parameter not provided, defaults to 1
    List<Student> students = studentService.getStudents(page);
    model.addAttribute("students", students);
    return "students";
}
\`\`\`

---

## Path Variables

Use @PathVariable to get values from URL path:

\`\`\`java
@GetMapping("/student/{id}")
public String showStudent(@PathVariable int id, Model model) {
    Student student = studentService.getStudent(id);
    model.addAttribute("student", student);
    return "student";
}
\`\`\`

URL: \`/student/123\`
Spring extracts \`123\` and passes it as \`id\`.

### Multiple Path Variables

\`\`\`java
@GetMapping("/student/{studentId}/course/{courseId}")
public String showStudentCourse(
        @PathVariable int studentId,
        @PathVariable int courseId,
        Model model) {
    // Handle both path variables
    return "student-course";
}
\`\`\`

---

## Passing Data to Views

Use Model to pass data:

\`\`\`java
@GetMapping("/students")
public String showStudents(Model model) {
    List<Student> students = studentService.getAllStudents();
    model.addAttribute("students", students);  // Available in view as \${students}
    model.addAttribute("title", "Student List");  // Available as \${title}
    return "students";
}
\`\`\`

In JSP:
\`\`\`jsp
<h1>\${title}</h1>
<c:forEach items="\${students}" var="student">
    <p>\${student.name}</p>
</c:forEach>
\`\`\`

---

## Real-Time Example: Student Management

Let's build a complete controller:

\`\`\`java
@Controller
@RequestMapping("/student")
public class StudentController {
    @Autowired
    private StudentService service;
    
    // Show all students
    @GetMapping("/list")
    public String listStudents(Model model) {
        List<Student> students = service.getAllStudents();
        model.addAttribute("students", students);
        return "student-list";
    }
    
    // Show student form
    @GetMapping("/add")
    public String showAddForm(Model model) {
        model.addAttribute("student", new Student());
        return "student-form";
    }
    
    // Save student
    @PostMapping("/save")
    public String saveStudent(@ModelAttribute Student student) {
        service.saveStudent(student);
        return "redirect:/student/list";
    }
    
    // Show student by ID
    @GetMapping("/{id}")
    public String showStudent(@PathVariable int id, Model model) {
        Student student = service.getStudent(id);
        model.addAttribute("student", student);
        return "student-detail";
    }
    
    // Delete student
    @GetMapping("/delete/{id}")
    public String deleteStudent(@PathVariable int id) {
        service.deleteStudent(id);
        return "redirect:/student/list";
    }
}
\`\`\`

This controller handles:
- GET /student/list - Show all students
- GET /student/add - Show add form
- POST /student/save - Save student
- GET /student/{id} - Show student details
- GET /student/delete/{id} - Delete student

---

## @ModelAttribute - Binding Form Data

When you submit a form, @ModelAttribute binds form data to an object:

\`\`\`java
@PostMapping("/save")
public String saveStudent(@ModelAttribute Student student) {
    service.saveStudent(student);
    return "redirect:/student/list";
}
\`\`\`

If your form has:
\`\`\`html
<form action="/student/save" method="post">
    <input name="name" value="John"/>
    <input name="age" value="20"/>
    <button type="submit">Save</button>
</form>
\`\`\`

Spring automatically creates a Student object with name="John" and age=20.

---

## Redirecting

Use "redirect:" prefix to redirect:

\`\`\`java
@PostMapping("/save")
public String saveStudent(@ModelAttribute Student student) {
    service.saveStudent(student);
    return "redirect:/student/list";  // Redirects to /student/list
}
\`\`\`

This prevents duplicate form submissions.

---

## Real Example: Login Controller

\`\`\`java
@Controller
public class LoginController {
    @Autowired
    private LoginService loginService;
    
    // Show login form
    @GetMapping("/login")
    public String showLoginForm(Model model) {
        model.addAttribute("loginForm", new LoginForm());
        return "login";
    }
    
    // Process login
    @PostMapping("/login")
    public String processLogin(
            @ModelAttribute LoginForm loginForm,
            HttpSession session,
            Model model) {
        
        boolean isValid = loginService.validate(loginForm.getUsername(), loginForm.getPassword());
        
        if (isValid) {
            session.setAttribute("user", loginForm.getUsername());
            return "redirect:/dashboard";
        } else {
            model.addAttribute("error", "Invalid username or password");
            return "login";
        }
    }
    
    // Logout
    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/login";
    }
}
\`\`\`

---

## Exception Handling in Controllers

You can handle exceptions:

\`\`\`java
@Controller
public class StudentController {
    @GetMapping("/student/{id}")
    public String showStudent(@PathVariable int id, Model model) {
        try {
            Student student = service.getStudent(id);
            model.addAttribute("student", student);
            return "student";
        } catch (StudentNotFoundException e) {
            model.addAttribute("error", "Student not found");
            return "error";
        }
    }
}
\`\`\`

Or use @ExceptionHandler:

\`\`\`java
@Controller
public class StudentController {
    @ExceptionHandler(StudentNotFoundException.class)
    public String handleException(Model model) {
        model.addAttribute("error", "Student not found");
        return "error";
    }
}
\`\`\`

---

## Common Mistakes

**Mistake 1: Forgetting @Controller**
\`\`\`java
// Wrong - Spring won't recognize this as a controller
public class HomeController {
    @RequestMapping("/home")
    public String home() {
        return "home";
    }
}

// Right
@Controller
public class HomeController {
    @RequestMapping("/home")
    public String home() {
        return "home";
    }
}
\`\`\`

**Mistake 2: Wrong return type**
\`\`\`java
// Wrong - Returns actual string, not view name
@RequestMapping("/home")
public String home() {
    return "<h1>Home</h1>";  // This is HTML, not a view name
}

// Right - Returns view name
@RequestMapping("/home")
public String home() {
    return "home";  // Resolves to home.jsp
}
\`\`\`

**Mistake 3: Not using Model to pass data**
\`\`\`java
// Wrong - Data not available in view
@RequestMapping("/students")
public String showStudents() {
    List<Student> students = service.getAllStudents();
    return "students";  // students not available in view
}

// Right
@RequestMapping("/students")
public String showStudents(Model model) {
    List<Student> students = service.getAllStudents();
    model.addAttribute("students", students);
    return "students";
}
\`\`\`

---

## What's Next?

Now that you understand controllers, let's learn about:

1. **ViewResolver** - How views are resolved
2. **ModelAndView** - Another way to pass data
3. **Building a Complete Project** - Login + Student CRUD

> **Key Takeaway:** Controllers handle web requests. Use @Controller to mark a class, @RequestMapping to map URLs, and Model to pass data to views. It's that simple.
`,
  code: `// Spring MVC Controller Demo
// Understanding how controllers work

public class SpringMVCControllerDemo {
    public static void main(String[] args) {
        System.out.println("=== SPRING MVC CONTROLLER ===");
        System.out.println();
        
        // What is a controller?
        System.out.println("WHAT IS A CONTROLLER?");
        System.out.println("---------------------");
        System.out.println("A class that handles HTTP requests");
        System.out.println("Receives requests from DispatcherServlet");
        System.out.println("Processes request and returns response");
        System.out.println();
        
        // Creating a controller
        System.out.println("CREATING A CONTROLLER:");
        System.out.println("----------------------");
        System.out.println("@Controller");
        System.out.println("public class HomeController {");
        System.out.println("    @RequestMapping(\\"/home\\")");
        System.out.println("    public String home() {");
        System.out.println("        return \\"home\\";  // View name");
        System.out.println("    }");
        System.out.println("}");
        System.out.println();
        
        // Request mapping
        System.out.println("REQUEST MAPPING:");
        System.out.println("----------------");
        System.out.println("@RequestMapping(\\"/students\\")  // Maps URL");
        System.out.println("@GetMapping(\\"/students\\")      // GET only");
        System.out.println("@PostMapping(\\"/students\\")     // POST only");
        System.out.println();
        
        // Getting parameters
        System.out.println("GETTING REQUEST PARAMETERS:");
        System.out.println("--------------------------");
        System.out.println("@GetMapping(\\"/student\\")");
        System.out.println("public String showStudent(@RequestParam int id) {");
        System.out.println("    // id from ?id=123");
        System.out.println("}");
        System.out.println();
        System.out.println("@GetMapping(\\"/student/{id}\\")");
        System.out.println("public String showStudent(@PathVariable int id) {");
        System.out.println("    // id from /student/123");
        System.out.println("}");
        System.out.println();
        
        // Passing data
        System.out.println("PASSING DATA TO VIEWS:");
        System.out.println("----------------------");
        System.out.println("@GetMapping(\\"/students\\")");
        System.out.println("public String showStudents(Model model) {");
        System.out.println("    List<Student> students = service.getAllStudents();");
        System.out.println("    model.addAttribute(\\"students\\", students);");
        System.out.println("    return \\"students\\";");
        System.out.println("}");
        System.out.println();
        
        // Complete example
        System.out.println("COMPLETE EXAMPLE:");
        System.out.println("----------------");
        System.out.println("@Controller");
        System.out.println("public class StudentController {");
        System.out.println("    @Autowired");
        System.out.println("    private StudentService service;");
        System.out.println();
        System.out.println("    @GetMapping(\\"/students\\")");
        System.out.println("    public String listStudents(Model model) {");
        System.out.println("        model.addAttribute(\\"students\\", service.getAllStudents());");
        System.out.println("        return \\"students\\";");
        System.out.println("    }");
        System.out.println();
        System.out.println("    @PostMapping(\\"/save\\")");
        System.out.println("    public String saveStudent(@ModelAttribute Student student) {");
        System.out.println("        service.saveStudent(student);");
        System.out.println("        return \\"redirect:/students\\";");
        System.out.println("    }");
        System.out.println("}");
        System.out.println();
        
        // Common annotations
        System.out.println("COMMON ANNOTATIONS:");
        System.out.println("------------------");
        System.out.println("@Controller        - Marks class as controller");
        System.out.println("@RequestMapping    - Maps URL to method");
        System.out.println("@GetMapping         - Maps GET request");
        System.out.println("@PostMapping        - Maps POST request");
        System.out.println("@RequestParam       - Gets query parameter");
        System.out.println("@PathVariable       - Gets path variable");
        System.out.println("@ModelAttribute     - Binds form data");
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a controller with methods to list, add, and delete students',
      hint: 'Use @Controller, @GetMapping, @PostMapping, @RequestParam or @PathVariable, and Model',
      starterCode: `@Controller
@RequestMapping("/student")
public class StudentController {
    @Autowired
    private StudentService service;
    
    // List all students
    // Use @GetMapping("/list")
    // Add students to Model
    // Return view name
    
    // Show add form
    // Use @GetMapping("/add")
    // Add empty Student to Model
    // Return form view name
    
    // Save student
    // Use @PostMapping("/save")
    // Use @ModelAttribute to bind form data
    // Call service to save
    // Redirect to list page
    
    // Delete student
    // Use @GetMapping("/delete/{id}")
    // Use @PathVariable to get id
    // Call service to delete
    // Redirect to list page
}

// Student class
class Student {
    private int id;
    private String name;
    private int age;
    
    // Getters and setters
}`
    }
  ]
};

export default springMVCController;

