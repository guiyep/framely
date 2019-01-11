import { fromEvent } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { buildUrl } from '../helpers/build-url';
import { buildResponse } from '../helpers/build-response';
import { iframeMessage } from '../helpers/iframe-message';

let routesObj = {};

const mergeRoute = (objRoute, name) => {
  // this is all we have to listen to this messages with rxjs

  const obj = objRoute.reduce((acc, route) => {
    acc[buildUrl({ type: route.type, proxy: name, url: route.route })] = route;
    return acc;
  }, {});

  Object.entries(obj).forEach(entry => console.log(`PROXY REGISTERED: ${JSON.stringify(entry)}`));

  routesObj = {
    ...routesObj,
    ...obj
  };
};

const receiveMessages = ({ window }) => {
  // receive a all the messages and each time we deg a
  const $Observer = fromEvent(window, 'message')
    .pipe(filter(({ data: { id, response } }) => id && !!routesObj[id] && !response))
    .pipe(
      map(({ source, data: { id, payload = {} } }) => ({
        id,
        payload,
        source
      }))
    );

  $Observer.subscribe(({ id, payload = {}, source }) => {
    const route = routesObj[id];
    console.log(
      `PROXY MESSAGE: we received: ${JSON.stringify(id)}, payload: ${JSON.stringify(
        payload
      )}, route present: ${!!route}`
    );

    if (route.callbacks) {
      route.callbacks.forEach((f) => {
        const res = buildResponse();
        f(payload, res);

        const result = res.emptyBuffer();
        console.log(`PROXY RESULT: ***${result}*** for ${id}`);
        const m = iframeMessage({ id, response: true, payload: result });
        source.postMessage(m);
      });
    }
  });
};

const connectProxy = ({ name, window }) => ({
  route: ({ getRoutesList }) => {
    mergeRoute(getRoutesList(), name);
    receiveMessages({ window });
    return Object.keys(routesObj);
  }
});

export { connectProxy };
