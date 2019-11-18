// Wait for device API libraries to load
document.addEventListener("deviceready", onDeviceReady, false);

// device APIs are available
function onDeviceReady() {    
    useCamera();
}

function useCamera() {
    var takePictureButton = document.getElementById("take-picture-button");
    takePictureButton.addEventListener("click", takePicture, false);

    var getImageButton = document.getElementById("get-image-button");
    getImageButton.addEventListener("click", getImage, false);

    var playSongButton = document.getElementById("get-a-song-button");
    playSongButton.addEventListener("click", playMedia, false);

    var captureVideoButton = document.getElementById("capture-video-button");
    captureVideoButton.addEventListener("click", captureVideo, false);

    var sourceToPlay;

    if( device.platform === 'Android' ) {
        sourceToPlay = '/www/bensound-summer.mp3';
    } else {
        sourceToPlay = 'bensound-summer.mp3';
    } 

    var media = new Media( sourceToPlay, null, mediaError, mediaStatus );

    function mediaError(error) {
        document.getElementById('media-status').innerHTML = 'There was a problem. Error code '+ error.code ;
    }
    
    function playMedia() {
        media.play();
    }
    
    function mediaStatus(status) {
        if(status === 0){
            document.getElementById('media-status').innerHTML = 'Sorry no media!';
        }
        
        if(status === 1){
            document.getElementById('media-status').innerHTML = 'Loading...';
        }
        
        if(status === 2){
            document.getElementById('media-status').innerHTML = 'Playing...';
        }
        
        if(status === 3){
            document.getElementById('media-status').innerHTML = 'Paused...';
        }
        
        if(status === 4){
            document.getElementById('media-status').innerHTML = 'Stopped!';
        }
    }
    
    function camSuccess(imageData){
        console.log(imageData);
        var img = '<img src="'+imageData+'" style=" display:block; padding:0px 15px 15px 15px; box-sizing:border-box; width:100%; margin:0 auto"/>';
        document.getElementById('CameraOutput').innerHTML = img;
    }

    function camError(errorMessage){
        alert('Error: '+ errorMessage );
    }

    function captureSuccess(mediaFiles) {
        console.log( mediaFiles );
        document.getElementById('capture-output').innerHTML = JSON.stringify( mediaFiles, null, '<br/>' );

        var i;

        for (i = 0; i < mediaFiles.length; i++ ) {
            var mediaFile = mediaFiles[i];
            mediaFile.getFormatData(
                function(data){ 
                    document.getElementById('capture-output').insertAdjacentHTML('beforeend', '<hr/>'+ JSON.stringify( data, null, '<br/>' ));
                },
                function(err){ alert( err.code ); }
            );
        }
    }

    function captureError(error){

        navigator.notification.alert('Error code: '+ error.code);

    }
    
    function takePicture() {
        var options = {
            'quality': 85,
            'targetWidth': 1280,
            'targetHeight': 720,
            'saveToPhotoAlbum': false,
            'allowEdit': false,
            'destinationType' : navigator.camera.DestinationType.FILE_URI,
            'sourceType' : navigator.camera.PictureSourceType.CAMERA,
            'MediaType':  navigator.camera.MediaType.PICTURE,
            'encodingType': navigator.camera.EncodingType.JPEG,
            'Direction': navigator.camera.Direction.FRONT, 
        }
        navigator.camera.getPicture( camSuccess, camError, options );
    }
    
    function getImage() {
        var options = {
            'destinationType': 1,
            'sourceType': 0,
            'mediaType':  0,
        }

        navigator.camera.getPicture( camSuccess, camError, options );
    }

    function captureVideo() {
        capture.captureVideo( captureSuccess, captureError,  captureOptions );
    }    
    
}