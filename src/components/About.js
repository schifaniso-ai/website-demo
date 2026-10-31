import React from 'react';
import { Link } from 'react-router-dom';

const values = [
  {
    title: 'Local from the first mile',
    text: 'Our team lives and works in Victoria Falls. The guides, drivers and lodges we use are people we know, not names on a booking sheet.',
  },
  {
    title: 'Routes that stay wild',
    text: 'We plan around water levels, seasons and animal movement, so the itinerary follows the bush rather than a fixed script.',
  },
  {
    title: 'Small groups, real encounters',
    text: 'No convoys and no rushed photo stops. Fewer people in the vehicle means more time watching, listening and learning.',
  },
];

export default function About() {
  return (
    <section className="section about" id="about">
      <div className="wrap">
        <div className="about-grid">
          <div className="about-copy" data-reveal>
            <div className="eyebrow">About The African Carnival</div>
            <h2>
              A carnival with the <em>wild</em> as its stage.
            </h2>
            <p>
              The African Carnival is a Victoria Falls travel company built
              around one idea: the falls are not the end of the trip, they are
              the front door. We plan journeys that carry on from the Zambezi
              into the delta, the bushveld, the dunes and the plains beyond.
            </p>
            <p>
              We are based where the region begins, and we work with guides,
              lodges and operators across Southern and East Africa. That means
              fewer handovers, routes that actually connect, and people on the
              ground who know the roads, the seasons and the water.
            </p>

            <div className="about-values">
              {values.map((value) => (
                <div className="about-value" key={value.title}>
                  <h3>{value.title}</h3>
                  <p>{value.text}</p>
                </div>
              ))}
            </div>
          </div>

          <aside
            className="about-card"
            data-reveal
            style={{ '--reveal-delay': '140ms' }}
            aria-label="The African Carnival at a glance"
          >
            <div className="eyebrow">The short version</div>
            <p className="about-quote">
              The carnival is the gathering: the people, the guides, the
              travellers, and the stories that come back from the bush.
            </p>
            <dl className="about-facts">
              <div className="fact">
                <dt>Home</dt>
                <dd>Victoria Falls, Zimbabwe</dd>
              </div>
              <div className="fact">
                <dt>Reach</dt>
                <dd>Six countries, one route</dd>
              </div>
              <div className="fact">
                <dt>Focus</dt>
                <dd>Wildlife, water, culture</dd>
              </div>
              <div className="fact">
                <dt>Style</dt>
                <dd>Small groups, local guides</dd>
              </div>
            </dl>
            <Link className="about-link" to="/about#region">
              See where we travel <span aria-hidden="true">→</span>
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
