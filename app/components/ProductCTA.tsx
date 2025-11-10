'use client';

import Link from 'next/link';

export default function ProductCTA() {
  return (
    <section className="product-cta-section">
      <div className="product-cta-container">
        <div className="product-cta-content">
          <h2 className="product-cta-text">
            We'd be excited to share more about<br />
            our product
          </h2>
          <div className="product-cta-buttons">
            <Link href="/contact#contact-form" className="product-cta-btn product-cta-btn-primary">
              <span>Join The Waitlist</span>
            </Link>
            <Link href="/contact#contact-form" className="product-cta-btn product-cta-btn-secondary">
              <span>Product Walkthrough</span>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .product-cta-section {
          width: 100%;
          padding: var(--spacing-3xl) var(--content-padding);
          background: var(--color-background);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .product-cta-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }

        .product-cta-content {
          background: linear-gradient(135deg, rgba(255, 215, 0, 0.15) 0%, rgba(255, 215, 0, 0.08) 50%, rgba(15, 23, 42, 0.95) 100%);
          border-radius: 60px;
          padding: var(--spacing-3xl) var(--spacing-2xl);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-2xl);
          text-align: center;
          border: 1px solid rgba(255, 215, 0, 0.2);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), inset 0 0 100px rgba(255, 215, 0, 0.05);
        }

        .product-cta-text {
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          font-weight: 700;
          color: var(--color-text-primary);
          font-family: var(--font-heading);
          line-height: 1.3;
          letter-spacing: -0.02em;
          margin: 0;
        }

        .product-cta-buttons {
          display: flex;
          gap: var(--spacing-lg);
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
        }

        .product-cta-btn {
          background: transparent !important;
          border: 2px solid #ffd700 !important;
          padding: 0.875rem 2.5rem !important;
          border-radius: 14px !important;
          font-size: 0.95rem !important;
          font-weight: 700 !important;
          letter-spacing: 0.03em !important;
          color: #ffd700 !important;
          text-decoration: none !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
          cursor: pointer !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          min-width: 200px !important;
          position: relative !important;
          overflow: hidden !important;
          box-shadow: 0 0 0 0 rgba(255, 215, 0, 0) !important;
          font-family: inherit !important;
          z-index: 1 !important;
          isolation: isolate !important;
          transform: translateZ(0) !important;
        }

        .product-cta-btn > span {
          position: relative;
          z-index: 2;
        }

        .product-cta-btn::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 215, 0, 0.1);
          transform: translate(-50%, -50%);
          transition: width 0.6s ease, height 0.6s ease;
          z-index: 1;
        }

        .product-cta-btn:hover::after {
          width: 300px;
          height: 300px;
        }

        .product-cta-btn:hover {
          background: transparent !important;
          border-color: #ffd700 !important;
          color: #ffd700 !important;
          transform: translateY(-3px) scale(1.02) !important;
          box-shadow: 
            0 8px 24px rgba(255, 215, 0, 0.4),
            0 4px 12px rgba(255, 215, 0, 0.2) !important;
          text-decoration: none !important;
        }

        .product-cta-btn:active {
          transform: translateY(0) !important;
          box-shadow: 
            0 4px 15px rgba(255, 215, 0, 0.3),
            0 2px 6px rgba(255, 215, 0, 0.2) !important;
          background: transparent !important;
          border-color: #ffd700 !important;
          color: #ffd700 !important;
        }

        .product-cta-btn:focus-visible {
          outline: 3px solid #ffd700 !important;
          outline-offset: 4px !important;
          box-shadow: 
            0 4px 20px rgba(255, 215, 0, 0.4),
            0 2px 8px rgba(255, 215, 0, 0.2) !important;
        }

        .product-cta-btn-primary,
        .product-cta-btn-secondary {
          /* Both buttons use the same style */
        }

        /* Ensure Link components render as buttons */
        .product-cta-buttons :global(a.product-cta-btn),
        .product-cta-buttons a.product-cta-btn {
          background: transparent !important;
          border: 2px solid #ffd700 !important;
          padding: 0.875rem 2.5rem !important;
          border-radius: 14px !important;
          font-size: 0.95rem !important;
          font-weight: 700 !important;
          letter-spacing: 0.03em !important;
          color: #ffd700 !important;
          text-decoration: none !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
          cursor: pointer !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          min-width: 200px !important;
          position: relative !important;
          overflow: hidden !important;
          box-shadow: 0 0 0 0 rgba(255, 215, 0, 0) !important;
          font-family: inherit !important;
          z-index: 1 !important;
          isolation: isolate !important;
          transform: translateZ(0) !important;
        }

        .product-cta-buttons :global(a.product-cta-btn:hover),
        .product-cta-buttons a.product-cta-btn:hover {
          background: transparent !important;
          border-color: #ffd700 !important;
          color: #ffd700 !important;
          transform: translateY(-3px) scale(1.02) !important;
          box-shadow: 
            0 8px 24px rgba(255, 215, 0, 0.4),
            0 4px 12px rgba(255, 215, 0, 0.2) !important;
          text-decoration: none !important;
        }

        @media (max-width: 768px) {
          .product-cta-section {
            padding: var(--spacing-2xl) var(--content-padding);
          }

          .product-cta-content {
            border-radius: 40px;
            padding: var(--spacing-2xl) var(--spacing-xl);
            gap: var(--spacing-xl);
          }

          .product-cta-buttons {
            flex-direction: column;
            width: 100%;
          }

          .product-cta-btn {
            width: 100% !important;
            min-width: auto !important;
            padding: 0.875rem 1.5rem !important;
            font-size: 0.9rem !important;
          }
        }
      `}</style>
    </section>
  );
}

