import runtime from 'serviceworker-webpack-plugin/lib/runtime';

export const register = (navigator) => {
  if ('serviceWorker' in navigator) {
    runtime.register();
  }
};
