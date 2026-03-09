import { useState } from 'react'
import Header from './components/cabecera'
import Main from './components/contenido'
import UserCard from './components/TarjetaUsuario'
import Counter from './components/Contador'
import Footer from './components/pie'
import './App.css'


function App() {

  return (
    <div>
      <Header />
      <Main>
        <UserCard
          nombre="Vicente"
          edad={33}
          avatar="https://i.pravatar.cc/150?u=vicent"
        />
        <UserCard
          nombre="María"
          edad={19}
          avatar="https://i.pravatar.cc/150?u=maria"
        />
        <UserCard
          nombre="Adri"
          edad={25}
          avatar="https://i.pravatar.cc/150?u=adrian"
        />
        <Counter />
      </Main>
      <Footer />
    </div>
  )
}

export default App
