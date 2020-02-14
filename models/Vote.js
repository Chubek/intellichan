const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ThreadVotesSchema = new Schema({
    thread_id: {
        type: String,
        required: true,
        unique: true
    },
    votes_id: [String],
    total_vote_score: String
})

const CommentVotesSchema = new Schema({
    comment_id: {
        type: String,
        required: true,
        unique: true
    },
    votes_id: [String],
    total_vote_score: String
})

const SingleVoteSchema = new Schema({
    thread_votes_id: { 
        type: String,
        required: true
    }, //ThreadVotesSchema
    voter_id: String,
    votee_id: String,
    vote_score: {
        type: Number,
        default: 1,
        min: 1,
        max: 10
    }
})


const UserVotesSchema = new Schema({
    user_id: {
        type: String,
        required: true,
        unique: true
    },
    threads_voted_id: [String],
    posts_voted_id: [String],
    //^^ threads that user has voted on
    voted_threads_id: [String],
    voted_posts_id: [String],
    //^^ User's threads voted
    total_post_score: {
        type: Number,
        default: 1
    },
    total_thread_score: {
        type: Number,
        default: 1
    }  
})


const UserVotes = mongoose.model("UserVotes", UserVotesSchema)
const SingleVote = mongoose.model("SingleVote", SingleVoteSchema)
const ThreadVotes = mongoose.model("ThreadVotes", ThreadVotesSchema)
const CommentVotes = mongoose.model("CommentVotes", CommentVotesSchema)

module.exports = {
    UserVotes,
    SingleVote,
    ThreadVotes,
    CommentVotes
}