require('dotenv').config({path: __dirname + '/.env'})
const mongoose = require("mongoose")
require("colors")
const express = require("express")

mongoose.set('useFindAndModify', false)

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const db = mongoose.connect("mongodb://" + process.env.DB_HOST + ":" + process.env.DB_PORT + "/" + process.env.DB_NAME, { useNewUrlParser: true, 
                                useUnifiedTopology: true,
                                useCreateIndex: true })
                                    .then(() => console.log("MongoDB Connected".green.inverse))
                                        .catch(e => console.log(`${e}`.underline.red))


app.use('/user', require("./controllers/user"))

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`.blue.inverse));