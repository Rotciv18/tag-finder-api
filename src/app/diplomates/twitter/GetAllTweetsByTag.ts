import TwitterApi from './TwitterApi';

export default async (tag: string): Promise<null | any> => {
  const endpoint = 'tweets/search/recent';

  const params = {
    query: `#${tag}`,
    'tweet.fields': 'possibly_sensitive,entities,attachments',
    expansions: 'attachments.media_keys,author_id',
    'user.fields': 'name,username,profile_image_url',
    'media.fields': 'url,variants,preview_image_url',
  };

  const response = await TwitterApi.get(endpoint, { params });

  return response.status === 200 ? response.data : null;
};
