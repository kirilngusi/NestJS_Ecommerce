import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CategoryDto {
  @IsString()
  @MinLength(4)
  @MaxLength(30)
  name: string;
}
