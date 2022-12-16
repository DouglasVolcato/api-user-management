import { Hasher } from 'src/main/utils/adapters/hasher-adapter';
import { IdGenerator } from 'src/main/utils/adapters/idGenerator-adapter';
import { UserInput } from 'src/domain/user-input';
import { User } from 'src/domain/user.dto';

export class UserEntity {
  constructor(private readonly user: UserInput) {}

  validate(): void {
    if (!this.user.name) {
      throw new Error('Missing user name.');
    }
    if (!this.user.email) {
      throw new Error('Missing user email.');
    }
    if (!this.user.password) {
      throw new Error('Missing user password.');
    }
  }

  async getBody(): Promise<User> {
    const generatedId = new IdGenerator().generateId();
    const hashedPassword = await new Hasher().hashPassword(
      this.user.password,
      10,
    );

    return {
      id: generatedId,
      name: this.user.name,
      email: this.user.email,
      password: hashedPassword,
      role: 'user',
    };
  }

  async update(user: User) {
    const hashedPassword = await new Hasher().hashPassword(
      this.user.password ?? user.password,
      10,
    );

    return {
      id: user.id,
      name: this.user.name ?? user.name,
      email: this.user.email ?? user.email,
      password: hashedPassword,
      role: user.role,
    };
  }
}
