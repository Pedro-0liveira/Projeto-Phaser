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
        this.gridSize = data.size * 2; // Adjusted for the grid size
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
        this.cellSize = 70;
        this.cellPadding = 150;

        if (this.size === 3){
            this.gridScale = 1;
            this.gridNumberOpScale = 2;
        } else if (this.size === 4){
            this.gridScale = 0.8;
            this.gridNumberOpScale = 1.8;
        } else {
            this.gridScale = 0.65;
            this.gridNumberOpScale = 1.5;
        }

        this.cellSize *= this.gridScale; // Adjust cell size based on grid scale
        this.cellPadding *= this.gridScale; // Adjust padding based on grid scale
        
        // Calculate starting position for the grid (center of screen)
        const gridWidth = ((this.cellSize * this.size) + (this.cellPadding * (this.size - 1)));
        const gridHeight = ((this.cellSize * this.size) + (this.cellPadding * (this.size - 1)));

        
        const startX = (width * 0.66) - (gridWidth / 2);
        const startY = (height * 0.5) - (gridHeight / 2);
        
        // Create the puzzle
        const puzzle = this.generatePuzzle();
        console.log("puzzle"); // Verifica o puzzle gerado
        /*
        // Adiciona este código para mostrar a solução na consola
        console.log("Solução do Crucigrama:");
        console.log("Matriz de Números:");
        for (let row = 0; row < this.gridSize; row++) {
            console.log(puzzle.this.grid[row].join("\t"));
        }
        
        console.log("\nOperações Horizontais:");
        for (let row = 0; row < this.gridSize; row++) {
            console.log(puzzle.horizontalOps[row].join("\t"));
        }
        
        console.log("\nOperações Verticais:");
        for (let row = 0; row < this.gridSize - 1; row++) {
            console.log(puzzle.verticalOps[row].join("\t"));
        }
        
        console.log("\nResultados das Linhas:", puzzle.rowResults);
        console.log("Resultados das Colunas:", puzzle.colResults);
        */
        
        // Store the puzzle components
        this.cells = [];
        this.horizontalOps = [];
        this.verticalOps = [];    
        this.rowResults = puzzle.rowResults;
        this.colResults = puzzle.colResults;
        
        
        // Create the grid cells
        for (let row = 0; row < this.size; row++) {
            this.cells[row] = [];
            this.horizontalOps[row] = [];
            this.verticalOps[row] = [];
            
            for (let col = 0; col < this.size; col++) {
                // Calculate cell position
                const cellX = startX + (col * (this.cellSize + this.cellPadding));
                const cellY = startY + (row * (this.cellSize + this.cellPadding));
                
                let cell;
                // Create the cell (pentagon sprite)
                switch(this.difficulty) {
                case 1:
                    cell = this.add.image(cellX, cellY, "QuadradoNivel1");
                    cell.setScale(0.8 * this.gridScale); // Adjust scale as needed
                    cell.setInteractive({ useHandCursor: true });
                    break;
                case 2:
                    cell = this.add.image(cellX, cellY, "QuadradoNivel2");
                    cell.setScale(0.8 * this.gridScale); // Adjust scale as needed
                    cell.setInteractive({ useHandCursor: true });
                    break;
                case 3:
                    cell = this.add.image(cellX, cellY, "QuadradoNivel3");
                    cell.setScale(0.8 * this.gridScale); // Adjust scale as needed
                    cell.setInteractive({ useHandCursor: true });
                    break;
                default:
                    cell = this.add.image(cellX, cellY, "QuadradoNivel1");
                    cell.setScale(0.8 * this.gridScale); // Adjust scale as needed
                    cell.setInteractive({ useHandCursor: true });
                }
                // Add number text (initially empty, player will fill)
                const textStyle = { fontSize: `${Math.round(24 * this.gridNumberOpScale)}px`, fontFamily: 'Arial', color: '#ffffff' };
                const cellText = this.add.text(cellX, cellY, '', textStyle).setOrigin(0.5);
                
                // Store references to cell elements
                this.cells[row][col] = {
                    sprite: cell,
                    text: cellText,
                    value: null, // Player will fill this
                    correctValue: puzzle.grid[row][col] // The correct answer
                };
                
                // Add cell selection handling
                cell.on('pointerdown', () => {
                    this.selectCell(row, col);
                });
                
                // Add horizontal operations (between columns)
                if (col < this.size - 1) {
                    const opX = cellX + this.cellSize/2 + this.cellPadding/2;
                    const opY = cellY;
                    
                    const opText = this.add.text(
                        opX, opY, 
                        puzzle.horizontalOps[row][col], 
                        { fontSize: `${Math.round(28 * this.gridNumberOpScale)}px`, fontFamily: 'Arial', color: '#ffffff' }
                    ).setOrigin(0.5);
                    
                    this.horizontalOps[row][col] = {
                        text: opText,
                        value: puzzle.horizontalOps[row][col]
                    };
                }
                
                // Add vertical operations (between rows)
                if (row < this.size - 1) {
                    const opX = cellX;
                    const opY = cellY + this.cellSize/2 + this.cellPadding/2;
                    
                    const opText = this.add.text(
                        opX, opY,
                        puzzle.verticalOps[row][col],
                        { fontSize: `${Math.round(28 * this.gridNumberOpScale)}px`, fontFamily: 'Arial', color: '#ffffff' }
                    ).setOrigin(0.5);
                    
                    this.verticalOps[row][col] = {
                        text: opText,
                        value: puzzle.verticalOps[row][col]
                    };
                }
            }
            
            // Add row result (at the end of each row)
            const rowResultX = startX + (this.size * 1.1) * (this.cellSize + this.cellPadding);
            const rowResultY = startY + (row * (this.cellSize + this.cellPadding));

            
            this.add.text(
                rowResultX - this.cellPadding, rowResultY, 
                '=', 
                { fontSize: `${Math.round(28 * this.gridNumberOpScale)}px`, fontFamily: 'Arial', color: '#ffffff' }
            ).setOrigin(0.5);
            
            this.add.text(
                rowResultX, rowResultY,
                puzzle.rowResults[row].toString(),
                { fontSize: `${Math.round(28 * this.gridNumberOpScale)}px`, fontFamily: 'Arial', color: '#ffffff' }
            ).setOrigin(0.5);
        }
        
        // Add column results (at the bottom of each column)
        for (let col = 0; col < this.size; col++) {
            const colResultX = startX + (col * (this.cellSize + this.cellPadding));
            const colResultY = startY + (this.size * 1.1) * (this.cellSize + this.cellPadding);
            
            this.add.text(
                colResultX, colResultY - this.cellPadding, 
                '=', 
                { fontSize: `${Math.round(28 * this.gridNumberOpScale)}px`, fontFamily: 'Arial', color: '#ffffff' }
            ).setOrigin(0.5);
            
            this.add.text(
                colResultX, colResultY,
                puzzle.colResults[col].toString(),
                { fontSize: `${Math.round(28 * this.gridNumberOpScale)}px`, fontFamily: 'Arial', color: '#ffffff' }
            ).setOrigin(0.5);
        }
    }
    
    generatePuzzle() {
        this.grid = Array.from({ length: this.gridSize }, () => Array(this.gridSize).fill(0));
        for(let row = 0; row < this.gridSize-1; row++){
            for(let col = 0; col < this.gridSize; col++){
                if (row % 2 === 1){
                    if (col % 2 === 0){
                        this.grid[row][col] = this.getValidOp(); // Random operator
                    } else {
                        this.grid[row][col] = null;
                    }
                } else {                    
                    if(col % 2 === 0 && row % 2 === 0){
                        this.grid[row][col] = this.getValidNumb(); // Random number between 0-9
                    }
                    else{
                        this.grid[row][col] = this.getValidOp(); // Random operator
                    }
                }
            }
            if (row % 2 === 1){
                this.grid[row][this.gridSize - 1] = null; // Last column is an operator
            } else {
                this.grid[row][this.gridSize - 1] = 0; // Last column is a number
            }
        }

        let isValid = false;
        while(!isValid){
            console.log("Validando o puzzle...");
            isValid = this.validateOp();
            if(!isValid){
                console.log("Puzzle inválido. Corrigindo...");
                this.fixOperation();
            }
        }
        this.calculateResults();
        console.log("Puzzle gerado:", this.grid);

        

        // Inicializar horizontalOps e verticalOps como arrays bidimensionais
        this.horizontalOps = Array.from({ length: (this.gridSize)/2}, () => Array((this.gridSize - 4)).fill(null));
        this.verticalOps = Array.from({ length: (this.gridSize - 1)/2 }, () => Array((this.gridSize-4)).fill(null));

        // Preencher horizontalOps
        for (let row = 0; row < this.gridSize; row += 2) { // Apenas linhas pares
            for (let col = 1; col < this.gridSize- 1; col += 2) { // Apenas colunas ímpares
                this.horizontalOps[row / 2][(col - 1) / 2] = this.grid[row][col];
            }
        }
        console.log(this.horizontalOps, "HorizontalOps"); // Verifica a grade antes de validar

        // Preencher verticalOps
        for (let col = 0; col < this.gridSize; col += 2) { // Apenas colunas pares
            for (let row = 1; row < this.gridSize- 1; row += 2) { // Apenas linhas ímpares
                this.verticalOps[(row - 1) / 2][col / 2] = this.grid[row][col];
            }
        }
        console.log(this.verticalOps, "VerticalOps"); // Verifica a grade antes de validar

        return {rowResults: this.rowResults, colResults: this.colResults, grid: this.grid, horizontalOps: this.horizontalOps, verticalOps: this.verticalOps};
    }

    getValidNumb(){
        return Phaser.Math.Between(0, 9);
    }

    getValidOp(){
        return Phaser.Math.RND.pick(this.operators);
    }

