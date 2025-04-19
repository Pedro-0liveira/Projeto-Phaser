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
                this.operators = ['+', '-', 'X'];
                this.restrictedMultiplications = [
                    '7X8', '8X7', '8X8', '8X9', '9X7', '9X8', '9X9'
                ];
                break;
            case 3: // Level 3: all operations
                this.operators = ['+', '-', 'X', '÷'];
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
                        this.grid[row][col] = this.getValidOp(row, col); // Random operator
                    } else {
                        this.grid[row][col] = null;
                    }
                } else {                    
                    if(col % 2 === 0 && row % 2 === 0){
                        this.grid[row][col] = this.getValidNumb(row, col); // Random number between 0-9
                    }
                    else{
                        this.grid[row][col] = this.getValidOp(row, col); // Random operator
                    }
                }
            }
            if (row % 2 === 1){
                this.grid[row][this.gridSize - 1] = null; // Last column is an operator
            } else {
                this.grid[row][this.gridSize - 1] = 0; // Last column is a number
            }
        }

        let isValid = true;
        while(!isValid){
            console.log("Validando o puzzle...");
            isValid = this.validateOp();
            if(!isValid){
                console.log("Puzzle inválido. Corrigindo...");
                this.fixOperation();
            }
        }
        console.log("Puzzle gerado:", this.grid);
        this.calculateResults();

        

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

    getValidNumb(row, col){
        let maxnum = 9;

        // Checks if we have a - in either the line above or collum to the left
        let above = row>0 && this.grid[row-1][col] === '-';
        let behind = col>0 && this.grid[row][col-1] === '-';
        // Will ensure there are no - which result in numbers bellow 0, to avoid negative numbers
        if(behind){
            maxnum = Math.min(this.calcrow(row, col), maxnum);
            console.log("maxnum atraz", maxnum, this.calcrow(row, col), row, col);
        }
        if(above){
            maxnum = Math.min(this.calccol(row, col), maxnum);
            console.log("maxnum acima", maxnum, this.calccol(row, col), row, col);
        }
        // This restriction only occurs in diff 2
        if(this.difficulty === 2){
            // Check if we need to analyse rows above
            if(row>0 && this.grid[row-1][col] === 'X'){
                if(this.grid[row-2][col]>=7){
                    maxnum = Math.min(Math.floor(55/this.grid[row-2][col]), maxnum);
                    if(row>2 && this.grid[row-3][col] === '-' ){
                        // Check if there is a - operation prior to the x to ensure that the result of the x operation will not comprimise
                        // the result of the - operation
                        maxnum = Math.min(Math.floor(this.calcrow(row-4, col)/this.grid[row-2][col]), maxnum);
                    }
                }
                if(col>0 && this.grid[row][col-1] === 'X'){
                    if(this.grid[row][col-2]>=7){
                        maxnum = Math.min(Math.floor(55/this.grid[row][col-2]), maxnum);
                    } 
                    if(col>2 && this.grid[row][col-3] === '-' ){
                        // Check if there is a - operation prior to the x to ensure that the result of the x operation will not comprimise
                        // the result of the - operation
                        maxnum = Math.min(Math.floor(this.calccol(row, col-4)/this.grid[row][col-2]), maxnum);
                    }
                }
            }
        }
        else if(this.difficulty === 3){
            // Check if there is a - operation prior to the x to ensure that the result of the x operation will not comprimise
            // the result of the - operation
            if(col>3 && this.grid[row][col-3] === '-' && this.grid[row][col-1] === 'X'){
                maxnum = Math.min(Math.floor((this.calccol(row, col-4)+1)/this.grid[row][col-2]), maxnum);
            }
            if(row>3 && this.grid[row-3][col] === '-' && this.grid[row-1][col] === 'X' ){
                maxnum = Math.min(Math.floor((this.calcrow(row-4, col)+1)/this.grid[row-2][col]), maxnum);
            }
        }
        // Make a list of numbers from 0 to maxnnum
        let possibleNumbers = [];
        for(let i = 0; i <= maxnum; i++){
            possibleNumbers.push(i);
        }
        // Check if we have a division in the line above or collum to the left
        if(this.difficulty === 3){
            let divabove = row>0 && this.grid[row-1][col] === '÷';
            let divbehind = col>0 && this.grid[row][col-1] === '÷';
            if(divabove){
                // Check if the number is divisible by the number above
                let dividend = this.checklastmultdivCol(row-2, col);
                //let dividend = this.grid[row-2][col];
                possibleNumbers = possibleNumbers.filter(num => dividend % num === 0);
            }
            if(divbehind){
                let dividend = this.checklastmultdivRow(row, col-2);
                //let dividend = this.grid[row][col-2];
                possibleNumbers = possibleNumbers.filter(num => dividend % num === 0);
            }
        }
        // Check if we have a multiplication in the line above or collum to the left
        if(possibleNumbers.length === 0){
            console.log("No possible numbers, returning 0");
            possibleNumbers.push(0);
        }
        let num = Phaser.Math.RND.pick(possibleNumbers);
        return num;
    }

    // TO DO , change both of these so that instead of calculating
    // they simply put the whole row or column in a string so we can calculate it
    // properly making sure to multiply and divide first, then add and subtract 
    // DONE

    // Used to calculate the result of all operations up until the - we encountered
    calcrow(row, col){
        let expression = this.grid[row].slice(0, col-1);
        let result = this.calculateVector(expression);
        return result;
    }

    // Used to calculate the result of all operations up until the - we encountered
    calccol(row, col){
        let expression = [];
        for (let i = 0; i < row-1; i++) {
            expression.push(this.grid[i][col]);
        }
        let result = this.calculateVector(expression);
        return result;
    }


    // These functions will help calculate the result of the last sub-equation containing multiplications and divisions
    checklastmultdivRow(row, col){
        let result = 0;
        let expression = this.grid[row].slice(0, col+1);
        console.log("expression", expression);
        // We read a string from the back to the front, until we find a + or - operation
        // We proceed to delete the rest of the string
        for (let i = expression.length; i >= 0; i--) {
            if (expression[i] === '-' || expression[i] === '+') {
                // We found a + or - operation, we can now calculate the result of the last multiplication/division
                expression = expression.slice(i + 1,expression.length);
                break;
            }
        }
        result = this.calculateVector(expression);
        console.log("subExpression", expression, result);
        return result;
    }
    
    checklastmultdivCol(row, col){
        let result = 0;
        let expression = [];
        for (let i = 0; i < row+1; i++) {
            expression.push(this.grid[i][col]);
        }
        console.log("expression", expression);
        for (let i = expression.length; i >= 0; i--) {
            if (expression[i] === '-' || expression[i] === '+') {
                // We found a + or - operation, we can now calculate the result of the last multiplication/division
                expression = expression.slice(i + 1,expression.length);
                break;
            }
        }
        result = this.calculateVector(expression);
        console.log("subExpression", expression, result);
        return result;
    }

    // This function will calculate the result of a list of ints and operators making sure to multiply and divide first    
    calculateVector(list) {
        // If there are still calculable operations, do them first
        if (list.length > 1) {
            for (let i = 1; i < list.length; i++) {
                if (list[i] === 'X' || list[i] === '÷') {
                    let result = this.calculate(list[i - 1], list[i], list[i + 1]);
                    // console.log("calculateVector", list[i - 1], list[i], list[i + 1], result);
                    // Replace the operation and its operands with the result
                    list.splice(i - 1, 3, result);
                    return this.calculateVector(list); // Recurse with the new list
                }
            }
            // If there are no more multiplication or division operations, do addition and subtraction
            for (let i = 1; i < list.length; i++) {
                if (list[i] === '+' || list[i] === '-') {
                    let result = this.calculate(list[i - 1], list[i], list[i + 1]);
                    // Replace the operation and its operands with the result
                    list.splice(i - 1, 3, result);
                    return this.calculateVector(list); // Recurse with the new list
                }
            }
        }
        return list[0]; // If only one element, return it
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


    calculateResults(){
        this.rowResults = [];
        this.colResults = [];
        let size = this.gridSize/2;
        console.log("ESTE È O SIZE DA GRID", this.gridSize,size);
        console.log("calculating results");
        for (let row = 0; row < size; row++){
            let result = this.calcrow(row*2, this.gridSize);
            this.rowResults.push(result);
        }
        for (let col = 0; col < size; col++){
            let result = this.calccol(this.gridSize, col*2);
            this.colResults.push(result);
        }
    }
    
    calculate(num1, operator, num2){
        switch(operator){
            case '+':
                return num1 + num2;
            case '-':
                return num1 - num2;
            case 'X':
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
