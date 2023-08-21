import { IsString } from "class-validator";

export class TweetDto {
    @IsString({  message: 'All fields are required!'})
    username: string;

    @IsString({  message: 'All fields are required!'})
    tweet: string;
}