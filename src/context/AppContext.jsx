/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useCallback } from "react";
import { doctors as initialDoctors, doc16, doc17, doc18 } from "../assets/assets";
import axios from 'axios'
import { notify, getErrorMessage } from '../utils/toast'

export const AppContext = createContext();

const applyThemeToDOM = (nextTheme) => {
  const isDark = nextTheme === 'dark'
  const root = document.documentElement
  if (isDark) {
    root.classList.add('dark')
    root.setAttribute('data-theme', 'dark')
    root.style.colorScheme = 'dark'
  } else {
    root.classList.remove('dark')
    root.setAttribute('data-theme', 'light')
    root.style.colorScheme = 'light'
  }
  if (document.body) {
    document.body.classList.remove('dark')
  }
}

const getInitialTheme = () => {
  try {
    const saved = localStorage.getItem('prescripto-theme')
    if (saved === 'dark' || saved === 'light') return saved
  } catch {
    // Fallback to light mode if storage is unavailable
  }
  return 'light'
}

const AppContextProvider = (props) => {

  const currencySymbol = '₹'
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [doctors, setDoctors] = useState(initialDoctors || [])
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false)
  const [userData, setUserData] = useState(false)
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    applyThemeToDOM(theme)
    try {
      localStorage.setItem('prescripto-theme', theme)
    } catch {
      // Ignore storage write errors
    }
  }, [theme])

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === 'prescripto-theme' && (event.newValue === 'dark' || event.newValue === 'light')) {
        setTheme(event.newValue)
        applyThemeToDOM(event.newValue)
      }
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark'
      applyThemeToDOM(next)
      try {
        localStorage.setItem('prescripto-theme', next)
      } catch {
        // Ignore storage write errors
      }
      return next
    })
  }, [])

  const getDoctorsData = useCallback(async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/doctor/list')
      if (data.success) {
        const gastroFallback = {
          'dr. arthur conners': doc16,
          'dr. arvind sharma': doc16,
          'dr. elena vance': doc17,
          'dr. sarah jenkins': doc17,
          'dr. marcus brody': doc18,
          'dr. alan thompson': doc18
        }
        const sanitized = data.doctors.map((item) => {
          const lower = item.name ? item.name.toLowerCase().trim() : ''
          if ((!item.image || item.image.includes('prescripto/doc')) && gastroFallback[lower]) {
            return { ...item, image: gastroFallback[lower] }
          }
          return item
        })
        setDoctors(sanitized)
      } else {
        notify.error(data.message, 'doctors-fetch-error')
      }
    } catch (error) {
      console.log(error)
      notify.error(getErrorMessage(error, 'Unable to load doctors list.'), 'doctors-fetch-error')
    }
  }, [backendUrl])

  const loadUserProfileData = useCallback(async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/get-profile', { headers: { token } })

      if (data.success) {
        setUserData(data.userData)
      } else {
        notify.error(data.message, 'profile-fetch-error')
      }
    } catch (error) {
      console.log(error)
      notify.error(getErrorMessage(error, 'Unable to load profile data.'), 'profile-fetch-error')
    }
  }, [backendUrl, token])

  const value = {
    doctors, getDoctorsData, currencySymbol,
    token, setToken,
    backendUrl, userData, setUserData, loadUserProfileData,
    theme, toggleTheme
  };

  useEffect(() => {
    getDoctorsData()
  }, [getDoctorsData])

  useEffect(() => {
    if (token) {
      loadUserProfileData()
    } else {
      setUserData(false)
    }
  }, [token, loadUserProfileData])

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
