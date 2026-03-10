import React from 'react'

interface EmptyStateProps {
  icon?: string
  title: string
  subtitle?: string
  actionLabel?: string
  onAction?: () => void
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon = '🏙️', title, subtitle, actionLabel, onAction }) => (
  <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
    <span className="text-5xl mb-4">{icon}</span>
    <h3 className="text-lg font-semibold text-yellow-100 mb-2">{title}</h3>
    {subtitle && <p className="text-sm text-white/50 mb-6">{subtitle}</p>}
    {actionLabel && onAction && (
      <button
        onClick={onAction}
        className="px-6 py-2 rounded-full bg-yellow-500 text-black font-semibold text-sm hover:bg-yellow-400 transition-all"
      >
        {actionLabel}
      </button>
    )}
  </div>
)
