import React from 'react';

export default function FallsIntro() {
  return (
    <section className="section falls-intro" id="falls">
      <div className="wrap">
        <div className="falls-grid">
          <div className="falls-copy" data-reveal>
            <div className="eyebrow" style={{ color: 'var(--rust)', marginBottom: 16 }}>
              Zimbabwe
            </div>
            <h2 style={{ fontSize: 'clamp(2rem,4vw,2.8rem)', marginBottom: 24 }}>
              Victoria Falls, Mosi-oa-Tunya
            </h2>
            <p>
              On the Zimbabwean bank of the Zambezi you get the widest, most
              complete view of the falls. The world's largest sheet of falling
              water, over a mile wide, drops into the churning gorge below.
            </p>
            <p>
              Declared a UNESCO World Heritage Site and ranked among the Seven
              Natural Wonders of the World, the falls anchor a region built
              around wildlife and wild water. Every itinerary in this corner of
              Africa begins here.
            </p>
            <div className="stat-row">
              <div className="stat">
                <div className="num">108m</div>
                <div className="lbl">Height of the falls</div>
              </div>
              <div className="stat">
                <div className="num">1,708m</div>
                <div className="lbl">Width of the curtain</div>
              </div>
              <div className="stat">
                <div className="num">7</div>
                <div className="lbl">Natural wonder ranking</div>
              </div>
            </div>
          </div>
          <div className="falls-photo" data-reveal style={{ '--reveal-delay': '140ms' }}>
            <img
              src="https://images.unsplash.com/photo-1650470200336-2f02e404976c?fm=jpg&q=80&w=1600&auto=format&fit=crop"
              alt="Aerial view of Victoria Falls and rainbow over the gorge"
              loading="lazy"
              decoding="async"
            />
            <div className="cap">Victoria Falls National Park, Zimbabwe</div>
          </div>
        </div>
      </div>
    </section>
  );
}
