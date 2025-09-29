const isDevMode = true;

export function getBaseUrl() {
  return isDevMode ? 'http://localhost:8080/' : 'https://api.orcus.app/';
}
