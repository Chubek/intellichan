require('dotenv').config({path: __dirname + '/.env'})
const Thread = require("../models/Thread")
const ImageOPSchema = Thread.ImageOP
const ImageReplySchema = Thread.ImageReply
const VideoOPSchema = Thread.VideoOP
const VideoReplySchema = Thread.VideoReply
const AudioOPSchema = Thread.AudioOP
const AudioReplySchema = Thread.AudioReply
const AnonymousOPSchema = Thread.AnonymousOP
const AnonymousReplySchema = Thread.AnonymousReply
const PostContentSchema = Thread.PostContent
const HiddenPostSchema = Thread.HiddenPost
const HamSpamSchema = Thread.HamSpam
const UserSchema = require("../models/User").User
const Media = require("../models/Media")
const ThreadImageSchema = Media.ThreadImage
const ImageFileSchema = Media.ImageFile
const ImageMetadataSchema = Media.ImageMetadata
const ThreadVideoSchema = Media.ThreadVideo
const VideoFileSchema = Media.VideoFile
const VideoMetadataSchema = Media.VideoMetadata
const ThreadAudioSchema = Media.AudioVideo
const AudioFileSchema = Media.AudioFile
const AudioMetadataSchema = Media.AudioMetadata
const UserPermissionSchema = require("../models/User").UserPermission
const express = require("express")
const router = express.Router()
const components = require("../middleware/components")
const fs = require('fs');
const path = require("path")
const sha256File = require('sha256-file')
const ExifImage = require('exif').ExifImage
const ffprobe = require('ffprobe'),
    ffprobeStatic = require('ffprobe-static')
const moment = require("moment")
const sizeOf = require('image-size')
const Diff = require("diff")

//GETs
// @route   GET /post/get/image/op
// @desc    Get image op
// @access  Public
router.get('/get/image/op', (req, res) => {
    ImageOPSchema.find()
        .then(docs => {
            res.status(200).json({docs})
        })
            .catch(e => {
                res.status(500).json({ e })
                console.log(e)
            })
})

// @route   GET /post/get/image/body/:bodyid 
// @desc    Get image body
// @access  Public
router.get('/get/image/body/:bodyid', (req, res) => {
    ThreadImageSchema.find({_id: req.params.bodyid})
        .then(docs => {
            res.status(200).json({docs})
        })
            .catch(e => {
                res.status(400).json({ e })
                console.log(e)
            })
})

// @route   GET /post/get/image/file/:fileid 
// @desc    Get image file
// @access  Public
router.get('/get/image/file/:fileid', (req, res) => {
    ImageFileSchema.find({_id: req.params.fileid})
        .then(docs => {
            res.status(200).json({docs})
        })
            .catch(e => {
                res.status(400).json({ e })
                console.log(e)
            })
})
// @route   GET /post/get/image/body/:bodyid 
// @desc    Get image body
// @access  Public
router.get('/get/image/body/:bodyid', (req, res) => {
    ThreadImageSchema.find({_id: req.params.bodyid})
        .then(docs => {
            res.status(200).json({docs})
        })
            .catch(e => {
                res.status(400).json({ e })
                console.log(e)
            })
})

// @route   GET /post/get/image/last
// @desc    Get last image op
// @access  Public
router.get('/get/image/last', (req, res) => {
    ImageOPSchema.find().sort({$natural:1}).limit(1)
        .then(doc => res.status(200).json({doc}))
            .catch(e => {
                res.status(500).json({e})
                console.log(e)
            })
})

//GETs
// @route   GET /post/get/video/op
// @desc    Get video op
// @access  Public
router.get('/get/video/op', (req, res) => {
    VideoOPSchema.find()
        .then(docs => {
            res.status(200).json({docs})
        })
            .catch(e => {
                res.status(500).json({ e })
                console.log(e)
            })
})

// @route   GET /post/get/video/body/:bodyid 
// @desc    Get video body
// @access  Public
router.get('/get/video/body/:bodyid', (req, res) => {
    ThreadVideoSchema.find({_id: req.params.bodyid})
        .then(docs => {
            res.status(200).json({docs})
        })
            .catch(e => {
                res.status(400).json({ e })
                console.log(e)
            })
})

// @route   GET /post/get/video/file/:fileid 
// @desc    Get video file
// @access  Public
router.get('/get/video/file/:fileid', (req, res) => {
    VideoFileSchema.find({_id: req.params.fileid})
        .then(docs => {
            res.status(200).json({docs})
        })
            .catch(e => {
                res.status(400).json({ e })
                console.log(e)
            })
})
// @route   GET /post/get/video/body/:bodyid 
// @desc    Get video body
// @access  Public
router.get('/get/video/body/:bodyid', (req, res) => {
    ThreadVideoSchema.find({_id: req.params.bodyid})
        .then(docs => {
            res.status(200).json({docs})
        })
            .catch(e => {
                res.status(400).json({ e })
                console.log(e)
            })
})


// @route   GET /post/get/video/info/:infoid 
// @desc    Get video info
// @access  Public
router.get('/get/video/info/:infoid', (req, res) => {
    VideoMetadataSchema.find({_id: req.params.infoid})
        .then(docs => {
            res.status(200).json({docs})
        })
            .catch(e => {
                res.status(400).json({ e })
                console.log(e)
            })
})

//GETs
// @route   GET /post/get/audio/op
// @desc    Get audio op
// @access  Public
router.get('/get/audio/op', (req, res) => {
    AudioOPSchema.find()
        .then(docs => {
            res.status(200).json({docs})
        })
            .catch(e => {
                res.status(500).json({ e })
                console.log(e)
            })
})

