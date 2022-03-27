import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams} from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import Paginacion from '../components/Paginacion'
import ModalLoading from '../components/ModalLoading'
import TarjetaEpisodio from '../components/TarjetaEpisodio'
import TarjetaPersonaje from '../components/TarjetaPersonaje'

import { obtenerEpisodios } from '../actions/episodiosActions'
import { obtenerPersonajes } from '../actions/personajesActions'

const Episodios = () => {

    const [ paginaActual, setPaginaActual ] = useState(1)
    const [ name, setName ] = useState("")
    const [ modalPersonajes, setModalPersonajes ] = useState(false)

    const dispatch = useDispatch()

    const buscarEpisodios = filtroBusqueda => dispatch( obtenerEpisodios(filtroBusqueda) )
    const episodios = useSelector( state => state.episodios.resultado.results )
    const ultimaPagina = useSelector( state => state.episodios.resultado.info.pages )
    const modalLoading = useSelector( state => state.episodios.loading)
    
    const buscarPersonajes = filtroBusqueda => dispatch( obtenerPersonajes(filtroBusqueda) )
    const personajes = useSelector( state => state.personajes.resultado.results )
    const modalLoading2 = useSelector( state => state.personajes.loading)
    const b = useSelector( state => state.personajes.resultado.b )
    const params = useParams()

    useEffect( () => {

        let ids = ""

        if( params.ids !== "all" ) {
            ids = params.ids
        }
        buscarEpisodios({ ids, paginaActual, name })

    }, [paginaActual])

    useEffect( () => {
        
        if( Object.keys(personajes).length && b === 1 ) {
            setModalPersonajes(true)
        }

    },[personajes])

    const submitBusqueda = e => {
        e.preventDefault()
        
        let ids = ""

        if( params.ids !== "all" ) {
            ids = params.ids
        }

        setPaginaActual(1)
        buscarEpisodios({ ids, paginaActual, name })
    }
    
    const verPersonajesEpisodio = urlsPersonajes => {
        
        const obtenerPersonajes = async () => {

            const ids = urlsPersonajes.map( url => url.replace("https://rickandmortyapi.com/api/character/","") )
            
            buscarPersonajes({paginaActual:1, name:"", status:"", species:"", type:"", gender:"", ids, b:1})
        }

        obtenerPersonajes()

    }

    const ModalPersonajes = (props) => {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                className="modal-personajes bg-negro-3"
            >
                <Modal.Header closeButton className="bg-negro-3 c-blanco">
                    <Modal.Title id="contained-modal-title-vcenter" className="c-blanco">
                        <h4 className="c-blanco">Episode Characteres</h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-negro-3">
                    <div className="pd-5 pd-l-20 pd-r-20 row">
                        
                        {

                            personajes.length ?

                                personajes.map( personaje => (
                                    <div 
                                        className="col-lg-6 centrado" 
                                        key={personaje.id}
                                    >
                                        <TarjetaPersonaje
                                            nombre={personaje.name}
                                            imagen={personaje.image}
                                            estatus={personaje.status}
                                            especie={personaje.species}
                                        >
                                            <p><span className="d-block c-gris mt-2">Last known location: </span>{personaje.location.name}</p>
                                            <p><span className="d-block c-gris mb-0">First seen in: </span>{personaje.location.name}</p>

                                        </TarjetaPersonaje>
                                    </div>
                                    
                                )
                            ) : ( <div className="text-danger"><h5>No results</h5></div> )
                        }
                        
                    </div>
                </Modal.Body>
                <Modal.Footer className="bg-negro-3">
                    <Button onClick={props.onHide}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        );
    }

  return (
        <>
            <h2 className="c-blanco text-center mb-20">Episodes</h2>
            <form onSubmit={ submitBusqueda }>
                <div className="row">
                    <div className="col-12">
                        <div className="form-group">
                            <label htmlFor="name" className="c-blanco">Name:</label>

                            <input 
                            id="name"
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            name="name"
                            value={name}
                            onChange={ e => setName( e.target.value ) }
                        />
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-end  mt-20 mb-10">
                    <button className="btn btn-primary font-weight-bold text-uppercase btn-buscar">
                        Apply filter
                    </button>
                </div>
            </form>

            <div className="pb-10 row">
                <div className="col-12">
                    <Paginacion
                        setPaginaActual = {setPaginaActual}
                        paginaActual = { paginaActual }
                        ultimaPagina = { ultimaPagina }
                    />
                </div>
            </div>

            <div className="row">
                { episodios.length ? 
                    (
                        episodios.map( episodio => 
                            (
                                <div 
                                    className="col-lg-6 centrado" 
                                    key={episodio.id}
                                >
                                    <TarjetaEpisodio
                                        nombre={episodio.name}
                                    >
                                        <p><span className="d-inline-block c-gris mb-0">Air Date: </span> {episodio.air_date}</p>
                                        <p><span className="d-inline-block c-gris mb-0">Episode: </span> {episodio.episode}</p>
                                        <div className="d-flex justify-content-center w-100">
                                            <button className="btn btn-characters" onClick={ () => verPersonajesEpisodio(episodio.characters) }>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user c-azul-agua" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#9e9e9e" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                    <circle cx="12" cy="7" r="4" />
                                                    <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                                                </svg> 
                                                <span>Characters</span> 
                                            </button>
                                        </div>
                                    </TarjetaEpisodio>
                                </div>
                            )
                        ) 
                    ) : ( <h2 className="c-blanco text-center">No results found</h2>   )
                }
            </div>

            <div className="pb-10 row">
                <div className="col-12">
                    <Paginacion
                        setPaginaActual = {setPaginaActual}
                        paginaActual = { paginaActual }
                        ultimaPagina = { ultimaPagina }
                    />
                </div>
            </div>
            <ModalLoading 
                modalLoading = { Boolean(modalLoading + modalLoading2) }
            />
            <ModalPersonajes
                show={ modalPersonajes }
                onHide={() => setModalPersonajes(false)}
            />
        </>
  )
}

export default Episodios
