'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const secondaryNavItems = [
  { label: "About Us", href: "/about" },
  { label: "Resources", href: "/blog" },
  { label: "Team", href: "/team" }
];

export default function NavDhanHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };
    
    updateWindowWidth();
    window.addEventListener('resize', updateWindowWidth);
    return () => window.removeEventListener('resize', updateWindowWidth);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('nav-open');
    } else {
      document.body.classList.remove('nav-open');
    }

    return () => {
      document.body.classList.remove('nav-open');
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isDropdownOpen && !target.closest('[data-dropdown]')) {
        setIsDropdownOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isDropdownOpen) {
          setIsDropdownOpen(false);
        }
        if (isMenuOpen) {
          setIsMenuOpen(false);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isDropdownOpen, isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  return (
    <header 
      className={`navdhan-header ${isScrolled ? 'scrolled' : ''}`}
    >
      <nav className="navdhan-nav container" aria-label="Primary">
        <div className="navdhan-nav-brand">
          <Link href="/" className="navdhan-logo navdhan-logo-button" style={{ color: '#006400' }}>
            <Image src="/logo.png" alt="Kubar Labs" width={44} height={44} className="navdhan-logo-icon" />
          </Link>
        </div>

        <div className={`navdhan-nav-links ${isMenuOpen ? 'is-open' : ''}`} id="primary-navigation">
          <div className={`navdhan-nav-item navdhan-dropdown ${isDropdownOpen ? 'is-open' : ''}`} data-dropdown>
            <button
              className="navdhan-nav-link navdhan-dropdown-toggle"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsDropdownOpen(!isDropdownOpen);
              }}
              aria-expanded={isDropdownOpen}
              style={{ color: '#006400' }}
            >
              Products
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M4.5 6L8 9.5L11.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className={`navdhan-dropdown-menu ${isDropdownOpen ? 'is-open' : ''}`} onClick={(e) => e.stopPropagation()}>
              <Link className="navdhan-dropdown-link" href="/products/navdhan" onClick={closeMenu}>
                <span className="navdhan-dropdown-title">NavDhan</span>
                <span className="navdhan-dropdown-subtext">India's first MSME Credit Hub</span>
              </Link>
              <div className="navdhan-dropdown-link is-disabled" aria-disabled="true">
                <div className="navdhan-dropdown-title">
                  BRE
                  <span className="navdhan-dropdown-badge">Coming Soon</span>
                </div>
                <span className="navdhan-dropdown-subtext">No-code engine for credit policies</span>
              </div>
              <div className="navdhan-dropdown-link is-disabled" aria-disabled="true">
                <div className="navdhan-dropdown-title">
                  Underwriting Engine
                  <span className="navdhan-dropdown-badge">Coming Soon</span>
                </div>
                <span className="navdhan-dropdown-subtext">Holistic Sector-Specific Risk Profiling</span>
              </div>
            </div>
          </div>

          {secondaryNavItems.map((item) => (
            <Link key={item.href} href={item.href} className="navdhan-nav-link" onClick={closeMenu} style={{ color: '#006400' }}>
              {item.label}
            </Link>
          ))}

          <div className="navdhan-nav-cta-wrapper">
            <Link 
              href="/contact#contact-form" 
              onClick={closeMenu}
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
              className="navdhan-nav-cta-button"
              style={{
                background: 'linear-gradient(135deg, #228B22 0%, #32CD32 50%, #228B22 100%)',
                border: '2px solid #228B22',
                padding: windowWidth >= 769 ? '0.875rem 2.5rem' : '0.875rem 1.5rem',
                borderRadius: '16px',
                color: '#ffffff',
                fontSize: windowWidth >= 769 ? '0.95rem' : '0.9rem',
                fontWeight: '700',
                letterSpacing: '0.05em',
                boxShadow: isButtonHovered && windowWidth >= 769 
                  ? '0 12px 32px rgba(34, 139, 34, 0.6), 0 6px 16px rgba(50, 205, 50, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                  : '0 6px 20px rgba(34, 139, 34, 0.4), 0 2px 8px rgba(50, 205, 50, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                transform: isButtonHovered && windowWidth >= 769 ? 'translateY(-4px) scale(1.03)' : 'translateZ(0)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <span style={{ position: 'relative', zIndex: 2 }}>Book a Demo</span>
            </Link>
          </div>
        </div>

        <button
          className="navdhan-mobile-menu-toggle"
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          aria-label="Toggle navigation"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      <style jsx>{`
        .navdhan-header {
          position: fixed;
          top: 0;
          z-index: 1000;
          background: #F7941D;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          border-bottom: none !important;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 1;
          width: 100%;
          box-shadow: none !important;
        }

        .navdhan-header.scrolled {
          opacity: 1;
          background: #F7941D;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          border-bottom: none !important;
          box-shadow: none !important;
        }

        .navdhan-header.scrolled::before {
          display: none;
        }

        .navdhan-header.scrolled::after {
          display: none;
        }

        @media (min-width: 769px) {
          .navdhan-header {
            position: fixed;
            left: 50%;
            transform: translateX(-50%);
            width: calc(100% - 4rem);
            max-width: 1200px;
            border-radius: 24px;
            margin-top: 1rem;
            background: #F7941D;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1) !important;
          }

          .navdhan-header.scrolled {
            position: fixed;
            left: 50%;
            transform: translateX(-50%);
            width: calc(100% - 4rem);
            max-width: 1200px;
            border-radius: 24px;
            margin-top: 1rem;
            border-bottom: none !important;
            background: #F7941D;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15) !important;
          }
        }

        @media (max-width: 768px) {
          .navdhan-header {
            position: fixed;
            left: 0;
            right: 0;
            width: 100%;
            transform: translateY(0);
            border-radius: 0;
            margin-top: 0;
          }

          .navdhan-header.scrolled {
            position: fixed;
            left: 0;
            right: 0;
            width: 100%;
            border-radius: 0 0 20px 20px;
            transform: translateY(0);
            margin-top: 0;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1) !important;
          }
        }

        .navdhan-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem var(--content-padding);
          max-width: 1400px;
          margin: 0 auto;
        }

        .navdhan-header.scrolled .navdhan-nav {
          padding: 0.75rem 2rem;
        }

        @media (max-width: 768px) {
          .navdhan-header.scrolled .navdhan-nav {
            padding: 0.875rem var(--content-padding);
          }
        }

        .navdhan-nav-brand {
          z-index: 2;
        }

        .navdhan-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 700;
          color: #006400 !important;
          text-decoration: none;
          transition: all 0.3s ease;
          padding: 0.5rem;
          border-radius: 12px;
        }

        .navdhan-logo-button {
          background: rgba(255, 255, 255, 0.3);
          border: 1px solid rgba(0, 0, 0, 0.1);
          padding: 0.5rem 0.75rem;
          border-radius: 12px;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .navdhan-logo-button:hover {
          background: rgba(255, 255, 255, 0.5);
          border-color: rgba(0, 0, 0, 0.2);
          opacity: 1;
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .navdhan-logo:hover {
          color: #000000 !important;
        }

        .navdhan-logo-icon {
          max-height: 44px;
          width: auto;
          border-radius: 12px;
          transition: transform 0.3s ease;
        }

        .navdhan-logo:hover .navdhan-logo-icon {
          transform: rotate(5deg);
        }

        .navdhan-nav-links {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          transition: opacity var(--transition-base), transform var(--transition-base);
        }

        .navdhan-nav-cta-wrapper {
          position: relative;
          margin-left: 1.5rem;
          padding-left: 1.5rem;
        }

        .navdhan-nav-cta-wrapper::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 1px;
          height: 24px;
          background: rgba(0, 0, 0, 0.2);
        }

        .navdhan-nav-link {
          position: relative;
          font-size: 0.95rem;
          font-weight: 500;
          color: #006400 !important;
          transition: color var(--transition-fast);
          padding: 0.5rem 0;
          text-decoration: none;
        }

        .navdhan-nav-link::after {
          content: '';
          position: absolute;
          bottom: 0.25rem;
          left: 0;
          right: 0;
          height: 2px;
          background: #000000;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform var(--transition-base);
        }

        .navdhan-nav-item {
          position: relative;
          display: flex;
          align-items: center;
        }

        .navdhan-dropdown-toggle {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: none;
          border: none;
          cursor: pointer;
          padding-right: 0.25rem;
          color: #006400 !important;
          font-weight: 500;
          font-size: 0.95rem;
        }

        .navdhan-dropdown-toggle:hover {
          color: #000000 !important;
          opacity: 1;
        }

        .navdhan-dropdown-toggle:focus-visible {
          outline: 2px solid #006400;
          outline-offset: 4px;
        }

        .navdhan-dropdown-toggle svg {
          transition: transform var(--transition-fast);
        }

        .navdhan-dropdown.is-open .navdhan-dropdown-toggle svg {
          transform: rotate(180deg);
        }

        .navdhan-dropdown-menu {
          position: absolute;
          top: calc(100% + 0.75rem);
          left: 0;
          display: none;
          flex-direction: column;
          gap: 0.75rem;
          min-width: 340px;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 16px;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.05) inset;
          z-index: 10;
        }

        .navdhan-dropdown-menu.is-open {
          display: flex;
        }

        .navdhan-dropdown-link {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          padding: 1rem;
          border-radius: 12px;
          color: #000000;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: transparent;
          border: 1px solid transparent;
        }

        .navdhan-dropdown-link:hover {
          background: rgba(0, 0, 0, 0.05);
          transform: translateY(-1px);
        }

        .navdhan-dropdown-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          justify-content: flex-start;
          font-weight: 600;
          font-size: 1rem;
          flex-wrap: nowrap;
          white-space: nowrap;
          color: #000000;
        }

        .navdhan-dropdown-subtext {
          font-size: 0.9rem;
          color: #666666;
        }

        .navdhan-dropdown-badge {
          display: inline-flex !important;
          align-items: center;
          padding: 0.25rem 0.65rem;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          border-radius: 999px;
          background: #ff8c00;
          color: #ffffff;
          margin-left: 0.5rem;
          white-space: nowrap;
          opacity: 1;
          visibility: visible;
          flex-shrink: 0;
        }

        .navdhan-dropdown-link.is-disabled {
          opacity: 0.55;
          cursor: not-allowed;
          pointer-events: none;
          background: rgba(0, 0, 0, 0.03);
          border: 1px solid rgba(0, 0, 0, 0.1);
        }

        .navdhan-dropdown-link.is-disabled:hover {
          transform: none;
        }

        .navdhan-nav-link:hover {
          color: #000000 !important;
        }

        .navdhan-nav-link:hover::after {
          transform: scaleX(1);
        }

        .navdhan-nav-cta-button {
          background: linear-gradient(135deg, #228B22 0%, #32CD32 50%, #228B22 100%) !important;
          border: 2px solid #228B22 !important;
          padding: 0.875rem 2.5rem !important;
          border-radius: 16px !important;
          color: #ffffff !important;
          font-weight: 700 !important;
          font-size: 0.95rem !important;
          letter-spacing: 0.05em !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
          position: relative !important;
          overflow: hidden !important;
          text-decoration: none !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          white-space: nowrap !important;
          cursor: pointer !important;
          font-family: inherit !important;
          z-index: 1 !important;
          isolation: isolate !important;
          transform: translateZ(0) !important;
          width: auto !important;
          margin: 0 !important;
          appearance: none !important;
          -webkit-appearance: none !important;
          -moz-appearance: none !important;
          box-shadow: 0 6px 20px rgba(34, 139, 34, 0.4), 0 2px 8px rgba(50, 205, 50, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
        }

        .navdhan-nav-cta-button > span {
          position: relative;
          z-index: 2;
        }

        .navdhan-nav-cta-button::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          transform: translate(-50%, -50%);
          transition: width 0.6s ease, height 0.6s ease;
          z-index: 1;
        }

        @media (min-width: 769px) {
          .navdhan-nav-cta-button:hover::after {
            width: 300px;
            height: 300px;
          }

          .navdhan-nav-cta-button:hover {
            background: linear-gradient(135deg, #32CD32 0%, #228B22 50%, #32CD32 100%) !important;
            border-color: #32CD32 !important;
            color: #ffffff !important;
            transform: translateY(-4px) scale(1.03) !important;
            box-shadow: 
              0 12px 32px rgba(34, 139, 34, 0.6),
              0 6px 16px rgba(50, 205, 50, 0.4),
              inset 0 1px 0 rgba(255, 255, 255, 0.3) !important;
            text-decoration: none !important;
          }
        }

        .navdhan-nav-cta-button:active {
          transform: translateY(-1px) scale(1.01) !important;
          box-shadow: 
            0 4px 15px rgba(34, 139, 34, 0.5),
            0 2px 8px rgba(50, 205, 50, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
          background: linear-gradient(135deg, #228B22 0%, #32CD32 50%, #228B22 100%) !important;
          border-color: #228B22 !important;
          color: #ffffff !important;
        }

        .navdhan-nav-cta-button:focus-visible {
          outline: 3px solid #228B22;
          outline-offset: 4px;
          box-shadow: 
            0 4px 20px rgba(34, 139, 34, 0.5),
            0 2px 8px rgba(50, 205, 50, 0.3);
        }

        .navdhan-mobile-menu-toggle {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          z-index: 2;
        }

        .navdhan-mobile-menu-toggle span {
          width: 24px;
          height: 2px;
          background: #000000;
          border-radius: 2px;
          transition: all var(--transition-base);
        }

        .navdhan-mobile-menu-toggle[aria-expanded="true"] span:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }

        .navdhan-mobile-menu-toggle[aria-expanded="true"] span:nth-child(2) {
          opacity: 0;
        }

        .navdhan-mobile-menu-toggle[aria-expanded="true"] span:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        @media (max-width: 768px) {
          .navdhan-nav {
            position: relative;
          }

          .navdhan-nav-links {
            position: absolute;
            top: calc(100% + 0.75rem);
            right: var(--content-padding);
            left: var(--content-padding);
            flex-direction: column;
            align-items: stretch;
            gap: 0;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(24px) saturate(180%);
            -webkit-backdrop-filter: blur(24px) saturate(180%);
            border: 1px solid rgba(0, 0, 0, 0.1);
            border-radius: 20px;
            padding: 0.75rem;
            opacity: 0;
            transform: translateY(-1rem);
            pointer-events: none;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.05) inset;
          }

          .navdhan-nav-links.is-open {
            opacity: 1;
            transform: translateY(0);
            pointer-events: auto;
          }

          .navdhan-nav-link {
            padding: 0.875rem 1rem;
            border-radius: 12px;
            transition: all var(--transition-fast);
          }

          .navdhan-nav-link::after {
            display: none;
          }

          .navdhan-nav-link:hover {
            background: rgba(0, 0, 0, 0.05);
          }

          .navdhan-nav-cta-button {
            margin-top: 0.5rem !important;
            padding: 0.875rem 1rem !important;
            text-align: center !important;
            width: 100% !important;
            font-size: 0.9rem !important;
            background: linear-gradient(135deg, #228B22 0%, #32CD32 50%, #228B22 100%) !important;
            border: 2px solid #228B22 !important;
            color: #ffffff !important;
            text-decoration: none !important;
            box-shadow: 0 6px 20px rgba(34, 139, 34, 0.4), 0 2px 8px rgba(50, 205, 50, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
            border-radius: 16px !important;
          }

          .navdhan-nav-cta-wrapper {
            margin-left: 0;
            padding-left: 0;
          }

          .navdhan-nav-cta-wrapper::before {
            display: none;
          }

          .navdhan-dropdown {
            width: 100%;
          }

          .navdhan-dropdown-toggle {
            width: 100%;
            justify-content: space-between;
            padding: 0.875rem 1rem;
            border-radius: 12px;
          }

          .navdhan-dropdown-menu {
            position: static;
            margin-top: 0.5rem;
            box-shadow: none;
            border-radius: 16px;
            border-width: 1px;
            display: none;
          }

          .navdhan-dropdown-menu.is-open {
            display: flex;
          }

          .navdhan-dropdown-link {
            padding: 0.75rem;
            border: none;
          }

          .navdhan-mobile-menu-toggle {
            display: flex;
          }
        }
      `}</style>
    </header>
  );
}

