/**
 * Created by Michael on 06/02/2015.
 */
var Wall= function(world, positionX, positionY, angle) {

    var that = this;

    that.wall = null;
    
    var wallWidth = 25;
    var wallHeight = 100;

    Wall.prototype.init = function(){
        Physics.body('wall', 'rectangle', function( parent ){
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
        that.wall = Physics.body('wall', {
            x: positionX, // x-coordinate - centroid of the rectangle
            y: positionY, // y-coordinate - centroid of the rectangle
            vx: 0, // velocity in x-direction
            vy: 0, // velocity in y-direction
            angle: angle,
            width: wallWidth,
            height: wallHeight,
            treatment: 'static', //the body don't move when the ball collide with him
            cof: 0,
            styles: {
                fillStyle: '0x00FF00'
            }
        });

    };


    Wall.prototype.getBody = function(){
        return that.wall;
    };
    
    Wall.prototype.addToStage = function(world){
        // add the wall to the world
        world.add(that.wall);
    };
    
    this.init();
};