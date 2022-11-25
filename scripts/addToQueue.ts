import 'dotenv/config';
import '../src/database';
import queue from '../src/queues/FindTweetsByTagQueue';

async function dale() {
  await queue.add({ tag: 'testefodase' });
  console.log('done');
}

dale();
