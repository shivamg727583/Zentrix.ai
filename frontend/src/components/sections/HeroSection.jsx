import {useNavigate} from 'react-router-dom';
import { assets } from '../../assets/assets';
import LogoScroll from '../ui/LogoScroll';

function HeroSection() {
  const navigate = useNavigate();
  return (
    <section className="min-h-screen w-full overflow-hidden flex items-center justify-center px-4 sm:px-10 xl:px-24 bg-[url('/gradientBackground.png')] bg-cover bg-no-repeat bg-center">

      <div className="max-w-4xl text-center flex flex-col items-center gap-4">

        {/* Heading */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-bold leading-tight">
          Create amazing content <br />
          with <span className="text-primary">AI tools</span>
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-xl md:max-w-2xl mx-auto px-20 md:px-10">
          Transform your content creation with our suite of premium AI tools.
          Write articles, generate images, and enhance your workflow.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">

          <button onClick={()=> navigate('/ai')} className="px-6 py-3 rounded-full bg-primary text-white text-sm sm:text-base font-medium shadow-md hover:scale-105 transition-all cursor-pointer">
            Start Creating Now
          </button>

          <button className="px-6 py-3 rounded-full border border-gray-300 text-sm sm:text-base font-medium hover:bg-gray-100 transition-all cursor-pointer">
            Watch Demo
          </button>

        </div>
        <div className='flex items-center gap-4 mt-4 mx-auto text-gray-600'>
          <img src={assets.user_group} alt=""  className='h-8' />
          <h4>Trusted by 5k+ people</h4>
        </div>


{/* auto scroll */}
<div className="w-full h-full">
     <LogoScroll />

</div>


      </div>

    </section>
  )
}

export default HeroSection