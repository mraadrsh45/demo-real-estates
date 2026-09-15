import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BuildingVideoShowcase from './components/BuildingVideoShowcase';
import PropertyListings from './components/PropertyListings';
import PropertyDetailModal from './components/PropertyDetailModal';
import EmailDossierModal from './components/EmailDossierModal';
import EmiCalculator from './components/EmiCalculator';
import LocationShowcase from './components/LocationShowcase';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import DynamicEffects from './components/DynamicEffects';

export default function App() {
  const [searchFilters, setSearchFilters] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [emailModalProperty, setEmailModalProperty] = useState(null);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

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
      <Navbar onOpenEmailDossier={handleOpenEmailDossier} />

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

        {/* Curated Properties Portfolio */}
        <PropertyListings 
          searchFilters={searchFilters}
          onSelectProperty={handleOpenDetailModal}
          onOpenEmailDossier={handleOpenEmailDossier}
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

      {/* Modals */}
      {selectedProperty && (
        <PropertyDetailModal 
          property={selectedProperty} 
          onClose={handleCloseDetailModal}
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
