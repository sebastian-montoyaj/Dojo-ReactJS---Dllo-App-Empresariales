import React, { Component } from 'react';//estoy importando un componente de la libreria de react 
import Header from './Header';
import Tablero from './Tablero';
import logo from './logo.svg';
import './App.css';
import construirBaraja from './utils/construirBaraja';

//creamos un metodo que se llama estado inicial que regresa el estado inicial de la aplicación
const getEstadoInicial = () => {
  //contruimos la baraja para eso llamamos a construir baraja
  const baraja = construirBaraja();
  return{
    baraja,
    parejaSeleccionada: [],//Esta es otra propiedad
    estaComparando: false, //este va estar en true mientras se calcula si las dos son iguales
    numeroDeIntentos: 0
  };
}

//declaramos una clase que extiende de la componente de react
class App extends Component {
  //Ahora se debe construir un constructor para decirle a react cual es tu estado inicial
  constructor(props){//siempre reciben los props y invocamos a super props
    super(props);
    this.state = getEstadoInicial();
  }

  render() {
    //para desplegar los diferentes componentes
    return (
      <div className="App">
        <Header 
        numeroDeIntentos = {this.state.numeroDeIntentos}
        resetearPartida={() => this.resetearPartida()}
        />
        <Tablero
          baraja = {this.state.baraja}//aqui estamos enviando la propiedada baraja al tablero
          parejaSeleccionada = {this.state.parejaSeleccionada}
          //debemos pasar una referencia para el método seleccionar carta y se hace con arrou function
          seleccionarCarta = {(carta)=> this.seleccionarCarta(carta)}
        />
      </div>
    );
  }

  seleccionarCarta(carta) {
    //aqui reportamos en caso de que el no pueda retornar carta
    if (this.state.estaComparando||
      this.state.parejaSeleccionada.indexOf(carta)>-1||//aqui si el array ya ha sido seleccionado
      carta.fueAdivinada//hay una propiedad en carta que dice si ya fue adivinada
    ) {
      return;
    }
    
    const parejaSeleccionada = [...this.state.parejaSeleccionada, carta];
    this.setState({
      parejaSeleccionada
    })
    //debemos usar un array para saber que paraje esta siendo seleccionada

    if(parejaSeleccionada.length === 2){//esto me dice que le usuario ha escogido dos cartas
      this.compararPareja(parejaSeleccionada)
    }
  }

  compararPareja(parejaSeleccionada) {
    this.setState({estaComparando: true});//aqui actualizamos el estado

    setTimeout(() => {
      const [primeraCarta, segundaCarta] = parejaSeleccionada;
      let baraja = this.state.baraja;

      //comparamos la carta
      if(primeraCarta.icono === segundaCarta.icono){
        baraja = baraja.map((carta) => {
          if(carta.icono !== primeraCarta.icono){
            return carta;
          }
          //si la carta si correcponde vamos a enviar la carta pero con una modificación con la fueadivinada en true
          return {...carta, fueAdivinada: true};
        });
      }//luego actualizamos el estado
      
      this.verificarSiHayGanador(baraja);
      this.setState({
        baraja,
        estaComparando: false,
        parejaSeleccionada: [],
        numeroDeIntentos: this.state.numeroDeIntentos + 1
      })
      
    },1000)//da un tiempo para que el usuario pueda ver las cartas que escogio
  }


//Alejo: Verificar si hay un ganador
verificarSiHayGanador(baraja){
  //baraja.forEach((carta) => carta.fueAdivinada = true); //Para Verificar que funciona el método
  if (baraja.filter((carta) => !carta.fueAdivinada).length === 0) {
    alert(`Ganaste en ${this.state.numeroDeIntentos} intentos`); 
  }
}

resetearPartida(){
  this.setState(getEstadoInicial());
}

}
export default App;
/*Al final se tienen un par de problemas: 
El primero es que cuando se resetean las cartas se alcanza a ver las nuevas cartas durante medio segundo
El segundo es que cuando se gana no se cuenta el último intento */