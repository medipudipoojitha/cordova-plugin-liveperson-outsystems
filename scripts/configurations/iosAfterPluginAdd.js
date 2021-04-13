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

  function construct(constructor, args) {
    function F() {
        return constructor.apply(this, args);
    }
    F.prototype = constructor.prototype;
    return new F();
  }

  var fakeFile = myProj.addSourceFile('fake.m');
  myProj.removeSourceFile('fake.m');

  var pbxFileCtor = Object.getPrototypeOf(fakeFile).constructor;

  var addCopyFile = function(path, target, fileRef) {
    var bundleFile = construct(pbxFileCtor, [path]);
    bundleFile.uuid = myProj.generateUuid();

    if (typeof(fileRef) === 'undefined') {
      bundleFile.fileRef = myProj.generateUuid();
    } else {
      bundleFile.fileRef = fileRef;
    }

    if (typeof(target) === 'undefined' || target == null) {
      bundleFile.target = myProj.getFirstTarget().uuid;
    } else {
      bundleFile.target = target;
    }
    
    myProj.addToPbxBuildFileSection(bundleFile);
    myProj.addToPbxFileReferenceSection(bundleFile);
    myProj.addToPbxCopyfilesBuildPhase(bundleFile);

    return bundleFile;
  };

  var addResourceFile = function(path, target, fileRef) {
    var bundleFileResource = construct(pbxFileCtor, [path]);
    bundleFileResource.uuid = myProj.generateUuid();

    if (typeof(fileRef) === 'undefined') {
      bundleFileResource.fileRef = myProj.generateUuid();
    } else {
      bundleFileResource.fileRef = fileRef;
    }

    if (typeof(target) === 'undefined' || target == null) {
      bundleFileResource.target = myProj.getFirstTarget().uuid;
    } else {
      bundleFileResource.target = target;
    }

    myProj.addToPbxBuildFileSection(bundleFileResource);
    myProj.addToPbxResourcesBuildPhase(bundleFileResource);
    
    return bundleFileResource;
  };

  var xcframeworkFile = construct(pbxFileCtor, ['LPMessagingSDK/LPMessagingSDK.xcframework']);
  xcframeworkFile.uuid = myProj.generateUuid();
  xcframeworkFile.fileRef = myProj.generateUuid();
  xcframeworkFile.target = myProj.getFirstTarget().uuid;
  myProj.addToPbxBuildFileSection(xcframeworkFile);
  myProj.addToPbxFileReferenceSection(xcframeworkFile);
  myProj.addToFrameworksPbxGroup(xcframeworkFile);
  myProj.addToPbxFrameworksBuildPhase(xcframeworkFile);

  var searchFile = construct(pbxFileCtor, ['LPMessagingSDK/LPMessagingSDK.xcframework']);
  searchFile.uuid = myProj.generateUuid();
  searchFile.fileRef = xcframeworkFile.fileRef;
  searchFile.target = myProj.getFirstTarget().uuid;
  myProj.addToFrameworkSearchPaths(searchFile);

  var embedFile = construct(pbxFileCtor, ['LPMessagingSDK/LPMessagingSDK.xcframework']);
  embedFile.uuid = myProj.generateUuid();
  embedFile.fileRef = xcframeworkFile.fileRef;
  embedFile.target = myProj.getFirstTarget().uuid;
  myProj.addToPbxBuildFileSection(embedFile);
  myProj.addToPbxEmbedFrameworksBuildPhase(embedFile);

  console.log('Adding LPMessagingSDKModels.bundle to Resources');
  myProj.addBuildPhase([], 'PBXCopyFilesBuildPhase', 'Copy Files', myProj.getFirstTarget().uuid);
  var file = addCopyFile('LPMessagingSDK/LPMessagingSDKModels.bundle');
  addResourceFile('LPMessagingSDK/LPMessagingSDKModels.bundle', null, file.fileRef);

  console.log('Adding LPMessagingSDK.xcframework to Resources');
  var pluginsGroup = myProj.pbxGroupByName('Frameworks');
  file = addCopyFile('LPMessagingSDK/LPMessagingSDK.xcframework', frameworksUuid);
  addResourceFile('LPMessagingSDK/LPMessagingSDK.xcframework', frameworksUuid, file.fileRef);
  
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

    if (Object.prototype.hasOwnProperty.call(buildSettings, 'SWIFT_VERSION')) {
      if (unquote(buildSettings['SWIFT_VERSION']) != "5.0") {
        console.log('Setting SWIFT_VERSION property');
        buildSettings['SWIFT_VERSION'] = "5.0";
      }
    } else {
      console.log('Adding SWIFT_VERSION property');
      buildSettings['SWIFT_VERSION'] = "5.0";
    }
  }

  fs.writeFileSync(projectPath, myProj.writeSync());
};
