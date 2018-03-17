import React, { Component } from 'react';// se importa component de react
import './Header.css';
//esta clase solo puede tener un método llamado render
export default class Header extends Component {
    //return porque vamos estar retornando codigo html
    render() {
        return(
            <header>
                <div className="titulo">
                    React-Parejas
                </div>
                <div>
                    <button className="boton-reiniciar" onClick={this.props.resetearPartida}>
                        reiniciar
                    </button>
                </div>
                <div className="titulo">
                    Intentos: {this.props.numeroDeIntentos}
                </div>
            </header>
        );
    }
};
