function requestParseConfig() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            logViewerIp(JSON.parse(xhr.responseText));
        }
    }
    xhr.open("GET", "https://dl.dropboxusercontent.com/u/51100333/ParseLogConfig.txt", true);
    xhr.send();
}

function logViewerIp(config) {
    
    Parse.$ = jQuery;

    // Initialize Parse with your Parse application javascript keys
    Parse.initialize(config.MyParseAppId, config.MyParseJsKey);

    // $.getJSON( "http://ip-api.com/json/?callback=?", function(data){
    //     if (data.status == "success") {
    //         if (config.logIpDisabled == false) {
    //             uploadIpInfo(data);
    //         }
    //     }
    // });

    // var TinyWallEntry = Parse.Object.extend("TinyWallEntry");
    // var twentry = new TinyWallEntry();
    // twentry.set("message", "Hi, My Wall");
    // twentry.save();

    // var META_DATA = Parse.Object.extend("META_DATA");
    // var META_tw = new META_DATA();
    // META_tw.set("value", "r3zHjVpEsF");
    // META_tw.set("description", "TinyWall last item");
    // META_tw.save();

    // TinyWallEntry = Parse.Object.extend("TinyWallEntry");
    // var query = new Parse.Query(TinyWallEntry);
    // query.count({
    //     success: function(count) {
    //         console.log(count);
    //     },
    //     error: function(obj, error) {
    //         console.log("error");
    //     }
    // });

    // Parse.Cloud.run('send_me_email', {
    //     sender_name: "Test",
    //     sender_email: "haha@haha.com",
    //     subject: "test subject",
    //     email_content: "test content"
    // }, {
    //     success: function(result) {
    //         // result is 'Hello world!'
    //         console.log(result);
    //     },
    //     error: function(error) {
    //         console.log("error!!!!");
    //     }
    // });

    // Parse.Cloud.run('send_me_sms', {
    //     sms_content: "test"
    // }, {
    //     success: function(result) {
    //         // result is 'Hello world!'
    //         console.log(result);
    //     },
    //     error: function(error) {
    //         console.log("error!!!!");
    //     }
    // });

    // var ViewerIpLog = Parse.Object.extend("ViewerIpLog");
    // var query = new Parse.Query(ViewerIpLog);
    // query.equalTo("ip", "24.11.54.221");
    // query.limit(5);
    // query.descending("createdAt")

    // query.find({
    //     success: function(results) {
    //         console.log("Successfully retrieved " + results.length + " items.");
    //         // Do something with the returned Parse.Object values
    //         for (var i = 0; i < results.length; i++) { 
    //             var object = results[i];
    //             console.log(object.id + ' - ' + object.createdAt + "=");
    //             if (i == results.length-1) {
    //                 secondCall(object.createdAt)
    //             }
    //         }
    //     },
    //     error: function(error) {
    //         alert("Error: " + error.code + " " + error.message);
    //   }
    // });
}

function secondCall(createdAt) {
    var ViewerIpLog = Parse.Object.extend("ViewerIpLog");
    var query = new Parse.Query(ViewerIpLog);
    query.equalTo("ip", "24.11.54.221");
    query.limit(5);
    query.descending("createdAt")
    query.lessThan("createdAt", createdAt);

    query.find({
        success: function(results) {
            console.log("Successfully retrieved " + results.length + " items.");
            // Do something with the returned Parse.Object values
            for (var i = 0; i < results.length; i++) { 
                var object = results[i];
                console.log(object.id + ' - ' + object.createdAt + "=");
            }
        },
        error: function(error) {
            alert("Error: " + error.code + " " + error.message);
      }
    });
}

function uploadIpInfo(ip_data) {
    var IPClass = Parse.Object.extend("ViewerIpLog");
    var ipInfo = new IPClass();
    $.each(ip_data, function(key, value) {
        if (key == "status") {
        } else if (key == "query") {
            ipInfo.set("ip", value);
        } else {
            ipInfo.set(key, value);
        }
    });
    

    ipInfo.save(null, null);
}

function base64toBlob(base64Data, contentType) {
    contentType = contentType || '';
    var sliceSize = 1024;
    var byteCharacters = atob(base64Data);
    var bytesLength = byteCharacters.length;
    var slicesCount = Math.ceil(bytesLength / sliceSize);
    var byteArrays = new Array(slicesCount);

    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        var begin = sliceIndex * sliceSize;
        var end = Math.min(begin + sliceSize, bytesLength);

        var bytes = new Array(end - begin);
        for (var offset = begin, i = 0 ; offset < end; ++i, ++offset) {
            bytes[i] = byteCharacters[offset].charCodeAt(0);
        }
        byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
}

function handleFiles_test(files) {
    var numFiles = files.length;
    console.log(numFiles);
    for (var i = 0; i < numFiles; i++) {
        var file = files[i];
        var blob = file.slice();
        //saveAs(blob, "aaa.pdf");
        var reader = new window.FileReader();
        reader.onloadend = function() {
            data = reader.result;
            //console.log(base64data);
            console.log(data.length);
            var d = new Date();
            console.log("after read: " + d.getSeconds() + "." + d.getMilliseconds());
            var b64 = btoa(data);
            var d = new Date();
            console.log("btoa: " + d.getSeconds() + "." + d.getMilliseconds());
            var encrypted = CryptoJS.AES.encrypt(b64, "mykey!!!");
            var d = new Date();
            console.log("encrypt: " + d.getSeconds() + "." + d.getMilliseconds());
            var serialized = encrypted.toString();
            console.log("serialized length: " + serialized.length);
            var d = new Date();
            console.log("serialize: " + d.getSeconds() + "." + d.getMilliseconds());
            var decrypted = CryptoJS.AES.decrypt(serialized, "mykey!!!").toString(CryptoJS.enc.Utf8);
            var d = new Date();
            console.log("decrypt: " + d.getSeconds() + "." + d.getMilliseconds());

            //var content = btoa(base64data);
            //console.log(content.length);

            var newblob = base64toBlob(decrypted, "application/octet-stream");
            var d = new Date();
            console.log("create blob: " + d.getSeconds() + "." + d.getMilliseconds());
            saveAs(newblob, "bbb.pdf");
        }
        reader.readAsBinaryString(blob); 
    }
}

