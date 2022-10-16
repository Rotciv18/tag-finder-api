import { Tweet } from '@models/Tweet';
import { User } from '@models/User';

interface ITweet {
  id: string,
  message: string
}

class CreateTweetService {
  async call(tweetParams: ITweet, user: User): Promise<null | Tweet> {
    const tweetExists = await Tweet.findOneBy({ id: tweetParams.id });
    if (tweetExists) return null;

    const newTweet = new Tweet();
    Object.assign(newTweet, { ...tweetParams, user });

    await newTweet.save();

    return newTweet;
  }
}

export default new CreateTweetService();
