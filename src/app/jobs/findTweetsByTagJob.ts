import { DoneCallback, Job } from 'bull';
import FindTweetsByTagQueue from 'src/queues/FindTweetsByTagQueue';

import CreateUserTweetService from '@services/Users/Tweet/CreateUserTweetService';

import GetAllTweetsByTag from '../diplomates/twitter/GetAllTweetsByTag';

interface IJob extends Job {
  data: {
    tag: string
  }
}

export default async (job: IJob, done: DoneCallback): Promise<void> => {
  const { tag } = job.data;

  console.log('Executando agora');

  const tweets = await GetAllTweetsByTag.call(tag);
  if (!tweets) return;
  await CreateUserTweetService.call(tweets);

  await FindTweetsByTagQueue.add({ tag }, { delay: 300000 });
  done();
};
