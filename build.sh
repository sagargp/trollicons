#!/usr/bin/env bash

PLATFORM=`uname`

function adium {
	cp -r Icons/ trollicons.AdiumEmoticonset
	zip trollicons.zip trollicons.AdiumEmoticonset > /dev/null

	echo "Adium iconset created at trollicons.zip."
}

function pidgin {
	cp -r Icons/ trollicons
	python adium2pidgin.py trollicons.AdiumEmoticonset > trollicons/theme
	tar -czf trollicons.tar.gz trollicons/

	echo "Pidgin iconset created at trollicons.tar.gz."
}

function install_adium {
	cp -r trollicons.AdiumEmoticonset ~/Library/Application\ Support/Adium\ 2.0/Emoticons/
	echo "Installed in Lirary/Application Support/Adium 2.0/Emoticons/"
	echo "You will need to restart Adium"
}

function install_pidgin {
	tar -xf trollicons.tar.gz -C ~/.purple/smileys/
	echo "Installed at ~/.purple/smileys"
}

function all {
	adium;
	pidgin;
}

function install {
	if [[ "$PLATFORM" == "Linux" ]]; then
		install_pidgin;
	elif [[ "$PLATFORM" == "Darwin" ]]; then
		install_adium;
	fi
}

function clean {
	echo -n "Cleaning..."
	rm -rf trollicons.AdiumEmoticonset/ trollicons/ trollicons.zip trollicons.tar.gz
	echo "done"
}

function dist {
	all;
	rm -rf trollicons.AdiumEmoticonset/ trollicons/
}

if [[ $1 ]]; then
	$1;
else
	echo "Usage:"
	echo "$0 [command]"
	echo "where [command] is one of the following:"
	echo
	(echo "adium-Create the smiley pack for Adium"
	echo "pidgin-Create the smiley pack for Pidgin"
	echo "install_adium-Install the Adium pack to your ~/Library folder on OSX"
	echo "install_pidgin-Install the Pidgin pack into ~/.purple/smileys"
	echo "all-Equivalent to running with 'adium' and 'pidgin'"
	echo "install-Runs 'install_adium' or 'install_pidgin' depending on your OS"
	echo "clean-Delete all interim files") | column -t -s-
fi
