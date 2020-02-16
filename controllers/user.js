require('dotenv').config({path: __dirname + '/.env'})
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
const _ = require("underscore")
const SALT_ROUNDS = 12

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

// @route   GET /user/get-vip-status/:uid
// @desc    Get user info based on id
// @access  Private
router.get('/get-vip-status/:uid', auth, (req, res) => {
    const authId = req.user.id
    const userId = req.params.uid

    UserPermissionSchema.find({user_id: authId})
        .then(auth_doc => {
            if (auth_doc.is_admin || auth_doc.is_janitor || auth_doc.is_mod) {
                UserSchema.findOne({_id: userId})
        .then(doc_user => {
            const permissionId = doc_user.permission_id
            UserPermissionSchema.find({_id: permissionId, user_id: userId})
                .then(doc_permission => {
                    const vipId = doc_permission.vip_id

                   UserVIPSchema.find({_id: {$all: vipId}, user_id: userId})
                        .then(doc_vip => {
                                  
                            doc_vip.forEach(doc => {
                                ret = []
                                if (doc.is_active) {
                                          ret.push(doc)
                                    } 

                                    if (ret.length > 0) {
                                        res.status(200).json({ret})
                                    } else {
                                        res.status(404)
                                        console.log("No active VIP subscriptions.")
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

            }
        })
        .catch(e => {
            res.status(200).json({ e })
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

// @route   GET /user/get-banned-status/:uid
// @desc    Get user banned status
// @access  Private
router.get('/get-banned-status/:uid', auth, (req, res) => {
    const authId = req.user.id
    const userId = req.params.uid

    UserPermissionSchema.find({user_id: authId})
        .then(auth_doc => {
            if (auth_doc.is_admin || auth_doc.is_mod || auth_doc.is_janitor) {
                UserSchema.find({_id: userId})
                    .then(user_doc => {
                        const bannedId = user_doc.banned_id

                        UserBannedSchema.find({_id: bannedId, user_id: userId})
                            .then(banned_doc => {
                                res.status(200).json({banned_doc})
                            })
                            .catch(e => {
                                res.status(500).json({ e })
                                console.log(e)
                            })
                    })
                    .catch(e => {
                        res.status(500).json({ e })
                        console.log(e)
                    })
            }
        })
        .catch(e => {
            res.status(500).json({ e })
            console.log(e)
        })
})



//USER -> POSTs

// @route   POST /user/create/
// @desc    Get user banned status
// @access  Public
router.post('/create', (req, res) => {
    const {displayName, email, password} = req.body

    if (!displayName || !password) {
        console.log(req.body)
        res.status(401).json("Error: enter password and/or display name.")
        return
    }
 
   UserSchema.findOne({display_name: displayName})
        .then(user => {
            if (user) {
                res.status(401).json({message: "User already exists."})
                return false
            } else {
                bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
                    if (err) throw err
                
                    const User = new UserSchema({
                        display_name: displayName,
                        password: hash,
                        email: email
                
                    })
                        
                    User.save()
                        .then(doc_saved => {
                            token = jwt.sign({
                                data: {id: doc_saved._id, display_name: doc_saved.display_name},
                              }, process.env.JWT_SECRET, { expiresIn: '15d' })
                            res.status(201).json({jwt_token: token, doc_saved})})
                                .catch(e => {
                                    res.status(500).json({ e })
                                    console.log(e)
                                })
                    }) 
            }
        })
            .catch(e => console.log(e))

  
    
            
   
    
    
})


//USER -> PUTs

//USER ->  DELs


module.exports = router