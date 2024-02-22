/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _gameEngine_gameEngine_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameEngine/gameEngine.js */ \"./gameEngine/gameEngine.js\");\n\n/**\n * Start Game Engine\n */\n\nconst gameEngine = new _gameEngine_gameEngine_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n/**\n * Carousel\n * Runs 2 carousels for slot effect\n */\n\nclass Carousel {\n  // Call back for animation of the carousel\n  animationRegister({\n    sprite\n  }) {\n    let carousel = [];\n    [...sprite].forEach((row, key) => {\n      // Registers both sliders\n      gameEngine.graphics.addSprite(`slideTwo_${row}`, row.querySelector(\".image_two\"));\n      gameEngine.graphics.addSprite(`slideOne_${row}`, row.querySelector(\".image_one\"));\n      carousel[key] = {\n        slideOne: {\n          direction: 0,\n          element: gameEngine.graphics.getSprite(`slideOne_${row}`)\n        },\n        slideTwo: {\n          direction: 100,\n          element: gameEngine.graphics.getSprite(`slideTwo_${row}`)\n        }\n      };\n    });\n    gameEngine.state.addState(\"carousel\", carousel);\n  } // Start the animation\n\n\n  animationStart() {\n    gameEngine.state.editState(\"carousel\").map((value, key) => {\n      this.carouselAnimation(value, key);\n    });\n  } // Carousels animation\n\n\n  carouselAnimation(value) {\n    // Sets speed of the interval\n    // Provides direction for each slide\n    // - Sets attribute for each slide\n    const carouselAnimationInterval = () => {\n      Object.entries(value).forEach(keySingle => {\n        const [key] = keySingle,\n              slideValue = value[key];\n        if (key !== \"slideOne\" && key !== \"slideTwo\") return; // If no clicks\n\n        if (gameEngine.state.getState(\"clicks\") == 0) {\n          slideValue.element.parentElement.setAttribute(\"slide-movement\", \"true\");\n        } // Each slide\n\n\n        if (key !== 1) {\n          slideValue.direction = slideValue.direction - 1;\n\n          if (value.slideOne.direction == -100) {\n            value.slideOne.direction = 0;\n            value.slideTwo.direction = 100;\n          }\n        }\n\n        if (key === 1) {\n          slideValue.direction = slideValue.direction + 1;\n\n          if (value.slideTwo.direction == 100) {\n            value.slideTwo.direction = 0;\n            value.slideOne.direction = -100;\n          }\n        }\n\n        if (slideValue.element.parentElement.getAttribute(\"slide-movement\") === \"true\") {\n          slideValue.element.style.transform = `translateX(${slideValue.direction}%)`;\n        }\n      });\n    }; // Works the same aniamtionframe\n\n\n    value.interval = clearInterval(value.interval);\n    value.interval = setInterval(carouselAnimationInterval, gameEngine.state.getState(\"speed\") // Sets the speed\n    );\n  } // Select the carousel\n  // - Run the animation\n\n\n  carouselSelect({\n    sprite\n  }) {\n    [...sprite].some(row => {\n      if (row.getAttribute(\"slide-movement\") !== \"true\") return;\n      row.setAttribute(\"slide-movement\", \"false\");\n      gameEngine.graphics.runAnimation(\"carousel\", \"carouselSelected\", [row.querySelector(\".image_one\"), row.querySelector(\".image_two\")], row.querySelector(\".image_two\").style.transform.replace(/[^\\d.]/g, \"\"));\n      return true;\n    });\n  }\n  /*\n        // Registers both sliders\n        gameEngine.graphics.addSprite('slideTwo', row.querySelector(\".image_two\"))\n        gameEngine.graphics.addSprite('slideOne', row.querySelector(\".image_one\"))\n  \n        carousel[key] = {\n          slideOne: {\n            direction: 0,\n            element: gameEngine.graphics.getSprite('slideOne')\n          },\n          slideTwo: {\n            direction: 100,\n            element: gameEngine.graphics.getSprite('slideTwo')\n          }\n        }\n        */\n  // Remove the ending (after game is done)\n\n\n  removeFinsh({\n    sprite\n  }) {\n    const rows = [...sprite];\n    rows.forEach(row => {\n      [...row.children].forEach(item => {\n        item.classList.remove(\"finsh\");\n      });\n    });\n  } // On game finsh\n\n\n  addFinsh({\n    args\n  }) {\n    const [rows] = [...args];\n    rows.forEach(row => {\n      // row_minus = row.style.transform.includes(\"-\")\n      // row_value = row.style.transform.replace(/[^\\d.]/g, '')\n      row.classList.add(\"finsh\");\n    });\n  } // On speed change\n\n\n  speedChangeCarousel() {\n    gameEngine.state.editState(\"carousel\").map((value, key) => {\n      this.carouselAnimation(value, key);\n    });\n  } // Selects the carousel on click\n  // - On click goes to the icon which was clicked on\n\n\n  carouselSelected({\n    args\n  }) {\n    // Mile stones are the precentages of where the images are\n    // - Mushroom twice as it is first and last\n    const milestones = {\n      mushroom: {\n        slide: {\n          start: 100,\n          end: 87,\n          resetStart: -100,\n          resetEnd: 0\n        }\n      },\n      mushroom_2: {\n        slide: {\n          start: 22,\n          end: 0,\n          resetStart: -100,\n          resetEnd: 0\n        }\n      },\n      star: {\n        slide: {\n          start: 86,\n          end: 54,\n          resetStart: -33,\n          resetEnd: 66\n        }\n      },\n      flower: {\n        slide: {\n          start: 53,\n          end: 23,\n          resetStart: -66,\n          resetEnd: 33\n        }\n      }\n    }; // Change to middle (selected)\n    // - Resets\n\n    const [elements, postion] = [...args],\n          [slideTwo, slideOne] = elements,\n          elementArray = elements,\n          selected = gameEngine.state.getState(\"selected\");\n\n    for (const property in milestones) {\n      if (postion <= milestones[property].slide.start && postion >= milestones[property].slide.end) {\n        gameEngine.graphics.runAnimation(\"carousel\", \"addFinsh\", elementArray);\n        slideOne.style.transform = `translateX(${milestones[property].slide.resetEnd}%)`;\n        slideTwo.style.transform = `translateX(${milestones[property].slide.resetStart}%)`;\n        selected.push(property.includes(\"_\") ? property.split(\"_\")[0] : property);\n      }\n    }\n\n    gameEngine.state.editState(\"selected\", selected);\n  }\n\n}\n/**\n * Icons\n * Object for bottom icons\n */\n\n\nclass Icons {\n  // Select Icons based on selected object\n  iconSelect({\n    sprite\n  }) {\n    const src = gameEngine.state.getState(\"selected\").pop(),\n          count = gameEngine.state.getState(\"selected\").length,\n          [child] = sprite[count - 1].children ? sprite[count - 1].children : null;\n    child.setAttribute(\"src\", `./../assets/images/${src}.png`);\n  } // Clears all icons after round\n\n\n  iconsClear({\n    sprite\n  }) {\n    [...sprite].forEach(item => {\n      const [img] = item.children;\n      img.setAttribute(\"src\", \"./../assets/images/mark.png\");\n    });\n  }\n\n}\n/**\n * Arrows\n * Object for arrow icons\n */\n\n\nclass Arrows {\n  // Speed Up\n  speedUpArrows({\n    sprite\n  }) {\n    const speed = [...sprite].some(row => {\n      if (row.classList.contains(\"active\")) {\n        return false;\n      }\n\n      row.classList.add(\"active\");\n      gameEngine.graphics.runAnimation(\"carousel\", \"speedChangeCarousel\");\n      return true;\n    });\n    if (!speed) return;\n    gameEngine.state.editState(\"speed\", gameEngine.state.getState(\"speed\") - 1);\n  } // Speed Down\n\n\n  speedDownArrows({\n    sprite\n  }) {\n    const speed = [...sprite].reverse().some(row => {\n      if (!row.classList.contains(\"active\")) {\n        return false;\n      }\n\n      row.classList.remove(\"active\");\n      gameEngine.graphics.runAnimation(\"carousel\", \"speedChangeCarousel\");\n      return true;\n    });\n    if (!speed) return;\n    gameEngine.state.editState(\"speed\", gameEngine.state.getState(\"speed\") + 1);\n  }\n\n}\n/**\n * AnimationsEvents Class\n */\n\n\nclass AnimationsEvents {\n  constructor() {\n    /**\n     * Load Functions\n     */\n    this.#carousel();\n    this.#icons();\n    this.#arrows();\n  }\n\n  #carousel() {\n    const carouselCallbacks = new Carousel();\n    /*\n      Add Carousel Callbacks to Object\n    */\n\n    const CarouselCallbacks = {\n      animationRegister: carouselCallbacks.animationRegister,\n      animationStart: carouselCallbacks.animationStart,\n      carouselAnimation: carouselCallbacks.carouselAnimation,\n      carouselSelect: carouselCallbacks.carouselSelect,\n      carouselSelected: carouselCallbacks.carouselSelected,\n      speedChangeCarousel: carouselCallbacks.speedChangeCarousel,\n      removeFinsh: carouselCallbacks.removeFinsh,\n      addFinsh: carouselCallbacks.addFinsh\n    };\n    /**\n     * Add Carousel to Graphics\n     *\n     * @param {string} carousel sets key\n     * @param {Element/s} element passes element\n     * @param {Object} callbacks passes callbacks\n     */\n\n    gameEngine.graphics.addAnimation(\"carousel\", document.querySelectorAll(\".slider_wrap .item\"), { ...CarouselCallbacks\n    });\n  }\n\n  #icons() {\n    const iconsCallbacks = new Icons();\n    /**\n     * Add Icon Callbacks to Object\n     */\n\n    const IconBlockCallbacks = {\n      iconSelect: iconsCallbacks.iconSelect,\n      iconsClear: iconsCallbacks.iconsClear\n    };\n    /**\n     * Add Icons to Graphics\n     *\n     * @param {string} icons sets key\n     * @param {Element/s} element passes element\n     * @param {Object} callbacks passes callbacks\n     */\n\n    gameEngine.graphics.addAnimation(\"icon_blocks\", document.querySelectorAll(\".icon_block\"), { ...IconBlockCallbacks\n    });\n  }\n\n  #arrows() {\n    const arrowCallbacks = new Arrows();\n    /**\n     * Add Arrow Callbacks to Object\n     */\n\n    const ArrowsCallbacks = {\n      speedUpArrows: arrowCallbacks.speedUpArrows,\n      speedDownArrows: arrowCallbacks.speedDownArrows\n    };\n    /**\n     * Add Arrows to Graphics\n     *\n     * @param {string} arrows sets key\n     * @param {Element/s} element passes element\n     * @param {Object} callbacks passes callbacks\n     */\n\n    gameEngine.graphics.addAnimation(\"arrows\", document.querySelectorAll(\".row_score_2 > span > p\"), { ...ArrowsCallbacks\n    });\n  }\n\n}\n/**\n * Start Game Class\n */\n\n\nclass StartGame {\n  constructor() {\n    /**\n     * Create Game State\n     *\n     * @param {Intenger} speed speed count\n     * @param {Intenger} clicks click count\n     * @param {Array} selected selected values\n     */\n    gameEngine.state.addState({\n      speed: 5,\n      clicks: 0,\n      selected: []\n    });\n    /**\n     * Load Functions\n     */\n\n    this.#animations();\n    this.#controls();\n    this.#events();\n    this.#conditions();\n    gameEngine.events.gameStart();\n  }\n\n  #animations() {\n    /**\n     * Construct Animation Class\n     */\n    new AnimationsEvents();\n  }\n\n  #controls() {\n    /**\n     * Add document Click\n     *\n     * @param {Object} click click element\n     * @param {Object} callbacks animation callbacks\n     */\n    gameEngine.controls.addControl({\n      click: \"document\"\n    }, {\n      documentClick: () => {\n        gameEngine.graphics.runAnimation(\"carousel\", \"carouselSelect\");\n        gameEngine.graphics.runAnimation(\"icon_blocks\", \"iconSelect\");\n        gameEngine.state.editState(\"clicks\", gameEngine.state.getState(\"clicks\") + 1);\n        if (gameEngine.state.getState(\"clicks\") > 3) gameEngine.events.gameRestart();\n      }\n    });\n    /**\n     * Add keyboard Click\n     *\n     * @param {Object} keyboard click element (arrow left)\n     * @param {Object} callbacks animation callbacks\n     */\n\n    gameEngine.controls.addControl({\n      keyboard: 37\n    }, {\n      arrowleft: () => gameEngine.graphics.runAnimation(\"arrows\", \"speedDownArrows\")\n    });\n    /**\n     * Add keyboard Click\n     *\n     * @param {Object} keyboard click element (arrow right)\n     * @param {Object} callbacks animation callbacks\n     */\n\n    gameEngine.controls.addControl({\n      keyboard: 39\n    }, {\n      arrowright: () => gameEngine.graphics.runAnimation(\"arrows\", \"speedUpArrows\")\n    });\n  }\n\n  #events() {\n    /**\n     * Add Start Mechanics\n     *\n     * @param {Object} callbacks game start callbacks\n     */\n    gameEngine.events.gameStartMechanics(() => {\n      gameEngine.graphics.runAnimation(\"carousel\", \"animationRegister\");\n      gameEngine.graphics.runAnimation(\"carousel\", \"animationStart\");\n    });\n    /**\n     * Add Restart Mechanics\n     *\n     * @param {Object} callbacks game restart callbacks\n     */\n\n    gameEngine.events.gameRestartMechanics(() => {\n      gameEngine.state.editState(\"selected\", []);\n      gameEngine.state.editState(\"clicks\", 0);\n      gameEngine.graphics.runAnimation(\"carousel\", \"animationStart\");\n      gameEngine.graphics.runAnimation(\"icon_blocks\", \"iconsClear\");\n      gameEngine.graphics.runAnimation(\"carousel\", \"removeFinsh\");\n    });\n  }\n\n  #conditions() {\n    gameEngine.events.gameWinMechanics(() => {\n      console.log('Winner');\n    });\n    gameEngine.events.gameLoseMechanics(() => {\n      console.log('Loser');\n    }); // CLEAR AFTER GAME END / RESET\n\n    gameEngine.events.addCondition('state', {\n      type: 'selected',\n      math: 'length',\n      amount: 3,\n      callback: ({\n        win,\n        lose\n      }) => {\n        console.log(gameEngine.state.getState(\"selected\"));\n\n        if (gameEngine.state.getState(\"selected\").every(v => v === gameEngine.state.getState(\"selected\")[0])) {\n          return win();\n        }\n\n        lose();\n      }\n    });\n  }\n\n}\n\nnew StartGame();\n\nfunction elementResize() {\n  // ! fucking remove jquery\n  jQuery(\".item\").each(function () {\n    jQuery(this).height(jQuery(this).find(\".image_one\").height());\n  });\n  jQuery(\".score_wrap\").width(jQuery(\".slider_wrap\").outerWidth());\n}\n\nwindow.onresize = function () {\n  elementResize();\n};\n\nelementResize();\n\n//# sourceURL=webpack://Mario_Match/./app.js?");

