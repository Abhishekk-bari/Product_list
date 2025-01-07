import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link, BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';

interface Product {
  id: string;
  product_name: string;
  Common_name: string;
  image_url: string;
  categories: string;
  ingredients_text: string;
  nutrition_grades: string;
  barcode?: string;
  quantity: string;
  packaging?: string;
  brands?: string;
}

const API_BASE_URL = 'https://world.openfoodfacts.org';

const FoodProductApp: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [barcodeQuery, setBarcodeQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchProducts = useCallback(
    async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${API_BASE_URL}/cgi/search.pl?search_terms=${searchQuery}&json=true&page=${page}`
        );
        const newProducts = response.data.products.map((product: any) => ({
          id: product.id || product.code,
          product_name: product.product_name || 'N/A',
          Common_name: product.Common_name || 'N/A',
          quantity: product.quantity || 'N/A',          
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
    [searchQuery, page]
  );

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
          Common_name: product.Common_name || 'N/A',
          quantity: product.quantity || 'N/A',          
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
    fetchProducts();
  }, [fetchProducts]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1);
    setProducts([]);
    setHasMore(true);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="p-4 max-w-6xl mx-auto pt-10">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                  <Link
                    to={`/product/${product.id}`}
                    key={product.id}
                    className="border rounded p-4 shadow-lg hover:shadow-xl "
                  >
                    <img
                      src={product.image_url}
                      alt={product.product_name}
                      className="w-full h-40 object-contain mb-4 rounded"
                    />
                    <h2 className="text-lg font-semibold mb-2">{product.product_name}, {product.quantity}</h2>
                    {/* <p className='text-lg font-semibold'> </p> */}
                  </Link>
                ))}
              </div>
              {loading && <p className="text-center mt-4">Loading...</p>}
            </div>
          }
        />

        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
};

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchProductDetail = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/api/v0/product/${id}.json`);
        const data = response.data.product;
        setProduct({
          id: data.id || data.code,
          Common_name: data.Common_name || 'N/A',
          product_name: data.product_name || 'N/A',
          image_url: data.image_url || '',
          categories: data.categories || 'N/A',
          ingredients_text: data.ingredients_text || 'N/A',
          nutrition_grades: data.nutrition_grades || 'N/A',
          barcode: data.code || 'N/A',
          quantity: data.quantity || 'N/A',
          packaging: data.packaging || 'N/A',
          brands: data.brands || 'N/A',
        });
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
      setLoading(false);
    };

    fetchProductDetail();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-7 max-w-6xl mx-auto flex gap-4 items-start pl-5 border rounded-xl shadow-xl">
      {product && (
        <>
          <img src={product.image_url} alt={product.product_name} className="w-1/2 h-[70vh] rounded object-contain" />
          <div className="w-2/3">
            <h1 className="text-6xl leading-loose font-bold mb-2">{product.product_name}</h1>
            <p className="mb-5"><strong>Common name:</strong> {product.Common_name}</p>
            <p className="mb-5"><strong>Barcode:</strong> {product.barcode}</p>
            <p className="mb-5"><strong>Quantity:</strong> {product.quantity}</p>
            <p className="mb-5"><strong>Categories:</strong> {product.categories}</p>
            <p className="mb-5"><strong>Ingredients:</strong> {product.ingredients_text}</p>
            <p className="mb-5"><strong>Nutrition Grade:</strong> {product.nutrition_grades}</p>
            <p className="mb-5"><strong>Packaging:</strong> {product.packaging}</p>
            <p className="mb-5"><strong>Brands:</strong> {product.brands}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default FoodProductApp;
