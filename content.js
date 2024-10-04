let buttonContainer;
let isDragging = false;
let offsetX, offsetY;
let focusedElement;
let scrollInterval;

// Function to create or update scroll buttons at the mouse position
function createScrollButtons(event) {
    event.preventDefault(); // Prevent default context menu on right-click

    // If the button container already exists, move it to the new position
    if (buttonContainer) {
        buttonContainer.style.top = `${event.clientY + 10}px`; // Offset by 10 pixels below the cursor
        buttonContainer.style.left = `${event.clientX}px`;
    } else {
        // Create button container
        buttonContainer = document.createElement('div');
        buttonContainer.style.position = "fixed";
        buttonContainer.style.bottom = "20px";
        buttonContainer.style.left = "50%";
        buttonContainer.style.transform = "translateX(-50%)"; // Center the buttons
        buttonContainer.style.zIndex = "1000";
        buttonContainer.style.padding = "10px";
        buttonContainer.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
        buttonContainer.style.boxShadow = "0 2px 10px rgba(0,0,0,0.5)";
        buttonContainer.style.width = "200px";
        buttonContainer.style.height = "200px";
        buttonContainer.style.cursor = "move"; // Indicate that it can be dragged
        buttonContainer.addEventListener('wheel', (e) => {
      });

        buttonContainer.onclick = (e) => {
            e.stopPropagation(); // Prevent triggering the click event on the container
        }
        buttonContainer.onmousedown = (e) => {
            e.stopPropagation();
            isDragging = true;
            offsetX = e.clientX - buttonContainer.getBoundingClientRect().left;
            offsetY = e.clientY - buttonContainer.getBoundingClientRect().top;
            document.body.style.cursor = 'grabbing';
        };

        document.onmousemove = (e) => {
            if (isDragging) {
                buttonContainer.style.left = `${e.clientX - offsetX}px`;
                buttonContainer.style.top = `${e.clientY - offsetY}px`;
            }
        };

        document.onmouseup = () => {
            isDragging = false;
            document.body.style.cursor = 'default';
        };

        // Create close button
        const closeButton = document.createElement('button');
        closeButton.innerText = "Close";
        closeButton.style.position = "absolute";
        closeButton.style.top = "10px"; // Position at the top
        closeButton.style.right = "10px"; // Position at the right
        closeButton.style.padding = "10px";
        closeButton.style.cursor = "pointer";
        closeButton.style.backgroundColor = "red"; // Red background for close button
        closeButton.style.color = "white"; // White text
        closeButton.onclick = (e) => {
            // Remove the button container when close button is clicked
            e.stopPropagation();
            document.body.removeChild(buttonContainer);
            buttonContainer = null; // Reset the button container reference
        };
        buttonContainer.appendChild(closeButton);

        // Create scroll buttons
        const buttons = [
            { text: "Up", direction: "up", delta: -50 }, // Scroll up
            { text: "Down", direction: "down", delta: 50 }, // Scroll down
            { text: "Left", direction: "left", delta: -50 }, // Scroll left
            { text: "Right", direction: "right", delta: 50 } // Scroll right
        ];

        buttons.forEach(button => {
            const btn = document.createElement('button');
            btn.innerText = button.text;
            btn.style.position = "absolute"; // Position absolutely within the container
            btn.style.padding = "10px";
            btn.style.cursor = "pointer";
            btn.style.backgroundColor = "white"; // White background for other buttons
            btn.style.color = "black"; // Black text
            btn.style.opacity = "0.7"; // Transparent effect
            btn.style.border = "2px solid black"; // Black border

            // Set button position
            if (button.direction === "up") {
                btn.style.top = "0";
                btn.style.left = "50%";
                btn.style.transform = "translateX(-50%)";
            } else if (button.direction === "down") {
                btn.style.bottom = "0";
                btn.style.left = "50%";
                btn.style.transform = "translateX(-50%)";
            } else if (button.direction === "left") {
                btn.style.top = "50%";
                btn.style.left = "0";
                btn.style.transform = "translateY(-50%)";
            } else if (button.direction === "right") {
                btn.style.top = "50%";
                btn.style.right = "0";
                btn.style.transform = "translateY(-50%)";
            }
            btn.onclick = (e) => {
                e.stopPropagation(); // Prevent triggering the click event on the container
            }

            btn.onmousedown = (e) => {
                e.stopPropagation(); // Prevent triggering the click event on the container
                startScrolling(button.delta, button.direction)
            };
            btn.onmouseup = (e) => {
                stopScrolling()
            };
            btn.onmouseleave = (e) => {
                stopScrolling()
            };
            buttonContainer.appendChild(btn);
        });

        // Append the button container to the body
        buttonContainer.style.left = `${event.clientX}px`;
        buttonContainer.style.top = `${event.clientY + 10}px`;
        document.body.appendChild(buttonContainer);

        // Add event listeners for drag functionality
        
    }
}
function startScrolling(delta, direction) {
    scrollElement(delta, direction); // Initial scroll
    scrollInterval = setInterval(() => scrollElement(delta, direction), 100); // Continue scrolling every 100ms
}

// Function to stop scrolling
function stopScrolling() {
    clearInterval(scrollInterval);
}
function onMouseDown(event) {
    isDragging = true;
    offsetX = event.clientX - buttonContainer.getBoundingClientRect().left;
    offsetY = event.clientY - buttonContainer.getBoundingClientRect().top;
    document.body.style.cursor = 'grabbing';
}

