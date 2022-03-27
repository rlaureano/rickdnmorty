import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Layout from './paginas/Layout'
import Inicio from './paginas/Inicio'
import Episodios from './paginas/Episodios'

import './App.css'

import { Provider } from 'react-redux'
import store from './store'


const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={ <Layout/> } >
            <Route index element={ <Inicio/>} />
            <Route path="/episodes/:ids" element={ <Episodios/>} />
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  )
}

export default App

