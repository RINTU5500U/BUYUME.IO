const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const route = require('./routes/route')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

mongoose.connect('mongodb+srv://BiswajitSwain:EtERzBKu3NLVQlzp@cluster0.xf1eq.mongodb.net/buyume.io', {
    urlNewParser : true
}).then(() => {
    console.log('MongoDB is connected')
}).catch((err) => {
    console.log(err.message)
})

app.use('/', route)

app.listen(3000, () => {
    console.log(`Express app running on port ${3000}`)
})
