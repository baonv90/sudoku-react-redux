import { connect } from 'react-redux'
import { solveBoard, newBoard, resetBoard } from '../actions/sudokuActions.js'
import Buttons from '../components/Buttons';


const matchDispactToProps = (dispatch, ownProps) => {
    return {
        solveBoard: () => dispatch(solveBoard()),
        newBoard: () => dispatch(newBoard()),
        resetBoard: () => dispatch(resetBoard())
    }
}

export default connect(null, matchDispactToProps)(Buttons);
