document.addEventListener("DOMContentLoaded", function () {
    AOS.init(); // Initialize AOS library
  
    const typedElement = document.querySelector(".typed");
    const cursorElement = document.createElement("span");
    cursorElement.className = "cursor";
    cursorElement.textContent = "|";
    typedElement.appendChild(cursorElement);
  
    const typedItems = typedElement.getAttribute("data-typed-items").split(",");
    let currentItem = 0;
    let currentText = "";
    let currentLetterIndex = 0;
    let isTyping = true;
    const typingDelay = 80; // Adjust this value for the desired typing speed
    const eraseDelay = 80; // Adjust this value for the desired erasing speed
    const pauseBeforeErase = 1000;
    const pauseBeforeNextItem = 2000;
  
    function typeText() {
      if (currentItem < typedItems.length) {
        currentText = typedItems[currentItem];
  
        if (isTyping) {
          typedElement.textContent = currentText.substring(0, currentLetterIndex) + "|";
  
          if (currentLetterIndex < currentText.length) {
            currentLetterIndex++;
            setTimeout(typeText, typingDelay);
          } else {
            isTyping = false;
            cursorElement.style.opacity = 0; // Hide cursor
            setTimeout(eraseText, pauseBeforeErase);
          }
        } else {
          typedElement.textContent = currentText.substring(0, currentLetterIndex) + "|";
  
          if (currentLetterIndex > 0) {
            currentLetterIndex--;
            setTimeout(eraseText, eraseDelay);
          } else {
            isTyping = true;
            cursorElement.style.opacity = 1; // Show cursor
            currentItem = (currentItem + 1) % typedItems.length;
            setTimeout(typeText, pauseBeforeNextItem);
          }
        }
      }
    }
  
    function eraseText() {
      typeText(); // Continue the typing and erasing process
    }
  
    typeText(); // Start the typing effect
  });
  