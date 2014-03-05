//NOTE: Cordova File api has some issues with file reading in iOS 6
document.addEventListener("deviceready", onDeviceReady, false);
//Activate :active state
document.addEventListener("touchstart", function() {}, false);

function onDeviceReady() {
    //navigator.splashscreen.hide();
	var fileApp = new FileApp();
	fileApp.run();
}

function FileApp() {
}

FileApp.prototype = {
	fileSystemHelper: null,
	fileNameField: null,
	textField: null,
     
	run: function() {
		var that = this,
    		runButton = document.getElementById("runButton"),
    		uploadButton = document.getElementById("uploadButton"),
    		downloadButton = document.getElementById("downloadButton");
        
		that.fileNameField = document.getElementById("fileNameInput");
		that.textField = document.getElementById("textInput");
    
		fileSystemHelper = new FileSystemHelper();
        
		runButton.addEventListener("click",
										 function() {
                                             //fileSystemHelper.localFileSystem();
                                             fileSystemHelper.directoryEntry();
                                             //fileSystemHelper.fileEntry();
										 });
        
		uploadButton.addEventListener("click",
										function() {
											fileSystemHelper.fileUpload();
										});
        
		downloadButton.addEventListener("click",
										  function() {
											  fileSystemHelper.fileDownload();
										  });
    }
}