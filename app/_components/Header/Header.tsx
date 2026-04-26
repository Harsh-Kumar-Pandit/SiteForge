"use client";

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import './Header.css';

const MenuOptions = [
  { name: 'Features',    path: '/features',   badge: null  },
  { name: 'Templates',   path: '/templates',  badge: 'New' },
  { name: 'Pricing',     path: '/pricing',    badge: null  },
  { name: 'Blog',        path: '/blog',       badge: null  },
  { name: 'Contact us',  path: '/contact-us', badge: null  },
];

export default function Header() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth > 900) setMenuOpen(false); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      {/* ── Backdrop overlay for mobile menu ── */}
      {menuOpen && (
        <div className="hdr-overlay" onClick={() => setMenuOpen(false)} aria-hidden="true" />
      )}

      <header className={`hdr-wrap${scrolled ? ' hdr-wrap--scrolled' : ''}`}>
        <div className="hdr-inner">

          {/* ── Logo ── */}
          <Link href="/" className="hdr-logo">
            <div className="hdr-logo-icon" aria-hidden="true">
              {/* Inline SVG star/spark mark */}
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 1.5 L10.8 6.9 L16.5 6.9 L11.9 10.2 L13.7 15.6 L9 12.3 L4.3 15.6 L6.1 10.2 L1.5 6.9 L7.2 6.9 Z"
                  fill="white" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="hdr-brand">
              <span className="hdr-brand-name">SiteForge</span>
              <span className="hdr-brand-tag">Build websites with AI, instantly</span>
            </div>
          </Link>

          {/* ── Desktop Nav pill ── */}
          <nav className="hdr-nav-pill" aria-label="Main navigation">
            {MenuOptions.map((item) => (
              <Link key={item.name} href={item.path} className="hdr-nav-link">
                {item.name}
                {item.badge && <span className="hdr-nav-badge">{item.badge}</span>}
              </Link>
            ))}
          </nav>

          {/* ── Desktop Actions ── */}
          <div className="hdr-actions">
            <Link href="/sign-in" className="hdr-signin">Sign in</Link>
            <Link href="/sign-up" className="hdr-cta">
              Get Started
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M2 6.5H11M7 2.5L11 6.5L7 10.5" stroke="white" strokeWidth="1.6"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          {/* ── Mobile: compact sign-in + CTA ── */}
          <div className="hdr-mobile-right">
            <Link href="/sign-in" className="hdr-signin hdr-signin--mobile">Sign in</Link>
            <Link href="/sign-up" className="hdr-cta hdr-cta--mobile">
              Get Started
              <svg width="12" height="12" viewBox="0 0 13 13" fill="none">
                <path d="M2 6.5H11M7 2.5L11 6.5L7 10.5" stroke="white" strokeWidth="1.6"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>

            {/* Hamburger */}
            <button
              type="button"
              className={`hdr-hamburger${menuOpen ? ' hdr-hamburger--open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu Drawer ── */}
      <nav
        id="mobile-nav"
        className={`hdr-mobile-menu${menuOpen ? ' hdr-mobile-menu--open' : ''}`}
        aria-label="Mobile navigation"
      >
        <div className="hdr-mobile-menu-inner">
          {MenuOptions.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className="hdr-mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              <span>{item.name}</span>
              {item.badge
                ? <span className="hdr-nav-badge">{item.badge}</span>
                : <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4"
                      strokeLinecap="round" strokeLinejoin="round" opacity=".35"/>
                  </svg>
              }
            </Link>
          ))}

          <div className="hdr-mobile-divider" />

          <div className="hdr-mobile-ctas">
            <Link href="/sign-in" className="hdr-mobile-cta hdr-mobile-cta--ghost">Sign in</Link>
            <Link href="/sign-up" className="hdr-mobile-cta hdr-mobile-cta--solid">
              Get Started
              <svg width="12" height="12" viewBox="0 0 13 13" fill="none">
                <path d="M2 6.5H11M7 2.5L11 6.5L7 10.5" stroke="white" strokeWidth="1.6"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
