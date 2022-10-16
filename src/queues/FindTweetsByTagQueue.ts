import Queue from 'bull';

export default new Queue('FindTweetsByTagQueue', {
  redis: {
    password: process.env.REDIS_PASS,
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});
