import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @Post('/sign-up')
  signUp(@Body() ) {
    return this.appService.signUp();
  }
  @Get('Health')
  getHealth(): string {
    return this.appService.getHealth();
  }
}
