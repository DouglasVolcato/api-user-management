import { TokenHandler } from 'src/main/utils/adapters/tokenHandler-adapter';
import { UserRepository } from 'src/database/repositories/user-repository';
import { AuthMiddleware } from 'src/presentation/middlewares/auth/auth-middleware';

export function makeAuthMiddleware(): AuthMiddleware {
  const userRepository = new UserRepository();
  const tokenHandler = new TokenHandler(userRepository);
  return new AuthMiddleware(tokenHandler);
}
