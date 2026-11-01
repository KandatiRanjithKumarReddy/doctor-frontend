import React, { useState, useContext, useEffect, useRef } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import BrandLogo from './BrandLogo'
import ThemeToggle from './ThemeToggle'
import { googleLogout } from '@react-oauth/google'
import { notify } from '../utils/toast'

const Navbar = () => {
  const navigate = useNavigate()
  const { token, setToken, userData } = useContext(AppContext)
  const [showMenu, setShowMenu] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [imgError, setImgError] = useState(false)
  const profileRef = useRef(null)

  useEffect(() => {
    setImgError(false)
  }, [userData?.image])

  const logout = () => {
    try {
      googleLogout()
    } catch {
      // Safe fallback when Google SDK has not initialized
    }
    setShowProfileMenu(false)
    setShowMenu(false)
    setToken(false)
    localStorage.removeItem('token')
    notify.info('Logged out successfully.', 'user-logout')
    navigate('/')
  }

  // Close profile dropdown when clicking outside on touch/desktop
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Lock background scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = showMenu ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [showMenu])

  const navItems = [
    { label: 'Home', to: '/' },
    { label: 'All Doctors', to: '/doctors' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ]

  return (
    <header className="flex items-center justify-between text-base py-4 mb-6 border-b border-gray-300 dark:border-neutral-800">
      <BrandLogo
        onClick={() => navigate('/')}
        className="w-36 sm:w-44 h-auto"
      />

      {/* Desktop Navigation */}
      <ul className="hidden lg:flex items-center gap-6 font-medium text-[15px] xl:text-base text-gray-800 dark:text-neutral-200">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className="hover:text-primary dark:hover:text-primary transition-colors"
          >
            <li className="py-1">{item.label}</li>
            <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden rounded-full" />
          </NavLink>
        ))}

        {/* ✅ Admin Panel link (opens in new tab) */}
        {import.meta.env.VITE_ADMIN_PANEL_URL && (
          <li>
            <a
              href={import.meta.env.VITE_ADMIN_PANEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 border border-gray-300 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-900 text-gray-700 dark:text-neutral-200 text-sm font-medium px-4 py-1.5 rounded-full hover:border-primary hover:text-primary dark:hover:border-primary transition-all"
            >
              Admin Panel
            </a>
          </li>
        )}
      </ul>

      {/* Right Actions */}
      <div className="flex items-center gap-2.5 sm:gap-3.5">
        <ThemeToggle />

        {token ? (
          <div
            ref={profileRef}
            className="relative group"
          >
            <button
              type="button"
              onClick={() => setShowProfileMenu((prev) => !prev)}
              aria-expanded={showProfileMenu}
              aria-label="Account menu"
              className="flex items-center gap-2 cursor-pointer p-1 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-900 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              {!imgError ? (
                <img
                  className="w-9 h-9 rounded-full object-cover border border-gray-200 dark:border-neutral-700 bg-gray-100 dark:bg-neutral-800"
                  src={userData?.image || assets.profile_pic}
                  alt={userData?.name || "Profile"}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    if (e.currentTarget.src !== assets.profile_pic && assets.profile_pic) {
                      e.currentTarget.src = assets.profile_pic
                    } else {
                      setImgError(true)
                    }
                  }}
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-sm flex items-center justify-center shrink-0">
                  {userData?.name ? userData.name.trim()[0].toUpperCase() : 'U'}
                </div>
              )}
              <img
                className={`w-2.5 dark:invert transition-transform duration-200 ${showProfileMenu ? 'rotate-180' : ''}`}
                src={assets.dropdown_icon}
                alt=""
              />
            </button>

            <div
              className={`absolute top-full right-0 pt-2.5 text-[15px] font-medium z-30 ${
                showProfileMenu ? 'block' : 'hidden group-hover:block'
              }`}
            >
              <div className="min-w-52 bg-white dark:bg-[#171717] border border-gray-200 dark:border-neutral-700 rounded-xl shadow-lg flex flex-col py-2 text-gray-700 dark:text-neutral-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowProfileMenu(false)
                    navigate('/my-profile')
                  }}
                  className="text-left px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-neutral-800 hover:text-primary cursor-pointer transition-colors"
                >
                  My Profile
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowProfileMenu(false)
                    navigate('/my-appointments')
                  }}
                  className="text-left px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-neutral-800 hover:text-primary cursor-pointer transition-colors"
                >
                  My Appointments
                </button>
                <hr className="my-1 border-gray-200 dark:border-neutral-800" />
                <button
                  type="button"
                  onClick={logout}
                  className="text-left px-4 py-2.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 cursor-pointer transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="bg-primary hover:bg-primary/90 text-white text-sm sm:text-[15px] font-medium px-5 sm:px-7 py-2.5 rounded-full hidden sm:inline-flex items-center justify-center transition-all cursor-pointer shadow-sm"
          >
            Create Account
          </button>
        )}

        {/* Mobile / Tablet Hamburger Button */}
        <button
          type="button"
          onClick={() => setShowMenu(true)}
          aria-label="Open navigation menu"
          className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-900 text-gray-800 dark:text-neutral-100 transition-colors cursor-pointer"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M10 18h10" />
          </svg>
        </button>

        {/* ---------- Mobile / Tablet Drawer ---------- */}
        <div
          className={`${
            showMenu ? 'fixed inset-0 opacity-100 pointer-events-auto' : 'fixed inset-0 opacity-0 pointer-events-none'
          } lg:hidden z-40 bg-white dark:bg-black transition-opacity duration-200 flex flex-col`}
        >
          <div className="flex items-center justify-between px-5 py-5 border-b border-gray-200 dark:border-neutral-800">
            <BrandLogo
              onClick={() => {
                setShowMenu(false)
                navigate('/')
              }}
              className="w-36 h-auto"
            />
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                type="button"
                onClick={() => setShowMenu(false)}
                aria-label="Close navigation menu"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-900 text-gray-700 dark:text-neutral-200 transition-colors cursor-pointer"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <ul className="flex flex-col gap-2 mt-6 px-5 text-lg font-medium flex-1 overflow-y-auto">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  onClick={() => setShowMenu(false)}
                  to={item.to}
                  className={({ isActive }) =>
                    `block w-full px-4 py-3 rounded-xl transition-colors ${
                      isActive
                        ? 'bg-primary text-white font-semibold'
                        : 'text-gray-700 dark:text-neutral-200 hover:bg-gray-100 dark:hover:bg-neutral-900'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}

            {token && (
              <>
                <li className="pt-2 border-t border-gray-200 dark:border-neutral-800 mt-2">
                  <NavLink
                    onClick={() => setShowMenu(false)}
                    to="/my-profile"
                    className={({ isActive }) =>
                      `block w-full px-4 py-3 rounded-xl transition-colors ${
                        isActive
                          ? 'bg-primary text-white font-semibold'
                          : 'text-gray-700 dark:text-neutral-200 hover:bg-gray-100 dark:hover:bg-neutral-900'
                      }`
                    }
                  >
                    My Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={() => setShowMenu(false)}
                    to="/my-appointments"
                    className={({ isActive }) =>
                      `block w-full px-4 py-3 rounded-xl transition-colors ${
                        isActive
                          ? 'bg-primary text-white font-semibold'
                          : 'text-gray-700 dark:text-neutral-200 hover:bg-gray-100 dark:hover:bg-neutral-900'
                      }`
                    }
                  >
                    My Appointments
                  </NavLink>
                </li>
              </>
            )}

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-neutral-800 flex flex-col gap-3 pb-8">
              {!token ? (
                <button
                  type="button"
                  onClick={() => {
                    setShowMenu(false)
                    navigate('/login')
                  }}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-medium text-base py-3.5 rounded-full transition-all cursor-pointer"
                >
                  Login / Create Account
                </button>
              ) : (
                <button
                  type="button"
                  onClick={logout}
                  className="w-full border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 font-medium text-base py-3 rounded-full transition-all cursor-pointer"
                >
                  Logout
                </button>
              )}

              {/* ✅ Admin Panel also available in mobile menu */}
              {import.meta.env.VITE_ADMIN_PANEL_URL && (
                <a
                  href={import.meta.env.VITE_ADMIN_PANEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowMenu(false)}
                  className="w-full text-center border border-gray-300 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-900 text-gray-700 dark:text-neutral-200 hover:border-primary hover:text-primary font-medium text-base py-3 rounded-full transition-all"
                >
                  Open Admin Panel
                </a>
              )}
            </div>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Navbar
