import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Menu, X, Video, ShieldCheck, Compass, Heart } from 'lucide-react';
import { companyDetails } from '../data/properties';

export default function Navbar({ onOpenEmailDossier, favoritesCount = 0 }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Notification Bar */}
      <div style={{
        background: 'linear-gradient(90deg, #050d1a 0%, #0b1c36 50%, #050d1a 100%)',
        borderBottom: '1px solid rgba(197, 155, 39, 0.25)',
        fontSize: '0.8rem',
        padding: '0.45rem 1rem',
        color: '#e2e8f0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        zIndex: 101
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#edd06f' }}>
              <MapPin size={13} color="#edd06f" />
              <span>H.No 4058 Sunny Enclave, Sector 125, Mohali (140301)</span>
            </span>
            <span style={{ display: 'none', mdDisplay: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ShieldCheck size={13} color="#c59b27" />
              <span>RERA Registered Tricity Advisory</span>
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <a 
              href={`tel:${companyDetails.phones[0]}`}
              style={{ color: '#fae7a5', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: '600' }}
            >
              <Phone size={13} />
              <span>+91 {companyDetails.phones[0]}</span>
            </a>
            <span style={{ color: '#475569' }}>|</span>
            <a 
              href={`tel:${companyDetails.phones[1]}`}
              style={{ color: '#e2e8f0', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <span>+91 {companyDetails.phones[1]}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        transition: 'all 0.3s ease',
        background: isScrolled ? 'rgba(7, 19, 36, 0.96)' : 'rgba(7, 19, 36, 0.88)',
        backdropFilter: 'blur(16px)',
        borderBottom: isScrolled ? '1px solid rgba(197, 155, 39, 0.35)' : '1px solid rgba(255, 255, 255, 0.05)',
        boxShadow: isScrolled ? '0 10px 30px rgba(0, 0, 0, 0.6)' : 'none',
        padding: isScrolled ? '0.75rem 0' : '1.1rem 0'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          {/* Brand Logo & Name */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', textDecoration: 'none' }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              padding: '2px',
              background: 'var(--gold-gradient)',
              boxShadow: '0 0 16px rgba(197, 155, 39, 0.45)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}>
              <img 
                src="/logo.png" 
                alt="Western Real Estates Logo" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div>
              <div style={{ 
                fontFamily: 'var(--font-serif)', 
                fontSize: '1.3rem', 
                fontWeight: '800', 
                letterSpacing: '0.08em',
                background: 'var(--gold-gradient)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1.1
              }}>
                WESTERN
              </div>
              <div style={{ 
                fontSize: '0.68rem', 
                letterSpacing: '0.22em', 
                color: '#e2e8f0', 
                fontWeight: '600',
                textTransform: 'uppercase' 
              }}>
                REAL ESTATES • MOHALI
              </div>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }} className="desktop-nav">
            <a href="#properties" style={navLinkStyle}>Properties</a>
            <a href="#3d-experience" style={navLinkStyle}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#fae7a5' }}>
                <Compass size={15} color="#edd06f" />
                <span>3D Virtual Tour</span>
              </span>
            </a>
            <a href="#building-videos" style={navLinkStyle}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Video size={15} color="#edd06f" />
                <span>Building Videos (4K)</span>
              </span>
            </a>
            <a href="#emi-calculator" style={navLinkStyle}>EMI Calculator</a>
            <a href="#location" style={navLinkStyle}>Location & Maps</a>
            <a href="#contact" style={navLinkStyle}>Contact Us</a>

            {/* Wishlist Link if Favorites > 0 */}
            {favoritesCount > 0 && (
              <a href="#properties" style={{ ...navLinkStyle, color: '#f87171', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Heart size={14} fill="#ef4444" color="#ef4444" />
                <span>Wishlist ({favoritesCount})</span>
              </a>
            )}
          </nav>

          {/* Action CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <button 
              onClick={() => onOpenEmailDossier(null)}
              className="btn btn-outline-gold"
              style={{ padding: '0.65rem 1.15rem', fontSize: '0.85rem' }}
              title="Get all property details sent directly to your email"
            >
              <Mail size={15} />
              <span className="hide-mobile">Email Me Details</span>
            </button>

            <a 
              href={`tel:${companyDetails.phones[0]}`}
              className="btn btn-gold"
              style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}
            >
              <Phone size={15} />
              <span>Call Advisory</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: 'rgba(16, 38, 72, 0.8)',
                border: '1px solid rgba(197, 155, 39, 0.4)',
                color: '#edd06f',
                padding: '0.5rem',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'none'
              }}
              className="mobile-toggle"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div style={{
            background: 'var(--navy-950)',
            borderBottom: '1px solid var(--border-gold)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.1rem'
          }}>
            <a href="#properties" onClick={() => setMobileMenuOpen(false)} style={mobileLinkStyle}>Curated Properties</a>
            <a href="#3d-experience" onClick={() => setMobileMenuOpen(false)} style={mobileLinkStyle}>Interactive 3D Virtual Tour</a>
            <a href="#building-videos" onClick={() => setMobileMenuOpen(false)} style={mobileLinkStyle}>Live Building Videos (4K)</a>
            <a href="#emi-calculator" onClick={() => setMobileMenuOpen(false)} style={mobileLinkStyle}>Mortgage & EMI Calculator</a>
            <a href="#location" onClick={() => setMobileMenuOpen(false)} style={mobileLinkStyle}>Office Location (Sector 125)</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} style={mobileLinkStyle}>Contact Advisory</a>
            
            {favoritesCount > 0 && (
              <a href="#properties" onClick={() => setMobileMenuOpen(false)} style={{ ...mobileLinkStyle, color: '#f87171' }}>
                Saved Wishlist ({favoritesCount})
              </a>
            )}

            <div style={{ paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <button 
                onClick={() => { setMobileMenuOpen(false); onOpenEmailDossier(null); }}
                className="btn btn-outline-gold" 
                style={{ width: '100%' }}
              >
                <Mail size={16} /> Send Details to My Email
              </button>
              <a href={`tel:${companyDetails.phones[0]}`} className="btn btn-gold" style={{ width: '100%' }}>
                <Phone size={16} /> Call +91 {companyDetails.phones[0]}
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Embedded CSS for responsive toggles */}
      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
          .hide-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}

const navLinkStyle = {
  color: '#e2e8f0',
  textDecoration: 'none',
  fontSize: '0.9rem',
  fontWeight: '500',
  letterSpacing: '0.01em',
  transition: 'all 0.25s ease',
  position: 'relative'
};

const mobileLinkStyle = {
  color: '#ffffff',
  textDecoration: 'none',
  fontSize: '1.05rem',
  fontWeight: '500',
  padding: '0.35rem 0',
  borderBottom: '1px solid rgba(255,255,255,0.05)'
};
