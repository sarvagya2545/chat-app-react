module.exports = {
    mongoURI: process.env.NODE_ENV === 'production' ? process.env.MONGO_URI : "mongodb://localhost:27017/chat",
    jwtSecret: process.env.JWT_SECRET
}