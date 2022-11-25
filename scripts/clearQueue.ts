import 'dotenv/config';
import * as redis from 'redis';

async function clearQueue() {
  const { REDIS_HOST } = process.env;
  const { REDIS_PORT } = process.env;

  if (!REDIS_HOST || !REDIS_PORT) {
    return;
  }

  const client = redis.createClient();
  await client.connect();

  await client.flushAll().then(() => console.log('Pronto'));
}

clearQueue();
