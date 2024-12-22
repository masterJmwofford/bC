
let screen = document.querySelector(".optionContainer");
let score = 0
let userPlays = 0
let cup = document.querySelector(".cuppa");
let bean = document.querySelector(".bean");
let hiddenScreen = document.querySelector('.shadowScrn')
let formHold = document.querySelector('.sza')
if(userPlays > 3 ){
    cup.remove()
}
let promoCode = "AP763"
let currentChar = promoCode[1];
let queue = document.querySelector('.savingsBlock')

const dailyAffirmations = [
    "I am worthy of love and respect.",
    "I have the power to create change.",
    "I am resilient, strong, and brave.",
    "I embrace the greatness within me.",
    "I choose to be happy right now.",
    "I am in charge of my thoughts and emotions.",
    "I am grateful for the good in my life.",
    "I believe in my abilities and express my true self with ease.",
    "I am growing and becoming a better version of myself.",
    "I am deserving of all the wonderful things life has to offer."
  ];
//   https://static.wixstatic.com/media/85280f_714295dcf05a49079fb30f84eca48b6f~mv2_d_2084_1251_s_2.png/v1/fill/w_524,h_264,al_c,q_85,usm_2.00_1.00_0.00,enc_avif,quality_auto/85280f_714295dcf05a49079fb30f84eca48b6f~mv2_d_2084_1251_s_2.png

const infoDump ={
    locations: ["Historic Lakewood"],
    contact: "000-000-0000",
    testimonials: "Good Vibes, Great Coffee",
    hoursOp: "Monday - Friday (7A - 6P) "

}

const shareInfo = (info)=>{
hiddenScreen.innerHTML = info
}
const updateScore = () =>{
    let scoreUpdate = document.querySelector('.scoreKeeper')
    scoreUpdate.innerHTML = score
}
updateScore()
// JavaScript function for left-to-right movement


let shouldBlink = false; // This is the boolean value


const generateAffirmation = ()=>{
    let random = Math.floor(Math.random() * (dailyAffirmations.length - 0) + 0)
    let quote = dailyAffirmations[random]   
    console.log(quote)
    formHold.innerHTML = quote;
}

// To stop tracking later, call stopTracking


const providePromoCode = (promoCode)=>{
  let chopped = promoCode.split("")
  chopped.map((code)=>{
    let promoPH = document.createElement('div')
    promoPH.setAttribute('class','insertPH')
    promoPH.innerHTML = code
    queue.append(promoPH)
  })
}
// providePromoCode(promoCode)

function makeMovable(selector) {
  const element = document.querySelector(selector);

  if (!element) {
      console.error("Element not found.");
      return;
  }

  let positionX = 0; // Initial horizontal position of the element

  // Set the element's initial position
  element.style.position = "relative";
  element.style.left = `${positionX}px`;

  // Move the element left or right
  function moveElement(direction) {
      const step = 10; // Distance to move in pixels
      positionX += direction === "right" ? step : -step;
      element.style.left = `${positionX}px`;
  }

  // Handle keyboard input
  function handleKeyDown(event) {
      if (event.key === "ArrowRight") {
          moveElement("right");
      } else if (event.key === "ArrowLeft") {
          moveElement("left");
      }
  }

  // Handle screen taps/clicks
  function handleScreenClick(event) {
      const screenWidth = window.innerWidth;
      const clickX = event.clientX;

      if (clickX > screenWidth / 2) {
          moveElement("right");
      } else {
          moveElement("left");
      }
  }

  // Attach event listeners
  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("click", handleScreenClick);

  console.log("Movable functionality enabled for", selector);
}
makeMovable('.catcherCup')


setInterval(()=>{
    generateAffirmation()
},3500)
// -------game
// HTML Elements
const container = document.querySelector(".game-container");
const primaryImage = document.querySelector(".catcherCup");
const promoCodeDisplay = document.querySelector(".promo-code-display");

// Game Variables
const collectedCharacters = new Set();
const totalNeeded = 10;

// Utility Functions
const generateRandomCharacter = () => {
    const chars = "BLACKCOFFEEATLANTA";
    return chars[Math.floor(Math.random() * chars.length)];
};

const createFallingObject = () => {
    const fallingObject = document.createElement("div");
    fallingObject.classList.add("intractable");
    fallingObject.textContent = generateRandomCharacter();

    // Random initial position
    fallingObject.style.left = `${Math.random() * (container.offsetWidth - 30)}px`;
    fallingObject.style.top = "0px";

    container.appendChild(fallingObject);
    return fallingObject;
};

const detectCollision = (object, movable) => {
    const objRect = object.getBoundingClientRect();
    const imgRect = movable.getBoundingClientRect();
    return !(
        objRect.top > imgRect.bottom ||
        objRect.bottom < imgRect.top ||
        objRect.left > imgRect.right ||
        objRect.right < imgRect.left
    );
};

const moveFallingObjects = () => {
    const fallingObjects = document.querySelectorAll(".intractable");
    fallingObjects.forEach((object) => {
        const currentTop = parseFloat(object.style.top);
        object.style.top = `${currentTop + 5}px`;

        // Check for collision
        if (detectCollision(object, primaryImage)) {
            const char = object.textContent;
            collectedCharacters.add(char);
            object.remove();

            // Update Promo Code Display
            promoCodeDisplay.textContent = Array.from(collectedCharacters).join("");

            // Check if game is won
            if (collectedCharacters.size === totalNeeded) {
                alert("Awesome! You have now earned 2points towards your next Drip!: " + Array.from(collectedCharacters).join(""));
                userPlays++
                totalNeeded = -10
            }
        }

        // Remove objects that fall beyond the container
        if (currentTop > container.offsetHeight) {
            object.remove();
        }
    });
};

// Movable Image Movement
const movePrimaryImage = (event) => {
    const key = event.key;
    const step = 10; // Movement step
    const rect = primaryImage.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    if (key === "ArrowLeft" && rect.left > containerRect.left) {
        primaryImage.style.left = `${rect.left - step}px`;
    } else if (key === "ArrowRight" && rect.right < containerRect.right) {
        primaryImage.style.left = `${rect.left + step}px`;
    }
};

// Game Loop
const gameLoop = () => {
    moveFallingObjects();

    // Generate a new object occasionally
    if (Math.random() < 0.02) {
        createFallingObject();
    }
    requestAnimationFrame(gameLoop);
};

// Initialize Game
document.addEventListener("keydown", movePrimaryImage);
gameLoop();
