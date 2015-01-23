/**
 * Created by Michael on 09/01/2015.
 */
function GameMenuManager() {

    var stage;
    var stageWidth = window.innerWidth;
    var stageHeight = window.innerHeight;


    GameMenuManager.prototype.init = function(){
        console.log("Main initialize");

        stage = new PIXI.Stage(0xFFFFFF);

        var renderer = PIXI.autoDetectRenderer(stageWidth, stageHeight);
        renderer.view.className = "rendererView";



        var mainMenu = new GameMenu(150, 400, 'img/button.png');
        mainMenu._onAssetsLoadedCallback = function() {
            //When the assets are loaded, we add the buttons

            mainMenu.addButton("Go on !", stage, 'goOn');
            mainMenu.addButton("Settings", stage, 'settings');
            mainMenu.addButton("Help", stage, 'help');

            mainMenu._onDriveOutFinishedCallback = function(pressedButton) {
                // Do something, the menu is driven out and pressedButton has been pressed!
                // We simply drive in the menu now...

            };

            document.body.appendChild(renderer.view);
            requestAnimFrame(animate);
        };
        
        mainMenu.loadAssets();


        function animate() {
            mainMenu.animate();
            
            requestAnimFrame(animate);
            renderer.render(stage);
        }
    };
}