function Card({ children, className = "" }) {
  return (
    <div
      className={`
        bg-white/5 backdrop-blur-lg border border-white/10
        rounded-2xl p-5 shadow-lg hover:shadow-xl
        transition-all duration-300
        ${className}
      `}
    >
      {children}
    </div>
  )
}

export default Card