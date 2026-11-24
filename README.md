# Advanced Java Laboratory Record · Digital Archival Exhibition
### Course: Advanced Java Programming Laboratory (`24IT303`)
**Siddhartha Academy of Higher Education (SAHE)**  
*Deemed to be University · Department of Information Technology*

---

## 🎓 Academic Credentials

| Field | Detail |
| :--- | :--- |
| **Student Exhibitor** | **Likhithsai Vemulapalli** |
| **Registration / Roll No.** | **`24EU08197`** |
| **Department** | Department of Information Technology |
| **Class & Section** | III/IV B.Tech V Semester · Section C |
| **Course Code & Title** | `24IT303` — Advanced Java Laboratory |
| **Faculty In-Charge / Evaluator** | **Dr. Ramesh Mande**, Associate Professor, IT |
| **Academic Year** | 2026–2027 |

---

## 🏛️ Project Overview

The **Advanced Java Laboratory Record** is an interactive, museum-grade digital publication and exhibition showcasing the complete experimental record of work for the 5th Semester Advanced Java Programming curriculum.

Departing from conventional static documents, this platform presents all **13 laboratory weeks** (comprising **129 high-resolution folios**) through a physical-realistic HTML5 canvas flipbook engine with instant touch gestures, an interactive curriculum roadmap, runnable code playgrounds, step-by-step architectural diagrams, and progressive asset caching.

---

## 📑 13 Laboratory Weeks & Modules

| Week | Module Title | Primary Technologies | Key Concepts |
| :---: | :--- | :--- | :--- |
| **01** | Advanced Java Fundamentals & Web Architecture | Core Java, HTTP Protocols | JVM internals, client-server models, multitier architecture |
| **02** | OpenJDK 26 & Oracle JDK Multi-Version Setup | Linux Ubuntu, Bash, JVM | Environment paths, compiler flags, HotSpot runtime |
| **03** | Java & MS Access Database Connectivity | JDBC, UCanAccess, Jackcess | DSN-less connections, MS Access engine, SQL queries |
| **04** | JDBC MySQL Database Connectivity | JDBC Driver, MySQL 8.0 | `DriverManager`, Connection pools, statement execution |
| **05** | Local and Remote MySQL Network Connectivity | MySQL Network Sockets, TCP/IP | Remote IP binding, port configuration, secure handshakes |
| **06** | Advanced JDBC Programming & CRUD Transactions | PreparedStatements, CallableStatements | Parameterized SQL, transaction rollback, batch updates |
| **07** | Java Servlets & Apache Tomcat Lifecycle | Java EE / Jakarta Servlets, Tomcat | `init()`, `service()`, `destroy()`, deployment descriptors |
| **08** | HTTP Request Processing & Session Management | Servlets, HTTPSession, Cookies | Form processing, parameter validation, state tracking |
| **09** | Spring Boot & Maven Application Engineering | Spring Boot 3.x, Maven, Spring Initializr | Inversion of Control (IoC), Dependency Injection (DI) |
| **10** | Spring Boot Database Connectivity with JdbcTemplate | Spring JDBC, In-Memory H2 Database | `JdbcTemplate`, row mappers, in-memory persistence |
| **11** | Spring Boot JPA Web App with MySQL & Thymeleaf | Spring Data JPA, Hibernate, Thymeleaf | ORM entity mappings, MVC controllers, dynamic templating |
| **12** | Spring Data JPA Repository Architecture | JpaRepository, CrudRepository, H2 | Automated CRUD, interface proxies, entity lifecycle |
| **13** | Derived & Custom Query Methods in Spring Data JPA | JPQL, Method Query Conventions, `@Query` | Domain-specific queries, pagination, native SQL projection |

---

## 🚀 Key Features

