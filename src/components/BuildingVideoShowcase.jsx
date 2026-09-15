import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Video, 
  Sparkles, 
  Compass, 
  Layers, 
  MapPin, 
  ShieldCheck, 
  Mail, 
  Phone, 
  ArrowRight, 
  FileText, 
  Maximize2,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { companyDetails } from '../data/properties';

export default function BuildingVideoShowcase({ onOpenEmailDossier }) {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [showBlueprint, setShowBlueprint] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const videoTours = [
    {
      id: "v1",
      title: "Royal Spanish Villa Architectural Walkthrough",
      subtitle: "Full 4K Cinematic Drone & Interior Tour in Sunny Enclave, Sector 125",
      youtubeId: "Brupa_JqbPw",
      category: "Luxury Villa",
      price: "₹ 1.85 Crore",
      location: "Sector 125, Sunny Enclave, Mohali",
      specs: "4 BHK • 250 Sq. Yards (10 Marla) • 3,800 Sq. Ft.",
      rera: "PBRERA-SAS80-PR0641",
      delivery: "100% Ready for Handover & Registry",
      highlights: [
        "22-Foot Double Height Italian Marble Living Hall",
        "Designer Cantilevered Glass Balcony with Teakwood Louvers",
        "Rooftop Stargazing Deck with Private BBQ Pavilion",
        "Independent 2-Car Porch with EV Fast Charger"
      ],
      blueprintUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: "v2",
      title: "Skyline Triplex Penthouse & Plunge Pool",
      subtitle: "Unobstructed Views of Shivalik Foothills & Tricity Expressway",
      youtubeId: "j3FaaXf_2iw",
      category: "Sky Penthouse",
      price: "₹ 3.20 Crores",
      location: "Sector 125 / Expressway Corridor, Mohali",
      specs: "5 BHK • 5,400 Sq. Ft. • Private Plunge Pool",
      rera: "PBRERA-SAS80-PR0890",
      delivery: "Ready for Ultra-Luxury Fitout",
      highlights: [
        "Private Temperature-Controlled Heated Infinity Plunge Pool",
        "Direct Keycard Elevator Foyer into Penthouse Lounge",
        "Panoramic 360-Degree Wraparound Terrace Deck",
        "Custom Valcucine Italian Modular Kitchen"
      ],
      blueprintUrl: "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: "v3",
      title: "Modern Architectural Mega Mansions & Masterplan",
      subtitle: "Gated Community Infrastructure & High-Rise Boulevard Fly-Through",
      youtubeId: "7_29vB7_lBs",
      category: "Gated Enclave",
      price: "₹ 1.42 Cr – ₹ 2.45 Cr",
      location: "Sunny Enclave Sector 125 Main Boulevard",
      specs: "Villas & Independent Floors (6 to 12 Marla)",
      rera: "PBRERA-SAS80-AG0492",
      delivery: "Clear GMADA/PUDA Approved Masterplan",
      highlights: [
        "Underground Electrification & Wide 40ft/60ft Internal Roads",
        "Biometric Security Barrier & 24/7 Monitored CCTV",
        "Central Landscaped Parks with Jogging Track & Children Play Area",
        "Walking Distance to Commercial Markets & Schools"
      ],
      blueprintUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: "v4",
      title: "Commercial SCO Showrooms on Main 80ft Road",
      subtitle: "High-Footfall Retail & Regional Corporate Headquarters Showcase",
      youtubeId: "PHhuIg6oLC4",
      category: "Commercial SCO",
      price: "₹ 2.45 Crores",
      location: "Main Sector 125 Commercial Belt, Mohali",
      specs: "Basement + GF + 3 Floors • 4,200 Sq. Ft.",
      rera: "PBRERA-SAS80-CM0198",
      delivery: "Immediate Handover for Retail Brands",
      highlights: [
        "Prime 80-Foot Arterial Boulevard Facing",
        "Heavy Footfall Corridor with 15,000+ Resident Families",
        "Dedicated Front Customer Parking & Transformer Load",
        "Massive Rental Yield & Capital Appreciation Potential"
      ],
      blueprintUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
    }
  ];

  const currentVideo = videoTours[activeVideoIndex];

  return (
    <section id="building-videos" className="section-padding" style={{
      background: 'linear-gradient(180deg, #050d1a 0%, #08162b 50%, #050d1a 100%)',
      borderTop: '1px solid rgba(197, 155, 39, 0.25)',
      borderBottom: '1px solid rgba(197, 155, 39, 0.25)',
      position: 'relative'
    }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '860px', margin: '0 auto 3rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
            <span className="badge-live">
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }} />
              <span>LIVE ARCHITECTURAL VIDEO REFERENCE • MOHALI</span>
            </span>
            <span className="badge-gold">
              <Sparkles size={13} />
              <span>4K Ultra HD Tours</span>
            </span>
          </div>

          <h2 style={{
            fontSize: 'clamp(2.1rem, 4vw, 3.4rem)',
            color: '#ffffff',
            lineHeight: 1.2,
            marginBottom: '1rem'
          }}>
            Real Building References & <br />
            <span className="text-gold-gradient">Cinematic Architectural Video Tours</span>
          </h2>

          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Watch authentic 4K drone fly-throughs and finished structural walkthroughs for our luxury developments in <strong style={{ color: '#fae7a5' }}>Sunny Enclave, Sector 125, Mohali</strong>.
          </p>
          <div className="gold-divider" />
        </div>

        {/* Video Selection Pills */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          {videoTours.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveVideoIndex(idx);
                setShowBlueprint(false);
              }}
              style={{
                background: activeVideoIndex === idx ? 'var(--card-gradient)' : 'rgba(11, 28, 54, 0.5)',
                border: activeVideoIndex === idx ? '1px solid var(--gold-400)' : '1px solid rgba(197, 155, 39, 0.2)',
                boxShadow: activeVideoIndex === idx ? 'var(--shadow-gold)' : 'none',
                borderRadius: '12px',
                padding: '1rem 1.25rem',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.35rem',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="badge-navy" style={{ fontSize: '0.72rem', padding: '0.2rem 0.6rem' }}>
                  {item.category}
                </span>
                <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#fae7a5' }}>
                  {item.price}
                </span>
              </div>

              <div style={{
                color: activeVideoIndex === idx ? '#ffffff' : '#cbd5e1',
                fontSize: '0.95rem',
                fontWeight: '600',
                marginTop: '0.2rem',
                lineHeight: 1.3
              }}>
                {item.title}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#94a3b8', fontSize: '0.78rem' }}>
                <MapPin size={12} color="#c59b27" />
                <span>Sector 125, Mohali</span>
              </div>

              {activeVideoIndex === idx && (
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: 'var(--gold-gradient)'
                }} />
              )}
            </button>
          ))}
        </div>

        {/* Master Cinema Video Player Box */}
        <div className="luxury-card neon-border-animated" style={{
          padding: 0,
          overflow: 'hidden',
          border: '1px solid var(--border-gold-bright)',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.9)'
        }}>
          
          {/* Top Live Video Broadcast Header */}
          <div style={{
            background: 'rgba(7, 19, 36, 0.95)',
            padding: '1rem 1.5rem',
            borderBottom: '1px solid rgba(197, 155, 39, 0.3)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span className="badge-live">
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }} />
                <span>LIVE ARCHITECTURE CAMERA</span>
              </span>
              <span style={{ color: '#fae7a5', fontSize: '0.85rem', fontWeight: '600' }}>
                {currentVideo.title}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.82rem', color: '#cbd5e1' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Clock size={14} color="#c59b27" />
                <span>Local Mohali Time: <strong style={{ color: '#ffffff' }}>{currentTime || '10:30 AM'}</strong></span>
              </span>
              <button
                onClick={() => setShowBlueprint(!showBlueprint)}
                className="btn btn-navy"
                style={{ padding: '0.45rem 0.9rem', fontSize: '0.8rem', border: '1px solid var(--border-gold)' }}
              >
                <Layers size={14} color="#edd06f" />
                <span>{showBlueprint ? 'Back to Video Tour' : 'View Floor Elevation'}</span>
              </button>
            </div>
          </div>

          {/* 16:9 Video Canvas or Floor Plan View */}
          <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', background: '#000000' }}>
            {showBlueprint ? (
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#071324'
              }}>
                <img 
                  src={currentVideo.blueprintUrl} 
                  alt="Architectural Blueprint" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.9)' }} 
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(5, 13, 26, 0.75)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '2rem',
                  textAlign: 'center'
                }}>
                  <Layers size={48} color="#c59b27" style={{ marginBottom: '1rem' }} />
                  <h3 style={{ color: '#ffffff', fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '0.5rem' }}>
                    Architectural Layout & Elevation Specs
                  </h3>
                  <p style={{ color: '#cbd5e1', maxWidth: '600px', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                    Approved by PUDA / GMADA with clear 40ft road frontage, east-facing Vaastu alignment, and seismic zone IV engineered foundation.
                  </p>
                  <button 
                    onClick={() => setShowBlueprint(false)} 
                    className="btn btn-gold"
                  >
                    <Play size={16} />
                    <span>Return to Live 4K Video Stream</span>
                  </button>
                </div>
              </div>
            ) : (
              <iframe
                title={currentVideo.title}
                src={`https://www.youtube-nocookie.com/embed/${currentVideo.youtubeId}?autoplay=0&rel=0&modestbranding=1&playsinline=1`}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 0
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>

          {/* Video Metadata & Live Specification Grid */}
          <div style={{
            background: 'rgba(7, 19, 36, 0.98)',
            padding: '1.75rem 2rem',
            borderTop: '1px solid rgba(197, 155, 39, 0.3)'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.75rem',
              alignItems: 'center'
            }}>
              
              {/* Left Details */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#edd06f', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                  <MapPin size={15} color="#edd06f" />
                  <span>{currentVideo.location}</span>
                  <span>•</span>
                  <span>{currentVideo.specs}</span>
                </div>

                <h3 style={{ fontSize: '1.45rem', color: '#ffffff', fontFamily: 'var(--font-serif)', marginBottom: '0.4rem' }}>
                  {currentVideo.title}
                </h3>

                <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginBottom: '1rem', lineHeight: 1.5 }}>
                  {currentVideo.subtitle}
                </p>

                {/* Highlights List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  {currentVideo.highlights.map((h, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#cbd5e1', fontSize: '0.86rem' }}>
                      <CheckCircle2 size={14} color="#c59b27" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Actions & Direct Mail Dispatcher */}
              <div style={{
                background: 'rgba(16, 38, 72, 0.5)',
                border: '1px solid rgba(197, 155, 39, 0.3)',
                borderRadius: '12px',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Verified Status:</span>
                  <span className="badge-gold" style={{ fontSize: '0.75rem' }}>
                    <ShieldCheck size={12} />
                    <span>{currentVideo.delivery}</span>
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Priced at:</span>
                  <span style={{ fontSize: '1.6rem', fontWeight: '700', color: '#fae7a5', fontFamily: 'var(--font-serif)' }}>
                    {currentVideo.price}
                  </span>
                </div>

                {/* Primary Button to Send Details to Client's Email */}
                <button
                  onClick={() => onOpenEmailDossier({
                    title: currentVideo.title,
                    price: currentVideo.price,
                    location: currentVideo.location,
                    category: currentVideo.category,
                    area: currentVideo.specs,
                    builtUpArea: currentVideo.specs,
                    status: currentVideo.delivery,
                    highlights: currentVideo.highlights,
                    description: currentVideo.subtitle
                  })}
                  className="btn btn-gold"
                  style={{ width: '100%', padding: '0.85rem' }}
                >
                  <Mail size={16} />
                  <span>Send Full Video Tour & Specs to Mail</span>
                </button>

                {/* Direct Hotline Call */}
                <a
                  href={`tel:${companyDetails.phones[0]}`}
                  className="btn btn-navy"
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-gold)', color: '#fae7a5' }}
                >
                  <Phone size={15} />
                  <span>Schedule Site Walkthrough (+91 {companyDetails.phones[0]})</span>
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
