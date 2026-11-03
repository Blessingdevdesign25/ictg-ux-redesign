import { splitHighlight } from '../../../utils/highlight.js';

/** Wraps search-term matches in <mark>. */
export default function Highlight({ text, query }) {
  if (!query) return text;
  return splitHighlight(text, query).map((seg, i) => (seg.match ? <mark key={i}>{seg.text}</mark> : seg.text));
}
