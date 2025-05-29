class Game extends Phaser.Scene{
    constructor(){
        super("Game");
    }
    preload(){
        this.load.image("background", "sprites/background.png");
        this.load.image("Creditos", "sprites/bt_creditos.png");
        this.load.image("Info", "sprites/bt_info.png");
        this.load.image("Top", "sprites/bt_top.png");
        this.load.image("Back", "sprites/back-bt.png");
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
        this.load.image("Amend", "sprites/corrige.png");
        this.load.image("Verify", "sprites/verifica.png");
        this.load.image("Check", "sprites/btok.png");
        this.load.image("Error", "sprites/btnotok.png");
        this.load.image("Retry", "sprites/refresh-bt.png");
    }
    
    init(data){
        this.difficulty = data.difficulty;
        this.size = data.size;
        this.gridSize = data.size * 2; // Adjusted for the grid size
        this.scaleFactor = 0.9;
        this.totalattempts = 0;
        switch(this.difficulty) {
            case 1: // Level 1: only addition and subtraction
                this.operators = ['+', '-'];
                break;
            case 2: // Level 2: add, subtract, multiply
                this.operators = ['+', '-', '×'];
                break;
            case 3: // Level 3: all operations
                this.operators = ['+', '-', '×', '÷'];
                break;
            default: // Defaults to level 1 in case of an unpredicted error
                this.operators = ['+', '-']; 
        }
    }

    create(){
        //console.log(infoUser);
        width = game.config.width;
        height = game.config.height;
        //console.log("Game scene created with difficulty:", this.difficulty, "and size:", this.size);

        // Loading Assets
        // Background
        this.background = this.add.sprite(width * 0.5, height * 0.5, "background");
        this.background.setScale(1.5);
        this.background.baseScale = 1.5;

        // Fullscreen/Maximize Button
        this.maxBT = this.add.image(width * 0.065, height * 0.1, "Maximizar");
        this.maxBT.setScale(scale);
        this.maxBT.baseScale = 0.9;
        this.maxBT.setInteractive({ useHandCursor: true });
        // Minimize Button
        this.minBT = this.add.image(width * 0.065, height * 0.1, "Minimizar");
        this.minBT.visible = false;
        this.minBT.setScale(scale);
        this.minBT.baseScale = 0.9;
        this.minBT.setInteractive({ useHandCursor: true });
        
        // Amend Button
        this.amendBT = this.add.image(width * 0.32, height * 0.81, "Amend");
        this.amendBT.setScale(0.68);
        this.amendBT.baseScale = 0.68;
        this.amendBT.setTint(0x808080).setAlpha(0.5);
        // Back Button
        this.backBT = this.add.image(width * 0.24, height * 0.85, "Back");
        this.backBT.setScale(scale);
        this.backBT.baseScale = 0.9;
        this.backBT.setInteractive({ useHandCursor: true });
        // Regenerate Button
        this.regenBT = this.add.image(width * 0.90, height * 0.15, "Retry");
        this.regenBT.setScale(scale);
        this.regenBT.baseScale = 0.9;
        this.regenBT.setInteractive({ useHandCursor: true });

        // Info Menu Button
        this.infoBT = this.add.image(width * 0.16, height * 0.89, "Info");
        this.infoBT.setScale(scale);
        this.infoBT.baseScale = 0.9;
        this.infoBT.setTint(0x808080).setAlpha(0.5);
        // Credits Menu Button
        this.credBT = this.add.image(width * 0.08, height * 0.93, "Creditos");
        this.credBT.setScale(scale);
        this.credBT.baseScale = 0.9;
        this.credBT.setTint(0x808080).setAlpha(0.5);
        
        // Check and Cross marks
        this.check = this.add.image(width * 0.9, height * 0.85, "Check").setScale(0.9);
        this.check.visible = false;
        this.incorrect = this.add.image(width * 0.9, height * 0.85, "Error").setScale(0.9);
        this.incorrect.visible = false;

        // Hello Message (Displays User's Rating %)
        this.hellomessage = this.add.text(0.135 * game.config.width, 0.09 * game.config.height, "Olá "+ infoUser.firstName.split(" ")[0],{ fontFamily: 'font1',fontSize: 40,color: '#ffffff',align: 'center'});
        this.hellomessage.visible = false;

        // Functionality For The Buttons
        // Button Presses
        this.credBT.on('pointerdown', () => {
            this.scene.start("creditos");
        });
        this.backBT.on('pointerdown', () => {
            this.clearSelectedCell();
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
        this.regenBT.on('pointerdown', () => {
            this.clearGrid();
            this.createCrucigrama();
            this.amendBT.disableInteractive();
            this.amendBT.setTint(0x808080).setAlpha(0.5);
            this.incorrect.visible = false;
            this.check.visible = false;
            this.totalattempts = 0;
            this.verifyButton.setInteractive({ useHandCursor: true });
        });
        // Hover Animation For The Buttons
        this.input.on('gameobjectover', function (pointer, gameObject) {
            if (gameObject === this.amendBT ){
                if (this.totalattempts === 3){
                    gameObject.setScale(gameObject.baseScale + 0.05);
                }
            } else if (gameObject === this.verifyButton ){
                if (this.totalattempts < 3){
                    gameObject.setScale(gameObject.baseScale + 0.05);
                }
            } else if (gameObject.baseScale !== undefined) {
                gameObject.setScale(gameObject.baseScale + 0.05);
            } else {
                gameObject.setScale(scaleFactor + 0.05);
            }
        }, this);
        this.input.on('gameobjectout', function (pointer, gameObject) {
            if( gameObject === this.amendBT){
                if (this.totalattempts === 3){
                    gameObject.setScale(gameObject.baseScale);
                }
            } else if (gameObject.baseScale !== undefined) {
                gameObject.setScale(gameObject.baseScale);
            } else {
                gameObject.setScale(scaleFactor);
            }
        }, this);
        
        // Functions Called to generate the Crucigram 
        this.createCrucigrama();    
        // and create the keyboard on the left-hand side 
        this.createVirtualKeyboard();
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
        } else {
            this.hellomessage.visible = false;
        }
    }
    
    isPrime(n) {
        // Function to check whether or not a number is prime
        // Used for Division restrictions 
        if (n <= 1) return false;
        if (n <= 3) return true;
        if (n % 2 === 0 || n % 3 === 0) return false;
        for (let i = 5; i * i <= n; i += 6) {
            if (n % i === 0 || n % (i + 2) === 0) return false;
        }
        return true;
    }


    createCrucigrama() {
        // This Function handles the creation of the grid's elements, calling generatePuzzle()
        // afterwards to create the puzzle itself
        this.cellSize = 70;
        this.cellPadding = 150;
        // GridExtras is used to store visual add-on's that are to be removed 
        // in the event of a regeneration/etc...
        this.gridExtras = [];

        // Adjusting parameters bazed on the grid size (3x3, 4x4 or 5x5)
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
        this.cellSize *= this.gridScale;
        this.cellPadding *= this.gridScale;
        // Calculate starting position for the grid (center of screen)
        const gridWidth = ((this.cellSize * this.size) + (this.cellPadding * (this.size - 1)));
        const gridHeight = ((this.cellSize * this.size) + (this.cellPadding * (this.size - 1)));
        const startX = (width * 0.66) - (gridWidth / 2);
        const startY = (height * 0.5) - (gridHeight / 2);
        
        // Create the puzzle
        const puzzle = this.generatePuzzle();
        //console.log("Generating Puzzle");
        // UserGrid is used to store the user's answers without overwriting 
        // the puzzle that was previously generated
        this.userGrid = Array.from({ length: this.gridSize }, (_, row) =>
            Array.from({ length: this.gridSize }, (_, col) => {
                // Copy numbers and operations from the game grid
                if (typeof this.grid[row][col] === 'number' || typeof this.grid[row][col] === 'string') {
                    return this.grid[row][col];
                }
                return null; // Empty cells for user input
            })
        );
        //console.log("UserGrid", this.userGrid); 
        
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
                let cell;
                let response = null;
                
                // Calculate cell position
                const cellX = startX + (col * (this.cellSize + this.cellPadding));
                const cellY = startY + (row * (this.cellSize + this.cellPadding));

                // Create each cell (with the correct coloured pentagon) 
                switch(this.difficulty) {
                case 1:
                    cell = this.add.image(cellX, cellY, "QuadradoNivel1");
                    break;
                case 2:
                    cell = this.add.image(cellX, cellY, "QuadradoNivel2");
                    break;
                case 3:
                    cell = this.add.image(cellX, cellY, "QuadradoNivel3");
                    break;
                default:
                    cell = this.add.image(cellX, cellY, "QuadradoNivel1");
                }
                cell.setScale(0.8 * this.gridScale);
                cell.baseScale = 0.8 * this.gridScale;
                cell.setInteractive({ useHandCursor: true });
                // Add text formatting for cells
                const textStyle = { fontSize: `${Math.round(24 * this.gridNumberOpScale)}px`, fontFamily: 'Arial', color: '#ffffff' };
                const cellText = this.add.text(cellX, cellY, '', textStyle).setOrigin(0.5);
                
                // Store references to cell elements
                this.cells[row][col] = {
                    sprite: cell,
                    text: cellText,
                    value: null, // Player's answer for this cell
                    correctValue: puzzle.grid[row*2][col*2], // Stores possible answer for this cell (Generated on generatePuzzle())
                    CellX: cellX,
                    CellY: cellY,
                    Response: response,
                };
                // Add cell selection handling
                cell.on('pointerdown', () => {
                    this.selectCell(row, col);
                });
                
                // Add operation's text
                if (col < this.size - 1) { // Text between columns 
                    const opX = cellX + this.cellSize/2 + this.cellPadding/2;
                    const opY = cellY;
                    
                    const opText = this.add.text(
                        opX, opY, 
                        puzzle.horizontalOps[row][col], 
                        { fontSize: `${Math.round(24 * this.gridNumberOpScale)}px`, fontFamily: 'Arial Black', color: '#ffffff' }
                    ).setOrigin(0.5);
                    
                    this.horizontalOps[row][col] = {
                        text: opText,
                        value: puzzle.horizontalOps[row][col]
                    };
                }
                if (row < this.size - 1) { // Text between rows
                    const opX = cellX;
                    const opY = cellY + this.cellSize/2 + this.cellPadding/2;
                    
                    const opText = this.add.text(
                        opX, opY,
                        puzzle.verticalOps[row][col],
                        { fontSize: `${Math.round(24 * this.gridNumberOpScale)}px`, fontFamily: 'Arial Black', color: '#ffffff' }
                    ).setOrigin(0.5);
                    
                    this.verticalOps[row][col] = {
                        text: opText,
                        value: puzzle.verticalOps[row][col]
                    };
                }
            }
            
            // Add result at the end of each row
            const rowResultX = startX + (this.size * 1.1) * (this.cellSize + this.cellPadding);
            const rowResultY = startY + (row * (this.cellSize + this.cellPadding));
            let rowResultsAux = 0;
            let row_equals = 0;
            if (this.size === 3){
                rowResultsAux = 90;
                row_equals = 10;
            } else if (this.size === 4){
                rowResultsAux = 90;
                row_equals = 20;
            } else {
                rowResultsAux = 90;
                row_equals = 40;
            }
            // Text Formatting ^^^^^^^^^
            const equalsText = this.add.text(
                rowResultX - this.cellPadding - row_equals, rowResultY, 
                '=', 
                { fontSize: `${Math.round(24 * this.gridNumberOpScale)}px`, fontFamily: 'Arial Black', color: '#ffffff' }
            ).setOrigin(0.5);
            const resultText = this.add.text(
                rowResultX-rowResultsAux, rowResultY,
                puzzle.rowResults[row].toString(),
                { fontSize: `${Math.round(24 * this.gridNumberOpScale)}px`, fontFamily: 'Arial Black', color: '#ffffff' }
            ).setOrigin(0.5);

            this.gridExtras.push(equalsText, resultText); // Adds extra to gridExtras so it can be easily removed later
        }
        
        // Add result at the end of each column
        for (let col = 0; col < this.size; col++) {
            const colResultX = startX + (col * (this.cellSize + this.cellPadding));
            const colResultY = startY + (this.size * 1.1) * (this.cellSize + this.cellPadding);
            let colResultsAux = 0;
            let col_equals = 0;
            if (this.size === 3){
                colResultsAux = 90;
                col_equals = 10;
            } else if (this.size === 4){
                colResultsAux = 90;
                col_equals = 20;
            } else {
                colResultsAux = 90;
                col_equals = 40;
            }
            // Text Formatting ^^^^^^^^^
            const equalsText = this.add.text(
                colResultX, colResultY - this.cellPadding-col_equals , 
                '=', 
                { fontSize: `${Math.round(24 * this.gridNumberOpScale)}px`, fontFamily: 'Arial Black', color: '#ffffff' }
            ).setOrigin(0.5).setAngle(90);
            const resultText = this.add.text(
                colResultX, colResultY-colResultsAux,
                puzzle.colResults[col].toString(),
                { fontSize: `${Math.round(24 * this.gridNumberOpScale)}px`, fontFamily: 'Arial Black', color: '#ffffff' }
            ).setOrigin(0.5);

            this.gridExtras.push(equalsText, resultText); // Adds extra to gridExtras so it can be easily removed later
        }

        let filledCells = 0; 
        // Matrix used to easily define and access amount of cells that have to be filled
        // for each size and difficulty possibility numbersToFill[0][2] is how many cells 
        // we have to fill for a difficulty_1 size_5x5 grid ...
        const numbersToFill = [[4,6,9],
                               [3,5,8],
                               [3,4,7]]; 

        while (filledCells < numbersToFill[this.difficulty-1][this.size-3]) {
            const row = Phaser.Math.Between(0, this.size - 1);
            const col = Phaser.Math.Between(0, this.size - 1);
            // Ensures only valid and unfilled cells are filled in
            if (typeof this.cells[row][col].correctValue === 'number') {
                const cell = this.cells[row][col];
                if (cell.value === null) {
                    cell.value = cell.correctValue;
                    cell.text.setText(cell.correctValue.toString());
                    cell.sprite.disableInteractive(); // Disables cell interaction as it's now locked
                    cell.locked = true;
                    filledCells++;
                }
            }
        }
    }

    createVirtualKeyboard(){
        // This function creates the keyboard on the left-hand side and adds its functionality
        // Formatting
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
                numberButton.baseScale=0.5;
                const buttonTextStyle = { fontSize: `${Math.round(28 * this.gridNumberOpScale)}px`, fontFamily: 'Arial', color: '#ffffff' };
                
                // Handles keyboard button presses
                numberButton.on('pointerdown', () => {
                    if (this.selectedCell) {
                        const { row: cellRow, col: cellCol } = this.selectedCell;
                        const cell = this.cells[cellRow][cellCol];
                
                        // Get cell's current value ('' if null)
                        let currentValue = '';
                        if (cell.value !== null) {
                            currentValue = cell.value.toString();
                        }
                        
                        // Stop user from inputting values with more than 2 digits (e.g. 100)
                        if (currentValue.length < 2) {
                            // Concats new button press to previous button presses
                            const newValue = currentValue + numbers[row][col].toString();
                
                            // Update cell's number
                            cell.value = parseInt(newValue, 10);
                            cell.text.setText(newValue);
                            this.userGrid[cellRow*2][cellCol*2] = cell.value;
                            //console.log("Grid updated:", this.userGrid);
                            //console.log("Value defined:", cell.value);
                        } else {
                            //console.log("Two Digit limit reached.");
                        }
                    }
                });
            }
        }
        
        // Delete Button for clearing cells,
        const deleteButtonX = keyboardX + (2 * (buttonSize + buttonPadding));
        const deleteButtonY = keyboardY + (3 * (buttonSize + buttonPadding));
        const deleteButton = this.add.image(deleteButtonX, deleteButtonY, "Apagar").setScale(0.5).setInteractive({ useHandCursor: true });
        deleteButton.baseScale = 0.5;
        const deleteButtonTextStyle = { fontSize: `${Math.round(14 * this.gridNumberOpScale)}px`, fontFamily: 'Arial', color: '#ffffff' };
        deleteButton.on('pointerdown', () => {
            if (this.selectedCell) {
                const { row, col } = this.selectedCell;
                const cell = this.cells[row][col];
                cell.value = null;
                cell.text.setText('');
            }
        });
        // Verify Button to verify current answers
        const verifyButtonX = keyboardX + (0.03 * (buttonSize + buttonPadding));
        const verifyButtonY = keyboardY + (3 * (buttonSize + buttonPadding));
        this.verifyButton = this.add.image(verifyButtonX, verifyButtonY, "Verify").setScale(0.6).setInteractive({ useHandCursor: true });
        this.verifyButton.baseScale=0.6;
        this.verifyButton.on('pointerdown', () => {
            if (this.validateUserSolution()) {
                //console.log("Congrats! You have correctly solved the puzzle.");
            } else {
                this.totalattempts += 1;
                if(this.totalattempts === 3){
                    this.amendBT.clearTint().setAlpha(1);
                    this.amendBT.setInteractive({ useHandCursor: true });
                }
                //console.log("Incorrect Solution. Try again.", this.totalattempts);
            }
        });
        // Amend Button show user correct answers
        this.amendBT.on('pointerdown', () => {
            for (let row = 0; row < this.size; row++){
                for (let col = 0; col < this.size; col++){  
                    if (!this.cells[row][col].locked){
                        this.cells[row][col].text.setText(this.cells[row][col].correctValue.toString());
                        if (this.cells[row][col].Response !== undefined && this.cells[row][col].Response !== null){
                            //console.log(this.cells[row][col].Response);
                            this.cells[row][col].Response.visible = false;
                            this.cells[row][col].Response.destroy(); 
                        }
                        this.cells[row][col].locked = true;
                        this.cells[row][col].sprite.disableInteractive();
                    }
                }
            }
            // Only works once ( or until puzzle regenerated )
            this.amendBT.disableInteractive();
            this.clearSelectedCell();
            this.amendBT.setTint(0x808080).setAlpha(0.5);
        });
    }
    
    validateUserSolution() {
        // Checks whether or not a user's answer is correct
        // Ensures even non expected answers can be validated 
        let isValid = true;
        this.clearSelectedCell();
        const userRowResults = [];
        const userColResults = [];
        
        if (this.isGridComplete()){
            // If the grid is full, meaning the user has given a full answer attempt to calculate
            // each column and row's result to compare afterwards with the real (correct) results
            // if this check returns true, even if the solution the user provided is not equal to 
            // the one we generated, it will be recognized as a correct answer
            for (let row = 0; row < this.gridSize; row += 2) { // Only even rows
                const expression = [];
                for (let col = 0; col < this.gridSize - 1; col++) {
                    expression.push(this.userGrid[row][col]);
                }
                const result = this.calculateVector(expression);
                userRowResults.push(result);
            }
            for (let col = 0; col < this.gridSize; col += 2) { // Only even columns
                const expression = [];
                for (let row = 0; row < this.gridSize - 1; row++) {
                    expression.push(this.userGrid[row][col]);
                }
                const result = this.calculateVector(expression);
                userColResults.push(result);
            }
            const rowsMatch = JSON.stringify(userRowResults) === JSON.stringify(this.rowResults);
            const colsMatch = JSON.stringify(userColResults) === JSON.stringify(this.colResults);
            
            if (rowsMatch && colsMatch) {
                // Lock the cells that are correct
                for (let row = 0; row < this.size; row++) {
                    for (let col = 0; col < this.size; col++) {
                        if (!this.cells[row][col].locked) {
                            this.cells[row][col].locked = true;
                            this.createCheck(row, col);
                        }
                    }
                }
                this.createCheckErr(isValid);
                this.verifyButton.disableInteractive();
                saveScore("+", "Nivel: " + this.difficulty + " Quadro: " + this.size + "×" + this.size);
                //console.log("User solution is correct!");
                return true;
            }
        }
        // If the grid is not full (we can rule out the possibility in which a user has given us an
        // alternative answer to the one we generated) we will now simply compare each cell to the
        // cell values we generated and show the user any correct/incorrect cells based on whether or
        // not they're the same as correctValue
        // We also reach this ("else" case) when even if the grid is full the user provided results
        // and our generated ones do not match up
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                if (!this.cells[row][col].locked) {
                    if (this.cells[row][col].value !== null && !this.cells[row][col].locked){
                        if (this.cells[row][col].correctValue === this.cells[row][col].value){
                            this.cells[row][col].locked = true;
                            this.createCheck(row, col);
                        } else {
                            this.createErr(row, col);
                            isValid = false;
                        }
                    } else {
                        isValid = false;
                    }
                }
            }
        }
        this.createCheckErr(isValid);
        //console.log("User solution is incorrect.");
        saveScore("-", "Nivel: " + this.difficulty + " Quadro: " + this.size + "×" + this.size);
        //console.log("Expected row results:", this.rowResults, "User row results:", userRowResults);
        //console.log("Expected column results:", this.colResults, "User column results:", userColResults);
        return false;
    }

    isGridComplete(){   // Check whether or not the grid is complete
        for (let row = 0; row < this.size; row++){
            for (let col = 0; col < this.size; col++){
                if (this.cells[row][col].value === null){
                    //console.log("Grid not complete yet!");
                    return false;
                }
            }
        }
        //console.log("Grid complete!");
        return true;
    }

    // createCheckErr createCheck and createErr are responsible for creating feedback for the user
    // on whether or not they were correct or incorrect (per-cell and gamewide )
    createCheckErr(isValid) {
        if (isValid){
            this.check.visible = true;
            this.incorrect.visible = false;
        } else {
            this.incorrect.visible = true;
            this.check.visible = false;
        }
    }
    createCheck(row, col) {
        // Creates checkmarks for correct answers
        let cellX = this.cells[row][col].CellX;
        let cellY = this.cells[row][col].CellY;
        let scale;
        if (this.size === 3){
            cellX += 65;
            cellY -= 50;
            scale = 0.40;
        } else if (this.size === 4){
            cellX += 60;
            cellY -= 40;
            scale = 0.30;
        } else {
            cellX += 40;
            cellY -= 30;
            scale = 0.25;
        }

        if (this.cells[row][col].Response){
            this.cells[row][col].Response.destroy();
            this.cells[row][col].Response = null;
        }
        this.cells[row][col].Response = this.add.image(cellX, cellY, "Check").setScale(scale);
        //console.log("Check created at:", cellX, cellY);
    }
    createErr(row, col) {
        // Creates crossmarks for incorrect answers
        let cellX = this.cells[row][col].CellX;
        let cellY = this.cells[row][col].CellY;
        let scale;
        if (this.size === 3){
            cellX += 65;
            cellY -= 50;
            scale = 0.40;
        } else if (this.size === 4){
            cellX += 60;
            cellY -= 40;
            scale = 0.30;
        } else {
            cellX += 40;
            cellY -= 30;
            scale = 0.25;
        }
        if(!this.cells[row][col].Response){
            this.cells[row][col].Response = this.add.image(cellX, cellY, "Error").setScale(scale);
            //console.log("Error created at:", cellX, cellY);
        } else {
            //console.log("Error already exists");
        }
    }

    generatePuzzle() { // Generates puzzle ensuring restrictions
        // Values used to cap the amount of retries when regenerating a bad puzzle
        let attempts = 0;
        const maxAttempts = 5; // Simply used as fallback in case something unexpected happens
        let validPuzzleGenerated = false;
        
        while (!validPuzzleGenerated && attempts < maxAttempts) {
            // Each iteration of this while represents a new generation
            // We start off by defining a "target" number per row and per column which will be stored in this.grid's
            // last position (for the row/col), this number will come in handy later when defining the rest of the puzzle 
            attempts++;
            
            // Fill the grid with numbers and operators
            // Defining important numbers first 
            this.grid = Array.from({ length: this.gridSize }, () => Array(this.gridSize).fill(null));
            for (let i = 0; i < this.gridSize; i += 2) {
                this.grid[i][this.gridSize - 1] = Phaser.Math.Between(10, 90); // Row target
                this.grid[this.gridSize - 1][i] = Phaser.Math.Between(10, 90); // Column target
            }
            // Then adding valid numbers and valid operators ensuring never to go above or below max and min numbers
            // Always ensuring what is added next will not hinder what comes prior, always* resulting in a valid grid
            // (*) according to the programmed restrictions 
            for(let row = 0; row < this.gridSize-1; row++){
                for(let col = 0; col < this.gridSize-1; col++){
                    if(row % 2 === 0){
                        if(col % 2 === 0){
                            this.grid[row][col] = this.getValidNumb(row, col);
                        }else{
                            this.grid[row][col] = this.getValidOp(row, col); 
                        }
                    }else{
                        if(col % 2 === 0){
                            this.grid[row][col] = this.getValidOp(row, col); 
                        }else{
                            this.grid[row][col] = null;
                        }
                    }
                }
            }
            // CHECK
            // Validate the generated puzzle, Forcing a regeneration if it's not valid
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
            
            //console.log(`Attempt ${attempts}: Puzzle ${validPuzzleGenerated ? 'valid' : 'invalid'}`);
        }


        // If we fail to generate a puzzle with our restrictions within maxAttempts we default to our fallBackSimplePuzzle
        if (!validPuzzleGenerated) {
            //console.error("Failed to generate a valid puzzle after", maxAttempts, "attempts");
            // Fallback to a simple puzzle with only addition
            this.fallbackSimplePuzzle();
        }

        
        //console.log("Final puzzle generated:", this.grid);
        
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
        // Create a simple puzzle with only addition and small numbers (Should not be necessary but here as Failsafe)
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
            //console.warn("Negative results found in fallback puzzle. Results adjusted to 0.");
        }
    }
    
    getValidNumb(row, col){
        // Applies the restrictions to pick a number that will ensure nothing that has been generated
        // prior will need to be changed or possibly break our requisites for that difficulty 
        let maxnum = 99;
        let minnum = 0;
        let prevResult;
        let expression;

        // Checks if we have a - or a + in both the line above and column to the left
        let abovesub = row > 0 && this.grid[row-1][col] === '-';
        let behindsub = col > 0 && this.grid[row][col-1] === '-';
        let abovesum = row > 0 && this.grid[row-1][col] === '+';
        let behindsum = col > 0 && this.grid[row][col-1] === '+';
        
        // We must NEVER allow the current result ( result of a part of a line ) 
        // To go bellow 0;
        // To go above 100;
        // Become a non-Int;

        if(behindsub){
            // If there's a subtraction to the left, the current number must be <= previous result
            expression = this.getExpressionSlice(row, col, true);
            prevResult = this.calculateVector(expression);
            maxnum = Math.min(prevResult-1, maxnum);
            
            if(maxnum < 0) {
                //console.log("Warning: Preventing negative result from subtraction (left)");
                maxnum = 0; // Ensure we don't generate negative numbers
            }
        }else if(behindsum){
            // If there's a sum behind, prevResult+currentNum<99 must be true thus, maxNum<(99-prevResult)
            expression = this.getExpressionSlice(row, col, true);
            prevResult = this.calculateVector(expression);
            maxnum = Math.min(99-prevResult, maxnum);
        }
        if(abovesub){
            // If there's a subtraction above, the current number must be <= previous result
            expression = this.getExpressionSlice(row, col, false);
            prevResult = this.calculateVector(expression);
            maxnum = Math.min(prevResult-1, maxnum);
            //console.log("above sub", expression, prevResult, row, col);
            if(maxnum < 0) {
                //console.log("Warning: Preventing negative result from subtraction (above)");
                maxnum = 0; // Clamp to ensure we don't generate negative numbers
            }
        }else if(abovesum){
            // If there's a sum above, prevResult+currentNum<99 must be true thus, maxNum<(99-prevResult)
            expression = this.getExpressionSlice(row, col, false);
            prevResult = this.calculateVector(expression);
            maxnum = Math.min(99-prevResult, maxnum);
        }
        // Above restriction handles cases for - and + right behind or above

        // This next restriction only occurs in diff 2
        if(this.difficulty === 2 || this.difficulty === 3){
            // In diff 2 we can't allow multiplications that result in numbers above 55
            // Thus ensure (assuming no numbers higher than 9 will have multiplications beside them)
            // when multiplied these numbers dont result in anything higher than 55
            if(row > 0 && this.grid[row-1][col] === '×'){
                expression = this.getExpressionSlice(row, col, false);
                maxnum = Math.min(this.getMaxMultNumber(expression),maxnum);
            }
            if(col > 0 && this.grid[row][col-1] === '×'){
                expression = this.getExpressionSlice(row, col, true);
                maxnum = Math.min(this.getMaxMultNumber(expression),maxnum);
            }
        }

        // Make a list with all the numbers allowed (Based on current maxnum) so we can use filters
        let possibleNumbers = [];
        for(let i = 1; i <= maxnum; i++){
            possibleNumbers.push(i);
        }

        if(this.difficulty === 3) {
            // In diff 3 we follow the same restriction as diff 2 allowing and making sure we handle cases
            // in which we deal with numbers higher than 10 while not allowing them to be over 100 after 
            // being multiplied, also add restrictions to ensure no divisions that result in non-ints
            // Mults were already handled in the prior if, handle the divisions here
            if(row > 1 && this.grid[row-1][col] === '÷'){
                // When in a division we must simply ensure the numbers we're allowing
                // wont result in non-ints and ensure no number added after a '÷' is higher than 10
                expression = this.getExpressionSlice(row-1, col, false);
                let dividend = this.checklastmultdiv(expression);
                possibleNumbers = possibleNumbers.filter(num => num > 1 && dividend % num === 0 && num < 10);
            }
            if(col > 1 && this.grid[row][col-1] === '÷'){
                expression = this.getExpressionSlice(row, col-1, true);
                let dividend = this.checklastmultdiv(expression);
                possibleNumbers = possibleNumbers.filter(num => num > 1 && dividend % num === 0 && num < 10);
            }
        }

        // If no possible numbers left (Should not happen but here as Failsafe)
        if(possibleNumbers.length === 0){
            //console.log("No possible numbers with current constraints. Using fallback.");
            // Fallback to numbers that won't cause problems 
            if(this.difficulty === 3 && (row > 0 && this.grid[row-1][col] === '÷' || col > 0 && this.grid[row][col-1] === '÷')){
                return 1; // Safest divisor that won't cause infinity
            } else {
                return 0;
            }
        }
        
        // Picks out of the available numbers
        let num = Phaser.Math.RND.pick(possibleNumbers);
        return num;
    }

    getMaxMultNumber(expression){
        // getMaxMultNumber takes an expression(row or column we're analyzing) and firstly checks what the highest 
        // number we can use is without of course selecting a number that would result in our expression's result  
        // going over our "maxmul" threshhold
        let maxmul;
        let maxnum = 99;
        switch (this.difficulty) {
            case 2:
                maxmul = 55;
            case 3:
                maxmul = 90;
        }
        maxnum = Math.min(Math.floor(maxmul/this.checklastmultdiv(expression)), maxnum);
        if ( expression.length > 3 ) { 
            let priornum = this.checkfirstexpression(expression);
            let priorop = this.prevNonMulOperator(expression);
            let mfactor = this.checklastmultdiv(expression);
            // Here we aim to separate our expression into two parts 
            // The priornum, which is the result of all the operations leading up to 
            // priorop, which is the last operation (besides any '÷' or '×')
            // after priorop we have mfactor which will be the number we'll be multiplying by.
            // Here we ensure that if we're increasing our overall result, this won't go over 100
            // And that if we're reducing our overall result, this won't knock it below 0
            switch (priorop){
                case '+':
                    maxnum = Math.min(Math.floor((100 - priornum) / mfactor),maxnum);
                case '-':  
                    maxnum = Math.min(Math.floor(priornum / mfactor),maxnum);
            }
        }
        return maxnum;
    }

    getExpressionSlice(row, col, line){
        // Simply takes a coordinate, a flag which tells it if we're working with a row or a column
        // and based on the flag transforms the row/column up until those coordinates into a list we
        // can use for our other checks
        let expression = [];
        if (line) {
            expression = this.grid[row].slice(0, col);
        } else {
            for (let i = 0; i < row; i++) {
                expression.push(this.grid[i][col]);
            }
        }
        return expression;
    }

    checklastmultdiv(expression){
        // Used to get the result of the last set of uninterrupted multiplications/divisions
        let result = 0;
        let subExpression = [...expression];
        for (let i = expression.length; i >= 0; i--) {
            if (subExpression[i] === '-' || subExpression[i] === '+') {
                // We found a + or - operation, we can now calculate the result of the last multiplication/division
                subExpression = subExpression.slice(i + 1, subExpression.length);
                break;
            }
        }
        result = this.calculateVector(subExpression);
        return result;
    }

    checkfirstexpression(expression){
        // Similar to checklastmultdiv but for the start of the expression, thus giving us the result of 
        // the expression besides the last bit that checklastmultdiv would calculate
        let result = 0;
        let subExpression = [...expression];
        for (let i = expression.length; i >= 0; i--) {
            if (expression[i] === '-' || expression[i] === '+') {
                // We found a + or - operation, we can now calculate the result of everything beside the last multiplication/division
                subExpression = subExpression.slice(0,i + 1);
                break;
            }
        }
        result = this.calculateVector(expression);
        return result;
    }

    prevNonMulOperator(expression){
        for (let i = expression.length; i >= 0; i--) {
            if (expression[i] === '-' || expression[i] === '+') {
                // We found a + or - operation, return it
                return expression[i];
            }
        }
        return '+';
    }

    calculateVector(list) {
        // This function will calculate the result of a list of ints and operators making sure to multiply and divide first
        if (list.length === 0) return 0;
        if (list.length === 1) return list[0];
        
        let calcList = [...list];
        
        // First pass: handle multiplication and division
        for (let i = 1; i < calcList.length - 1; i += 2) {
            if (calcList[i] === '×' || calcList[i] === '÷') {
                let result = this.calculate(calcList[i-1], calcList[i], calcList[i+1]);
                calcList.splice(i-1, 3, result);
                i -= 2; // Steps of 2 instead of one as we only need the operators
            }
        }
        
        // Second pass: handle addition and subtraction with negative number prevention
        let result = calcList[0];
        for (let i = 1; i < calcList.length - 1; i += 2) {
            result = this.calculate(result, calcList[i], calcList[i+1]);
        }
        
        // Ensure final result is not negative
        return Math.max(0, result);
    }
    
    getValidOp(row, col){
        let size = this.gridSize;
        let line = (row % 2 === 0); // Flag to know whether we're in a row or column 
        let wantedresult = 0;
        let availableOps = [...this.operators];  
        let flipped = false;
        let expression = this.getExpressionSlice(row, col,  line);
        let currentresult = this.calculateVector(expression);

        // Uses the "wanted" result, at the end of each line/column, when we compare the current result of this line to the wanted
        // result we will pick if we want to inflate our current result or if we want to deflate it.
        // E.G. Our current line is 10+11, we want to add an operator next to the the number 11, we will now check our wanted result,
        // let's assume it's 34, sense our current result (21) is lower than our wanted result, we will attempt to inflate our current
        // result, to do this we will select an operator from the list ['+','×']
        if(line){
            wantedresult = this.grid[row][size-1];
        } else {
            wantedresult = this.grid[size-1][col];
        }
        if(expression.length > 2 && expression[expression.length-2]==='-'){
            // Flipped is a flag that helps us deal with the case in which we have X-Y, which means we can't place a multiplication after Y
            // as we would be lowering the result further. Thus it "flips" the behaviour of the function inverting which list of operators 
            // we pick from
            flipped = true;
        }

        if(currentresult<=wantedresult){
            if(!flipped){
                availableOps = availableOps.filter(op => ['+','×'].includes(op));
            }else{
                availableOps = availableOps.filter(op => ['+','÷'].includes(op));
            }
        }else{
            if(!flipped){
                availableOps = availableOps.filter(op => ['-','÷'].includes(op));
            }else{
                availableOps = availableOps.filter(op => ['-','×'].includes(op));
            }
        }
        
        if(availableOps.includes('÷')){
            // Stops the program from being able to place a division when the number it's being put after is a prime number 
            // as if we allowed this it would result in the program being forced to either place the same number again or a 1
            let isPrime = this.isPrime(this.checklastmultdiv(expression));
            if(isPrime){
                availableOps = availableOps.filter(op => op !== '÷');
            }
        }else if(availableOps.includes('×')){
            // Highest number which should have a multiplication operation beside it (This will be the first number in the 
            // operation so for X*Y this determines how high we allow X to be before we dont allow * to be placed beside X)
            let maxmultthreshhold = 20;
            let value = this.checklastmultdiv(expression)
            if (value<1 || value>maxmultthreshhold) {
                availableOps = availableOps.filter(op => op !== '×');
            }
        }
        let operator = Phaser.Math.RND.pick(availableOps);
        return operator;
    }

    calculateResults(){
        // Calculates the result for each row and each column storing it into two lists (rowResults and colResults)
        this.rowResults = [];
        this.colResults = [];
        let size = this.gridSize/2;
        //console.log("Calculating Results");
        for (let row = 0; row < size; row++){
            let expression = this.getExpressionSlice(row*2, this.gridSize-1, true);
            let result = this.calculateVector(expression);
            this.rowResults.push(result);
        }
        for (let col = 0; col < size; col++){
            let expression = this.getExpressionSlice(this.gridSize-1, col*2, false);
            let result = this.calculateVector(expression);
            this.colResults.push(result);
        }
    }
    
    calculate(num1, operator, num2){
        // Takes an input like (1, *, 2) and returns it's result (2) in this case
        let result;
        
        switch(operator){
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                // Ensure subtraction never results in negative values
                if (result < 0) {
                    //console.warn("Negative result from subtraction detected:", num1, "-", num2);
                    result = 0;
                }
                break;
            case '×':
                result = num1 * num2;
                break;
            case '÷':
                // Avoid division by zero
                if(num2 === 0) {
                    //console.warn("Division by zero prevented");
                    return 0;
                }
                
                // Ensure division results in an integer
                if(num1 % num2 !== 0) {
                    //console.warn("Non-integer division:", num1, "÷", num2);
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
        // Says the puzzle is invalid if we find a number zero
        // We do not generally want zeros in our grids but these 
        // may also indicate erros while generating 
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                const cellValue = this.grid[row][col];
                if (typeof cellValue === 'number') {
                    if (!Number.isInteger(cellValue)) {
                        //console.error(`Non-integer value at [${row}][${col}]: ${cellValue}`);
                        return false;
                    } else if (cellValue < 0 || cellValue > 100) {
                        //console.error(`Out-of-range number at [${row}][${col}]: ${cellValue}`);
                        return false;
                    }
                }    
            }
        }

        // Check if the results are above 100 (Not meant to happen)
        this.calculateResults();
        for (let i = 0; i < this.rowResults.length; i++) {
            if (this.rowResults[i] > 99 || this.rowResults[i] < 0) {
                //console.error(`Row ${i} result above 100 or below 0: ${this.rowResults[i]}`);
                return false;
            }
        }

        for (let i = 0; i < this.colResults.length; i++) {
            if (this.colResults[i] > 99 || this.colResults[i] < 0) {
                //console.error(`Column ${i} result above 100 or below 0: ${this.colResults[i]}`);
                return false;
            }
        }
        
        return true;
    }

    selectCell(row, col) {
        const cell = this.cells[row][col];

        if (cell.locked) {
            return;
        }

        // Saves selected cell
        this.selectedCell = { row, col };
        
        // Highlights the selected cell
        this.highlightSelectedCell();
    }

    clearSelectedCell() {
        // Clears selected cell
        if (this.selectedCell){
            const { row, col } = this.selectedCell;
            this.cells[row][col].sprite.clearTint(); // Reset tint
            this.selectedCell = null;
        }
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
            this.incorrect.visible = false;
        }
    }
    
    clearGrid() {
        // Remove all cell sprites and texts
        if (this.cells){
            for (let row = 0; row < this.size; row++) {
                for (let col = 0; col < this.size; col++) {
                    if (this.cells[row][col] && this.cells[row][col].sprite) this.cells[row][col].sprite.destroy();
                    if (this.cells[row][col] && this.cells[row][col].text) this.cells[row][col].text.destroy();
                    if (this.cells[row][col] && this.cells[row][col].Response) {
                        this.cells[row][col].Response.destroy();
                        this.cells[row][col].Response = null;
                    }
                }
            }
        }
        // Clear operator texts
        if (this.horizontalOps) {
            for (let row of this.horizontalOps) {
                for (let op of row) {
                    if (op && op.text) op.text.destroy();
                }
            }
        }
        if (this.verticalOps) {
            for (let row of this.verticalOps) {
                for (let op of row) {
                    if (op && op.text) op.text.destroy();
                }
            }
        }
        // Remove row/col result texts
        this.children.list = this.children.list.filter(obj => {
            if (obj.type === 'Text' && !obj.texture) {
                // Only keep non-grid texts like buttons
                return false;
            }
            return true;
        });
        // Destroy equal signs and result texts
        if (this.gridExtras) {
            for (let item of this.gridExtras) {
                item?.destroy();
            }
        }
        this.cells = [];
        this.horizontalOps = [];
        this.verticalOps = [];
        this.userGrid = [];
    }
}
