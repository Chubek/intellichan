const UserSchema = require("../models/User").User
const UserInfoSchema = require('../models/User').UserInfo
const UserPermissionSchema = require("../models/User").UserPermission
const UserVIPSchema = require("../models/User").UserVIP
const UserTransactionSchema = require("../models/User").UserTransaction
const UserBannedSchema = require("../models/User").UserBanned
const router = require("express").Router()
const auth = require("../middleware/auth")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

//USER -> GETs

// @route   GET /user/
// @desc    Get all users
// @access  Public
router.get('/', (req, res) => {

    UserSchema.find()
        .then(doc => {
            res.status(200).json(doc)
        })
            .catch(e => {
                res.status(500).json({error: e})
                console.log(e)
            })

})


// @route   GET /user/:uid
// @desc    Get user based on id
// @access  Public
router.get('/:uid', (req, res) => {
    const userId = req.params.uid

    UserSchema.findOne({_id: userId})
        .then(doc => {
            res.status(200).json(doc)
        })
            .catch(e => {
                res.status(500).json({error: e})
                console.log(e)
            })

})

// @route   GET /user/info/:uid
// @desc    Get user info based on id
// @access  Public
router.get('/info/:infoid', auth, (req, res) => {
    const userId = req.user.id
    const infoId = req.params.infoid

    UserInfoSchema.findOne({_id: infoId, user_id: userId})
        .then(doc => {
            res.status(200).json({ bio: doc.bio, pages: doc.pages, gamertags: doc.gamertags, 
                        number_of_posts: doc.number_of_posts, date_registered: doc.date_registered })
        })
            .catch(e => {
                res.status(500).json({error: e})
                console.log(e)
            })

})

// @route   GET /user/permission/permissionid
// @desc    Get user info based on id
// @access  Private
router.get('/permission/:permissionid', auth, (req, res) => {
    const userId = req.user.id
    const permissionId = req.params.permissionid

    UserPermissionSchema.findOne({_id: permissionId, user_id: userId})
        .then(doc => {
            res.status(200).json({doc})
        })
            .catch(e => {
                res.status(500).json({ e })
                console.log(e)
            })


})

// @route   GET /user/get-vip
// @desc    Get user info based on id
// @access  Private
router.get('/get-vip-status', auth, (req, res) => {
    const userId = req.user.id

    UserSchema.findOne({_id: userId})
        .then(doc_user => {
            const permissionId = doc_user.permission_id
            UserPermissionSchema.find({_id: permissionId, user_id: userId})
                .then(doc_permission => {
                    const vipId = doc_permission.vip_id

                    if (doc_permission.is_janitor || doc_permission.is_admin || doc_permission.is_mod) {

                        
                        UserVIPSchema.find({_id: {$all: vipId}, user_id: userId})
                            .then(doc_vip => {
                                  doc_vip.forEach(doc => {
                                      if (doc.is_active) {
                                          res.status(200).json({doc})
                                        } else {
                                        res.status(404).json({message: "Is not active."})
                            }
                        })
                    })
                    .catch(e => {
                        res.status(500).json({e})
                        console.log(e)
                    })
                        .catch(e => {
                            res.status(500).json({e})
                            console.log(e)
                        })
                    }
                })
                .catch(e => {
                    res.status(500).json({e})
                    console.log(e)
                })
        })
        .catch(e => {
            res.status(500).json({e})
            console.log(e)
        })
})

// @route   GET /user/get-transactions/:trid
// @desc    Get user info based on id
// @access  Private
router.get('/get-transaction/:trid', auth, (req, res) => {
    const userId = req.user.id
    const transactionId = req.query.trid

    UserTransactionSchema.find({_id: {$all: transactionId}, user_id: userId})
        .then(doc => {
            res.status(200).json({doc})
        })
            .catch(e => {
                res.status(500).json({e})
                console.log(e)
            })
})

//USER -> POSTs

//USER -> PUTs

//USER -> DELs


module.exports = router