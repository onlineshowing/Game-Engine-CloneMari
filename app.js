import GameEngine from "./gameEngine/gameEngine.js";

/**
 * Start Game Engine
 */
const gameEngine = new GameEngine();

/**
 * Carousel
 * Runs 2 carousels for slot effect
 */
class Carousel {

  // Call back for animation of the carousel
  animationRegister({ sprite }) {
    let carousel = [];
    [...sprite].forEach((row, key) => {

      // Registers both sliders
      gameEngine.graphics.addSprite(`slideTwo_${row}`, row.querySelector(".image_two"))
      gameEngine.graphics.addSprite(`slideOne_${row}`, row.querySelector(".image_one"))

      carousel[key] = {
        slideOne: {
          direction: 0,
          element: gameEngine.graphics.getSprite(`slideOne_${row}`)
        },
        slideTwo: {
          direction: 100,
          element: gameEngine.graphics.getSprite(`slideTwo_${row}`)
        }
      }
    })
    gameEngine.state.addState("carousel", carousel)
  }

  // Start the animation
  animationStart() {
    gameEngine.state.editState("carousel").map((value, key) => {
      this.carouselAnimation(value, key);
    })
  }

  // Carousels animation
  carouselAnimation(value) {

    // Sets speed of the interval
    // Provides direction for each slide
    // - Sets attribute for each slide
    const carouselAnimationInterval = () => {

      Object.entries(value).forEach(keySingle => {       
        const [
          key
        ] = keySingle,
          slideValue = value[key]

        if (
          key !== "slideOne" && 
          key !== "slideTwo"
        ) return

        // If no clicks
        if (
          gameEngine.state.getState("clicks") == 0
        ) {
          slideValue.element.parentElement.setAttribute(
            "slide-movement",
            "true"
          )
        }

        // Each slide
        if (
          key !== 1
        ) {
          slideValue.direction = slideValue.direction - 1;
          if (value.slideOne.direction == -100) {
            value.slideOne.direction = 0;
            value.slideTwo.direction = 100;
          }
        }

        if (
          key === 1
        ) {
          slideValue.direction = slideValue.direction + 1;
          if (value.slideTwo.direction == 100) {
            value.slideTwo.direction = 0;
            value.slideOne.direction = -100;
          }
        }

        if (
          slideValue.element.parentElement.getAttribute(
            "slide-movement"
          ) === "true"
        ) {
          slideValue.element.style.transform = `translateX(${
            slideValue.direction
          }%)`;
        }
      })

    }

    // Works the same aniamtionframe
    value.interval = clearInterval(value.interval)
    value.interval = setInterval(
      carouselAnimationInterval,
      gameEngine.state.getState("speed")// Sets the speed
    )
  }

  // Select the carousel
  // - Run the animation
  carouselSelect({ sprite }) {
    [...sprite].some(row => {
      if (
        row.getAttribute("slide-movement") !== "true"
      ) return
      row.setAttribute("slide-movement", "false");
      gameEngine.graphics.runAnimation(
        "carousel",
        "carouselSelected",
        [
          row.querySelector(".image_one"), 
          row.querySelector(".image_two")
        ],
        row.querySelector(".image_two").style.transform.replace(/[^\d.]/g, "")
      )
      return true;      
    })
  }

  // Remove the ending (after game is done)
  removeFinsh({ sprite }) {
    const rows = [...sprite]
    rows.forEach(row => {
      [...row.children].forEach((item) => {
        item.classList.remove("finsh");
      });
    });
  }

  // On game finsh
  addFinsh({ args }) {
    const [
      rows
    ] = [...args]
    rows.forEach(row => {
      // row_minus = row.style.transform.includes("-")
      // row_value = row.style.transform.replace(/[^\d.]/g, '')
      row.classList.add("finsh");
    });
  }

  // On speed change
  speedChangeCarousel() {
    gameEngine.state.editState("carousel").map((value, key) => {
      this.carouselAnimation(value, key);
    });
  }
  
