import React from 'react'
import logo from '/favicon.png';
import mainImg from '../assets/images/auth-image.svg';

import seamless from '../assets/images/seamless-payout.png';
import guarantee from '../assets/images/guarantee.png';
import efficiency from '../assets/images/effective-management.png';
import { BsArrowUpRight } from 'react-icons/bs';

const AuthLayout = ({ children }) => {
  return (
    <div className='relative h-screen w-screen auth-container bg-opacity-50 flex flex-col p-5 sm:p-10 py-6'>
    <div className="absolute inset-0 bg-black/70"></div>
    <div className="relative">
        <div className="text-white text-3xl flex items-center gap-2 font-semibold justify-center sm:justify-end">
            <img className='w-10' src={logo} alt="logo" />
            <span>Crypto Pay</span>
        </div>
        <div className="flex-1">
            {children}
        </div>
        <div className="flex justify-end gap-10 text-sm">
            <button className="underline underline-offset-2 flex items-center gap-2 text-white">
                <span>Main Website</span>
                <span><BsArrowUpRight /></span>
            </button>
        </div>

    </div>
    </div>
  )
}

export default AuthLayout
