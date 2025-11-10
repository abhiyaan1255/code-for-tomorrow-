import { IsEnum, IsNotEmpty, IsString, ValidateNested, ArrayNotEmpty, ArrayMinSize, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export enum ServiceType {
  Normal = 'Normal',
  VIP = 'VIP',
}

export enum PriceType {
  Hourly = 'Hourly',
  Weekly = 'Weekly',
  Monthly = 'Monthly',
}

class PriceOptionDto {
  @IsString()
  @IsNotEmpty()
  duration: string;

  @IsNotEmpty()
  price: number;

  @IsEnum(PriceType)
  type: PriceType;
}

export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(ServiceType)
  type: ServiceType;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PriceOptionDto)
  priceOptions: PriceOptionDto[];
}