/***/ }),

/***/ "./gameEngine/classes/gameContainer.js":
/*!*********************************************!*\
  !*** ./gameEngine/classes/gameContainer.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/**\r\n * @name GameContainer \r\n * @description Class for the DI Container\r\n */\nclass GameContainer {\n  #dependencies = {};\n  /**\r\n   * @name set\r\n   * @description \r\n   * Sets the objects to the dependency object (this)\r\n   * @param {dependency} name of the dependency (to access)\r\n   * @param {dependencyClass} object(class) of the dependency\r\n   * @param {classConstruct} passes this (the object)\r\n   */\n\n  set({\n    key,\n    blueprint,\n    args\n  }) {\n    this.#dependencies[key] = new blueprint(args);\n  }\n  /**\r\n   * @name get\r\n   * @description \r\n   * gets the objects from the dependency object (this)\r\n   * @returns error or dependency\r\n   */\n\n\n  get(dependency) {\n    if (!this.#dependencies[dependency]) throw new Error(`No Dependency: ${dependency}`);\n    return this.#dependencies[dependency];\n  }\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameContainer);\n\n//# sourceURL=webpack://Mario_Match/./gameEngine/classes/gameContainer.js?");

/***/ }),

/***/ "./gameEngine/classes/gameObservable.js":
/*!**********************************************!*\
  !*** ./gameEngine/classes/gameObservable.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/**\r\n * @name Observable \r\n * @description Class for functions/methods observing\r\n */\nclass Observable {\n  // Stores the functions/methods to observe\n  #observers = [];\n  /**\r\n   * @name subscribe\r\n   * @description adds function/method to the observer property\r\n   * for action \r\n   * @param {addFunction} adds function to observe\r\n   */\n\n  subscribe(addFunction) {\n    this.observers.push(addFunction);\n  }\n  /**\r\n   * @name unsubscribe\r\n   * @description removes function/method to the observer property\r\n   * to prevent action \r\n   * @param {removeFunction} removes function to observe\r\n   */\n\n\n  unsubscribe(removeFunction) {\n    this.#observers = this.#observers.filter(subscriber => subscriber !== removeFunction);\n  }\n  /**\r\n   * @name notify\r\n   * @description notifys/actions the functions in the observers property\r\n   */\n\n\n  notify() {\n    this.#observers.forEach(observeritemFunction => observeritemFunction());\n  }\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Observable);\n\n//# sourceURL=webpack://Mario_Match/./gameEngine/classes/gameObservable.js?");

/***/ }),

