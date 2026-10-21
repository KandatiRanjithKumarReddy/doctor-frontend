import React, { useContext, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'

const Doctors = () => {

  const { speciality } = useParams()
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  const filterDoc = useMemo(() => {
    if (speciality) {
      return doctors.filter(doc => doc.speciality.toLowerCase() === speciality.toLowerCase())
    }
    return doctors
  }, [doctors, speciality])

  return (
    <div>
      <p className='text-gray-600'>Browse through the doctors specialist.</p>

      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`} onClick={() => setShowFilter(prev => !prev)}>Filters</button>
        <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          <p onClick={() => speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'General physician' ? 'bg-indigo-100 text-black' : ''}`}>General physician</p>
          <p onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Gynecologist' ? 'bg-indigo-100 text-black' : ''}`}>Gynecologist</p>
          <p onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Dermatologist' ? 'bg-indigo-100 text-black' : ''}`}>Dermatologist</p>
          <p onClick={() => speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Pediatricians' ? 'bg-indigo-100 text-black' : ''}`}>Pediatricians</p>
          <p onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Neurologist' ? 'bg-indigo-100 text-black' : ''}`}>Neurologist</p>
          <p onClick={() => speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Gastroenterologist' ? 'bg-indigo-100 text-black' : ''}`}>Gastroenterologist</p>
        </div>

        <div className='w-full'>
          {filterDoc.length === 0 ? (
            <div className='flex flex-col items-center justify-center py-16 text-gray-500'>
              <p className='text-lg font-medium'>No doctors found in this specialty.</p>
              <p className='text-sm mt-1'>Please try selecting another specialty or view all doctors.</p>
              <button onClick={() => navigate('/doctors')} className='mt-4 px-6 py-2 bg-primary text-white text-sm rounded-full'>
                View All Doctors
              </button>
            </div>
          ) : (
            <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
              {filterDoc.map((item, index) => (
                <div onClick={() => navigate(`/appointment/${item._id}`)} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                  <img loading="lazy" decoding="async" className='bg-blue-50 w-full object-cover' src={item.image} alt={item.name} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = assets.profile_pic }} />
                  <div className='p-4'>
                    <div
                      className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : 'text-gray-600'
                        }`}
                    >
                      <p
                        className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-gray-600'
                          } rounded-full`}
                      ></p>
                      <p>{item.available ? 'Available' : 'Not Available'}</p>
                    </div>
                    <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                    <p className='text-gray-600 text-sm'>{item.speciality}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Doctors