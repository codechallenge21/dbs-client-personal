/**
 * Global TypeScript declarations for the application
 */

interface FontJSONConfig {
  User: string;
  DomainID: string;
  Font: string[];
}

declare global {
  interface Window {
    FontJSON: FontJSONConfig;
  }
}

export { };