/***/ "./gameEngine/framework/gameControls.js":
/*!**********************************************!*\
  !*** ./gameEngine/framework/gameControls.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/**\r\n * @name GameControls\r\n * @description Handles the controls/inputs\r\n */\nclass GameControls {\n  // Stores key or mouse outputs\n  #types = {\n    keyControls: [],\n    mouseControls: []\n  };\n  /**\r\n   * @name constructor\r\n   * @description Runs on class creation\r\n   * Creates the GameControls\r\n   * Adds a window event listenrs for mouse and keyboard actions\r\n   * Only keydown for time being\r\n   */\n\n  constructor() {\n    [{\n      key: \"click\",\n      method: e => this.#mouseControl(e)\n    }, {\n      key: \"keydown\",\n      method: e => this.#keyboardControl(e)\n    }].forEach(i => {\n      document.addEventListener(i.key, e => i.method(e));\n    });\n  }\n  /**\r\n   * @name addControl\r\n   * @description Adds control inputs\r\n   * @param {type} type of input/control\r\n   * @param {callbacks} callbacks to run\r\n   */\n\n\n  addControl(type, callbacks) {\n    if (!callbacks) return;\n    Object.values(this.#types).forEach(c => {\n      c.push({\n        type: type,\n        callbacks: callbacks\n      });\n    });\n  }\n  /**\r\n   * @name keyboardControl\r\n   * @description Checks for keyboard events\r\n   * @param {event} The eventcode key\r\n   * @returns The output\r\n   */\n\n\n  #keyboardControl(event) {\n    this.#returnOutput(this.#types.keyControls.find(e => e.type.keyboard === event.keyCode));\n  }\n  /**\r\n   * @name mouseControl\r\n   * @description Checks for mouse events\r\n   * @param {event} The event type\r\n   * @returns The output\r\n   */\n\n\n  #mouseControl(event) {\n    this.#returnOutput(this.#types.mouseControls.find(e => e.type.click === \"document\" || event.target));\n  }\n  /**\r\n   * @name returnOutput\r\n   * @description Runs the output event from the input\r\n   * @param {control} The control type\r\n   * @returns The event\r\n   */\n\n\n  #returnOutput(control) {\n    if (!control) return;\n    return [control.callbacks].forEach(item => {\n      const [fn] = Object.values(item);\n      if (!fn) return;\n      fn();\n    });\n  }\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameControls);\n\n//# sourceURL=webpack://Mario_Match/./gameEngine/framework/gameControls.js?");

/***/ }),

