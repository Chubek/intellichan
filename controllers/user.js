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
var _date = require('underscore.date');
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
// @desc    Register user
// @access  Public
router.post('/create-normal', (req, res) => {
    const {displayName, email, password} = req.body

    if (!displayName || !email || !password) {
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
                                const UserPermission = new UserPermissionSchema({
                                    user_id: doc_saved._id
                                })
                                    UserPermission.save()
                                        .then(perm_doc => {
                                            token = jwt.sign({
                                                data: {id: doc_saved._id, display_name: doc_saved.display_name},
                                              }, process.env.JWT_SECRET, { expiresIn: '15d' })
                                            res.status(201).json({jwt_token: token, user: 
                                                {
                                                    id: doc_saved._id,
                                                    displayName: doc_saved.display_name,
                                                    email: doc_saved.email,
                                                    permission_id: perm_doc._id
                                                }}
                                                )
                                        })
                            })
                                .catch(e => {
                                    res.status(500).json({ e })
                                    console.log(e)
                                })
                    }) 
            }
        })
            .catch(e => console.log(e))      
   
    
    
})


// @route   POST /user/auth/
// @desc    Login user and get jwt
// @access  Public
router.post('/auth', (req, res) => {
    const {displayName, email, password} = req.body

    UserSchema.findOne({$or: [{display_name: displayName}, {email: email}]})
        .then(doc_user => {
            if (!doc_user) {
                res.status(404).json({message: "User not found! Please register."})
                return false
            }

            bcrypt.compare(password, doc_user.password)
                .then(is_match => {
                    if (!is_match) {
                        res.status(403).json({message: "Access denied, passwords don't match!"})
                        return false
                    } else {
                        const token = jwt.sign({data: {id: doc_user._id, 
                            displayName: doc_user.display_name, 
                            email: doc_user.email}}, process.env.JWT_SECRET, {expiresIn: '15d'})
                            res.status(202).json({jwt_token: token, user: {
                                id: doc_user._id,
                                displayName: doc_user.display_name,
                                email: doc_user.email,
                                props: {
                                    dateRegistered: doc_user.date_registered,
                                    infoId: doc_user.info_id,
                                    permissionId: doc_user.permission_id,
                                    transactionsId: doc_user.transactions_id,
                                    recommenderId: doc_user.recommender_id,
                                    votesId: doc_user.votes_id,
                                    usersSubbed: doc_user.users_subbed,
                                    subbedUsers: doc_user.subbed_users,
                                    certId: doc_user.cert_id,
                                    paymentId: doc_user.payment_id,
                                    promotionsId: doc_user.promotions_id,
                                    watcherId: doc_user.watcher_id,
                                    sentIps: doc_user.sent_ips,
                                    
                                },
                                lastIp: doc_user.last_ip
                            }})
                    }
                })
        })
}) 


// @route   PUT /user/create-user-info/
// @desc    Create user info
// @access  Private
router.post('/create-user-info', auth, (req, res) => {
    const userId = req.user.id

    const {bio, pages, gamerTags} = req.body

    const bioCheckArr = [_.has(bio, 'biography'), _.has(bio, 'lives_in'), _.has(bio, 'birthday'), _.has(bio, 'age')]
    const pagesCheckArr = [
        _.has(pages, 'facebook_profile'),
        _.has(pages, 'twitter_profile'),
        _.has(pages, 'reddit_profile'),
        _.has(pages, 'tiktok_id'),
        _.has(pages, 'google_id'),
        _.has(pages, 'youtube_profile'),
        _.has(pages, 'pinterest_profile')
    ]
    const gamerTagsCheckArr = [
        _.has(gamerTags, 'xbl'),
        _.has(gamerTags, 'psn'),
        _.has(gamerTags, 'steam')
    ]

    bioCheck = false
    gamerTagsCheck = false
    pagesCheck = false

    bioCheckArr.forEach(bio => {
        if (!bio) {
            bioCheck = false
        } else {
            bioCheck = true
        }
    })
  
    if (!_.includes(bioCheckArr, false), !_.includes(pagesCheckArr, false), !_.includes(gamerTagsCheckArr, false)) {
        const UserInfo = new UserInfoSchema({
            user_id: userId,
            bio: bio,
            pages: pages,
            gamertags: gamerTags
        })

        UserInfo.save()
            .then(doc => {
                res.status(201).json({message: "Created!", doc})
                UserSchema.updateOne({_id: userId}, {$setOnInsert: {info_id: doc._id}}, {upsert: true})
            })
                .catch(e => {
                    res.status(500).json({ e })
                    console.log(e)
                })
    }
})



//USER -> PUTs



// @route   PUT /user/set-user-banned/:uid
// @desc    Set user banned
// @access  Private
router.put('set-user-banned/:uid', auth, (req, res) => {
    const authId = req.user.id
    const userId = req.params.uid
    const ban_end_date = _date(new Date()).add({d: req.body.days}) 
    
    UserPermissionSchema.find({user_id: authId})
        .then(perm_doc => {
            if (perm_doc.is_admin || perm_doc.is_mod) {
                UserBannedSchema.updateOne({user_id: userId}, {$setOnInsert: {date_ends: ban_end_date}}, {upsert: true})
                    .then(ban_doc => {
                        UserSchema.updateOne({_id: userId}, {$setOnInsert: {banned_id: ban_doc._id}}, {upsert: true})
                            .then(() => {
                                res.status(200).json({message: `User ${userId} banned for ${ban_days} day(s). His ban Id is ${ban_doc._id}.`})
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



//USER ->  DELs


module.exports = router