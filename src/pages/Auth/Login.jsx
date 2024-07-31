import React, { useEffect, useState } from 'react'
import AuthLayout from '../../layouts/AuthLayout'
import { CiUser } from "react-icons/ci";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineLockPerson } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import Button from '../../components/Button'; 
import Input from '../../components/Inputs';
import {Link, useNavigate} from 'react-router-dom'

const Login = () => {

const navigate = useNavigate();
  return (
    <AuthLayout>
      <div className="p-10 py-6">
        <div className="bg-white rounded-2xl max-w-[400px] py-6">
              <div className='px-7 border-red-600 border-l-8' >
                  <h4 className='font-semibold text-xl' >Welcome back, Admin</h4>
                  <p className='text-sm text-text_color'>Manage referrers, earnings, bookings, and patient referrals efficiently today.</p>
              </div>
              <div className="px-7">
                <div className="mt-10">
                    <Input label={'Email Address'} placeholder={'support@lifebridge.com'} type={'email'} icon={<MdOutlineMarkEmailUnread size={22} />}/>
                </div>
                <div className="mt-5">
                    <Input label={'Create Password'} type={'password'} placeholder={'************'} icon={<MdOutlineLockPerson size={22} />}/>
                    <Link to={'/forgot-password'} className='text-sm text-primary font-semibold' >forgot password</Link>
                </div>
                  <Button className={'opacity-90 mt-10'} onClick={() => navigate('/dashboard')} title='Log In' />

              </div>

        </div>
      </div>
    </AuthLayout>
  )
}

export default Login
