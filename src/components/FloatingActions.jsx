import React from 'react';
import { Phone, Mail, MessageCircle } from 'lucide-react';
import { companyDetails } from '../data/properties';

export default function FloatingActions({ onOpenEmailDossier }) {
  const whatsappUrl = `https://wa.me/91${companyDetails.phones[0]}?text=${encodeURIComponent('Hello Western Real Estates, I am interested in exploring properties in Sunny Enclave, Sector 125, Mohali.')}`;

  return (
    <div className="fab-container">
      
      {/* Email Quick Dispatch FAB */}
      <button
        onClick={() => onOpenEmailDossier(null)}
        className="fab-btn"
        style={{
          background: 'var(--card-gradient)',
          border: '1px solid var(--border-gold)',
          color: '#edd06f'
        }}
        title="Send Property Details to Email"
      >
        <Mail size={22} />
      </button>

      {/* Phone Call FAB */}
      <a
        href={`tel:${companyDetails.phones[0]}`}
        className="fab-btn fab-phone"
        title="Direct Call to +91 8283996261"
      >
        <Phone size={22} />
      </a>

      {/* WhatsApp Quick Chat FAB */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="fab-btn fab-whatsapp"
        title="Chat on WhatsApp (+91 8283996261)"
      >
        <MessageCircle size={24} />
      </a>

    </div>
  );
}
