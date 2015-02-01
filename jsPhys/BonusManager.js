/**
 * Created by Michael on 22/01/2015.
 */

//The bonus class manages all the bonus (black hole, multiball, etc...)

var BonusManager = function(renderer){

    this.bonus = null;

    BonusManager.prototype.init = function(){

        this.bonus = new BlackHole(renderer);
      

    };
    
    BonusManager.prototype.randomBonus = function(){
        
        
    };
    
    BonusManager.prototype.positionBonus = function(){
        
        
    };


    BonusManager.prototype.addToStage = function(world){
        this.bonus.addToStage(world);
    };

    this.init();
};
