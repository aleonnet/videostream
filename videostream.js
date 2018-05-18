document.addEventListener("DOMContentLoaded", function () {

    navigator.getUserMedia= navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia 
    || navigator.mozGetUserMedia ;

    var vendorURL = window.URL || window.webkitURL;
    var videoSection = document.querySelector('#videoElement');
    var startCamera=document.querySelector('#startCamera');
    var takeSnap=document.querySelector('#takeSnap');
    startCamera.addEventListener('click',startCameraFunction);
    takeSnap.addEventListener('click',takeSnapFunction);

    function startCameraFunction() {
            /*
    //window.URL || window.webkitURL is required to generator video stram in to URL by using method 
    createObjectURL(stream)
   */
        

        if (navigator.getUserMedia) {

            navigator.getUserMedia(
                { audio:true, video:true }, function (stream) {

                 //  videoSection.src = vendorURL.createObjectURL(stream);//depreciated
                 videoSection.srcObject=stream;
                   
                    videoSection.play();

                }, function (error) {

                    alert(error.code);

                });            

        }
    }
    function takeSnapFunction(){
        //capture video tag on index.html
        var video = document.querySelector('video'); 
        //create canvas           
        var canvas = document.createElement('canvas');
        //seting hight and width of canvas
        canvas.width = 300;
        canvas.height =200;
        //setting context 2d
        var ctx = canvas.getContext('2d');
        //draw image 
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        //captured image base64..this one can be used in qr code reader
        var imageCaptured= canvas.toDataURL('image/jpeg');
//-----> here you can use qrcode.decode(imageCaptured) to decode barcode//
       //setting source attribue for image element
       var imageOnPage=document.querySelector('img');
       imageOnPage.setAttribute('src',imageCaptured);
       imageOnPage.style.display="block"; 
    }
});

