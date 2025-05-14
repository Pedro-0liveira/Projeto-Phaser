//const Phaser = require("phaser");

let x;
let y;
let width;
let height;
let scale;
let difficulty;
let size;
let BTlock;

var globalFreq = 0;
var globalTotal = 0;
var globalScore = 0;
globalProblems = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

var percentagem = 0;
var callOnce = 0;

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
        this.load.image("Maximizar", "sprites/fullscreen-bt-1.png");
        this.load.image("Minimizar", "sprites/fullscreen-bt-2.png");
        this.load.image("Login", "sprites/login-bt.png");
        this.load.image("Logout", "sprites/logout-bt.png")
        this.load.image("Tamanho 3x3", "sprites/bt_3por3.png");
        this.load.image("Tamanho 4x4", "sprites/bt_4por4.png");
        this.load.image("Tamanho 5x5", "sprites/bt_5por5.png");
        this.load.image("Voltar", "sprites/back-bt.png");
        this.load.image("Fechar", "sprites/bt_fechar.png")
        this.load.image("Menu Login", "sprites/login.png")
        this.load.image("Confirmar", "sprites/verifica.png");
        this.load.image("Ok", "sprites/btok.png");
    }
    create(){
        width = game.config.width;
        height = game.config.height;
        scale = 0.9;
        difficulty = 0;
        size = 0;
        BTlock = false;

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

        //Botao Info
        this.infoBT = this.add.image(width * 0.16, height * 0.89, "Info");
        this.infoBT.setScale(scale);
        this.infoBT.setInteractive({ useHandCursor: true });

        //Botao Creditos
        this.credBT = this.add.image(width * 0.08, height * 0.93, "Creditos");
        this.credBT.setScale(scale);
        this.credBT.setInteractive({ useHandCursor: true });

        //Botao fullscreen
        this.maxBT = this.add.image(width * 0.065, height * 0.1, "Maximizar");
        this.maxBT.setScale(scale);
        this.maxBT.setInteractive({ useHandCursor: true });
        
        //Botao un-fullscreen
        this.minBT = this.add.image(width * 0.065, height * 0.1, "Minimizar");
        this.minBT.visible = false;
        this.minBT.setScale(scale);
        this.minBT.setInteractive({ useHandCursor: true });
        
        //Botao voltar 
        this.voltarBT = this.add.image(width  * 0.24, height * 0.85, "Voltar");
        this.voltarBT.visible = false;
        this.voltarBT.setScale(scale);
        this.voltarBT.setInteractive({ useHandCursor: true });
        
        //Botao Login
        this.loginBT = this.add.image(width * 0.42, height * 0.93, "Login");
        this.loginBT.setScale(scale);
        this.loginBT.setInteractive({ useHandCursor: true });
        //Botao Logout
        this.logoutBT = this.add.image(width * 0.42, height * 0.93, "Logout");
        this.logoutBT.setScale(scale);
        this.logoutBT.setInteractive({ useHandCursor: true });

        //Verificar qual botao apresentar (Se o user ja esta loggedin)
        if (infoUser.user === ''){
            this.loginBT.visible = true;
            this.logoutBT.visible = false;
        } else {
            this.loginBT.visible = false;
            this.logoutBT.visible = true;
        }

        this.hellomessage = this.add.text(0.19 * game.config.width, 0.06 * game.config.height, "Olá "+ infoUser.firstName.split(" ")[0],{ fontFamily: 'font1',fontSize: 45,color: '#ffffff',align: 'center'});
        this.hellomessage.visible = false;

        //Menu Login
        this.qdlogin = this.add.sprite(0.5 * game.config.width, 0.50 * game.config.height, "Menu Login");
        this.qdlogin.setScale(scale*1.5);
        this.qdlogin.visible = false;
        //Botao fechar/voltar (login)
        this.fecharBTlog = this.add.image(width * 0.67, height * 0.3, "Fechar");
        this.fecharBTlog.visible = false;
        this.fecharBTlog.setScale(scale);
        this.fecharBTlog.setInteractive({ useHandCursor: true });
        this.loginBTpressed = false;

        //Botao Ok (login)
        this.OkBTlog = this.add.image(width * 0.61, height * 0.74, "Ok");
        this.OkBTlog.visible = false;
        this.OkBTlog.setScale(scale);
        this.OkBTlog.setInteractive({ useHandCursor: true });

        let user = `
        <input type="text" name="username" style="font-size: 50px;font-family:'font1';text-align:center;">`;
        let pass = `
        <input type="password" name="password" style="font-size:50px;font-family:'font1';text-align:center;">`;      
              
        //Caixas de texto
        this.userbox = this.add.dom(0.521 * game.config.width, 0.437 * game.config.height).createFromHTML(user);
        this.userbox.setScale(0.64);
        this.userbox.visible = false;
        this.passbox = this.add.dom(0.518 * game.config.width, 0.575 * game.config.height).createFromHTML(pass);
        this.passbox.setScale(0.64);
        this.passbox.visible = false;
        
        this.loginErrorMsg = this.add.text(0.4 * game.config.width, 0.635 * game.config.height,"Utilizador ou Password Errados",{ fontFamily: 'font1',fontSize: 30,color: '#ff0000',align: 'center'});
        this.loginErrorMsg.visible = false;

        const nonloginbuttons = [this.boneco, this.nivel1BT, this.nivel2BT, this.nivel3BT, this.tam3BT, this.tam4BT,
            this.tam5BT, this.infoBT, this.credBT, this.maxBT, this.minBT, this.voltarBT];
        const loginbuttons =    [this.OkBTlog, this.fecharBTlog];

        //Funcionalidade BTs
        this.input.on('gameobjectover',function(pointer, gameObject) {
            if ( loginbuttons.includes(gameObject) || ( gameObject != this.boneco && !this.loginBTpressed)){
                gameObject.setScale(scale + 0.05);
            }
        },this);
        this.input.on('gameobjectout',function(pointer, gameObject) {
            if ( loginbuttons.includes(gameObject) || ( gameObject != this.boneco && !this.loginBTpressed)){
                gameObject.setScale(scale);
            }
        },this);

        const resetscale = (btn) => {
            btn.setScale(scale);
        }

        const fadeIn = (btn) => {
            btn.setAlpha(0).setVisible(true);
            this.tweens.add({ targets: btn, alpha: 1, duration: 200, onComplete: () => { BTlock = false; } });
        };

        const fadeOut = (btn, callback) => {
            this.tweens.add({ targets: btn, alpha: 0, duration: 300, onComplete: () => { btn.setVisible(false); if (callback) callback(); } });
        };

        const grayIn = (btn) => {
            btn.setTint(0x808080).setAlpha(0.5);
        };

        const grayOut = (btn) => {
            btn.clearTint().setAlpha(1);
        };

        const disableInteract = (btns) => {
            btns.forEach(button => {
                button.disableInteractive();
            });
        };
        const enableInteract = (btns) => {
            btns.forEach(button => {
                button.setInteractive({ useHandCursor: true });
            });
        };

        this.input.on('gameobjectdown', function(pointer, gameObject) {
            switch(gameObject){
                case this.nivel1BT:
                case this.nivel2BT:
                case this.nivel3BT:
                    if(!BTlock){
                        BTlock = true;
                        fadeOut(this.nivel1BT);
                        fadeOut(this.nivel2BT);
                        fadeOut(this.nivel3BT, () => {
                            fadeIn(this.tam3BT);
                            fadeIn(this.tam4BT);
                            fadeIn(this.tam5BT);
                            fadeIn(this.voltarBT);
                        });
                        difficulty = gameObject === this.nivel1BT ? 1 : gameObject === this.nivel2BT ? 2 : 3;
                    }
                    break;
                case this.voltarBT:
                    if(!BTlock){
                        BTlock = true;
                        fadeOut(this.tam3BT);
                        fadeOut(this.tam4BT);
                        fadeOut(this.tam5BT);
                        fadeOut(this.voltarBT, () => {
                            fadeIn(this.nivel1BT);
                            fadeIn(this.nivel2BT);
                            fadeIn(this.nivel3BT);
                        });
                        difficulty = 0;
                        size = 0;
                    }
                    break;
                case this.tam3BT:
                    size = 3;
                    this.scene.start("Game", { difficulty: difficulty, size: size });
                    break;
                case this.tam4BT:
                    size = 4;
                    this.scene.start("Game", { difficulty: difficulty, size: size });
                    break;
                case this.tam5BT:
                    size = 5;
                    this.scene.start("Game", { difficulty: difficulty, size: size });
                    break;
                case this.infoBT:
                    this.scene.start("Info");
                    break;
                case this.credBT:
                    this.scene.start("Creditos");
                    break;
                case this.boneco:
                    if ( ! this.boneco.isSpinning ){
                        this.boneco.isSpinning = true;
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
                case this.loginBT:
                    //Abri menu
                    if(!this.loginBTpressed){
                        this.loginBTpressed = !this.loginBTpressed;
                        fadeIn(this.qdlogin);
                        fadeIn(this.fecharBTlog);
                        fadeIn(this.OkBTlog);
                        this.userbox.visible = true;
                        this.passbox.visible = true;
                        grayIn(this.loginBT);
                        resetscale(this.loginBT);        
                        disableInteract(nonloginbuttons);
                        // Logic to show the login text boxes
                        this.userbox.setVisible = true;
                        this.passbox.setVisible = true;

                    }
                    break;
                case this.fecharBTlog:
                    if(this.qdlogin.visible == true){
                        this.loginBTpressed = !this.loginBTpressed;
                        fadeOut(this.qdlogin);
                        fadeOut(this.fecharBTlog);
                        fadeOut(this.OkBTlog);
                        this.userbox.visible = false;
                        this.passbox.visible = false;
                        grayOut(this.loginBT);
                        resetscale(this.fecharBTlog);
                        resetscale(this.loginBT);
                        enableInteract(nonloginbuttons);
                        this.userbox.setVisible = false;
                        this.passbox.setVisible = false;
                        this.loginErrorMsg.visible = false;
                    }
                    break;
                case this.OkBTlog:
                    //if (verificar que tem alguma coisa nas caixas)
                    let user = this.userbox.getChildByName("username").value;
                    let password = this.passbox.getChildByName("password").value;

                    if (user != '' && password != '') {
                        login(user, password,this);
                        this.userbox.getChildByName("username").value = '';
                        this.passbox.getChildByName("password").value = '';
                    } else if (user === '' && password === '') {
                        // Apenas para acelerar o login para testes >>>> REMOVER DEPOIS
                        login("hypmat5a01", "formacao",this);
                    }
                    // tentar o login e armazenar valor e informaçoes da conta
                    if (infoUser.user !== ''){
                        this.loginErrorMsg.visible = true;
                    }else{
                        this.loginBTpressed = !this.loginBTpressed;
                        fadeOut(this.qdlogin);
                        fadeOut(this.fecharBTlog);
                        fadeOut(this.OkBTlog);
                        this.userbox.visible = false;
                        this.passbox.visible = false;
                        grayOut(this.loginBT);
                        resetscale(this.fecharBTlog);
                        resetscale(this.loginBT);
                        enableInteract(nonloginbuttons);
                        this.userbox.setVisible = false;
                        this.passbox.setVisible = false;
                        this.loginErrorMsg.visible = false;
                        this.logoutBT.visible = true;
                        this.loginBT.visible = false;
                    }
                    break;
                case this.logoutBT:
                    //limpar informaçao do user
                    this.logoutBT.visible = false;
                    this.loginBT.visible = true;
                    infoUser.logout();
                    break;
            }
        },this);
    }
    update(){
        if(infoUser.user !== '' && infoUser.user !== 'prof'){
            // Case in which the user is already logged in
            // Draw score and hello message top left
            if(this.hellomessage.visible === false || true){
                if(!percentagem){percentagem = "0%"};
                this.hellomessage.setText("Olá " + [infoUser.firstName.split(' ')[0]] + "\n ( " + percentagem + " )");
                this.hellomessage.visible = true;
            }
            console.log("setting true");
        } else {
            console.log("setting false");
            this.hellomessage.visible = false;
        }

        if (callOnce == 0) {
            console.log(percentagem ,"before");
            sessionVerify();
            console.log(percentagem ,"after");
            callOnce = 1000;
        }
    }
}