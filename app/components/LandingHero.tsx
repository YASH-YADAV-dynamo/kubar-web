'use client';

import Image from 'next/image';

interface LandingHeroProps {
  onLearnMoreClick?: () => void;
}

export default function LandingHero({ onLearnMoreClick }: LandingHeroProps) {
  return (
    <section className="landing-hero">
      {/* Background Images */}
      <div className="background-image background-image-top-right">
        <Image 
          src="/top-right.png" 
          alt="" 
          width={600} 
          height={600}
          className="bg-img"
          priority
        />
      </div>
      <div className="background-image background-image-left-bottom">
        <Image 
          src="/left-bottom.png" 
          alt="" 
          width={600} 
          height={600}
          className="bg-img"
          priority
        />
      </div>

      <div className="container">
        <div className="landing-content">
          {/* Central Box with Gradient Border */}
          <div className="central-box">
            <div className="central-box-inner">
              {/* Left: Logo and Branding */}
              <div className="branding-section">
                <div className="branding-logo">
                  <Image 
                    src="/logo.png" 
                    alt="Kubar Labs Logo" 
                    width={60} 
                    height={60} 
                    className="logo-img"
                    priority
                  />
                </div>
                <h1 className="branding-name">Kubar Labs</h1>
              </div>

              {/* Right: Headline */}
              <div className="headline-section">
                <h2 className="main-headline">MSME Financing Made Simpler</h2>
              </div>
            </div>
          </div>

          {/* Descriptive Paragraph */}
          <div className="description-section">
            <p className="description-text">
              At Kubar Labs, we're on a mission to revolutionize MSME financing! We're building India's first MSME-focused plug-and-play (API-based) Embedded Business-Credit marketplace. Our platform features Embedded Borrower-Friendly interfaces seamlessly integrated into point-of-business operations, making credit access smoother and smarter.
            </p>
          </div>

          {/* Learn More Button */}
          <div className="cta-section">
            <button onClick={onLearnMoreClick} className="learn-more-btn" type="button">
              <span>Learn More</span>
              <div className="arrow-circle">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .landing-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--spacing-3xl) var(--content-padding);
          background: var(--color-background);
          overflow: hidden;
        }

        /* Background Images - Desktop Only */
        .background-image {
          position: absolute;
          pointer-events: none;
          z-index: 0;
          display: none;
        }

        @media (min-width: 769px) {
          .background-image {
            display: block;
            z-index: 10002;
          }

          .background-image-top-right {
            top: 0;
            right: 0;
            width: 300px;
            height: 300px;
          }

          .background-image-left-bottom {
            bottom: 0;
            left: 0;
            width: 450px;
            height: 450px;
          }

          .bg-img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }

        .landing-hero .container {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1440px;
          margin: 0 auto;
        }

        .landing-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 60px 20px;
          gap: 40px;
        }

        /* Central Box with Gradient Border */
        .central-box {
          position: relative;
          width: 1050px;
          height: 233px;
          border-radius: 26.07px;
          background: linear-gradient(92.08deg, #F7941D 0%, #0077B5 51.49%, #00A651 99.17%);
          padding: 4px;
          opacity: 1;
          box-sizing: border-box;
          flex-shrink: 0;
          isolation: isolate;
        }

        .central-box::after {
          content: '';
          position: absolute;
          inset: 4px;
          border-radius: 22.07px;
          background: var(--color-background);
          z-index: 0;
          pointer-events: none;
        }

        .central-box-inner {
          position: relative;
          background: var(--color-background);
          border-radius: 22.07px;
          padding: var(--spacing-2xl) var(--spacing-xl);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--spacing-xl);
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          z-index: 1;
        }

        /* Branding Section */
        .branding-section {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          flex-shrink: 0;
        }

        .branding-logo {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo-img {
          width: 60px;
          height: 60px;
          object-fit: contain;
          filter: brightness(0) invert(1);
        }

        .branding-name {
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 700;
          color: #ffffff;
          font-family: var(--font-heading);
          margin: 0;
          white-space: nowrap;
        }

        /* Headline Section */
        .headline-section {
          flex: 1;
          text-align: right;
        }

        .main-headline {
          font-size: clamp(1.75rem, 4vw, 2.5rem);
          font-weight: 700;
          color: #ffffff;
          font-family: var(--font-heading);
          line-height: 1.2;
          margin: 0;
        }

        /* Description Section */
        .description-section {
          width: 1050px;
          max-width: 100%;
          text-align: center;
        }

        .description-text {
          font-size: clamp(1rem, 1.5vw, 1.125rem);
          color: #ffffff;
          line-height: 1.8;
          margin: 0;
          font-family: var(--font-body);
        }

        /* CTA Section */
        .cta-section {
          display: flex;
          justify-content: center;
        }

        .learn-more-btn {
          display: inline-flex;
          align-items: center;
          gap: var(--spacing-sm);
          padding: 0.875rem 2rem;
          background: var(--color-background);
          border: 2px solid #ffffff;
          border-radius: 12px;
          color: #ffffff;
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          font-family: var(--font-body);
        }

        .learn-more-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255, 255, 255, 0.2);
        }

        .arrow-circle {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-background);
          flex-shrink: 0;
        }

        .arrow-circle svg {
          width: 12px;
          height: 12px;
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .central-box {
            width: 100%;
            max-width: 1050px;
          }

          .description-section {
            width: 100%;
            max-width: 1050px;
          }
        }

        @media (max-width: 768px) {
          .landing-hero {
            min-height: auto;
            padding: calc(var(--spacing-3xl) + 60px) var(--content-padding) var(--spacing-3xl);
          }

          .landing-content {
            padding: 40px 20px;
            gap: 30px;
          }

          .abstract-shape-green,
          .abstract-shape-orange {
            width: 400px;
            height: 400px;
          }

          .central-box {
            width: 100%;
            height: auto;
            min-height: 233px;
          }

          .central-box-inner {
            flex-direction: column;
            text-align: center;
            padding: var(--spacing-xl) var(--spacing-lg);
            min-height: 225px;
          }

          .branding-section {
            flex-direction: column;
            gap: var(--spacing-sm);
          }

          .headline-section {
            text-align: center;
          }

          .description-text {
            font-size: 0.95rem;
          }

          .learn-more-btn {
            width: 100%;
            justify-content: center;
            max-width: 300px;
          }
        }

        @media (max-width: 480px) {
          .central-box {
            border-radius: 16px;
          }

          .central-box-inner {
            border-radius: 14px;
            padding: var(--spacing-lg);
          }

          .branding-name {
            font-size: 1.25rem;
          }

          .main-headline {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}

