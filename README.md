# 🩺 Prescripto – Smart AI Healthcare Platform (Frontend)

> **Patient-facing web application for exploring doctors, scheduling appointments, paying consultation fees, and using the Vaidya AI doctor finder.**

---

## 🌐 Live Deployments

| Component | Role | Live Link |
| :--- | :--- | :--- |
| **🌐 Frontend (This App)** | Patient booking and consultation portal | [https://doctor-frontend-eosin.vercel.app](https://doctor-frontend-eosin.vercel.app) |
| **⚙️ Backend REST API** | Central API server & AI routing service | [https://doctor-backend-sigma.vercel.app](https://doctor-backend-sigma.vercel.app) |
| **🛡️ Admin & Doctor Panel** | Management portal for clinic staff & doctors | [https://doctor-admin-lemon.vercel.app](https://doctor-admin-lemon.vercel.app) |

---

## 📖 What This Folder Does

The `frontend` folder contains the patient-facing web application for **Prescripto – Smart AI Healthcare Platform**. Patients visit this site to:
1. Search and view verified doctors across 6 medical specialties.
2. Select convenient appointment slots and confirm bookings.
3. Pay consultation fees online via Razorpay.
4. Use **Vaidya AI** to find which specialist doctor is best suited for their symptoms.
5. Submit feedback, manage their profile, and view past appointments.

---

## ✨ Main Features

* **Doctor Directory & Specialty Filtering:**
  * Browse doctors by 6 specialties: General Physician, Gynecologist, Dermatologist, Pediatricians, Neurologist, and Gastroenterologist.
  * View doctor profiles with qualifications, years of experience, clinic addresses, and consultation fees (₹).

* **7-Day Interactive Slot Booking:**
  * Dynamic day and time slot selector with instant booked-slot detection.
  * Fast booking flow (< 200 ms) with immediate confirmation.

* **🤖 Vaidya AI — Specialist Finder Modal:**
  * Patients describe symptoms or checkup reasons in everyday language.
  * Interactively calls the backend AI service to recommend the appropriate specialty.
  * Displays practical visit preparation tips and highlights urgent emergency warnings (advising emergency care or 112 / 108).
  * Automatically suggests doctors specializing in that field matching the patient's budget.

* **Patient Authentication & Google Sign-In:**
  * Email and password registration and login with input validation.
  * **Google Sign-In** button powered by `@react-oauth/google` for one-click authentication.

* **Appointment Management & Razorpay Checkout:**
  * Track upcoming appointments with status badges (Paid, Pending, Completed, Cancelled).
  * In-browser Razorpay checkout modal for paying consultation fees.
  * One-click appointment cancellation with automatic slot freeing.

* **Floating Feedback Widget:**
  * Accessible floating feedback button on every page.
  * Allows patients to submit feature ideas or report issues directly to the database.

* **Dark & Light Mode:**
  * Built-in theme switcher with smooth transition, saving user preference in `localStorage`.

* **Connection Stability:**
  * Global 15-second network timeout configured for all Axios requests to gracefully alert users on slow or flaky internet connections.

---

## 🛠 Technologies Actually Used

* **Framework & Library:** React 19, React DOM
* **Build Tool:** Vite 7
* **Routing:** React Router DOM 7
* **Styling:** Tailwind CSS, PostCSS
* **HTTP Client:** Axios
* **Third-Party Integrations:**
  * `@react-oauth/google` (Google Sign-In)
  * Razorpay Checkout SDK (`https://checkout.razorpay.com/v1/checkout.js`)
  * `react-toastify` (UI notifications)

---

## ⚙️ Environment Variables

Create a `.env` file in the `frontend` root:

```env
VITE_BACKEND_URL=https://doctor-backend-sigma.vercel.app
VITE_ADMIN_PANEL_URL=https://doctor-admin-lemon.vercel.app/
VITE_GOOGLE_CLIENT_ID=579317631057-mo0asevaatpr80291duptashli53d0pf.apps.googleusercontent.com
VITE_RAZORPAY_KEY_ID=rzp_test_RUTnygb3nRj6Dz
```

> **Note:** For local development, set `VITE_BACKEND_URL=http://localhost:4000` and `VITE_ADMIN_PANEL_URL=http://localhost:5174`.

---

## 🚀 Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm run dev
   ```
3. **Build for production:**
   ```bash
   npm run build
   ```
