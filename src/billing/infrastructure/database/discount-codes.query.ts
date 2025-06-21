import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DiscountCode } from 'src/billing/application/entities/discount-code';
import { DiscountCodeNotFoundError } from 'src/billing/application/entities/errors';
import { discountCodes } from 'src/billing/schemas/discount-codes.schema';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDb } from 'src/drizzle/types/drizzle';
import { Id } from 'src/shared/entities/id';

@Injectable()
export class DiscountCodesQuery {
  constructor(@Inject(DRIZZLE) private db: DrizzleDb) {}

  async getByCode(code: string): Promise<DiscountCode> {
    const records = await this.db
      .select()
      .from(discountCodes)
      .where(eq(discountCodes.code, code));
    if (!records.length) {
      throw new DiscountCodeNotFoundError(code);
    }

    const { code: discountCode, id, value } = records[0];

    return new DiscountCode(id, discountCode, value);
  }

  async getById(id: Id): Promise<DiscountCode> {
    const records = await this.db
      .select()
      .from(discountCodes)
      .where(eq(discountCodes.code, id));

    if (!records.length) {
      throw new DiscountCodeNotFoundError(id);
    }

    const { code, id: discountCodeId, value } = records[0];

    return new DiscountCode(discountCodeId, code, value);
  }
}
