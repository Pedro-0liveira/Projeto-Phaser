class Game extends Phaser.Scene{
    constructor(){
        super("Game");
    }
    preload(){
        this.load.image("background", "sprites/background.png");
        this.load.image("Creditos", "sprites/bt_creditos.png");
        this.load.image("Info", "sprites/bt_info.png");
        this.load.image("Top", "sprites/bt_top.png");
        this.load.image("Voltar", "sprites/bt_fechar.png");
    }
    init(data){
        this.difficulty = data.difficulty;
        this.size = data.size * 2;
        switch(this.difficulty) {
            case 1: // Level 1: only addition and subtraction
                this.operators = ['+', '-'];
                break;
            case 2: // Level 2: add, subtract, multiply (with restrictions)
                this.operators = ['+', '-', '×'];
                this.restrictedMultiplications = [
                    '7×8', '8×7', '8×8', '8×9', '9×7', '9×8', '9×9'
                ];
                break;
            case 3: // Level 3: all operations
                this.operators = ['+', '-', '×', '÷'];
                break;
            default:
                this.operators = ['+', '-'];
        }
    }

    create(){
        width = game.config.width;
        height = game.config.height;
        scale = 0.9;
        console.log("Game scene created with difficulty:", this.difficulty, "and size:", this.size);

        //createGrid

        this.background = this.add.sprite(width * 0.5, height * 0.5, "background");
        this.background.setScale(1.5);

        this.topBT = this.add.image(width * 0.24, height * 0.85, "Top");
        this.topBT.setScale(scale);
        this.topBT.setInteractive({ useHandCursor: true });

        this.infoBT = this.add.image(width * 0.16, height * 0.89, "Info");
        this.infoBT.setScale(scale);
        this.infoBT.setInteractive({ useHandCursor: true });

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

        this.voltarBT = this.add.image(width * 0.32, height * 0.81, "Voltar");
        this.voltarBT.setScale(scale);
        this.voltarBT.setInteractive({ useHandCursor: true });

        this.voltarBT.on('pointerdown', () => {
            this.scene.start("Menu");
        });
        
    }
    createGrid(){
        this.cellSize = 70;
        this.cellPadding = 30;

        const gridWidth = this.size * this.cellSize + (this.size - 1) * this.cellPadding;
        const gridHeight = this.size * this.cellSize + (this.size - 1) * this.cellPadding;
        const startX = (width - gridWidth) / 2;
        const startY = (height - gridHeight) / 2;

        const puzzle = this.generatePuzzle();
    }

    generatePuzzle(){
        let grid = [];
        let opsHorizontal = [];
        let opsVertical = [];

        for(let row = 0; row < this.size; row++){
            grid[row] = [];
            opsHorizontal[row] = [];
            opsVertical[row] = [];
            for(let col = 0; col < this.size; col++){
                grid[row][col] = Phaser.Math.Between(1, 9);
                if(col < this.size - 1){
                    opsHorizontal[row][col] = this.getOpration(grid[row][col]);
                }
                if(row < this.size - 1){
                    opsVertical[row][col] = this.getOpration(grid[row][col]);
                }
            }
        }
        if(this.difficulty == 2){
            this.avoidMul(grid, opsHorizontal, opsVertical);
        }
        if(this.difficulty == 3){
            this.avoidDeci(grid, opsHorizontal, opsVertical);
        }
        let rowResult = [];
        let colResult = [];
        for(let row = 0; row < this.size; row++){
            rowResult[row] = this.calculateResult(grid[row], opsHorizontal[row]);
        }
        for(let col = 0; col < this.size; col++){
            const colValues = [];
            const colOps = [];
            for(let row = 0; row < this.size; row++){
                colValues.push(grid[row][col]);
                if(row < this.size - 1){
                    colOps.push(opsVertical[row][col]);
                }
            }
            colResult[col] = this.calculateResult(colValues, colOps);
        }
        return {
            grid: grid,
            opsHorizontal: opsHorizontal,
            opsVertical: opsVertical,
            rowResult: rowResult,
            colResult: colResult
        };
    }
    
}