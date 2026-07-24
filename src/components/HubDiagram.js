import React from 'react';

const legend = [
  { country: 'Zambia', desc: 'Livingstone side of the falls, 10 min away' },
  { country: 'Botswana', desc: 'Chobe riverfront, roughly 1.5 hrs' },
  { country: 'Namibia', desc: 'Caprivi Strip, roughly 3 hrs' },
  { country: 'South Africa', desc: 'connecting flight, under 2 hrs' },
  { country: 'Tanzania', desc: 'connecting flight, under 3 hrs' },
];

export default function HubDiagram() {
  return (
    <section className="section hub-section" id="region">
      <div className="wrap">
        <div className="hub-wrap">
          <div className="hub-copy">
            <div className="section-head">
              <div className="eyebrow">Beyond the Falls</div>
              <h2>One river, five countries</h2>
              <p>
                Victoria Falls sits at the meeting point of Zimbabwe, Zambia,
                Botswana and Namibia &mdash; with Tanzania's great migration a
                short flight beyond. It's the natural gateway to the wildest
                safari country left on the continent.
              </p>
            </div>
            <div className="hub-legend">
              {legend.map((item) => (
                <div className="item" key={item.country}>
                  <b>{item.country}</b> {item.desc}
                </div>
              ))}
            </div>
          </div>
          <div className="hub-diagram">
            <svg viewBox="0 0 560 560" width="100%" height="100%">
              <circle cx="280" cy="280" r="230" fill="none" stroke="rgba(23,20,16,0.12)" strokeWidth="1" strokeDasharray="2 6" />
              <circle cx="280" cy="280" r="150" fill="none" stroke="rgba(23,20,16,0.14)" strokeWidth="1" strokeDasharray="2 6" />

              <line x1="280" y1="280" x2="280" y2="70" stroke="#a83e2c" strokeWidth="1.4" />
              <line x1="280" y1="280" x2="480" y2="170" stroke="#a83e2c" strokeWidth="1.4" />
              <line x1="280" y1="280" x2="480" y2="400" stroke="#a83e2c" strokeWidth="1.4" />
              <line x1="280" y1="280" x2="140" y2="480" stroke="#a83e2c" strokeWidth="1.4" />
              <line x1="280" y1="280" x2="70" y2="230" stroke="#a83e2c" strokeWidth="1.4" />

              <circle cx="280" cy="280" r="46" fill="#0e2a1c" />
              <text x="280" y="276" textAnchor="middle" fill="#f5efe0" fontFamily="Fraunces, serif" fontSize="13" fontWeight="600">VICTORIA</text>
              <text x="280" y="292" textAnchor="middle" fill="#e6bd4a" fontFamily="Fraunces, serif" fontSize="13" fontStyle="italic">FALLS</text>

              <g>
                <circle cx="280" cy="70" r="34" fill="#cfa227" />
                <text x="280" y="66" textAnchor="middle" fill="#171410" fontFamily="Jost, sans-serif" fontSize="11" fontWeight="600">ZAMBIA</text>
                <text x="280" y="80" textAnchor="middle" fill="#171410" fontFamily="Jost, sans-serif" fontSize="9">Livingstone</text>
              </g>
              <g>
                <circle cx="480" cy="170" r="34" fill="#cfa227" />
                <text x="480" y="166" textAnchor="middle" fill="#171410" fontFamily="Jost, sans-serif" fontSize="11" fontWeight="600">TANZANIA</text>
                <text x="480" y="180" textAnchor="middle" fill="#171410" fontFamily="Jost, sans-serif" fontSize="9">Serengeti</text>
              </g>
              <g>
                <circle cx="480" cy="400" r="34" fill="#cfa227" />
                <text x="480" y="396" textAnchor="middle" fill="#171410" fontFamily="Jost, sans-serif" fontSize="10" fontWeight="600">S. AFRICA</text>
                <text x="480" y="410" textAnchor="middle" fill="#171410" fontFamily="Jost, sans-serif" fontSize="9">Kruger</text>
              </g>
              <g>
                <circle cx="140" cy="480" r="34" fill="#cfa227" />
                <text x="140" y="476" textAnchor="middle" fill="#171410" fontFamily="Jost, sans-serif" fontSize="10" fontWeight="600">NAMIBIA</text>
                <text x="140" y="490" textAnchor="middle" fill="#171410" fontFamily="Jost, sans-serif" fontSize="9">Etosha</text>
              </g>
              <g>
                <circle cx="70" cy="230" r="34" fill="#cfa227" />
                <text x="70" y="226" textAnchor="middle" fill="#171410" fontFamily="Jost, sans-serif" fontSize="10" fontWeight="600">BOTSWANA</text>
                <text x="70" y="240" textAnchor="middle" fill="#171410" fontFamily="Jost, sans-serif" fontSize="9">Chobe</text>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