// @route   GET /post/get/audio/body/:bodyid 
// @desc    Get audio body
// @access  Public
router.get('/get/audio/body/:bodyid', (req, res) => {
    ThreadAudioSchema.find({_id: req.params.bodyid})
        .then(docs => {
            res.status(200).json({docs})
        })
            .catch(e => {
                res.status(400).json({ e })
                console.log(e)
            })
})

// @route   GET /post/get/audio/file/:fileid 
// @desc    Get audio file
// @access  Public
router.get('/get/audio/file/:fileid', (req, res) => {
    AudioFileSchema.find({_id: req.params.fileid})
        .then(docs => {
            res.status(200).json({docs})
        })
            .catch(e => {
                res.status(400).json({ e })
                console.log(e)
            })
})
// @route   GET /post/get/audio/body/:bodyid 
// @desc    Get audio body
// @access  Public
router.get('/get/audio/body/:bodyid', (req, res) => {
    ThreadAudioSchema.find({_id: req.params.bodyid})
        .then(docs => {
            res.status(200).json({docs})
        })
            .catch(e => {
                res.status(400).json({ e })
                console.log(e)
            })
})


// @route   GET /post/get/audio/info/:infoid 
// @desc    Get audio info
// @access  Public
router.get('/get/audio/info/:infoid', (req, res) => {
    AudioMetadataSchema.find({_id: req.params.infoid})
        .then(docs => {
            res.status(200).json({docs})
        })
            .catch(e => {
                res.status(400).json({ e })
                console.log(e)
            })
})

// @route   GET /post/get/image/info/:infoid 
// @desc    Get image info
// @access  Public
router.get('/get/image/info/:infoid', (req, res) => {
    ImageMetadataSchema.find({_id: req.params.infoid})
        .then(docs => {
            res.status(200).json({docs})
        })
            .catch(e => {
                res.status(400).json({ e })
                console.log(e)
            })
})


//POSTs

// @route   POST /post/create/image/body
// @desc    Create image post
// @access  Private
router.post('/create/image/body', [components.auth, components.increment], (req, res) => {
    const userId = req.user.id
    const userName = req.user.displayName
    const incId = req.inc.next    
    const sentIp = req.ip

    

    const ImageOP = new ImageOPSchema({
        numerical_id: incId,
        submitter_id: userId,
        submitter_name: userName,
        sent_ip: sentIp
            })

        ImageOP.save()
            .then(image_doc => {
                res.status(201).json({image_body_id: image_doc._id})
             })
                .catch(e => {
                    res.status(500).json({ e })
                    console.log(e)
                })
    
    
})



//Note: Posting will be multi-sessioned.

// @route   POST /post/create/image/file/:postid
// @desc    Upload image
// @access  Private
router.post('/create/image/file/:postid', components.auth, (req, res) => {
    const postId = req.params.postid
    const imgFile = req.files.imgFile

    const upload_dir = path.join(IMG_DIR, postId)
    
    fs.exists(upload_dir, exists => {
        if (!exists) {
            fs.mkdir(upload_dir, err => {
                
                if (err) throw err
                return
            })
        } else {
            
            console.log("Folder already exists!")
        }
    })

     

    const imgExt = imgFile.name.split(".").slice(-1)[0]

   ImageOPSchema.findOne({_id: postId})
    .then(op_doc => {
        const imgName = op_doc.numerical_id

        const imgLoc = path.join(upload_dir, `${imgName}.${imgExt}`)
        console.log(imgLoc)
        imgFile.mv(imgLoc, err => {
            if (err) throw err

            sha256File(imgLoc, (err_sha256, check_sum) => {

                if (err_sha256) throw err_sha256
                const ThreadImage = new ThreadImageSchema({
                    thread_id: postId,
                    image_file_id: '',
                    image_metadata_id: ''
                })

                ThreadImage.save()
                    .then(thread_img_doc => {

                        ExifImage({image: imgLoc}, (err_metadata, metadata) => {
                            if (err_metadata) {
                                console.log(err_metadata)
                                metadata = {}
                                
                            }
                            
                            const ImageFile = new ImageFileSchema({
                                thread_image_id: thread_img_doc._id,
                                upload_path: imgLoc
                            })    
                            
                            const dimensions = sizeOf(imgLoc)
                            ImageFile.save()
                                .then(img_file_doc => {
                                    const ImageMetadata = new ImageMetadataSchema({
                                        thread_image_id: thread_img_doc._id,
                                        sha256: check_sum,
                                        type: imgExt,
                                        mime_type: imgFile.mimetype,
                                        size: imgFile.size,
                                        exif_data: metadata,
                                        width: dimensions.width,
                                        height: dimensions.height
                                    })
    
                                    ImageMetadata.save()
                                        .then(img_md_doc => {
                                            ThreadImageSchema.findOneAndUpdate({_id: thread_img_doc._id},
                                                            {
                                                                image_file_id: img_file_doc._id,
                                                                image_metadata_id: img_md_doc.id
                                                            }, {new: true})
                                                            .then(update_doc => {
    
                                                                ImageOPSchema.findOneAndUpdate({_id: postId},
                                                                    {$set: {image_id: update_doc._id }},
                                                                    {upsert: true})
                                                                        .then(() => {
                                                                            res.status(200).json({
                                                                                thread_image_id: thread_img_doc._id,
                                                                                image_file_id: img_file_doc._id,
                                                                                img_metadata_id: img_md_doc._id
                                                                            })
                                                                        })
                                                                        .catch(e => {
                                                                            console.log(e)
                                                                        })
                                                            }
                                                                
                                                                
                                                                )
                                                                .catch(e => {
                                                                    console.log(e)
                                                                })
                                                                    
                                        })
                                        .catch(e => {
                                            console.log(e)
                                        })
                                })
                                .catch(e => {
                                    console.log(e)
                                })
                        })

                    })
                    .catch(e => {
                        console.log(e)
                    })
                
                    
                    
                
            })
                

                
        })

    })



})


