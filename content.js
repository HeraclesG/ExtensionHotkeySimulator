console.log('234234');
const event = new KeyboardEvent('keydown', {
    key: 'A', // Replace with the desired key
    code: 'KeyA',
    keyCode: 65,
    shiftKey: true, // Modify the modifiers as needed
    ctrlKey: true,
    altKey: false,
    metaKey: false,
  });


  window.dispatchEvent(event);
