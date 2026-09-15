import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, ArrowUp, ExternalLink } from 'lucide-react';
import { companyDetails } from '../data/properties';

export default function Footer({ onOpenEmailDossier }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      background: '#040b15',
      borderTop: '1px solid rgba(197, 155, 39, 0.3)',
      paddingTop: '4.5rem',
      paddingBottom: '2.5rem',
      position: 'relative'
    }}>
      <div className="container">
        
        {/* Main Footer Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3.5rem'
        }}>
          
          {/* Col 1: Brand & Logo */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                padding: '2px',
                background: 'var(--gold-gradient)',
                boxShadow: '0 0 16px rgba(197, 155, 39, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}>
                <img 
                  src="/logo.png" 
                  alt="Western Real Estates" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                />
              </div>
              <div>
                <div style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.35rem',
                  fontWeight: '800',
                  letterSpacing: '0.06em',
                  background: 'var(--gold-gradient)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: 1.1
                }}>
                  WESTERN
                </div>
                <div style={{ fontSize: '0.72rem', letterSpacing: '0.2em', color: '#e2e8f0', fontWeight: '600' }}>
                  REAL ESTATES • MOHALI
                </div>
              </div>
            </div>

            <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Bespoke luxury real estate consulting and property development advisory in Sunny Enclave Sector 125, SAS Nagar Mohali. Crafting landmark living experiences for discerning families and institutional investors.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#edd06f', fontSize: '0.82rem' }}>
              <ShieldCheck size={16} />
              <span>RERA Registered Tricity Advisory</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 style={footerTitleStyle}>Portfolio & Tours</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a href="#properties" style={footerLinkStyle}>Luxury Villas (Sector 125)</a>
              <a href="#properties" style={footerLinkStyle}>Independent Builder Floors with Lift</a>
              <a href="#properties" style={footerLinkStyle}>Commercial SCOs on Airport Road</a>
              <a href="#properties" style={footerLinkStyle}>Gated Residential Plots (100–300 Gaj)</a>
              <a href="#3d-experience" style={footerLinkStyle}>Interactive 3D Estate Showcase</a>
              <a href="#emi-calculator" style={footerLinkStyle}>Mortgage & Loan EMI Calculator</a>
            </div>
          </div>

          {/* Col 3: Direct Office Coordinates */}
          <div>
            <h4 style={footerTitleStyle}>Advisory Office</h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', fontSize: '0.88rem', color: '#cbd5e1' }}>
              <div style={{ display: 'flex', gap: '0.65rem' }}>
                <MapPin size={18} color="#c59b27" style={{ flexShrink: 0, marginTop: '0.15rem' }} />
                <span>
                  <strong>H.No 4058 Sunny Enclave</strong><br />
                  Sector 125, SAS Nagar, Mohali (Punjab)<br />
                  PIN Code: 140301
                </span>
              </div>

              <div style={{ display: 'flex', gap: '0.65rem' }}>
                <Phone size={18} color="#c59b27" style={{ flexShrink: 0, marginTop: '0.15rem' }} />
                <div>
                  <a href={`tel:${companyDetails.phones[0]}`} style={{ color: '#fae7a5', textDecoration: 'none', fontWeight: '600' }}>
                    +91 {companyDetails.phones[0]}
                  </a><br />
                  <a href={`tel:${companyDetails.phones[1]}`} style={{ color: '#cbd5e1', textDecoration: 'none' }}>
                    +91 {companyDetails.phones[1]}
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.65rem' }}>
                <Mail size={18} color="#c59b27" style={{ flexShrink: 0, marginTop: '0.15rem' }} />
                <a href={`mailto:${companyDetails.email}`} style={{ color: '#fae7a5', textDecoration: 'none', wordBreak: 'break-all' }}>
                  {companyDetails.email}
                </a>
              </div>

              <a 
                href={companyDetails.mapsLink}
                target="_blank"
                rel="noreferrer"
                style={{
                  color: '#edd06f',
                  textDecoration: 'none',
                  fontSize: '0.82rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  marginTop: '0.25rem'
                }}
              >
                <span>Open Google Maps Pin</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>

          {/* Col 4: Direct Mail Dossier CTA */}
          <div>
            <h4 style={footerTitleStyle}>Instant Client Dossier</h4>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1rem' }}>
              Want to receive our complete verified property brochure directly in your email inbox?
            </p>
            <button
              onClick={() => onOpenEmailDossier(null)}
              className="btn btn-gold"
              style={{ width: '100%', padding: '0.75rem', fontSize: '0.85rem' }}
            >
              <Mail size={15} />
              <span>Email Me Full Catalog</span>
            </button>
            <div style={{ marginTop: '1rem', fontSize: '0.75rem', color: '#64748b', lineHeight: 1.4 }}>
              * Zero spam policy. Direct property layouts and price schedules only.
            </div>
          </div>

        </div>

        {/* Legal Disclaimer & RERA */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: '1.75rem',
          fontSize: '0.78rem',
          color: '#64748b',
          lineHeight: 1.6,
          marginBottom: '2rem'
        }}>
          <strong>Legal Disclaimer:</strong> All real estate projects featured on Western Real Estates are subject to GMADA / PUDA / RERA (Punjab Real Estate Regulatory Authority) norms and clear title registries. Property images, dimensions, and visual representations are architectural renderings and actual property photography intended for client guidance.
        </div>

        {/* Bottom Bar with Back to Top */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          borderTop: '1px solid rgba(197, 155, 39, 0.2)',
          paddingTop: '1.25rem',
          fontSize: '0.82rem',
          color: '#94a3b8'
        }}>
          <div>
            © {new Date().getFullYear()} <strong style={{ color: '#fae7a5' }}>Western Real Estates</strong>. All Rights Reserved. Sunny Enclave Sector 125, SAS Nagar Mohali.
          </div>

          <button
            onClick={scrollToTop}
            style={{
              background: 'rgba(16, 38, 72, 0.8)',
              border: '1px solid rgba(197, 155, 39, 0.3)',
              color: '#fae7a5',
              padding: '0.45rem 0.9rem',
              borderRadius: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.8rem'
            }}
          >
            <span>Back to Top</span>
            <ArrowUp size={13} />
          </button>
        </div>

      </div>
    </footer>
  );
}

const footerTitleStyle = {
  fontFamily: 'var(--font-serif)',
  fontSize: '1.1rem',
  color: '#fae7a5',
  letterSpacing: '0.04em',
  marginBottom: '1.25rem'
};

const footerLinkStyle = {
  color: '#cbd5e1',
  textDecoration: 'none',
  fontSize: '0.86rem',
  transition: 'all 0.2s ease'
};
