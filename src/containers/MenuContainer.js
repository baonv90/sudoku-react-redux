import { connect } from 'react-redux'
import { setValue, selectSquare } from '../actions/sudokuActions.js'
import Menu from '../components/Menu';


const mapStateToProps = (state, ownProps) => {
        
    return {
        focus: state['currentFocus'],
    }
}

const matchDispactToProps = (dispatch, ownProps) => {
    
    return {
        setValue: (xIndex, yIndex, value) => dispatch(setValue(xIndex, yIndex, value)),
        selectSquare: () => dispatch(selectSquare(ownProps.xIndex, ownProps.yIndex))
    }
    
}

export default connect(mapStateToProps, matchDispactToProps)(Menu);