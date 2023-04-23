import {
  ArgumentMetadata,
  BadRequestException,
  Controller,
  Get, Header,
  Injectable,
  PipeTransform,
  Post, Req,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ObjectSchema } from 'joi';
import { Request } from 'express';

@Injectable()
export class JoiValidationPipe implements PipeTransform {

  constructor(private schema: ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value);
    if (error) {
      throw new BadRequestException(error.message);
    }
    return value;
  }
}
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * The hello world api
   */
  @Get("api/hw")
  getHelloWorld(): string {
    return "Hello world"
  }
}
