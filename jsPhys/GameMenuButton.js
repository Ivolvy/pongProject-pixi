function GameMenuButton(myContainer, mtext, topStart, buttonType, buttonTexture) {
    var that = this;
    
    var stageWidth = window.innerWidth;
    var stageHeight = window.innerHeight;


    this._onPressCallback = null;
    
    //create the sprite button and text and place them on the screen
    var sprite = new PIXI.Sprite(buttonTexture);
    //var text = new PIXI.Text(mtext, { font: "48px Arial", fill: '#FFF' });

 //////////////////////////////////////////

    /**Establishes the fonts**/
    
    var assetsToLoaderHv = ["fonts/Intro/Intro.fnt"];
    var assetsToLoaderDg = ["fonts/handvetica/handvetica.fnt"];
    
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

    //set the position to the current button
    sprite.scale.x = stageWidth / 1366; //1366 is the base width for which the game was created
    sprite.scale.y = sprite.scale.x;
    
    sprite.position.x = (stageWidth - sprite.width)/2;
    sprite.position.y = stageHeight + 10;
    sprite.interactive = true;

    function onAssetsLoadedHv(){
        bitmapFontTextHv = new PIXI.BitmapText("POONG GAME", {font: "95px Intro", align: "right"});

        bitmapFontTextHv.scale.x = stageWidth / 1366; //1366 is the base width for which the game was created
        bitmapFontTextHv.scale.y = bitmapFontTextHv.scale.x;
        
        bitmapFontTextHv.position.x = (stageWidth - bitmapFontTextHv.width)/2;
        bitmapFontTextHv.position.y = - bitmapFontTextHv.height - 10;
        myContainer.addChild(bitmapFontTextHv);

    }

    function onAssetsLoadedDg(){
        bitmapFontTextDv = new PIXI.BitmapText(mtext, {font: "95px handvetica", align: "right"});

        bitmapFontTextDv.scale.x = stageWidth / 1366; //1366 is the base width for which the game was created
        bitmapFontTextDv.scale.y = bitmapFontTextDv.scale.x;
        
        bitmapFontTextDv.position.x = (stageWidth - bitmapFontTextDv.width)/2;
        bitmapFontTextDv.position.y = stageHeight + 20;
        myContainer.addChild(bitmapFontTextDv);

        //add the animations
        that.addAnimation();
    }

    ////////////////////////////


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

    //add animations to the buttons
    this.addAnimation = function() {
        TweenLite.to(bitmapFontTextHv, 0.5, {
                y : stageHeight/10,
                ease : Elastic.easeOut,
                delay : 0.5}
        );
        TweenLite.to(bitmapFontTextDv, 0.5, {
                y : topStart + (sprite.height - bitmapFontTextDv.height)/2 - 10,
                ease : Elastic.easeOut,
                delay : 1}
        );
        TweenLite.to(sprite, 0.7, {
                y : topStart,
                ease : Elastic.easeOut,
                delay : 1}
        );
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