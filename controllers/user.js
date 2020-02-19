require('dotenv').config({path: __dirname + '/.env'})
const UserSchema = require("../models/User").User
const UserInfoSchema = require('../models/User').UserInfo
const UserPermissionSchema = require("../models/User").UserPermission
const UserVIPSchema = require("../models/User").UserVIP
const UserTransactionSchema = require("../models/User").UserTransaction
const UserBannedSchema = require("../models/User").UserBanned
const router = require("express").Router()
const components = require("../middleware/components")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const _ = require("underscore")
const moment = require("moment")
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
                res.status(500).json({e})
                console.log(e)
            })

})

// @route   GET /user/info/:uid
// @desc    Get user info based on id
// @access  Public
router.get('/info/:uid', components.auth, (req, res) => {
    const userId = req.params.uid

    UserInfoSchema.findOne({user_id: userId})
        .then(doc => {
            res.status(200).json({ bio: doc.bio, pages: doc.pages, gamertags: doc.gamertags, 
                        number_of_posts: doc.number_of_posts, date_registered: doc.date_registered })
        })
            .catch(e => {
                res.status(500).json({e})
                console.log(e)
            })

})

// @route   GET /user/permission/:uid
// @desc    Get user info based on id
// @access  Private
router.get('/permission/:uid', components.auth, (req, res) => {
    const authId = req.user.id
    const userId = req.params.uid

    UserPermissionSchema.findOne({user_id: authId})
        .then(perm_doc => {
            if (perm_doc.is_admin || perm_doc.is_janitor || perm_doc.is_mod) {
                UserPermissionSchema.findOne({user_id: userId})
                    .then(doc => {
                             res.status(200).json({doc})
                                     })
                         .catch(e => {
                                res.status(500).json({ e })
                                console.log(e)
                                    })

            }
        })

})

// @route   GET /user/get-vip-status/:uid
// @desc    Get user info based on id
// @access  Private
router.get('/get/vip-status/:uid', components.auth, (req, res) => {
    const authId = req.user.id
    const userId = req.params.uid

   UserPermissionSchema.findOne({user_id: authId})
    .then(auth_perm_doc => {
        if (auth_perm_doc.is_mod || auth_perm_doc.is_admin) {
            UserPermissionSchema.findOne({user_id: userId})
                .then(user_perm_doc => {
                    UserVIPSchema.find({_id: {$in: user_perm_doc.vip_id, user_id: userId}})
                        .then(vip_docs => {
                            const today = new Date()
                            let active = []
                            vip_docs.forEach(vip => {
                                if (vip.date_ends > today) {
                                    active.push(vip)
                                }
                            })

                            res.status(200).json({active_vips: active})
                            
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

// @route   GET /user/get-transactions/:trid
// @desc    Get user info based on id
// @access  Private
router.get('/get/transaction/:trid', components.auth, (req, res) => {
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
router.get('/get/banned-status/:uid', components.auth, (req, res) => {
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
                                const today = new Date()

                                if (banned_doc.date_ends > today) {
                                    res.status(200).json({banned: false})
                                } else {
                                    res.status(200).json({banned: true})
                                }
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
router.post('/create', (req, res) => {
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
                                                data: {id: doc_saved._id, displayName: doc_saved.display_name},
                                              }, process.env.JWT_SECRET, { expiresIn: '15d' })
                                              UserSchema.updateOne({_id: doc_saved}, {$setOnInsert: {permission_id: perm_doc._id}}, {upsert: true})
                                            res.status(201).json({token: token, user: 
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
            .then(isMatch => {
                if (!isMatch) return res.status(400).json( { message: "Invalid password." })

                jwt.sign( {data: {id: doc_user._id, 
                    displayName: doc_user.display_name    
                }}, process.env.JWT_SECRET, { expiresIn: '15d'}, (err, token) => {
                    if (err) throw err
                    
                    res.status(202).json({token: token, user: {
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
                    }
                })
                })
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
}) 






//USER -> PUTs



// @route   PUT /user/set-user-banned/:uid
// @desc    Set user banned
// @access  Private
router.put('/set/banned/:uid', components.auth, (req, res) => {
    const authId = req.user.id
    const userId = req.params.uid
    let banEndDate = 0
    if (req.body.days > 0) {
        banEndDate = moment(new Date()).add(req.body.days, 'days') 
    } else {
        banEndDate = -1
    } 

    UserPermissionSchema.findOne({user_id: authId})
        .then(perm_doc => {
            
            if (perm_doc.is_admin || perm_doc.is_mod) {
                UserBannedSchema.findOneAndUpdate({user_id: userId}, {$setOnInsert: {date_ends: banEndDate}}, {upsert: true, setDefaultsOnInsert: true, new: true})
                    .then(ban_doc => {
                        
                        UserSchema.findOneAndUpdate({_id: userId}, {$set: {banned_id: ban_doc._id}}, {upsert: true, setDefaultsOnInsert: true, new: true})
                            .then(user_doc => {
                                
                                res.status(200).json({message: `User ${user_doc._id} banned for ${req.body.days} day(s) and it will expire on ${ban_doc.date_ends}. His ban Id is ${ban_doc._id}. It was inserted into the user's schema as ${user_doc.banned_id}`, 
                                    ban_doc})
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
            } else {
                res.status(403).json({message:"Must be admin or mod to ban."})
                console.log("Must be admin to ban.")
            }
        })
        .catch(e => {
            res.status(500).json({ e })
            console.log(e)
        })
})


// @route   PUT /user/set-info/
// @desc    Create user info
// @access  Private
router.put('/set/info', components.auth, (req, res) => {
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
        
        UserInfoSchema.updateOne({user_id: userId}, {$setOnInsert: {
            bio: bio,
            pages: pages,
            gamertags: gamerTags
        }}, {upsert: true})
            .then(doc => {
                UserSchema.update({_id: userId}, {info_id: doc._id})
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
 



//USER ->  DELs

// @route   DELETE /user/delete-admin/:uid
// @desc    Create user info
// @access  Private
router.delete('/delete/admin/:uid', components.auth, (req, res) => {
    const userId = req.params.uid
    const authId = req.user.id

    UserPermissionSchema.findOne({_id: authId})
        .then(auth_doc => {
            if (auth_doc.is_admin || auth_doc.is_mod) {
                UserSchema.findOneAndDelete({_id: userId})
                    .then(() => res.status(200).json({ message: `User ${userId} deleted.`}))
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

// @route   DELETE /user/delete-normal/
// @desc    Create user as ad,om
// @access  Private
router.delete('/delete/normal', components.auth, (req, res) => {
    const userId = req.user.id

    UserSchema.findOneAndDelete({_id: userId})
        .then(doc => {
            res.status(200).json({ doc})
        })
            .catch(e => {
                res.status(500).json( { e })
                console.log(e)
            }


            )
})



module.exports = router