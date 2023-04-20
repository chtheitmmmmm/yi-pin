import { Controller, Get } from '@nestjs/common';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get("hw")
  getHelloWorld() {
    return ApiService.getHelloWorld()
  }
}
