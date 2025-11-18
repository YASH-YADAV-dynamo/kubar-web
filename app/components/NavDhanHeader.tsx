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
      document.body.style.overflow = 'hidden';
    } else {
      document.body.classList.remove('nav-open');
      document.body.style.overflow = '';
    }

    return () => {
      document.body.classList.remove('nav-open');
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Close mobile menu if clicking outside
      if (isMenuOpen && window.innerWidth <= 768) {
        if (!target.closest('.navdhan-nav-links') && !target.closest('.navdhan-mobile-menu-toggle')) {
          setIsMenuOpen(false);
        }
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
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
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header 
      className={`navdhan-header ${isScrolled ? 'scrolled' : ''}`}
    >
      <nav className="navdhan-nav container" aria-label="Primary">
        <div className="navdhan-nav-brand">
          <Link href="/" className="navdhan-logo navdhan-logo-button" style={{ color: '#006400' }}>
            <Image src="/logo.png" alt="Kubar Labs" width={38} height={33} className="navdhan-logo-icon" />
          </Link>
        </div>

        {isMenuOpen && windowWidth <= 768 && (
          <div 
            className="navdhan-mobile-menu-backdrop"
            onClick={() => setIsMenuOpen(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              zIndex: 9999,
              opacity: isMenuOpen ? 1 : 0,
              transition: 'opacity 0.3s ease',
              pointerEvents: isMenuOpen ? 'auto' : 'none'
            }}
          />
        )}

        <div className={`navdhan-nav-links ${isMenuOpen ? 'is-open' : ''}`} id="primary-navigation">
          {secondaryNavItems.map((item) => (
            <Link key={item.href} href={item.href} className="navdhan-nav-link" onClick={closeMenu} style={{ color: '#006400' }}>
              {item.label}
            </Link>
          ))}

          <div className="navdhan-nav-cta-wrapper navdhan-mobile-cta-wrapper">
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
          width: 38px;
          height: 33px;
          min-width: 38px;
          min-height: 33px;
          max-width: 38px;
          max-height: 33px;
          object-fit: contain;
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
          font-weight: 600;
          color: #006400 !important;
          text-decoration: none;
          padding: 0.625rem 1.25rem;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.1);
          border: 1.5px solid rgba(0, 100, 0, 0.2);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          white-space: nowrap;
          overflow: hidden;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .navdhan-nav-link::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s ease;
        }

        .navdhan-nav-link:hover {
          color: #ffffff !important;
          background: linear-gradient(135deg, #228B22 0%, #32CD32 50%, #228B22 100%);
          border-color: #228B22;
          transform: translateY(-2px);
          box-shadow: 
            0 8px 20px rgba(34, 139, 34, 0.3),
            0 4px 10px rgba(50, 205, 50, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .navdhan-nav-link:hover::before {
          left: 100%;
        }

        .navdhan-nav-link:active {
          transform: translateY(0);
          box-shadow: 
            0 4px 12px rgba(34, 139, 34, 0.3),
            inset 0 2px 4px rgba(0, 0, 0, 0.1);
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
          background: linear-gradient(135deg, #ffd700 0%, #ffcc00 50%, #ffd700 100%);
          border: 2px solid rgba(255, 215, 0, 0.3);
          cursor: pointer;
          padding: 0.625rem;
          z-index: 10001;
          position: relative;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
          transition: all 0.3s ease;
          margin-left: auto;
        }

        .navdhan-mobile-menu-toggle:hover {
          background: linear-gradient(135deg, #ffed4e 0%, #ffd700 50%, #ffed4e 100%);
          box-shadow: 0 6px 16px rgba(255, 215, 0, 0.4);
          transform: scale(1.05);
        }

        .navdhan-mobile-menu-toggle span {
          width: 22px;
          height: 2.5px;
          background: #000000;
          border-radius: 2px;
          transition: all 0.3s ease;
          display: block;
        }

        .navdhan-mobile-menu-toggle[aria-expanded="true"] {
          background: linear-gradient(135deg, #ffd700 0%, #ffcc00 50%, #ffd700 100%);
        }

        .navdhan-mobile-menu-toggle[aria-expanded="true"] span:nth-child(1) {
          transform: translateY(7.5px) rotate(45deg);
          background: #000000;
        }

        .navdhan-mobile-menu-toggle[aria-expanded="true"] span:nth-child(2) {
          opacity: 0;
          transform: scale(0);
        }

        .navdhan-mobile-menu-toggle[aria-expanded="true"] span:nth-child(3) {
          transform: translateY(-7.5px) rotate(-45deg);
          background: #000000;
        }

        @media (max-width: 768px) {
          .navdhan-nav {
            position: relative;
          }

          .navdhan-nav-links {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            width: 85%;
            max-width: 320px;
            height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: stretch;
            gap: 0;
            background: #F7941D;
            backdrop-filter: none;
            -webkit-backdrop-filter: none;
            border: none;
            border-left: 1px solid rgba(255, 215, 0, 0.2);
            border-radius: 0;
            padding: calc(60px + 1rem) 1.5rem 1.5rem;
            opacity: 0;
            transform: translateX(100%);
            pointer-events: none;
            box-shadow: -4px 0 24px rgba(0, 0, 0, 0.5);
            z-index: 10000;
            overflow-y: auto;
            transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s ease;
            will-change: transform, opacity;
          }

          .navdhan-nav-links.is-open {
            opacity: 1;
            transform: translateX(0);
            pointer-events: auto;
          }

          .navdhan-nav-link {
            padding: 1rem 1.5rem;
            border-radius: 12px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            color: #000000 !important;
            font-size: 1rem;
            font-weight: 600;
            border: 1.5px solid rgba(0, 0, 0, 0.15);
            background: rgba(255, 255, 255, 0.2);
            margin-bottom: 0.75rem;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            position: relative;
            overflow: hidden;
          }

          .navdhan-nav-link::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
            transition: left 0.5s ease;
          }

          .navdhan-nav-link::after {
            display: none;
          }

          .navdhan-nav-link:hover {
            background: linear-gradient(135deg, #228B22 0%, #32CD32 50%, #228B22 100%);
            color: #ffffff !important;
            border-color: #228B22;
            transform: translateY(-2px) scale(1.02);
            box-shadow: 
              0 8px 20px rgba(34, 139, 34, 0.4),
              0 4px 10px rgba(50, 205, 50, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.2);
          }

          .navdhan-nav-link:hover::before {
            left: 100%;
          }

          .navdhan-nav-link:active {
            transform: translateY(0) scale(1);
            box-shadow: 
              0 4px 12px rgba(34, 139, 34, 0.3),
              inset 0 2px 4px rgba(0, 0, 0, 0.1);
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

          .navdhan-mobile-cta-wrapper {
            margin-top: auto;
            padding-top: 2rem;
            margin-bottom: 1rem;
          }

          .navdhan-nav-cta-wrapper::before {
            display: none;
          }

          .navdhan-mobile-menu-toggle {
            display: flex;
          }
        }
      `}</style>
    </header>
  );
}

