import React, { useState, useContext, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AppContext } from '../context/AppContext'
import DoctorCard from './DoctorCard'
import { notify, getErrorMessage } from '../utils/toast'

const EXAMPLE_PROMPTS = [
  'Burning stomach pain and acidity after meals',
  'Frequent migraine headaches with dizziness',
  'Itchy skin rash on arms for a week',
  'Routine vaccination and fever checkup for my child',
]

const BUDGET_OPTIONS = [
  { label: 'Any Fee Budget', value: '' },
  { label: 'Up to ₹1,000', value: '1000' },
  { label: 'Up to ₹2,000', value: '2000' },
  { label: 'Up to ₹3,500', value: '3500' },
  { label: 'Up to ₹5,000', value: '5000' },
]

const VaidyaFinder = ({ initialOpen = false, initialQuery = '' }) => {
  const navigate = useNavigate()
  const { backendUrl, doctors } = useContext(AppContext)
  const [isOpen, setIsOpen] = useState(initialOpen || Boolean(initialQuery))
  const [concern, setConcern] = useState(initialQuery || '')
  const [maxFee, setMaxFee] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)
  const autoRanRef = useRef(false)

  const askVaidya = useCallback(
    async (queryOverride) => {
      const text = (typeof queryOverride === 'string' ? queryOverride : concern).trim()
      if (text.length < 3) {
        notify.warn('Please describe your concern in a few words first.', 'vaidya-empty')
        return
      }
      if (isLoading) return

      setIsLoading(true)
      try {
        const { data } = await axios.post(`${backendUrl}/api/user/vaidya-recommend`, {
          concern: text,
          maxFee: maxFee ? Number(maxFee) : undefined,
        })

        if (data.success) {
          // Ensure local image fallbacks stay synced with AppContext doctors if any match by _id
          const hydratedDoctors = (data.doctors || []).map((doc) => {
            const fromContext = doctors.find((d) => d._id === doc._id)
            return fromContext ? { ...doc, image: fromContext.image } : doc
          })
          setResult({
            guidance: data.guidance,
            doctors: hydratedDoctors,
            budgetRelaxed: data.budgetRelaxed,
          })
        } else {
          notify.error(data.message || 'Vaidya could not match a specialist.', 'vaidya-error')
        }
      } catch (error) {
        notify.error(
          getErrorMessage(error, 'Vaidya is temporarily unavailable. Please try again.'),
          'vaidya-error'
        )
      } finally {
        setIsLoading(false)
      }
    },
    [backendUrl, concern, doctors, isLoading, maxFee]
  )

  useEffect(() => {
    if (initialQuery && !autoRanRef.current) {
      autoRanRef.current = true
      setIsOpen(true)
      setConcern(initialQuery)
      askVaidya(initialQuery)
    }
  }, [initialQuery, askVaidya])

  const handleFormSubmit = (e) => {
    e.preventDefault()
    askVaidya()
  }

  return (
    <div className="mb-8 rounded-2xl border border-indigo-200 dark:border-neutral-800 bg-gradient-to-br from-indigo-50/80 via-white to-blue-50/50 dark:from-[#121212] dark:via-[#0D0D0D] dark:to-[#141414] p-5 sm:p-6 shadow-sm">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-sm">
            V
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                Vaidya
              </h2>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary dark:bg-primary/20 dark:text-indigo-300 border border-primary/20">
                AI Specialist Finder
              </span>
            </div>
            <p className="text-sm sm:text-[15px] text-gray-600 dark:text-neutral-400 mt-0.5">
              Not sure which specialist to book? Describe your concern in simple words and Vaidya will guide you.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="self-start sm:self-center px-4 py-2 rounded-full text-sm font-semibold border border-primary/30 dark:border-neutral-700 bg-white dark:bg-[#181818] text-primary dark:text-neutral-200 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:border-primary transition-all cursor-pointer shrink-0"
        >
          {isOpen ? 'Hide Vaidya' : 'Ask Vaidya'}
        </button>
      </div>

      {/* Expandable Interactive Panel */}
      {isOpen && (
        <div className="mt-5 pt-5 border-t border-indigo-100 dark:border-neutral-800">
          {/* Quick Example Chips */}
          <div className="flex flex-wrap items-center gap-2 mb-3.5">
            <span className="text-xs font-medium text-gray-500 dark:text-neutral-400">
              Try an example:
            </span>
            {EXAMPLE_PROMPTS.map((sample) => (
              <button
                type="button"
                key={sample}
                disabled={isLoading}
                onClick={() => {
                  setConcern(sample)
                  askVaidya(sample)
                }}
                className="text-xs px-3 py-1.5 rounded-full bg-white dark:bg-[#181818] border border-gray-200 dark:border-neutral-700 text-gray-700 dark:text-neutral-300 hover:border-primary hover:text-primary dark:hover:border-primary transition-colors cursor-pointer"
              >
                {sample}
              </button>
            ))}
          </div>

          {/* Search Form */}
          <form onSubmit={handleFormSubmit} className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              maxLength={500}
              value={concern}
              disabled={isLoading}
              onChange={(e) => setConcern(e.target.value)}
              placeholder="e.g., Persistent skin rash on neck, child fever checkup, stomach acidity..."
              className="flex-1 rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-[#181818] text-gray-900 dark:text-neutral-100 placeholder:text-gray-400 dark:placeholder:text-neutral-500 text-[15px] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
            />

            <select
              value={maxFee}
              disabled={isLoading}
              onChange={(e) => setMaxFee(e.target.value)}
              aria-label="Maximum consultation fee"
              className="md:w-44 rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-[#181818] text-gray-800 dark:text-neutral-200 text-sm font-medium px-3.5 py-3 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors cursor-pointer"
            >
              {BUDGET_OPTIONS.map((opt) => (
                <option key={opt.label} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <button
              type="submit"
              disabled={isLoading}
              className="bg-primary hover:bg-primary/90 text-white font-semibold text-[15px] px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shrink-0 shadow-sm"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Finding...</span>
                </>
              ) : (
                'Find Specialist'
              )}
            </button>
          </form>

          {/* AI Recommendation Output */}
          {result?.guidance && (
            <div className="mt-5 space-y-4">
              {result.guidance.isEmergency && (
                <div className="rounded-xl border border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/50 p-4 text-red-800 dark:text-red-200 text-sm sm:text-[15px]">
                  <p className="font-bold">Urgent Medical Attention Recommended</p>
                  <p className="mt-1">{result.guidance.emergencyNote}</p>
                </div>
              )}

              <div className="rounded-xl bg-white dark:bg-[#141414] border border-gray-200 dark:border-neutral-800 p-4 sm:p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium text-gray-500 dark:text-neutral-400">
                      Recommended Specialist:
                    </span>
                    <span className="px-3.5 py-1 rounded-full text-sm font-bold bg-primary text-white">
                      {result.guidance.recommendedSpecialty}
                    </span>
                    {result.guidance.secondarySpecialty && (
                      <button
                        type="button"
                        onClick={() => navigate(`/doctors/${result.guidance.secondarySpecialty}`)}
                        className="px-3 py-1 rounded-full text-xs font-semibold border border-gray-300 dark:border-neutral-700 text-gray-700 dark:text-neutral-300 hover:border-primary hover:text-primary cursor-pointer transition-colors"
                      >
                        Also consider: {result.guidance.secondarySpecialty}
                      </button>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => navigate(`/doctors/${result.guidance.recommendedSpecialty}`)}
                    className="text-sm font-semibold text-primary hover:underline cursor-pointer"
                  >
                    Filter all {result.guidance.recommendedSpecialty} doctors &rarr;
                  </button>
                </div>

                <p className="mt-3 text-[15px] text-gray-700 dark:text-neutral-200 leading-relaxed">
                  {result.guidance.reason}
                </p>

                {result.guidance.visitTip && (
                  <p className="mt-2.5 text-sm text-gray-600 dark:text-neutral-400 bg-gray-50 dark:bg-[#1C1C1C] px-3.5 py-2.5 rounded-lg border border-gray-200/80 dark:border-neutral-800">
                    <strong className="text-gray-800 dark:text-neutral-200">Visit Prep Tip:</strong>{' '}
                    {result.guidance.visitTip}
                  </p>
                )}

                {result.budgetRelaxed && (
                  <p className="mt-2 text-xs text-amber-700 dark:text-amber-400">
                    No {result.guidance.recommendedSpecialty} specialists matched your selected fee cap—showing available doctors from lowest consultation fee.
                  </p>
                )}
              </div>

              {result.doctors?.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-gray-800 dark:text-neutral-200 mb-3">
                    Matching {result.guidance.recommendedSpecialty} Doctors Available to Book:
                  </p>
                  <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4">
                    {result.doctors.map((doc) => (
                      <DoctorCard key={doc._id} doctor={doc} />
                    ))}
                  </div>
                </div>
              )}

              <p className="text-xs text-gray-500 dark:text-neutral-500">
                Disclaimer: Vaidya helps you select an appropriate medical specialty for appointment booking and does not provide medical diagnosis, prescriptions, or treatment decisions.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default VaidyaFinder

