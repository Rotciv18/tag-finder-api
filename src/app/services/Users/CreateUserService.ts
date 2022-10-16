import { User } from '@models/User';

interface IUser {
  id: string;
  name: string;
  username: string;
  image: string;
}

class CreateUserService {
  async call(userParams: IUser): Promise<null | User> {
    const existingUser = await User.findOneBy({ id: userParams.id });

    if (existingUser) {
      return null;
    }

    const newUser = new User();

    userParams.image = userParams.image.replace('_normal', '');

    Object.assign(newUser, userParams);
    await newUser.save();

    return newUser;
  }
}

export default new CreateUserService();
