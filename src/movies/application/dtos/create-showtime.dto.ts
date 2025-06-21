import { Type } from 'class-transformer';
import { IsObject, IsUUID, Matches, ValidateNested } from 'class-validator';
import { Id } from 'src/shared/entities/id';

import { PriceDto } from './price.dto';

export class CreateShowtimeDto {
  @IsUUID()
  movieId: Id;

  @IsObject()
  @Type(() => PriceDto)
  @ValidateNested()
  price: PriceDto;

  @IsUUID()
  roomId: Id;

  @Matches(/^\d{2}:\d{2}$/, { message: 'Must be in the format NN:NN' })
  startTime: string;
}
