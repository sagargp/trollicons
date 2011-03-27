# Maintainer: https://github.com/unregistered
require 'pathname'
#require 'pry'
require 'builder'
directory "build"

task :default => [:help]

desc "Does rake -T"
task :help do
  sh "rake -T"
end

desc "Cleans out the build directory"
task :clean do
  rm_rf "build/*"
end

desc "Packages all folders in build/ for distribution"
task :dist do
  n = Pathname.new('./build').children.select{|f| f.extname != '.zip' and f.directory? }.each{|d| sh "zip -r build/#{d.basename}.zip build/#{d.basename}" }
  if n.count > 0
    puts "Done, built #{n.count} packages".green
  else
    puts "No packages found. Perhaps you'd like to build some?".red
    Rake::Task["help"].execute
  end
end

desc "Builds all packages we have support for."
task :all => [:build_adium, :build_pidgin]

desc "Builds for Adium on OSX"
task :build_adium do
  puts "\nBuilding for Adium".bold
  files = get_files
  
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
        files.each do |f|
          aliases = f.basename.to_s.chomp(f.extname).split("-")
          #extract the face name, now the rest will contain aliases
          name = aliases.shift
          
          b.key f.basename
          b.dict{
            b.key "Equivalents"
            b.array{
              aliases.each {|a| b.string "[#{a}]" }
            }
            b.key "Name"
            b.string name
          }
        end
      }
    }
  end
  
  #Clean old stuff
  rm_rf "build/trollicons.AdiumEmoticonset"
  
  #Write to file
  mkdir_p "build"
  cp_r "Icons", "build/trollicons.AdiumEmoticonset"
  Pathname.new('./build/trollicons.AdiumEmoticonset/Emoticons.plist').open('w'){|io| io << markup}
end

desc "Builds for Pidgin"
task :build_pidgin do
  puts "\nBuilding for Pidgin".bold
  #Clean old stuff
  rm_rf "build/trollicons-pidgin"
  
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
  iconStr += "Icon=SoMuchWin.png\n"
  iconStr += "Author=Sagar Pandya\n\n"
  iconStr += "[default]\n";
  
  get_files.each do |f|
    aliases = f.basename.to_s.chomp(f.extname).split("-")
    #extract the face name, now the rest will contain aliases
    name = aliases.shift
    
    iconStr += "#{name} #{aliases.collect{|a| "[#{a}]"}.join(' ')}\n"
  end
  
  #Write
  cp_r "Icons", "build/trollicons-pidgin"
  Pathname.new('build/trollicons-pidgin/theme').open('w'){|io| io << iconStr}
end

def get_files
  puts "Scanning Icon directory"
  files = Pathname.new('./Icons').children.select{|f| f.extname == '.png' }
  unless files.count
    puts "No files found"
    return []
  end
  files
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