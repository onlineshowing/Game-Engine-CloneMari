/**
 * @name GameContainer 
 * @description Class for the DI Container
 */
class GameContainer {

  #dependencies = {}

  /**
   * @name set
   * @description 
   * Sets the objects to the dependency object (this)
   * @param {dependency} name of the dependency (to access)
   * @param {dependencyClass} object(class) of the dependency
   * @param {classConstruct} passes this (the object)
   */
  set({
    key,
    blueprint,
    args
  }) {
    this.#dependencies[key] = new blueprint(args)
  }

  /**
   * @name get
   * @description 
   * gets the objects from the dependency object (this)
   * @returns error or dependency
   */
  get(dependency) {

    if(
      !this.#dependencies[dependency]
    ) throw new Error(`No Dependency: ${dependency}`)
    
    return this.#dependencies[dependency]
  }

}

export default GameContainer