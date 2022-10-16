import request from 'supertest';
import { DataSource } from 'typeorm';

import app from '../../src/app';
import CreateTweetMediaService from '../../src/app/services/TweetMedias/CreateTweetMediaService';
import CreateTweetService from '../../src/app/services/Tweets/CreateTweetService';
import CreateUserService from '../../src/app/services/Users/CreateUserService';
import dataSourceOptions from '../../src/config/database';
import tweetMediaMock from '../tweetMedias/tweetMediaMock';
import tweetMock from '../tweets/tweetMock';
import userMock from '../user/userMock';
import truncate from '../util/truncate';

async function createData() {
  const user = await CreateUserService.call(userMock);
  if (!user) return;
  const tweet = await CreateTweetService.call(tweetMock, user);
  if (!tweet) return;
  await CreateTweetMediaService.call(tweetMediaMock, tweet);
}

describe('Tweet controller', () => {
  beforeAll(async () => {
    const AppDataSource = new DataSource(dataSourceOptions);

    await AppDataSource.initialize();

    await truncate();

    await createData();
  });

  it('should be able to retrieve an existing tweet', async () => {
    const response = await request(app).get('/tweets/next').send();

    expect(response.body).toHaveProperty('user');
  });
});
