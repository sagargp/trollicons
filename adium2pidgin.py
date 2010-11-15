#!/usr/bin/env python

import sys
from plistlib import readPlist

adiumSet = sys.argv[1]

iconStr  = "#################################################\n"
iconStr += "## Generated using adium2pidgin.py             ##\n"
iconStr += "#  Created by Sagar Pandya (sagargp@gmail.com)  #\n"
iconStr += "#  www.reddit.com/user/sagarp                   #\n"
iconStr += "#  www.reddit.com/r/fffffffuuuuuuuuuuuu         #\n"
iconStr += "##  See https://github.com/sagargp/trollicons  ##\n"
iconStr += "#################################################\n"

iconStr += "Name=Trollicons\n"
iconStr += "Description=An iconset made out of rage faces from reddit.com's F7U12 sub\n"
iconStr += "Icon=SoMuchWin.png\n"
iconStr += "Author=Sagar Pandya\n\n"
iconStr += "[default]\n";

emoticons = readPlist("%s/Emoticons.plist" % adiumSet)
for icon in emoticons['Emoticons']:
	iconStr += "%s\t%s\n" % (icon, ' '.join(emoticons['Emoticons'][icon]['Equivalents']))

print iconStr