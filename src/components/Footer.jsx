import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BrandLogo from './BrandLogo'

const Footer = () => {
  const navigate = useNavigate()

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="mt-24 pt-12 border-t border-gray-200 dark:border-neutral-800 text-gray-600 dark:text-neutral-400">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1.3fr] gap-10 pb-10">
        {/* ---------- Brand & Mission ---------- */}
        <div>
          <BrandLogo
            onClick={() => {
              navigate('/')
              scrollTop()
            }}
            className="w-40 h-auto mb-4"
          />
          <p className="w-full max-w-md text-base text-gray-600 dark:text-neutral-400 leading-7">
            Prescripto is a modern healthcare appointment booking platform that helps patients discover verified specialists, schedule consultations effortlessly, and manage clinical visits securely online.
          </p>
        </div>

        {/* ---------- Quick Navigation ---------- */}
        <div>
          <h2 className="text-base font-semibold uppercase tracking-wider text-gray-900 dark:text-white mb-4">
            Company
          </h2>
          <ul className="flex flex-col gap-2.5 text-[15px]">
            <li>
              <Link to="/" onClick={scrollTop} className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/doctors" onClick={scrollTop} className="hover:text-primary transition-colors">
                All Doctors
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={scrollTop} className="hover:text-primary transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={scrollTop} className="hover:text-primary transition-colors">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" onClick={scrollTop} className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* ---------- Get in Touch ---------- */}
        <div>
          <h2 className="text-base font-semibold uppercase tracking-wider text-gray-900 dark:text-white mb-4">
            Get in Touch
          </h2>
          <ul className="flex flex-col gap-3 text-[15px]">
            <li>
              <a
                href="tel:+917569377080"
                className="inline-flex items-center gap-2.5 hover:text-primary transition-colors"
              >
                <svg className="w-4 h-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
                <span>+91-7569377080</span>
              </a>
            </li>
            <li>
              <a
                href="mailto:kandatiranjithkumarreddy@gmail.com"
                className="inline-flex items-start gap-2.5 hover:text-primary transition-colors break-all"
              >
                <svg className="w-4 h-4 text-primary shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                <span>kandatiranjithkumarreddy@gmail.com</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* ---------- Copyright Text ---------- */}
      <div className="border-t border-gray-200 dark:border-neutral-800 py-6">
        <p className="text-center text-base sm:text-[17px] font-medium text-gray-700 dark:text-neutral-300">
          © 2026 Prescripto. All rights reserved. Built By Ranjith 💛
        </p>
      </div>
    </footer>
  )
}

export default Footer
