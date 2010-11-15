#!/usr/bin/env python
import sys
import os
from random import random
from base64 import b64encode
from zipfile import ZipFile
from plistlib import readPlist
import shutil
def main(args):
  #create a simple random string for our temporary folder
  rnd=b64encode(args[0])
  rnd=".ka.tmp.%s"%(rnd)
  if not os.path.exists(os.path.join("/","tmp",rnd)):
    os.mkdir(os.path.join("/","tmp",rnd))
  
  #helper function
  def ljoin(l):return " ".join(["%s"%(k) for k in l])
  
  #try to open a zip
  try:
    zip=ZipFile(args[0])
  except IOError:
    #exit with an error code, etc
    pass
  
  assert repr(zip.__class__).split(' ')[1]=='zipfile.ZipFile'
  
  #we have a zip file and a tmp identifier. what next? extract, of course
  os.chdir(os.path.join("/","tmp",rnd))
  zip.extractall(os.curdir)
  for f in os.listdir(os.curdir):
    if "adiumemoticonset" in f.lower():
      s=True
      break
  if not s:
    #exit with an error code
    pass
  else:
    folder=f
    theme=f+"/theme"
    name=f.split('.')[0]
    ###Main function.
    ##Parse plist
    # ./*.AdiumEmoticonSet/Emoticons.plist
    pl=readPlist('%s/Emoticons.plist'%(folder))
    #get main document
    emot=pl['Emoticons']
    ##generate a list
    #header
    #TODO: generate a better generator header
    fStr=""
    fStr += "################################################################################\n"
    fStr += "###        GENERATED WITH Lunis Neko's AdiumXtraEmoticonSet converter        ###\n"
    fStr += "###   CONTACT: Jonathan \"Lunis Neko\" Davis <lunis[at]kittyanarchy[dot]net>   ###\n"
    fStr += "################################################################################\n"
    fStr += "name=%s\n"%(name)
    fStr += "description=Port of Adium's %s.\n"%(name)
    fStr += "icon=%s\n"%(emot.items()[0][0])
    fStr += "author=%s\n"%("Lunis Neko <lunis[at]kittyanarchy[dot]net>")
    fStr += "[default]\n"
    for g in emot:
      fStr += "%s %s\n"%(str(g),ljoin(emot[g]['Equivalents']))
    #print fStr
    file=open("%s/theme"%(folder),"w+",0)
    file.write(fStr)
    file.flush()
    file.close()
    #At this point our theme file is writte. Time for cleanup.
    #os.path.expanduser('~')
    os.remove("%s/Emoticons.plist"%(folder))
    dest=os.path.join(os.path.expanduser('~'),".purple","smileys")
    shutil.copytree(folder,"%s/%s"%(dest,name))
    shutil.rmtree(os.path.join("/","tmp",rnd))

if __name__=="__main__":
  main(sys.argv[1:])