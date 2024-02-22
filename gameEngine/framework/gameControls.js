/**
 * @name GameControls
 * @description Handles the controls/inputs
 */
class GameControls {
  // Stores key or mouse outputs
  #types = {
    keyControls: [],
    mouseControls: [],
  };

  /**
   * @name constructor
   * @description Runs on class creation
   * Creates the GameControls
   * Adds a window event listenrs for mouse and keyboard actions
   * Only keydown for time being
   */
  constructor() {
    [
      {
        key: "click",
        method: (e) => this.#mouseControl(e),
      },
      {
        key: "keydown",
        method: (e) => this.#keyboardControl(e),
      }
    ].forEach((i) => {
      document.addEventListener(i.key, (e) => i.method(e));
    })
  }

  /**
   * @name addControl
   * @description Adds control inputs
   * @param {type} type of input/control
   * @param {callbacks} callbacks to run
   */
  addControl(type, callbacks) {
    if (
      !callbacks
    ) return

    Object.values(this.#types).forEach((c) => {
      c.push({
        type: type,
        callbacks: callbacks,
      });
    });
  }

  /**
   * @name keyboardControl
   * @description Checks for keyboard events
   * @param {event} The eventcode key
   * @returns The output
   */
  #keyboardControl(event) {
    this.#returnOutput(
      this.#types.keyControls.find((e) => e.type.keyboard === event.keyCode)
    );
  }

  /**
   * @name mouseControl
   * @description Checks for mouse events
   * @param {event} The event type
   * @returns The output
   */
  #mouseControl(event) {
    this.#returnOutput(
      this.#types.mouseControls.find(
        (e) => e.type.click === "document" || event.target
      )
    );
  }

  /**
   * @name returnOutput
   * @description Runs the output event from the input
   * @param {control} The control type
   * @returns The event
   */
  #returnOutput(control) {
    if (
      !control
    ) return;

    return [control.callbacks].forEach((item) => {
      const [fn] = Object.values(item);
      if (!fn) return;
      fn();
    });
  }
}

export default GameControls;
