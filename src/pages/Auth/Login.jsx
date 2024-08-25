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
import { useFormik } from 'formik';
import { useMutation } from 'react-query';
import Auth from '../../services/Auth';
import { toast } from 'react-toastify';
import { errorToast, successToast } from '../../utils/Helper';
import LoadingModal from '../../Loader/LoadingModal';
import { axiosClient } from '../../api/axiosClient';

const Login = () => {

const navigate = useNavigate();
const { isLoading, mutate} = useMutation(Auth.Login, {
  onSuccess:res => {
    if(res.data.user.role !== 'admin'){
      errorToast('Not authorised');
      return;
    }
    axiosClient().defaults.headers["Authorization"] = "Bearer " + res.data.token;
    window.localStorage.setItem('cryptopay-token',res.data.token);
    window.localStorage.setItem('cryptopay-user', JSON.stringify(res.data.user));
    successToast(res.data.message);
    navigate('/dashboard');
  },
  onError:e => {
    errorToast(e.error);
  }
})

const {handleSubmit, getFieldProps } = useFormik({
  initialValues:{
    email:'',
    password:'',
  },
  onSubmit:values => {
    mutate(values);
    console.log(values);
  },
})

  return (
    <AuthLayout>
      <div className="p-10 py-6">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl max-w-[400px] py-6">
              <div className='px-7 border-red-600 border-l-8' >
                  <h4 className='font-semibold text-xl' >Welcome back, Admin</h4>
                  <p className='text-sm text-text_color'>Provide your login credentials to manage users, funds and profits.</p>
              </div>
              <div className="px-7">
                <div className="mt-10">
                    <Input {...getFieldProps('email')} label={'Email Address'} placeholder={'example@gmail.com'} type={'email'} icon={<MdOutlineMarkEmailUnread size={22} />}/>
                </div>
                <div className="mt-5">
                    <Input { ...getFieldProps('password')} label={'Enter Password'} type={'password'} placeholder={'************'} icon={<MdOutlineLockPerson size={22} />}/>
                    {/* <Link to={'/forgot-password'} className='text-sm text-primary font-semibold' >forgot password</Link> */}
                </div>
                  <Button type="submit" className={'opacity-90 mt-10'} title='Log In' />

              </div>

        </form>
      </div>
      {
        isLoading ? <LoadingModal /> : null
      }
    </AuthLayout>
  )
}

export default Login
