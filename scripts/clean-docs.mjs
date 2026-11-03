import { rmSync } from 'node:fs';

rmSync('docs/assets', { recursive: true, force: true });
