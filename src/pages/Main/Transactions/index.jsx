import React, { useState } from 'react'
import Input from '../../../components/Inputs'
import { BiCopy, BiCopyAlt, BiPhoneIncoming, BiSearch, BiUser } from 'react-icons/bi'
import Select from '../../../components/Inputs/Select'
import { CgClose } from 'react-icons/cg'
import New from '../../../components/Referral/New'
import { useLocation } from 'react-router-dom'
import Auth from '../../../services/Auth'
import PageLoading from '../../../Loader/PageLoading'
import { useQuery } from 'react-query'
import moment from 'moment'
import { FiDownloadCloud } from 'react-icons/fi'

const Transactions = () => {
    
    const query = useLocation().search.split('=')[1];
    const [acitveTab, setActiveTab] = useState(0);
    console.log(query);

    const [viewDetails, setViewDetails] = useState(false);
    const [newReferral, setNewReferral] = useState(() => query == 'true' ? true : false);

    const toggleViewDetails = () => setViewDetails(!viewDetails);
    const toggleNewReferral = () => setNewReferral(!newReferral);

    const statuses = {
        1: <span className='text-sm text-yellow-600' >Pending</span>,
        2: <span className='text-sm text-green-600' >Approved</span>,
        3: <span className='text-sm text-red-600' >Rejected</span>
    }

    const { isLoading:loadingTnx, data:tnx } = useQuery('tnx', Auth.GetTnxs)


    if(loadingTnx){
        return <PageLoading />
    }


  return (
  <>
   <div className='mt-3 w-full border border-custom_gray rounded-xl bg-white mb-7'>
        <div className="relative border-b p-3 flex justify-between items-center">
            <div className={`transition-all duration-300 absolute h-0.5 w-36 bg-primary left-5 bottom-0 ${acitveTab == 1 && '!left-[165px] w-48'}`}></div>
            <div className="flex gap-14 text-sm pl-6">
                {
                    ['All Transactions'].map((item, idx) => (
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
                {/* <p className='' >Phone Number</p> */}
                <p className='' >Amount Deposited</p>
                <p className='' >Profit Earned</p>
                <p className='' >Status</p>
                <p className='' >Date & Time</p>
                <p className='' >Action</p>
            </div>
            <div className="data  text-text_color mt-3">
                {
                    tnx?.data?.data?.data?.map((item,idx) => (
                    <div key={idx} className={`${idx % 2 !== 1 && 'bg-[#f9f9f9]'} header grid grid-cols-9  gap-3 px-5 py-6 font-medium`}>
                    <p className='col-span-2 line-clamp-1' >{item.user.name}</p>
                    <p className='col-span-2 line-clamp-1' >{item.user.email}</p>
                    {/* <p className='' >{item.user.phone}</p> */}
                    <p className='' >${item.amount.toLocaleString('en-US')}</p>
                    <p className='' >${item.profit.toLocaleString('en-US')}</p>
                    <p className='' >{statuses[item.status]}</p>
                    <p className='' >{moment(item.created_at).format('lll')}</p>
                    <p onClick={null} className='font-semibold text-light_blue cursor-pointer flex items-center gap-1' > <FiDownloadCloud /> Receipt</p>
                    </div>
                    )) 
                }

            </div>
        </div>

    </div> 
  </>
  )
}

export default Transactions
