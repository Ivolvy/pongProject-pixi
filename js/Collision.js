/**
 * Created by Michael on 11/01/2015.
 */
var Collision = function(players, balls, radius){
    console.log("Collisions created");
    var stageWidth = window.innerWidth;
    var stageHeight = window.innerHeight;

    this.players = players;
    this.balls = balls;

    this.radius = radius;



    this.racket1 = this.players[0].racket;
    this.racket2 = this.players[1].racket;
    this.ball = this.balls[0];

    this.directionX = 1;
    this.directionY = 1;

   // PIXI.EventTarget.call(this);

    Collision.prototype.init = function(){

    };


    Collision.prototype.testCollision = function(){
        //Test Walls collisions
        if(this.ball.position.y - radius <= 0){
            this.ball.position.y = radius;
            this.changeDirection("y");
           // this.dispatchEvent({type: "directionChanged"});
        }
        else if(this.ball.position.y + radius >= stageHeight){
            this.changeDirection("y");
            this.ball.position.y = stageHeight - radius;

           //this.dispatchEvent({type: "directionChanged"});
        }

        //Test Rackets collisions
        //Racket1
        if(this.ball.position.x - radius <= this.racket1.getX() + this.racket1.getWidth()) {
            //The ball comes from the right
            if (this.ball.position.x - radius <= this.racket1.getX() + this.racket1.getWidth() &&
                this.ball.position.x - radius >= this.racket1.getX() &&
                this.ball.position.y - radius >= this.racket1.getY() &&
                this.ball.position.y + radius <= (this.racket1.getY() + this.racket1.getHeight())) {
                this.ball.position.x = this.racket1.getX() + this.racket1.getWidth() + radius;
                this.changeDirection("x");
            }
            //The ball comes from above - Test for the above right corner of the racket
            else if (this.ball.position.x - radius <= this.racket1.getX() + this.racket1.getWidth() &&
                this.ball.position.x - radius >= this.racket1.getX() &&
                this.ball.position.y + radius >= (this.racket1.getY()) &&
                this.ball.position.y + radius < (this.racket1.getY() + (this.racket1.getHeight() / 10))) {
                this.ball.position.x = this.racket1.getX() + this.racket1.getWidth() + radius;
                this.changeDirection("x");
                this.changeDirection("y");
            }
            //The ball comes from below - Test for the below right corner of the racket
            else if (this.ball.position.x - radius <= this.racket1.getX() + this.racket1.getWidth() &&
                this.ball.position.x - radius >= this.racket1.getX() &&
                this.ball.position.y - radius <= (this.racket1.getY() + this.racket1.getHeight()) &&
                this.ball.position.y - radius > (this.racket1.getY() + 9 * (this.racket1.getHeight() / 10))) {
                this.ball.position.x = this.racket1.getX() + this.racket1.getWidth() + radius;
                this.changeDirection("x");
                this.changeDirection("y");
            }
            //The ball comes from above - Test for the top of the racket
            else if (this.ball.position.x <= this.racket1.getX() + this.racket1.getWidth() &&
                this.ball.position.x + radius >= this.racket1.getX() &&
                this.ball.position.y + radius >= this.racket1.getY() &&
                this.ball.position.y + radius < (this.racket1.getY() + (this.racket1.getHeight() / 10))) {
                this.ball.position.y = this.racket1.getY() - radius;
                this.changeDirection("y");
            }
            //The ball comes from below - Test for the bottom of the racket
            else if (this.ball.position.x <= this.racket1.getX() + this.racket1.getWidth() &&
                this.ball.position.x + radius >= this.racket1.getX() &&
                this.ball.position.y - radius <= (this.racket1.getY() + this.racket1.getHeight()) &&
                this.ball.position.y + radius > (this.racket1.getY() + 10 * (this.racket1.getHeight() / 10))) {
                this.ball.position.y = this.racket1.getY() + this.racket1.getHeight() + radius;
                this.changeDirection("y");
            }

        }
        //Racket2
        else if(this.ball.position.x + radius >= this.racket2.getX()){
            //The ball comes from the left
            if (this.ball.position.x + radius >= this.racket2.getX() &&
                this.ball.position.x + radius <= this.racket2.getX() + this.racket2.getWidth() &&
                this.ball.position.y - radius >= this.racket2.getY() &&
                this.ball.position.y + radius <= (this.racket2.getY() + this.racket2.getHeight())) {
                this.ball.position.x = this.racket2.getX() - radius;
                this.changeDirection("x");
            }
            //The ball comes from above - Test for the above left corner of the racket
            else if (this.ball.position.x + radius >= this.racket2.getX() &&
                this.ball.position.x + radius <= this.racket2.getX() + this.racket2.getWidth() &&
                this.ball.position.y + radius >= (this.racket2.getY()) &&
                this.ball.position.y + radius < (this.racket2.getY() + (this.racket2.getHeight() / 10))) {
                this.ball.position.x = this.racket2.getX() - radius;
                this.changeDirection("x");
                this.changeDirection("y");
            }
            //The ball comes from below - Test for the below left corner of the racket
            else if (this.ball.position.x + radius >= this.racket2.getX() &&
                this.ball.position.x + radius <= this.racket2.getX() + this.racket2.getWidth() &&
                this.ball.position.y - radius <= (this.racket2.getY() + this.racket2.getHeight()) &&
                this.ball.position.y - radius > (this.racket2.getY() + 9 * (this.racket2.getHeight() / 10))) {
                this.ball.position.x = this.racket2.getX() - radius;
                this.changeDirection("x");
                this.changeDirection("y");
            }
            //The ball comes from above - Test for the top of the racket
            else if (this.ball.position.x >= this.racket2.getX()&&
                this.ball.position.x - radius <= this.racket2.getX() + this.racket2.getWidth() &&
                this.ball.position.y + radius >= this.racket2.getY() &&
                this.ball.position.y + radius < (this.racket2.getY() + (this.racket2.getHeight() / 10))) {
                this.ball.position.y = this.racket2.getY() - radius;
                this.changeDirection("y");
            }
            //The ball comes from below - Test for the bottom of the racket
            else if (this.ball.position.x >= this.racket2.getX() &&
                this.ball.position.x - radius <= this.racket2.getX() + this.racket2.getWidth() &&
                this.ball.position.y - radius <= (this.racket2.getY() + this.racket2.getHeight()) &&
                this.ball.position.y + radius > (this.racket2.getY() + 10 * (this.racket2.getHeight() / 10))) {
                this.ball.position.y = this.racket2.getY() + this.racket2.getHeight() + radius;
                this.changeDirection("y");
            }

        }
    };


    Collision.prototype.changeDirection = function(type){
        if (type == "x") {
            this.directionX *= -1;
        }
        else if (type == "y") {
            this.directionY *= -1;
        }
    };

    Collision.prototype.getDirectionX = function(){
        return this.directionX;
    };
    Collision.prototype.getDirectionY = function(){
        return this.directionY;
    };


    this.init();

};