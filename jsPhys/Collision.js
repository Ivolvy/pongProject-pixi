/**
 * Created by Michael on 04/02/2015.
 */
    //used to test collision/balls out of the screen, etc...
    
var Collision = function(boxCollision, world) {

    var viewWidth = window.innerWidth;
    var viewHeight = window.innerHeight;
    
    Collision.prototype.init = function(){};

    
    Collision.prototype.testBallOutOfScreen = function(){
        for(var i=0; i<boxCollision.length;i++){
            if(boxCollision[i]) { //if the tab[i] is not empty
                if (boxCollision[i].state.pos.x < 0 || boxCollision[i].state.pos.x > viewWidth) {
                    console.log("ball deleted");
                    world.removeBody(boxCollision[i]);
                    boxCollision.splice(i,1); //removes the specified cell
                    console.log("taille tab: "+boxCollision.length);
                }
            }
        }
    }
};