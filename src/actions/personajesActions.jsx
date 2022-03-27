import {
    BUSCAR_PERSONAJES,
    BUSCAR_PERSONAJES_EXITO,
    BUSCAR_PERSONAJES_ERROR
} from '../types' 

import Swal from 'sweetalert2'

export function obtenerPersonajes( filtroBusqueda ) {
    
    return async ( dispatch ) => {
        dispatch( buscarPersonajes() )

        const { paginaActual,name, status, species, type, gender, ids, b  } = filtroBusqueda

        try {
            // consume API para obtener los personajes
            const url = `https://rickandmortyapi.com/api/character/${ids}?page=${paginaActual}&name=${name}&status=${status}&species=${species}&type=${type}&gender=${gender} `; 
            const respuesta = await fetch(url)
                .then(response => response.json())
                .catch(err => console.error(err))

            if(  Object.keys(respuesta).includes("error") ) {

                Swal.fire({
                    icon: 'error',
                    title: 'Ops!',
                    text: respuesta.error
                })

                const resultado =  {
                    results: [],
                    info: {
                        pages:1
                    },
                    b
                }

                dispatch( buscarPersonajesExito(resultado) )
                
            } else if(  Object.keys(respuesta).includes("info")){

                const resultado = {
                    ...respuesta,
                    b
                }

                dispatch( buscarPersonajesExito(resultado) )

            } else {
                const resultado =  {
                    results: respuesta,
                    info: {
                        pages:1
                    },
                    b
                }
                dispatch( buscarPersonajesExito(resultado) )
            }
            
        } catch (error) {
            console.log(error)

            // si hay erro, cambiar el state 
            dispatch( buscarPersonajesError(true) )

            Swal.fire({
                icon: 'error',
                title: 'Ops!',
                text: 'An error occurred, Try again'
            })
        }
    }
}
 
const buscarPersonajes = () => ({
    type: BUSCAR_PERSONAJES
})

const buscarPersonajesExito = resultado => ({
    type: BUSCAR_PERSONAJES_EXITO,
    playload: resultado
})

const buscarPersonajesError = estado => ({
    type: BUSCAR_PERSONAJES_ERROR,
    playload: estado
})

