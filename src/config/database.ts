import { DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { Tweet } from '@models/Tweet';
import { TweetMedia } from '@models/TweetMedia';
import { User } from '@models/User';

// eslint-disable-next-line import/no-mutable-exports
let config;
const entities = [User, Tweet, TweetMedia];
if (process.env.NODE_ENV === 'test') {
  config = {
    type: 'sqlite',
    host: 'localhost',
    port: 5432,
    username: 'test',
    password: 'test',
    database: '__tests__/database.sqlite',
    synchronize: true,
    logging: false,
    entities,
    migrations: [],
    subscribers: [],
    namingStrategy: new SnakeNamingStrategy(),
  };
} else {
  config = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities,
    migrations: [],
    subscribers: [],
    namingStrategy: new SnakeNamingStrategy(),
  };
}

export default config as DataSourceOptions;
