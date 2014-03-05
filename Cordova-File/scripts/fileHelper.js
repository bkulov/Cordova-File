
function FileSystemHelper() { 
}

FileSystemHelper.prototype = {
	
    // New functionality in Simulator
    localFileSystem: function() {
        var notificationBox = document.getElementById("result");

        //window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, failLocalFileSystem);
        window.requestFileSystem(LocalFileSystem.TEMPORARY, 0, onFileSystemSuccess, failLocalFileSystem);
       
        //window.resolveLocalFileSystemURI("file:///ast.txt", onResolveSuccess, failLocalFileSystem);
        //window.resolveLocalFileSystemURI("file:///11/ast.txt", onResolveSuccess, failLocalFileSystem);
        //window.resolveLocalFileSystemURI("file:///11/", onResolveSuccess, failLocalFileSystem);
        //window.resolveLocalFileSystemURI("/11", onResolveSuccess, failLocalFileSystem);
        //window.resolveLocalFileSystemURI("/", onResolveSuccess, failLocalFileSystem);

        function onFileSystemSuccess(fileSystem) {
            var fileSystemNameDiv = document.createElement("div"),
                fileSystemRootNameDiv = document.createElement("div"),
                fileSystemRootFullPathDiv = document.createElement("div");
                

            fileSystemNameDiv.innerText = "File System Name: " + fileSystem.name;
            fileSystemRootNameDiv.innerText = "File System Root Name: " + fileSystem.root.name;
            fileSystemRootFullPathDiv.innerText = "File System Root full path: " + fileSystem.root.fullPath;
        
            notificationBox.innerHTML = "";
            notificationBox.appendChild(fileSystemNameDiv);
            notificationBox.appendChild(fileSystemRootNameDiv);
            notificationBox.appendChild(fileSystemRootFullPathDiv);
            
            console.log("File System Name: " + fileSystem.name);
            console.log("File System Root Name: " + fileSystem.root.name);
            console.log("File System Root full path: " + fileSystem.root.fullPath);
            console.log("");
        }

        function onResolveSuccess(fileEntry) {
            notificationBox.innerText = fileEntry.name + " - " + fileEntry.fullPath;
            console.log("LocalFileSystem.resolveLocalFileSystemURI");
            console.log(fileEntry.name + " - " + fileEntry.fullPath);
            console.log("");
        }

        function failLocalFileSystem(evt) {
            notificationBox.innerText = evt.target.error.code;
            console.log("Error: " + evt.target.error.code);
            console.log("");
        }
    },
    
    directoryEntry: function() {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, fail);
        
        function onFileSystemSuccess(fileSystem) {
            console.log("LocalFileSystem: " + fileSystem.name);
            
            // getFile
            //fileSystem.root.getFile("file:///Ast1.txt", {create: true, exclusive: false}, onGetFileSuccess, onGetFileError);
            fileSystem.root.getFile("/ast.txt", {create: false, exclusive: false}, onGetFileSuccess, onGetFileError);
            //fileSystem.root.getFile("11/ast.txt", {create: false, exclusive: false}, onGetFileSuccess, onGetFileError);
            //fileSystem.root.getFile("/11/ast.txt", {create: false, exclusive: false}, onGetFileSuccess, onGetFileError);
            //fileSystem.root.getFile("", {create: false, exclusive: false}, onGetFileSuccess, onGetFileError);
            
            // getDirectory
            //fileSystem.root.getDirectory("file:///new_folder/", {create: false, exclusive: false}, onGetDirectorySuccess, onGetDirectoryError);
            //fileSystem.root.getDirectory("file:///", {create: true, exclusive: false}, onGetDirectorySuccess, onGetDirectoryError);
            //fileSystem.root.getDirectory("/11/", {create: true, exclusive: false}, onGetDirectorySuccess, onGetDirectoryError);
            //fileSystem.root.getDirectory("/11", {create: true, exclusive: false}, onGetDirectorySuccess, onGetDirectoryError);
            //fileSystem.root.getDirectory("11/", {create: true, exclusive: false}, onGetDirectorySuccess, onGetDirectoryError);
            //fileSystem.root.getDirectory("/", {create: true, exclusive: false}, onGetDirectorySuccess, onGetDirectoryError);
            //fileSystem.root.getDirectory("", {create: true, exclusive: false}, onGetDirectorySuccess, onGetDirectoryError);
            
            // removeRecursively
            //fileSystem.root.getDirectory("file:///11/", {create: false, exclusive: false}, onGetDirectorySuccess_RemoveRecursively, onGetDirectoryError);
            //fileSystem.root.getDirectory("/11/", {create: false, exclusive: false}, onGetDirectorySuccess_RemoveRecursively, onGetDirectoryError);
            //fileSystem.root.getDirectory("11/", {create: false, exclusive: false}, onGetDirectorySuccess_RemoveRecursively, onGetDirectoryError);
            //fileSystem.root.getDirectory("11", {create: false, exclusive: false}, onGetDirectorySuccess_RemoveRecursively, onGetDirectoryError);
            //fileSystem.root.getDirectory("/", {create: false, exclusive: false}, onGetDirectorySuccess_RemoveRecursively, onGetDirectoryError);
            //fileSystem.root.getDirectory("", {create: false, exclusive: false}, onGetDirectorySuccess_RemoveRecursively, onGetDirectoryError);
            
            // createReader
            //fileSystem.root.getDirectory("/11/", {create: false, exclusive: false}, onGetDirectorySuccess_createReader, onGetDirectoryError);
        }
        
        function fail(evt) {
            console.log("Error: " + evt.target.error.code);
            console.log("");
        }

        function onGetFileSuccess(fileEntry) {
            console.log("File name: " + fileEntry.name);
            console.log("Full file name: " + fileEntry.fullPath);
            
            //fileEntry.getMetadata(onGetMetadataSuccess, onEntryFail);
            
            var parentDirectory = new DirectoryEntry("11", "file:///11/");
            //fileEntry.moveTo(parentDirectory, "", onMoveToSuccess, onEntryFail);
            fileEntry.copyTo(parentDirectory, "", onMoveToSuccess, onEntryFail);
            
            //fileEntry.getParent(onGetParentSuccess, onEntryFail);
            
            //fileEntry.remove(onRemoveSuccess, onEntryFail);
        }

        function onGetFileError(error) {
            console.log("Failed to retrieve file: " + error.code);
            //alert("Failed to retrieve file: " + error.code);
        }

        function onGetDirectorySuccess(directoryEntry) {
            console.log("Directory name: " + directoryEntry.name);
            console.log("Full directory path: " + directoryEntry.fullPath);
            
            //directoryEntry.getMetadata(onGetMetadataSuccess, onEntryFail);
            
            var parentDirectory = new DirectoryEntry("12", "file:///12/");
            //directoryEntry.moveTo(parentDirectory, "empty", onMoveToSuccess, onEntryFail);
            directoryEntry.copyTo(parentDirectory, "", onMoveToSuccess, onEntryFail);
            
            //directoryEntry.getParent(onGetParentSuccess, onEntryFail);
            
            //directoryEntry.remove(onRemoveSuccess, onEntryFail);
        }

        function onGetDirectorySuccess_RemoveRecursively(directoryEntry) {
            console.log("Directory name: " + directoryEntry.name);
            console.log("Full directory path: " + directoryEntry.fullPath);
            
            directoryEntry.removeRecursively(onRemoveDirRecursively, onFailRemoveDirRecursively);
        }
        
        function onGetDirectoryError(error) {
            console.log("Failed to retrieve directory: " + error.code);
        }
        
        function onRemoveDirRecursively(parent) {
            console.log("Remove Recursively Succeeded. Parent dir is: " + parent.name);
        }
        
        function onFailRemoveDirRecursively(error) {
            console.log("Failed to remove directory or it's contents: " + error.code);
        }

        function onGetDirectorySuccess_createReader(directoryEntry) {
            console.log("Reading files and folders of: " + directoryEntry.fullPath);
            var directoryReader = directoryEntry.createReader();
            directoryReader.readEntries(onReadEntriesSuccess, onReadEntriesError);
        }
        
        function onReadEntriesSuccess(entries) {
            var i;
            for (i=0; i < entries.length; i++) {
                if (entries[i].isFile)
                    console.log("File: " + entries[i].name);
                else
                    console.log("Directory: " + entries[i].name);
            }
        }
        
        function onReadEntriesError(error) {
            console.log("Failed to list directory contents: " + error.code);
        }
    
        function onGetMetadataSuccess(metadata) {
            console.log("Last Modified: " + metadata.modificationTime);
        }

        function onEntryFail(error) {
            console.log("Failed: " + error.code);
        }
        
        function onMoveToSuccess(entry) {
            console.log("New Path: " + entry.fullPath);
        }

        function onGetParentSuccess(parent) {
            console.log("Parent Name: " + parent.fullPath);
        }

        function onRemoveSuccess(entry) {
            console.log("Removal succeeded.");
        }
    },
    
    fileEntry: function() {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, requestFileSystemFail);
        
        function requestFileSystemFail(evt) {
            console.log("Error: " + evt.target.error.code);
            console.log("");
        }

        function onFileSystemSuccess(fileSystem) {
            console.log("LocalFileSystem: " + fileSystem.name);
            
            fileSystem.root.getFile("file:///11/1.txt", {create: false, exclusive: false}, onGetFileSuccess, onGetFileError);
        }
        
        function onGetFileSuccess(fileEntry) {
            console.log("Full file name: " + fileEntry.fullPath);

            //fileEntry.createWriter(onCreateWriterSuccess, onCreateWriterFail);

            fileEntry.file(onFileSuccess, onFileFail);
        }
        
        function onGetFileError(error) {
            console.log("Failed to retrieve file: " + error.code);
        }
        
        function onCreateWriterSuccess(writer) {
            //writer.truncate(20);
            
            writer.onwrite = onWriteSuccess;
            // write text
            writer.seek(writer.length);
            writer.write("\r\nSome more text to the file.");
            
            // write binary data
            //var data = new ArrayBuffer(5);
            //for (i=0; i < 5; i++) {
            //    data[i] = i + 65;
            //}
            //writer.seek(8);
            //writer.write(data);
        }

        function onCreateWriterFail(error) {
            console.log("Error creating writer: " + error.code);
        }
        
        function onFileSuccess(file) {
            console.log("File type: " + file.type + ", file size: " + file.size);
            
            // File APIs
            var slicedFile = file.slice(8, 24);
            console.log("Sliced file start: " + slicedFile.start + ", sliced file end: " + slicedFile.end);
            
            // FileReader APIs
            ReadAsText(slicedFile);
            ReadAsDataURL(file);
            ReadAsBinaryString(file);
            ReadAsArrayBuffer(file);
        }

        function ReadAsText(file) {
            var reader = new FileReader();
            reader.onloadend = onFileReaderLoadEnd;
            reader.readAsText(file);
        }
        
        function ReadAsDataURL(file) {
            var reader = new FileReader();
            reader.onloadend = onFileReaderLoadEnd;
            reader.readAsDataURL(file);
        }
        
        function ReadAsBinaryString(file) {
            var reader = new FileReader();
            reader.onloadend = onFileReaderLoadEnd;
            reader.readAsBinaryString(file);
        }
        
        function ReadAsArrayBuffer(file) {
            var reader = new FileReader();
            reader.onloadend = onFileReaderLoadEndArray;
            reader.readAsArrayBuffer(file);
        }
        
        function onFileFail(error) {
            console.log("Unable to retrieve file properties: " + error.code);
        }

        function onFileReaderLoadEnd(evt) {
            console.log("Read success: " + evt.target.result);
        }
        
        function onFileReaderLoadEndArray(evt) {
            console.log("Read success. Bytes read: " + new Uint8Array(evt.target.result).length);
        }
 
        function onWriteSuccess(evt){
            console.log("write success");
        }
    },
    
    fileUpload: function() {
        fileUpload();
        
        function fileUpload() {
            var fileURI = encodeURI("file:///11/IMG_1.jpg");
            var options = new FileUploadOptions();
            options.fileKey = "file";
            options.fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1);
            options.mimeType = "image/jpeg";

            //var params = {};
            //params.value1 = "test";
            //params.value2 = "param";
            //options.params = params;
            
            //var headers={'Authorization':'Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ=='};
            //options.headers = headers;

            options.params = {}; // if we need to send parameters to the server request
            options.headers = {
                Connection: "Close"
            };
            options.chunkedMode = false;
            
            var ft = new FileTransfer();
            ft.upload(fileURI, encodeURI("http://www.filedropper.com"), onFileUploadSuccess,
                      onFileTransferFail, options);
            //ft.abort();
        }

        function onFileUploadSuccess (r) {
            console.log("FileTransfer.upload");
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response);
            console.log("Sent = " + r.bytesSent);
            console.log("Link to uploaded file: http://www.filedropper.com" + r.response);
        }
        
        function onFileTransferFail (error) {
            console.log("FileTransfer Error:");
            console.log("Code: " + error.code);
            console.log("Source: " + error.source);
            console.log("Target: " + error.target);
            console.log("");
        }
    },

    fileDownload: function() {
        fileDownload();

        function fileDownload() {
            var ft = new FileTransfer();
            var uri = encodeURI("http://www.telerik.com/sfimages/default-source/logos/telerik-logo-reversed.png");
            var localFilePath = "file:///11/telerik-logo.png";

            ft.download(uri, localFilePath, onFileDownloadSuccess, onFileTransferFail);
            //ft.abort();
        }

        function onFileDownloadSuccess(entry) {
            console.log("download complete: " + entry.fullPath);
        }
        
        function onFileTransferFail (error) {
            console.log("FileTransfer Error:");
            console.log("Code: " + error.code);
            console.log("Source: " + error.source);
            console.log("Target: " + error.target);
            console.log("");
        }
    }
};