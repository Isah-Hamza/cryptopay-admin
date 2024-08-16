import React, { useEffect, useState } from 'react'
import { IoLogOut } from 'react-icons/io5';
import { Outlet, useNavigate } from 'react-router-dom'
import logo from '/favicon.png';
import { AiOutlineHome } from "react-icons/ai";
import avatar from '../assets/images/avatar.svg';
import admin from '../assets/images/admin.png';
import { BiCalendarEvent, BiCaretDown, BiLogOut, BiUser } from 'react-icons/bi';
import { LuSettings2, LuSheet, LuTestTube } from 'react-icons/lu';
import { BsBellFill, BsCurrencyDollar } from 'react-icons/bs';
import { PiPlusBold } from 'react-icons/pi';
import { FcStatistics } from 'react-icons/fc';


import bank from '../assets/images/Bank.svg';
import test from '../assets/images/Test.svg';
import earn from '../assets/images/Earn.svg';
import { CgClose } from 'react-icons/cg';

const MainLayout = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(0);
    const [showActivities, setShowActivities] = useState(false);
    const [headerInfo, setHeaderInfo] = useState({
        header:'Dashboard Overview',
        sub:'Manage and analyze your patient statistics.',
    })

    
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
            title:'Referrers',
            link:'referrers',
            icon:PiPlusBold,
            info:{
                header:'Referrer Management',
                sub:'View and manage a list of all registered doctors/referrers.',
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


        
  useEffect(() => {

    const active_item = window.location.pathname.split("/")[1];
    
    if(active_item == 'dashboard') setActiveTab(0);
    if(active_item == 'referrals') setActiveTab(1);
    if(active_item == 'referrers') setActiveTab(2);
    if(active_item == 'settings') setActiveTab(3);

    // setActiveLink(active_item);
    
      
},[window.location.pathname])

  return (
    <div className='flex w-full bg-[#f8f8f8]'>
      <div className="w-72 bg-white p-5 h-screen overflow-y-auto flex flex-col">
        <div className="font-semibold  flex items-center gap-2 ">
            <img className='w-10' src={logo} alt="logo" />
            <p>Crypto Pay</p>
        </div>
        <button className="mt-10 w-full text-left bg-[#C9E6FF] p-2 rounded flex items-center gap-3">
            <img src={admin} alt="admin" />
            <div className='text-sm'>
                <p className='font-semibold' >Emmanuella Hamza</p>
                <p>Admin</p>
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
                    }} key={idx} className={`flex gap-3 px-5  py-3 items-center text-sm
                    ${activeTab == idx && 'text-white bg-primary rounded-md'}`} >
                        <item.icon />
                        <p>{item.title}</p>
                    </button>
                ))
            }
        </div>
        <button className='mt-auto font-semibold text-red-800 flex items-center gap-2 pl-7'>
            <BiLogOut/>
            <p>Logout</p>
        </button>
      </div>
      <main className='p-7 flex-1 h-screen overflow-y-auto' >
        <div className="w-full header flex items-center justify-between gap-10 py-3 ">
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
