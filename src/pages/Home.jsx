import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'

const Home = () => {
  const navigate = useNavigate()
  const [quickConcern, setQuickConcern] = useState('')

  const handleAskVaidya = (e) => {
    e.preventDefault()
    const q = quickConcern.trim()
    if (q) {
      navigate(`/doctors?vaidya=1&q=${encodeURIComponent(q)}`)
    } else {
      navigate('/doctors?vaidya=1')
    }
    window.scrollTo(0, 0)
  }

  return (
    <div>
      <Header />
      <SpecialityMenu />

      {/* Vaidya AI Quick-Launch Strip */}
      <section className="my-6 rounded-2xl border border-indigo-200 dark:border-neutral-800 bg-indigo-50/70 dark:bg-[#111111] p-5 sm:p-7 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 mb-1.5">
            <span className="w-6 h-6 rounded-md bg-primary text-white text-xs font-bold flex items-center justify-center">
              V
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Meet Vaidya &bull; AI Specialist Guide
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            Unsure which specialist doctor to book?
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-neutral-400 mt-1">
            Tell Vaidya how you feel in everyday words and get matched to the right Prescripto specialist in seconds.
          </p>
        </div>

        <form onSubmit={handleAskVaidya} className="flex flex-col sm:flex-row gap-2.5 w-full lg:max-w-lg">
          <input
            type="text"
            value={quickConcern}
            onChange={(e) => setQuickConcern(e.target.value)}
            placeholder="e.g., Stomach burning after meals, migraine..."
            className="flex-1 rounded-full border border-gray-300 dark:border-neutral-700 bg-white dark:bg-[#181818] text-gray-900 dark:text-neutral-100 placeholder:text-gray-400 dark:placeholder:text-neutral-500 text-sm sm:text-[15px] px-5 py-3 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
          />
          <button
            type="submit"
            className="bg-primary hover:bg-primary/90 text-white font-semibold text-sm sm:text-[15px] px-6 py-3 rounded-full transition-all cursor-pointer shrink-0 shadow-sm"
          >
            Ask Vaidya
          </button>
        </form>
      </section>

      <TopDoctors />
      <Banner />
    </div>
  )
}

export default Home
