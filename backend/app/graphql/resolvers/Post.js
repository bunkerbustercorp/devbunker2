const Post = require('../../models/Post');
const User = require('../../models/User');

const removeMd = require('remove-markdown');

const attributes = [
    'title', 
    'content', 
    'releaseDate', 
    'userId', 
    'isTemp'
];

async function getPost({userId, id}) {

    const post = await Post.findById(id);

    if(!post) {
        return null;
    }

    const writer = await User.findById(post.userId, {
        raw: true,
        attributes: ['username']
    });

    post.username = writer.username;

    return post;
}

const getTags = async (id) => {
    const tags = await models.Tag.findByPostId(id, true);
    
    const mapped = tags.map(tag=>tag.tag);
    return mapped;
}


const getCategories = async (id) => {
    const postCategories = await models.PostCategory.findAll({
        where: {
            postId: id
        }, 
        include: [
            models.Category
        ],
        raw: true
    });

    return postCategories.map(
        postCategory => ({
            id: postCategory['categoryId'],
            name: postCategory['Category.name'],
            index: postCategory['Category.index'],
            parentId: postCategory['Category.parentId']
        })
    );
}

const getUser = cache.inject(async (userId) => {
    const attributes = ['id', 'username', 'displayName', 'thumbnail'];
    const user = await models.User.findById(userId, {
        attributes,
        raw: true
    });
    return user;
}, 'graphql:user:id');

const getPostsByTag = async ({tag, cursor, me, username}) => {
    const posts = await models.Tag.findAll({
        where: {
            tag,
            '$Post.id$': cursor ? {
                lt: cursor
            } : { ne: null },
            '$Post.is_temp$': false,
            '$Post.visibility$': me ? { ne: null } : 'public',
            '$Post.User.username$': username ? username : { ne: null } 
        },
        include: [
            {
                model: models.Post,
                include: [
                    {
                        model: models.User,
                        attributes: ['username']
                    }
                ]
            }
        ],
        order: [[models.Post, 'id', 'DESC']],
        limit: 10,
        raw: true
    });

    if(posts.length === 0) {
        return {
            data: null,
            next: null
        }
    }

    const lastId = posts[posts.length - 1]['Post.id'];

    const nextCount = await models.Tag.count({
        where: {
            tag,
            '$Post.id$': lastId ? {
                lt: lastId
            } : { ne: null },
            '$Post.is_temp$': false,
            '$Post.visibility$': me ? { ne: null } : 'public',
            '$Post.User.username$': username ? username : { ne: null } 
        },
        include: [
            {
                model: models.Post,
                include: [
                    {
                        model: models.User,
                        attributes: ['username']
                    }
                ]
            }
        ],
        order: [[models.Post, 'id', 'DESC']],
        limit: 10,
        raw: true
    });

    return {
        data: posts,
        nextExists: nextCount > 0
    };
}


const getPostsByCategory = async ({category, cursor, me}) => {
    const descendants = await models.Category.findAllDescendant(category);

    const posts = await models.PostCategory.findAll({
        where: {
            categoryId: [...descendants, category],
            '$Post.id$': cursor ? {
                lt: cursor
            } : { ne: null },
            '$Post.is_temp$': false,
            '$Post.visibility$': me ? { ne: null } : 'public'
        },
        attributes: [[models.sequelize.fn('DISTINCT', models.sequelize.col('post_id')), 'postId']],
        include: [
            models.Post
        ],
        order: [[models.Post, 'id', 'DESC']],
        limit: 10,
        raw: true
    });

    if(posts.length === 0) {
        return {
            data: null,
            next: null
        }
    }

    const lastId = posts[posts.length - 1]['Post.id'];

    const nextCount = await models.PostCategory.count({
        where: {
            categoryId: category,
            '$Post.id$': lastId ? {
                lt: lastId
            } : { ne: null },
            '$Post.is_temp$': false,
            '$Post.visibility$': me ? { ne: null } : 'public'
        },
        include: [
            models.Post
        ],
        order: [[models.Post, 'id', 'DESC']],
        limit: 10,
        raw: true
    });

    return {
        data: posts,
        nextExists: nextCount > 0
    };
}

const getPostsByUsername = async ({username, cursor, me, temp}) => {
    const posts = await models.Post.findAll({
        where: {
            isTemp: (me && temp) ? { ne: null } : false,
            visibility: me ? { ne: null } : 'public',
            '$User.username$': username,
            id: cursor ? { lt: cursor } : { ne: null },
        },
        include: [
            models.User
        ],
        order: [['id', 'DESC']],
        limit: 10,
        raw: true
    });

    if(posts.length === 0) {
        return {
            data: null,
            next: null
        }
    }

    const lastId = posts[posts.length - 1].id;

    const nextCount = await models.Post.count({
        where: {
            isTemp: (me && temp) ? { ne: null } : false,
            visibility: me ? { ne: null } : 'public',
            '$User.username$': username,
            id: lastId ? { lt: lastId } : { ne: null },
        },
        include: [
            models.User
        ],
        order: [['id', 'DESC']],
        limit: 10,
        raw: true
    });


    return {
        data: posts,
        nextExists: nextCount > 0
    }
}

module.exports = {
    Query: {
        post: async (obj, {id}, ctx) => {

            const userId = ctx.request.userId;

            const post = await getPost({
                userId,
                id
            });

            return post;
        },


        posts: async (obj, {tag, category, username, cursor, me, temp}, ctx) => {
            
            if(me) {
                if(!ctx.request.logged) throw new Error('no permission');
                if(ctx.request.tokenPayload.data.username !== username) throw new Error('no permission');
            }

            const handler = {
                tag: async () => {
                    const results = await getPostsByTag({tag, cursor, me, username});

                    if(results.data === null) return { data: null, next: null };

                    const posts = results.data.map(post => ({
                                id: post['Post.id'],
                                title: post['Post.title'],
                                content: post['Post.content'],
                                releaseDate: post['Post.releaseDate'],
                                userId: post['Post.userId'],
                                visibility: post['Post.visibility'],
                                isTemp: post['Post.isTemp']
                            }));

                    return {
                        data: posts,
                        hasNext: results.nextExists
                    };   
                },
                category: async () => {
                    const results = await getPostsByCategory({category, cursor, me});

                    if(results.data === null) return { data: null, next: null };

                    const posts = results.data.map(post => ({
                                id: post['Post.id'],
                                title: post['Post.title'],
                                content: post['Post.content'],
                                releaseDate: post['Post.releaseDate'],
                                userId: post['Post.userId'],
                                visibility: post['Post.visibility'],
                                isTemp: post['Post.isTemp']
                            }));

                    return {
                        data: posts,
                        hasNext: results.nextExists
                    };  
                },
                username: async () => {
                    const results = await getPostsByUsername({username, cursor, me, temp});

                    if(results.data === null) return { data: null, next: null };

                    const posts = results.data;

                    return {
                        data: posts,
                        hasNext: results.nextExists
                    };  
                }
            };

            if(tag) {
                const response = await handler.tag();
                return response;
            } 

            if(category) {
                const response = await handler.category();
                return response;
            }

            if(username) {
                const response = await handler.username();
                return response;
            }

        }
    },

    Post: {
        preview: (obj, params, ctx) => {
            return removeMd(obj.content).substring(0,150);
        },
        tags: async (obj, params, ctx) => {
            const tags = await getTags(obj.id);

            return tags;
        },
        categories: async (obj, params, ctx) => {
            const categories = await getCategories(obj.id);
            return categories;
        },
        user: async (obj, params, ctx) => {
            const user = await getUser(obj.userId);
            return user;
        }
    }
}