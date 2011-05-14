import sys, os

files = os.listdir('chrome/img')

print "var rages = {};";
for file in files:
	if file[-4:] != '.png':	
		continue
	
	emot = file[0:-4]
	fields = emot.split('-')
	for emoticon in fields[1:]:
		print "rages['%s'] = \"%s\";" % (emoticon, file)
