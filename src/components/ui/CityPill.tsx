import React from 'react'

const cities = ['All', 'Baghdad', 'Erbil', 'Sulaymaniyah', 'Basra', 'Najaf', 'Karbala', 'Mosul']

export const CityPill: React.FC<{ selected: string; onSelect: (city: string) => void }> = ({ selected, onSelect }) => (
  <div className="flex gap-2 overflow-x-auto px-4 pb-1 scrollbar-hide">
    {cities.map((city) => (
      <button
        key={city}
        onClick={() => onSelect(city)}
        className={shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition-all }
      >
        {city}
      </button>
    ))}
  </div>
)
