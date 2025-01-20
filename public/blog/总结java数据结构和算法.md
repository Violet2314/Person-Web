---
title: 总结java数据结构和算法
date: 2024-08-04
tag: 技术开发
category: 我的赛博垃圾
excerpt: 测试
---
### **算法的 5 个特性**
1. **有穷性**  
    算法必须在有限步骤内完成，不能无限执行。
2. **确定性**  
    算法的每一步骤都必须明确且唯一。
3. **可行性**  
    算法的每一步骤都能有效执行，并得到结果。
4. **输入性**  
    算法有零个或多个输入，表示计算对象的初始条件。
5. **输出性**  
    算法至少有一个输出，表示计算结果。
### **抽象数据类型的表示方法**
#### **抽象数据类型（ADT）**

抽象数据类型是指一个数学模型及定义在该模型上的一组操作，它关注逻辑功能，不涉及实现细节。

---
#### **表示方法**

抽象数据类型通过**数据对象**、**数据关系**、**基本操作**三部分定义：

1. **数据对象**：抽象数据类型中所包含的数据元素集合。
2. **数据关系**：数据元素之间的逻辑关系。
3. **基本操作**：操作抽象数据类型的方法，包括函数原型、参数及返回值的定义。
```
ADT Stack {
    数据对象：D = {a1, a2, ..., an | ai 是任意数据元素}
    数据关系：满足后进先出（LIFO）特性
    基本操作：
        InitStack(S)：初始化栈 S；
        Push(S, x)：将元素 x 入栈；
        Pop(S)：弹出栈顶元素；
        GetTop(S)：返回栈顶元素。
}
```
### 顺序表的实现
#### 基本操作与时间复杂度
1. **插入**：平均时间复杂度为 $O(n)$。
2. **删除**：平均时间复杂度为 $O(n)$。
3. **查找**：时间复杂度为 $O(n)$。
4. **访问指定位置**：时间复杂度为 $O(1)$。
```java
import java.util.Arrays;

public class SequenceList<T> {
    private Object[] data;  // 存储元素的数组
    private int size;       // 当前存储的元素个数

    public SequenceList(int capacity) {
        this.data = new Object[capacity];
        this.size = 0;
    }

    // 添加元素
    public void add(T element) {
        if (size == data.length) {
            data = Arrays.copyOf(data, data.length * 2);  // 动态扩容
        }
        data[size++] = element;
    }

    // 插入元素
    public void insert(int index, T element) {
        if (index < 0 || index > size) throw new IndexOutOfBoundsException();
        if (size == data.length) data = Arrays.copyOf(data, data.length * 2);

        System.arraycopy(data, index, data, index + 1, size - index);  // 移动数据
        data[index] = element;
        size++;
    }

    // 删除元素
    public T delete(int index) {
        if (index < 0 || index >= size) throw new IndexOutOfBoundsException();
        T removed = (T) data[index];
        System.arraycopy(data, index + 1, data, index, size - index - 1);  // 移动数据
        size--;
        return removed;
    }

    // 获取元素
    public T get(int index) {
        if (index < 0 || index >= size) throw new IndexOutOfBoundsException();
        return (T) data[index];
    }

    // 当前长度
    public int size() {
        return size;
    }
}

```
### 实现单链表
#### 基本操作与时间复杂度
1. 插入节点：时间复杂度 $O(1)$（在表头插入）。
2. 删除节点：时间复杂度 $O(n)$（需找到前驱节点）。
3. 查找节点：时间复杂度 $O(n)$。
```java
public class SingleLinkedList<T> {
    private static class Node<T> {
        T data;
        Node<T> next;

        Node(T data) {
            this.data = data;
        }
    }

    private Node<T> head; // 头结点

    // 添加到链表末尾
    public void add(T data) {
        Node<T> newNode = new Node<>(data);
        if (head == null) {
            head = newNode;
            return;
        }
        Node<T> current = head;
        while (current.next != null) {
            current = current.next;
        }
        current.next = newNode;
    }

    // 插入节点
    public void insert(int index, T data) {
        if (index < 0) throw new IndexOutOfBoundsException();

        Node<T> newNode = new Node<>(data);
        if (index == 0) {
            newNode.next = head;
            head = newNode;
            return;
        }

        Node<T> current = head;
        for (int i = 0; i < index - 1 && current != null; i++) {
            current = current.next;
        }

        if (current == null) throw new IndexOutOfBoundsException();

        newNode.next = current.next;
        current.next = newNode;
    }

    // 删除节点
    public T delete(int index) {
        if (index < 0 || head == null) throw new IndexOutOfBoundsException();

        if (index == 0) {
            T data = head.data;
            head = head.next;
            return data;
        }

        Node<T> current = head;
        for (int i = 0; i < index - 1 && current.next != null; i++) {
            current = current.next;
        }

        if (current.next == null) throw new IndexOutOfBoundsException();

        T data = current.next.data;
        current.next = current.next.next;
        return data;
    }

    // 打印链表
    public void printList() {
        Node<T> current = head;
        while (current != null) {
            System.out.print(current.data + " -> ");
            current = current.next;
        }
        System.out.println("null");
    }
}

```
### 两个单链表按大小合并
```java
public static Node<Integer> mergeSorted(Node<Integer> head1, Node<Integer> head2) {
    if (head1 == null) return head2;
    if (head2 == null) return head1;

    Node<Integer> dummy = new Node<>(0);  // 创建一个哑结点作为新链表的头
    Node<Integer> current = dummy;

    while (head1 != null && head2 != null) {
        if (head1.data <= head2.data) {
            current.next = head1;
            head1 = head1.next;
        } else {
            current.next = head2;
            head2 = head2.next;
        }
        current = current.next;
    }

    // 将剩余的节点拼接到新链表
    if (head1 != null) current.next = head1;
    if (head2 != null) current.next = head2;

    return dummy.next;  // 返回哑结点后的第一个有效节点
}

// 链表节点类
static class Node<T> {
    T data;
    Node<T> next;

    Node(T data) {
        this.data = data;
    }
}
```
### 顺序栈
```java
class SeqStack<T> {
    private Object[] stack; // 栈存储区
    private int top;        // 栈顶指针
    private int capacity;   // 栈容量

    public SeqStack(int capacity) {
        this.capacity = capacity;
        stack = new Object[capacity];
        top = -1;
    }

    public boolean isEmpty() {
        return top == -1;
    }

    public boolean isFull() {
        return top == capacity - 1;
    }

    public void push(T data) {
        if (isFull()) throw new IllegalStateException("栈满");
        stack[++top] = data;
    }

    public T pop() {
        if (isEmpty()) throw new IllegalStateException("栈空");
        return (T) stack[top--];
    }

    public T peek() {
        if (isEmpty()) throw new IllegalStateException("栈空");
        return (T) stack[top];
    }
}
```
### 链栈
```java
class LinkedStack<T> {
    private static class Node<T> {
        T data;
        Node<T> next;

        Node(T data) {
            this.data = data;
        }
    }

    private Node<T> top;

    public LinkedStack() {
        top = null;
    }

    public boolean isEmpty() {
        return top == null;
    }

    public void push(T data) {
        Node<T> newNode = new Node<>(data);
        newNode.next = top;
        top = newNode;
    }

    public T pop() {
        if (isEmpty()) throw new IllegalStateException("栈空");
        T data = top.data;
        top = top.next;
        return data;
    }

    public T peek() {
        if (isEmpty()) throw new IllegalStateException("栈空");
        return top.data;
    }
}
```
### 括号匹配
```java
public static boolean isValid(String str) {
    Stack<Character> stack = new Stack<>();
    for (char c : str.toCharArray()) {
        if (c == '(' || c == '{' || c == '[') {
            stack.push(c);
        } else {
            if (stack.isEmpty()) return false;
            char top = stack.pop();
            if ((c == ')' && top != '(') || (c == '}' && top != '{') || (c == ']' && top != '[')) {
                return false;
            }
        }
    }
    return stack.isEmpty();
}

// 测试代码
public static void main(String[] args) {
    String expr = "{[()]}";
    System.out.println(isValid(expr)); // 输出 true
}
```
### 入栈出栈序列判定
```java
public static boolean isPossibleStackSequence(int[] push, int[] pop) {
    Stack<Integer> stack = new Stack<>();
    int j = 0;

    for (int num : push) {
        stack.push(num);
        while (!stack.isEmpty() && stack.peek() == pop[j]) {
            stack.pop();
            j++;
        }
    }
    return stack.isEmpty();
}

// 测试代码
public static void main(String[] args) {
    int[] push = {1, 2, 3, 4, 5};
    int[] pop = {4, 5, 3, 2, 1};
    System.out.println(isPossibleStackSequence(push, pop)); // 输出 true
}
```
### 顺序队列
```java
class SeqQueue<T> {
    private Object[] queue;
    private int front; // 队头指针
    private int rear;  // 队尾指针
    private int size;  // 队列中实际元素数量

    public SeqQueue(int capacity) {
        queue = new Object[capacity];
        front = rear = size = 0;
    }

    public boolean isEmpty() {
        return size == 0;
    }

    public boolean isFull() {
        return size == queue.length;
    }

    public void enqueue(T data) {
        if (isFull()) throw new IllegalStateException("队列满");
        queue[rear] = data;
        rear = (rear + 1) % queue.length;
        size++;
    }

    public T dequeue() {
        if (isEmpty()) throw new IllegalStateException("队列空");
        T data = (T) queue[front];
        front = (front + 1) % queue.length;
        size--;
        return data;
    }

    public T peek() {
        if (isEmpty()) throw new IllegalStateException("队列空");
        return (T) queue[front];
    }
}
```

