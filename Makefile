PLATFORM=`uname`

all:
	cp -r Icons/ trollicons.AdiumEmoticonset
	zip trollicons.zip trollicons.AdiumEmoticonset
	python AdiumXtraEmoticonSet.py trollicons.zip

install:
	if [[ "$PLATFORM" == 'Linux' ]]; then
		#
	elif [[ "$PLATFORM" == 'Darwin' ]]; then
		#
	fi

clean:
	rm -rf trollicons.AdiumEmoticonset trollicons.zip