import React, { useState } from 'react';

import PageHero from '../components/PageHero';
import usePageMeta from '../hooks/usePageMeta';
import useReveal from '../hooks/useReveal';

const details = [
  { label: 'Office', value: 'Victoria Falls, Zimbabwe' },
  {
    label: 'Email',
    value: 'hello@theafricancarnival.com',
    href: 'mailto:hello@theafricancarnival.com',
  },
  { label: 'Phone', value: '+263 13 555 014', href: 'tel:+26313555014' },
  { label: 'Hours', value: 'Mon–Fri, 08:00–17:00 CAT' },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  usePageMeta(
    'Contact | The African Carnival',
    'Contact The African Carnival in Victoria Falls to plan a safari across Southern and East Africa.'
  );
  useReveal();

  const handleSubmit = (event) => {
    event.preventDefault();
    event.currentTarget.reset();
    setSent(true);
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Tell us where you want to <em>go</em>.
          </>
        }
        intro="Dates, a rough idea, or just a place you have always wanted to see. Send it over and we will come back with a route."
      />

      <section className="section contact-section">
        <div className="wrap contact-grid">
          <div className="contact-copy" data-reveal>
            <div className="eyebrow">Start the conversation</div>
            <h2>We answer these ourselves.</h2>
            <p>
              No ticket numbers and no automated replies. Your enquiry lands with
              the team in Victoria Falls, and the person who answers is the person
              who will help plan the trip.
            </p>

            <ul className="contact-list">
              <li>Rough dates, or the month you have in mind</li>
              <li>Who is travelling and how long you have</li>
              <li>What draws you here: wildlife, water, cities, or all three</li>
            </ul>

            <div className="contact-details">
              {details.map((item) => (
                <div className="contact-detail" key={item.label}>
                  <span className="label">{item.label}</span>
                  {item.href ? (
                    <a href={item.href}>{item.value}</a>
                  ) : (
                    <span>{item.value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="contact-form-wrap" data-reveal style={{ '--reveal-delay': '120ms' }}>
            {sent ? (
              <div className="form-success" role="status" aria-live="polite">
                <div className="success-mark" aria-hidden="true">
                  ✓
                </div>
                <h3>Message received</h3>
                <p>
                  Thanks for getting in touch. We will reply within one working
                  day with a few questions and a first idea for the route.
                </p>
                <button
                  type="button"
                  className="form-reset"
                  onClick={() => setSent(false)}
                >
                  Send another enquiry <span aria-hidden="true">→</span>
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="field">
                    <label htmlFor="name">Full name</label>
                    <input id="name" name="name" type="text" autoComplete="name" required />
                  </div>
                  <div className="field">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="field">
                    <label htmlFor="country">Country</label>
                    <input
                      id="country"
                      name="country"
                      type="text"
                      autoComplete="country-name"
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="dates">Travel dates</label>
                    <input
                      id="dates"
                      name="dates"
                      type="text"
                      placeholder="e.g. Sep 2027, 10 days"
                    />
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="interest">Interested in</label>
                  <select id="interest" name="interest" defaultValue="Not sure yet">
                    <option>Not sure yet</option>
                    <option>Victoria Falls activities</option>
                    <option>Safari and wildlife</option>
                    <option>City and township tours</option>
                    <option>Multi-country journey</option>
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    placeholder="What would you like the trip to feel like?"
                    required
                  ></textarea>
                </div>

                <button className="btn" type="submit">
                  Send enquiry
                </button>
                <p className="form-note">
                  We usually reply within one working day, Monday to Friday.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
