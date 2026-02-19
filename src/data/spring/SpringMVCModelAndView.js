const springMVCModelAndView = {
  id: 'spring-mvc-modelandview',
  title: 'Spring MVC ModelAndView',
  description: 'Using ModelAndView to pass data and specify views',
  content: `
# ModelAndView - Passing Data and Views Together

ModelAndView is a class that combines model data and view name in one object. Instead of using Model parameter and returning a String, you can return ModelAndView.

---

## What is ModelAndView?

ModelAndView is a container that holds:
1. **Model** - Data to pass to the view
2. **View** - View name to render

It's an alternative to using Model parameter and returning a String.

---

## ModelAndView vs Model + String

### Using Model Parameter (What We Learned Before)

\`\`\`java
@GetMapping("/students")
public String showStudents(Model model) {
    List<Student> students = service.getAllStudents();
    model.addAttribute("students", students);
    return "students";  // View name
}
\`\`\`

### Using ModelAndView (Alternative)

\`\`\`java
@GetMapping("/students")
public ModelAndView showStudents() {
    List<Student> students = service.getAllStudents();
    ModelAndView mav = new ModelAndView();
    mav.addObject("students", students);
    mav.setViewName("students");
    return mav;
}
\`\`\`

Both do the same thing. ModelAndView is just another way to do it.

---

## Creating ModelAndView

### Method 1: Default Constructor

\`\`\`java
@GetMapping("/students")
public ModelAndView showStudents() {
    ModelAndView mav = new ModelAndView();
    mav.addObject("students", service.getAllStudents());
    mav.setViewName("students");
    return mav;
}
\`\`\`

### Method 2: Constructor with View Name

\`\`\`java
@GetMapping("/students")
public ModelAndView showStudents() {
    ModelAndView mav = new ModelAndView("students");  // View name in constructor
    mav.addObject("students", service.getAllStudents());
    return mav;
}
\`\`\`

### Method 3: Constructor with View Name and Model

\`\`\`java
@GetMapping("/students")
public ModelAndView showStudents() {
    Model model = new ModelMap();
    model.addAttribute("students", service.getAllStudents());
    ModelAndView mav = new ModelAndView("students", model);
    return mav;
}
\`\`\`

---

## Adding Objects to ModelAndView

Use \`addObject()\` to add data:

\`\`\`java
@GetMapping("/student/{id}")
public ModelAndView showStudent(@PathVariable int id) {
    Student student = service.getStudent(id);
    ModelAndView mav = new ModelAndView("student");
    mav.addObject("student", student);
    mav.addObject("title", "Student Details");
    mav.addObject("pageTitle", "View Student");
    return mav;
}
\`\`\`

In the view, access them as:
- \`\${student}\`
- \`\${title}\`
- \`\${pageTitle}\`

---

## Real-Time Example: Student Management

Let's see ModelAndView in a complete example:

\`\`\`java
@Controller
@RequestMapping("/student")
public class StudentController {
    @Autowired
    private StudentService service;
    
    // List all students
    @GetMapping("/list")
    public ModelAndView listStudents() {
        List<Student> students = service.getAllStudents();
        ModelAndView mav = new ModelAndView("student-list");
        mav.addObject("students", students);
        mav.addObject("title", "Student List");
        mav.addObject("count", students.size());
        return mav;
    }
    
    // Show student form
    @GetMapping("/add")
    public ModelAndView showAddForm() {
        ModelAndView mav = new ModelAndView("student-form");
        mav.addObject("student", new Student());
        mav.addObject("title", "Add Student");
        mav.addObject("action", "save");
        return mav;
    }
    
    // Show student details
    @GetMapping("/{id}")
    public ModelAndView showStudent(@PathVariable int id) {
        Student student = service.getStudent(id);
        if (student == null) {
            ModelAndView mav = new ModelAndView("error");
            mav.addObject("message", "Student not found");
            return mav;
        }
        ModelAndView mav = new ModelAndView("student-detail");
        mav.addObject("student", student);
        mav.addObject("title", "Student Details");
        return mav;
    }
    
    // Save student
    @PostMapping("/save")
    public ModelAndView saveStudent(@ModelAttribute Student student) {
        service.saveStudent(student);
        ModelAndView mav = new ModelAndView("redirect:/student/list");
        mav.addObject("message", "Student saved successfully");
        return mav;
    }
}
\`\`\`

---

## Adding Multiple Objects

You can add multiple objects:

\`\`\`java
@GetMapping("/dashboard")
public ModelAndView showDashboard() {
    ModelAndView mav = new ModelAndView("dashboard");
    mav.addObject("students", service.getAllStudents());
    mav.addObject("courses", courseService.getAllCourses());
    mav.addObject("teachers", teacherService.getAllTeachers());
    mav.addObject("stats", statsService.getStatistics());
    return mav;
}
\`\`\`

All objects are available in the view.

---

## Redirecting with ModelAndView

You can redirect:

\`\`\`java
@PostMapping("/save")
public ModelAndView saveStudent(@ModelAttribute Student student) {
    service.saveStudent(student);
    ModelAndView mav = new ModelAndView("redirect:/student/list");
    return mav;
}
\`\`\`

Use "redirect:" prefix, just like with String return type.

---

## Forwarding with ModelAndView

You can forward:

\`\`\`java
@GetMapping("/forward")
public ModelAndView forwardExample() {
    ModelAndView mav = new ModelAndView("forward:/another-url");
    return mav;
}
\`\`\`

---

## When to Use ModelAndView vs Model

**Use ModelAndView when:**
- You want to return both model and view in one object
- You're building the model conditionally
- You prefer explicit object creation

**Use Model parameter when:**
- Simpler is better
- You just need to add a few attributes
- You prefer the cleaner syntax

Both work the same. It's a matter of preference. Most developers use Model parameter because it's simpler.

---

## Real Example: Login System

\`\`\`java
@Controller
public class LoginController {
    @Autowired
    private LoginService loginService;
    
    // Show login form
    @GetMapping("/login")
    public ModelAndView showLoginForm() {
        ModelAndView mav = new ModelAndView("login");
        mav.addObject("loginForm", new LoginForm());
        return mav;
    }
    
    // Process login
    @PostMapping("/login")
    public ModelAndView processLogin(@ModelAttribute LoginForm loginForm, HttpSession session) {
        boolean isValid = loginService.validate(
            loginForm.getUsername(), 
            loginForm.getPassword()
        );
        
        if (isValid) {
            session.setAttribute("user", loginForm.getUsername());
            ModelAndView mav = new ModelAndView("redirect:/dashboard");
            return mav;
        } else {
            ModelAndView mav = new ModelAndView("login");
            mav.addObject("error", "Invalid username or password");
            mav.addObject("loginForm", loginForm);
            return mav;
        }
    }
}
\`\`\`

---

## ModelAndView with Map

You can use a Map to add multiple objects at once:

\`\`\`java
@GetMapping("/dashboard")
public ModelAndView showDashboard() {
    Map<String, Object> model = new HashMap<>();
    model.put("students", service.getAllStudents());
    model.put("courses", courseService.getAllCourses());
    model.put("title", "Dashboard");
    
    ModelAndView mav = new ModelAndView("dashboard", model);
    return mav;
}
\`\`\`

---

## Common Mistakes

**Mistake 1: Forgetting to set view name**
\`\`\`java
// Wrong - No view name set
@GetMapping("/students")
public ModelAndView showStudents() {
    ModelAndView mav = new ModelAndView();
    mav.addObject("students", service.getAllStudents());
    // Missing setViewName()
    return mav;
}

// Right
@GetMapping("/students")
public ModelAndView showStudents() {
    ModelAndView mav = new ModelAndView("students");
    mav.addObject("students", service.getAllStudents());
    return mav;
}
\`\`\`

**Mistake 2: Using wrong method name**
\`\`\`java
// Wrong - addAttribute is for Model, not ModelAndView
mav.addAttribute("students", students);

// Right - Use addObject
mav.addObject("students", students);
\`\`\`

---

## What's Next?

Now that you understand ModelAndView, you're ready to build a complete project. Let's create:

1. **Login System** - User authentication
2. **Student CRUD** - Create, Read, Update, Delete operations

> **Key Takeaway:** ModelAndView is an alternative to using Model parameter and returning String. It combines model data and view name in one object. Use it when you prefer explicit object creation, or stick with Model parameter for simpler code. Both work the same way.
`,
  code: `// ModelAndView Demo
// Understanding how to use ModelAndView

public class ModelAndViewDemo {
    public static void main(String[] args) {
        System.out.println("=== MODELANDVIEW ===");
        System.out.println();
        
        // What is ModelAndView?
        System.out.println("WHAT IS MODELANDVIEW?");
        System.out.println("---------------------");
        System.out.println("Container that holds model data and view name");
        System.out.println("Alternative to Model parameter + String return");
        System.out.println();
        
        // Comparison
        System.out.println("MODEL PARAMETER (What we learned before):");
        System.out.println("------------------------------------------");
        System.out.println("@GetMapping(\\"/students\\")");
        System.out.println("public String showStudents(Model model) {");
        System.out.println("    model.addAttribute(\\"students\\", students);");
        System.out.println("    return \\"students\\";");
        System.out.println("}");
        System.out.println();
        
        System.out.println("MODELANDVIEW (Alternative):");
        System.out.println("----------------------------");
        System.out.println("@GetMapping(\\"/students\\")");
        System.out.println("public ModelAndView showStudents() {");
        System.out.println("    ModelAndView mav = new ModelAndView();");
        System.out.println("    mav.addObject(\\"students\\", students);");
        System.out.println("    mav.setViewName(\\"students\\");");
        System.out.println("    return mav;");
        System.out.println("}");
        System.out.println();
        
        // Creating ModelAndView
        System.out.println("CREATING MODELANDVIEW:");
        System.out.println("----------------------");
        System.out.println("Method 1: Default constructor");
        System.out.println("  ModelAndView mav = new ModelAndView();");
        System.out.println("  mav.setViewName(\\"students\\");");
        System.out.println();
        System.out.println("Method 2: Constructor with view name");
        System.out.println("  ModelAndView mav = new ModelAndView(\\"students\\");");
        System.out.println();
        System.out.println("Method 3: Constructor with view and model");
        System.out.println("  ModelAndView mav = new ModelAndView(\\"students\\", model);");
        System.out.println();
        
        // Adding objects
        System.out.println("ADDING OBJECTS:");
        System.out.println("---------------");
        System.out.println("ModelAndView mav = new ModelAndView(\\"student\\");");
        System.out.println("mav.addObject(\\"student\\", student);");
        System.out.println("mav.addObject(\\"title\\", \\"Student Details\\");");
        System.out.println();
        
        // Example
        System.out.println("COMPLETE EXAMPLE:");
        System.out.println("----------------");
        System.out.println("@GetMapping(\\"/student/{id}\\")");
        System.out.println("public ModelAndView showStudent(@PathVariable int id) {");
        System.out.println("    Student student = service.getStudent(id);");
        System.out.println("    ModelAndView mav = new ModelAndView(\\"student\\");");
        System.out.println("    mav.addObject(\\"student\\", student);");
        System.out.println("    mav.addObject(\\"title\\", \\"Student Details\\");");
        System.out.println("    return mav;");
        System.out.println("}");
        System.out.println();
        
        // Redirect
        System.out.println("REDIRECTING:");
        System.out.println("------------");
        System.out.println("ModelAndView mav = new ModelAndView(\\"redirect:/students\\");");
        System.out.println();
        
        // When to use
        System.out.println("WHEN TO USE:");
        System.out.println("------------");
        System.out.println("ModelAndView: When you prefer explicit object creation");
        System.out.println("Model parameter: When you want simpler code");
        System.out.println("Both work the same - it's a matter of preference");
    }
}`,
  practiceQuestions: [
    {
      question: 'Create controller methods using ModelAndView to display and save students',
      hint: 'Use ModelAndView constructor, addObject() to add data, and setViewName() or constructor for view name',
      starterCode: `@Controller
@RequestMapping("/student")
public class StudentController {
    @Autowired
    private StudentService service;
    
    // List all students using ModelAndView
    // Create ModelAndView with view name "student-list"
    // Add students list to model
    // Add title to model
    // Return ModelAndView
    
    // Show student by ID using ModelAndView
    // Get id from @PathVariable
    // Get student from service
    // Create ModelAndView with view name "student-detail"
    // Add student to model
    // Return ModelAndView
    
    // Save student and redirect
    // Use @ModelAttribute to bind form data
    // Save using service
    // Create ModelAndView with redirect view
    // Return ModelAndView
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

export default springMVCModelAndView;