// @route   POST /post/create/image/body
// @desc    Create image post
// @access  Private
router.post('/create/video/body', [components.auth, components.increment], (req, res) => {
    const userId = req.user.id
    const userName = req.user.displayName
    const incId = req.inc.next    
    const sentIp = req.ip

    

    const VideoOP = new VideoOPSchema({
        numerical_id: incId,
        submitter_id: userId,
        submitter_name: userName,
        sent_ip: sentIp
            })

        VideoOP.save()
            .then(video_doc => {
                res.status(201).json({video_body_id: video_doc._id})
             })
                .catch(e => {
                    res.status(500).json({ e })
                    console.log(e)
                })
    
    
})

// @route   POST /post/create/video/file/:postid
// @desc    Upload video
// @access  Private
router.post('/create/video/file/:postid', components.auth, (req, res) => {
    const postId = req.params.postid
    const vidFile = req.files.vidFile

    const upload_dir = path.join(VID_DIR, postId)
    
    fs.exists(upload_dir, exists => {
        if (!exists) {
            fs.mkdir(upload_dir, err => {
                
                if (err) throw err
                return
            })
        } else {
            
            console.log("Folder already exists!")
        }
    })

     

    const vidExt = vidFile.name.split(".").slice(-1)[0]

   VideoOPSchema.findOne({_id: postId})
    .then(op_doc => {
        const vidName = op_doc.numerical_id

        const vidLoc = path.join(upload_dir, `${vidName}.${vidExt}`)
        console.log(vidLoc)
        vidFile.mv(vidLoc, err => {
            if (err) throw err

            ffprobe(vidLoc, {path: ffprobeStatic.path}, (probe_err, info) => {
                
                if (probe_err) throw probe_err

                const duration = info.streams[0].tags.duration

            
            sha256File(vidLoc, (err_sha256, check_sum) => {

                if (err_sha256) throw err_sha256
                const ThreadVideo = new ThreadVideoSchema({
                    thread_id: postId,
                    video_file_id: '',
                    video_metadata_id: ''
                })

                ThreadVideo.save()
                    .then(thread_vid_doc => {

                        const VideoFile = new VideoFileSchema({
                            thread_video_id: thread_vid_doc._id,
                            upload_path: vidLoc
                        })    
                        
                        VideoFile.save()
                            .then(vid_file_doc => {
                                const VideoMetadata = new VideoMetadataSchema({
                                    thread_video_id: thread_vid_doc._id,
                                    sha256: check_sum,
                                    type: vidExt,
                                    mime_type: vidFile.mimetype,
                                    size: vidFile.size,
                                    duration: duration
                                })

                                VideoMetadata.save()
                                    .then(vid_md_doc => {
                                        ThreadVideoSchema.findOneAndUpdate({_id: thread_vid_doc._id},
                                                        {
                                                            video_file_id: vid_file_doc._id,
                                                            video_metadata_id: vid_md_doc.id
                                                        }, {new: true})
                                                        .then(update_doc => {

                                                            VideoOPSchema.findOneAndUpdate({_id: postId},
                                                                {$set: {video_id: update_doc._id }},
                                                                {upsert: true})
                                                                    .then(() => {
                                                                        res.status(200).json({
                                                                            thread_video_id: thread_vid_doc._id,
                                                                            video_file_id: vid_file_doc._id,
                                                                            vid_metadata_id: vid_md_doc._id,
                                                                            video_location: vidLoc
                                                                        })
                                                                    })
                                                                    .catch(e => {
                                                                        console.log(e)
                                                                    })
                                                        }
                                                            
                                                            
                                                            )
                                                            .catch(e => {
                                                                console.log(e)
                                                            })
                                                                
                                    })
                                    .catch(e => {
                                        console.log(e)
                                    })
                            })
                            .catch(e => {
                                console.log(e)
                            })
                    


                    })
                    .catch(e => {
                        console.log(e)
                    })
                
                    
                    
                
            })
            })
                

                
        })

    })



})

// @route   POST /post/create/image/body
// @desc    Create image post
// @access  Private
router.post('/create/audio/body', [components.auth, components.increment], (req, res) => {
    const userId = req.user.id
    const userName = req.user.displayName
    const incId = req.inc.next    
    const sentIp = req.ip

    

    const AudioOP = new AudioOPSchema({
        numerical_id: incId,
        submitter_id: userId,
        submitter_name: userName,
        sent_ip: sentIp
            })

        AudioOP.save()
            .then(audio_doc => {
                res.status(201).json({audio_body_id: audio_doc._id})
             })
                .catch(e => {
                    res.status(500).json({ e })
                    console.log(e)
                })
    
    
})

