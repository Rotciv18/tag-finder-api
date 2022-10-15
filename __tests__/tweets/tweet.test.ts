import 'dotenv/config';
import { DataSource } from 'typeorm';

import { Tweet } from '../../src/app/models/Tweet';
import { User } from '../../src/app/models/User';
import CreateTweetService from '../../src/app/services/Tweet/CreateTweetService';
import dataSourceOptions from '../../src/config/database';
import userMock from '../user/userMock';
import tweetMock from './tweetMock';

describe('Tweet', () => {
  beforeAll(async () => {
    const AppDataSource = new DataSource(dataSourceOptions);

    await AppDataSource.initialize();

    const user = new User();
    Object.assign(user, userMock);

    await user.save();
  });

  beforeEach(async () => {
    await Tweet.clear();
  });

  it('should be able to create a user tweet', async () => {
    const user = await User.findOneBy({ id: userMock.id });
    if (!user) return;

    const tweet = await CreateTweetService.call(tweetMock, user);

    expect(tweet).toHaveProperty('user');
  });

  it('should not be able to create a duplicate id tweet', async () => {
    const user = await User.findOneBy({ id: userMock.id });
    if (!user) return;

    await CreateTweetService.call(tweetMock, user);
    const anotherTweet = await CreateTweetService.call(tweetMock, user);

    expect(anotherTweet).toEqual(null);
  });
});
