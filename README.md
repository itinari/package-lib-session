# lib-session

Manage user session in redis

## Usage

```typescript
import * as redis from 'redis'
import {SessionService} from '@itinari/session'

const redisClient = redis.createClient({
  enable_offline_queue: false,
})
const sessionService = new SessionService(redisClient, 3600)

// create/update session
try {
  await sessionService.set('key', {foo: 'bar'})
} catch (error) {
  // ...
}

// get session data
try {
  const data = await sessionService.get('key')
} catch (error) {
  // ...
}

// destroy session
try {
  await sessionService.unset('key')
} catch (error) {
  // ...
}

// refresh session
try {
  await sessionService.refresh('key')
} catch (error) {
  // ...
}

// exists
try {
  const exists = await sessionService.exists('key')
  if (exists) {
    // ...
  } else {
    // ...
  }
} catch (error) {
  // ...
}
```
