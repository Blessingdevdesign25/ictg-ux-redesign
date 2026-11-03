/**
 * Single source for header + footer navigation.
 * Item kinds:
 *   { label, to }            internal route (react-router)
 *   { label, href }          internal page that doesn't exist in this prototype → link to live site
 *   { label, href, external: true }  external site → ExternalLink
 *   { label, children: [] }  dropdown (button trigger, never href="#")
 */
const LIVE = 'https://ftwinnersictg.org';

export const PRIMARY_NAV = [
  { label: 'Home', to: '/' },
  {
    label: 'About',
    children: [
      { label: 'About us', href: `${LIVE}/about-us/`, external: true },
      { label: 'ICTG Excos', href: `${LIVE}/ictg-excos/`, external: true },
      { label: 'Members portal', href: `${LIVE}/members-portal/`, external: true },
    ],
  },
  { label: 'Messages', to: '/messages' },
  { label: 'Projects', href: `${LIVE}/projects/`, external: true },
  { label: 'Activities', to: '/activities' },
  {
    label: 'FT Programs',
    children: [
      { label: 'Believers Foundation Class', href: 'https://bfc.lfcww.org/', external: true },
      { label: 'Domi Radio', href: 'http://domiradio.org/', external: true },
      { label: 'Faith Tabernacle live stream', href: 'https://faithtabernacle.org.ng/', external: true },
      { label: 'Winners app (Android)', href: 'https://play.google.com/store/apps/details?id=com.winnersworlwide&hl=en_US', external: true },
      { label: 'Winners app (iOS)', href: 'https://apps.apple.com/us/app/winners-mobile/id6450368176', external: true },
    ],
  },
  { label: 'Contact', href: `${LIVE}/contact-us/`, external: true },
];

export const PRIMARY_CTA = { label: 'Join ICTG', href: `${LIVE}/join-ictg/` };

export const ANNOUNCEMENT = {
  id: 'shiloh-2026',
  text: 'Shiloh 2026 registration is open for ICTG members.',
  cta: { label: 'Register', href: `${LIVE}/shiloh-2026-registration/` },
};

export const FOOTER_NAV = [
  {
    title: 'Quick links',
    items: [
      { label: 'Home', to: '/' },
      { label: 'Messages', to: '/messages' },
      { label: 'Activities', to: '/activities' },
      { label: 'About us', href: `${LIVE}/about-us/`, external: true },
      { label: 'Projects', href: `${LIVE}/projects/`, external: true },
      { label: 'Contact ICTG', href: `${LIVE}/contact-us/`, external: true },
      { label: 'Privacy policy', href: `${LIVE}/privacy-policy/`, external: true },
    ],
  },
  {
    title: 'Members',
    items: [
      { label: 'Join ICTG', href: `${LIVE}/join-ictg/`, external: true },
      { label: 'Members portal', href: `${LIVE}/members-portal/`, external: true },
      { label: 'Submit profile', href: `${LIVE}/members-form/`, external: true },
      { label: 'Community forum', href: `${LIVE}/forum/`, external: true },
      { label: 'Shiloh 2026 registration', href: `${LIVE}/shiloh-2026-registration/`, external: true },
    ],
  },
  {
    title: 'Live & connect',
    items: PRIMARY_NAV.find((i) => i.label === 'FT Programs').children,
  },
];

export const SOCIAL = { linkedin: 'https://www.linkedin.com/company/lfc-ict-group/' };
