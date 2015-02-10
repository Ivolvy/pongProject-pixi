function GameMenuButton(myContainer, mtext, topStart, buttonType, buttonTexture) {
    var that = this;
    
    var stageWidth = window.innerWidth;
    var stageHeight = window.innerHeight;


    this._onPressCallback = null;
    
    //create the sprite button and text and place them on the screen
    var sprite = new PIXI.Sprite(buttonTexture);
    //var text = new PIXI.Text(mtext, { font: "48px Arial", fill: '#FFF' });

 //////////////////////////////////////////

    var assetsToLoaderHv = ["fonts/handvetica/handvetica.fnt"];
    var assetsToLoaderDg = ["fonts/digiffiti/digiffiti.fnt"];
    
    // create a new loader
    var loaderHv = new PIXI.AssetLoader(assetsToLoaderHv);
    var loaderDg = new PIXI.AssetLoader(assetsToLoaderDg);


    var bitmapFontTextHv;
    var bitmapFontTextDv;

    // use callback
    loaderHv.onComplete = onAssetsLoadedHv;
    loaderDg.onComplete = onAssetsLoadedDg;
    //begin load
    loaderHv.load();
    loaderDg.load();

    function onAssetsLoadedHv(){
        bitmapFontTextHv = new PIXI.BitmapText("POONG GAME", {font: "95px handvetica", align: "right"});

        bitmapFontTextHv.position.x = (stageWidth - bitmapFontTextHv.width)/2;
        bitmapFontTextHv.position.y = 20;
        myContainer.addChild(bitmapFontTextHv);
    }

    function onAssetsLoadedDg(){
        bitmapFontTextDv = new PIXI.BitmapText(mtext, {font: "95px digiffiti", align: "right"});

        bitmapFontTextDv.position.x = (stageWidth - bitmapFontTextDv.width)/2;
        bitmapFontTextDv.position.y = topStart + (sprite.height - bitmapFontTextDv.height)/2;
        myContainer.addChild(bitmapFontTextDv);
    }
    
    ////////////////////////////
    
    
    sprite.position.x = (stageWidth - sprite.width)/2;
    sprite.position.y = topStart;
    sprite.interactive = true;



    sprite.click = function(mouseData) { //when the user click with the mouse
        if (that._onPressCallback != null){
            that._onPressCallback(that);
        }
    };

    sprite.tap = function(tapData) { //when the user tap with a phone
        if (that._onPressCallback != null){
            that._onPressCallback(that);
        }
    };

    this.animate = function() {

    };

    this.getHeight = function() {
        return sprite.height + 5; //space height between the buttons
    };

    this.addToStage = function(stage) {
        myContainer.addChild(sprite);

    };

    this.getButtonType = function(){ //which button is clicked
        return buttonType;
    }
}