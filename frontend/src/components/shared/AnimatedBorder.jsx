export default function AnimatedBorder({ children, className = '' }) {
  return (
    <div className={`animated-border-wrapper ${className}`}>
      {children}
    </div>
  )
}
