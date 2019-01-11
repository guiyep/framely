function buildUrl({ type, proxy, url }) {
  return `${type}::${proxy}${url}`;
}

function buildDiscoverUrl({ name, route, requestId }) {
  return `${name}-${route}-[${requestId}]`;
}
const requestsFramely = '(requests-framely)';

export default {
  buildUrl,
  buildDiscoverUrl,
  requestsFramely
};
