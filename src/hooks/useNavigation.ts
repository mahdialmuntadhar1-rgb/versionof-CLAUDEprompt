import { useState, useCallback } from 'react';
import { View } from '../types';

export const useNavigation = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [history, setHistory] = useState<View[]>([]);

  const navigate = useCallback((view: View) => {
    setHistory(prev => [...prev, currentView]);
    setCurrentView(view);
  }, [currentView]);

  const goHome = useCallback(() => navigate('home'), [navigate]);
  const goBrowse = useCallback(() => navigate('browse'), [navigate]);
  const goDetail = useCallback((businessId: string) => {
    setSelectedBusinessId(businessId);
    navigate('detail');
  }, [navigate]);
  const goSearch = useCallback((query: string) => {
    setSearchQuery(query);
    navigate('search');
  }, [navigate]);

  const goBack = useCallback(() => {
    if (history.length > 0) {
      const prevView = history[history.length - 1];
      setHistory(prev => prev.slice(0, -1));
      setCurrentView(prevView);
    } else {
      setCurrentView('home');
    }
  }, [history]);

  return {
    currentView,
    selectedBusinessId,
    searchQuery,
    navigate,
    goHome,
    goBrowse,
    goDetail,
    goSearch,
    goBack
  };
};
