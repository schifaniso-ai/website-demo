import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

import Hero from './components/Hero';
import FlagLine from './components/FlagLine';
import FallsIntro from './components/FallsIntro';
import Activities from './components/Activities';
import HubDiagram from './components/HubDiagram';
import Countries from './components/Countries';
import CTA from './components/CTA';
import Footer from './components/Footer';

const NAV_LINKS = [
  { href: '#falls', label: 'The Falls' },
  { href: '#activities', label: 'Activities' },
  { href: '#region', label: 'The Region' },
  { href: '#countries', label: 'Destinations' },
];

function App() {
  const [headerSolid, setHeaderSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const setMenu = useCallback((open) => {
    setMenuOpen(open);
    document.body.style.overflow = open ? 'hidden' : '';
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setHeaderSolid(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setMenu(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setMenu]);

  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]');
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      els.forEach((el) => el.classList.add('in-view'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <header className={headerSolid || menuOpen ? 'solid' : ''}>
        <div className="wrap navrow">
          <a href="#top" className="brand">
            <span className="mark"></span> [company name]
          </a>
          <nav className="links" aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            className="menu-btn"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenu(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <nav
          id="mobile-nav"
          className={`mobile-nav${menuOpen ? ' open' : ''}`}
          aria-label="Mobile"
        >
          <div className="wrap">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenu(false)}>
                {l.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <Hero />
      <FlagLine />
      <FallsIntro />
      <Activities />
      <HubDiagram />
      <Countries />
      <CTA />
      <Footer />
    </>
  );
}

export default App;