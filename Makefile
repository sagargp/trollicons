PLATFORM=`uname`

all:
	cp -r Icons/ trollicons.AdiumEmoticonset
	cp -r Icons/ trollicons

	zip trollicons.zip trollicons.AdiumEmoticonset

	python adium2pidgin.py trollicons.AdiumEmoticonset > trollicons/theme
	tar -czf trollicons.tar.gz trollicons/

	echo "Adium iconset created at trollicons.zip"
	echo "Pidgin iconset created at trollicons.tar.gz"

install: all
	if [[ "$PLATFORM" == 'Linux' ]]; then
		tar -xf trollicons.tar.gz -C ~/.purple/smileys/
		echo "Installed at ~/.purple/smileys"
	elif [[ "$PLATFORM" == 'Darwin' ]]; then
		cp -r trollicons.AdiumEmoticonset/ ~/Library/Application\ Support/Adium\ 2.0/Emoticons/
		echo "Installed in Lirary/Application Support/Adium 2.0/Emoticons/"
		echo "You will need to restart Adium"
	fi

clean:
	rm -rf trollicons.AdiumEmoticonset/ trollicons/ trollicons.zip trollicons.tar.gz 