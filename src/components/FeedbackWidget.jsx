import React, { useState, useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { AppContext } from '../context/AppContext'
import { notify, getErrorMessage } from '../utils/toast'

const CATEGORIES = ['Idea', 'Problem', 'Other']

const FeedbackWidget = () => {
  const location = useLocation()
  const { backendUrl, token } = useContext(AppContext)
  const [isOpen, setIsOpen] = useState(false)
  const [category, setCategory] = useState('Idea')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // Hide on auth screen to keep login uncluttered; show across all patient browsing & booking pages
  if (location.pathname === '/login') {
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isSubmitting) return

    const trimmed = message.trim()
    if (trimmed.length < 3) {
      notify.warn('Please enter a short message before submitting.', 'feedback-empty')
      return
    }

    setIsSubmitting(true)
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/feedback`,
        {
          category,
          message: trimmed,
          page: location.pathname,
        },
        {
          headers: token ? { token } : {},
        }
      )

      if (data.success) {
        notify.success(data.message || 'Feedback submitted! Thank you.', 'feedback-success')
        setMessage('')
        setCategory('Idea')
        setIsOpen(false)
      } else {
        notify.error(data.message || 'Could not submit feedback.', 'feedback-error')
      }
    } catch (error) {
      notify.error(getErrorMessage(error, 'Failed to submit feedback. Please try again.'), 'feedback-error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Floating Patient Feedback Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Send Feedback"
        className="fixed bottom-5 right-4 sm:right-6 z-30 inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold text-sm px-4 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer"
      >
        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
        <span>Feedback</span>
      </button>

      {/* Feedback Modal */}
      {isOpen && (
        <div
          onClick={() => !isSubmitting && setIsOpen(false)}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[1px] flex items-end sm:items-center justify-center p-3 sm:p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="feedback-modal-title"
            className="w-full max-w-md rounded-2xl bg-white dark:bg-[#111111] border border-gray-200 dark:border-neutral-800 p-5 sm:p-6 shadow-2xl text-gray-800 dark:text-neutral-100"
          >
            <div className="flex items-center justify-between gap-3 mb-4">
              <div>
                <h2 id="feedback-modal-title" className="text-lg font-bold text-gray-900 dark:text-white">
                  Share Your Feedback
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-neutral-400">
                  Help us improve Prescripto for patients.
                </p>
              </div>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setIsOpen(false)}
                aria-label="Close feedback form"
                className="w-8 h-8 rounded-full inline-flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Category: Idea / Problem / Other */}
              <div className="grid grid-cols-3 gap-2">
                {CATEGORIES.map((item) => {
                  const active = category === item
                  return (
                    <button
                      type="button"
                      key={item}
                      disabled={isSubmitting}
                      onClick={() => setCategory(item)}
                      className={`py-2 px-3 rounded-xl text-sm font-semibold border transition-all cursor-pointer ${
                        active
                          ? 'bg-primary text-white border-primary shadow-sm'
                          : 'bg-gray-50 dark:bg-[#181818] text-gray-700 dark:text-neutral-300 border-gray-200 dark:border-neutral-700 hover:border-primary/60'
                      }`}
                    >
                      {item}
                    </button>
                  )
                })}
              </div>

              {/* Single Textarea */}
              <div>
                <textarea
                  rows={4}
                  maxLength={1000}
                  value={message}
                  disabled={isSubmitting}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    category === 'Idea'
                      ? 'Share a feature idea or improvement...'
                      : category === 'Problem'
                        ? 'Describe what went wrong so we can fix it...'
                        : 'Write your feedback here...'
                  }
                  className="w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-[#181818] text-gray-900 dark:text-neutral-100 placeholder:text-gray-400 dark:placeholder:text-neutral-500 text-[15px] p-3.5 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary resize-none transition-colors"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold text-[15px] py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  'Submit'
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default FeedbackWidget

