import { Router } from 'express';

import TweetsController from '@controllers/TweetsController';

const routes = Router();

routes.get('/tweets/next', TweetsController.index);

export default routes;
