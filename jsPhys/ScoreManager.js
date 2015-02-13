/**
 * Created by Michael on 12/02/2015.
 */
var ScoreManager = function(){
    console.log("Score created");
    var viewWidth = window.innerWidth;
    var viewHeight = window.innerHeight;

    var scorePlayer1 = 0;
    var scorePlayer2 = 0;

    var assetsIntro = ["fonts/Intro/Intro.fnt"];
    var loaderIntro = new PIXI.AssetLoader(assetsIntro);
    var bitmapFontLeft;
    var bitmapFontRight;


    loaderIntro.onComplete = onAssetsLoadedIntro;
    loaderIntro.load();
    
    var tempPosLeft;

    ScoreManager.prototype.init = function(){
        console.log("Score initialize");     
    };
    
    function onAssetsLoadedIntro(){
        
        //The score for the player on the left
        bitmapFontLeft = new PIXI.BitmapText("0", {font: "120px Intro", align: "right"});
        bitmapFontLeft.scale.x = viewWidth / 1366; //1366 is the base width for which the game was created
        bitmapFontLeft.scale.y = bitmapFontLeft.scale.x;
        bitmapFontLeft.position.x = viewWidth/2 - (viewWidth/2)/5;
        tempPosLeft = bitmapFontLeft.position.x + bitmapFontLeft.width;
        bitmapFontLeft.position.y = viewHeight/15;
        renderer.stage.addChild(bitmapFontLeft);

        //The score for the player on the right
        bitmapFontRight = new PIXI.BitmapText("0", {font: "120px Intro", align: "right"});
        bitmapFontRight.scale.x = viewWidth / 1366; //1366 is the base width for which the game was created
        bitmapFontRight.scale.y = bitmapFontRight.scale.x;
        bitmapFontRight.position.x = viewWidth/2 + (viewWidth/2)/5 - bitmapFontRight.width ;
        bitmapFontRight.position.y = viewHeight/15;
        renderer.stage.addChild(bitmapFontRight);

    };


    ScoreManager.prototype.setScorePlayer1 = function(score){
        scorePlayer1+=score;
        bitmapFontLeft.setText(scorePlayer1.toString());
        bitmapFontLeft.position.x = tempPosLeft - bitmapFontLeft.width;
    };
    ScoreManager.prototype.setScorePlayer2 = function(score){
        scorePlayer2+=score;
        bitmapFontRight.setText(scorePlayer2.toString());
    };

    ScoreManager.prototype.getScorePlayer1 = function(){
        return scorePlayer1;
    };
    ScoreManager.prototype.getScorePlayer2 = function(){
        return scorePlayer2;
    };


    this.init();
};