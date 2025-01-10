import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SkeletonLoader from "../components/skeleton/Skeleton";
import StarRating from "../components/star/StarRating"; 
import { Button } from "@/components/ui/button";
import Category from "./Category";

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

const FoodList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [barcodeQuery, setBarcodeQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>(""); // Sorting state

  // Fetch products based on search query, category, and barcode
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const endpoint = barcodeQuery
        ? `${API_BASE_URL}/api/v0/product/${barcodeQuery}.json`
        : `${API_BASE_URL}/cgi/search.pl`;

      const params = barcodeQuery
        ? {}
        : {
            search_terms: searchQuery,
            json: true,
            page,
            ...(selectedCategory && {
              page_size: 5,
              tagtype_0: "categories",
              tag_contains_0: "contains",
              tag_0: selectedCategory,
            }),
          };

      const response = await axios.get(endpoint, { params });

      let newProducts: string | any[] = [];
      if (barcodeQuery) {
        const product = response.data.product;
        if (product) {
          newProducts = [
            {
              id: product.id || product.code,
              product_name: product.product_name || "N/A",
              Common_name: product.Common_name || "N/A",
              quantity: product.quantity || "N/A",
              image_url: product.image_url || "",
              categories: product.categories || "N/A",
              ingredients_text: product.ingredients_text || "N/A",
              nutrition_grades: product.nutrition_grades || "N/A",
              barcode: product.code || "N/A",
            },
          ];
        }
      } else {
        newProducts = response.data.products.map((product: any) => ({
          id: product.id || product.code,
          product_name: product.product_name || "N/A",
          Common_name: product.Common_name || "N/A",
          quantity: product.quantity || "N/A",
          image_url: product.image_url || "",
          categories: product.categories || "N/A",
          ingredients_text: product.ingredients_text || "N/A",
          nutrition_grades: product.nutrition_grades || "N/A",
          barcode: product.code || "N/A",
        }));
      }

      setProducts((prevProducts) => {
        const uniqueProducts = [...prevProducts, ...newProducts].filter(
          (product, index, self) =>
            index === self.findIndex((p) => p.id === product.id)
        );
        return uniqueProducts;
      });
      setHasMore(newProducts.length > 0);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  }, [searchQuery, barcodeQuery, page, selectedCategory]);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories.json`);
      const categoryList = response.data.tags.map((tag: any) => tag.name);
      setCategories(categoryList);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setPage(1);
    setProducts([]); // Clear previous results
    setHasMore(true);
  };

  // Sort products based on selected option
  const sortProducts = (products: Product[]) => {
    if (sortOption === "name-asc") {
      return [...products].sort((a, b) =>
        a.product_name.localeCompare(b.product_name)
      );
    }
    if (sortOption === "name-desc") {
      return [...products].sort((a, b) =>
        b.product_name.localeCompare(a.product_name)
      );
    }
    if (sortOption === "nutrition-asc") {
      return [...products].sort((a, b) =>
        a.nutrition_grades.localeCompare(b.nutrition_grades)
      );
    }
    if (sortOption === "nutrition-desc") {
      return [...products].sort((a, b) =>
        b.nutrition_grades.localeCompare(a.nutrition_grades)
      );
    }
    return products;
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, page]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1);
    setProducts([]);
    setHasMore(true);
  };

  const handleBarcodeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBarcodeQuery(e.target.value);
    setPage(1);
    setProducts([]);
    setHasMore(true);
  };

  const sortedProducts = sortProducts(products);

  const handleScroll = useCallback(() => {
    const scrollPosition =
      window.innerHeight + document.documentElement.scrollTop;
    const bottomOffset = document.documentElement.offsetHeight - 100;

    if (scrollPosition >= bottomOffset && !loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [loading, hasMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
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
          onChange={handleBarcodeSearch}
          className="border border-black p-2 rounded w-full max-w-sm ml-2"
        />
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="border border-black p-2 rounded ml-2"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border border-black p-2 rounded ml-2"
        >
          <option value="">Sort By</option>
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="nutrition-asc">Nutrition Grade (Asc)</option>
          <option value="nutrition-desc">Nutrition Grade (Desc)</option>
        </select>
      </div>

      <div className="">
        <Category />
      </div>
      <h1 className="text-4xl pb-10 pt-10 font-bold">Popular Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 bg-gray-50 rounded-3xl">
        {loading
          ? Array.from({ length: 10 }).map((_, index) => (
              <SkeletonLoader key={index} />
            ))
          : sortedProducts.map((product) => (
              <Link
                to={`/product/${product.id}`}
                key={product.id}
                className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white"
              >
                <img
                  src={product.image_url}
                  alt={product.product_name}
                  loading="lazy"
                  className="w-full h-40 object-contain mb-4 rounded-lg"
                />
                <h2 className="text-lg font-bold mb-2 text-gray-800">
                  {product.product_name}
                </h2>
                <p className="text-sm text-gray-600 mb-1">
                  Quantity: {product.quantity}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  Grade: {product.nutrition_grades}
                </p>
                <div className="flex items-center justify-between">
                  <StarRating rating={4.2} />
                  <Button className="border border-green-500 bg-green-100 text-green-600 rounded-lg px-3 py-1 hover:bg-green-200 transition-colors duration-200">
                    Add to cart
                  </Button>
                </div>
              </Link>
            ))}
      </div>

      {/* {loading && <p className="text-center mt-4">Loading...</p>} */}
      <div className="text-center mt-4">
        {hasMore && !loading && (
          <button
            onClick={() => setPage((prevPage) => prevPage + 1)}
            className="px-4 py-2 bg-black-500 text-white rounded"
          >
            Load More
          </button>
        )}
        {loading && <p className="text-center">Loading...</p>}
      </div>
    </div>
  );
};

export default FoodList;
