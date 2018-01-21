import * as chai from 'chai'
import * as chaiAsPromised from 'chai-as-promised'
import * as redis from 'redis'
import {expect} from 'chai'

import {SessionService} from '.'

chai.use(chaiAsPromised)

let redisClient: redis.RedisClient
let sessionService: SessionService

before(() => {
  redisClient = redis.createClient({
    enable_offline_queue: false,
    prefix: 'test:',
  })
  sessionService = new SessionService(redisClient)

  // Wait until redis connection is fully established
  return new Promise((resolve, _reject) => {
    redisClient.on('ready', resolve)
  })
})

after(() => {
  redisClient.del('test')
  redisClient.quit()
})

describe('SessionService', () => {
  describe('redis online', () => {
    describe('set', () => {})

    describe('get', () => {})

    describe('unset', () => {})

    describe('refresh', () => {})

    describe('exists', () => {})
  })

  describe('redis offline', () => {
    describe('set', () => {})

    describe('get', () => {})

    describe('unset', () => {})

    describe('refresh', () => {})

    describe('exists', () => {})
  })
})
