# Maintainer: Chris -- https://github.com/unregistered
require 'pathname'
require 'pry'
#require 'RMagick'

task :default => [:help]

desc "Does rake -T"
task :help do
  sh "rake -T"
end

desc "Cleans out the build directory"
task :clean do
  rm_rf "build"
end

desc "Packages all folders in build/ for distribution"
task :dist do
  mkdir_p 'build'
  n = Pathname.new('./build').children.select{|f| f.extname != '.zip' and f.directory? }.each do |d| 
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

desc "Builds all packages we have support for."
task :all => [:build_adium, :build_pidgin, :build_digsby, :build_miranda, :build_trillian]

desc "Builds for Adium on OSX"
task :build_adium do
  require 'builder'
  
  puts "\nBuilding for Adium".bold
  A = RIcons.new
    
  #Adium uses an XML file
  b = Builder::XmlMarkup.new(:target=>(markup=String.new), :indent=>2)
  b.comment! "Auto-generated. Run rake build_adium."
  b.instruct! :xml, :version=>"1.0", :encoding=>"UTF-8"
  b.declare! :DOCTYPE, :plist, :PUBLIC, "-//Apple//DTD PLIST 1.0//EN", "http://www.apple.com/DTDs/PropertyList-1.0.dtd"
  b.plist "version"=>"1.0" do
    b.dict{
      b.key "AdiumSetVersion"
      b.real "1.3"
      b.key "Emoticons"
      b.dict{
        A.each_emoticon do |r|
                            
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
  
  A.dump_icons_to_folder('trollicons.AdiumEmoticonset')
  Pathname.new('./build/trollicons.AdiumEmoticonset/Emoticons.plist').open('w'){|io| io << markup}
end

desc "Builds for Pidgin"
task :build_pidgin do
  puts "\nBuilding for Pidgin".bold
  
  #Create markup, from adium2pidgin.py
  iconStr  = "#################################################\n"
  iconStr += "## Auto-generated, run rake build_pidgin       ##\n"
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
  
  P = RIcons.new.each_emoticon do |r|
    iconStr += "#{r.cleanpath} #{r.aliases.collect{|a| "[#{a}]"}.join(' ')}\n"
  end
  
  #Write
  P.dump_icons_to_folder('trollicons-pidgin')
  Pathname.new('build/trollicons-pidgin/theme').open('w'){|io| io << iconStr}
end

desc "Builds for Digsby"
task :build_digsby do
  puts "\nBuilding for Adium".bold
  
  list = "trollicons\n"
  D = RIcons.new.each_emoticon do |r|
    r.aliases.each do |a|
      list += "#{r.cleanpath} [#{a}]\n"
    end
  end
  
  D.dump_icons_to_folder('trollicons-digsby')
  Pathname.new('build/trollicons-digsby/emoticons.txt').open('w'){|io| io << list}
end

desc "Builds for Miranda"
task :build_miranda do
  puts "\nBuilding for Miranda".bold
  
  string = "Name=Trollicons\n"
  string += "Description=This is the trollicons pack for Miranda. Find it on github.\n"
  string += "Icon=Happy-SoMuchWin.png\n"
  string += "Author=sagargp\n\n"
  string += "[default]\n"
  
  M = RIcons.new.each_emoticon do |r|
    string += "Smiley = \"#{r.cleanpath}\", 0, \"#{r.aliases.collect{|a| "[#{a}]"}.join(' ')}\n\""
  end
  
  M.dump_icons_to_folder('trollicons-miranda')
  Pathname.new('build/trollicons-miranda/Trollicons.msl').open('w'){|io| io << string}
end

desc "Builds for Trillian"
task :build_trillian do
  require 'RMagick'
  require 'builder'
  
  puts "\nBuilding for Trillian".bold
  T = RIcons.new
    
  #Adium uses an XML file
  b = Builder::XmlMarkup.new(:target=>(markup=String.new), :indent=>2)
  b.comment! "Auto-generated. Run rake build_trillian. github.com/sagargp/trollicons"
  T.each_emoticon do |r|
    b.bitmap :name => r.name, :file => "../../stixe/plugins/trollicons-trillian/icons/#{r.cleanpath}"
  end
  
  b.prefs{
    b.control :name => "emoticons", :type => "emoticons" do
      #<group text="&wordBasicSmileys;" initial="1">
  		b.group :text => '&wordBasicSmileys;'.to_sym, :initial => 1 do
  		  
        T.each_emoticon do |r|
          r.aliases.each_with_index do |a, i|
            # Get image size
            image = Magick::Image.read( r.to_s ).first

            b.emoticon :text => "[#{a.to_s}]", :button => (i==0 ? "yes" : "") do
              b.source :name => r.name, :left => "0", :right => "#{image.columns}", :top => "0", :bottom => "#{image.rows+10}"
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
  
  T.dump_icons_to_folder('trollicons-trillian/icons')
  #binding.pry
  cp T.files.select{|f| f.aliases.include? 'trollicons'}.first.to_s, "build/trollicons-trillian/emoticon.png" # Header image
  cp T.files.select{|f| f.aliases.include? 'win'}.first.to_s, "build/trollicons-trillian/preview.png" # Header image
  Pathname.new('./build/trollicons-trillian/main.xml').open('w'){|io| io << markup}
  Pathname.new('./build/trollicons-trillian/desc.txt').open('w'){|io| io << string}
end

class RIcons
  attr_accessor :files
  
  def initialize
    @files = self.get_files
    @count = files.count
  end
  
  def get_files(directory="Icons")
    puts "Scanning Icon directory"
    files = []
    Pathname.new(directory).children.each do |f|
      if f.directory? # WE NEED TO GO DEEPER
        files = files | Pathname.new(f).children.select{|f| f.extname == '.png' }.map{|f| RIcon.new(f).init } # Merge arrays
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
    
    #Clean old stuff
    rm_rf "build/#{folder}"

    mkdir_p "build/#{folder}"
    files.each{|f| cp f.to_s, "build/#{folder}/#{f.cleanpath}"}
    
    puts "Moved #{files.count} files.".green
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
end