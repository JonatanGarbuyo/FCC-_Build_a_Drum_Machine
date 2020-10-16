import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';


const drumSet = [
  {
    id:"hiHatOpen",
    imgUrl: "https://www.sessiontown.com/games/drums/images/hho.png",
    audioUrl:"https://www.sessiontown.com/games/drums/audios/hho.mp3",
    keyboardLetter: "Q"
  },
  {
    id: "crash",
    imgUrl:"https://www.sessiontown.com/games/drums/images/crash.png",
    audioUrl:"https://www.sessiontown.com/games/drums/audios/crash.mp3",
    keyboardLetter: "W"
  },
  {
    id:"ride",
    imgUrl: "https://www.sessiontown.com/games/drums/images/ride.png",
    audioUrl:"https://www.sessiontown.com/games/drums/audios/ride.mp3",
    keyboardLetter: "E"
  },
  {
    id:"tomHi",
    imgUrl: "https://www.sessiontown.com/games/drums/images/tomh.png",
    audioUrl:"https://www.sessiontown.com/games/drums/audios/tomh.mp3",
    keyboardLetter: "A"
  },
  {
    id:"tomMed",
    imgUrl: "https://www.sessiontown.com/games/drums/images/tomm.png",
    audioUrl:"https://www.sessiontown.com/games/drums/audios/tomm.mp3",
    keyboardLetter: "S"
  },
  {
    id:"tomLow",
    imgUrl: "https://www.sessiontown.com/games/drums/images/toml.png",
    audioUrl:"https://www.sessiontown.com/games/drums/audios/toml.mp3",
    keyboardLetter: "D"
  },
  {
    id:"hiHatClose",
    imgUrl: "https://www.sessiontown.com/games/drums/images/hhc.png",
    audioUrl:"https://www.sessiontown.com/games/drums/audios/hhc.mp3",
    keyboardLetter: "Z"
  },
  {
    id:"snareDrum",
    imgUrl: "https://www.sessiontown.com/games/drums/images/sd.png",
    audioUrl:"https://www.sessiontown.com/games/drums/audios/sd.mp3",
    keyboardLetter: "X"
  },
  {
    id:"bassDrum",
    imgUrl: "https://www.sessiontown.com/games/drums/images/bd.png",
    audioUrl:"https://www.sessiontown.com/games/drums/audios/bd.mp3",
    keyboardLetter: "C"
  }
];


class PadItem extends React.Component{
  
  componentDidMount() {

    console.log( "componentDidMount" ); ////

    const element = document.getElementById(this.props.item.id);
    document.addEventListener('keydown', this.handleKeyPress );
    element.addEventListener('touchstart', this.handleTouchStart , { passive: false } );
    element.addEventListener('click',  this.handleTouchStart , { passive: false } );
  } 
  
  handleKeyPress = (e) => {
    if (e.code === "Key" + this.props.item.keyboardLetter) {
      this.props.myPlay(this.props.item.id, this.props.item.keyboardLetter);
    }
  }
  
  handleTouchStart = (e) => {
    console.log(e.target.value);
    e.preventDefault();
    this.props.myPlay(this.props.item.id, this.props.item.keyboardLetter)
  }
  
  render(){
    
    console.log( "render PadItem" ) ////

    return(
      <div className="drum-pad" id={this.props.item.id}
        style = {{ backgroundImage: "url("+this.props.item.imgUrl+")" }}
        >
        <audio className="clip" 
          id={this.props.item.keyboardLetter} 
          //src={this.props.item.audioUrl}  
          src={this.props.audioUrl}  
          >
        </audio>
        <strong>{this.props.item.keyboardLetter}</strong>
      </div>   
    )
  }
};

class DrumMachine extends React.Component{
    
  state = {
      audios : {
        "Q":"https://www.sessiontown.com/games/drums/audios/hho.mp3",
        "W":"https://www.sessiontown.com/games/drums/audios/crash.mp3",
        "E":"https://www.sessiontown.com/games/drums/audios/ride.mp3",
        "A":"https://www.sessiontown.com/games/drums/audios/tomh.mp3",
        "S":"https://www.sessiontown.com/games/drums/audios/tomm.mp3",
        "D":"https://www.sessiontown.com/games/drums/audios/toml.mp3",
        "Z":"https://www.sessiontown.com/games/drums/audios/hhc.mp3",
        "X":"https://www.sessiontown.com/games/drums/audios/sd.mp3",
        "C":"https://www.sessiontown.com/games/drums/audios/bd.mp3"
      },
      display:"display"
    };
  

  myPlay = (display, audioId) => {

    console.log( " myPlay" ) ////

    const sound = document.getElementById(audioId);
    sound.currentTime = 0;
    sound.play()
      .catch((e) => console.log(e));

    this.setState({
      display: display
    })
  }

  drumKit = drumSet.map( (item) => { 
    return (
      <PadItem 
        audioUrl={this.state.audios[item.keyboardLetter]}
        key={item.id} 
        item={item} 
        myPlay={this.myPlay}
      />
    )
  });

  render(){
    return (
      <div className="container jumbotron">
        <h1 className="text-center">Drum Machine </h1>
        <h4>Click the icon or press the key letter</h4>
        <br/>
        <div id="pad"  >
          {this.drumKit}
        <h3 id="display" className="text-center">{this.state.display}</h3>
        </div>
      </div>
    );
  }
}


ReactDOM.render(
  <React.StrictMode>
    <DrumMachine />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
