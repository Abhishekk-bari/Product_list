import './App.css';
import { Banner } from './components/Banner';
import HeroSection from './components/Hero';
import Navbar from './components/Navbar';
import FoodList from './components/FoodList';
import ProductDetail from './components/ProductDetail';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Banner />
      <Navbar />
      <HeroSection />
      <Router>
        <Routes>
          <Route path="/" element={<FoodList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
