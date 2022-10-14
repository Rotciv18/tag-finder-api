import 'reflect-metadata';
import { DataSource } from 'typeorm';

import dataSourceConfig from '@config/database';

const AppDataSource = new DataSource(dataSourceConfig);

AppDataSource.initialize()
  .then(async () => {
    // console.log('DB successfully connected');
  })
  .catch((error) => console.log(error));

export default AppDataSource;
