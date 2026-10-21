import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>CONTACT <span className='text-gray-700 font-semibold'>US</span></p>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="" />

        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-lg text-gray-600'>Our OFFICE</p>
          <p className='text-gray-500'>Andhra Pradesh, India</p>
          <p className='text-gray-500'>
            Tel: <a href="tel:+917569377080" className='hover:text-primary'>+91-7569377080</a> <br /> 
            Email: <a href="mailto:kandatiranjithkumarreddy@gmail.com" className='hover:text-primary'>kandatiranjithkumarreddy@gmail.com</a>
          </p>
          <p className='font-semibold text-lg text-gray-600'>Careers at MeetOurDoctor</p>
          <p className='text-gray-500'>Learn more about our teams and job openings.</p>

          <a href="mailto:kandatiranjithkumarreddy@gmail.com?subject=Career%20Inquiry%20-%20MeetOurDoctor" className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 inline-block'>Contact Careers</a>
        </div>
      </div>

    </div>
  )
}

export default Contact