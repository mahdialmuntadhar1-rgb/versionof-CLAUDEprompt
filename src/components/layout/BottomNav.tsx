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
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-bg-card/80 backdrop-blur-2xl border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] pb-[env(safe-area-inset-bottom)]">
      <div className="max-w-md mx-auto px-2 py-3 flex items-center justify-around">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = currentView === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={cn(
                "flex flex-col items-center gap-1 transition-all duration-300 relative px-2 py-1.5 rounded-xl min-w-[64px] min-h-[44px] justify-center",
                isActive ? "text-gold" : "text-text-faint hover:text-text-muted"
              )}
            >
              {isActive && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gold/10 rounded-xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <Icon className={cn("w-5 h-5 relative z-10", isActive ? "stroke-[2.5px]" : "stroke-[2px]")} />
              <span className="text-[9px] font-black uppercase tracking-tight relative z-10 truncate max-w-[60px]">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
