import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import DoctorCard from './DoctorCard'

const RelatedDoctor = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext)
  const navigate = useNavigate()
  const [relDoc, setRelDoc] = useState([])

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      )
      setRelDoc(doctorsData)
    }
  }, [doctors, speciality, docId])

  if (relDoc.length === 0) return null

  return (
    <section className="flex flex-col items-center gap-4 my-16 text-gray-900 dark:text-neutral-100">
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
        Related Doctors
      </h2>
      <p className="max-w-xl text-center text-base text-gray-600 dark:text-neutral-400">
        Explore more verified specialists in {speciality}.
      </p>

      <div className="w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-auto gap-5 pt-6">
        {relDoc.slice(0, 5).map((item) => (
          <DoctorCard key={item._id} doctor={item} />
        ))}
      </div>

      <button
        type="button"
        onClick={() => {
          navigate('/doctors')
          window.scrollTo(0, 0)
        }}
        className="bg-blue-50 dark:bg-neutral-900 dark:border dark:border-neutral-800 text-gray-700 dark:text-neutral-200 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:border-primary font-semibold text-base px-10 py-3 rounded-full mt-8 transition-colors cursor-pointer"
      >
        View All Doctors
      </button>
    </section>
  )
}

export default RelatedDoctor
