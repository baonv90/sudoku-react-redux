import { connect } from 'react-redux'
import { setValue, selectSquare } from '../actions/sudokuActions.js'
import Square from '../components/Square';


const mapStateToProps = (state, ownProps) => {
    let highlighted = false;
    if (state['highlight'][ownProps.yIndex][ownProps.xIndex]) {
        highlighted = true;
    }
    // let focused = false;
    // console.log(state['currentFocus'] === [1, 1] );
    // console.log([ownProps.xIndex, ownProps.yIndex]);
    // if(state['currentFocus'] === [ownProps.xIndex, ownProps.yIndex])
    // {
    //     focused = true;
    // }
    
    return {
        value: state['initialBoard'][ownProps.yIndex][ownProps.xIndex],
        highlighted,
        // focused,
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
