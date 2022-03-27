import {
    BUSCAR_PERSONAJES,
    BUSCAR_PERSONAJES_EXITO,
    BUSCAR_PERSONAJES_ERROR
} from '../types'

const initialState = {
    resultado: {
        results: [],
        info: {
            pages:1
        },
        b:0
    },
    error: null,
    loading: false,
}

export default function( state = initialState, action ) {

    switch ( action.type ) {
        case BUSCAR_PERSONAJES:
            return {
                ...state,
                loading: true
            }

        case BUSCAR_PERSONAJES_EXITO:

            return {
                ...state,
                loading: false,
                resultado: action.playload
            }
        
        case BUSCAR_PERSONAJES_ERROR:
            return {
                ...state,
                loading: false,
                error: action.playload
            }
        default: 
            return state
    }
}