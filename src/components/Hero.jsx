import React, { useState, useEffect, useRef } from 'react';
import { 
  Building, 
  MapPin, 
  ShieldCheck, 
  Search, 
  ArrowRight, 
  Video, 
  Mail, 
  CheckCircle2, 
  Sparkles,
  Phone,
  Play
} from 'lucide-react';
import { companyDetails } from '../data/properties';

export default function Hero({ onSearch, onOpenEmailDossier }) {
  const [propertyType, setPropertyType] = useState('All');
  const [budget, setBudget] = useState('All');
  const [bhk, setBhk] = useState('All');
  const canvasRef = useRef(null);

  // Dynamic Floating Golden Dust Canvas Particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const handleResize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2.2 + 0.6,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -Math.random() * 0.6 - 0.2,
      alpha: Math.random() * 0.7 + 0.2,
      color: Math.random() > 0.3 ? '#edd06f' : '#fae7a5'
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#c59b27';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch({ propertyType, budget, bhk });
    const target = document.getElementById('properties');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section style={{
      position: 'relative',
      minHeight: '94vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      paddingTop: '3.5rem',
      paddingBottom: '4.5rem',
      background: 'linear-gradient(180deg, #071324 0%, #0a1b33 50%, #050d1a 100%)',
      overflow: 'hidden'
    }}>
      {/* Dynamic Animated Particles Canvas */}
      <canvas 
        ref={canvasRef} 
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1
        }} 
      />

      {/* Ambient Lighting Gradients */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '950px',
        height: '580px',
        background: 'radial-gradient(ellipse at center, rgba(197, 155, 39, 0.15) 0%, rgba(7, 19, 36, 0) 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Majestic Brand Logo Emblem in Hero Background */}
      <div 
        style={{
          position: 'absolute',
          top: '42%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(580px, 88vw)',
          height: 'min(580px, 88vw)',
          pointerEvents: 'none',
          zIndex: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img 
          src="/logo-watermark.png" 
          alt="Western Real Estates Logo Emblem"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            filter: 'drop-shadow(0 0 45px rgba(223, 183, 67, 0.55))',
            animation: 'heroLogoFloat 9s ease-in-out infinite alternate',
          }}
        />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '980px', margin: '0 auto', textAlign: 'center' }}>
          
          {/* Official Emblem Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.4rem' }}>
            <span className="badge-gold neon-border-animated">
              <Sparkles size={13} />
              <span>Official Luxury Advisory • Sunny Enclave, Sector 125, Mohali</span>
            </span>
          </div>

          {/* Main Editorial Headline */}
          <h1 style={{
            fontSize: 'clamp(2.4rem, 5.2vw, 4.4rem)',
            fontWeight: '700',
            lineHeight: 1.15,
            marginBottom: '1.4rem',
            color: '#ffffff'
          }}>
            Distinctive Architectural Estates & <br />
            <span className="text-gold-gradient">Luxury Living in Mohali</span>
          </h1>

          {/* Descriptive Subtitle */}
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: '#cbd5e1',
            lineHeight: 1.7,
            maxWidth: '820px',
            margin: '0 auto 2.5rem',
            fontFamily: 'var(--font-body)'
          }}>
            Representing premier independent villas, luxury builder floors, commercial SCOs, and residential plots in 
            <strong style={{ color: '#fae7a5' }}> Sunny Enclave, Sector 125, SAS Nagar (140301)</strong>. Explore live 4K architectural drone reference videos, verified PUDA/GMADA titles, and instant email dossier delivery.
          </p>

          {/* Primary Action Buttons */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: '3rem'
          }}>
            <a href="#properties" className="btn btn-gold">
              <span>Browse Verified Properties</span>
              <ArrowRight size={17} />
            </a>

            <a href="#building-videos" className="btn btn-navy" style={{ border: '1px solid rgba(197, 155, 39, 0.45)' }}>
              <span style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                background: 'rgba(197, 155, 39, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Play size={12} color="#fae7a5" fill="#fae7a5" />
              </span>
              <span>Watch Live Building Videos (4K)</span>
            </a>

            <button 
              onClick={() => onOpenEmailDossier(null)}
              className="btn btn-outline-gold"
            >
              <Mail size={16} />
              <span>Email Me Full Catalog</span>
            </button>
          </div>

          {/* Quick Real Estate Filter Search Bar */}
          <div className="luxury-card neon-border-animated" style={{
            padding: '1.5rem',
            border: '1px solid rgba(197, 155, 39, 0.4)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.7)',
            marginBottom: '3.5rem'
          }}>
            <form onSubmit={handleSearchSubmit} style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr)) 140px',
              gap: '1rem',
              alignItems: 'flex-end',
              textAlign: 'left'
            }} className="hero-search-grid">
              
              {/* Field 1: Property Type */}
              <div>
                <label style={labelStyle}>Property Type</label>
                <select 
                  value={propertyType} 
                  onChange={(e) => setPropertyType(e.target.value)}
                  style={selectStyle}
                >
                  <option value="All">All Property Types</option>
                  <option value="Villas">Luxury Villas (Sec 125)</option>
                  <option value="Builder Floors">Builder Floors with Lift</option>
                  <option value="Commercial">Commercial SCOs / Showrooms</option>
                  <option value="Plots">Gated Residential Plots</option>
                  <option value="Penthouses">Sky Penthouses</option>
                </select>
              </div>

              {/* Field 2: Budget */}
              <div>
                <label style={labelStyle}>Price Range</label>
                <select 
                  value={budget} 
                  onChange={(e) => setBudget(e.target.value)}
                  style={selectStyle}
                >
                  <option value="All">Any Budget</option>
                  <option value="under1cr">Under ₹ 1.00 Crore</option>
                  <option value="1cr-2cr">₹ 1.00 Cr – ₹ 2.00 Cr</option>
                  <option value="above2cr">Above ₹ 2.00 Crores</option>
                </select>
              </div>

              {/* Field 3: BHK / Size */}
              <div>
                <label style={labelStyle}>Configuration</label>
                <select 
                  value={bhk} 
                  onChange={(e) => setBhk(e.target.value)}
                  style={selectStyle}
                >
                  <option value="All">Any Configuration</option>
                  <option value="3">3 BHK Luxury Floor</option>
                  <option value="4">4 BHK Independent Villa</option>
                  <option value="5">5 BHK Triplex Penthouse</option>
                  <option value="plot">Plots (100–300 Gaj)</option>
                </select>
              </div>

              {/* Submit Button */}
              <div>
                <button type="submit" className="btn btn-gold" style={{ width: '100%', height: '48px', padding: 0 }}>
                  <Search size={18} />
                  <span>Search</span>
                </button>
              </div>

            </form>
          </div>

          {/* Dynamic Animated Metrics / Trust Signals */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
            gap: '1.25rem',
            paddingTop: '1rem'
          }}>
            <div style={statCardStyle}>
              <div style={statNumberStyle}>15+</div>
              <div style={statLabelStyle}>Years in Tricity Advisory</div>
            </div>

            <div style={statCardStyle}>
              <div style={statNumberStyle}>1,200+</div>
              <div style={statLabelStyle}>Families & Clients Settled</div>
            </div>

            <div style={statCardStyle}>
              <div style={statNumberStyle}>100%</div>
              <div style={statLabelStyle}>Clear Title & Registry Verification</div>
            </div>

            <div style={statCardStyle}>
              <div style={statNumberStyle}>Sector 125</div>
              <div style={statLabelStyle}>Sunny Enclave Headquarters</div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-search-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

const labelStyle = {
  display: 'block',
  fontSize: '0.78rem',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  color: '#edd06f',
  fontWeight: '600',
  marginBottom: '0.4rem'
};

const selectStyle = {
  width: '100%',
  height: '48px',
  background: 'rgba(7, 19, 36, 0.95)',
  border: '1px solid rgba(197, 155, 39, 0.3)',
  borderRadius: '8px',
  color: '#ffffff',
  padding: '0 0.85rem',
  fontSize: '0.9rem',
  outline: 'none',
  cursor: 'pointer'
};

const statCardStyle = {
  background: 'rgba(11, 28, 54, 0.55)',
  border: '1px solid rgba(197, 155, 39, 0.25)',
  borderRadius: '12px',
  padding: '1.25rem 1rem',
  textAlign: 'center',
  backdropFilter: 'blur(10px)',
  transition: 'transform 0.3s ease, border-color 0.3s ease'
};

const statNumberStyle = {
  fontFamily: 'var(--font-serif)',
  fontSize: '1.85rem',
  fontWeight: '700',
  background: 'var(--gold-gradient)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginBottom: '0.2rem'
};

const statLabelStyle = {
  fontSize: '0.82rem',
  color: '#cbd5e1',
  fontWeight: '500'
};