/***/ "./gameEngine/framework/gameEvents.js":
/*!********************************************!*\
  !*** ./gameEngine/framework/gameEvents.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/**\r\n * @name GameEvents \r\n * @description Handles the events\r\n */\nclass GameEvents {\n  #state = {\n    win: [],\n    lose: [],\n    state: [],\n    start: null,\n    end: null,\n    winGame: null,\n    loseGame: null,\n    restart: null\n  };\n  /**\r\n   * @name constructor\r\n   * @description Runs on class creation\r\n   * Creates the gameEngine\r\n   * @param {gameEngine} Passes the engine\r\n   */\n\n  constructor(gameEngine) {\n    this.gameEngine = gameEngine;\n  }\n  /**\r\n   * @name gameCheck\r\n   * @description Checks the game conditions\r\n   */\n\n\n  gameCheck() {\n    this.gameWin();\n    this.gameLose();\n    this.gameState();\n  }\n  /**\r\n   * @name addCondition\r\n   * @description Adds new condition to event\r\n   * @param {condition} type of condition\r\n   * @param {actions} action of condition\r\n   */\n\n\n  addCondition(condition, actions) {\n    const {\n      type,\n      math,\n      amount,\n      callback\n    } = actions;\n    this.#state[condition][type] = {\n      type: type,\n      math: math,\n      amount: amount,\n      callback: callback\n    };\n  }\n  /**\r\n   * @name gameStartMechanics\r\n   * @description Adds function to run when game starts\r\n   * @param {callbacks} callbacks for mechanic\r\n   */\n\n\n  gameStartMechanics(callbacks) {\n    this.#state.start = callbacks.bind();\n  }\n  /**\r\n   * @name gameEndMechanics\r\n   * @description Adds function to run when game end\r\n   * @param {callbacks} callbacks for mechanic\r\n   */\n\n\n  gameEndMechanics(callbacks) {\n    this.#state.end = callbacks.bind();\n  }\n  /**\r\n   * @name gameRestartMechanics\r\n   * @description Adds function to run when game restarts\r\n   * @param {callbacks} callbacks for mechanic\r\n   */\n\n\n  gameRestartMechanics(callbacks) {\n    this.#state.restart = callbacks.bind();\n  }\n  /**\r\n   * @name gameWinMechanics\r\n   * @description Adds function to run when user wins\r\n   * @param {callbacks} callbacks for mechanic\r\n   */\n\n\n  gameWinMechanics(callbacks) {\n    this.#state.winGame = callbacks.bind();\n  }\n  /**\r\n   * @name gameLoseMechanics\r\n   * @description Adds function to run when user loses\r\n   * @param {callbacks} callbacks for mechanic\r\n   */\n\n\n  gameLoseMechanics(callbacks) {\n    this.#state.loseGame = callbacks.bind();\n  }\n  /**\r\n   * @name gameStart\r\n   * @description Starts a new game\r\n   */\n\n\n  gameStart() {\n    this.#state.start.apply();\n  }\n  /**\r\n   * @name gameEnd\r\n   * @description Ends game\r\n   */\n\n\n  gameEnd() {\n    this.#state.end.apply();\n  }\n  /**\r\n   * @name gameRestart\r\n   * @description Restarts game\r\n   */\n\n\n  gameRestart() {\n    this.#state.restart.apply();\n  }\n  /**\r\n   * @name gameWin\r\n   * @description Runs when game is won\r\n   */\n\n\n  gameWin() {\n    for (const win in this.#state.win) this.gameSwitch(win, 'win');\n  }\n  /**\r\n   * @name gameLose\r\n   * @description Runs when game is lost\r\n   */\n\n\n  gameLose() {\n    for (const lose in this.#state.lose) this.gameSwitch(lose, 'lose');\n  }\n  /**\r\n   * @name gameState\r\n   * @description Runs games state conditions\r\n   */\n\n\n  gameState() {\n    for (const state in this.#state.state) this.gameSwitch(state, 'state');\n  }\n  /**\r\n   * @name gameSwitch\r\n   * @description Runs the conditions\r\n   * @param {value} value for condition\r\n   * @param {condition} condition passed\r\n   * ! SWITCH CASE AS USES MATH\r\n   */\n\n\n  gameSwitch(value, condition) {\n    const array = this.#state[condition][value],\n          state = this.gameEngine.state.getState(array.type);\n\n    switch (array.math) {\n      case true:\n        if ((array.amount ? state : array.amount) === true) this.#gameConditions(array, condition);\n\n      case false:\n        if ((array.amount ? state : array.amount) === false) this.#gameConditions(array, condition);\n\n      case '>':\n        if ((array.amount ? state : array.amount) > array.amount) this.#gameConditions(array, condition);\n        break;\n\n      case '<':\n        if ((array.amount ? state : array.amount) < array.amount) this.#gameConditions(array, condition);\n        break;\n\n      case 'length':\n        if ((array.amount ? state.length : array.amount) === array.amount) this.#gameConditions(array, condition);\n        break;\n    }\n  }\n  /**\r\n   * @name gameConditions\r\n   * @description Run state / event callback\r\n   * @param {array}  array\r\n   */\n\n\n  #gameConditions(array, condition) {\n    // this.gameSwitchPassed( condition )\n    if (array.callback) return array.callback({\n      win: () => this.gameSwitchPassed('win'),\n      lose: () => this.gameSwitchPassed('lose')\n    });\n  }\n  /**\r\n   * @name gameSwitchPassed\r\n   * @description Plays out the win or lose function\r\n   * @param {condition} condition passed\r\n   */\n\n\n  gameSwitchPassed(condition) {\n    if (condition !== 'win' && condition !== 'lose') return;\n    condition === 'win' ? this.#state.winGame() : condition === 'lose' ? this.#state.loseGame() : null;\n  }\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameEvents);\n\n//# sourceURL=webpack://Mario_Match/./gameEngine/framework/gameEvents.js?");

/***/ }),

