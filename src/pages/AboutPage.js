import React from 'react';
import { Link } from 'react-router-dom';

import PageHero from '../components/PageHero';
import About from '../components/About';
import HubDiagram from '../components/HubDiagram';
import usePageMeta from '../hooks/usePageMeta';
import useReveal from '../hooks/useReveal';

const steps = [
  {
    num: '01',
    title: 'Tell us the shape',
    text: 'Your dates, your group and the kind of travel you have in mind. A rough idea is enough to start.',
  },
  {
    num: '02',
    title: 'We draft the route',
    text: 'We match the season to the places, then build a route that connects without wasted days in transit.',
  },
  {
    num: '03',
    title: 'Refine it together',
    text: 'Swap a lodge, add a day, slow the pace down. The itinerary stays open until it fits.',
  },
  {
    num: '04',
    title: 'Travel with backup',
    text: 'Local guides and operators on the ground, with someone reachable while you are on the road.',
  },
];

export default function AboutPage() {
  usePageMeta(
    'About | The African Carnival',
    'The African Carnival is a Victoria Falls travel company planning safari journeys from Zimbabwe into Southern and East Africa.'
  );
  useReveal();

  return (
    <>
      <PageHero
        eyebrow="Our story"
        title={
          <>
            Travel with the people who <em>live here</em>.
          </>
        }
        intro="The African Carnival is rooted in Victoria Falls and built around the wild country that runs out from it. We plan the trip, but the guides, lodges and communities along the way do the real work."
        image="https://images.unsplash.com/photo-1650470200336-2f02e404976c?fm=jpg&q=80&w=2000&auto=format&fit=crop"
        imageAlt="Aerial view of Victoria Falls and the Zambezi gorge"
      />

      <About />

      <section className="section process-section">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <div className="eyebrow">How we work</div>
            <h2>How a trip comes together</h2>
            <p>
              No call-centre handovers and no copy-paste packages. Every journey
              starts with a conversation and is shaped around the season, the
              group and what you actually want to see.
            </p>
          </div>
          <div className="step-grid">
            {steps.map((step, i) => (
              <div
                className="step-card"
                key={step.num}
                data-reveal
                style={{ '--reveal-delay': `${i * 90}ms` }}
              >
                <span className="num">{step.num}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HubDiagram />

      <section className="cta page-cta">
        <div className="wrap" data-reveal>
          <div className="eyebrow">Plan the Journey</div>
          <h2>
            Start with a <em>conversation</em>.
          </h2>
          <div className="divider"></div>
          <p>
            Tell us when you are thinking of travelling and what you want the
            trip to feel like. We will take it from there.
          </p>
          <Link className="btn" to="/contact">
            Talk to us
          </Link>
        </div>
      </section>
    </>
  );
}
