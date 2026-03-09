import { useState, useMemo, useCallback } from 'react';
import { Business, Category } from '../types';
import { MOCK_BUSINESSES } from '../constants';

export function useBusinesses() {
  const [businesses] = useState<Business[]>(MOCK_BUSINESSES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedGovernorate, setSelectedGovernorate] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [loading] = useState(false);

  const filtered = useMemo(() => {
    return businesses.filter(b => {
      const matchesSearch = searchQuery === '' || 
        b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.nameAr.includes(searchQuery) ||
        b.nameKu.includes(searchQuery) ||
        b.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = !selectedCategory || b.category === selectedCategory;
      const matchesGovernorate = !selectedGovernorate || b.governorate === selectedGovernorate;
      const matchesCity = !selectedCity || b.city === selectedCity;

      return matchesSearch && matchesCategory && matchesGovernorate && matchesCity;
    });
  }, [businesses, searchQuery, selectedCategory, selectedGovernorate, selectedCity]);

  const setSearch = useCallback((q: string) => setSearchQuery(q), []);
  const setCategory = useCallback((c: Category | null) => setSelectedCategory(c), []);
  const setGovernorate = useCallback((g: string | null) => setSelectedGovernorate(g), []);
  const setCity = useCallback((c: string | null) => setSelectedCity(c), []);
  
  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedGovernorate(null);
    setSelectedCity(null);
  }, []);

  const getFeatured = useCallback(() => businesses.filter(b => b.isFeatured), [businesses]);
  const getByCategory = useCallback((c: Category) => businesses.filter(b => b.category === c), [businesses]);
  const getById = useCallback((id: string) => businesses.find(b => b.id === id), [businesses]);

  return {
    businesses,
    filtered,
    loading,
    searchQuery,
    selectedCategory,
    selectedGovernorate,
    selectedCity,
    setSearch,
    setCategory,
    setGovernorate,
    setCity,
    clearFilters,
    getFeatured,
    getByCategory,
    getById,
    resultCount: filtered.length
  };
}
