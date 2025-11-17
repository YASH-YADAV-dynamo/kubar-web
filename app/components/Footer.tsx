'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-badges-section">
          <div className="footer-badges">
            <motion.div 
              className="footer-badge-image"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.05, y: -3 }}
            >
              <Image 
                src="/acheivements-footer/img1.png" 
                alt="WTFund top 25 startup" 
                width={320} 
                height={80}
                className="achievement-image"
                priority
              />
            </motion.div>

            <motion.div 
              className="footer-badge-image"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.05, y: -3 }}
            >
              <Image 
                src="/acheivements-footer/img2.png" 
                alt="F6S selected" 
                width={320} 
                height={80}
                className="achievement-image"
                priority
              />
            </motion.div>
          </div>
        </div>

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
                <li><Link href="/products/navdhan" style={{ color: '#ffffff' }}>NavDhan Overview</Link></li>
                <li><Link href="/products/navdhan#usecases" style={{ color: '#ffffff' }}>Use Cases</Link></li>
                <li><Link href="/products/navdhan#integrations" style={{ color: '#ffffff' }}>Integrations</Link></li>
                <li><Link href="/contact#contact-form" style={{ color: '#ffffff' }}>Book a Demo</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-heading">Company</h4>
              <ul className="footer-list">
                <li><Link href="/about" style={{ color: '#ffffff' }}>About Us</Link></li>
                <li><Link href="/team" style={{ color: '#ffffff' }}>Team</Link></li>
                <li><Link href="/blog" style={{ color: '#ffffff' }}>Resources</Link></li>
                <li><Link href="/contact" style={{ color: '#ffffff' }}>Contact</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-heading">Stay in Touch</h4>
              <ul className="footer-list">
                <li><a href="https://www.linkedin.com/company/kubarlabs" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                <li><a href="https://x.com/kubarlabs" target="_blank" rel="noopener noreferrer">X (Twitter)</a></li>
                <li><a href="https://kubarlabs.substack.com" target="_blank" rel="noopener noreferrer">Substack</a></li>
                <li><a href="mailto:partner@navdhan.com">Partner Enquiries</a></li>
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
          background: linear-gradient(180deg, var(--color-background) 0%, var(--color-surface) 100%);
          border-top: 1px solid var(--color-border);
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
          background: linear-gradient(90deg, transparent, var(--color-border), transparent);
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
          color: #ffffff;
          letter-spacing: -0.02em;
        }

        .footer-description {
          font-size: 1rem;
          color: #ffffff;
          margin-bottom: var(--spacing-xl);
          line-height: 1.7;
        }

        .footer-badges-section {
          padding-bottom: var(--spacing-2xl);
          margin-bottom: var(--spacing-2xl);
        }

        .footer-badges {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          gap: var(--spacing-xl);
          flex-wrap: wrap;
        }

        .footer-badge-image {
          position: relative;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1));
        }

        .footer-badge-image:hover {
          filter: drop-shadow(0 8px 20px rgba(0, 0, 0, 0.15));
        }

        .achievement-image {
          width: auto;
          height: auto;
          max-width: 280px;
          max-height: 110px;
          object-fit: contain;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @media (max-width: 768px) {
          .achievement-image {
            max-width: 70px;
            max-height: 30px;
          }
        }

        @media (max-width: 480px) {
          .achievement-image {
            max-width: 60px;
            max-height: 26px;
          }
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
          background: var(--color-surface-elevated);
          border: 1px solid var(--color-border);
          border-radius: 10px;
          color: #ffffff;
          transition: all var(--transition-base);
        }

        .social-link:hover {
          background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
          border-color: #ffd700;
          color: #ffffff;
          transform: translateY(-3px);
          box-shadow: 0 4px 12px rgba(163, 230, 53, 0.3);
        }

        @media (max-width: 768px) {
          .footer-badges-section {
            padding-bottom: var(--spacing-xl);
            margin-bottom: var(--spacing-xl);
          }

          .footer-badges {
            flex-direction: row;
            gap: var(--spacing-md);
            flex-wrap: wrap;
            justify-content: center;
          }
        }

        @media (max-width: 640px) {
          .footer-badges {
            gap: var(--spacing-sm);
          }
        }
        
        @media (max-width: 480px) {
          .footer-badges {
            gap: var(--spacing-xs);
          }
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
          color: #ffd700;
          margin-bottom: var(--spacing-lg);
          font-family: var(--font-heading);
        }

        .footer-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .footer-list li {
          color: #ffffff;
        }

        .footer-list a,
        .footer-list a:link,
        .footer-list a:visited,
        .footer-list a:focus,
        .footer-list a:active,
        .footer-list a:hover {
          font-size: 0.95rem;
          color: #ffffff !important;
          transition: all var(--transition-fast);
          position: relative;
          display: inline-block;
          width: fit-content;
          text-decoration: none;
        }

        .footer-list a::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1.5px;
          background: #ffd700;
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
          border-top: 1px solid var(--color-border);
        }

        .footer-copyright {
          font-size: 0.875rem;
          color: #ffffff;
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

