import { registerDataFetcherWorker } from './../service-workers';
import { createBufferSingleton } from './../service-workers/buffer';

export const connectHost = ({ window }) => {
  const executor = () => {};
  createBufferSingleton(executor);
  registerDataFetcherWorker(window.navigator);
};
