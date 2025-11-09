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
              Join The Waitlist
            </Link>
            <Link href="/contact#contact-form" className="product-cta-btn product-cta-btn-secondary">
              Product Walkthrough
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
          background: linear-gradient(135deg, rgba(31, 76, 242, 0.15) 0%, rgba(31, 76, 242, 0.08) 50%, rgba(15, 23, 42, 0.95) 100%);
          border-radius: 60px;
          padding: var(--spacing-3xl) var(--spacing-2xl);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-2xl);
          text-align: center;
          border: 1px solid rgba(31, 76, 242, 0.2);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), inset 0 0 100px rgba(31, 76, 242, 0.05);
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
          padding: 1rem 2.5rem;
          border-radius: 12px;
          font-size: 1.125rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 200px;
        }

        .product-cta-btn-primary {
          background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
          color: #ffffff;
          box-shadow: 0 4px 20px rgba(37, 99, 235, 0.4);
        }

        .product-cta-btn-primary:hover {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          transform: translateY(-3px);
          box-shadow: 0 6px 30px rgba(37, 99, 235, 0.5);
        }

        .product-cta-btn-secondary {
          background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
          color: #ffffff;
          box-shadow: 0 4px 20px rgba(220, 38, 38, 0.4);
        }

        .product-cta-btn-secondary:hover {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          transform: translateY(-3px);
          box-shadow: 0 6px 30px rgba(220, 38, 38, 0.5);
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
            width: 100%;
            min-width: auto;
          }
        }
      `}</style>
    </section>
  );
}

