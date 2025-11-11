'use client';

import Link from 'next/link';

export default function NavDhanFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3 className="footer-logo">Kubar Labs</h3>
            <p className="footer-description">
              NavDhan is Kubar Labs' credit intelligence service. We connect MSMEs, marketplaces, and lenders so capital flows in real time without extra ops overhead.
            </p>
            <div className="footer-social">
              <a href="https://www.linkedin.com/company/kubarlabs" className="social-link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://x.com/kubarlabs" className="social-link" aria-label="X" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://kubarlabs.substack.com" className="social-link" aria-label="Substack" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 4h16v2H4V4zm0 5.5h16v2H4v-2zm0 5.5h16V20L12 16l-8 4v-5.5z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4 className="footer-heading">Product</h4>
              <ul className="footer-list">
                <li><Link href="/products/navdhan" style={{ color: '#000000' }}>NavDhan Overview</Link></li>
                <li><Link href="/products/navdhan#usecases" style={{ color: '#000000' }}>Use Cases</Link></li>
                <li><Link href="/products/navdhan#integrations" style={{ color: '#000000' }}>Integrations</Link></li>
                <li><Link href="/contact#contact-form" style={{ color: '#000000' }}>Book a Demo</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-heading">Company</h4>
              <ul className="footer-list">
                <li><Link href="/about" style={{ color: '#000000' }}>About Us</Link></li>
                <li><Link href="/team" style={{ color: '#000000' }}>Team</Link></li>
                <li><Link href="/blog" style={{ color: '#000000' }}>Blog</Link></li>
                <li><Link href="/contact" style={{ color: '#000000' }}>Contact</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-heading">Stay in Touch</h4>
              <ul className="footer-list">
                <li><a href="https://www.linkedin.com/company/kubarlabs" target="_blank" rel="noopener noreferrer" style={{ color: '#000000' }}>LinkedIn</a></li>
                <li><a href="https://x.com/kubarlabs" target="_blank" rel="noopener noreferrer" style={{ color: '#000000' }}>X (Twitter)</a></li>
                <li><a href="https://kubarlabs.substack.com" target="_blank" rel="noopener noreferrer" style={{ color: '#000000' }}>Substack</a></li>
                <li><a href="mailto:partner@navdhan.com" style={{ color: '#000000' }}>Partner Enquiries</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2025 Kubar Labs. All rights reserved.
          </p>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: #ffffff !important;
          border-top: 1px solid rgba(0, 0, 0, 0.1) !important;
          padding: var(--spacing-3xl) 0 var(--spacing-xl);
          margin-top: var(--spacing-3xl);
          position: relative;
          overflow: visible;
        }

        .footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.1), transparent);
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 3fr;
          gap: var(--spacing-3xl);
          margin-bottom: var(--spacing-2xl);
        }

        .footer-brand {
          max-width: 420px;
        }

        .footer-logo {
          font-family: var(--font-heading);
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: var(--spacing-md);
          color: #000000 !important;
          letter-spacing: -0.02em;
        }

        .footer-description {
          font-size: 1rem;
          color: #333333 !important;
          margin-bottom: var(--spacing-xl);
          line-height: 1.7;
        }

        .footer-social {
          display: flex;
          gap: var(--spacing-sm);
        }

        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          background: rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 10px;
          color: #000000 !important;
          transition: all var(--transition-base);
        }

        .social-link:hover {
          background: linear-gradient(135deg, #ff8c00 0%, #ffa500 100%);
          border-color: #ff8c00;
          color: #ffffff !important;
          transform: translateY(-3px);
          box-shadow: 0 4px 12px rgba(255, 140, 0, 0.3);
        }

        .footer-links {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--spacing-2xl);
        }

        .footer-heading {
          font-size: 0.875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #000000 !important;
          margin-bottom: var(--spacing-lg);
          font-family: var(--font-heading);
        }

        .footer-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .footer-list a,
        .footer-list a:link,
        .footer-list a:visited,
        .footer-list a:focus,
        .footer-list a:active {
          font-size: 0.95rem;
          color: #000000 !important;
          transition: all var(--transition-fast);
          position: relative;
          display: inline-block;
          width: fit-content;
          text-decoration: none;
        }

        .footer-list a:hover {
          color: #000000 !important;
        }

        .footer-list a::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1.5px;
          background: #ff8c00;
          transition: width var(--transition-base);
        }

        .footer-list a:hover::after {
          width: 100%;
        }

        .footer-bottom {
          display: flex;
          justify-content: center;
          align-items: center;
          padding-top: var(--spacing-xl);
          border-top: 1px solid rgba(0, 0, 0, 0.1);
        }

        .footer-copyright {
          font-size: 0.875rem;
          color: #000000 !important;
          text-align: center;
        }

        @media (max-width: 968px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: var(--spacing-2xl);
          }

          .footer-links {
            grid-template-columns: repeat(2, 1fr);
            gap: var(--spacing-xl);
          }

          .footer-brand {
            max-width: 100%;
          }
        }

        @media (max-width: 640px) {
          .footer {
            padding: var(--spacing-2xl) 0 var(--spacing-lg);
          }

          .footer-links {
            grid-template-columns: 1fr;
            gap: var(--spacing-lg);
          }

          .footer-bottom {
            flex-direction: column;
            gap: var(--spacing-sm);
          }
        }
      `}</style>
    </footer>
  );
}

