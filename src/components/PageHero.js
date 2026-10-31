import React from 'react';

export default function PageHero({ eyebrow, title, intro, image, imageAlt }) {
  return (
    <section className={`page-hero${image ? '' : ' page-hero-plain'}`}>
      {image && (
        <div className="bg">
          <img src={image} alt={imageAlt || ''} loading="eager" decoding="async" />
        </div>
      )}
      <div className="scrim"></div>
      <div className="wrap page-hero-content" data-reveal>
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        {intro && <p className="sub">{intro}</p>}
      </div>
    </section>
  );
}
