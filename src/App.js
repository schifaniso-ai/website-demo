import React, { useState, useEffect } from 'react';
import './App.css';

import Hero from './components/Hero';
import FlagLine from './components/FlagLine';
import FallsIntro from './components/FallsIntro';
import Activities from './components/Activities';
import HubDiagram from './components/HubDiagram';
import Countries from './components/Countries';
import CTA from './components/CTA';
import Footer from './components/Footer';

function App() {
  const [headerSolid, setHeaderSolid] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHeaderSolid(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={headerSolid ? 'solid' : ''}>
        <div className="wrap navrow">
          <div className="brand"><span className="mark"></span> Mosi-oa-Tunya</div>
          <nav className="links">
            <a href="#falls">The Falls</a>
            <a href="#activities">Activities</a>
            <a href="#region">The Region</a>
            <a href="#countries">Destinations</a>
          </nav>
        </div>
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
