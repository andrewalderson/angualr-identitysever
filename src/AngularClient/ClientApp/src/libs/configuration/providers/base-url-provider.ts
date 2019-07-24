import { BASE_URL } from '../tokens';

function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}

export const baseUrlProvider = { provide: BASE_URL, useFactory: getBaseUrl, deps: [] };
