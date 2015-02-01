/**
 * Created by Michael on 24/01/2015.
 */
//this is the page for the settings
var SettingsPage = function(stage, topStart, leftPosition, buttonTexturePath, onAssetsLoadedCallback) {
    var that = this; //keep the context for the callback function

    var stageWidth = window.innerWidth;
    var stageHeight = window.innerHeight;

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

    SettingsPage.prototype.init = function(){
        //create a container to enabled the visible option in the upper class
        myContainer = new PIXI.DisplayObjectContainer();
        stage.addChild(myContainer);
        myContainer.visible = false;
        
        this._onAssetsLoadedCallback = function () {
            //When the assets are loaded, we add the buttons
            this.addButton("Return menu", stage, 'menu');
        };
        this.loadAssets();
    };

    SettingsPage.prototype.loadAssets = function () {
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

    SettingsPage.prototype.addButton = function (text, stage, buttonType) {
        var newTopStart = topStart;
        that._buttons.forEach(function (element, index) {
            newTopStart += element.getHeight();
        });
        var newMenuButton = new GameMenuButton(myContainer, text, newTopStart, buttonType, buttonTexture);
        newMenuButton.addToStage(stage);
        newMenuButton._onPressCallback = that.buttonPressed.bind(that);
        that._buttons.push(newMenuButton);
    };

    SettingsPage.prototype.animate = function () {
        //code when we touch the button
    };

    SettingsPage.prototype.buttonPressed = function (button) {
        pressedButton = button;
        //we up the event to the GameMenuManager
        buttonType = button.getButtonType();
        this.onDriveOutFinished(pressedButton);
    };

    SettingsPage.prototype.onDriveOutFinished = function (pressedButton) {
        if (that._onDriveOutFinishedCallback != null) {
            that._onDriveOutFinishedCallback(pressedButton, buttonType);
        }
    };

    //determine if the buttons of gameMenu are visible or not
    SettingsPage.prototype.setVisible = function(visible){
        myContainer.visible = visible;
    };
};
