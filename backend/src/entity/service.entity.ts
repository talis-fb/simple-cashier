import { IsDecimal, Min, Max, IsNotEmpty, IsPositive, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Service {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @Min(0)
  value: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  commission: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  tip: number;
}
