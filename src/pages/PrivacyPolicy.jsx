import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const SUPPORT_EMAIL = 'kandatiranjithkumarreddy@gmail.com'

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const sections = [
    {
      title: '1. Information We Collect',
      paragraphs: [
        'When you create an account or update your profile on Prescripto, we collect only the basic personal details you choose to share so we can manage your account and help schedule your doctor visits:',
      ],
      bullets: [
        {
          label: 'Account Details:',
          text: 'Your full name, email address, and account login credentials when you sign up.',
        },
        {
          label: 'Profile & Contact Details:',
          text: 'Your phone number, address, gender, date of birth, and optional profile photo when you complete or edit your profile.',
        },
      ],
      footerNote:
        'Prescripto is an appointment scheduling platform. We do not collect or store medical histories, consultation notes, diagnostic lab reports, or prescriptions.',
    },
    {
      title: '2. Appointment & Consultation Records',
      paragraphs: [
        'When you book an appointment on Prescripto, we maintain a record of your selected doctor, medical specialty, clinic location, appointment date, time slot, consultation fee, booking status, and payment status.',
        'These records allow you to review upcoming visits, cancel bookings if your plans change, and help clinics coordinate their consultation schedules.',
      ],
    },
    {
      title: '3. Payment Processing & Security',
      paragraphs: [
        'Online consultation fee payments are processed through Razorpay, a regulated third-party payment gateway. Prescripto never collects or stores your debit or credit card numbers, CVV codes, UPI PINs, or net-banking credentials.',
        'We receive only limited payment confirmation details necessary to update the payment status of your appointment.',
      ],
    },
    {
      title: '4. How Information Is Shared',
      paragraphs: [
        'Your personal and booking information is shared strictly as needed to coordinate your appointment and deliver our services:',
      ],
      bullets: [
        {
          label: 'Your Chosen Doctor:',
          text: 'Receives relevant patient and booking details (such as your name, profile photo, age, and chosen time slot) to prepare for and manage your visit.',
        },
        {
          label: 'Authorized Support Personnel:',
          text: 'Authorized team members may access booking information strictly on a need-to-know basis to assist with scheduling and customer support.',
        },
        {
          label: 'Trusted Service Providers:',
          text: 'Essential third-party partners that support payment processing and platform operations (see Section 9).',
        },
      ],
      footerNote:
        'We never sell, rent, or trade your personal information to advertisers or marketing companies.',
    },
    {
      title: '5. Sessions, Cookies & Preferences',
      paragraphs: [
        'Prescripto uses essential browser session and preference features to keep you signed in during your visit and to remember display settings such as Light Mode or Dark Mode. We do not use advertising or behavioral tracking cookies.',
        'You can end your active session at any time by selecting Logout in the navigation bar. During online checkout, our payment partner may use strictly necessary cookies or browser features required to complete your payment safely.',
      ],
    },
    {
      title: '6. Data Protection & Retention',
      paragraphs: [
        'We maintain appropriate technical and organizational safeguards designed to protect your personal information against unauthorized access, alteration, misuse, or disclosure.',
        'We retain your profile and booking history while your account remains active so you can view and manage your appointments, unless you request account deletion. Limited booking or payment records may be retained where reasonably necessary for clinic record-keeping, resolving payment disputes, preventing misuse, or complying with applicable laws.',
      ],
    },
    {
      title: '7. Your Rights & Profile Controls',
      paragraphs: [
        'You can view and manage your everyday information directly from your Prescripto account:',
      ],
      bullets: [
        {
          label: 'My Profile:',
          text: 'Review and update your name, phone number, address, gender, date of birth, and profile photo at any time.',
        },
        {
          label: 'My Appointments:',
          text: 'Check upcoming and past consultations, view payment status, or cancel an upcoming booking.',
        },
      ],
    },
    {
      title: '8. Data Deletion & Privacy Requests',
      paragraphs: [
        'You may request deletion of your Prescripto account and personal information at any time by contacting our privacy support team using the email address provided at the bottom of this page.',
        'To protect your account from unauthorized requests, we take reasonable steps to verify your identity before acting on deletion or account-change requests. Once verified, your active profile and personal account details will be removed from regular platform use, except for limited booking or transaction records that must be retained for legitimate operational, dispute-resolution, or legal reasons.',
      ],
    },
    {
      title: '9. Third-Party Services',
      paragraphs: [
        'To operate Prescripto reliably, we work with reputable third-party providers for online payment processing (such as Razorpay), cloud hosting and media storage, and customer support communication.',
        'These providers receive only the minimum information required to perform their services on our behalf and handle data in accordance with their respective security and privacy obligations.',
      ],
    },
    {
      title: '10. Privacy Rights & Consent',
      paragraphs: [
        'By creating an account, updating your profile, or booking an appointment on Prescripto, you consent to the collection and use of your personal information for providing those services as described in this policy. If you book an appointment on behalf of a child or family member, you confirm that you have lawful authority to share their scheduling details.',
        'In line with applicable Indian data protection principles—including India’s Digital Personal Data Protection Act, 2023 and related rules—you have the right to:',
      ],
      bullets: [
        {
          label: 'Access Your Information:',
          text: 'View the personal details and appointment records associated with your account, or request a summary from us.',
        },
        {
          label: 'Correct Your Details:',
          text: 'Update inaccurate or incomplete personal information through My Profile or by contacting support.',
        },
        {
          label: 'Withdraw Consent or Request Deletion:',
          text: 'Ask us to stop processing your personal information for future bookings or request deletion of your account. Once deleted, account-based booking features will no longer be available under that account.',
        },
        {
          label: 'Raise Privacy Concerns or Grievances:',
          text: 'Reach out to our privacy and grievance contact below with any questions, requests, or complaints.',
        },
      ],
    },
  ]

  return (
    <section className="py-8 sm:py-12 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-neutral-800 p-6 sm:p-10 mb-8 sm:mb-10">
        <span className="inline-block text-xs sm:text-sm font-semibold uppercase tracking-wider text-primary bg-primary/10 dark:bg-neutral-900 dark:border dark:border-neutral-800 px-3.5 py-1 rounded-full mb-3">
          Legal &amp; Patient Trust
        </span>
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="mt-3 text-base text-gray-600 dark:text-neutral-300 leading-7">
          At <strong className="font-semibold text-gray-900 dark:text-white">Prescripto</strong>, we respect your privacy and value the trust you place in us when booking doctor appointments online. This policy explains in clear, simple terms what personal information we collect, how we use and safeguard it, and the privacy rights available to you in India.
        </p>
        <p className="mt-3 text-sm text-gray-500 dark:text-neutral-400">
          Last Updated: 2026 &bull; Applies to Prescripto in India
        </p>
      </div>

      {/* Policy Sections */}
      <div className="space-y-5">
        {sections.map((section) => (
          <article
            key={section.title}
            className="rounded-xl bg-white dark:bg-[#111111] border border-gray-200 dark:border-neutral-800 p-6 sm:p-7 shadow-sm"
          >
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2.5">
              {section.title}
            </h2>

            <div className="space-y-3 text-base text-gray-600 dark:text-neutral-300 leading-7">
              {section.paragraphs?.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}

              {section.bullets && (
                <ul className="list-disc pl-5 space-y-2 pt-0.5">
                  {section.bullets.map((bullet) => (
                    <li key={bullet.label}>
                      <strong className="font-semibold text-gray-800 dark:text-neutral-100">
                        {bullet.label}
                      </strong>{' '}
                      {bullet.text}
                    </li>
                  ))}
                </ul>
              )}

              {section.footerNote && <p className="pt-0.5">{section.footerNote}</p>}
            </div>
          </article>
        ))}
      </div>

      {/* Privacy Requests & Grievance Support Box */}
      <div className="mt-10 rounded-2xl bg-primary/5 dark:bg-[#141414] border border-primary/20 dark:border-neutral-800 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Privacy Requests, Account Deletion &amp; Grievance Contact
          </h3>
          <p className="mt-1.5 text-base text-gray-600 dark:text-neutral-300 leading-7">
            For privacy questions, data correction or account deletion requests, or concerns about your personal information, contact us at{' '}
            <a
              href={`mailto:${SUPPORT_EMAIL}?subject=Privacy%20Request%20-%20Prescripto`}
              className="text-primary font-medium hover:underline break-all"
            >
              {SUPPORT_EMAIL}
            </a>
            .
          </p>
        </div>
        <Link
          to="/contact"
          className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-white font-medium text-base px-6 py-3 rounded-full transition-all shrink-0"
        >
          Contact Support
        </Link>
      </div>
    </section>
  )
}

export default PrivacyPolicy
