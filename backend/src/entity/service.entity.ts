import { IsDecimal, Min, Max, IsNotEmpty, IsPositive } from 'class-validator';

export class Service {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  title: string;

  @Min(0)
  value: number;

  @IsDecimal()
  @Min(0)
  @Max(1)
  commission: number;
}
