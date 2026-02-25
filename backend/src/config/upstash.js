import {Ratelimit} from '@upstash/ratelimit';
import {Redis} from '@upstash/redis';
import dotenv from 'dotenv';
dotenv.config({path: './env/.env'});

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN
});

// ratelimit object
// Parameters: stores a {key, limiter function}
const ratelimit = new Ratelimit({
    redis: redis, // takes in redis client
    
    // Sliding window
    // Parameters: (limit, time frame -> MUST include space)
    limiter: Ratelimit.slidingWindow(100, "60 s")
});

export default ratelimit;
