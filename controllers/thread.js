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
const PostContentSchema = Thread.PostComt
const UserSchema = require("../models/User").User
const Media = require("../models/Media")
const ThreadImageSchema = Media.ThreadImage
const ImageFileSchema = Media.ImageFile
const ImageMetadataSchema = Media.ImageMetadata

const express = require("express")
const router = express.Router()
const components = require("../middleware/components")
const fs = require('fs');
const path = require("path")
var sha256File = require('sha256-file')
var ExifImage = require('exif').ExifImage
//GETs



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
                            
                            ImageFile.save()
                                .then(img_file_doc => {
                                    const ImageMetadata = new ImageMetadataSchema({
                                        thread_image_id: thread_img_doc._id,
                                        sha256: check_sum,
                                        type: imgExt,
                                        mime_type: imgFile.mimetype,
                                        size: imgFile.size,
                                        exif_data: metadata
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

            sha256File(vidLoc, (err_sha256, check_sum) => {

                if (err_sha256) throw err_sha256
                const ThreadVideo = new ThreadVideoSchema({
                    thread_id: postId,
                    video_file_id: '',
                    video_metadata_id: ''
                })

                ThreadVideo.save()
                    .then(thread_vid_doc => {

                        ExifVideo({video: vidLoc}, (err_metadata, metadata) => {
                            if (err_metadata) {
                                console.log(err_metadata)
                                metadata = {}
                                
                            }
                            
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
                                        exif_data: metadata
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
                                                                                vid_metadata_id: vid_md_doc._id
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


//PUTs













//DELs




module.exports = router