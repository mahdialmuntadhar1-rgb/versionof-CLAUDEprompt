import React from 'react';
import { Home, Compass, Search, User } from 'lucide-react';
import { View } from '../../types';
import { cn } from '../../utils/cn';
import { motion } from 'motion/react';

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
    <nav className="md:hidden fixed bottom-6 left-6 right-6 z-50">
      <div className="bg-bg-card/60 backdrop-blur-2xl border border-white/10 rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] px-4 py-3 flex items-center justify-around">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = currentView === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={cn(
                "flex flex-col items-center gap-1.5 transition-all duration-300 relative px-4 py-2 rounded-2xl",
                isActive ? "text-gold" : "text-text-faint hover:text-text-muted"
              )}
            >
              {isActive && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gold/10 rounded-2xl border border-gold/20"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <Icon className={cn("w-5 h-5 relative z-10", isActive ? "stroke-[2.5px]" : "stroke-[2px]")} />
              <span className="text-[10px] font-black uppercase tracking-widest relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
