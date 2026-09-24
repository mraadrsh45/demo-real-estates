import React, { useState, useEffect, useCallback } from 'react';
import { 
  X, 
  MapPin, 
  ShieldCheck, 
  Mail, 
  Phone, 
  CheckCircle2, 
  Share2, 
  ChevronLeft, 
  ChevronRight, 
  Calculator 
} from 'lucide-react';
import { companyDetails } from '../data/properties';

export default function PropertyDetailModal({ property, onClose, onOpenEmailDossier }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'amenities' | 'emi'
  const [copySuccess, setCopySuccess] = useState(false);

  const images = property?.gallery && property.gallery.length > 0 ? property.gallery : (property ? [property.image] : []);

  const handleNextImage = useCallback(() => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrevImage = useCallback(() => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard navigation: Esc to close, Arrow keys for photos
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        handleNextImage();
      } else if (e.key === 'ArrowLeft') {
        handlePrevImage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, handleNextImage, handlePrevImage]);

  if (!property) return null;

  // Simple estimated monthly EMI (8.5% for 20 years with 20% down)
  const estimatedLoan = property.priceNumeric ? property.priceNumeric * 0.8 : 10000000;
  const monthlyRate = 8.5 / (12 * 100);
  const totalMonths = 20 * 12;
  const estimatedEmi = Math.round((estimatedLoan * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1));

  // Share Property handler
  const handleShare = async () => {
    const shareData = {
      title: `${property.title} | Western Real Estates Mohali`,
      text: `Explore ${property.title} in Sector 125 Sunny Enclave, Mohali: ${property.price}`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled or failed
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2500);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="luxury-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '960px',
          maxHeight: '92vh',
          overflowY: 'auto',
          background: 'var(--navy-900)',
          border: '1px solid var(--border-gold)',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.95)',
          padding: 0,
          position: 'relative'
        }}
      >
        {/* Top Control Bar: Share & Close */}
        <div style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          display: 'flex',
          gap: '0.65rem',
          zIndex: 10
        }}>
          <button
            onClick={handleShare}
            style={{
              background: 'rgba(5, 13, 26, 0.85)',
              border: '1px solid rgba(197, 155, 39, 0.4)',
              color: copySuccess ? '#22c55e' : '#fae7a5',
              height: '40px',
              padding: '0 0.85rem',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.8rem',
              fontWeight: '600',
              cursor: 'pointer',
              backdropFilter: 'blur(8px)'
            }}
            title="Share Property"
          >
            <Share2 size={16} />
            <span>{copySuccess ? 'Link Copied!' : 'Share'}</span>
          </button>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(5, 13, 26, 0.85)',
              border: '1px solid rgba(197, 155, 39, 0.4)',
              color: '#fae7a5',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              backdropFilter: 'blur(8px)'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Gallery Hero Section */}
        <div style={{ position: 'relative', height: '400px', background: '#050d1a' }}>
          <img 
            src={images[activeImageIndex]} 
            alt={property.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(5, 13, 26, 0.3) 0%, rgba(7, 19, 36, 0.9) 100%)'
          }} />

          {/* Previous / Next Arrow Controls */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(7, 19, 36, 0.8)',
                  border: '1px solid rgba(197, 155, 39, 0.4)',
                  color: '#fae7a5',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 2,
                  backdropFilter: 'blur(8px)'
                }}
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={handleNextImage}
                style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(7, 19, 36, 0.8)',
                  border: '1px solid rgba(197, 155, 39, 0.4)',
                  color: '#fae7a5',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 2,
                  backdropFilter: 'blur(8px)'
                }}
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}

          {/* Floating Category & RERA Badges */}
          <div style={{
            position: 'absolute',
            top: '1.25rem',
            left: '1.25rem',
            display: 'flex',
            gap: '0.65rem'
          }}>
            <span className="badge-navy">{property.category}</span>
            {property.reraApproved && (
              <span className="badge-gold">
                <ShieldCheck size={13} />
                <span>RERA: {property.reraNo}</span>
              </span>
            )}
            {images.length > 1 && (
              <span className="badge-navy" style={{ fontSize: '0.75rem' }}>
                {activeImageIndex + 1} / {images.length}
              </span>
            )}
          </div>

          {/* Title & Price on Image Bottom */}
          <div style={{
            position: 'absolute',
            bottom: '1.25rem',
            left: '1.5rem',
            right: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#edd06f', fontSize: '0.85rem', marginBottom: '0.2rem' }}>
                <MapPin size={15} color="#edd06f" />
                <span>{property.location}</span>
              </div>
              <h2 style={{ fontSize: '1.8rem', color: '#ffffff', fontFamily: 'var(--font-serif)', lineHeight: 1.2 }}>
                {property.title}
              </h2>
            </div>

            <div>
              <div style={{ fontSize: '0.8rem', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Price</div>
              <div style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#fae7a5',
                fontFamily: 'var(--font-serif)'
              }}>
                {property.price}
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail Selector */}
        {images.length > 1 && (
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            background: 'var(--navy-950)',
            overflowX: 'auto',
            borderBottom: '1px solid rgba(255,255,255,0.06)'
          }}>
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                style={{
                  width: '75px',
                  height: '50px',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  border: activeImageIndex === idx ? '2px solid #edd06f' : '1px solid rgba(255,255,255,0.1)',
                  opacity: activeImageIndex === idx ? 1 : 0.6,
                  cursor: 'pointer',
                  padding: 0,
                  flexShrink: 0
                }}
              >
                <img src={img} alt="thumb" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>
            ))}
          </div>
        )}

        {/* Modal Tab Switcher */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          padding: '0.85rem 1.5rem',
          background: 'rgba(11, 28, 54, 0.5)',
          borderBottom: '1px solid rgba(197, 155, 39, 0.2)'
        }}>
          <button
            onClick={() => setActiveTab('overview')}
            className={`tab-pill ${activeTab === 'overview' ? 'active' : ''}`}
          >
            Overview & Specifications
          </button>
          <button
            onClick={() => setActiveTab('amenities')}
            className={`tab-pill ${activeTab === 'amenities' ? 'active' : ''}`}
          >
            Amenities & Highlights
          </button>
          <button
            onClick={() => setActiveTab('emi')}
            className={`tab-pill ${activeTab === 'emi' ? 'active' : ''}`}
          >
            Mortgage & EMI Breakdown
          </button>
        </div>

        {/* Modal Content Details */}
        <div style={{ padding: '1.75rem 2rem' }}>
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div>
              {/* Tagline */}
              <div style={{
                fontSize: '1.05rem',
                color: '#edd06f',
                fontWeight: '600',
                marginBottom: '1.25rem',
                lineHeight: 1.5
              }}>
                {property.tagline}
              </div>

              {/* Quick Specifications Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '1rem',
                marginBottom: '1.75rem',
                background: 'rgba(16, 38, 72, 0.5)',
                padding: '1.25rem',
                borderRadius: '12px',
                border: '1px solid rgba(197, 155, 39, 0.2)'
              }}>
                <div>
                  <div style={{ color: '#94a3b8', fontSize: '0.78rem' }}>Plot / Land Area</div>
                  <div style={{ color: '#ffffff', fontWeight: '600', fontSize: '0.95rem' }}>{property.area}</div>
                </div>

                <div>
                  <div style={{ color: '#94a3b8', fontSize: '0.78rem' }}>Built-Up Area</div>
                  <div style={{ color: '#ffffff', fontWeight: '600', fontSize: '0.95rem' }}>{property.builtUpArea}</div>
                </div>

                <div>
                  <div style={{ color: '#94a3b8', fontSize: '0.78rem' }}>Facing Direction</div>
                  <div style={{ color: '#ffffff', fontWeight: '600', fontSize: '0.95rem' }}>{property.facing}</div>
                </div>

                <div>
                  <div style={{ color: '#94a3b8', fontSize: '0.78rem' }}>Possession Status</div>
                  <div style={{ color: '#fae7a5', fontWeight: '600', fontSize: '0.95rem' }}>{property.status}</div>
                </div>
              </div>

              {/* Architectural Description */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ color: '#ffffff', fontSize: '1.1rem', marginBottom: '0.65rem', fontFamily: 'var(--font-serif)' }}>
                  Architectural Overview & Design Philosophy
                </h4>
                <p style={{ color: '#cbd5e1', lineHeight: 1.7, fontSize: '0.94rem' }}>
                  {property.description}
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: AMENITIES & HIGHLIGHTS */}
          {activeTab === 'amenities' && (
            <div>
              {/* Highlights Checklist */}
              {property.highlights && (
                <div style={{ marginBottom: '1.75rem' }}>
                  <h4 style={{ color: '#ffffff', fontSize: '1.1rem', marginBottom: '0.85rem', fontFamily: 'var(--font-serif)' }}>
                    Signature Specifications
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
                    {property.highlights.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#e2e8f0', fontSize: '0.9rem' }}>
                        <CheckCircle2 size={16} color="#c59b27" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Amenities Badges */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ color: '#ffffff', fontSize: '1.1rem', marginBottom: '0.85rem', fontFamily: 'var(--font-serif)' }}>
                  Gated Community Infrastructure & Amenities
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                  {property.amenities.map((amenity, idx) => (
                    <span key={idx} className="badge-navy" style={{ padding: '0.45rem 1rem', fontSize: '0.84rem' }}>
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MORTGAGE & EMI BREAKDOWN */}
          {activeTab === 'emi' && (
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{
                background: 'rgba(16, 38, 72, 0.6)',
                border: '1px solid rgba(197, 155, 39, 0.3)',
                borderRadius: '12px',
                padding: '1.5rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#edd06f', marginBottom: '0.5rem' }}>
                  <Calculator size={18} />
                  <span style={{ fontWeight: '700' }}>Estimated Financing Structure (SBI / HDFC 8.5%)</span>
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#fae7a5', fontFamily: 'var(--font-serif)', marginBottom: '0.75rem' }}>
                  ₹ {estimatedEmi.toLocaleString('en-IN')} <span style={{ fontSize: '0.9rem', color: '#cbd5e1', fontWeight: '400' }}>/ month</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', fontSize: '0.85rem', color: '#cbd5e1' }}>
                  <div>Property Price: <strong>{property.price}</strong></div>
                  <div>Estimated Loan (80%): <strong>₹ {(estimatedLoan / 10000000).toFixed(2)} Cr</strong></div>
                  <div>Tenure: <strong>20 Years</strong></div>
                  <div>Interest Rate: <strong>8.50% p.a.</strong></div>
                </div>
              </div>
            </div>
          )}

          {/* Direct Actions & Email Dossier Box */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(197, 155, 39, 0.15) 0%, rgba(7, 19, 36, 0.8) 100%)',
            border: '1px solid var(--border-gold)',
            borderRadius: '14px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <div>
              <h4 style={{ color: '#fae7a5', fontSize: '1.15rem', marginBottom: '0.35rem', fontFamily: 'var(--font-serif)' }}>
                Direct Property Dossier & Site Inspection
              </h4>
              <p style={{ color: '#cbd5e1', fontSize: '0.88rem' }}>
                Want to receive verified brochures, elevation blueprints, and legal title clearances directly to your inbox?
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  onClose();
                  onOpenEmailDossier(property);
                }}
                className="btn btn-gold"
                style={{ flex: 1, minWidth: '220px' }}
              >
                <Mail size={16} />
                <span>Send Full Dossier to My Mail</span>
              </button>

              <a
                href={`tel:${companyDetails.phones[0]}`}
                className="btn btn-navy"
                style={{ border: '1px solid var(--border-gold)', color: '#fae7a5' }}
              >
                <Phone size={16} />
                <span>Call +91 {companyDetails.phones[0]}</span>
              </a>

              <a
                href={`https://wa.me/91${companyDetails.phones[0]}?text=${encodeURIComponent(`Hello Western Real Estates, I am interested in ${property.title} in Sector 125 Mohali. Please send me full details.`)}`}
                target="_blank"
                rel="noreferrer"
                className="btn"
                style={{ background: '#25D366', color: '#ffffff' }}
              >
                WhatsApp Us
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
