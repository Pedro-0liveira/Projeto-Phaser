// Variáveis globais para o nivel 
let emptyBTText = '';
let levelText = '';
let levelText0 = '';
let levelString0 = '';
let level = 1;
let levelTitle;
let subLevel = 0;
let solution = 0;
let answer = 0;
let vale = 0;
let lastrndnumber = 0;
// Variáveis globais para o timer
let timer = 0;    
let time;
let timedEvent;
// Variáveis globais para o score
let score = 0;
let scoreText;
let stringcerta = '';
let stringcerta0 = '';

class Jogo extends Phaser.Scene {

    constructor() {
        super('Jogo');
    }

    // Preload dos assets
    preload() {
        this.load.image('background', 'assets/backgroundSQ.png');
        this.load.image('titulo', 'assets/titulo.png');
        this.load.image('menuBT', 'assets/retmenuBT.png');
        this.load.image('numero0BT', 'assets/numero0.png');
        this.load.image('numero1BT', 'assets/numero1.png');
        this.load.image('numero2BT', 'assets/numero2.png');
        this.load.image('numero3BT', 'assets/numero3.png');
        this.load.image('numero4BT', 'assets/numero4.png');
        this.load.image('numero5BT', 'assets/numero5.png');
        this.load.image('numero6BT', 'assets/numero6.png');
        this.load.image('numero7BT', 'assets/numero7.png');
        this.load.image('numero8BT', 'assets/numero8.png');
        this.load.image('numero9BT', 'assets/numero9.png');
        this.load.image('borrachaBT', 'assets/borracha.png');
        this.load.image('barra', 'assets/barraSeq.png');
        this.load.image('emptyBT', 'assets/empty.png');
        this.load.image('relogio', 'assets/relogioN.png');
        this.load.image('pontos', 'assets/pontosN.png');
        this.load.image('certoBT','assets/certoBT.png');
        this.load.image('certo','assets/certoBT.png');
        this.load.image('fecharBT','assets/fecharBT.png');
        this.load.image('errado','assets/fecharBT.png');
        this.load.image('youAreSurePanel','assets/tensacerteza.png');
        this.load.image('nextBT','assets/nextBT.png');
        this.load.image('verificaBT','assets/nextBT.png');
        this.load.image('parabensBT','assets/parabens.png');
        this.load.image('perdesteBT','assets/perdeste.png');
    }

