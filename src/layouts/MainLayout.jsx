import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import logo from '/favicon.png';
import { AiOutlineHome } from "react-icons/ai";
import avatar from '../assets/images/avatar.svg';
import admin from '../assets/images/admin.png';
import { BiCalendarEvent, BiCaretDown, BiLogOut, BiMenu, BiUser } from 'react-icons/bi';
import { LuSettings2, LuSheet, LuTestTube } from 'react-icons/lu';

import { CgClose } from 'react-icons/cg';
import { FaMoneyBillTransfer } from 'react-icons/fa6';
import { useQuery } from 'react-query';
import Auth from '../services/Auth';
import { FaHamburger } from 'react-icons/fa';

const MainLayout = () => {
    const navigate = useNavigate();
    const [showSidebar, setShowSidebar] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [headerInfo, setHeaderInfo] = useState({
        header:'Dashboard Overview',
        sub:'Manage and analyze your patient statistics.',
    })

    const toggleShowSidebar = () => setShowSidebar(!showSidebar);

    
    const tabs = [
        {
            title:'Dashboard',
            link:'/dashboard',
            icon:AiOutlineHome,
            info: {
                header:'Dashboard Overview',
                sub:'Manage and analyze your users statistics.',
            }
        },
        {
            title:'Users',
            link:'users',
            icon:BiUser,
            info:{
                header:'User Management',
                sub:'View and manage a list of all registered users.',
            }
        },
        {
            title:'Transactions',
            link:'transactions',
            icon:FaMoneyBillTransfer,
            info:{
                header:'Transaction Management',
                sub:'View a list of all pending, completed and rejected transactions.',
            }
        },
        {
            title:'Settings',
            link:'settings',
            icon:LuSettings2,
            info:{
                header:'Settings',
                sub:'Customize and manage your account and platform preferences.',
            }
        },
    ]

    const logout = () => {
        localStorage.removeItem('cryptopay-token')
        localStorage.removeItem('cryptopay-user')
        navigate('login');
    }

  const { isLoading:loadingProfile, data:profile } = useQuery('profile', Auth.GetProfile)


        
  useEffect(() => {

    const active_item = window.location.pathname.split("/")[1];
    
    if(active_item == 'dashboard') setActiveTab(0);
    if(active_item == 'referrals') setActiveTab(1);
    if(active_item == 'referrers') setActiveTab(2);
    if(active_item == 'settings') setActiveTab(3);

    // setActiveLink(active_item);
    
      
},[window.location.pathname])

useEffect(() => {
  console.log(showSidebar)
}, [showSidebar])


  return (
    <div className='flex w-full bg-[#f8f8f8]'>
      <div className={`w-72 bg-white p-5 h-screen overflow-y-auto hidden lg:flex flex-col`}>
        <div className="font-semibold  flex items-center gap-2 ">
            <img className='w-10' src={logo} alt="logo" />
            <p>Crypto Pay</p>
        </div>
        <button className="mt-10 w-full text-left bg-[#C9E6FF] p-2 rounded flex items-center gap-3">
            {/* <img className='bg-gray-50' src={admin} alt="admin" /> */}
            <div className='bg-[#f0ecec] w-10 h-10 rounded-lg' ></div>
            <div className='text-sm'>
                <p className='font-semibold' >{profile?.data?.data?.name}</p>
                <p className='first-letter:capitalize' >{profile?.data?.data?.role}</p>
            </div>
            <span className='block ml-auto'><BiCaretDown /></span>
        </button>
        <div className="grid gap-1.5 mt-5">
            {
                tabs.map((item,idx) => (
                    <button onClick={() => {
                        navigate(item.link);
                        setActiveTab(idx);
                        setHeaderInfo(item.info);
                        setShowSidebar(false);
                    }} key={idx} className={`flex gap-3 px-5  py-3 items-center text-sm
                    ${activeTab == idx && 'text-white bg-primary rounded-md'}`} >
                        <item.icon />
                        <p>{item.title}</p>
                    </button>
                ))
            }
        </div>
        <button onClick={logout} className='mt-auto font-semibold text-red-800 flex items-center gap-2 pl-7'>
            <BiLogOut/>
            <p>Logout</p>
        </button>
      </div>
     {showSidebar ? <div className="h-screen w-screen inset-0 fixed bg-black/20 z-10">
        <div className={`w-72 bg-white p-5 h-screen overflow-y-auto flex flex-col`}>
            <div className="flex items-center justify-between">
                <div className="font-semibold  flex items-center gap-2 ">
                    <img className='w-10' src={logo} alt="logo" />
                    <p>Crypto Pay</p>
                </div>
                <CgClose className='cursor-pointer' onClick={toggleShowSidebar} />
            </div>
            <button className="mt-10 w-full text-left bg-[#C9E6FF] p-2 rounded flex items-center gap-3">
                {/* <img className='bg-gray-50' src={admin} alt="admin" /> */}
                <div className='bg-[#f0ecec] w-10 h-10 rounded-lg' ></div>
                <div className='text-sm'>
                    <p className='font-semibold' >{profile?.data?.data?.name}</p>
                    <p className='first-letter:capitalize' >{profile?.data?.data?.role}</p>
                </div>
                <span className='block ml-auto'><BiCaretDown /></span>
            </button>
            <div className="grid gap-1.5 mt-5">
                {
                    tabs.map((item,idx) => (
                        <button onClick={() => {
                            navigate(item.link);
                            setActiveTab(idx);
                            setHeaderInfo(item.info)
                            setShowSidebar(false);
                        }} key={idx} className={`flex gap-3 px-5  py-3 items-center text-sm
                        ${activeTab == idx && 'text-white bg-primary rounded-md'}`} >
                            <item.icon />
                            <p>{item.title}</p>
                        </button>
                    ))
                }
            </div>
            <button onClick={logout} className='mt-auto font-semibold text-red-800 flex items-center gap-2 pl-7'>
                <BiLogOut/>
                <p>Logout</p>
            </button>
        </div>
      </div> : null}
      <main className='p-4 sm:p-7 flex-1 h-screen overflow-y-auto' >
        <div className="w-full header flex items-center gap-2 py-3 ">
            <BiMenu  className='cursor-pointer block lg:hidden' onClick={toggleShowSidebar} />
            <div className="">
                <p className='text-base font-semibold' >{headerInfo.header}</p>
                <p className='text-sm' >{headerInfo.sub}</p>
            </div>
           
        </div>
        <Outlet />

      </main>
    </div>
  )
}

export default MainLayout
