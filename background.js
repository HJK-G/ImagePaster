chrome.action.onClicked.addListener(function (tab) {
  console.log('Using Image Paster')

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['checkPaste.js'],
  })
})