### 循环队列

循环队列利用取模运算解决空间浪费问题
### 链队列
```java
class LinkedQueue<T> {
    private static class Node<T> {
        T data;
        Node<T> next;

        Node(T data) {
            this.data = data;
        }
    }

    private Node<T> front; // 队头指针
    private Node<T> rear;  // 队尾指针

    public LinkedQueue() {
        front = rear = null;
    }

    public boolean isEmpty() {
        return front == null;
    }

    public void enqueue(T data) {
        Node<T> newNode = new Node<>(data);
        if (isEmpty()) {
            front = rear = newNode;
        } else {
            rear.next = newNode;
            rear = newNode;
        }
    }

    public T dequeue() {
        if (isEmpty()) throw new IllegalStateException("队列空");
        T data = front.data;
        front = front.next;
        if (front == null) rear = null;
        return data;
    }

    public T peek() {
        if (isEmpty()) throw new IllegalStateException("队列空");
        return front.data;
    }
}
```
### kmp求next和nextval的
`next[j]`代表的是0到j-1的字符串的最长前后缀的长度
`nextval`是优化了`next`因为如果j匹配不到并且如果`next[j]`和j的字符是相同的话，那么他也就不会匹配`next[j]`的字符
```java
public class KMPSearchWithNextval {

    // 计算 next 数组
    public static int[] computeNext(String pattern) {
        int n = pattern.length();
        int[] next = new int[n];
        next[0] = -1; // 初始化
        int j = 0, k = -1;

        while (j < n - 1) {
            if (k == -1 || pattern.charAt(j) == pattern.charAt(k)) {
                j++;
                k++;
                next[j] = k;
            } else {
                k = next[k];
            }
        }
        return next;
    }

    // 计算 nextval 数组
    public static int[] computeNextval(String pattern) {
        int[] next = computeNext(pattern);
        int n = next.length;
        int[] nextval = new int[n];
        nextval[0] = -1; // 初始化

        for (int j = 1; j < n; j++) {
            if (next[j] != -1 && pattern.charAt(j) == pattern.charAt(next[j])) {
                nextval[j] = nextval[next[j]];
            } else {
                nextval[j] = next[j];
            }
        }
        return nextval;
    }

    // KMP 搜索主函数
    public static int KMPSearch(String text, String pattern) {
        if (pattern.length() == 0) return 0; // 空模式串匹配主串开头
        int[] nextval = computeNextval(pattern);

        int i = 0; // 主串指针
        int j = 0; // 模式串指针

        while (i < text.length() && j < pattern.length()) {
            if (j == -1 || text.charAt(i) == pattern.charAt(j)) {
                i++;
                j++;
            } else {
                j = nextval[j]; // 根据 nextval 回溯模式串位置
            }
        }

        if (j == pattern.length()) {
            return i - j; // 匹配成功，返回起始索引
        } else {
            return -1; // 匹配失败
        }
    }

    public static void main(String[] args) {
        String text = "abcabcacab";
        String pattern = "abcac";

        int index = KMPSearch(text, pattern);
        if (index != -1) {
            System.out.println("模式串首次出现的位置: " + index);
        } else {
            System.out.println("模式串未找到");
        }
    }
}
```
### java的bfs
```java
public static int bfs(Node node,int val){  
    int ans = 0;  
    Queue<Node> q = new LinkedList<>();  
    Queue<Integer> height = new LinkedList<>();  
    q.offer(node);  
    height.offer(1);  
    while(!q.isEmpty()){  
        Node now = q.poll();  
        int nowh = height.poll();  
        if(now.val == val) return nowh;  
  
        if(now.l != null){  
            q.offer(now.l);  
            height.offer(nowh + 1);  
        }  
        if(now.r != null){  
            q.offer(now.r);  
            height.offer(nowh + 1);  
        }  
    }  
    return ans;  
}
```
### 压缩对称矩阵
```java
public class SymmetricMatrix {
    // 将对称矩阵存储为一维数组
    public static int[] compressSymmetricMatrix(int[][] matrix) {
        int n = matrix.length;
        int size = n * (n + 1) / 2; // 上三角元素个数
        int[] compressed = new int[size];
        int index = 0;

        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                compressed[index++] = matrix[i][j];
            }
        }
        return compressed;
    }

    // 获取对称矩阵中元素
    public static int getElement(int[] compressed, int i, int j, int n) {
        if (i > j) { // 确保 i <= j
            int temp = i;
            i = j;
            j = temp;
        }
        int index = (i * (2 * n - i + 1)) / 2 + (j - i);
        return compressed[index];
    }

    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {2, 4, 5},
            {3, 5, 6}
        };
        int[] compressed = compressSymmetricMatrix(matrix);
        System.out.println("Compressed storage: ");
        for (int val : compressed) {
            System.out.print(val + " ");
        }

        // 测试获取元素
        int n = matrix.length;
        System.out.println("\nElement at (2, 1): " + getElement(compressed, 2, 1, n)); // 输出：5
    }
}
```
### 稀疏矩阵
**稀疏矩阵的定义**  
一个稀疏矩阵是指矩阵中大多数元素为零的矩阵。为了节省存储空间，可以使用三元组（`row, col, value`）表示非零元素的位置和数值。
```java
import java.util.ArrayList;
import java.util.List;

public class SparseMatrix {
    static class Triple {
        int row;
        int col;
        int value;

        Triple(int row, int col, int value) {
            this.row = row;
            this.col = col;
            this.value = value;
        }

        @Override
        public String toString() {
            return "(" + row + ", " + col + ", " + value + ")";
        }
    }

    // 将稀疏矩阵转换为三元组表示
    public static List<Triple> convertToTriple(int[][] matrix) {
        List<Triple> triples = new ArrayList<>();
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] != 0) {
                    triples.add(new Triple(i, j, matrix[i][j]));
                }
            }
        }
        return triples;
    }

    // 将三元组表示还原为矩阵
    public static int[][] convertToMatrix(List<Triple> triples, int rows, int cols) {
        int[][] matrix = new int[rows][cols];
        for (Triple triple : triples) {
            matrix[triple.row][triple.col] = triple.value;
        }
        return matrix;
    }

    public static void main(String[] args) {
        int[][] matrix = {
            {0, 0, 5},
            {3, 0, 0},
            {0, 8, 0}
        };

        List<Triple> triples = convertToTriple(matrix);
        System.out.println("Triples representation: " + triples);

        int[][] restoredMatrix = convertToMatrix(triples, 3, 3);
        System.out.println("Restored matrix: ");
        for (int[] row : restoredMatrix) {
            for (int val : row) {
                System.out.print(val + " ");
            }
            System.out.println();
        }
    }
}
```
### 先序和中序构建二叉树
```java
class TreeNode {
    int val;
    TreeNode left, right;

    TreeNode(int val) {
        this.val = val;
    }
}

public class ConstructBinaryTree {

    public static TreeNode buildTreeFromPreIn(int[] preorder, int[] inorder) {
        return build(preorder, 0, preorder.length - 1, inorder, 0, inorder.length - 1);
    }

    private static TreeNode build(int[] preorder, int preStart, int preEnd,
                                  int[] inorder, int inStart, int inEnd) {
        if (preStart > preEnd || inStart > inEnd) return null;

        TreeNode root = new TreeNode(preorder[preStart]);
        int rootIndex = inStart; // 找到根节点在中序遍历中的位置
        while (inorder[rootIndex] != root.val) rootIndex++;

        int leftSize = rootIndex - inStart; // 左子树节点数量
        root.left = build(preorder, preStart + 1, preStart + leftSize,
                          inorder, inStart, rootIndex - 1);
        root.right = build(preorder, preStart + leftSize + 1, preEnd,
                           inorder, rootIndex + 1, inEnd);
        return root;
    }

    public static void main(String[] args) {
        int[] preorder = {3, 9, 20, 15, 7};
        int[] inorder = {9, 3, 15, 20, 7};
        TreeNode root = buildTreeFromPreIn(preorder, inorder);
        printInOrder(root); // 输出验证
    }

    public static void printInOrder(TreeNode root) {
        if (root != null) {
            printInOrder(root.left);
            System.out.print(root.val + " ");
            printInOrder(root.right);
        }
    }
}
```
### 后序和中序构建
```java
public class ConstructBinaryTree {

    public static TreeNode buildTreeFromPostIn(int[] postorder, int[] inorder) {
        return build(postorder, 0, postorder.length - 1, inorder, 0, inorder.length - 1);
    }

    private static TreeNode build(int[] postorder, int postStart, int postEnd,
                                  int[] inorder, int inStart, int inEnd) {
        if (postStart > postEnd || inStart > inEnd) return null;

        TreeNode root = new TreeNode(postorder[postEnd]);
        int rootIndex = inStart; // 找到根节点在中序遍历中的位置
        while (inorder[rootIndex] != root.val) rootIndex++;

        int leftSize = rootIndex - inStart; // 左子树节点数量
        root.left = build(postorder, postStart, postStart + leftSize - 1,
                          inorder, inStart, rootIndex - 1);
        root.right = build(postorder, postStart + leftSize, postEnd - 1,
                           inorder, rootIndex + 1, inEnd);
        return root;
    }

    public static void main(String[] args) {
        int[] postorder = {9, 15, 7, 20, 3};
        int[] inorder = {9, 3, 15, 20, 7};
        TreeNode root = buildTreeFromPostIn(postorder, inorder);
        printInOrder(root); // 输出验证
    }

    public static void printInOrder(TreeNode root) {
        if (root != null) {
            printInOrder(root.left);
            System.out.print(root.val + " ");
            printInOrder(root.right);
        }
    }
}
```
### java霍夫曼树
```java
import java.util.PriorityQueue;

class HuffmanNode implements Comparable<HuffmanNode> {
    int weight;
    HuffmanNode left, right;

    HuffmanNode(int weight) {
        this.weight = weight;
        left = right = null;
    }

    @Override
    public int compareTo(HuffmanNode o) {
        return this.weight - o.weight;
    }
}

public class HuffmanTree {
    public static HuffmanNode buildHuffmanTree(int[] weights) {
        PriorityQueue<HuffmanNode> pq = new PriorityQueue<>();
        for (int weight : weights) pq.add(new HuffmanNode(weight));

        while (pq.size() > 1) {
            HuffmanNode left = pq.poll();
            HuffmanNode right = pq.poll();
            HuffmanNode parent = new HuffmanNode(left.weight + right.weight);
            parent.left = left;
            parent.right = right;
            pq.add(parent);
        }
        return pq.poll();
    }

    public static int calculateWPL(HuffmanNode root, int depth) {
        if (root.left == null && root.right == null) return root.weight * depth;
        return calculateWPL(root.left, depth + 1) + calculateWPL(root.right, depth + 1);
    }

    public static void main(String[] args) {
        int[] weights = {5, 3, 2, 8};
        HuffmanNode root = buildHuffmanTree(weights);
        System.out.println("WPL: " + calculateWPL(root, 0)); // 输出带权路径长度
    }
}
```
### java创建二维的list
```java
List<List<Integer>> g = new ArrayList<>();
```
### java的prime
```java
class Prim {
    public int prim(int[][] graph) {
        int numVertices = graph.length;
        boolean[] visited = new boolean[numVertices];
        int[] minEdge = new int[numVertices];
        for (int i = 0; i < numVertices; i++) minEdge[i] = Integer.MAX_VALUE;

        minEdge[0] = 0;
        int totalWeight = 0;

        for (int i = 0; i < numVertices; i++) {
            int u = -1;
            for (int j = 0; j < numVertices; j++) {
                if (!visited[j] && (u == -1 || minEdge[j] < minEdge[u])) u = j;
            }

            visited[u] = true;
            totalWeight += minEdge[u];
            for (int v = 0; v < numVertices; v++) {
                if (graph[u][v] != 0 && !visited[v] && graph[u][v] < minEdge[v]) {
                    minEdge[v] = graph[u][v];
                }
            }
        }
        return totalWeight;
    }
}
```
### java的克鲁斯卡尔算法
```java
import java.util.Arrays;

class Kruskal {
    class Edge implements Comparable<Edge> {
        int src, dest, weight;

        public int compareTo(Edge compareEdge) {
            return this.weight - compareEdge.weight;
        }
    }

    int find(int[] parent, int i) {
        if (parent[i] != i) parent[i] = find(parent, parent[i]);
        return parent[i];
    }

    void union(int[] parent, int[] rank, int x, int y) {
        int xRoot = find(parent, x);
        int yRoot = find(parent, y);
        if (rank[xRoot] < rank[yRoot]) parent[xRoot] = yRoot;
        else if (rank[xRoot] > rank[yRoot]) parent[yRoot] = xRoot;
        else {
            parent[yRoot] = xRoot;
            rank[xRoot]++;
        }
    }

    public int kruskal(int numVertices, Edge[] edges) {
        Arrays.sort(edges);
        int[] parent = new int[numVertices];
        int[] rank = new int[numVertices];
        for (int i = 0; i < numVertices; i++) parent[i] = i;

        int totalWeight = 0, e = 0;
        for (Edge edge : edges) {
            if (e == numVertices - 1) break;

            int x = find(parent, edge.src);
            int y = find(parent, edge.dest);
            if (x != y) {
                totalWeight += edge.weight;
                union(parent, rank, x, y);
                e++;
            }
        }
        return totalWeight;
    }
}
```
### java的拓补排序
```java
import java.util.*;

class TopologicalSort {
    public List<Integer> topologicalSort(int numVertices, int[][] edges) {
        List<Integer>[] graph = new LinkedList[numVertices];
        int[] inDegree = new int[numVertices];
        for (int i = 0; i < numVertices; i++) graph[i] = new LinkedList<>();

        for (int[] edge : edges) {
            graph[edge[0]].add(edge[1]);
            inDegree[edge[1]]++;
        }

        Queue<Integer> queue = new LinkedList<>();
        for (int i = 0; i < numVertices; i++) {
            if (inDegree[i] == 0) queue.add(i);
        }

        List<Integer> result = new ArrayList<>();
        while (!queue.isEmpty()) {
            int vertex = queue.poll();
            result.add(vertex);
            for (int neighbor : graph[vertex]) {
                inDegree[neighbor]--;
                if (inDegree[neighbor] == 0) queue.add(neighbor);
            }
        }
        return result;
    }
}
```
### java单源最短路
```java
class Dijkstra {
    public int[] dijkstra(int[][] graph, int src) {
        int numVertices = graph.length;
        boolean[] visited = new boolean[numVertices];
        int[] dist = new int[numVertices];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[src] = 0;

        for (int i = 0; i < numVertices; i++) {
            int u = -1;
            for (int j = 0; j < numVertices; j++) {
                if (!visited[j] && (u == -1 || dist[j] < dist[u])) u = j;
            }

            visited[u] = true;
            for (int v = 0; v < numVertices; v++) {
                if (graph[u][v] != 0 && !visited[v]) {
                    dist[v] = Math.min(dist[v], dist[u] + graph[u][v]);
                }
            }
        }
        return dist;
    }
}
```
### java求关键路径
```java
import java.util.*;

class Task {
    String name;
    int duration;
    List<Task> dependencies;

    Task(String name, int duration) {
        this.name = name;
        this.duration = duration;
        this.dependencies = new ArrayList<>();
    }

    void addDependency(Task task) {
        dependencies.add(task);
    }
}

public class CriticalPath {
    // 计算关键路径
    public static List<Task> findCriticalPath(List<Task> tasks) {
        Map<Task, Integer> earliestStartTime = new HashMap<>();
        Map<Task, Integer> latestFinishTime = new HashMap<>();
        List<Task> criticalPath = new ArrayList<>();

        // Step 1: Topological Sort (拓扑排序)
        Queue<Task> queue = new LinkedList<>();
        Set<Task> visited = new HashSet<>();
        for (Task task : tasks) {
            if (task.dependencies.isEmpty()) {
                queue.offer(task);
            }
        }

        List<Task> topologicalOrder = new ArrayList<>();
        while (!queue.isEmpty()) {
            Task task = queue.poll();
            if (!visited.contains(task)) {
                visited.add(task);
                topologicalOrder.add(task);

                for (Task dependency : task.dependencies) {
                    if (dependency.dependencies.isEmpty() || visited.contains(dependency)) {
                        queue.offer(dependency);
                    }
                }
            }
        }

        // Step 2: 计算最早开始时间（Earliest Start Time, ES）
        int currentTime = 0;
        for (Task task : topologicalOrder) {
            int earliestStart = 0;
            for (Task dep : task.dependencies) {
                earliestStart = Math.max(earliestStart, earliestStartTime.get(dep) + dep.duration);
            }
            earliestStartTime.put(task, earliestStart);
            currentTime = Math.max(currentTime, earliestStart + task.duration);
        }

        // Step 3: 计算最晚完成时间（Latest Finish Time, LF）
        for (Task task : topologicalOrder) {
            latestFinishTime.put(task, currentTime - task.duration);
        }

        // Step 4: 识别关键路径
        for (Task task : topologicalOrder) {
            int earliestStart = earliestStartTime.get(task);
            int latestFinish = latestFinishTime.get(task);

            // 判断是否为关键路径任务：最早开始时间 == 最晚完成时间
            if (earliestStart == latestFinish - task.duration) {
                criticalPath.add(task);
            }
        }

        return criticalPath;
    }

    public static void main(String[] args) {
        // 创建任务
        Task taskA = new Task("A", 3);
        Task taskB = new Task("B", 2);
        Task taskC = new Task("C", 4);
        Task taskD = new Task("D", 2);
        Task taskE = new Task("E", 3);

        // 定义依赖关系
        taskB.addDependency(taskA);
        taskC.addDependency(taskA);
        taskD.addDependency(taskB);
        taskE.addDependency(taskC);

        List<Task> tasks = Arrays.asList(taskA, taskB, taskC, taskD, taskE);

        // 查找并输出关键路径
        List<Task> criticalPath = findCriticalPath(tasks);
        System.out.println("Critical Path:");
        for (Task task : criticalPath) {
            System.out.println(task.name);
        }
    }
}
```
### 折半查找
```java
public static int binarySearch(int[] arr, int target) {
    int left = 0, right = arr.length - 1;
    while (left + 1 != right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) {
            return mid; // 找到元素，返回下标
        } else if (arr[mid] < target) {
            left = mid; // 目标在右半边
        } else {
            right = mid; // 目标在左半边
        }
    }
    return -1; // 未找到元素
}
```
### AVL 树、B-树、B+树构造规则和特点

