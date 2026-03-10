import React from 'react'

export const SkeletonCard: React.FC = () => (
  <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden animate-pulse">
    <div className="h-40 bg-white/10" />
    <div className="p-3 space-y-2">
      <div className="h-4 bg-white/10 rounded w-3/4" />
      <div className="h-3 bg-white/10 rounded w-1/2" />
    </div>
  </div>
)

export const SkeletonList: React.FC<{ count?: number }> = ({ count = 4 }) => (
  <div className="grid grid-cols-2 gap-3 px-4">
    {Array.from({ length: count }).map((_, i) => <SkeletonCard key={i} />)}
  </div>
)
