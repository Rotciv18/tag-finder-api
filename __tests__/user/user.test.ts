/* eslint-disable import/first */
// eslint-disable-next-line import/newline-after-import
import 'dotenv/config';
// process.env.NODE_ENV = 'dev';

import { DataSource } from 'typeorm';

import { User } from '../../src/app/models/User';
import CreateUserService from '../../src/app/services/Users/CreateUserService';
import dataSourceOptions from '../../src/config/database';

describe('User', () => {
  beforeAll(async () => {
    const AppDataSource = new DataSource(dataSourceOptions);

    await AppDataSource.initialize();
  });

  beforeEach(async () => {
    await User.clear();
  });

  it('should be able to create', async () => {
    const user = await CreateUserService.call({
      id: 2193277610, name: 'Rot', username: 'rotcivus', image: 'fodase',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create with existing id', async () => {
    await CreateUserService.call({
      id: 2193277610, name: 'Rot', username: 'rotcivus', image: 'fodase',
    });

    const anotherUser = await CreateUserService.call({
      id: 2193277610, name: 'Rot', username: 'rotcivus', image: 'fodase',
    });

    expect(anotherUser).toEqual(null);
  });

  afterAll(async () => {
    const AppDataSource = new DataSource(dataSourceOptions);
    await AppDataSource.initialize();
    await AppDataSource.dropDatabase();
  });
});
