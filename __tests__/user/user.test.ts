import 'dotenv/config';

import { DataSource } from 'typeorm';

import { User } from '../../src/app/models/User';
import CreateUserService from '../../src/app/services/Users/CreateUserService';
import dataSourceOptions from '../../src/config/database';
import userMock from './userMock';

describe('User', () => {
  beforeAll(async () => {
    const AppDataSource = new DataSource(dataSourceOptions);

    await AppDataSource.initialize();
  });

  beforeEach(async () => {
    await User.clear();
  });

  it('should be able to create', async () => {
    const user = await CreateUserService.call(userMock);

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create with existing id', async () => {
    await CreateUserService.call(userMock);

    const anotherUser = await CreateUserService.call(userMock);

    expect(anotherUser).toEqual(null);
  });
});
