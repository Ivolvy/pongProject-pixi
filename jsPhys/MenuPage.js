/**
 * Created by Michael on 23/01/2015.
 */
//this is the page for the menu - link to play/settings and help pages
var GameMenu = function(stage, topStart, leftPosition, buttonTexturePath, onAssetsLoadedCallback) {
    var that = this; //keep the context for the callback function

    var stageWidth = window.innerWidth;
    var stageHeight = window.innerHeight;


    this.paused;
    this._buttons = [];
    this._onDriveInFinishedCallback = null;
    this._onDriveOutFinishedCallback = null;
    this._onAssetsLoadedCallback = onAssetsLoadedCallback;
    
    var buttonType;

    var buttonTexture = null;
    var bTexturePath = buttonTexturePath;
    var pressedButton = null;

    var myContainer;

    GameMenu.prototype.init = function(){
        //create a container to enabled the visible option in the upper class
        myContainer = new PIXI.DisplayObjectContainer();
        stage.addChild(myContainer);
        myContainer.visible = false;
        
        this._onAssetsLoadedCallback = function () {
            //When the assets are loaded, we add the buttons
            this.addButton("GO ON !", stage, 'goOn');
            this.addButton("SETTINGS", stage, 'settings');
            this.addButton("HELP", stage, 'help');
        };
        this.loadAssets();
    };
    
    //we load the different assets
    GameMenu.prototype.loadAssets = function () {
        var assetsToLoad = [buttonTexturePath];
        var loader = new PIXI.AssetLoader(assetsToLoad);

        loader.onComplete = function () {
            buttonTexture = PIXI.Texture.fromImage(bTexturePath);
            if (that._onAssetsLoadedCallback != null) {
                that._onAssetsLoadedCallback(); //add the buttons when the assets are loaded
            }
        };
        loader.load();
    };

    //add the buttons via the class GameMenuButton
    GameMenu.prototype.addButton = function (text, stage, buttonType) {
        var newTopStart = topStart;
        that._buttons.forEach(function (element, index) {
            newTopStart += element.getHeight();
        });
        var newMenuButton = new GameMenuButton(myContainer, text, newTopStart, buttonType, buttonTexture, stage);
        newMenuButton.addToStage(stage);
        newMenuButton._onPressCallback = that.buttonPressed.bind(that);
        that._buttons.push(newMenuButton);
    };

    GameMenu.prototype.animate = function () {
        //code when we touch the button
    };

    //when we touch a button on GameMenuButton
    GameMenu.prototype.buttonPressed = function (button) {
        pressedButton = button;
        //we up the event to the GameMenuManager
        buttonType = button.getButtonType();
        this.onDriveOutFinished(pressedButton);
    };

    //go to the upper class to manage the action attributed to the buttons
    GameMenu.prototype.onDriveOutFinished = function (pressedButton) {
        if (that._onDriveOutFinishedCallback != null) {
            that._onDriveOutFinishedCallback(pressedButton, buttonType);
        }
    };

    //determine if the buttons of gameMenu are visible or not
    GameMenu.prototype.setVisible = function(visible){
       myContainer.visible = visible;
    };
};
