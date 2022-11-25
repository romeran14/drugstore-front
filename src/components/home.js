import React from 'react'
import logo from '../assets/logo.png'
import styles from './styles.module.css'
import { Link } from 'react-router-dom'



const home = () => {
  return (
    <div className={styles.home}>
        <h2>Inicio</h2>
        <img 
        style={{width:'20rem',
        height:'20rem'}}
        src={logo} 
        alt='logo farmaclick' 
        />
        <button  className={styles.button}><Link to="/store"> Mostrar medicinas </Link> </button>
    </div>
  )
}

export default home