import { Document, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CourseRepository } from '../../domain/CourseRepository';
import { Course } from '../../domain/Course';
import { Id } from '~shared/domain';

type CourseDocument = Document<string> & Course;

@Injectable()
class CourseMongoRepository implements CourseRepository {
  constructor(@InjectModel(Course.name) private schema: Model<Course>) {}

  async read(): Promise<Course[]> {
    const response = await this.schema.find<CourseDocument>();
    return response.map(this.factory);
  }

  async save(course: Course): Promise<void> {
    const {
      id,
      title,
      subtitle,
      description,
      instructorId,
      resource,
      resourceThumbnail,
      url,
    } = course;

    await new this.schema({
      _id: id.value,
      title,
      subtitle,
      description,
      instructorId: instructorId.value,
      resource,
      resourceThumbnail,
      url,
    }).save();
  }

  async readById(id: string): Promise<Course | undefined> {
    const response = await this.schema.findById<CourseDocument>(id);

    return this.factory(response);
  }

  async readByUrl(url: string): Promise<Course> {
    const response = await this.schema.findOne<CourseDocument>({ url });

    return this.factory(response);
  }

  private factory(document: CourseDocument): Course | undefined {
    if (document) {
      return new Course(
        new Id(document._id),
        document.title,
        document.subtitle,
        document.description,
        new Id(document.instructorId as unknown as string),
        document.resource,
        document.resourceThumbnail,
        document.url,
      );
    }
  }
}

export { CourseMongoRepository };