  // Selects the carousel on click
  // - On click goes to the icon which was clicked on
  carouselSelected({ args }) {
    
    // Mile stones are the precentages of where the images are
    // - Mushroom twice as it is first and last
    const milestones = {
      mushroom: {
        slide: {
          start: 100,
          end: 87,
          resetStart: -100,
          resetEnd: 0,
        },
      },
      mushroom_2: {
        slide: {
          start: 22,
          end: 0,
          resetStart: -100,
          resetEnd: 0,
        },
      },
      star: {
        slide: {
          start: 86,
          end: 54,
          resetStart: -33,
          resetEnd: 66,
        },
      },
      flower: {
        slide: {
          start: 53,
          end: 23,
          resetStart: -66,
          resetEnd: 33,
        },
      },
    };

    // Change to middle (selected)
    // - Resets
    const [
      elements, 
      postion
    ] = [
      ...args
    ],
    [
      slideTwo,
      slideOne
    ] = elements,
      elementArray = elements,
      selected = gameEngine.state.getState("selected");

    for (
      const property in milestones
    ) {
      if (
        postion <= milestones[property].slide.start &&
        postion >= milestones[property].slide.end
      ) {
        gameEngine.graphics.runAnimation("carousel", "addFinsh", elementArray);
        slideOne.style.transform = `translateX(${milestones[property].slide.resetEnd}%)`;
        slideTwo.style.transform = `translateX(${milestones[property].slide.resetStart}%)`;
        selected.push(
          property.includes("_") ? property.split("_")[0] : property
        )
      }
    }

    gameEngine.state.editState("selected", selected)
    
  }
}

/**
 * Icons
 * Object for bottom icons
 */
class Icons {

  // Select Icons based on selected object
  iconSelect({ sprite }) {

    const 
      src = gameEngine.state.getState("selected").pop(),
      count = gameEngine.state.getState("selected").length,
      [child] = sprite[count - 1].children ? sprite[count - 1].children : null

    child.setAttribute(
      "src",
      `./../assets/images/${src}.png`
    )

  }

  // Clears all icons after round
  iconsClear({ sprite }) {
    [...sprite].forEach(item => {
      const [img] = item.children
      img.setAttribute("src", "./../assets/images/mark.png");
    })
  }
  
}

/**
 * Arrows
 * Object for arrow icons
 */
class Arrows {

  // Speed Up
  speedUpArrows({ sprite }) {
    const speed = [...sprite].some((row) => {
      if (row.classList.contains("active")) {
        return false
      }
      row.classList.add("active")
      gameEngine.graphics.runAnimation("carousel", "speedChangeCarousel")
      return true
    })

    if (
      !speed
    ) return

    gameEngine.state.editState("speed", gameEngine.state.getState("speed") - 1);
  }

  // Speed Down
  speedDownArrows({sprite}) {
    const speed = [...sprite].reverse().some((row) => {
      if (!row.classList.contains("active")) {
        return false
      }
      row.classList.remove("active");
      gameEngine.graphics.runAnimation("carousel", "speedChangeCarousel");
      return true
    })

    if (
      !speed
    ) return

    gameEngine.state.editState("speed", gameEngine.state.getState("speed") + 1);
  }
}

/**
 * AnimationsEvents Class
 */
class AnimationsEvents {
  constructor() {
    /**
     * Load Functions
     */
    this.#carousel();
    this.#icons();
    this.#arrows();
  }

  #carousel() {
    const carouselCallbacks = new Carousel();

    /*
      Add Carousel Callbacks to Object
    */
    const CarouselCallbacks = {
      animationRegister: carouselCallbacks.animationRegister,
      animationStart: carouselCallbacks.animationStart,
      carouselAnimation: carouselCallbacks.carouselAnimation,
      carouselSelect: carouselCallbacks.carouselSelect,
      carouselSelected: carouselCallbacks.carouselSelected,
      speedChangeCarousel: carouselCallbacks.speedChangeCarousel,
      removeFinsh: carouselCallbacks.removeFinsh,
      addFinsh: carouselCallbacks.addFinsh,
    };

    /**
     * Add Carousel to Graphics
     *
     * @param {string} carousel sets key
     * @param {Element/s} element passes element
     * @param {Object} callbacks passes callbacks
     */
    gameEngine.graphics.addAnimation(
      "carousel",
      document.querySelectorAll(".slider_wrap .item"),
      {
        ...CarouselCallbacks,
      }
    );
  }

  #icons() {
    const iconsCallbacks = new Icons();

    /**
     * Add Icon Callbacks to Object
     */
    const IconBlockCallbacks = {
      iconSelect: iconsCallbacks.iconSelect,
      iconsClear: iconsCallbacks.iconsClear,
    };

    /**
     * Add Icons to Graphics
     *
     * @param {string} icons sets key
     * @param {Element/s} element passes element
     * @param {Object} callbacks passes callbacks
     */
    gameEngine.graphics.addAnimation(
      "icon_blocks",
      document.querySelectorAll(".icon_block"),
      {
        ...IconBlockCallbacks,
      }
    );
  }

  #arrows() {
    const arrowCallbacks = new Arrows();

    /**
     * Add Arrow Callbacks to Object
     */
    const ArrowsCallbacks = {
      speedUpArrows: arrowCallbacks.speedUpArrows,
      speedDownArrows: arrowCallbacks.speedDownArrows,
    };

    /**
     * Add Arrows to Graphics
     *
     * @param {string} arrows sets key
     * @param {Element/s} element passes element
     * @param {Object} callbacks passes callbacks
     */
    gameEngine.graphics.addAnimation(
      "arrows",
      document.querySelectorAll(".row_score_2 > span > p"),
      {
        ...ArrowsCallbacks,
      }
    )
  }
}

