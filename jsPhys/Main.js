/**
 * Created by Michael on 09/01/2015.
 */
var Main = function(){
    console.log("Main created");

    var players = [];
    var viewWidth = window.innerWidth;
    var viewHeight = window.innerHeight;


    Main.prototype.init = function(){
        console.log("Main initialize");

        Physics(function(world){
            var renderer = Physics.renderer('pixi', {
                el: 'viewport',
                width: viewWidth,
                height: viewHeight,
                meta: false, // don't display meta data
                styles: {
                    // set colors for the circle bodies
                    'circle' : {
                        strokeStyle: 'hsla(60, 37%, 17%, 1)',
                        lineWidth: 1,
                        fillStyle: 'hsla(60, 37%, 57%, 0.8)',
                        angleIndicator: 'hsla(60, 37%, 17%, 0.4)'
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
                ,Physics.behavior('body-collision-detection') // ensure objects bounce when edge collision is detected
                ,Physics.behavior('sweep-prune')
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
            var ball = new Ball(players);
            ball.addToStage(world);


            
            // subscribe to the ticker
            Physics.util.ticker.on(function( time ){
                world.step( time );
                player1.racket.move();
                player2.racket.move();
                ball.move();
            });
            // start the ticker
            Physics.util.ticker.start();

        });
    };
    
};
