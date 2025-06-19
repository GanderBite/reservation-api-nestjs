import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { SignUpDto } from './auth.dtos';
import { Identity } from './decorators/identity.decorator';
import { IdentityPayload } from './entities/identity-payload';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  @UseGuards(AuthGuard('local'))
  signIn(@Identity() identity: IdentityPayload) {
    return this.authService.signIn(identity);
  }

  @Post('sign-up')
  async signUp(@Body() body: SignUpDto) {
    return this.authService.signUp(body);
  }
}
