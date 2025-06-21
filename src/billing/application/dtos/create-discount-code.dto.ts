import {
  IsNumber,
  IsPositive,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateDiscountCodeDto {
  @IsString()
  @Length(3, 10)
  code: string;

  @IsNumber()
  @IsPositive()
  @Max(100)
  @Min(1)
  value: number;
}
