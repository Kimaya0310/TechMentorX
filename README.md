# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

# Social Mentor 🌍  
*A centralized civic-tech platform connecting donors, NGOs, volunteers, beneficiaries, and CSR-driven companies to enable transparent, efficient social impact.*

---

## 📌 Problem Statement

Many donors, local businesses, and college social clubs are willing to contribute food, clothes, toys, and essential items but lack a **structured, transparent, and location-aware platform** to ensure donations reach people in need.

Existing systems:
- Are unorganized and manual
- Lack real-time tracking and accountability
- Do not recognize volunteer efforts
- Fail to connect CSR initiatives with verified NGOs and beneficiaries

---

## 💡 Solution Overview

**Social Mentor** is a role-based, Firebase-powered web platform that connects:
- **Donors & CSR Companies**
- **NGOs**
- **Volunteers**
- **Beneficiaries**

It enables smart donation management, public welfare scheme discovery, volunteer coordination, and CSR impact tracking — all in one place.

---

## 👥 User Roles

- **NGO** – Manage donations, verify beneficiaries, coordinate volunteers
- **Beneficiary** – Request help, discover welfare schemes, track application status
- **Volunteer** – Get assigned tasks, track hours, earn certificates & rewards
- **CSR / Big Companies** – Sponsor drives, track ESG impact, download CSR reports

---

## 🚀 Key Features

### 🔐 Role-Based Dashboards
- Dynamic dashboards based on logged-in role
- Default dashboard shown before login

### 🎁 Smart Donation Management
- Location-based donation requests
- Pickup & distribution tracking
- Proof-of-delivery uploads
- Donation quality feedback

### 🤝 Volunteer Coordination System
- Skill-based task assignment
- Attendance & field verification
- Volunteer hours tracking
- Certificates & rewards

### 🏛️ Public Welfare & Facilities Portal
- Central access to government schemes
- Disability support (wheelchairs, e-wheelchairs)
- Mid-Day Meal program integration
- Step-by-step application guidance

### 🤖 AI Chatbot for Scheme Recommendation
- Suggests schemes based on:
  - Age
  - Income
  - Location
  - Disability status
- Supports **English, Hindi, Marathi**

### 📊 Impact & CSR Analytics
- Real-time impact metrics
- ESG & CSR compliance reports
- Downloadable CSR summaries

### 🌐 Inclusive & Accessible Design
- Multilingual support (EN / HI / MR)
- Dark mode
- Notification settings
- Clean, professional UI

---

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript / React
- **Backend:** Firebase
  - Firebase Authentication
  - Firestore Database
  - Firebase Storage
  - Firebase Hosting
- **AI Layer:** Rule-based / LLM-powered chatbot (extensible)
- **Maps & Location:** Google Maps API (optional)

---

## 🗂️ Firestore Data Model (High-Level)

- `users` – role, preferences, skills, settings  
- `donations` – item details, status, location, proof  
- `schemes` – eligibility, documents, steps  
- `applications` – scheme application tracking  
- `csrProjects` – sponsorships, impact metrics  

---

## 🔒 Security & Trust

- Role-based Firestore rules
- NGO verification system
- Proof-of-delivery & audit trails
- Public impact dashboard for transparency

---

## 🏆 Hackathon Impact

- Solves real-world coordination problems
- Scalable for cities, colleges, NGOs, and enterprises
- Encourages student participation in social work
- Bridges CSR initiatives with grassroots needs

---

## 📌 Future Scope

- Offline-first mobile support
- Aadhaar-based scheme verification
- Government API integration
- Advanced fraud detection
- Mobile app (Android / iOS)

---

## 🤝 Team

Built with a mission to make social impact **measurable, transparent, and scalable**.

---

## 📄 License

This project is licensed under the MIT License.


---