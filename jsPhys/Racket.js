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
        Physics.body('racket', 'rectangle', function( parent ){
            return {
                // no need for an init

                //set the pos to the racket
                setPosX: function(x){
                    this.state.pos.x = x;
                },
                setPosY: function(y){
                    this.state.pos.y = y;
                },
                getPosY: function(){
                    return this.state.pos.y;
                }
            };
        });
        
        //add a racket
        this.racket = Physics.body('racket', {
            x: 50, // x-coordinate - centroid of the rectangle
            y: 30, // y-coordinate - centroid of the rectangle
            vx: 0, // velocity in x-direction
            vy: 0, // velocity in y-direction
            width: racketWidth,
            height: racketHeight,
            treatment: 'static', //the body don't move when the ball collide with him
            cof: 0
        });
        this.velocity = 10;
       
        this.initPosition();
    };

    Racket.prototype.initPosition = function(){
        if(playerPosition == "left") {
            this.racket.setPosX(30);
            this.racket.setPosY(racketHeight/2);
        }
        else{
            this.racket.setPosX(stageWidth - racketWidth);
            this.racket.setPosY(racketHeight/2);
        }
    };

    Racket.prototype.move = function(){
        if(this.moveUp == true){
            if(this.racket.getPosY() - racketHeight/2 > 0) {
                if(this.racket.getPosY() - racketHeight/2 - this.velocity < 0) {
                    this.racket.setPosY(racketHeight/2);
                }
                else {
                    var temp =  this.racket.getPosY() - this.velocity;
                    this.racket.setPosY(temp);
                }
            }
        }
        else if(this.moveDown == true){
            if(this.racket.getPosY() + racketHeight/2 < stageHeight) {
                if(this.racket.getPosY() + racketHeight/2 + this.velocity > stageHeight){
                    this.racket.setPosY(stageHeight - racketHeight/2);
                }
                else {
                    var temp =  this.racket.getPosY() + this.velocity;
                    this.racket.setPosY(temp);
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

    Racket.prototype.getX = function(){
        return this.racket.position.x;
    };
    Racket.prototype.getY = function(){
        return this.racket.position.y;
    };
    Racket.prototype.getWidth = function(){
        return racketWidth;
    };
    Racket.prototype.getHeight = function(){
        return racketHeight;
    };

    Racket.prototype.getBody = function(){
        return this.racket;
    };
    
    Racket.prototype.addToStage = function(world){
        // add the racket to the world
        world.add(this.racket);
    };

    this.init();
};