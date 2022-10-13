import express from 'express';

import UsersController from '@controllers/UsersController';

const app = express();

app.get('/', (req, res) => res.json({ message: UsersController }));

app.listen(3333);
