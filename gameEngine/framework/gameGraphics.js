/**
 * @name GameGraphics 
 * @description Handles the graphics/outputs
 */
class GameGraphics {

  // Stores sprites
  #sprite = {}

  /**
   * @name addSprite
   * @description Adds spirte to object
   * @param {type} type of sprite
   * @param {sprite} sprite description
   */
  addSprite(
    type, 
    sprite
  ){
    this.#sprite[type] = sprite
  }

  /**
   * @name getSprite
   * @description Gets spirte from object
   * @param {type} type of sprite
   * @return {sprite} sprite
   */
  getSprite(
    type
  ){
    if(!this.#sprite[type]) return
    return this.#sprite[type]
  }

  /**
   * @name addAnimation
   * @description Adds callback to sprite
   * @param {type} type of sprite
   * @param {sprite} sprite description
   * @param {callbacks} callbacks to run
   */
  addAnimation(
    type,
    sprite,
    callbacks 
  ){
    this.#sprite[type] = {
      sprite: sprite,
      callbacks: callbacks
    }
  }

  /**
   * @name runAnimation
   * @description Runs the sprites callbacks
   * @param {type} type of sprite
   * @param {sprite} sprite description
   * @param {args} callbacks to run
   * @returns sprites callbacks
   */
  runAnimation(
    type, 
    callback,
    ...args
  ){
    return this.#sprite[type].callbacks[callback]({
      sprite: this.#sprite[type].sprite,
      args: args ? args : null    
    })
  }

}

export default GameGraphics