const User = require('../../models/User');

/*
    type User {
        id: Int!
        username: String
        displayName: String
        thumbnail: String
        categories: [Category]
    }
*/

module.exports = {
    Query: {
        user: async (obj, {username}, ctx) => {
            // username으로 조회
            if(username) {
                const attributes = ['username', 'displayName', 'thumbnail'];

                try {
                    // DB 조회
                    const user = await User.findOne({ 'username': username}, attributes).exec();
                    return user;
                } catch(e) {
                    throw new Error('DB ERROR');
                }
            }
        }
    }
}