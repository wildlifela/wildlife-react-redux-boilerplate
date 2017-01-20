import {APP_NAME} from '../constants/appConsts'

const initialState = {
    name: APP_NAME
    //Initial App Props
}


export default function(state = initialState, action) {

    switch(action.type) {
        default :
            return state
    }
}