//const Phaser = require("phaser");

let x;
let y;
let width;
let height;

class Menu extends Phaser.Scene{
    constructor(){
        super("Menu");
    }
    preload(){
        this.load.image("background", "sprites/background.png");
        this.load.image("boneco", "sprites/bonecofirstpage.png");
        this.load.image("Nivel 1", "sprites/bt_3por3semdivisao.png");
        this.load.image("Nivel 2", "sprites/bt_3por3toasoperacoes.png");
        this.load.image("Nivel 3", "sprites/bt_4por4-3ou4ano.png");
        this.load.image("Créditos", "sprites/bt_creditos.png");
        this.load.image("Info", "sprites/bt_info.png");
        this.load.image("Top", "sprites/bt_top.png");
    }
    create(){
        width = game.config.width;
        height = game.config.height;
        this.add.sprite(0.5 * width, 0.5 * height, "background");
        this.add.image(400, 150, "boneco");
        this.add.image(150, 100, "Nivel 1");
        this.add.image(150, 150, "Nivel 2");
        this.add.image(150, 200, "Nivel 3");
    }
    update(){

    }
}