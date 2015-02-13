/**
 * Created by Michael on 09/01/2015.
 */
var Main = function(){
    console.log("Main created");
    
    var that = this;

    var players = [];
    var viewWidth = window.innerWidth;
    var viewHeight = window.innerHeight;
    //used to store racket and the body to collide with (the balls)
    var boxCollision = [];
    var collisionDetection;
    ballsOntheStage = 0;

    pauseGame = 0;
    
    var bonusManager;

    //RESCALE - TO DO
    that.ratio = 1;


    Main.prototype.init = function(){
        console.log("Main initialize");

        Physics(function(world){
            renderer = Physics.renderer('pixi', {
                el: 'viewport',
                width: viewWidth,
                height: viewHeight,
                meta: true, // don't display meta data (fps, ipf)
                styles: {
                    // set colors for the circle bodies
                    'rectangle' : {
                        fillStyle: '0x000000'
                    },
                    'circle' : {
                        fillStyle: '0x000000'
                    }
                }
            });
            // add the renderer
            world.add( renderer );
            //render on each step
            world.on('step', function(){
                // Note: equivalent to just calling world.render() after world.step()
                world.render();
            });
            //define the canvas view - usefull to remove the view when the game is ended
            renderer.renderer.view.className = "rendererView";
            document.body.appendChild(renderer.renderer.view);

            //display the background image
            var backgroundTexture = PIXI.Texture.fromImage("img/back2.jpg");
            var backgroundSprite = new PIXI.Sprite(backgroundTexture);
            renderer.stage.addChild(backgroundSprite);
            
            
            // bounds of the window
            var viewportBounds = Physics.aabb(-500, 0, viewWidth + 500, viewHeight);

            // constrain objects to these bounds
            world.add(Physics.behavior('edge-collision-detection', {
                aabb: viewportBounds,
                restitution: 1, // body restitution. How "bouncy" is it?
                cof: 0
            }));

            world.add([
                Physics.behavior('body-impulse-response')
                ,Physics.behavior('sweep-prune')
                ,Physics.behavior('interactive', { el: renderer.container }).applyTo(players)
            ]);
            
            
            //create the players
            var player1 = new Player(world, {
                playerPosition:  "left",
                keyUp: 90,
                keyDown: 83
            });
            players.push(player1);
            var player2 = new Player(world, {
                playerPosition:  "right",
                keyUp: 38,
                keyDown: 40
            });
            players.push(player2);

            //the ScoreManager
            scoreManager = new ScoreManager(world);
            
            //add bonus to the stage
            bonusManager = new BonusManager(world, boxCollision, renderer);
            
            //launch the counter of the game session, in seconds
            var session = new Session(20);
            session._onEndedGame = function() {
               that.endedGame(world);
            };


            //used to manage collisions of the racket with other bodies
            boxCollision.push(player1.getRacketFromPlayer());
            boxCollision.push(player2.getRacketFromPlayer());
            
            //ensure objects bounce when edge collision is detected
            collisionDetection = Physics.behavior('body-collision-detection').applyTo(boxCollision);
            world.add(collisionDetection);
           
            //crete the ballManager - used to delete balls out of the screen
            var ballManager = new BallManager(boxCollision, world, pauseGame);
            //ballManager.restartGame();

            ballManager._onPauseGame = function() {
                pauseGame = 1;
                //test if the game is paused
                bonusManager.testIfBonusActivated();
            };
            ballManager._onUnPauseGame = function() {
                pauseGame = 0;
                //test if the game is paused
                bonusManager.testIfBonusActivated();
            };

            //add touch event to move the rackets
            world.on({
                'interact:poke': function(pos){
                    if(pos.x < viewWidth/2 && (pos.y > player1.racket.getHeight()/2 &&
                        pos.y < viewHeight - player1.racket.getHeight()/2)) {
                        player1.racket.setPosY(pos.y);
                    }
                    else if(pos.x > viewWidth/2 && (pos.y > player2.racket.getHeight()/2 &&
                        pos.y < viewHeight - player2.racket.getHeight()/2)) {
                        player2.racket.setPosY(pos.y);
                    }
                }
                ,'interact:move': function(pos){
                    if(pos.x < viewWidth/2 && (pos.y > player1.racket.getHeight()/2 &&
                        pos.y < viewHeight - player1.racket.getHeight()/2)) {
                        player1.racket.setPosY(pos.y);
                    }
                    else if(pos.x > viewWidth/2 && (pos.y > player2.racket.getHeight()/2 &&
                        pos.y < viewHeight - player2.racket.getHeight()/2)) {
                        player2.racket.setPosY(pos.y);
                    }
                }
                ,'interact:release': function(){
                }
            });

            //RESCALE - TO DO
            that._rescale();
            window.addEventListener('resize', that._rescale, false);
            
            // subscribe to the ticker - so the game is looping
            Physics.util.ticker.on(function( time ){
                 //   world.step(time);
                    player1.racket.move();
                    player2.racket.move();

                    //test if the balls go out of the screen - Create the first ball when the game is initialized
                    ballManager.testBallOutOfScreen();
                    ballManager._onRestartGame = function() {
                        bonusManager.deleteBonus();
                    };

                    //RESCALE - TO DO
                    if (!renderer.stage) return;
                    that._applyRatio(renderer.stage, that.ratio); //scale to screen size
                    world.step(time);
                    that._applyRatio(renderer.stage, 1/that.ratio); //restore original scale

                that._rescale();
            });
            // start the ticker
            Physics.util.ticker.start();
        });
    };

    //RESCALE - TO DO
    Main.prototype._rescale = function(){
        that.ratio = Math.min(window.innerWidth / viewWidth, window.innerHeight / viewHeight);
        that.width = viewWidth * that.ratio;
        that.height = viewHeight * that.ratio;
        renderer.resize(that.width, that.height);
    };
    
    //RESCALE - TO DO
    Main.prototype._applyRatio = function(displayObj, ratio) {
        if (ratio == 1) return;
        var object= displayObj;
        object.position.x = object.position.x * ratio;
        object.position.y = object.position.y * ratio;
        object.scale.x = object.scale.x * ratio;
        object.scale.y = object.scale.y * ratio;
        for (var i = 0; i < object.children.length; i++) {
            that._applyRatio(object.children[i], ratio);
        }
    };
    
    
    Main.prototype.endedGame = function(world){
        scoreManager.saveScoreInLocalStorage();
        //remove the view when the game is ended
        document.body.removeChild(renderer.renderer.view);
        
        that.removeAllBodies(world);
        
    };
    
    //delete all the bodies in the world
    Main.prototype.removeAllBodies = function(world){
        var tabLength = boxCollision.length;

        for(var i = 0; i < boxCollision.length; i++){
            world.removeBody(boxCollision[i]); //remove the specified wall
            boxCollision[i] = null;
        }
        //remove all the empty cells
        for(var i = 0; i <= tabLength; i++){
            if(boxCollision[i] == null){
                boxCollision.splice(i, 1); //removes the specified cell
            }
        }
        
        pauseGame = 1;
        //test if the game is paused
        bonusManager.testIfBonusActivated();

        //we up the event to the upper class
        if (that._onReturnGameScreen != null) {
            that._onReturnGameScreen();
        }
    };
    
};
