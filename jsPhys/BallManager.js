/**
 * Created by Michael on 04/02/2015.
 */
//used to test balls out of the screen, etc...
var BallManager = function(world) {
    var that = this;
    
    var viewWidth = window.innerWidth;
    var viewHeight = window.innerHeight;

    var i = 5; //the restart game timer counter

    var count;
    
    BallManager.prototype.init = function(){
        //the countdown (3,2,1)
        count = new Countdown();

    };
    
    BallManager.prototype.testBallOutOfScreen = function(){
        if(ballsOntheStage == 0 && pauseGame != 1){ //pauseGame is recovered with the parameter in new BallManager
            this.restartGame();
        }
        
        for(var i=0; i<boxCollision.length;i++){
            if(boxCollision[i]) { //if the tab[i] is not empty
                if (boxCollision[i].state.pos.x < - 50){
                    that.deleteBall(i, 'left');
                }
                else if(boxCollision[i].state.pos.x > viewWidth + 50){
                    that.deleteBall(i, 'right');
                }
            }
        }
    };
    
    BallManager.prototype.deleteBall = function(index, position){
        //if the player to the left win
        if(position == 'right'){
            scoreManager.setScorePlayer1(1);
        }
        //if the player to the right win
        else if(position == 'left'){
            scoreManager.setScorePlayer2(1);
        }
        
        world.removeBody(boxCollision[index]);
        boxCollision.splice(index,1); //removes the specified cell
        //update the number of the balls on the stage
        ballsOntheStage-=1;
    };
    
    //restart the game - timer + new ball
    BallManager.prototype.restartGame = function(){
       console.log("Ready to restart game");

        //pause the game
        that.onPauseGame();
        
        //we up the event to the upper class
        if (that._onRestartGame != null) {
            that._onRestartGame();
        }
        
        //launch a new ball
        //launch the animation of the countdown
        count.startCountDown();

        //the callback from Countdown
        count._onAnimationEnded = function() {
            that.launchBall();
        }
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

    this.init();
};