/***/ "./gameEngine/framework/gameGraphics.js":
/*!**********************************************!*\
  !*** ./gameEngine/framework/gameGraphics.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/**\r\n * @name GameGraphics \r\n * @description Handles the graphics/outputs\r\n */\nclass GameGraphics {\n  // Stores sprites\n  #sprite = {};\n  /**\r\n   * @name addSprite\r\n   * @description Adds spirte to object\r\n   * @param {type} type of sprite\r\n   * @param {sprite} sprite description\r\n   */\n\n  addSprite(type, sprite) {\n    this.#sprite[type] = sprite;\n  }\n  /**\r\n   * @name getSprite\r\n   * @description Gets spirte from object\r\n   * @param {type} type of sprite\r\n   * @return {sprite} sprite\r\n   */\n\n\n  getSprite(type) {\n    if (!this.#sprite[type]) return;\n    return this.#sprite[type];\n  }\n  /**\r\n   * @name addAnimation\r\n   * @description Adds callback to sprite\r\n   * @param {type} type of sprite\r\n   * @param {sprite} sprite description\r\n   * @param {callbacks} callbacks to run\r\n   */\n\n\n  addAnimation(type, sprite, callbacks) {\n    this.#sprite[type] = {\n      sprite: sprite,\n      callbacks: callbacks\n    };\n  }\n  /**\r\n   * @name runAnimation\r\n   * @description Runs the sprites callbacks\r\n   * @param {type} type of sprite\r\n   * @param {sprite} sprite description\r\n   * @param {args} callbacks to run\r\n   * @returns sprites callbacks\r\n   */\n\n\n  runAnimation(type, callback, ...args) {\n    return this.#sprite[type].callbacks[callback]({\n      sprite: this.#sprite[type].sprite,\n      args: args ? args : null\n    });\n  }\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameGraphics);\n\n//# sourceURL=webpack://Mario_Match/./gameEngine/framework/gameGraphics.js?");

/***/ }),

