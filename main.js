status = "";
objects = [];
audio = "";

function preload(){
    audio = loadSound("calm_down.mp3");
}

function setup(){

    canvas = createCanvas(380, 380);
    canvas.center();
    
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting";
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);

    objects = results;
}

function modelLoaded(){
    status = true;
    console.log("Model Loaded");
}

function draw(){
   image(video, 0, 0, 380, 380); 
   
   if(status != "")
   {

    objectDetector.detect(video, gotResult);

     for(i = 0; i < objects.length; i++)
     {
      document.getElementById("status").innerHTML = "Baby Detected";

      fill("red");
      noFill();
      stroke("red");
      percent = Math.floor(objects[i].confidence * 100);
      text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    

        if(objects[i].label == "person"){
           document.getElementById("instructions").innerHTML = "Baby detected";      
           audio.stop();
        }else{
            document.getElementById("instructions").innerHTML = "Baby not detected";
            audio.play();
        }
    }

        if(objects.length == 0){
            document.getElementById("instructions").innerHTML = "Baby not Detected";
            audio.play();
        }
      
     }  

   }