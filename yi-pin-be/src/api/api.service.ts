import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiService {
  public static getHelloWorld() {
    return "hello world"
  }
}
