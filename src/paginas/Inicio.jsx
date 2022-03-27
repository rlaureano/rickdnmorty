import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import TarjetaPersonaje from '../components/TarjetaPersonaje'
import Paginacion from '../components/Paginacion'
import ModalLoading from '../components/ModalLoading'

import { obtenerPersonajes } from '../actions/personajesActions'

const Inicio = () => {

    const [ paginaActual, setPaginaActual ] = useState(1)
    const [ name, setName ] = useState('')
    const [ status, setStatus ] = useState('')
    const [ species, setSpecies ] = useState('')
    const [ type, setType ] = useState('')
    const [ gender, setGender ] = useState('')

    const dispatch = useDispatch()
    const buscarPersonajes = filtroBusqueda => dispatch( obtenerPersonajes(filtroBusqueda) )

    const personajes = useSelector( state => state.personajes.resultado.results )
    const ultimaPagina = useSelector( state => state.personajes.resultado.info.pages )
    const modalLoading = useSelector( state => state.personajes.loading)

    const navigate = useNavigate()

    const submitBusqueda = e => {
        e.preventDefault()
        setPaginaActual(1)
        buscarPersonajes({ paginaActual:1, name, status, species, type, gender, ids:"", b:0 })
    }

    useEffect( () => {
        buscarPersonajes({paginaActual, name, status, species, type, gender, ids:"", b:0 })
    }, [paginaActual])

    const verEpisodios = urlsEpisodios => {

        const ids = urlsEpisodios.map( url => url.replace("https://rickandmortyapi.com/api/episode/","") )
        navigate( `/episodes/${ids.join(",")}` )
    }

    return (
        <>
            <h2 className="c-blanco text-center mb-20">Characters</h2>
            <form onSubmit={ submitBusqueda }>
                <div className="row">
                    <div className="col-md-4">
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

                    <div className="col-md-4">
                        <div className="form-group">
                            <label htmlFor="status" className="c-blanco">Status:</label>
                            <select
                                id="status"
                                name="status"
                                value={status}
                                onChange={ e => setStatus( e.target.value ) }
                                className="form-control"
                            >    
                                <option value="">Choose</option>
                                <option value="alive">Alive</option>
                                <option value="dead">Dead</option>
                                <option value="unknown" >Unkown</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="form-group">
                            <label htmlFor="species" className="c-blanco">Species:</label>

                            <input 
                            id="species"
                            type="text"
                            className="form-control"
                            placeholder="Species"
                            name="species"
                            value={species}
                            onChange={ e => setSpecies( e.target.value ) }
                        />
                        </div>
                    </div>

                </div>

                <div className="row mt-20">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="species" className="c-blanco">Type:</label>

                            <input 
                            id="type"
                            type="text"
                            className="form-control"
                            placeholder="Type"
                            name="type"
                            value={type}
                            onChange={ e => setType( e.target.value ) }
                        />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="status" className="c-blanco">Gender:</label>
                            <select
                                id="gender"
                                name="gender"
                                value={gender}
                                onChange={ e => setGender( e.target.value ) }
                                className="form-control"
                            >    
                                <option value="">Choose</option>
                                <option value="female">Female</option>
                                <option value="male">Male</option>
                                <option value="genderless" >Genderless</option>
                                <option value="unknown" >Unkown</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-end  mt-20 mb-10">
                    <button className="btn btn-primary font-weight-bold text-uppercase btn-buscar">
                        Apply filters
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
                { personajes.length ? 
                    (
                        personajes.map( personaje => 
                            (
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

                                        <button className="btn btn-secondary" onClick={ () => verEpisodios(personaje.episode)}>Episodes</button>
                                    </TarjetaPersonaje>
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
                modalLoading = {modalLoading}
            />
        </>
    )
}

export default Inicio
