import React, {Component} from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute/*, Redirect*/ } from 'react-router'
import { browserHistory } from 'react-router'
import { Provider, connect } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import configureStore from './store/'

//Pages
import Main from './Main.js'
import Index from './components/Index.js'


injectTapEventPlugin()


//Needed to make calls to the web services

const store = configureStore()

const ROUTER = (
    <Router history={browserHistory}>
        <Route path="/" component={Main} >
            <IndexRoute component={Index} />
        </Route>

    </Router>
)


/*
 * In case you want do something before the router loads.
 * */
class AppHandler extends Component {
    constructor() {
        super()
    }


    render() {
        return <Provider store={store}>
            {ROUTER}
        </Provider>
    }
}


render((
    <AppHandler />
), document.getElementById('app'))
