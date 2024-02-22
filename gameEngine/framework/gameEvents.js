/**
 * @name GameEvents 
 * @description Handles the events
 */
class GameEvents {

  #state = {
    win: [],
    lose: [],
    state: [],
    start: null,
    end: null,
    winGame: null,
    loseGame: null,
    restart: null,
  };

  /**
   * @name constructor
   * @description Runs on class creation
   * Creates the gameEngine
   * @param {gameEngine} Passes the engine
   */
  constructor(
    gameEngine
  ){
    this.gameEngine = gameEngine;
  }

  /**
   * @name gameCheck
   * @description Checks the game conditions
   */
  gameCheck(){
    this.gameWin()
    this.gameLose()
    this.gameState()
  }

  /**
   * @name addCondition
   * @description Adds new condition to event
   * @param {condition} type of condition
   * @param {actions} action of condition
   */
  addCondition(condition, actions){

    const {
      type,
      math,
      amount,
      callback
    } = actions

    this.#state[condition][type] = {
      type: type,
      math: math,
      amount: amount,
      callback: callback
    }

  }

  /**
   * @name gameStartMechanics
   * @description Adds function to run when game starts
   * @param {callbacks} callbacks for mechanic
   */
  gameStartMechanics( callbacks ){
    this.#state.start = callbacks.bind()
  }

  /**
   * @name gameEndMechanics
   * @description Adds function to run when game end
   * @param {callbacks} callbacks for mechanic
   */
  gameEndMechanics( callbacks ){
    this.#state.end = callbacks.bind()
  }

  /**
   * @name gameRestartMechanics
   * @description Adds function to run when game restarts
   * @param {callbacks} callbacks for mechanic
   */
  gameRestartMechanics( callbacks ){
    this.#state.restart = callbacks.bind()
  }

  /**
   * @name gameWinMechanics
   * @description Adds function to run when user wins
   * @param {callbacks} callbacks for mechanic
   */
  gameWinMechanics( callbacks ){
    this.#state.winGame = callbacks.bind()
  }

  /**
   * @name gameLoseMechanics
   * @description Adds function to run when user loses
   * @param {callbacks} callbacks for mechanic
   */
  gameLoseMechanics( callbacks ){
    this.#state.loseGame = callbacks.bind()
  }

  /**
   * @name gameStart
   * @description Starts a new game
   */
  gameStart(){
    this.#state.start.apply()
  }

  /**
   * @name gameEnd
   * @description Ends game
   */
  gameEnd(){
    this.#state.end.apply()
  }

  /**
   * @name gameRestart
   * @description Restarts game
   */
  gameRestart(){
    this.#state.restart.apply()
  }

  /**
   * @name gameWin
   * @description Runs when game is won
   */
  gameWin(){

    for(const win in this.#state.win)
      this.gameSwitch( win, 'win' )

  }

  /**
   * @name gameLose
   * @description Runs when game is lost
   */
  gameLose(){

    for(const lose in this.#state.lose)
      this.gameSwitch( lose, 'lose' )

  }

  /**
   * @name gameState
   * @description Runs games state conditions
   */
  gameState(){

    for(const state in this.#state.state)
      this.gameSwitch( state, 'state' )

  }

  /**
   * @name gameSwitch
   * @description Runs the conditions
   * @param {value} value for condition
   * @param {condition} condition passed
   * ! SWITCH CASE AS USES MATH
   */
  gameSwitch( value, condition ){

    const
      array = this.#state[condition][value],
      state = this.gameEngine.state.getState(array.type)

    switch (array.math) {
      case true:
        if(
          (array.amount ? state : array.amount) === true
        ) this.#gameConditions(array, condition)
      case false:
        if(
          (array.amount ? state : array.amount) === false
        ) this.#gameConditions(array, condition)
      case '>':
        if(
          (array.amount ? state : array.amount) > array.amount
        ) this.#gameConditions(array, condition)
      break
      case '<':
        if(
          (array.amount ? state : array.amount) < array.amount
        ) this.#gameConditions(array, condition)
      break
      case 'length':
        if(
          (array.amount ? state.length : array.amount) === array.amount
        ) this.#gameConditions(array, condition)
      break
    }

  }

  /**
   * @name gameConditions
   * @description Run state / event callback
   * @param {array}  array
   */
  #gameConditions(array, condition){
    // this.gameSwitchPassed( condition )
    if(
      array.callback
    )
      return array.callback({
        win: () => this.gameSwitchPassed('win'),
        lose: () => this.gameSwitchPassed('lose')
      })
  }

  /**
   * @name gameSwitchPassed
   * @description Plays out the win or lose function
   * @param {condition} condition passed
   */
  gameSwitchPassed( condition ){
    if(
      condition !== 'win' &&
      condition !== 'lose'
    ) return
    (condition === 'win') ? this.#state.winGame() : (condition === 'lose') ? this.#state.loseGame() : null
  }

}

export default GameEvents