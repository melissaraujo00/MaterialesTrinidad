import type { route as routeFn } from 'ziggy-js';

declare global {
    interface Window {
      JSZip: typeof import('jszip');
    }
  }

declare global {
    const route: typeof routeFn;
}
