/**
 * Created by Michael on 09/01/2015.
 */
var Main = function(){
    console.log("Main created");

    var players = [];
    var stage;
    var stageWidth = window.innerWidth;
    var stageHeight = window.innerHeight;


    Main.prototype.init = function(){
        console.log("Main initialize");

        stage = new PIXI.Stage(0xFFFFFF);

        var renderer = PIXI.autoDetectRenderer(stageWidth, stageHeight);
        renderer.view.className = "rendererView";

        document.body.appendChild(renderer.view);

        requestAnimFrame(animate);


        function animate() {
            requestAnimFrame(animate);

            renderer.render(stage);


            player1.racket.move();
            player2.racket.move();

            ball.move();
        }

        var player1 = new Player(stage, {
            playerPosition:  "left",
            keyUp: 90,
            keyDown: 83
        });
        players.push(player1);
        var player2 = new Player(stage, {
            playerPosition:  "right",
            keyUp: 38,
            keyDown: 40
        });
        players.push(player2);

        var ball = new Ball(players);
        ball.addToStage(stage);




    };



};
