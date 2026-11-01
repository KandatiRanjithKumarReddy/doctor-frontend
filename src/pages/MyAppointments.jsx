import React, { useContext, useState, useEffect, useCallback } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { notify, getErrorMessage } from '../utils/toast'

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData, currencySymbol } = useContext(AppContext)
  const [appointments, setAppointments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [cancellingId, setCancellingId] = useState(null)
  const [payingId, setPayingId] = useState(null)
  const [verifyingId, setVerifyingId] = useState(null)

  const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const navigate = useNavigate()

  const slotDateFormat = (slotDate) => {
    if (!slotDate) return ''
    const dateArray = slotDate.split('_')
    return dateArray[0] + ' ' + months[Number(dateArray[1])] + ' ' + dateArray[2]
  }

  const getUserAppointments = useCallback(async () => {
    setIsLoading(true)
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', {
        headers: { token },
      })

      if (data.success) {
        setAppointments([...data.appointments].reverse())
      } else {
        notify.error(data.message || 'Unable to load appointments.', 'appointments-load-error')
      }
    } catch (error) {
      console.log(error)
      notify.error(getErrorMessage(error, 'Unable to load appointments.'), 'appointments-load-error')
    } finally {
      setIsLoading(false)
    }
  }, [backendUrl, token])

  const cancelAppointment = async (appointmentId) => {
    if (cancellingId || payingId || verifyingId) return
    setCancellingId(appointmentId)

    try {
      const { data } = await axios.post(
        backendUrl + '/api/user/cancel-appointment',
        { appointmentId },
        { headers: { token } }
      )

      if (data.success) {
        setAppointments((prev) =>
          prev.map((item) =>
            item._id === appointmentId ? { ...item, cancelled: true } : item
          )
        )
        notify.success(data.message || 'Appointment cancelled.', `cancel-${appointmentId}`)
        getDoctorsData()
      } else {
        notify.error(data.message || 'Could not cancel appointment.', 'cancel-error')
      }
    } catch (error) {
      console.log(error)
      notify.error(getErrorMessage(error, 'Could not cancel appointment.'), 'cancel-error')
    } finally {
      setCancellingId(null)
    }
  }

  const initPay = (order, appointmentId, paymentToken) => {
    if (!window.Razorpay) {
      setPayingId(null)
      notify.error('Payment gateway failed to load. Please refresh the page.', 'rzp-sdk-error')
      return
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Prescripto',
      description: 'Doctor Consultation Payment',
      order_id: order.id,
      receipt: order.receipt,
      modal: {
        ondismiss: () => {
          setPayingId(null)
        },
      },
      handler: async (response) => {
        setPayingId(null)
        setVerifyingId(appointmentId)
        try {
          const { data } = await axios.post(
            backendUrl + '/api/user/verifyRazorpay',
            {
              ...response,
              appointmentId,
              paymentToken,
            },
            { headers: { token } }
          )

          if (data.success) {
            setAppointments((prev) =>
              prev.map((item) =>
                item._id === appointmentId ? { ...item, payment: true } : item
              )
            )
            notify.success('Payment verified! Appointment marked as Paid.', 'payment-success')
          } else {
            notify.error(data.message || 'Payment verification failed.', 'payment-verify-error')
          }
        } catch (error) {
          console.log(error)
          notify.error(getErrorMessage(error, 'Payment verification failed.'), 'payment-verify-error')
        } finally {
          setVerifyingId(null)
        }
      },
    }

    const rzp = new window.Razorpay(options)
    rzp.on('payment.failed', (resp) => {
      setPayingId(null)
      notify.error(
        resp?.error?.description || 'Payment failed. Please try again.',
        'payment-failed'
      )
    })
    rzp.open()
  }

  const appointmentRazorpay = async (appointmentId) => {
    if (payingId || verifyingId || cancellingId) return
    setPayingId(appointmentId)

    try {
      const { data } = await axios.post(
        backendUrl + '/api/user/payment-razorpay',
        { appointmentId },
        { headers: { token } }
      )

      if (data.success && data.alreadyPaid) {
        setAppointments((prev) =>
          prev.map((item) =>
            item._id === appointmentId ? { ...item, payment: true } : item
          )
        )
        notify.info(data.message || 'Appointment is already Paid.', 'payment-already-paid')
        setPayingId(null)
      } else if (data.success && data.order) {
        initPay(data.order, appointmentId, data.paymentToken)
      } else {
        notify.error(data.message || 'Unable to start payment.', 'payment-init-error')
        setPayingId(null)
      }
    } catch (error) {
      console.error('Error initiating Razorpay order:', error)
      notify.error(
        getErrorMessage(error, 'Failed to start payment process. Please check your connection.'),
        'payment-init-error'
      )
      setPayingId(null)
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments()
    } else {
      setIsLoading(false)
      navigate('/login')
    }
  }, [token, getUserAppointments, navigate])

  return (
    <section className="py-6 sm:py-10">
      <div className="pb-4 border-b border-gray-200 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Appointments</h1>
          <p className="text-[15px] text-gray-600 dark:text-neutral-400 mt-0.5">
            Track upcoming consultations, complete online payments, or manage bookings.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="divide-y divide-gray-200 dark:divide-neutral-800">
          {[1, 2, 3].map((n) => (
            <div key={n} className="py-6 flex flex-col sm:flex-row gap-5 animate-pulse">
              <div className="w-full sm:w-36 h-44 sm:h-36 rounded-xl bg-gray-200 dark:bg-neutral-800" />
              <div className="flex-1 space-y-3 py-1">
                <div className="h-5 w-48 bg-gray-200 dark:bg-neutral-800 rounded" />
                <div className="h-4 w-32 bg-gray-200 dark:bg-neutral-800 rounded" />
                <div className="h-4 w-64 bg-gray-200 dark:bg-neutral-800 rounded" />
                <div className="h-4 w-52 bg-gray-200 dark:bg-neutral-800 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : appointments.length === 0 ? (
        <div className="my-12 rounded-2xl border border-dashed border-gray-300 dark:border-neutral-800 bg-gray-50/70 dark:bg-[#111111] p-8 sm:p-12 text-center">
          <p className="text-lg font-semibold text-gray-800 dark:text-neutral-100">
            You have no appointments booked yet
          </p>
          <p className="mt-1.5 text-base text-gray-600 dark:text-neutral-400 max-w-md mx-auto">
            Explore our verified specialists on Prescripto and book a consultation slot in seconds.
          </p>
          <button
            type="button"
            onClick={() => navigate('/doctors')}
            className="mt-6 bg-primary hover:bg-primary/90 text-white font-medium text-base px-7 py-3 rounded-full transition-all cursor-pointer"
          >
            Browse Doctors
          </button>
        </div>
      ) : (
        <div className="divide-y divide-gray-200 dark:divide-neutral-800">
          {appointments.map((item) => {
            const isPayingThis = payingId === item._id
            const isVerifyingThis = verifyingId === item._id
            const isCancellingThis = cancellingId === item._id
            const isBusy = Boolean(payingId || verifyingId || cancellingId)

            return (
              <div
                className="flex flex-col sm:flex-row gap-5 sm:gap-6 py-6 items-start sm:items-center"
                key={item._id}
              >
                <img
                  onClick={() => navigate(`/appointment/${item.docData?._id || item.docId}`)}
                  className="w-full sm:w-36 h-52 sm:h-40 object-cover object-top rounded-xl bg-indigo-50 dark:bg-[#1A1A1A] border border-gray-200 dark:border-neutral-800 cursor-pointer shrink-0"
                  src={item.docData?.image}
                  alt={item.docData?.name || 'Doctor'}
                />

                <div className="flex-1 text-[15px] text-gray-600 dark:text-neutral-300 min-w-0">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {item.docData?.name}
                    </p>
                    {item.payment && !item.cancelled && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                        &#10003; Paid
                      </span>
                    )}
                  </div>
                  <p className="text-primary font-medium">{item.docData?.speciality}</p>

                  <div className="mt-2.5 space-y-0.5 text-sm sm:text-[15px]">
                    <p className="text-gray-800 dark:text-neutral-200 font-medium">Clinic Address:</p>
                    <p className="text-gray-600 dark:text-neutral-400">{item.docData?.address?.line1}</p>
                    <p className="text-gray-600 dark:text-neutral-400">{item.docData?.address?.line2}</p>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-[15px]">
                    <p>
                      <span className="text-gray-800 dark:text-neutral-200 font-medium">Date &amp; Time:</span>{' '}
                      {slotDateFormat(item.slotDate)} &bull; {item.slotTime}
                    </p>
                    {item.amount !== undefined && (
                      <p>
                        <span className="text-gray-800 dark:text-neutral-200 font-medium">Fee:</span>{' '}
                        {currencySymbol}
                        {Number(item.amount || 0).toLocaleString('en-IN')}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 w-full sm:w-auto sm:min-w-48 shrink-0">
                  {!item.cancelled && item.payment && !item.isCompleted && (
                    <span className="w-full sm:min-w-48 py-2.5 px-4 border border-emerald-300 dark:border-emerald-800 rounded-lg text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 font-semibold text-sm text-center">
                      Paid
                    </span>
                  )}

                  {!item.cancelled && !item.payment && !item.isCompleted && (
                    <button
                      type="button"
                      disabled={isBusy}
                      onClick={() => appointmentRazorpay(item._id)}
                      className="w-full sm:min-w-48 py-2.5 px-4 rounded-lg text-sm font-semibold border border-primary text-primary dark:border-neutral-600 dark:bg-[#181818] dark:text-white hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:border-primary dark:hover:text-white transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isVerifyingThis ? (
                        <>
                          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          <span>Verifying Payment...</span>
                        </>
                      ) : isPayingThis ? (
                        <>
                          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          <span>Opening Checkout...</span>
                        </>
                      ) : (
                        'Pay Online'
                      )}
                    </button>
                  )}

                  {!item.cancelled && !item.isCompleted && (
                    <button
                      type="button"
                      disabled={isBusy}
                      onClick={() => cancelAppointment(item._id)}
                      className="w-full sm:min-w-48 py-2.5 px-4 rounded-lg text-sm font-medium border border-gray-300 dark:border-neutral-700 bg-white dark:bg-[#141414] text-gray-600 dark:text-neutral-300 hover:bg-red-600 hover:border-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:border-red-600 dark:hover:text-white transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isCancellingThis ? (
                        <>
                          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          <span>Cancelling...</span>
                        </>
                      ) : (
                        'Cancel Appointment'
                      )}
                    </button>
                  )}

                  {item.cancelled && !item.isCompleted && (
                    <span className="w-full sm:min-w-48 py-2.5 px-4 border border-red-300 dark:border-red-900/70 bg-red-50/60 dark:bg-red-950/30 rounded-lg text-red-600 dark:text-red-400 font-medium text-sm text-center">
                      Appointment Cancelled
                    </span>
                  )}

                  {item.isCompleted && (
                    <span className="w-full sm:min-w-48 py-2.5 px-4 border border-emerald-400 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg text-emerald-700 dark:text-emerald-300 font-semibold text-sm text-center">
                      Completed
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default MyAppointments
