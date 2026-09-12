import React from 'react';

const activities = [
  {
    idx: '01',
    title: 'Whitewater Rafting',
    desc: 'Grade 3 to 5 rapids through Batoka Gorge below the falls, some of the best one-day whitewater runs in the world.',
  },
  {
    idx: '02',
    title: 'Victoria Falls Bridge Bungee',
    desc: 'A 111-metre freefall off the historic Victoria Falls Bridge, right between Zimbabwe and Zambia.',
  },
  {
    idx: '03',
    title: "Devil's Pool Swimming",
    desc: "In the dry season you can swim to the very lip of the falls and look straight down the drop from a natural rock pool.",
  },
  {
    idx: '04',
    title: 'Flight of Angels',
    desc: 'Helicopter and microlight flights run the full length of the gorge, with the falls below you.',
  },
  {
    idx: '05',
    title: 'Zambezi Sunset Cruise',
    desc: 'A slow float upstream past hippo pods and elephants drinking, as the sun drops over the river.',
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
        <div className="section-head" data-reveal>
          <div className="eyebrow">On &amp; Around the Zambezi</div>
          <h2>Things to do at the Falls</h2>
          <p>
            Victoria Falls is a base for adrenaline on the rapids and quiet game
            drives at dusk.
          </p>
        </div>
        <div className="act-grid">
          {activities.map((act, i) => (
            <div
              className="act-card"
              key={act.idx}
              data-reveal
              style={{ '--reveal-delay': `${i * 90}ms` }}
            >
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
