import { TokenHandler } from 'src/main/utils/adapters/tokenHandler-adapter';
import { UserController } from 'src/presentation/controllers/user/user-controller';
import { UserRepository } from 'src/database/repositories/user-repository';
import { UserService } from 'src/data/services/user-service';
import { AuthMiddleware } from 'src/presentation/middlewares/auth/auth-middleware';

export function makeUserController(): UserController {
  const userRepository = new UserRepository();
  const tokenHandler = new TokenHandler(userRepository);
  const userService = new UserService(userRepository, tokenHandler);
  const authMiddleware = new AuthMiddleware(tokenHandler);
  return new UserController(userService, authMiddleware);
}
