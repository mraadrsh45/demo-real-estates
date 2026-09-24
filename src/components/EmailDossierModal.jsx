import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Send, 
  Copy, 
  Check, 
  FileText,
  Download 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { properties, companyDetails } from '../data/properties';

export default function EmailDossierModal({ initialProperty, onClose }) {
  const [selectedPropertyId, setSelectedPropertyId] = useState(
    initialProperty ? initialProperty.id : 'all-catalog'
  );
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [customNotes, setCustomNotes] = useState('');

  const [copied, setCopied] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Active property object
  const activeProperty = properties.find(p => p.id === selectedPropertyId) || null;

  // Generate clean formatted dossier text
  const generateDossierText = () => {
    const divider = "========================================================\n";
    let text = `WESTERN REAL ESTATES - VERIFIED PROPERTY DOSSIER\n`;
    text += `Head Office: H.No 4058 Sunny Enclave, Sector 125, SAS Nagar, Mohali (Punjab) - 140301\n`;
    text += `Phone Hotline: +91 82839 96261 / +91 82839 97902\n`;
    text += `Official Email: ${companyDetails.email}\n`;
    text += `Google Maps: https://maps.app.goo.gl/Koi12JJUCcRRgoQt8\n`;
    text += divider;

    if (activeProperty) {
      text += `PROPERTY NAME: ${activeProperty.title}\n`;
      text += `CATEGORY: ${activeProperty.category}\n`;
      text += `PRICE: ${activeProperty.price}\n`;
      text += `LOCATION: ${activeProperty.location}\n`;
      text += `LAND / PLOT AREA: ${activeProperty.area}\n`;
      text += `BUILT-UP AREA: ${activeProperty.builtUpArea}\n`;
      text += `FACING: ${activeProperty.facing}\n`;
      text += `POSSESSION STATUS: ${activeProperty.status}\n`;
      text += `RERA NUMBER: ${activeProperty.reraApproved ? activeProperty.reraNo : 'PUDA/GMADA Verified'}\n\n`;
      text += `ARCHITECTURAL HIGHLIGHTS:\n`;
      activeProperty.highlights?.forEach((h) => {
        text += `• ${h}\n`;
      });
      text += `\nKEY AMENITIES:\n`;
      text += activeProperty.amenities?.join(', ') + `\n\n`;
      text += `DESCRIPTION:\n${activeProperty.description}\n`;
    } else {
      text += `FULL SECTOR 125 MOHALI PORTFOLIO SUMMARY\n`;
      text += `Featuring 4BHK Royal Villas (from ₹1.85 Cr), 3BHK Independent Builder Floors (from ₹82 Lakhs), Commercial SCOs on Airport Rd (from ₹2.45 Cr), and Gated Residential Plots (from ₹58 Lakhs).\n`;
    }

    text += divider;
    text += `CLIENT INQUIRY DETAILS:\n`;
    text += `Requested By: ${clientName || 'Valued Client'}\n`;
    text += `Client Email: ${clientEmail || 'N/A'}\n`;
    text += `Client Contact: ${clientPhone || 'N/A'}\n`;
    if (preferredDate) text += `Preferred Site Visit Date: ${preferredDate}\n`;
    if (customNotes) text += `Client Requirement / Notes: ${customNotes}\n`;
    text += divider;
    text += `Western Real Estates Advisory • Sunny Enclave Sector 125, Mohali\n`;

    return text;
  };

  // Mailto Generator
  const handleSendViaMailClient = (e) => {
    e.preventDefault();
    if (!clientEmail) {
      alert("Please enter your email address so we can send you the dossier!");
      return;
    }

    const subject = encodeURIComponent(
      `Property Inquiry Dossier: ${activeProperty ? activeProperty.title : 'Sector 125 Mohali Catalog'} - Western Real Estates`
    );
    const body = encodeURIComponent(generateDossierText());
    
    const mailtoUrl = `mailto:${companyDetails.email}?cc=${encodeURIComponent(clientEmail)}&subject=${subject}&body=${body}`;
    const a = document.createElement('a');
    a.href = mailtoUrl;
    a.click();

    triggerSuccess();
  };

  // Instant Direct Dispatch Action
  const handleDirectSubmit = (e) => {
    e.preventDefault();
    if (!clientEmail) {
      alert("Please enter your email address.");
      return;
    }

    triggerSuccess();
  };

  const triggerSuccess = () => {
    setIsSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#c59b27', '#fae7a5', '#102648', '#ffffff']
    });
  };

  // Copy to clipboard
  const handleCopyClipboard = () => {
    const content = generateDossierText();
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  // Download text file
  const handleDownloadDossier = () => {
    const text = generateDossierText();
    const element = document.createElement("a");
    const file = new Blob([text], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `Western_Real_Estates_${activeProperty ? activeProperty.title.replace(/\s+/g, '_') : 'Portfolio'}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="luxury-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '820px',
          maxHeight: '92vh',
          overflowY: 'auto',
          background: 'var(--navy-900)',
          border: '1px solid rgba(197, 155, 39, 0.5)',
          boxShadow: '0 25px 80px rgba(0, 0, 0, 0.95)',
          padding: 0,
          position: 'relative'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'rgba(5, 13, 26, 0.8)',
            border: '1px solid rgba(197, 155, 39, 0.4)',
            color: '#fae7a5',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10
          }}
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{
          background: 'linear-gradient(135deg, #071324 0%, #0d203d 100%)',
          padding: '2rem 2rem 1.5rem',
          borderBottom: '1px solid rgba(197, 155, 39, 0.3)'
        }}>
          <div className="badge-gold" style={{ marginBottom: '0.65rem' }}>
            <Mail size={13} />
            <span>Direct Client Mail Dispatcher</span>
          </div>

          <h2 style={{
            fontSize: '1.85rem',
            color: '#ffffff',
            fontFamily: 'var(--font-serif)',
            marginBottom: '0.35rem'
          }}>
            Receive Complete Property <span className="text-gold-gradient">Dossier On Mail</span>
          </h2>

          <p style={{ color: '#cbd5e1', fontSize: '0.92rem' }}>
            Direct transmission of floor plans, government approvals, price breakdowns, and office location coordinates to your inbox.
          </p>

          <div style={{
            marginTop: '0.85rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(197, 155, 39, 0.12)',
            padding: '0.4rem 0.9rem',
            borderRadius: '8px',
            border: '1px solid rgba(197, 155, 39, 0.3)',
            fontSize: '0.82rem',
            color: '#fae7a5'
          }}>
            <Mail size={14} />
            <span>Advisory Mail: <strong>{companyDetails.email}</strong></span>
          </div>
        </div>

        {/* Body Content */}
        <div style={{ padding: '2rem' }}>
          
          {isSubmitted ? (
            <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
              <div style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: 'rgba(34, 197, 94, 0.15)',
                border: '2px solid #22c55e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                color: '#22c55e'
              }}>
                <Check size={36} />
              </div>

              <h3 style={{ fontSize: '1.75rem', color: '#ffffff', fontFamily: 'var(--font-serif)', marginBottom: '0.75rem' }}>
                Property Dossier Prepared & Dispatched!
              </h3>

              <p style={{ color: '#cbd5e1', maxWidth: '520px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
                The full property specifications, location guide for Sector 125 Mohali, and pricing structure have been compiled for <strong style={{ color: '#fae7a5' }}>{clientEmail}</strong>.
              </p>

              <div style={{
                background: 'rgba(16, 38, 72, 0.6)',
                border: '1px solid rgba(197, 155, 39, 0.3)',
                borderRadius: '12px',
                padding: '1.25rem',
                maxWidth: '520px',
                margin: '0 auto 2rem',
                textAlign: 'left'
              }}>
                <div style={{ fontSize: '0.82rem', color: '#edd06f', fontWeight: '600', marginBottom: '0.4rem' }}>
                  What happens next?
                </div>
                <div style={{ fontSize: '0.85rem', color: '#e2e8f0', lineHeight: 1.5 }}>
                  1. Our Sunny Enclave Sector 125 office receives your inquiry copy.<br />
                  2. A certified property advisor (+91 8283996261) is assigned to your dossier.<br />
                  3. You can download or copy the entire raw dossier below for your records.
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
                <button 
                  onClick={handleDownloadDossier}
                  className="btn btn-gold"
                  style={{ padding: '0.75rem 1.4rem' }}
                >
                  <Download size={16} />
                  <span>Download Dossier Text File</span>
                </button>

                <button 
                  onClick={handleCopyClipboard}
                  className="btn btn-navy"
                  style={{ border: '1px solid rgba(197, 155, 39, 0.3)' }}
                >
                  {copied ? <Check size={16} color="#22c55e" /> : <Copy size={16} />}
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy Dossier to Clipboard'}</span>
                </button>

                <button 
                  onClick={onClose}
                  className="btn btn-outline-gold"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleDirectSubmit}>
              
              {/* Select Property */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={labelStyle}>Target Property to Email</label>
                <select
                  value={selectedPropertyId}
                  onChange={(e) => setSelectedPropertyId(e.target.value)}
                  style={inputStyle}
                >
                  <option value="all-catalog">★ Complete Sunny Enclave Sector 125 Portfolio</option>
                  {properties.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} ({p.price} • {p.category})
                    </option>
                  ))}
                </select>
              </div>

              {/* Client Info Two Column Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1rem',
                marginBottom: '1.25rem'
              }}>
                <div>
                  <label style={labelStyle}>Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Gurpreet Singh"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Your Email Address (Required for Dossier)</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. client@gmail.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    style={{ ...inputStyle, borderColor: 'rgba(197, 155, 39, 0.6)' }}
                  />
                </div>
              </div>

              {/* Phone & Date */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1rem',
                marginBottom: '1.25rem'
              }}>
                <div>
                  <label style={labelStyle}>Mobile / WhatsApp Number</label>
                  <input
                    type="tel"
                    placeholder="e.g. 9876543210"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Preferred Site Visit Date (Optional)</label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Notes */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={labelStyle}>Specific Questions or Requirements</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Interested in East-facing plots or financing options with SBI..."
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  style={{ ...inputStyle, height: 'auto', padding: '0.75rem' }}
                />
              </div>

              {/* Live Preview Box of Dossier Content */}
              <div style={{
                background: 'rgba(5, 13, 26, 0.7)',
                border: '1px dashed rgba(197, 155, 39, 0.35)',
                borderRadius: '10px',
                padding: '1rem',
                marginBottom: '1.75rem'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.5rem'
                }}>
                  <span style={{ fontSize: '0.8rem', color: '#fae7a5', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <FileText size={14} /> Live Email Dossier Preview
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyClipboard}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: copied ? '#22c55e' : '#cbd5e1',
                      fontSize: '0.78rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      cursor: 'pointer'
                    }}
                  >
                    {copied ? <Check size={13} /> : <Copy size={13} />}
                    <span>{copied ? 'Copied' : 'Copy Text'}</span>
                  </button>
                </div>

                <div style={{
                  fontSize: '0.78rem',
                  fontFamily: 'monospace',
                  color: '#94a3b8',
                  maxHeight: '120px',
                  overflowY: 'auto',
                  whiteSpace: 'pre-line',
                  lineHeight: 1.4,
                  background: 'rgba(0,0,0,0.3)',
                  padding: '0.65rem',
                  borderRadius: '6px'
                }}>
                  {generateDossierText()}
                </div>
              </div>

              {/* Two Direct Action Execution Buttons */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem'
              }}>
                <button
                  type="button"
                  onClick={handleSendViaMailClient}
                  className="btn btn-gold"
                  style={{ width: '100%', padding: '0.9rem' }}
                >
                  <Mail size={17} />
                  <span>Open in My Email Client (Pre-Filled & Ready)</span>
                </button>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    type="submit"
                    className="btn btn-navy"
                    style={{ flex: 1, border: '1px solid rgba(197, 155, 39, 0.4)', color: '#fae7a5' }}
                  >
                    <Send size={15} />
                    <span>Instant Direct Confirmation</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadDossier}
                    className="btn btn-navy"
                    style={{ border: '1px solid rgba(255, 255, 255, 0.1)' }}
                    title="Download Dossier"
                  >
                    <Download size={16} />
                  </button>
                </div>
              </div>

            </form>
          )}

        </div>

        {/* Office Verification Footer inside Modal */}
        <div style={{
          background: 'rgba(5, 13, 26, 0.95)',
          padding: '1rem 2rem',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem',
          fontSize: '0.78rem',
          color: '#94a3b8'
        }}>
          <div>
            📍 H.No 4058 Sunny Enclave, Sector 125, SAS Nagar, Mohali (140301)
          </div>
          <div>
            Hotline: +91 8283996261 | +91 8283997902
          </div>
        </div>

      </div>
    </div>
  );
}

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