function onMouseMove(event) {
    if (isDragging) {
        let newX = event.clientX - offsetX;
        let newY = event.clientY - offsetY;

        // Constrain to viewport
        const containerWidth = buttonContainer.offsetWidth;
        const containerHeight = buttonContainer.offsetHeight;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Keep the panel within the viewport
        newX = Math.max(0, Math.min(newX, viewportWidth - containerWidth));
        newY = Math.max(0, Math.min(newY, viewportHeight - containerHeight));

        buttonContainer.style.left = `${newX}px`;
        buttonContainer.style.top = `${newY}px`;
    }
}

function onMouseUp() {
    isDragging = false;
    document.body.style.cursor = 'default';
}
// Function to scroll the focused element or its parent
scrollElement =  (delta, direction) => {
  chrome.runtime.sendMessage({ action: 'sendToNative', message: delta });
    // if (focusedElement) {
  
      
            // var msg = {
            //     'SCTRL': true,
            //     'SSHIFT': true,
            //     'SALT': true,
            //     'SCODE':'a'
            // }
            // console.log(msg);
            // console.log(JSON.stringify(msg));
            // port.postMessage(msg);
       
    //     console.log("focusedElement", focusedElement)
    //     console.log("focusparent", focusedElement.parentElement)
    //     computedStyle = window.getComputedStyle(focusedElement);
    //     overflowX = computedStyle.overflowX;
    //     overflowY = computedStyle.overflowY;
    //     console.log("scrollbottom", focusedElement.scrollTop, focusedElement.clientHeight, focusedElement.scrollHeight, overflowX, overflowY)
    //     if (direction === 'up' || direction === 'down') {
    //         const canScroll = (((delta < 0 && focusedElement.scrollTop > 0) || 
    //                           (delta > 0 && (focusedElement.scrollTop + focusedElement.clientHeight + 50 < focusedElement.scrollHeight))) && (overflowY === 'auto' || overflowY === 'scroll'));

    //         if (canScroll) {
    //             console.log("focusedElement", focusedElement)
    //             focusedElement.scrollBy({
    //                 top: delta,
    //                 left: 0,
    //                 behavior: 'smooth'
    //             });
    //         } else {
    //             // Scroll parent if the focused element cannot scroll
    //             let parent = focusedElement.parentElement;
    //             while (parent) {
    //                 computedStyle = window.getComputedStyle(parent);
    //                 overflowX = computedStyle.overflowX;
    //                 overflowY = computedStyle.overflowY;
    //                 console.log("scrollbottom", parent.scrollTop, parent.clientHeight, parent.scrollHeight, overflowX, overflowY)
    //                 const canParentScroll = (((delta < 0 && parent.scrollTop > 0) || 
    //                 (delta > 0 && (parent.scrollTop + parent.clientHeight + 50 < parent.scrollHeight))) && (overflowY === 'auto' || overflowY === 'scroll'));
    //                 if (canParentScroll) {
    //                     console.log("parent", parent)
    //                     parent.scrollBy({
    //                         top: delta,
    //                         left: 0,
    //                         behavior: 'smooth'
    //                     });
    //                     break; // Exit loop after scrolling the first scrollable parent
    //                 }
    //                 focusedElement = parent;
    //                 parent = parent.parentElement; // Move up to the next parent
    //             }
    //         }
    //     } else if (direction === 'left' || direction === 'right') {
    //         const canScroll =  (((delta < 0 && focusedElement.scrollTop > 0) || 
    //         (delta > 0 && (focusedElement.scrollTop + focusedElement.clientHeight + 50 < focusedElement.scrollHeight))) && (overflowX === 'auto' || overflowX === 'scroll'));

    //         if (canScroll) {
    //             focusedElement.scrollBy({
    //                 top: 0,
    //                 left: delta,
    //                 behavior: 'smooth'
    //             });
    //         } else {
    //             // Scroll parent if the focused element cannot scroll
    //             let parent = focusedElement.parentElement;
    //             while (parent) {
    //                 computedStyle = window.getComputedStyle(parent);
    //                 overflowX = computedStyle.overflowX;
    //                 overflowY = computedStyle.overflowY;
    //                 const canParentScroll =(((delta < 0 && parent.scrollTop > 0) || 
    //                 (delta > 0 && (parent.scrollTop + parent.clientHeight + 50 < parent.scrollHeight))) && (overflowX === 'auto' || overflowX === 'scroll'));
        
    //                 if (canParentScroll) {
    //                     parent.scrollBy({
    //                         top: 0,
    //                         left: delta,
    //                         behavior: 'smooth'
    //                     });
    //                     break; // Exit loop after scrolling the first scrollable parent
    //                 }
    //                 parent = parent.parentElement; // Move up to the next parent
    //             }
    //         }
    //     }
    // }
};

// Listen for mouse movements to show scroll buttons
document.addEventListener('mousedown', (event) => {
  if (event.button === 2){
    if ( buttonContainer ) {
      if (event.target == buttonContainer || buttonContainer.contains(event.target)) {

      } else {
        focusedElement = event.target;
        document.body.removeChild(buttonContainer);
        buttonContainer = null; // Reset the button container reference
        createScrollButtons(event);
      }
    } else {
      focusedElement = event.target;
      createScrollButtons(event);
    }
  }

});

// Listen for keydown events to scroll down when "Shift + D" is pressed
