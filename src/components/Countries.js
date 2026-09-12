import React from 'react';

const countries = [
  {
    num: 'I.',
    name: 'South Africa',
    tag: 'Big Five &amp; the Cape coastline',
    desc: "Kruger's bushveld and the cliffs of the Cape Peninsula mean South Africa offers classic safari and dramatic coastline in one trip.",
    img: 'https://images.unsplash.com/photo-1594916105020-b28f829993b7?fm=jpg&q=80&w=1600&auto=format&fit=crop',
    alt: 'Lioness resting on a rock in Kruger National Park, South Africa',
    chips: [
      'Kruger National Park Big Five safaris',
      'Table Mountain cable car & hikes',
      'Cape Point & Boulders Beach penguins',
      'Shark cage diving, Gansbaai',
    ],
  },
  {
    num: 'II.',
    name: 'Zambia',
    tag: 'Walking safaris & the other side of the falls',
    desc: "Zambia has the other half of Victoria Falls at Livingstone. Inland, South Luangwa National Park is where the African walking safari started.",
    img: 'https://images.unsplash.com/photo-1611067523512-e0d4abd25f39?fm=jpg&q=80&w=1600&auto=format&fit=crop',
    alt: 'Victoria Falls viewed from the Zambian side near Livingstone',
    chips: [
      'South Luangwa walking safaris',
      "Livingstone & Devil's Pool",
      'Lower Zambezi canoe safaris',
      'Mosi-oa-Tunya rhino walks',
    ],
  },
  {
    num: 'III.',
    name: 'Botswana',
    tag: "The Okavango Delta & Chobe's elephants",
    desc: "With a huge inland delta and Africa's densest elephant population, Botswana is one of the continent's prime wildlife destinations.",
    img: 'https://images.unsplash.com/photo-1590214766638-c8dbb1262b79?fm=jpg&q=80&w=1600&auto=format&fit=crop',
    alt: 'Elephants swimming in the Okavango Delta, Botswana',
    chips: [
      'Okavango Delta mokoro canoe trips',
      'Chobe riverfront game drives',
      'Moremi Game Reserve',
      'Central Kalahari desert safaris',
    ],
  },
  {
    num: 'IV.',
    name: 'Namibia',
    tag: 'Red dunes, desert wildlife & open sky',
    desc: "Namibia swaps the classic bush for towering red dunes and desert-adapted wildlife. The landscapes are as vast and empty as anywhere on earth.",
    img: 'https://images.unsplash.com/photo-1772289093510-2c64b03d7fd5?fm=jpg&q=80&w=1600&auto=format&fit=crop',
    alt: 'Dead trees in the red dunes of Deadvlei, Sossusvlei, Namibia',
    chips: [
      'Climbing the dunes at Sossusvlei',
      "Deadvlei's ancient dead camel-thorn trees",
      'Etosha waterhole game viewing',
      'Damaraland desert-adapted elephants',
    ],
  },
  {
    num: 'V.',
    name: 'Tanzania',
    tag: 'The Serengeti & the great migration',
    desc: "Tanzania is East Africa's classic safari country: endless plains, the world's largest wildebeest migration, and a crater packed with the Big Five.",
    img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?fm=jpg&q=80&w=1600&auto=format&fit=crop',
    alt: 'Safari vehicle on a game drive in the Serengeti, Tanzania',
    chips: [
      'Serengeti Great Migration safaris',
      'Ngorongoro Crater game drives',
      'Mount Kilimanjaro trekking',
      'Zanzibar beaches & spice tours',
    ],
  },
  {
    num: 'VI.',
    name: 'Kenya',
    tag: 'The Maasai Mara, Amboseli &amp; Kilimanjaro views',
    desc: "Kenya runs from the Maasai Mara, where the wildebeest migration crosses over from the Serengeti, down past Amboseli, where elephants graze in front of Kilimanjaro. In between is Maasai land, and the tours here are as much about people as they are about wildlife.",
    img: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?fm=jpg&q=80&w=1600&auto=format&fit=crop',
    alt: 'Open savannah in the Maasai Mara, Kenya',
    chips: [
      'Maasai Mara Great Migration safaris',
      'Amboseli & Kilimanjaro views',
      'Maasai homeland & homestead visits',
      'Kilimanjaro trekking from Kenya',
    ],
  },
];

export default function Countries() {
  return (
    <section className="countries" id="countries">
      {countries.map((c, i) => (
        <div
          className="country-row"
          key={c.name}
          data-reveal
          style={{ '--reveal-delay': `${i * 90}ms` }}
        >
          <div className="country-media">
            <img src={c.img} alt={c.alt} loading="lazy" decoding="async" />
          </div>
          <div className="country-copy">
            <div className="num">{c.num}</div>
            <h3>{c.name}</h3>
            <div className="tag" dangerouslySetInnerHTML={{ __html: c.tag }} />
            <p className="desc">{c.desc}</p>
            <div className="chip-row">
              {c.chips.map((chip) => (
                <span className="chip" key={chip}>{chip}</span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
