import {Ratelimit} from '@upstash/ratelimit';
import {Redis} from '@upstash/redis';
import dotenv from 'dotenv';
dotenv.config({path: './env/.env'});

// ratelimit object
// Parameters: stores a {key, limiter function}
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(), // api key
    
    // Parameters: (limit, time frame -> MUST include space)
    // NOTE: sliding window
    limiter: Ratelimit.slidingWindow(10,"20 s")
});

export default ratelimit;
