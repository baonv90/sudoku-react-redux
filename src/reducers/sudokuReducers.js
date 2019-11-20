import {SET_VALUE, SELECT_SQUARE, SOLVE_BOARD, NEW_BOARD, RESET_BOARD} from '../actions/sudokuActions';
import {getRelated, isValidValue, isSafe, solveSudoku} from '../helpers/helpers';
import {getRandomPuzzle} from '../puzzles/puzzles';

let initalState = {
    // state of the input board
    initialBoard: [
        ['', 7, 6, '', 1, '', '', 4, 3],
        ['', '', '', 7, '', 2, 9, '', ''],
        ['', 9, '', '', '', 6, '', '', ''],
        ['', '', '', '', 6, 3, 2, '', 4],
        [4, 6, '', '', '', '', '', 1, 9],
        [1, '', 5, 4, 2, '', '', '', ''],
        ['', '', '', 2, '', '', '', 9, ''],
        ['', '', 4, 8, '', 7, '', '', 1],
        [9, 1, '', '', 5, '', 7, 2, ''],
    ],

    highlight: [
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
    ],

    decoration : [
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
    ],
    
    currentFocus : ['','']
}


export function sudokuReducers (state = initalState, action) {

    switch(action.type)
    {
        case SET_VALUE : {
        
            const { xIndex, yIndex } = action.payload;
            const newValue = action.payload.val != null ? action.payload.val : ''; 

            let newState = {
                initialBoard : [
                    [...state.initialBoard[0]],
                    [...state.initialBoard[1]],
                    [...state.initialBoard[2]],
                    [...state.initialBoard[3]],
                    [...state.initialBoard[4]],
                    [...state.initialBoard[5]],
                    [...state.initialBoard[6]],
                    [...state.initialBoard[7]],
                    [...state.initialBoard[8]],
                ],
                highlight : [...state.highlight],
                decoration : [...state.decoration],
                currentFocus : [xIndex, yIndex] 
            };

            newState.initialBoard[yIndex][xIndex] = newValue;

            if(isValidValue(newValue)) {
                if(isSafe(yIndex, xIndex, newState.initialBoard, newValue))
                {   
                    newState.decoration[yIndex][xIndex] = 'valid';                  
                }
                else
                {
                    newState.decoration[yIndex][xIndex] = 'error';
                }
                return {...newState};
            }
            else {
                return {...state};
            }

            

        }
        case SELECT_SQUARE : {
            const { xIndex, yIndex } = action.payload;

            let selectedState = {
                initialBoard: [...state.initialBoard],
                highlight: [
                    [...initalState.highlight[0]],
                    [...initalState.highlight[1]],
                    [...initalState.highlight[2]],
                    [...initalState.highlight[3]],
                    [...initalState.highlight[4]],
                    [...initalState.highlight[5]],
                    [...initalState.highlight[6]],
                    [...initalState.highlight[7]],
                    [...initalState.highlight[8]],
                ],
                decoration : [...state.decoration],
                currentFocus : [xIndex, yIndex]  
            };
          
            selectedState.highlight[yIndex][xIndex] = true;

            const relatives = getRelated(xIndex, yIndex)
            for (const relative of relatives) {
                selectedState.highlight[relative.y][relative.x] = true;
            }
            return {...selectedState};
        }
        case SOLVE_BOARD : {

            let _decoration =  [
            [...initalState.decoration[0]],
            [...initalState.decoration[1]],
            [...initalState.decoration[2]],
            [...initalState.decoration[3]],
            [...initalState.decoration[4]],
            [...initalState.decoration[5]],
            [...initalState.decoration[6]],
            [...initalState.decoration[7]],
            [...initalState.decoration[8]],];

            for(let i = 0; i < 9; i++)
            {
               for(let j = 0; j < 9; j++)
               {
                   if(initalState.initialBoard[i][j] === '')
                   {
                       _decoration[i][j] = "valid";
                   }
               }
            }

            let solvedBoard = [...initalState.initialBoard];
            solveSudoku(initalState.initialBoard);

            let solvedState =  {
                initialBoard : [...solvedBoard],
                highlight : [...initalState.highlight],
                decoration : [..._decoration],
                currentFocus : ['',''] 
            } 

      
            return solvedState

        }
        case NEW_BOARD : {
            
            let _decoration = [
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
            ];
            let _highlight = [
                [false, false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false, false],
            ];
        
            let _board = [];
            const puzzle = getRandomPuzzle();
            for(let i = 0; i < 9; i++)
            {
                let _row = [];
                for(var j = i * 9; j < (i+1) * 9; j++)
                {
                    _row.push(puzzle[j] === '0' ? '' : Number(puzzle[j]));
                }
                _board.push(_row);
            }

            let newGameState = {
                initialBoard : [..._board],
                highlight : [..._highlight],
                decoration : [..._decoration],
                currentFocus : ['',''] 
            }

            initalState = {...newGameState};

            return newGameState;
        }
        case RESET_BOARD : {

            return {
                initialBoard : [...initalState.initialBoard],
                highlight : [...initalState.highlight],
                decoration : [...initalState.decoration],
                currentFocus : ['','']  
            };
        }
        default: return state

    }

}

export default sudokuReducers;