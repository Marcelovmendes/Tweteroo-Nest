import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { SignDto } from './dtos/sign.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/sign-up')
  @HttpCode(200)
  signUp(@Body() body: SignDto) {
    const { username, avatar } = body;
    return this.appService.signUp(username, avatar);
  }
  @Get('/tweets')
  getTweets(@Query('page') page?: number) {
    return this.appService.getTweets(page);
  }
  @Get('/tweets/:username')
  getTweetsByUser(@Param('username') username: string) {
    return this.appService.getTweetsByUser(username);
  }

  @Get('Health')
  getHealth(): string {
    return this.appService.getHealth();
  }
}
