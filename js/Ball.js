/**
 * Created by Michael on 09/01/2015.
 */
var Ball = function(players){
    console.log("Ball created");
    var stageWidth = window.innerWidth;
    var stageHeight = window.innerHeight;

    this.ball = null;
    var radius = 25;
    var speed = 5;
    var velocity = 1;


    this.players = players;

    var balls = [];
    this.collision = null;



    Ball.prototype.init = function(){
      console.log("Ball initialize");

        this.ball = new PIXI.Graphics();
        this.ball.beginFill(0x000000);
        this.ball.drawCircle(0, 0, radius);
        this.ball.position.x = 100;
        this.ball.position.y = 100;

        balls.push(this.ball);

        this.collision = new BallManager(players, balls, radius);
        //this.collision.addEventListener("directionChanged", this.changeDirection(this.collision.getDirection()));

    };

    Ball.prototype.updatePosition = function(){
        this.ball.position.x+= speed * velocity * this.collision.getDirectionX();
        this.ball.position.y-= speed * velocity * this.collision.getDirectionY();
    };


    Ball.prototype.move = function(){

        this.collision.testCollision();
        //this.changeDirection(this.collision.getDirection());
        //console.log("Direction"+this.collision.getDirection());
        this.updatePosition();

        //console.log("test"+this.collision.getDirection());
    };


    Ball.prototype.addToStage = function(stage){
        stage.addChild(this.ball);
    };

    this.init();
};