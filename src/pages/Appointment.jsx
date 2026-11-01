import React, { useContext, useEffect, useState, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctor from '../components/RelatedDoctor'
import axios from 'axios'
import { notify, getErrorMessage } from '../utils/toast'

const Appointment = () => {
  const { docId } = useParams()
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext)
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  const navigate = useNavigate()

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotDates, setSlotDates] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fetchDocInfo = useCallback(() => {
    const doctor = doctors.find((doc) => doc._id === docId)
    setDocInfo(doctor)
  }, [doctors, docId])

  const getAvailableSlots = useCallback(() => {
    const today = new Date()
    const allSlots = []
    const datesList = []

    for (let i = 0; i < 7; i++) {
      const dayRef = new Date(today)
      dayRef.setDate(today.getDate() + i)
      datesList.push(new Date(dayRef))

      const currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      const endTime = new Date(today)
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21, 0, 0, 0)

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      const timeSlots = []
      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })
        const day = currentDate.getDate()
        const month = currentDate.getMonth() + 1
        const year = currentDate.getFullYear()

        const slotDate = day + '_' + month + '_' + year
        const isSlotAvailable = !(
          docInfo?.slots_booked &&
          docInfo.slots_booked[slotDate] &&
          docInfo.slots_booked[slotDate].includes(formattedTime)
        )
        if (isSlotAvailable) {
          timeSlots.push({ datetime: new Date(currentDate), time: formattedTime })
        }
        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }
      allSlots.push(timeSlots)
    }

    setSlotDates(datesList)
    setDocSlots(allSlots)

    const firstWithSlots = allSlots.findIndex((daySlots) => daySlots.length > 0)
    setSlotIndex(firstWithSlots >= 0 ? firstWithSlots : 0)
    setSlotTime('')
  }, [docInfo])

  const bookAppointment = async () => {
    if (!token) {
      notify.warn('Please log in to book an appointment.', 'login-required')
      return navigate('/login')
    }

    if (!docSlots[slotIndex] || docSlots[slotIndex].length === 0) {
      return notify.warn('No available slots on this date. Please choose another day.', 'no-slots-day')
    }

    if (!slotTime) {
      return notify.warn('Please select a consultation time slot.', 'select-slot')
    }

    if (isSubmitting) return
    setIsSubmitting(true)

    try {
      const date = docSlots[slotIndex][0].datetime

      const day = date.getDate()
      const month = date.getMonth() + 1
      const year = date.getFullYear()
      const slotDate = day + '_' + month + '_' + year

      const { data } = await axios.post(
        backendUrl + '/api/user/book-appointment',
        { docId, slotDate, slotTime },
        { headers: { token } }
      )

      if (data.success) {
        notify.success(data.message || 'Appointment booked successfully!', 'book-success')
        navigate('/my-appointments')
        setTimeout(() => getDoctorsData(), 500)
      } else {
        notify.error(data.message || 'Unable to book appointment.', 'book-error')
      }
    } catch (error) {
      console.log(error)
      notify.error(getErrorMessage(error, 'Unable to book appointment. Please try again.'), 'book-error')
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    fetchDocInfo()
  }, [fetchDocInfo])

  useEffect(() => {
    if (docInfo) getAvailableSlots()
  }, [docInfo, getAvailableSlots])

  return (
    docInfo && (
      <section className="py-4 sm:py-6">
        {/* Doctor Details */}
        <div className="flex flex-col md:flex-row gap-6 items-stretch">
          <div className="w-full md:w-72 shrink-0">
            <img
              className="bg-primary w-full h-72 sm:h-80 md:h-full rounded-2xl object-cover object-top shadow-sm"
              src={docInfo.image}
              alt={docInfo.name}
              onError={(e) => {
                e.currentTarget.onerror = null
                e.currentTarget.src = assets.profile_pic
              }}
            />
          </div>

          <div className="flex-1 border border-gray-300 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 bg-white dark:bg-[#111111] shadow-sm">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                {docInfo.name}
              </h1>
              <img className="w-5 h-5" src={assets.verified_icon} alt="Verified" />
            </div>

            <div className="flex flex-wrap items-center gap-2.5 text-[15px] mt-2 text-gray-600 dark:text-neutral-300">
              <p className="font-medium">
                {docInfo.degree} &bull; {docInfo.speciality}
              </p>
              <span className="py-0.5 px-3 border border-gray-300 dark:border-neutral-700 bg-gray-50 dark:bg-[#181818] text-xs sm:text-sm font-medium rounded-full">
                {docInfo.experience}
              </span>
            </div>

            {docInfo.address && (docInfo.address.clinic || docInfo.address.line1) && (
              <div className="mt-4 flex items-start gap-2 text-sm sm:text-[15px] text-gray-600 dark:text-neutral-300">
                <svg
                  className="w-5 h-5 text-primary shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {docInfo.address.clinic || docInfo.address.line1}
                  </p>
                  <p className="text-gray-500 dark:text-neutral-400">
                    {docInfo.address.clinic && docInfo.address.line1 ? `${docInfo.address.line1}, ` : ''}
                    {docInfo.address.line2}
                  </p>
                </div>
              </div>
            )}

            <div className="mt-5">
              <p className="flex items-center gap-1.5 text-[15px] font-semibold text-gray-900 dark:text-white">
                <span>About Doctor</span>
                <img className="w-4 h-4 dark:invert" src={assets.info_icon} alt="" />
              </p>
              <p className="text-base text-gray-600 dark:text-neutral-300 max-w-2xl mt-1.5 leading-7">
                {docInfo.about}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-4">
              <p className="text-base text-gray-600 dark:text-neutral-300 font-medium">
                Consultation Fee:{' '}
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  {currencySymbol}
                  {Number(docInfo.fees || 0).toLocaleString('en-IN')}
                </span>
              </p>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${
                  docInfo.available
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                    : 'bg-gray-100 text-gray-600 dark:bg-neutral-800 dark:text-neutral-400'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    docInfo.available ? 'bg-emerald-500' : 'bg-gray-400 dark:bg-neutral-500'
                  }`}
                />
                {docInfo.available ? 'Available for Booking' : 'Currently Unavailable'}
              </span>
            </div>
          </div>
        </div>

        {/* Booking Slots */}
        <div className="mt-8 rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-[#111111] p-6 sm:p-8 shadow-sm">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
            Select Booking Slot
          </h2>
          <p className="text-[15px] text-gray-600 dark:text-neutral-400 mt-0.5">
            Choose your preferred consultation date and available 30-minute window.
          </p>

          {/* Day Selector */}
          <div className="flex gap-3 items-center w-full overflow-x-auto no-scrollbar mt-5 pb-1">
            {slotDates.map((dateObj, index) => {
              const isSelected = slotIndex === index
              const hasSlots = docSlots[index]?.length > 0
              return (
                <button
                  type="button"
                  onClick={() => {
                    setSlotIndex(index)
                    setSlotTime('')
                  }}
                  className={`text-center py-4 px-3 min-w-[72px] rounded-2xl font-medium transition-all cursor-pointer shrink-0 ${
                    isSelected
                      ? 'bg-primary text-white shadow-md'
                      : hasSlots
                        ? 'border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-[#181818] text-gray-700 dark:text-neutral-200 hover:border-primary dark:hover:border-primary'
                        : 'border border-gray-200 dark:border-neutral-900 bg-gray-100/60 dark:bg-[#0D0D0D] text-gray-400 dark:text-neutral-600'
                  }`}
                  key={index}
                >
                  <p className="text-xs font-semibold tracking-wider">
                    {daysOfWeek[dateObj.getDay()]}
                  </p>
                  <p className="text-lg font-bold mt-1">{dateObj.getDate()}</p>
                </button>
              )
            })}
          </div>

          {/* Time Selector */}
          <div className="mt-5">
            {docSlots.length > 0 && docSlots[slotIndex]?.length > 0 ? (
              <div className="flex items-center gap-3 w-full overflow-x-auto no-scrollbar pb-2">
                {docSlots[slotIndex].map((item, index) => {
                  const isSelected = item.time === slotTime
                  return (
                    <button
                      type="button"
                      onClick={() => setSlotTime(item.time)}
                      className={`text-sm sm:text-[15px] font-medium flex-shrink-0 px-5 py-2.5 rounded-full cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-primary text-white shadow-sm'
                          : 'text-gray-700 dark:text-neutral-200 border border-gray-300 dark:border-neutral-700 bg-white dark:bg-[#181818] hover:border-primary dark:hover:border-primary'
                      }`}
                      key={index}
                    >
                      {item.time.toLowerCase()}
                    </button>
                  )
                })}
              </div>
            ) : (
              <p className="text-[15px] text-gray-500 dark:text-neutral-400 py-3">
                No remaining slots for this date. Please select another day above.
              </p>
            )}
          </div>

          <button
            type="button"
            disabled={isSubmitting || !docInfo.available}
            onClick={bookAppointment}
            className="mt-6 w-full sm:w-auto bg-primary hover:bg-primary/90 text-white text-base font-semibold px-10 py-3.5 rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Booking Appointment...</span>
              </>
            ) : !docInfo.available ? (
              'Doctor Currently Unavailable'
            ) : (
              `Book an Appointment • ${currencySymbol}${Number(docInfo.fees || 0).toLocaleString('en-IN')}`
            )}
          </button>
        </div>

        {/* Related Doctors */}
        <RelatedDoctor docId={docId} speciality={docInfo.speciality} />
      </section>
    )
  )
}

export default Appointment
