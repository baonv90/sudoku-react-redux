const POSSIBLES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

// is the entered number valid (0 included)
export function isValidValue(value) {
    if (value === '') {
        return true
    }
    if (isNaN(value)) {
        return false;
    }
    return POSSIBLES.indexOf(value) !== -1
}

// is the checking number invoked any conflicts 
export function isSafe(row, col, sudoku, value) {
   
    const relavtives = getRelated(row, col)
    for(const relavtive of relavtives) {
        if (sudoku[relavtive.x][relavtive.y] === value) {
            return false
        }
    }
    return true
}

// get the related squares from its column, row and box
export function getRelated(x, y) {
    
    // collumn and row
    let relatives = []
    for(let i = 0; i < 9; i++) {
        if (i !== x) {
            relatives.push({ x: i, y});
        }
        if (i !== y) {
            relatives.push({ x, y: i,});
        }
    }

    // box
    const topLeftY = y - y % 3;
    const topLeftX = x - x % 3;
    for(let i = topLeftX; i < topLeftX + 3; i++) {
        for(let j = topLeftY; j < topLeftY + 3; j++) {
            if (j === y && i === x) {
                continue
            }
            relatives.push({
                x: i,
                y: j,
            })
        }
    }
    return relatives
}

// solve the sudoku board

export function solveSudoku(puzzle) {
    
    var row = -1; 
    var col = -1;

    let isPuzzleSolved = true; 
    for (let i = 0; i < 9; i++) 
    { 
        for (let j = 0; j < 9; j++)  
        { 
            if (puzzle[i][j] === '')  
            { 
                // row and column of blank square
                row = i; 
                col = j;         
                
                // puzzle has not been solved yet
                isPuzzleSolved = false;  
                break; 
            } 
        } 
        if (!isPuzzleSolved) 
        { 
            break; 
        } 
    } 
    //no blank square left 
    if (isPuzzleSolved)  
    { 
        return true; 
    } 
    // try number from 1 to 9;
    for( let num = 1; num <= 9; num++)
    {   
       
        // if the entered num invokes no conflicts
        if(isSafe(row, col, puzzle, num)) {
            puzzle[row][col] = num;
            
            if(solveSudoku(puzzle))
            {
                //continue until all the blank square is filled
                return true;
            }
            else {
                puzzle[row][col] = '';
            } 
        }
    }
    return false
}

   