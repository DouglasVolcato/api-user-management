import { User } from 'src/domain/user.dto';
import { prismaDatabase } from '../prisma-database';

export class UserRepository {
  async create(userbody: User): Promise<User> {
    return await prismaDatabase.user.create({
      data: userbody,
      include: { categoryId: true },
    });
  }

  async getOneById(userId: string): Promise<User> {
    return await prismaDatabase.user.findUnique({
      where: { id: userId },
      include: { categoryId: true },
    });
  }

  async getOneByEmail(useremail: string): Promise<User> {
    return await prismaDatabase.user.findUnique({
      where: { email: useremail },
      include: { categoryId: true },
    });
  }

  async getAll(): Promise<User[]> {
    return await prismaDatabase.user.findMany({
      include: { categoryId: true },
    });
  }

  async update(userBody: User): Promise<User> {
    return await prismaDatabase.user.update({
      data: userBody,
      where: { id: userBody.id },
      include: { categoryId: true },
    });
  }

  async delete(userId: string): Promise<User> {
    return await prismaDatabase.user.delete({
      where: { id: userId },
      include: { categoryId: true },
    });
  }
}
