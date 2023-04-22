import {
  ArgumentMetadata,
  BadRequestException,
  Controller,
  Get,
  Injectable,
  PipeTransform,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ObjectSchema } from 'joi';

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

@Controller("api")
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * The hello world api
   */
  @Get("hw")
  getHelloWorld(): string {
    return "Hello world"
  }

  /**
   * The user register api
   */

}
