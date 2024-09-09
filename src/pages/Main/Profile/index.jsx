import React, { useState } from 'react'
import { BiCalendar, BiCopy, BiEdit, BiPhoneIncoming, BiSolidUserDetail, BiTrash, BiTrashAlt, BiUser } from "react-icons/bi";
import { CgClose } from 'react-icons/cg';
import { CiLocationOn, CiUser } from 'react-icons/ci';
import { MdOutlineLockPerson, MdOutlineMarkEmailUnread, MdTitle } from 'react-icons/md';
import { PiTestTube, PiTestTubeFill, PiUserCircleDuotone } from "react-icons/pi";
import Select from '../../../components/Inputs/Select';
import { BsCaretRight, BsFillTrashFill } from 'react-icons/bs';
import Button from '../../../components/Button'
import success from '../../../assets/images/success.svg';
import { IoIosArrowForward } from "react-icons/io";
import Input from '../../../components/Inputs';
import { RiBankCardLine } from 'react-icons/ri';
import { GrSettingsOption } from 'react-icons/gr';
import avatar from '../../../assets/images/avatar.svg'
import { FaLocationPin } from 'react-icons/fa6';
import { RiBankCard2Line } from "react-icons/ri";
import { MdOutlineAccountTree } from "react-icons/md";
import deleteIcon from '../../../assets/images/delete.svg';
import { FaEdit, FaEllipsisH, FaEyeSlash } from 'react-icons/fa';
import { LuTestTube2 } from 'react-icons/lu';
import stacey from '../../../assets/images/stacey.svg';
import inviteImg from '../../../assets/images/reactivate.svg';
import { useMutation, useQuery } from 'react-query';
import Auth from '../../../services/Auth';
import PageLoading from '../../../Loader/PageLoading';
import { useFormik } from 'formik';
import { errorToast, successToast } from '../../../utils/Helper';
import LoadingModal from '../../../Loader/LoadingModal';
import * as Yup from 'yup';

