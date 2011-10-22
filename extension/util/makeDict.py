import os

def getFiles(dir):
  fileList = []

  for root, subFolders, files in os.walk(dir):
      for file in files:
          yield os.path.join(root,file)

if __name__ == '__main__':
  import sys
  
  print "var rages = {};"
  
  for file in getFiles(sys.argv[1]):
    if file[-4:] != '.png':
      continue
    
    emot = file[0:-4]
    fields = emot.split('-')
    for emoticon in fields[1:]:
      print "rages['%s'] = \"%s\";" % (emoticon, file)