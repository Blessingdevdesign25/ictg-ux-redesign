import '@testing-library/jest-dom/vitest';
import * as axeMatchers from 'vitest-axe/matchers';
import { afterEach, expect } from 'vitest';
import { cleanup } from '@testing-library/react';

expect.extend(axeMatchers);
afterEach(() => cleanup());

// jsdom gaps
if (!window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  });
}

// jsdom doesn't implement <dialog> methods
if (typeof HTMLDialogElement !== 'undefined') {
  HTMLDialogElement.prototype.showModal ??= function showModal() {
    this.setAttribute('open', '');
  };
  HTMLDialogElement.prototype.close ??= function close() {
    this.removeAttribute('open');
    this.dispatchEvent(new Event('close'));
  };
}

window.scrollTo = () => {};

// Node 25 exposes its own (non-functional without --localstorage-file) localStorage global, which can
// shadow jsdom's. Install a predictable in-memory Storage for every test file.
class MemoryStorage {
  #map = new Map();
  get length() { return this.#map.size; }
  key(i) { return [...this.#map.keys()][i] ?? null; }
  getItem(k) { return this.#map.has(String(k)) ? this.#map.get(String(k)) : null; }
  setItem(k, v) { this.#map.set(String(k), String(v)); }
  removeItem(k) { this.#map.delete(String(k)); }
  clear() { this.#map.clear(); }
}
Object.defineProperty(window, 'localStorage', { value: new MemoryStorage(), configurable: true });
afterEach(() => window.localStorage.clear());

// axe probes <canvas> for icon-ligature detection; jsdom has no canvas → return null quietly
HTMLCanvasElement.prototype.getContext = () => null;
