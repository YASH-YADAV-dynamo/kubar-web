'use client';

import Link from 'next/link';
import Image from 'next/image';
import nbfcData from '../data/kubarForNBFC.json';
import msmeData from '../data/kubarForMSME.json';

export default function KubarForNBFCAndMSME() {
  return (
    <section className="kubar-sections">
      {/* Kubar for NBFCs Section */}
      <div className="kubar-section">
        <h2 className="kubar-section-title">NavDhan for Banks and NBFCs</h2>
        <p style={{ textAlign: 'center', fontSize: '1.125rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-2xl)', maxWidth: '900px', marginLeft: 'auto', marginRight: 'auto', padding: '0 var(--content-padding)' }}>
          A better way to reach, assess, and serve MSME borrowers. Meet MSMEs exactly where business happens with verified, structured business data.
        </p>
        <div className="kubar-features">
          {nbfcData.map((feature, index) => (
            <div
              key={index}
              className={`kubar-feature ${index < nbfcData.length - 1 ? 'has-separator' : ''}`}
            >
              <div className="kubar-feature-icon">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={60}
                  height={60}
                  className="kubar-icon"
                />
              </div>
              <p className="kubar-feature-text">{feature.text}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 'var(--spacing-2xl)', padding: '0 var(--content-padding)' }}>
          <p style={{ fontSize: '1.125rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-lg)', maxWidth: '900px', marginLeft: 'auto', marginRight: 'auto' }}>
            We help you move from reactive lending to data-driven, relationship-first MSME financing.
          </p>
          <Link href="/contact#contact-form" style={{ display: 'inline-block', background: '#FF8C00', color: '#FFFFFF', padding: '0.875rem 2.5rem', borderRadius: '14px', textDecoration: 'none', fontWeight: '700', fontSize: '0.95rem', transition: 'all 0.3s ease' }}>
            Schedule a Partner Briefing
          </Link>
        </div>
      </div>

      {/* Kubar for MSMEs Section */}
      <div className="kubar-section">
        <h2 className="kubar-section-title">NavDhan for MSMEs</h2>
        <p style={{ textAlign: 'center', fontSize: '1.125rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-2xl)', maxWidth: '900px', marginLeft: 'auto', marginRight: 'auto', padding: '0 var(--content-padding)' }}>
          Get the right loan at the right time, automatically. NavDhan works behind the scenes to match you with lenders that trust your data. No brokers, no endless forms.
        </p>
        <div className="kubar-features">
          {msmeData.map((feature, index) => (
            <div
              key={index}
              className={`kubar-feature ${index < msmeData.length - 1 ? 'has-separator' : ''}`}
            >
              <div className="kubar-feature-icon">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={60}
                  height={60}
                  className="kubar-icon"
                />
              </div>
              <p className="kubar-feature-text">{feature.text}</p>
            </div>
          ))}
        </div>
        <div className="kubar-buttons-container" style={{ textAlign: 'center', marginTop: 'var(--spacing-2xl)', padding: '0 var(--content-padding)' }}>
          <Link 
            href="/contact#contact-form" 
            className="whatsapp-btn"
            style={{ 
              display: 'inline-block', 
              background: 'transparent', 
              border: '2px solid #00B85E', 
              color: '#00B85E', 
              padding: '0.875rem 2.5rem', 
              borderRadius: '14px', 
              textDecoration: 'none', 
              fontWeight: '700', 
              fontSize: '0.95rem', 
              transition: 'all 0.3s ease',
              marginRight: 'var(--spacing-lg)'
            }}
          >
            Join Our Whatsapp Community
          </Link>
          <Link 
            href="/contact#contact-form" 
            className="waitlist-btn" 
            style={{ 
              display: 'inline-block', 
              background: 'transparent', 
              border: '2px solid #00B85E', 
              color: '#00B85E', 
              padding: '0.875rem 2.5rem', 
              borderRadius: '14px', 
              textDecoration: 'none', 
              fontWeight: '700', 
              fontSize: '0.95rem', 
              transition: 'all 0.3s ease' 
            }}
          >
            Join the Waitlist
          </Link>
        </div>
      </div>

      <style jsx>{`
        .kubar-sections {
          background: var(--color-background);
          color: var(--color-text-primary);
          padding: var(--spacing-3xl) 0;
          width: 100%;
        }

        .kubar-section {
          width: 100%;
          padding: var(--spacing-3xl) 0;
        }

        .kubar-section:first-child {
          padding-top: 0;
        }

        .kubar-section-title {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 700;
          text-align: center;
          margin-bottom: var(--spacing-3xl);
          color: var(--color-text-primary);
          font-family: var(--font-heading);
        }

        .kubar-features {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-2xl);
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 var(--content-padding);
        }

        @media (min-width: 768px) {
          .kubar-features {
            flex-direction: row;
            gap: 0;
            align-items: stretch;
          }
        }

        .kubar-feature {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: var(--spacing-lg);
          position: relative;
        }

        @media (min-width: 768px) {
          .kubar-feature {
            padding: var(--spacing-xl) var(--spacing-lg);
          }

          .kubar-feature.has-separator::after {
            content: '';
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 1px;
            height: 60%;
            background: rgba(255, 255, 255, 0.2);
          }
        }

        .kubar-feature-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: var(--spacing-lg);
          width: 60px;
          height: 60px;
        }

        .kubar-icon {
          width: 60px;
          height: 60px;
          object-fit: contain;
          filter: brightness(0) saturate(100%) invert(75%) sepia(95%) saturate(500%) hue-rotate(45deg) brightness(110%);
        }

        .kubar-feature-text {
          font-size: clamp(0.95rem, 1.4vw, 1.05rem);
          font-weight: 500;
          line-height: 1.5;
          color: var(--color-text-primary);
          max-width: 100%;
          margin: 0;
          text-align: center;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 3em;
        }

        @media (max-width: 767px) {
          .kubar-section {
            padding: var(--spacing-2xl) 0;
          }

          .kubar-section-title {
            margin-bottom: var(--spacing-2xl);
          }

          .kubar-feature {
            padding: var(--spacing-md);
          }

          .kubar-feature-text {
            font-size: 0.9rem;
            line-height: 1.4;
            min-height: 2.8em;
          }
        }

        [data-page="navdhan"] .kubar-sections {
          background: #fefefe !important;
          color: #333333 !important;
        }

        [data-page="navdhan"] .kubar-section {
          background: transparent !important;
        }

        [data-page="navdhan"] .kubar-feature {
          background: transparent !important;
        }

        [data-page="navdhan"] .kubar-section-title {
          color: #333333 !important;
        }

        [data-page="navdhan"] .kubar-feature-text {
          color: #555555 !important;
        }

        [data-page="navdhan"] .kubar-feature.has-separator::after {
          background: rgba(255, 165, 0, 0.2) !important;
        }

        [data-page="navdhan"] .kubar-icon {
          filter: none !important;
        }

        .kubar-buttons-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--spacing-lg);
          position: relative;
        }

        @media (min-width: 768px) {
          .kubar-buttons-container {
            flex-direction: row;
            justify-content: center;
            gap: var(--spacing-lg);
          }
        }

        .whatsapp-btn:hover,
        .waitlist-btn:hover {
          background: #00B85E !important;
          color: #FFFFFF !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 184, 94, 0.3);
        }

        @media (max-width: 767px) {
          .whatsapp-btn {
            margin-right: 0 !important;
            margin-bottom: var(--spacing-md);
          }
        }

      `}</style>
    </section>
  );
}

