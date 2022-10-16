import { Request, Response } from 'express';

import { Tweet } from '@models/Tweet';

class TweetsController {
  async index(req: Request, res: Response) {
    const tweet = await Tweet.findOne({
      where: { seen: false },
      relations: { user: true, tweet_medias: true },
    });

    if (!tweet) {
      await Tweet.createQueryBuilder().update().set({ seen: false }).execute();
    } else {
      tweet.seen = true;
      await tweet.save();
      return res.json(tweet);
    }

    const someTweet = await Tweet.findOne({
      where: { seen: false },
      relations: { user: true, tweet_medias: true },
    });
    if (!someTweet) {
      return res.status(404);
    }

    someTweet.seen = true;
    await someTweet.save();
    return res.json(someTweet);
  }
}

export default new TweetsController();
