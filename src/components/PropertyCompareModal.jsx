import React from 'react';
import { X, Check, Mail, Phone, Trash2 } from 'lucide-react';
import { companyDetails } from '../data/properties';

export default function PropertyCompareModal({ 
  properties = [], 
  onClose, 
  onRemoveProperty, 
  onOpenEmailDossier 
}) {
  if (!properties || properties.length === 0) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="luxury-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '1080px',
          maxHeight: '92vh',
          overflowY: 'auto',
          background: 'var(--navy-900)',
          border: '1px solid var(--border-gold)',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.95)',
          padding: '2rem',
          position: 'relative'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', borderBottom: '1px solid rgba(197, 155, 39, 0.25)', paddingBottom: '1rem' }}>
          <div>
            <span className="badge-gold" style={{ marginBottom: '0.4rem' }}>
              Comparison Matrix
            </span>
            <h2 style={{ fontSize: '1.75rem', color: '#ffffff', fontFamily: 'var(--font-serif)', margin: 0 }}>
              Compare <span className="text-gold-gradient">Estates & Properties</span>
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(16, 38, 72, 0.8)',
              border: '1px solid var(--border-gold)',
              color: '#edd06f',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Comparison Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${properties.length}, 1fr)`,
          gap: '1.5rem',
          minWidth: properties.length > 2 ? '780px' : 'auto',
          overflowX: 'auto'
        }}>
          {properties.map((p) => (
            <div 
              key={p.id}
              style={{
                background: 'rgba(11, 28, 54, 0.7)',
                border: '1px solid rgba(197, 155, 39, 0.3)',
                borderRadius: '14px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Card Photo & Title */}
              <div style={{ position: 'relative', height: '180px' }}>
                <img 
                  src={p.image} 
                  alt={p.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
                <button
                  onClick={() => onRemoveProperty(p.id)}
                  title="Remove from comparison"
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'rgba(5, 13, 26, 0.85)',
                    border: '1px solid rgba(239, 68, 68, 0.5)',
                    color: '#f87171',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <Trash2 size={14} />
                </button>
                <div style={{ position: 'absolute', bottom: '8px', left: '10px' }}>
                  <span className="badge-navy" style={{ fontSize: '0.72rem' }}>{p.category}</span>
                </div>
              </div>

              {/* Title & Price */}
              <div style={{ padding: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <h4 style={{ color: '#ffffff', fontSize: '1.1rem', marginBottom: '0.35rem', lineHeight: 1.3 }}>
                  {p.title}
                </h4>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: '700', color: '#fae7a5' }}>
                  {p.price}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.2rem' }}>
                  {p.location}
                </div>
              </div>

              {/* Spec Rows */}
              <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.9rem', flexGrow: 1, fontSize: '0.88rem' }}>
                <div style={specRowStyle}>
                  <span style={specLabelStyle}>Status</span>
                  <span style={{ color: '#22c55e', fontWeight: '600' }}>{p.status}</span>
                </div>

                <div style={specRowStyle}>
                  <span style={specLabelStyle}>Configuration</span>
                  <span style={{ color: '#ffffff', fontWeight: '600' }}>{p.bedrooms > 0 ? `${p.bedrooms} BHK` : 'Commercial / Plot'}</span>
                </div>

                <div style={specRowStyle}>
                  <span style={specLabelStyle}>Bathrooms</span>
                  <span style={{ color: '#ffffff' }}>{p.bathrooms > 0 ? `${p.bathrooms} Baths` : 'N/A'}</span>
                </div>

                <div style={specRowStyle}>
                  <span style={specLabelStyle}>Plot Area</span>
                  <span style={{ color: '#ffffff', fontWeight: '600' }}>{p.area}</span>
                </div>

                <div style={specRowStyle}>
                  <span style={specLabelStyle}>Built-up Area</span>
                  <span style={{ color: '#ffffff' }}>{p.builtUpArea}</span>
                </div>

                <div style={specRowStyle}>
                  <span style={specLabelStyle}>Facing</span>
                  <span style={{ color: '#edd06f' }}>{p.facing}</span>
                </div>

                <div style={specRowStyle}>
                  <span style={specLabelStyle}>RERA Approved</span>
                  <span style={{ color: p.reraApproved ? '#fae7a5' : '#94a3b8' }}>
                    {p.reraApproved ? `✓ ${p.reraNo}` : 'GMADA / PUDA'}
                  </span>
                </div>

                {/* Highlights List */}
                <div style={{ marginTop: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ ...specLabelStyle, display: 'block', marginBottom: '0.4rem' }}>Highlights:</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    {p.highlights?.slice(0, 3).map((h, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem', fontSize: '0.78rem', color: '#cbd5e1' }}>
                        <Check size={12} color="#c59b27" style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ padding: '1rem', background: 'rgba(7, 19, 36, 0.95)', borderTop: '1px solid rgba(197, 155, 39, 0.2)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <button
                  onClick={() => {
                    onClose();
                    onOpenEmailDossier(p);
                  }}
                  className="btn btn-gold"
                  style={{ width: '100%', padding: '0.65rem', fontSize: '0.82rem' }}
                >
                  <Mail size={14} /> Send Specs to Mail
                </button>
                <a
                  href={`tel:${companyDetails.phones[0]}`}
                  className="btn btn-navy"
                  style={{ width: '100%', padding: '0.6rem', fontSize: '0.82rem', border: '1px solid var(--border-gold)' }}
                >
                  <Phone size={14} /> Call Advisory
                </a>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const specRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBottom: '0.45rem',
  borderBottom: '1px solid rgba(255,255,255,0.04)'
};

const specLabelStyle = {
  color: '#94a3b8',
  fontSize: '0.8rem'
};
