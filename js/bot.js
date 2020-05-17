$(function() { 
    "use strict";

    //Initialisatie
    var botnaam = "hallo"; 
    var wachtwoord = "123456789";
    var url = "ws://chat.defbu.nl:1337"; 

    //Functie verzenden bericht 
    function berichtVerzenden(bericht){
        var s = botnaam + ":" + wachtwoord + ":" + bericht;
        verbinding.send(s); 
    }

    //Verbinding opbouwen
    var verbinding = new WebSocket(url); 

    //Event: nieuwe verbinding 
    verbinding.onopen = function() {
        console.log("Verbinding geopend"); 
    }
    //Event: fouten
    verbinding.onerror = function(error){
        console.log(error); 
    } 
    
    //Event: nieuw bericht
    verbinding.onmessage = function(bericht){
        console.log(bericht); 
        
        var stukken = bericht.data.split(":"); 
        var botnaamZender = stukken[0]; 
        if (botnaamZender == "server"){
            var commando = stukken[1];
            if (commando == "list"){
                //We doen niks
            }
            else if (commando == "error"){
                var inkomendBericht = "<b>" + botnaamZender + ":" + "</b> " + stukken[2] + "<br>"; 
                $("#berichten").append(inkomendBericht);
            }
        } 
        else if (botnaamZender == botnaam){
            //Bericht van jezelf 
            var inkomendBericht = "<b>" + botnaamZender + ":" + "</b> " + stukken[1] + "<br>"; 
            $("#berichten").append(inkomendBericht);
        }
        else {
            //Bericht van anderen
            var inkomendBericht = "<b>" + botnaamZender + ":" + "</b> " + stukken[1] + "<br>"; 
            $("#berichten").append(inkomendBericht);

            var aanwezig = stukken[1].includes("Hallo");
            if (aanwezig) {
                var uitgaandBericht = "Goedendag " + botnaamZender; 
                berichtVerzenden(uitgaandBericht); 
            }
        }
    }

    $(#verzenden).click(function() {
        var bericht = $("#bericht").val(); 
        $("#bericht").val(''); 
        berichtVerzenden(bericht); 
    });


});