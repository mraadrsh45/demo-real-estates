import React, { useState, useEffect } from 'react';
import { Scale } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BuildingVideoShowcase from './components/BuildingVideoShowcase';
import PropertyViewer3D from './components/PropertyViewer3D';
import PropertyListings from './components/PropertyListings';
import PropertyCompareModal from './components/PropertyCompareModal';
import PropertyDetailModal from './components/PropertyDetailModal';
import EmailDossierModal from './components/EmailDossierModal';
import EmiCalculator from './components/EmiCalculator';
import LocationShowcase from './components/LocationShowcase';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import DynamicEffects from './components/DynamicEffects';
import { siteMetadata, updateSEO } from './seo';

export default function App() {
  const [searchFilters, setSearchFilters] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [emailModalProperty, setEmailModalProperty] = useState(null);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  // Favorites / Wishlist State (persisted)
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('wr_favorites');
      return saved ? JSON.parse(saved) : ['wr-01', 'wr-05'];
    } catch {
      return ['wr-01', 'wr-05'];
    }
  });

  // Comparison State
  const [comparedProperties, setComparedProperties] = useState([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Sync favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('wr_favorites', JSON.stringify(favorites));
    } catch {
      // Ignore write errors
    }
  }, [favorites]);

  // Dynamic SEO title & description update for property modal view
  useEffect(() => {
    if (selectedProperty) {
      updateSEO(`${selectedProperty.title} (${selectedProperty.category})`, selectedProperty.description);
    } else {
      updateSEO(siteMetadata.title, siteMetadata.description);
    }
  }, [selectedProperty]);

  const handleToggleFavorite = (propertyId) => {
    setFavorites((prev) => 
      prev.includes(propertyId) 
        ? prev.filter((id) => id !== propertyId) 
        : [...prev, propertyId]
    );
  };

  const handleToggleCompare = (property) => {
    setComparedProperties((prev) => {
      const exists = prev.some((p) => p.id === property.id);
      if (exists) {
        return prev.filter((p) => p.id !== property.id);
      }
      if (prev.length >= 3) {
        alert("You can compare up to 3 properties side-by-side.");
        return prev;
      }
      return [...prev, property];
    });
  };

  const handleRemoveCompared = (propertyId) => {
    setComparedProperties((prev) => prev.filter((p) => p.id !== propertyId));
  };

  // Trigger search from Hero
  const handleHeroSearch = (filters) => {
    setSearchFilters(filters);
  };

  // Open Property Detail Modal
  const handleOpenDetailModal = (property) => {
    setSelectedProperty(property);
  };

  const handleCloseDetailModal = () => {
    setSelectedProperty(null);
  };

  // Open Direct Email Dossier Modal
  const handleOpenEmailDossier = (property = null) => {
    setEmailModalProperty(property);
    setIsEmailModalOpen(true);
  };

  const handleCloseEmailDossier = () => {
    setIsEmailModalOpen(false);
    setEmailModalProperty(null);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Dynamic Ambient Effects (Spotlight & Live Activity Toaster) */}
      <DynamicEffects onOpenEmailDossier={handleOpenEmailDossier} />

      {/* Fixed Luxury Navigation */}
      <Navbar 
        onOpenEmailDossier={handleOpenEmailDossier} 
        favoritesCount={favorites.length}
      />

      {/* Main Page Layout */}
      <main style={{ flexGrow: 1 }}>
        {/* Dynamic Animated Luxury Hero */}
        <Hero 
          onSearch={handleHeroSearch} 
          onOpenEmailDossier={handleOpenEmailDossier} 
        />

        {/* Live Building Reference & 4K Architectural Video Tour Showcase */}
        <BuildingVideoShowcase 
          onOpenEmailDossier={handleOpenEmailDossier} 
        />

        {/* Interactive 3D Architectural Villa Model & 360 Interior Tours */}
        <PropertyViewer3D 
          onOpenEmailDossier={handleOpenEmailDossier}
        />

        {/* Curated Properties Portfolio */}
        <PropertyListings 
          searchFilters={searchFilters}
          onSelectProperty={handleOpenDetailModal}
          onOpenEmailDossier={handleOpenEmailDossier}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          comparedIds={comparedProperties.map((p) => p.id)}
          onToggleCompare={handleToggleCompare}
        />

        {/* Indian Real Estate EMI & Loan Calculator */}
        <EmiCalculator 
          onOpenEmailDossier={handleOpenEmailDossier}
        />

        {/* Sector 125 Sunny Enclave Location & Google Maps */}
        <LocationShowcase />

        {/* Direct Contact & Consultation Suite */}
        <ContactSection 
          onOpenEmailDossier={handleOpenEmailDossier} 
        />
      </main>

      {/* Luxury Footer */}
      <Footer onOpenEmailDossier={handleOpenEmailDossier} />

      {/* Floating Action Buttons */}
      <FloatingActions onOpenEmailDossier={handleOpenEmailDossier} />

      {/* Floating Compare Dock (Visible when 1+ property selected) */}
      {comparedProperties.length > 0 && (
        <div className="compare-dock">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Scale size={18} color="#fae7a5" />
            <span style={{ fontSize: '0.88rem', fontWeight: '700', color: '#ffffff' }}>
              {comparedProperties.length} {comparedProperties.length === 1 ? 'Estate' : 'Estates'} Selected
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <button
              onClick={() => setIsCompareModalOpen(true)}
              className="btn btn-gold"
              style={{ padding: '0.45rem 1.1rem', fontSize: '0.82rem' }}
            >
              Compare Side-by-Side
            </button>
            <button
              onClick={() => setComparedProperties([])}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                fontSize: '0.78rem',
                textDecoration: 'underline'
              }}
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      {selectedProperty && (
        <PropertyDetailModal 
          property={selectedProperty} 
          onClose={handleCloseDetailModal}
          onOpenEmailDossier={handleOpenEmailDossier}
        />
      )}

      {isCompareModalOpen && (
        <PropertyCompareModal
          properties={comparedProperties}
          onClose={() => setIsCompareModalOpen(false)}
          onRemoveProperty={handleRemoveCompared}
          onOpenEmailDossier={handleOpenEmailDossier}
        />
      )}

      {isEmailModalOpen && (
        <EmailDossierModal 
          initialProperty={emailModalProperty}
          onClose={handleCloseEmailDossier}
        />
      )}
    </div>
  );
}
