export function buildRoute(listener) {
  return (routerObject) => {
    // TODO validate routerArray
    routerObject.listAll().forEach(({ route, type, callbacks }) => {
      listener.addListener({ route, type, callbacks });
    });
  };
}
