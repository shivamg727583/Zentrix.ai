import React from 'react'
import { TestimonialData } from '../../assets/assets';

function TestimonialSection() {
 


    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

    React.useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleNext = () => {
        setCurrentIndex((prev) => prev + 3 >= TestimonialData.length ? 0 : prev + 3);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => prev - 3 < 0 ? Math.max(TestimonialData.length - 3, 0) : prev - 3);
    };

    React.useEffect(() => {
        if (!isMobile) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) =>
                prev + 1 >= TestimonialData.length ? 0 : prev + 1
            );
        }, 3000);

        return () => clearInterval(interval);
    }, [isMobile, TestimonialData.length]);


    return (
        <>
            <section className=' py-20 px-4 sm:px-6 lg:px-8'>
                <div className='w-full max-w-6xl mx-auto'>
                    <h1 className=' font-medium text-4xl md:text-6xl text-center '>Loved by Creators</h1>
                    <p className=' text-sm/6 mt-4 text-center md:text-lg mx-auto md:mx-0'>Don't just take our word for it. Here's what our users are saying.</p>

                    <div className='hidden md:flex justify-end gap-2 mt-4'>
                        <div onClick={handlePrev} className='h-10 w-10 rounded-lg  border border-blue-800 flex items-center justify-center cursor-pointer hover:bg-blue-600  transition-all text-blue-600 hover:text-white'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left-icon lucide-arrow-left "><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
                        </div>
                        <div onClick={handleNext} className='h-10 w-10 rounded-lg  border border-blue-800 flex items-center justify-center cursor-pointer hover:bg-blue-600 text-blue-600 hover:text-white transition-all'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right-icon lucide-arrow-right"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                        </div>
                    </div>

                    <div className='mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-8 md:px-0 mt-12 md:mt-6'>

                        {TestimonialData.slice(currentIndex, isMobile ? currentIndex + 1 : currentIndex + 3).map((item) => (
                            <div key={item.id} className=' hover:-translate-y-1 transition duration-300 hover:cursor-pointer shadow-md rounded-2xl p-6 space-y-6'>
                                <div className='flex items-start justify-between'>
                                    <div className="flex">
                                        {Array(5).fill(0).map((_, i) => (
                                            <svg key={i} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                                className="lucide lucide-star text-transparent fill-[#6b21ff]" aria-hidden="true">
                                                <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                                            </svg>
                                        ))}
                                    </div>
                                    <p className='text-xs '>{item.date}</p>
                                </div>

                                <p className='text-sm/6 '>{item.content}</p>
                                <div className='flex items-center gap-4 mt-4'>
                                    <img src={item.image} alt="User Avatar" className='w-13 h-13 rounded-full object-cover' />
                                    <div>
                                        <p className='text-sm text-gray-800'>{item.name}</p>
                                        <p className='text-xs font-medium text-gray-600'>{item.title}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="hidden max-md:flex items-center justify-center mt-5 space-x-2">
                        {TestimonialData.map((_, index) => (
                            <span onClick={() => setCurrentIndex(index)} key={index}
                                className={`w-3 h-3 rounded-full transition-all ${index === currentIndex
                                    ? "bg-black"
                                    : "bg-black/20"
                                    }`}
                            ></span>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}


export default TestimonialSection