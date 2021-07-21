console.log(window.isSecureContext);
getClipboardContents()

console.log(window.isSecureContext)
navigator.permissions.query({ name: 'clipboard-read' })
navigator.permissions.query({ name: 'clipboard-read' }).then((result) => {
  // If permission to read the clipboard is granted or if the user will
  // be prompted to allow it, we proceed.
  console.log(result.state)

  if (result.state == 'granted' || result.state == 'prompt') {
    navigator.clipboard.read().then((data) => {
      for (let i = 0; i < data.length; i++) {
        if (!data[i].types.includes('image/png')) {
          console.log(
            'Clipboard contains non-image data. Unable to access it.',
          )
        } else {
          data[i].getType('image/png').then((blob) => {
            console.log('is png')
          })
        }
      }

      console.log('DATA?')
    })
    console.log('idk')
  }
})
async function getClipboardContents() {
  let textArea = document.createElement('textarea')
  textArea.value = textToCopy
  // make the textarea out of viewport
  textArea.style.position = 'fixed'
  textArea.style.left = '-999999px'
  textArea.style.top = '-999999px'
  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()
  return new Promise((res, rej) => {
    // here the magic happens
    document.execCommand('copy') ? res() : rej()
    textArea.remove()
  })

  // try {
  //   const clipboardItems = await navigator.clipboard.read();
  //   for (const clipboardItem of clipboardItems) {
  //     for (const type of clipboardItem.types) {
  //       const blob = await clipboardItem.getType(type);
  //       console.log(URL.createObjectURL(blob));
  //     }
  //   }
  // } catch (err) {
  //   console.error(err.name, err.message);
  // }
}
