/** Pure filtering for the Activities page. `now` is injectable for tests. */
export function filterEvents(events, { when = 'upcoming', types = [], now = new Date() } = {}) {
  const t = now.getTime();
  const filtered = events.filter((e) => {
    const start = new Date(e.start).getTime();
    const inWindow = when === 'past' ? start < t : start >= t;
    return inWindow && (types.length === 0 || types.includes(e.type));
  });
  // Upcoming: soonest first. Past: most recent first.
  return filtered.sort((a, b) => (when === 'past' ? b.start.localeCompare(a.start) : a.start.localeCompare(b.start)));
}
