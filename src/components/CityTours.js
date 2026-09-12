import React from 'react';

const cities = [
  {
    name: 'Soweto',
    kicker: 'Johannesburg',
    title: 'Soweto township tours',
    desc: "The best-known township in the country. Walk Vilakazi Street, the only street in the world that was home to two Nobel Peace Prize winners, and stop at the Hector Pieterson Memorial that marks the 1976 uprising.",
    img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3b/Taxi_and_Car_at_Sunset_in_Soweto%2C_South_Africa.jpg/1920px-Taxi_and_Car_at_Sunset_in_Soweto%2C_South_Africa.jpg',
    alt: 'Street scene in Soweto, Johannesburg, at sunset',
    chips: [
      'Vilakazi Street & the Mandela House',
      'Hector Pieterson Memorial',
      'Shebeen evenings & township dining',
      'Orlando Towers bungee',
    ],
  },
  {
    name: 'Cape Town',
    kicker: 'Western Cape',
    title: 'Cape Town township tours',
    desc: "Two sides of one city: the colour-washed lanes of Bo-Kaap, and the township neighbourhoods of Langa and Gugulethu, where a tour usually ends with food, music and conversation.",
    img: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?fm=jpg&q=80&w=1600&auto=format&fit=crop',
    alt: 'Table Mountain overlooking Cape Town, South Africa',
    chips: [
      "Bo-Kaap's painted lanes",
      'Langa heritage walks',
      'Gugulethu music & food stops',
      'District Six Museum',
    ],
  },
];

export default function CityTours() {
  return (
    <section className="section city-section" id="cities">
      <div className="wrap">
        <div className="section-head" data-reveal>
          <div className="eyebrow">City &amp; township tours</div>
          <h2>Street-level South Africa</h2>
          <p>
            Johannesburg and Cape Town carry the story of modern South Africa.
            Township tours here are built on history, food, music and the people
            who live in these streets.
          </p>
        </div>
        <div className="city-grid">
          {cities.map((c, i) => (
            <div
              className="city-card"
              key={c.name}
              data-reveal
              style={{ '--reveal-delay': `${i * 110}ms` }}
            >
              <div className="city-media">
                <img src={c.img} alt={c.alt} loading="lazy" decoding="async" />
              </div>
              <div className="city-body">
                <div className="kicker">{c.kicker}</div>
                <h3>{c.title}</h3>
                <p className="desc">{c.desc}</p>
                <div className="chip-row">
                  {c.chips.map((chip) => (
                    <span className="chip" key={chip}>
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}