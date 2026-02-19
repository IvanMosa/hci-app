# Final Report

**Students:** Nino Milas, Ivan Mosić  
**App:** Freelancia - https://web-production-2aeb9.up.railway.app 
**Repository:** https://github.com/IvanMosa/hci-app

---

## 1. Project Idea

The main idea behind **Freelancia** is to create a modern, streamlined freelancing marketplace that connects freelancers with clients.
In today's gig economy, talented individuals often struggle to present their skills effectively, while businesses need quick, reliable access to qualified professionals.
**Freelancia** aims to bridge this gap by providing a clean, intuitive platform where freelancers can showcase their expertise and portfolio, and clients can post projects and hire talent — all in one place.

---

## 2. The Problem

Currently, the freelancing landscape presents several challenges:

- **Platform overload:** Major freelancing platforms (Upwork, Fiverr, Freelancer.com) are cluttered and overwhelming, making it hard for new freelancers to get noticed.
- **High fees:** Existing platforms charge significant commissions, eating into freelancer earnings.
- **Fragmented experience:** Freelancers often need to maintain profiles across multiple platforms, and clients must navigate complex interfaces to find the right talent.
- **Lack of transparency:** It can be difficult for clients to verify freelancer credibility and compare portfolios efficiently.

**Freelancia** solves these problems by offering a unified, clean platform with straightforward project posting, easy application management, and clear freelancer profiles with portfolios and skill listings.

---

## 3. Target Users

### Primary Users

- **Aspiring Freelancers:** Students and early-career professionals looking to build their freelance portfolio and find their first clients.
- **Experienced Freelancers:** Multi-skilled professionals who want a clean platform to present their services and manage client inquiries.
- **Clients & Hiring Managers:** Startup founders, operations managers, and business owners who need to quickly find and hire qualified freelancers for projects.

---

## 4. Proposed Solution

**Freelancia** is a full-stack web application that allows users to:

- Register as a **Freelancer** or **Client** with role-specific dashboards.
- Browse and search freelancers by skills, or explore available projects.
- Post projects with detailed descriptions, budgets, and categories.
- Apply to projects with proposals and bid amounts.
- Manage applications — accept or reject freelancer bids.
- View freelancer portfolios and skill sets in detailed profile modals.

### Key Features

- **Dual Registration:** Users choose between Freelancer and Client roles at signup.
- **Explore Page:** Browse freelancers and projects with search filtering and infinite scroll.
- **Project Management:** Clients can post, view, and manage projects with status tracking (Active/Completed).
- **Application System:** Freelancers apply with proposals and bids; clients review, accept, or reject applications.
- **Freelancer Profiles:** Detailed profiles with skills, portfolio items, bio, location, and hourly rate.
- **Dashboard:** Role-specific dashboards with statistics and activity overviews.
- **Featured Content:** Landing page showcases top freelancers and trending projects via carousels.

---

## 5. User Personas

### Aisha Rahman — "The Aspiring Freelancer"
<img width="112" height="100" alt="image" src="https://github.com/user-attachments/assets/99ec6926-aecd-43d4-9b83-4910d4dc494a" />


- **Age:** 22
- **Location:** Kuala Lumpur
- **Occupation:** Final-year design student
- **Tech Skill Level:** Intermediate
- **Bio:** Aisha wants to break into freelance graphic design to earn income while studying. She struggles with promoting her work and finding clients.
- **Goals:**
  - Showcase her design portfolio easily
  - Find small creative gigs
  - Build credibility quickly
- **Frustrations:**
  - Hard to get noticed on big freelancer platforms
  - Many platforms charge high fees
  - Doesn't know how to market herself

### Daniel Ortiz — "The Multi-Gig Professional"
<img width="112" height="100" alt="image" src="https://github.com/user-attachments/assets/6ea0fc86-e9b6-4ce9-8a5c-2833619015ca" />

- **Age:** 34
- **Location:** Manila
- **Occupation:** Full-time freelancer (video editing + photography)
- **Tech Skill Level:** Advanced
- **Bio:** Daniel has been freelancing for 7 years. He wants a platform where clients can view all his services clearly and book him directly.
- **Goals:**
  - Manage multiple service offerings
  - Receive inquiries efficiently
  - Strengthen his personal freelance brand
- **Frustrations:**
  - Existing platforms feel cluttered
  - Hard to present multiple types of work in one place
  - Too many unqualified client requests

