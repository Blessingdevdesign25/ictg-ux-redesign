/**
 * Mock message library.
 *
 * `source: 'live-site'` — title, speaker and YouTube link taken from the public ICTG home page
 *   (Nov 2026). Dates, categories, durations and descriptions are ILLUSTRATIVE.
 * `source: 'mock'` — fully illustrative entries added so search/filter has enough data to demo.
 *   They use generic service names and have no video link (videoUrl: null → "Coming soon").
 *
 * Shape:
 * { id, title, speaker, category, date (ISO), durationMin, description, tags[], videoUrl|null, source }
 */
export const MESSAGES = [
  {
    id: 'm01',
    title: 'Overcoming the Horror of Sexual Immorality',
    speaker: 'Pst. Mrs Faith A. Oyedepo',
    category: 'Sunday Service',
    date: '2026-02-01',
    durationMin: 74,
    description: 'A teaching on purity, discipline and living above moral pressure.',
    tags: ['purity', 'discipline', 'youth'],
    videoUrl: 'https://www.youtube.com/watch?v=b-XIx2n8Cdc',
    source: 'live-site',
  },
  {
    id: 'm02',
    title: 'The Benefit of Serving God',
    speaker: 'Bishop David Oyedepo',
    category: 'Sunday Service',
    date: '2026-01-25',
    durationMin: 92,
    description: 'Why service in the house of God carries reward, and how to serve with understanding.',
    tags: ['service', 'reward', 'workforce'],
    videoUrl: 'https://www.youtube.com/watch?v=ttTliCkeZig',
    source: 'live-site',
  },
  {
    id: 'm03',
    title: 'Healing Miracle Service',
    speaker: 'Bishop David Oyedepo',
    category: 'Healing',
    date: '2026-01-18',
    durationMin: 128,
    description: 'Monthly healing service with ministration and testimonies.',
    tags: ['healing', 'miracles', 'testimonies'],
    videoUrl: 'https://www.youtube.com/watch?v=3m1ppXK_d58',
    source: 'live-site',
  },
  {
    id: 'm04',
    title: 'Covenant Day of Settlement',
    speaker: 'Bishop David Oyedepo',
    category: 'Covenant Day',
    date: '2026-01-04',
    durationMin: 110,
    description: 'First Sunday covenant service focused on settlement and answered prayers.',
    tags: ['covenant', 'prayer'],
    videoUrl: 'https://www.youtube.com/watch?v=Xud5EmWCKg8',
    source: 'live-site',
  },
  {
    id: 'm05',
    title: 'Financial Fortune Banquet Service',
    speaker: 'Bishop David Oyedepo',
    category: 'Special Programme',
    date: '2025-12-28',
    durationMin: 135,
    description: 'Year-end banquet service on stewardship and financial breakthrough.',
    tags: ['finance', 'stewardship', 'year-end'],
    videoUrl: 'https://www.youtube.com/watch?v=nuMS0y-rqXc',
    source: 'live-site',
  },
  { id: 'm06', title: 'Holy Communion Service', speaker: 'Bishop David Oyedepo', category: 'Communion', date: '2025-12-07', durationMin: 98, description: 'Monthly communion service.', tags: ['communion'], videoUrl: null, source: 'mock' },
  { id: 'm07', title: 'Covenant Day of Fruitfulness', speaker: 'Bishop David Oyedepo', category: 'Covenant Day', date: '2025-12-07', durationMin: 104, description: 'Covenant service for families trusting God for children.', tags: ['covenant', 'family'], videoUrl: null, source: 'mock' },
  { id: 'm08', title: 'Shiloh 2025: Opening Service', speaker: 'Bishop David Oyedepo', category: 'Special Programme', date: '2025-12-02', durationMin: 140, description: 'Opening session of the annual Shiloh convention.', tags: ['shiloh', 'convention'], videoUrl: null, source: 'mock' },
  { id: 'm09', title: 'Shiloh 2025: Thanksgiving Service', speaker: 'Bishop David Oyedepo', category: 'Special Programme', date: '2025-12-07', durationMin: 150, description: 'Closing thanksgiving session of Shiloh 2025.', tags: ['shiloh', 'thanksgiving'], videoUrl: null, source: 'mock' },
  { id: 'm10', title: 'Women of Faith Fellowship', speaker: 'Pst. Mrs Faith A. Oyedepo', category: 'Fellowship', date: '2025-11-15', durationMin: 85, description: 'Fellowship service for women.', tags: ['women', 'fellowship'], videoUrl: null, source: 'mock' },
  { id: 'm11', title: 'Family Life Service', speaker: 'Pst. Mrs Faith A. Oyedepo', category: 'Fellowship', date: '2025-10-19', durationMin: 80, description: 'Teaching on marriage, parenting and the home.', tags: ['family', 'marriage', 'parenting'], videoUrl: null, source: 'mock' },
  { id: 'm12', title: 'Holy Communion Service', speaker: 'Bishop David Oyedepo', category: 'Communion', date: '2025-11-02', durationMin: 96, description: 'Monthly communion service.', tags: ['communion'], videoUrl: null, source: 'mock' },
  { id: 'm13', title: 'Prayer and Fasting Service', speaker: 'Bishop David Oyedepo', category: 'Prayer', date: '2025-01-12', durationMin: 120, description: 'Opening service of the annual 21-day prayer and fasting.', tags: ['prayer', 'fasting'], videoUrl: null, source: 'mock' },
  { id: 'm14', title: 'Covenant Day of Open Doors', speaker: 'Bishop David Oyedepo', category: 'Covenant Day', date: '2025-09-07', durationMin: 101, description: 'Covenant service focused on career and business doors.', tags: ['covenant', 'career'], videoUrl: null, source: 'mock' },
  { id: 'm15', title: 'Healing Stream Service', speaker: 'Bishop David Oyedepo', category: 'Healing', date: '2025-08-17', durationMin: 118, description: 'Healing service with prayer for the sick.', tags: ['healing'], videoUrl: null, source: 'mock' },
  { id: 'm16', title: 'Annual Thanksgiving Service', speaker: 'Bishop David Oyedepo', category: 'Special Programme', date: '2025-06-29', durationMin: 130, description: 'Mid-year thanksgiving celebration.', tags: ['thanksgiving'], videoUrl: null, source: 'mock' },
];
