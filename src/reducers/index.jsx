import { combineReducers } from 'redux'
import personajesReducer from './personajesReducer'
import episodiosReducer from './episodiosReducer'

export default combineReducers({
    personajes: personajesReducer,
    episodios: episodiosReducer
})