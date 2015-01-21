/**
 * Created by Michael on 20/01/2015.
 */

Physics(function (world) {

    var viewWidth = 640;
    var viewHeight = 410;

    var renderer = Physics.renderer('pixi', {
        el: 'viewport', // The DOM element to append the stage to
        width: viewWidth,
        height: viewHeight,
        meta: false // Turns debug info on/off
    });

    // add the renderer
    world.add(renderer);

    // render on each step
    world.on('step', function () {
        world.render();
    });


    var circle = Physics.body('circle', {
        x: 50, // x-coordinate
        y: 70, // y-coordinate
        vx: 0.2, // velocity in x-direction
        vy: 0.11, // velocity in y-direction,
        radius: 25
    });

    world.add( circle );




    // subscribe to ticker to advance the simulation
    Physics.util.ticker.on(function( time ) {
        world.step( time );
    });

});