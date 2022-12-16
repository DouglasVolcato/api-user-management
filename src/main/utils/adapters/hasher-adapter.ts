import { hash, compare } from 'bcryptjs';

export class Hasher {
  async hashPassword(password: string, salt: number): Promise<string> {
    return await hash(password, salt);
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return await compare(password, hashedPassword);
  }
}
