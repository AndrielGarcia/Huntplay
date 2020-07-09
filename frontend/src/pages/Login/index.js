import React from 'react'
import { fiLogIn, FiLogIn } from 'react-icons/fi'

import './styles.css'

import imgLogo from '../../assets/logo hunters.png'
import imgAndriel from '../../assets/foto com wendel.jpg'

export default function Login() {
    return(
        <div className="logon-container">
            <section className="form">
                <img src={imgLogo} alt="HuntPlay"/>

                <form>
                    <h1>login</h1>

                    <input placeholder="ID Usuário"/>
                    <input placeholder="Senha"/>
                    <button type="submit">Entrar</button>

                    <a href="/register">
                        <FiLogIn size={16}/>
                        Não tenho cadastro
                    </a>
                </form>
            </section>

            <img src={imgAndriel} alt="Imagem Aleatória"/>
        </div>
    )
    
}