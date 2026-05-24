export default function GlassCard({ children, className = '', glow, style = {}, ...props }) {
  const glowStyles = {}

  if (glow === 'right') {
    glowStyles.boxShadow = '8px 0 40px rgba(0, 212, 170, 0.08), 0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
  } else if (glow === 'left') {
    glowStyles.boxShadow = '-8px 0 40px rgba(0, 144, 255, 0.08), 0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
  }

  return (
    <div
      className={`glass-card ${className}`}
      style={{ ...glowStyles, ...style }}
      {...props}
    >
      {children}
    </div>
  )
}