/***/ "./gameEngine/framework/gameState.js":
/*!*******************************************!*\
  !*** ./gameEngine/framework/gameState.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _classes_gameObservable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../classes/gameObservable.js */ \"./gameEngine/classes/gameObservable.js\");\n\n/**\r\n * @name GameState \r\n * @description Handles the state\r\n */\n\nclass GameState {\n  /**\r\n   * @name constructor\r\n   * @description Runs on class creation\r\n   * Creates the GameState\r\n   * @param {gameEngine} Passes the engine\r\n   */\n  constructor(gameEngine) {\n    this.gameEngine = gameEngine; // Constructs the Observable class\n\n    this.observable = new _classes_gameObservable_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    this._state = {};\n  }\n  /**\r\n   * @name addState\r\n   * @description Add state to object\r\n   * binds the state to the observer\r\n   * if object or array sets each on individually\r\n   * @param {state} state name\r\n   * @param {value} state value\r\n   */\n\n\n  addState(state, value = null) {\n    if (typeof state === 'object' || typeof state === 'array') {\n      this._state = { ...state\n      };\n      return this.#SetObservales(state);\n    }\n\n    this._state[state] = value;\n    this.#SetObservale(state);\n  }\n  /**\r\n   * @name getState\r\n   * @description Returns state\r\n   * Hard copied to prevent editing\r\n   * @param {state} state name\r\n   * @returns state value\r\n   */\n\n\n  getState(state) {\n    return JSON.parse(JSON.stringify(this._state))[state];\n  }\n  /**\r\n   * @name editState\r\n   * @description Edit state / runs the updateState method\r\n   * @param {state} state name\r\n   * @param {args} args\r\n   * @returns state value\r\n   */\n\n\n  editState(state, args = null) {\n    if (args !== null) this._state[state] = args;\n    this.#updateState();\n    return this._state[state];\n  }\n  /**\r\n   * @name removeState\r\n   * @description Removes (delete) state / runs the updateState method\r\n   * @param {state} state name\r\n   */\n\n\n  removeState(state) {\n    delete this._state[state];\n    this.#updateState();\n  }\n  /**\r\n   * @name updateState\r\n   * @description Updates state / runs the updateState method\r\n   * Checks if any game conditions are meet\r\n   */\n\n\n  #updateState() {\n    this.observable.notify();\n    this.gameEngine.events.gameCheck();\n  }\n  /**\r\n   * @name SetObservale\r\n   * @description Subscribe the state to the observer object\r\n   * @param {state} state name\r\n   */\n\n\n  #SetObservale(state) {\n    if (!document.querySelector(`#${state}`)) return;\n\n    const updateValue = () => {\n      document.querySelector(`#${state}`).textContent = this.state[state];\n    };\n\n    this.observable.subscribe(updateValue);\n  }\n  /**\r\n   * @name SetObservales\r\n   * @description Subscribe multiple states to the observer object\r\n   * @param {states} states object\r\n   */\n\n\n  #SetObservales(states) {\n    for (const state in states) this.#SetObservale(state);\n  }\n  /**\r\n   * @name state\r\n   * @description Returns (gets) state\r\n   * @returns state value\r\n   */\n\n\n  get state() {\n    return this._state;\n  }\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameState);\n\n//# sourceURL=webpack://Mario_Match/./gameEngine/framework/gameState.js?");

