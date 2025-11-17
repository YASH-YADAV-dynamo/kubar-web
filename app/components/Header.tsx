'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

const secondaryNavItems = [
  { label: "About Us", href: "/about" },
  { label: "Resources", href: "/blog" },
  { label: "Team", href: "/team" }
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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
              className="premium-cta-button"
              style={{
                position: 'relative',
                background: 'linear-gradient(135deg, #ffd700 0%, #ffcc00 25%, #ffd700 50%, #ffcc00 75%, #ffd700 100%)',
                backgroundSize: '300% 300%',
                border: 'none',
                padding: windowWidth >= 769 ? '1rem 2.75rem' : '0.875rem 1.5rem',
                borderRadius: windowWidth >= 769 ? '999px' : '16px',
                color: '#000000',
                fontWeight: '700',
                fontSize: windowWidth >= 769 ? '0.9375rem' : '0.9rem',
                letterSpacing: '0.02em',
                fontFamily: 'var(--font-heading)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                overflow: 'hidden',
                boxShadow: 'inset 0 3px 0 rgba(255, 255, 255, 0.8), inset 0 -4px 0 rgba(0, 0, 0, 0.3), inset 0 0 50px rgba(255, 255, 255, 0.15)',
                transform: 'translateZ(0)',
                zIndex: 1,
                width: windowWidth >= 769 ? 'auto' : '100%',
                margin: 0,
                appearance: 'none',
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                isolation: 'isolate',
                filter: 'brightness(1) saturate(1.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #ffed4e 0%, #ffd700 25%, #ffed4e 50%, #ffd700 75%, #ffed4e 100%)';
                e.currentTarget.style.backgroundPosition = '100% 50%';
                e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
                e.currentTarget.style.boxShadow = 'inset 0 3px 0 rgba(255, 255, 255, 0.9), inset 0 -4px 0 rgba(0, 0, 0, 0.25), inset 0 0 60px rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.filter = 'brightness(1.2) saturate(1.15)';
                const arrow = e.currentTarget.querySelector('svg') as SVGSVGElement | null;
                if (arrow && windowWidth >= 769) {
                  arrow.style.transform = 'translateX(5px) scale(1.15)';
                }
                const shine = e.currentTarget.querySelector('.button-shine') as HTMLElement;
                if (shine) {
                  shine.style.left = '100%';
                  shine.style.transition = 'left 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                }
                const glow = e.currentTarget.querySelector('.button-glow') as HTMLElement;
                if (glow) {
                  glow.style.width = '250px';
                  glow.style.height = '250px';
                  glow.style.opacity = '1';
                }
                const particles = e.currentTarget.querySelectorAll('.button-particle');
                particles.forEach((particle, index: number) => {
                  setTimeout(() => {
                    const el = particle as HTMLElement;
                    el.style.opacity = '1';
                    el.style.transform = `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1)`;
                  }, index * 50);
                });
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #ffd700 0%, #ffcc00 25%, #ffd700 50%, #ffcc00 75%, #ffd700 100%)';
                e.currentTarget.style.backgroundPosition = '0% 50%';
                e.currentTarget.style.transform = 'translateZ(0) scale(1)';
                e.currentTarget.style.boxShadow = 'inset 0 3px 0 rgba(255, 255, 255, 0.8), inset 0 -4px 0 rgba(0, 0, 0, 0.3), inset 0 0 50px rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.filter = 'brightness(1) saturate(1.1)';
                const arrow = e.currentTarget.querySelector('svg') as SVGSVGElement | null;
                if (arrow) {
                  arrow.style.transform = 'translateX(0) scale(1)';
                }
                const shine = e.currentTarget.querySelector('.button-shine') as HTMLElement;
                if (shine) {
                  shine.style.left = '-100%';
                }
                const glow = e.currentTarget.querySelector('.button-glow') as HTMLElement;
                if (glow) {
                  glow.style.width = '0';
                  glow.style.height = '0';
                  glow.style.opacity = '0';
                }
                const particles = e.currentTarget.querySelectorAll('.button-particle');
                particles.forEach((particle) => {
                  const el = particle as HTMLElement;
                  el.style.opacity = '0';
                  el.style.transform = 'translate(0, 0) scale(0)';
                });
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px) scale(0.97)';
                e.currentTarget.style.boxShadow = 'inset 0 4px 8px rgba(0, 0, 0, 0.35), inset 0 -2px 0 rgba(255, 255, 255, 0.5)';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
                e.currentTarget.style.boxShadow = 'inset 0 3px 0 rgba(255, 255, 255, 0.9), inset 0 -4px 0 rgba(0, 0, 0, 0.25), inset 0 0 60px rgba(255, 255, 255, 0.2)';
              }}
            >
              <span 
                className="button-shine"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)',
                  transition: 'left 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                  pointerEvents: 'none',
                  zIndex: 1,
                  transform: 'skewX(-20deg)'
                }}
              />
              <span 
                className="button-glow"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '0',
                  height: '0',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255, 215, 0, 0.5), rgba(255, 204, 0, 0.3), transparent)',
                  transform: 'translate(-50%, -50%)',
                  transition: 'width 0.5s ease, height 0.5s ease, opacity 0.5s ease',
                  pointerEvents: 'none',
                  zIndex: 0,
                  opacity: 0
                }}
              />
              {[...Array(6)].map((_, i) => (
                <span
                  key={i}
                  className="button-particle"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.8)',
                    transform: 'translate(-50%, -50%) scale(0)',
                    transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    pointerEvents: 'none',
                    zIndex: 1,
                    opacity: 0,
                    boxShadow: '0 0 8px rgba(255, 255, 255, 0.6)'
                  }}
                />
              ))}
              <span 
                className="button-highlight"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '50%',
                  background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.3), transparent)',
                  borderRadius: 'inherit',
                  pointerEvents: 'none',
                  zIndex: 1
                }}
              />
              <span style={{
                position: 'relative',
                zIndex: 3,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontWeight: '700',
                color: '#000000',
                fontFamily: 'var(--font-heading)'
              }}>
                <span>Book a Demo</span>
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 16 16" 
                  fill="none"
                  style={{
                    transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    transform: 'translateX(0) scale(1)'
                  }}
                >
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
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

        body.splash-active .header {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
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
            0 20px 60px rgba(0, 0, 0, 0.4),
            0 12px 40px rgba(0, 0, 0, 0.3),
            0 6px 20px rgba(0, 0, 0, 0.25),
            0 0 0 1px rgba(255, 255, 255, 0.15) inset,
            0 2px 4px rgba(255, 255, 255, 0.1) inset,
            0 -4px 12px rgba(0, 0, 0, 0.2) inset,
            0 4px 16px rgba(163, 230, 53, 0.15),
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
              0 25px 70px rgba(0, 0, 0, 0.45),
              0 15px 45px rgba(0, 0, 0, 0.35),
              0 8px 25px rgba(0, 0, 0, 0.3),
              0 4px 12px rgba(0, 0, 0, 0.25),
              0 0 0 1px rgba(255, 255, 255, 0.2) inset,
              0 2px 5px rgba(255, 255, 255, 0.25) inset,
              0 -4px 12px rgba(0, 0, 0, 0.15) inset,
              0 4px 16px rgba(163, 230, 53, 0.2),
              -2px 0 0 rgba(255, 215, 0, 0.6),
              2px 0 0 rgba(31, 76, 242, 0.6),
              -15px -15px 50px rgba(255, 215, 0, 0.35),
              15px -15px 50px rgba(255, 215, 0, 0.35),
              0 0 80px rgba(255, 215, 0, 0.2);
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
              0 15px 45px rgba(0, 0, 0, 0.3),
              0 8px 25px rgba(0, 0, 0, 0.25),
              0 4px 12px rgba(0, 0, 0, 0.2),
              0 0 0 1px rgba(255, 255, 255, 0.18) inset,
              0 2px 4px rgba(255, 255, 255, 0.22) inset,
              0 -3px 10px rgba(0, 0, 0, 0.12) inset,
              -15px -15px 45px rgba(255, 215, 0, 0.28),
              15px -15px 45px rgba(255, 215, 0, 0.28),
              0 0 60px rgba(255, 215, 0, 0.15);
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
              0 20px 60px rgba(0, 0, 0, 0.4),
              0 12px 35px rgba(0, 0, 0, 0.3),
              0 6px 20px rgba(0, 0, 0, 0.25),
              0 0 0 1px rgba(255, 255, 255, 0.18) inset,
              0 2px 5px rgba(255, 255, 255, 0.22) inset,
              0 -4px 12px rgba(0, 0, 0, 0.15) inset,
              -10px -10px 35px rgba(255, 215, 0, 0.35),
              10px -10px 35px rgba(255, 215, 0, 0.35),
              0 0 60px rgba(255, 215, 0, 0.18);
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
          width: 44px;
          height: 44px;
          min-width: 44px;
          min-height: 44px;
          max-width: 44px;
          max-height: 44px;
          object-fit: contain;
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

        .premium-cta-button {
          animation: gradientFlow 4s ease infinite;
        }

        @keyframes gradientFlow {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .premium-cta-button:hover {
          animation: gradientFlowFast 1.5s ease infinite;
        }

        @keyframes gradientFlowFast {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
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
