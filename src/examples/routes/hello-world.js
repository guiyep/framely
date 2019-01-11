import { newRoute } from '../../js';

const route = newRoute();

route.get('/hello-world', async (req, res, err) => {
  res.send('super test');
});

route.get('/hello-world/another', async (req, res, err) => {
  res.send('super test another');
});

export default { helloWorld: route.lock() };