### Sarah Lim — "The Quick-Hire Client"
<img width="112" height="100" alt="image" src="https://github.com/user-attachments/assets/8758eb56-33ec-4020-8ca2-2b65de2e486a" />

- **Age:** 29
- **Location:** Singapore
- **Occupation:** Startup operations manager
- **Tech Skill Level:** High
- **Bio:** Sarah frequently hires freelancers for social media, content writing, and design. She needs fast, reliable access to talent.
- **Goals:**
  - Quickly compare freelancer offerings
  - Save trusted freelancers for future projects
  - Communicate easily with freelancers
- **Frustrations:**
  - Hard to verify freelancer credibility
  - Takes too long to evaluate portfolios

---

## 6. Information Architecture

### App Structure

- **Home:** Entry point with hero section, search bar, featured freelancers/projects, testimonials, and call-to-action.
- **Authentication:** Sign up (Freelancer or Client registration), Login, and session management.
- **Freelancer Dashboard:** Personal stats (applications, pending, skills, hourly rate), application tracking with status indicators.
- **Client Dashboard:** Project stats (total, active, completed, budget), project listing with status filtering.
- **Explore:** Browse Freelancers (grid with search filtering, infinite scroll, detail modals) and Browse Projects (grid with search, infinite scroll, detail modals).
- **Projects:** Client view — project carousel with application management (accept/reject). Freelancer view — applied projects with status tracking.
- **Profile:** Freelancer profile (skills, portfolio, personal info) or Client profile (posted projects grid).

### Hierarchy and Relationships

- **Primary Navigation:** Home, Explore, Login/Signup
- **Secondary Navigation (User-specific):** Dashboard, Projects, Profile
- **Tertiary Navigation:** Profile details, Job management, Application tracking within each section

---

## 7. Sitemap

### 1. Home

- Overview / Hero section
- Search bar (Find Freelancers / Find Projects)
- Featured Freelancers
- Featured Projects
- Testimonials
- Call to Action (Join Now / Post a Job)

### 2. Authentication

- Sign Up
  - Freelancer Registration
  - Client Registration
- Login
- Forgot Password

### 3. Freelancer Dashboard

- Profile
  - Personal Info
  - Skills & Expertise
  - Portfolio
- Jobs
  - Browse Available Jobs
  - Job Details Page
  - Apply / Bid on Job
  - Saved Jobs
- Settings
  - Account Settings
  - Security / Privacy

### 4. Client Dashboard

- Profile
  - Company Info
  - Posted Jobs
- Job Management
  - Post a New Job
  - Manage Posted Jobs (Active / Completed)
  - View Applications
  - Hire Freelancer
- Settings
  - Account Settings

### 5. Explore

- Browse Freelancers
  - Filter by Skill / Location / Rating
  - View Freelancer Profile
- Browse Projects
  - Filter by Category / Budget / Duration
  - View Project Details

---

## 8. Design and User Interface

