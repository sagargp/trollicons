# Trollicons

__Rage Icons for Adium, Pidgin, Digsby, Miranda, and Trillian__

## A Graphical Overview
![Overview](http://i.imgur.com/LntRv.png)

## Authors
* Sagar Pandya [sagargp@gmail.com](mailto:sagargp@gmail.com)
* Chris Li [github.com/unregistered](https://github.com/unregistered)
* Jonathan E. Chen [github.com/wikichen](https://github.com/wikichen)

## Installation
Click Downloads to grab the latest version from github.

### Adium (OS X)
Double click to unzip. Then, double click the trollicons emoticon pack to install.

### Pidgin (Linux, Windows)

#### Linux
To install on Linux, unzip trollicons.zip into
`~/.purple/smileys`

#### Windows
To install on Windows, unzip trollicons.zip into `.purple/smileys`

The location of this folder varies by version of Windows:

* For Windows 2000/XP/Vista/7, entering `%APPDATA%` in your Windows Explorer address bar will take you to the right directory
* On Windows XP, it will be something like `C:\Documents and Settings\username\Application Data`
* On Windows Vista/7, it will be something like `C:\Users\username\AppData\Roaming\`
* For Windows 98/ME it will be something like `C:\Windows\Profiles\username`

For more details see [pidgin's site](http://developer.pidgin.im/wiki/SmileyThemes)

### Trillian (Windows)
Unzip the icons into `C:\Program Files\Trillian\stixe\plugins\` and enable the icon pack in the Trillian preferences, under Skins.

### Miranda (Windows)
See [Miranda's wiki](http://wiki.miranda-im.org/Smileys).

### Digsby (Windows)
Delete or rename `C:\Program Files\Digsby\res\emoticons\default` and unzip trollicons into `C:\Program Files\Digsby\res\emoticons\`

## Building
### To checkout source:
	git clone git://github.com/sagargp/trollicons.git
	
### Using Rake:
You may have to install rake.

	(sudo) gem install rake builder pry
	
If that doesn't work you may have to install ruby, which is out of this readme's scope.
	
Type `rake -T` to see available tasks. 

### Adding new Icons
Icons are located in the `Icons` directory. They're named in the format

	{Optional Namespace}/{Icon Name}-{alias1}-{alias2}-{aliasn}.png

So `Troll/Troll-troll-problem-problem?.png` would compile to

	Name: Troll - Troll
	Aliases: [troll] [problem] [problem?]

### Adding support for another IM Client
Create a new task in the `Rakefile`.

### Contributing
1. Fork
2. Pull Request
3. ???
4. ![awyea](http://i.imgur.com/gvz8x.png)
