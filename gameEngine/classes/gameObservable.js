/**
 * @name Observable 
 * @description Class for functions/methods observing
 */
class Observable {

  // Stores the functions/methods to observe
  #observers = []
  
  /**
   * @name subscribe
   * @description adds function/method to the observer property
   * for action 
   * @param {addFunction} adds function to observe
   */
  subscribe(addFunction) {
    this.observers.push(addFunction)
  }

  /**
   * @name unsubscribe
   * @description removes function/method to the observer property
   * to prevent action 
   * @param {removeFunction} removes function to observe
   */
  unsubscribe(removeFunction) {
    this.#observers = this.#observers.filter(subscriber => subscriber !== removeFunction)
  }

  /**
   * @name notify
   * @description notifys/actions the functions in the observers property
   */
  notify() {
    this.#observers.forEach( observeritemFunction => observeritemFunction() )
  }

}

export default Observable