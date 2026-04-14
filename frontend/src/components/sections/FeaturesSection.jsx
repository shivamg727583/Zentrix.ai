import React from 'react'
import { AiToolsData } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

function FeaturesSection() {
  const navigate = useNavigate();

  return (
    <section className="px-4 sm:px-10 xl:px-24 py-16">

      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
          Powerful AI Tools
        </h1>
        <p className="mt-4 text-gray-600 text-sm sm:text-base md:text-lg">
          Everything you need to create, enhance, and optimize your content with cutting-edge AI technology.
        </p>
      </div>

      {/* Cards */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

        {AiToolsData.map((tool, i) => (
          <div
            key={i}
            onClick={() => navigate(tool.path)}
            className="group cursor-pointer bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all border border-gray-100 hover:-translate-y-1"
          >

            {/* Icon with gradient */}
            <div
              className="w-12 h-12 flex items-center justify-center rounded-xl mb-4 text-white"
              style={{
                background: `linear-gradient(135deg, ${tool.bg.from}, ${tool.bg.to})`
              }}
            >
              <tool.Icon className="w-6 h-6" />
            </div>

            {/* Title */}
            <h2 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-primary transition">
              {tool.title}
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-sm sm:text-base">
              {tool.description}
            </p>

          </div>
        ))}

      </div>

    </section>
  )
}

export default FeaturesSection