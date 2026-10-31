# The African Carnival

The website for **The African Carnival**, a Victoria Falls travel company
planning safari journeys from Zimbabwe into Southern and East Africa.

The African Carnival is built around one idea: the falls are the front door,
not the end of the trip. The site introduces Victoria Falls, the activities and
the wider region, then carries visitors across six countries — South Africa,
Zambia, Botswana, Namibia, Tanzania and Kenya.

## Pages and routing

The site uses React Router. Every page shares the same header, footer and
design system:

- `/` — the landing page, built from the section components below
- `/about` — the company story and how trips are planned
- `/activities` — things to do at Victoria Falls, seasons and a sample day
- `/contact` — enquiry form and Victoria Falls contact details
- `/book/:activityId/:step?` — the five-step activity booking flow

Navigation lives in `src/components/Header.js`. Unknown routes redirect to the
home page.

## Booking flow

Every activity card links to `/book/:activityId`. The flow has five stages:

1. **Activity Details** — date, available time slot and number of participants
2. **Customer Information** — lead traveller contact details
3. **Review Booking** — activity, traveller and price recap, plus terms
4. **Payment** — PayPal-branded demo checkout
5. **Confirmation** — reference, receipt and follow-up actions

The current stage is reflected in the URL (`/book/:activityId/review`, for
example), so the browser Back button and deep links behave predictably. Booking
drafts persist per activity in `sessionStorage` under `ac-booking:<activityId>`
and are cleared once a booking is confirmed or the visitor returns to the
Activities page.

Booking data and prices live in `src/data/activities.js`. Flow rules,
validation, date helpers and reference generation live in
`src/booking/bookingUtils.js`. The screens are in
`src/components/booking/`, with `src/pages/BookingPage.js` coordinating routing
and state.

This is a frontend-only demonstration: there is no backend, database,
authentication, real PayPal integration, payment processing or email service.
The payment screen simulates both success and an occasional decline so the retry
path can be tested.

## About the build

This project was bootstrapped with
[Create React App](https://github.com/facebook/create-react-app).

The landing page is composed from section components in `src/components`, and
the standalone pages live in `src/pages`. The About page reuses `About` and
`HubDiagram`:

- `Hero` — opening statement over Victoria Falls
- `About` — who The African Carnival is and how the company travels
- `FallsIntro` — the falls themselves, with key stats
- `Activities` — what to do around Victoria Falls
- `HubDiagram` — the region at a glance (About page)
- `Countries` — destination rows for all six countries
- `CityTours` — city and township tours
- `CTA` and `Footer` — closing call to action
- `PageHero` — the shared opening banner for internal pages

Site copy, metadata and structured data live in `public/index.html`. Page titles
and descriptions are set per route with `src/hooks/usePageMeta.js`.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode at [http://localhost:3000](http://localhost:3000).

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder. The site uses clean URLs,
so the host needs an SPA fallback to `index.html` for direct visits to
`/about`, `/activities`, `/contact` and every `/book/...` route.
`public/_redirects` covers Netlify; most other hosts expose the same setting.

### `npm run eject`

One-way operation that copies the build configuration into the project. You
shouldn't need it.
