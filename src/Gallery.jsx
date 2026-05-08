import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const photos = [
    { id: 1, url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600', alt: 'Gym Racks' },
    { id: 2, url: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=600', alt: 'Weights' },
    { id: 3, url: 'https://images.unsplash.com/photo-1581009146145-b5ef03a7403f?auto=format&fit=crop&q=80&w=600', alt: 'Treadmills' },
    { id: 4, url: 'https://images.unsplash.com/photo-1571731956622-39fa50be8edb?auto=format&fit=crop&q=80&w=600', alt: 'Punching Bag' },
  ];

  const currentIndex = photos.findIndex(p => p.id === selectedPhoto?.id);

  const handleNext = (e) => {
    e?.stopPropagation();
    setSelectedPhoto(photos[(currentIndex + 1) % photos.length]);
  };

  const handlePrev = (e) => {
    e?.stopPropagation();
    setSelectedPhoto(photos[(currentIndex - 1 + photos.length) % photos.length]);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedPhoto) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setSelectedPhoto(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto, currentIndex]);

  const PRIMARY = "#C9A03D";     // Gold from App.jsx
  const DARK_BG = "#1E1E1E";     // Dark Charcoal from App.jsx
  const CARD_BG = "#2A2A2A";     // Secondary Charcoal from App.jsx
  const TEXT_LIGHT = "#F5F5F5";  // Off-white from App.jsx

  return (
    <div className="py-24 px-4" style={{ backgroundColor: DARK_BG }}>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
        <motion.h2 
          whileHover={{ textShadow: "0 0 30px rgba(201, 160, 61, 0.4)" }} 
          className="text-4xl md:text-5xl font-black mb-8 text-center uppercase tracking-wider transition-all duration-300 cursor-default" 
          style={{ color: TEXT_LIGHT, fontFamily: "'Oswald', sans-serif" }}>
          Our <span style={{ color: PRIMARY }}>Facility</span>
        </motion.h2>
        <p className="max-w-2xl mx-auto text-gray-500 font-medium" style={{ fontFamily: "'Barlow', sans-serif" }}>
          Step inside the forge. 15,000 sq. ft. of pure performance-driven engineering.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {photos.map((photo) => (
          <motion.div 
            key={photo.id} 
            whileHover={{ y: -8, scale: 1.02 }} 
            className="overflow-hidden rounded-2xl group relative border cursor-pointer aspect-square" 
            style={{ borderColor: "rgba(255,255,255,0.05)", background: CARD_BG }}
            onClick={() => setSelectedPhoto(photo)}>
            
            {/* Premium Top Border Reveal */}
            <div className="absolute top-0 left-0 right-0 h-0 transition-all duration-500 group-hover:h-1.5 z-10" 
              style={{ background: `linear-gradient(90deg, transparent, ${PRIMARY}, transparent)` }} />
            
            <img 
              src={photo.url}
              alt={photo.alt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Animated Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-end pb-8 px-4 text-center">
              <motion.p 
                initial={{ y: 10, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                className="text-white font-black text-lg md:text-xl uppercase tracking-[0.15em]" 
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                {photo.alt}
              </motion.p>
              <div className="w-8 h-1 mt-3 transition-all duration-500 group-hover:w-16" style={{ backgroundColor: PRIMARY }} />
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl cursor-zoom-out"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-5xl w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Navigation Arrows */}
              <button 
                className="absolute -left-2 md:-left-24 top-1/2 -translate-y-1/2 text-white/30 hover:text-[#C9A03D] hover:scale-110 transition-all p-4 z-10"
                onClick={handlePrev}
                aria-label="Previous photo"
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </button>

              <button 
                className="absolute -right-2 md:-right-24 top-1/2 -translate-y-1/2 text-white/30 hover:text-[#C9A03D] hover:scale-110 transition-all p-4 z-10"
                onClick={handleNext}
                aria-label="Next photo"
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>

              <button 
                className="absolute -top-12 right-0 text-white hover:text-[#C9A03D] transition-colors p-2"
                onClick={() => setSelectedPhoto(null)}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
              <motion.img 
                key={selectedPhoto.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                src={selectedPhoto.url.replace('w=600', 'w=1200')} 
                alt={selectedPhoto.alt} 
                className="w-full h-auto max-h-[80vh] object-contain rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/5" 
              />
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 text-center"
              >
                <p className="text-white font-black text-2xl md:text-3xl uppercase tracking-[0.25em]" style={{ fontFamily: "'Oswald', sans-serif" }}>{selectedPhoto.alt}</p>
                <div className="w-20 h-1.5 mx-auto mt-4 rounded-full" style={{ backgroundColor: PRIMARY }} />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}