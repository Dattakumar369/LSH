const springDataCustomQueries = {
  id: 'spring-data-custom-queries',
  title: 'Spring Data Custom Queries',
  description: 'Using @Query annotation for custom database queries',
  content: `
# Spring Data Custom Queries with @Query

Sometimes query methods aren't enough. You need custom queries. Spring Data provides @Query annotation for this.

---

## When to Use @Query

Use @Query when:
- Query methods become too complex
- You need native SQL
- You want to optimize queries
- You need complex joins

---

## JPQL Queries (Default)

JPQL (Java Persistence Query Language) works with entities, not tables.

### Basic @Query

\`\`\`java
public interface StudentRepository extends JpaRepository<Student, Integer> {
    @Query("SELECT s FROM Student s WHERE s.age > ?1")
    List<Student> findStudentsOlderThan(int age);
}
\`\`\`

- \`SELECT s FROM Student s\` - Select from Student entity
- \`?1\` - First parameter

### Multiple Parameters

\`\`\`java
@Query("SELECT s FROM Student s WHERE s.name = ?1 AND s.age = ?2")
List<Student> findByNameAndAge(String name, int age);
\`\`\`

### Named Parameters

\`\`\`java
@Query("SELECT s FROM Student s WHERE s.name = :name AND s.age = :age")
List<Student> findByNameAndAge(@Param("name") String name, @Param("age") int age);
\`\`\`

Named parameters are clearer than positional.

---

## Real-Time Examples

### Example 1: Search by Name Pattern

\`\`\`java
@Query("SELECT s FROM Student s WHERE s.name LIKE %:name%")
List<Student> searchByName(@Param("name") String name);
\`\`\`

### Example 2: Find by Age Range

\`\`\`java
@Query("SELECT s FROM Student s WHERE s.age BETWEEN :minAge AND :maxAge")
List<Student> findByAgeRange(@Param("minAge") int minAge, @Param("maxAge") int maxAge);
\`\`\`

### Example 3: Count by Department

\`\`\`java
@Query("SELECT COUNT(s) FROM Student s WHERE s.department = :department")
long countByDepartment(@Param("department") String department);
\`\`\`

### Example 4: Order by Multiple Fields

\`\`\`java
@Query("SELECT s FROM Student s WHERE s.department = :dept ORDER BY s.age DESC, s.name ASC")
List<Student> findByDepartmentOrdered(@Param("dept") String department);
\`\`\`

---

## Native SQL Queries

For complex queries or when you need database-specific features:

\`\`\`java
@Query(value = "SELECT * FROM students WHERE age > ?1", nativeQuery = true)
List<Student> findStudentsOlderThanNative(int age);
\`\`\`

**Important:** With native queries, you work with table names, not entity names.

### Native Query with Named Parameters

\`\`\`java
@Query(value = "SELECT * FROM students WHERE name = :name AND age = :age", nativeQuery = true)
List<Student> findByNameAndAgeNative(@Param("name") String name, @Param("age") int age);
\`\`\`

---

## Modifying Queries (UPDATE/DELETE)

For UPDATE and DELETE, use @Modifying:

\`\`\`java
@Modifying
@Query("UPDATE Student s SET s.email = :email WHERE s.id = :id")
int updateEmail(@Param("id") int id, @Param("email") String email);

@Modifying
@Query("DELETE FROM Student s WHERE s.age < :age")
int deleteStudentsYoungerThan(@Param("age") int age);
\`\`\`

**Important:** Use @Transactional with @Modifying queries.

---

## Real Example: E-Commerce Product Queries

\`\`\`java
public interface ProductRepository extends JpaRepository<Product, Long> {
    // JPQL query
    @Query("SELECT p FROM Product p WHERE p.price BETWEEN :minPrice AND :maxPrice")
    List<Product> findByPriceRange(@Param("minPrice") double minPrice, 
                                   @Param("maxPrice") double maxPrice);
    
    // Native query
    @Query(value = "SELECT * FROM products WHERE category = :category AND stock > 0", 
           nativeQuery = true)
    List<Product> findAvailableByCategory(@Param("category") String category);
    
    // Count query
    @Query("SELECT COUNT(p) FROM Product p WHERE p.category = :category")
    long countByCategory(@Param("category") String category);
    
    // Update query
    @Modifying
    @Transactional
    @Query("UPDATE Product p SET p.stock = p.stock - :quantity WHERE p.id = :id")
    int updateStock(@Param("id") Long id, @Param("quantity") int quantity);
    
    // Complex query with joins
    @Query("SELECT p FROM Product p JOIN p.category c WHERE c.name = :categoryName")
    List<Product> findByCategoryName(@Param("categoryName") String categoryName);
}
\`\`\`

---

## Pagination with Custom Queries

You can use pagination with custom queries:

\`\`\`java
@Query("SELECT s FROM Student s WHERE s.department = :dept")
Page<Student> findByDepartment(@Param("dept") String department, Pageable pageable);
\`\`\`

---

## Common Query Patterns

### Pattern 1: Select Specific Fields

\`\`\`java
@Query("SELECT s.name, s.email FROM Student s WHERE s.id = :id")
Object[] findNameAndEmailById(@Param("id") int id);
\`\`\`

### Pattern 2: Aggregate Functions

\`\`\`java
@Query("SELECT AVG(s.age) FROM Student s WHERE s.department = :dept")
double findAverageAgeByDepartment(@Param("dept") String department);
\`\`\`

### Pattern 3: Subqueries

\`\`\`java
@Query("SELECT s FROM Student s WHERE s.age > (SELECT AVG(s2.age) FROM Student s2)")
List<Student> findStudentsAboveAverageAge();
\`\`\`

---

## Best Practices

1. **Use named parameters** - More readable than positional
2. **Prefer JPQL over native** - More portable
3. **Use @Modifying for updates** - Required for UPDATE/DELETE
4. **Add @Transactional** - Required with @Modifying
5. **Test queries** - Verify they work correctly

---

## Common Mistakes

**Mistake 1: Forgetting @Modifying**
\`\`\`java
// Wrong - Won't work for UPDATE
@Query("UPDATE Student s SET s.email = :email WHERE s.id = :id")
int updateEmail(@Param("id") int id, @Param("email") String email);

// Right
@Modifying
@Query("UPDATE Student s SET s.email = :email WHERE s.id = :id")
int updateEmail(@Param("id") int id, @Param("email") String email);
\`\`\`

**Mistake 2: Missing @Transactional**
\`\`\`java
// Wrong - May not work
@Modifying
@Query("DELETE FROM Student s WHERE s.id = :id")
void deleteById(@Param("id") int id);

// Right
@Modifying
@Transactional
@Query("DELETE FROM Student s WHERE s.id = :id")
void deleteById(@Param("id") int id);
\`\`\`

**Mistake 3: Wrong entity name in JPQL**
\`\`\`java
// Wrong - Table name instead of entity name
@Query("SELECT * FROM students WHERE age > ?1")

// Right - Entity name
@Query("SELECT s FROM Student s WHERE s.age > ?1")
\`\`\`

---

## What's Next?

Now that you understand custom queries, learn about:
- Pagination and sorting in detail
- Relationships between entities
- Advanced Spring Data features

> **Key Takeaway:** Use @Query for custom queries when query methods aren't enough. JPQL works with entities, native SQL works with tables. Use @Modifying for UPDATE/DELETE queries and always add @Transactional.
`,
  code: `// Custom Queries Demo
// Understanding @Query annotation

public class CustomQueriesDemo {
    public static void main(String[] args) {
        System.out.println("=== CUSTOM QUERIES ===");
        System.out.println();
        
        System.out.println("WHEN TO USE @QUERY:");
        System.out.println("-------------------");
        System.out.println("- Query methods too complex");
        System.out.println("- Need native SQL");
        System.out.println("- Want to optimize queries");
        System.out.println("- Need complex joins");
        System.out.println();
        
        System.out.println("JPQL QUERIES:");
        System.out.println("-------------");
        System.out.println("@Query(\\"SELECT s FROM Student s WHERE s.age > ?1\\")");
        System.out.println("List<Student> findStudentsOlderThan(int age);");
        System.out.println();
        System.out.println("Named parameters:");
        System.out.println("@Query(\\"SELECT s FROM Student s WHERE s.name = :name\\")");
        System.out.println("List<Student> findByName(@Param(\\"name\\") String name);");
        System.out.println();
        
        System.out.println("NATIVE SQL QUERIES:");
        System.out.println("-------------------");
        System.out.println("@Query(value = \\"SELECT * FROM students WHERE age > ?1\\", ");
        System.out.println("       nativeQuery = true)");
        System.out.println("List<Student> findStudentsOlderThanNative(int age);");
        System.out.println();
        
        System.out.println("MODIFYING QUERIES:");
        System.out.println("------------------");
        System.out.println("@Modifying");
        System.out.println("@Transactional");
        System.out.println("@Query(\\"UPDATE Student s SET s.email = :email WHERE s.id = :id\\")");
        System.out.println("int updateEmail(@Param(\\"id\\") int id, @Param(\\"email\\") String email);");
        System.out.println();
        
        System.out.println("BEST PRACTICES:");
        System.out.println("---------------");
        System.out.println("1. Use named parameters");
        System.out.println("2. Prefer JPQL over native");
        System.out.println("3. Use @Modifying for updates");
        System.out.println("4. Add @Transactional");
        System.out.println("5. Test queries");
    }
}`,
  practiceQuestions: [
    {
      question: 'Create custom queries using @Query for complex search operations',
      hint: 'Use @Query with JPQL, named parameters, and @Modifying for updates',
      starterCode: `public interface ProductRepository extends JpaRepository<Product, Long> {
    // Find products by price range using JPQL
    // Use: @Query("SELECT p FROM Product p WHERE p.price BETWEEN :min AND :max")
    
    // Search products by name containing (case insensitive)
    // Use: LIKE with LOWER() function
    
    // Count products in category
    // Use: SELECT COUNT(p) FROM Product p WHERE p.category = :category
    
    // Update product stock
    // Use: @Modifying, @Transactional, UPDATE query
    
    // Find top 5 expensive products
    // Use: ORDER BY price DESC, LIMIT in native query
}`
    }
  ]
};

export default springDataCustomQueries;

