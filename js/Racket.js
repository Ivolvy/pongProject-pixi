/**
 * Created by Michael on 10/01/2015.
 */
var Racket  = function(options){
    console.log("Racket created");
    var stageWidth = window.innerWidth;
    var stageHeight = window.innerHeight;

    this.racket = null;
    var racketWidth = 25;
    var racketHeight = 100;

    this.moveUp = null;
    this.moveDown = null;
    this.velocity = null;

    var playerPosition = options.playerPosition;


    Racket.prototype.init = function(){
        this.racket = new PIXI.Graphics();
        this.racket.beginFill(0x000000);
        this.racket.drawRect(0, 0, racketWidth, racketHeight);
        this.velocity = 10;

        this.initPosition();
    };

    Racket.prototype.initPosition = function(){
        if(playerPosition == "left") {
            this.racket.position.x = 30;
            this.racket.position.y = 30;
        }
        else{
            this.racket.position.x = stageWidth - racketWidth - 30;
            this.racket.position.y = 30;
        }
    };

    Racket.prototype.move = function(){
        if(this.moveUp == true){
            if(this.racket.position.y > 0) {
                if(this.racket.position.y - this.velocity < 0) {
                    this.racket.position.y = 0;
                }
                else {
                    this.racket.position.y -= this.velocity;
                }
            }
        }
        else if(this.moveDown == true){
            if(this.racket.position.y < stageHeight - racketHeight) {
                if(this.racket.position.y + this.velocity > stageHeight - racketHeight){
                    this.racket.position.y = stageHeight - racketHeight;
                }
                else {
                    this.racket.position.y += this.velocity;
                }
            }
        }
    };

    Racket.prototype.startMovingUp = function(){
        this.moveUp = true;
    };
    Racket.prototype.stopMovingUp = function(){
        this.moveUp = false;
    };
    Racket.prototype.startMovingDown = function(){
        this.moveDown = true;
    };
    Racket.prototype.stopMovingDown = function(){
        this.moveDown = false;
    };


    Racket.prototype.addToStage = function(stage){
        stage.addChild(this.racket);
    };

    this.init();
};