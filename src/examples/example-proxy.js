import { connectProxy, connectHost } from '../js';
import { helloWorld } from './routes/hello-world';

const iframe = document.createElement('iframe');
document.body.appendChild(iframe);
iframe.src = 'about:blank';

// ********************** HERE IS HOW TO CREATE AN API *************************

const frame = connectProxy({ name: 'example-api', window });
frame.route(helloWorld);
// const registeredRoutes = frame.route(helloWorld);

registeredRoutes.forEach((route) => {
  setTimeout(() => {
    window.postMessage({ id: route }, '*');
  }, 2000);
});

// ********************** HERE IS HOW TO CONSUME IFRAME *************************

connectHost({ name: 'example-api', window });
