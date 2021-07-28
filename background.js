var popupId

function openPopup() {
  chrome.windows.create(
    {
      url: 'popup.html',
      type: 'popup',
      focused: true,
      width: 300,
      height: 500,
    },
    function (popup) {
      popupId = popup.id
    },
  )
}

chrome.action.onClicked.addListener(function (tab) {
  console.log('Using Image Paster')

  if (typeof popupId === 'undefined') {
    openPopup()
  } else {
    chrome.windows.remove(popupId)

    openPopup()
  }
})

// When a window is closed
chrome.windows.onRemoved.addListener(function (windowId) {
  if (windowId === popupId) {
    popupId = undefined
  }
})