    create() {
        // Variáveis a ser usadas para adicionar os sprites
        let width = game.config.width;
        let height = game.config.height;

        // Background
        this.background = this.add.sprite(0.5 * width, 0.5 * height, 'background');
        this.background.setScale(1.5);

        // Titulo
        this.titulo = this.add.sprite(0.5 * width, 0.13 * height, 'titulo');
        this.titulo.setScale(1.3);

        // MenuBT
        this.menuBT = this.add.sprite(0.065 * width,0.1 * height, 'menuBT');
        this.menuBT.setScale(0.9);
        this.menuBT.setInteractive({ useHandCursor: true });

        //numero0
        this.numero0BT = this.add.sprite(0.055 * width, 0.87 * height, 'numero0BT');
        this.numero0BT.setScale(1.1);
        this.numero0BT.setInteractive({ useHandCursor: true });

        //numero1
        this.numero1BT = this.add.sprite(0.144 * width, 0.87 * height, 'numero1BT');
        this.numero1BT.setScale(1.1);
        this.numero1BT.setInteractive({ useHandCursor: true });

        //numero2
        this.numero2BT = this.add.sprite(0.233 * width, 0.87 * height, 'numero2BT');
        this.numero2BT.setScale(1.1);
        this.numero2BT.setInteractive({ useHandCursor: true });

        //numero3
        this.numero3BT = this.add.sprite(0.322 * width, 0.87 * height, 'numero3BT');
        this.numero3BT.setScale(1.1);
        this.numero3BT.setInteractive({ useHandCursor: true });

        //numero4
        this.numero4BT = this.add.sprite(0.411 * width, 0.87 * height, 'numero4BT');
        this.numero4BT.setScale(1.1);
        this.numero4BT.setInteractive({ useHandCursor: true });

        //numero5
        this.numero5BT = this.add.sprite(0.5 * width, 0.87 * height, 'numero5BT');
        this.numero5BT.setScale(1.1);
        this.numero5BT.setInteractive({ useHandCursor: true });

        //numero6
        this.numero6BT = this.add.sprite(0.588 * width, 0.87 * height, 'numero6BT');
        this.numero6BT.setScale(1.1);
        this.numero6BT.setInteractive({ useHandCursor: true });

        //numero7
        this.numero7BT = this.add.sprite(0.677 * width, 0.87 * height, 'numero7BT');
        this.numero7BT.setScale(1.1);
        this.numero7BT.setInteractive({ useHandCursor: true });

        //numero8
        this.numero8BT = this.add.sprite(0.766 * width, 0.87 * height, 'numero8BT');
        this.numero8BT.setScale(1.1);
        this.numero8BT.setInteractive({ useHandCursor: true });

        //numero9
        this.numero9BT = this.add.sprite(0.855 * width, 0.87 * height, 'numero9BT');
        this.numero9BT.setScale(1.1);
        this.numero9BT.setInteractive({ useHandCursor: true });

        //borracha
        this.borrachaBT = this.add.sprite(0.944 * width, 0.87 * height, 'borrachaBT');
        this.borrachaBT.setScale(1.1);
        this.borrachaBT.setInteractive({ useHandCursor: true });

        //barra
        this.barra = this.add.sprite(0.4967 * width, 0.416 * height, 'barra');
        this.barra.setScale(1.8);

        //emptyBT
        this.emptyBT = this.add.sprite(0.497 * width, 0.628 * height, 'emptyBT');
        this.emptyBT.setScale(1.4);

        //EmptyBT text
        this.emptyBTText = this.add.text(0.497 * width, 0.63 * height,'',{font: "bold 90px Baguet Script", fill: "#d6a443", align: "center" }).setOrigin(0.5, 0.5);

        //textoFinal text
        this.textoFinal = this.add.text(0.497 * width, 0.9250 * height,'',{font: "bold 36px Baguet Script", fill: "#993F0C", align: "center" }).setOrigin(0.5, 0.5);

        //Level Text
        this.levelText = this.add.text(0.4967 * width, 0.416 * height,'',{font: "56px consolas", fill: "#ffffff", align: "center" }).setOrigin(0.5, 0.5);        

        //Level Text0
        this.levelText0 = this.add.text(0.4967 * width, 0.416 * height,'',{font: "56px consolas", fill: "#ffff00", align: "center" }).setOrigin(0.5, 0.5);        

        
        //relogio
        this.relogio = this.add.sprite(0.9181 * width, 0.3583 * height, 'relogio');
        this.relogio.setScale(0.836);

        //pontos
        this.pontos = this.add.sprite(0.9181 * width, 0.5676 * height, 'pontos');
        this.pontos.setScale(0.836);

        //olaMSG
        this.ola = this.add.text(0.64 * game.config.width ,0.28 * game.config.height,"Olá " + nome2,{font: "bold 50px Baguet Script", fill: "#0D870F", align : 'right'});
        this.ola.visible = false;
        
        //errado
        this.errado = this.add.sprite(0.537 * width,0.555 * height,'errado');
        this.errado.setScale(0.7);
        this.errado.visible = false;

        //certo
        this.certo = this.add.sprite(0.537 * width,0.555 * height,'certo');
        this.certo.setScale(0.7);
        this.certo.visible = false;

        //nextBT
        this.nextBT = this.add.sprite(0.63 * width, 0.63 * height, 'nextBT');
        this.nextBT.setScale(1.15);
        this.nextBT.setInteractive({ useHandCursor: true });
        this.nextBT.visible = false;

        //verificaBT
        this.verificaBT = this.add.sprite(0.36 * width, 0.63 * height, 'nextBT');
        this.verificaBT.setScale(1.15);
        this.verificaBT.setInteractive({ useHandCursor: true });
        this.verificaBT.visible = true;

        //Nivel
        this.levelTitle = this.add.text(0.21* width, 0.28 * height,'', {font: "bold 50px Baguet Script", fill: "#0D870F"});

        //Painel de certeza
        this.youAreSurePanel = this.add.sprite(0.5 * width, 0.54 * height, 'youAreSurePanel');
        this.youAreSurePanel.setScale(1.49);
        this.youAreSurePanel.visible = false;

        //certoBT
        this.certoBT = this.add.sprite(0.58 * width,0.6 * height,'certoBT');
        this.certoBT.setInteractive({ useHandCursor: true });
        this.certoBT.setScale(1.2);
        this.certoBT.visible = false;

        //fecharBT
        this.fecharBT = this.add.sprite(0.43 * width,0.6 * height,'fecharBT');
        this.fecharBT.setInteractive({ useHandCursor: true });
        this.fecharBT.setScale(1.2);
        this.fecharBT.visible = false;

        //perdesteBT
        this.perdesteBT = this.add.sprite(0.5 * width,0.57 * height,'perdesteBT');
        this.perdesteBT.setInteractive({ useHandCursor: true });
        this.perdesteBT.setScale(1.49);
        this.perdesteBT.visible = false;

        //parabensBT
        this.parabensBT = this.add.sprite(0.5 * width,0.57 * height,'parabensBT');
        this.parabensBT.setInteractive({ useHandCursor: true });
        this.parabensBT.setScale(1.49);
        this.parabensBT.visible = false;

        //BT Logic
        //BT Highlight
        this.input.on('gameobjectover', function (pointer, gameObject) {
            gameObject.displayHeight += 5;
            gameObject.displayWidth += 5;
        }, this);
        this.input.on('gameobjectout', function (pointer, gameObject) {
            gameObject.displayHeight -= 5;
            gameObject.displayWidth -= 5;
        }, this);

        this.input.on('gameobjectdown', function (pointer, gameObject) {
            switch (gameObject) {
                case this.menuBT:
                    this.youAreSurePanel.visible = true;
                    this.certo.visible = false;
                    this.errado.visible = false;
                    this.nextBT.visible = false;
                    this.fecharBT.visible = true;
                    this.fecharBT.setScale(1.2);
                    this.fecharBT.x = 0.435* width;
                    this.fecharBT.y = 0.66 * height;
                    this.certoBT.visible = true;
                    this.certoBT.setScale(1.2);
                    this.certoBT.x = 0.565 * width;
                    this.certoBT.y = 0.66 * height;
                    break;
                case this.fecharBT:
                    this.youAreSurePanel.visible = false;
                    this.fecharBT.visible = false;
                    this.certoBT.visible = false;
                    if(answer == 1) {
                        this.certo.visible = true;
                        this.nextBT.visible = true;
                    }
                    if(answer == -1) {
                        this.errado.visible = true;
                    }
                    break;    
                case this.certoBT:
                    reset();
                    this.scene.start('Menu');
                    break;
                case this.numero0BT:
                    changeEmptyText('0');
                    this.errado.visible = false;
                    answer = 0;
                    break;
                case this.numero1BT:
                    changeEmptyText('1');
                    this.errado.visible = false;
                    answer = 0;
                    break;
                case this.numero2BT:
                    changeEmptyText('2');
                    this.errado.visible = false;
                    answer = 0;
                    break;
                case this.numero3BT:
                    changeEmptyText('3');
                    this.errado.visible = false;
                    answer = 0;
                    break;
                case this.numero4BT:
                    changeEmptyText('4');
                    this.errado.visible = false;
                    answer = 0;
                    break;
                case this.numero5BT:
                    changeEmptyText('5');
                    this.errado.visible = false;
                    answer = 0;
                    break; 
                case this.numero6BT:
                    changeEmptyText('6');
                    this.errado.visible = false;
                    answer = 0;
                    break;
                case this.numero7BT:
                    changeEmptyText('7');
                    this.errado.visible = false;
                    answer = 0;
                    break;
                case this.numero8BT:
                    changeEmptyText('8');
                    this.errado.visible = false;
                    answer = 0;
                    break;
                case this.numero9BT:
                    changeEmptyText('9');
                    this.errado.visible = false;
                    answer = 0;
                    break;
                case this.borrachaBT:
                    emptyBTText = '';
                    this.errado.visible = false;
                    answer = 0;
                    break;
                case this.verificaBT:
                    if(answer == 0){
                        if(checkSolution()) { 
                            console.log("SC: " + stringcerta);
                            console.log("SC0: " + stringcerta0);
                            levelText = stringcerta;
                            levelString0 = stringcerta0;
                            this.levelText.setText(levelText);
                            this.levelText0.setText(levelString0);

                            this.certo.visible = true;
                            this.nextBT.visible = true;
                            timedEvent.paused = true;
                            this.verificaBT.visible = false;
                            score = Math.floor((score + 100 + (this.initialTime*0.1))*10)/10;
                            answer = 1;
                            if(level == 28 && answer == 1) {
                                this.barra.visible = false;
                                this.borrachaBT.visible = false;
                                this.numero0BT.visible = false;
                                this.numero1BT.visible = false;
                                this.numero2BT.visible = false;
                                this.numero3BT.visible = false;
                                this.numero4BT.visible = false;
                                this.numero5BT.visible = false;
                                this.numero6BT.visible = false;
                                this.numero7BT.visible = false;
                                this.numero8BT.visible = false;
                                this.numero9BT.visible = false;
                                this.verificaBT.visible = false;
                                this.nextBT.visible = false;
                                this.certoBT.visible = false;
                                this.levelTitle.visible = false;
                                updatePoints();
                                this.parabensBT.visible = true;
                            }
                        } else {
                            this.errado.visible = true;
                            emptyBTText = '';
                            answer = -1;
                        }
                    }
                    break;
                case this.perdesteBT: case this.parabensBT:
                    reset();
                    this.scene.start('Menu');   
                    break;
                case this.nextBT:
                    this.certo.visible = false;
                    this.errado.visible = false;
                    this.nextBT.visible = false;
                    this.verificaBT.visible = true;
                    clearText();
                    if(subLevel == 1) level++;
                    subLevel--;
                    answer = 0;
                    timedEvent.paused = false;
                    this.initialTime = 20;
                    time.setFill('#FFFFFF');
                    break;   
                default:
                    break;
            }
        }, this);
    
    //Timer
    this.initialTime = 300;
    time = this.add.text(0.92 * width, 0.419 * height, formatTime(this.initialTime),{font: "bold 70px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5, 0.5);
    timedEvent = this.time.addEvent({ delay: 100, callback: onEvent, callbackScope: this, loop: true, paused: false });

    //Pontos
    scoreText = this.add.text(0.92 * width, 0.628 * height, score , {font: "bold 70px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5, 0.5);
    }

    update() {
        this.emptyBTText.setText(emptyBTText);
        this.levelText.setText(levelText);
        this.levelText0.setText(levelString0);

        this.textoFinal.setText(please);
        time.setText(formatTime(this.initialTime));
        scoreText.setText(score);
        if(infoUser.user!='') {
            nome = infoUser.firstName.split(" ");
            nome2 = nome[0];
            this.ola.setText(['Olá ' + nome2]);
            this.ola.visible = true;
        }

        //Niveis
        if(levelText == '') {
            let number = 0;
            let list = [];
            let tmp;
            let a = 0;
            this.levelTitle.visible = true;
            this.levelTitle.setText('Nível: ' + level);
            switch(level) {
                case 1:
                    //console.log("lastrndnumber: " + lastrndnumber)
                    if(subLevel == 0) subLevel = 2;
                    do {
                        number = getRandomInt(1,20);
                    } while (lastrndnumber == number)

                    lastrndnumber = number;
                    vale = getRandomInt(2,6);
                    list = buildLevelList(1,number);
                    //solution = number;
                   
                    levelText = buildSpecialLevelString(list, vale);
                    //if(subLevel == 1) solution = list[vale]; 
                    //else solution = list[vale]; 
                    break;
                case 2:
                    if(subLevel == 0) subLevel = 3;
                    number = getRandomInt(1,13);
                    list = buildLevelList(2,number);
                    vale = getRandomInt(2,7);
                    levelText = buildSpecialLevelString(list, vale);

                    if(subLevel == 1) solution = list[vale]; 
                    else solution = list[vale]; 
                    break;
                case 3:
                    if(subLevel == 0) subLevel = 4;
                    number = getRandomInt(1,10);
                    list = buildLevelList(3,number);
  
                    vale = getRandomInt(2,6);
                    levelText = buildSpecialLevelString(list, vale);
                    if(subLevel == 1) solution = list[vale]; 
                    else solution = list[vale]; 

                    break;
                case 4:
                    if(subLevel == 0) subLevel = 3;
                    number = getRandomInt(10,93);
                    list = buildLevelList(4,number);

                    vale = getRandomInt(2,7);
                    levelText = buildSpecialLevelString(list, vale);
                    if(subLevel == 1) solution = list[vale]; 
                    else solution = list[vale]; 
                    break;
                case 5:
                    if(subLevel == 0) subLevel = 4;
                    number = getRandomInt(10,90);
                    list = buildLevelList(5,number);

                   vale = getRandomInt(2,6);
                   levelText = buildSpecialLevelString(list, vale);
                   if(subLevel == 1) solution = list[vale]; 
                   else solution = list[vale]; 
                   break;
                case 6:
                    if(subLevel == 0) subLevel = 3;
                    number = getRandomInt(0,15);
                    list = buildLevelList(6,number);

                    vale = getRandomInt(2,6);
                    levelText = buildSpecialLevelString(list, vale);
                    if(subLevel == 1) solution = list[vale]; 
                    else solution = list[vale]; 
                    break;
                case 7:
                    if(subLevel == 0) subLevel = 3;
                    number = getRandomInt(0,75);
                    list = buildLevelList(7,number);
      
                    vale = getRandomInt(2,6);
                    levelText = buildSpecialLevelString(list, vale);
                    if(subLevel == 1) solution = list[vale]; 
                    else solution = list[vale]; 
                    break;
                case 8:
                    if(subLevel == 0) subLevel = 3;
                    number = getRandomInt(0,5);
                    list = buildLevelList(8,number);
  
                    vale = getRandomInt(2,6);
                    levelText = buildSpecialLevelString(list, vale);
                    if(subLevel == 1) solution = list[vale]; 
                    else solution = list[vale]; 
                    break;
                case 9: 
                    if(subLevel == 0) subLevel = 3;
                    number = getRandomInt(0,49);
                    list = buildLevelList(9,number);

                    vale = getRandomInt(2,6);
                    levelText = buildSpecialLevelString(list, vale);
                    if(subLevel == 1) solution = list[vale]; 
                    else solution = list[vale]; 
                    break;
                case 10:
                    if(subLevel == 0) subLevel = 2;
                    number = getRandomInt(0,76);
                    for(let i = 1; i <= 6; i++) {
                        list.push(number + 4*i);
                    }
                    a = getRandomInt(1,6);
                    solution = list[a];
                    levelText = buildSpecialLevelString(list,a);
                    break;
                case 11:
                    if(subLevel == 0) subLevel = 2;
                    number = getRandomInt(0,82);
                    for(let i = 1; i <= 6; i++) {
                        list.push(number + 3*i);
                    }
                    a = getRandomInt(1,6);
                    solution = list[a];
                    levelText = buildSpecialLevelString(list,a);
                    break;
                case 12:
                    if(subLevel == 0) subLevel = 2;
                    number = getRandomInt(1,5);
                    list.push(number);
                    for(let i = 1; i < 5; i++) {
                        list.push(number * (Math.pow(2,i)));
                    }
                    a = getRandomInt(1,5);
                    solution = list[a];
                    levelText = buildSpecialLevelString(list,a);
                    break;
                case 13:
                    if(subLevel == 0) subLevel = 2;
                    number = getRandomInt(1,5);
                    list.push(number*Math.pow(2,5));
                    for(let i = 4; i >= 1; i--) {
                        list.push(number * (Math.pow(2,i)));
                    }
                    a = getRandomInt(1,5);
                    solution = list[a];
                    levelText = buildSpecialLevelString(list,a);
                    break;
                case 14:
                    if(subLevel == 0) subLevel = 2;
                    number = getRandomInt(1,5);
                    list.push(number);
                    for(let i = 1; i < 5; i++) {
                        list.push(number * (Math.pow(3,i)));
                    }
                    a = getRandomInt(1,5);
                    solution = list[a];
                    levelText = buildSpecialLevelString(list,a);
                    break;
                case 15:
                    if(subLevel == 0) subLevel = 2;
                    number = getRandomInt(1,5);
                    list.push(number*Math.pow(3,5));
                    for(let i = 4; i >= 1; i--) {
                        list.push(number * (Math.pow(3,i)));
                    }
                    a = getRandomInt(1,5);
                    solution = list[a];
                    levelText = buildSpecialLevelString(list,a);
                    break;
                case 16:
                    if(subLevel == 0) subLevel = 2;
                    number = getRandomInt(1,5);
                    a = getRandomInt(1,5);
                    for(let i = 1; i <= 6; i++) {
                        list.push(number + a*i);
                    }
                    a = getRandomInt(1,5);
                    solution = list[a];
                    levelText = buildSpecialLevelString(list,a);
                    break;
                case 17:
                    if(subLevel == 0) subLevel = 2;
                    number = getRandomInt(1,5);
                    a = getRandomInt(1,5);
                    for(let i = 6; i >=1; i--) {
                        list.push(number + a*i);
                    }
                    a = getRandomInt(1,5);
                    solution = list[a];
                    levelText = buildSpecialLevelString(list,a);
                    break;
                case 18: case 19: case 20: case 21: case 22: case 23: case 24: case 25: case 26: case 27: case 28:
                    if(subLevel == 0) subLevel = 1;
                    levelText = buildSpecialLevels(level-17);
                    break;
                default:
                    break;
            }
            //console.log(solution);
        }
    }
}

function formatTime(miliseconds){
    var seconds = Math.floor(miliseconds%1000);
    if(seconds >=100){seconds = seconds.toString().substring(0,2) + ',' + seconds.toString().substring(2,3);}
    if(seconds >=10){seconds = seconds.toString().substring(0,1) + ',' + seconds.toString().substring(1,2);}
    if(seconds >=0){seconds = '0' + ',' + seconds.toString().substring(0,1);}
    return `${seconds.replace(",",".")}`;
}

function onEvent (){
    this.initialTime -= 1; // One second
    if (this.initialTime == '00'){
        timedEvent.paused = true;
        this.perdesteBT.visible = true;
        this.youAreSurePanel.visible = false;
        this.fecharBT.visible = false;
        this.certoBT.visible = false;
        this.menuBT.visible = false;
        this.barra.visible = false;
        this.borrachaBT.visible = false;
        this.numero0BT.visible = false;
        this.numero1BT.visible = false;
        this.numero2BT.visible = false;
        this.numero3BT.visible = false;
        this.numero4BT.visible = false;
        this.numero5BT.visible = false;
        this.numero6BT.visible = false;
        this.numero7BT.visible = false;
        this.numero8BT.visible = false;
        this.numero9BT.visible = false;
        this.verificaBT.visible = false;
        
        this.levelTitle.visible = false;

        levelText = '';
        please = '';
        levelString0 = '';
      
        time.setFill('#FF0000');
        updatePoints();
    }
}

function changeEmptyText(number) {
    if(emptyBTText.length < 3) {
        emptyBTText = emptyBTText + number;
    }
}

function getRandomInt(min,max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function checkSolution() {
    return solution == emptyBTText;
}

function reset() {
    clearText();
    level = 1;
    subLevel = 0;
    solution = 0;
    score = 0;buildLevelList
    timer = 0;
    answer = 0;
}

function clearText() {
    emptyBTText = '';
    levelText = '';
    levelText0 = '';
    please = '';
    levelString0 = '';
    solution = '';
}


function buildLevelList(lvl, n) {
    let list = [];
    let tmp;
    let a = 0;
    switch(lvl) {
        case 1:
            let vll = getRandomInt(1,20);
            //console.log("subLevel: " + subLevel);
            if(vll == 1) { 
                list = Array(6).fill(n.toString());
                solution = n;
            } else if(vll == 2) {
                 for(let i = 0; i <= 6; i++) {
                    list.push(n + i);
                }
                solution = list[vale]; 
            }
            return list;
        case 2: case 4:
            subLevel = getRandomInt(1,2);
            if(subLevel == 1) {
                for(let i = 7; i >= 0; i--) {
                    list.push(n + i);
                }
            } else {
                for(let i = 0; i <= 6; i++) {
                    list.push(n + i);
                }
            }
            return list;
        case 3: case 5:
           
            if(subLevel <= 2) {
                for(let i = 6; i >= 0; i--) {
                    list.push(n + i*2);
                }
            } else {
                for(let i = 0; i <= 6; i++) {
                    list.push(n + i*2);
                }
            }
            return list;
        case 6:
            if(subLevel == 1) {
                for(let i = 5; i >= 0; i--) {
                    list.push(5*n + i*5);
                }
            } else {
                for(let i = 0; i <= 5; i++) {
                    list.push(n*5 + i*5);
                }
            }
            return list;
        case 7:
            if(subLevel == 1) {
                for(let i = 5; i >= 0; i--) {
                    list.push(n + i*5);
                }
            } else {
                for(let i = 0; i <= 5; i++) {
                    list.push(n + i*5);
                }
            }
            return list;
        case 8:
            if(subLevel == 1) {
                for(let i = 5; i >= 0; i--) {
                    list.push(10*n + i*10);
                }
            } else {
                for(let i = 0; i <= 5; i++) {
                    list.push(10*n + i*10);
                }
            }
            return list;
        case 9:
            if(subLevel == 1) {
                for(let i = 5; i >= 0; i--) {
                    list.push(n + i*10);
                }
            } else {
                for(let i = 0; i <= 5; i++) {
                    list.push(n + i*10);
                }
            }
            return list;
        case 10: 
            for(let i = 1; i <= 6; i++) {
                list.push(n + 4*i);
            }
            a = getRandomInt(1,6);
            solution = list[a];
            return buildSpecialLevelString(list,a);
            //return list;
        case 11: 
            for(let i = 1; i <= 6; i++) {
                list.push(n + 3*i);
            }
            return list;
        case 12: 
            list.push(n);
            for(let i = 1; i < 4; i++) {
                list.push(n * (2 * i));
            }
            list.push(n * 8);
            return list;
        case 13: 
            list.push(n * 16);
            list.push(n * 8);
            for(let i = 3; i >= 1; i--) {
                list.push(n * (2 * i));
            }
            return list;
        case 14:
            list.push(n);
            tmp = 3;
            for(let i = 0; i < 4; i++) {
                list.push(n*tmp);
                tmp = tmp * 3;
            }
            return list;
        case 15:
            tmp = 81;
            for(let i = 4; i >= 0; i--) {
                list.push(n*tmp);
                tmp = tmp / 3;
            }
            return list;
        case 16:
            a = getRandomInt(6,9);
            for(let i = 1; i <= 5; i++) {
                list.push(n + (i*a)); 
            }
            solution = n + (6 * a);
            break;
        case 17:
            a = getRandomInt(6,9);
            for(let i = 6; i >= 2; i--) {
                list.push(n + (i*a));
            }
            solution = n + a;
            break;
        default:
            break;
    }
    return list;
}

function buildSpecialLevels(lvl) {
    let list = [];
    let n,a;
    switch(lvl) {
        case 1:
            n = getRandomInt(0,10);
            for(let i = 0; i < 6; i++) {
                list.push((n+i)*(n+i));
            }
            a = getRandomInt(1,5);
            solution = list[a];
            return buildSpecialLevelString(list,a);
        case 2:
            n = getRandomInt(2,15);
            list.push(n);
            for(let i = 0; i < 5; i++) {
                list.push(list[i]*2+1);
            }
            a = getRandomInt(1,5);
            solution = list[a];
            return buildSpecialLevelString(list,a);
        case 3:
            console.log("PASSSSSEI");
            n = getRandomInt(2,100);
            a = getRandomInt(n,110);
            list.push(n);
            list.push(a);
            for(let i = 1; i < 4; i++) {
                list.push(list[i]+(a-n)+i);
            }
            solution = list[4]+(a-n)+4;
            list.push(list[4]+(a-n)+4);
            return buildLevelString(list);
        case 4:
            n = getRandomInt(2,100);
            a = getRandomInt(1,99);
            while(a%2==0) {
                a = getRandomInt(1,99);
            }
            list.push(n);
            for(let i = 1; i <= 4; i++) {
                list.push(list[i-1]+a);
                a += 2;
            }
            solution = list[4]+a;
            list.push(list[4]+a);
            return buildLevelString(list);
        case 5:
            n = getRandomInt(2,100);
            a = getRandomInt(1,99);
            while(a%2!=0) {
                a = getRandomInt(1,99);
            }
            list.push(n);
            for(let i = 1; i <= 4; i++) {
                list.push(list[i-1]+a);
                a += 2;
            }
            solution = list[4]+a;
            list.push(list[4]+a);
            return buildLevelString(list);
        case 6:
            n = getRandomInt(1,8);
            list.push(n)
            for(let i = 5; i >= 1; i--) {
                n = n*i;
                list.push(n);
            }
            list.reverse();
            a = getRandomInt(1,5);
            solution = list[a];
            return buildSpecialLevelString(list,a);
        case 7:
            n = getRandomInt(1,8);
            list.push(n)
            for(let i = 1; i <= 5; i++) {
                n = n*i;
                list.push(n);
            }
            a = getRandomInt(1,5);
            solution  = list[a];
            return buildSpecialLevelString(list,a);
        case 8:
            let fib = [0,1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987];
            n = getRandomInt(0,10);
            for(let i = n; i<=n+6; i++) {
                list.push(fib[i]);
            }
            a = getRandomInt(1,5);
            solution = list[a];
            return buildSpecialLevelString(list,a);
        case 9:
            n = getRandomInt(10,100);
            a = getRandomInt(10,100);
            for(let i = 3; i > 0; i--) {
                list.push(n + i);
                list.push(a + i);
            }
            a = getRandomInt(1,5);
            solution = list[a];
            return buildSpecialLevelString(list,a);
        case 10:
            a = getRandomInt(1,20);
            b = getRandomInt(1,20);
            while(b == a){
                b = getRandomInt(1,100);
            }
            n = getRandomInt((a+b)*6,999);
            list.push(n);
            for(let i = 1; i <= 5; i++) {
                if(i%2==0) {
                    list.push(list[i-1]-a);
                } else {
                    list.push(list[i-1]-b);
                }
            }
            a = getRandomInt(1,6);
            solution = list[a];
            return buildSpecialLevelString(list,a);
        case 11:
            n = getRandomInt(0,500);
            a = getRandomInt(2,3);
            for(let i = 1; i <= 5; i++) {
                list.push(n+Math.pow(a,i));
            }
            a = getRandomInt(1,5);
            solution = list[a];
            return buildSpecialLevelString(list,a);
        default:
            break;
    }
}

function buildLevelString(list) {
    let levelString = '';
    levelString0 = '';
    stringcerta = '';
    stringcerta0 = '';
    
    for(let i = 0; i < list.length-1; i++) {
        levelString = levelString + list[i];
        levelString = levelString + ', ';
        levelString0 = levelString0 + putSpaces(list[i]);
        levelString0 = levelString0 + '  ';
        stringcerta = stringcerta + list[i];
        stringcerta = stringcerta + ', ';  
        stringcerta0 = stringcerta0 + putSpaces(list[i]);
        stringcerta0 = stringcerta0 + '  ';
    }
    stringcerta0 = stringcerta0 + "" + list[list.length-1] + "";
    stringcerta = stringcerta + "" + putSpaces(list[list.length-1]) + "";
    levelString = levelString + ' ';
    levelString0 = levelString0 + '?';
    return levelString;
}

function buildSpecialLevelString(list,a) {
    let levelString = '';
    levelString0 = '';
    stringcerta = '';
    stringcerta0 = '';

    for(let i = 0; i < list.length; i++) {
        if(i != a) {
            levelString = levelString + list[i];
            levelString0 = levelString0 + putSpaces(list[i]);
            stringcerta = stringcerta + list[i];
            stringcerta0 = stringcerta0 + putSpaces(list[i]);
        } else {
            levelString = levelString + ' ';
            levelString0 = levelString0 + '?';
            stringcerta = stringcerta + "" + putSpaces(list[i]) + "";
            stringcerta0 = stringcerta0 + list[i];
        }
        if(i != list.length - 1) {
            levelString = levelString + ', ';
            levelString0 = levelString0 + '  ';
            stringcerta = stringcerta + ', ';
            stringcerta0 = stringcerta0 + '  ';
        }
    }
    return levelString;
}

function putSpaces(a) {
    console.log((a+'').length);
    let str = '';
    for(let i = 0; i < (a+'').length; i++) {
        str = str + ' ';
    }
    return str;
}

function updatePoints() {
   
    verificaRecords(infoUser.user, infoUser.turma, infoUser.escola, score, this);
    gravaRecords(infoUser.user, infoUser.turma, infoUser.escola, score); 

}
