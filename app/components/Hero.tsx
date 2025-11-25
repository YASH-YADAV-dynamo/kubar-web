'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-background">
        <div className="grid-lines"></div>
      </div>

      <div className="container">
        <div className="hero-content">
          <div className="hero-logo">
            <Image 
              src="/logo.png" 
              alt="Kubar Labs Logo" 
              width={105} 
              height={80} 
              className="logo-image"
              priority
            />
          </div>
          <h1 className="hero-title">Kubar Labs</h1>

          <div className="hero-tagline">
            <p>India's first MSME-focused plug-and-play embedded business-credit hub with credit intelligence solutions and complete loan lifecycle management</p>
          </div>

          <div className="hero-description">
            <p>We deliver high-quality, pre-screened (per each FI's BRE) borrower leads directly into an FI's LOS/CBS, our key USPs are ultra-fast disbursement, deeply vertical sector-specific credit intelligence for MSMEs, and complete loan lifecycle management. We're building embedded credit infra for MSME Financing in India, empowering small and mid-size lenders (fintechs, NBFCs) to profitably scale their loan books, while reducing NPAs in this sector, through our SaaS offerings</p>
          </div>

          <div className="hero-actions">
            <Link href="/contact#contact-form" className="btn btn-primary">
              Book a Demo
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4.16667 10H15.8333M15.8333 10L10 4.16667M15.8333 10L10 15.8333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
                  <Link href="/products/navdhan" className="btn btn-secondary">Explore NavDhan</Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: var(--spacing-3xl) 0;
          overflow: hidden;
        }

        .hero-background {
          position: absolute;
          inset: 0;
          z-index: 0;
          background: radial-gradient(ellipse at center, rgba(31, 76, 242, 0.45) 0%, rgba(31, 76, 242, 0.25) 25%, rgba(31, 76, 242, 0.1) 50%, rgba(4, 4, 4, 0.95) 75%);
        }

        .grid-lines {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(31, 76, 242, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(31, 76, 242, 0.04) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        .hero .container {
          position: relative;
          z-index: 1;
        }

        .hero-content {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
        }

        .hero-logo {
          margin-bottom: var(--spacing-xl);
          display: flex;
          justify-content: center;
          animation: logoFloat 3s ease-in-out infinite, fadeInUp 1.5s ease-out 0.2s both;
        }

        .logo-image {
          width: 105px;
          height: 90px;
          min-width: 105px;
          min-height: 90px;
          max-width: 105px;
          max-height: 90px;
          object-fit: contain;
          object-position: center;
          aspect-ratio: 7 / 6;
          filter: drop-shadow(0 10px 30px rgba(31, 76, 242, 0.3));
          transition: transform 0.3s ease;
        }

        .logo-image:hover {
          transform: scale(1.05);
        }

        .hero-title {
          margin-bottom: var(--spacing-lg);
          animation: fadeInUp 1.2s ease-out 0.6s both;
          color: #ffffff !important;
        }

        .hero-tagline {
          max-width: 760px;
          margin: 0 auto var(--spacing-xl);
          animation: fadeInUp 1.2s ease-out 1s both;
        }

        .hero-tagline p {
          font-size: clamp(1.35rem, 2.8vw, 1.75rem);
          font-weight: 500;
          color: #ffffff;
          line-height: 1.6;
        }

        .hero-description {
          max-width: 900px;
          margin: 0 auto var(--spacing-xl);
          animation: fadeInUp 1.2s ease-out 1.1s both;
        }

        .hero-description p {
          font-size: clamp(0.95rem, 1.5vw, 1.1rem);
          font-weight: 400;
          color: rgba(255, 255, 255, 0.65);
          line-height: 1.7;
        }

        .hero-actions {
          display: flex;
          gap: var(--spacing-md);
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: var(--spacing-2xl);
          animation: fadeInUp 1.2s ease-out 1.4s both;
        }

        .hero-actions :global(.btn-primary) {
          background: linear-gradient(135deg, rgba(31, 76, 242, 0.9) 0%, rgba(31, 76, 242, 0.7) 100%);
          border: 2px solid rgba(31, 76, 242, 0.5);
          color: #ffffff;
          box-shadow: 0 4px 20px rgba(31, 76, 242, 0.4), 0 2px 8px rgba(31, 76, 242, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .hero-actions :global(.btn-primary:hover) {
          background: linear-gradient(135deg, rgba(31, 76, 242, 1) 0%, rgba(31, 76, 242, 0.85) 100%);
          border-color: rgba(31, 76, 242, 0.7);
          box-shadow: 0 6px 25px rgba(31, 76, 242, 0.5), 0 3px 10px rgba(31, 76, 242, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        .hero-actions :global(.btn-primary:active) {
          transform: translateY(0);
          box-shadow: 0 2px 10px rgba(31, 76, 242, 0.4), inset 0 1px 2px rgba(0, 0, 0, 0.2);
        }

        @keyframes logoFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .hero {
            min-height: auto;
            padding: calc(var(--spacing-3xl) + 60px) 0 var(--spacing-3xl);
          }

          .hero-logo {
            margin-bottom: var(--spacing-lg);
          }

                .logo-image {
                  width: 105px;
                  height: 90px;
                  min-width: 105px;
                  min-height: 90px;
                  max-width: 105px;
                  max-height: 90px;
                }

          .hero-title {
            font-size: 2.5rem;
          }

          .hero-description {
            margin-bottom: var(--spacing-lg);
          }

          .hero-description p {
            font-size: 0.9rem;
            line-height: 1.6;
          }

          .hero-actions {
            flex-direction: column;
          }

          .btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}

