class Info extends Phaser.Scene{
    constructor(){
        super("Info");
    }
    preload(){
        this.load.image("background", "sprites/background.png");
        this.load.image("Creditos", "sprites/bt_creditos.png");
        this.load.image("Info", "sprites/bt_info.png");
        this.load.image("instrucoes", "sprites/instrucoes-img.png");
        this.load.image("Maximizar", "sprites/fullscreen-bt-1.png");
        this.load.image("Minimizar", "sprites/fullscreen-bt-2.png");
        this.load.image("Login", "sprites/login-bt.png");
        this.load.image("Voltar", "sprites/back-bt.png");
    }
    create(){
        width = game.config.width;
        height = game.config.height;
        scale = 0.9;

        //createGrid

        this.background = this.add.sprite(width * 0.5, height * 0.5, "background");
        this.background.setScale(1.5);

        this.infoBT = this.add.image(width * 0.16, height * 0.89, "Info");
        this.infoBT.setTint(0x808080).setAlpha(0.5);
        this.infoBT.setScale(scale);

        this.credBT = this.add.image(width * 0.08, height * 0.93, "Creditos");
        this.credBT.setScale(scale);
        this.credBT.setInteractive({ useHandCursor: true });

        this.maxBT = this.add.image(width * 0.065, height * 0.1, "Maximizar");
        this.maxBT.setScale(scale);
        this.maxBT.setInteractive({ useHandCursor: true });

        this.minBT = this.add.image(width * 0.065, height * 0.1, "Minimizar");
        this.minBT.visible = false;
        this.minBT.setScale(scale);
        this.minBT.setInteractive({ useHandCursor: true });

        this.voltarBT = this.add.image(width * 0.24, height * 0.85, "Voltar");
        this.voltarBT.setScale(scale);
        this.voltarBT.setInteractive({ useHandCursor: true });
        
        this.instrucoes = this.add.image(width * 0.68, height * 0.53, "instrucoes");

        this.hellomessage = this.add.text(0.19 * game.config.width, 0.06 * game.config.height, "Olá "+ infoUser.firstName.split(" ")[0],{ fontFamily: 'font1',fontSize: 45,color: '#ffffff',align: 'center'});
        this.hellomessage.visible = false;

        //Funcionalidade BTs
        this.input.on('gameobjectover',function(pointer, gameObject) {
                gameObject.setScale(scale + 0.05);
        },this);
        this.input.on('gameobjectout',function(pointer, gameObject) {
                gameObject.setScale(scale);
        },this);


        this.credBT.on('pointerdown', () => {
            this.scene.start("Creditos");
        });

        this.voltarBT.on('pointerdown', () => {
            this.scene.start("Menu");
        });

        this.maxBT.on('pointerdown', () => {
            this.scale.startFullscreen();
            this.maxBT.visible = false;
            this.minBT.visible = true;
        });
        
        this.minBT.on('pointerdown', () => {
            this.scale.stopFullscreen();
            this.maxBT.visible = true;
            this.minBT.visible = false;
        });

    }
    update(){
        if(infoUser.user !== '' && infoUser.user !== 'prof'){
            // Case in which the user is already logged in
            // Draw score and hello message top left
            if(this.hellomessage.visible === false){
                if(!percentagem){percentagem = "0%"};
                this.hellomessage.setText("Olá " + [infoUser.firstName.split(' ')[0]] + "\n ( " + percentagem + " )");
                this.hellomessage.visible = true;
            }
        } else {
            this.hellomessage.visible = false;
        }
    }
}