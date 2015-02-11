/**
 * Created by Michael on 02/02/2015.
 */
    //this is the launcher to throw the multiBall
var MultiBall = function(boxCollision, world, numberOfBalls){
    console.log("Ball created");
    
    var that = this;
    var viewWidth = window.innerWidth;
    var viewHeight = window.innerHeight;

    that.launcher = null;
    var radius = 25;
    
    var numberOfBalls = numberOfBalls;
    var count;
    var timeBetweenBall;


    MultiBall.prototype.init = function(){
        console.log("Ball initialize");

        Physics.body('launcher', 'circle', function( parent ){
            return {
                //set the pos to the launcher
                setPosX: function(x){
                    this.state.pos.x = x;
                },
                setPosY: function(y){
                    this.state.pos.y = y;
                }
            };
        });

        //add a launcher
        that.launcher = Physics.body('launcher', {
            //x and y defined in BonusManager
            vx: 0,
            vy: 0,
            radius: radius,
            treatment: 'static',
            mass: 1, //this is default
            cof: 0,
            styles: {
                fillStyle: '0x0000FF'
            }
        });
                
        //position the launcher on the stage
        that.setPosX(viewWidth/2);
        that.setPosY(viewHeight/2);

        world.add(that.launcher);

        count = 0;
        timeBetweenBall = setInterval(that.createBalls, 1000); //time between two balls creation
    };
    
    //create all the balls for the multiBall
    MultiBall.prototype.createBalls = function(){
        if(count < numberOfBalls) { //create the number of balls passed in the class parameters
            var ball = new Ball(world);

            ball.setPosX(viewWidth / 2);
            ball.setPosY(viewHeight / 2);

            //set the spawn direction of the ball
            ball.setDirX(Math.floor((Math.random() * 2) + -1)); //between -1 and 0
            ball.setDirY(Math.floor((Math.random() * 2) + -1)); //between -1 and 0

            boxCollision.push(ball.getBody());
            world.add(Physics.behavior('body-collision-detection').applyTo(boxCollision));

            ball.addToStage(world);
            count++;
        }
        else {
            clearInterval(timeBetweenBall); //stop the balls creation
            count = 0; //resets the counter
            world.removeBody(that.launcher); //remove the launcher when all the balls are ejected (on the stage)

            //we up the event to the upper class
            if (that._onCreationComplete != null) {
                that._onCreationComplete();
            }
        }
    };    
    

    MultiBall.prototype.setPosX = function(number){
        that.launcher.setPosX(number);
    };
    MultiBall.prototype.setPosY = function(number){
        that.launcher.setPosY(number);
    };
    
    MultiBall.prototype.getBody = function(){
        return that.launcher;
    };

    MultiBall.prototype.removeBonus = function(world){
        //do nothing for multiball
        world.remove(that.launcher);
    };
    
    MultiBall.prototype.addToStage = function(world){
        // add the launcher to the world
        world.add(that.launcher);
    };

    this.init();
};