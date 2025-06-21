import { IsNumber, IsPositive, IsString, Length } from 'class-validator';

export class CreateSeatDto {
  @IsNumber()
  @IsPositive()
  col: number;

  @IsString()
  @Length(1, 1)
  row: string;
}
