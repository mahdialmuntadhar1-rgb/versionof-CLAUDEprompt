import React from 'react';
import { Home, Compass, Search, User } from 'lucide-react';
import { View } from '../../types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface BottomNavProps {
  currentView: View;
  onNavigate: (view: View) => void;
  t: (key: string) => string;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentView, onNavigate, t }) => {
  const tabs = [
    { id: 'home' as View, icon: Home, label: t('home') },
    { id: 'browse' as View, icon: Compass, label: t('browse') },
    { id: 'search' as View, icon: Search, label: t('search') },
    { id: 'profile' as View, icon: User, label: t('profile') },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-bg-deep/96 backdrop-blur-xl border-t border-border-custom z-50 md:hidden pb-safe">
      <div className="flex h-full">
        {tabs.map((tab) => {
          const isActive = currentView === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className="flex-1 flex flex-col items-center justify-center relative"
            >
              {isActive && (
                <div className="absolute top-0 left-1/4 right-1/4 h-0.5 bg-gold rounded-full" />
              )}
              <Icon className={cn(
                "w-5 h-5 transition-colors",
                isActive ? "text-gold" : "text-text-faint"
              )} />
              <span className={cn(
                "text-[10px] mt-1 font-medium transition-colors",
                isActive ? "text-gold" : "text-text-faint"
              )}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
