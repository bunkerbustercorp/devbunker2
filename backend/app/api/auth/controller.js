const Test = require('./../../models/test');

module.exports = {
    login: async (ctx, next) => {
        try{
            const result = await Test.findOne();

            ctx.body = result.test;
        } catch (e) {
            console.log(e);
            ctx.status = 400;
            ctx.body = {
                message: 'error occurred'
            }
        }
    }
}