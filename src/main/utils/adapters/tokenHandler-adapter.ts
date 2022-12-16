import * as jwt from 'jsonwebtoken';
import { UserRepository } from 'src/database/repositories/user-repository';
import { User } from 'src/domain/user.dto';
import { EnvVars } from './envVars-adapter';

export class TokenHandler {
  constructor(private readonly userRepository: UserRepository) {}

  generateToken(userId: string): string {
    return jwt.sign({ id: userId }, new EnvVars().secret, {
      expiresIn: 86400,
    });
  }

  async validateToken(token: string): Promise<User> {
    let mainUser: User;
    await jwt.verify(
      token,
      new EnvVars().secret,
      async (error, decoded: { id: string }) => {
        try {
          if (error) {
            throw new Error('Invalid Token');
          }

          const user = await this.userRepository.getOneById(decoded.id);

          if (!user || !user.id) {
            throw new Error('Invalid Token');
          }

          mainUser = user;
          return;
        } catch (error) {
          throw new Error('Invalid Token');
        }
      },
    );
    return mainUser;
  }
}
