import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreatePostInput {
  @IsString()
  content: string;

  @IsString()
  title: string;
}
