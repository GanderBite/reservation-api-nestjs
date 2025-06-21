import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DatabaseError } from 'pg';
import { CreateDiscountCodeDto } from 'src/billing/application/dtos/create-discount-code.dto';
import { DiscountCode } from 'src/billing/application/entities/discount-code';
import {
  DiscountCodeAlreadyExistsError,
  DiscountCodeNotFoundError,
} from 'src/billing/application/entities/errors';
import { IDiscountCodesRepository } from 'src/billing/application/repositories/discount-codes.repository.type';
import { discountCodes } from 'src/billing/schemas/discount-codes.schema';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDb } from 'src/drizzle/types/drizzle';
import { Id } from 'src/shared/entities/id';

@Injectable()
export class DiscountCodesRepository implements IDiscountCodesRepository {
  constructor(@Inject(DRIZZLE) private db: DrizzleDb) {}
  async getById(id: Id): Promise<DiscountCode> {
    const records = await this.db
      .select()
      .from(discountCodes)
      .where(eq(discountCodes.id, id));

    if (!records.length) {
      throw new DiscountCodeNotFoundError(id);
    }

    const { code, id: discountCodeId, isActive, value } = records[0];

    return new DiscountCode(discountCodeId, code, value, isActive);
  }

  async insertDiscountCode({
    code,
    value,
  }: CreateDiscountCodeDto): Promise<Id> {
    try {
      const [created] = await this.db
        .insert(discountCodes)
        .values({
          code,
          value,
        })
        .returning({ id: discountCodes.id });

      return created.id;
    } catch (err) {
      const error = err as { cause: DatabaseError };
      switch (error.cause.code) {
        case '23505':
          throw new DiscountCodeAlreadyExistsError(code);
        default:
          throw err;
      }
    }
  }

  async updateDiscountCode(
    discountCodeId: Id,
    discountCode: DiscountCode,
  ): Promise<void> {
    try {
      await this.db
        .update(discountCodes)
        .set({
          code: discountCode.getCode(),
          isActive: discountCode.getIsActive(),
          value: discountCode.getValue(),
        })
        .where(eq(discountCodes.id, discountCodeId));
    } catch (err) {
      const error = err as { cause: DatabaseError };
      console.log(error.cause.code);
    }
  }
}
