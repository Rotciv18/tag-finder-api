import 'dotenv/config';
import './database';

import findTweetsByTagJob from './app/jobs/findTweetsByTagJob';
import FindTweetsByTagQueue from './queues/FindTweetsByTagQueue';

try {
  FindTweetsByTagQueue.process(findTweetsByTagJob);
  console.log(`Listening now to queues on ${process.env.NODE_ENV}`);
} catch (e) {
  console.log(e);
}
