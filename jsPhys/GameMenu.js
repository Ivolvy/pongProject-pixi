/**
 * Created by Michael on 23/01/2015.
 */
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
        //stage = new PIXI.Stage(0xFFFFFF);
        myContainer = new PIXI.DisplayObjectContainer();
        stage.addChild(myContainer);
        myContainer.visible = false;
        
        this._onAssetsLoadedCallback = function () {
            //When the assets are loaded, we add the buttons
            this.addButton("Go on !", stage, 'goOn');
            this.addButton("Settings", stage, 'settings');
            this.addButton("Help", stage, 'help');
        };
        this.loadAssets();
    };
    
    
    GameMenu.prototype.loadAssets = function () {
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

    GameMenu.prototype.addButton = function (text, stage, buttonType) {
        var newTopStart = topStart;
        that._buttons.forEach(function (element, index) {
            newTopStart += element.getHeight();
        });
        var newMenuButton = new GameMenuButton(myContainer, text, newTopStart, buttonType, buttonTexture);
        newMenuButton.addToStage(stage);
        newMenuButton._onPressCallback = that.buttonPressed.bind(that);
        that._buttons.push(newMenuButton);
    };

    GameMenu.prototype.animate = function () {
        //code when we touch the button
    };

    GameMenu.prototype.buttonPressed = function (button) {
        pressedButton = button;
        //we up the event to the GameMenuManager
        buttonType = button.getButtonType();
        this.onDriveOutFinished(pressedButton);
    };

    GameMenu.prototype.onDriveOutFinished = function (pressedButton) {
        if (that._onDriveOutFinishedCallback != null) {
            that._onDriveOutFinishedCallback(pressedButton, buttonType);
        }
    };
    
    GameMenu.prototype.onDriveInFinished = function () {
        if (that._onDriveInFinishedCallback != null) {
            that._onDriveInFinishedCallback();
        }
    };

    GameMenu.prototype.setVisible = function(visible){
       myContainer.visible = visible;
    };
};
