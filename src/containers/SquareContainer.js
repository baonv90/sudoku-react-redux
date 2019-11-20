import { connect } from 'react-redux'
import { setValue, selectSquare } from '../actions/sudokuActions.js'
import Square from '../components/Square';


const mapStateToProps = (state, ownProps) => {
    let highlighted = false;
    if (state['highlight'][ownProps.yIndex][ownProps.xIndex]) {
        highlighted = true;
    }
    
    return {
        value: state['initialBoard'][ownProps.yIndex][ownProps.xIndex],
        highlighted,
        decoration : state['decoration'][ownProps.yIndex][ownProps.xIndex]  
    }
}

const matchDispactToProps = (dispatch, ownProps) => {
    return {
        setValue: (value) => dispatch(setValue(ownProps.xIndex, ownProps.yIndex, value)),
        selectSquare: () => dispatch(selectSquare(ownProps.xIndex, ownProps.yIndex))
    }
}

export default connect(mapStateToProps, matchDispactToProps)(Square);
