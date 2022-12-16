import { TokenHandler } from 'src/main/utils/adapters/tokenHandler-adapter';
import { UserRepository } from 'src/database/repositories/user-repository';
import { Login } from 'src/domain/login.dto';
import { UserInput } from 'src/domain/user-input';
import { User } from 'src/domain/user.dto';
import { UserEntity } from 'src/data/entities/user-entity';

export class UserService {
  constructor(
    private readonly repository: UserRepository,
    private readonly tokenHandler: TokenHandler,
  ) {}

  async create(userbody: UserInput): Promise<User> {
    const newUser = new UserEntity(userbody);
    newUser.validate();
    const userBody = await newUser.getBody();
    return await this.repository.create(userBody);
  }

  async getOneById(userId: string): Promise<User> {
    return await this.repository.getOneById(userId);
  }

  async getOneByEmail(userEmail: string): Promise<User> {
    return await this.repository.getOneByEmail(userEmail);
  }

  async getAll(): Promise<User[]> {
    return await this.repository.getAll();
  }

  async update(userBody: User, userId: string): Promise<User> {
    const foundUser = await this.repository.getOneById(userId);
    const updatedBody = await new UserEntity(userBody).update(foundUser);
    return await this.repository.update(updatedBody);
  }

  async delete(userId: string): Promise<User> {
    return await this.repository.delete(userId);
  }

  async login(login: Login): Promise<{ token: string; user: User }> {
    const foundUser = await this.repository.getOneByEmail(login.email);
    const token = this.tokenHandler.generateToken(foundUser.id);
    return { token: token, user: foundUser };
  }
}
