export function buildUrl({ type, proxy, url }) {
  return `${type}::${proxy}${url}`;
}

export function buildDiscoverUrl({ name, route, requestId }) {
  return `${name}-${route}-[${requestId}]`;
}

export const requestsFramely = '(requests-framely)';
