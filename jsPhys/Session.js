/**
 * Created by Michael on 13/02/2015.
 */

var Session = function(sessionTime){
    console.log("Session created");
    var that = this;
    
    var viewWidth = window.innerWidth;
    var viewHeight = window.innerHeight;


    var assetsIntro = ["fonts/Intro/Intro.fnt"];
    var loaderIntro = new PIXI.AssetLoader(assetsIntro);
    var bitmapFontTime;
    
    loaderIntro.onComplete = onAssetsLoadedIntro;
    loaderIntro.load();
    
    //the total time of the game session
    var sessionTime = sessionTime;
    
    var timeLeft;
    var sessionMin;
    var sessionSec;


    Session.prototype.init = function(){
        console.log("Session initialize");

        //the time left before the end of the game - every 1 second
        timeLeft = setInterval(that.updateTimeLeft, 1000);
};

    function onAssetsLoadedIntro(){

        //The score for the player on the left
        bitmapFontTime = new PIXI.BitmapText("Time left: ", {font: "30px Intro", align: "right"});
        bitmapFontTime.scale.x = viewWidth / 1366; //1366 is the base width for which the game was created
        bitmapFontTime.scale.y = bitmapFontTime.scale.x;
        bitmapFontTime.position.x = 20;
        bitmapFontTime.position.y = 20;
        renderer.stage.addChild(bitmapFontTime);
    };


    Session.prototype.updateTimeLeft = function(){
        sessionTime = sessionTime-1;
        sessionMin = Math.floor(sessionTime/60);
        sessionSec = sessionTime%60;
        bitmapFontTime.setText("Time left: "+sessionMin+" min "+sessionSec+" sec");
        
        
        if(sessionMin == 0 && sessionSec == 0){
            that.stopGame();
        }
    };

    Session.prototype.stopGame = function(){
        clearInterval(timeLeft);
        //we up the event to the upper class - Main.js
        if (that._onEndedGame != null) {
            that._onEndedGame();
        }
    };

    this.init();
};
