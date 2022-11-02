import {combineReducers} from 'redux'
import login from './Login';
import alert from './alert';
import auth from './auth';


const allReducers = combineReducers({
    login,
    alert,
    auth
})
 
export default allReducers;