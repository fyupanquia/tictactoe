import React, { Component } from 'react';
import './App.css';
import uid from 'uid'

class App extends Component {

  constructor(){
    super()
    this.state = {
      turn : 'X',
      gameEnd: false,
      winner:undefined,
      squares:''
    }

    this.gameState = {
      board: Array(9).fill(''),
      totalMoves:0,
      totalgames:0
    }
  }

  componentWillMount(){
        this.restart()

  }
  
  clicked(e){
    let index = e.target.dataset.square

    if(!this.state.gameEnd){
      if(this.gameState.board[index]==''){

        this.gameState.board[index] = this.state.turn

        e.target.innerText = this.state.turn
        this.setState({
          turn: this.state.turn == 'X' ? 'O' : 'X',
          totalMoves:this.gameState.totalMoves++
        })

        var result = this.checkWinner()

        if(result == 'X'){

          this.setState({
            gameEnd: true,
            winner: 'X',
            winnerLine:this.msgWinner('Match won by X')
          })

        }else if(result == 'O'){

          this.setState({
            gameEnd: true,
            winner: 'O',
            winnerLine:this.msgWinner('Match won by O')
          })

        }else if(result == 'draw'){

          this.setState({
            gameEnd: true,
            winner: 'draw',
            winnerLine:this.msgWinner('Match is drawn')
          })

        }

      }
    }
  }

  msgWinner(msg){
    return (<div>
                <div>{msg}</div>
                <div onClick={(e)=>this.restart(e) } className="restart" >RESTART</div>
            </div>)
  }

  restart(){

    this.gameState.board = Array(9).fill('')

    this.setState({
                    gameEnd:false,
                    winnerLine:'',
                    squares: <div id="board" onClick={(e)=>this.clicked(e)} >
                                        {
                                          this.gameState.board.map((square,key)=>{
                                                      return <div className="square" data-square={key} key={uid()}></div>
                                                    })
                                        }
                              </div>
                  })

  }

  checkWinner(){
    let moves =[ [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6] ],
        board = this.gameState.board

        for (let i = 0; i < moves.length; i++) {
          if( board[moves[i][0]] == board[moves[i][1]] && board[moves[i][1]] == board[moves[i][2]] )
            return board[moves[i][0]]
        }
        if(this.gameState.totalMoves==9){
          return 'draw'
        }
  }

  render() {
    return (
      <div id="game">
        <div id="status">{this.state.winnerLine}</div>
        <div id="head">
          World's best tic tac toe AI
        </div>
        <div>
            {
              this.state.squares
            }
        </div>
      </div>
    )
  }



}

export default App;
