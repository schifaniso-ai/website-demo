import React from 'react';

const countries = [
  {
    num: 'I.',
    name: 'South Africa',
    tag: 'Big Five &amp; the Cape coastline',
    desc: 'From the bushveld of Kruger to the cliffs of the Cape Peninsula, South Africa pairs classic safari with dramatic coastal scenery in a single trip.',
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
    desc: "Zambia claims the other half of Victoria Falls at Livingstone, and inland, South Luangwa National Park \u2014 the birthplace of the African walking safari.",
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
    desc: "A vast inland delta and the highest concentration of elephants in Africa make Botswana one of the continent's most pristine wildlife destinations.",
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
    desc: 'Namibia trades the classic bush for towering red dunes and desert-adapted wildlife, in landscapes as vast and empty as anywhere on earth.',
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
    desc: "Tanzania is East Africa's classic safari country \u2014 endless plains, the world's largest wildebeest migration, and a crater teeming with the Big Five.",
    img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?fm=jpg&q=80&w=1600&auto=format&fit=crop',
    alt: 'Safari vehicle on a game drive in the Serengeti, Tanzania',
    chips: [
      'Serengeti Great Migration safaris',
      'Ngorongoro Crater game drives',
      'Mount Kilimanjaro trekking',
      'Zanzibar beaches & spice tours',
    ],
  },
];

export default function Countries() {
  return (
    <section className="countries" id="countries">
      {countries.map((c) => (
        <div className="country-row" key={c.name}>
          <div className="country-media">
            <img src={c.img} alt={c.alt} />
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
