const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserWatchedSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    thread_watchers_id: [String], //ThreadWatcherSchema
    watcher_number: {
        type: Number,
        default: 1
    }
})

const ThreadWatcherSchema = new Schema({
    thread_id: {
        type: String,
        required: true
    },
    user_watcheds_id: [String], //UserWatchedSchema
    watched_number: {
        type: Number,
        default: 1
    }

})

const ThreadWatcher = mongoose.model("ThreadWatcher", ThreadWatcherSchema)
const UserWatched = mongoose.model("UserWatched", UserWatchedSchema)

module.exports = {
    ThreadWatcher,
    UserWatched
}