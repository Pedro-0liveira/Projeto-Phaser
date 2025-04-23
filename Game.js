class Game extends Phaser.Scene{
    constructor(){
        super("Game");
    }
    preload(){
        this.load.image("background", "sprites/background.png");
        this.load.image("Creditos", "sprites/bt_creditos.png");
        this.load.image("Info", "sprites/bt_info.png");
        this.load.image("Top", "sprites/bt_top.png");
        this.load.image("Voltar", "sprites/quadradoback.png");
        this.load.image("QuadradoNivel1", "sprites/quadradinho3por3.png");
        this.load.image("QuadradoNivel2", "sprites/quadradinho3por3-2.png");
        this.load.image("QuadradoNivel3", "sprites/quadradinho4por4.png");
        this.load.image("Maximizar", "sprites/fullscreen-bt-1.png");
        this.load.image("Minimizar", "sprites/fullscreen-bt-2.png");
        this.load.image("Number0", "sprites/number0.png");
        this.load.image("Number1", "sprites/number1.png");
        this.load.image("Number2", "sprites/number2.png");
        this.load.image("Number3", "sprites/number3.png");
        this.load.image("Number4", "sprites/number4.png");
        this.load.image("Number5", "sprites/number5.png");
        this.load.image("Number6", "sprites/number6.png");
        this.load.image("Number7", "sprites/number7.png");
        this.load.image("Number8", "sprites/number8.png");
        this.load.image("Number9", "sprites/number9.png");
        this.load.image("Apagar", "sprites/apagarnumber.png");
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

        this.infoBT = this.add.image(width * 0.16, height * 0.89, "Info");
        this.infoBT.setScale(scale);

        this.credBT = this.add.image(width * 0.08, height * 0.93, "Creditos");
        this.credBT.setScale(scale);

        this.maxBT = this.add.image(width * 0.065, height * 0.1, "Maximizar");
        this.maxBT.setScale(scale);
        this.maxBT.setInteractive({ useHandCursor: true });

        this.minBT = this.add.image(width * 0.065, height * 0.1, "Minimizar");
        this.minBT.visible = false;
        this.minBT.setScale(scale);
        this.minBT.setInteractive({ useHandCursor: true });

        this.voltarBT = this.add.image(width * 0.24, height * 0.85, "Voltar");
        this.voltarBT.setScale(0.7);
        this.voltarBT.setInteractive({ useHandCursor: true });

        this.credBT.on('pointerdown', () => {
            this.scene.start("creditos");
        });

        this.voltarBT.on('pointerdown', () => {
            this.scene.start("Menu");
        });

        this.maxBT.on('pointerdown', () => {
            this.scale.startFullscreen();
            this.maxBT.visible = false;
            this.minBT.visible = true;
        });
        
        this.minBT.on('pointerdown', () => {
            this.scale.stopFullscreen();
            this.maxBT.visible = true;
            this.minBT.visible = false;
        });

        this.createCrucigrama();
        this.createVirtualKeyboard();    
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

    createVirtualKeyboard(){
        const buttonSize = 100;
        const buttonPadding = 60;
        const keyboardX = game.config.width * 0.10;
        const keyboardY = game.config.height * 0.27;
    
        const numbers = [
            [1,2,3],
            [4,5,6],
            [7,8,9],
            [0]
        ];
    
        let buttonX;
        let buttonY;
        
        for (let row = 0; row < numbers.length; row++){
            for (let col = 0; col < numbers[row].length; col++){
                if (row === 3){
                    buttonX = keyboardX + (col * (buttonSize + buttonPadding)) + 160;
                    buttonY = keyboardY + (row * (buttonSize + buttonPadding));
                } else {
                    buttonX = keyboardX + col * (buttonSize + buttonPadding);
                    buttonY = keyboardY + row * (buttonSize + buttonPadding);
                }
                
                const numberButton = this.add.image(buttonX, buttonY, "Number" + numbers[row][col]).setScale(0.5).setInteractive({ useHandCursor: true });
                const buttonTextStyle = { fontSize: `${Math.round(28 * this.gridNumberOpScale)}px`, fontFamily: 'Arial', color: '#ffffff' };
    
                // Corrigido: usar o valor do botão (numbers[row][col]) em vez da posição
                numberButton.on('pointerdown', () => {
                    if (this.selectedCell) {
                        const { row: cellRow, col: cellCol } = this.selectedCell;
                        const cell = this.cells[cellRow][cellCol];
                        cell.value = numbers[row][col]; // Usar o valor do botão clicado
                        cell.text.setText(cell.value.toString());
                        console.log("Valor definido:", cell.value);
                    }
                });
            }
        }
    
        // Criar botão de delete (fora do loop dos números)
        const deleteButtonX = keyboardX + (2 * (buttonSize + buttonPadding));
        const deleteButtonY = keyboardY + (3 * (buttonSize + buttonPadding));
        
        const deleteButton = this.add.image(deleteButtonX, deleteButtonY, "Apagar").setScale(0.5).setInteractive({ useHandCursor: true });
        const deleteButtonTextStyle = { fontSize: `${Math.round(14 * this.gridNumberOpScale)}px`, fontFamily: 'Arial', color: '#ffffff' };
       
        deleteButton.on('pointerdown', () => {
            if (this.selectedCell) {
                const { row, col } = this.selectedCell;
                const cell = this.cells[row][col];
                cell.value = null;
                cell.text.setText('');
            }
        });
    }
    
    generatePuzzle() {
        let attempts = 0;
        const maxAttempts = 100; // Prevent infinite loops
        let validPuzzleGenerated = false;
        
        while (!validPuzzleGenerated && attempts < maxAttempts) {
            attempts++;
            
            this.grid = Array.from({ length: this.gridSize }, () => Array(this.gridSize).fill(0));
            
            // Fill the grid with numbers and operators
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
    
            // Validate the generated puzzle
            validPuzzleGenerated = this.validatePuzzle();
            
            if(validPuzzleGenerated) {
                this.calculateResults();
                
                // Verify all results are finite integers
                let allResultsValid = true;
                for(let i = 0; i < this.rowResults.length; i++) {
                    if(!isFinite(this.rowResults[i]) || Math.floor(this.rowResults[i]) !== this.rowResults[i]) {
                        allResultsValid = false;
                        break;
                    }
                }
                
                for(let i = 0; i < this.colResults.length; i++) {
                    if(!isFinite(this.colResults[i]) || Math.floor(this.colResults[i]) !== this.colResults[i]) {
                        allResultsValid = false;
                        break;
                    }
                }
                
                validPuzzleGenerated = allResultsValid;
            }
            
            console.log(`Attempt ${attempts}: Puzzle ${validPuzzleGenerated ? 'valid' : 'invalid'}`);
        }
        
        if (!validPuzzleGenerated) {
            console.error("Failed to generate a valid puzzle after", maxAttempts, "attempts");
            // Fallback to a simple puzzle with only addition
            this.fallbackSimplePuzzle();
        }
        
        console.log("Final puzzle generated:", this.grid);
        
        // Initialize horizontalOps and verticalOps
        this.horizontalOps = Array.from({ length: (this.gridSize)/2}, () => Array((this.gridSize - 4)).fill(null));
        this.verticalOps = Array.from({ length: (this.gridSize - 1)/2 }, () => Array((this.gridSize-4)).fill(null));
    
        // Fill horizontalOps
        for (let row = 0; row < this.gridSize; row += 2) { // Even rows
            for (let col = 1; col < this.gridSize- 1; col += 2) { // Odd columns
                this.horizontalOps[row / 2][(col - 1) / 2] = this.grid[row][col];
            }
        }
    
        // Fill verticalOps
        for (let col = 0; col < this.gridSize; col += 2) { // Even columns
            for (let row = 1; row < this.gridSize- 1; row += 2) { // Odd rows
                this.verticalOps[(row - 1) / 2][col / 2] = this.grid[row][col];
            }
        }
    
        return {
            rowResults: this.rowResults, 
            colResults: this.colResults, 
            grid: this.grid, 
            horizontalOps: this.horizontalOps, 
            verticalOps: this.verticalOps
        };
    }

    fallbackSimplePuzzle() {
        // Create a simple puzzle with only addition and small numbers
        for(let row = 0; row < this.gridSize; row += 2) {
            for(let col = 0; col < this.gridSize; col += 2) {
                if (col < this.gridSize - 1 && row < this.gridSize - 1) {
                    this.grid[row][col] = Phaser.Math.Between(1, 3); // Small positive numbers
                    
                    // Put '+' for all operators
                    if (col < this.gridSize - 2) {
                        this.grid[row][col+1] = '+';
                    }
                    if (row < this.gridSize - 2) {
                        this.grid[row+1][col] = '+';
                    }
                }
            }
        }
        
        // Calculate results for this simple puzzle
        this.calculateResults();
        
        // Verify no negative results
        let foundNegative = false;
        for (let i = 0; i < this.rowResults.length; i++) {
            if (this.rowResults[i] < 0) {
                foundNegative = true;
                this.rowResults[i] = 0;
            }
        }
        
        for (let i = 0; i < this.colResults.length; i++) {
            if (this.colResults[i] < 0) {
                foundNegative = true;
                this.colResults[i] = 0;
            }
        }
        
        if (foundNegative) {
            console.warn("Negative results found in fallback puzzle. Results adjusted to 0.");
        }
    }
    
    getValidNumb(row, col){
        let maxnum = 9;
        let minnum = 0;
    
        // Checks if we have a - in either the line above or column to the left
        let above = row > 0 && this.grid[row-1][col] === '-';
        let behind = col > 0 && this.grid[row][col-1] === '-';
        
        // Will ensure there are no - which result in numbers below 0, to avoid negative numbers
        if(behind){
            // If there's a subtraction to the left, the current number must be <= previous result
            const prevResult = this.calcrow(row, col);
            maxnum = Math.min(prevResult, maxnum);
            
            if(maxnum < 0) {
                console.log("Warning: Preventing negative result from subtraction (left)");
                maxnum = 0; // Clamp to ensure we don't generate negative numbers
            }
        }
        
        if(above){
            // If there's a subtraction above, the current number must be <= previous column result
            const prevResult = this.calccol(row, col);
            maxnum = Math.min(prevResult, maxnum);
            
            if(maxnum < 0) {
                console.log("Warning: Preventing negative result from subtraction (above)");
                maxnum = 0; // Clamp to ensure we don't generate negative numbers
            }
        }
        
        // This restriction only occurs in diff 2
        if(this.difficulty === 2){
            if(row > 0 && this.grid[row-1][col] === 'X'){
                if(this.grid[row-2][col] >= 7){
                    maxnum = Math.min(Math.floor(55/this.grid[row-2][col]), maxnum);
                    if(row > 2 && this.grid[row-3][col] === '-'){
                        // Check if there is a - operation prior to the x to ensure that the result of the x operation will not compromise
                        // the result of the - operation
                        const prevResult = this.calcrow(row-4, col);
                        maxnum = Math.min(Math.floor(prevResult/this.grid[row-2][col]), maxnum);
                        
                        if(maxnum < 0) maxnum = 0;
                    }
                }
                
                if(col > 0 && this.grid[row][col-1] === 'X'){
                    if(this.grid[row][col-2] >= 7){
                        maxnum = Math.min(Math.floor(55/this.grid[row][col-2]), maxnum);
                    }
                    
                    if(col > 2 && this.grid[row][col-3] === '-'){
                        // Check if there is a - operation prior to the x to ensure that the result of the x operation will not compromise
                        // the result of the - operation
                        const prevResult = this.calccol(row, col-4);
                        maxnum = Math.min(Math.floor(prevResult/this.grid[row][col-2]), maxnum);
                        
                        if(maxnum < 0) maxnum = 0;
                    }
                }
            }
        }
        else if(this.difficulty === 3){
            if(col > 3 && this.grid[row][col-3] === '-' && this.grid[row][col-1] === 'X'){
                const prevResult = this.calccol(row, col-4);
                maxnum = Math.min(Math.floor((prevResult+1)/this.grid[row][col-2]), maxnum);
                
                if(maxnum < 0) maxnum = 0;
            }
            
            if(row > 3 && this.grid[row-3][col] === '-' && this.grid[row-1][col] === 'X'){
                const prevResult = this.calcrow(row-4, col);
                maxnum = Math.min(Math.floor((prevResult+1)/this.grid[row-2][col]), maxnum);
                
                if(maxnum < 0) maxnum = 0;
            }
        }
        
        // Ensure maxnum is never negative
        maxnum = Math.max(0, maxnum);
        
        // Make a list of numbers from 0 to maxnum
        let possibleNumbers = [];
        for(let i = 0; i <= maxnum; i++){
            possibleNumbers.push(i);
        }
        
        // Handle division operations to prevent infinite decimals
        if(this.difficulty === 3){
            let divabove = row > 0 && this.grid[row-1][col] === '÷';
            let divbehind = col > 0 && this.grid[row][col-1] === '÷';
            
            if(divabove){
                // Check if the number is divisible by the number above
                let dividend = this.checklastmultdivCol(row-2, col);
                
                // Filter for numbers that can cleanly divide the dividend (avoid 0)
                possibleNumbers = possibleNumbers.filter(num => num > 0 && dividend % num === 0);
            }
            
            if(divbehind){
                let dividend = this.checklastmultdivRow(row, col-2);
                
                // Filter for numbers that can cleanly divide the dividend (avoid 0)
                possibleNumbers = possibleNumbers.filter(num => num > 0 && dividend % num === 0);
            }
        }
        
        // If no possible numbers left (could happen with division constraints)
        if(possibleNumbers.length === 0){
            console.log("No possible numbers with current constraints. Using fallback.");
            // Fallback to numbers that won't cause problems 
            if(this.difficulty === 3 && (row > 0 && this.grid[row-1][col] === '÷' || col > 0 && this.grid[row][col-1] === '÷')){
                return 1; // Safest divisor that won't cause infinity
            } else {
                return 0;
            }
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
        if (list.length === 0) return 0;
        if (list.length === 1) return list[0];
        
        // Make a copy to avoid modifying the original
        let calcList = [...list];
        
        // First pass: handle multiplication and division
        for (let i = 1; i < calcList.length - 1; i += 2) {
            if (calcList[i] === 'X' || calcList[i] === '÷') {
                // For division, ensure we're not dividing by zero
                if (calcList[i] === '÷' && calcList[i+1] === 0) {
                    console.error("Division by zero detected!");
                    calcList[i+1] = 1; // Replace with safe value
                }
                
                // For division, ensure we get an integer result
                if (calcList[i] === '÷' && calcList[i-1] % calcList[i+1] !== 0) {
                    console.error("Non-integer division:", calcList[i-1], "÷", calcList[i+1]);
                    // Adjust the dividend to ensure clean division
                    calcList[i-1] = calcList[i+1] * Math.floor(calcList[i-1] / calcList[i+1]);
                }
                
                let result = this.calculate(calcList[i-1], calcList[i], calcList[i+1]);
                calcList.splice(i-1, 3, result);
                i -= 2; // Adjust index after splicing
            }
        }
        
        // Second pass: handle addition and subtraction with negative number prevention
        let result = calcList[0];
        for (let i = 1; i < calcList.length - 1; i += 2) {
            if (calcList[i] === '-' && result < calcList[i+1]) {
                // This would result in a negative number, so adjust
                console.warn("Preventing negative result:", result, "-", calcList[i+1]);
                calcList[i+1] = result; // Make subtraction result in 0
            }
            result = this.calculate(result, calcList[i], calcList[i+1]);
        }
        
        // Ensure final result is not negative
        return Math.max(0, result);
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
        let result;
        
        switch(operator){
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                // Ensure subtraction never results in negative values
                if (result < 0) {
                    console.warn("Negative result from subtraction detected:", num1, "-", num2);
                    result = 0;
                }
                break;
            case 'X':
                result = num1 * num2;
                break;
            case '÷':
                // Avoid division by zero
                if(num2 === 0) {
                    console.warn("Division by zero prevented");
                    return 0;
                }
                
                // Ensure division results in an integer
                if(num1 % num2 !== 0) {
                    console.warn("Non-integer division:", num1, "÷", num2);
                    // Return the floor of the division to avoid decimals
                    result = Math.floor(num1 / num2);
                } else {
                    result = num1 / num2;
                }
                break;
            default:
                result = 0;
        }
        
        // Final safety check to prevent any negative values
        return Math.max(0, result);
    }

    validatePuzzle() {
        // First, check all division operations as before
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                if (this.grid[row][col] === '÷') {
                    // Check the operands for this division
                    let leftOperand, rightOperand;
                    
                    // For horizontal divisions
                    if (col > 0 && col < this.gridSize - 1 && row % 2 === 0) {
                        leftOperand = this.grid[row][col-1];
                        rightOperand = this.grid[row][col+1];
                        
                        // Avoid division by zero and ensure clean division
                        if (rightOperand === 0 || leftOperand % rightOperand !== 0) {
                            return false;
                        }
                    }
                    
                    // For vertical divisions
                    if (row > 0 && row < this.gridSize - 1 && col % 2 === 0) {
                        leftOperand = this.grid[row-1][col];
                        rightOperand = this.grid[row+1][col];
                        
                        // Avoid division by zero and ensure clean division
                        if (rightOperand === 0 || leftOperand % rightOperand !== 0) {
                            return false;
                        }
                    }
                }
            }
        }
        
        // Now check for negative subtraction results
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                if (this.grid[row][col] === '-') {
                    // Check the operands for this subtraction
                    let leftOperand, rightOperand;
                    
                    // For horizontal subtractions
                    if (col > 0 && col < this.gridSize - 1 && row % 2 === 0) {
                        leftOperand = this.grid[row][col-1];
                        rightOperand = this.grid[row][col+1];
                        
                        // Ensure subtraction doesn't result in negative numbers
                        if (leftOperand < rightOperand) {
                            return false;
                        }
                    }
                    
                    // For vertical subtractions
                    if (row > 0 && row < this.gridSize - 1 && col % 2 === 0) {
                        leftOperand = this.grid[row-1][col];
                        rightOperand = this.grid[row+1][col];
                        
                        // Ensure subtraction doesn't result in negative numbers
                        if (leftOperand < rightOperand) {
                            return false;
                        }
                    }
                }
            }
        }
        
        return true;
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
