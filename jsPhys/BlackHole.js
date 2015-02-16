/**
 * Created by Michael on 22/01/2015.
 */


var BlackHole = function(){
    console.log("BlackHole created");
    
    var that = this;
    this.blackHole = null;
    var radius = 25;

    //used to store the blackhole and the balls
    boxGravity = [];
    var newtonianBlackHole;
    var blackHoleSize = 150;
    
    BlackHole.prototype.init = function(){
        //add a ball body
        Physics.body('blackHole', 'circle', function( parent ){
            return {
                // no need for an init

                //set the pos to the blackHole
                setPosX: function(x){
                    this.state.pos.x = x + blackHoleSize/2;
                },
                setPosY: function(y){
                    this.state.pos.y = y + blackHoleSize/2;
                }
            };
        });
    
        //add a circle
        that.blackHole = Physics.body('blackHole', {
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
        that.blackHole.view = renderer.createDisplay('sprite', {
            texture: 'img/bonus/blackhole.png',
            anchor: {
                x: 0.5,
                y: 0.5
            }
        });
        that.blackHole.view.width = blackHoleSize;
        that.blackHole.view.height = blackHoleSize;
        
        
        //add the blackHole to the newtonian gravity behavior
        boxGravity.push(that.blackHole);
    };


    BlackHole.prototype.getHeight = function(){
        return  that.blackHole.view.height;
    };
    
    BlackHole.prototype.getBody = function(){
        return that.blackHole;
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
        that.addToStage(world); //add the affected object to the stage
    };


    BlackHole.prototype.removeBonus = function(world){
        world.remove(that.blackHole); //remove the blackHole body
        boxGravity = []; //empty the table if we don't want to reassign the newtonian behavior to the previous bodies
        world.removeBehavior(newtonianBlackHole); //remove the newtonian behavior from the world
    };

    this.init();
};