- **AVL树**： AVL树是一种平衡二叉搜索树，它满足二叉树的所有性质，并且任何一个节点的左右子树的高度差不超过1。通过旋转操作来保持平衡。
    
    - **构造规则**：每个节点的平衡因子（左子树高度 - 右子树高度）只能为 -1、0 或 1，超出这个范围时需要通过旋转来调整。
- **B-树**： B-树是一种自平衡的多路查找树，它的每个节点可以有多个子树。B-树被广泛应用于文件系统、数据库中。
    
    - **构造规则**：每个节点包含多个元素，且节点内元素保持有序，子树按节点内的元素值进行划分。
- **B+树**： B+树是B-树的一种变种，它在B-树的基础上，所有数据都存储在叶子节点中，内部节点仅用于引导查找。B+树广泛用于数据库和文件系统中。
    

### 哈希表的基本概念，哈希函数的构造方法、处理冲突的方法、哈希表的查找与分析

- **哈希表（Hash Table）**： 哈希表是通过哈希函数将键映射到表中的某个位置，从而实现高效查找的一种数据结构。哈希表的查找、插入和删除操作的平均时间复杂度为 O(1)，但最坏情况下可能退化为 O(n)。
    
- **哈希函数**： 哈希函数是将输入（键）映射为一个哈希值（通常是整数）的函数。一个好的哈希函数应该尽量避免哈希冲突，并使哈希值均匀分布。
    
