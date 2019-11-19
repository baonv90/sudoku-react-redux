const POSSIBLES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const VALID = [1, 2, 3, 4, 5, 6, 7, 8, 9]


export function isValidValue(value) {
    if (value === '') {
        return true
    }
    if (isNaN(value)) {
        return false;
    }
    return POSSIBLES.indexOf(value) !== -1
}

export function isSquareValid(x, y, sudoku) {
    const value = sudoku[x][y]
    if (value === '') {
        return true
    }
    // check peer list for this value being used else where
    const relavtives = getRelated(x, y)
    for(const relavtive of relavtives) {
        if (sudoku[relavtive.x][relavtive.y] === value) {
            return false
        }
    }
    return true
}

export function getRelated(x, y) {
    let relatives = []
    for(let i = 0; i < 9; i++) {
        if (i !== x) {
            relatives.push({ x: i, y});
        }
        if (i !== y) {
            relatives.push({ x, y: i,});
        }
    }
    //the squares in the same box
    const topLeftY = y - y % 3
    const topLeftX = x - x % 3
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

export function solveSudoku(board) {
    let puzzle = [
        [...board[0]],
        [...board[1]],
        [...board[2]],
        [...board[3]],
        [...board[4]],
        [...board[5]],
        [...board[6]],
        [...board[7]],
        [...board[8]],
    ]

    let cycleImprovedAnswer = true
    let remainingCells = []
    while (cycleImprovedAnswer) {
        cycleImprovedAnswer = false
        remainingCells = []
        // do a cycle and look for cells where their is only one possible value
        for (let x = 0; x < 9; x++) {
            for (let y = 0; y < 9; y++) {
                const value = puzzle[x][y];
                if (value) {
                    continue 
                }

                // get list of values in all peers
                const peers = getRelated(x, y);
                let usedValues = [];
                for (var peer of peers) {
                    usedValues.push(puzzle[peer.x][peer.y]);
                }

                // see what possibile values remain
                const possibleValues = VALID.filter(value => usedValues.indexOf(value) === -1);
                if (possibleValues.length === 1) {
                    puzzle[x][y] = possibleValues[0]
                    cycleImprovedAnswer = true
                } else if (possibleValues.length === 0) {
                    alert('Input is a unsolvable puzzle.')
                    return [
                        ['', '', '', '', '', '', '', '', ''],
                        ['', '', '', '', '', '', '', '', ''],
                        ['', '', '', '', '', '', '', '', ''],
                        ['', '', '', '', '', '', '', '', ''],
                        ['', '', '', '', '', '', '', '', ''],
                        ['', '', '', '', '', '', '', '', ''],
                        ['', '', '', '', '', '', '', '', ''],
                        ['', '', '', '', '', '', '', '', ''],
                        ['', '', '', '', '', '', '', '', ''],
                    ]
                } else {
                    remainingCells.push({ x, y, possibleValues})
                }
            }
        }
    }

    // Now use brute force to solve the remaining ambiguous cells.
    // Use the list of possible values from the peer evaluation to limit the search space.
    for (let i = 0; i < remainingCells.length; i++) {
        const { x, y, possibleValues } = remainingCells[i]
        let value = puzzle[x][y]
        if (!value) {
            value = possibleValues[0]
        } else {
            const indexOfCurrentValue = possibleValues.indexOf(value)
            if (indexOfCurrentValue >= possibleValues.length - 1) {
                // We are out of values for this cell backtrack on cell
                puzzle[x][y] = ''
                i = i - 2
                continue
            }
            value = possibleValues[indexOfCurrentValue + 1]
        }
        puzzle[x][y] = value
        if (!isSquareValid(x, y, puzzle)) {
            i = i - 1 // this new square value is not valid
            continue
        }
    }
    return puzzle
}
