// Pre-setup: Define globals as non-configurable so expo/src/winter/installGlobal
// won't replace them with lazy getters that fail in Jest's sandboxed environment.

const globalsToProtect = [
  '__ExpoImportMetaRegistry',
  'structuredClone',
  'TextDecoder',
  'TextDecoderStream',
  'TextEncoderStream',
  'URL',
  'URLSearchParams',
];

for (const name of globalsToProtect) {
  const existing = globalThis[name];
  if (existing !== undefined) {
    Object.defineProperty(globalThis, name, {
      value: existing,
      configurable: false,
      enumerable: true,
      writable: false,
    });
  }
}

// Suppress expo's "Failed to set polyfill" warnings — they're expected
const originalConsoleError = console.error;
console.error = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('Failed to set polyfill')) return;
  originalConsoleError(...args);
};

// Define __ExpoImportMetaRegistry if not present
if (typeof globalThis.__ExpoImportMetaRegistry === 'undefined') {
  Object.defineProperty(globalThis, '__ExpoImportMetaRegistry', {
    value: { url: 'http://localhost:8081' },
    configurable: false,
    enumerable: false,
    writable: false,
  });
}
