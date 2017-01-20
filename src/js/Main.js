import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import './Main.scss'

class Main extends React.Component {

    static propTypes = {
        children: PropTypes.node
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}



const mapStateToProps = state => ({})
export default connect(mapStateToProps, {})(Main)

