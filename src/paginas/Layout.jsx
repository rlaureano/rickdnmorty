import { Outlet, Link, useLocation } from 'react-router-dom'

const Layout = () => {

    const location = useLocation()
    const urlActual = location.pathname

    return (
        <>
            <div className="hero">
                <div className="contenido-hero">
                    <h1 className="text-center">The Rick and Morty API</h1>
                    <div className="row enlaces">
                        <div className="col-6 d-flex justify-content-center">
                            
                            <Link to="/" className={`${urlActual === '/' ? 'activo' : ''}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user c-azul-agua" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#9e9e9e" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <circle cx="12" cy="7" r="4" />
                                    <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                                </svg> 
                                <span>Characters</span> 
                            </Link>
                        </div>
                        <div className="col-6 d-flex justify-content-center">
                            <Link to="/episodes/all" className={`${urlActual.includes('/episodes') ? 'activo' : ''}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-device-tv" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#9e9e9e" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <rect x="3" y="7" width="18" height="13" rx="2" />
                                    <polyline points="16 3 12 7 8 3" />
                                </svg>
                                <span>Episodes</span>
                            </Link>
                        </div>
                    </div>
                </div>
                
            </div>
            <div className="container bg-negro-2 sombra mb-5 pd-20 br-radius-15">
                <Outlet />
            </div>

        </>
    )
}

export default Layout
