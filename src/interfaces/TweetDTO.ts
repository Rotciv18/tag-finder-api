interface ITweetDTO {
  data: {
    id: string,
    text: string,
    author_id: string,
    possibly_sensitive: boolean,
    entities: {
      urls?: {
        media_key: string
      }[]
    }
  }[],
  includes: {
    media?: {
      media_key: string,
      url: string,
      type: string
    }[],
    users: {
      username: string,
      name: string,
      id: string,
      profile_image_url: string
    }[]
  }
}

export default ITweetDTO;
