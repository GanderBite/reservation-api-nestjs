import { IsNumber, IsPositive, IsString, Length } from 'class-validator';

export class PriceDto {
  @IsString()
  @Length(3, 3)
  currency: string;

  @IsNumber()
  @IsPositive()
  value: number;
}
