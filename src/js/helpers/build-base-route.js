const preRoute = 'framely//';

function buildBaseRoute({ base = preRoute, apiName }) {
  return `${base}${apiName}`;
}

export default {
  buildBaseRoute,
  preRoute
};
