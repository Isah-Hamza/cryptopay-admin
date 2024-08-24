import React, { useState } from 'react'
import Input from '../../../components/Inputs'
import { BiCopy, BiCopyAlt, BiPhoneIncoming, BiSearch, BiUser } from 'react-icons/bi'
import Select from '../../../components/Inputs/Select'
import { CgClose } from 'react-icons/cg'
import New from '../../../components/Referral/New'
import { useLocation } from 'react-router-dom'

const Transactions = () => {
    
    const query = useLocation().search.split('=')[1];
    const [acitveTab, setActiveTab] = useState(0);
    console.log(query);

    const [viewDetails, setViewDetails] = useState(false);
    const [newReferral, setNewReferral] = useState(() => query == 'true' ? true : false);

    const toggleViewDetails = () => setViewDetails(!viewDetails);
    const toggleNewReferral = () => setNewReferral(!newReferral);

    const dummy = [
        {
            name:'Marcia Cronin ',
            email:'gerald37@hotmail.com',
            phone:'601-671-8795',
            gender:'Female',
            test:'-',
            rebate:'-',
        },
        {
            name:'Luke Hudsonlee Jack',
            email:'earnestine_macejkovic89@yahoo.com',
            phone:'528-323-1027',
            gender:'Male',
            test:'3',
            rebate:'₦103,000',
        },
        {
            name:'Anthony Von',
            email:'emily.rolfson@hotmail.com',
            phone:'366-430-1102',
            gender:'Male',
            test:'-',
            rebate:'-',
        },
        {
            name:'Stacey Jacobs Volkswagon',
            email:'mohammad.schimmel@gmail.com',
            phone:'448-970-7550',
            gender:'Female',
            test:'2',
            rebate:'₦21,000',
        },
        {
            name:'Luke Hudson',
            email:'earnestine_macejkovic89@yahoo.com',
            phone:'528-323-1027',
            gender:'Male',
            test:'-',
            rebate:'-',
        },
        {
            name:'Anthony Von',
            email:'emily.rolfson@hotmail.com',
            phone:'366-430-1102',
            gender:'Male',
            test:'1',
            rebate:'₦55,000',
        },
        {
            name:'Stacey Jacobs',
            email:'mohammad.schimmel@gmail.com',
            phone:'448-970-7550',
            gender:'Female',
            test:'2',
            rebate:'₦21,000',
        },
    ]

    const dummyDetails = [
        {
            date:'09/10/2024',
            refer:'Stanley Stacey',
            test:3,
            status:'completd',
            amount:'₦2,800,000',
        },
        {
            date:'12/01/2023',
            refer:'Stanley Stacey',
            test:3,
            status:'completd',
            amount:'₦2,800,000',
        },
        {
            date:'09/10/2024',
            refer:'Hilda Bacci',
            test:3,
            status:'completd',
            amount:'₦44,000',
        },
        {
            date:'12/01/2023',
            refer:'Emunne Ijeoma',
            test:3,
            status:'completd',
            amount:'₦26,500',
        },
    ]

    const test_stats = [
        {
            title:'Total Tests Paid',
            value:'₦2,800,000',
        },
        {
            title:'Total Rebate Given',
            value:'₦280,000',
        },
    ]

    const details = [
        {

        }
    ]



  return (
  <>
   {!newReferral ? 
   <div className='mt-3 w-full border border-custom_gray rounded-xl bg-white mb-7'>
        <div className="relative border-b p-3 flex justify-between items-center">
            <div className={`transition-all duration-300 absolute h-0.5 w-36 bg-primary left-5 bottom-0 ${acitveTab == 1 && '!left-[165px] w-48'}`}></div>
            <div className="flex gap-14 text-sm pl-10">
                {
                    ['All Referrals', 'No Test Appointments'].map((item, idx) => (
                        <button onClick={() => setActiveTab(idx)} className={`opacity-70  ${acitveTab==idx && 'font-semibold opacity-100'}`} key={idx}>{item}</button>
                    ))
                }
            </div>
            <div className="flex items-center gap-4">
                <Input className={'!rounded-3xl !py-2.5 !min-w-[300px]'} placeholder={'Type user name here...'} icon={<BiSearch size={20} className='text-custom_gray' />} />
                <Select className={'!rounded-3xl !py-2.5 !min-w-[120px]'} options={[ { label:'All Status',value:null }, {label:'Completed',value:''},{label:'Ongoing'}]} />
            </div>
        </div>
        <div className="mt-5 text-[13px]">
            <div className="header grid grid-cols-9 gap-3 px-5 font-medium">
                <p className='col-span-2 line-clamp-1' >Full Name</p>
                <p className='col-span-2 line-clamp-1' >Email Address</p>
                <p className='' >Phone Number</p>
                <p className='' >Gender</p>
                <p className='' >Date & Time</p>
                <p className='' >Profit Earaned</p>
                <p className='' >Action</p>
            </div>
            <div className="data  text-text_color mt-3">
                {
                    dummy.map((item,idx) => (
                    <div key={idx} className={`${idx % 2 !== 1 && 'bg-[#f9f9f9]'} header grid grid-cols-9  gap-3 px-5 py-6 font-medium`}>
                    <p className='col-span-2 line-clamp-1' >{item.name}</p>
                    <p className='col-span-2 line-clamp-1' >{item.email}</p>
                    <p className='' >{item.phone}</p>
                    <p className='' >{item.gender}</p>
                    <p className='' >{item.test}</p>
                    <p className='' >{item.rebate}</p>
                    <p onClick={toggleViewDetails} className='font-semibold text-light_blue cursor-pointer' >View Details</p>
                    </div>
                    )) 
                }

            </div>
        </div>
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
                    <p className=' font-semibold text-lg' >Stacey Jacobs</p>
                    <div className="mt-5 grid grid-cols-2 gap-3 gap-y-5 text-sm">
                        <div className="flex flex-col ">
                            <p className='font-medium' >Email Address</p>
                            <p className='line-clamp-1 underline text-light_blue' >earnestine_macejkovic89@yahoo.com</p>
                        </div>
                        <div className="flex flex-col">
                            <p className='font-medium' >Phone Number</p>
                            <p className='line-clamp-1' >299-470-4508</p>
                        </div>
                        <div className="flex flex-col">
                            <p className='font-medium' >Gender</p>
                            <p className='line-clamp-1' >Female</p>
                        </div>
                        <div className="flex flex-col">
                            <p className='font-medium' >First Invited By</p>
                            <p className='line-clamp-1' >Ogu Chidinma</p>
                        </div>
                        <div className="flex flex-col">
                            <p className='font-medium' >Total Tests Assignmed</p>
                            <p className='line-clamp-1' >33</p>
                        </div>
                        <div className="flex flex-col ">
                            <p className='font-medium' >Total Tests Completed</p>
                            <p className='line-clamp-1' >18</p>
                        </div>
                    </div>
                </div>
                <div className="p-5 text-sm">
                    <p className='font-semibold text-base' >Test Information</p>
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
                </div>
                <div className="mt-5 text-[13px]">
                    <div className="header grid grid-cols-6 gap-3 px-5 font-medium">
                        <p className='line-clamp-1' >Date</p>
                        <p className='line-clamp-1' >Referrer</p>
                        <p className='' >Test</p>
                        <p className='' >Status</p>
                        <p className='' >Amount</p>
                        <p className='' >Action</p>
                    </div>
                    <div className="data  text-text_color mt-3 mb-10">
                        {
                            dummyDetails.map((item,idx) => (
                            <div key={idx} className={`${idx % 2 !== 1 && 'bg-[#f9f9f9]'} header grid grid-cols-6  gap-3 px-5 py-6 font-medium`}>
                            <p className='line-clamp-1' >{item.date}</p>
                            <p className='line-clamp-1' >{item.refer}</p>
                            <p className='' >{item.test}</p>
                            <p className='' >{item.status}</p>
                            <p className='' >{item.amount}</p>
                            <p onClick={toggleViewDetails} className='font-semibold text-light_blue cursor-pointer pl-2' >View</p>
                            </div>
                            )) 
                        }

                    </div>
                </div>
            </div>
        </div> : null}
    </div> :
    <div className='w-full'>
        <New toggleNewReferral={toggleNewReferral} /> 
    </div>
    }
  </>
  )
}

export default Transactions
