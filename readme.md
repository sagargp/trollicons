# Trollicons

__Rage Icons for Adium, Pidgin, Digsby, and Miranda. (Trillian coming soon)__

## A Graphical Overview
![Overview](http://i.imgur.com/gY1il.png)

## Authors
* Sagar Pandya [sagargp@gmail.com](mailto:sagargp@gmail.com)
* Chris Li [github.com/unregistered](https://github.com/unregistered)

## Installation
Click Downloads to grab the latest version from github.

### Adium
To install, double click the trollicons emoticon pack.

### Pidgin
To install on Linux, unzip trollicons.zip into
~/.purple/smileys

## Building
### To checkout source:
	git clone git://github.com/sagargp/trollicons.git
	
### Using Rake:
You may have to install rake.

	(sudo) gem install rake builder
	
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