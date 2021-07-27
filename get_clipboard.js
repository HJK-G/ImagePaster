navigator.clipboard
  .read()
  .then((res) => {
    chrome.runtime.sendMessage({
      message: 'copied',
      payload: `"${res}"`,
    })
  })
  .catch((err) => console.log(err))
