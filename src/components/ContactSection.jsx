import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  MessageSquare,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { companyDetails } from '../data/properties';

export default function ContactSection({ onOpenEmailDossier }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'Luxury Villa (Sunny Enclave Sec 125)',
    budget: '₹ 1 Cr – ₹ 2 Cr',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email) {
      alert("Please provide an email address.");
      return;
    }

    // Prepare mailto link for direct transmission
    const subject = encodeURIComponent(`New Client Property Inquiry: ${formData.interest} - Western Real Estates`);
    const body = encodeURIComponent(
      `Dear Western Real Estates Advisory Team,\n\n` +
      `I would like to inquire about property options in Sunny Enclave Sector 125, Mohali.\n\n` +
      `Client Details:\n` +
      `• Name: ${formData.name}\n` +
      `• Email: ${formData.email}\n` +
      `• Phone: ${formData.phone}\n` +
      `• Category of Interest: ${formData.interest}\n` +
      `• Expected Budget: ${formData.budget}\n` +
      `• Message / Inspection Request: ${formData.message || 'Please send available options and schedule site visit.'}\n\n` +
      `Regards,\n${formData.name}`
    );

    const mailtoLink = `mailto:${companyDetails.email}?cc=${encodeURIComponent(formData.email)}&subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;

    setSubmitted(true);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#c59b27', '#edd06f', '#ffffff']
    });
  };

  return (
    <section id="contact" className="section-padding" style={{
      background: 'linear-gradient(180deg, #071324 0%, #050d1a 100%)',
      borderTop: '1px solid rgba(197, 155, 39, 0.25)',
      position: 'relative'
    }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 3.5rem' }}>
          <div className="badge-gold" style={{ marginBottom: '1rem' }}>
            <Phone size={14} />
            <span>Direct Client Consultation</span>
          </div>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            color: '#ffffff',
            lineHeight: 1.2,
            marginBottom: '1rem'
          }}>
            Connect with <span className="text-gold-gradient">Western Real Estates</span>
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Speak directly with our senior property advisors or receive customized property portfolios straight to your email.
          </p>
          <div className="gold-divider" />
        </div>

        {/* Contact Info Cards + Form Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '2.5rem'
        }}>
          
          {/* Left Column: Direct Contact Details & Hotlines */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {/* Phone Card */}
            <div className="luxury-card" style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1rem' }}>
                <div style={iconBoxStyle}>
                  <Phone size={22} color="#edd06f" />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#edd06f', textTransform: 'uppercase', fontWeight: '600', letterSpacing: '0.05em' }}>
                    Call Advisors Directly
                  </div>
                  <h4 style={{ color: '#ffffff', fontSize: '1.15rem' }}>Instant Hotline & WhatsApp</h4>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <a 
                  href={`tel:${companyDetails.phones[0]}`}
                  style={contactLinkStyle}
                >
                  <span style={{ fontSize: '1.1rem', fontWeight: '700', color: '#fae7a5' }}>
                    +91 {companyDetails.phones[0]}
                  </span>
                  <span className="badge-gold" style={{ fontSize: '0.72rem' }}>Call Primary</span>
                </a>

                <a 
                  href={`tel:${companyDetails.phones[1]}`}
                  style={contactLinkStyle}
                >
                  <span style={{ fontSize: '1.1rem', fontWeight: '700', color: '#ffffff' }}>
                    +91 {companyDetails.phones[1]}
                  </span>
                  <span className="badge-navy" style={{ fontSize: '0.72rem' }}>Call Secondary</span>
                </a>
              </div>
            </div>

            {/* Email Card */}
            <div className="luxury-card" style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1rem' }}>
                <div style={iconBoxStyle}>
                  <Mail size={22} color="#edd06f" />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#edd06f', textTransform: 'uppercase', fontWeight: '600', letterSpacing: '0.05em' }}>
                    Official Email Communications
                  </div>
                  <h4 style={{ color: '#ffffff', fontSize: '1.15rem' }}>Direct Dossier & Inquiry Inbox</h4>
                </div>
              </div>

              <div style={{
                background: 'rgba(7, 19, 36, 0.9)',
                padding: '0.9rem 1.1rem',
                borderRadius: '8px',
                border: '1px solid rgba(197, 155, 39, 0.3)',
                marginBottom: '1rem'
              }}>
                <a 
                  href={`mailto:${companyDetails.email}`}
                  style={{ color: '#fae7a5', textDecoration: 'none', fontWeight: '600', fontSize: '0.95rem', wordBreak: 'break-all' }}
                >
                  {companyDetails.email}
                </a>
              </div>

              <button
                onClick={() => onOpenEmailDossier(null)}
                className="btn btn-outline-gold"
                style={{ width: '100%', padding: '0.75rem' }}
              >
                <Mail size={16} />
                <span>Launch Email Dossier Dispatcher</span>
              </button>
            </div>

            {/* Office Address Card */}
            <div className="luxury-card" style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1rem' }}>
                <div style={iconBoxStyle}>
                  <MapPin size={22} color="#edd06f" />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#edd06f', textTransform: 'uppercase', fontWeight: '600', letterSpacing: '0.05em' }}>
                    Advisory Headquarters
                  </div>
                  <h4 style={{ color: '#ffffff', fontSize: '1.15rem' }}>Sunny Enclave Sector 125</h4>
                </div>
              </div>

              <p style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                <strong>H.No 4058 Sunny Enclave</strong><br />
                Sector 125, SAS Nagar, Mohali (Punjab)<br />
                PIN Code: <strong>140301</strong>
              </p>

              <a
                href={companyDetails.mapsLink}
                target="_blank"
                rel="noreferrer"
                style={{
                  color: '#fae7a5',
                  textDecoration: 'none',
                  fontSize: '0.86rem',
                  fontWeight: '600',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <span>Navigate on Google Maps →</span>
              </a>
            </div>

          </div>

          {/* Right Column: Direct Consultation Form */}
          <div className="luxury-card" style={{
            padding: '2.2rem',
            border: '1px solid rgba(197, 155, 39, 0.4)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7)'
          }}>
            <h3 style={{
              fontSize: '1.5rem',
              color: '#ffffff',
              fontFamily: 'var(--font-serif)',
              marginBottom: '0.4rem'
            }}>
              Schedule a Site Visit or Request Dossier
            </h3>

            <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginBottom: '1.75rem' }}>
              Fill out your requirements. We will send you verified floor layouts, pricing, and schedule a private escorted visit in Sector 125.
            </p>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'rgba(34, 197, 94, 0.15)',
                  border: '2px solid #22c55e',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem',
                  color: '#22c55e'
                }}>
                  <CheckCircle2 size={32} />
                </div>
                <h4 style={{ color: '#ffffff', fontSize: '1.3rem', marginBottom: '0.5rem', fontFamily: 'var(--font-serif)' }}>
                  Inquiry Dispatched Successfully!
                </h4>
                <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                  Your email client has opened with the pre-filled inquiry. Our senior advisors at Sector 125 Mohali will connect with you immediately.
                </p>
                <button 
                  onClick={() => setSubmitted(false)} 
                  className="btn btn-gold"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1.1rem' }}>
                  <label style={labelStyle}>Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jaspreet Singh"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={inputStyle}
                  />
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '1rem',
                  marginBottom: '1.1rem'
                }}>
                  <div>
                    <label style={labelStyle}>Email Address (For Dossier)</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. name@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 8283996261"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '1rem',
                  marginBottom: '1.1rem'
                }}>
                  <div>
                    <label style={labelStyle}>Interested Category</label>
                    <select
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      style={inputStyle}
                    >
                      <option value="Luxury Villa (Sunny Enclave Sec 125)">Luxury Villa (Sector 125)</option>
                      <option value="3BHK Builder Floor with Lift">3BHK Builder Floor with Lift</option>
                      <option value="Commercial SCO / Showroom">Commercial SCO / Showroom</option>
                      <option value="Residential Plots (100–300 Gaj)">Residential Plots</option>
                      <option value="Sky Penthouse Triplex">Sky Penthouse</option>
                    </select>
                  </div>

                  <div>
                    <label style={labelStyle}>Estimated Budget</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      style={inputStyle}
                    >
                      <option value="₹ 50 Lakhs – ₹ 80 Lakhs">₹ 50 Lakhs – ₹ 80 Lakhs</option>
                      <option value="₹ 80 Lakhs – ₹ 1.50 Cr">₹ 80 Lakhs – ₹ 1.50 Cr</option>
                      <option value="₹ 1.50 Cr – ₹ 2.50 Cr">₹ 1.50 Cr – ₹ 2.50 Cr</option>
                      <option value="₹ 2.50 Cr+">₹ 2.50 Cr+</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={labelStyle}>Message / Site Visit Time</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your requirements or preferred time to visit our Sunny Enclave office..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ ...inputStyle, height: 'auto', padding: '0.75rem' }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-gold"
                  style={{ width: '100%', padding: '0.9rem', fontSize: '0.95rem' }}
                >
                  <Send size={16} />
                  <span>Send Direct Inquiry & Email Details</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}

const iconBoxStyle = {
  width: '46px',
  height: '46px',
  borderRadius: '10px',
  background: 'rgba(197, 155, 39, 0.15)',
  border: '1px solid rgba(197, 155, 39, 0.35)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const contactLinkStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: 'rgba(7, 19, 36, 0.7)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  padding: '0.75rem 1rem',
  borderRadius: '8px',
  textDecoration: 'none',
  transition: 'all 0.2s ease'
};

const labelStyle = {
  display: 'block',
  fontSize: '0.78rem',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  color: '#edd06f',
  fontWeight: '600',
  marginBottom: '0.35rem'
};

const inputStyle = {
  width: '100%',
  height: '46px',
  background: 'rgba(7, 19, 36, 0.95)',
  border: '1px solid rgba(197, 155, 39, 0.3)',
  borderRadius: '8px',
  color: '#ffffff',
  padding: '0 0.85rem',
  fontSize: '0.9rem',
  outline: 'none'
};
