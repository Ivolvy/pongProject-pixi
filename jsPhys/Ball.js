/**
 * Created by Michael on 09/01/2015.
 */
var Ball = function(players){
    console.log("Ball created");
    var viewWidth = window.innerWidth;
    var viewHeight = window.innerHeight;

    this.ball = null;
    var radius = 25;
    var speed = 5;
    var velocity = 1;


    this.players = players;

    var balls = [];


    Ball.prototype.init = function(){
      console.log("Ball initialize");

        //add a ball body
        Physics.body('ball', 'circle', function( parent ){
            return {
                // no need for an init

                fn: function(){

                }
            };
        });
        
        //add a circle
        this.ball = Physics.body('ball', {
            x: 100, // x-coordinate
            y: 100, // y-coordinate
            vx: 0.5, // velocity in x-direction
            vy: 0.5, // velocity in y-direction
            radius: radius,
            cof: 0
        });


        balls.push(this.ball);
    };


    Ball.prototype.move = function(){


    };


    Ball.prototype.addToStage = function(world){
        // add the ball to the world
        world.add(this.ball);

    };

    this.init();
};