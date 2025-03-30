import { useEffect } from 'react';

const useProductFilters = ({
  productsData,
  categories,
  searchTerm,
  selectedCategory,
  sortBy,
  searchParams = new URLSearchParams(),
  setLoading,
  setError
}) => {
  useEffect(() => {
    if (productsData && categories) {
      setLoading(false);
    }
  }, [productsData, categories, setLoading]);

  // Force re-filter when selectedCategory changes
  useEffect(() => {
    console.log('Category changed to:', selectedCategory);
  }, [selectedCategory]);

  const filteredProducts = productsData?.filter(product => {
    // Filter by search term
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    // Filter by category - find matching category ID if selectedCategory is a name
    console.log('Filtering - selected:', selectedCategory, 'product category:', product.category, 'product:', product);
    const matchesCategory = selectedCategory === 'all' || 
      product.category === selectedCategory ||
      categories?.find(c => c.id === selectedCategory)?.name === product.category;

    return matchesSearch && matchesCategory;
  }) || [];

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low-high') return a.price - b.price;
    if (sortBy === 'price-high-low') return b.price - a.price;
    return 0;
  });

  // Handle URL params for initial state
  useEffect(() => {
    try {
      const categoryParam = searchParams?.get('category');
      if (categoryParam && categories?.some(cat => cat.id === categoryParam)) {
        setSelectedCategory(categoryParam);
      }
    } catch (error) {
      console.error('Error processing URL params:', error);
      setError('Failed to process URL filters');
    }
  }, [searchParams, categories]);

  return { sortedProducts };
};

export default useProductFilters;