### 📖 High-DPI Digital Publication Flipbook
- **StPageFlip Canvas Engine**: Ultra-smooth page-turning physics with authentic parchment lighting and paper drop-shadows.
- **Mobile-First Touch Gestures**:
  - **Swipe Left / Right**: Natural thumb flicking to turn pages forward or backward.
  - **Edge Tap Zones**: Tap outer 22% of screen to trigger turns.
  - **Floating Chevrons**: Glassmorphic, 48px thumb navigation buttons (`#mobile-arrow-prev` & `#mobile-arrow-next`) pinned to screen edges.
  - **Single & Dual Page Adaptation**: Switches automatically between single-page portrait on phones/tablets and dual-page magazine spread on desktop screens.

### ⚡ Progressive Chunk Asset Preloader
- **Zero-Latency Foliage Cache**: Assets are streamed and cached in 3 non-blocking background stages during the boot sequence:
  - *Chunk 1/3 (32%)*: Weeks 01–04 Record Folios
  - *Chunk 2/3 (62%)*: Weeks 05–08 Record Folios
  - *Chunk 3/3 (88%)*: Weeks 09–13 Record Folios & Spring Suite
- Once launched, opening any record opens immediately from the local memory/HTTP cache without network delay.

### 📜 Academic Bonafide Certificate
- Pixel-perfect, authentic university certificate honoring Siddhartha Academy of Higher Education standards.
- Fully printable and exportable to PDF (`Ctrl + P` / Print button).

### 🗺️ Interactive Curriculum Roadmap
- Follows Duke the Java Mascot through a 4-phase evolutionary timeline:
  - *Phase 1*: Foundations & Environment Setup (Weeks 1–2)
  - *Phase 2*: Relational Database Connectivity & JDBC (Weeks 3–6)
  - *Phase 3*: Enterprise Web Architecture & Servlets (Weeks 7–8)
  - *Phase 4*: Spring Boot & Spring Data JPA Framework (Weeks 9–13)
- Real-time visit tracking lights up completed milestones.

### 💻 Interactive Code Playground
- Live runnable snippets for JDBC, Servlets, and Spring Data JPA.
- "Predict the Output" interactive quiz mechanic before revealing compiled outputs.

### 🔄 Architectural Concept Flow Visualizers
- Step-by-step interactive animations explaining complex Java systems:
  - *HTTP Request Processing*: Browser → Network → Tomcat Engine → Servlet Handler → Response.
  - *JPA Entity-Relational Mapping*: Java POJO `@Entity` → Hibernate Engine → Relational Database Row.

### 🔍 Instant Cross-Curriculum Deep Search & Deep Linking
- Real-time instant search across all 13 weeks by keyword (e.g., `JdbcTemplate`, `Tomcat`, `Thymeleaf`, `UCanAccess`).
- URL hash anchoring allows sharing exact pages (e.g. `index.html#week-6/page-3`).

---

## 🛡️ Production Security Hardening

This project follows strict zero-vulnerability and production security practices:

- **Content Security Policy (CSP)**: Enforces strict white-listed sources (`'self'`, Google Fonts, Cloudflare CDN) preventing Cross-Site Scripting (XSS).
- **Clickjacking Defense**: `X-Frame-Options: SAMEORIGIN` and `frame-ancestors 'self'`.
- **MIME Sniffing Prevention**: `X-Content-Type-Options: nosniff`.
- **Referrer Privacy**: `Referrer-Policy: strict-origin-when-cross-origin`.
- **Feature Restrictions**: `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()`.
- **Directory Protection**: Apache directory indexing disabled (`Options -Indexes`) with hidden file access forbidden.
- **Production Headers Configured**: Fully integrated into `_headers` (Netlify), `netlify.toml`, and `.htaccess` (Apache).

---

## 📂 Repository File Structure

