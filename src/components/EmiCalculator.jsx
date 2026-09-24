import React, { useState, useMemo } from 'react';
import { Calculator, ArrowRight } from 'lucide-react';

export default function EmiCalculator({ onOpenEmailDossier }) {
  const [propertyPrice, setPropertyPrice] = useState(12000000); // 1.20 Cr
  const [downPaymentPercent, setDownPaymentPercent] = useState(20); // 20%
  const [interestRate, setInterestRate] = useState(8.5); // 8.5%
  const [tenureYears, setTenureYears] = useState(20); // 20 years

  // Bank partner benchmark rates in Tricity
  const bankOptions = [
    { name: "SBI Home Loan", rate: 8.50, badge: "Lowest Rate" },
    { name: "HDFC Bank", rate: 8.70, badge: "Instant Approval" },
    { name: "ICICI Bank", rate: 8.75, badge: "Pre-Approved" },
    { name: "Axis Bank", rate: 8.85, badge: "Flexible Tenure" }
  ];

  const calculation = useMemo(() => {
    const downPayment = (propertyPrice * downPaymentPercent) / 100;
    const loanAmount = propertyPrice - downPayment;
    const monthlyRate = interestRate / (12 * 100);
    const months = tenureYears * 12;

    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    const totalPayment = emi * months;
    const totalInterest = totalPayment - loanAmount;

    const principalPercent = Math.round((loanAmount / totalPayment) * 100);
    const interestPercent = 100 - principalPercent;

    return {
      downPayment,
      loanAmount,
      monthlyEmi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment),
      principalPercent,
      interestPercent
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

  // SVG Donut metrics
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const principalStroke = (calculation.principalPercent / 100) * circumference;

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
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.35rem' }}>
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
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                {[10, 20, 25, 30].map(pct => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => setDownPaymentPercent(pct)}
                    style={{
                      background: downPaymentPercent === pct ? 'var(--gold-gradient)' : 'rgba(16, 38, 72, 0.7)',
                      color: downPaymentPercent === pct ? '#071324' : '#cbd5e1',
                      border: '1px solid rgba(197, 155, 39, 0.3)',
                      borderRadius: '6px',
                      padding: '3px 10px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    {pct}%
                  </button>
                ))}
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
                step="0.05"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                style={sliderStyle}
              />
              {/* Partner Banks Benchmark Bar */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '0.4rem', marginTop: '0.6rem' }}>
                {bankOptions.map(b => (
                  <button
                    key={b.name}
                    type="button"
                    onClick={() => setInterestRate(b.rate)}
                    style={{
                      background: interestRate === b.rate ? 'rgba(197, 155, 39, 0.25)' : 'rgba(7, 19, 36, 0.7)',
                      border: interestRate === b.rate ? '1px solid var(--gold-400)' : '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '8px',
                      padding: '4px 6px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ fontSize: '0.72rem', color: interestRate === b.rate ? '#fae7a5' : '#e2e8f0', fontWeight: '600' }}>
                      {b.name}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>
                      {b.rate}% p.a.
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Slider 4: Loan Tenure */}
            <div style={{ marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={calcLabelStyle}>Loan Tenure</span>
                <span style={calcValueStyle}>{tenureYears} Years ({tenureYears * 12} Mos)</span>
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
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                {[10, 15, 20, 25, 30].map(yrs => (
                  <button
                    key={yrs}
                    type="button"
                    onClick={() => setTenureYears(yrs)}
                    style={{
                      background: tenureYears === yrs ? 'var(--gold-gradient)' : 'rgba(16, 38, 72, 0.7)',
                      color: tenureYears === yrs ? '#071324' : '#cbd5e1',
                      border: '1px solid rgba(197, 155, 39, 0.3)',
                      borderRadius: '6px',
                      padding: '3px 10px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    {yrs} Yrs
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right: Results Display Card with Interactive Donut Chart */}
          <div className="luxury-card-gold" style={{ padding: '2.2rem' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <div style={{ fontSize: '0.85rem', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.35rem' }}>
                  Estimated Monthly EMI
                </div>
                <div style={{
                  fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)',
                  fontWeight: '800',
                  color: '#fae7a5',
                  fontFamily: 'var(--font-serif)',
                  lineHeight: 1.1
                }}>
                  ₹ {calculation.monthlyEmi.toLocaleString('en-IN')}
                  <span style={{ fontSize: '0.9rem', color: '#cbd5e1', fontWeight: '400', marginLeft: '0.35rem' }}>/ month</span>
                </div>
              </div>

              {/* Dynamic SVG Donut Chart */}
              <div style={{ position: 'relative', width: '90px', height: '90px', flexShrink: 0 }}>
                <svg width="90" height="90" viewBox="0 0 140 140">
                  {/* Background Track */}
                  <circle
                    cx="70"
                    cy="70"
                    r={radius}
                    stroke="#1e293b"
                    strokeWidth="14"
                    fill="transparent"
                  />
                  {/* Interest Stroke (Blue) */}
                  <circle
                    cx="70"
                    cy="70"
                    r={radius}
                    stroke="#38bdf8"
                    strokeWidth="14"
                    strokeDasharray={`${circumference} ${circumference}`}
                    fill="transparent"
                    className="donut-circle"
                  />
                  {/* Principal Stroke (Gold) */}
                  <circle
                    cx="70"
                    cy="70"
                    r={radius}
                    stroke="#edd06f"
                    strokeWidth="14"
                    strokeDasharray={`${principalStroke} ${circumference}`}
                    fill="transparent"
                    className="donut-circle"
                  />
                </svg>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  color: '#ffffff'
                }}>
                  {calculation.principalPercent}% P
                </div>
              </div>
            </div>

            {/* Visual Legend */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '1.25rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#fae7a5' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#edd06f' }} />
                Principal Loan: {calculation.principalPercent}%
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#38bdf8' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#38bdf8' }} />
                Interest: {calculation.interestPercent}%
              </span>
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
                <span style={{ color: '#cbd5e1' }}>Total Repayment (Principal + Interest):</span>
                <span style={{ color: '#ffffff', fontWeight: '700' }}>{formatINR(calculation.totalPayment)}</span>
              </div>
            </div>

            {/* Advisory Assistance CTA */}
            <button
              onClick={() => onOpenEmailDossier({
                title: `Loan Assistance for ${formatINR(propertyPrice)} Property`,
                price: `EMI: ₹ ${calculation.monthlyEmi.toLocaleString('en-IN')}/mo`,
                location: "Sunny Enclave, Sector 125, Mohali",
                highlights: [
                  `Selected Rate: ${interestRate}% p.a.`,
                  `Tenure: ${tenureYears} Years`,
                  `Down Payment: ${formatINR(calculation.downPayment)} (${downPaymentPercent}%)`,
                  `Estimated Loan: ${formatINR(calculation.loanAmount)}`
                ]
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
