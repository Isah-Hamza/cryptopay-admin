import React, { useEffect, useState } from 'react'
import { IoLogOut } from 'react-icons/io5';
import { Outlet, useNavigate } from 'react-router-dom'
import logo from '../assets/images/logo.svg';
import { AiOutlineHome } from "react-icons/ai";
import avatar from '../assets/images/avatar.svg';
import admin from '../assets/images/admin.png';
import { BiCalendarEvent, BiCaretDown, BiUser } from 'react-icons/bi';
import { LuSettings2, LuSheet, LuTestTube } from 'react-icons/lu';
import { BsBellFill, BsCurrencyDollar } from 'react-icons/bs';
import { PiPlusBold } from 'react-icons/pi';
import { FcStatistics } from 'react-icons/fc';

const MainLayout = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(0);
    const [showActivities, setShowActivities] = useState(false);
    const [headerInfo, setHeaderInfo] = useState({
        header:'Dashboard Overview',
        sub:'Manage and analyze your patient statistics.',
    })

    const toggleActivities = () =>  setShowActivities(!showActivities);
    
    const tabs = [
        {
            title:'Dashboard',
            link:'/dashboard',
            icon:AiOutlineHome,
            info: {
                header:'Dashboard Overview',
                sub:'Manage and analyze your patient statistics.',
            }
        },
        {
            title:'Referrals',
            link:'referrals',
            icon:BiUser,
            info:{
                header:'Referrals Management',
                sub:'View a list of all referred patients, including those who have not yet booked an appointment.',
            }
        },
        {
            title:'Appointments',
            link:'appointment',
            icon:BiCalendarEvent
        },
        {
            title:'Results',
            link:'results',
            icon: LuSheet,
        },
        {
            title:'Tests',
            link:'tests',
            icon: LuTestTube,
        },
        {
            title:'Referrers',
            link:'referrers',
            icon:PiPlusBold,
        },
        {
            title:'Rebates',
            link:'rebates',
            icon:BsCurrencyDollar,
        },
        {
            title:'Reports',
            link:'reports',
            icon:FcStatistics,
        },
        {
            title:'Settings',
            link:'settings',
            icon:LuSettings2,
        },
    ]

    
        
  useEffect(() => {

    const active_item = window.location.pathname.split("/")[2];
    
    if(active_item == 'dashboard') setActiveTab(0);
    if(active_item == 'referrals') setActiveTab(1);
    if(active_item == 'payments') setActiveTab(2);
    if(active_item == 'profile') setActiveTab(3);

    // setActiveLink(active_item);
    
      
},[window.location.pathname])

  return (
    <div className='flex w-full bg-[#f8f8f8]'>
      {/* <header className='flex items-center justify-between gap-5 py-5' >
        <img onClick={() => navigate('/')} className='cursor-pointer w-40' src={logo} alt="logo" />
        <div className="flex gap-5 bg-[#ededed] rounded-3xl">
            {
                tabs.map((item,idx) => (
                    <button onClick={() => {
                        navigate(item.link);
                        setActiveTab(idx);
                    }} key={idx} className={`flex items-center gap-2 px-3
                    ${activeTab == idx && 'text-white bg-primary !px-10 py-3 rounded-3xl'}`} >
                        { activeTab == idx ? <item.icon /> : null}
                        <p>{item.title}</p>
                    </button>
            ))
            }
        </div>
        <div className="flex items-center gap-3 ">
            <button onClick={() => navigate('/')} className="w-10 h-10 bg-[#ededed] grid place-content-center rounded-full">
                <IoLogOut size={20} color='red' />
            </button>
            <button>
                <img className='w-10' src={avatar} alt="" />
            </button>
        </div>
      </header> */}
      <div className="w-72 bg-white p-5 h-screen overflow-y-auto">
        <img className='w-36' src={logo} alt="logo" />
        <button className="mt-10 w-full text-left bg-[#C9E6FF] p-2 rounded flex items-center gap-3">
            <img src={admin} alt="admin" />
            <div className='text-sm'>
                <p className='font-semibold' >Emmanuella Igwe</p>
                <p>Admin</p>
            </div>
            <span className='block ml-auto'><BiCaretDown /></span>
        </button>
        <div className="grid gap-1.5 mt-5">
            {
                tabs.map((item,idx) => (
                    <button onClick={() => {
                        // navigate(item.link);
                        setActiveTab(idx);
                    }} key={idx} className={`flex gap-3 px-5  py-3 items-center text-sm
                    ${activeTab == idx && 'text-white bg-primary rounded-md'}`} >
                        <item.icon />
                        <p>{item.title}</p>
                    </button>
                ))
            }
        </div>
      </div>
      <main className='p-7 flex-1 h-screen overflow-y-auto' >
        <div className="w-full header flex items-center justify-between gap-10 py-3 ">
            <div className="">
                <p className='text-base font-semibold' >{headerInfo.header}</p>
                <p className='text-sm' >{headerInfo.sub}</p>
            </div>
            <button className="text-sm flex items-center gap-2 px-4 p-2 rounded-3xl bg-custom_gray">
                <BsBellFill />
                <span>Activities</span>
            </button>
        </div>
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
