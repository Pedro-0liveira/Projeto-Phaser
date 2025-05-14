    var config = {
        type : Phaser.AUTO,
        width: window.innerWidth * window.devicePixelRatio,
        height: window.innerHeight * window.devicePixelRatio,
        scale:{
            mode:Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: 2048,
            height: 1200,
        },
        render:{
            pixelArt: false
        },
        dom: {
            createContainer: true
        },
        backgroundColor: "#ffffff",
        parent: 'divId',
        fullscreenTarget: 'divId',
        scene: [Menu, Game, Creditos, Info],
    }
    var game = new Phaser.Game(config);
    var infoUser = new InfoUser();