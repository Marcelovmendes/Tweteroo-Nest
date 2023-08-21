import { Injectable } from '@nestjs/common';
import { User } from './entities/sign.entity';
import { Tweets } from './entities/tweets.entity';

@Injectable()
export class AppService {
  private users: User[];
  private tweets: Tweets[];
  constructor() {
    this.users = [];
    this.tweets = [];
  }
  signUp(username: string, avatar: string) {
    const user = new User(username, avatar);
    this.users.push(user);
    return user;
  }
  auth(username: string): boolean {
    const access = this.users.find((user) => user.username === username);
    return !!access;
  }
  getUsers() {
    return this.users;
  }

  createTweet(username: string, tweet: string) {
    const acess = this.auth(username);
    if (!acess) throw new Error('UNAUTHORIZED');

    const result = new Tweets(username, tweet);
    this.tweets.push(result);
  }
  getTweets(page?: number) {
    if (page === undefined) {
      const lastFifteenTweets = this.tweets.slice(-15);
      if (lastFifteenTweets.length === 0) return [];

      return lastFifteenTweets.map((tweet) => {
        const user = this.users.find((u) => u.username === tweet.username);

        return {
          username: tweet.username,
          avatar: user ? user.avatar : '',
          tweet: tweet.tweet,
        };
      });
    }
    if (typeof page !== 'number' || page < 1) {
      throw new Error('Informe uma página válida!');
    }

    const tweetsPerPage = 15;
    const startIndex = (page - 1) * tweetsPerPage;
    const endIndex = startIndex + tweetsPerPage;
    const slicedTweets = this.tweets.slice(startIndex, endIndex);
    if (slicedTweets.length === 0) return [];

    return slicedTweets.map((tweet) => {
      const user = this.users.find((u) => u.username === tweet.username);
      return {
        username: tweet.username,
        avatar: user ? user.avatar : '',
        tweet: tweet.tweet,
      };
    });
  }
  getTweetsByUser(username: string) {
    const tweets = this.tweets.filter((tweet) => tweet.username === username);
    if (tweets.length === 0) return [];
    return tweets;
  }
  getHealth(): string {
    return 'OK';
  }
}
