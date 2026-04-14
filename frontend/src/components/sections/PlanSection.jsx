import { PricingTable } from '@clerk/react'
import React from 'react'

function PlanSection() {
  return (
    <div className='max-w-2xl mx-auto z-20 my-30 '>
      <div className="text-center">
          <h1 className='md:text-6xl  text-4xl  font-semibold'>Choose Your Plan</h1>
        <p className='md:text-lg sm:text-sm text-xs max-w-lg mx-auto mt-4 px-10'>
Start for free and scale up as you grow. Find the perfect plan for your content creation needs.</p>

      </div>
 <div className="max-sm:mx-8 mt-14 ">
     <PricingTable  />
 </div>
    </div>
  )
}

export default PlanSection