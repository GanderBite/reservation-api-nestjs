import { Type } from 'class-transformer';
import {
  IsNumber,
  IsObject,
  IsPositive,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';

import { PriceDto } from './price.dto';

export class CreateSeatDto {
  @IsNumber()
  @IsPositive()
  col: number;

  @IsObject()
  @Type(() => PriceDto)
  @ValidateNested()
  price: PriceDto;

  @IsString()
  @Length(1, 1)
  row: string;
}
