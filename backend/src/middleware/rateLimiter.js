import ratelimit from '../config/upstash.js';

const rateLimiter = async (req,res, next) => {
    try {
        const {success} = await ratelimit.limit("my-limit-key");

        if (!success) {
            return res.status(429).json({
                message:"Too many requests, please try again later!"
            });
        }
        next();
    } catch (error) {
        console.log("Rate limit error", error);
        
        // if error: 
        // passing 'error' as an arg bypasses the controllers and routes and
        //  express hijacks the request route to a global error handler
        next(error);
    }
}

export default rateLimiter;