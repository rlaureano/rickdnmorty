import {
    BUSCAR_EPISODIOS,
    BUSCAR_EPISODIOS_EXITO,
    BUSCAR_EPISODIOS_ERROR
} from '../types'

const initialState = {
    resultado: {
        results: [],
        info: {
            pages:1
        }
    },
    error: null,
    loading: false
}

export default function( state = initialState, action ) {

    switch ( action.type ) {
        case BUSCAR_EPISODIOS:
            return {
                ...state,
                loading: true
            }

        case BUSCAR_EPISODIOS_EXITO:

            return {
                ...state,
                loading: false,
                resultado: action.playload
            }
        
        case BUSCAR_EPISODIOS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.playload
            }
        default: 
            return state
    }
}