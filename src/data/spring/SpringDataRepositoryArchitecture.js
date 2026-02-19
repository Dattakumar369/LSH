const springDataRepositoryArchitecture = {
  id: 'spring-data-repository-architecture',
  title: 'Spring Data Repository Architecture',
  description: 'Understanding the repository pattern and Spring Data repository hierarchy',
  content: `
# Spring Data Repository Architecture

Understanding the repository architecture is crucial to mastering Spring Data. Let's dive deep into how repositories work and the different types available.

---

## What is Repository Pattern?

The Repository pattern is a design pattern that provides an abstraction layer between your business logic and data access layer. It acts as a collection of domain objects in memory.

**Benefits:**
- Separates business logic from data access
- Makes code testable (can use mock repositories)
- Provides a consistent interface
- Easy to switch data sources

---

## Spring Data Repository Hierarchy

Spring Data provides a hierarchy of repository interfaces:

\`\`\`
Repository (marker interface)
    ↓
CrudRepository (basic CRUD operations)
    ↓
PagingAndSortingRepository (adds pagination/sorting)
    ↓
JpaRepository (JPA-specific features)
\`\`\`

Let's understand each level.

---

## Level 1: Repository Interface

This is just a marker interface. It doesn't provide any methods, but marks your interface as a repository.

\`\`\`java
public interface StudentRepository extends Repository<Student, Integer> {
    // You define all methods yourself
    Student findById(int id);
    List<Student> findAll();
}
\`\`\`

You rarely use this directly. It's the base for other repository interfaces.

---

## Level 2: CrudRepository

Provides basic CRUD (Create, Read, Update, Delete) operations.

\`\`\`java
public interface CrudRepository<T, ID> extends Repository<T, ID> {
    <S extends T> S save(S entity);
    <S extends T> Iterable<S> saveAll(Iterable<S> entities);
    Optional<T> findById(ID id);
    boolean existsById(ID id);
    Iterable<T> findAll();
    Iterable<T> findAllById(Iterable<ID> ids);
    long count();
    void deleteById(ID id);
    void delete(T entity);
    void deleteAll(Iterable<? extends T> entities);
    void deleteAll();
}
\`\`\`

### Real Example

\`\`\`java
public interface StudentRepository extends CrudRepository<Student, Integer> {
    // All CRUD methods available automatically
}

@Service
public class StudentService {
    @Autowired
    private StudentRepository repository;
    
    public void saveStudent(Student student) {
        repository.save(student);  // Create or Update
    }
    
    public Student getStudent(int id) {
        return repository.findById(id).orElse(null);  // Read
    }
    
    public List<Student> getAllStudents() {
        return (List<Student>) repository.findAll();  // Read All
    }
    
    public void deleteStudent(int id) {
        repository.deleteById(id);  // Delete
    }
    
    public long getStudentCount() {
        return repository.count();  // Count
    }
}
\`\`\`

---

## Level 3: PagingAndSortingRepository

Extends CrudRepository and adds pagination and sorting capabilities.

\`\`\`java
public interface PagingAndSortingRepository<T, ID> extends CrudRepository<T, ID> {
    Iterable<T> findAll(Sort sort);
    Page<T> findAll(Pageable pageable);
}
\`\`\`

### Real Example: Pagination

\`\`\`java
public interface StudentRepository extends PagingAndSortingRepository<Student, Integer> {
    // Has all CrudRepository methods + pagination
}

@Service
public class StudentService {
    @Autowired
    private StudentRepository repository;
    
    // Get students with pagination
    public Page<Student> getStudents(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return repository.findAll(pageable);
    }
    
    // Get students sorted by name
    public List<Student> getStudentsSorted() {
        Sort sort = Sort.by("name").ascending();
        return (List<Student>) repository.findAll(sort);
    }
    
    // Get students sorted by age descending
    public List<Student> getStudentsByAge() {
        Sort sort = Sort.by("age").descending();
        return (List<Student>) repository.findAll(sort);
    }
    
    // Multiple sort criteria
    public List<Student> getStudentsSortedMultiple() {
        Sort sort = Sort.by("age").descending()
                       .and(Sort.by("name").ascending());
        return (List<Student>) repository.findAll(sort);
    }
}
\`\`\`

### Real Example: E-Commerce with Pagination

\`\`\`java
public interface ProductRepository extends PagingAndSortingRepository<Product, Long> {
}

@Controller
public class ProductController {
    @Autowired
    private ProductRepository repository;
    
    @GetMapping("/products")
    public String showProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            Model model) {
        
        Pageable pageable = PageRequest.of(page, size, Sort.by("name").ascending());
        Page<Product> productPage = repository.findAll(pageable);
        
        model.addAttribute("products", productPage.getContent());
        model.addAttribute("currentPage", page);
        model.addAttribute("totalPages", productPage.getTotalPages());
        model.addAttribute("totalItems", productPage.getTotalElements());
        
        return "products";
    }
}
\`\`\`

---

## Level 4: JpaRepository

Extends PagingAndSortingRepository and adds JPA-specific features like flush and batch operations.

\`\`\`java
public interface JpaRepository<T, ID> extends PagingAndSortingRepository<T, ID> {
    List<T> findAll();
    List<T> findAll(Sort sort);
    List<T> findAllById(Iterable<ID> ids);
    <S extends T> List<S> saveAll(Iterable<S> entities);
    void flush();
    <S extends T> S saveAndFlush(S entity);
    void deleteInBatch(Iterable<T> entities);
    void deleteAllInBatch();
    T getOne(ID id);
}
\`\`\`

### Key Differences from CrudRepository

1. **Returns List instead of Iterable** - More convenient
2. **flush()** - Forces database synchronization
3. **saveAndFlush()** - Saves and immediately flushes
4. **deleteInBatch()** - Efficient batch deletion
5. **getOne()** - Returns a proxy (lazy loading)

### Real Example

\`\`\`java
public interface StudentRepository extends JpaRepository<Student, Integer> {
    // Most commonly used
}

@Service
public class StudentService {
    @Autowired
    private StudentRepository repository;
    
    public void saveStudents(List<Student> students) {
        // Batch save - more efficient
        repository.saveAll(students);
        repository.flush();  // Ensure all saved
    }
    
    public void deleteMultiple(List<Student> students) {
        // Batch delete - more efficient than individual deletes
        repository.deleteInBatch(students);
    }
    
    public Student getStudentLazy(int id) {
        // Returns proxy, loads when accessed
        return repository.getOne(id);
    }
}
\`\`\`

---

## Repository Implementation

When you extend a repository interface, Spring Data automatically creates an implementation at runtime using proxies.

### How It Works

1. **You define interface:**
\`\`\`java
public interface StudentRepository extends JpaRepository<Student, Integer> {
    List<Student> findByName(String name);
}
\`\`\`

2. **Spring Data creates proxy:**
   - Analyzes method names
   - Generates implementation
   - Creates SQL queries
   - Handles transactions

3. **You use it:**
\`\`\`java
@Autowired
private StudentRepository repository;  // Spring injects the proxy
\`\`\`

You never write the implementation. Spring does it!

---

## Custom Repository Methods

You can add custom methods in three ways:

### Method 1: Query Methods (Naming Convention)

\`\`\`java
public interface StudentRepository extends JpaRepository<Student, Integer> {
    // Spring generates query from method name
    List<Student> findByName(String name);
    List<Student> findByAgeGreaterThan(int age);
    List<Student> findByNameAndAge(String name, int age);
}
\`\`\`

### Method 2: @Query Annotation

\`\`\`java
public interface StudentRepository extends JpaRepository<Student, Integer> {
    @Query("SELECT s FROM Student s WHERE s.age > ?1")
    List<Student> findStudentsOlderThan(int age);
    
    @Query(value = "SELECT * FROM students WHERE age BETWEEN ?1 AND ?2", nativeQuery = true)
    List<Student> findStudentsByAgeRange(int minAge, int maxAge);
}
\`\`\`

### Method 3: Custom Implementation

\`\`\`java
// Interface
public interface StudentRepositoryCustom {
    List<Student> findComplexQuery();
}

// Implementation
public class StudentRepositoryImpl implements StudentRepositoryCustom {
    @PersistenceContext
    private EntityManager entityManager;
    
    public List<Student> findComplexQuery() {
        // Your custom implementation
        return entityManager.createQuery("...").getResultList();
    }
}

// Main repository
public interface StudentRepository extends JpaRepository<Student, Integer>, StudentRepositoryCustom {
}
\`\`\`

---

## Real Example: Complete Repository

\`\`\`java
@Entity
public class Student {
    @Id
    @GeneratedValue
    private Integer id;
    private String name;
    private int age;
    private String email;
    private String department;
    // getters, setters
}

public interface StudentRepository extends JpaRepository<Student, Integer> {
    // Query methods
    List<Student> findByName(String name);
    List<Student> findByAge(int age);
    List<Student> findByDepartment(String department);
    List<Student> findByAgeBetween(int minAge, int maxAge);
    List<Student> findByNameContaining(String name);
    
    // Custom queries
    @Query("SELECT s FROM Student s WHERE s.age > ?1 ORDER BY s.name")
    List<Student> findOlderStudents(int age);
    
    @Query("SELECT COUNT(s) FROM Student s WHERE s.department = ?1")
    long countByDepartment(String department);
    
    // Pagination
    Page<Student> findByDepartment(String department, Pageable pageable);
    
    // Sorting
    List<Student> findByAgeGreaterThan(int age, Sort sort);
}
\`\`\`

---

## Repository vs DAO

People often confuse Repository with DAO (Data Access Object). Here's the difference:

**DAO:**
- Focuses on data access
- One DAO per table
- Contains SQL/query logic
- Lower level

**Repository:**
- Focuses on domain objects
- One repository per aggregate root
- Business-oriented interface
- Higher level abstraction

Spring Data repositories are more like repositories than DAOs.

---

## When to Use Which Repository?

**Use CrudRepository when:**
- You only need basic CRUD
- No pagination needed
- Working with simple entities

**Use PagingAndSortingRepository when:**
- You need pagination
- You need sorting
- Still simple CRUD operations

**Use JpaRepository when:**
- You need JPA-specific features
- You want List instead of Iterable
- You need batch operations
- Most common choice

---

## Common Mistakes

**Mistake 1: Wrong generic types**
\`\`\`java
// Wrong - ID type mismatch
public interface StudentRepository extends JpaRepository<Student, String> {
    // Student ID is Integer, not String
}

// Right
public interface StudentRepository extends JpaRepository<Student, Integer> {
}
\`\`\`

**Mistake 2: Not handling Optional**
\`\`\`java
// Wrong
Student student = repository.findById(1);  // Returns Optional!

// Right
Optional<Student> student = repository.findById(1);
if (student.isPresent()) {
    Student s = student.get();
}
\`\`\`

**Mistake 3: Wrong return type**
\`\`\`java
// Wrong - CrudRepository returns Iterable
Iterable<Student> students = repository.findAll();

// Right - JpaRepository returns List
List<Student> students = repository.findAll();
\`\`\`

---

## What's Next?

Now that you understand repository architecture, learn about:
- JDBC Templates - Alternative to JPA
- Custom queries with @Query
- Advanced pagination and sorting
- Relationships between entities

> **Key Takeaway:** Spring Data provides a hierarchy of repository interfaces. Start with JpaRepository for most cases. It provides CRUD, pagination, sorting, and JPA features. Spring automatically implements your repository interface at runtime.
`,
  code: `// Repository Architecture Demo
// Understanding Spring Data repository hierarchy

public class RepositoryArchitectureDemo {
    public static void main(String[] args) {
        System.out.println("=== REPOSITORY ARCHITECTURE ===");
        System.out.println();
        
        System.out.println("REPOSITORY HIERARCHY:");
        System.out.println("---------------------");
        System.out.println("Repository (marker interface)");
        System.out.println("    ↓");
        System.out.println("CrudRepository (basic CRUD)");
        System.out.println("    ↓");
        System.out.println("PagingAndSortingRepository (+ pagination/sorting)");
        System.out.println("    ↓");
        System.out.println("JpaRepository (JPA-specific features)");
        System.out.println();
        
        System.out.println("CRUDREPOSITORY METHODS:");
        System.out.println("----------------------");
        System.out.println("- save(entity)");
        System.out.println("- findById(id)");
        System.out.println("- findAll()");
        System.out.println("- deleteById(id)");
        System.out.println("- count()");
        System.out.println("- existsById(id)");
        System.out.println();
        
        System.out.println("PAGINGANDSORTINGREPOSITORY:");
        System.out.println("---------------------------");
        System.out.println("- findAll(Sort sort)");
        System.out.println("- findAll(Pageable pageable)");
        System.out.println();
        
        System.out.println("JPAREPOSITORY:");
        System.out.println("--------------");
        System.out.println("- Returns List instead of Iterable");
        System.out.println("- flush()");
        System.out.println("- saveAndFlush()");
        System.out.println("- deleteInBatch()");
        System.out.println("- getOne()");
        System.out.println();
        
        System.out.println("WHEN TO USE:");
        System.out.println("------------");
        System.out.println("CrudRepository: Basic CRUD only");
        System.out.println("PagingAndSortingRepository: Need pagination/sorting");
        System.out.println("JpaRepository: Most common, JPA features needed");
        System.out.println();
        
        System.out.println("EXAMPLE:");
        System.out.println("--------");
        System.out.println("public interface StudentRepository");
        System.out.println("    extends JpaRepository<Student, Integer> {");
        System.out.println("    // All methods available automatically");
        System.out.println("}");
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a repository interface with pagination and sorting capabilities',
      hint: 'Extend PagingAndSortingRepository or JpaRepository and use Pageable and Sort',
      starterCode: `// Entity
@Entity
class Product {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private double price;
    private String category;
    // getters, setters
}

// Repository with pagination
// Extend JpaRepository<Product, Long>
// Add method: Page<Product> findAll(Pageable pageable)
// Add method: List<Product> findAll(Sort sort)

// Service
@Service
class ProductService {
    @Autowired
    private ProductRepository repository;
    
    // Implement method to get products with pagination
    // Use PageRequest.of(page, size)
    
    // Implement method to get products sorted by price
    // Use Sort.by("price").descending()`
    }
  ]
};

export default springDataRepositoryArchitecture;

