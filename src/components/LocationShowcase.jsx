import React, { useState } from 'react';
import { MapPin, Navigation, ExternalLink, Clock, Building, ShieldCheck } from 'lucide-react';
import { companyDetails } from '../data/properties';

export default function LocationShowcase() {
  const [activeCategory, setActiveCategory] = useState('All');

  const landmarkCategories = ['All', 'Shopping', 'Healthcare', 'Transit', 'Education & IT'];

  const landmarks = [
    { name: "VR Punjab Mega Mall", distance: "4 Mins", icon: "🛍️", category: "Shopping" },
    { name: "Max Super Speciality Hospital", distance: "8 Mins", icon: "🏥", category: "Healthcare" },
    { name: "National Highway 21 (PR-7 Corridor)", distance: "2 Mins", icon: "🛣️", category: "Transit" },
    { name: "Chandigarh Sector 43 ISBT", distance: "14 Mins", icon: "🚌", category: "Transit" },
    { name: "Shaheed Bhagat Singh Int'l Airport", distance: "20 Mins", icon: "✈️", category: "Transit" },
    { name: "IT City & Infosys Mohali", distance: "18 Mins", icon: "🏢", category: "Education & IT" },
    { name: "DPS & Rayat Bahra University Belt", distance: "6 Mins", icon: "🎓", category: "Education & IT" },
    { name: "Fortis Hospital Mohali", distance: "12 Mins", icon: "🚑", category: "Healthcare" }
  ];

  const filteredLandmarks = activeCategory === 'All' 
    ? landmarks 
    : landmarks.filter(l => l.category === activeCategory);

  return (
    <section id="location" className="section-padding" style={{
      background: 'var(--navy-900)',
      position: 'relative'
    }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 3rem' }}>
          <div className="badge-gold" style={{ marginBottom: '1rem' }}>
            <MapPin size={14} />
            <span>Strategic Tricity Location</span>
          </div>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            color: '#ffffff',
            lineHeight: 1.2,
            marginBottom: '1rem'
          }}>
            Located in the Heart of <span className="text-gold-gradient">Sunny Enclave, Sector 125</span>
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Visit our dedicated advisory headquarters in SAS Nagar Mohali. Enjoy seamless 4-lane connectivity to Chandigarh, the International Airport, and major commercial hubs.
          </p>
          <div className="gold-divider" />
        </div>

        {/* Address Card & Map Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          
          {/* Left: Detailed Address & Credentials Card */}
          <div className="luxury-card" style={{ padding: '2.2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div className="badge-navy" style={{ marginBottom: '1.25rem' }}>
                <Building size={14} color="#edd06f" />
                <span>Western Real Estates Headquarters</span>
              </div>

              <h3 style={{
                fontSize: '1.65rem',
                color: '#ffffff',
                fontFamily: 'var(--font-serif)',
                marginBottom: '1rem',
                lineHeight: 1.3
              }}>
                H.No 4058 Sunny Enclave
              </h3>

              <div style={{
                fontSize: '1.1rem',
                color: '#fae7a5',
                fontWeight: '600',
                marginBottom: '0.5rem',
                lineHeight: 1.4
              }}>
                Sector 125, SAS Nagar, Mohali (Punjab)
              </div>

              <div style={{
                fontSize: '1rem',
                color: '#cbd5e1',
                marginBottom: '1.75rem'
              }}>
                Postal PIN Code: <strong style={{ color: '#ffffff' }}>140301</strong>
              </div>

              {/* Verified Features */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#e2e8f0', fontSize: '0.92rem' }}>
                  <Clock size={16} color="#c59b27" />
                  <span>Office Hours: <strong>9:30 AM – 8:00 PM</strong> (Open All 7 Days)</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#e2e8f0', fontSize: '0.92rem' }}>
                  <ShieldCheck size={16} color="#c59b27" />
                  <span>RERA Registered Tricity Property Consultants</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#e2e8f0', fontSize: '0.92rem' }}>
                  <Navigation size={16} color="#c59b27" />
                  <span>Direct Wide Boulevard Access & Visitor Parking</span>
                </div>
              </div>
            </div>

            {/* Direct Google Maps Action */}
            <div>
              <a
                href={companyDetails.mapsLink}
                target="_blank"
                rel="noreferrer"
                className="btn btn-gold"
                style={{ width: '100%', padding: '0.9rem' }}
              >
                <Navigation size={17} />
                <span>Open in Google Maps Application</span>
                <ExternalLink size={15} />
              </a>
            </div>
          </div>

          {/* Right: Embedded Google Maps Preview */}
          <div className="luxury-card" style={{
            padding: 0,
            overflow: 'hidden',
            border: '1px solid rgba(197, 155, 39, 0.4)',
            height: '420px',
            position: 'relative'
          }}>
            <iframe
              title="Western Real Estates Location Map - Sunny Enclave Sector 125 Mohali"
              src="https://maps.google.com/maps?q=Sunny+Enclave+Sector+125+Mohali+Punjab+140301&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'contrast(1.05) saturate(1.1)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            
            {/* Direct Link Tag Over Map */}
            <a
              href={companyDetails.mapsLink}
              target="_blank"
              rel="noreferrer"
              style={{
                position: 'absolute',
                bottom: '1rem',
                right: '1rem',
                background: 'rgba(7, 19, 36, 0.92)',
                backdropFilter: 'blur(10px)',
                border: '1px solid var(--border-gold)',
                color: '#fae7a5',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: '600',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                boxShadow: '0 8px 20px rgba(0,0,0,0.5)'
              }}
            >
              <span>Get Turn-by-Turn GPS</span>
              <ExternalLink size={13} />
            </a>
          </div>

        </div>

        {/* Connectivity / Proximity Highlights Matrix with Filter Tabs */}
        <div style={{
          background: 'rgba(11, 28, 54, 0.5)',
          border: '1px solid rgba(197, 155, 39, 0.25)',
          borderRadius: '16px',
          padding: '2rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <h4 style={{
              color: '#fae7a5',
              fontSize: '1.2rem',
              fontFamily: 'var(--font-serif)',
              margin: 0
            }}>
              Sector 125 Sunny Enclave • Proximity & Driving Times
            </h4>

            {/* Category Filter Pills */}
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {landmarkCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    background: activeCategory === cat ? 'var(--gold-gradient)' : 'rgba(7, 19, 36, 0.7)',
                    color: activeCategory === cat ? '#071324' : '#cbd5e1',
                    border: activeCategory === cat ? 'none' : '1px solid rgba(197, 155, 39, 0.25)',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.78rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem'
          }}>
            {filteredLandmarks.map((item, idx) => (
              <div 
                key={idx}
                style={{
                  background: 'rgba(7, 19, 36, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '10px',
                  padding: '0.9rem 1.1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
                  <span style={{ fontSize: '0.88rem', color: '#e2e8f0', fontWeight: '500' }}>{item.name}</span>
                </div>
                <span style={{
                  fontSize: '0.82rem',
                  fontWeight: '700',
                  color: '#fae7a5',
                  background: 'rgba(197, 155, 39, 0.15)',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '6px'
                }}>
                  {item.distance}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
