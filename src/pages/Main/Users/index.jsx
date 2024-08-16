import React, { useState } from 'react'
import Input from '../../../components/Inputs'
import { BiCopy, BiCopyAlt, BiPhoneIncoming, BiSearch, BiTrash, BiUser } from 'react-icons/bi'
import Select from '../../../components/Inputs/Select'
import Button from '../../../components/Button'
import { CgClose } from 'react-icons/cg'
import stacey from '../../../assets/images/stacey.svg'
import { useLocation } from 'react-router-dom'
import reactivateIcon from '../../../assets/images/reactivate.svg'
import deactivateIcon from '../../../assets/images/deactivate_user.svg'

const Users = () => {
    
    const query = useLocation().search.split('=')[1];
    const [acitveTab, setActiveTab] = useState(0);
    const [acitveInnerTab, setActiveInnerTab] = useState(0);

    const [viewDetails, setViewDetails] = useState(false);
    const [reactivate, setReactivate] = useState(false);
    const [deactivate, setDeactivate] = useState(false);

    const toggleViewDetails = () => setViewDetails(!viewDetails);
    const toggleReactivate = () => setReactivate(!reactivate);
    const toggleDeactivate = () => setDeactivate(!deactivate);

    const dummy_deactivated = [
        {
            name:'Marcia Cronin ',
            email:'gerald37@hotmail.com',
            reason:'Money sky boy discussions existing growth air barn conversation looking. Points need overflow effects unpack must.',
        },
        {
            name:'Luke Hudsonlee Jack',
            email:'earnestine_macejkovic89@yahoo.com',
            reason:"Tent status ask didn't good giant. Enable well mint metal respectively.",
        },
        {
            name:'Anthony Von',
            email:'emily.rolfson@hotmail.com',
            reason:"Rundown one cloud in social is leverage place. Giant like spaces offline turn seems clean moving."
        },
        {
            name:'Stacey Jacobs Volkswagon',
            email:'mohammad.schimmel@gmail.com',
            reason:"Disband functional solutionize solutionize community plane. Indicators fruit running call pushback individual important space one."
        },
        {
            name:'Luke Hudson',
            email:'earnestine_macejkovic89@yahoo.com',
            reason:"Cob offline banner rehydrate about just. Idea strategy got me thought encourage."
        },
        {
            name:'Anthony Von',
            email:'emily.rolfson@hotmail.com',
            reason:"Dangerous build we've solutions nobody sorry dive. Spaces deep hanging new group hard."
        },
        {
            name:'Stacey Jacobs',
            email:'mohammad.schimmel@gmail.com',
            reason:"Build roll that's crack but functional boardroom expectations so third. Break place dogpile scope line reality bed future-proof."
        },
    ]

    const dummy = [
        {
            name:'Marcia Cronin ',
            email:'gerald37@hotmail.com',
            phone:'601-671-8795',
            gender:'Female',
            balance:'$1,500',
            total_profit:'$250',
        },
        {
            name:'Luke Hudsonlee Jack',
            email:'earnestine_macejkovic89@yahoo.com',
            phone:'528-323-1027',
            gender:'Male',
            balance:'$5,000',
            total_profit:'$305',
        },
        {
            name:'Anthony Von',
            email:'emily.rolfson@hotmail.com',
            phone:'366-430-1102',
            gender:'Male',
            balance:'$12,050',
            total_profit:'$550',
        },
        {
            name:'Stacey Jacobs Volkswagon',
            email:'mohammad.schimmel@gmail.com',
            phone:'448-970-7550',
            gender:'Female',
            balance:'$21,000',
            total_profit:'$1,500',
        },
        {
            name:'Luke Hudson',
            email:'earnestine_macejkovic89@yahoo.com',
            phone:'528-323-1027',
            gender:'Male',
            balance:'$1,900',
            total_profit:'$550',
        },
        {
            name:'Anthony Von',
            email:'emily.rolfson@hotmail.com',
            phone:'366-430-1102',
            gender:'Male',
            balance:'$1,100',
            total_profit:'$99',
        },
        {
            name:'Stacey Jacobs',
            email:'mohammad.schimmel@gmail.com',
            phone:'448-970-7550',
            gender:'Female',
            balance:'$850',
            total_profit:'$76',
        },
    ]

    const dummyDetails = [
        {
            date:'09/10/2024',
            refer:'Stanley Stacey',
            test:3,
            status:'paid',
            amount:'₦80,000',
        },
        {
            date:'12/01/2023',
            refer:'Stanley Stacey',
            test:3,
            status:'paid',
            amount:'₦28,000',
        },
        {
            date:'09/10/2024',
            refer:'Hilda Bacci',
            test:3,
            status:'pending',
            amount:'₦44,000',
        },
        {
            date:'12/01/2023',
            refer:'Emunne Ijeoma',
            test:3,
            status:'pending',
            amount:'₦26,500',
        },
    ]

    const dummyDetails2 = [
        {
            refer:'Stanley Stacey',
            recurring:3,
            completed_tests:390,
        },
        {
            refer:'Beverly Weimann',
            recurring:1,
            completed_tests:21,
        },
        {
            refer:'Ramona Witting',
            recurring:5,
            completed_tests:11,
        },
        {
            refer:'Jerome Prohaska',
            recurring:9,
            completed_tests:35,
        },
        {
            refer:'Brendan Schoen',
            recurring:27,
            completed_tests:44,
        },
    ]

    const test_stats = [
        {
            title:'Total Rebate Earned',
            value:'₦2,800,000',
        },
        {
            title:'Pending Rebate',
            value:'₦280,000',
        },
    ]

    const details = []

  return (
  <>
   <div className='mt-3 w-full border border-custom_gray rounded-xl bg-white mb-7'>
        <div className="relative border-b p-3 flex justify-between items-center">
            <div className={`transition-all duration-300 absolute h-0.5 w-24 bg-primary left-5 bottom-0 ${acitveTab == 1 && '!left-[125px] w-32'}`}></div>
            <div className="flex gap-14 text-sm pl-10">
                {
                    ['Active', 'Deactivated'].map((item, idx) => (
                        <button onClick={() => setActiveTab(idx)} className={`opacity-70  ${acitveTab==idx && 'font-semibold opacity-100'}`} key={idx}>{item}</button>
                    ))
                }
            </div>
            <div className="flex items-center gap-4">
                <Input className={'!rounded-3xl !py-2.5 !min-w-[300px]'} placeholder={'Type user name here...'} icon={<BiSearch size={20} className='text-custom_gray' />} />
                <Select className={'!rounded-3xl !py-2.5 !min-w-[120px]'} options={[ { label:'All Status',value:null }, {label:'Completed',value:''},{label:'Ongoing'}]} />
            </div>
        </div>
       { 
        acitveTab == 1 ? <div className="mt-5 text-[13px]">
            <div className="header grid grid-cols-8 gap-3 px-5 font-medium">
                <p className='col-span-2 line-clamp-1' >Full Name</p>
                <p className='col-span-2 line-clamp-1' >Email Address</p>
                <p className='col-span-3 line-clamp-2 ' >Deactivation Reason</p>
                <p className='col-span-1' >Action</p>
            </div>
            <div className="data  text-text_color mt-3">
                {
                    dummy_deactivated.map((item,idx) => (
                    <div key={idx} className={`${idx % 2 !== 1 && 'bg-[#f9f9f9]'} header grid items-center grid-cols-8  gap-3 px-5 py-6 font-medium`}>
                    <div className="flex items-center gap-2 col-span-2 line-clamp-1">
                        <img className='w-8' src={stacey} alt="stacey" />
                        <p className='col-span-2 line-clamp-1' >{item.name}</p>
                    </div>
                        <p className='col-span-2 line-clamp-1' >{item.email}</p>
                        <p className='col-span-3 line-clamp-2 ' >{item.reason}</p>
                        <p onClick={toggleReactivate} className='font-semibold text-light_blue cursor-pointer' >Reactivate User</p>
                    </div>
                    )) 
                }

            </div>
        </div> :
        <div className="mt-5 text-[13px]">
            <div className="header grid grid-cols-8 gap-3 px-5 font-medium">
                <p className='col-span-2 line-clamp-1' >Full Name</p>
                <p className='col-span-2 line-clamp-1' >Email Address</p>
                <p className='' >Phone Number</p>
                <p className='' >Wallet Balance</p>
                <p className='' >Profit Earned</p>
                <p className='' >Action</p>
            </div>
            <div className="data  text-text_color mt-3">
                {
                    dummy.map((item,idx) => (
                    <div key={idx} className={`${idx % 2 !== 1 && 'bg-[#f9f9f9]'} header grid grid-cols-8  gap-3 px-5 py-6 font-medium`}>
                    <div className="flex items-center gap-2 col-span-2 line-clamp-1">
                        <img className='w-8' src={stacey} alt="stacey" />
                        <p className='line-clamp-1' >{item.name}</p>
                    </div>
                    <p className='col-span-2 line-clamp-1' >{item.email}</p>
                    <p className='' >{item.phone}</p>
                    <p className='' >{item.balance}</p>
                    <p className='' >{item.total_profit}</p>
                    <div className="flex gap-3">
                        <p onClick={toggleViewDetails} className='font-semibold text-light_blue cursor-pointer' >View</p>
                        <p onClick={toggleViewDetails} className='font-semibold text-green-800 cursor-pointer' >Save</p>
                    </div>
                    </div>
                    )) 
                }

            </div>
        </div>
        }
       {viewDetails ? <div className="fixed inset-0 bg-black/70 flex justify-end">
            <div className="bg-white w-[450px] max-h-screen overflow-y-auto">
                <div className="flex items-center justify-between p-3 border-b">
                    <p className='font-semibold' >Referral Details</p>
                    <button onClick={toggleViewDetails} className="font-medium flex items-center gap-2">
                        <span>Close</span>
                        <CgClose />
                    </button>
                </div>
                <div className="flex flex-col gap-1 border-b p-5">
                    {/* <img className='w-16 mx-auto' src={stacey} alt="stacey" /> */}
                    <div className="flex gap-5 items-center">
                        <img className='w-40' src={stacey} alt="stacey" />
                        <div className="grid gap-2 text-sm">
                            <p className=' font-semibold text-lg' >Stacey Jacobs</p>
                            <div className="flex flex-col ">
                                <p className='font-medium' >Email Address</p>
                                <p className='line-clamp-1 underline text-light_blue' >earnestine_macejkovic89@yahoo.com</p>
                            </div>
                            <div className="flex flex-col">
                                <p className='font-medium' >Phone Number</p>
                                <p className='line-clamp-1' >299-470-4508</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative pt-5 border-b pb-5">
                    <div className={`transition-all duration-300 absolute h-0.5 w-28 bg-primary left-2.5 bottom-0 ${acitveInnerTab == 1 && '!left-[127px] !w-28'} ${acitveInnerTab == 2 && '!left-[220px] w-[95px]'}`}></div>
                    <div className="flex gap-7 text-sm pl-4">
                        {
                            ['Rebate History', 'User Details'].map((item, idx) => (
                                <button onClick={() => setActiveInnerTab(idx)} className={`opacity-70  ${acitveInnerTab==idx && 'font-semibold opacity-100'}`} key={idx}>{item}</button>
                            ))
                        }
                    </div>
                </div>
                {acitveInnerTab == 0 ? <div className="p-5 text-sm">
                    <div className="mt-3 grid grid-cols-2 gap-5">
                        {
                            test_stats.map((item,idx) => (
                                <div key={idx} className='border rounded-lg p-3' >
                                    <p className='font-semibold text-lg'>{item.value}</p>
                                    <p className='text-xs' >{item.title}</p>
                                </div>
                            ))
                        }
                    </div>
                </div> : null }
                <div className={`mt-5 text-[13px] hidden ${acitveInnerTab == 0 && '!block'}`}>
                    <div className="header grid grid-cols-6 gap-3 px-5 font-medium">
                        <p className='line-clamp-1' >Date</p>
                        <p className='line-clamp-1' >Referral</p>
                        <p className='' >Test</p>
                        <p className='' >Rebate</p>
                        <p className='' >Status</p>
                        <p className='' >Action</p>
                    </div>
                    <div className="data  text-text_color mt-3 mb-10">
                        {
                            dummyDetails.map((item,idx) => (
                            <div key={idx} className={`${idx % 2 !== 1 && 'bg-[#f9f9f9]'} header grid grid-cols-6  gap-3 px-5 py-6 font-medium`}>
                            <p className='line-clamp-1' >{item.date}</p>
                            <p className='line-clamp-1' >{item.refer}</p>
                            <p className='' >{item.test}</p>
                            <p className='' >{item.amount}</p>
                            <p className='' >{item.status}</p>
                            <p onClick={toggleViewDetails} className='font-semibold text-light_blue cursor-pointer pl-2' >View</p>
                            </div>
                            )) 
                        }

                    </div>
                </div>
                <div className={`mt-5 text-[13px] hidden ${acitveInnerTab == 1 && '!block'} pb-5`}>
                     <div className="px-5 text-base">
                        <p className='text-base font-semibold'>Other Information</p>
                        <div className="flex gap-2 mt-3 text-sm">
                            <p className='font-medium' >Registration Date:</p>
                            <p className='line-clamp-1' >July 12, 2024</p>
                        </div>
                        <div className="flex gap-2 mt-3 text-sm">
                            <p className='font-medium' >Hospital Name:</p>
                            <p className='line-clamp-1' >John Doe Hospital</p>
                        </div>
                        <div className="flex gap-2 mt-3 text-sm">
                            <p className='font-medium' >Location:</p>
                            <p className='line-clamp-1' >N/A</p>
                        </div>
                        <div className="flex gap-2 mt-3 text-sm">
                            <p className='font-medium' >Professinal Title:</p>
                            <p className='line-clamp-1' >Gynecologist</p>
                        </div>
                    </div>
                    <div className="mt-10 px-5 text-base">
                        <p className='text-base font-semibold'>Payout Information</p>
                        <div className="flex gap-2 mt-3 text-sm">
                            <p className='font-medium' >Account Name:</p>
                            <p className='line-clamp-1' >John Doe</p>
                        </div>
                        <div className="flex gap-2 mt-3 text-sm">
                            <p className='font-medium' >Account Number:</p>
                            <p className='line-clamp-1' > 1234 - 5678 - 901</p>
                        </div>
                        <div className="flex gap-2 mt-3 text-sm">
                            <p className='font-medium' >Bank Name:</p>
                            <p className='line-clamp-1' >Lifebridge Bank PLC</p>
                        </div>
                        <button onClick={toggleDeactivate} className="flex text-red-700 font-semibold items-center gap-2 my-6 text-sm">
                            <BiTrash size={18} className='' /> <span>Deactivate Account</span>
                        </button>
                    </div>
                   
                </div>
            </div>
        </div> : null}
        {
            reactivate ? 
               <div className='bg-black/50 fixed inset-0 grid place-content-center' >
                 <div className="bg-white w-[350px] p-5 rounded-2xl flex flex-col justify-center text-center gap-3 text-sm">
                   <img className='w-12 m-auto' src={reactivateIcon} alt="reactivate" />
                   <p className='text-base font-semibold' >Reactivate User</p>
                   <p className='text-sm' >Are you sure you want to reactivate this user?</p>
                   <div className="mt-10 flex items-center gap-5 ">
                   <Button onClick={toggleReactivate} className={'!px-5 !bg-white !text-text_color border border-text_color '} title={'Cancel'} />
                   <Button onClick={toggleReactivate} className={'!px-5 !bg-light_blue'} title={'Yes Proceed'} />
                   </div>
                 </div>
               </div> : null
        }
        {
            deactivate ? 
               <div className='bg-black/50 fixed inset-0 grid place-content-center' >
                 <div className="bg-white w-[350px] p-5 rounded-2xl flex flex-col justify-center text-center gap-3 text-sm">
                   <img className='w-12 m-auto' src={deactivateIcon} alt="delete" />
                   <p className='text-base font-semibold' >Deactivate User</p>
                   <div className='text-left mt-7'>
                     <Input label={'Deactivation reason'} placeholder={'Enter reason..'} />
                   </div>
                   <div className="mt-10 flex items-center gap-5 ">
                   <Button onClick={toggleDeactivate} className={'!px-5 !bg-white !text-text_color border border-text_color '} title={'Cancel'} />
                   <Button onClick={toggleDeactivate} className={'!px-5 bg-red-600'} title={'Yes Proceed'} />
                   </div>
                 </div>
               </div> : null
        }
    </div>
  </>
  )
}

export default Users