/***/ }),

/***/ "./gameEngine/gameEngine.js":
/*!**********************************!*\
  !*** ./gameEngine/gameEngine.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _classes_gameContainer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/gameContainer.js */ \"./gameEngine/classes/gameContainer.js\");\n/* harmony import */ var _framework_gameState_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./framework/gameState.js */ \"./gameEngine/framework/gameState.js\");\n/* harmony import */ var _framework_gameEvents_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./framework/gameEvents.js */ \"./gameEngine/framework/gameEvents.js\");\n/* harmony import */ var _framework_gameControls_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./framework/gameControls.js */ \"./gameEngine/framework/gameControls.js\");\n/* harmony import */ var _framework_gameGraphics_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./framework/gameGraphics.js */ \"./gameEngine/framework/gameGraphics.js\");\n\n\n\n\n\n/**\r\n * @name GameEngine \r\n * @description GameEngines boot and manifold\r\n */\n\nclass GameEngine {\n  /**\r\n   * @name constructor\r\n   * @description Runs on class creation\r\n   * Creates the dependency container\r\n   */\n  constructor() {\n    if (GameEngine._instance) return;\n    GameEngine._instance = this;\n    this.container = new _classes_gameContainer_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    this.#SetContainer();\n  }\n  /**\r\n   * @name SetContainer\r\n   * @description \r\n   * Adds the dependencies to the container\r\n   * Binds them\r\n   */\n\n\n  #SetContainer() {\n    this.container.set({\n      key: 'gameGraphics',\n      blueprint: _framework_gameGraphics_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"]\n    });\n    this.container.set({\n      key: 'gameEvents',\n      blueprint: _framework_gameEvents_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n      args: this\n    });\n    this.container.set({\n      key: 'gameControls',\n      blueprint: _framework_gameControls_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n      args: this\n    });\n    this.container.set({\n      key: 'gameState',\n      blueprint: _framework_gameState_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n      args: this\n    });\n  }\n  /**\r\n   * @name graphics\r\n   * @description    \r\n   * Using get the user can access the gameGraphics object\r\n   * @returns {gameGraphics} object \r\n   */\n\n\n  get graphics() {\n    return this.container.get('gameGraphics');\n  }\n  /**\r\n   * @name events\r\n   * @description    \r\n   * Using get the user can access the gameEvents object\r\n   * @returns gameEvents object \r\n   */\n\n\n  get events() {\n    return this.container.get('gameEvents');\n  }\n  /**\r\n   * @name controls\r\n   * @description    \r\n   * Using get the user can access the gameControls object\r\n   * @returns gameControls object \r\n   */\n\n\n  get controls() {\n    return this.container.get('gameControls');\n  }\n  /**\r\n   * @name state\r\n   * @description    \r\n   * Using get the user can access the gameState object\r\n   * @returns gameState object \r\n   */\n\n\n  get state() {\n    return this.container.get('gameState');\n  }\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameEngine);\n\n//# sourceURL=webpack://Mario_Match/./gameEngine/gameEngine.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./app.js");
/******/ 	
/******/ })()
;