//const Phaser = require("phaser");

let x;
let y;
let width;
let height;
let scale;
let dificuldade;
let tamanho;

class Menu extends Phaser.Scene{
    constructor(){
        super("Menu");
    }
    preload(){
        this.load.image("background", "sprites/background.png");
        this.load.image("boneco", "sprites/bonecofirstpage.png");
        this.load.image("Nivel 1", "sprites/bt_3por3semdivisao.png");
        this.load.image("Nivel 2", "sprites/bt_3por3todasoperacoes.png");
        this.load.image("Nivel 3", "sprites/bt_4por4-3ou4ano.png");
        this.load.image("Creditos", "sprites/bt_creditos.png");
        this.load.image("Info", "sprites/bt_info.png");
        this.load.image("Top", "sprites/bt_top.png");
        this.load.image("Maximizar", "sprites/fullscreenBT-1temp.png");
        this.load.image("Minimizar", "sprites/fullscreenBT-2temp.png");

        //temp
        this.load.image("Tamanho 3x3", "sprites/bt_3por3.png");
        this.load.image("Tamanho 4x4", "sprites/bt_4por4.png");
        this.load.image("Tamanho 5x5", "sprites/bt_5por5.png");

        //temp backbutton
        this.load.image("Voltar", "sprites/quadradinho3por3.png");
    }
    create(){
        width = game.config.width;
        height = game.config.height;
        scale = 0.9;
        dificuldade = 0;
        tamanho = 0;

        //Fundo
        this.background = this.add.sprite(width * 0.5, height * 0.5, "background");
        this.background.setScale(1.5);

        //Mascote
        this.boneco = this.add.image(width * 0.7, height * 0.6, "boneco");
        this.boneco.setScale(1.1);
        this.boneco.setInteractive({ useHandCursor: true });
        this.boneco.isSpinning = false; 

        //Botao Nivel 1
        this.nivel1BT = this.add.image(width * 0.2, height * 0.33, "Nivel 1");
        this.nivel1BT.setScale(scale);
        this.nivel1BT.setInteractive({ useHandCursor: true });

        //Botao Nivel 2
        this.nivel2BT = this.add.image(width * 0.2, height * 0.5, "Nivel 2");
        this.nivel2BT.setScale(scale);
        this.nivel2BT.setInteractive({ useHandCursor: true });

        //Botao Nivel 3
        this.nivel3BT = this.add.image(width * 0.2, height * 0.67, "Nivel 3");
        this.nivel3BT.setScale(scale);
        this.nivel3BT.setInteractive({ useHandCursor: true });

        //Botao Tamanho3x3 
        this.tam3BT = this.add.image(width * 0.2, height * 0.33, "Tamanho 3x3");
        this.tam3BT.setScale(scale);
        this.tam3BT.visible = false;
        this.tam3BT.setInteractive({ useHandCursor: true });

        //Botao Tamanho4x4 
        this.tam4BT = this.add.image(width * 0.2, height * 0.5, "Tamanho 4x4");
        this.tam4BT.setScale(scale);
        this.tam4BT.visible = false;
        this.tam4BT.setInteractive({ useHandCursor: true });

        //Botao Tamanho5x5
        this.tam5BT = this.add.image(width * 0.2, height * 0.67, "Tamanho 5x5");
        this.tam5BT.setScale(scale);
        this.tam5BT.visible = false;
        this.tam5BT.setInteractive({ useHandCursor: true });

        //Botao Top
        this.topBT = this.add.image(width * 0.24, height * 0.85, "Top");
        this.topBT.setScale(scale);
        this.topBT.setInteractive({ useHandCursor: true });

        //Botao Info
        this.infoBT = this.add.image(width * 0.16, height * 0.89, "Info");
        this.infoBT.setScale(scale);
        this.infoBT.setInteractive({ useHandCursor: true });

        //Botao Creditos
        this.credBT = this.add.image(width * 0.08, height * 0.93, "Creditos");
        this.credBT.setScale(scale);
        this.credBT.setInteractive({ useHandCursor: true });

        //Botao fullscreen (TEMP)
        this.maxBT = this.add.image(width * 0.065, height * 0.1, "Maximizar");
        this.maxBT.setScale(scale);
        this.maxBT.setInteractive({ useHandCursor: true });

        //Botao un-fullscreen (TEMP)
        this.minBT = this.add.image(width * 0.065, height * 0.1, "Minimizar");
        this.minBT.visible = false;
        this.minBT.setScale(scale);
        this.minBT.setInteractive({ useHandCursor: true });

        //Botao voltar (TEMP)
        this.voltarBT = this.add.image(width * 0.32, height * 0.81, "Voltar");
        this.voltarBT.visible = false;
        this.voltarBT.setScale(0.63);
        this.voltarBT.setInteractive({ useHandCursor: true });

        //Funcionalidade BTs
        this.input.on('gameobjectover',function(pointer, gameObject) {
            if ( gameObject != this.boneco ){
                gameObject.displayHeight += 5;
                gameObject.displayWidth += 5;
            }
        },this);
        this.input.on('gameobjectout',function(pointer, gameObject) {
            if ( gameObject != this.boneco ){
                gameObject.displayHeight -= 5;
                gameObject.displayWidth -= 5;
            }
        },this);

        this.input.on('gameobjectdown', function(pointer, gameObject) {
            switch(gameObject) {
                case this.nivel1BT:
                    this.nivel1BT.visible = false;
                    this.nivel2BT.visible = false;
                    this.nivel3BT.visible = false;
                    this.tam3BT.visible = true;
                    this.tam4BT.visible = true;
                    this.tam5BT.visible = true;
                    this.voltarBT.visible = true;
                    dificuldade = 1;

                    break;
                case this.nivel2BT:
                    this.nivel1BT.visible = false;
                    this.nivel2BT.visible = false;
                    this.nivel3BT.visible = false;
                    this.tam3BT.visible = true;
                    this.tam4BT.visible = true;
                    this.tam5BT.visible = true;
                    this.voltarBT.visible = true;

                    dificuldade = 2;

                    break;
                case this.nivel3BT:
                    this.nivel1BT.visible = false;
                    this.nivel2BT.visible = false;
                    this.nivel3BT.visible = false;
                    this.tam3BT.visible = true;
                    this.tam4BT.visible = true;
                    this.tam5BT.visible = true;
                    this.voltarBT.visible = true;

                    dificuldade = 3;

                    break;
                case this.voltarBT:
                    //Back button logic (TEMP)
                    this.nivel1BT.visible = true;
                    this.nivel2BT.visible = true;
                    this.nivel3BT.visible = true;
                    this.tam3BT.visible = false;
                    this.tam4BT.visible = false;
                    this.tam5BT.visible = false;
                    this.voltarBT.visible = false;
                    
                    dificuldade = 0;
                    
                    break;
                case this.topBT:
                    break;
                case this.infoBT:
                    break;
                case this.credBT:
                    break;
                case this.boneco:
                    if ( ! this.boneco.isSpinning ){
                        this.boneco.isSpinning = true
                        this.tweens.add({
                            targets: this.boneco,
                            angle: '+=360', 
                            duration: 1500, 
                            ease: 'Cubic.easeOut', 
                            onComplete: () => {
                                this.boneco.isSpinning = false; 
                            }
                        });
                    }
                    break;
                case this.maxBT:
                    this.scale.startFullscreen();
                    this.maxBT.visible = false;
                    this.minBT.visible = true;
                    break;
                case this.minBT:
                    this.scale.stopFullscreen();
                    this.maxBT.visible = true;
                    this.minBT.visible = false;
                    break;
            }
        },this);
    }
    update(){

    }
}