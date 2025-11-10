'use client';

import Image from 'next/image';
import nbfcData from '../data/kubarForNBFC.json';
import msmeData from '../data/kubarForMSME.json';

export default function KubarForNBFCAndMSME() {
  return (
    <section className="kubar-sections">
      {/* Kubar for NBFCs Section */}
      <div className="kubar-section">
        <h2 className="kubar-section-title">NavDhan for NBFCs</h2>
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
      </div>

      {/* Kubar for MSMEs Section */}
      <div className="kubar-section">
        <h2 className="kubar-section-title">NavDhan for MSMEs</h2>
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
          font-size: clamp(1rem, 1.5vw, 1.125rem);
          font-weight: 500;
          line-height: 1.6;
          color: var(--color-text-primary);
          max-width: 100%;
          margin: 0;
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
      `}</style>
    </section>
  );
}

