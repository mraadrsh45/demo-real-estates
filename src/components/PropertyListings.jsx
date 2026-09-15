import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  MapPin, 
  BedDouble, 
  Bath, 
  Maximize, 
  Video, 
  Mail, 
  ArrowRight, 
  Sparkles, 
  Phone,
  ShieldCheck,
  Filter,
  Play
} from 'lucide-react';
import { properties, companyDetails } from '../data/properties';

export default function PropertyListings({ 
  searchFilters, 
  onSelectProperty, 
  onOpenEmailDossier 
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  const categories = ['All', 'Villas', 'Builder Floors', 'Commercial', 'Plots', 'Penthouses'];

  // Filter and sort properties
  const filteredProperties = useMemo(() => {
    let list = [...properties];

    // Category filter from internal tab
    if (selectedCategory !== 'All') {
      list = list.filter(p => p.category === selectedCategory);
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
          const num = parseInt(searchFilters.bhk);
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
  }, [selectedCategory, sortBy, searchFilters]);

  // Interactive 3D Card Tilt on Mouse Move
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

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
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3rem' }}>
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

        {/* Filter Toolbar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.25rem',
          marginBottom: '2.5rem',
          paddingBottom: '1.25rem',
          borderBottom: '1px solid rgba(197, 155, 39, 0.2)'
        }}>
          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  background: selectedCategory === cat ? 'var(--gold-gradient)' : 'rgba(16, 38, 72, 0.7)',
                  color: selectedCategory === cat ? '#071324' : '#e2e8f0',
                  border: selectedCategory === cat ? 'none' : '1px solid rgba(197, 155, 39, 0.25)',
                  padding: '0.55rem 1.2rem',
                  borderRadius: '30px',
                  fontSize: '0.88rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Filter size={14} color="#edd06f" /> Sort By:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                background: 'var(--navy-800)',
                color: '#ffffff',
                border: '1px solid rgba(197, 155, 39, 0.35)',
                borderRadius: '8px',
                padding: '0.5rem 1rem',
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
        </div>

        {/* Property Cards Grid with 3D Interactive Tilt */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '2rem'
        }}>
          {filteredProperties.map((prop) => (
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
              {/* Card Image with Floating Badges */}
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
                  background: 'linear-gradient(180deg, rgba(5, 13, 26, 0.1) 0%, rgba(5, 13, 26, 0.75) 100%)'
                }} />

                {/* Top Badges */}
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  right: '1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span className="badge-navy" style={{ background: 'rgba(5, 13, 26, 0.85)', backdropFilter: 'blur(8px)' }}>
                    {prop.category}
                  </span>
                  <span className="badge-gold" style={{ background: 'rgba(7, 19, 36, 0.9)' }}>
                    <Video size={12} />
                    <span>4K Video Tour</span>
                  </span>
                </div>

                {/* Price Overlay */}
                <div style={{
                  position: 'absolute',
                  bottom: '0.85rem',
                  left: '1rem',
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '0.4rem'
                }}>
                  <span style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: '#fae7a5',
                    textShadow: '0 2px 8px rgba(0,0,0,0.8)'
                  }}>
                    {prop.price}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>
                    • {prop.status}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                
                {/* Location */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  color: '#edd06f',
                  fontSize: '0.82rem',
                  fontWeight: '600',
                  marginBottom: '0.45rem'
                }}>
                  <MapPin size={14} color="#edd06f" />
                  <span>{prop.location}</span>
                </div>

                {/* Title & Tagline */}
                <h3 style={{
                  fontSize: '1.25rem',
                  color: '#ffffff',
                  marginBottom: '0.4rem',
                  lineHeight: 1.3
                }}>
                  {prop.title}
                </h3>

                <p style={{
                  fontSize: '0.88rem',
                  color: '#94a3b8',
                  lineHeight: 1.5,
                  marginBottom: '1.25rem',
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

                {/* Card CTAs: View Details & Direct Email Send */}
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
          ))}
        </div>

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
              We have customized off-market plots and villas available in Sunny Enclave Sector 125. Reach out to our advisory directly.
            </p>
            <button 
              onClick={() => setSelectedCategory('All')} 
              className="btn btn-gold"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
