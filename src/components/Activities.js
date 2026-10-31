import React from 'react';
import { Link } from 'react-router-dom';

import activities from '../data/activities';

export default function Activities() {
  return (
    <section className="section activities" id="activities">
      <div className="wrap">
        <div className="section-head" data-reveal>
          <div className="eyebrow">On &amp; Around the Zambezi</div>
          <h2>Things to do at the Falls</h2>
          <p>
            Victoria Falls is a base for adrenaline on the rapids and quiet game
            drives at dusk.
          </p>
        </div>
        <div className="act-grid">
          {activities.map((act, i) => (
            <div
              className="act-card"
              id={act.id}
              key={act.id}
              data-reveal
              style={{ '--reveal-delay': `${i * 90}ms` }}
            >
              <span className="idx">{act.idx}</span>
              <h3>{act.title}</h3>
              <p>{act.desc}</p>
              <div className="act-meta">
                <span className="act-duration">{act.duration}</span>
                <span className="act-price">
                  From <strong>${act.price}</strong>
                  <span> / person</span>
                </span>
              </div>
              <Link
                className="btn act-book"
                to={`/book/${act.id}`}
                aria-label={`Book ${act.title} now`}
              >
                Book Now <span aria-hidden="true">→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
