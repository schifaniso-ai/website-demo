import React from 'react';

import Hero from '../components/Hero';
import FlagLine from '../components/FlagLine';
import About from '../components/About';
import FallsIntro from '../components/FallsIntro';
import Activities from '../components/Activities';
import Countries from '../components/Countries';
import CityTours from '../components/CityTours';
import CTA from '../components/CTA';

import usePageMeta from '../hooks/usePageMeta';
import useReveal from '../hooks/useReveal';

export default function Home() {
  usePageMeta(
    'The African Carnival | Safari Tours from Victoria Falls',
    'The African Carnival runs safari tours from Victoria Falls, Zimbabwe across Southern and East Africa. Trips to South Africa, Zambia, Botswana, Namibia, Tanzania and Kenya.'
  );
  useReveal();

  return (
    <>
      <Hero />
      <FlagLine />
      <About />
      <FallsIntro />
      <Activities />
      <Countries />
      <CityTours />
      <CTA />
    </>
  );
}
