let x;
let y;
//Variáveis a ser usadas para adicionar os sprites
let width ;
let height;
let di = x+"-09-01";
let df = y + "-08-31";
//Login
let nome = "";
let nome2 = "";
let callOnce = 0;
var please = "";

class Menu extends Phaser.Scene {

    constructor() {
        super('Menu');
    }

    preload() {
        //Preload das imagens do menu
        this.load.image('background','assets/backgroundSQ.png');
        this.load.image('titulo','assets/titulo.png');
        this.load.image('backback','assets/backback.png');
        this.load.image('playBT','assets/playBT.png');
        this.load.image('loginBT','assets/novoLogin.png');
        this.load.image('topBT','assets/topBT.png');
        this.load.image('infoBT','assets/infoBT.png');
        this.load.image('creditosBT','assets/creditosBT.png');
        this.load.image('fullscreenBT-1','assets/fullscreenBT-1.png');
        this.load.image('fullscreenBT-2','assets/fullscreenBT-2.png');
        this.load.image('loginPanel','assets/login.png');
        this.load.image('creditosPanel','assets/creditos.png');
        this.load.image('certoBT','assets/certoBT.png');
        this.load.image('fecharBT','assets/fecharBT.png');
        this.load.image('infoPanel','assets/info.png');
        this.load.image('logoutBT', 'assets/novoLogout.png');
    }

