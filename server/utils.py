import time

def getFilename(metadata,filename):
    extension=filename.split('.')[-1]
    name = metadata['title'].replace(' ','')+str(int(time.time()))+'.'+extension
    return name
