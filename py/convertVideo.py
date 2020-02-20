from converter import Converter
conv = Converter()
import os

class VideoConverter:
    __videoLoc = None
    __dirname = None
    __oldFile = None
    def __init__(self):
        pass        

    def convert_video(self, videoLoc):       
        nameWithExt = videoLoc.split("\\")[-1]
        extension = nameWithExt.split(".")[-1]
        name = nameWithExt.split(".")[-2]    

        newFile = name + ".mp4"
        path = videoLoc.replace(nameWithExt, '')
        newPath = path + newFile
        newOld = path + "old." + extension

        os.rename(videoLoc, newOld)
        print(newOld)
        print(newPath)
        convert = conv.convert(newOld, newPath, {
                'format': 'mp4',
                'audio': {
                'codec': 'aac',
                'samplerate': 11025,
                'channels': 2
            },
                'video': {
                'codec': 'hevc',
                'width': 720,
                'height': 400,
                'fps': 25
                 }})

        for timecode in convert:
            print(f'\rConverting ({timecode:.2f}) ...')

        os.remove(newOld)