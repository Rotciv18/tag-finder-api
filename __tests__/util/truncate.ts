import { Tweet } from '../../src/app/models/Tweet';
import { TweetMedia } from '../../src/app/models/TweetMedia';
import { User } from '../../src/app/models/User';

export default async (): Promise<void> => {
  await TweetMedia.clear();
  await Tweet.clear();
  await User.clear();
};
