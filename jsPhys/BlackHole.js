/**
 * Created by Michael on 22/01/2015.
 */


var BlackHole = function(renderer){
    console.log("BlackHole created");
    this.blackHole = null;
    var radius = 25;

    //used to store the blackhole and the balls
    var boxGravity = [];
    var newtonianBlackHole;
    
    BlackHole.prototype.init = function(){
        //add a ball body
        Physics.body('blackHole', 'circle', function( parent ){
            return {
                // no need for an init

                //set the pos to the blackHole
                setPosX: function(x){
                    this.state.pos.x = x;
                },
                setPosY: function(y){
                    this.state.pos.y = y;
                }
            };
        });
    
        //add a circle
        this.blackHole = Physics.body('blackHole', {
            //x and y defined in BonusManager
            vx: 0, // velocity in x-direction
            vy: 0, // velocity in y-direction
            radius: radius,
            treatment: 'static',
            mass: 20,
            cof: 0,
            styles: {
                fillStyle: '0xFF0000'
            }
            
        });
        //used to define an image to the selected body
       /* this.blackHole.view = renderer.createDisplay('sprite', {
            texture: 'img/baal1.png',
            anchor: {
                x: 0.5,
                y: 0.5
            }
        });*/

        //add the blackHole to the newtonian gravity behavior
        boxGravity.push(this.blackHole);
    };


    BlackHole.prototype.getHeight = function(){
        return radius;
    };
    
    BlackHole.prototype.getBody = function(){
        return this.blackHole;
    };

    BlackHole.prototype.addToStage = function(world){
        //add the newtonian gravity
       // world.add([
            newtonianBlackHole = Physics.behavior('newtonian', { strength: 0.5 }).applyTo(boxGravity); //used for gravity - 1 is default
        //]);

        world.add(newtonianBlackHole);
        world.add(boxGravity);
    };
    
    //add a body to the newtonian gravity
    BlackHole.prototype.addBlackHoleGravityTo = function(body, world){
        boxGravity.push(body);
        this.addToStage(world); //add the affected object to the stage
    };


    BlackHole.prototype.removeBonus = function(world){
        world.remove(this.blackHole); //remove the blackHole body
        boxGravity = []; //empty the table if we don't want to reassign the newtonian behavior to the previous bodies
        world.removeBehavior(newtonianBlackHole); //remove the newtonian behavior from the world
    };

    this.init();
};