chrome.action.onClicked.addListener(function (tab) {
  console.log('Using Image Paster')

  // If popupId is undefined then there isn't a popup currently open.
  if (typeof popupId === 'undefined') {
    // Open the popup
    chrome.windows.create(
      {
        url: 'popup.html',
        type: 'popup',
        focused: true,
        width: 350,
        height: 520,
      },
      function (popup) {
        popupId = popup.id
      }, 
    )
  }
  // There's currently a popup open
  else {
    // Bring it to the front so the user can see it
    chrome.windows.update(popupId, { focused: true })
  }
})

// When a window is closed
chrome.windows.onRemoved.addListener(function (windowId) {
  // If the window getting closed is the popup we created
  if (windowId === popupId) {
    // Set popupId to undefined so we know the popups not open
    popupId = undefined
  }
})
