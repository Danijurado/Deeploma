import {
  Get,
  Controller,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { InstructorReadByIdQuery } from '../../application/read/InstructorReadByIdQuery';

@Controller('instructors')
class InstructorGetController {
  constructor(private readonly querybus: QueryBus) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<string> {
    const query = new InstructorReadByIdQuery(id);

    const response = await this.querybus.execute(query);

    return response;
  }
}

export { InstructorGetController };
