import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { SignDto } from './dtos/sign.dto';
import { TweetDto } from './dtos/tweets.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/sign-up')
  @HttpCode(200)
  signUp(@Body() body: SignDto) {
    const { username, avatar } = body;

    if (!username || !avatar) {
      throw new HttpException('All fields are required!', HttpStatus.BAD_REQUEST);
    }
    return this.appService.signUp(username, avatar);
  }
  @Post('/tweets')
  createTweet(@Body() body: TweetDto) {
    const { username, tweet } = body;

    return this.appService.createTweet(username, tweet);
  }
  @Get('/tweets')
  getTweets(@Query('page') page?: number) {
    return this.appService.getTweets(page);
  }
  @Get('/tweets/:username')
  getTweetsByUser(@Param('username') username: string) {
    return this.appService.getTweetsByUser(username);
  }

  @Get()
  getHealth(): string {
    return this.appService.getHealth();
  }
}
