import { HttpException } from '@nestjs/common';

export class ApiException extends HttpException {
  constructor(status: number, detail: string) {
    super({ detail, success: false }, status);
  }
}
