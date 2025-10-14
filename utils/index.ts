const isDevMode = false;

export function getBaseUrl() {
  return isDevMode ? 'http://localhost:8080/' : 'https://backend.orcus-finance.space/';
}
