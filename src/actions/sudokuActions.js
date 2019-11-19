export const SET_VALUE = 'SET_VALUE';
export const SELECT_SQUARE = 'SELECT_SQUARE';
export const SOLVE_BOARD = 'SOLVE_BOARD';
export const NEW_BOARD = 'NEW_BOARD';
export const RESET_BOARD = 'RESET_BOARD';



export function setValue (xIndex, yIndex, val) {
    return {
        type: SET_VALUE,
        payload: {xIndex, yIndex, val}
    }
}

export function selectSquare (xIndex, yIndex) {
    return {
        type: SELECT_SQUARE,
        payload : {xIndex, yIndex}
    }
}

export function solveBoard() {
    return {
        type : SOLVE_BOARD,
        
    }
}

export function newBoard() {
    return {
        type : NEW_BOARD,
        
    }
}

export function resetBoard() {
    return {
        type : RESET_BOARD,
        
    }
}