- **处理冲突的方法**：
    
    - **开放寻址法**：当哈希表发生冲突时，查找下一个空位进行插入。例如线性探测、二次探测等。
    - **链式法**：每个哈希桶中的元素通过链表链接，当发生冲突时，新的元素插入到链表中。
- **哈希表的查找与分析**： 哈希表查找的效率主要取决于哈希函数的质量和冲突解决策略。如果哈希函数优秀且冲突少，则查找效率非常高。反之，如果出现大量冲突，查找效率会下降。
## 排序
#### 1. **直接插入排序（Insertion Sort）**
直接插入排序是一种简单的排序算法，它通过逐步将元素插入到已排序的部分。
```java
public static void insertionSort(int[] arr) {
    for (int i = 1; i < arr.length; i++) {
        int key = arr[i];
        int j = i - 1;
        // 将大于 key 的元素向右移动一位
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}
```
#### 2. **冒泡排序（Bubble Sort）**
冒泡排序通过反复交换相邻元素，直到没有需要交换的元素为止。
```java
public static void bubbleSort(int[] arr) {
    for (int i = 0; i < arr.length - 1; i++) {
        for (int j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                // 交换相邻元素
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}
```
#### 3. **简单选择排序（Selection Sort）**
选择排序通过每一轮选择最小的元素放到已排序部分的末尾。
```java
public static void selectionSort(int[] arr) {
    for (int i = 0; i < arr.length - 1; i++) {
        int minIndex = i;
        for (int j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        // 交换最小元素到当前位置
        int temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
}
```
#### 4. **快速排序（Quick Sort）**
快速排序使用分治法，通过一个“划分”操作将数组分成两个子数组，分别排序，然后合并结果。这里使用 **划分方法 2**，即选择数组的最后一个元素作为基准。
```java
public static void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        // 获取分区索引
        int pivotIndex = partition(arr, low, high);
        // 递归地排序左右子数组
        quickSort(arr, low, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, high);
    }
}

private static int partition(int[] arr, int low, int high) {
    int pivot = arr[high]; // 选择最后一个元素作为基准
    int i = low - 1; // i 是小于 pivot 的子数组的最后一个元素的索引
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            // 交换
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    // 将基准元素放到正确位置
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    return i + 1;
}
```
#### 1. **折半插入排序（Binary Insertion Sort）**
折半插入排序与直接插入排序类似，但它使用二分查找来确定插入位置，从而减少了比较的次数
```java
public static void binaryInsertionSort(int[] arr) {
    for (int i = 1; i < arr.length; i++) {
        int key = arr[i];
        int left = 0, right = i - 1;
        // 使用二分查找来定位插入位置
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (arr[mid] < key) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        // 移动元素，为 key 腾出位置
        for (int j = i - 1; j >= left; j--) {
            arr[j + 1] = arr[j];
        }
        arr[left] = key;
    }
}
```
#### 2. **希尔排序（Shell Sort）**
希尔排序是插入排序的改进版，通过分组进行插入排序，提高了效率。
```java
public static void shellSort(int[] arr) {
    int gap = arr.length / 2;
    while (gap > 0) {
        for (int i = gap; i < arr.length; i++) {
            int temp = arr[i];
            int j = i;
            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            arr[j] = temp;
        }
        gap /= 2; // 缩小 gap
    }
}
```
#### 3. **堆排序（Heap Sort）**
堆排序是一种选择排序算法，它使用堆这种数据结构。堆排序的时间复杂度为 O(n log n)。
```java
public static void heapSort(int[] arr) {
    int n = arr.length;
    // 建立最大堆
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    // 从堆顶移除最大元素，重新调整堆
    for (int i = n - 1; i > 0; i--) {
        int temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        heapify(arr, i, 0);
    }
}

private static void heapify(int[] arr, int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }
    if (largest != i) {
        int swap = arr[i];
        arr[i] = arr[largest];
        arr[largest] = swap;
        heapify(arr, n, largest);
    }
}
```
#### 4. **2-路归并排序（Merge Sort）**
归并排序是一种分治法的排序算法，它将数组分成两部分，分别排序后再合并。
```java
public static void mergeSort(int[] arr) {
    if (arr.length < 2) {
        return;
    }
    int mid = arr.length / 2;
    int[] left = Arrays.copyOfRange(arr, 0, mid);
    int[] right = Arrays.copyOfRange(arr, mid, arr.length);
    
    mergeSort(left);
    mergeSort(right);
    
    merge(arr, left, right);
}

private static void merge(int[] arr, int[] left, int[] right) {
    int i = 0, j = 0, k = 0;
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            arr[k++] = left[i++];
        } else {
            arr[k++] = right[j++];
        }
    }
    while (i < left.length) {
        arr[k++] = left[i++];
    }
    while (j < right.length) {
        arr[k++] = right[j++];
    }
}
```
#### 5. **基数排序（Radix Sort）**
基数排序是非比较的排序方法，适用于整数排序，按位进行排序。
```java
import java.util.Arrays;

public class RadixSort {

    // 基数排序主函数
    public static void radixSort(int[] arr) {
        // 1. 找到数组中的最大值，用来决定排序的位数
        int max = Arrays.stream(arr).max().getAsInt();
        
        // 2. 按每一位排序，直到最大值的位数
        for (int exp = 1; max / exp > 0; exp *= 10) {
            // 对每一位进行计数排序
            countingSortByDigit(arr, exp);
        }
    }

    // 使用计数排序对每一位进行排序
    private static void countingSortByDigit(int[] arr, int exp) {
        int[] output = new int[arr.length]; // 输出数组，存储排序后的结果
        int[] count = new int[10]; // 计数数组，统计每一位上数字的出现次数（0-9）

        // 1. 统计当前位数字出现的次数
        for (int i = 0; i < arr.length; i++) {
            int digit = (arr[i] / exp) % 10; // 获取当前位的数字
            count[digit]++;
        }

        // 2. 计算当前位置的累积次数
        for (int i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }

        // 3. 从右到左遍历原始数组，按照当前位的数字放入输出数组
        for (int i = arr.length - 1; i >= 0; i--) {
            int digit = (arr[i] / exp) % 10; // 获取当前位的数字
            output[count[digit] - 1] = arr[i];
            count[digit]--;
        }

        // 4. 将输出数组的内容复制回原数组
        System.arraycopy(output, 0, arr, 0, arr.length);
    }

    // 测试代码
    public static void main(String[] args) {
        int[] arr = {170, 45, 75, 90, 802, 24, 2, 66};
        System.out.println("原始数组: " + Arrays.toString(arr));
        radixSort(arr);
        System.out.println("排序后的数组: " + Arrays.toString(arr));
    }
}
```