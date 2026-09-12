import React from 'react';

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="bg">
        <img
          src="https://images.unsplash.com/photo-1627347456206-d3df7d8484b0?fm=jpg&q=80&w=2400&auto=format&fit=crop"
          alt="Victoria Falls cascading over the Zambezi River"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </div>
      <div className="scrim"></div>
      <div className="wrap hero-content" data-reveal>
        <div className="eyebrow">Zimbabwe &middot; The Zambezi Region</div>
        <h1>
          The smoke that <em>thunders</em>,<br />
          the wild that follows.
        </h1>
        <p className="sub">
          Victoria Falls is where the trip starts. Six countries of Southern
          and East Africa open out beyond it, and the wilderness doesn't stop
          at the border.
        </p>
        <div className="hero-actions">
          <a className="btn" href="#region">
            Explore the region
          </a>
          <a className="btn ghost" href="#activities">
            What to do
          </a>
        </div>
      </div>
      <div className="hero-scroll">
        <span>Scroll</span>
        <span className="stem"></span>
      </div>
    </section>
  );
}
