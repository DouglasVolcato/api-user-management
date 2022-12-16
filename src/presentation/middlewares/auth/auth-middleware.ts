import { TokenHandler } from 'src/main/utils/adapters/tokenHandler-adapter';
import { User } from 'src/domain/user.dto';

export class AuthMiddleware {
  constructor(private readonly tokenHandler: TokenHandler) {}

  async auth(httpRequest: any): Promise<User> {
    try {
      const authorization = httpRequest.authorization;

      if (!authorization) {
        throw new Error('Invalid Token');
      }

      const split = authorization.split(' ');

      if (!split || split[0] !== 'Bearer' || split.length !== 2) {
        throw new Error('Invalid Token');
      }

      const user = await this.tokenHandler.validateToken(split[1]);

      return user;
    } catch (error) {
      throw new Error('Invalid Token');
    }
  }
}
