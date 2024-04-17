import { IsOptional, IsString } from 'class-validator';

class InstructorDTO {
  @IsString()
  name: string;
  @IsString()
  profession: string;
  @IsString()
  @IsOptional()
  photo?: string;
  @IsString()
  description: string;
}

export { InstructorDTO };
