import { createContext, useState, useEffect } from "react";
import { doctors as initialDoctors, doc16, doc17, doc18 } from "../assets/assets";
import axios from 'axios'
import { toast } from 'react-toastify'

export const AppContext = createContext();

const AppContextProvider = (props) => {

  const currencySymbol = '₹'
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [doctors, setDoctors] = useState(initialDoctors || [])
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false)
  const [userData, setUserData] = useState(false)


  const getDoctorsData = async () => {

    try {

      const { data } = await axios.get(backendUrl + '/api/doctor/list')
      if (data.success) {
        const gastroFallback = {
          'dr. arthur conners': doc16,
          'dr. elena vance': doc17,
          'dr. marcus brody': doc18
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
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }

  }

    const loadUserProfileData = async () => {

    try {

      const { data } = await axios.get(backendUrl + '/api/user/get-profile', { headers: { token } })

      if (data.success) {
        setUserData(data.userData)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }

  }


  const value = {
    doctors, getDoctorsData,currencySymbol,
    token, setToken,
    backendUrl,userData,setUserData,loadUserProfileData
  };

  useEffect(() => {
    getDoctorsData()
  }, [])  

    useEffect(() => {
    if (token) {
      loadUserProfileData()
    } else {
      setUserData(false)
    }
  }, [token])




  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
