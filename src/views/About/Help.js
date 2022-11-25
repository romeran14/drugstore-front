import React from 'react';
import {Container} from 'react-bootstrap';
import Header from '../../components/Header';

export default function Help() {

  return (
    <>
      <Header />
      <Container>
        
        <div className='ayuda-box'>
        <h3> Pagina de Ayuda </h3>
          <h3>Para ayuda o inquietudes acerca del Servicio contactenos!</h3>
          <h4>carritotest@gmail.com</h4>
          <a href='tel:000-0000' >tel:000-0000</a>
        </div>
      </Container>
    </>
  )
}