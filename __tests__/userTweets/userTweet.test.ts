import 'dotenv/config';
import { DataSource } from 'typeorm';

import { User } from '../../src/app/models/User';
import CreateUserTweetService from '../../src/app/services/Users/Tweet/CreateUserTweetService';
import dataSourceOptions from '../../src/config/database';
import truncate from '../util/truncate';
import tweetCallMock from './tweetCallMock';

describe('Create Tweet Job', () => {
  beforeAll(async () => {
    const AppDataSource = new DataSource(dataSourceOptions);

    await AppDataSource.initialize();

    await truncate();
  });

  it('should be able to register a User, a user Tweet and the tweet Tweet Media with Twitter API response', async () => {
    await CreateUserTweetService.call(tweetCallMock);

    const user = await User.findOne({
      where: { id: tweetCallMock.data[0].author_id }, relations: { tweets: { tweet_medias: true } },
    });
    if (!user) return;

    expect(user.tweets.length).toBeGreaterThan(0);
    expect(user.tweets[0].tweet_medias.length).toBeGreaterThan(0);
  });
});
