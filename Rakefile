# Maintainer: Chris -- https://github.com/unregistered
require 'pathname'
require 'pry' if ENV["DEBUG"]

PACKAGEMAKER_PATH = '/Applications/Xcode.app/Contents/Applications/PackageMaker.app/Contents/MacOS/PackageMaker'

task :default => [:all]

desc "Does rake -T"
task :help do
  sh "rake -T"
end

desc "Cleans out the build directory"
task :clean do
  rm_rf "build"
end

desc "Alias for build:all"
task :all => ['build:all']

namespace :install do
  desc "Installs for Adium on Mac OS X"
  task :adium do
    sh "open build/trollicons.AdiumEmoticonset"
    puts "Restart Adium".red
  end
  
  desc "Installs in iChat.app, requires root"
  task :ichat do
    sh "sudo cp -R ./build/-trollicons-ichat/ /Applications/iChat.app/Contents/PlugIns/Standard.smileypack/Contents/Resources/"
    puts "Restart iChat".red
  end
  
  desc "Installs for Colloquy on Mac OS X"
  task :colloquy do
    sh "cp -R ./build/trollicons.colloquyEmoticons ~/Library/Application\\ Support/Colloquy/Emoticons/"
    puts "Restart Colloquy".red
  end
end

namespace :build do
  desc "Builds all packages we have support for."
  task :all => [:adium, :colloquy, :pidgin, :digsby, :gajim, :miranda, :trillian, :ichat, :extension, :psi]

  desc "Builds for Adium on OSX"
  task :adium do
    require 'builder'
  
    puts "\nBuilding for Adium".bold
    ri = RIcons.new
    
    #Adium uses an XML file
    b = Builder::XmlMarkup.new(:target=>(markup=String.new), :indent=>2)
    b.comment! "Auto-generated. Run rake build:adium."
    b.instruct! :xml, :version=>"1.0", :encoding=>"UTF-8"
    b.declare! :DOCTYPE, :plist, :PUBLIC, "-//Apple//DTD PLIST 1.0//EN", "http://www.apple.com/DTDs/PropertyList-1.0.dtd"
    b.plist "version"=>"1.0" do
      b.dict{
        b.key "AdiumSetVersion"
        b.real "1.3"
        b.key "Emoticons"
        b.dict{
          ri.each_emoticon do |r|
                            
            b.key r.cleanpath
            b.dict{
              b.key "Equivalents"
              b.array{
                r.aliases.each {|a| b.string "[#{a}]" }
              }
              b.key "Name"
              b.string r.name              
            }
          
          end
        }
      }
    end
  
    ri.dump_icons_to_folder('trollicons.AdiumEmoticonset')
    Pathname.new('./build/trollicons.AdiumEmoticonset/Emoticons.plist').open('w'){|io| io << markup}
  end
  
  desc "Builds for Colloquy"
  task :colloquy do
    require 'builder'
  
    puts "\nBuilding for Colloquy".bold
    ri = RIcons.new
    
    #Colloquy uses an XML file Info.plist
    b = Builder::XmlMarkup.new(:target=>(infomarkup=String.new), :indent=>2)
    b.comment! "Auto-generated. Run rake build:colloquy."
    b.instruct! :xml, :version=>"1.0", :encoding=>"UTF-8"
    b.declare! :DOCTYPE, :plist, :PUBLIC, "-//Apple//DTD PLIST 1.0//EN", "http://www.apple.com/DTDs/PropertyList-1.0.dtd"
    b.plist "version"=>"1.0" do
      b.dict{
        b.key "CFBundleDevelopmentRegion"
        b.string "English"
        b.key "CFBundleGetInfoString"
        b.string "Trollicons Colloquy Chat Emoticons"
        b.key "CFBundleIdentifier"
        b.string "cc.javelin.colloquy.emoticons.trollicons"
        b.key "CFBundleInfoDictionaryVersion"
        b.string "6.0"
        b.key "CFBundleName"
        b.string "Trollicons"
        b.key "CFBundlePackageType"
        b.string "coEm"
      }
    end
    
    #Colloquy uses an XML file menu.plist
    b = Builder::XmlMarkup.new(:target=>(menumarkup=String.new), :indent=>2)
    b.comment! "Auto-generated. Run rake build:colloquy."
    b.instruct! :xml, :version=>"1.0", :encoding=>"UTF-8"
    b.declare! :DOCTYPE, :plist, :PUBLIC, "-//Apple//DTD PLIST 1.0//EN", "http://www.apple.com/DTDs/PropertyList-1.0.dtd"
    b.plist "version"=>"1.0" do
      b.array{
        ri.each_emoticon do |r|
          b.dict{
            b.key "image"                
            b.string r.cleanpath
            b.key "insert"
            b.string "[" + r.aliases.first + "]"
            b.key "name"
            b.string r.name              
          }
        end
      }
    end
    
    #Colloquy uses an XML file emoticons.plist
    b = Builder::XmlMarkup.new(:target=>(emoticonsmarkup=String.new), :indent=>2)
    b.comment! "Auto-generated. Run rake build:colloquy."
    b.instruct! :xml, :version=>"1.0", :encoding=>"UTF-8"
    b.declare! :DOCTYPE, :plist, :PUBLIC, "-//Apple//DTD PLIST 1.0//EN", "http://www.apple.com/DTDs/PropertyList-1.0.dtd"
    b.plist "version"=>"1.0" do
      b.dict{
        ri.each_emoticon do |r|
          b.key r.aliases.first
          b.array{
             r.aliases.each {|a| b.string "[#{a}]" }             
          }
        end
      }
    end
    
    #Colloquy uses a CSS file emoticons.css
    css = ".emoticon samp { display: none; }\n"
    css += ".emoticon:after { vertical-align: -25%; }\n"
    ri.each_emoticon do |r|
      css += ".emoticon." + r.aliases.first + ":after { content: url( \"" + r.cleanpath + "\" ); }\n"
    end
  
    ri.dump_icons_to_folder('trollicons.colloquyEmoticons/Contents/Resources')
    Pathname.new('./build/trollicons.colloquyEmoticons/Contents/Info.plist').open('w'){|io| io << infomarkup}
    Pathname.new('./build/trollicons.colloquyEmoticons/Contents/Resources/menu.plist').open('w'){|io| io << menumarkup}
    Pathname.new('./build/trollicons.colloquyEmoticons/Contents/Resources/emoticons.plist').open('w'){|io| io << emoticonsmarkup}
    Pathname.new('./build/trollicons.colloquyEmoticons/Contents/Resources/emoticons.css').open('w'){|io| io << css}
  end
  
  desc "Builds for iChat"
  task :ichat do
    require 'builder'
  
    puts "\nBuilding for iChat".bold
    next unless file_exists PACKAGEMAKER_PATH
    
    ri = RIcons.new
    
    #iChat uses an XML file
    b = Builder::XmlMarkup.new(:target=>(markup=String.new), :indent=>2)
    b.comment! "Auto-generated. Run rake build:ichat."
    b.instruct! :xml, :version=>"1.0", :encoding=>"UTF-8"
    b.declare! :DOCTYPE, :plist, :PUBLIC, "-//Apple//DTD PLIST 1.0//EN", "http://www.apple.com/DTDs/PropertyList-1.0.dtd"
    b.plist "version"=>"1.0" do
      b.dict{
        b.key "Smileys"
        b.array{
          ri.each_emoticon do |r|
            b.dict{
              b.key "ASCII Representations"
              b.array{
                r.aliases.each {|a| b.string "[#{a}]"}
              }
              b.key "Image Name"
              b.string r.cleanpath
              b.key "Description"
              b.string r.name
              b.key "Speech Description"
              b.string "Trollicon #{r.name}"
            }
          end
        }
      }
    end
  
    ri.dump_icons_to_folder('-trollicons-ichat')    
    mkdir_p './build/-trollicons-ichat/English.lproj'
    Pathname.new('./build/-trollicons-ichat/English.lproj/Smileys.plist').open('w'){|io| io << markup}
    
    # Make a .pkg file
    puts "Making a pkg installer".bold
    cmd = PACKAGEMAKER_PATH + " "
    cmd += "--root ./build/-trollicons-ichat "
    cmd += "--out ./build/trollicons-ichat.pkg "
    cmd += "--install-to /Applications/iChat.app/Contents/PlugIns/Standard.smileypack/Contents/Resources "
    cmd += "--id com.sagargp.trollicons "
    cmd += "--title \"Trollicons for iChat\""
    sh cmd
    
    # Distribute the uninstaller
    puts "Creating uninstaller".bold
    cmd = PACKAGEMAKER_PATH + " "
    cmd += "--root ./iChat-uninstaller/Resources "
    cmd += "--out ./build/trollicons-ichat-uninstaller.pkg "
    cmd += "--install-to /Applications/iChat.app/Contents/PlugIns/Standard.smileypack/Contents/Resources "
    cmd += "--id com.sagargp.trollicons-uninstaller "
    cmd += "--title \"Uninstall Trollicons for iChat\""
    sh cmd
  end
  
  desc "Builds for Messages.app"
  task :imessages do
    require 'builder'
  
    puts "\nBuilding for Messages.app".bold
    next unless file_exists PACKAGEMAKER_PATH

    ri = RIcons.new
    
    #iChat uses an XML file
    b = Builder::XmlMarkup.new(:target=>(markup=String.new), :indent=>2)
    b.comment! "Auto-generated. Run rake build:ichat."
    b.instruct! :xml, :version=>"1.0", :encoding=>"UTF-8"
    b.declare! :DOCTYPE, :plist, :PUBLIC, "-//Apple//DTD PLIST 1.0//EN", "http://www.apple.com/DTDs/PropertyList-1.0.dtd"
    b.plist "version"=>"1.0" do
      b.dict{
        b.key "Smileys"
        b.array{
          ri.each_emoticon do |r|
            b.dict{
              b.key "ASCII Representations"
              b.array{
                r.aliases.each {|a| b.string "[#{a}]"}
              }
              b.key "Image Name"
              b.string r.cleanpath
              b.key "Description"
              b.string r.name
              b.key "Speech Description"
              b.string "Trollicon #{r.name}"
            }
          end
        }
      }
    end
  
    ri.dump_icons_to_folder('-trollicons-ichat')    
    mkdir_p './build/-trollicons-ichat/English.lproj'
    Pathname.new('./build/-trollicons-ichat/English.lproj/Smileys.plist').open('w'){|io| io << markup}
    
    # Make a .pkg file
    puts "Making a pkg installer".bold
    cmd = PACKAGEMAKER_PATH + " "
    cmd += "--root ./build/-trollicons-ichat "
    cmd += "--out ./build/trollicons-ichat.pkg "
    cmd += "--install-to /Applications/iChat.app/Contents/PlugIns/Standard.smileypack/Contents/Resources "
    cmd += "--id com.sagargp.trollicons "
    cmd += "--title \"Trollicons for iChat\""
    sh cmd
    
    # Distribute the uninstaller
    puts "Creating uninstaller".bold
    cmd = PACKAGEMAKER_PATH + " "
    cmd += "--root ./iChat-uninstaller/Resources "
    cmd += "--out ./build/trollicons-ichat-uninstaller.pkg "
    cmd += "--install-to /Applications/iChat.app/Contents/PlugIns/Standard.smileypack/Contents/Resources "
    cmd += "--id com.sagargp.trollicons-uninstaller "
    cmd += "--title \"Uninstall Trollicons for iChat\""
    sh cmd
  end


  desc "Builds for Pidgin"
  task :pidgin do
    puts "\nBuilding for Pidgin".bold
  
    #Create markup, from adium2pidgin.py
    iconStr  = "#################################################\n"
    iconStr += "## Auto-generated, run rake build:pidgin       ##\n"
    iconStr += "#  Created by Sagar Pandya (sagargp@gmail.com)  #\n"
    iconStr += "#  www.reddit.com/user/sagarp                   #\n"
    iconStr += "#  www.reddit.com/r/fffffffuuuuuuuuuuuu         #\n"
    iconStr += "##  See https://github.com/sagargp/trollicons  ##\n"
    iconStr += "#################################################\n"

    iconStr += "Name=Trollicons\n"
    iconStr += "Description=An iconset made out of rage faces from reddit.com's F7U12 sub\n"
    iconStr += "Icon=Happy-SoMuchWin.png\n"
    iconStr += "Author=Sagar Pandya\n\n"
    iconStr += "[default]\n";
  
    ri = RIcons.new.each_emoticon do |r|
      iconStr += "#{r.cleanpath} #{r.aliases.collect{|a| "[#{a}]"}.join(' ')}\n"
    end
  
    #Write
    ri.dump_icons_to_folder('trollicons-pidgin')
    Pathname.new('build/trollicons-pidgin/theme').open('w'){|io| io << iconStr}
  end

  desc "Builds for Digsby"
  task :digsby do
    puts "\nBuilding for Adium".bold
  
    list = "trollicons\n"
    ri = RIcons.new.each_emoticon do |r|
      r.aliases.each do |a|
        list += "#{r.cleanpath} [#{a}]\n"
      end
    end
  
    ri.dump_icons_to_folder('trollicons-digsby')
    Pathname.new('build/trollicons-digsby/emoticons.txt').open('w'){|io| io << list}
  end

  desc "Builds for Gajim"
  task :gajim do
    puts "\nBuilding for Gajim".bold
  
    string = "#Name=\"Trollicons\"\n"
    string += "#Description=\"This is the trollicons pack for Gajim. Find it on github.\"\n"
    string += "#Icon=\"Happy-SoMuchWin.png\"\n"
    string += "#Author=\"Sagar Pandya\"\n\n"
    string += "#[default]\n"
    
    string += "emoticons = {"
    list = []
    ri = RIcons.new.each_emoticon do |r|
      list.push("'#{r.cleanpath}': ['#{r.aliases.collect{|a| "[#{a}]"}.join('\', \'')}']")
    end
    string += list.join(",\n")
    string += "}"
    
    ri.dump_icons_to_folder('trollicons-gajim')
    Pathname.new('build/trollicons-gajim/emoticons.py').open('w'){|io| io << string}
  end

  desc "Builds for Miranda"
  task :miranda do
    puts "\nBuilding for Miranda".bold
  
    string = "Name=\"Trollicons\"\r\n"
    string += "Description=\"This is the trollicons pack for Miranda. Find it on github.\"\r\n"
    string += "Icon=\"Happy-SoMuchWin.png\"\r\n"
    string += "Author=\"Sagar Pandya\"\r\n\r\n"
    string += "[default]\r\n"
  
    ri = RIcons.new.each_emoticon do |r|
      string += "Smiley = \"#{r.cleanpath}\", 0, \"#{r.aliases.collect{|a| "[#{a}]"}.join(' ')}\"\r\n"
    end
  
    ri.dump_icons_to_folder('trollicons-miranda')
    Pathname.new('build/trollicons-miranda/Trollicons.msl').open('w'){|io| io << string}
  end

  desc "Builds for Trillian"
  task :trillian do
    require 'quick_magick'
    require 'builder'
  
    puts "\nBuilding for Trillian".bold
    ri = RIcons.new
    
    #Trillian uses an XML file
    b = Builder::XmlMarkup.new(:target=>(markup=String.new), :indent=>2)
    b.comment! "Auto-generated. Run rake build:trillian. github.com/sagargp/trollicons"
    ri.each_emoticon do |r|
      b.bitmap :name => r.name, :file => "../../stixe/plugins/trollicons-trillian/icons/#{r.cleanpath}"
    end
  
    b.prefs{
      b.control :name => "emoticons", :type => "emoticons" do
  		    
        ri.each_category do |cat|
          
          b.group :text => "#{cat.name};".to_sym, :initial => 0 do
            cat.files.each do |r|
              r.aliases.each_with_index do |a, i|
                # Get image size
                image = QuickMagick::Image.open( r.to_s ).first

                b.emoticon :text => "[#{a.to_s}]", :button => (i==0 ? "yes" : "") do
                  b.source :name => r.name, :left => "0", :right => "#{image.width}", :top => "0", :bottom => "#{image.height+10}"
                end
              end
            end
          end
          
        end   
             
      
        # Some required stuff
      	b << "&Emoticon-Extensions;\n"
      	b << "&iniMenuItemColor;\n"
      	b << "&iniIconMenuItemSettings;\n"
      	b.font :name => "selection", :source => 'ttfDefault', :type => '&iniDefaultFontName;'.to_sym, :size => '&iniDefaultFontSize;'.to_sym
      end
    }
  
    # It also uses a desc.txt file
    string = "Trollicons emoticon set built on #{Time.now}\nemot"
  
    ri.dump_icons_to_folder('trollicons-trillian/icons')
    #binding.pry
    cp ri.files.select{|f| f.aliases.include? 'trollicons'}.first.to_s, "build/trollicons-trillian/emoticon.png" # Header image
    cp ri.files.select{|f| f.aliases.include? 'win'}.first.to_s, "build/trollicons-trillian/preview.png" # Header image
    preview = QuickMagick::Image.open("build/trollicons-trillian/preview.png").first
    preview.save "build/trollicons-trillian/preview.bmp"
    rm "build/trollicons-trillian/preview.png"
    
    Pathname.new('./build/trollicons-trillian/main.xml').open('w'){|io| io << markup}
    Pathname.new('./build/trollicons-trillian/desc.txt').open('w'){|io| io << string}
  end

  desc "Builds a Chrome extension/user-script"
  task :extension do
    require "json"
    
  	puts "\nBuilding Chrome extension".bold
    next unless file_exists './extension/lib/trollicons.pem'
    
    # open extension/trollicons/manifest.json
    # add 0.1 to the version number
    manifestFile = File.new("extension/trollicons/manifest.json", "r")
    manifest = JSON.parse(manifestFile.read)
    manifest['version'] = String((Float(manifest['version']) + 0.1).round(1))
    manifestFile.close()

    manifestFile = File.new("extension/trollicons/manifest.json", "w")
    manifestFile.write(JSON.pretty_generate(manifest))
    manifestFile.close()

  	cmd = "cp -r Icons/ extension/trollicons/img"
  	cmd += " && \"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome\" --pack-extension=extension/trollicons/ --pack-extension-key=extension/lib/trollicons.pem"
  	system cmd
  
	  puts "\nBuilding extension Zip file for upload to Chrome website".bold
  	cmd = "cd extension/trollicons"
  	cmd += "&& zip -r ../../build/trollicons-chrome.zip *"
  	cmd += "&& cd -"
  	system cmd

  	puts "\nCleaning up...".bold
  	
  	cmd = "mv extension/trollicons.crx build/"
  	cmd += " && rm -rf extension/trollicons/img"
  	system cmd
  end
  
  desc "Builds for Psi"
  task :psi do
    require 'builder'
    
    puts "\nBuilding for Psi".bold
    ri = RIcons.new

    #Psi uses an XML file
    b = Builder::XmlMarkup.new(:target=>(markup=String.new), :indent=>2)
    b.instruct! :xml, :version=>"1.0", :encoding=>"UTF-8"
    b.icondef do
      b.meta{
        b.name "Trollicons"
        b.version "1.3"
        b.description "This is the trollicons pack for Psi. Find it on github."
        b.home "https://github.com/sagargp/trollicons"
        b.author "Sagar Pandya", :email=>"sagargp@gmail.com"
        b.creation "#{Time.now.year}-#{Time.now.month}-#{Time.now.day}"
      }
      ri.each_emoticon do |r|
        b.icon{
          r.aliases.each {|a| b.text "[#{a}]"}
          b.object r.cleanpath, :mime => "image/png"
        }
      end
    end
  
    ri.dump_icons_to_folder('trollicons-psi')
    Pathname.new('build/trollicons-psi/icondef.xml').open('w'){|io| io << markup}
  end
end

desc "Tweet a message"
task :tweet do
  require "rubygems"
  require "twitter"
  require "json"

  auth = JSON.parse(File.new("trolliconsAuth.ignore", "r").read)
  print "Type the message: "
  STDIN.gets
  Twitter.configure do |config|
    config.consumer_key       = auth['consumer_key']
    config.consumer_secret    = auth['consumer_secret']
    config.oauth_token        = auth['oauth_token']
    config.oauth_token_secret = auth['oauth_token_secret']
  end
  
  client = Twitter::Client.new
  client.update $_
end

desc "Checks out submodule of binaries"
task :submodule do
  sh "git submodule init"
  sh "git submodule update"
end

desc "Packages all folders in build/ for distribution"
task :dist do
  mkdir_p 'build'
  n = Pathname.new('./build').children.select{|f| f.extname != '.zip' and f.directory? and f.basename.to_s[0] != '-' }.each do |d| 
    Dir.chdir('./build/') do 
      sh "zip -r #{d.basename}.zip #{d.basename}"
    end
  end
  if n.count > 0
    puts "Done, built #{n.count} packages".green
  else
    puts "No packages found. Perhaps you'd like to build some?".red
    Rake::Task["help"].execute
  end
end

desc "Deploys all archives to GitHub"
task :deploy => :submodule do
  Dir.chdir('./build') do
    Pathname.new('.').each_child.select{|c| c.extname == '.zip'}.each do |f|
      mv f.to_s, "../trollicon-binaries/#{f.basename}"
    end
  end
  
  print "\nNOTE: Chrome extension requires manual upload!\n".red
end

desc "Lists all faces and aliases"
task :doc do
  ri = RIcons.new
  
  ri.each_category do |c|
    puts "#{c.name}".bold
    c.files.each do |r|
      print "\t#{r.name} : "
      r.aliases.each{|a| print "[#{a}]"}
      print "\n"
    end
  end
end

class RIcons
  begin
	  include Rake::DSL
	rescue Exception
  end
  attr_accessor :files
  
  def initialize
    @files = self.get_files
    @count = files.count
  end
  
  def get_categories
    Pathname.new("Icons").children.select{|d| d.directory?}.map{|d| RCategory.new(d)}
  end
  
  def get_files(directory="Icons")
    puts "Scanning Icon directory"
    files = []
    Pathname.new(directory).children.each do |f|
      if f.directory? # WE NEED TO GO DEEPER
        files = files | Pathname.new(f).children.select{|f| (f.extname == '.png' || f.extname == '.gif') }.map{|f| RIcon.new(f).init } # Merge arrays
      else
        files << RIcon.new(f).init if f.extname == '.png'
      end
    end
    unless files.count
      puts "No files found"
      return []
    end
    puts "Processing #{files.count} files.".green
    
    # Process the Trollicons version file
    v = files.index(Pathname.new("Icons/Trollicons-trollicons.png"))
    files[v].name = " Trollicons (#{files.count} icons) (build date: #{Time.now.month}-#{Time.now.day}-#{Time.now.year})"   
    
    files
  end
  
  def each_category
    get_categories.each do |c|
      yield c if block_given?
    end
    self
  end
    
  def each_emoticon
    files.each do |f|    
      yield f if block_given?
    end
    self
  end
  
  def dump_icons_to_folder(folder)
    #Check for name collisions
    seen = []
    files.each do |f|
      unless seen.find_index(f.cleanpath)  
        seen << f.cleanpath
      else
        puts "Found a naming collision with #{f.cleanpath}. Please resolve it.".red
        return
      end
    end
    
    # Check for alias collisions
    c = Hash.new(0)
    files.each do |f|
      f.aliases.each do |a|
        c[a] += 1
        puts "Alias collision on #{a} in #{f}".red if c[a] > 1
      end
    end
    
    #Clean old stuff
    rm_rf "build/#{folder}"

    mkdir_p "build/#{folder}"
    files.each{|f| cp f.to_s, "build/#{folder}/#{f.cleanpath}"}
    
    puts "Moved #{files.count} files.".green
  end
  
end

class RCategory
  attr_accessor :name, :path, :files
  def initialize(dir)
    @path = dir
    @name = @path.basename
    @files = get_files
    puts "Warning: empty category \"#{@name}\"".yellow if @files.empty?
  end
  
  def get_files
    @path.children.select{|f| f.extname == '.png'}.map{|f| RIcon.new(f).init}
  end
end

class RIcon < Pathname
  attr_accessor :file, :name, :aliases, :namespace, :cleanpath
  def initialize(pathname)
    super(pathname)
    @file = pathname
  end
  
  def init
    @aliases = @file.basename.to_s.chomp(@file.extname).split("-")
    #extract the face name, now the rest will contain aliases
    @name = @aliases.shift
    
    # correct for folders
    if @file.to_s =~ /^Icons\/(.*)\/(.*)$/
      @namespace = $1
      @name = "#{@namespace} - #{@name}"
      @cleanpath = @name.gsub(/\!|\?| |'|"/, '') + @file.extname
    elsif @file.to_s =~ /^Icons\/(.*)$/
      @cleanpath = @name.gsub(/\!|\?| |'|"/, '') + @file.extname
    end
    self
  end
    
  #def basename(*args) Pathname.new(File.basename(@path, *args)) end
end

class String
  def bold
    return "\e[1m#{self}\e[0m"
  end
  def red
    return "\e[31m#{self}\e[0m"
  end
  def green
    return "\e[32m#{self}\e[0m"
  end
  def yellow
    return "\e[33m#{self}\e[0m"
  end
end

def file_exists file
  t = Pathname.new(file).file?
  unless t
    puts "#{file} not found. Skipping...".red
  end
  t
end

