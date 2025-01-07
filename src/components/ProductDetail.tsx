import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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
    <div className="p-7 max-w-5xl h-[45vw] mx-auto flex gap-4 items-start pl-5 border rounded-xl shadow-xl mt-10">
      {product && (
        <>
          <img src={product.image_url} alt={product.product_name} className="w-1/2 h-[70vh] rounded object-contain" />
          <div className="w-2/3 pt-10">
            <h1 className="text-6xl leading-tight font-bold mb-2">{product.product_name}</h1>
            <p className="mb-5">
              <strong>Common name:</strong> {product.Common_name}
            </p>
            <p className="mb-5">
              <strong>Barcode:</strong> {product.barcode}
            </p>
            <p className="mb-5">
              <strong>Quantity:</strong> {product.quantity}
            </p>
            <p className="mb-5">
              <strong>Categories:</strong> {product.categories}
            </p>
            <p className="mb-5">
              <strong>Ingredients:</strong> {product.ingredients_text}
            </p>
            <p className="mb-5">
              <strong>Nutrition Grade:</strong> {product.nutrition_grades}
            </p>
            <p className="mb-5">
              <strong>Packaging:</strong> {product.packaging}
            </p>
            <p className="mb-5">
              <strong>Brands:</strong> {product.brands}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetail;
