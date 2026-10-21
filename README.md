# 🩺 MeetOurDoctor - Healthcare Appointment Booking System (Frontend)

> **Patient-facing web application for browsing verified doctors, booking appointment slots, and processing online consultation payments.**

---

## 🔗 Project Ecosystem & Repositories

This frontend application is part of a complete 3-tier healthcare appointment ecosystem:

| Component | Description | Live Deployment / Repository |
| :--- | :--- | :--- |
| **🌐 Frontend (This Repo)** | Patient portal for booking & payments | [Live Website](https://meetourdoctor.vercel.app) *(or your Vercel URL)* |
| **🛡️ Admin & Doctor Panel** | Portal for managing appointments, schedules & doctors | [Live Admin Panel](https://doctor-admin-lemon.vercel.app) • [GitHub Repo](https://github.com/KandatiRanjithKumarReddy/doctor-admin) |
| **⚙️ Backend REST API** | Node.js / Express / MongoDB / Cloudinary / Razorpay | [API Endpoint](https://doctor-backend-sigma.vercel.app) • [GitHub Repo](https://github.com/KandatiRanjithKumarReddy/doctor-backend) |

---

## ✨ Overview

The **Frontend** application is the patient-facing interface of the MeetOurDoctor platform. It allows users to explore trusted doctors by medical specialty, book appointment slots, make secure online payments via Razorpay (INR ₹), and manage personal profiles and booking history.

**Key Features:**

* **Intuitive & Responsive UI:** Modern medical interface tailored for desktop, tablet, and mobile devices.
* **Specialist Directory:** Real-time doctor discovery across 6 core specialties (General Physician, Gynecologist, Dermatologist, Pediatrician, Neurologist, Gastroenterologist).
* **7-Day Dynamic Slot Booking:** Interactive 30-minute interval scheduler with instant availability checking.
* **Integrated Payments:** Seamless Razorpay payment gateway integration supporting Indian Rupee (₹ / INR) transactions.
* **User Authentication:** Secure JWT-based patient registration, login, and session preservation.
* **Patient Profile & Appointments:** Dedicated views to track appointment status, cancel visits, and update personal details.
* **Instant Fallback Engine:** Built-in resilient caching ensuring 0ms doctor rendering even under low connectivity.

## 🎯 Primary Users

* **Patients / End Users:** Browse doctors, schedule appointments, pay online, track status, and cancel bookings.

## ⚙️ Environment Variables

Create a `.env` file in the `frontend` root with the following keys:

```env
VITE_BACKEND_URL=http://localhost:4000
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
VITE_ADMIN_PANEL_URL=http://localhost:5174
```

> **Note:** Ensure `VITE_BACKEND_URL` does NOT contain a trailing slash.

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## 🛠 Tech Stack

* **React 19**
* **Vite 7**
* **React Router Dom 7**
* **Tailwind CSS**
* **Axios**
* **React Toastify**

## 📄 License

MIT License

