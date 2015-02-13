/**
 * Created by Michael on 05/02/2015.
 */
var WallManager = function(boxCollision, world) {
    var that = this;

    var viewWidth = window.innerWidth;
    var viewHeight = window.innerHeight;
    
    WallManager.prototype.init = function(){
        //top and bottom walls in the middle X of the stage 
        that.createWalls(viewWidth/2, (viewHeight - 100)/10, 0); //bottom
        that.createWalls(viewWidth/2, (viewHeight - 100), 0); //top

        //walls with an angle - on the left of the screen
        that.createWalls(viewWidth/2 - 100, (viewHeight - 100)/10 * 3, 45); //top
        
        // walls with an angle - on the right of the screen
        that.createWalls(viewWidth/2 + 100, (viewHeight - 100)/10 * 8, 45); //bottom

    };


    //create all the walls
    WallManager.prototype.createWalls = function(x, y, angle){
        var wall = new Wall(world, x, y, angle);

        boxCollision.push(wall.getBody());
        world.add(Physics.behavior('body-collision-detection').applyTo(boxCollision));
        
        wall.addToStage(world);
    };
    
    WallManager.prototype.removeBonus = function(world){
        var tabLength = boxCollision.length;
        
        for(var i = 0; i < boxCollision.length; i++){
            if(boxCollision[i].name == 'wall'){
                world.removeBody(boxCollision[i]); //remove the specified wall
                boxCollision[i] = null;
            }
        }
        //remove all the empty cells
        for(var i = 0; i <= tabLength; i++){
            if(boxCollision[i] == null){
                boxCollision.splice(i, 1); //removes the specified cell
            }
        }
    };
    
    this.init();
};