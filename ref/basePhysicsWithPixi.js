/**
 * Created by Michael on 21/01/2015.
 */
Physics(function(world){
    // use "world"

    var viewWidth = window.innerWidth;
    var viewHeight = window.innerHeight;

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
    var viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight);

    // constrain objects to these bounds
    world.add(Physics.behavior('edge-collision-detection', {
        aabb: viewportBounds,
        restitution: 0.99,
        cof: 0.99
    }));

    //add a circle
    var ball = Physics.body('circle', {
        x: 50, // x-coordinate
        y: 30, // y-coordinate
        vx: 0.2, // velocity in x-direction
        vy: 0.01, // velocity in y-direction
        radius: 20
    });
    // add the circle to the world
    world.add( ball );


    // ensure objects bounce when edge collision is detected
    world.add( Physics.behavior('body-impulse-response') );


    // add some gravity
    var gravity = Physics.behavior('constant-acceleration', {
        acc: { x : 0, y: 0.0004 } // this is the default
    });
    world.add( gravity );


    // later... flip the world upside down!
    //gravity.setAcceleration({ x: 0, y: -0.0004 });


    // subscribe to the ticker
    Physics.util.ticker.on(function( time ){
        world.step( time );
    });
    // start the ticker
    Physics.util.ticker.start();


});