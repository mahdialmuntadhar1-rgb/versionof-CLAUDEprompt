import { useState, useMemo } from 'react';
import { Business, Category } from '../types';
import { MOCK_BUSINESSES } from '../constants';

export const useBusinesses = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedGovernorate, setSelectedGovernorate] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const filtered = useMemo(() => {
    return MOCK_BUSINESSES.filter(b => {
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
  }, [searchQuery, selectedCategory, selectedGovernorate, selectedCity]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedGovernorate(null);
    setSelectedCity(null);
  };

  const getFeatured = () => MOCK_BUSINESSES.filter(b => b.isFeatured);
  const getByCategory = (c: Category) => MOCK_BUSINESSES.filter(b => b.category === c);
  const getById = (id: string) => MOCK_BUSINESSES.find(b => b.id === id);

  return {
    businesses: MOCK_BUSINESSES,
    filtered,
    loading,
    searchQuery,
    selectedCategory,
    setSearch: setSearchQuery,
    setCategory: setSelectedCategory,
    setGovernorate: setSelectedGovernorate,
    setCity: setSelectedCity,
    clearFilters,
    getFeatured,
    getByCategory,
    getById,
    resultCount: filtered.length
  };
};
