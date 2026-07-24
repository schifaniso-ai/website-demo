import React from 'react';

export default function FallsIntro() {
  return (
    <section className="section falls-intro" id="falls">
      <div className="wrap">
        <div className="falls-grid">
          <div className="falls-copy">
            <div className="eyebrow" style={{ color: 'var(--rust)', marginBottom: 16 }}>
              Zimbabwe
            </div>
            <h2 style={{ fontSize: 'clamp(2rem,4vw,2.8rem)', marginBottom: 24 }}>
              Victoria Falls, Mosi-oa-Tunya
            </h2>
            <p>
              On the Zimbabwean bank of the Zambezi, the Victoria Falls National
              Park delivers the widest, most complete view of the world's largest
              sheet of falling water &mdash; a curtain over a mile wide, dropping
              into a churning gorge below.
            </p>
            <p>
              Declared a UNESCO World Heritage Site and ranked among the Seven
              Natural Wonders of the World, the falls are the anchor of an entire
              region built around wildlife and wild water &mdash; the reason every
              itinerary in this corner of Africa begins here.
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
          <div className="falls-photo">
            <img
              src="https://images.unsplash.com/photo-1650470200336-2f02e404976c?fm=jpg&q=80&w=1600&auto=format&fit=crop"
              alt="Aerial view of Victoria Falls and rainbow over the gorge"
            />
            <div className="cap">Victoria Falls National Park &mdash; Zimbabwe</div>
          </div>
        </div>
      </div>
    </section>
  );
}
