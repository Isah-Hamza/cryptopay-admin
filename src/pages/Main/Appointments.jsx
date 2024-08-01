import React, { useState } from 'react'
import Input from '../../components/Inputs'
import { BiCopy, BiCopyAlt, BiPhoneIncoming, BiSearch, BiUser } from 'react-icons/bi'
import Select from '../../components/Inputs/Select'
import Button from '../../components/Button'
import { CgClose, CgMail } from 'react-icons/cg'
import stacey from '../../assets/images/stacey.svg'
import { MdArrowForward, MdOutlineEmail } from 'react-icons/md'
import completed from '../../assets/images/completed.svg'
import New from '../../components/Referral/New'
import { useLocation } from 'react-router-dom'
import { RiCalendarScheduleFill } from 'react-icons/ri'
import { ImCheckmark } from 'react-icons/im'

const Appointments = () => {
    
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
            appointment:'12-09-2023 09:00am',
            gender:'Female',
            test:'-',
            rebate:'-',
        },
        {
            name:'Luke Hudsonlee Jack',
            email:'earnestine_macejkovic89@yahoo.com',
            appointment:'12-09-2023 09:00am',
            gender:'Male',
            test:'3',
            rebate:'₦103,000',
        },
        {
            name:'Anthony Von',
            email:'emily.rolfson@hotmail.com',
            appointment:'12-09-2023 09:00am',
            gender:'Male',
            test:'-',
            rebate:'-',
        },
        {
            name:'Stacey Jacobs Volkswagon',
            email:'mohammad.schimmel@gmail.com',
            appointment:'12-09-2023 09:00am',
            gender:'Female',
            pay_date:'14-04-2024 11:39pm',
            rebate:'₦21,000',
        },
        {
            name:'Luke Hudson',
            email:'earnestine_macejkovic89@yahoo.com',
            appointment:'12-09-2023 09:00am',
            gender:'Male',
            pay_date:'14-04-2024 11:39pm',
            rebate:'-',
        },
        {
            name:'Anthony Von',
            email:'emily.rolfson@hotmail.com',
            appointment:'12-09-2023 09:00am',
            gender:'Male',
            pay_date:'14-04-2024 11:39pm',
            rebate:'₦55,000',
        },
        {
            name:'Stacey Jacobs',
            email:'mohammad.schimmel@gmail.com',
            appointment:'12-09-2023 09:00am',
            gender:'Female',
            pay_date:'14-04-2024 11:39pm',
            rebate:'₦21,000',
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

    const selectedTests = [
        {
          type:'C.T. Scan - Pelvimetry',
          category:'C.T Test',
          amount:'₦28,000',
        },
        {
            type:'Menstrual Irregularities',
            category:'Endocrinology',
            amount:'₦8,000',
        },
        {
          type:'C.T. Scan - Pelvimetry',
          category:'C.T Test',
          amount:'₦28,000',
        },
        {
            type:'Fibronology',
            category:'HAEMATOLOGY',
            amount:'₦5,500',
        },
    ]



  return (
  <>
   {!newReferral ? 
   <div className='mt-3 w-full border border-custom_gray rounded-xl bg-white mb-7'>
        <div className="relative border-b p-3 flex justify-between items-center">
            <div className={`transition-all duration-300 absolute h-0.5 w-36 bg-primary left-7 bottom-0 ${acitveTab == 1 && '!left-[200px] w-40'} ${acitveTab == 2 && '!left-[360px] w-40'} `}></div>
            <div className="flex gap-14 text-sm pl-5">
                {
                    ['Completed Payment', 'Pending Payment', 'Calendar View'].map((item, idx) => (
                        <button onClick={() => setActiveTab(idx)} className={`opacity-70  ${acitveTab==idx && 'font-semibold opacity-100'}`} key={idx}>{item}</button>
                    ))
                }
            </div>
            <div className="flex items-center gap-4">
                <Input className={'!rounded-3xl !py-2.5 !min-w-[300px]'} placeholder={'Type user name here...'} icon={<BiSearch size={20} className='text-custom_gray' />} />
                {/* <Select className={'!rounded-3xl !py-2.5 !min-w-[120px]'} options={[ { label:'All Status',value:null }, {label:'Completed',value:''},{label:'Ongoing'}]} /> */}
            </div>
        </div>
        <div className="mt-5 text-[13px]">
            <div className="header grid grid-cols-11 gap-3 px-5 font-medium">
                <p className='mt-1' > <input type="checkbox" name="" id="" /></p>
                <p className='col-span-2 line-clamp-1' >Full Name</p>
                <p className='col-span-2 line-clamp-1' >Email Address</p>
                <p className='col-span-2 line-clamp-1' >Appointment Schedule</p>
                <p className='col-span-2 line-clamp-1' >Payment Date</p>
                <p className='' >Action</p>
            </div>
            <div className="data  text-text_color mt-3">
                {
                    dummy.map((item,idx) => (
                    <div key={idx} className={`${idx % 2 !== 1 && 'bg-[#f9f9f9]'} header grid grid-cols-11  gap-3 px-5 py-6 font-medium`}>
                    <p className='' > <input type="checkbox" name="" id="" /></p>
                    <p className='col-span-2 line-clamp-1' >{item.name}</p>
                    <p className='col-span-2 line-clamp-1 pr-5' >{item.email}</p>
                    <p className='col-span-2 line-clamp-1' >{item.appointment}</p>
                    <p className='col-span-2 line-clamp-1' >{item.pay_date}</p> 
                    <p onClick={toggleViewDetails} className='col-span-2 font-semibold text-light_blue cursor-pointer' >View Details</p>
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
                    <img className='w-16 mx-auto' src={stacey} alt="stacey" />
                    <p className='text-center font-medium' >Stacey Jacobs</p>
                    <div className="mt-5 grid grid-cols-3 gap-3 text-sm">
                        <div className="flex flex-col justify-center text-center">
                            <div className="mx-auto mb-2 text-center w-6 h-6 rounded-full grid place-content-center bg-custom_gray">
                                <MdOutlineEmail />
                             </div>
                            <p className='font-semibold' >Email Address</p>
                            <p className='line-clamp-1 underline text-light_blue' >earnestine_macejkovic89@yahoo.com</p>
                        </div>
                        <div className="flex flex-col justify-center items-center text-center">
                            <div className="mb-2 text-center w-6 h-6 rounded-full grid place-content-center bg-custom_gray">
                                <BiPhoneIncoming />
                             </div>
                            <p className='font-semibold' >Phone Number</p>
                            <p className='line-clamp-1' >299-470-4508</p>
                        </div>
                        <div className="flex flex-col justify-center items-center text-center">
                            <div className="mb-2 text-center w-6 h-6 rounded-full grid place-content-center bg-custom_gray">
                                <BiUser />
                             </div>
                            <p className='font-semibold' >Gender</p>
                            <p className='line-clamp-1' >Female</p>
                        </div>
                    </div>
                </div>
                <div className="p-5 text-sm">
                    <p className='font-semibold' >Test Type</p>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                        {
                            selectedTests.map((item,idx) => (
                                <div key={idx} className="bg-white rounded-md border p-3 text-sm">
                                    <div className="mb-2 font-semibold flex gap-2 justify-between items-center">
                                        <p className='' >{item.type}</p>
                                        <p className='text-3xl' >0{idx + 1}</p>
                                    </div>
                                    <div className="flex text-sm items-center justify-between gap-2">
                                        <p className='' >{item.category}</p>
                                      
                                        <p className='text-base font-medium' >{item.amount}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="mt-5 mb-16 grid grid-cols-2  gap-5 gap-y-7 text-sm">
                        <div className="flex flex-col ">
                            <p className='font-medium' >Rebate</p>
                            <p className=' ' >10% on each Test</p>
                        </div>
                        <div className="flex flex-col ">
                            <p className='font-medium' >Date</p>
                            <p className=' ' >09 September, 2024</p>
                        </div>
                        <div className="flex flex-col ">
                            <p className='font-medium' >Referrer's Name</p>
                            <div className="w-fit flex items-center gap-2 bg-custom_gray p-1 rounded-3xl pr-3">
                                <img className='w-7' src={stacey} alt="stacey" />
                                <p className=' ' >Emmanuella Bami</p>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <p className='font-medium' >Invitation Code</p>
                            <p className=' text-primary font-semibold' >UYBFJK</p>
                        </div>
                        <div className="flex flex-col">
                            <p className='font-medium' >Appointment</p>
                            <p className=' ' >09 September 11:30am</p>
                        </div>
                        <div className="flex flex-col">
                            <p className='font-medium' >Booking Number</p>
                            <p className=' ' >003</p>
                        </div>
                        <div className="flex flex-col">
                            <p className='font-medium' >Referral Status</p>
                            <p className='' >pending</p>
                        </div>
                        <div className="flex flex-col">
                            <p className='font-medium' >Total Test Payment</p>
                            <p className='text-primary font-semibold' >₦112,000</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-5 mt-10">
                       {
                        acitveTab == 0 ? 
                            <button className="border rounded-3xl flex items-center gap-3 font-medium pl-7  py-2 text-sm">
                                <RiCalendarScheduleFill />
                                <span>Reschedule</span>
                            </button>
                            :
                            <button className="border rounded-3xl flex items-center gap-3 font-medium pl-7  py-2 text-sm">
                                <ImCheckmark />
                                <span>Mark as Paid</span>
                            </button>
                        }
                        <button className="bg-light_blue text-white border rounded-3xl flex items-center gap-3 font-medium pl-7  py-2 text-sm">
                            <CgMail size={18} />
                            <span>Send Follow Up</span>
                        </button>
                    </div>
                </div>
               
                {/* <div className="border-t my-5 p-5">
                    <Button onClick={toggleNewReferral} title={'Refer'} className={'w-full !px-10 !py-2.5 !text-sm  !bg-light_blue'} />
                </div> */}
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

export default Appointments
