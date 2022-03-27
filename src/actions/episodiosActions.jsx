import {
    BUSCAR_EPISODIOS,
    BUSCAR_EPISODIOS_EXITO,
    BUSCAR_EPISODIOS_ERROR
} from '../types' 

import Swal from 'sweetalert2'

export function obtenerEpisodios( filtroBusqueda ) {
    
    return async ( dispatch ) => {
        dispatch( buscarEpisodios() )

        const { ids, name, paginaActual  } = filtroBusqueda

        try {
            // consume API para obtener los personajes
            const url = `https://rickandmortyapi.com/api/episode/${ids}?page=${paginaActual}&name=${name} `; 
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
                    }
                }

                dispatch( buscarEpisodiosExito(resultado) )

            } else if( Object.keys(respuesta).includes("info")  ){

                dispatch( buscarEpisodiosExito(respuesta) )

            } else {

                const resultado =  {
                    results: respuesta,
                    info: {
                        pages:1
                    }
                }

                dispatch( buscarEpisodiosExito(resultado) )

            }
            
        } catch (error) {
            console.log(error)

            // si hay erro, cambiar el state 
            dispatch( buscarEpisodiosError(true) )

            Swal.fire({
                icon: 'error',
                title: 'Ops!',
                text: 'An error occurred, Try again'
            })
        }
    }
}
 
const buscarEpisodios = () => ({
    type: BUSCAR_EPISODIOS
})

const buscarEpisodiosExito = resultado => ({
    type: BUSCAR_EPISODIOS_EXITO,
    playload: resultado
})

const buscarEpisodiosError = estado => ({
    type: BUSCAR_EPISODIOS_ERROR,
    playload: estado
})

