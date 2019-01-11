import { preRoute } from '../helpers/build-base-route';

self.addEventListener('message', (event) => {
  console.log('we get the message call');
});

self.addEventListener('install', (event) => {
  console.log('service worker installed ok');
});

self.addEventListener('fetch', (event) => {
  if (event && event.request && event.request.url && event.request.url.includes(preRoute)) {
    console.log('something from framely');
  }
});
