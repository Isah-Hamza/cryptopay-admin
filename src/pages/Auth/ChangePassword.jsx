import React, { useEffect, useState } from 'react'
import AuthLayout from '../../layouts/AuthLayout'
import { CiUser } from "react-icons/ci";
import { MdArrowBack, MdOutlineMarkEmailUnread } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineLockPerson } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import Button from '../../components/Button'; 
import Input from '../../components/Inputs';
import {Link, useNavigate} from 'react-router-dom'
import { IoMdArrowBack } from "react-icons/io";

const ChangePassword = () => {
const navigate = useNavigate();

  return (

    <AuthLayout>
      <div className="p-10 py-6">
          <div className="flex flex-col bg-white rounded-2xl max-w-[400px] min-h-[400px] py-6">
            <button className="flex items-center gap-1 mb-3 pl-7 text-sm" onClick={() => navigate(-1)}>
              <MdArrowBack />
              <span>Back</span>
            </button>
          <div className='px-7 border-red-600 border-l-8 py-3' >
              <h4 className='font-semibold text-xl' >Change Password</h4>
              <p className='text-sm text-text_color'>Enter your new password below to update your credentials.</p>
          </div>
          <div className="px-7 flex flex-col flex-1 ">
          <div className="mt-5">
               <Input label={'Create Password'} type={'password'} placeholder={'************'} icon={<MdOutlineLockPerson size={22} />}/>
               <p className='text-xs text-text_color' >Password must contain at least one lowercase letters, uppercase letters, numbers and special symbols</p>
           </div>
             <div className="my-5 mb-10">
                 <Input label={'Confirm Password'} type={'password'} placeholder={'************'} icon={<MdOutlineLockPerson size={22} />}/>
             </div>

              <Button className={'opacity-90 mt-auto'} onClick={() => navigate('/')} title='Update Password' />

          </div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default ChangePassword