/**
 * Start Game Class
 */
class StartGame {
  constructor() {
    /**
     * Create Game State
     *
     * @param {Intenger} speed speed count
     * @param {Intenger} clicks click count
     * @param {Array} selected selected values
     */
    gameEngine.state.addState({
      speed: 5,
      clicks: 0,
      selected: [],
    });

    /**
     * Load Functions
     */
    this.#animations();
    this.#controls();
    this.#events();
    this.#conditions();

    gameEngine.events.gameStart();
  }

  #animations() {
    /**
     * Construct Animation Class
     */
    new AnimationsEvents();
  }

  #controls() {
    /**
     * Add document Click
     *
     * @param {Object} click click element
     * @param {Object} callbacks animation callbacks
     */
    gameEngine.controls.addControl(
      {click: "document"},
      {
        documentClick: () => {
          gameEngine.graphics.runAnimation("carousel", "carouselSelect");
          gameEngine.graphics.runAnimation("icon_blocks", "iconSelect");
          gameEngine.state.editState(
            "clicks",
            gameEngine.state.getState("clicks") + 1
          );
          if (gameEngine.state.getState("clicks") > 3)
            gameEngine.events.gameRestart();
        },
      }
    );

    /**
     * Add keyboard Click
     *
     * @param {Object} keyboard click element (arrow left)
     * @param {Object} callbacks animation callbacks
     */
    gameEngine.controls.addControl(
      {keyboard: 37},
      {
        arrowleft: () =>
          gameEngine.graphics.runAnimation("arrows", "speedDownArrows"),
      }
    );

    /**
     * Add keyboard Click
     *
     * @param {Object} keyboard click element (arrow right)
     * @param {Object} callbacks animation callbacks
     */
    gameEngine.controls.addControl(
      {keyboard: 39},
      {
        arrowright: () =>
          gameEngine.graphics.runAnimation("arrows", "speedUpArrows"),
      }
    );
  }

  #events() {
    /**
     * Add Start Mechanics
     *
     * @param {Object} callbacks game start callbacks
     */
    gameEngine.events.gameStartMechanics(() => {
      gameEngine.graphics.runAnimation("carousel", "animationRegister");
      gameEngine.graphics.runAnimation("carousel", "animationStart");
    });

    /**
     * Add Restart Mechanics
     *
     * @param {Object} callbacks game restart callbacks
     */
    gameEngine.events.gameRestartMechanics(() => {
      gameEngine.state.editState("selected", []);
      gameEngine.state.editState("clicks", 0);
      gameEngine.graphics.runAnimation("carousel", "animationStart");
      gameEngine.graphics.runAnimation("icon_blocks", "iconsClear");
      gameEngine.graphics.runAnimation("carousel", "removeFinsh");
    });
  }












  #conditions() {

    
    gameEngine.events.gameWinMechanics(
      () => {
  console.log('Winner')
      }
    )

        gameEngine.events.gameLoseMechanics(
      () => {
  console.log('Loser')
      }
    )
   // CLEAR AFTER GAME END / RESET
    gameEngine.events.addCondition('state', {
       type: 'selected',
       math: 'length',
       amount: 3,
       callback: ({
        win, lose
       }) => {

        console.log(gameEngine.state.getState("selected"))

        if(
          gameEngine.state.getState("selected").every( v => v === gameEngine.state.getState("selected")[0] )
        ) {
          return win()
        }


        lose()

       }
      }
    )
  

  }










}

new StartGame();

function elementResize() {
  // ! fucking remove jquery
  jQuery(".item").each(function () {
    jQuery(this).height(jQuery(this).find(".image_one").height());
  });

  jQuery(".score_wrap").width(jQuery(".slider_wrap").outerWidth());
}

window.onresize = function () {
  elementResize();
};

elementResize();