import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SignUpDto } from './auth.dtos';
import { AuthService } from './services/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Identity } from './decorators/identity.decorator';
import { IdentityPayload } from './entities/identity-payload';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('sign-up')
  async signUp(@Body() body: SignUpDto) {
    return this.authService.signUp(body);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('local'))
  @Post('sign-in')
  signIn(@Identity() identity: IdentityPayload) {
    return this.authService.signIn(identity);
  }
}
