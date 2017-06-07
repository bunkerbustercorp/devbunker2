const Post = require('../../models/Post');

module.exports = {
    getpost: async (ctx, next) => {
        const data = await Post.find().sort({'releaseDate': -1});
        ctx.body = data
    },
    getpostbyuserid: async (ctx, next) => {
        const { userId } = ctx.params;
        const data = await Post.findByUserId(userId);
        ctx.body = data
    },
    getpostbypostid: async (ctx, next) => {
        const { postId } = ctx.params;
        console.log(postId);
        const data = await Post.findOne({_id: postId}).exec();
        ctx.body = data
    },
    deletepost: async (ctx, next) => {
        const { postId } = ctx.params;
        const data = await Post.findOne({_id: postId}).remove().exec();
        console.log(data);
        ctx.body = data
    }
}