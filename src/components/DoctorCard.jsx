import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'

const getHospitalLabel = (address) => {
  if (!address) return ''
  if (address.clinic) return address.clinic
  if (address.line1) {
    const city = address.line2 ? address.line2.split(',')[0].trim() : ''
    const firstPart = address.line1.split(',')[0].trim()
    return city ? `${firstPart}, ${city}` : firstPart
  }
  return ''
}

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate()
  const { currencySymbol } = useContext(AppContext)
  const hospital = getHospitalLabel(doctor.address)
  const isAvailable = doctor.available !== false

  return (
    <div
      onClick={() => {
        navigate(`/appointment/${doctor._id}`)
        window.scrollTo(0, 0)
      }}
      className="border border-blue-200 dark:border-neutral-800 bg-white dark:bg-[#111111] rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-2 hover:shadow-lg transition-all duration-300 flex flex-col"
    >
      <img
        loading="lazy"
        decoding="async"
        className="bg-blue-50 dark:bg-[#1A1A1A] w-full aspect-[4/4] object-cover object-top"
        src={doctor.image}
        alt={doctor.name}
        onError={(e) => {
          e.currentTarget.onerror = null
          e.currentTarget.src = assets.profile_pic
        }}
      />

      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between gap-2">
          <div
            className={`flex items-center gap-1.5 text-xs sm:text-sm font-medium ${
              isAvailable
                ? 'text-green-600 dark:text-emerald-400'
                : 'text-gray-500 dark:text-neutral-400'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full shrink-0 ${
                isAvailable ? 'bg-green-500' : 'bg-gray-500'
              }`}
            />
            <span>{isAvailable ? 'Available' : 'Not Available'}</span>
          </div>

          {doctor.experience && (
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 dark:bg-[#1C1C1C] text-gray-600 dark:text-neutral-300 border border-gray-200 dark:border-neutral-800 shrink-0">
              {doctor.experience}
            </span>
          )}
        </div>

        <p className="text-gray-900 dark:text-white text-lg font-semibold mt-1.5 truncate">
          {doctor.name}
        </p>

        <p className="text-primary font-medium text-sm">{doctor.speciality}</p>

        {doctor.degree && (
          <p className="text-xs sm:text-[13px] text-gray-600 dark:text-neutral-400 mt-1 truncate" title={doctor.degree}>
            {doctor.degree}
          </p>
        )}

        {hospital && (
          <p
            className="text-xs sm:text-[13px] text-gray-500 dark:text-neutral-400 mt-1 truncate"
            title={hospital}
          >
            {hospital}
          </p>
        )}

        <div className="mt-auto pt-3 border-t border-gray-100 dark:border-neutral-800/80 flex items-center justify-between">
          <span className="text-xs text-gray-500 dark:text-neutral-400">Consultation</span>
          <span className="text-[15px] font-bold text-gray-900 dark:text-white">
            {currencySymbol}
            {Number(doctor.fees || 0).toLocaleString('en-IN')}
          </span>
        </div>
      </div>
    </div>
  )
}

export default DoctorCard

