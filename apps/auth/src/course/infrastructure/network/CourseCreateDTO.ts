import { IsString } from 'class-validator';

class CourseCreateDTO {
  @IsString()
  title: string;
  @IsString()
  subtitle: string;
  @IsString()
  description: string;
  @IsString()
  resource: string;
  @IsString()
  resourceThumbnail: string;
}

export { CourseCreateDTO };
