import 'dotenv/config';
import { DataSource } from 'typeorm';

import { Tweet } from '../../src/app/models/Tweet';
import { TweetMedia } from '../../src/app/models/TweetMedia';
import CreateTweetMediaService from '../../src/app/services/TweetMedias/CreateTweetMediaService';
import CreateTweetService from '../../src/app/services/Tweets/CreateTweetService';
import CreateUserService from '../../src/app/services/Users/CreateUserService';
import dataSourceOptions from '../../src/config/database';
import tweetMock from '../tweets/tweetMock';
import userMock from '../user/userMock';
import truncate from '../util/truncate';
import tweetMediaMock from './tweetMediaMock';

describe('TweetMedia', () => {
  beforeAll(async () => {
    const AppDataSource = new DataSource(dataSourceOptions);

    await AppDataSource.initialize();

    await truncate();

    const user = await CreateUserService.call(userMock);
    if (!user) return;

    await CreateTweetService.call(tweetMock, user);
  });

  beforeEach(async () => {
    await TweetMedia.clear();
  });

  it('should be able to register a tweet tweet media', async () => {
    const tweet = await Tweet.findOneBy({ id: tweetMock.id });
    if (!tweet) return;

    const tweetMedia = await CreateTweetMediaService.call(tweetMediaMock, tweet);

    expect(tweetMedia).toHaveProperty('tweet');
  });

  it('should not be able to register a duplicate tweet media', async () => {
    const tweet = await Tweet.findOneBy({ id: tweetMock.id });
    if (!tweet) return;

    await CreateTweetMediaService.call(tweetMediaMock, tweet);
    const anotherTweetMedia = await CreateTweetMediaService.call(tweetMediaMock, tweet);

    expect(anotherTweetMedia).toEqual(null);
  });

  afterAll(async () => {
    const AppDataSource = new DataSource(dataSourceOptions);
    await AppDataSource.initialize();
    await AppDataSource.dropDatabase();
  });
});
