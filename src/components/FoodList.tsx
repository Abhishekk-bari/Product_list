import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import { Link, BrowserRouter as Router } from 'react-router-dom';

interface Product {
  id: string;
  product_name: string;
  image_url: string;
  categories: string;
  ingredients_text: string;
  nutrition_grades: string;
}

const API_BASE_URL = 'https://world.openfoodfacts.org';

const FoodProductApp: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [barcodeQuery, setBarcodeQuery] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  // Debounced fetch products with pagination
  const fetchProducts = useCallback(
    async () => {
      setLoading(true);
      try {
        const categoryEndpoint = selectedCategory
          ? `/category/${selectedCategory}.json`
          : `/cgi/search.pl?search_terms=${searchQuery}&json=true`;

        const response = await axios.get(`${API_BASE_URL}${categoryEndpoint}&page=${page}`);
        const newProducts = response.data.products.map((product: any) => ({
          id: product.id || product.code,
          product_name: product.product_name || 'N/A',
          image_url: product.image_url || '',
          categories: product.categories || 'N/A',
          ingredients_text: product.ingredients_text || 'N/A',
          nutrition_grades: product.nutrition_grades || 'N/A',
        }));

        setProducts(newProducts);
        setHasMore(newProducts.length > 0);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
      setLoading(false);
    },
    [searchQuery, selectedCategory, page]
  );

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories.json`);
      const categoryNames = response.data.tags.map((tag: any) => tag.name);
      setCategories(categoryNames);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Fetch product by barcode
  const fetchProductByBarcode = async () => {
    if (!barcodeQuery) return;
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/v0/product/${barcodeQuery}.json`);
      const product = response.data.product;
      setProducts([
        {
          id: product.id || product.code,
          product_name: product.product_name || 'N/A',
          image_url: product.image_url || '',
          categories: product.categories || 'N/A',
          ingredients_text: product.ingredients_text || 'N/A',
          nutrition_grades: product.nutrition_grades || 'N/A',
        },
      ]);
    } catch (error) {
      console.error('Error fetching product by barcode:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1);
    setProducts([]);
    setHasMore(true);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setPage(1);
    setProducts([]);
    setHasMore(true);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
    const sortedProducts = [...products];

    if (e.target.value === 'name-asc') {
      sortedProducts.sort((a, b) => a.product_name.localeCompare(b.product_name));
    } else if (e.target.value === 'name-desc') {
      sortedProducts.sort((a, b) => b.product_name.localeCompare(a.product_name));
    } else if (e.target.value === 'nutrition-asc') {
      sortedProducts.sort((a, b) => a.nutrition_grades.localeCompare(b.nutrition_grades));
    } else if (e.target.value === 'nutrition-desc') {
      sortedProducts.sort((a, b) => b.nutrition_grades.localeCompare(a.nutrition_grades));
    }

    setProducts(sortedProducts);
  };

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (
    <Router>
      <div className="p-4 max-w-7xl mx-auto pt-10">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={handleSearch}
            className="border border-black p-2 rounded w-full max-w-sm"
          />
          <input
            type="text"
            placeholder="Search by barcode..."
            value={barcodeQuery}
            onChange={(e) => setBarcodeQuery(e.target.value)}
            className="border border-black p-2 max-w-sm rounded ml-2"
          />
          <button
            onClick={fetchProductByBarcode}
            className="ml-2 bg-blue-500 text-white p-2 rounded"
          >
            Search
          </button>
        </div>

        <div className="flex space-x-4 mb-4">
          <select
            className="border p-2 rounded"
            onChange={handleCategoryChange}
            value={selectedCategory}
          >
            <option value="">All Categories</option>
            {categories.map((category, index) => (
              <option key={`${category}-${index}`} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            className="border p-2 rounded"
            onChange={handleSortChange}
            value={sortOption}
          >
            <option value="">Sort By</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="nutrition-asc">Nutrition Grade (A-E)</option>
            <option value="nutrition-desc">Nutrition Grade (E-A)</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className="border rounded p-4 shadow-lg hover:shadow-xl">
              <img
                src={product.image_url}
                alt={product.product_name}
                className="w-full h-40 object-cover mb-4 rounded"
              />
              <h2 className="text-lg font-bold mb-2">{product.product_name}</h2>
              <p className="text-sm mb-1"><span className="font-semibold text-base">Category: </span>{product.categories}</p>
              <p className="text-sm"><span className="font-semibold text-base">Nutrition Grade: </span>{product.nutrition_grades}</p>
            </Link>
          ))}
        </div>

        {loading && <p className="text-center mt-4">Loading...</p>}
        
        <div className="flex justify-center mt-4 space-x-2">
          {[1, 2, 3, 4, 5].map((p) => (
            <button key={p} onClick={() => handlePageChange(p)} className={`p-2 rounded ${p === page ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>{p}</button>
          ))}
        </div>
      </div>
    </Router>
  );
};

export default FoodProductApp;


