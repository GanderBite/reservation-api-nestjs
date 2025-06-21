import {
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class CreateSeatDto {
  @IsNumber()
  @IsPositive()
  col: number;

  @IsUUID()
  roomId: string;

  @IsString()
  @Length(1, 1)
  row: string;
}
