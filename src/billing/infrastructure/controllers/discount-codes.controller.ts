import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JWTAuthGuard } from 'src/auth/guards/auth-jwt.quard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateDiscountCodeDto } from 'src/billing/application/dtos/create-discount-code.dto';
import { Id } from 'src/shared/entities/id';
import { Response } from 'src/shared/types/response.type';

import { DiscountCodesService } from '../services/discount-codes.service';

@Controller('discount-codes')
export class DiscountCodesController {
  constructor(private discountCodesService: DiscountCodesService) {}

  @Post()
  @UseGuards(JWTAuthGuard, RolesGuard('ADMIN'))
  async create(@Body() body: CreateDiscountCodeDto): Promise<Response<Id>> {
    const id = await this.discountCodesService.createDiscount(body);
    return { data: id };
  }
}
