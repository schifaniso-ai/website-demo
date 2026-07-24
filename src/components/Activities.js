import React from 'react';

const activities = [
  {
    idx: '01',
    title: 'Whitewater Rafting',
    desc: 'Grade 3\u20135 rapids through the Batoka Gorge below the falls \u2014 some of the finest one-day whitewater runs on earth.',
  },
  {
    idx: '02',
    title: 'Victoria Falls Bridge Bungee',
    desc: 'A 111-metre freefall from the historic bridge spanning the gorge, suspended directly between Zimbabwe and Zambia.',
  },
  {
    idx: '03',
    title: "Devil's Pool Swimming",
    desc: 'In the dry season, swim to the very lip of the falls and look straight down the drop from a natural rock pool.',
  },
  {
    idx: '04',
    title: 'Flight of Angels',
    desc: 'Helicopter and microlight flights tracing the full length of the gorge, with the falls unfolding beneath you.',
  },
  {
    idx: '05',
    title: 'Zambezi Sunset Cruise',
    desc: 'A slow float upstream past hippo pods and drinking elephants as the sky over the river turns to gold.',
  },
  {
    idx: '06',
    title: 'Zambezi National Park Safari',
    desc: 'Game drives and walking safaris minutes from town, tracking elephant, buffalo, and lion along the riverbank.',
  },
];

export default function Activities() {
  return (
    <section className="section activities" id="activities">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">On &amp; Around the Zambezi</div>
          <h2>Things to do at the Falls</h2>
          <p>
            From adrenaline on the rapids to quiet game drives at dusk, Victoria
            Falls is a base for both thrill and stillness.
          </p>
        </div>
        <div className="act-grid">
          {activities.map((act) => (
            <div className="act-card" key={act.idx}>
              <span className="idx">{act.idx}</span>
              <h3>{act.title}</h3>
              <p>{act.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
