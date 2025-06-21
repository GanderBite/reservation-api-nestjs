import {
  IsInt,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateMovieDto {
  @IsInt()
  @IsPositive()
  duration: number;

  @IsString()
  @MaxLength(50)
  @MinLength(3)
  title: string;
}
