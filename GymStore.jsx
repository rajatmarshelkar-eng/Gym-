import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from './ProductCard';

const PRODUCTS = [
  {
    id: 1,
    name: "Whey Protein Isolate",
    brand: "MuscleBuild",
    price: 4999,
    originalPrice: 5999,
    offer: "15% OFF",
    image: "https://via.placeholder.com/200?text=Protein",
    category: "Protein"
  },
  {
    id: 2,
    name: "Micronized Creatine",
    brand: "PureGains",
    price: 1999,
    originalPrice: 2499,
    offer: "BOGO 50%",
    image: "https://via.placeholder.com/200?text=Creatine",
    category: "Supplements"
  },
  {
    id: 3,
    name: "Pre-Workout Explosion",
    brand: "EnergyX",
    price: 2899,
    originalPrice: 2899,
    offer: "Free Shaker Bottle",
    image: "https://via.placeholder.com/200?text=PreWorkout",
    category: "Energy"
  },
  {
    id: 4,
    name: "Mass Gainer Pro",
    brand: "MuscleBuild",
    price: 3699,
    originalPrice: 4499,
    offer: "Price Drop",
    image: "https://via.placeholder.com/200?text=MassGainer",
    category: "Protein"
  },
  {
    id: 5,
    name: "BCAA Recovery 2:1:1",
    brand: "AminoElite",
    price: 2499,
    originalPrice: 3299,
    offer: "25% OFF",
    image: "https://via.placeholder.com/200?text=BCAA",
    category: "Recovery"
  },
  {
    id: 6,
    name: "Casein Night Protein",
    brand: "PureGains",
    price: 4499,
    originalPrice: 4499,
    offer: "Buy 2 Get 1",
    image: "https://via.placeholder.com/200?text=Casein",
    category: "Protein"
  }
];

const GymStore = ({ setActive, cart = [], setCart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const addToCart = (product) => {
    if (setCart) setCart((prev) => [...prev, product]);
    alert(`${product.name} added to cart!`);
  };

  const categories = ['All', ...new Set(PRODUCTS.map(p => p.category))];

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ padding: '112px 40px 80px 40px', fontFamily: "'Barlow', sans-serif", backgroundColor: '#0B0B0B', minHeight: '100vh' }}>
      <header style={{ marginBottom: '60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1 style={{ margin: 0, fontFamily: "'Oswald', sans-serif", fontSize: '3rem', textTransform: 'uppercase' }}>
            <span style={{
              background: `linear-gradient(
                to bottom,
                #cfd1d3 0%,
                #e7e9eb 20%,
                #afb2b5 40%,
                #717377 50%,
                #cfd1d3 70%,
                #ffffff 80%,
                #9a9da0 100%
              )`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block',
            }}>Elite</span>{' '}
            <span style={{
              background: `linear-gradient(to bottom, #FFD700 0%, #FFEC8B 20%, #DAA520 40%, #B8860B 50%, #FFD700 70%, #FFFACD 80%, #B8860B 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block',
            }}>Supplements</span>
          </h1>
        </div>

        {/* Search and Filter Section */}
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Search products or brands..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '14px 18px',
              borderRadius: '8px',
              border: '1px solid rgba(201, 160, 61, 0.4)',
              backgroundColor: 'rgba(255, 255, 255, 0.07)',
              color: '#F5F5F5',
              width: '100%',
              maxWidth: '300px',
              fontSize: '1rem'
            }}
          />
          
          <div style={{ display: 'flex', gap: '10px' }}>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: `1px solid ${selectedCategory === category ? '#C9A03D' : '#333'}`,
                  backgroundColor: selectedCategory === category ? '#C9A03D' : 'transparent',
                  color: selectedCategory === category ? '#1E1E1E' : '#9E9E9E',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  boxShadow: selectedCategory === category ? '0 0 15px rgba(201, 160, 61, 0.4)' : 'none',
                  transition: 'all 0.2s'
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </header>

      <motion.div 
        layout
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: '25px' 
        }}
      >
        <AnimatePresence>
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAdd={addToCart} 
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProducts.length === 0 && (
        <div style={{ textAlign: 'center', marginTop: '50px', color: '#888' }}>
          <h2>No products found matching your search.</h2>
        </div>
      )}
    </div>
  );
};

export default GymStore;