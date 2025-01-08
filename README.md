# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Food Product Application
Description
This is a Food Product Application that fetches product data from the OpenFoodFacts API and displays it to users. The app includes features like searching for products by name or barcode, viewing product details, lazy-loading images, and filtering products by category.

## Tech Stack

Frontend Framework: React
Language: TypeScript
Styling: Tailwind CSS
API: OpenFoodFacts API
Routing: React Router

## Features
1. Search by Product Name
Users can search for products by entering a query in the search bar. The app fetches results dynamically from the API.
2. Search by Barcode
Users can input a barcode to search for a specific product. This fetches and displays the corresponding product details.
3. Lazy Loading Images
Images in the product list are loaded lazily using the react-lazy-load-image-component package, improving performance and reducing initial load time.
4. Category Filtering
The app provides a dropdown or filter for users to filter products by categories such as beverages, dairy, and snacks. The categories are dynamically fetched from the OpenFoodFacts API.
5. Pagination
The app fetches products in a paginated manner to handle large datasets efficiently. Users can view more results by navigating through pages.
6. Product Detail View
Clicking on a product displays its detailed information, including:
Name -> Common name -> Barcode -> Quantity -> Categories -> Ingredients -> Nutrition grade -> Packaging -> Brand

# Libraries and Tools Used

React: For building the UI components and managing state.
TypeScript: For type safety and enhanced developer experience.
React Router: For managing routes and navigation.
Axios: For making HTTP requests to the OpenFoodFacts API.
react-lazy-load-image-component: For implementing lazy loading of images.
Tailwind CSS: For fast and responsive styling.

# Setup Instructions
Clone the repository:

git clone https://github.com/your-repo-url
Navigate to the project directory:

cd food-product-app
Install dependencies:

npm install
Start the development server:

npm run dev
Open the app in your browser at http://localhost:5173.

# Folder Structure
.
├── src
│   ├── components
    ├── Skeleton
    ├── Star
    ├── Ui
│   │   ├── Banner.tsx
|   |   ├── Category.tsx
|   |   ├── Hero.tsx
|   |   ├──FoodList.tsx  # Main component for product listing
│   │   └── ProductDetail.tsx  # Component for product detail view
│   ├── styles
│   │   └── tailwind.css  # Tailwind CSS configuration
│   └── App.tsx  # Root component
├── public
│   └── index.html  # Entry HTML file
├── README.md  # Project documentation
├── tsconfig.json  # TypeScript configuration
└── package.json  # Dependencies and scripts

# Issues Addressed

1. Duplicate Key Warning
Fixed by ensuring unique keys in the product list using a combination of product.id and array index as the key.
2. Performance Issues
Resolved by implementing lazy loading for images using react-lazy-load-image-component.

3. Module Typing Error
Resolved by adding a custom TypeScript declaration for react-lazy-load-image-component:

declare module 'react-lazy-load-image-component';
Future Enhancements
Add user authentication for personalized experiences.

Implement advanced filtering options (e.g., nutritional values, brands).

Optimize API requests with caching or GraphQL.

Contributors
Abhishek B.
