import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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

const API_BASE_URL = "https://world.openfoodfacts.org";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchProductDetail = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/v0/product/${id}.json`
        );
        const data = response.data.product;
        setProduct({
          id: data.id || data.code,
          Common_name: data.Common_name || "N/A",
          product_name: data.product_name || "N/A",
          image_url: data.image_url || "",
          categories: data.categories || "N/A",
          ingredients_text: data.ingredients_text || "N/A",
          nutrition_grades: data.nutrition_grades || "N/A",
          barcode: data.code || "N/A",
          quantity: data.quantity || "N/A",
          packaging: data.packaging || "N/A",
          brands: data.brands || "N/A",
        });
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
      setLoading(false);
    };

    fetchProductDetail();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-7 max-w-5xl h-auto mx-auto flex flex-col lg:flex-row gap-6 items-start border rounded-xl shadow-xl bg-white mt-10">
      {product && (
        <>
          <img
            src={product.image_url}
            alt={product.product_name}
            className="w-full lg:w-1/2 h-auto lg:h-[70vh] rounded-lg object-contain shadow-md"
          />
          <div className="w-full lg:w-2/3 pt-5 lg:pt-10">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-800 leading-tight mb-4">
              {product.product_name}
            </h1>
            <div className="space-y-4 text-gray-700">
              <p>
                <span className="font-semibold">Common name:</span>{" "}
                {product.Common_name}
              </p>
              <p>
                <span className="font-semibold">Barcode:</span>{" "}
                {product.barcode}
              </p>
              <p>
                <span className="font-semibold">Quantity:</span>{" "}
                {product.quantity}
              </p>
              <p>
                <span className="font-semibold">Categories:</span>{" "}
                {product.categories}
              </p>
              <p>
                <span className="font-semibold">Ingredients:</span>{" "}
                {product.ingredients_text}
              </p>
              <p>
                <span className="font-semibold">Nutrition Grade:</span>{" "}
                {product.nutrition_grades}
              </p>
              <p>
                <span className="font-semibold">Packaging:</span>{" "}
                {product.packaging}
              </p>
              <p>
                <span className="font-semibold">Brands:</span> {product.brands}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetail;
