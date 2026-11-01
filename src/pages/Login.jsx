import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
import BrandLogo from '../components/BrandLogo'
import { notify, getErrorMessage } from '../utils/toast'

const hasGoogleClient = Boolean(import.meta.env.VITE_GOOGLE_CLIENT_ID)

const Login = () => {
  const { backendUrl, token, setToken, theme } = useContext(AppContext)
  const navigate = useNavigate()
  const [state, setState] = useState('Sign Up')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    if (isSubmitting || isGoogleLoading) return
    setIsSubmitting(true)

    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', {
          name: name.trim(),
          password,
          email: email.trim(),
        })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          notify.success('Account created successfully! Welcome to Prescripto.', 'register-success')
        } else {
          notify.error(data.message || 'Registration failed. Please check your details.', 'auth-error')
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', {
          email: email.trim(),
          password,
        })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          notify.success('Login successful! Welcome to Prescripto.', 'login-success')
        } else {
          notify.error(data.message || 'Invalid email or password.', 'auth-error')
        }
      }
    } catch (error) {
      notify.error(getErrorMessage(error, 'Authentication failed. Please try again.'), 'auth-error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGoogleSuccess = async (credentialResponse) => {
    if (!credentialResponse?.credential || isGoogleLoading || isSubmitting) return
    setIsGoogleLoading(true)

    try {
      const { data } = await axios.post(backendUrl + '/api/user/google-login', {
        credential: credentialResponse.credential,
      })

      if (data.success && data.token) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
        notify.success(
          data.isNewUser
            ? 'Account created successfully! Welcome to Prescripto.'
            : 'Login successful! Welcome to Prescripto.',
          'google-login-success'
        )
      } else {
        notify.error(data.message || 'Google sign-in failed. Please try again.', 'google-auth-error')
      }
    } catch (error) {
      notify.error(
        getErrorMessage(error, 'Google authentication failed. Please try again.'),
        'google-auth-error'
      )
    } finally {
      setIsGoogleLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token, navigate])

  const inputClass =
    'border border-gray-300 dark:border-neutral-700 bg-white dark:bg-[#181818] text-gray-900 dark:text-neutral-100 placeholder:text-gray-400 dark:placeholder:text-neutral-500 text-base rounded-lg w-full px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors'

  const isBusy = isSubmitting || isGoogleLoading

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[78vh] flex items-center justify-center py-8 px-2 sm:px-4">
      <div className="flex flex-col gap-4 w-full max-w-md p-6 sm:p-8 border border-gray-200 dark:border-neutral-800 rounded-2xl bg-white dark:bg-[#111111] text-gray-700 dark:text-neutral-200 shadow-lg transition-colors duration-200">
        <div className="flex flex-col items-start gap-2 mb-1 w-full">
          <BrandLogo className="w-36 h-auto mb-1" />
          <h1 className="text-2xl sm:text-[26px] font-bold text-gray-900 dark:text-white tracking-tight">
            {state === 'Sign Up' ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-base text-gray-600 dark:text-neutral-400">
            Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book an appointment on Prescripto.
          </p>
        </div>

        {state === 'Sign Up' && (
          <div className="w-full">
            <label htmlFor="auth-name" className="block text-[15px] font-medium text-gray-700 dark:text-neutral-300 mb-1.5">
              Full Name
            </label>
            <input
              id="auth-name"
              className={inputClass}
              type="text"
              placeholder="Enter your full name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              disabled={isBusy}
              required
            />
          </div>
        )}

        <div className="w-full">
          <label htmlFor="auth-email" className="block text-[15px] font-medium text-gray-700 dark:text-neutral-300 mb-1.5">
            Email Address
          </label>
          <input
            id="auth-email"
            className={inputClass}
            type="email"
            placeholder="you@example.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            disabled={isBusy}
            required
          />
        </div>

        <div className="w-full">
          <label htmlFor="auth-password" className="block text-[15px] font-medium text-gray-700 dark:text-neutral-300 mb-1.5">
            Password
          </label>
          <input
            id="auth-password"
            className={inputClass}
            type="password"
            placeholder={state === 'Sign Up' ? 'Minimum 8 characters' : 'Enter your password'}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            disabled={isBusy}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isBusy}
          className="bg-primary hover:bg-primary/90 text-white w-full py-3 rounded-lg text-base font-semibold flex items-center justify-center gap-2 transition-all mt-1 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
        >
          {isSubmitting ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>{state === 'Sign Up' ? 'Creating Account...' : 'Logging in...'}</span>
            </>
          ) : state === 'Sign Up' ? (
            'Create Account'
          ) : (
            'Login'
          )}
        </button>

        {/* Patient-Only Google Sign-In */}
        {hasGoogleClient && (
          <>
            <div className="flex items-center gap-3 my-0.5">
              <div className="h-px flex-1 bg-gray-200 dark:bg-neutral-800" />
              <span className="text-xs font-medium uppercase tracking-wider text-gray-400 dark:text-neutral-500">
                or
              </span>
              <div className="h-px flex-1 bg-gray-200 dark:bg-neutral-800" />
            </div>

            <div className="w-full flex flex-col items-center justify-center min-h-[44px]">
              {isGoogleLoading ? (
                <div className="w-full py-2.5 rounded-lg border border-gray-300 dark:border-neutral-700 bg-gray-50 dark:bg-[#181818] text-sm font-medium text-gray-700 dark:text-neutral-200 flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <span>Signing in with Google...</span>
                </div>
              ) : (
                <div className="w-full flex justify-center overflow-hidden">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() =>
                      notify.error(
                        'Google sign-in could not be completed. Please try again.',
                        'google-auth-error'
                      )
                    }
                    text={state === 'Sign Up' ? 'signup_with' : 'signin_with'}
                    shape="rectangular"
                    size="large"
                    theme={theme === 'dark' ? 'filled_black' : 'outline'}
                    width="350"
                  />
                </div>
              )}
            </div>
          </>
        )}

        <p className="text-[15px] text-gray-600 dark:text-neutral-400 pt-1">
          {state === 'Sign Up' ? (
            <>
              Already have an account?{' '}
              <button
                type="button"
                disabled={isBusy}
                onClick={() => setState('Login')}
                className="text-primary font-semibold underline hover:text-primary/80 cursor-pointer"
              >
                Login here
              </button>
            </>
          ) : (
            <>
              New to Prescripto?{' '}
              <button
                type="button"
                disabled={isBusy}
                onClick={() => setState('Sign Up')}
                className="text-primary font-semibold underline hover:text-primary/80 cursor-pointer"
              >
                Create an account
              </button>
            </>
          )}
        </p>
      </div>
    </form>
  )
}

export default Login
