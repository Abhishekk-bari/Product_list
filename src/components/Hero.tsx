import React from 'react';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  return (
    <section className="bg-green-50 pt-10 flex items-center justify-center">
      <div className="mx-auto text-center ">
        <motion.h1 
          className="text-6xl font-extrabold text-green-700 "
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Discover Your Next Favorite Food!
        </motion.h1>
        <motion.p 
          className="text-lg text-zinc-800 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Explore a variety of food products with detailed insights and reviews.
        </motion.p>
      </div>
    </section>
  );
};

export default HeroSection;
