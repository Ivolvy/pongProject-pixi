/**
 * Created by Michael on 09/01/2015.
 */
var Main = function(){
    console.log("Main created");

    var players = [];
    var viewWidth = window.innerWidth;
    var viewHeight = window.innerHeight;
    //used to store racket and the body to collide with (the balls)
    var boxCollision = [];
    var collisionDetection;

    pauseGame = 0;

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
                //,Physics.behavior('body-collision-detection') // ensure objects bounce when edge collision is detected
                ,Physics.behavior('sweep-prune')
               // ,Physics.behavior('newtonian', { strength: 1 }) //used for gravity - 1 is default
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
            
            
            //create a ball
            var ball = new Ball(world);
            ball.addToStage(world); //also added on the blackhole gravity

            //add bonus to the stage
            //var bonus = new BonusManager(renderer);
            var bonusManager = new BonusManager(world, ball, boxCollision, renderer);


            //used to manage collisions of the racket with other bodies
            boxCollision.push(player1.getRacketFromPlayer());
            boxCollision.push(player2.getRacketFromPlayer());
            boxCollision.push(ball.getBody());
            collisionDetection = Physics.behavior('body-collision-detection').applyTo(boxCollision);
            world.add(collisionDetection);
           
            //crete the ballManager - used to delete balls out of the screen
            var ballManager = new BallManager(boxCollision, world, pauseGame);
            
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



            // subscribe to the ticker - so the game is looping
            Physics.util.ticker.on(function( time ){
                    world.step(time);
                    player1.racket.move();
                    player2.racket.move();

                    //test if the balls go out of the screen
                    ballManager.testBallOutOfScreen();
                    ballManager._onRestartGame = function() {
                        bonusManager.deleteBonus();
                    };
            });
            // start the ticker
            Physics.util.ticker.start();
        });
    };
};
