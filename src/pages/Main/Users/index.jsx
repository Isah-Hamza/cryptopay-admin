import React, { useEffect, useState } from 'react'
import Input from '../../../components/Inputs'
import { BiCopy, BiCopyAlt, BiPhoneIncoming, BiSearch, BiTrash, BiUser } from 'react-icons/bi'
import Select from '../../../components/Inputs/Select'
import Button from '../../../components/Button'
import { CgClose } from 'react-icons/cg'
import stacey from '../../../assets/images/stacey.svg'
import { useLocation } from 'react-router-dom'
import reactivateIcon from '../../../assets/images/reactivate.svg'
import deactivateIcon from '../../../assets/images/deactivate_user.svg'
import { useMutation, useQuery } from 'react-query'
import Auth from '../../../services/Auth'
import PageLoading from '../../../Loader/PageLoading'
import moment from 'moment'
import LoadingModal from '../../../Loader/LoadingModal'
import { successToast } from '../../../utils/Helper'
import { FiDownloadCloud } from 'react-icons/fi'
import { BsDownload } from 'react-icons/bs'

const Users = () => {
    const [profit, setProfit] = useState(0);

    const [acitveTab, setActiveTab] = useState(0);
    const [acitveInnerTab, setActiveInnerTab] = useState(0);
    const [selectedUser, setSelectedUser] = useState(null);
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');


    const [viewDetails, setViewDetails] = useState(false);
    const [reactivate, setReactivate] = useState(false);
    const [deactivate, setDeactivate] = useState(false);

    const toggleViewDetails = () => setViewDetails(!viewDetails);
    const toggleReactivate = () => setReactivate(!reactivate);
    const toggleDeactivate = () => setDeactivate(!deactivate);

    const dummy_deactivated = []

    const statuses = {
        1: <span className='text-sm text-yellow-600' >Pending</span>,
        2: <span className='text-sm text-green-600' >Approved</span>,
        3: <span className='text-sm text-red-600' >Rejected</span>
    }

    // const statuses = []
    
    const { isLoading:loadingUsers, data:users, refetch:refetchUsers} = useQuery('users', Auth.GetUsers)
    const { isLoading:loadingUser, data:user, mutate:getUser } = useMutation(Auth.GetUser);
    const { isLoading:loadingTnx, data:tnx, mutate:getTnx } = useMutation(Auth.GetTnxById);
    const { isLoading:updatingTnx, mutate:updateTnx } = useMutation(Auth.UpdateTnx, {
        onSuccess: res => {
            successToast(res.data.message);
            getUser(selectedUser);
            getTnx(selectedUser);
        },
        onError: e => errorToast(e.message)
    });
    const { isLoading:updatingKyc, mutate:updateKYCMutate} = useMutation(Auth.UpdateKYC, {
        onSuccess: res => {
            successToast(res.data.message);
            getUser(selectedUser);
            // getTnx(selectedUser);
        },
        onError: e => errorToast(e.message)
    });
    const { isLoading:sendingMail, mutate:sendMailMutate } = useMutation(Auth.SendMail, {
        onSuccess: res => {
            successToast(res.data.message);
            setSubject('');
            setBody('');
        },
        onError: e => errorToast(e.message)
    });
    
    const test_stats = [
        {
            title:'Total Amount in Wallet',
            value:'$'+user?.data?.data?.wallet?.amount?.toLocaleString('en-US'),
        },
        {
            title:'Total Profit Earned',
            value:'$'+user?.data?.data?.wallet?.profit?.toLocaleString('en-US'),
        },
        {
            title:'Transactions Count',
            value: tnx?.data?.data?.total,
        },
    ]

    const updateProfit = (e,idx) => {  

        const data = { profit:Number(e.target.value) }
        updateTnx({ data, id:idx });
    }

    const updateKYC = (status) => {
        const data = {
            status,
            id:user?.data?.data?.kyc?.id,
        }
        updateKYCMutate({payload:data, id:user?.data?.data?.kyc?.id})
    }

    const sendMail = () => {
        const payload = {
            email:user?.data?.data?.email,
            subject, body
        }

        sendMailMutate(payload);
    }

    useEffect(() => {
        if(selectedUser) {
            getUser(selectedUser);
            getTnx(selectedUser);
        }
    }, [selectedUser])


    if(loadingUsers){
        return <PageLoading />
    }

  return (
  <>
   <div className='mt-3 w-full border border-custom_gray rounded-xl bg-white mb-7'>
        <div className="relative border-b p-3 flex flex-col sm:flex-row justify-between items-center">
            <div className={`transition-all duration-300 absolute h-0.5 w-24 bg-primary left-5 bottom-0 ${acitveTab == 1 && '!left-[125px] w-32'}`}></div>
            <div className="flex gap-14 text-sm pl-10">
                {
                    ['Active', 'Deactivated'].map((item, idx) => (
                        <button onClick={() => setActiveTab(idx)} className={`opacity-70  ${acitveTab==idx && 'font-semibold opacity-100'}`} key={idx}>{item}</button>
                    ))
                }
            </div>
            <div className="flex items-center gap-1">
                <Input  className={'!rounded-3xl !py-2.5 !min-w-[300px]'} placeholder={'Type user name here...'} icon={<BiSearch size={20} className='text-custom_gray' />} />
                {/* <button className={'border text-sm !rounded-3xl !py-2.5 !min-w-[120px]'} >Search</button> */}
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
            <div className="data overflow-x-auto text-text_color mt-3">
                {
                    dummy_deactivated.map((item,idx) => (
                    <div key={idx} className={`min-w-[700px] ${idx % 2 !== 1 && 'bg-[#f9f9f9]'} header grid items-center grid-cols-8  gap-3 px-5 py-6 font-medium`}>
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
        <div className="mt-5 text-[13px] overflow-x-auto ">
            <div className="min-w-[850px]">
                <div className="header grid grid-cols-8 gap-3 px-5 font-medium">
                    <p className='col-span-2 line-clamp-1' >Full Name</p>
                    <p className='col-span-2 line-clamp-1' >Email Address</p>
                    <p className='' >Phone Number</p>
                    <p className='' >Wallet Balance</p>
                    <p className='' >Profit Earned</p>
                    <p className='' >Action</p>
                </div>
                <div className="data overflow-x-auto text-text_color mt-3">
                    {
                        users?.data?.data?.data?.map((item,idx) => (
                        <div key={idx} className={`${idx % 2 !== 1 && 'bg-[#f9f9f9]'} header grid grid-cols-8  gap-3 px-5 py-6 font-medium`}>
                        <div className="flex items-center gap-2 col-span-2 line-clamp-1">
                            <img className='w-8' src={stacey} alt="stacey" />
                            <p className='line-clamp-1' >{item.name}</p>
                        </div>
                        <p className='col-span-2 line-clamp-1' >{item.email}</p>
                        <p className='' >{item.phone}</p>
                        <p className='' >${item?.wallet?.amount.toLocaleString('en-US')}</p>
                        <p className='' >${item?.wallet?.profit.toLocaleString('en-US')}</p>
                        <div className="flex gap-3">
                            <p onClick={() => {
                                setSelectedUser(item.id);
                                toggleViewDetails();
                                }} className='font-semibold text-light_blue cursor-pointer' >View</p>
                        </div>
                        </div>
                        )) 
                    }

                </div>
            </div>
        </div>
        }
       {viewDetails ? <div className="fixed inset-0 bg-black/70 flex justify-end">
            {
                loadingUser ? 
                <div className="bg-white w-[550px] h-screen grid place-content-center overflow-y-auto">
                    <PageLoading />
                </div>
                :
                <div className="overflow-x-auto bg-white w-full sm:w-[550px] max-h-screen overflow-y-auto">
                    <div className="flex items-center justify-between p-3 border-b">
                        <p className='font-semibold' >User Details</p>
                        <button onClick={() => {toggleViewDetails();refetchUsers()}} className="font-medium flex items-center gap-2">
                            <span>Close</span>
                            <CgClose />
                        </button>
                    </div>
                    <div className="flex flex-col gap-1 border-b p-5">
                        {/* <img className='w-16 mx-auto' src={stacey} alt="stacey" /> */}
                        <div className="flex gap-5 items-center">
                            <img className='w-40' src={stacey} alt="stacey" />
                            <div className="grid gap-2 text-sm">
                                <p className=' font-semibold text-lg' >{user?.data?.data?.name}</p>
                                <div className="flex flex-col ">
                                    <p className='font-medium' >Email Address</p>
                                    <p className='line-clamp-1 underline text-light_blue' >{user?.data?.data?.email}</p>
                                </div>
                                <div className="flex flex-col">
                                    <p className='font-medium' >Phone Number</p>
                                    <p className='line-clamp-1' >{user?.data?.data?.phone}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative pt-5 border-b pb-5">
                        <div className={`transition-all duration-300 absolute h-0.5 w-28 bg-primary left-2.5 bottom-0 ${acitveInnerTab == 1 && '!left-[120px] !w-28'} ${acitveInnerTab == 2 && '!left-[220px] w-[95px]'}`}></div>
                        <div className="flex gap-7 text-sm pl-4">
                            {
                                ['Wallet & Trnx.', 'User Details','Send Mail'].map((item, idx) => (
                                    <button onClick={() => setActiveInnerTab(idx)} className={`opacity-70  ${acitveInnerTab==idx && 'font-semibold opacity-100'}`} key={idx}>{item}</button>
                                ))
                            }
                        </div>
                    </div>
                    {acitveInnerTab == 0 ? <div className="p-5 text-sm">
                        <div className="mt-3 grid grid-cols-3 gap-3 sm:gap-5">
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
                    <div className={`mt-5 overflow-x-auto text-[13px] hidden ${acitveInnerTab == 0 && '!block'}`}>
                        <div className="min-w-[550px]">
                            <div className="header grid grid-cols-7 gap-3 px-5 font-medium">
                                <p className='' >Amount</p>
                                <p className='' >Profit</p>
                                <p className='line-clamp-1' >Date</p>
                                <p className='line-clamp-1' >Time</p>
                                <p className='' >Status</p>
                                <p className='col-span-2' >Actions</p>
                            </div>
                            <div className="data  text-text_color mt-3 mb-10">
                                {
                                    tnx?.data?.data?.data?.map((item,idx) => {
                                    return <div key={idx} className={`${idx % 2 !== 1 && 'bg-[#f9f9f9]'} header grid grid-cols-7  gap-3 px-5 py-6 font-medium`}>
                                    <p className='line-clamp-1' >${item.amount.toLocaleString('en-US')}</p>
                                    <p className='line-clamp-1 flex items-center' >$ <input disabled={item.status != '2'} className='w-12 outline-none' onKeyDown={e => {
                                        e.keyCode == 13 && updateProfit(e, item.id)
                                    }} onChange={e => console.log(e.target.value)} defaultValue = {item.profit.toLocaleString('en-US')} /> </p>
                                    <p className='line-clamp-1' >{moment(item.created_at).format('ll')}</p>
                                    <p className='' >{moment(item.created_at).format('hh:mm a')}</p>
                                    <p className='' >{statuses[item.status]}</p>
                                    <div className="col-span-2 flex items-center gap-2 pl-3">
                                        <a download target='_blank' href={item.proof} className='text-light_blue font-semibold cursor-pointer flex items-center gap-1' > <FiDownloadCloud /> Receipt</a>
                                        {
                                            (item.status == 1 || item.status == 3 )?
                                            <p onClick={() => {
                                                const data = { status:2 }
                                                updateTnx({ data, id:item.id})}
                                            } className='font-semibold text-green-700 cursor-pointer pl-2' >Approve</p> :
                                            <p onClick={() => {
                                                const data = { status:3 }
                                                updateTnx({ data, id:item.id})}
                                            } className='font-semibold text-red-800 cursor-pointer pl-2' >Reject</p>
                                        }
                                    </div>
                                    </div>
                                    }
                                    ) 
                                }

                            </div>
                        </div>
                    </div>
                    <div className={`mt-5 text-[13px] hidden ${acitveInnerTab == 1 && '!block'} pb-5`}>
                        <div className="px-5 text-base">
                            <p className='text-base font-semibold'>Other Information</p>
                            <div className="flex gap-2 mt-3 text-sm">
                                <p className='font-medium' >Gender:</p>
                                <p className='line-clamp-1' >{user?.data?.data?.gender}</p>
                            </div>
                            <div className="flex gap-2 mt-3 text-sm">
                                <p className='font-medium' >Role:</p>
                                <p className='line-clamp-1' >{user?.data?.data?.role ?? '-'}</p>
                            </div> 
                            <div className="flex gap-2 mt-3 text-sm">
                                <p className='font-medium' >Address:</p>
                                <p className='line-clamp-1' >{user?.data?.data?.address ?? '-'}</p>
                            </div>
                        </div>
                        <div className="mt-10 px-5 text-base">
                            <p className='text-base font-semibold'>KYC Data</p>
                            <div className="flex gap-2 mt-3 text-sm">
                                <p className='font-medium' >Means of ID:</p>
                                <p className='line-clamp-1' >{user?.data?.data?.kyc?.means_of_identification}</p>
                            </div>
                          { user?.data?.data?.kyc?.identification_number ?   <div className="flex gap-2 mt-3 text-sm">
                                <p className='font-medium' >Identification Number:</p>
                                <p className='line-clamp-1' >{user?.data?.data?.kyc?.identification_number}</p>
                            </div> : null}
                           {user?.data?.data?.kyc?.identification_file ? <div className="flex gap-2 mt-3 text-sm">
                                <p className='font-medium' >Identification File:</p>
                                <a href={user?.data?.data?.kyc?.identification_file} className='line-clamp-1 flex items-center gap-1' > <BsDownload /> download</a>
                            </div> : null}
                            <div className="flex gap-2 mt-3 text-sm">
                                <p className='font-medium' >Status:</p>
                                <p className='line-clamp-1' >{statuses[user?.data?.data?.kyc?.status]}</p>
                            </div>
                            <div className="mt-5 flex gap-5 text-sm">
                                    <button onClick={() => {
                                        updateKYC(2)}
                                    } className='font-semibold text-white px-5 py-2 rounded-lg bg-green-600 cursor-pointer' >Approve</button> 
                                    <button onClick={() => {
                                        updateKYC(3)}
                                    } className='font-semibold bg-red-800 text-white px-5 py-2 rounded-lg cursor-pointer pl-2' >Disapprove</button>
                            </div>
                        </div>
                        <div className="mt-10 px-5 text-base">
                            <p className='text-base font-semibold'>Payout Information</p>
                            <div className="flex gap-2 mt-3 text-sm">
                                <p className='font-medium' >USDT Wallet Address:</p>
                                <p className='line-clamp-1' >{user?.data?.data?.wallet?.usdt_wallet_address ?? '-'}</p>
                            </div>
                            <div className="flex gap-2 mt-3 text-sm">
                                <p className='font-medium' >Bitcoin Wallet Address:</p>
                                <p className='line-clamp-1' >{user?.data?.data?.wallet?.bitcoin_wallet_address ?? '-'}</p>
                            </div>
                            <div className="flex gap-2 mt-3 text-sm">
                                <p className='font-medium' >Ethereum Wallet Address:</p>
                                <p className='line-clamp-1' >{user?.data?.data?.wallet?.ethereum_wallet_address ?? '-'}</p>
                            </div>
                            <div className="flex gap-2 mt-3 text-sm">
                                <p className='font-medium' >Solanar Wallet Address:</p>
                                <p className='line-clamp-1' >{user?.data?.data?.wallet?.solanar_wallet_address ?? '-'}</p>
                            </div>
                            
                            <button onClick={toggleDeactivate} className="flex text-red-700 font-semibold items-center gap-2 my-6 text-sm">
                                <BiTrash size={18} className='' /> <span>Deactivate Account</span>
                            </button>
                        </div>
                    
                    </div>
                    <div className={`px-5 mt-5 text-[13px] hidden ${acitveInnerTab == 2 && '!block'} pb-5`}>
                        <div className='mt-5' >
                            <Input value={subject} onChange={e => setSubject(e.target.value)} labelClass={'px-2'} label={'Subject'} placeholder={'Transaction Confirmed'} />
                            <div className='grid mt-5'>
                                <label className='px-2 font-medium' htmlFor="body">Email Body</label>
                                <textarea value={body} onChange={e => setBody(e.target.value)} placeholder='This is to inform you that ...' id='body' className='w-full border outline-none rounded-2xl h-32 p-3' />
                            </div>
                            <div className='w-full mt-10 flex justify-end' >
                                <Button disabled={!subject || !body} onClick={sendMail} className={'w-fit px-14 disabled:bg-opacity-60'} title={'Send'} />
                            </div>
                        </div>
                    </div>
                </div>
            }
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
        {
            (updatingTnx || sendingMail) ? <LoadingModal /> : null
        }
    </div>
    {
        updatingKyc ? <LoadingModal /> : null
    }
  </>
  )
}

export default Users
