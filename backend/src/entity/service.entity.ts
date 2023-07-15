import { IsDecimal, Min, Max, IsNotEmpty, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Service {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @Min(0)
  value: number;

  @ApiProperty()
  @IsDecimal()
  @Min(0)
  @Max(1)
  commission: number;
}