// @route   POST /post/create/audio/file/:postid
// @desc    Upload audio
// @access  Private
router.post('/create/audio/file/:postid', components.auth, (req, res) => {
    const postId = req.params.postid
    const audFile = req.files.audFile

    const upload_dir = path.join(AUD_DIR, postId)
    
    fs.exists(upload_dir, exists => {
        if (!exists) {
            fs.mkdir(upload_dir, err => {
                
                if (err) throw err
                return
            })
        } else {
            
            console.log("Folder already exists!")
        }
    })

     

    const audExt = audFile.name.split(".").slice(-1)[0]

   AudioOPSchema.findOne({_id: postId})
    .then(op_doc => {
        const audName = op_doc.numerical_id

        const audLoc = path.join(upload_dir, `${audName}.${audExt}`)
        console.log(audLoc)
        audFile.mv(audLoc, err => {
            if (err) throw err

            ffprobe(audLoc, {path: ffprobeStatic.path}, (probe_err, info) => {
                
                if (probe_err) throw probe_err

                const duration = info.streams[0].tags.duration

            
            sha256File(audLoc, (err_sha256, check_sum) => {

                if (err_sha256) throw err_sha256
                const ThreadAudio = new ThreadAudioSchema({
                    thread_id: postId,
                    audio_file_id: '',
                    audio_metadata_id: ''
                })

                ThreadAudio.save()
                    .then(thread_aud_doc => {

                        const AudioFile = new AudioFileSchema({
                            thread_audio_id: thread_aud_doc._id,
                            upload_path: audLoc
                        })    
                        
                        AudioFile.save()
                            .then(aud_file_doc => {
                                const AudioMetadata = new AudioMetadataSchema({
                                    thread_audio_id: thread_aud_doc._id,
                                    sha256: check_sum,
                                    type: audExt,
                                    mime_type: audFile.mimetype,
                                    size: audFile.size,
                                    duration: duration
                                })

                                AudioMetadata.save()
                                    .then(aud_md_doc => {
                                        ThreadAudioSchema.findOneAndUpdate({_id: thread_aud_doc._id},
                                                        {
                                                            audio_file_id: aud_file_doc._id,
                                                            audio_metadata_id: aud_md_doc.id
                                                        }, {new: true})
                                                        .then(update_doc => {

                                                            AudioOPSchema.findOneAndUpdate({_id: postId},
                                                                {$set: {audio_id: update_doc._id }},
                                                                {upsert: true})
                                                                    .then(() => {
                                                                        res.status(200).json({
                                                                            thread_audio_id: thread_aud_doc._id,
                                                                            audio_file_id: aud_file_doc._id,
                                                                            aud_metadata_id: aud_md_doc._id,
                                                                            audio_location: audLoc
                                                                        })
                                                                    })
                                                                    .catch(e => {
                                                                        console.log(e)
                                                                    })
                                                        }
                                                            
                                                            
                                                            )
                                                            .catch(e => {
                                                                console.log(e)
                                                            })
                                                                
                                    })
                                    .catch(e => {
                                        console.log(e)
                                    })
                            })
                            .catch(e => {
                                console.log(e)
                            })
                    


                    })
                    .catch(e => {
                        console.log(e)
                    })
                
                    
                    
                
            })
            })
                

                
        })

    })



})

// @route   POST /post/create/op/content/:postid
// @desc    Add content
// @access  Private
router.post('/create/op/content/:postid', components.auth, (req, res) => {
    const postId = req.params.postid

    const {postType, postTitle, postMessage} = req.body

    PostContent = new PostContentSchema({
        post_id: postId,
        post_type: postType,
        title: postTitle,
        message: postMessage 
    })

    PostContent.save()
        .then(doc => {
            if (postType === 'image' || postType === 'anonymous') {
                ImageOPSchema.findByIdAndUpdate({_id: postId}, {$set: {content_id: doc._id}}, {upsert: true})
                    .catch(e => {
                        res.status(500).json({e})
                        console.log(e)}) 
            } else if (postType === 'video') {
                VideoOPSchema.findByIdAndUpdate({_id: postId}, {$set: {content_id: doc._id}}, {upsert: true})
                    .catch(e => {
                        res.status(500).json({e})
                        console.log(e)}) 
            } else if (postType === 'audio') {
                AudioOPSchema.findByIdAndUpdate({_id: postId}, {$set: {content_id: doc._id}}, {upsert: true})
                    .catch(e => {
                        res.status(500).json({e})
                        console.log(e)}) 
            }

            res.status(200).json({ doc })
        })
            .catch(e => {
                res.status(500).json({ e })
                console.log(e)
            })
})

// @route   POST /post/create/op/ham-spam/:postid
// @desc    Add content
// @access  Private
router.post('/create/op/ham-spam/:postid', components.auth, (req, res) => {
    const postId = req.params.postid
    const {hamPercentage, spamPercentage, postType} = req.body
    const HamSpam = new HamSpamSchema({
        post_id: postId,
        ham_percentage: hamPercentage,
        spam_percentage: spamPercentage,
        post_type: postType
    })

    HamSpam.save()
        .then(doc => {
            if (postType === 'image' || postType === 'anonymous') {
                ImageOPSchema.findByIdAndUpdate({_id: postId}, {$set: {ham_spam_id: doc._id}}, {upsert: true})
                    .catch(e => {
                        res.status(500).json({e})
                        console.log(e)
                    })
            } else if (postType === 'video') {
                VideoOPSchema.findByIdAndUpdate({_id: postId}, {$set: {ham_spam_id: doc._id}}, {upsert: true})
                    .catch(e => {
                        res.status(500).json({e})
                        console.log(e)
                    })
            } else if (postType === 'audio') {
                AudioOPSchema.findByIdAndUpdate({_id: postId}, {$set: {ham_spam_id: doc._id}}, {upsert: true})
                    .catch(e => {
                        res.status(500).json({e})
                        console.log(e)
                    })
            }

            res.status(200).json({doc})

        })
            .catch(e => {
                  res.status(500).json({e})
                  console.log(e)
                 })
})

