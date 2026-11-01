import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <section className="flex flex-col md:flex-row bg-primary rounded-2xl px-6 sm:px-10 lg:px-16 overflow-hidden shadow-md">
      {/* ---------- Left Side ---------- */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-5 py-10 sm:py-12 md:py-16 lg:py-24">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl text-white font-bold leading-tight tracking-tight">
          Book Appointment <br /> With Trusted Doctors
        </h1>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3.5 text-white/95 text-base leading-relaxed">
          <img className="w-28 shrink-0" src={assets.group_profiles} alt="Trusted patients" />
          <p>
            Simply browse through our extensive list of verified specialists and schedule your appointment hassle-free.
          </p>
        </div>

        <a
          className="inline-flex items-center gap-2.5 bg-white text-gray-800 font-semibold px-8 py-3.5 rounded-full text-base shadow-sm hover:scale-[1.03] active:scale-[0.99] transition-all duration-200"
          href="#speciality"
        >
          <span>Book Appointment</span>
          <img className="w-3" src={assets.arrow_icon} alt="" />
        </a>
      </div>

      {/* ---------- Right Side ---------- */}
      <div className="md:w-1/2 relative flex items-end justify-center">
        <img
          className="w-full max-w-md md:max-w-none md:absolute bottom-0 h-auto object-contain"
          src={assets.header_img}
          alt="Prescripto Doctors"
        />
      </div>
    </section>
  )
}

export default Header