    create() {
        //Variáveis a ser usadas para adicionar os sprites
        width = game.config.width;
        height = game.config.height;

        //Background
        this.background = this.add.sprite(0.5 * width, 0.5 * height,'background');     
        this.background.setScale(1.5);
        
        //BackBack
        this.backback = this.add.sprite(0.50 * width, 0.58 * height,'backback');     
        this.backback.setScale(1.57);
        
        //Titulo
        this.titulo = this.add.sprite(0.5 * width,0.13 * height,'titulo');
        this.titulo.setScale(1.3);
        
        //PlayBT
        this.playBT = this.add.sprite(0.5 * width, 0.56 * height,'playBT');     
        this.playBT.setScale(1.2);
        this.playBT.setInteractive({ useHandCursor: true });

        //FullscreenBT1
        this.fullscreenBT1 = this.add.sprite(0.065 * width,0.1 * height,'fullscreenBT-1');
        this.fullscreenBT1.setScale(0.9);
        this.fullscreenBT1.setInteractive({ useHandCursor: true });

        //FullscreenBT2
        this.fullscreenBT2 = this.add.sprite(0.065 * width,0.1 * height,'fullscreenBT-2');
        this.fullscreenBT2.visible = false;
        this.fullscreenBT2.setScale(0.9);
        this.fullscreenBT2.setInteractive({ useHandCursor: true });

        //LoginBT
        this.loginBT = this.add.sprite(0.94 * width,0.314 * height,'loginBT');
        this.loginBT.setScale(1);
        this.loginBT.setInteractive({ useHandCursor: true });

        //LogoutBT
        this.logoutBT = this.add.sprite(0.94 * width,0.314 * height,'logoutBT');
        this.logoutBT.setScale(1);
        this.logoutBT.setInteractive({ useHandCursor: true });
        this.logoutBT.visible = false;
        
        //TopBT
        this.topBT = this.add.sprite(0.94 * width,0.46 * height,'topBT');
        this.topBT.setScale(1);
        this.topBT.setInteractive({ useHandCursor: true });

        //InfoBT
        this.infoBT = this.add.sprite(0.94 * width,0.61 * height,'infoBT');
        this.infoBT.setScale(1);
        this.infoBT.setInteractive({ useHandCursor: true });

        //CreditosBT
        this.creditosBT = this.add.sprite(0.94 * width,0.76 * height,'creditosBT');
        this.creditosBT.setScale(1.35);
        this.creditosBT.setInteractive({ useHandCursor: true });

        //olaMSG
        this.ola = this.add.text(0.38 * game.config.width ,0.25 * game.config.height,"Olá " + nome2,{ fontFamily: 'font1',fontSize: 80,color: '#0D870F',align: 'center'});
        this.ola.visible = false;
        
        //LoginPanel
        this.loginPanel = this.add.sprite(0.5*width,0.57*height,'loginPanel');
        this.loginPanel.setScale(1.49);
        this.loginPanel.visible = false;

        //CreditosPanel
        this.creditosPanel = this.add.sprite(0.5*width,0.57*height,'creditosPanel');
        this.creditosPanel.setScale(1.49);
        this.creditosPanel.visible = false;

        //InfoPanel
        this.infoPanel = this.add.sprite(0.5 * width, 0.57 * height, 'infoPanel');
        this.infoPanel.setScale(1.49);
        this.infoPanel.visible = false;

        //fecharBT
        this.fecharBT = this.add.sprite(0.6 * width,0.8 * height,'fecharBT');
        this.fecharBT.setScale(1.071);
        this.fecharBT.setInteractive({ useHandCursor: true });
        this.fecharBT.visible = false;

        //certoBT
        this.certoBT = this.add.sprite(0.5 * width,0.8 * height,'certoBT');
        this.certoBT.setScale(1.071);
        this.certoBT.setInteractive({ useHandCursor: true });
        this.certoBT.visible = false;

        //certoLoginBT
        this.certoLoginBT = this.add.sprite(0.5 * width,0.8 * height,'certoBT');
        this.certoLoginBT.setInteractive({ useHandCursor: true });
        this.certoLoginBT.visible = false;

        //fecharLoginBT
        this.fecharLoginBT = this.add.sprite(0.6 * width,0.8 * height,'fecharBT');
        this.fecharLoginBT.setScale(1.071);
        this.fecharLoginBT.setInteractive({ useHandCursor: true });
        this.fecharLoginBT.visible = false;

        //loginErrorMsg
        this.loginErrorMsg = this.add.text(0.38 * game.config.width, 0.316 * game.config.height,"Utilizador ou Password Errados",{ fontFamily: 'font1',fontSize: 35,color: '#B40404',align: 'center'});
        this.loginErrorMsg.visible = false;

        //loginErrorMsg2
        this.loginErrorMsg2 = this.add.text(0.38 * game.config.width, 0.316 * game.config.height,"Está registado como professor!",{ fontFamily: 'font1',fontSize: 35,color: '#B40404',align: 'center'});
        this.loginErrorMsg2.visible = false;


        let user = `<input type="text" name="username" style="font-size: 15px;font-family:'Arial';text-align:center;">`;
        let pass = `<input type="password" name="password" style="font-size: 15px;font-family:'Arial';text-align:center;">`;    

        x = this.add.dom(0.5319 * game.config.width, 0.447 * game.config.height).createFromHTML(user);
        x.setScale(2.8);
        x.visible = false;

        y = this.add.dom(0.5319 * game.config.width, 0.6 * game.config.height).createFromHTML(pass);
        y.setScale(2.8);
        y.visible = false;

        //BT Logic
        //BT Highlight
        this.input.on('gameobjectover',function(pointer, gameObject) {
            gameObject.displayHeight += 5;
            gameObject.displayWidth += 5;
        },this);
        this.input.on('gameobjectout',function(pointer, gameObject) {
            gameObject.displayHeight -= 5;
            gameObject.displayWidth -= 5;
        },this);

        this.input.on('gameobjectdown', function(pointer, gameObject) {
            switch(gameObject) {
                case this.playBT:
                    this.scene.transition({ target: 'Jogo', duration: 100 });
                    break;
                case this.fullscreenBT1:
                    this.scale.startFullscreen();
                    this.fullscreenBT1.visible = false;
                    this.fullscreenBT2.visible = true;
                    break;
                case this.fullscreenBT2:
                    this.scale.stopFullscreen();
                    this.fullscreenBT2.visible = false;
                    this.fullscreenBT1.visible = true;
                    break;
                case this.topBT:
                    getTOP(di, df, "", "", this);
                    flag = true;
                    break;
                case this.loginBT:
                    this.playBT.visible = false;
                    this.topBT.visible = true;
                    this.infoBT.visible = true;
                    this.creditosBT.visible = true;
                    this.loginPanel.visible = true;
                    this.creditosPanel.visible = false;
                    this.infoPanel.visible = false;
                    this.titulo.visible = true;
                    this.fecharBT.visible = false;
                    this.fecharLoginBT.visible = true;
                    this.fecharLoginBT.setScale(1);
                    this.fecharLoginBT.x = 0.445* width;
                    this.fecharLoginBT.y = 0.733 * height;
                    this.certoLoginBT.visible = true;
                    this.certoLoginBT.setScale(1);
                    this.certoLoginBT.x = 0.565 * width;
                    this.certoLoginBT.y = 0.733 * height;
                    this.loginErrorMsg.visible = false;
                    this.loginErrorMsg2.visible = false;
                    x.visible = true;
                    y.visible = true;

                    this.certoLoginBT.on('pointerup', function () {
                        let user = x.getChildByName("username").value
                        let password = y.getChildByName("password").value
                        if (user != '' && password != '') {
                            let r = login(user, password,this);
                            x.getChildByName("username").value = '';
                            y.getChildByName("password").value = '';
                        }
                    }, this);
                    break;
                case this.infoBT:
                    this.playBT.visible = false;
                    this.certoLoginBT.visible = false;
                    this.topBT.visible = true;
                    this.infoBT.visible = true;
                    this.loginBT.visible = true;
                    this.creditosPanel.visible = false;
                    this.loginPanel.visible = false;
                    this.infoPanel.visible = true;
                    this.titulo.visible = true;
                    this.fecharLoginBT.visible = false;
                    this.fecharBT.visible = true;
                    this.fecharBT.setScale(1);
                    this.fecharBT.x = 0.685 * width;
                    this.fecharBT.y = 0.33 * height;
                    this.loginErrorMsg.visible = false;
                    this.loginErrorMsg2.visible = false;
                    x.visible = false;
                    y.visible = false;
                    break;
                case this.creditosBT:
                    this.playBT.visible = false;
                    this.topBT.visible = true;
                    this.infoBT.visible = true;
                    this.loginBT.visible = true;
                    this.loginPanel.visible = false;
                    this.infoPanel.visible = false;
                    this.creditosPanel.visible = true;
                    this.titulo.visible = true;
                    this.fecharBT.visible = true;
                    this.fecharBT.setScale(1);
                    this.fecharBT.x = 0.685 * width;
                    this.fecharBT.y = 0.33 * height;
                    this.certoLoginBT.visible = false;
                    this.fecharLoginBT.visible = false;
                    this.loginErrorMsg.visible = false;
                    this.loginErrorMsg2.visible = false;
                    x.visible = false;
                    y.visible = false;
                    break;
                case this.fecharBT: case this.fecharLoginBT:
                    this.fecharBT.visible = false;
                    this.certoBT.visible = false;
                    this.creditosPanel.visible = false;
                    this.loginPanel.visible = false;
                    this.certoLoginBT.visible = false;
                    this.infoPanel.visible = false;
                    this.playBT.visible = true;
                    this.topBT.visible = true;
                    this.infoBT.visible = true;
                    this.loginBT.visible = true;
                    this.titulo.visible = true;
                    this.creditosBT.visible = true;
                    this.loginErrorMsg.visible = false;
                    this.loginErrorMsg2.visible = false;
                    x.visible = false;
                    y.visible = false;
                    this.loginErrorMsg.visible = false;
                    this.fecharLoginBT.visible = false;
                    break;
                case this.logoutBT: 
                    this.logoutBT.visible = false; 
                    this.loginBT.visible = true; 
                    this.ola.visible = false;
                    infoUser.logout();
                    break;
                default:
                    break;
            }    
            
        },this);
    }
    update() {
        if (callOnce == 0) {
            sessionVerify();
            callOnce = 1000;
        }
        width = game.config.width;
        height = game.config.height;

        if(infoUser.user!='' && infoUser.user != 'prof') {
            nome = infoUser.firstName.split(" ");
            nome2 = nome[0];
            this.ola.setText(['Olá ' + nome2]);
            this.ola.visible = true;
            this.logoutBT.visible = true;
            this.loginBT.visible = false;
            this.certoLoginBT.visible = false;
            this.loginErrorMsg.visible = false;
            x.visible = false;
            y.visible = false;
            this.fecharLoginBT.visible = false;
            this.loginPanel.visible = false;
            this.playBT.visible = true;
        }
        if(this.scale.isFullscreen){
            this.fullscreenBT1.visible = false;
            this.fullscreenBT2.visible = true;
        }
        else{
            this.fullscreenBT1.visible = true;
            this.fullscreenBT2.visible = false;
        }
    }
}
