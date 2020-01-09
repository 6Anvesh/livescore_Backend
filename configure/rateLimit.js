const redisHelper=require('../controllers/redisOperations')

module.exports=(params={})=>{

    return async(req,res,next)=>{
        if(!redisHelper.connection) next();
        // const clientIP = ((req.headers['x-forwarded-for'] || '').split(',').pop() || req.connection.remoteAddress);
        // let key = `${(clientIP == '::1' || clientIP == '::ffff:127.0.0.1') ? '127.0.0.1' : clientIP}`;
        let defaults={
            time:60, //in sec
            allowedLimit:100,
            key:'lokaUser1',
            message:"please try after sometime"
        };
        try{
            let options = Object.assign({}, defaults, params, req.rate_limit || {});
            options.key = 'Rate_Limit_' + options.key;
            const attempts = await redisHelper.operations(options.key).get();
            if (attempts >= options.allowedLimit) {
                let err = new Error();
                err.code = 'HTTP_TOO_MANY_REQUESTS';
                err.message = options.message;
                return res.status(429).json(err);
            }
            req.rateLimit = async () => {
                const attempts = await redisHelper.operations(options.key).increase();
                console.log("ratekey",options.key,attempts)
                if (attempts === 1) {
                    await redisHelper.operations(options.key).expire(options.time);
                }
                return (options.allowedLimit - attempts);
            };
            next();


        }catch(err){
         next();
        }
    }
}