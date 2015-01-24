/**
 * Created by Michael on 09/01/2015.
 */
var GameMenuManager = function(){
    var that = this;
    var stage;
    var currentStage;
    var stageWidth = window.innerWidth;
    var stageHeight = window.innerHeight;
       
    var mainMenu;
    var settings;
    var renderer;
    
    GameMenuManager.prototype.init = function(){
        console.log("Main initialize");
        
        stage = new PIXI.Stage(0xFFFFFF);
        renderer = PIXI.autoDetectRenderer(stageWidth, stageHeight);
        renderer.view.className = "rendererView";
        
        mainMenu = new GameMenu(stage, 150, 400, 'img/button.png');
        mainMenu.init();
        
        mainMenu._onDriveOutFinishedCallback = function(pressedButton, buttonType) {
            //do something when we touch the buttons
            that.goToScreen(buttonType);
        };

        settings = new SettingsPage(stage,150, 400, 'img/button.png');
        settings.init();
        settings._onDriveOutFinishedCallback = function(pressedButton, buttonType) {
            //do something when we touch the buttons
            that.goToScreen(buttonType);
        };
        
        
        this.goToScreen("menu");

        document.body.appendChild(renderer.view);
        requestAnimFrame(animate);
        
        function animate() {
            requestAnimFrame(animate);
            renderer.render(stage);
        }
    };



    GameMenuManager.prototype.goToScreen = function (screen) {
        //display the selected screen and hide the others
        if(screen == "menu") {
            mainMenu.setVisible(true);
            settings.setVisible(false);
        }
        else if(screen == "goOn") {
            mainMenu.setVisible(false);
            settings.setVisible(false);
            
            if (that._onDestructCallback != null) {
                that._onDestructCallback();
            }

        }
        else if(screen == "settings"){
            mainMenu.setVisible(false);
            settings.setVisible(true);
        }

    };

    GameMenuManager.prototype.getRenderer = function () {
        return renderer.view;
    }

};