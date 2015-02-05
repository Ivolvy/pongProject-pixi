/**
 * Created by Michael on 09/01/2015.
 */
var Ball = function(world){
    console.log("Ball created");
    var viewWidth = window.innerWidth;
    var viewHeight = window.innerHeight;

    this.ball = null;
    var radius = 25;
    var speed = 5;
    var velocity = 1;


    var balls = [];


    Ball.prototype.init = function(){
      console.log("Ball initialize");

        //add a ball body
        Physics.body('ball', 'circle', function( parent ){
            return {
                // no need for an init

                //set the pos to the ball
                setPosX: function(x){
                    this.state.pos.x = x;
                },
                setPosY: function(y){
                    this.state.pos.y = y;
                },
                //set the direction to the ball
                setDirX: function(dirX){
                    //we don't ball the ball to go vertically
                    if(dirX == 0){dirX=1} //because the timer is between -1 and 1. And we want a negative or positive value
                    this.state.vel.x = dirX*this.state.vel.x;
                },
                setDirY: function(dirY){
                    this.state.vel.y = dirY*this.state.vel.y;
                }
            };
        });
        
        //add a circle
        this.ball = Physics.body('ball', {
            x: (viewWidth)/2 - radius, // x-coordinate
            y: (viewHeight)/2 -radius, // y-coordinate
            vx: 0.5, // velocity in x-direction - 0.5 for this game
            vy: 0.5, // velocity in y-direction
            radius: radius,
            cof: 0,
            mass: 1
        });

        balls.push(this.ball);
    };


    Ball.prototype.testRemoveBall = function(number){
       if(this.ball.state.pos.x < 0 || this.ball.state.pos.x > viewWidth){
           console.log("ball deleted");
           world.removeBody(this.ball);
       }
    };

    Ball.prototype.setPosX = function(number){
        this.ball.setPosX(number);
    };
    Ball.prototype.setPosY = function(number){
        this.ball.setPosY(number);
    };
    Ball.prototype.setDirX = function(number){
        this.ball.setDirX(number);
    };
    Ball.prototype.setDirY = function(number){
        this.ball.setDirY(number);
    };
    
    Ball.prototype.getBody = function(){
        return this.ball;
    };


    Ball.prototype.addToStage = function(world){
        // add the ball to the world
        world.add(this.ball);

    };

    this.init();
};