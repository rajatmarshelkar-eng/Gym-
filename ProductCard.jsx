import React from 'react';
import { motion } from 'framer-motion';

const ProductCard = ({ product, onAdd }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -10 }}
      style={{
        background: '#141417',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'border-color 0.3s'
      }}
      className="group hover:border-[#D4AF37]/30"
    >
      <div style={{ position: 'relative', height: '220px', overflow: 'hidden', backgroundColor: '#0B0B0B' }}>
        <img 
          src={product.image} 
          alt={product.name} 
          style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '20px' }}
          className="transition-transform duration-500 group-hover:scale-110"
        />
        {product.offer && (
          <div style={{ position: 'absolute', top: '15px', right: '15px', background: '#FF4500', color: '#fff', fontSize: '0.7rem', fontWeight: '900', padding: '4px 10px', borderRadius: '4px', letterSpacing: '1px' }}>
            {product.offer}
          </div>
        )}
      </div>
      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <span style={{ color: '#D4AF37', fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '5px' }}>{product.brand}</span>
        <h3 style={{ color: '#F5F5F5', margin: '0 0 15px 0', fontSize: '1.1rem', fontFamily: "'Oswald', sans-serif", textTransform: 'uppercase' }}>{product.name}</h3>
        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: '#F5F5F5', fontSize: '1.25rem', fontWeight: '900' }}>₹{product.price}</span>
            {product.originalPrice > product.price && (
              <span style={{ color: '#8C8C8C', fontSize: '0.8rem', textDecoration: 'line-through', marginLeft: '10px' }}>₹{product.originalPrice}</span>
            )}
          </div>
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => onAdd(product)} style={{ background: '#D4AF37', color: '#0B0B0B', border: 'none', width: '40px', height: '40px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 'bold' }}>+</motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;