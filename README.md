# ICTG UX Redesign — Home & Messages Library

A redesign of the **Faith Tabernacle ICT Group** website's home page and its "Gospel Messages" section,
focused on usability, accessibility and responsive design. Built as a UX Engineer assessment.

- **Live demo:** TODO — add deployment URL
- **Figma prototype:** [ictg-ux-redesign on Figma](https://www.figma.com/design/Xmdz00Q9Oa8V8m57Yh2Bo6/ictg-ux-redesign) — present from page "04 Desktop 1440" (flow "Desktop — Home") or "05 Mobile 390" (flow "Mobile — Home")
- **UX audit:** [`docs/02-UX-AUDIT.md`](docs/02-UX-AUDIT.md)
- **Original site (reference only, not modified):** https://ftwinnersictg.org

![Home page at 1440px](docs/screenshots/home-desktop.png)

---

## UX audit — summary

| # | Problem on the current site | What I changed |
|---|---|---|
| 1 | **Carousels hide core content.** 2 of 5 services and most messages sit behind small arrows/dots; there's no way to search or browse all messages. | Static responsive grids. New **Messages Library** with search, filters, sort and shareable URLs. |
| 2 | **Competing CTAs & inaccessible nav.** Five red primary buttons above the fold area, no `<h1>` in the hero, dropdowns are `href="#"` links, nav rendered 4× in the DOM. | One primary CTA per section, semantic `<h1>`, disclosure-button dropdowns with `aria-expanded`, single nav, external links signposted. |
| 3 | **Low readability & weak hierarchy.** ~12–13px body text, grey-on-grey cards, all-caps titles, project cards with no description or link. | 16/18px base on a modular scale, AA-verified colour tokens, sentence case, richer project cards, consistent section rhythm. |

Full evidence, impact and WCAG references: [`docs/02-UX-AUDIT.md`](docs/02-UX-AUDIT.md).

## Functional feature: Messages Library (`/messages`)

- Keyword search across title, speaker and description (matches highlighted)
- Filter by speaker, category and year; sort newest / oldest / A–Z
- State lives in the URL (`/messages?category=Communion&sort=oldest`) — shareable, survives refresh and back
- Live result count for screen readers, removable filter chips, empty state with "clear filters"
- Mobile: filters move into an accessible native `<dialog>`

> Mock content: the five messages on the current ICTG home page are real (title, speaker, YouTube link); dates,
> categories, descriptions and every other message are **illustrative**. Projects summaries/tags and all
> activities are also mock copy for client review.

### Stretch: Activities (`/activities`)

- Upcoming / Past segmented control (native radios) and activity-type filter chips (`aria-pressed`)
- Shared `ResultsSummary` live region and `EmptyState`
- **Add to calendar** generates an `.ics` file client-side (Blob, no server)

![Messages — desktop, filtered](docs/screenshots/messages-desktop.png)

## Design decisions

- **Kill the carousels.** Grids show everything at once and are simpler for keyboard and screen-reader users.
- **Red as a signal, not a surface.** Brand red is reserved for the primary action and active states so it means something.
- **Tokens shared between Figma and code.** Variable names in Figma match `src/styles/tokens.css` one-to-one.
- **Native elements first.** `<select>`, `<dialog>`, `<button aria-expanded>` — less custom ARIA, better mobile behaviour.
- **URL as state.** Filters are part of the address so results can be linked in WhatsApp/email, which is how church members actually share content.
- **One nav, one set of filters.** Desktop vs mobile is chosen in JS (`matchMedia`), so the primary nav and filter controls exist once in the DOM — the live site renders its nav 4×.
- **Trade-offs:** native selects limit styling; mock data beyond the 5 messages on the live site is illustrative; no translate widget (recommended a single labelled language switcher instead).

## Tech stack

React 18 · Vite · JavaScript · HTML5 · CSS3 (CSS Modules + custom properties) · React Router · Vitest + Testing Library + axe · ESLint (jsx-a11y)

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm test         # unit, component and accessibility tests
npm run lint
npm run build && npm run preview
```

Requires Node 18+.

## Accessibility & responsiveness

- WCAG 2.2 AA target: skip link, landmarks, one `h1` per page, visible focus, keyboard-operable menus and dialog, reduced-motion support
- Tested at 360 / 390 / 768 / 1024 / 1440px and 200% zoom
- Lighthouse 12 (mobile, simulated throttling) against `npm run preview` on localhost, 3 runs each, 2 Nov 2026:

  | Page | Performance | Accessibility | Best Practices | SEO |
  |---|---|---|---|---|
  | `/` | 91–98 | 100 | 100 | 100 |
  | `/messages` | 90–94 | 100 | 100 | 100 |

  LCP 1.8–1.9 s, CLS ≤ 0.033. Re-run against the live deployment and update.
- Automated: 70 Vitest tests incl. axe on `/`, `/messages`, `/messages?q=zzzz`, `/activities`, the mobile filter dialog open, and keyboard behaviour of dropdowns, mobile menu and dialog
- Contrast for every token pair measured and documented in [`docs/03-DESIGN-SYSTEM.md`](docs/03-DESIGN-SYSTEM.md); two failing pairs found and fixed

| Mobile home | Mobile menu | Mobile filters | Empty state |
|---|---|---|---|
| ![Home page at 390px](docs/screenshots/home-mobile.png) | ![Mobile menu open with About expanded](docs/screenshots/nav-mobile-open.png) | ![Filter dialog open at 390px](docs/screenshots/messages-mobile-filters.png) | ![Empty state for query zzzz](docs/screenshots/messages-empty.png) |

## Project structure

```
docs/            audit, design system, Figma spec, plan, a11y, QA, deployment
src/components/  layout, ui primitives, home sections, messages feature, activities
src/data/        mock content
src/hooks/       URL-synced filters, disclosure, media query, localStorage
src/utils/       pure filter/sort/query/highlight/date/.ics logic (unit-tested)
```

## Author

Victor Ironali — [ironali.com](https://ironali.com)
