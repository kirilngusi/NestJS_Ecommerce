import {
  IsEmail,
  IsNumber,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ProductDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  name: string;

  @IsNumber()
  price: number;

  @IsNumber()
  priceSale: number;

  @IsNumber()
  Sold: number;

  @IsNumber()
  In_Stock: number;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  description: string;
}