The interface follows a modern, clean design with a dark primary color (#070415 — deep purple/black) and white contrasting sections. The design emphasizes professionalism, clarity, and ease of navigation with rounded pill-shaped buttons, card-based layouts, and smooth hover transitions.

### Home Page

The landing page introduces the platform with a dynamic hero section featuring the tagline _"Find the right freelancer. Faster than ever."_, a search section, carousels of featured freelancers and projects, testimonials, and a community call-to-action.
<br>

<img width="2536" height="1399" alt="image" src="https://github.com/user-attachments/assets/a2aa0d23-985f-4c75-b393-b5edf5998a97" />

### Explore Page

A unified discovery page where users can toggle between browsing freelancers and projects, with real-time search filtering and infinite scroll pagination. Clicking any card opens a detailed modal overlay.
<br>

![Explore Page](report_images/explore.png)

### Login Page

A split-screen layout with a hero section on the left and an authentication form on the right. Users can toggle between Login and Registration forms, with the registration form including a visual Freelancer/Client role selector.
<br>

<img width="2535" height="1394" alt="image" src="https://github.com/user-attachments/assets/2d9ee381-a311-4de5-a6a0-ba0ac8ff01f7" />


### Dashboard

Role-specific dashboards showing relevant statistics and activity. Clients see their project stats and project list; freelancers see application stats and their application history.
<br>

![Dashboard](report_images/dashboard.png)

### Projects Page

Clients manage their projects through a horizontal carousel and review freelancer applications with accept/reject actions. Freelancers see a carousel of projects they've applied to with status indicators.
<br>

![Projects Page](report_images/projects.png)

### Profile Page

Detailed user profiles showcasing personal information, skills with technology icons, portfolio items, and role-specific content (posted projects for clients, application history for freelancers).
<br>

![Profile Page](report_images/profile.png)

---

## 9. HCI Principles Applied

### Usability

- Clear top navigation bar with role-aware links (Dashboard and Projects only visible when logged in).
- Explore page with toggle between Freelancers/Projects and real-time search filtering.
- Infinite scroll eliminates pagination friction.
- Modal-based detail views keep users in context without page navigation.

### Consistency

- Consistent dark (#070415) and white color scheme across all pages.
- Uniform card-based layout for freelancers and projects throughout the application.
- Consistent pill-shaped buttons (`rounded-full`) and hover effects across all interactive elements.
- Geist font family used globally for a cohesive typographic identity.

### Feedback

- Toast notifications (React Toastify) confirm successful actions (login, registration, project posting, application submission).
- Application status badges with color coding: green (accepted/active), red (rejected), yellow (pending), gray (completed).
- Hover effects and transitions on cards and buttons provide immediate visual feedback.
- Loading states during data fetching and form submissions.

### Accessibility

- High contrast text (dark text on light backgrounds, white text on dark sections).
- Clear visual hierarchy with distinct section headings and content groupings.
- Responsive design adapting from mobile (1 column) to desktop (5-column grid).
- Semantic button labels and meaningful icons from Lucide React.

### Error Prevention

- Form validation on registration (password confirmation, required fields).
- Role-based access control prevents unauthorized actions (e.g., only clients can post projects, only freelancers can apply).
- Protected routes redirect unauthenticated users to the login page.

---

## 10. Evaluation and Improvements

Potential future improvements:

- **Messaging System:** Real-time chat between freelancers and clients for better communication.
- **Rating & Reviews:** Allow clients to rate freelancers after project completion for credibility building.
- **Advanced Filters:** Filter freelancers by location, rating, hourly rate range; filter projects by budget range, duration.
- **Payment Integration:** Built-in escrow and payment system for secure transactions.
- **Notifications:** Real-time push notifications for new applications, status changes, and messages.
- **Profile Editing:** In-app editing for freelancer skills, portfolio, bio, and hourly rate.
- **Saved/Bookmarked Items:** Allow users to save favorite freelancers or projects for quick access.
- **Interactive Charts:** Dashboard analytics with visual charts for earnings, application trends, and project activity.

---

## 11. Technologies Used

### Frontend

- **Framework:** Next.js 15 (App Router, Turbopack)
- **Library:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **State Management:** TanStack React Query v5
- **HTTP Client:** Axios (with JWT interceptors)
- **Icons:** Lucide React
- **Notifications:** React Toastify

### Backend

- **Framework:** NestJS 11
- **ORM:** Prisma 6
- **Database:** PostgreSQL 15
- **Authentication:** Passport JWT + bcrypt
- **Validation:** class-validator / class-transformer
- **API Documentation:** Swagger (OpenAPI)
- **Health Checks:** @nestjs/terminus

### Infrastructure

- **Monorepo:** Turborepo + Yarn Workspaces
- **Containerization:** Docker Compose (PostgreSQL)
- **Deployment:** Railway

---

## 12. Performance Testing

Performance testing was conducted using Google PageSpeed Insights to ensure optimal user experience across devices.

### Mobile Result

![Mobile Speed Test](report_images/mobile_performance.png)

### Desktop Result

![Desktop Speed Test](report_images/desktop_performance.png)

The application achieves high performance scores, ensuring fast load times and responsiveness across both mobile and desktop devices.

---

## 13. Conclusion

**Freelancia** successfully creates a modern freelancing marketplace that streamlines the connection between freelancers and clients. By providing role-specific dashboards, an intuitive explore/search interface, a transparent application system, and detailed freelancer profiles with portfolios, the platform addresses the core pain points of existing freelancing services — clutter, high fees, and fragmented experiences.

The full-stack architecture (Next.js + NestJS + PostgreSQL) ensures scalability and maintainability, while the clean, responsive UI built with Tailwind CSS delivers a professional experience across all devices. The dual-role system (Freelancer/Client) with JWT-based authentication provides a secure and personalized experience for each user type.

Freelancia demonstrates that a focused, well-designed platform can make the freelancing process simpler, faster, and more transparent for everyone involved.