const Profile = ({  }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [successful, setSuccessful] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);
  const [invite, setInvite] = useState(false);

  const [newCategory, setNewCategory] = useState(false);
  const [editCategory, setEditCategory] = useState(false);
  const [activeItem, setActiveItem] = useState(-1);
  const [changeRole, setChangeRole] = useState(false);

  const toggleSuccessful = () => setSuccessful(!successful);
  const toggleDeleteAccount = () => setDeleteAccount(!deleteAccount);

  const toggleNewCategory = () => setNewCategory(!newCategory);
  const toggleEditCategory = () => setEditCategory(!editCategory);
  const toggleChangeRole = () => setChangeRole(!changeRole);
  const toggleInvite = () => setInvite(!invite);

  const tabs = [
    {
      title:'General',
      icon:<BiSolidUserDetail size={20} />,
      onClick:null,
    },
    {
      title:'Payout Settings',
      icon:<RiBankCardLine size={20} />,
      onClick:null,
    },
    {
      title:'Account & Security',
      icon:<GrSettingsOption size={20} />,
      onClick:null,
    },
  ]


  const handleClickEllipses = (e,id) => {
    if(activeItem == id)
      setActiveItem(-1);
    else
      setActiveItem(id);
  }

  const { isLoading:loadingProfile, data:profile, refetch:refetchProfile } = useQuery('profile', Auth.GetProfile)

  const { getFieldProps, handleSubmit } = useFormik({
    enableReinitialize:true,
    initialValues:{
      email: profile?.data?.data?.email,
      phone: profile?.data?.data?.phone,
      gender: profile?.data?.data?.gender,
      name: profile?.data?.data?.name,
    },
    onSubmit:values => {
      console.log(values)
      updateProfile(values);
    }
  })

  const { getFieldProps:passwordGetFieldProps, handleSubmit:handlePasswordSubmit,errors, touched } = useFormik({
    enableReinitialize:true,
    initialValues:{
      old_password: "",
      new_password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object().shape({
      new_password: Yup.string().required().min(8),
      old_password: Yup.string().required(),
      confirm_password: Yup.string().required('This field is required').oneOf([Yup.ref('new_password')],'Passwords mismatch'),
    }),
    onSubmit:values => {
      updatePassword(values);
    }
  })

  const { getFieldProps:walletGetFieldProps, handleSubmit:handleWalletSubmit } = useFormik({
    enableReinitialize:true,
    initialValues:{
      usdt_wallet_address: profile?.data?.data?.wallet?.usdt_wallet_address,
      solanar_wallet_address: profile?.data?.data?.wallet?.solanar_wallet_address,
      ethereum_wallet_address: profile?.data?.data?.wallet?.ethereum_wallet_address,
      bitcoin_wallet_address: profile?.data?.data?.wallet?.bitcoin_wallet_address,
    },
    onSubmit:values => {
      const id = profile?.data?.data?.wallet?.id;
      console.log({id, payload:values})
      updateWallet({id, payload:values});
    }
  })

  const { mutate:updateProfile, isLoading:updatingProfile } = useMutation(Auth.UpdateProfile, {
    onSuccess:res => {
      successToast(res.data.message);
      refetchProfile();
    },
    onError: e => errorToast(e.message)
  })

  const { mutate:updateWallet, isLoading:updatingWallet } = useMutation(Auth.UpdateWallet, {
    onSuccess:res => {
      successToast(res.data.message);
      refetchProfile();
    },
    onError: e => errorToast(e.message)
  })

  const { mutate:updatePassword, isLoading:updatingPassword } = useMutation(Auth.ChangePassword, {
    onSuccess:res => {
      successToast(res.data.message);
      refetchProfile();
    },
    onError: e => errorToast(e.message)
  })


  const close = () => {
    toggleSuccessful();
  }

  
  if(loadingProfile){
    return <PageLoading />
  }


  return (
     <div className='w-full bg-white rounded-xl grid md:flex' >
      <>
        <div className="overflow-x-auto md:w-[300px] border-r md:h-[calc(100vh-120px)] p-5 pt-7">
        <div className="flex md:grid gap-3 sm:gap-5 min-w-[550px] md:min-w-[unset] md:max-w-[250px]">
          {
            tabs.map((item,idx) => (
              <div onClick={() =>{ setActiveTab(idx)}} key={idx} 
                    className={`hover:font-medium hover:opacity-90 cursor-pointer text-sm flex items-center gap-2 rounded-3xl p-3 px-6 opacity-60 ${idx == activeTab && '!opacity-100 bg-[#f9f9f9] !font-medium'}`} >
                <span>{item.icon}</span>
                <span>{item.title}</span>
              </div>
            ))
          }
        </div>
        </div>
        <div className='h-[calc(100vh-120px)] overflow-y-auto flex-1'>
          { activeTab == 0 ? 
          <form onSubmit={handleSubmit} className=" p-10 pt-7">
            <div className="flex justify-between">
                <div id='patient' className="">
                  <p className='font-semibold mb-1' >Profile Details</p>
                  <p className='text-sm' >Manage your profile.</p>
                </div>
            </div>
            <div className="mt-10 flex gap-5 items-center">
              <img className='w-24' src={avatar} alt="user" />
              <div className="grid gap-1">
                <p className='font-medium' >Profile Picture</p>
                <p className='text-text_color text-sm' >PNG, JPG, GIF max size of 5MB</p>
              </div>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-5 max-w-[600px]">
              <div className="col-span-2">
                  <Input {...getFieldProps('name')} label={'First Name'} placeholder={'John Doe'} icon={<CiUser size={24} />}/>
              </div> 
              <div className=" col-span-2">
                  <Input disabled  {...getFieldProps('email')} label={'Email Address'} placeholder={'support@lifebridge.com'} type={'email'} icon={<MdOutlineMarkEmailUnread size={22} />}/>
              </div>
              <div className=" col-span-2">
                  <Input  {...getFieldProps('phone')} label={'Phone Number'} placeholder={'Phone Number'} icon={<BiPhoneIncoming size={24} />}/>
              </div>
            </div>
            <div className='w-fit mt-10' >
              <Button type={'submit'} className={'px-14'} title={'Update Details'} />
            </div>
          </form>
          : activeTab == 1 ? 
          <form  onSubmit={handleWalletSubmit}  className=" p-10 pt-7">
            <div className="flex justify-between">
                <div id='patient' className="">
                  <p className='font-semibold mb-1' >Payout Settings</p>
                  <p className='text-sm' >Manage your bank information.</p>
                </div>
            </div>
            <div className="mt-5 grid gap-5 max-w-[600px]">
                <div className="">
                    <Input {...walletGetFieldProps('usdt_wallet_address')} label={'USDT Wallet Address'}  placeholder={'0232322951'} icon={<MdOutlineAccountTree size={22} />}/>
                </div>
                <div className="">
                    <Input {...walletGetFieldProps('solanar_wallet_address')} label={'Solanar Wallet Address'}  placeholder={'0232322951'} icon={<MdOutlineAccountTree size={22} />}/>
                </div>
                <div className="">
                    <Input {...walletGetFieldProps('ethereum_wallet_address')} label={'Ethereum Wallet Address'}  placeholder={'0232322951'} icon={<MdOutlineAccountTree size={22} />}/>
                </div>
                <div className="">
                    <Input {...walletGetFieldProps('bitcoin_wallet_address')} label={'Bitcoin Wallet Address'}  placeholder={'0232322951'} icon={<BiUser size={22} />}/>
                </div>
            </div>
            <div className='w-fit mt-10' >
              <Button className={'px-14'} title={'Update'} />
            </div>
          </form>
          : activeTab == 2 ?
          <form onSubmit={handlePasswordSubmit} className=" p-10 pt-7">
            <div className="flex justify-between">
                <div id='patient' className="">
                  <p className='font-semibold mb-1' >Account & Security</p>
                  <p className='text-sm' >Update your old password.</p>
                </div>
            </div>
            <div className="mt-10 grid gap-5 max-w-[600px]">
              <div className="">
                  <Input {...passwordGetFieldProps('old_password')} label={'Old Password'} type={'password'} placeholder={'************'} icon={<MdOutlineLockPerson size={22} />}/>
                  {
                    touched.old_password && errors.old_password && <p className='text-xs text-red-700 mt-1'>{errors.old_password}</p>
                  }
              </div>
              <div className="">
                  <Input {...passwordGetFieldProps('new_password')} label={'New Password'} type={'password'} placeholder={'************'} icon={<MdOutlineLockPerson size={22} />}/>
                  <p className='text-xs text-text_color' >Password must contain at least one lowercase letters, uppercase letters, numbers and special symbols</p>
                  {
                    touched.new_password && errors.new_password && <p className='text-xs text-red-700 mt-1'>{errors.new_password}</p>
                  }
              </div>
              <div className="">
                  <Input {...passwordGetFieldProps('confirm_password')} label={'Confirm New Password'} type={'password'} placeholder={'************'} icon={<MdOutlineLockPerson size={22} />}/>
                  {
                    touched.confirm_password && errors.confirm_password && <p className='text-xs text-red-700 mt-1'>{errors.confirm_password}</p>
                  }
              </div>
            </div>
          <div className='w-fit mt-10' >
            <Button type={'submit'} className={'px-14'} title={'Update Password'} />
          </div>
          </form>
          : null
        }
        </div>
      </>
      {
        deleteAccount ? 
        <div className='bg-black/50 fixed inset-0 grid place-content-center' >
          <div className="bg-white w-[350px] p-5 rounded-2xl flex flex-col justify-center text-center gap-3 text-sm">
            <img className='w-12 m-auto' src={deleteIcon} alt="delete" />
            <p className='text-base font-semibold' >Delete Your Account</p>
            <p className='text-sm' >Are you sure you want to delete your account? This action is irreversible.</p>
            <div className="mt-10 flex items-center gap-5 ">
            <Button onClick={toggleDeleteAccount} className={'!px-5 !bg-white !text-text_color border border-text_color '} title={'Cancel'} />
            <Button onClick={toggleDeleteAccount} className={'!px-5 bg-red-600'} title={'Yes Proceed'} />
            </div>
          </div>
        </div> : null
      }
    
      {
        changeRole ? 
            <div className='bg-black/50 fixed inset-0 grid place-content-center' >
                <div className="bg-white w-[400px] p-5 rounded-2xl flex flex-col justify-center text-center gap-3 text-sm">
                  <p className='font-medium text-base text-center mb-2'>User Permissions</p>
                  <img className='w-12 m-auto' src={stacey} alt="reactivate" />
                  <p className='text-base font-semibold mb-3' >Diana Sipes</p>
                  <div className="text-left">
                    <Select label={'Roles'} options={[{label:'Radiology-Result Unit', value:'1'}]} icon={<RiBankCard2Line size={22} />}/>
                  </div>
                  <div className="mt-10 flex items-center gap-3">
                    <Button onClick={toggleChangeRole} className={'!px-4 !bg-white !text-text_color border border-text_color '} title={'Cancel'} />
                    <Button onClick={toggleChangeRole} className={'!px-4 '} title={'Change Role'} />
                  </div>
                </div>
            </div> : null
      }
      {
          invite ? 
              <div className='bg-black/50 fixed inset-0 grid place-content-center' >
                  <div className="bg-white w-[400px] p-5 rounded-2xl flex flex-col justify-center text-center gap-3 text-sm">
                    <img className='w-12 m-auto' src={inviteImg} alt="reactivate" />
                    <p className='text-base font-semibold mb-3' >Invite New User(s)</p>
                    <div className="text-left">
                      <Select label={'Roles'} options={[{label:'Radiology-Result Unit', value:'1'}]} icon={<RiBankCard2Line size={22} />}/>
                    </div>
                    <div className="mt-10 flex items-center gap-3">
                    <Button onClick={toggleInvite} className={'!px-4 !bg-white !text-text_color border border-text_color '} title={'Cancel'} />
                    <Button onClick={toggleInvite} className={'!px-4 !bg-light_blue'} title={'Send Invite(s)'} />
                    </div>
                  </div>
              </div> : null
        }
        {
          (updatingProfile || updatingWallet || updatingPassword) ? <LoadingModal /> : null
        }
    </div>
  )
}

export default Profile
