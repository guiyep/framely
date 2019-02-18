export const preRoute = 'framely//';

export function buildBaseRoute({ base = preRoute, apiName }) {
  return `${base}${apiName}`;
}
