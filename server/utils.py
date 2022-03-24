import time
import mimetypes
import subprocess, json
mimetypes.init()

def getFilename(metadata,filename):
    extension=filename.split('.')[-1]
    name = metadata['title'].replace(' ','')+str(int(time.time()))+'.'+extension
    return name

def isVideoFile(fileName):
    mimestart = mimetypes.guess_type(fileName)[0]
    if mimestart != None:
        mimestart = mimestart.split('/')[0]
        if mimestart in ['video']:
            return True
    return False

def getVideoDuration(filename):
    result = subprocess.check_output(
            f'mediainfo --Output=JSON "{filename}"',
            shell=True).decode()
    tracks = json.loads(result)['media']['track']
    duration = tracks[0]['Duration']
    return (int(float(duration))+1)


