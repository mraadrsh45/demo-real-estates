import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  BedDouble, 
  Bath, 
  Maximize, 
  ShieldCheck, 
  Mail, 
  Phone, 
  CheckCircle2, 
  Compass, 
  Calendar,
  Share2,
  ExternalLink
} from 'lucide-react';
import { companyDetails } from '../data/properties';

export default function PropertyDetailModal({ property, onClose, onOpenEmailDossier }) {
  if (!property) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const images = property.gallery && property.gallery.length > 0 ? property.gallery : [property.image];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="luxury-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '920px',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: 'var(--navy-900)',
          border: '1px solid rgba(197, 155, 39, 0.45)',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.9)',
          padding: 0,
          position: 'relative'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
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
            zIndex: 10,
            transition: 'all 0.2s ease'
          }}
        >
          <X size={20} />
        </button>

        {/* Gallery Hero Section */}
        <div style={{ position: 'relative', height: '380px', background: '#050d1a' }}>
          <img 
            src={images[activeImageIndex]} 
            alt={property.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(5, 13, 26, 0.2) 0%, rgba(7, 19, 36, 0.85) 100%)'
          }} />

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

        {/* Modal Content Details */}
        <div style={{ padding: '2rem' }}>
          
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
            marginBottom: '2rem',
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
          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ color: '#ffffff', fontSize: '1.1rem', marginBottom: '0.65rem', fontFamily: 'var(--font-serif)' }}>
              Architectural Overview & Design Philosophy
            </h4>
            <p style={{ color: '#cbd5e1', lineHeight: 1.7, fontSize: '0.94rem' }}>
              {property.description}
            </p>
          </div>

          {/* Highlights Checklist */}
          {property.highlights && (
            <div style={{ marginBottom: '2rem' }}>
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
          <div style={{ marginBottom: '2.5rem' }}>
            <h4 style={{ color: '#ffffff', fontSize: '1.1rem', marginBottom: '0.85rem', fontFamily: 'var(--font-serif)' }}>
              Gated Infrastructure & Amenities
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
              {property.amenities.map((amenity, idx) => (
                <span key={idx} className="badge-navy" style={{ padding: '0.45rem 1rem', fontSize: '0.84rem' }}>
                  {amenity}
                </span>
              ))}
            </div>
          </div>

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
                Want to receive the verified brochures, floor layout plans, and legal clearances directly on your email? Click below to send immediately.
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
