function GameMenuButton(myContainer, mtext, topStart, buttonType, buttonTexture) {
    var that = this;
    
    var stageWidth = window.innerWidth;
    var stageHeight = window.innerHeight;


    this._onPressCallback = null;
    
    //create the sprite button and text and place them on the screen
    var sprite = new PIXI.Sprite(buttonTexture);
    var text = new PIXI.Text(mtext, { font: "48px Arial", fill: '#FFF' });

    sprite.position.x = (stageWidth - sprite.width)/2;
    sprite.position.y = topStart;
    sprite.interactive = true;
    text.position.x = (stageWidth - text.width)/2;
    text.position.y = topStart + (sprite.height - text.height)/2;


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
        myContainer.addChild(text);
    };

    this.getButtonType = function(){ //which button is clicked
        return buttonType;
    }
}