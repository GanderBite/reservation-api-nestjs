import { IsNumber, IsPositive, IsString, Length } from 'class-validator';

export class CreatePriceDto {
  @IsString()
  @Length(1, 30)
  category: string;

  @IsString()
  @Length(3, 3)
  currency: string;

  @IsNumber()
  @IsPositive()
  value: number;
}
