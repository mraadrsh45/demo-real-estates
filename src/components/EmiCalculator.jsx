import React, { useState, useMemo } from 'react';
import { Calculator, CheckCircle2, Phone, ShieldCheck, ArrowRight } from 'lucide-react';
import { companyDetails } from '../data/properties';

export default function EmiCalculator({ onOpenEmailDossier }) {
  const [propertyPrice, setPropertyPrice] = useState(12000000); // 1.20 Cr
  const [downPaymentPercent, setDownPaymentPercent] = useState(20); // 20%
  const [interestRate, setInterestRate] = useState(8.5); // 8.5%
  const [tenureYears, setTenureYears] = useState(20); // 20 years

  const calculation = useMemo(() => {
    const downPayment = (propertyPrice * downPaymentPercent) / 100;
    const loanAmount = propertyPrice - downPayment;
    const monthlyRate = interestRate / (12 * 100);
    const months = tenureYears * 12;

    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    const totalPayment = emi * months;
    const totalInterest = totalPayment - loanAmount;

    return {
      downPayment,
      loanAmount,
      monthlyEmi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment),
      principalPercent: Math.round((loanAmount / totalPayment) * 100),
      interestPercent: Math.round((totalInterest / totalPayment) * 100)
    };
  }, [propertyPrice, downPaymentPercent, interestRate, tenureYears]);

  const formatINR = (val) => {
    if (val >= 10000000) {
      return `₹ ${(val / 10000000).toFixed(2)} Cr`;
    } else if (val >= 100000) {
      return `₹ ${(val / 100000).toFixed(2)} Lakhs`;
    }
    return `₹ ${val.toLocaleString('en-IN')}`;
  };

  return (
    <section id="emi-calculator" className="section-padding" style={{
      background: 'linear-gradient(180deg, #071324 0%, #0d1e38 50%, #071324 100%)',
      borderTop: '1px solid rgba(197, 155, 39, 0.25)',
      position: 'relative'
    }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3rem' }}>
          <div className="badge-gold" style={{ marginBottom: '1rem' }}>
            <Calculator size={14} />
            <span>Financial Planning & Mortgages</span>
          </div>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            color: '#ffffff',
            lineHeight: 1.2,
            marginBottom: '1rem'
          }}>
            Real Estate <span className="text-gold-gradient">EMI & Loan Calculator</span>
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Plan your investment in Sunny Enclave Sector 125 properties with pre-approved banking options from SBI, HDFC, ICICI, and Axis Bank.
          </p>
          <div className="gold-divider" />
        </div>

        {/* Two Column Layout: Controls Left, Breakdown Right */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '2.5rem',
          alignItems: 'center'
        }}>
          
          {/* Left: Sliders Card */}
          <div className="luxury-card" style={{ padding: '2rem' }}>
            
            {/* Slider 1: Property Value */}
            <div style={{ marginBottom: '1.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={calcLabelStyle}>Property Price</span>
                <span style={calcValueStyle}>{formatINR(propertyPrice)}</span>
              </div>
              <input
                type="range"
                min="3000000"
                max="40000000"
                step="500000"
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(Number(e.target.value))}
                style={sliderStyle}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                <span>₹ 30 Lakhs</span>
                <span>₹ 4.00 Crores</span>
              </div>
            </div>

            {/* Slider 2: Down Payment */}
            <div style={{ marginBottom: '1.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={calcLabelStyle}>Down Payment ({downPaymentPercent}%)</span>
                <span style={calcValueStyle}>{formatINR(calculation.downPayment)}</span>
              </div>
              <input
                type="range"
                min="10"
                max="50"
                step="5"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                style={sliderStyle}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                <span>10% (Min)</span>
                <span>50%</span>
              </div>
            </div>

            {/* Slider 3: Interest Rate */}
            <div style={{ marginBottom: '1.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={calcLabelStyle}>Annual Interest Rate</span>
                <span style={calcValueStyle}>{interestRate}% p.a.</span>
              </div>
              <input
                type="range"
                min="7.0"
                max="12.0"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                style={sliderStyle}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                <span>7.0%</span>
                <span>12.0%</span>
              </div>
            </div>

            {/* Slider 4: Loan Tenure */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={calcLabelStyle}>Loan Tenure</span>
                <span style={calcValueStyle}>{tenureYears} Years</span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                step="1"
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                style={sliderStyle}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                <span>5 Years</span>
                <span>30 Years</span>
              </div>
            </div>

          </div>

          {/* Right: Results Display Card */}
          <div className="luxury-card-gold" style={{ padding: '2.2rem' }}>
            
            <div style={{ fontSize: '0.85rem', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.35rem' }}>
              Estimated Monthly EMI
            </div>

            <div style={{
              fontSize: 'clamp(2.4rem, 5vw, 3.4rem)',
              fontWeight: '800',
              color: '#fae7a5',
              fontFamily: 'var(--font-serif)',
              lineHeight: 1.1,
              marginBottom: '1.75rem'
            }}>
              ₹ {calculation.monthlyEmi.toLocaleString('en-IN')}
              <span style={{ fontSize: '0.95rem', color: '#cbd5e1', fontWeight: '400', marginLeft: '0.35rem' }}>/ month</span>
            </div>

            {/* Visual Progress Bar */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{
                height: '10px',
                borderRadius: '5px',
                background: '#1e293b',
                display: 'flex',
                overflow: 'hidden',
                marginBottom: '0.6rem'
              }}>
                <div style={{ width: `${calculation.principalPercent}%`, background: 'var(--gold-gradient)' }} />
                <div style={{ width: `${calculation.interestPercent}%`, background: '#3b82f6' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#fae7a5' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#edd06f' }} />
                  Principal Loan: {calculation.principalPercent}%
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#93c5fd' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6' }} />
                  Interest Payable: {calculation.interestPercent}%
                </span>
              </div>
            </div>

            {/* Summary Metrics Table */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem',
              padding: '1.25rem 0',
              borderTop: '1px solid rgba(197, 155, 39, 0.3)',
              borderBottom: '1px solid rgba(197, 155, 39, 0.3)',
              marginBottom: '1.75rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem' }}>
                <span style={{ color: '#cbd5e1' }}>Principal Loan Amount:</span>
                <span style={{ color: '#ffffff', fontWeight: '600' }}>{formatINR(calculation.loanAmount)}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem' }}>
                <span style={{ color: '#cbd5e1' }}>Total Interest Payable:</span>
                <span style={{ color: '#fae7a5', fontWeight: '600' }}>{formatINR(calculation.totalInterest)}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                <span style={{ color: '#cbd5e1' }}>Total Repayment (P + I):</span>
                <span style={{ color: '#ffffff', fontWeight: '700' }}>{formatINR(calculation.totalPayment)}</span>
              </div>
            </div>

            {/* Advisory Assistance CTA */}
            <button
              onClick={() => onOpenEmailDossier({
                title: `Loan Assistance for ${formatINR(propertyPrice)} Property`,
                price: `EMI: ₹ ${calculation.monthlyEmi.toLocaleString('en-IN')}/mo`,
                location: "Sunny Enclave, Sector 125, Mohali"
              })}
              className="btn btn-gold"
              style={{ width: '100%', padding: '0.85rem' }}
            >
              <span>Email Me Loan Structure & Bank Rates</span>
              <ArrowRight size={16} />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}

const calcLabelStyle = {
  fontSize: '0.88rem',
  color: '#e2e8f0',
  fontWeight: '500'
};

const calcValueStyle = {
  fontSize: '0.95rem',
  fontWeight: '700',
  color: '#fae7a5'
};

const sliderStyle = {
  width: '100%',
  height: '6px',
  borderRadius: '4px',
  outline: 'none',
  background: '#1b3254',
  accentColor: '#c59b27',
  cursor: 'pointer'
};