/*
0: (6) [4, '-', 0, '-', 1, 0]
1: (6) ['+', null, '+', null, '+', null]
2: (6) [3, '-', 8, '-', 3, 0]
3: (6) ['+', null, '-', null, '-', null]
4: (6) [2, '-', 9, '-', 1, 0]
5: (6) [0, 0, 0, 0, 0, 0]
*/
    validateOp() {
        // Validar operações horizontais
        for (let row = 0; row < this.gridSize; row += 2) {
            let result = this.grid[row][0]; // Começa com o primeiro número da linha
            for (let col = 1; col < this.gridSize - 1; col += 2) {
                let op = this.grid[row][col];
                let num2 = this.grid[row][col + 1];

                if (!this.isValidOp(result, op, num2) || this.calculate(result, op, num2) === 0) {
                    return false;
                }

                // Atualiza o resultado para a próxima operação
                result = this.calculate(result, op, num2);
            }
        }

        // Validar operações verticais
        for (let col = 0; col < this.gridSize; col += 2) {
            let result = this.grid[0][col]; // Começa com o primeiro número da coluna
            for (let row = 1; row < this.gridSize - 1; row += 2) {
                let op = this.grid[row][col];
                let num2 = this.grid[row + 1][col];

                if (!this.isValidOp(result, op, num2) || this.calculate(result, op, num2) === 0) {
                   return false;
                }

                // Atualiza o resultado para a próxima operação
                result = this.calculate(result, op, num2);
            }
        }

        return true;
    }

    isValidOp(num1, op, num2) {
        switch (op) {
            case '-':
                return num1 >= num2; // Garantir que a subtração não resulte em negativo
            case '×':
                if (this.difficulty === 2) {
                    const operation = `${num1}×${num2}`;
                    return !this.restrictedMultiplications.includes(operation);
                }
                return true;
            case '÷':
                return num2 !== 0 && num1 % num2 === 0; // Evitar divisão por zero e garantir divisibilidade
            default:
                return true;
        }
    }
    
    fixOperation() {
        // Corrigir operações horizontais
        for (let row = 0; row < this.gridSize; row += 2) {
            let result = this.grid[row][0]; // Começa com o primeiro número da linha
            for (let col = 1; col < this.gridSize - 1; col += 2) {
                let op = this.grid[row][col];
                let num2 = this.grid[row][col + 1];
    
                if (!this.isValidOp(result, op, num2) || this.calculate(result, op, num2) === 0) {
                    if (op === '-') {
                        // Ajustar para evitar resultados negativos ou 0
                        this.grid[row][col + 1] = Math.min(result - 1, num2);
                    } else if (op === '÷') {
                        // Obter divisor válido
                        this.grid[row][col + 1] = this.getValidDivisor(result);
                    } else {
                        // Substituir número inválido
                        this.grid[row][col + 1] = this.getValidNumb();
                    }
                }
    
                // Atualiza o resultado para a próxima operação
                result = this.calculate(result, op, this.grid[row][col + 1]);
            }
        }
    
        // Corrigir operações verticais
        for (let col = 0; col < this.gridSize; col += 2) {
            let result = this.grid[0][col]; // Começa com o primeiro número da coluna
            for (let row = 1; row < this.gridSize - 1; row += 2) {
                let op = this.grid[row][col];
                let num2 = this.grid[row + 1][col];
    
                if (!this.isValidOp(result, op, num2) || this.calculate(result, op, num2) === 0) {
                    if (op === '-') {
                        // Ajustar para evitar resultados negativos ou 0
                        this.grid[row + 1][col] = Math.min(result-1, num2);
                    } else if (op === '÷') {
                        // Obter divisor válido
                        this.grid[row + 1][col] = this.getValidDivisor(result);
                    } else {
                        // Substituir número inválido
                        this.grid[row + 1][col] = this.getValidNumb();
                    }
                }
                // Atualiza o resultado para a próxima operação
                result = this.calculate(result, op, this.grid[row + 1][col]);
            }
        }
    }
    
    getValidDivisor(num) {
        const divisors = [];
        for (let i = 1; i <= num; i++) {
            if (num % i === 0) {
                divisors.push(i);
            }
        }
        return Phaser.Math.RND.pick(divisors);
    }

    calculateResults(){
        this.rowResults = [];
        this.colResults = [];

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
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
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
