class Top extends Phaser.Scene{
    constructor(){
        super("Top");
    }
    preload(){
        this.load.image("background", "sprites/background.png");
        this.load.image("boneco", "sprites/bonecofirstpage.png");
        //this.load.image("Nivel 1", "sprites/bt_3por3semdivisao.png");
        //this.load.image("Nivel 2", "sprites/bt_3por3todasoperacoes.png");
        //this.load.image("Nivel 3", "sprites/bt_4por4-3ou4ano.png");
        this.load.image("Creditos", "sprites/bt_creditos.png");
        this.load.image("Info", "sprites/bt_info.png");
        this.load.image("Top", "sprites/bt_top.png");
        //this.load.image("Tamanho 3x3", "sprites/bt_3por3.png");
        //this.load.image("Tamanho 4x4", "sprites/bt_4por4.png");
        //this.load.image("Tamanho 5x5", "sprites/bt_5por5.png");
        
        //temp back, minimize and maximize buttons
        this.load.image("Maximizar", "sprites/fullscreenBT-1temp.png");
        this.load.image("Minimizar", "sprites/fullscreenBT-2temp.png");
        this.load.image("Voltar", "sprites/quadradoback.png");
    }
    create(){

    }
    update(){

    }
}