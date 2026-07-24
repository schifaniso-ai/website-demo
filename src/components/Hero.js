import React from 'react';

export default function Hero() {
  return (
    <section className="hero">
      <div className="bg">
        <img
          src="https://images.unsplash.com/photo-1627347456206-d3df7d8484b0?fm=jpg&q=80&w=2400&auto=format&fit=crop"
          alt="Victoria Falls cascading over the Zambezi River"
        />
      </div>
      <div className="scrim"></div>
      <div className="wrap hero-content">
        <div className="eyebrow">Zimbabwe &middot; The Zambezi Region</div>
        <h1>
          The smoke that <em>thunders</em>,<br />
          the wild that follows.
        </h1>
        <p className="sub">
          Victoria Falls is where the journey begins &mdash; and where four
          countries of untamed Southern Africa unfold beyond it. One river, five
          nations, an unbroken wilderness.
        </p>
      </div>
      <div className="hero-scroll">
        <span>Scroll</span>
        <span className="stem"></span>
      </div>
    </section>
  );
}
