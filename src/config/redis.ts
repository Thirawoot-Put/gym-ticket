import Redis from 'ioredis';

import { REDIS_URL } from '@/config/env';

console.log(REDIS_URL)
const redis = new Redis(REDIS_URL, {
  lazyConnect: true,
  connectTimeout: 5000,
  maxRetriesPerRequest: 3,
});

(async () => {
  try {
    await redis.connect();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();

export default redis;
