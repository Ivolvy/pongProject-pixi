/**
 * Created by Michael on 10/01/2015.
 */
var Player = function(world, options){
    console.log("Player created");
    this.racket = null;

    this.keyUp = options.keyUp;
    this.keyDown = options.keyDown;


    Player.prototype.init = function(){
        this.racket = new Racket(options);
        this.racket.addToStage(world);

        this.setEventListener();
    };

    Player.prototype.setEventListener = function(){
        document.addEventListener('keydown', this.onKeyDown.bind(this));
        document.addEventListener('keyup', this.onKeyUp.bind(this));
    };

    Player.prototype.onKeyDown = function(event){
        if(event.keyCode == this.keyUp){
            this.racket.startMovingUp();
        }
        else if(event.keyCode == this.keyDown){
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

    Player.prototype.onKeyUp = function(event){
        if(event.keyCode == this.keyUp){
            this.racket.stopMovingUp();
        }
        else if(event.keyCode == this.keyDown){
            this.racket.stopMovingDown();
        }
    };

    Player.prototype.getRacketFromPlayer = function(){
        return this.racket.getBody();
    };

    this.init();
};