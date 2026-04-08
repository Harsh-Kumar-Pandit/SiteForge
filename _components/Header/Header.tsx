"use client";

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import './Header.css';

const MenuOptions = [
  { name: 'Features', path: '/features', badge: null },
  { name: 'Templates', path: '/templates', badge: 'New' },
  { name: 'Pricing', path: '/pricing', badge: null },
  { name: 'Blog', path: '/blog', badge: null },
  { name: 'Contact us', path: '/contact-us', badge: null },
];

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <header className={`header-wrapper${scrolled ? ' scrolled' : ''}`}>
        <div className="header-inner">
          <a href="/" className="header-logo">
            <div className="logo-container">
              <Image src="/logo.svg" alt="logo" width={32} height={32} />
            </div>
            <div className="brand-copy">
              <span className="brand-name">SiteForge</span>
              <span className="tagline">Build websites with AI, instantly</span>
            </div>
          </a>

          <nav className="header-nav-pill">
            {MenuOptions.map((item) => (
              <a key={item.name} href={item.path}>
                {item.name}
                {item.badge && <span className="nav-badge">{item.badge}</span>}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <a href="/login" className="header-signin">Sign in</a>
            <a href="/get-started" className="header-cta">
              Get Started
              <svg viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2 6.5H11M7 2.5L11 6.5L7 10.5"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          <div className="header-mobile-actions">
            <a href="/login" className="header-signin mobile">Sign in</a>
            <a href="/get-started" className="header-cta mobile">
              Get Started
              <svg viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2 6.5H11M7 2.5L11 6.5L7 10.5"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          <button
            type="button"
            className={`header-mobile-toggle${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      <nav
        id="mobile-navigation"
        className={`header-mobile-menu${menuOpen ? ' open' : ''}`}
      >
        {MenuOptions.map((item) => (
          <a key={item.name} href={item.path} onClick={() => setMenuOpen(false)}>
            {item.name}
            {item.badge && <span className="nav-badge">{item.badge}</span>}
          </a>
        ))}
      </nav>
    </>
  );
}

export default Header;
