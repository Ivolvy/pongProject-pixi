/**
 * Created by Michael on 24/01/2015.
 */
//this is the page for the scores
var ScorePage = function(stage, topStart, buttonTexturePath, onAssetsLoadedCallback) {
    var that = this; //keep the context for the callback function

    var viewWidth = window.innerWidth;
    var viewHeight = window.innerHeight;

    this.paused = false;
    this._buttons = [];
    this._onDriveInFinishedCallback = null;
    this._onDriveOutFinishedCallback = null;
    this._onAssetsLoadedCallback = onAssetsLoadedCallback;

    var buttonType;
    
    var buttonTexture = null;
    var bTexturePath = buttonTexturePath;
    var pressedButton = null;

    var myContainer;

    var assetsIntro = ["fonts/Intro/Intro.fnt"];
    var loaderIntro = new PIXI.AssetLoader(assetsIntro);
    var bitmapFontPlayer1;
    var bitmapFontPlayer2;

    loaderIntro.onComplete = onAssetsLoadedIntro;
    loaderIntro.load();
    
    function onAssetsLoadedIntro(){
        that.displayScores();
    }

    ScorePage.prototype.init = function(){
        //create a container to enabled the visible option in the upper class
        myContainer = new PIXI.DisplayObjectContainer();
        stage.addChild(myContainer);
        myContainer.visible = false;
        
        this._onAssetsLoadedCallback = function () {
            //When the assets are loaded, we add the buttons
            this.addButton("Menu", stage, 'menu');
        };
        this.loadAssets();
    };

    ScorePage.prototype.loadAssets = function () {
        var assetsToLoad = [buttonTexturePath];
        var loader = new PIXI.AssetLoader(assetsToLoad);

        loader.onComplete = function () {
            buttonTexture = PIXI.Texture.fromImage(bTexturePath);
            if (that._onAssetsLoadedCallback != null) {
                that._onAssetsLoadedCallback();
            }
        };
        loader.load();
    };

    ScorePage.prototype.addButton = function (text, stage, buttonType) {
        var newTopStart = topStart;
        that._buttons.forEach(function (element, index) {
            newTopStart += element.getHeight();
        });
        var newMenuButton = new GameMenuButton(myContainer, text, newTopStart, buttonType, buttonTexture);
        newMenuButton.addToStage(stage);
        newMenuButton._onPressCallback = that.buttonPressed.bind(that);
        that._buttons.push(newMenuButton);
    };

    ScorePage.prototype.animate = function () {
        //code when we touch the button
    };

    ScorePage.prototype.buttonPressed = function (button) {
        pressedButton = button;
        //we up the event to the GameMenuManager
        buttonType = button.getButtonType();
        this.onDriveOutFinished(pressedButton);
    };

    ScorePage.prototype.onDriveOutFinished = function (pressedButton) {
        if (that._onDriveOutFinishedCallback != null) {
            that._onDriveOutFinishedCallback(pressedButton, buttonType);
        }
    };

    //determine if the buttons of gameMenu are visible or not
    ScorePage.prototype.setVisible = function(visible){
        myContainer.visible = visible;
    };
    

    ScorePage.prototype.displayScores = function(){
        var scorePlayer1 = localStorage.getItem("Player1");
        var scorePlayer2 = localStorage.getItem("Player2");

        //The score for the player on the left
        bitmapFontPlayer1 = new PIXI.BitmapText("Player 1 : "+scorePlayer1+" points", {font: "80px Intro", align: "right"});
        bitmapFontPlayer1.scale.x = viewWidth / 1366; //1366 is the base width for which the game was created
        bitmapFontPlayer1.scale.y = bitmapFontPlayer1.scale.x;
        bitmapFontPlayer1.position.x = (viewWidth - bitmapFontPlayer1.width)/2;
        bitmapFontPlayer1.position.y = viewHeight/10*5;
        myContainer.addChild(bitmapFontPlayer1);

        //The score for the player on the right
        bitmapFontPlayer2 = new PIXI.BitmapText("Player 2 : "+scorePlayer2+" points", {font: "80px Intro", align: "right"});
        bitmapFontPlayer2.scale.x = viewWidth / 1366; //1366 is the base width for which the game was created
        bitmapFontPlayer2.scale.y = bitmapFontPlayer2.scale.x;
        bitmapFontPlayer2.position.x = (viewWidth - bitmapFontPlayer2.width)/2;
        bitmapFontPlayer2.position.y = viewHeight/10*6;
        myContainer.addChild(bitmapFontPlayer2);
    };
    
};
