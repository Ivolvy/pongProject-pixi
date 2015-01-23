/**
 * Created by Michael on 23/01/2015.
 */
function GameMenu(topStart, leftPosition, buttonTexturePath, onAssetsLoadedCallback) {
    var that = this; //keep the context for the callback function

    var stageWidth = window.innerWidth;
    var stageHeight = window.innerHeight;

    this._buttons = [];
    this._onDriveInFinishedCallback = null;
    this._onDriveOutFinishedCallback = null;
    this._onAssetsLoadedCallback = onAssetsLoadedCallback;

    var menuState = 0;
    var counter = 0;
    var destroy = false;
    var buttonTexture = null;
    var bTexturePath = buttonTexturePath;
    var pressedButton = null;

    this.loadAssets = function () {
        var assetsToLoad = [buttonTexturePath];

        var loader = new PIXI.AssetLoader(assetsToLoad);

        loader.onComplete = function () {
            console.log("pass1");
            buttonTexture = PIXI.Texture.fromImage(bTexturePath);
            if (that._onAssetsLoadedCallback != null) {
                console.log("pass2");
                that._onAssetsLoadedCallback();
            }
        };
        loader.load();
    };

    this.addButton = function (text, stage, buttonType) {
        var newTopStart = topStart;
        that._buttons.forEach(function (element, index) {
            newTopStart += element.getHeight();
        });
        console.log("pass3");
        var newMenuButton = new GameMenuButton(text, newTopStart, buttonType, buttonTexture);
        newMenuButton.addToStage(stage);
        newMenuButton._onPressCallback = that.buttonPressed.bind(that);
        that._buttons.push(newMenuButton);
    };

    this.animate = function () {
        //code when we touch the button
    };

    this.buttonPressed = function (button) {
        if (menuState <= 2) {
            pressedButton = button;
        }
        //do here some cool action when a button is pressed
        console.log("Button pressed: "+button.getButtonType());
    };

    this.onDriveOutFinished = function (pressedButton) {
        if (that._onDriveOutFinishedCallback != null) {
            that._onDriveOutFinishedCallback(pressedButton);
        }
    };

    this.onDriveInFinished = function () {
        if (that._onDriveInFinishedCallback != null) {
            that._onDriveInFinishedCallback();
        }
    };

}
