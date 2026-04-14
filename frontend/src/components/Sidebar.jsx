import {
  Edit,
  Eraser,
  FileBarChartIcon,
  Group,
  Hash,
  Images,
  LayoutDashboard,
  Scissors
} from "lucide-react"

import { NavLink } from 'react-router-dom'
import {
  UserButton,
  useUser,
  UserAvatar,
  SignOutButton
} from '@clerk/react'

function Sidebar({ sidebar, setSidebar }) {
  const { user } = useUser()

  const SideItems = [
    { name: "Dashboard", icon: LayoutDashboard, link: "/ai" },
    { name: "Write Article", icon: Edit, link: "/ai/write-article" },
    { name: "Blog Title", icon: Hash, link: "/ai/blog-titles" },
    { name: "Generate Images", icon: Images, link: "/ai/generate-images" },
    { name: "Remove Background", icon: Eraser, link: "/ai/remove-background" },
    { name: "Remove Object", icon: Scissors, link: "/ai/remove-object" },
    { name: "Review Resume", icon: FileBarChartIcon, link: "/ai/review-resume" },
    { name: "Community", icon: Group, link: "/ai/community" }
  ]

  return (
    <aside
      className={`
        fixed sm:static top-0 left-0 h-full w-64 bg-white border-r z-40
        transform transition-transform duration-300 ease-in-out mt-16 sm:mt-0
        ${sidebar ? "translate-x-0 " : "-translate-x-full sm:translate-x-0"}
        flex flex-col justify-between shadow-lg sm:shadow-none
      `}
    >
      {/* Top Section */}
      <div className="p-5 flex flex-col items-center gap-4">

        {/* Avatar */}
        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden shadow-sm">
          <UserAvatar className="w-full h-full" />
        </div>

        <h2 className="text-sm font-semibold text-gray-700">
          {user?.fullName || "User"}
        </h2>

        {/* Menu */}
        <div className="w-full mt-4 flex flex-col gap-1">
          {SideItems.map((item, idx) => (
            <NavLink
              key={idx}
              to={item.link}
              end={item.link==='/ai'}
              onClick={() => setSidebar(false)}
              className={({ isActive }) =>
                `
                flex items-center gap-3 px-3 py-2 rounded-lg
                transition-all duration-200 group
                ${isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-blue-50"
                }
                `
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    className={`
                      w-5 h-5 transition
                      ${isActive
                        ? "text-white"
                        : "text-gray-500 group-hover:text-blue-600"}
                    `}
                  />
                  <span className="text-sm font-medium">
                    {item.name}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      {user && (
        <div className="p-4 border-t flex items-center justify-between">
          <UserButton />
          <SignOutButton>
            <button className="text-sm text-red-500 hover:text-red-600 transition">
              Logout
            </button>
          </SignOutButton>
        </div>
      )}
    </aside>
  )
}

export default Sidebar