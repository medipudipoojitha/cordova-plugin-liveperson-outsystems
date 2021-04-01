'use strict';

const xcode = require('xcode'),
  fs = require('fs'),
  path = require('path'),
  request = require('sync-request'),
  AdmZip = require("adm-zip");

const SDK_URL = 'https://github.com/medipudipoojitha/iOSPodSpecs/raw/master/iOSFrameworks.zip';
const ZIP_FILE = 'platforms/ios/LPMessagingSDK.zip';

var COMMENT_KEY = /_comment$/;

module.exports = function(context) {
  if(process.length >=5 && process.argv[1].indexOf('cordova') == -1) {
    if(process.argv[4] != 'ios') {
      return; // plugin only meant to work for ios platform.
    }
  }

  function fromDir(startPath,filter, rec, multiple){
    if (!fs.existsSync(startPath)){
      console.log("no dir ", startPath);
      return;
    }

    const files=fs.readdirSync(startPath);
    var resultFiles = []
    for(var i=0;i<files.length;i++){
      var filename=path.join(startPath,files[i]);
      var stat = fs.lstatSync(filename);
      if (stat.isDirectory() && rec){
        fromDir(filename,filter); //recurse
      }

      if (filename.indexOf(filter)>=0) {
        if (multiple) {
          resultFiles.push(filename);
        } else {
          return filename;
        }
      }
    }
    if(multiple) {
      return resultFiles;
    }
  }

  function nonComments(obj) {
    var keys = Object.keys(obj),
      newObj = {}, i = 0;

    for (i; i < keys.length; i++) {
      if (!COMMENT_KEY.test(keys[i])) {
        newObj[keys[i]] = obj[keys[i]];
      }
    }

    return newObj;
  }

  function unquote(str) {
    if (str) return str.replace(/^"(.*)"$/, "$1");
  }

  // Download LPMessagingSDK
  console.log('Downloading: ' + SDK_URL + '...');
  var res = request('GET', SDK_URL);
  fs.writeFileSync(ZIP_FILE, res.getBody());

  // Extract
  console.log('Extracting: ' + ZIP_FILE + '...');
  var zip = new AdmZip(ZIP_FILE);
  zip.extractAllTo("platforms/ios", true);

  const xcodeProjPath = fromDir('platforms/ios','.xcodeproj', false);
  const projectPath = xcodeProjPath + '/project.pbxproj';
  const myProj = xcode.project(projectPath);

  myProj.parseSync();

  myProj.addFramework('LPMessagingSDK/LPMessagingSDK.xcframework');

  console.log('Adding LPMessagingSDKModels.bundle to Resources');
  myProj.addBuildPhase([], 'PBXCopyFilesBuildPhase', 'Copy Files', myProj.getFirstTarget().uuid)
  myProj.addCopyfile('LPMessagingSDK/LPMessagingSDKModels.bundle');

  var configurations = nonComments(myProj.pbxXCBuildConfigurationSection());
  for (var config in configurations) {
    var buildSettings = configurations[config].buildSettings;

    if (Object.prototype.hasOwnProperty.call(buildSettings, 'ALWAYS_EMBED_SWIFT_STANDARD_LIBRARIES')) {
      if (unquote(buildSettings['ALWAYS_EMBED_SWIFT_STANDARD_LIBRARIES']) === "NO") {
        console.log('Setting ALWAYS_EMBED_SWIFT_STANDARD_LIBRARIES property');
        buildSettings['ALWAYS_EMBED_SWIFT_STANDARD_LIBRARIES'] = "YES";
      }
    } else {
      console.log('Adding ALWAYS_EMBED_SWIFT_STANDARD_LIBRARIES property');
      buildSettings['ALWAYS_EMBED_SWIFT_STANDARD_LIBRARIES'] = "YES";
    }
  }

  fs.writeFileSync(projectPath, myProj.writeSync());
  console.log('Added LPMessagingSDK to pbxproj', myProj.writeSync());
};
