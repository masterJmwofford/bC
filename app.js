let screen = document.querySelector(".optionContainer");
let score = 0

let cup = document.querySelector(".cuppa");
let bean = document.querySelector(".bean");

let formHold = document.querySelector('.formContainer')

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

const updateScore = () =>{
    let scoreUpdate = document.querySelector('.scoreKeeper')
    scoreUpdate.innerHTML = score
}
updateScore()
// JavaScript function for left-to-right movement


let shouldBlink = false; // This is the boolean value

function toggleImageBlink(blink) {
    if (!blink || shouldBlink) return; // Avoid re-triggering if already blinking or `blink` is false

    shouldBlink = true; // Set the boolean to true
    const allImages = document.querySelectorAll(".insertPH"); // Select all <img> tags

    // Apply the blink effect
    allImages.forEach(img => {
        img.style.animation = "blinkAnimation 0.3s step-start infinite";
    });

    // Stop the blink effect after 3 seconds
    setTimeout(() => {
        allImages.forEach(img => {
            img.style.animation = ""; // Reset the animation
        });
        shouldBlink = false; // Reset the boolean value to false
    }, 3000);
}

// CSS Animation (You need to add this in your CSS file or within a <style> tag)
/*

*/

// Example usage:
// Call toggleImageBlink(true) to make all images blink


const generateAffirmation = ()=>{
    let random = Math.floor(Math.random() * (17 - 0) + 0)

    let quote = dailyAffirmations[random]
    console.log(quote)
    formHold.innerHTML =  quote
    if(quote === undefined){
        quote = "You Are the MFN Blueprint"
    }
}

function trackAndAlertOverlap(selector1, selector2) {
    const element1 = document.querySelector(selector1);
    const element2 = document.querySelector(selector2);

    if (!element1 || !element2) {
        console.error("One or both elements not found. Check the selectors.");
        return;
    }

    function checkOverlap() {
        const rect1 = element1.getBoundingClientRect();
        const rect2 = element2.getBoundingClientRect();

        // Check if their x and y coordinates overlap
        if (
            Math.round(rect1.x) === Math.round(rect2.x) ||
            Math.round(rect1.y) === Math.round(rect2.y)
        ) {
            score++
            updateScore()
            toggleImageBlink(true);
           
        }
    }

    // Use an interval to continuously check for overlap
    const intervalId = setInterval(checkOverlap, 1);

    // Return a function to stop tracking when needed
    return () => clearInterval(intervalId);
}

// Example usage:
const stopTracking = trackAndAlertOverlap(".catcherCup", ".coffeebean");

// To stop tracking later, call stopTracking

let promoCode = "AP763"
let currentChar = promoCode[0];
let queue = document.querySelector('.savingsBlock')
const providePromoCode = (promoCode)=>{
  let chopped = promoCode.split("")
  chopped.map((code)=>{
    let promoPH = document.createElement('div')
    promoPH.setAttribute('class','insertPH')
    promoPH.innerHTML = code
    queue.append(promoPH)
  })
}
providePromoCode(promoCode)

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
},5000)