import React from 'react';

const legend = [
  { country: 'Zambia', desc: 'Livingstone side of the falls, 10 min away' },
  { country: 'Botswana', desc: 'Chobe riverfront, roughly 1.5 hrs' },
  { country: 'Namibia', desc: 'Caprivi Strip, roughly 3 hrs' },
  { country: 'South Africa', desc: 'connecting flight, under 2 hrs' },
  { country: 'Tanzania', desc: 'connecting flight, under 3 hrs' },
  { country: 'Kenya', desc: 'Maasai Mara & Amboseli, a flight beyond Tanzania' },
];

export default function HubDiagram() {
  return (
    <section className="section hub-section" id="region">
      <div className="wrap">
        <div className="hub-wrap">
          <div className="hub-copy" data-reveal>
            <div className="section-head">
              <div className="eyebrow">Beyond the Falls</div>
              <h2>One wilderness, six countries</h2>
              <p>
                Victoria Falls sits where Zimbabwe, Zambia, Botswana and Namibia
                meet, with Tanzania's Serengeti and Kenya's Maasai Mara a short
                flight beyond. It makes a natural gateway to some of the wildest
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
          <div className="hub-diagram" data-reveal style={{ '--reveal-delay': '140ms' }}>
            <svg viewBox="0 0 560 560" width="100%" height="100%">
              <circle cx="280" cy="280" r="230" fill="none" stroke="rgba(23,20,16,0.12)" strokeWidth="1" strokeDasharray="2 6" />
              <circle cx="280" cy="280" r="150" fill="none" stroke="rgba(23,20,16,0.14)" strokeWidth="1" strokeDasharray="2 6" />

              <line x1="280" y1="280" x2="280" y2="75" stroke="#a83e2c" strokeWidth="1.4" />
              <line x1="280" y1="280" x2="458" y2="177" stroke="#a83e2c" strokeWidth="1.4" />
              <line x1="280" y1="280" x2="458" y2="383" stroke="#a83e2c" strokeWidth="1.4" />
              <line x1="280" y1="280" x2="280" y2="485" stroke="#a83e2c" strokeWidth="1.4" />
              <line x1="280" y1="280" x2="102" y2="383" stroke="#a83e2c" strokeWidth="1.4" />
              <line x1="280" y1="280" x2="102" y2="177" stroke="#a83e2c" strokeWidth="1.4" />

              <circle cx="280" cy="280" r="46" fill="#0e2a1c" />
              <text x="280" y="276" textAnchor="middle" fill="#f5efe0" fontFamily="Fraunces, serif" fontSize="13" fontWeight="600">VICTORIA</text>
              <text x="280" y="292" textAnchor="middle" fill="#e6bd4a" fontFamily="Fraunces, serif" fontSize="13" fontStyle="italic">FALLS</text>

              <g>
                <circle cx="280" cy="75" r="34" fill="#cfa227" />
                <text x="280" y="71" textAnchor="middle" fill="#171410" fontFamily="Jost, sans-serif" fontSize="11" fontWeight="600">ZAMBIA</text>
                <text x="280" y="85" textAnchor="middle" fill="#171410" fontFamily="Jost, sans-serif" fontSize="9">Livingstone</text>
              </g>
              <g>
                <circle cx="458" cy="177" r="34" fill="#cfa227" />
                <text x="458" y="173" textAnchor="middle" fill="#171410" fontFamily="Jost, sans-serif" fontSize="11" fontWeight="600">TANZANIA</text>
                <text x="458" y="187" textAnchor="middle" fill="#171410" fontFamily="Jost, sans-serif" fontSize="9">Serengeti</text>
              </g>
              <g>
                <circle cx="458" cy="383" r="34" fill="#cfa227" />
                <text x="458" y="379" textAnchor="middle" fill="#171410" fontFamily="Jost, sans-serif" fontSize="10" fontWeight="600">S. AFRICA</text>
                <text x="458" y="393" textAnchor="middle" fill="#171410" fontFamily="Jost, sans-serif" fontSize="9">Kruger</text>
              </g>
              <g>
                <circle cx="280" cy="485" r="34" fill="#cfa227" />
                <text x="280" y="481" textAnchor="middle" fill="#171410" fontFamily="Jost, sans-serif" fontSize="11" fontWeight="600">KENYA</text>
                <text x="280" y="495" textAnchor="middle" fill="#171410" fontFamily="Jost, sans-serif" fontSize="9">Maasai Mara</text>
              </g>
              <g>
                <circle cx="102" cy="383" r="34" fill="#cfa227" />
                <text x="102" y="379" textAnchor="middle" fill="#171410" fontFamily="Jost, sans-serif" fontSize="10" fontWeight="600">NAMIBIA</text>
                <text x="102" y="393" textAnchor="middle" fill="#171410" fontFamily="Jost, sans-serif" fontSize="9">Etosha</text>
              </g>
              <g>
                <circle cx="102" cy="177" r="34" fill="#cfa227" />
                <text x="102" y="173" textAnchor="middle" fill="#171410" fontFamily="Jost, sans-serif" fontSize="10" fontWeight="600">BOTSWANA</text>
                <text x="102" y="187" textAnchor="middle" fill="#171410" fontFamily="Jost, sans-serif" fontSize="9">Chobe</text>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
