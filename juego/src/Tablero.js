import React, { Component } from 'react';// se importa component de react
import './Tablero.css';
import Carta from './Carta';//se importa

export default class Tablero extends Component {
    render(){        
        return(
            <div className="tablero">
                {//el map recibe una función
                //el del this.props.baraja es la prop que le esta enviando el padre
                    this.props.baraja
                    .map((carta,index) => {
                        const estaSiendoComparada = this.props.parejaSeleccionada.indexOf(carta) > -1;                        
                        console.log(this.props.parejaSeleccionada);                        
                        return <Carta 
                            key={index}
                            icono={carta.icono}
                            estaSiendoComparada = {estaSiendoComparada}
                            //ahora esta va ser una propiedad que se envia a carta
                            seleccionarCarta = {() =>
                                this.props.seleccionarCarta(carta)//esta enviandole la misma funcion con la carta
                            }
                            fueAdivinada = {carta.fueAdivinada}
                        />
                    })
                }
            </div>
        );
    }
};