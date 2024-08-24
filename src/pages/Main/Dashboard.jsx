import React, { useState } from 'react'
import logo from '../../assets/images/logo.svg';
import { AiOutlineHome } from "react-icons/ai";
import avatar from '../../assets/images/avatar.svg';
import { IoLogOut } from "react-icons/io5";
import { FaEye } from 'react-icons/fa6';
import { BsArrowRight, BsArrowUpRight, BsArrowUpRightSquare } from 'react-icons/bs';
import { PiEyeClosedBold } from "react-icons/pi";
import note from '../../assets/images/note.svg';
import BarChart from '../../components/Chart/BarChart';
import PieChart from '../../components/Chart/PieChart';
import design from '../../assets/images/dashboard-design.png'
import Button from '../../components/Button'

import stat1 from '../../assets/images/stat1.svg';
import stat2 from '../../assets/images/stat2.svg';
import stat3 from '../../assets/images/stat3.svg';

import bank from '../../assets/images/Bank.svg';
import test from '../../assets/images/Test.svg';
import earn from '../../assets/images/Earn.svg';

import refer from '../../assets/images/refer_and_earn.svg';
import { useNavigate } from 'react-router-dom';
import { MdArrowForward } from 'react-icons/md';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


const Dashboard = () => {

    const navigate = useNavigate('');

    const today_booking = [
        {
            name:'Felix Otti',
            amount: '$400',
            time:'10:00am',
        },
        {
            name:'Christine Jones',
            amount: '$2,500',
            time:'02:00pm',
        },
        {
            name:'Felix Otti',
            amount: '$750',
            time:'10:00am',
        },
    ]

  return (
    <>
        <div className="mt-2">
            <div className="grid grid-cols-4 gap-5">
                <div className="bg-white rounded-lg p-5 border">
                    <p>Total Transactions</p>
                    <p className='font-semibold text-xl my-3'>232</p>
                    <div className="flex items-center justify-between gap-5 mt-5">
                        <p className='bg-[#C9E6FF] px-3 text-sm py-0.5 rounded-2xl' >+21</p>
                        <button className="text-primary flex items-center gap-1 font-semibold pl-7 text-sm">
                            <span>View All</span>
                            <MdArrowForward />
                        </button>
                    </div>
                </div>
                <div className="bg-white rounded-lg p-5 border">
                    <p>Total Withdrawal</p>
                    <p className='font-semibold text-xl my-3'>3,109</p>
                    <div className="flex items-center justify-between gap-5 mt-5">
                        <p className='bg-[#C9E6FF] px-3 text-sm py-0.5 rounded-2xl' >+61</p>
                        <button className="text-primary flex items-center gap-1 font-semibold pl-7 text-sm">
                            <span>View All</span>
                            <MdArrowForward />
                        </button>
                    </div>
                </div>
                <div className="bg-white rounded-lg p-5 border">
                    <p>Total Wallet Fund</p>
                    <p className='font-semibold text-xl my-3'>₦3,009,100</p>
                    <div className="flex text-sm items-center gap-1 mt-5">
                        <div className="text-green-500 font-medium flex items-center gap-1">
                            <BsArrowUpRight color='' />
                            <span className='' >20%</span>
                        </div>
                        <span>vs last month</span>
                    </div>
                </div>
                <div className="bg-white rounded-lg p-5 border">
                    <p>Total Profit Made</p>
                    <p className='font-semibold text-xl my-3'>₦1,440,900</p>
                    <div className="flex text-sm items-center gap-1 mt-5">
                        <span>Payment</span>
                        <div className="text-green-500 font-medium flex items-center gap-1">
                            <span className='' >Every Friday</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex gap-5 mt-5">
                <div className="bg-white min-w-[35%] h-full p-5 rounded-lg border">
                    <div className="flex items-center justify-between pb-3 border-b">
                        <p className='font-semibold' >Referrals Stats</p>
                    </div>
                    <div className="mt-3">
                        <p className='text-sm' >Analysis of pending & completed referrals</p>
                        <div className="flex flex-col">
                            <div className=" -ml-10 h-[250px]">
                                <PieChart />
                            </div>
                            <div className="flex justify-center items-center text-center gap-10">
                                <div className="">
                                    <div className="text-sm flex items-center gap-1">
                                        <div className="w-2 h-2 rounded-full bg-[#C9E6FF]"></div>
                                        <span>Completed</span>
                                    </div>
                                    <p className='pl-'>201</p>
                                </div>
                                <div className="">
                                    <div className="text-sm flex items-center gap-1">
                                        <div className="w-2 h-2 rounded-full bg-light_blue"></div>
                                        <span>Pending</span>
                                    </div>
                                    <p className='pl-'>694</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 rounded-lg border border-custom_gray bg-white">
                    <div className="flex items-center justify-between p-3 border-b">
                        <p className='font-semibold' >Rebate Earning</p>
                        <div className="flex items-center bg-custom_gray p-1 px-1.5 rounded-3xl">
                            {
                                ['Monthly','Weekly','Daily'].map((item,idx) => (
                                    <button className={`rounded-3xl text-sm px-4  py-1.5 ${idx ==0 && 'shadow bg-white'}`} >{item}</button>
                                ))
                            }
                        </div>
                    </div>
                    <div className="p-5">
                        <p className='text-sm' >Earning history displayed per month</p>
                        <div className="mt-5 -ml-10 min-w-[400px] h-[250px]">
                            <BarChart />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex gap-5 mt-5">
                <div className="flex-1 bg-white rounded-xl border pb-3">
                    <div className="flex items-center justify-between p-3 border-b">
                        <p className='font-semibold' >Calendar</p>
                    </div>
                    <div className="mt-3 flex gap-3 px-5">
                        <Calendar className={'w-6/12'}  />
                        <div className="w-6/12">
                            <p className='text-sm font-semibold mt-1' >Transactions of the day</p>
                            <div className="grid gap-3 mt-5">
                                {
                                    today_booking.map((item,idx) => (
                                        <div className='text-sm p-3 px-2 rounded-md border' key={idx}>
                                            <p className='font-semibold'>{item.name}</p>
                                            <p className='text-xs line-clamp-1' >Funded Wallet &bull; {item.amount} &bull; {item.time} </p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
               
            </div>
        </div>
        {/* <div className="w-4/6 max-h-[calc(100vh-115px)] overflow-y-auto">
            <div className="top flex gap-3">
                <div className="w-2/5 flex flex-col gap-3">
                    {
                        analysis.map((item, idx) =>(
                            <div key={idx} className='border border-custom_gray rounded-lg bg-white p-3' >
                                <img className='ml-auto'  src={note} alt="" />
                                <div className="p-3 py-2">
                                    <img src={item.icon} />
                                    <div className='flex justify-between mt-4' >
                                        <div className="">
                                            <p className='' >{item.title}</p>
                                            <p className='text-2xl font-semibold' >{item.value}</p>
                                        </div>
                                        <div className=""></div>
                                    </div>
                                </div>

                            </div>
                        ))
                    }
                </div>
                <div className="right w-3/5 flex-1 border border-custom_gray rounded-lg bg-white">
                <div className="flex items-center justify-between p-3 border-b">
                    <p className='font-semibold' >Your Activities</p>
                   <img src={note} alt="note" />
                </div>
                <div className="p-5">
                    <div className="grid gap-7">
                    {
                        activities.map((item,idx) => (
                            <div key={idx} className='flex items-center gap-4' >
                                <img src={item.img} alt="image" />
                                <div className="text-sm">
                                    <p className='font-medium' >{item.title}</p>
                                    <p className='my-1' >{item.desc}</p>
                                    <p className='text-text_color text-xs' >{item.time}</p>
                                </div>
                            </div>
                        ))
                    }
                    </div>
                </div>
            </div>
            </div>
            <div className="bottom rounded-2xl border bg-white items-center border-custom_gray grid grid-cols-2 gap-9 mt-5 ">
                <img className='cursor-pointer' onClick={() => navigate('referrals?open=true')} src={refer} alt="refer" />
                <div className="p-5">
                    <p className='font-semibold text-xl  ' >Earn Rebates by Referring <br /> Patients!</p>
                    <p className='text-text_color mt-2'>Unlock additional income with our referral program! When your patients make a payment, 
                        you'll receive a rebate in your wallet within 24 hours. Start referring your patients today and watch your earnings grow.</p>
                </div>
            </div>
        </div> */}
    </>
  )
}

export default Dashboard
