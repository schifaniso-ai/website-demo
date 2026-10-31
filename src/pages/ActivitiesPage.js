import React from 'react';
import { Link } from 'react-router-dom';

import PageHero from '../components/PageHero';
import Activities from '../components/Activities';
import usePageMeta from '../hooks/usePageMeta';
import useReveal from '../hooks/useReveal';

const seasons = [
  {
    tag: 'High water · roughly Feb–May',
    title: 'The falls at full volume',
    text: 'The Zambezi is loud and the spray carries for miles. Some river activities pause, but the views, flights and rainforest walks are at their most dramatic.',
  },
  {
    tag: 'Shoulder · roughly Jun–Aug',
    title: 'Clear views, cool mornings',
    text: 'The spray settles and the gorge opens up. Good all-round conditions for game drives, walks, cruises and time on the water.',
  },
  {
    tag: 'Low water · roughly Sep–Nov',
    title: 'The gorge and the game',
    text: 'Lower water exposes the rock face and opens routes like Devil’s Pool. Wildlife concentrates around the river as the bush dries out.',
  },
];

const day = [
  { time: '06:00', text: 'Coffee, then a game drive in Zambezi National Park.' },
  { time: '10:30', text: 'Walk the rainforest trail along the lip of the falls.' },
  { time: '13:00', text: 'Lunch in town, out of the spray.' },
  { time: '15:30', text: 'Bridge walk, bungee, or a helicopter flight over the gorge.' },
  { time: '18:00', text: 'Sunset cruise on the Zambezi, hippos and all.' },
];

export default function ActivitiesPage() {
  usePageMeta(
    'Activities | The African Carnival',
    'Things to do at Victoria Falls: whitewater rafting, bungee, Devil’s Pool, helicopter flights, sunset cruises and Zambezi National Park safaris.'
  );
  useReveal();

  return (
    <>
      <PageHero
        eyebrow="Things to do"
        title={
          <>
            Adrenaline, water and <em>wild</em> country.
          </>
        }
        intro="Victoria Falls is a base for the loudest day of your trip and the quietest. The gorge gives you the rush; the river and the national park give you everything else."
        image="https://images.unsplash.com/photo-1611067523512-e0d4abd25f39?fm=jpg&q=80&w=2000&auto=format&fit=crop"
        imageAlt="Victoria Falls viewed from the Zambian side near Livingstone"
      />

      <Activities />

      <section className="section season-section">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <div className="eyebrow">When to go</div>
            <h2>The river sets the timetable</h2>
            <p>
              The Zambezi changes through the year, and so does the list of
              things you can do. These are the broad seasons, not fixed dates.
            </p>
          </div>
          <div className="season-grid">
            {seasons.map((season, i) => (
              <div
                className="season-card"
                key={season.title}
                data-reveal
                style={{ '--reveal-delay': `${i * 90}ms` }}
              >
                <div className="season-tag">{season.tag}</div>
                <h3>{season.title}</h3>
                <p>{season.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section day-section">
        <div className="wrap day-grid">
          <div className="day-copy" data-reveal>
            <div className="eyebrow">Make a day of it</div>
            <h2>Rapids at noon, elephants at dusk.</h2>
            <p>
              You do not have to choose between adventure and wildlife. A day
              around Victoria Falls can hold both, with time left to sit still
              and watch the river.
            </p>
            <Link className="btn" to="/contact">
              Plan your days
            </Link>
          </div>
          <ol className="day-list" data-reveal style={{ '--reveal-delay': '120ms' }}>
            {day.map((item) => (
              <li key={item.time}>
                <span className="time">{item.time}</span>
                <span>{item.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
