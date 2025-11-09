'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const secondaryNavItems = [
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Team", href: "/team" }
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="nav container" aria-label="Primary">
        <div className="nav-brand">
          <Link href="/" className="logo">
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
            </div>
          </div>

          {secondaryNavItems.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link" onClick={closeMenu}>
              {item.label}
            </Link>
          ))}

          <Link href="/contact#contact-form" className="nav-link nav-link-cta" onClick={closeMenu}>
            Book a Demo
          </Link>
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
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0;
        }

        .header.scrolled {
          opacity: 1;
          background: rgba(10, 10, 10, 0.8);
          backdrop-filter: blur(28px) saturate(180%);
          -webkit-backdrop-filter: blur(28px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 12px 48px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05) inset, 0 4px 16px rgba(163, 230, 53, 0.1);
        }

        .header.scrolled::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
        }

        .header.scrolled::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 1rem;
          right: 1rem;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
        }

        @media (min-width: 769px) {
          .header {
            left: 50%;
            transform: translateX(-50%) translateY(-100%);
          }

          .header.scrolled {
            margin: 1rem auto 0;
            left: 50%;
            transform: translateX(-50%) translateY(0);
            width: calc(100% - 4rem);
            max-width: 1200px;
            border-radius: 24px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          }

          .header.scrolled::after {
            left: 2rem;
            right: 2rem;
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
        }

        .nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem var(--content-padding);
          max-width: 1400px;
          margin: 0 auto;
        }

        .header.scrolled .nav {
          padding: 0.75rem 2rem;
        }

        @media (max-width: 768px) {
          .header.scrolled .nav {
            padding: 0.875rem var(--content-padding);
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

        .logo:hover {
          opacity: 0.9;
          transform: scale(1.05);
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
          gap: 2rem;
          transition: opacity var(--transition-base), transform var(--transition-base);
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
          background: var(--color-primary);
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
          color: var(--color-primary);
          font-weight: 500;
        }

        .dropdown-toggle:hover {
          color: #FF8C00;
          opacity: 1;
        }

        .dropdown-toggle:focus-visible {
          outline: 2px solid var(--color-primary);
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
          justify-content: space-between;
          font-weight: 600;
          font-size: 1rem;
        }

        .dropdown-subtext {
          font-size: 0.9rem;
          color: var(--color-text-secondary);
        }

        .dropdown-badge {
          display: inline-flex;
          align-items: center;
          padding: 0.2rem 0.6rem;
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          border-radius: 999px;
          background: var(--color-primary);
          color: #ffffff;
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

        .nav-link-cta {
          background: var(--color-primary);
          border: none;
          padding: 0.875rem 2.25rem;
          border-radius: 8px;
          color: #000000;
          font-weight: 700;
          font-size: 0.95rem;
          letter-spacing: 0.01em;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          box-shadow: 
            0 4px 14px rgba(163, 230, 53, 0.4),
            0 2px 4px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          white-space: nowrap;
          cursor: pointer;
          font-family: inherit;
        }

        .nav-link-cta::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0.2), transparent);
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .nav-link-cta:hover::before {
          opacity: 1;
        }

        .nav-link-cta::after {
          display: none;
        }

        .nav-link-cta:hover {
          background: #b8f048;
          color: #000000;
          transform: translateY(-1px);
          box-shadow: 
            0 6px 20px rgba(163, 230, 53, 0.5),
            0 3px 6px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }

        .nav-link-cta:active {
          transform: translateY(0);
          box-shadow: 
            0 2px 8px rgba(163, 230, 53, 0.4),
            0 1px 2px rgba(0, 0, 0, 0.2),
            inset 0 1px 2px rgba(0, 0, 0, 0.1);
        }

        .nav-link-cta:focus-visible {
          outline: 2px solid var(--color-primary);
          outline-offset: 3px;
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

          .nav-link-cta {
            margin-top: 0.5rem;
            padding: 0.875rem 1rem;
            text-align: center;
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
    </header>
  );
}

