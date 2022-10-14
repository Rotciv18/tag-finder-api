import { User } from '@models/User';

interface IUser {
  id: number;
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

    Object.assign(newUser, userParams);
    await newUser.save();

    return newUser;
  }
}

export default new CreateUserService();
