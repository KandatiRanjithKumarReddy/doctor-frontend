import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <section className="py-8 sm:py-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
        <span className="inline-block text-xs sm:text-sm font-semibold uppercase tracking-wider text-primary bg-primary/10 dark:bg-neutral-900 dark:border dark:border-neutral-800 px-3.5 py-1 rounded-full mb-3">
          Patient &amp; Clinic Support
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
          Contact <span className="text-primary">Prescripto</span>
        </h1>
        <p className="mt-3 text-base sm:text-lg text-gray-600 dark:text-neutral-300 leading-7">
          Have questions about booking an appointment, online payments, or joining our medical network? Our team is ready to assist you.
        </p>
      </div>

      {/* Main Content */}
      <div className="my-6 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-14 mb-16">
        <div className="w-full lg:w-5/12">
          <img
            className="w-full max-w-md mx-auto lg:max-w-none rounded-2xl shadow-md border border-gray-200 dark:border-neutral-800 object-cover"
            src={assets.contact_image}
            alt="Prescripto Support Team"
          />
        </div>

        <div className="w-full lg:w-7/12 flex flex-col gap-5">
          {/* Office Card */}
          <div className="rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-[#111111] p-6 sm:p-7 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-primary/10 dark:bg-neutral-800 text-primary flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Our Office</h2>
                <p className="mt-1 text-base text-gray-600 dark:text-neutral-300">
                  Andhra Pradesh, India
                </p>
              </div>
            </div>
          </div>

          {/* Direct Support Channels Card */}
          <div className="rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-[#111111] p-6 sm:p-7 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-primary/10 dark:bg-neutral-800 text-primary flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
              </div>
              <div className="min-w-0 flex-1 space-y-2">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Direct Support</h2>
                <p className="text-base text-gray-600 dark:text-neutral-300">
                  <span className="font-medium text-gray-800 dark:text-neutral-200">Phone: </span>
                  <a href="tel:+917569377080" className="hover:text-primary font-medium transition-colors">
                    +91-7569377080
                  </a>
                </p>
                <p className="text-base text-gray-600 dark:text-neutral-300 break-all">
                  <span className="font-medium text-gray-800 dark:text-neutral-200">Email: </span>
                  <a
                    href="mailto:kandatiranjithkumarreddy@gmail.com"
                    className="hover:text-primary font-medium transition-colors"
                  >
                    kandatiranjithkumarreddy@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Careers Card */}
          <div className="rounded-2xl border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-[#141414] p-6 sm:p-7 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Careers at Prescripto
            </h2>
            <p className="mt-1.5 text-base text-gray-600 dark:text-neutral-300 leading-7">
              Passionate about improving patient care and digital health infrastructure? Learn more about our clinical and engineering teams and explore current openings.
            </p>
            <a
              href="mailto:kandatiranjithkumarreddy@gmail.com?subject=Career%20Inquiry%20-%20Prescripto"
              className="mt-5 inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold text-base px-7 py-3 rounded-full transition-all shadow-sm"
            >
              <span>Contact Careers</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
