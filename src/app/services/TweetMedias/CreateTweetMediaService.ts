import { Tweet } from '@models/Tweet';
import { TweetMedia } from '@models/TweetMedia';

interface ITweetMedia {
  id: string,
  type: string,
  url: string
}

class CreateTweetMediaService {
  async call(tweetMediaParams: ITweetMedia, tweet: Tweet): Promise<TweetMedia | null> {
    const tweetMediaExists = await TweetMedia.findOneBy({ id: tweetMediaParams.id });
    if (tweetMediaExists) return null;

    const newTweetMedia = new TweetMedia();
    Object.assign(newTweetMedia, { ...tweetMediaParams, tweet });

    await newTweetMedia.save();

    return newTweetMedia;
  }
}

export default new CreateTweetMediaService();
