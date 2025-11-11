'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

const secondaryNavItems = [
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Team", href: "/team" }
];

export default function Header() {
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
    <motion.header 
      className={`header ${isScrolled ? 'scrolled' : ''}`}
      layout
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 35,
        mass: 0.7
      }}
      animate={{
        width: isScrolled && windowWidth >= 769 ? 'calc(100% - 4rem)' : 'calc(100% - 4rem)',
        maxWidth: isScrolled && windowWidth >= 769 ? 1200 : undefined,
        borderRadius: 999,
        marginTop: windowWidth >= 769 ? 16 : 0,
        left: isScrolled && windowWidth >= 769 ? '50%' : '50%',
        right: isScrolled && windowWidth >= 769 ? 'auto' : 'auto',
        x: isScrolled && windowWidth >= 769 ? '-50%' : '-50%',
        backgroundColor: isScrolled && windowWidth >= 769 
          ? 'rgba(255, 255, 255, 0.12)' 
          : 'rgba(255, 255, 255, 0.15)',
        zIndex: isScrolled ? 10000 : 1000,
      }}
      style={{
        position: 'fixed',
        top: 0,
      }}
    >
      <nav className="nav container" aria-label="Primary">
        <div className="nav-brand">
          <Link href="/" className="logo logo-button">
            <Image src="/logo.png" alt="Kubar Labs" width={44} height={44} className="logo-icon" />
          </Link>
        </div>

        <div className={`nav-links ${isMenuOpen ? 'is-open' : ''}`} id="primary-navigation">
          <div className={`nav-item dropdown ${isDropdownOpen ? 'is-open' : ''}`} data-dropdown>
            <button
              className="nav-link dropdown-toggle"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsDropdownOpen(!isDropdownOpen);
              }}
              aria-expanded={isDropdownOpen}
            >
              Products
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M4.5 6L8 9.5L11.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className={`dropdown-menu ${isDropdownOpen ? 'is-open' : ''}`} onClick={(e) => e.stopPropagation()}>
              <Link className="dropdown-link" href="/products/navdhan" onClick={closeMenu}>
                <span className="dropdown-title">NavDhan</span>
                <span className="dropdown-subtext">India's first MSME Credit Hub</span>
              </Link>
              <div className="dropdown-link is-disabled" aria-disabled="true">
                <div className="dropdown-title">
                  BRE
                  <span className="dropdown-badge">Coming Soon</span>
                </div>
                <span className="dropdown-subtext">No-code engine for credit policies</span>
              </div>
              <div className="dropdown-link is-disabled" aria-disabled="true">
                <div className="dropdown-title">
                  Underwriting Engine
                  <span className="dropdown-badge">Coming Soon</span>
                </div>
                <span className="dropdown-subtext">Holistic Sector-Specific Risk Profiling</span>
              </div>
            </div>
          </div>

          {secondaryNavItems.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link" onClick={closeMenu}>
              {item.label}
            </Link>
          ))}

          <div className="nav-cta-wrapper">
            <Link 
              href="/contact#contact-form" 
              onClick={closeMenu}
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
              style={{
                background: isButtonHovered && windowWidth >= 769 
                  ? 'linear-gradient(135deg, #ffed4e 0%, #ffd700 50%, #ffcc00 100%)'
                  : 'linear-gradient(135deg, #ffd700 0%, #ffcc00 50%, #ffd700 100%)',
                border: 'none',
                borderTop: '2px solid rgba(255, 255, 255, 0.3)',
                borderBottom: '2px solid rgba(0, 0, 0, 0.2)',
                padding: windowWidth >= 769 ? '0.875rem 2.5rem' : '0.875rem 1.5rem',
                borderRadius: windowWidth >= 769 ? '999px' : '16px',
                color: '#000000',
                fontWeight: '700',
                fontSize: windowWidth >= 769 ? '0.95rem' : '0.9rem',
                letterSpacing: '0.05em',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'visible',
                boxShadow: isButtonHovered && windowWidth >= 769 
                  ? '0 10px 25px rgba(255, 215, 0, 0.5), 0 5px 15px rgba(255, 204, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4), inset 0 -2px 0 rgba(0, 0, 0, 0.1)'
                  : '0 6px 15px rgba(255, 215, 0, 0.4), 0 3px 8px rgba(255, 204, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -2px 0 rgba(0, 0, 0, 0.15)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                fontFamily: 'inherit',
                zIndex: 1,
                transform: isButtonHovered && windowWidth >= 769 ? 'translateY(-3px) scale(1.02)' : 'translateZ(0)',
                width: windowWidth >= 769 ? 'auto' : '100%',
                margin: 0,
                appearance: 'none',
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                textShadow: '0 1px 2px rgba(255, 255, 255, 0.3)'
              }}
            >
              <span style={{ position: 'relative', zIndex: 2 }}>Book a Demo</span>
            </Link>
          </div>
        </div>

        <button
          className="mobile-menu-toggle"
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
        .header {
          position: fixed;
          top: 0;
          z-index: 1000;
          background: rgba(10, 10, 10, 0.3);
          backdrop-filter: blur(0px);
          -webkit-backdrop-filter: blur(0px);
          border-bottom: 1px solid transparent;
          opacity: 0;
        }

        .header.scrolled {
          z-index: 10000;
        }

        @media (min-width: 769px) {
          .header {
            opacity: 1;
          }
        }

        .header.scrolled {
          opacity: 1;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(80px) saturate(180%);
          -webkit-backdrop-filter: blur(80px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 
            0 12px 48px rgba(0, 0, 0, 0.3), 
            0 0 0 1px rgba(255, 255, 255, 0.1) inset, 
            0 4px 16px rgba(163, 230, 53, 0.1),
            -2px 0 0 rgba(255, 215, 0, 0.5),
            2px 0 0 rgba(31, 76, 242, 0.5);
          position: relative;
        }

        .header.scrolled::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, rgba(255, 215, 0, 0.8), rgba(31, 76, 242, 0.8), rgba(255, 215, 0, 0.8));
          pointer-events: none;
        }

        .header.scrolled::after {
          content: '';
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, rgba(255, 215, 0, 0.8), rgba(31, 76, 242, 0.8), rgba(255, 215, 0, 0.8));
          pointer-events: none;
        }


        @media (min-width: 769px) {
          .header {
            opacity: 1;
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(60px) saturate(180%);
            -webkit-backdrop-filter: blur(60px) saturate(180%);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1) inset;
            border-radius: 999px;
            margin: 1rem auto 0;
          }

          .header.scrolled {
            background: rgba(255, 255, 255, 0.12);
            backdrop-filter: blur(80px) saturate(180%);
            -webkit-backdrop-filter: blur(80px) saturate(180%);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-bottom: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 999px;
            box-shadow: 
              0 20px 60px rgba(0, 0, 0, 0.3),
              0 8px 24px rgba(0, 0, 0, 0.2),
              0 0 0 1px rgba(255, 255, 255, 0.15) inset,
              0 1px 3px rgba(255, 255, 255, 0.2) inset,
              0 -2px 8px rgba(0, 0, 0, 0.1) inset,
              0 4px 16px rgba(163, 230, 53, 0.15),
              -2px 0 0 rgba(255, 215, 0, 0.5),
              2px 0 0 rgba(31, 76, 242, 0.5),
              -15px -15px 40px rgba(255, 215, 0, 0.3),
              15px -15px 40px rgba(255, 215, 0, 0.3),
              0 0 60px rgba(255, 215, 0, 0.15);
            position: relative;
          }

          .header.scrolled::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 2px;
            background: linear-gradient(to bottom, rgba(255, 215, 0, 0.8), rgba(31, 76, 242, 0.8), rgba(255, 215, 0, 0.8));
            border-radius: 24px 0 0 24px;
            pointer-events: none;
          }

          .header.scrolled::after {
            content: '';
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            width: 2px;
            background: linear-gradient(to bottom, rgba(255, 215, 0, 0.8), rgba(31, 76, 242, 0.8), rgba(255, 215, 0, 0.8));
            border-radius: 0 24px 24px 0;
            pointer-events: none;
          }

          .header {
            position: relative;
            box-shadow: 
              0 0 0 1px rgba(255, 255, 255, 0.15) inset,
              0 1px 3px rgba(255, 255, 255, 0.2) inset,
              0 -2px 8px rgba(0, 0, 0, 0.1) inset,
              -15px -15px 40px rgba(255, 215, 0, 0.25),
              15px -15px 40px rgba(255, 215, 0, 0.25),
              0 0 50px rgba(255, 215, 0, 0.12);
          }

        }

        @media (max-width: 768px) {
          .header {
            left: 0;
            right: 0;
            transform: translateY(-100%);
          }

          .header.scrolled {
            margin: 0;
            left: 0;
            right: 0;
            width: 100%;
            border-radius: 0 0 20px 20px;
            transform: translateY(0);
          }

          .header.scrolled {
            box-shadow: 
              0 16px 50px rgba(0, 0, 0, 0.35),
              0 6px 20px rgba(0, 0, 0, 0.25),
              0 0 0 1px rgba(255, 255, 255, 0.15) inset,
              0 1px 3px rgba(255, 255, 255, 0.2) inset,
              0 -2px 8px rgba(0, 0, 0, 0.1) inset,
              -10px -10px 30px rgba(255, 215, 0, 0.3),
              10px -10px 30px rgba(255, 215, 0, 0.3),
              0 0 50px rgba(255, 215, 0, 0.15);
          }
        }

        .nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem var(--content-padding);
          max-width: 1400px;
          margin: 0 auto;
        }

        .header.scrolled .nav {
          padding: 0.625rem 2rem;
        }

        @media (max-width: 768px) {
          .header.scrolled .nav {
            padding: 0.75rem var(--content-padding);
          }
        }

        .nav-brand {
          z-index: 2;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--color-text-primary);
          text-decoration: none;
          transition: all 0.3s ease;
          padding: 0.5rem;
          border-radius: 12px;
        }

        .logo-button {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 0.5rem 0.75rem;
          border-radius: 12px;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .logo-button:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
          opacity: 1;
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .logo-icon {
          max-height: 44px;
          width: auto;
          border-radius: 12px;
          transition: transform 0.3s ease;
        }

        .logo:hover .logo-icon {
          transform: rotate(5deg);
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          transition: opacity var(--transition-base), transform var(--transition-base);
        }

        .nav-cta-wrapper {
          position: relative;
          margin-left: 1.5rem;
          padding-left: 1.5rem;
        }

        .nav-cta-wrapper::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 1px;
          height: 24px;
          background: rgba(255, 255, 255, 0.15);
        }

        .nav-link-cta {
          position: relative;
        }

        .nav-link {
          position: relative;
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--color-text-secondary);
          transition: color var(--transition-fast);
          padding: 0.5rem 0;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0.25rem;
          left: 0;
          right: 0;
          height: 2px;
          background: #ffd700;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform var(--transition-base);
        }

        .nav-item {
          position: relative;
          display: flex;
          align-items: center;
        }

        .dropdown-toggle {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: none;
          border: none;
          cursor: pointer;
          padding-right: 0.25rem;
          color: #ffd700;
          font-weight: 500;
        }

        .dropdown-toggle:hover {
          color: #ffd700;
          opacity: 1;
        }

        .dropdown-toggle:focus-visible {
          outline: 2px solid #ffd700;
          outline-offset: 4px;
        }

        .dropdown-toggle svg {
          transition: transform var(--transition-fast);
        }

        .dropdown.is-open .dropdown-toggle svg {
          transform: rotate(180deg);
        }

        .dropdown-menu {
          position: absolute;
          top: calc(100% + 0.75rem);
          left: 0;
          display: none;
          flex-direction: column;
          gap: 0.75rem;
          min-width: 340px;
          padding: 0.75rem;
          background: rgba(16, 16, 16, 0.95);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.05) inset;
          z-index: 10;
        }

        .dropdown-menu.is-open {
          display: flex;
        }

        .dropdown-link {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          padding: 1rem;
          border-radius: 12px;
          color: var(--color-text-primary);
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: transparent;
          border: 1px solid transparent;
        }

        .dropdown-link:hover {
          background: var(--color-surface-elevated);
          transform: translateY(-1px);
        }

        .dropdown-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          justify-content: flex-start;
          font-weight: 600;
          font-size: 1rem;
          flex-wrap: nowrap;
          white-space: nowrap;
        }

        .dropdown-subtext {
          font-size: 0.9rem;
          color: var(--color-text-secondary);
        }

        .dropdown-badge {
          display: inline-flex !important;
          align-items: center;
          padding: 0.25rem 0.65rem;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          border-radius: 999px;
          background: #ffd700;
          color: #000000;
          margin-left: 0.5rem;
          white-space: nowrap;
          opacity: 1;
          visibility: visible;
          flex-shrink: 0;
        }

        .dropdown-link.is-disabled {
          opacity: 0.55;
          cursor: not-allowed;
          pointer-events: none;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
        }

        .dropdown-link.is-disabled:hover {
          transform: none;
        }

        .nav-link:hover {
          color: var(--color-text-primary);
        }

        .nav-link:hover::after {
          transform: scaleX(1);
        }

        .nav-link-cta-button {
          background: linear-gradient(135deg, #ffd700 0%, #ffcc00 50%, #ffd700 100%) !important;
          border: none !important;
          border-top: 2px solid rgba(255, 255, 255, 0.3) !important;
          border-bottom: 2px solid rgba(0, 0, 0, 0.2) !important;
          padding: 0.875rem 1.5rem !important;
          border-radius: 14px !important;
          color: #000000 !important;
          font-weight: 700 !important;
          font-size: 0.9rem !important;
          letter-spacing: 0.03em !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
          position: relative !important;
          overflow: visible !important;
          box-shadow: 0 6px 15px rgba(255, 215, 0, 0.4), 0 3px 8px rgba(255, 204, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -2px 0 rgba(0, 0, 0, 0.15) !important;
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
          width: 100% !important;
          margin: 0 !important;
          appearance: none !important;
          -webkit-appearance: none !important;
          -moz-appearance: none !important;
          text-shadow: 0 1px 2px rgba(255, 255, 255, 0.3) !important;
        }
        
        .nav-link-cta-button,
        .nav-link-cta-button:link,
        .nav-link-cta-button:visited {
          background: linear-gradient(135deg, #ffd700 0%, #ffcc00 50%, #ffd700 100%) !important;
          border: none !important;
          border-top: 2px solid rgba(255, 255, 255, 0.3) !important;
          border-bottom: 2px solid rgba(0, 0, 0, 0.2) !important;
          color: #000000 !important;
          text-decoration: none !important;
        }

        @media (min-width: 769px) {
          .nav-link-cta-button {
            padding: 0.875rem 2.5rem;
            font-size: 0.95rem;
            width: auto;
          }
        }

        .nav-link-cta-button > span {
          position: relative;
          z-index: 2;
        }


        @media (min-width: 769px) {
          .nav-link-cta-button:hover {
            background: linear-gradient(135deg, #ffed4e 0%, #ffd700 50%, #ffcc00 100%) !important;
            border-top: 2px solid rgba(255, 255, 255, 0.4) !important;
            border-bottom: 2px solid rgba(0, 0, 0, 0.15) !important;
            color: #000000 !important;
            transform: translateY(-3px) scale(1.02) !important;
            box-shadow: 
              0 10px 25px rgba(255, 215, 0, 0.5),
              0 5px 15px rgba(255, 204, 0, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.4),
              inset 0 -2px 0 rgba(0, 0, 0, 0.1) !important;
            text-decoration: none !important;
          }
        }

        .nav-link-cta-button:active {
          transform: translateY(1px) scale(0.98) !important;
          box-shadow: 
            0 2px 8px rgba(255, 215, 0, 0.3),
            0 1px 4px rgba(255, 204, 0, 0.2),
            inset 0 2px 4px rgba(0, 0, 0, 0.2),
            inset 0 -1px 0 rgba(255, 255, 255, 0.2) !important;
          background: linear-gradient(135deg, #ffcc00 0%, #ffd700 50%, #ffcc00 100%) !important;
          border-top: 2px solid rgba(255, 255, 255, 0.2) !important;
          border-bottom: 2px solid rgba(0, 0, 0, 0.25) !important;
          color: #000000 !important;
        }

        .nav-link-cta-button:focus-visible {
          outline: 3px solid #ffd700;
          outline-offset: 4px;
          box-shadow: 
            0 4px 20px rgba(163, 230, 53, 0.4),
            0 2px 8px rgba(163, 230, 53, 0.2);
        }

        .mobile-menu-toggle {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          z-index: 2;
        }

        .mobile-menu-toggle span {
          width: 24px;
          height: 2px;
          background: var(--color-text-primary);
          border-radius: 2px;
          transition: all var(--transition-base);
        }

        .mobile-menu-toggle[aria-expanded="true"] span:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }

        .mobile-menu-toggle[aria-expanded="true"] span:nth-child(2) {
          opacity: 0;
        }

        .mobile-menu-toggle[aria-expanded="true"] span:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        @media (max-width: 768px) {
          .nav {
            position: relative;
          }

          .nav-links {
            position: absolute;
            top: calc(100% + 0.75rem);
            right: var(--content-padding);
            left: var(--content-padding);
            flex-direction: column;
            align-items: stretch;
            gap: 0;
            background: rgba(16, 16, 16, 0.95);
            backdrop-filter: blur(24px) saturate(180%);
            -webkit-backdrop-filter: blur(24px) saturate(180%);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 0.75rem;
            opacity: 0;
            transform: translateY(-1rem);
            pointer-events: none;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05) inset;
          }

          .nav-links.is-open {
            opacity: 1;
            transform: translateY(0);
            pointer-events: auto;
          }

          .nav-link {
            padding: 0.875rem 1rem;
            border-radius: 12px;
            transition: all var(--transition-fast);
          }

          .nav-link::after {
            display: none;
          }

          .nav-link:hover {
            background: var(--color-surface-elevated);
          }

          .nav-link-cta-button {
            margin-top: 0.5rem !important;
            padding: 0.875rem 1rem !important;
            text-align: center !important;
            width: 100% !important;
            font-size: 0.9rem !important;
            background: transparent !important;
            border: 2px solid #ffd700 !important;
            color: #ffd700 !important;
            text-decoration: none !important;
          }

          .nav-cta-wrapper {
            margin-left: 0;
            padding-left: 0;
          }

          .nav-cta-wrapper::before {
            display: none;
          }

          .dropdown {
            width: 100%;
          }

          .dropdown-toggle {
            width: 100%;
            justify-content: space-between;
            padding: 0.875rem 1rem;
            border-radius: 12px;
          }

          .dropdown-menu {
            position: static;
            margin-top: 0.5rem;
            box-shadow: none;
            border-radius: 16px;
            border-width: 1px;
            display: none;
          }

          .dropdown-menu.is-open {
            display: flex;
          }

          .dropdown-link {
            padding: 0.75rem;
            border: none;
          }

          .mobile-menu-toggle {
            display: flex;
          }
        }
      `}</style>
    </motion.header>
  );
}

