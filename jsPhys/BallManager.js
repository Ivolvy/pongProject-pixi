/**
 * Created by Michael on 04/02/2015.
 */
//used to test balls out of the screen, etc...
    
var BallManager = function(boxCollision, world, pauseGame) {
    var that = this;
    
    var viewWidth = window.innerWidth;
    var viewHeight = window.innerHeight;

    var i = 5; //the restart game timer counter
    var countText; //the text display by Pixi
    var counterInterval; //the timer that launch the counter
    
    BallManager.prototype.init = function(){};
    
    BallManager.prototype.testBallOutOfScreen = function(){
        if(boxCollision.length == 2 && pauseGame != 1){ //pauseGame is recovered with the parameter in new BallManager
            console.log("biiiiiche");
            this.restartGame();
        }
        
        for(var i=0; i<boxCollision.length;i++){
            if(boxCollision[i]) { //if the tab[i] is not empty
                if (boxCollision[i].state.pos.x < - 50 || boxCollision[i].state.pos.x > viewWidth + 50) {
                    console.log("ball deleted");
                    world.removeBody(boxCollision[i]);
                    boxCollision.splice(i,1); //removes the specified cell
                    console.log("taille tab: "+boxCollision.length);
                }
            }
        }
    };
    
    //restart the game - timer + new ball
    BallManager.prototype.restartGame = function(){
       console.log("Ready to restart game");
        that.onPauseGame();
        //launch a new ball
        countText = new PIXI.Text(" "+i, {font:"50px Arial", fill:"red"});

        counterInterval = setInterval(this.setText, 1000);
    };
    
    //display counter text to re-launch a ball
    BallManager.prototype.setText = function(){
        if(i > 0) {
            countText.setText(" "+i);
            renderer.stage.addChild(countText);
        }
        else if(i == 0){
            countText.setText("Go!");
            renderer.stage.addChild(countText);
        }
        else if(i<0) {
            clearInterval(counterInterval);
            renderer.stage.removeChild(countText);
            that.launchBall();
            i = 5;
        }
        i--;
    };
    
    //launch a new ball
    BallManager.prototype.launchBall = function(){
        var ball = new Ball(world);
        boxCollision.push(ball.getBody());
        world.add(Physics.behavior('body-collision-detection').applyTo(boxCollision));
        ball.addToStage(world);
        
        that.onUnPauseGame();
    };

    //Pause all the game - used to re-launch a new ball
    BallManager.prototype.onPauseGame = function() {
        //we up the event to the upper class
        if (that._onPauseGame != null) {
            that._onPauseGame();
        }
        pauseGame = 1; 
    };
    //used to pause all the game
    BallManager.prototype.onUnPauseGame = function() {
        if (that._onUnPauseGame != null) {
            that._onUnPauseGame();
        }
        pauseGame = 0;
    };
};