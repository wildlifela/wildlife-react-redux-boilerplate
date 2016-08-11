import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
require('./Main.scss');



class Main extends React.Component {

    constructor(props, context) {
        super(props, context);


    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}



const mapStateToProps = state => ({});
export default connect(mapStateToProps, {})(Main);

