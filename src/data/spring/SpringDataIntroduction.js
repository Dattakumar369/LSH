const springDataIntroduction = {
  id: 'spring-data-introduction',
  title: 'Spring Data - Introduction',
  description: 'Understanding Spring Data and how it simplifies database operations',
  content: `
# Spring Data - Simplifying Database Operations

If you've worked with JDBC or Hibernate, you know how much code you need to write just to save or retrieve data. Spring Data changes that. It dramatically reduces the amount of boilerplate code you need to write for database operations.

---

## What is Spring Data?

Spring Data is a project that provides a unified API for data access. It works with different databases and data stores:
- Relational databases (MySQL, PostgreSQL, Oracle)
- NoSQL databases (MongoDB, Redis)
- Search engines (Elasticsearch)

The most popular part is **Spring Data JPA**, which works with relational databases using JPA/Hibernate.

---

## The Problem: Too Much Boilerplate Code

Let's see what you had to do before Spring Data:

### Traditional JDBC Way

\`\`\`java
public class StudentRepository {
    public Student findById(int id) {
        String sql = "SELECT * FROM students WHERE id = ?";
        try (Connection conn = getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, id);
            ResultSet rs = pstmt.executeQuery();
            if (rs.next()) {
                Student student = new Student();
                student.setId(rs.getInt("id"));
                student.setName(rs.getString("name"));
                student.setAge(rs.getInt("age"));
                return student;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }
}
\`\`\`

That's a lot of code just to find one student by ID!

### Hibernate Way (Better, but still verbose)

\`\`\`java
@Repository
public class StudentRepository {
    @Autowired
    private SessionFactory sessionFactory;
    
    public Student findById(int id) {
        Session session = sessionFactory.getCurrentSession();
        return session.get(Student.class, id);
    }
    
    public List<Student> findAll() {
        Session session = sessionFactory.getCurrentSession();
        Query<Student> query = session.createQuery("FROM Student", Student.class);
        return query.getResultList();
    }
    
    public void save(Student student) {
        Session session = sessionFactory.getCurrentSession();
        session.saveOrUpdate(student);
    }
    
    public void delete(int id) {
        Session session = sessionFactory.getCurrentSession();
        Student student = session.get(Student.class, id);
        if (student != null) {
            session.delete(student);
        }
    }
}
\`\`\`

Still a lot of code for simple operations.

---

## Spring Data Solution

With Spring Data JPA, you just define an interface. Spring Data implements it automatically:

\`\`\`java
public interface StudentRepository extends JpaRepository<Student, Integer> {
    // That's it! Spring Data provides all CRUD methods
}
\`\`\`

That's all you need! Spring Data automatically provides:
- \`save(Student student)\` - Save or update
- \`findById(Integer id)\` - Find by ID
- \`findAll()\` - Find all
- \`deleteById(Integer id)\` - Delete by ID
- \`count()\` - Count records
- And many more!

---

## Real-Time Example: Student Management

Let's see how Spring Data simplifies a real application:

### Step 1: Entity Class

\`\`\`java
@Entity
@Table(name = "students")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    private String name;
    private int age;
    private String email;
    
    // Constructors, getters, setters
}
\`\`\`

### Step 2: Repository Interface

\`\`\`java
public interface StudentRepository extends JpaRepository<Student, Integer> {
    // Spring Data provides all methods automatically
}
\`\`\`

### Step 3: Use It in Service

\`\`\`java
@Service
public class StudentService {
    @Autowired
    private StudentRepository repository;
    
    public Student getStudent(int id) {
        return repository.findById(id).orElse(null);
    }
    
    public List<Student> getAllStudents() {
        return repository.findAll();
    }
    
    public Student saveStudent(Student student) {
        return repository.save(student);
    }
    
    public void deleteStudent(int id) {
        repository.deleteById(id);
    }
}
\`\`\`

That's it! No SQL, no Hibernate session management, no boilerplate code.

---

## Custom Query Methods

You can define custom methods by following naming conventions:

\`\`\`java
public interface StudentRepository extends JpaRepository<Student, Integer> {
    // Find by name
    List<Student> findByName(String name);
    
    // Find by age
    List<Student> findByAge(int age);
    
    // Find by name and age
    List<Student> findByNameAndAge(String name, int age);
    
    // Find by email containing
    List<Student> findByEmailContaining(String email);
    
    // Find by age greater than
    List<Student> findByAgeGreaterThan(int age);
    
    // Count by age
    long countByAge(int age);
}
\`\`\`

Spring Data automatically implements these methods based on the method names. No implementation needed!

---

## Real Example: E-Commerce Product Search

\`\`\`java
@Entity
public class Product {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private double price;
    private String category;
    private int stock;
    // getters, setters
}

public interface ProductRepository extends JpaRepository<Product, Long> {
    // Find products by category
    List<Product> findByCategory(String category);
    
    // Find products by price range
    List<Product> findByPriceBetween(double minPrice, double maxPrice);
    
    // Find products in stock
    List<Product> findByStockGreaterThan(int stock);
    
    // Find products by name containing
    List<Product> findByNameContainingIgnoreCase(String name);
    
    // Find products by category and price
    List<Product> findByCategoryAndPriceLessThan(String category, double maxPrice);
}
\`\`\`

All these methods work automatically. No SQL, no implementation!

---

## Method Naming Conventions

Spring Data understands method names and creates queries automatically:

| Method Name Pattern | Query Generated |
|-------------------|----------------|
| \`findBy...\` | SELECT ... WHERE ... |
| \`countBy...\` | SELECT COUNT(*) WHERE ... |
| \`deleteBy...\` | DELETE WHERE ... |
| \`existsBy...\` | SELECT EXISTS WHERE ... |

**Field Conditions:**
- \`findByName\` → WHERE name = ?
- \`findByNameAndAge\` → WHERE name = ? AND age = ?
- \`findByNameOrAge\` → WHERE name = ? OR age = ?
- \`findByAgeGreaterThan\` → WHERE age > ?
- \`findByAgeLessThan\` → WHERE age < ?
- \`findByEmailContaining\` → WHERE email LIKE %?%
- \`findByNameIgnoreCase\` → WHERE UPPER(name) = UPPER(?)

---

## Using @Query for Complex Queries

For complex queries, you can use @Query annotation:

\`\`\`java
public interface StudentRepository extends JpaRepository<Student, Integer> {
    @Query("SELECT s FROM Student s WHERE s.age > ?1")
    List<Student> findStudentsOlderThan(int age);
    
    @Query("SELECT s FROM Student s WHERE s.name LIKE %?1%")
    List<Student> searchByName(String name);
    
    @Query(value = "SELECT * FROM students WHERE age BETWEEN ?1 AND ?2", nativeQuery = true)
    List<Student> findStudentsByAgeRange(int minAge, int maxAge);
}
\`\`\`

---

## Real Example: User Authentication

\`\`\`java
@Entity
public class User {
    @Id
    @GeneratedValue
    private Long id;
    private String username;
    private String password;
    private String email;
    private boolean active;
}

public interface UserRepository extends JpaRepository<User, Long> {
    // Find by username (for login)
    User findByUsername(String username);
    
    // Find active users
    List<User> findByActiveTrue();
    
    // Find by email
    User findByEmail(String email);
    
    // Check if username exists
    boolean existsByUsername(String username);
    
    // Count active users
    long countByActiveTrue();
}
\`\`\`

In your login service:

\`\`\`java
@Service
public class LoginService {
    @Autowired
    private UserRepository userRepository;
    
    public boolean validate(String username, String password) {
        User user = userRepository.findByUsername(username);
        return user != null && user.getPassword().equals(password);
    }
}
\`\`\`

Much simpler than writing SQL!

---

## Benefits of Spring Data

1. **Less Code** - No boilerplate CRUD code
2. **Type Safety** - Compile-time checking
3. **Automatic Implementation** - Spring generates implementation
4. **Consistent API** - Same API for different databases
5. **Easy Testing** - Can use in-memory database for tests
6. **Pagination Support** - Built-in pagination
7. **Transaction Management** - Automatic transaction handling

---

## Setting Up Spring Data JPA

### Maven Dependencies

\`\`\`xml
<dependencies>
    <!-- Spring Data JPA -->
    <dependency>
        <groupId>org.springframework.data</groupId>
        <artifactId>spring-data-jpa</artifactId>
        <version>2.7.0</version>
    </dependency>
    
    <!-- Hibernate (JPA Implementation) -->
    <dependency>
        <groupId>org.hibernate.orm</groupId>
        <artifactId>hibernate-core</artifactId>
        <version>5.6.10</version>
    </dependency>
    
    <!-- MySQL Driver -->
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>8.0.33</version>
    </dependency>
</dependencies>
\`\`\`

### Configuration

\`\`\`java
@Configuration
@EnableJpaRepositories("com.example.repository")
public class DataConfig {
    @Bean
    public DataSource dataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
        dataSource.setUrl("jdbc:mysql://localhost:3306/studentdb");
        dataSource.setUsername("root");
        dataSource.setPassword("password");
        return dataSource;
    }
    
    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory() {
        // JPA configuration
    }
    
    @Bean
    public JpaTransactionManager transactionManager() {
        // Transaction configuration
    }
}
\`\`\`

---

## Common Mistakes

**Mistake 1: Not extending JpaRepository**
\`\`\`java
// Wrong - No methods available
public interface StudentRepository {
    List<Student> findAll();
}

// Right - Extends JpaRepository
public interface StudentRepository extends JpaRepository<Student, Integer> {
    // Methods available automatically
}
\`\`\`

**Mistake 2: Wrong method naming**
\`\`\`java
// Wrong - Spring Data can't understand this
List<Student> getStudentsByName(String name);

// Right - Follow naming convention
List<Student> findByName(String name);
\`\`\`

**Mistake 3: Not using Optional**
\`\`\`java
// Wrong - findById returns Optional
Student student = repository.findById(1);  // Error!

// Right - Handle Optional
Optional<Student> student = repository.findById(1);
if (student.isPresent()) {
    Student s = student.get();
}
\`\`\`

---

## What's Next?

Now that you understand Spring Data basics, you can learn:
- Custom queries with @Query
- Pagination and sorting
- Relationships between entities
- Advanced Spring Data features

> **Key Takeaway:** Spring Data eliminates boilerplate code for database operations. Just extend JpaRepository and define method names following conventions. Spring Data implements them automatically. It's that simple!
`,
  code: `// Spring Data Introduction Demo
// Understanding how Spring Data simplifies database operations

public class SpringDataDemo {
    public static void main(String[] args) {
        System.out.println("=== SPRING DATA ===");
        System.out.println();
        
        System.out.println("WHAT IS SPRING DATA?");
        System.out.println("-------------------");
        System.out.println("Framework that simplifies database operations");
        System.out.println("Works with relational and NoSQL databases");
        System.out.println("Eliminates boilerplate code");
        System.out.println();
        
        System.out.println("THE PROBLEM:");
        System.out.println("------------");
        System.out.println("Traditional way: Write lots of code");
        System.out.println("  - JDBC: Connection, PreparedStatement, ResultSet");
        System.out.println("  - Hibernate: Session management, queries");
        System.out.println("  - Lots of boilerplate code");
        System.out.println();
        
        System.out.println("SPRING DATA SOLUTION:");
        System.out.println("--------------------");
        System.out.println("Just define an interface:");
        System.out.println("  public interface StudentRepository");
        System.out.println("      extends JpaRepository<Student, Integer> {");
        System.out.println("  }");
        System.out.println();
        System.out.println("Spring Data provides automatically:");
        System.out.println("  - save(Student)");
        System.out.println("  - findById(Integer)");
        System.out.println("  - findAll()");
        System.out.println("  - deleteById(Integer)");
        System.out.println("  - count()");
        System.out.println();
        
        System.out.println("CUSTOM METHODS:");
        System.out.println("---------------");
        System.out.println("Define methods by naming convention:");
        System.out.println("  List<Student> findByName(String name);");
        System.out.println("  List<Student> findByAge(int age);");
        System.out.println("  List<Student> findByNameAndAge(String name, int age);");
        System.out.println("  List<Student> findByEmailContaining(String email);");
        System.out.println("Spring Data implements them automatically!");
        System.out.println();
        
        System.out.println("BENEFITS:");
        System.out.println("---------");
        System.out.println("1. Less code (no boilerplate)");
        System.out.println("2. Type safety");
        System.out.println("3. Automatic implementation");
        System.out.println("4. Consistent API");
        System.out.println("5. Easy testing");
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a Spring Data repository interface with custom query methods',
      hint: 'Extend JpaRepository and define methods following naming conventions',
      starterCode: `// Entity class
@Entity
class Product {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private double price;
    private String category;
    private int stock;
    
    // Getters and setters
}

// Repository interface
// Extend JpaRepository<Product, Long>
// Add custom methods:
// 1. findByCategory(String category)
// 2. findByPriceBetween(double minPrice, double maxPrice)
// 3. findByStockGreaterThan(int stock)
// 4. findByNameContainingIgnoreCase(String name)`
    }
  ]
};

export default springDataIntroduction;

