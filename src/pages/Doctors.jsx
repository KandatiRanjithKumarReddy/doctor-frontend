import React, { useContext, useMemo, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import DoctorCard from '../components/DoctorCard'
import VaidyaFinder from '../components/VaidyaFinder'

const SPECIALTIES = [
  'General physician',
  'Gynecologist',
  'Dermatologist',
  'Pediatricians',
  'Neurologist',
  'Gastroenterologist',
]

const Doctors = () => {
  const { speciality } = useParams()
  const [searchParams] = useSearchParams()
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  const initialVaidyaOpen = searchParams.get('vaidya') === '1'
  const initialVaidyaQuery = searchParams.get('q') || ''

  const filterDoc = useMemo(() => {
    if (speciality) {
      return doctors.filter(
        (doc) => doc.speciality.toLowerCase() === speciality.toLowerCase()
      )
    }
    return doctors
  }, [doctors, speciality])

  const handleSelectSpecialty = (spec) => {
    if (speciality && speciality.toLowerCase() === spec.toLowerCase()) {
      navigate('/doctors')
    } else {
      navigate(`/doctors/${spec}`)
    }
    setShowFilter(false)
  }

  return (
    <section className="py-4 sm:py-6">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          {speciality ? `${speciality} Specialists` : 'All Specialist Doctors'}
        </h1>
        <p className="text-base text-gray-600 dark:text-neutral-400 mt-1">
          Browse verified medical specialists across India or ask Vaidya to help find the right specialist.
        </p>
      </div>

      {/* Vaidya AI Specialty & Doctor Finder */}
      <VaidyaFinder initialOpen={initialVaidyaOpen} initialQuery={initialVaidyaQuery} />

      <div className="flex flex-col md:flex-row items-start gap-6">
        {/* Mobile Filter Toggle */}
        <button
          type="button"
          className={`py-2.5 px-5 border rounded-xl text-[15px] font-medium transition-all md:hidden flex items-center gap-2 cursor-pointer ${
            showFilter
              ? 'bg-primary text-white border-primary'
              : 'bg-white dark:bg-[#141414] text-gray-700 dark:text-neutral-200 border-gray-300 dark:border-neutral-700'
          }`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          <span>{showFilter ? 'Hide Specialties' : 'Filter by Specialty'}</span>
        </button>

        {/* Specialty Sidebar */}
        <aside
          className={`w-full md:w-60 shrink-0 flex-col gap-2.5 text-[15px] ${
            showFilter ? 'flex' : 'hidden md:flex'
          }`}
        >
          <button
            type="button"
            onClick={() => {
              navigate('/doctors')
              setShowFilter(false)
            }}
            className={`w-full text-left px-4 py-2.5 border rounded-xl font-medium transition-all cursor-pointer ${
              !speciality
                ? 'bg-indigo-100 text-gray-900 border-indigo-200 dark:bg-primary dark:text-white dark:border-primary shadow-sm'
                : 'bg-white dark:bg-[#111111] border-gray-300 dark:border-neutral-800 text-gray-700 dark:text-neutral-300 hover:border-primary/60'
            }`}
          >
            All Specialties
          </button>

          {SPECIALTIES.map((spec) => {
            const isActive = speciality?.toLowerCase() === spec.toLowerCase()
            return (
              <button
                type="button"
                key={spec}
                onClick={() => handleSelectSpecialty(spec)}
                className={`w-full text-left px-4 py-2.5 border rounded-xl font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-100 text-gray-900 border-indigo-200 dark:bg-primary dark:text-white dark:border-primary shadow-sm'
                    : 'bg-white dark:bg-[#111111] border-gray-300 dark:border-neutral-800 text-gray-700 dark:text-neutral-300 hover:border-primary/60'
                }`}
              >
                {spec}
              </button>
            )
          })}
        </aside>

        {/* Doctors Grid */}
        <div className="flex-1 w-full min-w-0">
          {filterDoc.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-2xl border border-dashed border-gray-300 dark:border-neutral-800 bg-gray-50 dark:bg-[#111111]">
              <p className="text-lg font-semibold text-gray-800 dark:text-neutral-100">
                No doctors found in this specialty
              </p>
              <p className="text-base text-gray-600 dark:text-neutral-400 mt-1">
                Please try selecting another specialty or view all available doctors.
              </p>
              <button
                type="button"
                onClick={() => navigate('/doctors')}
                className="mt-5 px-7 py-2.5 bg-primary hover:bg-primary/90 text-white font-medium text-base rounded-full transition-all cursor-pointer"
              >
                View All Doctors
              </button>
            </div>
          ) : (
            <div className="w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-auto gap-5">
              {filterDoc.map((item) => (
                <DoctorCard key={item._id} doctor={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Doctors