//PUTs

// @route   PUT /post/set/op/hidden/:postid
// @desc    Hide/unhide image
// @access  Private
router.put('/set/op/image/hidden/:postid', components.auth, (req, res) => {
    const authId = req.user.id
    const postId = req.params.postid
    const userHiddenBool = (req.body.userHidden === 'true')
    const modHiddenBool = (req.body.modHidden === 'true')
    const adminHiddenBool = (req.body.adminHidden === 'true')
    const janitorHiddenBool = (req.body.janitorHidden === 'true')

    UserPermissionSchema.findOne({_id: authId})
        .then(perm_doc => {
            ImageOPSchema.findOne({_id: postId})
                .then(op_doc => {
                    const is_submitter = op_doc.submitter_id === authId

                    if (is_submitter) {
                        HiddenPostSchema.findOneAndUpdate({_id: op_doc.hidden_id}, {
                            $setOnInsert: {
                                user_hidden: userHiddenBool
                            },
                            $set: {
                                user_hidden: userHiddenBool,
                            }
                        }, {new: true, upsert: true, setDefaultsOnInsert: true})
                            .then(updated_doc => {
                               ImageOPSchema.findOneAndUpdate({_id: postId}, {
                                   $set: {hidden_id: updated_doc._id}
                               }, {upsert: true})
                                .catch(e => {
                                    res.status(500).json({ e })
                                    console.log(e)
                                })
                                res.status(200).json({ update_doc })

                            })
                                .catch(e => {
                                    res.status(500).json({ e })
                                    console.log(e)
                                })

                    } else if (perm_doc.is_admin) {
                        HiddenPostSchema.findOneAndUpdate({_id: op_doc.hidden_id}, {
                            $setOnInsert: {
                                admin_hidden: adminHiddenBool
                            },
                            $set: {
                                admin_hidden: adminHiddenBool,
                            }
                        }, {new: true, upsert: true, setDefaultsOnInsert: true})
                            .then(updated_doc => {
                               ImageOPSchema.findOneAndUpdate({_id: postId}, {
                                   $set: {hidden_id: updated_doc._id}
                               }, {upsert: true})
                                .catch(e => {
                                    res.status(500).json({ e })
                                    console.log(e)
                                })
                                res.status(200).json({ update_doc })

                            })
                                .catch(e => {
                                    res.status(500).json({ e })
                                    console.log(e)
                                })

                            } else if (perm_doc.is_mod) {
                                HiddenPostSchema.findOneAndUpdate({_id: op_doc.hidden_id}, {
                                    $setOnInsert: {
                                        mod_hidden: modHiddenBool
                                    },
                                    $set: {
                                        mod_hidden: modHiddenBool,
                                    }
                                }, {new: true, upsert: true, setDefaultsOnInsert: true})
                                    .then(updated_doc => {
                                       ImageOPSchema.findOneAndUpdate({_id: postId}, {
                                           $set: {hidden_id: updated_doc._id}
                                       }, {upsert: true})
                                        .catch(e => {
                                            res.status(500).json({ e })
                                            console.log(e)
                                        })
                                        res.status(200).json({ update_doc })
        
                                    })
                                        .catch(e => {
                                            res.status(500).json({ e })
                                            console.log(e)
                                        })
                            } else if (perm_doc.is_janitor) {
                                HiddenPostSchema.findOneAndUpdate({_id: op_doc.hidden_id}, {
                                    $setOnInsert: {
                                        janitor_hidden: janitorHiddenBool
                                    },
                                    $set: {
                                        janitor_hidden: janitorHiddenBool,
                                    }
                                }, {new: true, upsert: true, setDefaultsOnInsert: true})
                                    .then(updated_doc => {
                                       ImageOPSchema.findOneAndUpdate({_id: postId}, {
                                           $set: {hidden_id: updated_doc._id}
                                       }, {upsert: true})
                                        .catch(e => {
                                            res.status(500).json({ e })
                                            console.log(e)
                                        })
                                        res.status(200).json({ update_doc })
        
                                    })
                                        .catch(e => {
                                            res.status(500).json({ e })
                                            console.log(e)
                                        })

                                    }
        })
    

    
} )

// @route   PUT /post/set/op/hidden/:postid
// @desc    Hide/unhide video
// @access  Private
router.put('/set/op/video/hidden/:postid', components.auth, (req, res) => {
    const authId = req.user.id
    const postId = req.params.postid
    const userHiddenBool = (req.body.userHidden === 'true')
    const modHiddenBool = (req.body.modHidden === 'true')
    const adminHiddenBool = (req.body.adminHidden === 'true')
    const janitorHiddenBool = (req.body.janitorHidden === 'true')

    UserPermissionSchema.findOne({_id: authId})
        .then(perm_doc => {
            VideoOPSchema.findOne({_id: postId})
                .then(op_doc => {
                    const is_submitter = op_doc.submitter_id === authId

                    if (is_submitter) {
                        HiddenPostSchema.findOneAndUpdate({_id: op_doc.hidden_id}, {
                            $setOnInsert: {
                                user_hidden: userHiddenBool
                            },
                            $set: {
                                user_hidden: userHiddenBool,
                            }
                        }, {new: true, upsert: true, setDefaultsOnInsert: true})
                            .then(updated_doc => {
                               VideoOPSchema.findOneAndUpdate({_id: postId}, {
                                   $set: {hidden_id: updated_doc._id}
                               }, {upsert: true})
                                .catch(e => {
                                    res.status(500).json({ e })
                                    console.log(e)
                                })
                                res.status(200).json({ update_doc })

                            })
                                .catch(e => {
                                    res.status(500).json({ e })
                                    console.log(e)
                                })

                    } else if (perm_doc.is_admin) {
                        HiddenPostSchema.findOneAndUpdate({_id: op_doc.hidden_id}, {
                            $setOnInsert: {
                                admin_hidden: adminHiddenBool
                            },
                            $set: {
                                admin_hidden: adminHiddenBool,
                            }
                        }, {new: true, upsert: true, setDefaultsOnInsert: true})
                            .then(updated_doc => {
                               VideoOPSchema.findOneAndUpdate({_id: postId}, {
                                   $set: {hidden_id: updated_doc._id}
                               }, {upsert: true})
                                .catch(e => {
                                    res.status(500).json({ e })
                                    console.log(e)
                                })
                                res.status(200).json({ update_doc })

                            })
                                .catch(e => {
                                    res.status(500).json({ e })
                                    console.log(e)
                                })

                            } else if (perm_doc.is_mod) {
                                HiddenPostSchema.findOneAndUpdate({_id: op_doc.hidden_id}, {
                                    $setOnInsert: {
                                        mod_hidden: modHiddenBool
                                    },
                                    $set: {
                                        mod_hidden: modHiddenBool,
                                    }
                                }, {new: true, upsert: true, setDefaultsOnInsert: true})
                                    .then(updated_doc => {
                                       VideoOPSchema.findOneAndUpdate({_id: postId}, {
                                           $set: {hidden_id: updated_doc._id}
                                       }, {upsert: true})
                                        .catch(e => {
                                            res.status(500).json({ e })
                                            console.log(e)
                                        })
                                        res.status(200).json({ update_doc })
        
                                    })
                                        .catch(e => {
                                            res.status(500).json({ e })
                                            console.log(e)
                                        })
                            } else if (perm_doc.is_janitor) {
                                HiddenPostSchema.findOneAndUpdate({_id: op_doc.hidden_id}, {
                                    $setOnInsert: {
                                        janitor_hidden: janitorHiddenBool
                                    },
                                    $set: {
                                        janitor_hidden: janitorHiddenBool,
                                    }
                                }, {new: true, upsert: true, setDefaultsOnInsert: true})
                                    .then(updated_doc => {
                                       VideoOPSchema.findOneAndUpdate({_id: postId}, {
                                           $set: {hidden_id: updated_doc._id}
                                       }, {upsert: true})
                                        .catch(e => {
                                            res.status(500).json({ e })
                                            console.log(e)
                                        })
                                        res.status(200).json({ update_doc })
        
                                    })
                                        .catch(e => {
                                            res.status(500).json({ e })
                                            console.log(e)
                                        })

                                    }
        })
    

    
} )


// @route   PUT /post/set/op/hidden/:postid
// @desc    Hide/unhide audio
// @access  Private
router.put('/set/op/audio/hidden/:postid', components.auth, (req, res) => {
    const authId = req.user.id
    const postId = req.params.postid
    const userHiddenBool = (req.body.userHidden === 'true')
    const modHiddenBool = (req.body.modHidden === 'true')
    const adminHiddenBool = (req.body.adminHidden === 'true')
    const janitorHiddenBool = (req.body.janitorHidden === 'true')

    UserPermissionSchema.findOne({_id: authId})
        .then(perm_doc => {
            AudioOPSchema.findOne({_id: postId})
                .then(op_doc => {
                    const is_submitter = op_doc.submitter_id === authId

                    if (is_submitter) {
                        HiddenPostSchema.findOneAndUpdate({_id: op_doc.hidden_id}, {
                            $setOnInsert: {
                                user_hidden: userHiddenBool
                            },
                            $set: {
                                user_hidden: userHiddenBool,
                            }
                        }, {new: true, upsert: true, setDefaultsOnInsert: true})
                            .then(updated_doc => {
                               AudioOPSchema.findOneAndUpdate({_id: postId}, {
                                   $set: {hidden_id: updated_doc._id}
                               }, {upsert: true})
                                .catch(e => {
                                    res.status(500).json({ e })
                                    console.log(e)
                                })
                                res.status(200).json({ update_doc })

                            })
                                .catch(e => {
                                    res.status(500).json({ e })
                                    console.log(e)
                                })

                    } else if (perm_doc.is_admin) {
                        HiddenPostSchema.findOneAndUpdate({_id: op_doc.hidden_id}, {
                            $setOnInsert: {
                                admin_hidden: adminHiddenBool
                            },
                            $set: {
                                admin_hidden: adminHiddenBool,
                            }
                        }, {new: true, upsert: true, setDefaultsOnInsert: true})
                            .then(updated_doc => {
                               AudioOPSchema.findOneAndUpdate({_id: postId}, {
                                   $set: {hidden_id: updated_doc._id}
                               }, {upsert: true})
                                .catch(e => {
                                    res.status(500).json({ e })
                                    console.log(e)
                                })
                                res.status(200).json({ update_doc })

                            })
                                .catch(e => {
                                    res.status(500).json({ e })
                                    console.log(e)
                                })

                            } else if (perm_doc.is_mod) {
                                HiddenPostSchema.findOneAndUpdate({_id: op_doc.hidden_id}, {
                                    $setOnInsert: {
                                        mod_hidden: modHiddenBool
                                    },
                                    $set: {
                                        mod_hidden: modHiddenBool,
                                    }
                                }, {new: true, upsert: true, setDefaultsOnInsert: true})
                                    .then(updated_doc => {
                                       AudioOPSchema.findOneAndUpdate({_id: postId}, {
                                           $set: {hidden_id: updated_doc._id}
                                       }, {upsert: true})
                                        .catch(e => {
                                            res.status(500).json({ e })
                                            console.log(e)
                                        })
                                        res.status(200).json({ update_doc })
        
                                    })
                                        .catch(e => {
                                            res.status(500).json({ e })
                                            console.log(e)
                                        })
                            } else if (perm_doc.is_janitor) {
                                HiddenPostSchema.findOneAndUpdate({_id: op_doc.hidden_id}, {
                                    $setOnInsert: {
                                        janitor_hidden: janitorHiddenBool
                                    },
                                    $set: {
                                        janitor_hidden: janitorHiddenBool,
                                    }
                                }, {new: true, upsert: true, setDefaultsOnInsert: true})
                                    .then(updated_doc => {
                                       AudioOPSchema.findOneAndUpdate({_id: postId}, {
                                           $set: {hidden_id: updated_doc._id}
                                       }, {upsert: true})
                                        .catch(e => {
                                            res.status(500).json({ e })
                                            console.log(e)
                                        })
                                        res.status(200).json({ update_doc })
        
                                    })
                                        .catch(e => {
                                            res.status(500).json({ e })
                                            console.log(e)
                                        })

                                    }
        })
    

        })
} )


// @route   PUT /post/set/image/content/:postid
// @desc    Edit post content
// @access  Private
route.put('/set/image/content/:postid', components.auth, (req, res) => {
    const authId = req.user.id
    const postId = req.params.postid
    const {postTitle, postMessage} = req.body

    ImageOPSchema.findOne({_id: postid})
        .then(op_doc => {
            const contentId = op_doc.content_id
            const now = moment()
            const submittedDate = moment(op_doc.date_submitted)
            const difference = now.diff(submittedDate, 'minutes')
            const is_submitter = op_doc.submitter_id === authId
            
            if (difference <= 30 && is_submitter) {
                PostContentSchema.updateOne({_id: contentId}, {
                    title: postTitle,
                    message: postMessage
                })
                    .then(() => {
                        ImageOPSchema.findOneAndUpdate({_id: postId}, {
                            $set: {edited: true, 
                            edited_date: new Date()}
                        }, {upsert: true})
                            .catch(e => {
                                res.status(500).json({ e })
                                console.log(e)
                            })
                        res.status(200).json({message: "Title and message updated."})})
                        .catch(e => {
                            res.status(500).json({e})
                            console.log(e)
                        })
            } else if (difference > 30 && is_submitter) {
                PostContentSchema.updateOne({_id: contentId}, {
                    message: postMessage
                })
                    .then(() => {
                        ImageOPSchema.findOneAndUpdate({_id: postId}, {
                            $set: {edited: true, 
                            edited_date: new Date()}
                        }, {upsert: true})
                            .catch(e => {
                                res.status(500).json({ e })
                                console.log(e)
                            })
                        res.status(200).json({message: "Message updated."})})
                        .catch(e => {
                            res.status(500).json({e})
                            console.log(e)
                        })
            }
            
        })
})


// @route   PUT /post/set/video/content/:postid
// @desc    Edit post content
// @access  Private
route.put('/set/video/content/:postid', components.auth, (req, res) => {
    const authId = req.user.id
    const postId = req.params.postid
    const {postTitle, postMessage} = req.body

    VideoOPSchema.findOne({_id: postid})
        .then(op_doc => {
            const contentId = op_doc.content_id
            const now = moment()
            const submittedDate = moment(op_doc.date_submitted)
            const difference = now.diff(submittedDate, 'minutes')
            const is_submitter = op_doc.submitter_id === authId
            
            if (difference <= 30 && is_submitter) {
                PostContentSchema.updateOne({_id: contentId}, {
                    title: postTitle,
                    message: postMessage
                })
                    .then(() => {
                        VideoOPSchema.findOneAndUpdate({_id: postId}, {
                            $set: {edited: true, 
                            edited_date: new Date()}
                        }, {upsert: true})
                            .catch(e => {
                                res.status(500).json({ e })
                                console.log(e)
                            })
                        res.status(200).json({message: "Title and message updated."})})
                        .catch(e => {
                            res.status(500).json({e})
                            console.log(e)
                        })
            } else if (difference > 30 && is_submitter) {
                PostContentSchema.updateOne({_id: contentId}, {
                    message: postMessage
                })
                    .then(() => {
                        VideoOPSchema.findOneAndUpdate({_id: postId}, {
                            $set: {edited: true, 
                            edited_date: new Date()}
                        }, {upsert: true})
                            .catch(e => {
                                res.status(500).json({ e })
                                console.log(e)
                            })
                        res.status(200).json({message: "Message updated."})})
                        .catch(e => {
                            res.status(500).json({e})
                            console.log(e)
                        })
            }
            
        })
})


//DELs
// @route   DELETE /post/delete/op/image/delete/:postid
// @desc    Delete image OP
// @access  Private
router.delete('/delete/op/image/delete/:postid', components.auth, (req, res) => {
    const authId = req.user.id
    const postId = req.params.postid
    UserPermissionSchema.findOne({user_id: authId})
        .then(perm_doc => {
            ImageFileSchema.findOne({_id: postId})
                .then(op_doc => {
                    const is_submitter = op_doc.submitter_id === authId

                    if (perm_doc.is_admin || perm_doc.is_mod || perm_doc.is_janitor || is_submitter) {
                        ImageFileSchema.deleteOne({_id: postId})
                            .then(() => {
                                ThreadImageSchema.findOne({_id: op_doc.image_id})
                                    .then(thrd_image_doc => {
                                        ImageFileSchema.findOne({_id: thrd_image_doc.image_file_id})
                                            .then(img_file_doc => {
                                                fs.unlinkSync(img_file_doc.upload_path)
                                                ImageMetadataSchema.deleteOne({_id: thrd_image_doc.image_metadata.id})
                                                    .then(() => {
                                                        ImageFileSchema.deleteOne({_id: thrd_image_doc.image_file_id})
                                                            .then(() => {
                                                                ThreadImageSchema.deleteOne({_id: op_doc.image_id})
                                                                    .then(() => {
                                                                        ImageOPSchema.deleteOne({_id: postId})
                                                                            .then(() => res.status(200).json({message: "Image Thread Deleted."}))
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

// @route   PUT /post/set/audio/content/:postid
// @desc    Edit post content
// @access  Private
route.put('/set/audio/content/:postid', components.auth, (req, res) => {
    const authId = req.user.id
    const postId = req.params.postid
    const {postTitle, postMessage} = req.body

    AudioOPSchema.findOne({_id: postid})
        .then(op_doc => {
            const contentId = op_doc.content_id
            const now = moment()
            const submittedDate = moment(op_doc.date_submitted)
            const difference = now.diff(submittedDate, 'minutes')
            const is_submitter = op_doc.submitter_id === authId
            
            if (difference <= 30 && is_submitter) {
                PostContentSchema.updateOne({_id: contentId}, {
                    title: postTitle,
                    message: postMessage
                })
                    .then(() => {
                        AudioOPSchema.findOneAndUpdate({_id: postId}, {
                            $set: {edited: true, 
                            edited_date: new Date()}
                        }, {upsert: true})
                            .catch(e => {
                                res.status(500).json({ e })
                                console.log(e)
                            })
                        res.status(200).json({message: "Title and message updated."})})
                        .catch(e => {
                            res.status(500).json({e})
                            console.log(e)
                        })
            } else if (difference > 30 && is_submitter) {
                PostContentSchema.updateOne({_id: contentId}, {
                    message: postMessage
                })
                    .then(() => {
                        AudioOPSchema.findOneAndUpdate({_id: postId}, {
                            $set: {edited: true, 
                            edited_date: new Date()}
                        }, {upsert: true})
                            .catch(e => {
                                res.status(500).json({ e })
                                console.log(e)
                            })
                        res.status(200).json({message: "Message updated."})})
                        .catch(e => {
                            res.status(500).json({e})
                            console.log(e)
                        })
            }
            
        })
})

// @route   Delete /post/delete/op/video/delete/:postid
// @desc    Delete video OP
// @access  Private
router.delete('/delete/op/video/delete/:postid', components.auth, (req, res) => {
    const authId = req.user.id
    const postId = req.params.postid
    UserPermissionSchema.findOne({user_id: authId})
        .then(perm_doc => {
            VideoFileSchema.findOne({_id: postId})
                .then(op_doc => {
                    const is_submitter = op_doc.submitter_id === authId

                    if (perm_doc.is_admin || perm_doc.is_mod || perm_doc.is_janitor || is_submitter) {
                        VideoFileSchema.deleteOne({_id: postId})
                            .then(() => {
                                ThreadVideoSchema.findOne({_id: op_doc.video_id})
                                    .then(thrd_video_doc => {
                                        VideoFileSchema.findOne({_id: thrd_video_doc.video_file_id})
                                            .then(vid_file_doc => {
                                                fs.unlinkSync(vid_file_doc.upload_path)
                                                VideoMetadataSchema.deleteOne({_id: thrd_video_doc.video_metadata.id})
                                                    .then(() => {
                                                        VideoFileSchema.deleteOne({_id: thrd_video_doc.video_file_id})
                                                            .then(() => {
                                                                ThreadVideoSchema.deleteOne({_id: op_doc.video_id})
                                                                    .then(() => {
                                                                        VideoOPSchema.deleteOne({_id: postId})
                                                                            .then(() => res.status(200).json({message: "Video Thread Deleted."}))
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

// @route   DELETE /post/delete/op/audio/delete/:postid
// @desc    Delete audio
// @access  Private
router.delete('/delete/op/audio/delete/:postid', components.auth, (req, res) => {
    const authId = req.user.id
    const postId = req.params.postid
    UserPermissionSchema.findOne({user_id: authId})
        .then(perm_doc => {
            AudioFileSchema.findOne({_id: postId})
                .then(op_doc => {
                    const is_submitter = op_doc.submitter_id === authId

                    if (perm_doc.is_admin || perm_doc.is_mod || perm_doc.is_janitor || is_submitter) {
                        AudioFileSchema.deleteOne({_id: postId})
                            .then(() => {
                                ThreadAudioSchema.findOne({_id: op_doc.audio_id})
                                    .then(thrd_audio_doc => {
                                        AudioFileSchema.findOne({_id: thrd_audio_doc.audio_file_id})
                                            .then(aud_file_doc => {
                                                fs.unlinkSync(aud_file_doc.upload_path)
                                                AudioMetadataSchema.deleteOne({_id: thrd_audio_doc.audio_metadata.id})
                                                    .then(() => {
                                                        AudioFileSchema.deleteOne({_id: thrd_audio_doc.audio_file_id})
                                                            .then(() => {
                                                                ThreadAudioSchema.deleteOne({_id: op_doc.audio_id})
                                                                    .then(() => {
                                                                        AudioOPSchema.deleteOne({_id: postId})
                                                                            .then(() => res.status(200).json({message: "Audio Thread Deleted."}))
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
},)},)
module.exports = router