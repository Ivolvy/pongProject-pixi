/**
 * Created by Michael on 10/01/2015.
 */
var Player = function(stage, options){
    console.log("Player created");
    this.racket = null;

    this.keyUp = options.keyUp;
    this.keyDown = options.keyDown;


    Player.prototype.init = function(){
        this.racket = new Racket(options);
        this.racket.addToStage(stage);

        this.setEventListener();
    };

    Player.prototype.setEventListener = function(){
        document.addEventListener('keydown', this.onKeyDown.bind(this));
        document.addEventListener('keyup', this.onKeyUp.bind(this));
    };

    Player.prototype.onKeyDown = function(event){
        if(event.keyCode == this.keyUp){
            console.log("key up pressed");
            this.racket.startMovingUp();
        }
        else if(event.keyCode == this.keyDown){
            console.log("key down pressed");
            this.racket.startMovingDown();
        }
    };
    Player.prototype.onKeyUp = function(event){
        if(event.keyCode == this.keyUp){
            this.racket.stopMovingUp();
        }
        else if(event.keyCode == this.keyDown){
            this.racket.stopMovingDown();
        }
    };


    this.init();
};