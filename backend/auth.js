require('dotenv').config({ path: '../.env' });

const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
const { MongoClient } = require('mongodb');

// Connection URI
const uri = process.env.DB_URL;

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


const hashPasswd = (passwd) => {
    const saltRounds = 10
    let hashedPassword = bcrypt.hashSync(passwd, saltRounds);
    return hashedPassword
}


const authToken = (userId) => {
    const accessToken = jwt.sign(userId, `${process.env.TOKEN_SECRET}`)
    return accessToken
}

//MiddleWare
const authUser = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token === null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

const validateUser = async ({ id, passwd, userType }) => {
    try {
        await client.connect()

        const collection = client.db('Evidence').collection(userType === 'admin' ? 'Admins' : 'People')

        const result = await collection.findOne({ id: id })

        if (!result) return "invalid"

        const match = await bcrypt.compare(passwd, result.password)

        if (match) return "success"
        else return "invalid"

    } catch (error) {
        return "Internal Server Error"
    } finally {
        if (client) client.close()
    }
}

module.exports = { authToken, hashPasswd, validateUser, authUser }