```text
24EU08197_java_record/
├── .gitignore                      # Git ignored files (.DS_Store, Thumbs.db, etc.)
├── .htaccess                       # Apache production security headers & Gzip compression
├── _headers                        # Netlify Edge security headers & CSP
├── netlify.toml                    # Netlify deployment and cache configuration
├── index.html                      # Single-page application entry point & semantic markup
├── data.json                       # Curriculum metadata, playground snippets & concept steps
├── documents-manifest.json         # Page index manifest for all 13 laboratory weeks
├── 197_image.jpeg                  # Student portrait for accreditation identity badge
├── README.md                       # Comprehensive documentation & deployment guide
├── assets/                         # Optimized production brand assets
│   ├── duke-mascot.svg             # Vector illustration of Duke the Java Mascot
│   ├── java-logo.png               # Official Java Platform emblem
│   ├── sahe-college-seal-color.png # University Seal (watermark & favicon)
│   └── sahe-logo.png               # Official SAHE institution emblem
├── css/                            # Modular stylesheets
│   ├── animations-physics.css      # Physics-inspired hover effects & reduced-motion queries
│   ├── bonafide-certificate.css    # University certificate styling & print rules
│   ├── coding-preloader.css        # Futuristic compiler HUD & terminal telemetry
│   ├── design-system.css           # CSS variables, typography tokens, light/clay palette
│   ├── layout-exhibition.css       # Responsive exhibition grid, drawer & cards
│   ├── typography.css              # Font declarations (Cormorant, Plus Jakarta, JetBrains)
│   └── viewer-dock.css             # Flipbook modal, floating controls & mobile touch UI
├── js/                             # Modular JavaScript modules
│   ├── coding-preloader.js         # Boot sequence engine & chunk asset preloader
│   ├── exhibition-motion.js        # Scroll triggers, stagger animations & sound effects
│   ├── flip-morph.js               # Card-to-fullscreen morphing transitions
│   ├── fluid-bg.js                 # Ambient canvas backdrop with reduced-motion fallback
│   ├── main.js                     # Curriculum orchestrator, search, roadmap & playground
│   ├── page-flip.browser.js        # StPageFlip library patched with portrait coordinates
│   ├── pdf.min.js                  # PDF.js core rendering engine (loaded on-demand)
│   ├── pdf.worker.min.js           # PDF.js web worker
│   ├── physics-hover.js            # Gyroscope & 3D tilt interaction for exhibit cards
│   └── viewer-dock.js              # Flipbook controller, touch swipe & URL deep linking
└── weeks/                          # 13 Laboratory Week exhibits (129 folios + 13 PDFs)
    ├── week1/                      # Week 01 - Java Fundamentals & Web Architecture
    ├── week2/                      # Week 02 - OpenJDK 26 Installation
    ├── week3/                      # Week 03 - MS Access Database Connectivity
    ├── week4/                      # Week 04 - JDBC MySQL Database Connectivity
    ├── week5/                      # Week 05 - Remote MySQL Network Connectivity
    ├── week6/                      # Week 06 - Advanced JDBC Programming & CRUD
    ├── week7/                      # Week 07 - Java Servlets & Tomcat
    ├── week8/                      # Week 08 - HTTP Requests & Session Tracking
    ├── week9/                      # Week 09 - Spring Boot & Maven Setup
    ├── week10/                     # Week 10 - Spring Boot JdbcTemplate & H2
    ├── week11/                     # Week 11 - Spring Boot JPA, MySQL & Thymeleaf
    ├── week12/                     # Week 12 - Spring Data JPA Repository
    └── week13/                     # Week 13 - Derived & Custom Query Methods
```

---

## 📱 Accessibility & Reduced Motion Support

- **WCAG 2.1 AA Compliant**: All interactive touch targets are at least 44×44px with 16px inputs to prevent auto-zooming on mobile iOS Safari.
- **Prefers-Reduced-Motion**: Automatically disables fluid background canvas animations, 3D tilt physics, and instant page transitions when system accessibility flags are active.

---

**© 2026–2027 Siddhartha Academy of Higher Education · Department of Information Technology**  
*Curated & Authored by Likhithsai Vemulapalli (24EU08197)*
"# 24eu08197_adv.java_recordweb" 
