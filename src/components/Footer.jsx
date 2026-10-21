import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        {/* ---------- Left Section ---------- */}
        <div>
          <img className='mb-5 w-40' src={assets.logo} alt="" />
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>MeetOurDoctor is a full-stack doctor appointment booking platform that makes it easy for patients to find trusted doctors, book appointments, and manage their healthcare.</p>
        </div>

        {/* ---------- Center Section ---------- */}
        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li><Link to='/' onClick={() => window.scrollTo(0, 0)} className='hover:text-primary transition-colors'>Home</Link></li>
            <li><Link to='/about' onClick={() => window.scrollTo(0, 0)} className='hover:text-primary transition-colors'>About us</Link></li>
            <li><Link to='/contact' onClick={() => window.scrollTo(0, 0)} className='hover:text-primary transition-colors'>Contact us</Link></li>
            <li><Link to='/about' onClick={() => window.scrollTo(0, 0)} className='hover:text-primary transition-colors'>Privacy policy</Link></li>
          </ul>
        </div>

        {/* ---------- Right Section ---------- */}
        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li><a href="tel:+917569377080" className='hover:text-primary transition-colors'>+91-7569377080</a></li>
            <li><a href="mailto:kandatiranjithkumarreddy@gmail.com" className='hover:text-primary transition-colors'>kandatiranjithkumarreddy@gmail.com</a></li>
          </ul>
        </div>

      </div>

      {/* ---------- Copyright Text ---------- */}
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>@2026 Kandati Ranjith Kumar Reddy. All rights reserved.</p>
      </div>

    </div>
  )
}

export default Footer