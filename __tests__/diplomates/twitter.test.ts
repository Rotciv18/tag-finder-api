import 'dotenv/config';

import GetAllTweetsByTag from '../../src/app/diplomates/twitter/GetAllTweetsByTag';

describe('Twitter API', () => {
  it('should be able to fetch tweets data', async () => {
    const tweetsData = await GetAllTweetsByTag('testefodase');

    console.log(tweetsData);
    expect(tweetsData).not.toBeNull();
  });
});
