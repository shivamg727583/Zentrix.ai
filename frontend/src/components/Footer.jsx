import { assets } from "../assets/assets"

function Footer() {
  return (
     <footer className="flex flex-col items-center justify-around w-full py-16 text-sm bg-slate-50 text-gray-800/70">
               <img src={assets.logo} alt="" />
                <p className="mt-4 text-center">Copyright © 2025 <a href="/">Quick AI</a>. All rights reservered.</p>
                <div className="flex items-center gap-4 mt-6">
                   <p className="text-center max-w-2xl mx-auto text-sm">Experience the power of AI with QuickAi.
Transform your content creation with our suite of premium AI tools. Write articles, generate images, and enhance your workflow.</p>
                </div>
            </footer>
  )
}

export default Footer