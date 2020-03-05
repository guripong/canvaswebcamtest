(function() {

  var canvas = document.getElementById('canvas'),
  context = canvas.getContext('2d'),
  video = document.getElementById('video');
  //vendorUrl = window.URL || window.webkitURL;

  navigator.getMedia =  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetuserMedia ||
  navigator.msGetUserMedia;

  navigator.getMedia({
    video: true,
    audio: false
  }, function(stream) {
    video.srcObject = stream;
//    video.src = vendorUrl.createObjectURL(stream);
    video.play();

  }, function(error) {
    // an error occurred
    console.log(error);
  } );

  video.addEventListener('play', function() {
    draw( this, context, 1280, 720 ); //아래 흑백 그리기
    console.log(video.videoHeight+'//'+video.videoWidth);
  }, false );

  function swap2(a,b)
  {
    var temp = a;
    a = b;
    b = temp;
  }

  var ia=1;
  var fixedimage = new Uint8ClampedArray(1280*4*720);

  function draw( video, context, width, height ) {
    var image, data, i, r, g, b, brightness;
//  

    context.drawImage( video, 0, 0, width, height );

    image = context.getImageData( 0, 0, width, height );
    data = image.data;
//    console.log(data.length/4); 

 
 
  
    /*
    console.log("###original###");
    console.log(data);
    console.log("###original###");
    */

    for(var j = 0 ; j<720 ; j++)
    {
      for(var i = 0 ; i<1280*4; i=i+4)
      {
        
        fixedimage[i+j*1280] =data[1280*4-i-4+j*1280];
        fixedimage[i+1+j*1280] =data[1280*4-i-3+j*1280];
        fixedimage[i+2+j*1280] =data[1280*4-i-2+j*1280];
        fixedimage[i+3+j*1280] = data[1280*4-i-1+j*1280];
        
       /*
        data[i+j*1280] =data[1280*4-i-4+j*1280];
        data[i+1+j*1280] =data[1280*4-i-3+j*1280];
        data[i+2+j*1280] =data[1280*4-i-2+j*1280];
        data[i+3+j*1280] = data[1280*4-i-1+j*1280];
        */
      }
  

    }
   /*
    console.log("@@@@@@@@@@@changed@@@@@@@@@");
      console.log(fixedimage);
      console.log("@@@@@@@@@@@changed@@@@@@@@@");
    */

    //console.log("길이:"+data.length/4); /
    //1280 * 4 
    /*
    for( i = 0 ; i < data.length ; i += 4 ) {
      r = data[i];
      g = data[i + 1];
      b = data[i + 2];
    }*/
    
    image.data = fixedimage;
    //image.data = data;

    context.putImageData( image, 0, 0 );

    if(1)
    {
      setTimeout(function(){
        draw(video,context,width,height); //흑백그리기 반복
      },10);
      ia++;
    }

    
 //   setTimeout( draw, 10, video, context, width, height );
  }

} )();
