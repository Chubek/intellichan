require('dotenv').config({path: __dirname + '/.env'})
const mongoose = require("mongoose")
require("colors")
const express = require("express")
const fileUpload = require('express-fileupload')
const morgan = require('morgan')
const path = require("path")
mongoose.set('useFindAndModify', false)
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload({
    createParentPath: true
}))
app.use(morgan('dev'))


const db = mongoose.connect("mongodb://" + process.env.DB_HOST + ":" + process.env.DB_PORT + "/" + process.env.DB_NAME, { useNewUrlParser: true, 
                                useUnifiedTopology: true,
                                useCreateIndex: true })
                                    .then(() => console.log("MongoDB Connected".green.inverse))
                                        .catch(e => console.log(`${e}`.underline.red))

app.use('/img', express.static(path.join(__dirname, 'public/image')))
app.use('/aud', express.static(path.join(__dirname, 'public/audio')))
app.use('/vid', express.static(path.join(__dirname, 'public/vid')))

global.IMG_DIR = path.resolve(path.join(__dirname, 'public/image'))
global.AUD_DIR = path.resolve(path.join(__dirname, 'public/audio'))
global.VID_DIR = path.resolve(path.join(__dirname, 'public/video'))


app.use('/user', require("./controllers/user"))
app.use('/post', require("./controllers/thread"))

const port = process.env.PORT || 5000;



app.listen(port, () => console.log(`Server started on port ${port}`.blue.inverse));