import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JWTAuthGuard } from 'src/auth/guards/auth-jwt.quard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateDiscountCodeDto } from 'src/billing/application/dtos/create-discount-code.dto';
import {
  DiscountCodeActivationError,
  DiscountCodeDeactivationError,
  DiscountCodeNotFoundError,
} from 'src/billing/application/entities/errors';
import { Id } from 'src/shared/entities/id';
import { Response } from 'src/shared/types/response.type';

import { DiscountCodesService } from '../services/discount-codes.service';

@Controller('discount-codes')
export class DiscountCodesController {
  constructor(private discountCodesService: DiscountCodesService) {}

  @Put('/:discountCodeId/activate')
  @UseGuards(JWTAuthGuard, RolesGuard('ADMIN'))
  async activate(
    @Param('discountCodeId') discountCodeId: Id,
  ): Promise<Response<true>> {
    try {
      await this.discountCodesService.activateDiscountCode(discountCodeId);
      return { data: true };
    } catch (err) {
      if (err instanceof DiscountCodeNotFoundError) {
        throw new NotFoundException(err.message);
      }
      if (err instanceof DiscountCodeActivationError) {
        throw new BadRequestException(err.message);
      }

      throw new InternalServerErrorException(err);
    }
  }

  @Post()
  @UseGuards(JWTAuthGuard, RolesGuard('ADMIN'))
  async create(@Body() body: CreateDiscountCodeDto): Promise<Response<Id>> {
    const id = await this.discountCodesService.createDiscount(body);
    return { data: id };
  }

  @Put('/:discountCodeId/deactivate')
  @UseGuards(JWTAuthGuard, RolesGuard('ADMIN'))
  async deactivate(
    @Param('discountCodeId') discountCodeId: Id,
  ): Promise<Response<true>> {
    try {
      await this.discountCodesService.deactivateDiscountCode(discountCodeId);
      return { data: true };
    } catch (err) {
      if (err instanceof DiscountCodeNotFoundError) {
        throw new NotFoundException(err.message);
      }
      if (err instanceof DiscountCodeDeactivationError) {
        throw new BadRequestException(err.message);
      }

      throw new InternalServerErrorException(err);
    }
  }
}
