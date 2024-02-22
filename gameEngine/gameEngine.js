import GameContainer from './classes/gameContainer.js'

import GameState from './framework/gameState.js'
import GameEvents from './framework/gameEvents.js'
import GameControls from './framework/gameControls.js'
import GameGraphics from './framework/gameGraphics.js'

/**
 * @name GameEngine 
 * @description GameEngines boot and manifold
 */
class GameEngine {

  /**
   * @name constructor
   * @description Runs on class creation
   * Creates the dependency container
   */
  constructor() {
    if (
      GameEngine._instance
    ) return
    GameEngine._instance = this
    this.container = new GameContainer()
    this.#SetContainer()
  }

  /**
   * @name SetContainer
   * @description 
   * Adds the dependencies to the container
   * Binds them
   */
  #SetContainer(){

    this.container.set({
      key: 'gameGraphics',
      blueprint: GameGraphics
    })

    this.container.set({
      key: 'gameEvents',
      blueprint: GameEvents,
      args: this
    })

    this.container.set({
      key: 'gameControls',
      blueprint: GameControls,
      args: this
    })

    this.container.set({
      key: 'gameState',
      blueprint: GameState,
      args: this
    })
    
  }

  /**
   * @name graphics
   * @description    
   * Using get the user can access the gameGraphics object
   * @returns {gameGraphics} object 
   */
  get graphics() {
    return this.container.get('gameGraphics')
  }

  /**
   * @name events
   * @description    
   * Using get the user can access the gameEvents object
   * @returns gameEvents object 
   */
  get events() {
    return this.container.get('gameEvents')
  }

  /**
   * @name controls
   * @description    
   * Using get the user can access the gameControls object
   * @returns gameControls object 
   */
  get controls() {
    return this.container.get('gameControls')
  }

  /**
   * @name state
   * @description    
   * Using get the user can access the gameState object
   * @returns gameState object 
   */
  get state() {
    return this.container.get('gameState')
  }

}

export default GameEngine