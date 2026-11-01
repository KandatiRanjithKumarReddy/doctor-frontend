import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
  const navigate = useNavigate()

  return (
    <section className="flex bg-primary rounded-2xl px-6 sm:px-10 md:px-14 lg:px-16 my-16 overflow-hidden shadow-md">
      {/* ---------- Left Side ---------- */}
      <div className="flex-1 py-10 sm:py-12 md:py-16 lg:py-24">
        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
          <p>Book Appointment</p>
          <p className="mt-2 sm:mt-3">With Trusted Prescripto Doctors</p>
        </div>
        <button
          type="button"
          onClick={() => {
            navigate('/login')
            window.scrollTo(0, 0)
          }}
          className="bg-white text-gray-800 font-semibold text-base px-8 py-3.5 rounded-full mt-7 hover:scale-[1.03] active:scale-[0.99] transition-all cursor-pointer shadow-sm"
        >
          Create Account
        </button>
      </div>

      {/* ---------- Right Side ---------- */}
      <div className="hidden md:block md:w-1/2 lg:w-[370px] relative">
        <img
          className="w-full absolute bottom-0 right-0 max-w-md object-contain"
          src={assets.appointment_img}
          alt="Book Appointment"
        />
      </div>
    </section>
  )
}

export default Banner
