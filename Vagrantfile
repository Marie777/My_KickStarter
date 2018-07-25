# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "bofh/mongodb"
  config.vm.network "forwarded_port", guest: 27017, host: 27017
end
