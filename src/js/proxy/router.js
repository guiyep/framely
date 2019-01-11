import { requireErrorHandler } from '../helpers/require-error-handler';
import uuidv4 from 'uuid/v4';

let routes = [];

const addRoute = (route) => {
  routes = [route, ...routes];
};

const listAll = routes => Object.freeze([...routes]);

const get = (addRoute, { route, callbacks }) => {
  const anyError = requireErrorHandler(addRoute, { route, callbacks });
  if (anyError) {
    throw Error(anyError);
  }
  addRoute({ route, type: 'GET', callbacks, uniqueId: uuidv4() });
};

const post = (addRoute, { route, callbacks }) => {
  addRoute({ route, type: 'POST', callbacks, uniqueId: uuidv4() });
};

const put = (addRoute, { route, callbacks }) => {
  addRoute({ route, type: 'PUT', callbacks, uniqueId: uuidv4() });
};

const deleteF = (addRoute, { route, callbacks }) => {
  addRoute({ route, type: 'DELETE', callbacks, uniqueId: uuidv4() });
};

const routeObject = () => ({
  get: (route, ...callbacks) => get(addRoute, { route, callbacks }),
  post: args => post(addRoute, args),
  put: args => put(addRoute, args),
  delete: args => deleteF(addRoute, args),

  // will return a freeze object that is the one that is going to be used later
  lock: () =>
    Object.freeze({
      getRoutesList: () => listAll(routes)
    })
});

const newRoute = () => routeObject();

export { newRoute };
