import ITweetDTO from 'src/interfaces/TweetDTO';

import { Tweet } from '@models/Tweet';
import { User } from '@models/User';
import CreateTweetMediaService from '@services/TweetMedias/CreateTweetMediaService';
import CreateTweetService from '@services/Tweets/CreateTweetService';

import CreateUserService from '../CreateUserService';

class CreateUserTweetService {
  async call(tweetData: ITweetDTO) {
    const { media, users } = tweetData.includes;
    if (!users) return;

    /* Criando primeiro todos os usuários para não haver conflito
       e não haver possibilidade de criar o mesmo usuário duas vezes ao mesmo tempo
    */
    const createUsersPromises = users.map(async (userData) => {
      const userExists = await User.findOneBy({ id: userData.id });
      if (userExists) return;

      await CreateUserService.call({ ...userData, image: userData.profile_image_url });
    });
    await Promise.all(createUsersPromises);

    const processPromises = tweetData.data.map(async (tweet) => {
      const tweetExists = await Tweet.findOneBy({ id: tweet.id });
      if (tweetExists) return;

      const user = await User.findOneBy({ id: tweet.author_id });
      if (!user) {
        return;
      }

      const newTweet = { id: tweet.id, message: tweet.text.split('https')[0] };
      const userTweet = await CreateTweetService.call(newTweet, user);

      if (!userTweet) return;

      // Tweet has media
      if (tweet.entities.urls && media) {
        const tweetMediaPromises = tweet.entities.urls.map(async (url) => {
          const tweetMedia = media.find((twtMedia) => twtMedia.media_key === url.media_key);
          if (!tweetMedia) return;

          const newTweetMedia = {
            id: tweetMedia.media_key,
            type: tweetMedia.type,
            url: tweetMedia.url,
          };

          await CreateTweetMediaService.call(newTweetMedia, userTweet);
        });

        await Promise.all(tweetMediaPromises);
      }
    });

    await Promise.all(processPromises);
  }
}

export default new CreateUserTweetService();
