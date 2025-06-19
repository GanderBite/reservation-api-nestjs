import { Inject, Injectable } from '@nestjs/common';
import { IAuthRepository } from './auth.repository.type';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDb } from 'src/drizzle/types/drizzle';
import { identities } from '../schemas/identity.schema';
import { Email } from 'src/shared/entities/email';
import { Id } from 'src/shared/entities/id';
import { eq } from 'drizzle-orm';
import { Identity } from '../entities/identity';
import { UserRoles } from '../entities/user-roles';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(@Inject(DRIZZLE) private db: DrizzleDb) {}

  async insertUser(email: Email, password: string): Promise<Id> {
    const [created] = await this.db
      .insert(identities)
      .values({ email, password, roles: ['USER'] })
      .returning({ id: identities.id });

    return created.id;
  }

  async getByEmail(email: Email) {
    const records = await this.db
      .select()
      .from(identities)
      .where(eq(identities.email, email));

    if (!records.length) return null;

    const { id, email: identityEmail, password, roles } = records[0];

    return new Identity(id, identityEmail, password, roles as UserRoles);
  }
}
