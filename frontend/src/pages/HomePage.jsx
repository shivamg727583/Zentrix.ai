import React from 'react'
import Header from '../components/Header'
import HeroSection from '../components/sections/HeroSection'
import FeaturesSection from '../components/sections/FeaturesSection'
import TestimonialSection from '../components/sections/TestimonialSection'
import PlanSection from '../components/sections/PlanSection'
import Footer from '../components/Footer'

function HomePage() {
  return (
    <>
      <Header />
     <HeroSection />
    <FeaturesSection />
<TestimonialSection />
<PlanSection />
<Footer />
    </>
  )
}

export default HomePage