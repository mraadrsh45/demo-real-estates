import React, { useState, useEffect } from 'react';
import { Sparkles, Mail, CheckCircle2, X } from 'lucide-react';

const activities = [
  {
    icon: <Mail size={16} color="#c59b27" />,
    text: "Client requested Dossier for 4BHK Royal Villa",
    sub: "Sunny Enclave, Sector 125 Mohali • 2 mins ago"
  },
  {
    icon: <CheckCircle2 size={16} color="#22c55e" />,
    text: "Site Visit Scheduled: The Aurum Signature Floors",
    sub: "Sector 125 SAS Nagar • 7 mins ago"
  },
  {
    icon: <Sparkles size={16} color="#c59b27" />,
    text: "New 4K Drone Architectural Walkthrough Live",
    sub: "Skyline Imperial Penthouse • Just now"
  }
];

export default function DynamicEffects({ onOpenEmailDossier }) {
  const [cursorPos, setCursorPos] = useState({ x: -300, y: -300 });
  const [currentToastIndex, setCurrentToastIndex] = useState(0);
  const [showToast, setShowToast] = useState(false);

  // Mouse Spotlight Tracker
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Periodic subtle toast animation
  useEffect(() => {
    const initialDelay = setTimeout(() => {
      setShowToast(true);
    }, 3500);

    const interval = setInterval(() => {
      setShowToast(false);
      setTimeout(() => {
        setCurrentToastIndex((prev) => (prev + 1) % activities.length);
        setShowToast(true);
      }, 1000);
    }, 12000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {/* Ambient Mouse Spotlight */}
      <div 
        className="cursor-spotlight"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          display: cursorPos.x === -300 ? 'none' : 'block'
        }}
      />

      {/* Subtle Global Brand Logo Watermark in Background */}
      <div 
        style={{
          position: 'fixed',
          top: '25%',
          right: '-4%',
          width: 'min(580px, 46vw)',
          height: 'min(580px, 46vw)',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.045,
          filter: 'drop-shadow(0 0 50px rgba(197, 155, 39, 0.4))',
        }}
      >
        <img 
          src="/logo-watermark.png" 
          alt="" 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </div>

      {/* Live Inquiry Activity Toast */}
      {showToast && (
        <div 
          className="live-activity-toast"
          onClick={() => onOpenEmailDossier && onOpenEmailDossier(null)}
          style={{ cursor: 'pointer' }}
          title="Click to request verified property dossier"
        >
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(197, 155, 39, 0.15)',
            border: '1px solid rgba(197, 155, 39, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            {activities[currentToastIndex].icon}
          </div>

          <div style={{ flexGrow: 1 }}>
            <div style={{ fontSize: '0.82rem', fontWeight: '600', color: '#ffffff', lineHeight: 1.2 }}>
              {activities[currentToastIndex].text}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#edd06f', marginTop: '0.15rem' }}>
              {activities[currentToastIndex].sub}
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowToast(false);
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#64748b',
              cursor: 'pointer',
              padding: '2px',
              display: 'flex',
              alignItems: 'center'
            }}
            title="Dismiss"
          >
            <X size={14} />
          </button>
        </div>
      )}
    </>
  );
}
