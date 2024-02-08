stat = "";
objects = [];

function Fn()
{
    window.location = "funcionamiento.html";
}

function setup()
{
    Canvas = createCanvas(500, 500);
    Canvas.center();

    video = createCapture(VIDEO);
    video.hide();
}

function Start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    Ivalor = document.getElementById("date_obj").value;
    document.getElementById("Status").innerHTML = "Estado: Detectando objetos";
    document.getElementById("date_obj").value = "";
}

function speak()
{
  var synth = window.speechSynthesis;

  speak_data_1 = "Objeto detectado";

  var utterthis = new SpeechSynthesisUtterance(speak_data_1);

  synth.speak(utterthis);

}

function modelLoaded()
{
    console.log("Modelo CoCoSsd inicializado");
    stat = true;
}

function draw()
{
    image(video, 0, 0, 500, 500);

    if(stat != "")
    {
        objectDetector.detect(video, gotResult);

        for(i=0;i < objects.length; i++)
        {
            console.log("Hola");

            fill("black");

            percent = floor(objects[i].confidence * 100);

            text(objects[i].label + " " + percent + "%" + objects[i].x + 15 + objects[i].y + 15);

            noFill();

            stroke("black");

            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == Ivalor)
            {
                speak();
                document.getElementById("Status").innerHTML = "Estado: Objeto Mencionado detectado";
                document.getElementById("OoP").innerHTML = Ivalor;
            }
            else
            {
                document.getElementById("Status").innerHTML = "Estado: No se detecto el objeto mencionado";
                document.getElementById("OoP").innerHTML = "Objeto no existente";
            }
        }
    }
}

function gotResult(error, results)
{
    if(error)
    {
        console.error("error");
    }
    else
    {
        console.log(results);
        objects = results;
    }
}
