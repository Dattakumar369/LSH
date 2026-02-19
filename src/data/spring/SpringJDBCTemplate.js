const springJDBCTemplate = {
  id: 'spring-jdbc-template',
  title: 'Spring JDBC Template',
  description: 'Using JDBC Template for database operations without JPA',
  content: `
# Spring JDBC Template

JDBC Template is Spring's solution for working with databases using plain JDBC, but without the boilerplate code. It's simpler than JPA for straightforward database operations.

---

## Why JDBC Template?

Sometimes you don't need the complexity of JPA/Hibernate. You just want to execute SQL queries directly. JDBC Template gives you:
- Direct SQL control
- Less overhead than JPA
- Simpler for simple operations
- No entity mapping needed

---

## The Problem with Plain JDBC

Traditional JDBC requires lots of boilerplate:

\`\`\`java
public class StudentDAO {
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

Problems:
- Lots of try-catch blocks
- Manual connection management
- Manual resource cleanup
- Repetitive code

---

## JDBC Template Solution

JDBC Template handles all the boilerplate:

\`\`\`java
@Repository
public class StudentDAO {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    public Student findById(int id) {
        String sql = "SELECT * FROM students WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{id}, 
            (rs, rowNum) -> {
                Student student = new Student();
                student.setId(rs.getInt("id"));
                student.setName(rs.getString("name"));
                student.setAge(rs.getInt("age"));
                return student;
            });
    }
}
\`\`\`

Much cleaner! JDBC Template handles:
- Connection management
- Exception handling
- Resource cleanup
- Transaction management

---

## Setting Up JDBC Template

### Configuration

\`\`\`java
@Configuration
public class DatabaseConfig {
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
    public JdbcTemplate jdbcTemplate(DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }
}
\`\`\`

### Using in Repository

\`\`\`java
@Repository
public class StudentRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    // Your methods here
}
\`\`\`

---

## CRUD Operations with JDBC Template

### Create (INSERT)

\`\`\`java
@Repository
public class StudentRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    public void save(Student student) {
        String sql = "INSERT INTO students (name, age, email) VALUES (?, ?, ?)";
        jdbcTemplate.update(sql, student.getName(), student.getAge(), student.getEmail());
    }
    
    // Get generated ID
    public int saveAndGetId(Student student) {
        String sql = "INSERT INTO students (name, age, email) VALUES (?, ?, ?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, student.getName());
            ps.setInt(2, student.getAge());
            ps.setString(3, student.getEmail());
            return ps;
        }, keyHolder);
        return keyHolder.getKey().intValue();
    }
}
\`\`\`

### Read (SELECT)

\`\`\`java
// Find by ID
public Student findById(int id) {
    String sql = "SELECT * FROM students WHERE id = ?";
    return jdbcTemplate.queryForObject(sql, new Object[]{id}, 
        (rs, rowNum) -> {
            Student student = new Student();
            student.setId(rs.getInt("id"));
            student.setName(rs.getString("name"));
            student.setAge(rs.getInt("age"));
            student.setEmail(rs.getString("email"));
            return student;
        });
}

// Find All
public List<Student> findAll() {
    String sql = "SELECT * FROM students";
    return jdbcTemplate.query(sql, (rs, rowNum) -> {
        Student student = new Student();
        student.setId(rs.getInt("id"));
        student.setName(rs.getString("name"));
        student.setAge(rs.getInt("age"));
        student.setEmail(rs.getString("email"));
        return student;
    });
}

// Find by Name
public List<Student> findByName(String name) {
    String sql = "SELECT * FROM students WHERE name = ?";
    return jdbcTemplate.query(sql, new Object[]{name}, (rs, rowNum) -> {
        Student student = new Student();
        student.setId(rs.getInt("id"));
        student.setName(rs.getString("name"));
        student.setAge(rs.getInt("age"));
        student.setEmail(rs.getString("email"));
        return student;
    });
}
\`\`\`

### Update

\`\`\`java
public void update(Student student) {
    String sql = "UPDATE students SET name = ?, age = ?, email = ? WHERE id = ?";
    jdbcTemplate.update(sql, student.getName(), student.getAge(), 
                       student.getEmail(), student.getId());
}
\`\`\`

### Delete

\`\`\`java
public void deleteById(int id) {
    String sql = "DELETE FROM students WHERE id = ?";
    jdbcTemplate.update(sql, id);
}
\`\`\`

---

## Using RowMapper

Instead of inline mapping, use RowMapper:

\`\`\`java
@Repository
public class StudentRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    // Define RowMapper
    private RowMapper<Student> studentRowMapper = (rs, rowNum) -> {
        Student student = new Student();
        student.setId(rs.getInt("id"));
        student.setName(rs.getString("name"));
        student.setAge(rs.getInt("age"));
        student.setEmail(rs.getString("email"));
        return student;
    };
    
    // Use RowMapper
    public Student findById(int id) {
        String sql = "SELECT * FROM students WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{id}, studentRowMapper);
    }
    
    public List<Student> findAll() {
        String sql = "SELECT * FROM students";
        return jdbcTemplate.query(sql, studentRowMapper);
    }
}
\`\`\`

Or as a separate class:

\`\`\`java
public class StudentRowMapper implements RowMapper<Student> {
    @Override
    public Student mapRow(ResultSet rs, int rowNum) throws SQLException {
        Student student = new Student();
        student.setId(rs.getInt("id"));
        student.setName(rs.getString("name"));
        student.setAge(rs.getInt("age"));
        student.setEmail(rs.getString("email"));
        return student;
    }
}

// Use it
public Student findById(int id) {
    String sql = "SELECT * FROM students WHERE id = ?";
    return jdbcTemplate.queryForObject(sql, new Object[]{id}, new StudentRowMapper());
}
\`\`\`

---

## Real-Time Example: Complete CRUD

\`\`\`java
@Repository
public class StudentRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    private RowMapper<Student> rowMapper = (rs, rowNum) -> {
        Student student = new Student();
        student.setId(rs.getInt("id"));
        student.setName(rs.getString("name"));
        student.setAge(rs.getInt("age"));
        student.setEmail(rs.getString("email"));
        return student;
    };
    
    // Create
    public int save(Student student) {
        String sql = "INSERT INTO students (name, age, email) VALUES (?, ?, ?)";
        return jdbcTemplate.update(sql, student.getName(), 
                                   student.getAge(), student.getEmail());
    }
    
    // Read
    public Student findById(int id) {
        String sql = "SELECT * FROM students WHERE id = ?";
        try {
            return jdbcTemplate.queryForObject(sql, new Object[]{id}, rowMapper);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }
    
    public List<Student> findAll() {
        String sql = "SELECT * FROM students";
        return jdbcTemplate.query(sql, rowMapper);
    }
    
    // Update
    public int update(Student student) {
        String sql = "UPDATE students SET name = ?, age = ?, email = ? WHERE id = ?";
        return jdbcTemplate.update(sql, student.getName(), student.getAge(), 
                                   student.getEmail(), student.getId());
    }
    
    // Delete
    public int deleteById(int id) {
        String sql = "DELETE FROM students WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }
    
    // Count
    public int count() {
        String sql = "SELECT COUNT(*) FROM students";
        return jdbcTemplate.queryForObject(sql, Integer.class);
    }
}
\`\`\`

---

## Batch Operations

JDBC Template supports batch operations for efficiency:

\`\`\`java
public void saveAll(List<Student> students) {
    String sql = "INSERT INTO students (name, age, email) VALUES (?, ?, ?)";
    jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {
        @Override
        public void setValues(PreparedStatement ps, int i) throws SQLException {
            Student student = students.get(i);
            ps.setString(1, student.getName());
            ps.setInt(2, student.getAge());
            ps.setString(3, student.getEmail());
        }
        
        @Override
        public int getBatchSize() {
            return students.size();
        }
    });
}
\`\`\`

---

## NamedParameterJdbcTemplate

For better readability with named parameters:

\`\`\`java
@Repository
public class StudentRepository {
    @Autowired
    private NamedParameterJdbcTemplate namedTemplate;
    
    public Student findById(int id) {
        String sql = "SELECT * FROM students WHERE id = :id";
        Map<String, Object> params = new HashMap<>();
        params.put("id", id);
        return namedTemplate.queryForObject(sql, params, rowMapper);
    }
    
    public void save(Student student) {
        String sql = "INSERT INTO students (name, age, email) VALUES (:name, :age, :email)";
        Map<String, Object> params = new HashMap<>();
        params.put("name", student.getName());
        params.put("age", student.getAge());
        params.put("email", student.getEmail());
        namedTemplate.update(sql, params);
    }
}
\`\`\`

---

## Real Example: E-Commerce Product Repository

\`\`\`java
@Repository
public class ProductRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    private RowMapper<Product> rowMapper = (rs, rowNum) -> {
        Product product = new Product();
        product.setId(rs.getLong("id"));
        product.setName(rs.getString("name"));
        product.setPrice(rs.getDouble("price"));
        product.setCategory(rs.getString("category"));
        product.setStock(rs.getInt("stock"));
        return product;
    };
    
    public List<Product> findByCategory(String category) {
        String sql = "SELECT * FROM products WHERE category = ?";
        return jdbcTemplate.query(sql, new Object[]{category}, rowMapper);
    }
    
    public List<Product> findByPriceRange(double minPrice, double maxPrice) {
        String sql = "SELECT * FROM products WHERE price BETWEEN ? AND ?";
        return jdbcTemplate.query(sql, new Object[]{minPrice, maxPrice}, rowMapper);
    }
    
    public int updateStock(long productId, int quantity) {
        String sql = "UPDATE products SET stock = stock - ? WHERE id = ?";
        return jdbcTemplate.update(sql, quantity, productId);
    }
}
\`\`\`

---

## JDBC Template vs JPA

| Feature | JDBC Template | JPA |
|---------|--------------|-----|
| SQL Control | Direct SQL | JPQL/HQL |
| Complexity | Simple | More complex |
| Performance | Fast | Can be slower |
| Object Mapping | Manual | Automatic |
| Relationships | Manual joins | Automatic |
| When to Use | Simple queries | Complex domain models |

**Use JDBC Template when:**
- Simple database operations
- Need direct SQL control
- Performance critical
- Don't need object-relational mapping

**Use JPA when:**
- Complex domain models
- Need relationships
- Want automatic mapping
- Working with entities

---

## Common Mistakes

**Mistake 1: Not handling EmptyResultDataAccessException**
\`\`\`java
// Wrong - Throws exception if not found
Student student = jdbcTemplate.queryForObject(sql, new Object[]{id}, rowMapper);

// Right - Handle exception
try {
    return jdbcTemplate.queryForObject(sql, new Object[]{id}, rowMapper);
} catch (EmptyResultDataAccessException e) {
    return null;
}
\`\`\`

**Mistake 2: Wrong parameter order**
\`\`\`java
// Wrong - Parameters don't match SQL
jdbcTemplate.update("UPDATE students SET name = ? WHERE id = ?", id, name);

// Right - Match SQL order
jdbcTemplate.update("UPDATE students SET name = ? WHERE id = ?", name, id);
\`\`\`

**Mistake 3: Not using RowMapper for multiple rows**
\`\`\`java
// Wrong - queryForObject only for single row
List<Student> students = jdbcTemplate.queryForObject(sql, rowMapper);

// Right - Use query for multiple rows
List<Student> students = jdbcTemplate.query(sql, rowMapper);
\`\`\`

---

## What's Next?

Now that you understand JDBC Template, learn about:
- Custom queries with @Query in Spring Data
- Pagination and sorting
- Relationships between entities
- Advanced Spring Data features

> **Key Takeaway:** JDBC Template simplifies JDBC operations by handling connection management, exception handling, and resource cleanup. It's perfect for simple database operations where you want direct SQL control without the complexity of JPA.
`,
  code: `// JDBC Template Demo
// Understanding Spring JDBC Template

public class JDBCTemplateDemo {
    public static void main(String[] args) {
        System.out.println("=== JDBC TEMPLATE ===");
        System.out.println();
        
        System.out.println("WHY JDBC TEMPLATE?");
        System.out.println("------------------");
        System.out.println("Simpler than JPA for straightforward operations");
        System.out.println("Direct SQL control");
        System.out.println("Less overhead");
        System.out.println("No entity mapping needed");
        System.out.println();
        
        System.out.println("THE PROBLEM WITH PLAIN JDBC:");
        System.out.println("---------------------------");
        System.out.println("- Lots of try-catch blocks");
        System.out.println("- Manual connection management");
        System.out.println("- Manual resource cleanup");
        System.out.println("- Repetitive code");
        System.out.println();
        
        System.out.println("JDBC TEMPLATE SOLUTION:");
        System.out.println("----------------------");
        System.out.println("@Repository");
        System.out.println("class StudentRepository {");
        System.out.println("    @Autowired");
        System.out.println("    private JdbcTemplate jdbcTemplate;");
        System.out.println();
        System.out.println("    public Student findById(int id) {");
        System.out.println("        String sql = \\"SELECT * FROM students WHERE id = ?\\";");
        System.out.println("        return jdbcTemplate.queryForObject(sql, ");
        System.out.println("            new Object[]{id}, rowMapper);");
        System.out.println("    }");
        System.out.println("}");
        System.out.println();
        System.out.println("JDBC Template handles:");
        System.out.println("- Connection management");
        System.out.println("- Exception handling");
        System.out.println("- Resource cleanup");
        System.out.println();
        
        System.out.println("CRUD OPERATIONS:");
        System.out.println("---------------");
        System.out.println("Create: jdbcTemplate.update(INSERT SQL, params)");
        System.out.println("Read:   jdbcTemplate.queryForObject(SELECT SQL, params, rowMapper)");
        System.out.println("Update: jdbcTemplate.update(UPDATE SQL, params)");
        System.out.println("Delete: jdbcTemplate.update(DELETE SQL, params)");
        System.out.println();
        
        System.out.println("ROW MAPPER:");
        System.out.println("-----------");
        System.out.println("Maps ResultSet to object:");
        System.out.println("RowMapper<Student> rowMapper = (rs, rowNum) -> {");
        System.out.println("    Student student = new Student();");
        System.out.println("    student.setId(rs.getInt(\\"id\\"));");
        System.out.println("    student.setName(rs.getString(\\"name\\"));");
        System.out.println("    return student;");
        System.out.println("};");
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a complete repository using JDBC Template with CRUD operations',
      hint: 'Use JdbcTemplate, RowMapper, and implement save, findById, findAll, update, delete methods',
      starterCode: `@Repository
class ProductRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    // Create RowMapper for Product
    // Map ResultSet to Product object
    
    // Save product
    // Use: jdbcTemplate.update(INSERT SQL, params)
    
    // Find by ID
    // Use: jdbcTemplate.queryForObject(SELECT SQL, params, rowMapper)
    // Handle EmptyResultDataAccessException
    
    // Find all
    // Use: jdbcTemplate.query(SELECT SQL, rowMapper)
    
    // Update product
    // Use: jdbcTemplate.update(UPDATE SQL, params)
    
    // Delete by ID
    // Use: jdbcTemplate.update(DELETE SQL, params)
}

// Product class
class Product {
    private Long id;
    private String name;
    private double price;
    // getters, setters
}`
    }
  ]
};

export default springJDBCTemplate;

