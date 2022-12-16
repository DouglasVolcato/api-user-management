import { v4 as uuid } from 'uuid';

export class IdGenerator {
  generateId(): string {
    return uuid();
  }
}