function handleFiles(files) {
    if (files.length == 1) {
        var file = files[0];
        var blob = file.slice();
        //saveAs(blob, "aaa.pdf");
        var reader = new window.FileReader();
        reader.onloadend = function() {
            data = reader.result;
            //console.log(base64data);
            console.log(data.length);
            var d = new Date();
            console.log("after read: " + d.getSeconds() + "." + d.getMilliseconds());
            var b64 = btoa(data);
            var d = new Date();
            console.log("btoa: " + d.getSeconds() + "." + d.getMilliseconds());
            var encrypted = CryptoJS.AES.encrypt(b64, "mykey!!!");
            var d = new Date();
            console.log("encrypt: " + d.getSeconds() + "." + d.getMilliseconds());
            var serialized = encrypted.toString();
            
            var TestFile = new Parse.Object("TestFile");
            var parseFile = new Parse.File("serialized.zip", { base64: btoa(serialized) });
            //var parseFile = new Parse.File("serialized.zip", { base64: serialized });
            parseFile.save().then(function() {
                // The file has been saved to Parse.
                console.log("file saved");
                var TestFile = new Parse.Object("TestFile");
                TestFile.set("filename", "aaa.pdf");
                TestFile.set("filecontent", parseFile);
                TestFile.save().then(function() {
                    console.log("file obj saved");
                }, null);
            }, null);
        }
        reader.readAsBinaryString(blob);
    }
}

function fileTest() {
    Parse.initialize("QSz9RP0rOY9RMP6XMazNVgYCQ2jt797blsfXjN06", "LlhZWiGnPnLoFMxAmOUXhaPsHPKKxHaonVAbW4PR");
    var base64 = "V29ya2luZyBhdCBQYXJzZSBpcyBncmVhdCE=";
    var parseFile = new Parse.File("myfile.txt", { base64: base64 });
    parseFile.save().then(function() {
        // The file has been saved to Parse.
        console.log("file saved");
        var TestFile = new Parse.Object("TestFile");
        TestFile.set("filename", "myfile.txt");
        TestFile.set("filecontent", parseFile);
        TestFile.save();
    }, function(error) {
        // The file either could not be read, or could not be saved to Parse.
        console.log("file save error");
    });
}

function fileRetrieveTest() {
    Parse.initialize("QSz9RP0rOY9RMP6XMazNVgYCQ2jt797blsfXjN06", "LlhZWiGnPnLoFMxAmOUXhaPsHPKKxHaonVAbW4PR");
    var TestFile = Parse.Object.extend("TestFile");
    var query = new Parse.Query(TestFile);
    query.get("61dH84ZhP7", {
        success: function(testFile) {
            parseFile = testFile.get("filecontent");
            console.log(parseFile.url());
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    // logViewerIp(JSON.parse(xhr.responseText));
                    console.log(xhr.responseText);
                }
            }
            xhr.open("GET", "http://files.parse.com/d23cf0f9-1a9b-47f2-9b9e-738a6b844996/63e0487c-40b2-4847-af3e-76259c1311b7-myfile.txt", true);
            xhr.send();
        }
    });
}

function downloadFile() {
    var TestFile = Parse.Object.extend("TestFile");
    var query = new Parse.Query(TestFile);
    query.get("DkK6HPwEaY", {
        success: function(testFile) {
            parseFile = testFile.get("filecontent");
            console.log(parseFile.url());
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    // logViewerIp(JSON.parse(xhr.responseText));
                    // console.log(xhr.responseText);
                    var serialized = xhr.responseText;
                    var decrypted = CryptoJS.AES.decrypt(serialized, "mykey!!!").toString(CryptoJS.enc.Utf8);
                    var d = new Date();
                    console.log("decrypt: " + d.getSeconds() + "." + d.getMilliseconds());

                    //var content = btoa(base64data);
                    //console.log(content.length);

                    var newblob = base64toBlob(decrypted, "application/octet-stream");
                    var d = new Date();
                    console.log("create blob: " + d.getSeconds() + "." + d.getMilliseconds());
                    saveAs(newblob, "bbb.pdf");
                }
            }
            xhr.open("GET", parseFile.url(), true);
            xhr.send();
        }
    });
}

$(document).ready( function() {
    //requestParseConfig();
    Parse.initialize("QSz9RP0rOY9RMP6XMazNVgYCQ2jt797blsfXjN06", "LlhZWiGnPnLoFMxAmOUXhaPsHPKKxHaonVAbW4PR");

    // var encrypted = CryptoJS.AES.encrypt("MessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessage", "123456789a");
    // console.log(encrypted.toString());

    // var decrypted = CryptoJS.AES.decrypt(encrypted.toString(),"123456789a").toString(CryptoJS.enc.Utf8);
    // console.log(decrypted.length);
    // console.log(decrypted);

    // var blob = new Blob(["some text"], {
    //     type: "text/plain;charset=utf-8;",
    // });
    // saveAs(blob, "thing.txt");
    // $("#input").hide();
    $("#upload-button").click(function(){
        $("#input").click();
    });

    $("#download-button").click(function(){
        downloadFile();
    });

    // fileRetrieveTest();

});