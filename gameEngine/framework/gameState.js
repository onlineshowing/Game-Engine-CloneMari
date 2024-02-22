import Observable from '../classes/gameObservable.js'

/**
 * @name GameState 
 * @description Handles the state
 */
class GameState {

  /**
   * @name constructor
   * @description Runs on class creation
   * Creates the GameState
   * @param {gameEngine} Passes the engine
   */
  constructor(
    gameEngine
  ) {
    this.gameEngine = gameEngine;
    // Constructs the Observable class
    this.observable = new Observable
    this._state = {}
  }

  /**
   * @name addState
   * @description Add state to object
   * binds the state to the observer
   * if object or array sets each on individually
   * @param {state} state name
   * @param {value} state value
   */
  addState(
    state, 
    value = null
  ) {

    if(
      typeof state === 'object' ||
      typeof state === 'array'
    ){
      this._state = { ...state }
      return this.#SetObservales( state )
    }

    this._state[state] = value
    this.#SetObservale( state )

  }

  /**
   * @name getState
   * @description Returns state
   * Hard copied to prevent editing
   * @param {state} state name
   * @returns state value
   */
  getState( state ) {
    return JSON.parse(JSON.stringify(this._state))[state]
  }

  /**
   * @name editState
   * @description Edit state / runs the updateState method
   * @param {state} state name
   * @param {args} args
   * @returns state value
   */
  editState( 
    state,
    args = null
  ) {

    if(
      args !== null
    ) this._state[state] = args

    this.#updateState()

    return this._state[state]

  }

  /**
   * @name removeState
   * @description Removes (delete) state / runs the updateState method
   * @param {state} state name
   */
  removeState( state ) {
    delete this._state[state]
    this.#updateState()
  }

  /**
   * @name updateState
   * @description Updates state / runs the updateState method
   * Checks if any game conditions are meet
   */
  #updateState() {
    this.observable.notify()
    this.gameEngine.events.gameCheck()
  }

  /**
   * @name SetObservale
   * @description Subscribe the state to the observer object
   * @param {state} state name
   */
  #SetObservale( state ){

    if(
      !document.querySelector(`#${state}`)
    ) return

    const updateValue = () => {
      document.querySelector(`#${state}`).textContent = this.state[state]
    }

    this.observable.subscribe(updateValue)

  }
  
  /**
   * @name SetObservales
   * @description Subscribe multiple states to the observer object
   * @param {states} states object
   */
  #SetObservales( states ){

    for (
      const state in states
    ) this.#SetObservale( state )

  }

  /**
   * @name state
   * @description Returns (gets) state
   * @returns state value
   */
  get state() {
    return this._state
  }

}

export default GameState