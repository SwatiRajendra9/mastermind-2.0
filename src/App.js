import React from "react";
import './App.css';


var colour;
let currentRow=0;

class Master extends React.Component {

  colour_palette = ['red', 'green', 'blue', 'gold', 'brown', 'orange', 'black', 'pink']
  
  constructor(props) {
    super(props);
    this.state = {
      codebreaker: this.getInitArray(),
      hintarray:this.getInitArray(),
      master: this.setMaster(),
      gameMode: 'play'
    }
    console.log(this.state.master)
  }

  getInitArray = () => {
    var tempCodeBreaker = [];
    for (let i=0; i<8; i++) {
      tempCodeBreaker[i] = []
      for (let j=0; j<4; j++) {
        tempCodeBreaker[i][j] = null;
      }
    }
    return tempCodeBreaker;
  }

  gameReset = () => {
    this.setState({
      gameMode: 'play', 
      master: this.setMaster(),
      codebreaker: this.getInitArray(),
      hintarray: this.getInitArray(),
    })
    currentRow = 0;
    colour = null;
    //console.log(this.state.master)
  }

  setMaster = () => {
    var tempMaster = []
    for(let k=0;k<4;k++) {
      const random = Math.floor(Math.random() * this.colour_palette.length);
      tempMaster.push(this.colour_palette[random]);
    }
    return tempMaster;
  }

  pick_color = (picked_colour) => {
    colour = picked_colour;
  }

  drop = (i,j) => { 
    console.log(this.state.master);
    if(currentRow === i) {
      let a = this.state.codebreaker.slice(); 
      a[i][j] = colour;
      this.setState({codebreaker : a});
    }
  }

  
  check_position = () => {
    let countRed = 0;
    let countBlack = 0;
    let usedMaster = [];
    for(let x=0;x<4;x++){
      for(let y=0;y<4;y++){
        if(this.state.master[x] === this.state.codebreaker[currentRow][y] && x===y) {
          countRed++;
          usedMaster.push(x);
        }
      }
    }

    for(let a=0;a<4;a++) {
      for(let b=0;b<4;b++){
        if(this.state.master[a] === this.state.codebreaker[currentRow][b] && a !== b && !usedMaster.includes(a)) {
          countBlack++;
          usedMaster.push(a);
        }
      }
    }
    
    let tempHintArray=this.state.hintarray.slice();
    for (let i=0; i<countRed; i++) {
      tempHintArray[currentRow][i] = 'green';
    }
    for (let i=countRed; i<countRed + countBlack; i++) {
      tempHintArray[currentRow][i] = 'blue';
    }
    for (let i=countRed + countBlack; i<4; i++) {
      tempHintArray[currentRow][i] = 'black';
    }
    this.setState({hintarray : tempHintArray});
    if(countRed === 4) {
      this.setState({"gameMode": "win"});
    }
    currentRow++;
    if (currentRow === 8) {
      this.setState({gameMode: "lost"});
    }
  }

  render() {
    if (this.state.gameMode === 'win') {
      return (
        <div id='game-result'>
          <p id='victory'>Victory 🎉</p>
          <button id='start' onClick={this.gameReset.bind(this)}>Replay</button>
        </div>
      )
    }
    if (this.state.gameMode === 'lost') {
      return (
        <div id='game-result'>
          <p id='victory'>Loss :(</p>
          <button id='start' onClick={this.gameReset.bind(this)}>Replay</button>
        </div>
      )
    }
    else {
      return (
        <div id='main'>
          <h1 >Mastermind</h1>
          <div id='game-board'>
            <div className='rule-container'>
              <div className='rule-heading'>Rules</div>
              <div id='rules'>
                Try to guess the pattern, in both order and color, within ten turns. 
                After submitting a row, a green peg is placed for each code peg 
                from the guess which is correct in both color and position. A blue peg 
                indicates the existence of a correct color code peg placed in the wrong position.
                A black peg indicated none of the above.
                More info on <a href="https://en.wikipedia.org/wiki/Mastermind_(board_game)">Wikipedia</a>.
              </div>
            </div>
            <div id='game'>
              {
                this.state.codebreaker.map((cb, index) => (
                  <div className='subcontainer'>
                      <div className='circle' onClick={this.drop.bind(this,index,0)} style={{backgroundColor : this.state.codebreaker[index][0]}}></div>
                      <div className='circle' onClick={this.drop.bind(this,index,1)} style={{backgroundColor : this.state.codebreaker[index][1]}}></div>
                      <div className='circle' onClick={this.drop.bind(this,index,2)} style={{backgroundColor : this.state.codebreaker[index][2]}}></div>
                      <div className='circle' onClick={this.drop.bind(this,index,3)} style={{backgroundColor : this.state.codebreaker[index][3]}}></div>

                      <div className='hint-circle-parent'>
                        <div className="hint-circle" style={{backgroundColor : this.state.hintarray[index][0]}}></div>
                        <div className="hint-circle" style={{backgroundColor : this.state.hintarray[index][1]}}></div>
                        <div className="hint-circle" style={{backgroundColor : this.state.hintarray[index][2]}}></div>
                        <div className="hint-circle" style={{backgroundColor : this.state.hintarray[index][3]}}></div>
                      </div>     

                      <button id='button' onClick={this.check_position}>Check</button>   
                  </div>
                ))
              }

              <div id="color-palette" >
                      <div className="circle" style={{backgroundColor : "red"}} onClick={this.pick_color.bind(this,'red')}></div>
                      <div className="circle" style={{backgroundColor : "green"}} onClick={this.pick_color.bind(this,'green')}></div>
                      <div className="circle" style={{backgroundColor : "blue"}} onClick={this.pick_color.bind(this,'blue')}></div>
                      <div className="circle" style={{backgroundColor : "gold"}} onClick={this.pick_color.bind(this,'gold')}></div>
                      <div className="circle" style={{backgroundColor : "brown"}} onClick={this.pick_color.bind(this,'brown')}></div>
                      <div className="circle" style={{backgroundColor : "orange"}} onClick={this.pick_color.bind(this,'orange')}></div>
                      <div className="circle" style={{backgroundColor : "black"}} onClick={this.pick_color.bind(this,'black')}></div>
                      <div className="circle" style={{backgroundColor : "pink"}} onClick={this.pick_color.bind(this,'pink')}></div>
              </div>

              <br></br>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default Master;



         

