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
        // Define grid properties
        this.gridSize = this.size; // All levels use a 3x3 grid based on your image
        this.cellSize = 70; // Adjust based on your game size
        this.cellPadding = 150; // Space between cells for operations
        
        // Calculate starting position for the grid (center of screen)
        const gridWidth = (this.cellSize * this.gridSize) + (this.cellPadding * (this.gridSize - 1));
        const gridHeight = (this.cellSize * this.gridSize) + (this.cellPadding * (this.gridSize - 1));
        const startX = (width * 0.6) - (gridWidth / 2);
        const startY = (height * 0.5) - (gridHeight / 2);
        
        // Create the puzzle
        const puzzle = this.generatePuzzle();
        
        // Store the puzzle components
        this.cells = [];
        this.horizontalOps = [];
        this.verticalOps = [];
        this.rowResults = puzzle.rowResults;
        this.colResults = puzzle.colResults;
        
        // Create the grid cells
        for (let row = 0; row < this.gridSize; row++) {
            this.cells[row] = [];
            this.horizontalOps[row] = [];
            this.verticalOps[row] = [];
            
            for (let col = 0; col < this.gridSize; col++) {
                // Calculate cell position
                const cellX = startX + (col * (this.cellSize + this.cellPadding));
                const cellY = startY + (row * (this.cellSize + this.cellPadding));
                
                let cell;
                // Create the cell (pentagon sprite)
                switch(this.difficulty) {
                case 1:
                    cell = this.add.image(cellX, cellY, "QuadradoNivel1");
                    cell.setScale(0.8); // Adjust scale as needed
                    cell.setInteractive({ useHandCursor: true });
                    break;
                case 2:
                    cell = this.add.image(cellX, cellY, "QuadradoNivel2");
                    cell.setScale(0.8); // Adjust scale as needed
                    cell.setInteractive({ useHandCursor: true });
                    break;
                case 3:
                    cell = this.add.image(cellX, cellY, "QuadradoNivel3");
                    cell.setScale(0.8); // Adjust scale as needed
                    cell.setInteractive({ useHandCursor: true });
                    break;
                default:
                    cell = this.add.image(cellX, cellY, "QuadradoNivel1");
                    cell.setScale(0.8); // Adjust scale as needed
                    cell.setInteractive({ useHandCursor: true });
                }
                // Add number text (initially empty, player will fill)
                const textStyle = { fontSize: '24px', fontFamily: 'Arial', color: '#ffffff' };
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
                if (col < this.gridSize - 1) {
                    const opX = cellX + this.cellSize/2 + this.cellPadding/2;
                    const opY = cellY;
                    
                    const opText = this.add.text(
                        opX, opY, 
                        puzzle.horizontalOps[row][col], 
                        { fontSize: '28px', fontFamily: 'Arial', color: '#ffffff' }
                    ).setOrigin(0.5);
                    
                    this.horizontalOps[row][col] = {
                        text: opText,
                        value: puzzle.horizontalOps[row][col]
                    };
                }
                
                // Add vertical operations (between rows)
                if (row < this.gridSize - 1) {
                    const opX = cellX;
                    const opY = cellY + this.cellSize/2 + this.cellPadding/2;
                    
                    const opText = this.add.text(
                        opX, opY,
                        puzzle.verticalOps[row][col],
                        { fontSize: '28px', fontFamily: 'Arial', color: '#ffffff' }
                    ).setOrigin(0.5);
                    
                    this.verticalOps[row][col] = {
                        text: opText,
                        value: puzzle.verticalOps[row][col]
                    };
                }
            }
            
            // Add row result (at the end of each row)
            const rowResultX = startX + this.gridSize * (this.cellSize + this.cellPadding);
            const rowResultY = startY + (row * (this.cellSize + this.cellPadding));
            
            this.add.text(
                rowResultX - this.cellPadding, rowResultY, 
                '=', 
                { fontSize: '28px', fontFamily: 'Arial', color: '#ffffff' }
            ).setOrigin(0.5);
            
            this.add.text(
                rowResultX, rowResultY,
                puzzle.rowResults[row].toString(),
                { fontSize: '28px', fontFamily: 'Arial', color: '#ffffff' }
            ).setOrigin(0.5);
        }
        
        // Add column results (at the bottom of each column)
        for (let col = 0; col < this.gridSize; col++) {
            const colResultX = startX + (col * (this.cellSize + this.cellPadding));
            const colResultY = startY + this.gridSize * (this.cellSize + this.cellPadding);
            
            this.add.text(
                colResultX, colResultY - this.cellPadding, 
                '=', 
                { fontSize: '28px', fontFamily: 'Arial', color: '#ffffff' }
            ).setOrigin(0.5);
            
            this.add.text(
                colResultX, colResultY,
                puzzle.colResults[col].toString(),
                { fontSize: '28px', fontFamily: 'Arial', color: '#ffffff' }
            ).setOrigin(0.5);
        }
        
        // Setup keyboard for number input
        this.setupNumberInput();
    }
    
    generatePuzzle() {
        // This generates a valid puzzle according to level difficulty
        let grid = [];
        let horizontalOps = [];
        let verticalOps = [];
        
        // Initialize the grid with some numbers
        for (let row = 0; row < this.gridSize; row++) {
            grid[row] = [];
            horizontalOps[row] = [];
            verticalOps[row] = [];
            
            for (let col = 0; col < this.gridSize; col++) {
                // Start with numbers 1-9
                grid[row][col] = Phaser.Math.Between(1, 9);
                
                // Initialize operations based on level
                if (col < this.gridSize - 1) {
                    horizontalOps[row][col] = this.getValidOperation(grid[row][col]);
                }
                
                if (row < this.gridSize - 1) {
                    verticalOps[row][col] = this.getValidOperation(grid[row][col]);
                }
            }
        }
        
        // For level 2, avoid specific multiplications
        if (this.difficulty === 2) {
            this.avoidRestrictedMultiplications(grid, horizontalOps, verticalOps);
        }
        
        // For level 3, ensure valid division results (no decimals)
        if (this.difficulty === 3) {
            this.ensureValidDivisions(grid, horizontalOps, verticalOps);
        }
        
        // Calculate row and column results based on the grid and operations
        let rowResults = [];
        let colResults = [];
        
        // Calculate row results
        for (let row = 0; row < this.gridSize; row++) {
            rowResults[row] = this.calculateResult(
                grid[row],
                horizontalOps[row]
            );
        }
        
        // Calculate column results
        for (let col = 0; col < this.gridSize; col++) {
            const colValues = [];
            const colOps = [];
            
            for (let row = 0; row < this.gridSize; row++) {
                colValues.push(grid[row][col]);
                if (row < this.gridSize - 1) {
                    colOps.push(verticalOps[row][col]);
                }
            }
            
            colResults[col] = this.calculateResult(colValues, colOps);
        }
        
        // Return the complete puzzle
        return {
            grid: grid,
            horizontalOps: horizontalOps,
            verticalOps: verticalOps,
            rowResults: rowResults,
            colResults: colResults
        };
    }
    
    getValidOperation(value) {
        // Get a valid operation based on level
        let operation;
        let isValid = false;
        
        while (!isValid) {
            // Choose random operation from available ones for this level
            const opIndex = Phaser.Math.Between(0, this.operators.length - 1);
            operation = this.operators[opIndex];
            
            // For level 2, check if it's a restricted multiplication
            if (this.difficulty === 2 && operation === '×') {
                const nextValue = Phaser.Math.Between(1, 9);
                const multPair = `${value}×${nextValue}`;
                const reversePair = `${nextValue}×${value}`;
                
                if (this.restrictedMultiplications.includes(multPair) || 
                    this.restrictedMultiplications.includes(reversePair)) {
                    continue; // Try another operation
                }
            }
            
            // For level 3, check if division will result in whole number
            if (this.difficulty === 3 && operation === '÷') {
                const nextValue = Phaser.Math.Between(1, 9);
                if (value % nextValue !== 0) {
                    continue; // Try another operation
                }
            }
            
            isValid = true;
        }
        
        return operation;
    }
    
    avoidRestrictedMultiplications(grid, horizontalOps, verticalOps) {
        // Check and fix any restricted multiplications for Level 2
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                // Check horizontal operations
                if (col < this.gridSize - 1 && horizontalOps[row][col] === '×') {
                    const val1 = grid[row][col];
                    const val2 = grid[row][col + 1];
                    const multPair = `${val1}×${val2}`;
                    
                    if (this.restrictedMultiplications.includes(multPair)) {
                        // Change to addition or subtraction
                        horizontalOps[row][col] = Phaser.Math.RND.pick(['+', '-']);
                    }
                }
                
                // Check vertical operations
                if (row < this.gridSize - 1 && verticalOps[row][col] === '×') {
                    const val1 = grid[row][col];
                    const val2 = grid[row + 1][col];
                    const multPair = `${val1}×${val2}`;
                    
                    if (this.restrictedMultiplications.includes(multPair)) {
                        // Change to addition or subtraction
                        verticalOps[row][col] = Phaser.Math.RND.pick(['+', '-']);
                    }
                }
            }
        }
    }
    
    ensureValidDivisions(grid, horizontalOps, verticalOps) {
        // Ensure division operations result in whole numbers
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                // Check horizontal operations
                if (col < this.gridSize - 1 && horizontalOps[row][col] === '÷') {
                    const val1 = grid[row][col];
                    const val2 = grid[row][col + 1];
                    
                    // If division doesn't yield whole number, adjust the second value
                    if (val1 % val2 !== 0) {
                        // Find a divisor of val1
                        for (let i = 1; i <= 9; i++) {
                            if (val1 % i === 0) {
                                grid[row][col + 1] = i;
                                break;
                            }
                        }
                        
                        // If no valid divisor found, change operation
                        if (val1 % grid[row][col + 1] !== 0) {
                            horizontalOps[row][col] = Phaser.Math.RND.pick(['+', '-', '×']);
                        }
                    }
                }
                
                // Check vertical operations
                if (row < this.gridSize - 1 && verticalOps[row][col] === '÷') {
                    const val1 = grid[row][col];
                    const val2 = grid[row + 1][col];
                    
                    // If division doesn't yield whole number, adjust the second value
                    if (val1 % val2 !== 0) {
                        // Find a divisor of val1
                        for (let i = 1; i <= 9; i++) {
                            if (val1 % i === 0) {
                                grid[row + 1][col] = i;
                                break;
                            }
                        }
                        
                        // If no valid divisor found, change operation
                        if (val1 % grid[row + 1][col] !== 0) {
                            verticalOps[row][col] = Phaser.Math.RND.pick(['+', '-', '×']);
                        }
                    }
                }
            }
        }
    }
    
    calculateResult(values, operations) {
        // Calculate the result of a sequence of operations
        // Following order of operations (PEMDAS)
        
        // Clone arrays to avoid modifying originals
        let nums = [...values];
        let ops = [...operations];
        
        // First do multiplication and division
        for (let i = 0; i < ops.length; i++) {
            if (ops[i] === '×' || ops[i] === '÷') {
                if (ops[i] === '×') {
                    nums[i] = nums[i] * nums[i + 1];
                } else {
                    nums[i] = nums[i] / nums[i + 1];
                }
                
                // Remove the used number and operation
                nums.splice(i + 1, 1);
                ops.splice(i, 1);
                i--; // Adjust index since we removed an item
            }
        }
        
        // Then do addition and subtraction
        let result = nums[0];
        for (let i = 0; i < ops.length; i++) {
            if (ops[i] === '+') {
                result += nums[i + 1];
            } else if (ops[i] === '-') {
                result -= nums[i + 1];
            }
        }
        
        return Math.round(result); // Ensure whole number result
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
    
    setupNumberInput() {
        // Setup keyboard input for numbers
        this.input.keyboard.on('keydown', (event) => {
            // Check if a cell is selected and the key is a number
            if (this.selectedCell && event.key >= '0' && event.key <= '9') {
                const { row, col } = this.selectedCell;
                
                // Update the cell's value and text
                this.cells[row][col].value = parseInt(event.key);
                this.cells[row][col].text.setText(event.key);
                
                // Check if the puzzle is complete
                this.checkPuzzleComplete();
            }
        });
    }
    
    checkPuzzleComplete() {
        // Check if all cells have values
        let allFilled = true;
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                if (this.cells[row][col].value === null) {
                    allFilled = false;
                    break;
                }
            }
        }
        
        if (allFilled) {
            // Check if all rows and columns have correct results
            let correct = true;
            
            // Check rows
            for (let row = 0; row < this.gridSize; row++) {
                const rowValues = [];
                for (let col = 0; col < this.gridSize; col++) {
                    rowValues.push(this.cells[row][col].value);
                }
                
                const rowOps = this.horizontalOps[row].map(op => op.value);
                const result = this.calculateResult(rowValues, rowOps);
                
                if (result !== this.rowResults[row]) {
                    correct = false;
                    break;
                }
            }
            
            // Check columns
            if (correct) {
                for (let col = 0; col < this.gridSize; col++) {
                    const colValues = [];
                    const colOps = [];
                    
                    for (let row = 0; row < this.gridSize; row++) {
                        colValues.push(this.cells[row][col].value);
                        if (row < this.gridSize - 1) {
                            colOps.push(this.verticalOps[row][col].value);
                        }
                    }
                    
                    const result = this.calculateResult(colValues, colOps);
                    
                    if (result !== this.colResults[col]) {
                        correct = false;
                        break;
                    }
                }
            }
            
            if (correct) {
                this.puzzleComplete();
            }
        }
    }
    
    puzzleComplete() {
        // Show success message and handle completion
        const congratsText = this.add.text(
            width / 2, height / 2,
            'Puzzle Complete!',
            { fontSize: '48px', fontFamily: 'Arial', color: '#ffffff', backgroundColor: '#000000' }
        ).setOrigin(0.5).setPadding(20);
        
        // Add a button to return to menu or go to next level
        const nextButton = this.add.text(
            width / 2, height / 2 + 80,
            'Next Level',
            { fontSize: '32px', fontFamily: 'Arial', color: '#ffffff', backgroundColor: '#008800' }
        ).setOrigin(0.5).setPadding(15, 10);
        
        nextButton.setInteractive({ useHandCursor: true });
        nextButton.on('pointerdown', () => {
            // Go to next level or back to menu
            this.scene.start('Menu');
        });
    }
}
