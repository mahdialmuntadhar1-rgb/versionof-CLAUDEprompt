import { useEffect } from 'react';
import { useLanguage } from './hooks/useLanguage';
import { useNavigation } from './hooks/useNavigation';
import { useBusinesses } from './hooks/useBusinesses';
import { useToast } from './hooks/useToast';
import { Header } from './components/layout/Header';
import { BottomNav } from './components/layout/BottomNav';
import { Toast } from './components/ui/Toast';
import { HomeView } from './components/views/HomeView';
import { BrowseView } from './components/views/BrowseView';
import { DetailView } from './components/views/DetailView';
import { SearchView } from './components/views/SearchView';
import { CATEGORIES, CITIES, GOVERNORATES } from './constants';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const { language, setLanguage, isRTL, t } = useLanguage();
  const { 
    currentView, 
    selectedBusinessId, 
    searchQuery: navSearchQuery, 
    goHome, 
    goBrowse, 
    goDetail, 
    goSearch, 
    goBack,
    navigate 
  } = useNavigation();
  
  const { 
    filtered, 
    setSearch, 
    setCategory, 
    setGovernorate, 
    setCity, 
    clearFilters, 
    getFeatured, 
    getById,
    selectedCategory
  } = useBusinesses();
  
  const { message, visible, showToast } = useToast();

  // Handle search from header or home
  const handleSearch = (query: string) => {
    setSearch(query);
    goSearch(query);
  };

  const handleCategorySelect = (categoryId: any) => {
    setCategory(categoryId);
    goBrowse();
  };

  const handleCitySelect = (locationId: string) => {
    if (GOVERNORATES.includes(locationId)) {
      setGovernorate(locationId);
      setCity(null);
    } else {
      setCity(locationId);
      setGovernorate(null);
    }
    goBrowse();
  };

  const handleLogoClick = () => {
    clearFilters();
    goHome();
  };

  // Sync business search state with navigation search state
  useEffect(() => {
    if (currentView === 'search') {
      setSearch(navSearchQuery);
    }
  }, [currentView, navSearchQuery, setSearch]);

  return (
    <div 
      style={{ background: '#07090F', minHeight: '100vh' }}
      data-reduced-motion="user-preference"
      dir={isRTL ? 'rtl' : 'ltr'}
      className="text-text-white selection:bg-gold/30"
    >
      <Header 
        language={language}
        onLanguageChange={setLanguage}
        onSearch={handleSearch}
        onLogoClick={handleLogoClick}
        searchValue={navSearchQuery}
        t={t}
      />

      <main className="pt-16 pb-20 md:pb-0 min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView + (selectedBusinessId || '')}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {currentView === 'home' && (
              <HomeView 
                language={language}
                t={t}
                onSearch={handleSearch}
                onCategorySelect={handleCategorySelect}
                onCitySelect={handleCitySelect}
                onSelectBusiness={goDetail}
                featuredBusinesses={getFeatured()}
                categories={CATEGORIES}
                cities={CITIES}
              />
            )}

            {currentView === 'browse' && (
              <BrowseView 
                language={language}
                t={t}
                businesses={filtered}
                categories={CATEGORIES}
                selectedCategory={selectedCategory}
                onCategorySelect={setCategory}
                onSelectBusiness={goDetail}
                onClearFilters={clearFilters}
              />
            )}

            {currentView === 'detail' && selectedBusinessId && (
              <DetailView 
                business={getById(selectedBusinessId)!}
                language={language}
                t={t}
                onBack={goBack}
                onSelectBusiness={goDetail}
              />
            )}

            {currentView === 'search' && (
              <SearchView 
                query={navSearchQuery}
                results={filtered}
                language={language}
                t={t}
                onSearch={handleSearch}
                onSelectBusiness={goDetail}
                onBrowseAll={goBrowse}
              />
            )}

            {currentView === 'profile' && (
              <div className="flex flex-col items-center justify-center py-40 text-center px-4">
                <div className="w-20 h-20 rounded-full bg-bg-elevated border border-border-custom flex items-center justify-center mb-6">
                  <div className="w-10 h-10 rounded-full bg-gold/20" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Guest Profile</h2>
                <p className="text-text-muted mb-8">Sign in to save your favorite places and write reviews.</p>
                <button className="btn-gold" onClick={() => showToast("Sign in feature coming soon!")}>
                  Sign In / Register
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <BottomNav 
        currentView={currentView}
        onNavigate={navigate}
        t={t}
      />

      <Toast message={message} visible={visible} />
    </div>
  );
}
