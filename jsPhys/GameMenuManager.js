/**
 * Created by Michael on 09/01/2015.
 */
//this is the manager for the differents class page (GameMenu/ScorePage/HelpPage)
var GameMenuManager = function(){
    var that = this;
    var stage;
    var currentStage;
    var stageWidth = window.innerWidth;
    var stageHeight = window.innerHeight;

    var mainMenu;
    var score;
    var renderer;

    //RESCALE - TO DO
    that.ratio = 1;
    that.defaultWidth = 0;
    that.defaultHeight = 0;
    that.width;
    that.height;


    GameMenuManager.prototype.init = function(){
        console.log("GameMenuManager initialize");

        //Create the pixi stage renderer - used to manage screen menu
        stage = new PIXI.Stage(0xFFFFFF);


        this.defaultWidth = that.width = stageWidth;
        this.defaultHeight = that.height = stageHeight;

        renderer = PIXI.autoDetectRenderer(stageWidth, stageHeight);
        renderer.view.className = "rendererView";
        document.body.appendChild(renderer.view);

        //RESCALE - TO DO
        that._rescale();
        window.addEventListener('resize', that._rescale, false);



        //display the background image
        var backgroundTexture = PIXI.Texture.fromImage("img/back2.jpg");
        var backgroundSprite = new PIXI.Sprite(backgroundTexture);


        stage.addChild(backgroundSprite);

        //the screen for the game menu
        mainMenu = new GameMenu(stage, stageHeight/10*3, 'img/menuButton.png');
        mainMenu.init();

        mainMenu._onDriveOutFinishedCallback = function(pressedButton, buttonType) {
            //do something when we touch the buttons
            that.goToScreen(buttonType);
        };


        //the screen for the different score
        score = new ScorePage(stage, stageHeight/10*3, 'img/menuButton.png');
        score.init();
        score._onDriveOutFinishedCallback = function(pressedButton, buttonType) {
            //do something when we touch the buttons
            that.goToScreen(buttonType);
        };

        //we start with the game menu
        this.goToScreen("menu");

        document.body.appendChild(renderer.view);
        requestAnimFrame(animate);

        function animate() {
            requestAnimFrame(animate);
            renderer.render(stage);

            //RESCALE - TO DO
            if (!stage) return;

            that._applyRatio(stage, that.ratio); //scale to screen size
            renderer.render(stage);
            that._applyRatio(stage, 1/that.ratio); //restore original scale

        }
    };

    //RESCALE - TO DO
    GameMenuManager.prototype._rescale = function(){

        that.ratio = Math.min(window.innerWidth / that.defaultWidth, window.innerHeight / that.defaultHeight);
        that.width = that.defaultWidth * that.ratio;
        that.height = that.defaultHeight * that.ratio;
        renderer.resize(that.width, that.height);
    };
    //RESCALE - TO DO
    GameMenuManager.prototype._applyRatio = function(displayObj, ratio) {
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


    GameMenuManager.prototype.goToScreen = function (screen) {
        //display the selected screen and hide the others
        if(screen == "menu") {
            mainMenu.setVisible(true);
            score.setVisible(false);
        }
        else if(screen == "goOn") {
            mainMenu.setVisible(false);
            score.setVisible(false);

            //we up the event to the upper class
            if (that._onDestructCallback != null) {
                that._onDestructCallback();
            }
        }
        else if(screen == "score"){
            mainMenu.setVisible(false);
            score.setVisible(true);
        }
    };

    GameMenuManager.prototype.getRenderer = function () {
        return renderer.view;
    }
};