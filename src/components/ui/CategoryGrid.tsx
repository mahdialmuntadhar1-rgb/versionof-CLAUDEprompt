import React from 'react'

const categories = [
  { label: 'Restaurants', icon: '🍽️' },
  { label: 'Cafés', icon: '☕' },
  { label: 'Shisha', icon: '💨' },
  { label: 'Shopping', icon: '🛍️' },
  { label: 'Hotels', icon: '🏨' },
  { label: 'Cultural', icon: '🏛️' },
  { label: 'Events', icon: '🎉' },
  { label: 'Deals', icon: '🏷️' },
]

export const CategoryGrid: React.FC<{ onSelect?: (cat: string) => void }> = ({ onSelect }) => (
  <div className="grid grid-cols-4 gap-3 px-4">
    {categories.map((cat) => (
      <button
        key={cat.label}
        onClick={() => onSelect?.(cat.label)}
        className="flex flex-col items-center gap-1 p-3 rounded-xl bg-white/5 border border-yellow-500/20 hover:border-yellow-500/60 hover:bg-yellow-500/10 transition-all"
      >
        <span className="text-2xl">{cat.icon}</span>
        <span className="text-xs text-yellow-100/80 font-medium">{cat.label}</span>
      </button>
    ))}
  </div>
)
