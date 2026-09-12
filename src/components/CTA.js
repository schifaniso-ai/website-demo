import React from 'react';

export default function CTA() {
  return (
    <section className="cta">
      <div className="wrap" data-reveal>
        <div className="eyebrow" style={{ color: 'var(--gold-bright)', marginBottom: 22 }}>
          Plan the Journey
        </div>
        <h2>
          Five countries, <em>one</em> unbroken wilderness.
        </h2>
        <div className="divider"></div>
        <p>
          Travel north from the falls into the delta, south into the bushveld,
          or east across the plains. The wild keeps going.
        </p>
        <a className="btn" href="#countries">
          Explore destinations
        </a>
      </div>
    </section>
  );
}
