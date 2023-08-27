import Redis from 'ioredis';
import log from './logger.helper';

export class RedisHelper {
  client?: Redis;
  connect = false;
  private static instance: RedisHelper;

  public static getInstance(): RedisHelper {
    if (!RedisHelper.instance) {
      RedisHelper.instance = new RedisHelper();
      RedisHelper.instance.init();
    }

    return RedisHelper.instance;
  }

  init() {
    this.client = new Redis({
      host: process.env.REDIS_HOST || '127.0.0.1',
      port: (process.env.REDIS_PORT || 6379) as number,
      ...(process.env.REDIS_PASSWORD) && {password: process.env.REDIS_PASSWORD},
      ...(process.env.REDIS_USERNAME) && {username: process.env.REDIS_USERNAME},
    });
    this.client.on('connect', () => {
      this.connect = true;
      console.log('connected to redis')
    });

    this.client.on('error', (err) => {
      if (this.connect) {
        this.connect = false;
        log.error(`Redis error:::: ${err.message}`, err);
      }
    });
  }

  set(key: string, value: any, exp: number) {
    if (this.client === null) this.init();
    this.client?.set(key, value, "EX", exp);
  }

  remove(key: string) {
    if (this.client === null) this.init();
    this.client?.del(key);
  }

  get(key: string, callback: (...args: any[]) => void) {
    if (this.client === null) this.init();
    return this.client?.get(key, callback);
  }

  quit() {
    this.client?.disconnect();
    this.client?.quit();
  }
}

// Using a single function to handle multiple signals
const handle = (signal: any) => {
  RedisHelper.getInstance().quit();
  process.exit(signal);
}

process.on('SIGINT', handle);
process.on('SIGTERM', handle);