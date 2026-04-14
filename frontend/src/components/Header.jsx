import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets';
import { ArrowBigRight, ArrowRight } from 'lucide-react';
import { useClerk, UserButton, useUser } from '@clerk/react';


function Header() {
    const navigate = useNavigate();
const { user} = useUser();
 const {openSignIn} =    useClerk();

 
  return (
    <div className='fixed z-5 w-full backdrop-blur-2xl flex justify-between items-center py-3 px-4  sm:px-20 xl:px-32'>
        <div className="logo" >
            <img src={assets.logo} alt="Quick.ai" className='w-32 sm:w-44' onClick={()=> navigate('/')} />
        </div>

        {
            user ? <UserButton /> : 
            (
        <button onClick={openSignIn} className='flex items-center gap-2 rounded-full bg-primary text-white text-sm cursor-pointer px-10 py-2.5 transition-all ' >Get Started <ArrowRight className='w-4 h-4' /> </button>

            )
        }
    </div>
  )
}

export default Header

