import { toast } from 'react-toastify'

export const DEFAULT_TOAST_DURATION = 1500

const buildId = (type, message, customId) => {
  if (customId) return customId
  const slug = String(message || 'toast').toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 48)
  return `${type}-${slug}`
}

export const getErrorMessage = (error, fallback = 'Something went wrong. Please try again.') => {
  const raw = error?.response?.data?.message || error?.message || fallback
  if (typeof raw === 'string' && raw.includes('E11000')) {
    return 'This email address is already registered.'
  }
  return raw
}

export const notify = {
  success: (message, toastId) =>
    toast.success(message, {
      toastId: buildId('success', message, toastId),
      autoClose: DEFAULT_TOAST_DURATION,
    }),
  error: (message, toastId) =>
    toast.error(message, {
      toastId: buildId('error', message, toastId),
      autoClose: DEFAULT_TOAST_DURATION,
    }),
  info: (message, toastId) =>
    toast.info(message, {
      toastId: buildId('info', message, toastId),
      autoClose: DEFAULT_TOAST_DURATION,
    }),
  warn: (message, toastId) =>
    toast.warn(message, {
      toastId: buildId('warn', message, toastId),
      autoClose: DEFAULT_TOAST_DURATION,
    }),
}

