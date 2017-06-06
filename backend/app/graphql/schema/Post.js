const Post = `
    type Post {
        title: String
        content: String
        preview: String
        releaseDate: String
        userId: Int
        isTemp: Boolean
        user: User
    }
    type Posts {
        data: [Post]
        hasNext: Boolean
    }
`

module.exports = Post;