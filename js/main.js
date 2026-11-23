// main.js - Master Orchestrator for Advanced Java Exhibition (13 Archival Exhibits)
document.addEventListener('DOMContentLoaded', () => {
  let galleryData = null;

  // Primary Layout Nodes
  const exploreBtn = document.getElementById('btn-explore');
  const unitsContainer = document.getElementById('exhibition-units');
  const searchInput = document.getElementById('exhibit-search-input');
  
  // Student Metadata Fields
  const studentName = document.getElementById('val-student-name');
  const studentRoll = document.getElementById('val-student-roll');
  const studentDept = document.getElementById('val-student-dept');
  const studentSem = document.getElementById('val-student-sem');
  const studentCollege = document.getElementById('val-student-college');

  // Stats Counters
  const heroBadge = document.getElementById('hero-badge-count');
  const studentTasksCount = document.getElementById('student-tasks-count');
  const showcaseCounter = document.getElementById('showcase-counter-stat');
  const railTotalNum = document.getElementById('rail-total-num');
  const railActiveNum = document.getElementById('rail-active-num');

  // Archival Fallback Data for offline / file:// protocol
  const DEFAULT_DATA = {
  "student": {
    "name": "Likhithsai Vemulapalli",
    "rollNumber": "24EU08197",
    "college": "Siddhartha Academy of Higher Education",
    "department": "B.Tech Information Technology",
    "semester": "5th Semester \u00b7 3rd Year",
    "laboratory": "Advanced Java Laboratory (24IT303)",
    "recordedTasks": 13,
    "labWeeks": 13,
    "courseCode": "24IT303",
    "labCode": "24IT303"
  },
  "exhibits": [
    {
      "id": "exhibit-01",
      "number": "01",
      "title": "Adv. Java Programming / Lab-1: Architectural Fundamentals",
      "technology": "Java Fundamentals \u00b7 Applets \u00b7 Servlets \u00b7 JDBC / ODBC \u00b7 Spring Framework",
      "category": "Unit I: Fundamentals",
      "unit": "Unit I",
      "readingTime": "6 min review",
      "difficulty": "Foundation",
      "description": "Comprehensive comparative study of Core Java and Advanced Java, Applets lifecycle, Servlets request-response model, JDBC vs ODBC database connectivity, HTTP Cookies and Sessions, Spring Boot vs Traditional Spring Framework, and standalone vs enterprise web architectures.",
      "aim": "To answer the Lab-1 questions on Java architectural fundamentals, applets, servlets, JDBC and ODBC, cookies and sessions, and requirements of enterprise web applications.",
      "keyConcepts": [
        "1. What are the differences between Core Java and Advanced Java?",
        "2. What are the main important features of Applets in Java?",
        "3. What are the key features of Java Servlets?",
        "4. What are the differences between Applets and Servlets in Java?",
        "5. What is the main role of JDBC and ODBC in database connectivity?",
        "6. What are the differences between ODBC and JDBC?",
        "7. What are the differences between Cookies and Sessions in Web Applications?",
        "8. What are the differences between Spring Boot and the Traditional Spring Framework?",
        "9. What are the differences between Standalone Applications and Web Applications?",
        "10. What are the basic requirements for executing a Web Application?"
      ],
      "procedure": [
        "Review comparative differences between Core Java and Advanced Java.",
        "Summarize features of Java Applets and their security sandbox model.",
        "Analyze Java Servlets and client-server request dispatching.",
        "Compare JDBC and ODBC driver architectures and performance.",
        "Analyze state management via HTTP Cookies and HttpSession.",
        "Evaluate Spring Boot opinionated auto-configuration vs XML-based Spring."
      ],
      "pdfPath": "weeks/week1/Week 01 - Advanced Java Fundamentals & Web Architecture.pdf",
      "pageCount": 5,
      "artifactType": "lab-questionnaire",
      "specs": {
        "Document": "Adv. Java Programming / Lab-1",
        "Curriculum": "Java Foundations & Web Architecture",
        "Source": "weeks/week1/Week 01 - Advanced Java Fundamentals & Web Architecture.pdf",
        "Page Count": 5
      },
      "pages": [
        "weeks/week1/pages/page-01.jpg",
        "weeks/week1/pages/page-02.jpg",
        "weeks/week1/pages/page-03.jpg",
        "weeks/week1/pages/page-04.jpg",
        "weeks/week1/pages/page-05.jpg"
      ]
    },
    {
      "id": "exhibit-02",
      "number": "02",
      "title": "Downloading, Installing, and Configuring OpenJDK & Oracle JDK SE 26 on Ubuntu",
      "technology": "OpenJDK \u00b7 Oracle JDK SE 26 \u00b7 Ubuntu Linux \u00b7 update-alternatives \u00b7 POSIX",
      "category": "Unit I: Environment",
      "unit": "Unit I",
      "readingTime": "5 min setup",
      "difficulty": "System Level",
      "description": "Production installation and multi-version management of OpenJDK and Oracle JDK SE 26 in the Ubuntu operating system, utilizing POSIX tar extraction, system directory layout in /opt, update-alternatives registration, and dual-binary verification.",
      "aim": "To download, install, configure, register, and verify Oracle JDK SE 26 and OpenJDK binaries in the Ubuntu operating system.",
      "keyConcepts": [
        "Step 1: Open Terminal and navigate to Downloads directory (cd ~/Downloads)",
        "Step 2: Download Oracle JDK 26 Linux x64 archive via wget",
        "Step 3: Extract the gzip tarball (tar -xzf jdk-26_linux-x64_bin.tar.gz)",
        "Step 4: Move extracted JDK hierarchy to /opt/jdk-26 system path",
        "Step 5: Register java and javac with update-alternatives system manager",
        "Step 6: Configure system default runtime via update-alternatives --config",
        "Step 7: Verify runtime environment (java -version and javac -version)"
      ],
      "procedure": [
        "Open the terminal shell and navigate to ~/Downloads.",
        "Execute wget to fetch the official Oracle JDK 26 linux-x64 binary archive.",
        "Decompress the tarball using tar -xzf.",
        "Relocate the JDK directory to the standard /opt/jdk-26 system path using sudo mv.",
        "Register java and javac with update-alternatives with priority flags.",
        "Validate active runtime with java -version and javac -version."
      ],
      "pdfPath": "weeks/week2/Week 02 - OpenJDK & Oracle JDK 26 Installation on Ubuntu.pdf",
      "pageCount": 2,
      "artifactType": "setup-protocol",
      "specs": {
        "Document": "JDK SE 26 Ubuntu Installation Protocol",
        "System Target": "Ubuntu Linux (POSIX x86_64)",
        "Source": "weeks/week2/Week 02 - OpenJDK & Oracle JDK 26 Installation on Ubuntu.pdf",
        "Page Count": 2
      },
      "pages": [
        "weeks/week2/pages/page-01.jpg",
        "weeks/week2/pages/page-02.jpg"
      ]
    },
    {
      "id": "exhibit-03",
      "number": "03",
      "title": "Java & MS Access Database Connectivity Without DSN (UCanAccess)",
      "technology": "UCanAccess 5.1.3 \u00b7 Jackcess \u00b7 HSQLDB \u00b7 MS Access (.accdb) \u00b7 Pure JDBC",
      "category": "Unit I: Database",
      "unit": "Unit I",
      "readingTime": "7 min setup",
      "difficulty": "Intermediate",
      "description": "Direct Type-4 driverless Java-to-MS Access connection process without relying on legacy Windows ODBC DSN, incorporating UCanAccess, Jackcess, Apache Commons Lang/Logging, and HSQLDB libraries with SQL queries on Database1.accdb.",
      "aim": "To connect a Java application directly to a Microsoft Access database (.accdb) without an ODBC DSN using UCanAccess and supporting driver libraries.",
      "keyConcepts": [
        "Step 1: Create local directory structure (mkdir ~/Downloads/ucanaccess)",
        "Step 2: Navigate to target directory and fetch UCanAccess 5.1.3 JAR",
        "Step 3: Download supporting dependencies (Jackcess 4.0.8, Commons-Lang3, Commons-Logging, HSQLDB)",
        "Step 4: Create Database1.accdb with student table (ID, NAME, MARKS)",
        "Step 5: Author AccessDemo.java connecting via jdbc:ucanaccess://",
        "Step 6: Configure comprehensive CLASSPATH including all 5 required JARs",
        "Step 7: Compile and execute Java program to query Access records"
      ],
      "procedure": [
        "Create working directory for UCanAccess libraries.",
        "Download UCanAccess core and dependencies (Jackcess, HSQLDB, Commons).",
        "Initialize Access database file Database1.accdb with student schema.",
        "Write AccessDemo.java using standard JDBC DriverManager connection string.",
        "Export CLASSPATH environment variable referencing all dependency JARs.",
        "Compile AccessDemo.java and execute query to retrieve student marks."
      ],
      "pdfPath": "weeks/week3/Week 03 - Java and MS Access Database Connectivity without DSN.pdf",
      "pageCount": 3,
      "artifactType": "ms-access-connection",
      "specs": {
        "Document": "Java & MS Access Without DSN Protocol",
        "Database": "Database1.accdb",
        "Driver": "net.ucanaccess.jdbc.UcanaccessDriver",
        "Source": "weeks/week3/Week 03 - Java and MS Access Database Connectivity without DSN.pdf",
        "Page Count": 3
      },
      "pages": [
        "weeks/week3/pages/page-01.jpg",
        "weeks/week3/pages/page-02.jpg",
        "weeks/week3/pages/page-03.jpg"
      ]
    },
    {
      "id": "exhibit-04",
      "number": "04",
      "title": "JDBC Connectivity with MySQL Database",
      "technology": "MySQL 8+ \u00b7 MySQL Connector/J \u00b7 JDBC Statement \u00b7 ResultSet",
      "category": "Unit I: Database",
      "unit": "Unit I",
      "readingTime": "5 min demo",
      "difficulty": "Intermediate",
      "description": "Foundational MySQL database pipeline establishing a JDBC socket connection to MySQL, creating college database and student table, inserting sample records, and executing query statements using ResultSet iteration.",
      "aim": "To establish a Java JDBC connection to a MySQL database server and retrieve student table records from the college database.",
      "keyConcepts": [
        "Step 1: Create MySQL Database (CREATE DATABASE college; USE college;)",
        "Step 2: Define table structure (CREATE TABLE student (id INT, name VARCHAR(50)))",
        "Step 3: Insert initial dataset into student table (Ramesh, Haswika, Harshith)",
        "Step 4: Load JDBC driver (com.mysql.cj.jdbc.Driver)",
        "Step 5: Establish connection via DriverManager.getConnection()",
        "Step 6: Execute SELECT query using Statement object and iterate ResultSet",
        "Step 7: Output records to console and cleanly terminate connection"
      ],
      "procedure": [
        "Create college schema and student table in MySQL server.",
        "Populate initial records with roll numbers and student names.",
        "Author JdbcDemo.java with connection parameters and credentials.",
        "Execute Statement.executeQuery('SELECT * FROM student').",
        "Traverse ResultSet rows using rs.next() and print attributes to stdout.",
        "Close ResultSet, Statement, and Connection objects in finally/try-with-resources."
      ],
      "pdfPath": "weeks/week4/Week 04 - JDBC MySQL Database Connectivity.pdf",
      "pageCount": 3,
      "artifactType": "mysql-jdbc-demo",
      "specs": {
        "Document": "JDBC With MySQL Database",
        "Target Schema": "college.student",
        "Driver": "com.mysql.cj.jdbc.Driver",
        "Source": "weeks/week4/Week 04 - JDBC MySQL Database Connectivity.pdf",
        "Page Count": 3
      },
      "pages": [
        "weeks/week4/pages/page-01.jpg",
        "weeks/week4/pages/page-02.jpg",
        "weeks/week4/pages/page-03.jpg"
      ]
    },
    {
      "id": "exhibit-05",
      "number": "05",
      "title": "Local & Remote Network MySQL Database Connectivity Using JDBC",
      "technology": "Remote MySQL \u00b7 TCP/IP Port 3306 \u00b7 LAN IP Socket \u00b7 JDBC \u00b7 Employee Schema",
      "category": "Unit I: Networking & JDBC",
      "unit": "Unit I",
      "readingTime": "8 min analysis",
      "difficulty": "Advanced",
      "description": "Dual investigation comparing local localhost JDBC socket connectivity against remote IPv4 network database connectivity (jdbc:mysql://10.0.8.130:3306/it). Demonstrates firewall binding, remote user privilege grants, employee record traversal, and remote DML INSERT operations.",
      "aim": "To establish local and remote network database connectivity using Java JDBC to retrieve, insert, and verify records in the employee table across a local area network.",
      "keyConcepts": [
        "Part A: Localhost Database Connectivity (JavaApplication26.java)",
        "Part B: Remote Network Database Connectivity via IP (RemoteDB.java)",
        "Step 1: Network binding configuration on remote MySQL (bind-address = 0.0.0.0)",
        "Step 2: MySQL user privilege grant for remote client subnet access",
        "Step 3: JDBC Driver initialization via com.mysql.cj.jdbc.Driver",
        "Step 4: Connection string over network IP (jdbc:mysql://10.0.8.130:3306/it)",
        "Step 5: Query execution for employee schema (rollno, name)",
        "Step 6: Remote DML execution (INSERT INTO employee VALUES('84','ipsitha'))",
        "Step 7: Output verification and resource cleanup"
      ],
      "procedure": [
        "Configure remote MySQL server to listen on TCP port 3306 across LAN interfaces.",
        "Grant permissions on `it` database to user 'root' from remote IP address.",
        "Include mysql-connector-j-9.4.0.jar in runtime classpath.",
        "Execute local query via JavaApplication26 to verify local socket operation.",
        "Execute RemoteDB.java connecting across network to 10.0.8.130:3306.",
        "Read remote records with ResultSet and insert new employee record using executeUpdate().",
        "Confirm remote transaction persistence and close connection."
      ],
      "pdfPath": "weeks/week5/Week 05 - Local and Remote MySQL Network Database Connectivity.pdf",
      "pageCount": 6,
      "artifactType": "remote-db-experiment",
      "specs": {
        "Document": "Local and Remote JDBC Network Connectivity",
        "Remote Host": "10.0.8.130:3306 (TCP)",
        "Database": "it (employee table)",
        "Source": "weeks/week5/Week 05 - Local and Remote MySQL Network Database Connectivity.pdf",
        "Page Count": 6
      },
      "pages": [
        "weeks/week5/pages/page-01.jpg",
        "weeks/week5/pages/page-02.jpg",
        "weeks/week5/pages/page-03.jpg",
        "weeks/week5/pages/page-04.jpg",
        "weeks/week5/pages/page-05.jpg",
        "weeks/week5/pages/page-06.jpg"
      ]
    },
    {
      "id": "exhibit-06",
      "number": "06",
      "title": "Advanced JDBC Programming & CRUD Operations Suite",
      "technology": "JDBC \u00b7 PreparedStatement \u00b7 CallableStatement \u00b7 MySQL Stored Procedures \u00b7 CRUD",
      "category": "Unit I: Advanced JDBC",
      "unit": "Unit I",
      "readingTime": "12 min review",
      "difficulty": "Comprehensive",
      "description": "Comprehensive practical suite covering 6 enterprise JDBC experiments: full CRUD operations on Student table, CallableStatement stored procedure invocations on Person table, PreparedStatement parameterized salary filters, Product catalog operations, Department deletions, and Book table persistence.",
      "aim": "To master advanced JDBC programming by implementing CRUD operations, parameterized SQL statements, and stored procedure calls across multiple relational schemas.",
      "keyConcepts": [
        "Experiment 1: Complete CRUD Operations on Student Database (INSERT, SELECT, UPDATE, DELETE)",
        "Experiment 2: Insert Data into Person Table Using CallableStatement (Stored Procedures)",
        "Experiment 3: Select Employees with Salary Greater Than Threshold Using PreparedStatement",
        "Experiment 4: Insert and Display Product Details Using Parameterized Statements",
        "Experiment 5: Delete Department Record Using CallableStatement",
        "Experiment 6: Comprehensive CRUD Operations on Book Table Schema"
      ],
      "procedure": [
        "Design relational tables for Student, Person, Employee, Product, Department, and Book.",
        "Load MySQL JDBC driver and establish robust database connection.",
        "Use PreparedStatement for secure, SQL-injection-resistant parameterized queries.",
        "Define MySQL stored procedures with IN parameters and call via CallableStatement.",
        "Implement interactive menu-driven CRUD routines for Student and Book management.",
        "Verify query results, transaction safety, and graceful exception handling."
      ],
      "pdfPath": "weeks/week6/Week 06 - Advanced JDBC Programming & CRUD Operations.pdf",
      "pageCount": 21,
      "artifactType": "jdbc-crud-experiment",
      "specs": {
        "Document": "Week 6 \u2013 Advanced JDBC Programming Suite",
        "Experiments": "6 Full Laboratory Experiments",
        "Source": "weeks/week6/Week 06 - Advanced JDBC Programming & CRUD Operations.pdf",
        "Page Count": 21
      },
      "pages": [
        "weeks/week6/pages/page-01.jpg",
        "weeks/week6/pages/page-02.jpg",
        "weeks/week6/pages/page-03.jpg",
        "weeks/week6/pages/page-04.jpg",
        "weeks/week6/pages/page-05.jpg",
        "weeks/week6/pages/page-06.jpg",
        "weeks/week6/pages/page-07.jpg",
        "weeks/week6/pages/page-08.jpg",
        "weeks/week6/pages/page-09.jpg",
        "weeks/week6/pages/page-10.jpg",
        "weeks/week6/pages/page-11.jpg",
        "weeks/week6/pages/page-12.jpg",
        "weeks/week6/pages/page-13.jpg",
        "weeks/week6/pages/page-14.jpg",
        "weeks/week6/pages/page-15.jpg",
        "weeks/week6/pages/page-16.jpg",
        "weeks/week6/pages/page-17.jpg",
        "weeks/week6/pages/page-18.jpg",
        "weeks/week6/pages/page-19.jpg",
        "weeks/week6/pages/page-20.jpg",
        "weeks/week6/pages/page-21.jpg"
      ]
    },
    {
      "id": "exhibit-07",
      "number": "07",
      "title": "Java Servlets & HTML Web Applications in Apache Tomcat",
      "technology": "Java Servlets \u00b7 GenericServlet \u00b7 HttpServlet \u00b7 HTML5 \u00b7 Apache Tomcat",
      "category": "Unit II: Servlets",
      "unit": "Unit II",
      "readingTime": "10 min review",
      "difficulty": "Web Intermediate",
      "description": "Foundational server-side Java web programming covering HTML form generation, Servlet interface implementation, GenericServlet protocol-independent processing, HttpServlet request-response dispatching, web.xml configuration, and Apache Tomcat deployment.",
      "aim": "To create server-side Java web applications using HTML and Servlets (GenericServlet and HttpServlet) and deploy them to Apache Tomcat Server.",
      "keyConcepts": [
        "1. Simple Web Application using Pure HTML5",
        "2. Simple Web Application using Basic Servlet (PrintWriter output)",
        "3. Web Application using GenericServlet (Protocol-Independent Architecture)",
        "4. Web Application using HttpServlet (doGet() and doPost() Overrides)",
        "5. How to Deploy and Run a Servlet in Apache Tomcat Server",
        "6. web.xml Deployment Descriptor & <servlet-mapping> Configuration"
      ],
      "procedure": [
        "Construct HTML client user interface.",
        "Implement basic Servlet generating dynamic HTML response via PrintWriter.",
        "Inherit GenericServlet and override service(ServletRequest, ServletResponse).",
        "Extend HttpServlet and override doGet(HttpServletRequest, HttpServletResponse).",
        "Configure servlet mapping in web.xml or via @WebServlet annotation.",
        "Deploy application WAR archive to Apache Tomcat webapps directory and test via browser."
      ],
      "pdfPath": "weeks/week7/Week 07 - Java Servlets & Tomcat Web Applications.pdf",
      "pageCount": 8,
      "artifactType": "servlet-task-set",
      "specs": {
        "Document": "Java Week 7 \u2013 Servlets and Web Applications",
        "Server": "Apache Tomcat Server",
        "Source": "weeks/week7/Week 07 - Java Servlets & Tomcat Web Applications.pdf",
        "Page Count": 8
      },
      "pages": [
        "weeks/week7/pages/page-01.jpg",
        "weeks/week7/pages/page-02.jpg",
        "weeks/week7/pages/page-03.jpg",
        "weeks/week7/pages/page-04.jpg",
        "weeks/week7/pages/page-05.jpg",
        "weeks/week7/pages/page-06.jpg",
        "weeks/week7/pages/page-07.jpg",
        "weeks/week7/pages/page-08.jpg"
      ]
    },
    {
      "id": "exhibit-08",
      "number": "08",
      "title": "Java Servlets Advanced Practical Suite & Database Integration",
      "technology": "HttpServlet \u00b7 GET & POST \u00b7 GenericServlet \u00b7 Lifecycle \u00b7 HTML Forms \u00b7 JDBC in Servlets",
      "category": "Unit II: Servlets",
      "unit": "Unit II",
      "readingTime": "15 min deep-dive",
      "difficulty": "Advanced",
      "description": "In-depth 7-experiment server-side Java suite exploring HTTP GET and POST request lifecycle, Servlet interface lifecycle hooks (init, service, destroy), dynamic form processing, database querying inside servlets via JDBC, online order checkout application, and customized response headers.",
      "aim": "To develop advanced HTTP Servlets handling GET/POST requests, managing servlet lifecycle, processing form data, connecting to MySQL via JDBC, and building interactive web applications.",
      "keyConcepts": [
        "Experiment 1: Develop HTTP Servlet demonstrating HTTP GET & POST handling",
        "Experiment 2: Develop servlet by extending GenericServlet class",
        "Experiment 3: Implement Servlet interface and demonstrate lifecycle methods (init, service, destroy)",
        "Experiment 4: Develop HTML form and process submitted data using Java Servlet",
        "Experiment 5: Develop servlet application that connects to MySQL database using JDBC",
        "Experiment 6: Develop online order processing application using HTML and Java Servlet",
        "Experiment 7: Develop servlet that reads client input and produces dynamic response"
      ],
      "procedure": [
        "Configure Java web environment in NetBeans / Eclipse with GlassFish or Tomcat.",
        "Write HttpServlet subclasses handling parameterized form actions.",
        "Implement logging inside init(), service(), and destroy() lifecycle methods.",
        "Establish JDBC connection inside servlet and format SQL result sets into HTML tables.",
        "Build complete multi-step online ordering system with price calculation and receipts.",
        "Test and verify servlet endpoints via web browser."
      ],
      "pdfPath": "weeks/week8/Week 08 - Java Servlets & HTTP Request Processing.pdf",
      "pageCount": 24,
      "artifactType": "servlets-deep-suite",
      "specs": {
        "Document": "Week 8 \u2013 Java Servlets Laboratory Suite",
        "Experiments": "7 Full Practical Experiments",
        "Source": "weeks/week8/Week 08 - Java Servlets & HTTP Request Processing.pdf",
        "Page Count": 24
      },
      "pages": [
        "weeks/week8/pages/page-01.jpg",
        "weeks/week8/pages/page-02.jpg",
        "weeks/week8/pages/page-03.jpg",
        "weeks/week8/pages/page-04.jpg",
        "weeks/week8/pages/page-05.jpg",
        "weeks/week8/pages/page-06.jpg",
        "weeks/week8/pages/page-07.jpg",
        "weeks/week8/pages/page-08.jpg",
        "weeks/week8/pages/page-09.jpg",
        "weeks/week8/pages/page-10.jpg",
        "weeks/week8/pages/page-11.jpg",
        "weeks/week8/pages/page-12.jpg",
        "weeks/week8/pages/page-13.jpg",
        "weeks/week8/pages/page-14.jpg",
        "weeks/week8/pages/page-15.jpg",
        "weeks/week8/pages/page-16.jpg",
        "weeks/week8/pages/page-17.jpg",
        "weeks/week8/pages/page-18.jpg",
        "weeks/week8/pages/page-19.jpg",
        "weeks/week8/pages/page-20.jpg",
        "weeks/week8/pages/page-21.jpg",
        "weeks/week8/pages/page-22.jpg",
        "weeks/week8/pages/page-23.jpg",
        "weeks/week8/pages/page-24.jpg"
      ]
    },
    {
      "id": "exhibit-09",
      "number": "09",
      "title": "Spring Boot & Maven Application Development Suite",
      "technology": "Spring Boot 3 \u00b7 Spring Starter \u00b7 Apache Maven \u00b7 pom.xml \u00b7 Spring Tool Suite (STS)",
      "category": "Unit III: Spring Boot",
      "unit": "Unit III",
      "readingTime": "15 min study",
      "difficulty": "Enterprise",
      "description": "Three-part enterprise development guide utilizing Spring Tool Suite (STS) and Apache Maven: generating Spring Starter projects, developing embedded Tomcat REST web applications, and comprehensive pom.xml dependency management and build plugins.",
      "aim": "To create, configure, build, and deploy Spring Boot web applications using Apache Maven in Spring Tool Suite (STS), mastering project object model (pom.xml) management.",
      "keyConcepts": [
        "Task 1: Building a Spring Boot Application Using Maven in Spring Tool Suite (STS)",
        "Task 2: Developing a Simple Spring Boot Web Application in STS (REST Web Controller)",
        "Task 3: Configuring POM.XML in Maven-based Spring Boot Project",
        "Spring Starter Project Wizard & Starter Dependencies (spring-boot-starter-web)",
        "Spring Boot Auto-Configuration & Embedded Apache Tomcat Server",
        "pom.xml Project Object Model: groupId, artifactId, dependencies, build plugins"
      ],
      "procedure": [
        "Launch Spring Tool Suite (STS) and create new Spring Starter Project.",
        "Select project metadata, packaging (Jar), Java version, and spring-boot-starter-web dependency.",
        "Develop web controller returning greeting endpoint at http://localhost:8080/.",
        "Inspect and configure pom.xml with dependencies and spring-boot-maven-plugin.",
        "Execute application via STS Spring Boot App runner.",
        "Verify browser response and inspect build lifecycle via Maven goals."
      ],
      "pdfPath": "weeks/week9/Week 09 - Spring Boot & Maven Application Development.pdf",
      "pageCount": 24,
      "artifactType": "spring-boot-suite",
      "specs": {
        "Document": "Week 9 \u2013 Spring Boot & Maven Suite",
        "Tasks": "Task 1 (Build), Task 2 (Web App), Task 3 (POM.XML)",
        "Source": "weeks/week9/Week 09 - Spring Boot & Maven Application Development.pdf",
        "Page Count": 24
      },
      "pages": [
        "weeks/week9/pages/page-01.jpg",
        "weeks/week9/pages/page-02.jpg",
        "weeks/week9/pages/page-03.jpg",
        "weeks/week9/pages/page-04.jpg",
        "weeks/week9/pages/page-05.jpg",
        "weeks/week9/pages/page-06.jpg",
        "weeks/week9/pages/page-07.jpg",
        "weeks/week9/pages/page-08.jpg",
        "weeks/week9/pages/page-09.jpg",
        "weeks/week9/pages/page-10.jpg",
        "weeks/week9/pages/page-11.jpg",
        "weeks/week9/pages/page-12.jpg",
        "weeks/week9/pages/page-13.jpg",
        "weeks/week9/pages/page-14.jpg",
        "weeks/week9/pages/page-15.jpg",
        "weeks/week9/pages/page-16.jpg",
        "weeks/week9/pages/page-17.jpg",
        "weeks/week9/pages/page-18.jpg",
        "weeks/week9/pages/page-19.jpg",
        "weeks/week9/pages/page-20.jpg",
        "weeks/week9/pages/page-21.jpg",
        "weeks/week9/pages/page-22.jpg",
        "weeks/week9/pages/page-23.jpg",
        "weeks/week9/pages/page-24.jpg"
      ]
    },
    {
      "id": "exhibit-10",
      "number": "10",
      "title": "Spring Boot Database Connectivity using JdbcTemplate with In-Memory H2 Database",
      "technology": "Spring Boot 3 \u00b7 JdbcTemplate \u00b7 H2 In-Memory DB \u00b7 RowMapper \u00b7 @PostConstruct \u00b7 Spring Web",
      "category": "Unit III: Spring & Database",
      "unit": "Unit III",
      "readingTime": "8 min study",
      "difficulty": "Intermediate",
      "description": "Database-driven Spring Boot service utilizing Spring JdbcTemplate and embedded in-memory H2 database: automated schema initialization, batch data seeding with @PostConstruct lifecycle hooks, RowMapper lambda projections, and web endpoint visualization.",
      "aim": "To design, develop, and validate a database-driven Spring Boot application utilizing Spring JdbcTemplate to connect to an embedded in-memory H2 database, automatically create tables, perform batch data insertions, execute SQL queries using RowMapper lambdas, and verify live database state via the H2 Web Console.",
      "keyConcepts": [
        "Elimination of boilerplate JDBC code via Spring JdbcTemplate & automatic exception translation",
        "Embedded H2 in-memory operational mode (jdbc:h2:mem:testdb) residing in JVM heap memory",
        "@PostConstruct lifecycle hook for automated schema creation (DDL) and record seeding (DML)",
        "RowMapper lambda expressions: mapping SQL ResultSet records directly to Java domain model instances",
        "Configuring custom server ports (server.port=83) and enabling H2 web console access (/h2-console)",
        "Spring Web Controller architecture exposing database query results to browser clients"
      ],
      "procedure": [
        "Generate a new Spring Boot project in STS incorporating Spring Web, Spring Data JDBC, and H2 Database dependencies.",
        "Configure application.properties with custom port 83 (server.port=83), in-memory datasource URL (spring.datasource.url=jdbc:h2:mem:testdb), default sa credentials, and enable the H2 Web Console.",
        "Create Author.java model class encapsulating firstName and lastName attributes with getters, setters, and constructors.",
        "Develop AuthorService.java annotated with @Service and autowire Spring JdbcTemplate.",
        "Define postConstruct() method annotated with @PostConstruct to execute DROP TABLE, CREATE TABLE, and batch INSERT statements.",
        "Implement findAuthors() using jdbcTemplate.query() and RowMapper lambda (rs, rowNum) -> new Author(...).",
        "Develop AuthorController.java with @RestController exposing GET / mapping returning author lists.",
        "Launch application, verify execution in STS console, inspect browser output, and explore H2 Web Console."
      ],
      "pdfPath": "weeks/week10/Week 10 - Spring Boot Database Connectivity using JdbcTemplate with H2.pdf",
      "pageCount": 7,
      "artifactType": "jdbctemplate-h2-suite",
      "specs": {
        "Document": "Week 10 \u2013 JdbcTemplate & H2 In-Memory Suite",
        "Components": "Author Model, AuthorService, AuthorController, H2 Console",
        "Source": "weeks/week10/Week 10 - Spring Boot Database Connectivity using JdbcTemplate with H2.pdf",
        "Page Count": 7
      },
      "pages": [
        "weeks/week10/pages/page-01.jpg",
        "weeks/week10/pages/page-02.jpg",
        "weeks/week10/pages/page-03.jpg",
        "weeks/week10/pages/page-04.jpg",
        "weeks/week10/pages/page-05.jpg",
        "weeks/week10/pages/page-06.jpg",
        "weeks/week10/pages/page-07.jpg"
      ]
    },
    {
      "id": "exhibit-11",
      "number": "11",
      "title": "Spring Boot JPA Application with Relational Database (MySQL) and Web Interface",
      "technology": "Spring Boot 3 \u00b7 Spring Data JPA \u00b7 Hibernate ORM \u00b7 MySQL 8.0 \u00b7 Thymeleaf \u00b7 REST API",
      "category": "Unit IV: Spring Data JPA",
      "unit": "Unit IV",
      "readingTime": "10 min study",
      "difficulty": "Enterprise",
      "description": "Enterprise Spring Boot application connecting to external MySQL relational database via Spring Data JPA and Hibernate ORM: entity mapping with identity generation, repository abstraction, automated schema synchronization, and dual client interfaces (RESTful JSON API and Thymeleaf HTML view).",
      "aim": "To design, develop, and deploy an enterprise Spring Boot application connecting to an external MySQL relational database using Spring Data JPA and Hibernate, implement Object-Relational Mapping (ORM) for an Employee entity, and provide dual client interfaces: a RESTful JSON API and a server-side rendered Thymeleaf HTML web page.",
      "keyConcepts": [
        "Object-Relational Mapping (ORM) bridging Java OOP entities and relational SQL tables",
        "Hibernate persistence provider with automatic schema validation and update (ddl-auto=update)",
        "Type-4 Pure Java MySQL Connector/J driver configuration with MySQL8Dialect",
        "JpaRepository abstraction providing out-of-the-box CRUD operations without DAO boilerplate",
        "Dual client interfaces: RESTful JSON endpoint via @RestController and HTML UI via Thymeleaf & Spring MVC",
        "Entity identity generation via @GeneratedValue(strategy = GenerationType.IDENTITY)"
      ],
      "procedure": [
        "Connect to MySQL on port 3306 via MySQL Workbench and create database testdb and relational table employee.",
        "Insert initial baseline records into MySQL table employee.",
        "Create Spring Boot Maven project in STS with Spring Data JPA, Spring Web, Thymeleaf, and MySQL Driver dependencies.",
        "Configure application.properties with MySQL JDBC URL, credentials, Hibernate dialect, and show-sql=true.",
        "Create Employee.java entity annotated with @Entity, @Id, @GeneratedValue, name, and department.",
        "Define EmployeeRepository.java interface extending JpaRepository<Employee, Integer>.",
        "Implement EmployeeRestController exposing GET /api/employees returning JSON list.",
        "Implement EmployeeWebController exposing GET /employees rendering employee-list.html via Thymeleaf.",
        "Run application, verify Hibernate SQL statements in console, and inspect both JSON and HTML browser views."
      ],
      "pdfPath": "weeks/week11/Week 11 - Spring Boot JPA Application with MySQL & Thymeleaf.pdf",
      "pageCount": 8,
      "artifactType": "jpa-mysql-suite",
      "specs": {
        "Document": "Week 11 \u2013 Spring Data JPA & MySQL Enterprise Suite",
        "Architecture": "Hibernate ORM, MySQL 8.0, REST API & Thymeleaf HTML",
        "Source": "weeks/week11/Week 11 - Spring Boot JPA Application with MySQL & Thymeleaf.pdf",
        "Page Count": 8
      },
      "pages": [
        "weeks/week11/pages/page-01.jpg",
        "weeks/week11/pages/page-02.jpg",
        "weeks/week11/pages/page-03.jpg",
        "weeks/week11/pages/page-04.jpg",
        "weeks/week11/pages/page-05.jpg",
        "weeks/week11/pages/page-06.jpg",
        "weeks/week11/pages/page-07.jpg",
        "weeks/week11/pages/page-08.jpg"
      ]
    },
    {
      "id": "exhibit-12",
      "number": "12",
      "title": "Spring Data JPA Repository Operations with In-Memory H2 Database",
      "technology": "Spring Boot 3 \u00b7 Spring Data JPA \u00b7 JpaRepository \u00b7 H2 Database \u00b7 @RestController \u00b7 JSON",
      "category": "Unit IV: JPA Repositories",
      "unit": "Unit IV",
      "readingTime": "8 min study",
      "difficulty": "Intermediate",
      "description": "Lightweight Spring Data JPA architecture demonstrating runtime dynamic proxy repository operations on a Student entity: in-memory H2 database persistence, browser-based record insertion via HTTP GET query parameters, complete collection retrieval as JSON, and live table verification in H2 Console.",
      "aim": "To implement, configure, and evaluate Spring Data JPA repository operations on a Student entity using an in-memory H2 database, establish browser-accessible HTTP GET endpoints to perform record insertion and retrieval without external testing utilities, and verify database state via the H2 Console.",
      "keyConcepts": [
        "Dynamic runtime repository proxy creation via Spring Data JPA extending JpaRepository<Student, Long>",
        "Standard CRUD operations (save, findAll, findById, delete) without writing DAO implementation code",
        "Browser-executable HTTP GET mappings using @RequestParam to trigger database record creation",
        "Automatic Jackson JSON serialization of persistent entity collections for RESTful delivery",
        "In-memory H2 database configuration (jdbc:h2:mem:testdb) with embedded web console verification",
        "Entity primary key generation using AUTO or IDENTITY strategies"
      ],
      "procedure": [
        "Create new Spring Boot project in STS incorporating Spring Web, Spring Data JPA, and H2 Database starters.",
        "Configure application.properties with in-memory H2 datasource URL, credentials, H2Dialect, and enable H2 Console.",
        "Create entity class Student.java with @Entity, @Id with @GeneratedValue, name, and city attributes.",
        "Define StudentRepository.java as an interface extending JpaRepository<Student, Long>.",
        "Develop StudentController.java annotated with @RestController and autowire StudentRepository.",
        "Implement GET / health check endpoint returning welcome status.",
        "Implement GET /add?name=...&city=... executing repo.save(new Student(name, city)) and returning confirmation.",
        "Implement GET /students returning repo.findAll() as JSON array.",
        "Execute Spring Boot app, perform record additions via Chrome URL requests, verify JSON output, and check H2 Console."
      ],
      "pdfPath": "weeks/week12/Week 12 - Spring Data JPA Repository Operations with In-Memory H2.pdf",
      "pageCount": 7,
      "artifactType": "jpa-h2-repo-suite",
      "specs": {
        "Document": "Week 12 \u2013 Spring Data JPA Repository Suite",
        "Core Features": "Student Entity, JpaRepository Proxy, GET-based Ingestion, JSON API",
        "Source": "weeks/week12/Week 12 - Spring Data JPA Repository Operations with In-Memory H2.pdf",
        "Page Count": 7
      },
      "pages": [
        "weeks/week12/pages/page-01.jpg",
        "weeks/week12/pages/page-02.jpg",
        "weeks/week12/pages/page-03.jpg",
        "weeks/week12/pages/page-04.jpg",
        "weeks/week12/pages/page-05.jpg",
        "weeks/week12/pages/page-06.jpg",
        "weeks/week12/pages/page-07.jpg"
      ]
    },
    {
      "id": "exhibit-13",
      "number": "13",
      "title": "Implementation of Derived and Custom Query Methods in Spring Data JPA",
      "technology": "Spring Data JPA \u00b7 Derived Queries \u00b7 JPQL \u00b7 Native SQL \u00b7 @Query \u00b7 CommandLineRunner",
      "category": "Unit IV: Advanced JPA Querying",
      "unit": "Unit IV",
      "readingTime": "12 min study",
      "difficulty": "Advanced",
      "description": "Comprehensive implementation of the 8 prescribed Spring Data JPA query methods: method name parsing (findBy, And, Or, OrderBy), JPQL object queries via @Query, native SQL query execution, automated CommandLineRunner data seeding, and runtime Hibernate SQL statement verification.",
      "aim": "To design, declare, implement, and validate specialized derived query methods and custom queries utilizing the @Query annotation (both JPQL and Native SQL) in Spring Data JPA repository interfaces for a Student entity, and observe runtime SQL generation and result sets.",
      "keyConcepts": [
        "Query derivation grammar parsing repository method names into Abstract Syntax Trees (AST)",
        "Derived filtering methods: findByName, findByFirstName, findByFirstNameAndLastName, findByFirstNameOrLastName",
        "Automatic SQL ORDER BY sorting clause generation via findByOrderByNameAsc",
        "Custom JPQL (Java Persistence Query Language) queries operating on entity objects via @Query",
        "Native SQL queries with nativeQuery=true executing direct database engine SQL statements",
        "Automated startup dataset population using CommandLineRunner / DataLoader component",
        "Inspecting generated SQL queries and parameter binding via spring.jpa.show-sql=true"
      ],
      "procedure": [
        "Define Student.java entity with id, name, firstName, lastName, city, and course fields.",
        "Create StudentRepository.java extending JpaRepository<Student, Long>.",
        "Declare the 8 required query methods: findAll, findByName, findByFirstName, findByFirstNameAndLastName, findByFirstNameOrLastName, findByOrderByNameAsc, @Query JPQL, and native @Query.",
        "Implement DataLoader.java using CommandLineRunner to seed diverse student records with matching and non-matching attributes upon startup.",
        "Develop StudentQueryController.java exposing distinct REST endpoints for testing each of the 8 query methods.",
        "Configure spring.jpa.show-sql=true in application.properties to verify exact SQL statements in console.",
        "Run application as Spring Boot App and execute test requests in Google Chrome for each query endpoint.",
        "Observe STS Console to verify generated Hibernate SQL statements and confirm JSON result accuracy."
      ],
      "pdfPath": "weeks/week13/Week 13 - Implementation of Derived & Custom Query Methods in Spring Data JPA.pdf",
      "pageCount": 11,
      "artifactType": "jpa-custom-queries-suite",
      "specs": {
        "Document": "Week 13 \u2013 Derived & Custom Query Methods Suite",
        "Query Scope": "8 Prescribed Methods (Derived, JPQL @Query, Native SQL)",
        "Source": "weeks/week13/Week 13 - Implementation of Derived & Custom Query Methods in Spring Data JPA.pdf",
        "Page Count": 11
      },
      "pages": [
        "weeks/week13/pages/page-01.jpg",
        "weeks/week13/pages/page-02.jpg",
        "weeks/week13/pages/page-03.jpg",
        "weeks/week13/pages/page-04.jpg",
        "weeks/week13/pages/page-05.jpg",
        "weeks/week13/pages/page-06.jpg",
        "weeks/week13/pages/page-07.jpg",
        "weeks/week13/pages/page-08.jpg",
        "weeks/week13/pages/page-09.jpg",
        "weeks/week13/pages/page-10.jpg",
        "weeks/week13/pages/page-11.jpg"
      ]
    }
  ]
};

  // Load Data with graceful fallback
  fetch('data.json')
    .then(res => {
      if (!res.ok) throw new Error('Data fetch failed');
      return res.json();
    })
    .then(data => {
      galleryData = data;
      initGallery(data);
    })
    .catch(err => {
      console.warn('Resolving with embedded archival exhibition data:', err);
      galleryData = DEFAULT_DATA;
      initGallery(DEFAULT_DATA);
    });

  function initGallery(data) {
    loadStudentProfile(data.student);
    assembleExhibits(data.exhibits || []);
    setupFilterAndSearch(data.exhibits || []);
    setupArchiveRail(data.exhibits || []);
    initProfileModal();
    setupMobileNav(data.exhibits || []);
    setupCourseRoadmap(data.exhibits || []);
    setupBonafideCertificate();
    setupCodePlayground();
    setupAnimatedConcepts();
    setupDeepLinks(data.exhibits || []);
    initializePhysicsEffects();
  }

  // Bonafide Certificate Interactive Features
  function setupBonafideCertificate() {
    const printBtn = document.getElementById('btn-print-certificate');
    if (printBtn) {
      printBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.print();
      });
    }
  }

  // Student Credential Passport Modal Controller
  function initProfileModal() {
    const profileBadge = document.getElementById('student-badge');
    const profileModal = document.getElementById('profile-modal-backdrop');
    const profileModalCard = document.getElementById('profile-modal-card');
    const profileModalClose = document.getElementById('profile-modal-close');
    const profileModalExplore = document.getElementById('btn-modal-explore-records');

    function openProfileModal() {
      if (!profileModal) return;
      profileModal.classList.add('active');
      profileModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      document.querySelectorAll('.cursor-syntax-particle').forEach(p => p.remove());
    }

    function closeProfileModal() {
      if (!profileModal) return;
      profileModal.classList.remove('active');
      profileModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (profileModalCard) profileModalCard.style.transform = '';
    }

    if (profileBadge) {
      profileBadge.addEventListener('click', openProfileModal);
      profileBadge.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openProfileModal();
        }
      });
    }

    if (profileModalClose) {
      profileModalClose.addEventListener('click', closeProfileModal);
    }

    if (profileModal) {
      profileModal.addEventListener('click', (e) => {
        if (e.target === profileModal) {
          closeProfileModal();
        }
      });
    }

    if (profileModalExplore) {
      profileModalExplore.addEventListener('click', () => {
        closeProfileModal();
        const target = document.getElementById('gallery-showcase-title');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }

    const profileModalCert = document.getElementById('btn-modal-view-cert');
    if (profileModalCert) {
      profileModalCert.addEventListener('click', (e) => {
        closeProfileModal();
        const target = document.getElementById('bonafide-certificate');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && profileModal && profileModal.classList.contains('active')) {
        closeProfileModal();
      }
    });

    // 3D Parallax Tilt Effect on Modal Card
    if (profileModalCard) {
      profileModalCard.addEventListener('mousemove', (e) => {
        const rect = profileModalCard.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rx = -(y / (rect.height / 2)) * 6.5;
        const ry = (x / (rect.width / 2)) * 6.5;
        profileModalCard.style.transform = `perspective(1000px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale(1.01)`;
      });

      profileModalCard.addEventListener('mouseleave', () => {
        profileModalCard.style.transform = '';
      });
    }
  }

  // Smooth explore button scroll (both desktop and mobile hero buttons)
  const mobileExploreBtn = document.getElementById('btn-explore-mobile');
  function scrollToRecords() {
    const target = document.getElementById('gallery-showcase-title') || document.getElementById('room-showcase');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  if (exploreBtn) {
    exploreBtn.addEventListener('click', scrollToRecords);
  }
  if (mobileExploreBtn) {
    mobileExploreBtn.addEventListener('click', scrollToRecords);
  }

  // Populate student credentials badge & counters
  function loadStudentProfile(student) {
    if (!student) return;
    if (studentName) studentName.textContent = student.name;
    if (studentRoll) studentRoll.textContent = student.rollNumber;
    const studentCode = document.getElementById('val-student-code');
    if (studentCode) studentCode.textContent = student.courseCode || student.labCode || '24IT303';
    if (studentDept) studentDept.textContent = student.department;
    if (studentSem) studentSem.textContent = student.semester;
    if (studentCollege) studentCollege.textContent = student.college;

    const totalCount = student.recordedTasks || 13;
    if (heroBadge) heroBadge.textContent = `${String(totalCount).padStart(2, '0')} Archival Exhibits Recorded`;
    if (studentTasksCount) studentTasksCount.textContent = `${totalCount} Exhibits Verified`;
    if (showcaseCounter) showcaseCounter.textContent = `${String(totalCount).padStart(2, '0')} / ${String(totalCount).padStart(2, '0')}`;
    if (railTotalNum) railTotalNum.textContent = String(totalCount).padStart(2, '0');

    const numeralContainer = document.getElementById('archive-numeral-07');
    if (numeralContainer) {
      const formatted = String(totalCount).padStart(2, '0');
      const d0 = numeralContainer.querySelector('.digit-0');
      const d7 = numeralContainer.querySelector('.digit-7');
      if (d0) d0.textContent = formatted[0];
      if (d7) d7.textContent = formatted[1];
    }
    const exploreSub = document.querySelector('.start-action-container span');
    if (exploreSub) {
      exploreSub.textContent = `Explore the ${String(totalCount).padStart(2, '0')} recorded laboratory exhibits`;
    }
  }

  // Assemble the 11 Unique Editorial Museum Compositions
  function assembleExhibits(exhibits) {
    if (!exhibits || !unitsContainer) return;
    unitsContainer.innerHTML = '';

    exhibits.forEach((ex, idx) => {
      const card = document.createElement('article');
      card.className = 'exhibit-card visible';
      card.id = ex.id;
      card.setAttribute('data-category', ex.unit || ex.category || `exhibit-${ex.number}`);
      card.setAttribute('data-unit', ex.unit || 'Unit I');
      card.setAttribute('data-index', idx);

      // Build specific visual specimen artifact box based on exhibit index
      let artifactHtml = '';

      if (idx === 0) {
        // EXHIBIT 01: Language Comparative Matrix
        artifactHtml = `
          <div class="artifact-box-matrix">
            <span class="matrix-header">Language & Runtime Matrix</span>
            <div class="matrix-row-item">
              <span class="matrix-lang">Java SE</span>
              <span class="matrix-property">JVM Bytecode · Automatic GC · JIT</span>
            </div>
            <div class="matrix-row-item">
              <span class="matrix-lang">C / C++</span>
              <span class="matrix-property">Native Machine Binary · Manual Memory</span>
            </div>
            <div class="matrix-row-item">
              <span class="matrix-lang">Python</span>
              <span class="matrix-property">CPython Bytecode · Dynamic Reference Count</span>
            </div>
            <div class="matrix-row-item">
              <span class="matrix-lang">JavaScript</span>
              <span class="matrix-property">V8 JIT Engine · Event-Driven Async</span>
            </div>
          </div>
        `;
      } else if (idx === 1) {
        // EXHIBIT 02: Linux Terminal POSIX Toolchain
        artifactHtml = `
          <div class="terminal-specimen-box">
            <div class="terminal-header">
              <span class="terminal-dot dot-red"></span>
              <span class="terminal-dot dot-yellow"></span>
              <span class="terminal-dot dot-green"></span>
              <span class="terminal-title-text">ubuntu@server: /usr/lib/jvm</span>
            </div>
            <div class="terminal-code-body">
              <div><span class="terminal-prompt">$</span> update-alternatives --install /usr/bin/java java /usr/lib/jvm/jdk-26/bin/java 1</div>
              <div><span class="terminal-prompt">$</span> export JAVA_HOME=/usr/lib/jvm/jdk-26</div>
              <div><span class="terminal-prompt">$</span> java -version</div>
              <div class="terminal-output">java version "26-ea" 2026-03-17</div>
              <div class="terminal-output">Java(TM) SE Runtime Environment (build 26-ea+12)</div>
            </div>
          </div>
        `;
      } else if (idx === 2) {
        // EXHIBIT 03: Driverless Architecture Bridge
        artifactHtml = `
          <div class="diagram-bridge-box">
            <span class="meta-label" style="color: var(--celestial-indigo);">Driverless Pipeline</span>
            <div class="bridge-nodes-row">
              <div class="bridge-node">
                <span class="node-title">JVM Client</span>
                <span class="node-sub">Application</span>
              </div>
              <span class="bridge-arrow">→</span>
              <div class="bridge-node">
                <span class="node-title">UcanAccess</span>
                <span class="node-sub">Driverless Engine</span>
              </div>
              <span class="bridge-arrow">→</span>
              <div class="bridge-node">
                <span class="node-title">MS Access</span>
                <span class="node-sub">.accdb Store</span>
              </div>
            </div>
            <div style="font-size: 0.76rem; color: var(--ink-tertiary); text-align: center; font-family: 'JetBrains Mono', monospace;">
              jdbc:ucanaccess://database.accdb [NO ODBC DSN]
            </div>
          </div>
        `;
      } else if (idx === 3) {
        // EXHIBIT 04: MySQL Socket Pipeline
        artifactHtml = `
          <div class="socket-diagram-box">
            <span class="meta-label" style="color: var(--celestial-indigo);">Relational TCP Socket Specs</span>
            <div class="socket-spec-row">
              <div class="socket-spec-card">
                <span class="socket-spec-label">Driver Class</span>
                <span class="socket-spec-value">com.mysql.cj.jdbc.Driver</span>
              </div>
              <div class="socket-spec-card">
                <span class="socket-spec-label">Socket Port</span>
                <span class="socket-spec-value">TCP 127.0.0.1:3306</span>
              </div>
              <div class="socket-spec-card">
                <span class="socket-spec-label">Database Target</span>
                <span class="socket-spec-value">college</span>
              </div>
              <div class="socket-spec-card">
                <span class="socket-spec-label">Relational Table</span>
                <span class="socket-spec-value">student(id, name)</span>
              </div>
            </div>
          </div>
        `;
      } else if (idx === 4) {
        // EXHIBIT 05: Remote Network Database Topology (Week 5)
        artifactHtml = `
          <div class="network-topology-box">
            <span class="meta-label" style="color: var(--celestial-indigo);">Remote LAN Database Endpoint</span>
            <div class="network-tunnel-visual">
              <span class="network-node-badge">Local Java Client</span>
              <div class="network-stream-line"></div>
              <span class="network-node-badge" style="color: var(--java-ochre);">10.0.8.130:3306</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 0.78rem; color: var(--ink-tertiary); font-family: 'JetBrains Mono', monospace;">
              <span>Target: it.employee</span>
              <span>DML: INSERT & SELECT</span>
            </div>
          </div>
        `;
      } else if (idx === 5) {
        // EXHIBIT 06: CRUD State Machine Quad Box (Week 6)
        artifactHtml = `
          <div class="crud-machine-box">
            <div class="crud-quad-card">
              <span class="crud-op-name op-create">Create (INSERT)</span>
              <span class="crud-op-stmt">INSERT INTO Student VALUES(?,?,?)</span>
            </div>
            <div class="crud-quad-card">
              <span class="crud-op-name op-read">Read (SELECT)</span>
              <span class="crud-op-stmt">SELECT * FROM Student</span>
            </div>
            <div class="crud-quad-card">
              <span class="crud-op-name op-update">Update (UPDATE)</span>
              <span class="crud-op-stmt">UPDATE Student SET Marks=?</span>
            </div>
            <div class="crud-quad-card">
              <span class="crud-op-name op-delete">Delete (DELETE)</span>
              <span class="crud-op-stmt">DELETE FROM Student WHERE id=?</span>
            </div>
          </div>
        `;
      } else if (idx === 6) {
        // EXHIBIT 07: Tomcat Web Container Lifecycle Stepper (Week 7)
        artifactHtml = `
          <div class="servlet-lifecycle-box">
            <span class="meta-label" style="color: var(--celestial-indigo);">Tomcat Container Lifecycle</span>
            <div class="lifecycle-step-item">
              <span class="step-num-pill">1</span>
              <span class="step-method-name">init(ServletConfig)</span>
              <span class="step-desc-text">Instantiation</span>
            </div>
            <div class="lifecycle-step-item">
              <span class="step-num-pill">2</span>
              <span class="step-method-name">service(req, res)</span>
              <span class="step-desc-text">doGet() & doPost()</span>
            </div>
            <div class="lifecycle-step-item">
              <span class="step-num-pill">3</span>
              <span class="step-method-name">destroy()</span>
              <span class="step-desc-text">Teardown</span>
            </div>
          </div>
        `;
      } else if (idx === 7) {
        // EXHIBIT 08: Advanced Servlets HTTP Pipeline & Database (Week 8)
        artifactHtml = `
          <div class="servlets-pipeline-box">
            <span class="meta-label" style="color: var(--celestial-indigo);">HTTP Request Dispatcher & JDBC Pipeline</span>
            <div class="pipeline-flow-row">
              <div class="pipeline-node-chip">
                Client Form
                <span>POST /order</span>
              </div>
              <span class="bridge-arrow">→</span>
              <div class="pipeline-node-chip">
                HttpServlet
                <span>doPost(req, res)</span>
              </div>
              <span class="bridge-arrow">→</span>
              <div class="pipeline-node-chip">
                MySQL JDBC
                <span>Query & Table</span>
              </div>
            </div>
            <div style="font-size: 0.74rem; color: var(--ink-tertiary); text-align: center; font-family: 'JetBrains Mono', monospace;">
              7 Experiments: Lifecycle · HTML Forms · JDBC in Servlets · Order App
            </div>
          </div>
        `;
      } else if (idx === 8) {
        // EXHIBIT 09: Spring Boot & Maven Suite (Week 9)
        artifactHtml = `
          <div class="springboot-specimen-box">
            <span class="meta-label" style="color: var(--celestial-indigo);">Spring Boot & Maven Project Object Model</span>
            <div class="bridge-nodes-row">
              <div class="bridge-node">
                <span class="node-title">Spring Starter</span>
                <span class="node-sub">STS Wizard</span>
              </div>
              <span class="bridge-arrow">→</span>
              <div class="bridge-node">
                <span class="node-title">pom.xml</span>
                <span class="node-sub">starter-web</span>
              </div>
              <span class="bridge-arrow">→</span>
              <div class="bridge-node">
                <span class="node-title">Embedded Tomcat</span>
                <span class="node-sub">:8080 Endpoint</span>
              </div>
            </div>
            <div style="font-size: 0.74rem; color: var(--ink-tertiary); text-align: center; font-family: 'JetBrains Mono', monospace;">
              Auto-Configuration · Maven Lifecycle · REST Controller
            </div>
          </div>
        `;
      } else if (idx === 9) {
        // EXHIBIT 10: JdbcTemplate & H2 In-Memory Suite (Week 10)
        artifactHtml = `
          <div class="springboot-specimen-box">
            <span class="meta-label" style="color: var(--celestial-indigo);">JdbcTemplate &amp; In-Memory H2 Architecture</span>
            <div class="bridge-nodes-row">
              <div class="bridge-node">
                <span class="node-title">@Service</span>
                <span class="node-sub">AuthorService</span>
              </div>
              <span class="bridge-arrow">→</span>
              <div class="bridge-node">
                <span class="node-title">JdbcTemplate</span>
                <span class="node-sub">RowMapper Lambda</span>
              </div>
              <span class="bridge-arrow">→</span>
              <div class="bridge-node">
                <span class="node-title">H2 In-Memory</span>
                <span class="node-sub">jdbc:h2:mem:testdb</span>
              </div>
            </div>
            <div style="font-size: 0.74rem; color: var(--ink-tertiary); text-align: center; font-family: 'JetBrains Mono', monospace;">
              @PostConstruct DDL/DML Seeding · Port 83 · H2 Web Console
            </div>
          </div>
        `;
      } else if (idx === 10) {
        // EXHIBIT 11: Spring Boot JPA with MySQL & Thymeleaf (Week 11)
        artifactHtml = `
          <div class="springboot-specimen-box">
            <span class="meta-label" style="color: var(--celestial-indigo);">Spring Data JPA &amp; MySQL Dual-Interface Architecture</span>
            <div class="bridge-nodes-row">
              <div class="bridge-node">
                <span class="node-title">Employee Entity</span>
                <span class="node-sub">@Entity @Id</span>
              </div>
              <span class="bridge-arrow">→</span>
              <div class="bridge-node">
                <span class="node-title">Hibernate ORM</span>
                <span class="node-sub">ddl-auto=update</span>
              </div>
              <span class="bridge-arrow">→</span>
              <div class="bridge-node">
                <span class="node-title">MySQL 8.0</span>
                <span class="node-sub">testdb.employee</span>
              </div>
            </div>
            <div style="font-size: 0.74rem; color: var(--ink-tertiary); text-align: center; font-family: 'JetBrains Mono', monospace;">
              Dual UI: REST JSON (/api/employees) &amp; Thymeleaf HTML (/employees)
            </div>
          </div>
        `;
      } else if (idx === 11) {
        // EXHIBIT 12: Spring Data JPA Repository Operations with H2 (Week 12)
        artifactHtml = `
          <div class="diagram-bridge-box">
            <span class="meta-label" style="color: var(--celestial-indigo);">JpaRepository Dynamic Proxy Pipeline</span>
            <div class="bridge-nodes-row">
              <div class="bridge-node">
                <span class="node-title">GET /add</span>
                <span class="node-sub">@RequestParam</span>
              </div>
              <span class="bridge-arrow">→</span>
              <div class="bridge-node">
                <span class="node-title">StudentRepository</span>
                <span class="node-sub">JpaRepository Proxy</span>
              </div>
              <span class="bridge-arrow">→</span>
              <div class="bridge-node">
                <span class="node-title">GET /students</span>
                <span class="node-sub">JSON Array</span>
              </div>
            </div>
            <div style="font-size: 0.76rem; color: var(--ink-tertiary); text-align: center; font-family: 'JetBrains Mono', monospace;">
              Automatic Dynamic Proxy · Zero DAO Boilerplate · Instant Browser CRUD
            </div>
          </div>
        `;
      } else if (idx === 12) {
        // EXHIBIT 13: Derived & Custom Query Methods in Spring Data JPA (Week 13)
        artifactHtml = `
          <div class="crud-machine-box">
            <div class="crud-quad-card">
              <span class="crud-op-name op-create">Derived Filters</span>
              <span class="crud-op-stmt">findByName / findByFirstName</span>
            </div>
            <div class="crud-quad-card">
              <span class="crud-op-name op-read">Multi-Condition</span>
              <span class="crud-op-stmt">findByFirstNameAndLastName / Or</span>
            </div>
            <div class="crud-quad-card">
              <span class="crud-op-name op-update">Auto Ordering</span>
              <span class="crud-op-stmt">findByOrderByNameAsc()</span>
            </div>
            <div class="crud-quad-card">
              <span class="crud-op-name op-delete">Custom @Query</span>
              <span class="crud-op-stmt">JPQL &amp; Native SQL Execution</span>
            </div>
          </div>
        `;
      } else {
        artifactHtml = `
          <div class="springboot-specimen-box">
            <span class="meta-label" style="color: var(--celestial-indigo);">${ex.category || 'Laboratory Investigation'}</span>
            <div style="font-size: 0.8rem; color: var(--ink-secondary); text-align: center; padding: 0.5rem 0;">
              ${ex.technology || 'Advanced Java Architecture'}
            </div>
          </div>
        `;
      }

      // Build key concepts list
      const keyConceptsHtml = (ex.keyConcepts || []).map(concept => `
        <li class="detail-bullet-item">${concept}</li>
      `).join('');

      // Build procedure steps
      const procedureHtml = (ex.procedure || []).map((step, sIdx) => `
        <div class="procedure-step-row">
          <span class="procedure-step-num">${String(sIdx + 1).padStart(2, '0')}</span>
          <span class="procedure-step-text">${step}</span>
        </div>
      `).join('');

      // Build specifications bar
      let specsHtml = '';
      if (ex.specs) {
        specsHtml = Object.entries(ex.specs).map(([key, val]) => {
          let displayVal = val;
          let titleAttr = '';
          if (key.toLowerCase() === 'source' && typeof val === 'string') {
            displayVal = val.split('/').pop();
            titleAttr = `title="${val}"`;
          }
          return `
          <div class="spec-item-block">
            <span class="spec-item-key">${key}</span>
            <span class="spec-item-val" ${titleAttr}>${displayVal}</span>
          </div>
        `;
        }).join('');
      }

      // Topic configs for all 13 exhibits
      const exhibitTopicMap = [
        { primary: 'JAVA ARCHITECTURE', secondary: ['APPLETS', 'SERVLETS', 'JDBC · ODBC'], coords: 'SAHE · IT-C // 24IT303 // EXP-01' },
        { primary: 'JDK 26', secondary: ['OPENJDK', 'UBUNTU', 'update-alternatives'], coords: 'SAHE · IT-C // 24IT303 // EXP-02' },
        { primary: 'UCANACCESS', secondary: ['MS ACCESS', 'CLASSPATH', 'accdb'], coords: 'SAHE · IT-C // 24IT303 // EXP-03' },
        { primary: 'JDBC + MYSQL', secondary: ['MYSQL', 'SQL', 'JdbcDemo'], coords: 'SAHE · IT-C // 24IT303 // EXP-04' },
        { primary: 'REMOTE MYSQL', secondary: ['TCP 3306', 'RemoteDB', 'LAN SOCKET'], coords: 'SAHE · IT-C // 24IT303 // EXP-05' },
        { primary: 'JDBC PROGRAMMING', secondary: ['CRUD', 'PreparedStatement', 'CallableStatement'], coords: 'SAHE · IT-C // 24IT303 // EXP-06' },
        { primary: 'SERVLETS + TOMCAT', secondary: ['GenericServlet', 'HttpServlet', 'web.xml'], coords: 'SAHE · IT-C // 24IT303 // EXP-07' },
        { primary: 'ADVANCED SERVLETS', secondary: ['GET & POST', 'Lifecycle', 'JDBC in Servlets'], coords: 'SAHE · IT-C // 24IT303 // EXP-08' },
        { primary: 'SPRING BOOT + MAVEN', secondary: ['STS', 'pom.xml', 'REST Controller'], coords: 'SAHE · IT-C // 24IT303 // EXP-09' },
        { primary: 'JDBCTEMPLATE + H2', secondary: ['IN-MEMORY H2', 'RowMapper', '@PostConstruct'], coords: 'SAHE · IT-C // 24IT303 // EXP-10' },
        { primary: 'SPRING DATA JPA + MYSQL', secondary: ['HIBERNATE ORM', 'MySQL 8.0', 'Thymeleaf UI'], coords: 'SAHE · IT-C // 24IT303 // EXP-11' },
        { primary: 'JPA REPOSITORY + H2', secondary: ['JpaRepository', '@RestController', 'JSON CRUD'], coords: 'SAHE · IT-C // 24IT303 // EXP-12' },
        { primary: 'DERIVED & CUSTOM QUERIES', secondary: ['@Query JPQL', 'Native SQL', 'Method Derivation'], coords: 'SAHE · IT-C // 24IT303 // EXP-13' }
      ];

      const topicData = exhibitTopicMap[idx] || {
        primary: ex.technology || 'JAVA SE',
        secondary: ['ARCHIVE', 'SPEC', 'EXHIBIT'],
        coords: `SAHE · IT-C // 24IT303 // EXP-${ex.number}`
      };

      // 1. Create Dedicated Stage Wrapper
      const stage = document.createElement('div');
      stage.className = 'exhibit-stage';
      stage.id = `week-${parseInt(ex.number, 10)}`;
      stage.setAttribute('data-index', idx);
      stage.setAttribute('data-week', parseInt(ex.number, 10));
      stage.setAttribute('data-category', ex.unit || ex.category || '');

      // 2. Suspended Topic Layer
      const topicLayer = document.createElement('div');
      topicLayer.className = 'suspended-topic-layer';
      topicLayer.setAttribute('aria-hidden', 'true');
      topicLayer.innerHTML = `
        <div class="topic-guide-wire">
          <span class="topic-reg-tick">+</span>
          <span class="topic-wire-line"></span>
          <span class="topic-coord-label">${topicData.coords}</span>
          <span class="topic-wire-line"></span>
          <span class="topic-reg-tick">+</span>
        </div>

        <div class="topic-anchors-row">
          <!-- Primary Topic Tag -->
          <div class="suspended-topic topic--primary" style="--left-pct: 46%; --string-h: 68px; --mass: 1.25;">
            <div class="topic-string"></div>
            <div class="topic-tag tag--primary">
              <span class="topic-eyelet"></span>
              <span class="topic-text">${topicData.primary}</span>
            </div>
          </div>

          <!-- Secondary Topic 1 -->
          <div class="suspended-topic topic--secondary" style="--left-pct: 14%; --string-h: 104px; --mass: 0.95;">
            <div class="topic-string"></div>
            <div class="topic-tag tag--secondary">
              <span class="topic-eyelet"></span>
              <span class="topic-text">${topicData.secondary[0]}</span>
            </div>
          </div>

          <!-- Secondary Topic 2 -->
          <div class="suspended-topic topic--secondary" style="--left-pct: 76%; --string-h: 88px; --mass: 1.1;">
            <div class="topic-string"></div>
            <div class="topic-tag tag--secondary">
              <span class="topic-eyelet"></span>
              <span class="topic-text">${topicData.secondary[1]}</span>
            </div>
          </div>

          ${topicData.secondary[2] ? `
          <!-- Secondary Topic 3 -->
          <div class="suspended-topic topic--tertiary" style="--left-pct: 91%; --string-h: 114px; --mass: 0.8;">
            <div class="topic-string"></div>
            <div class="topic-tag tag--tertiary">
              <span class="topic-eyelet"></span>
              <span class="topic-text">${topicData.secondary[2]}</span>
            </div>
          </div>
          ` : ''}
        </div>
      `;

      // 3. Main Card Template
      const downloadName = ex.pdfPath ? ex.pdfPath.split('/').pop() : `${ex.title}.pdf`;
      card.innerHTML = `
        <!-- Metadata Header -->
        <header class="exhibit-meta-header">
          <div class="exhibit-tag-group">
            <span class="exhibit-category-badge">${ex.category}</span>
            <span class="exhibit-reading-time">${ex.readingTime}</span>
          </div>
          <span class="exhibit-difficulty-badge">${ex.difficulty}</span>
        </header>

        <!-- Composition Body Grid -->
        <div class="comp-${ex.number}-grid">
          <div class="exhibit-numeral-col">
            <span class="section-marker">Exhibit</span>
            <span class="exhibit-numeral-giant">${ex.number}</span>
          </div>

          <div class="comp-text-col">
            <h3 class="exhibit-title">${ex.title}</h3>
            <p class="exhibit-description">${ex.description}</p>
            <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.78rem; font-weight: 700; color: var(--celestial-indigo);">${ex.technology}</span>
          </div>

          <div class="comp-artifact-col">
            ${artifactHtml}
          </div>
        </div>

        <!-- Action Bar -->
        <div class="exhibit-action-bar">
          <button class="btn-catalog-expand" aria-expanded="false">
            <span>Catalog Details</span>
            <svg viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>
          </button>
          
          <div class="exhibit-btn-group">
            <a class="btn-download-record" href="${ex.pdfPath}" download="${downloadName}" title="Download verified PDF record">
              <svg viewBox="0 0 24 24"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z"/></svg>
              <span>Download PDF</span>
            </a>
            <button class="btn-open-record-primary" data-pdf-path="${ex.pdfPath}" data-title="${ex.title}">
              <span>Open Record</span>
              <svg viewBox="0 0 24 24"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>
            </button>
          </div>
        </div>

        <!-- Expandable Museum Catalog Details Drawer -->
        <div class="catalog-detail-drawer">
          <div class="catalog-detail-grid">
            <div class="catalog-detail-section">
              <span class="detail-section-title">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                Academic Aim & Objective
              </span>
              <p class="detail-text-p">${ex.aim}</p>

              <span class="detail-section-title" style="margin-top: 1rem;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/></svg>
                Key Architecture Concepts
              </span>
              <ul class="detail-bullet-list">
                ${keyConceptsHtml}
              </ul>
            </div>

            <div class="catalog-detail-section">
              <span class="detail-section-title">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
                Methodology & Algorithm
              </span>
              <div class="detail-procedure-steps">
                ${procedureHtml}
              </div>
            </div>

            <!-- Specs Summary Bar -->
            <div class="catalog-spec-summary-bar">
              ${specsHtml}
            </div>
          </div>
        </div>
      `;

      // Event listener for opening document in flipbook viewer
      const openBtn = card.querySelector('.btn-open-record-primary');
      if (openBtn) {
        openBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const docRecord = {
            id: ex.id,
            number: ex.number,
            week: ex.category || `Week ${ex.number}`,
            title: ex.title,
            source: ex.pdfPath || (ex.specs && ex.specs.Source) || '',
            pages: ex.pages || [],
            documentType: (ex.pdfPath && ex.pdfPath.toLowerCase().endsWith('.docx')) ? 'DOCX' : (ex.pdfPath ? 'PDF' : 'UNAVAILABLE'),
            record: ex
          };
          if (typeof window.openRecordDocument === 'function') {
            window.openRecordDocument(docRecord);
          } else if (window.ExhibitionPDFViewer && typeof window.ExhibitionPDFViewer.openRecord === 'function') {
            window.ExhibitionPDFViewer.openRecord(docRecord);
          }
        });
      }

      // Expand / Collapse catalog details
      const expandBtn = card.querySelector('.btn-catalog-expand');
      if (expandBtn) {
        expandBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const isExpanded = card.classList.toggle('expanded');
          expandBtn.setAttribute('aria-expanded', isExpanded);
        });
      }

      stage.appendChild(topicLayer);
      stage.appendChild(card);
      unitsContainer.appendChild(stage);
    });

    // Initialize FLIP Morpher on exhibit cards
    if (window.FlipMorpher) {
      new window.FlipMorpher(document.querySelectorAll('.exhibit-card'));
    }
  }
  // Setup live search and quick filter pills across all 13 exhibits
  function setupFilterAndSearch(exhibits) {
    let searchQuery = '';
    let activeFilter = 'all';

    const filterPillsContainer = document.getElementById('search-filter-pills');
    const counterStat = document.getElementById('showcase-counter-stat');
    const verifiedText = document.getElementById('showcase-verified-text');

    function applyFilterAndSearch() {
      const stages = document.querySelectorAll('.exhibit-stage');
      let visibleCount = 0;

      stages.forEach((stage, idx) => {
        const ex = exhibits[idx];
        if (!ex) return;
        const weekNum = parseInt(ex.number, 10);

        // Filter pill category match
        let matchesPill = true;
        if (activeFilter === 'jdbc') {
          matchesPill = [3, 4, 5, 6].includes(weekNum);
        } else if (activeFilter === 'servlet') {
          matchesPill = [7, 8].includes(weekNum);
        } else if (activeFilter === 'spring') {
          matchesPill = [9, 10].includes(weekNum);
        } else if (activeFilter === 'jpa') {
          matchesPill = [11, 12, 13].includes(weekNum);
        } else if (activeFilter === 'env') {
          matchesPill = [1, 2].includes(weekNum);
        }

        // Text search match across entire curriculum corpus
        const textCorpus = `${ex.number} ${ex.title} ${ex.description} ${ex.technology} ${ex.category} ${ex.aim} ${(ex.keyConcepts || []).join(' ')}`.toLowerCase();
        const matchesSearch = !searchQuery || textCorpus.includes(searchQuery);

        if (matchesPill && matchesSearch) {
          stage.classList.remove('filter-hidden');
          visibleCount++;
        } else {
          stage.classList.add('filter-hidden');
        }
      });

      if (counterStat) {
        counterStat.textContent = `${String(visibleCount).padStart(2, '0')} / ${String(exhibits.length).padStart(2, '0')}`;
      }
      if (verifiedText) {
        if (visibleCount === exhibits.length) {
          verifiedText.textContent = `All ${exhibits.length} Records Verified`;
          verifiedText.style.color = 'var(--accent-emerald)';
        } else if (visibleCount > 0) {
          verifiedText.textContent = `${visibleCount} Records Matching Filter`;
          verifiedText.style.color = 'var(--celestial-indigo)';
        } else {
          verifiedText.textContent = 'No records matching query';
          verifiedText.style.color = 'var(--accent-amber)';
        }
      }
    }

    if (filterPillsContainer) {
      filterPillsContainer.addEventListener('click', (e) => {
        const pill = e.target.closest('.filter-pill');
        if (!pill) return;
        filterPillsContainer.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        activeFilter = pill.getAttribute('data-filter') || 'all';
        applyFilterAndSearch();
      });
    }

    if (searchInput) {
      let searchTimer = null;
      searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(() => {
          searchQuery = e.target.value.trim().toLowerCase();
          applyFilterAndSearch();
        }, 120);
      });
    }
  }

  // Setup vertical archive rail indicator tracking
  function setupArchiveRail(exhibits) {
    const railDot = document.getElementById('rail-dot');
    const railActive = document.getElementById('rail-active-num');
    if (!railActive || !railDot) return;

    window.addEventListener('scroll', () => {
      const stages = document.querySelectorAll('.exhibit-stage:not(.filter-hidden)');
      if (stages.length === 0) return;

      const viewportCenter = window.innerHeight / 2;
      let activeIdx = 0;

      stages.forEach((st, i) => {
        const rect = st.getBoundingClientRect();
        if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
          activeIdx = i;
        }
      });

      const stage = stages[activeIdx];
      if (stage) {
        const dataIdx = parseInt(stage.getAttribute('data-index'), 10) || 0;
        railActive.textContent = String(dataIdx + 1).padStart(2, '0');
        const progress = dataIdx / Math.max(1, exhibits.length - 1);
        railDot.style.top = `${progress * 100}%`;
      }
    }, { passive: true });
  }

  // Setup magnetic triggers and intersection reveals
  function initializePhysicsEffects() {
    const entrance = document.getElementById('room-entrance');
    if (entrance) {
      entrance.classList.add('visible');
    }

    const magBtn = document.getElementById('btn-explore');
    if (magBtn && window.MagneticButton) {
      new window.MagneticButton(magBtn);
    }

    if (window.SpringTilt) {
      new window.SpringTilt(document.querySelectorAll('.exhibit-card, .student-credential-badge, .java-ecosystem-plate'));
    }

    const observerOptions = {
      root: null,
      threshold: 0.05,
      rootMargin: '50px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.stagger-in, .exhibit-card, .roadmap-phase-card').forEach(el => {
      el.classList.add('visible');
      revealObserver.observe(el);
    });
  }

  // Safe HTML Escaping Helper
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // Mobile-first Navigation Drawer and Jump Controls
  function setupMobileNav(exhibits) {
    const toggleBtn = document.getElementById('mobile-nav-toggle');
    const drawer = document.getElementById('mobile-nav-drawer');
    const overlay = document.getElementById('mobile-drawer-overlay');
    const closeBtn = document.getElementById('drawer-close-btn');
    const chipsContainer = document.getElementById('drawer-weeks-chips');
    const passportBtn = document.getElementById('drawer-btn-passport');

    if (!drawer || !toggleBtn) return;

    function openDrawer() {
      drawer.classList.add('open');
      if (overlay) overlay.classList.add('active');
      toggleBtn.classList.add('open');
      toggleBtn.setAttribute('aria-expanded', 'true');
      drawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      drawer.classList.remove('open');
      if (overlay) overlay.classList.remove('active');
      toggleBtn.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    toggleBtn.addEventListener('click', () => {
      if (drawer.classList.contains('open')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (overlay) overlay.addEventListener('click', closeDrawer);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) {
        closeDrawer();
      }
    });

    if (chipsContainer) {
      chipsContainer.innerHTML = (exhibits || []).map((ex, idx) => {
        const num = parseInt(ex.number, 10) || (idx + 1);
        return `<button class="drawer-week-chip" data-week="${num}" title="Week ${num} · ${ex.technology || ex.title}"><span class="chip-num">W${String(num).padStart(2, '0')}</span></button>`;
      }).join('');

      chipsContainer.addEventListener('click', (e) => {
        const chip = e.target.closest('.drawer-week-chip');
        if (!chip) return;
        const weekNum = chip.getAttribute('data-week');
        closeDrawer();
        const target = document.getElementById(`week-${weekNum}`);
        if (target) {
          setTimeout(() => {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            target.classList.add('focal-pulse');
            setTimeout(() => target.classList.remove('focal-pulse'), 2500);
          }, 120);
        }
      });
    }

    drawer.querySelectorAll('[data-close-drawer]').forEach(link => {
      link.addEventListener('click', () => {
        closeDrawer();
      });
    });

    if (passportBtn) {
      passportBtn.addEventListener('click', () => {
        closeDrawer();
        const badge = document.getElementById('student-badge');
        if (badge) badge.click();
      });
    }
  }

  // Interactive Course Architecture Roadmap with Duke Mascot
  function setupCourseRoadmap(exhibits) {
    const wrapper = document.getElementById('roadmap-phases-wrapper');
    const dukeRunner = document.getElementById('duke-runner');
    const dukeSpeech = document.getElementById('duke-speech');
    const completionText = document.getElementById('roadmap-completion-text');

    if (!wrapper) return;

    const ROADMAP_PHASES = [
      {
        phase: '01',
        title: 'Java Fundamentals & Toolchain',
        category: 'Fundamentals',
        weeks: [1, 2],
        desc: 'JDK 26 & POSIX environment, modular package structures, and compiler pipeline.'
      },
      {
        phase: '02',
        title: 'JDBC & Database Engine',
        category: 'JDBC & SQL',
        weeks: [3, 4, 5, 6],
        desc: 'Driverless Access, MySQL sockets, 2-tier client-server architecture, and PreparedStatement / CallableStatement.'
      },
      {
        phase: '03',
        title: 'Java Enterprise Servlets',
        category: 'Servlets & Tomcat',
        weeks: [7, 8],
        desc: 'Apache Tomcat 10.1 container, GenericServlet, HttpServlet, lifecycle, and JDBC web integration.'
      },
      {
        phase: '04',
        title: 'Spring Boot & In-Memory Data',
        category: 'Spring Boot',
        weeks: [9, 10],
        desc: 'Spring Tool Suite, Maven POM, REST architecture, JdbcTemplate, and H2 In-Memory DB.'
      },
      {
        phase: '05',
        title: 'Spring Data JPA & ORM Ecosystem',
        category: 'Spring Data JPA',
        weeks: [11, 12, 13],
        desc: 'Hibernate ORM, MySQL + Thymeleaf full-stack, JpaRepository REST CRUD, and Derived & Custom Query Methods.'
      }
    ];

    const DUKE_MESSAGES = {
      1: "Starting strong with JDK 26 and POSIX toolchain! ☕",
      2: "Packaging classes cleanly into modular namespaces! 📦",
      3: "Bridging JVM to MS Access with driverless UcanAccess! 🌉",
      4: "Opening TCP socket streams directly into MySQL 8.0! 🔌",
      5: "Architecting two-tier Client/Server database systems! 🏛️",
      6: "Executing precompiled SQL with PreparedStatement & CallableStatement! ⚡",
      7: "Bootstrapping Apache Tomcat 10.1 and Servlet containers! 🐱",
      8: "Handling HTTP GET/POST lifecycles with dynamic database lookups! 🌐",
      9: "Igniting Spring Boot microservices with Maven & STS! 🚀",
      10: "Running zero-config in-memory tests with Spring JdbcTemplate & H2! 💾",
      11: "Bridging Object-Oriented Java to Relational DB with Hibernate ORM! 🛡️",
      12: "Building production-grade REST APIs with Spring JpaRepository! 🎯",
      13: "Unlocking custom JPQL and Derived Query magic in Spring Data JPA! 🏆"
    };

    let visitedWeeks = new Set();
    try {
      const saved = JSON.parse(localStorage.getItem('java_record_visited_weeks') || '["1"]');
      visitedWeeks = new Set(saved.map(Number));
    } catch (e) {
      visitedWeeks = new Set([1]);
    }

    function renderPhases() {
      wrapper.innerHTML = ROADMAP_PHASES.map(phaseObj => {
        const weekItemsHtml = phaseObj.weeks.map(wNum => {
          const ex = (exhibits || []).find(e => parseInt(e.number, 10) === wNum);
          const title = ex ? (ex.technology || ex.title) : `Week ${wNum}`;
          const isVisited = visitedWeeks.has(wNum);
          return `
            <a href="#week-${wNum}" class="phase-week-item ${isVisited ? 'visited' : ''}" data-week="${wNum}">
              <span class="phase-week-badge">W${String(wNum).padStart(2, '0')}</span>
              <span class="phase-week-title" style="flex:1; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${title}</span>
              <span class="phase-week-status">${isVisited ? '✓' : '→'}</span>
            </a>
          `;
        }).join('');

        return `
          <div class="roadmap-phase-card visible">
            <div class="phase-header-bar">
              <span class="phase-num-tag">PHASE ${phaseObj.phase}</span>
              <span class="phase-status-pill">${phaseObj.category}</span>
            </div>
            <div class="phase-title">${phaseObj.title}</div>
            <p style="font-size: 0.8rem; color: var(--ink-tertiary); line-height: 1.45; margin: 0;">${phaseObj.desc}</p>
            <div class="phase-weeks-list">
              ${weekItemsHtml}
            </div>
          </div>
        `;
      }).join('');
    }

    function updateProgress(activeWeek = 1) {
      if (completionText) {
        completionText.textContent = `${visitedWeeks.size} / 13 Milestones Unlocked`;
      }

      if (dukeSpeech) {
        dukeSpeech.textContent = DUKE_MESSAGES[activeWeek] || "Exploring Advanced Java Laboratory!";
      }

      if (dukeRunner && window.innerWidth > 768) {
        const ratio = Math.max(0, Math.min((activeWeek - 1) / 12, 1));
        const maxOffset = 220;
        dukeRunner.style.transform = `translateX(${(ratio * maxOffset).toFixed(1)}px)`;
      }

      wrapper.querySelectorAll('.phase-week-item').forEach(item => {
        const wNum = parseInt(item.getAttribute('data-week'), 10);
        if (visitedWeeks.has(wNum)) {
          item.classList.add('visited');
          const statusSpan = item.querySelector('.phase-week-status');
          if (statusSpan) statusSpan.textContent = '✓';
        }
      });
    }

    renderPhases();
    updateProgress(1);

    wrapper.addEventListener('click', (e) => {
      const item = e.target.closest('.phase-week-item');
      if (!item) return;
      e.preventDefault();
      const weekNum = parseInt(item.getAttribute('data-week'), 10);
      visitedWeeks.add(weekNum);
      try {
        localStorage.setItem('java_record_visited_weeks', JSON.stringify([...visitedWeeks]));
      } catch (err) {}
      updateProgress(weekNum);

      const target = document.getElementById(`week-${weekNum}`);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        target.classList.add('focal-pulse');
        setTimeout(() => target.classList.remove('focal-pulse'), 2500);
      }
    });

    if ('IntersectionObserver' in window) {
      const stageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const weekNum = parseInt(entry.target.getAttribute('data-week'), 10);
            if (weekNum) {
              visitedWeeks.add(weekNum);
              try {
                localStorage.setItem('java_record_visited_weeks', JSON.stringify([...visitedWeeks]));
              } catch (e) {}
              updateProgress(weekNum);
            }
          }
        });
      }, { root: null, threshold: 0.25 });

      document.querySelectorAll('.exhibit-stage').forEach(st => stageObserver.observe(st));
    }
  }

  // Interactive Live Code Playground (Predict Output Simulator)
  function setupCodePlayground() {
    const body = document.getElementById('playground-body');
    const tabsBar = document.querySelector('.playground-tabs-bar');
    if (!body || !tabsBar) return;

    const PLAYGROUND_DATA = {
      jdbc: {
        title: 'PreparedStatement Query Execution',
        meta: 'WEEK 06 · JDBC CRUD & PREPAREDSTATEMENT',
        file: 'StudentQueryService.java',
        code: `// Laboratory Week 06 · Parameterized PreparedStatement
String sql = "SELECT roll_no, student_name, cgpa FROM student_records "
           + "WHERE department = ? AND cgpa >= ? ORDER BY cgpa DESC";

try (Connection conn = DriverManager.getConnection(DB_URL, USER, PASS);
     PreparedStatement ps = conn.prepareStatement(sql)) {

    ps.setString(1, "IT");
    ps.setDouble(2, 9.0);

    try (ResultSet rs = ps.executeQuery()) {
        while (rs.next()) {
            System.out.printf("[%s] %s | CGPA: %.2f%n",
                rs.getString("roll_no"),
                rs.getString("student_name"),
                rs.getDouble("cgpa"));
        }
    }
}`,
        prompt: 'Predict the console output when this parameterized query executes against the verified MySQL laboratory database:',
        options: [
          { text: '[24EU08197] Likhithsai Vemulapalli | CGPA: 9.85', correct: true },
          { text: 'SQLException: Column index 0 out of range', correct: false },
          { text: '[24EU08197] Likhithsai Vemulapalli | CGPA: 9.00', correct: false }
        ],
        consoleOutput: `[JVM-EXEC] Initializing MySQL JDBC Driver (com.mysql.cj.jdbc.Driver)...
[JVM-EXEC] Opening TCP Socket: 127.0.0.1:3306 -> database 'college'
[JVM-EXEC] Precompiling SQL statement on MySQL server...
[JVM-EXEC] Parameter 1 bound to: "IT"
[JVM-EXEC] Parameter 2 bound to: 9.0
[JVM-EXEC] Query execution took 1.18ms. Rows returned: 1
--------------------------------------------------------------------------------
>> [24EU08197] Likhithsai Vemulapalli | CGPA: 9.85
--------------------------------------------------------------------------------
[JVM-EXEC] ResultSet closed. Connection returned to pool cleanly.`
      },
      servlet: {
        title: 'HttpServlet HTTP GET Lifecycle',
        meta: 'WEEK 08 · ADVANCED SERVLET LIFECYCLE',
        file: 'StudentPortalServlet.java',
        code: `// Laboratory Week 08 · HttpServlet GET Lifecycle & JSON Stream
@WebServlet(name = "StudentServlet", urlPatterns = "/api/v1/student")
public class StudentPortalServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        resp.setContentType("application/json;charset=UTF-8");
        resp.setHeader("X-Powered-By", "Apache Tomcat/10.1");
        resp.setStatus(HttpServletResponse.SC_OK);

        PrintWriter out = resp.getWriter();
        out.print("{\\"roll\\":\\"24EU08197\\",\\"course\\":\\"24IT303\\",\\"status\\":\\"APPROVED\\"}");
        out.flush();
    }
}`,
        prompt: 'What HTTP status code and response payload does Tomcat stream back to the browser client?',
        options: [
          { text: 'HTTP 200 OK | Content-Type: application/json | {"roll":"24EU08197",...}', correct: true },
          { text: 'HTTP 404 Not Found (Missing deployment descriptor web.xml)', correct: false },
          { text: 'HTTP 500 Internal Server Error (PrintWriter flush conflict)', correct: false }
        ],
        consoleOutput: `[TOMCAT-10.1] Catalina HTTP Connector listening on TCP port 8080
[TOMCAT-10.1] Dispatched GET /api/v1/student to WorkerThread-3
[SERVLET-SVC] StudentPortalServlet.service() invoked -> routing to doGet()
[HTTP-HEADER] HTTP/1.1 200 OK
[HTTP-HEADER] Content-Type: application/json;charset=UTF-8
[HTTP-HEADER] X-Powered-By: Apache Tomcat/10.1
--------------------------------------------------------------------------------
>> {"roll":"24EU08197","course":"24IT303","status":"APPROVED"}
--------------------------------------------------------------------------------
[TOMCAT-10.1] Response stream flushed (58 bytes). Latency: 0.74ms`
      },
      jpa: {
        title: 'Spring Data JPA Derived Query Derivation',
        meta: 'WEEK 13 · DERIVED & CUSTOM QUERY METHODS',
        file: 'StudentRepository.java',
        code: `// Laboratory Week 13 · Spring Data JPA Derived Method
public interface StudentRepository extends JpaRepository<Student, Long> {

    // Spring Data JPA inspects method name tokens at startup:
    // "findBy" + "Department" + "And" + "CgpaGreaterThanEqual"
    List<Student> findByDepartmentAndCgpaGreaterThanEqual(
        String department,
        Double minCgpa
    );
}`,
        prompt: 'What native SQL query is derived and issued by Hibernate to the relational database engine?',
        options: [
          { text: 'SELECT * FROM students WHERE department = ? AND cgpa >= ?', correct: true },
          { text: 'SELECT department, cgpa FROM students GROUP BY department HAVING cgpa >= ?', correct: false },
          { text: 'Compilation Error: Interface method lacks @Query annotation', correct: false }
        ],
        consoleOutput: `[SPRING-BOOT] Bootstrapping Spring Data JPA repository interfaces...
[SPRING-DATA] Parsed predicate tokens: [department = ?1, cgpa >= ?2]
[HIBERNATE-ORM] org.hibernate.SQL:
    select s1_0.id, s1_0.cgpa, s1_0.department, s1_0.roll_no, s1_0.student_name
    from students s1_0
    where s1_0.department=? and s1_0.cgpa>=?
--------------------------------------------------------------------------------
>> Hydrated: Student(id=1, roll="24EU08197", name="Likhithsai", cgpa=9.85)
--------------------------------------------------------------------------------
[SPRING-DATA] Query returned 1 entity instance in 1.05ms`
      }
    };

    let activeKey = 'jdbc';

    function renderPlayground() {
      const data = PLAYGROUND_DATA[activeKey];
      if (!data) return;

      const optionsHtml = data.options.map((opt, i) => `
        <button class="pg-option-btn" data-opt-idx="${i}">
          <span style="font-family:'JetBrains Mono', monospace; font-weight:800; color:var(--celestial-indigo); margin-right: 0.75rem;">${String.fromCharCode(65 + i)})</span>
          <span>${escapeHtml(opt.text)}</span>
        </button>
      `).join('');

      body.innerHTML = `
        <div class="pg-snippet-header">
          <div>
            <div class="pg-snippet-title">${data.title}</div>
            <div class="pg-snippet-meta">${data.meta}</div>
          </div>
        </div>

        <div class="pg-code-window">
          <div class="pg-window-bar">
            <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#ef4444; margin-right:4px;"></span>
            <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#f59e0b; margin-right:4px;"></span>
            <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#10b981; margin-right:8px;"></span>
            <span>${data.file}</span>
          </div>
          <pre class="pg-code-pre"><code>${escapeHtml(data.code)}</code></pre>
        </div>

        <div class="pg-challenge-box">
          <div class="pg-challenge-prompt">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--celestial-indigo)" style="vertical-align:middle; margin-right:6px;"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
            ${data.prompt}
          </div>
          <div class="pg-options-row">
            ${optionsHtml}
          </div>
          <div class="pg-result-console" id="pg-result-console">
            <div style="color:#94a3b8; font-size:0.7rem; margin-bottom:0.5rem; text-transform:uppercase; letter-spacing:0.05em;">JVM Terminal Console</div>
            <pre style="margin:0; font-family:'JetBrains Mono', monospace; white-space:pre-wrap;">${data.consoleOutput}</pre>
          </div>
        </div>
      `;

      const optionButtons = body.querySelectorAll('.pg-option-btn');
      const consoleBox = body.querySelector('#pg-result-console');

      optionButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          const optIdx = parseInt(btn.getAttribute('data-opt-idx'), 10);
          const isCorrect = data.options[optIdx] && data.options[optIdx].correct;

          optionButtons.forEach(b => b.classList.remove('correct', 'wrong'));
          if (isCorrect) {
            btn.classList.add('correct');
            if (consoleBox) {
              consoleBox.style.display = 'block';
              consoleBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
          } else {
            btn.classList.add('wrong');
          }
        });
      });
    }

    tabsBar.addEventListener('click', (e) => {
      const tab = e.target.closest('.pg-tab-btn');
      if (!tab) return;
      tabsBar.querySelectorAll('.pg-tab-btn').forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      activeKey = tab.getAttribute('data-pg') || 'jdbc';
      renderPlayground();
    });

    renderPlayground();
  }

  // Animated Step-by-Step Architecture Concept Visualizers
  function setupAnimatedConcepts() {
    const stage = document.getElementById('concept-stage');
    const tabsBar = document.querySelector('.concepts-tabs-bar');
    if (!stage || !tabsBar) return;

    const CONCEPTS_DATA = {
      servlet: {
        title: 'Tomcat Servlet Request / Response Cycle',
        nodes: [
          { icon: '🌐', title: 'Client Browser', desc: 'HTTP GET /student' },
          { icon: '🐱', title: 'Apache Tomcat', desc: 'Catalina Engine' },
          { icon: '☕', title: 'StudentServlet', desc: 'service() ➔ doGet()' },
          { icon: '📦', title: 'HTTP Response', desc: '200 OK JSON Stream' }
        ],
        steps: [
          {
            num: 'STEP 01',
            title: 'Client HTTP Request',
            desc: 'Browser issues HTTP GET /api/v1/student over TCP to Apache Tomcat listening on port 8080.',
            activeNode: 0,
            flowArrow: 0
          },
          {
            num: 'STEP 02',
            title: 'Tomcat Catalina Engine Routing',
            desc: 'Tomcat parses HTTP request headers, matches URL pattern in @WebServlet, and allocates a Worker Thread from the thread pool.',
            activeNode: 1,
            flowArrow: 1
          },
          {
            num: 'STEP 03',
            title: 'Servlet service() & doGet() Execution',
            desc: 'Tomcat passes HttpServletRequest & HttpServletResponse to StudentServlet.doGet(), which queries the database and crafts the JSON payload.',
            activeNode: 2,
            flowArrow: 2
          },
          {
            num: 'STEP 04',
            title: 'HTTP 200 OK Response Stream',
            desc: 'Tomcat wraps the payload with Content-Type: application/json, flushes the TCP socket stream back to the browser client, and recycles the thread.',
            activeNode: 3,
            flowArrow: -1
          }
        ]
      },
      jpa: {
        title: 'JPA Entity ➔ Relational Database Row Mapping',
        nodes: [
          { icon: '☕', title: 'Java @Entity', desc: 'JVM Heap POJO' },
          { icon: '🛡️', title: 'EntityManager', desc: 'Persistence Context' },
          { icon: '⚡', title: 'Hibernate Dialect', desc: 'Parameterized SQL' },
          { icon: '🗄️', title: 'MySQL Engine', desc: 'InnoDB Disk Row' }
        ],
        steps: [
          {
            num: 'STEP 01',
            title: 'In-Memory @Entity Java Object',
            desc: 'A Java class annotated with @Entity, @Table, and @Id is instantiated in JVM Heap memory as a plain POJO.',
            activeNode: 0,
            flowArrow: 0
          },
          {
            num: 'STEP 02',
            title: 'EntityManager & Persistence Context',
            desc: 'Calling repository.save(student) registers the object into Hibernate 1st-level cache, transitioning its lifecycle state from Transient to Managed.',
            activeNode: 1,
            flowArrow: 1
          },
          {
            num: 'STEP 03',
            title: 'Hibernate Dialect SQL Generation',
            desc: 'Hibernate MySQL8Dialect inspects dirty fields and compiles a parameterized INSERT statement with bound placeholder values.',
            activeNode: 2,
            flowArrow: 2
          },
          {
            num: 'STEP 04',
            title: 'Relational Disk Storage in MySQL',
            desc: 'The JDBC driver flushes SQL over TCP port 3306. MySQL commits the record into an InnoDB clustered B-Tree index table and assigns the primary key.',
            activeNode: 3,
            flowArrow: -1
          }
        ]
      }
    };

    let activeConceptKey = 'servlet';
    let currentStepIdx = 0;
    let autoPlayTimer = null;

    function renderStage() {
      const data = CONCEPTS_DATA[activeConceptKey];
      if (!data) return;
      const step = data.steps[currentStepIdx] || data.steps[0];

      const nodesHtml = data.nodes.map((node, i) => {
        const isActiveNode = step.activeNode === i;
        const arrowHtml = i < data.nodes.length - 1 ? `
          <span class="concept-flow-arrow ${step.flowArrow === i ? 'active-flow' : ''}">➔</span>
        ` : '';

        return `
          <div class="concept-node ${isActiveNode ? 'active-step' : ''}">
            <div class="concept-node-icon">${node.icon}</div>
            <div class="concept-node-title">${node.title}</div>
            <div class="concept-node-desc">${node.desc}</div>
          </div>
          ${arrowHtml}
        `;
      }).join('');

      stage.innerHTML = `
        <div class="concept-diagram-track">
          ${nodesHtml}
        </div>

        <div class="concept-step-explainer">
          <div class="explainer-text-col">
            <span class="explainer-step-num">${step.num} · ${step.title}</span>
            <div class="explainer-step-desc">${step.desc}</div>
          </div>
          <div class="concept-controls-row">
            <button class="concept-step-btn" id="concept-btn-prev" aria-label="Previous Step">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/></svg>
              <span>Prev</span>
            </button>
            <button class="concept-step-btn" id="concept-btn-next" aria-label="Next Step">
              <span>Next</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
            </button>
            <button class="concept-step-btn" id="concept-btn-auto" aria-label="Toggle Autoplay">
              <span>${autoPlayTimer ? 'Pause' : 'Auto Play'}</span>
            </button>
          </div>
        </div>
      `;

      const prevBtn = stage.querySelector('#concept-btn-prev');
      const nextBtn = stage.querySelector('#concept-btn-next');
      const autoBtn = stage.querySelector('#concept-btn-auto');

      if (prevBtn) {
        prevBtn.addEventListener('click', () => {
          stopAutoPlay();
          currentStepIdx = (currentStepIdx - 1 + data.steps.length) % data.steps.length;
          renderStage();
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          stopAutoPlay();
          currentStepIdx = (currentStepIdx + 1) % data.steps.length;
          renderStage();
        });
      }

      if (autoBtn) {
        autoBtn.addEventListener('click', () => {
          if (autoPlayTimer) {
            stopAutoPlay();
          } else {
            startAutoPlay();
          }
        });
      }
    }

    function startAutoPlay() {
      const data = CONCEPTS_DATA[activeConceptKey];
      if (!data) return;
      autoPlayTimer = setInterval(() => {
        currentStepIdx = (currentStepIdx + 1) % data.steps.length;
        renderStage();
      }, 2400);
      renderStage();
    }

    function stopAutoPlay() {
      if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
      }
    }

    tabsBar.addEventListener('click', (e) => {
      const tab = e.target.closest('.concept-tab-btn');
      if (!tab) return;
      stopAutoPlay();
      tabsBar.querySelectorAll('.concept-tab-btn').forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      activeConceptKey = tab.getAttribute('data-concept') || 'servlet';
      currentStepIdx = 0;
      renderStage();
    });

    renderStage();
  }

  // Deep Links: #week-X or #week-X/page-Y or section anchor navigation
  function setupDeepLinks(exhibits) {
    function handleRoute() {
      const hash = window.location.hash || '';
      if (!hash) return;

      const weekMatch = hash.match(/^#week-(\d+)(?:\/page-(\d+))?$/);
      if (weekMatch) {
        const weekNum = parseInt(weekMatch[1], 10);
        const pageNum = weekMatch[2] ? parseInt(weekMatch[2], 10) : null;
        const targetExhibit = (exhibits || []).find(e => parseInt(e.number, 10) === weekNum);

        if (pageNum && targetExhibit) {
          const docRecord = {
            id: targetExhibit.id,
            number: targetExhibit.number,
            week: targetExhibit.category || `Week ${targetExhibit.number}`,
            title: targetExhibit.title,
            source: targetExhibit.pdfPath || (targetExhibit.specs && targetExhibit.specs.Source) || '',
            pages: targetExhibit.pages || [],
            documentType: (targetExhibit.pdfPath && targetExhibit.pdfPath.toLowerCase().endsWith('.docx')) ? 'DOCX' : (targetExhibit.pdfPath ? 'PDF' : 'UNAVAILABLE'),
            record: targetExhibit
          };
          if (typeof window.openRecordDocument === 'function') {
            window.openRecordDocument(docRecord, pageNum);
          }
        } else {
          if (window.ExhibitionPDFViewer && window.ExhibitionPDFViewer.backdrop && window.ExhibitionPDFViewer.backdrop.classList.contains('active')) {
            window.ExhibitionPDFViewer.closeViewer();
          }
          const stageEl = document.getElementById(`week-${weekNum}`);
          if (stageEl) {
            stageEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            stageEl.classList.remove('focal-pulse');
            void stageEl.offsetWidth;
            stageEl.classList.add('focal-pulse');
            setTimeout(() => stageEl.classList.remove('focal-pulse'), 2500);
          }
        }
        return;
      }

      if (hash === '#course-roadmap' || hash === '#playground' || hash === '#concepts' || hash === '#dossier' || hash === '#room-showcase') {
        const targetEl = document.querySelector(hash);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }

    window.addEventListener('hashchange', handleRoute);
    setTimeout(handleRoute, 350);
  }

});
