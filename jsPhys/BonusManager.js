/**
 * Created by Michael on 22/01/2015.
 */

//The bonus class manages all the bonus (black hole, multiBall, etc...)

var BonusManager = function(renderer, world, ball, boxCollision){

    var that = this;
    that.bonus = null;
    var viewWidth = window.innerWidth;
    var viewHeight = window.innerHeight;
    var timeMinCreate = 2000; //5 seconds
    var timeMaxCreate = 5000;//10 seconds
    
    var timeMinDelete = 5000;
    var timeMaxDelete = 10000;

    var bonusBody;
    
    BonusManager.prototype.init = function(){
        that.timeBetweenBonus();
    };

    //define a blank time before create the timer to create a bonus - more randomly
    BonusManager.prototype.timeBetweenBonus = function(){
        var blankTime = Math.floor((Math.random() * (timeMaxCreate - timeMinCreate)) + timeMinCreate); //time before launch a bonus (in seconds)
        console.log("blank time: "+blankTime);
        //setInterval(this.randomBonus, startBonusAtTime);
        setTimeout(that.timerBonus, blankTime);
    };
    
    //timer to create a bonus
    BonusManager.prototype.timerBonus = function(){
        var startBonusAtTime = Math.floor((Math.random() * (timeMaxCreate - timeMinCreate)) + timeMinCreate); //time before launch a bonus (in seconds)
        console.log("time before bonus: "+startBonusAtTime);
        //setInterval(this.randomBonus, startBonusAtTime);
        setTimeout(that.randomBonus, startBonusAtTime);
    };
    
    //select a bonus randomly
    BonusManager.prototype.randomBonus = function(){
        console.log("timer passed");
        var selectedBonus = Math.floor((Math.random() * 1) + 1); //between 1 and 3
        console.log("bonus selected: "+selectedBonus);
        
        if(selectedBonus == 2){ //blackHole
            that.blackHoleBonus();
            that.positionBonus();
        }
        else if(selectedBonus == 1){ //multiBall
            that.multiBallBonus();
        }
        else if(selectedBonus == 3){}
    };
    
    //position the bonus to the stage
    BonusManager.prototype.positionBonus = function(){
        //define a random position to the selected 
        bonusBody = that.bonus.getBody();
        var bonusHeight = that.bonus.getHeight();
        
        //the min and max pos X of the bonus on the stage
        var minX = (viewWidth/10)*2;
        var maxX = (viewWidth - minX);
        
        //random position between the min and max values on the stage
        var posX = Math.floor((Math.random() * (maxX - minX)) + minX);
        var posY = Math.floor((Math.random() * viewHeight - bonusHeight) + bonusHeight);

        //give the position to the selected bonus
        bonusBody.setPosX(posX);
        bonusBody.setPosY(posY);
    };

    //the multiBall bonus
    BonusManager.prototype.multiBallBonus = function(){
        that.bonus = new MultiBall(boxCollision, world, 6); //the third argument is the number of balls
    };
    
    
    //the black hole bonus
    BonusManager.prototype.blackHoleBonus = function(){
        that.bonus = new BlackHole();
        //add the previous ball to the newtonian gravity
        that.bonus.addBlackHoleGravityTo(ball.getBody(), world);

        //delete the bonus after a specified time
        that.timeBeforeDeleteBonus();
    };

    //define the time before delete the current bonus
    BonusManager.prototype.timeBeforeDeleteBonus = function(){
        var deleteBonusAtTime = Math.floor((Math.random() * (timeMaxDelete - timeMinDelete)) + timeMinDelete);
        console.log("time before remove bonus: "+deleteBonusAtTime);
        setTimeout(that.deleteBonus, deleteBonusAtTime);
    };
    
    //delete the current bonus
    BonusManager.prototype.deleteBonus = function(){        
        that.bonus.removeBonus(world);
        that.timeBetweenBonus();
    };
    
    
    BonusManager.prototype.addToStage = function(world){
        that.bonus.addToStage(world);
    };

    this.init();
};
