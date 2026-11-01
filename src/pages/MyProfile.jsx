import React, { useState, useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { notify, getErrorMessage } from '../utils/toast'

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const updateUserProfileData = async () => {
    if (isSaving) return
    if (!userData.name?.trim()) {
      return notify.warn('Full name cannot be empty.', 'profile-name-required')
    }
    setIsSaving(true)

    try {
      const formData = new FormData()

      formData.append('name', userData.name.trim())
      formData.append('phone', userData.phone || '')
      formData.append('address', JSON.stringify(userData.address || { line1: '', line2: '' }))
      formData.append('gender', userData.gender || 'Not Selected')
      formData.append('dob', userData.dob || 'Not Selected')

      if (image) {
        formData.append('image', image)
      }

      const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, {
        headers: { token },
      })

      if (data.success) {
        notify.success(data.message || 'Profile updated successfully!', 'profile-update-success')
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
      } else {
        notify.error(data.message || 'Failed to update profile.', 'profile-update-error')
      }
    } catch (error) {
      console.log(error)
      notify.error(getErrorMessage(error, 'Failed to update profile.'), 'profile-update-error')
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancelEdit = async () => {
    setIsEdit(false)
    setImage(false)
    await loadUserProfileData()
  }

  const formattedDobValue = /^\d{4}-\d{2}-\d{2}$/.test(userData?.dob || '') ? userData.dob : ''

  const inputClass =
    'bg-gray-50 dark:bg-[#181818] border border-gray-300 dark:border-neutral-700 text-gray-900 dark:text-neutral-100 text-base rounded-lg px-3.5 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-colors'

  return (
    userData && (
      <section className="py-6 sm:py-10 max-w-2xl">
        <div className="rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-[#111111] p-6 sm:p-8 shadow-sm flex flex-col gap-6 text-base transition-colors duration-200">
          {/* Avatar + Name Header */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 pb-6 border-b border-gray-200 dark:border-neutral-800">
            {isEdit ? (
              <label htmlFor="image" className="inline-block relative cursor-pointer self-start">
                <img
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover opacity-80 border-2 border-primary bg-gray-100 dark:bg-neutral-800"
                  src={image ? URL.createObjectURL(image) : (userData.image || assets.profile_pic)}
                  alt={userData.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.onerror = null
                    e.currentTarget.src = assets.profile_pic
                  }}
                />
                {!image && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-2xl">
                    <img className="w-9 h-9" src={assets.upload_icon} alt="Upload avatar" />
                  </div>
                )}
                <input
                  onChange={(e) => e.target.files?.[0] && setImage(e.target.files[0])}
                  type="file"
                  accept="image/*"
                  id="image"
                  hidden
                />
              </label>
            ) : (
              <img
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border border-gray-200 dark:border-neutral-700 bg-gray-100 dark:bg-neutral-800"
                src={userData.image || assets.profile_pic}
                alt={userData.name}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.onerror = null
                  e.currentTarget.src = assets.profile_pic
                }}
              />
            )}

            <div className="flex-1 min-w-0">
              {isEdit ? (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-neutral-400 mb-1">
                    Full Name
                  </label>
                  <input
                    className="w-full bg-gray-50 dark:bg-[#181818] border border-gray-300 dark:border-neutral-700 rounded-lg px-3.5 py-2 text-xl sm:text-2xl font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/40"
                    type="text"
                    value={userData.name}
                    onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
                  />
                </div>
              ) : (
                <>
                  <h1 className="font-bold text-2xl sm:text-3xl text-gray-900 dark:text-white truncate">
                    {userData.name}
                  </h1>
                  <p className="text-[15px] text-gray-500 dark:text-neutral-400 mt-0.5 break-all">
                    {userData.email}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-primary mb-4">
              Contact Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-y-4 gap-x-4 items-start text-[15px]">
              <p className="font-semibold text-gray-700 dark:text-neutral-300">Email Address:</p>
              <div className="break-all">
                <p className="text-gray-700 dark:text-neutral-200 font-medium">{userData.email}</p>
                {isEdit && (
                  <p className="text-xs text-gray-500 dark:text-neutral-400 mt-0.5">
                    Registered account email cannot be changed.
                  </p>
                )}
              </div>

              <p className="font-semibold text-gray-700 dark:text-neutral-300">Phone Number:</p>
              {isEdit ? (
                <input
                  className={`w-full sm:max-w-xs ${inputClass}`}
                  type="tel"
                  value={userData.phone || ''}
                  onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
                />
              ) : (
                <p className="text-gray-700 dark:text-neutral-200">{userData.phone || 'Not provided'}</p>
              )}

              <p className="font-semibold text-gray-700 dark:text-neutral-300">Address:</p>
              {isEdit ? (
                <div className="space-y-2.5 w-full sm:max-w-md">
                  <input
                    className={`w-full ${inputClass}`}
                    placeholder="Address Line 1"
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...(prev.address || {}), line1: e.target.value },
                      }))
                    }
                    value={userData.address?.line1 || ''}
                    type="text"
                  />
                  <input
                    className={`w-full ${inputClass}`}
                    placeholder="Address Line 2"
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...(prev.address || {}), line2: e.target.value },
                      }))
                    }
                    value={userData.address?.line2 || ''}
                    type="text"
                  />
                </div>
              ) : (
                <div className="text-gray-600 dark:text-neutral-300">
                  {userData.address?.line1 || userData.address?.line2 ? (
                    <>
                      <p>{userData.address?.line1}</p>
                      <p>{userData.address?.line2}</p>
                    </>
                  ) : (
                    <p className="text-gray-400 dark:text-neutral-500">No address added</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Basic Information */}
          <div className="pt-4 border-t border-gray-200 dark:border-neutral-800">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-primary mb-4">
              Basic Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-y-4 gap-x-4 items-center text-[15px]">
              <p className="font-semibold text-gray-700 dark:text-neutral-300">Gender:</p>
              {isEdit ? (
                <select
                  className={`w-full sm:max-w-[200px] ${inputClass}`}
                  onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
                  value={userData.gender || 'Not Selected'}
                >
                  <option value="Not Selected">Not Selected</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <p className="text-gray-600 dark:text-neutral-300">{userData.gender || 'Not Selected'}</p>
              )}

              <p className="font-semibold text-gray-700 dark:text-neutral-300">Birthday:</p>
              {isEdit ? (
                <input
                  className={`w-full sm:max-w-[200px] ${inputClass}`}
                  type="date"
                  onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
                  value={formattedDobValue}
                />
              ) : (
                <p className="text-gray-600 dark:text-neutral-300">{userData.dob || 'Not Selected'}</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-wrap items-center gap-3">
            {isEdit ? (
              <>
                <button
                  type="button"
                  disabled={isSaving}
                  className="bg-primary hover:bg-primary/90 text-white font-semibold px-7 py-2.5 rounded-full transition-all flex items-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  onClick={updateUserProfileData}
                >
                  {isSaving ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    'Save Information'
                  )}
                </button>
                <button
                  type="button"
                  disabled={isSaving}
                  className="border border-gray-300 dark:border-neutral-700 text-gray-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-neutral-800 font-medium px-6 py-2.5 rounded-full transition-all cursor-pointer disabled:opacity-60"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                type="button"
                className="border border-primary text-primary dark:border-neutral-600 dark:bg-[#181818] dark:text-white hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:border-primary dark:hover:text-white font-semibold px-8 py-2.5 rounded-full transition-all cursor-pointer"
                onClick={() => setIsEdit(true)}
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </section>
    )
  )
}

export default MyProfile
