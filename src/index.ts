import * as redis from 'redis'

export class SessionService {
  private client: redis.RedisClient
  private ttl: number

  constructor(redisClient: redis.RedisClient, ttl: number = 3600) {
    // NOTE: redis client should be created with options
    // enable_offline_queue: false
    // to avoid blocking request
    this.client = redisClient
    this.ttl = ttl
  }

  async set(key: string, payload: any = '') {
    return new Promise<void>((resolve, reject) => {
      return this.client.setex(
        key,
        this.ttl,
        JSON.stringify(payload),
        (error) => {
          if (error) {
            return reject(error)
          }
          return resolve()
        }
      )
    })
  }

  async get(key: string) {
    return new Promise<any>((resolve, reject) => {
      return this.client.get(key, (error, value) => {
        if (error) {
          return reject(error)
        }
        return resolve(JSON.parse(value))
      })
    })
  }

  async unset(key: string) {
    return new Promise<void>((resolve, reject) => {
      return this.client.del(key, (error) => {
        if (error) {
          return reject(error)
        }
        return resolve()
      })
    })
  }

  async refresh(key: string) {
    return new Promise<void>((resolve, reject) => {
      return this.client.expire(key, this.ttl, (error) => {
        if (error) {
          return reject(error)
        }
        return resolve()
      })
    })
  }

  async exists(key: string) {
    return new Promise<boolean>((resolve, reject) => {
      return this.client.exists(key, (error, reply) => {
        if (error) {
          return reject(error)
        }

        if (reply > 0) {
          return resolve(true)
        }
        return resolve(false)
      })
    })
  }
}
