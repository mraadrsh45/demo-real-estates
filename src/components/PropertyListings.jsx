import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  MapPin, 
  BedDouble, 
  Bath, 
  Maximize, 
  Mail, 
  ArrowRight, 
  Sparkles, 
  Filter, 
  Heart, 
  Scale, 
  Search, 
  X, 
  LayoutGrid, 
  List,
  ShieldCheck
} from 'lucide-react';
import { properties } from '../data/properties';

export default function PropertyListings({ 
  searchFilters, 
  onSelectProperty, 
  onOpenEmailDossier,
  favorites = [],
  onToggleFavorite = () => {},
  comparedIds = [],
  onToggleCompare = () => {}
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  const categories = ['All', 'Villas', 'Builder Floors', 'Commercial', 'Plots', 'Penthouses'];

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = { All: properties.length };
    properties.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filter and sort properties
  const filteredProperties = useMemo(() => {
    let list = [...properties];

    // Saved Favorites filter
    if (selectedCategory === 'Favorites') {
      list = list.filter(p => favorites.includes(p.id));
    } else if (selectedCategory !== 'All') {
      list = list.filter(p => p.category === selectedCategory);
    }

    // Text Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q)
      );
    }

    // Filters from Hero search bar if present
    if (searchFilters) {
      if (searchFilters.propertyType && searchFilters.propertyType !== 'All') {
        list = list.filter(p => p.category === searchFilters.propertyType);
      }
      if (searchFilters.budget && searchFilters.budget !== 'All') {
        if (searchFilters.budget === 'under1cr') {
          list = list.filter(p => p.priceNumeric < 10000000);
        } else if (searchFilters.budget === '1cr-2cr') {
          list = list.filter(p => p.priceNumeric >= 10000000 && p.priceNumeric <= 20000000);
        } else if (searchFilters.budget === 'above2cr') {
          list = list.filter(p => p.priceNumeric > 20000000);
        }
      }
      if (searchFilters.bhk && searchFilters.bhk !== 'All') {
        if (searchFilters.bhk === 'plot') {
          list = list.filter(p => p.category === 'Plots');
        } else {
          const num = parseInt(searchFilters.bhk, 10);
          list = list.filter(p => p.bedrooms === num);
        }
      }
    }

    // Sort
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.priceNumeric - b.priceNumeric);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.priceNumeric - a.priceNumeric);
    } else if (sortBy === 'featured') {
      list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return list;
  }, [selectedCategory, sortBy, searchQuery, searchFilters, favorites]);

  // Interactive 3D Card Tilt on Mouse Move
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  return (
    <section id="properties" className="section-padding" style={{
      background: 'var(--navy-900)',
      position: 'relative'
    }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 2.5rem' }}>
          <div className="badge-gold" style={{ marginBottom: '1rem' }}>
            <Sparkles size={14} />
            <span>Verified Portfolio in Sector 125, Mohali</span>
          </div>
          <h2 style={{
            fontSize: 'clamp(2.1rem, 4vw, 3.2rem)',
            color: '#ffffff',
            lineHeight: 1.2,
            marginBottom: '1rem'
          }}>
            Curated Luxury <span className="text-gold-gradient">Properties & Estates</span>
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Every property is handpicked, legally clear, and RERA/PUDA verified. Located in the coveted residential and commercial sectors of Sunny Enclave, Mohali.
          </p>
          <div className="gold-divider" />
        </div>

        {/* Real-time Search & Filter Control Bar */}
        <div style={{
          background: 'rgba(11, 28, 54, 0.6)',
          border: '1px solid rgba(197, 155, 39, 0.25)',
          borderRadius: '16px',
          padding: '1.25rem',
          backdropFilter: 'blur(16px)',
          marginBottom: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}>
          {/* Top Row: Search Input & View Mode Toggles */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            
            {/* Search Input */}
            <div style={{ position: 'relative', flexGrow: 1, maxWidth: '480px' }}>
              <Search size={16} color="#edd06f" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="text"
                placeholder="Search villas, penthouses, sector 125, 4 BHK..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  height: '44px',
                  background: 'rgba(5, 13, 26, 0.8)',
                  border: '1px solid rgba(197, 155, 39, 0.3)',
                  borderRadius: '9999px',
                  padding: '0 2.5rem 0 2.8rem',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: '0.85rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    color: '#94a3b8',
                    cursor: 'pointer'
                  }}
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Right: Sort Dropdown & View Mode Switcher */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              
              {/* Sort */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.82rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Filter size={14} color="#edd06f" /> Sort:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    background: 'var(--navy-950)',
                    color: '#ffffff',
                    border: '1px solid rgba(197, 155, 39, 0.35)',
                    borderRadius: '8px',
                    padding: '0.45rem 0.85rem',
                    fontSize: '0.85rem',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="featured">Featured First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>

              {/* View Switcher (Grid vs List) */}
              <div style={{
                display: 'flex',
                background: 'rgba(5, 13, 26, 0.8)',
                border: '1px solid rgba(197, 155, 39, 0.3)',
                borderRadius: '8px',
                padding: '2px'
              }}>
                <button
                  onClick={() => setViewMode('grid')}
                  style={{
                    background: viewMode === 'grid' ? 'var(--gold-gradient)' : 'transparent',
                    color: viewMode === 'grid' ? '#071324' : '#94a3b8',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '6px 10px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  title="Grid View"
                >
                  <LayoutGrid size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  style={{
                    background: viewMode === 'list' ? 'var(--gold-gradient)' : 'transparent',
                    color: viewMode === 'list' ? '#071324' : '#94a3b8',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '6px 10px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  title="List View"
                >
                  <List size={16} />
                </button>
              </div>

            </div>

          </div>

          {/* Bottom Row: Category Filter Tabs with Count Badges */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  background: selectedCategory === cat ? 'var(--gold-gradient)' : 'rgba(16, 38, 72, 0.7)',
                  color: selectedCategory === cat ? '#071324' : '#e2e8f0',
                  border: selectedCategory === cat ? 'none' : '1px solid rgba(197, 155, 39, 0.25)',
                  padding: '0.45rem 1rem',
                  borderRadius: '30px',
                  fontSize: '0.84rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                <span>{cat}</span>
                <span style={{
                  fontSize: '0.72rem',
                  background: selectedCategory === cat ? 'rgba(7, 19, 36, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                  padding: '1px 6px',
                  borderRadius: '10px',
                  fontWeight: '700'
                }}>
                  {categoryCounts[cat] || 0}
                </span>
              </button>
            ))}

            {/* Saved Favorites Tab (Shows if user has saved items) */}
            {favorites.length > 0 && (
              <button
                onClick={() => setSelectedCategory('Favorites')}
                style={{
                  background: selectedCategory === 'Favorites' ? '#ef4444' : 'rgba(239, 68, 68, 0.15)',
                  color: selectedCategory === 'Favorites' ? '#ffffff' : '#fca5a5',
                  border: selectedCategory === 'Favorites' ? 'none' : '1px solid rgba(239, 68, 68, 0.4)',
                  padding: '0.45rem 1rem',
                  borderRadius: '30px',
                  fontSize: '0.84rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                <Heart size={13} fill={selectedCategory === 'Favorites' ? '#ffffff' : '#ef4444'} />
                <span>Saved Wishlist ({favorites.length})</span>
              </button>
            )}

            {(searchQuery || selectedCategory !== 'All') && (
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#edd06f',
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  marginLeft: 'auto',
                  textDecoration: 'underline'
                }}
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* GRID VIEW MODE */}
        {viewMode === 'grid' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '2rem'
          }}>
            {filteredProperties.map((prop) => {
              const isFav = favorites.includes(prop.id);
              const isCompared = comparedIds.includes(prop.id);

              return (
                <div 
                  key={prop.id}
                  className="luxury-card"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    transition: 'transform 0.15s ease-out, border-color 0.3s ease, box-shadow 0.3s ease'
                  }}
                >
                  {/* Card Image with Floating Badges & Action Buttons */}
                  <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                    <img 
                      src={prop.image} 
                      alt={prop.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease'
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(5, 13, 26, 0.2) 0%, rgba(5, 13, 26, 0.8) 100%)'
                    }} />

                    {/* Top Row: Category + Wishlist & Compare Buttons */}
                    <div style={{
                      position: 'absolute',
                      top: '0.85rem',
                      left: '0.85rem',
                      right: '0.85rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      zIndex: 2
                    }}>
                      <span className="badge-navy" style={{ background: 'rgba(5, 13, 26, 0.85)', backdropFilter: 'blur(8px)' }}>
                        {prop.category}
                      </span>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {/* Compare Toggle Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleCompare(prop);
                          }}
                          style={{
                            background: isCompared ? 'var(--gold-gradient)' : 'rgba(7, 19, 36, 0.85)',
                            color: isCompared ? '#071324' : '#edd06f',
                            border: isCompared ? 'none' : '1px solid rgba(197, 155, 39, 0.4)',
                            borderRadius: '20px',
                            padding: '4px 10px',
                            fontSize: '0.75rem',
                            fontWeight: '700',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            cursor: 'pointer',
                            backdropFilter: 'blur(8px)'
                          }}
                          title={isCompared ? "Remove from comparison" : "Add to comparison (up to 3)"}
                        >
                          <Scale size={13} />
                          <span>{isCompared ? "Compared" : "Compare"}</span>
                        </button>

                        {/* Wishlist Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleFavorite(prop.id);
                          }}
                          className={`btn-wishlist ${isFav ? 'active' : ''}`}
                          title={isFav ? "Remove from Wishlist" : "Save to Wishlist"}
                        >
                          <Heart size={17} fill={isFav ? "#ef4444" : "none"} color={isFav ? "#ef4444" : "#ffffff"} />
                        </button>
                      </div>
                    </div>

                    {/* Price & Status Overlay */}
                    <div style={{
                      position: 'absolute',
                      bottom: '0.85rem',
                      left: '1rem',
                      right: '1rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline'
                    }}>
                      <div style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        color: '#fae7a5',
                        textShadow: '0 2px 8px rgba(0,0,0,0.8)'
                      }}>
                        {prop.price}
                      </div>
                      <span className="badge-gold" style={{ fontSize: '0.72rem', padding: '0.2rem 0.6rem' }}>
                        <ShieldCheck size={12} />
                        <span>{prop.status}</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div style={{ padding: '1.4rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    
                    {/* Location */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      color: '#edd06f',
                      fontSize: '0.82rem',
                      fontWeight: '600',
                      marginBottom: '0.35rem'
                    }}>
                      <MapPin size={14} color="#edd06f" />
                      <span>{prop.location}</span>
                    </div>

                    {/* Title */}
                    <h3 style={{
                      fontSize: '1.25rem',
                      color: '#ffffff',
                      marginBottom: '0.4rem',
                      lineHeight: 1.3
                    }}>
                      {prop.title}
                    </h3>

                    <p style={{
                      fontSize: '0.86rem',
                      color: '#94a3b8',
                      lineHeight: 1.5,
                      marginBottom: '1.15rem',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {prop.description}
                    </p>

                    {/* Key Specifications Grid */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '0.5rem',
                      padding: '0.75rem 0',
                      borderTop: '1px solid rgba(255,255,255,0.06)',
                      borderBottom: '1px solid rgba(255,255,255,0.06)',
                      marginBottom: '1.25rem'
                    }}>
                      {prop.bedrooms > 0 && (
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ display: 'flex', justifyContent: 'center', color: '#c59b27', marginBottom: '0.2rem' }}>
                            <BedDouble size={16} />
                          </div>
                          <div style={{ fontSize: '0.82rem', fontWeight: '600', color: '#ffffff' }}>{prop.bedrooms} BHK</div>
                          <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Bedrooms</div>
                        </div>
                      )}

                      {prop.bathrooms > 0 && (
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ display: 'flex', justifyContent: 'center', color: '#c59b27', marginBottom: '0.2rem' }}>
                            <Bath size={16} />
                          </div>
                          <div style={{ fontSize: '0.82rem', fontWeight: '600', color: '#ffffff' }}>{prop.bathrooms} Bath</div>
                          <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Baths</div>
                        </div>
                      )}

                      <div style={{ textAlign: 'center', gridColumn: prop.bedrooms === 0 ? 'span 3' : 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', color: '#c59b27', marginBottom: '0.2rem' }}>
                          <Maximize size={16} />
                        </div>
                        <div style={{ fontSize: '0.82rem', fontWeight: '600', color: '#ffffff' }}>{prop.area}</div>
                        <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Plot / Built-up</div>
                      </div>
                    </div>

                    {/* Card CTAs */}
                    <div style={{ marginTop: 'auto', display: 'flex', gap: '0.65rem' }}>
                      <button
                        onClick={() => onSelectProperty(prop)}
                        className="btn btn-gold"
                        style={{ flex: 1, padding: '0.65rem 0.85rem', fontSize: '0.84rem' }}
                      >
                        <span>Full Specs</span>
                        <ArrowRight size={14} />
                      </button>

                      <button
                        onClick={() => onOpenEmailDossier(prop)}
                        className="btn btn-navy"
                        style={{
                          border: '1px solid rgba(197, 155, 39, 0.4)',
                          padding: '0.65rem 0.95rem',
                          fontSize: '0.84rem',
                          color: '#edd06f'
                        }}
                        title="Send complete property details to your email"
                      >
                        <Mail size={15} />
                        <span>Send to Mail</span>
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* LIST VIEW MODE */}
        {viewMode === 'list' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {filteredProperties.map((prop) => {
              const isFav = favorites.includes(prop.id);
              const isCompared = comparedIds.includes(prop.id);

              return (
                <div key={prop.id} className="property-list-card">
                  {/* Left Column: Image */}
                  <div style={{ position: 'relative', minHeight: '220px' }}>
                    <img 
                      src={prop.image} 
                      alt={prop.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                    <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                      <span className="badge-navy" style={{ fontSize: '0.72rem' }}>{prop.category}</span>
                    </div>
                  </div>

                  {/* Right Column: Details & CTAs */}
                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.4rem' }}>
                        <div>
                          <div style={{ color: '#edd06f', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.2rem' }}>
                            <MapPin size={13} />
                            <span>{prop.location}</span>
                          </div>
                          <h3 style={{ fontSize: '1.35rem', color: '#ffffff', margin: 0 }}>{prop.title}</h3>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: '700', color: '#fae7a5' }}>
                            {prop.price}
                          </div>
                          <button
                            onClick={() => onToggleFavorite(prop.id)}
                            className={`btn-wishlist ${isFav ? 'active' : ''}`}
                          >
                            <Heart size={16} fill={isFav ? "#ef4444" : "none"} color={isFav ? "#ef4444" : "#ffffff"} />
                          </button>
                        </div>
                      </div>

                      <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '1rem' }}>
                        {prop.description}
                      </p>

                      {/* Specs Row */}
                      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '1rem' }}>
                        {prop.bedrooms > 0 && <span><strong>{prop.bedrooms} BHK</strong> Configuration</span>}
                        {prop.bathrooms > 0 && <span><strong>{prop.bathrooms}</strong> Baths</span>}
                        <span>Area: <strong>{prop.area}</strong></span>
                        <span>Facing: <strong style={{ color: '#fae7a5' }}>{prop.facing}</strong></span>
                        <span>Status: <strong style={{ color: '#22c55e' }}>{prop.status}</strong></span>
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                      <button
                        onClick={() => onToggleCompare(prop)}
                        style={{
                          background: isCompared ? 'var(--gold-gradient)' : 'rgba(16, 38, 72, 0.7)',
                          color: isCompared ? '#071324' : '#edd06f',
                          border: isCompared ? 'none' : '1px solid rgba(197, 155, 39, 0.35)',
                          borderRadius: '20px',
                          padding: '5px 12px',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          cursor: 'pointer'
                        }}
                      >
                        <Scale size={14} />
                        <span>{isCompared ? "Remove Compare" : "Compare Property"}</span>
                      </button>

                      <div style={{ display: 'flex', gap: '0.65rem' }}>
                        <button
                          onClick={() => onSelectProperty(prop)}
                          className="btn btn-gold"
                          style={{ padding: '0.55rem 1.1rem', fontSize: '0.85rem' }}
                        >
                          <span>Full Specs</span>
                          <ArrowRight size={14} />
                        </button>
                        <button
                          onClick={() => onOpenEmailDossier(prop)}
                          className="btn btn-navy"
                          style={{ padding: '0.55rem 1.1rem', fontSize: '0.85rem', border: '1px solid var(--border-gold)', color: '#edd06f' }}
                        >
                          <Mail size={14} />
                          <span>Email Dossier</span>
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {filteredProperties.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '4rem 1.5rem',
            background: 'var(--navy-850)',
            borderRadius: '16px',
            border: '1px dashed rgba(197, 155, 39, 0.3)'
          }}>
            <Building2 size={42} color="#c59b27" style={{ marginBottom: '1rem' }} />
            <h3 style={{ color: '#ffffff', marginBottom: '0.5rem' }}>No Properties Matched Your Filter</h3>
            <p style={{ color: '#cbd5e1', maxWidth: '500px', margin: '0 auto 1.5rem' }}>
              We have customized off-market plots, commercial SCOs, and villas available in Sunny Enclave Sector 125. Reach out to our advisory directly.
            </p>
            <button 
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }} 
              className="btn btn-gold"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
