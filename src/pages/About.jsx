import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets, specialityData } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const About = () => {
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  const pillars = [
    {
      title: 'Efficiency',
      description:
        'Streamlined real-time appointment slot booking and instant online payment confirmation built to fit effortlessly into your busy schedule.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      ),
    },
    {
      title: 'Convenience',
      description:
        'Direct access to a verified network of experienced specialists across general medicine, pediatrics, dermatology, neurology, and more.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
        </svg>
      ),
    },
    {
      title: 'Personalization',
      description:
        'Manage your personal health profile, track upcoming consultations, and view complete appointment statuses from any device, day or night.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        </svg>
      ),
    },
  ]

  return (
    <section className="py-8 sm:py-12">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
        <span className="inline-block text-xs sm:text-sm font-semibold uppercase tracking-wider text-primary bg-primary/10 dark:bg-neutral-900 dark:border dark:border-neutral-800 px-3.5 py-1 rounded-full mb-3">
          Trusted Healthcare Platform
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
          About <span className="text-primary">Prescripto</span>
        </h1>
        <p className="mt-3 text-base sm:text-lg text-gray-600 dark:text-neutral-300 leading-7">
          Connecting patients with trusted doctors through transparent scheduling, verified clinical profiles, and secure digital care.
        </p>
      </div>

      {/* Hero Story Grid */}
      <div className="my-8 flex flex-col lg:flex-row items-center gap-8 lg:gap-14">
        <div className="w-full lg:w-5/12">
          <img
            className="w-full max-w-md mx-auto lg:max-w-none rounded-2xl shadow-md border border-gray-200 dark:border-neutral-800 object-cover"
            src={assets.about_image}
            alt="Prescripto Healthcare Doctors"
          />
        </div>

        <div className="flex flex-col justify-center gap-5 w-full lg:w-7/12 text-base text-gray-600 dark:text-neutral-300 leading-7">
          <p>
            Welcome to <strong className="font-semibold text-gray-900 dark:text-white">Prescripto</strong>, your trusted partner in managing healthcare appointments conveniently and reliably. At Prescripto, we understand the everyday challenges individuals and families face when searching for the right specialist, checking real-time availability, and coordinating clinic visits.
          </p>
          <p>
            Prescripto is committed to excellence in modern healthcare technology. We continuously refine our platform to remove waiting-room friction—whether you are booking your very first consultation, paying securely online, or managing follow-up visits across multiple medical departments.
          </p>

          {/* Vision Callout */}
          <div className="mt-2 rounded-xl bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-neutral-800 border-l-4 border-l-primary dark:border-l-primary p-5 sm:p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1.5">
              Our Vision
            </h2>
            <p className="text-base text-gray-600 dark:text-neutral-300 leading-7">
              Our vision at Prescripto is to create a seamless, stress-free healthcare experience for every patient—bridging the gap between communities and qualified medical professionals so you can access quality care right when you need it.
            </p>
          </div>

          {/* Live Platform Capability Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
            <div className="rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-[#111111] p-4">
              <p className="text-2xl font-bold text-primary">{doctors?.length || 0}+</p>
              <p className="text-sm font-medium text-gray-600 dark:text-neutral-400">Listed Specialists</p>
            </div>
            <div className="rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-[#111111] p-4">
              <p className="text-2xl font-bold text-primary">{specialityData?.length || 6}</p>
              <p className="text-sm font-medium text-gray-600 dark:text-neutral-400">Medical Departments</p>
            </div>
            <div className="rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-[#111111] p-4">
              <p className="text-2xl font-bold text-primary">24/7</p>
              <p className="text-sm font-medium text-gray-600 dark:text-neutral-400">Online Slot Access</p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Prescripto */}
      <div className="mt-16 sm:mt-20">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Why Choose <span className="text-primary">Prescripto</span>
          </h2>
          <p className="mt-1.5 text-base text-gray-600 dark:text-neutral-400">
            Designed around patient clarity, clinical reliability, and effortless booking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="group rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-[#111111] p-7 sm:p-8 flex flex-col gap-4 hover:bg-primary dark:hover:bg-primary hover:border-primary dark:hover:border-primary transition-all duration-300 shadow-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-neutral-800 text-primary group-hover:bg-white/20 group-hover:text-white flex items-center justify-center transition-colors">
                {pillar.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-white transition-colors">
                {pillar.title}
              </h3>
              <p className="text-base text-gray-600 dark:text-neutral-300 group-hover:text-white/90 leading-7 transition-colors">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="rounded-2xl bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-neutral-800 p-6 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              Ready to book your consultation?
            </h3>
            <p className="mt-1 text-base text-gray-600 dark:text-neutral-300">
              Browse available doctors by specialty and reserve a convenient appointment slot today.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              navigate('/doctors')
              window.scrollTo(0, 0)
            }}
            className="bg-primary hover:bg-primary/90 text-white font-semibold text-base px-7 py-3.5 rounded-full transition-all cursor-pointer shrink-0 shadow-sm"
          >
            Explore Doctors
          </button>
        </div>
      </div>
    </section>
  )
}

export default About
