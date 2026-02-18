const listInterface = {
  id: 'list-interface',
  title: 'List Interface',
  description: 'Ordered collections that allow duplicates',
  content: `
# List Interface — Ordered Collections

A List is like a numbered shopping list. Items have positions (indices), you can have duplicates, and the order matters. It's the most commonly used collection type in Java.

---

## List Characteristics

- **Ordered** — Elements maintain insertion order
- **Indexed** — Access elements by position (0-based)
- **Duplicates allowed** — Can have same element multiple times
- **Null allowed** — Can store null values

---

## List Implementations

### ArrayList
- **Backed by:** Dynamic array
- **Best for:** Random access, iteration
- **Worst for:** Frequent insertions/deletions in middle

\`\`\`java
ArrayList<String> list = new ArrayList<>();
list.add("Apple");
list.add("Banana");
String fruit = list.get(0);  // Fast! O(1)
\`\`\`

### LinkedList
- **Backed by:** Doubly-linked list
- **Best for:** Frequent insertions/deletions
- **Worst for:** Random access

\`\`\`java
LinkedList<String> list = new LinkedList<>();
list.addFirst("First");
list.addLast("Last");
list.add(1, "Middle");  // Fast insertion! O(1)
\`\`\`

### Vector (Legacy)
- **Like ArrayList but:** Thread-safe (synchronized)
- **Use instead:** \`Collections.synchronizedList()\` or \`CopyOnWriteArrayList\`

---

## ArrayList vs LinkedList

| Operation | ArrayList | LinkedList |
|-----------|-----------|------------|
| get(index) | O(1) | O(n) |
| add(end) | O(1)* | O(1) |
| add(middle) | O(n) | O(1) |
| remove(middle) | O(n) | O(1) |
| Memory | Less | More (node overhead) |

*Amortized - occasionally needs to resize

**Rule of thumb:** Use ArrayList unless you're doing lots of insertions/deletions in the middle.

---

## Common List Operations

### Creating Lists

\`\`\`java
// Empty list
List<String> list1 = new ArrayList<>();

// With initial capacity
List<String> list2 = new ArrayList<>(100);

// From another collection
List<String> list3 = new ArrayList<>(existingList);

// Immutable list (Java 9+)
List<String> list4 = List.of("A", "B", "C");

// Using Arrays.asList (fixed-size)
List<String> list5 = Arrays.asList("A", "B", "C");
\`\`\`

### Adding Elements

\`\`\`java
list.add("Apple");           // Add to end
list.add(0, "First");        // Add at index
list.addAll(otherList);      // Add all from another list
list.addAll(2, otherList);   // Add all at index
\`\`\`

### Accessing Elements

\`\`\`java
String first = list.get(0);          // Get by index
int index = list.indexOf("Apple");   // Find index
int last = list.lastIndexOf("Apple"); // Find last occurrence
List<String> sub = list.subList(1, 4); // Get sublist [1,4)
\`\`\`

### Removing Elements

\`\`\`java
list.remove(0);              // Remove by index
list.remove("Apple");        // Remove first occurrence
list.removeAll(otherList);   // Remove all matching
list.removeIf(s -> s.startsWith("A")); // Remove by condition
list.clear();                // Remove all
\`\`\`

### Modifying Elements

\`\`\`java
list.set(0, "Orange");       // Replace at index
Collections.sort(list);      // Sort
Collections.reverse(list);   // Reverse
Collections.shuffle(list);   // Randomize
\`\`\`

### Checking Contents

\`\`\`java
boolean has = list.contains("Apple");
boolean hasAll = list.containsAll(otherList);
boolean empty = list.isEmpty();
int size = list.size();
\`\`\`

---

## Iterating Over Lists

\`\`\`java
List<String> fruits = Arrays.asList("Apple", "Banana", "Cherry");

// 1. For-each loop (preferred)
for (String fruit : fruits) {
    System.out.println(fruit);
}

// 2. Traditional for loop (when you need index)
for (int i = 0; i < fruits.size(); i++) {
    System.out.println(i + ": " + fruits.get(i));
}

// 3. Iterator
Iterator<String> it = fruits.iterator();
while (it.hasNext()) {
    System.out.println(it.next());
}

// 4. forEach with lambda (Java 8+)
fruits.forEach(fruit -> System.out.println(fruit));

// 5. Stream API (Java 8+)
fruits.stream()
      .filter(f -> f.startsWith("A"))
      .forEach(System.out::println);
\`\`\`

---

## Sorting Lists

\`\`\`java
List<String> names = new ArrayList<>(Arrays.asList("Charlie", "Alice", "Bob"));

// Natural order
Collections.sort(names);  // [Alice, Bob, Charlie]

// Reverse order
Collections.sort(names, Collections.reverseOrder());

// Custom comparator
names.sort((a, b) -> a.length() - b.length());  // By length

// Using Comparator methods (Java 8+)
names.sort(Comparator.comparing(String::length));
names.sort(Comparator.comparing(String::length).reversed());
\`\`\`

---

## Real-World Example: Shopping Cart

\`\`\`java
public class ShoppingCart {
    private List<CartItem> items = new ArrayList<>();
    
    public void addItem(Product product, int quantity) {
        // Check if already in cart
        for (CartItem item : items) {
            if (item.getProduct().equals(product)) {
                item.setQuantity(item.getQuantity() + quantity);
                return;
            }
        }
        items.add(new CartItem(product, quantity));
    }
    
    public void removeItem(Product product) {
        items.removeIf(item -> item.getProduct().equals(product));
    }
    
    public double getTotal() {
        return items.stream()
                   .mapToDouble(item -> item.getProduct().getPrice() * item.getQuantity())
                   .sum();
    }
    
    public List<CartItem> getItems() {
        return new ArrayList<>(items);  // Return copy for safety
    }
}
\`\`\`

---

## Common Pitfalls

### ConcurrentModificationException

\`\`\`java
// WRONG - modifying while iterating
for (String s : list) {
    if (s.equals("remove")) {
        list.remove(s);  // Throws exception!
    }
}

// CORRECT - use Iterator.remove()
Iterator<String> it = list.iterator();
while (it.hasNext()) {
    if (it.next().equals("remove")) {
        it.remove();  // Safe!
    }
}

// CORRECT - use removeIf (Java 8+)
list.removeIf(s -> s.equals("remove"));
\`\`\`

### Arrays.asList Returns Fixed-Size List

\`\`\`java
List<String> list = Arrays.asList("A", "B", "C");
list.add("D");  // UnsupportedOperationException!

// CORRECT - wrap in ArrayList
List<String> list = new ArrayList<>(Arrays.asList("A", "B", "C"));
list.add("D");  // Works!
\`\`\`
`,
  code: `// List Interface Demo

import java.util.*;

public class ListDemo {
    public static void main(String[] args) {
        System.out.println("=== List Interface Demo ===\\n");
        
        // 1. ARRAYLIST BASICS
        System.out.println("1. ARRAYLIST BASICS");
        System.out.println("   -----------------");
        
        List<String> fruits = new ArrayList<>();
        fruits.add("Apple");
        fruits.add("Banana");
        fruits.add("Cherry");
        fruits.add("Apple");  // Duplicates allowed
        
        System.out.println("   Fruits: " + fruits);
        System.out.println("   Size: " + fruits.size());
        System.out.println("   First: " + fruits.get(0));
        System.out.println("   Contains 'Banana': " + fruits.contains("Banana"));
        System.out.println("   Index of 'Apple': " + fruits.indexOf("Apple"));
        System.out.println("   Last index of 'Apple': " + fruits.lastIndexOf("Apple"));
        System.out.println();
        
        // 2. LIST OPERATIONS
        System.out.println("2. LIST OPERATIONS");
        System.out.println("   ----------------");
        
        List<String> colors = new ArrayList<>();
        colors.add("Red");
        colors.add("Green");
        colors.add("Blue");
        System.out.println("   Initial: " + colors);
        
        colors.add(1, "Yellow");  // Insert at index
        System.out.println("   After add(1, Yellow): " + colors);
        
        colors.set(0, "Orange");  // Replace
        System.out.println("   After set(0, Orange): " + colors);
        
        colors.remove(2);  // Remove by index
        System.out.println("   After remove(2): " + colors);
        
        colors.remove("Yellow");  // Remove by value
        System.out.println("   After remove(Yellow): " + colors);
        System.out.println();
        
        // 3. LINKEDLIST
        System.out.println("3. LINKEDLIST");
        System.out.println("   -----------");
        
        LinkedList<String> queue = new LinkedList<>();
        queue.addFirst("First");
        queue.addLast("Last");
        queue.add("Middle");
        System.out.println("   LinkedList: " + queue);
        
        System.out.println("   First element: " + queue.getFirst());
        System.out.println("   Last element: " + queue.getLast());
        
        queue.removeFirst();
        System.out.println("   After removeFirst: " + queue);
        System.out.println();
        
        // 4. SORTING
        System.out.println("4. SORTING");
        System.out.println("   --------");
        
        List<Integer> numbers = new ArrayList<>(Arrays.asList(5, 2, 8, 1, 9, 3));
        System.out.println("   Original: " + numbers);
        
        Collections.sort(numbers);
        System.out.println("   Sorted: " + numbers);
        
        Collections.sort(numbers, Collections.reverseOrder());
        System.out.println("   Reverse: " + numbers);
        
        List<String> names = new ArrayList<>(Arrays.asList("Charlie", "Alice", "Bob"));
        names.sort(Comparator.comparing(String::length));
        System.out.println("   By length: " + names);
        System.out.println();
        
        // 5. ITERATION METHODS
        System.out.println("5. ITERATION METHODS");
        System.out.println("   ------------------");
        
        List<String> items = Arrays.asList("A", "B", "C", "D");
        
        System.out.print("   For-each: ");
        for (String item : items) {
            System.out.print(item + " ");
        }
        System.out.println();
        
        System.out.print("   forEach lambda: ");
        items.forEach(item -> System.out.print(item + " "));
        System.out.println();
        
        System.out.print("   Stream: ");
        items.stream().forEach(item -> System.out.print(item + " "));
        System.out.println();
        System.out.println();
        
        // 6. SUBLIST AND BULK OPERATIONS
        System.out.println("6. SUBLIST AND BULK OPERATIONS");
        System.out.println("   -----------------------------");
        
        List<Integer> nums = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10));
        System.out.println("   Original: " + nums);
        
        List<Integer> subList = nums.subList(2, 7);
        System.out.println("   SubList(2,7): " + subList);
        
        nums.removeIf(n -> n % 2 == 0);  // Remove even numbers
        System.out.println("   After removeIf(even): " + nums);
        System.out.println();
        
        // 7. REAL-WORLD EXAMPLE
        System.out.println("7. REAL-WORLD EXAMPLE - Todo List");
        System.out.println("   --------------------------------");
        
        TodoList todoList = new TodoList();
        todoList.addTask("Learn Java");
        todoList.addTask("Build a project");
        todoList.addTask("Practice coding");
        todoList.addTask("Learn Java");  // Duplicate
        
        todoList.display();
        
        todoList.completeTask("Learn Java");
        System.out.println("\\n   After completing 'Learn Java':");
        todoList.display();
        
        System.out.println("\\n   Pending tasks: " + todoList.getPendingCount());
    }
}

// Todo List example
class TodoList {
    private List<Task> tasks = new ArrayList<>();
    
    public void addTask(String description) {
        tasks.add(new Task(description));
        System.out.println("   Added: " + description);
    }
    
    public void completeTask(String description) {
        for (Task task : tasks) {
            if (task.description.equals(description) && !task.completed) {
                task.completed = true;
                System.out.println("   Completed: " + description);
                return;
            }
        }
    }
    
    public void display() {
        System.out.println("   --- Todo List ---");
        for (int i = 0; i < tasks.size(); i++) {
            Task task = tasks.get(i);
            String status = task.completed ? "Done" : "Pending";
            System.out.println("   " + (i + 1) + ". [" + status + "] " + task.description);
        }
    }
    
    public int getPendingCount() {
        return (int) tasks.stream().filter(t -> !t.completed).count();
    }
    
    private static class Task {
        String description;
        boolean completed;
        
        Task(String description) {
            this.description = description;
            this.completed = false;
        }
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a playlist manager using ArrayList',
      hint: 'Implement add, remove, shuffle, and display operations',
      starterCode: `import java.util.*;

public class PlaylistDemo {
    public static void main(String[] args) {
        System.out.println("=== Music Playlist ===\\n");
        
        Playlist playlist = new Playlist("My Favorites");
        
        // Add songs
        playlist.addSong("Bohemian Rhapsody - Queen");
        playlist.addSong("Hotel California - Eagles");
        playlist.addSong("Stairway to Heaven - Led Zeppelin");
        playlist.addSong("Imagine - John Lennon");
        playlist.addSong("Sweet Child O Mine - Guns N Roses");
        
        playlist.display();
        
        // Shuffle
        System.out.println("\\nShuffling playlist...");
        playlist.shuffle();
        playlist.display();
        
        // Remove a song
        System.out.println("\\nRemoving 'Imagine - John Lennon'...");
        playlist.removeSong("Imagine - John Lennon");
        playlist.display();
        
        // Play next
        System.out.println("\\nPlaying songs:");
        playlist.playNext();
        playlist.playNext();
        playlist.playNext();
    }
}

class Playlist {
    private String name;
    private List<String> songs;
    private int currentIndex;
    
    public Playlist(String name) {
        this.name = name;
        this.songs = new ArrayList<>();
        this.currentIndex = 0;
    }
    
    public void addSong(String song) {
        songs.add(song);
        System.out.println("Added: " + song);
    }
    
    public void removeSong(String song) {
        if (songs.remove(song)) {
            System.out.println("Removed: " + song);
        } else {
            System.out.println("Song not found: " + song);
        }
    }
    
    public void shuffle() {
        Collections.shuffle(songs);
        currentIndex = 0;
    }
    
    public void playNext() {
        if (currentIndex < songs.size()) {
            System.out.println("🎵 Now playing: " + songs.get(currentIndex));
            currentIndex++;
        } else {
            System.out.println("End of playlist!");
            currentIndex = 0;
        }
    }
    
    public void display() {
        System.out.println("\\n📋 Playlist: " + name + " (" + songs.size() + " songs)");
        for (int i = 0; i < songs.size(); i++) {
            String marker = (i == currentIndex) ? "▶ " : "  ";
            System.out.println(marker + (i + 1) + ". " + songs.get(i));
        }
    }
}`
    }
  ]
};

export default listInterface;
