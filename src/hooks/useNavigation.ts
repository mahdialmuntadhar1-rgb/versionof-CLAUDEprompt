import { useState, useCallback } from 'react';
import { View } from '../types';

export function useNavigation() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [history, setHistory] = useState<View[]>(['home']);

  const navigate = useCallback((view: View) => {
    setHistory(prev => [...prev, view]);
    setCurrentView(view);
    window.scrollTo(0, 0);
  }, []);

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
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      const prevView = newHistory[newHistory.length - 1];
      setHistory(newHistory);
      setCurrentView(prevView);
    } else {
      setCurrentView('home');
    }
  }, [history]);

  return {
    currentView,
    selectedBusinessId,
    searchQuery,
    goHome,
    goBrowse,
    goDetail,
    goSearch,
    goBack,
    navigate
  };
}
