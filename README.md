# Frontend - MeetOurDoctor Healthcare Appointment Booking System

## ✨ Overview

The **Frontend** application is the patient-facing interface of the MeetOurDoctor platform. It allows users to explore trusted doctors by medical specialty, book appointment slots, make secure online payments via Razorpay, and manage personal profiles and booking history.

**Key Points:**

* Intuitive, responsive interface tailored for healthcare seekers.
* User registration, login, and secure JWT session handling.
* Doctor directory with real-time filtering across 6 specialties.
* 7-day appointment slot picker with 30-minute intervals.
* Integrated Razorpay payment gateway for online consultation payments.
* Profile management and appointment history tracking.
* Responsive design optimized for desktop and mobile devices.

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

