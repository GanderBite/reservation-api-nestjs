import { HttpException } from '@nestjs/common';

export class ApiException extends HttpException {
  constructor(status: number, detail: string) {
    super({ success: false, detail }, status);
  }
}
