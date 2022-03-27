import React, { useEffect, useState } from 'react';
import { generarId } from '../utilidades'


const Paginacion = ({ultimaPagina, paginaActual, setPaginaActual }) => {

  const [ paginaAnterior, setPaginaAnterior ] = useState(0)
  const [ paginaSiguiente, setPaginaSiguiente ] = useState(1)
  const [ paginas, setPaginas ] = useState([])
  

  useEffect( () => {
    
    const anterior   = paginaActual === 1 ? 1 : ( paginaActual - 1 )
    const siguiente = paginaActual < ultimaPagina ? ( paginaActual + 1 ) : ultimaPagina
    
    setPaginaSiguiente(siguiente)
    setPaginaAnterior(anterior)
    
    let arrPaginas = []

    for( let i = 1; i <= ultimaPagina; i++ ) {
      arrPaginas = [
        ...arrPaginas, i
      ]
    }

    setPaginas( arrPaginas )

  }, [paginaActual,ultimaPagina])

  const cambioPagina = (pagina) => {

    setPaginaActual( Number(pagina) )

    const anterior   = paginaActual === 1 ? 1 : ( paginaActual - 1 )
    const siguiente = paginaActual < ultimaPagina ? ( paginaActual + 1 ) : ultimaPagina
    
    setPaginaSiguiente(siguiente)
    setPaginaAnterior(anterior)

    setPaginaActual( Number(pagina) )

  }


  return (
    <div className="pagination-wrapper justify-content-between pd-5 mg-t-20 mg-b-20">
      <ul className="pagination mg-b-0">
        <li 
          className="page-item"
          key={generarId()}
        >
          <p className="page-link mg-b-0 mr-5 " aria-label="Last" onClick={ () => cambioPagina(1)} >
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevrons-left" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#9e9e9e" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <polyline points="11 7 6 12 11 17" />
              <polyline points="17 7 12 12 17 17" />
            </svg>
          </p>
        </li>
        <li 
          className="page-item"
          key={generarId()}
        >
          <p className="page-link mg-b-0" aria-label="Next" onClick={ () => cambioPagina(paginaAnterior)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#9e9e9e" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <polyline points="15 6 9 12 15 18" />
            </svg>
          </p>
        </li>
      </ul>
      <div className="d-flex justify-content-center">
        <div className="p-2 d-none d-md-inline-block c-blanco">Page: </div>
        <div className="p-2">
          {/*<Select2 options = {paginas} label = {false} funcion = {cambioPagina} required = {true} value={paginas[paginaActual-1]} />*/}
          <select 
            id="select_pagina"
            value={paginaActual}
            onChange={ e => cambioPagina(e.target.value) }
          >
            {
              
              paginas.map( i => (

                <option value={i} key={generarId()}>{i}</option>
            
              ))
            }
          </select>
        </div>

       
      </div>      
      <ul className="pagination mg-b-0">
        <li 
          className="page-item" 
          key={generarId()}
        >
          <p className="page-link mg-b-0 mr-5 " aria-label="Next" onClick={ () => cambioPagina(paginaSiguiente)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-right" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#9e9e9e" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </p>
        </li>
        <li 
          className="page-item"
          key={generarId()}
        >
          <p className="page-link mg-b-0" aria-label="Last" onClick={ () => cambioPagina(ultimaPagina)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevrons-right" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#9e9e9e" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <polyline points="7 7 12 12 7 17" />
              <polyline points="13 7 18 12 13 17" />
            </svg>
          </p>
        </li>
      </ul>
    </div>
  )
}

export default Paginacion
