import React, { useCallback, useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/activities', label: 'Activities' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const [headerSolid, setHeaderSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const setMenu = useCallback((open) => {
    setMenuOpen(open);
    document.body.style.overflow = open ? 'hidden' : '';
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setHeaderSolid(window.scrollY > 60);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenu(false);
    setHeaderSolid(window.scrollY > 60);
  }, [location.pathname, setMenu]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setMenu(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setMenu]);

  return (
    <header className={headerSolid || menuOpen ? 'solid' : ''}>
      <div className="wrap navrow">
        <Link to="/" className="brand" onClick={() => setMenu(false)}>
          <span className="mark"></span> The African Carnival
        </Link>
        <nav className="links" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              {link.label}
            </NavLink>
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
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => (isActive ? 'active' : undefined)}
              onClick={() => setMenu(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}
