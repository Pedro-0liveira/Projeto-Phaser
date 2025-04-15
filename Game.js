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
        this.load.image("QuadradoNivel1", "sprites/quadradinho3por3.png");
        this.load.image("QuadradoNivel2", "sprites/quadradinho3por3-2.png");
        this.load.image("QuadradoNivel3", "sprites/quadradinho4por4.png");

    }
    init(data){
        this.difficulty = data.difficulty;
        this.size = data.size;
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
        this.createCrucigrama();
        
    }
    createCrucigrama() {
        this.gridSize
    }
    
    generatePuzzle() {
        let gridSize = this.size * 2;
        for(let row = 0; row < gridSize; row++){
            for(let col = 0; col < gridSize; col++){
                if(col % 2 === 0){
                    this.grid[row][col] = getValidNumb(); // Random number between 0-9
                }
                else{
                    this.grid[row][col] = getValidOp(); // Random operator
                }
            }
        }
        for(let col = 0; col < gridSize; col++){
            for(let row = 0; row < gridSize; row++){
                if(row % 2 === 0){
                    this.grid[row][col] = getValidNumb(); // Random number between 0-9
                }
                else{
                    this.grid[row][col] = getValidOp(); // Random operator
                }
            }
        }
        let isValid = false;
        while(!isValid){
            isValid = this.validateOp();
            if(!isValid){
                this.fixOperation();
            }
        }
    }

    getValidNumb(){
        return Phaser.Math.Between(0, 9);
    }

    getValidOp(){
        return Phaser.Math.RND.pick(this.operators);
    }

    validateOp(){
        for(let row = 0; row < this.gridSize; row+=2){
            for(let col = 0; col < this.gridSize; col+=2){
                let num1 = this.grid[row][col];
                let op = this.grid[row][col + 1];
                let num2 = this.grid[row][col + 2];
                if(!this.isValidOp(num1, op, num2)){
                    return false;
                }
            }
        }
        for(col = 0; col < this.gridSize; col+=2){
            for(row = 0; row < this.gridSize; row+=2){
                let num1 = this.grid[row][col];
                let op = this.grid[row + 1][col];
                let num2 = this.grid[row + 2][col];
                if(!this.isValidOp(num1, op, num2)){
                    return false;
                }
            }
        }
        return true;
    }

    isValidOp(num1, op, num2){
        switch(op){
            case '-':
                return num1 - num2 >= 0;
            case 'x':
                if(this.difficulty === 2){
                    return this.restrictedMultiplications.includes('${num1}${op}${num2}') === false;  
                }
            case '÷':
                return num1 % num2 === 0;
            default:
                return true;
        }
    }

    fixOperation(){
        for(let row = 0; row < this.gridSize; row+=2){
            for(let col = 0; col < this.gridSize; col+=2){
                let num1 = this.grid[row][col];
                let op = this.grid[row][col + 1];
                let num2 = this.grid[row][col + 2];
                if(!this.isValidOp(num1, op, num2)){
                    this.grid[row][col + 2] = this.getValidNumb(); // Replace invalid number with a valid one
                }
            }
        }
        for(let col = 0; col < this.gridSize; col+=2){
            for(let row = 0; row < this.gridSize; row+=2){
                let num1 = this.grid[row][col];
                let op = this.grid[row + 1][col];
                let num2 = this.grid[row + 2][col];
                if(!this.isValidOp(num1, op, num2)){
                    this.grid[row + 2][col] = this.getValidNumb(); // Replace invalid number with a valid one
                }
            }
        }
    }

    calculateResults(){
        for(let row = 0; row < this.gridSize; row+=2){
            let result = this.grid[row][0];
            for(let col = 1; col < this.gridSize - 1; col+=2){
                let operator = this.grid[row][col];
                let num = this.grid[row][col + 1];

                result = this.calculate(result, operator, num);
            }
            this.rowResults.push(result);
        }
        for(let col = 0; col < this.gridSize; col+=2){
            let result = this.grid[0][col];
            for(let row = 1; row < this.gridSize - 1; row+=2){
                let operator = this.grid[row][col];
                let num = this.grid[row + 1][col];

                result = this.calculate(result, operator, num);
            }
            this.colResults.push(result);
        }
    }
    
    calculate(num1, operator, num2){
        switch(operator){
            case '+':
                return num1 + num2;
            case '-':
                return num1 - num2;
            case '×':
                return num1 * num2;
            case '÷':
                return num1 / num2;
            default:
                return null;
        }
    }

    selectCell(row, col) {
        // Handle cell selection for number input
        this.selectedCell = { row, col };
        
        // Highlight the selected cell (you'd need a highlighted version of the cell sprite)
        this.highlightSelectedCell();
    }
    
    highlightSelectedCell() {
        // Remove highlight from all cells
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                this.cells[row][col].sprite.setTint(0xffffff); // Reset tint
            }
        }
        
        // Highlight the selected cell
        if (this.selectedCell) {
            const { row, col } = this.selectedCell;
            this.cells[row][col].sprite.setTint(0xffff00); // Yellow tint
        }
    }
}
