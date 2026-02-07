import React from 'react'
import { MdCastForEducation } from "react-icons/md";
import { SiOpenaccess } from "react-icons/si";
import { FaCommentDollar } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";

const LOGOS = [
  { Icon: MdCastForEducation, text: '20k+ Online Courses' },
  { Icon: SiOpenaccess, text: 'LifeTime Access' },
  { Icon: FaCommentDollar, text: 'Value For Money' },
  { Icon: BiSupport, text: 'Lifetime Support' },
  { Icon: FaUsers, text: 'Community Support' },
]

function Logos() {
  return (
    <div className="w-full px-4 mt-12 lg:mt-16">
      <div className='max-w-[1200px] mx-auto w-full flex items-center justify-center flex-wrap gap-3 lg:gap-4 mb-6'>
        {LOGOS.map(({ Icon, text }, i) => (
          <div
            key={i}
            role="group"
            aria-label={text}
            className="flex items-center justify-center gap-2 px-3 py-2 lg:px-5 lg:py-3 rounded-3xl bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white shadow-md border border-gray-700"
          >
            <Icon className='w-[24px] h-[24px] lg:w-[35px] lg:h-[35px] text-white' aria-hidden="true" />
            <span className="font-semibold text-sm lg:text-base">{text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Logos