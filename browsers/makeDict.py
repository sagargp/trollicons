import sys, os

#files = os.listdir(sys.argv[1])
#
#print "var rages = {};";
#for file in files:
#	if file[-4:] != '.png':	
#		continue
#	
#	emot = file[0:-4]
#	fields = emot.split('-')
#	for emoticon in fields[1:]:
#		print "rages['%s'] = \"%s\";" % (emoticon, file)



def getFiles(dir):
	base = dir
	subs = []
	
	for node in os.listdir(dir):
		print 'looking at "',
		print node,
		print '"',
		if os.path.isfile(node):
			print '...yielding'
			yield node
		else:
			print '...appending' 
			subs.append(os.path.join(base, node))
	
	for subdir in subs:
		print 'inspecting '
		print subdir
		for thing in getFiles(subdir):
			yield thing

if __name__ == '__main__':
	for file in getFiles('.'):
		print file