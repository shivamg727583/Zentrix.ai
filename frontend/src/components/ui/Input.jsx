function Input({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={`
        w-full px-4 py-2 rounded-lg
        bg-white/5 border border-white/10
        text-white placeholder-gray-400
        focus:ring-2 focus:ring-indigo-500
        outline-none transition
        ${className}
      `}
    />
  )
}

export default Input