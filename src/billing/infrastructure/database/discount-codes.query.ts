import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DiscountCode } from 'src/billing/application/entities/discount-code';
import { DiscountCodeNotFoundError } from 'src/billing/application/entities/errors';
import { discountCodes } from 'src/billing/schemas/discount-codes.schema';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDb } from 'src/drizzle/types/drizzle';

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

    const { code: discountCode, id, isActive, value } = records[0];

    return new DiscountCode(id, discountCode, value, isActive);
  }
}
