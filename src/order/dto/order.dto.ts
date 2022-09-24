import {
  IsEmail,
  IsNumber,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  IsDate,
  IsBoolean
} from 'class-validator';

export class OrderDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  name: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phone_number: string;

  @IsString()
  @MinLength(8)
  @MaxLength(100)
  address: string;

  @IsString()
  @MinLength(8)
  @MaxLength(100)
  note: string;

  @IsDate()
  createdAt: Date;

  @IsNumber()
  total_money: number;
}
