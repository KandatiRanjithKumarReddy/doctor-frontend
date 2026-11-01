import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <section className="flex flex-col items-center gap-4 py-16 text-gray-800 dark:text-neutral-100" id="speciality">
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
        Find by Speciality
      </h2>
      <p className="max-w-xl text-center text-base text-gray-600 dark:text-neutral-400 leading-relaxed px-2">
        Simply browse through our extensive list of trusted doctors and schedule your consultation hassle-free.
      </p>

      <div className="flex sm:justify-center gap-5 sm:gap-7 pt-6 w-full overflow-x-auto no-scrollbar px-2 pb-2">
        {specialityData.map((item) => (
          <Link
            onClick={() => window.scrollTo(0, 0)}
            className="flex flex-col items-center text-sm sm:text-[15px] font-medium text-gray-700 dark:text-neutral-200 hover:text-primary dark:hover:text-primary cursor-pointer flex-shrink-0 hover:-translate-y-2 transition-all duration-300"
            key={item.speciality}
            to={`/doctors/${item.speciality}`}
          >
            <img className="w-16 sm:w-24 mb-2.5 object-contain" src={item.image} alt={item.speciality} />
            <p className="text-center">{item.speciality}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default SpecialityMenu
