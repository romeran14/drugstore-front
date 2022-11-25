import React from 'react';
import {Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom';
export default function Header() {

  return (<>
    <div >
      <Nav activeKey="/" className="justify-content-end">
        <Nav.Item>
          <Link to="/store">Inicio</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/cart">Carrito</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/about">Ayuda</Link>
        </Nav.Item>
      </Nav>
      
    </div>
  </>)
}
