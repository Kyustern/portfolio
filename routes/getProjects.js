const express = require('express')
const router = express.Router()
const MongoClient = require('mongodb').MongoClient
const chalk = require('chalk')
require('dotenv').config()

// const mongoUri = 'mongodb+srv://readOnlyUser:mVYu0gtybgfOADT3@iprefermysql-nzjl9.mongodb.net/test?retryWrites=true&w=majority'
const mongoUri = `mongodb+srv://${process.env.ATLAS_READONLY_USERNAME}:${process.env.ATLAS_READONLY_PASSWORD}@iprefermysql-nzjl9.mongodb.net/test?retryWrites=true&w=majority`

router.get('/getProjects', (req, res) => {

    const mongoClient = new MongoClient(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    mongoClient.connect(async (err) => {
        console.assert(!err, 'Connection error')

        const data = await mongoClient.db('portfolio').collection('projets').find().toArray()

        mongoClient.close().then(() => {
            
            res.send(data)

        })

    })
})

module.exports = router