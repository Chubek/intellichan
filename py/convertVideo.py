import moviepy.editor as mp
import os

class VideoConverter:
    __videoLoc = None
    __dirname = None
    __oldFile = None
    def __init__(self):
        pass        

    def convert_video(self, videoLoc, width, height, bitrate):       
        nameWithExt = videoLoc.split("\\")[-1]
        extension = nameWithExt.split(".")[-1]
        name = nameWithExt.split(".")[-2]    

        newFile = name + ".mp4"
        path = videoLoc.replace(nameWithExt, '')
        newPath = path + newFile
        newOld = path + "old." + extension

        os.rename(videoLoc, newOld)
       
        clip = mp.VideoFileClip(newOld)
        clip_resized = clip.resize(width=width, height=height)
        clip_resized.write_videofile(newPath, bitrate=bitrate)
        os.remove(newOld)