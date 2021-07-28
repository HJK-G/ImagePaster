let clientid = 'f1a30925998c04a'
let endpoint = 'https://api.imgur.com/3/image'

let imgurl = document.getElementById('imgurl')
let pastedImage = document.getElementById('pastedImage')
let resultText = document.getElementById('result')

function post(path, data, callback) {
  var xhttp = new XMLHttpRequest()

  xhttp.open('POST', path, true)
  xhttp.setRequestHeader('Authorization', 'Client-ID ' + clientid)

  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status >= 200 && this.status < 300) {
        var response = ''
        try {
          response = JSON.parse(this.responseText)
        } catch (err) {
          response = this.responseText
        }
        callback.call(window, response)
      } else {
        console.log(this.responseText)
        throw new Error(this.status + ' - ' + this.statusText)
      }
    }
  }
  xhttp.send(data)
  xhttp = null
}

function copyURL(link) {
  navigator.permissions.query({ name: 'clipboard-write' }).then((result) => {
    if (result.state == 'granted' || result.state == 'prompt') {
      navigator.clipboard.writeText(link).then(
        () => {
          console.log('Wrote URL to clipboard')
        },
        () => {
          console.log('Clipboard write failed')
        },
      )
    }
  })
}

var feedback = function (res) {
  if (res.success === true) {
    var link = res.data.link.replace(/^http:\/\//i, 'https://')
    console.log(link)

    imgurl.href = link
    imgurl.textContent = link

    resultText.textContent =
      'Link has been copied to clipboard. This window will close in 3 seconds.'

    copyURL(link)

    window.setTimeout(() => {
      window.close()
    }, 3000)
  }
}

navigator.permissions.query({ name: 'clipboard-read' }).then((result) => {
  if (result.state == 'granted' || result.state == 'prompt') {
    navigator.clipboard.read().then((data) => {
      for (let i = 0; i < data.length; i++) {
        if (!data[i].types.includes('image/png')) {
          console.log('Clipboard contains non-image data. Unable to access it.')
        } else {
          data[i].getType('image/png').then((blob) => {
            console.log('Got an image')
            pastedImage.src = URL.createObjectURL(blob)

            console.log(blob)
            var fd = new FormData()
            fd.append('image', blob)

            post(endpoint, fd, function (data) {
              console.log('posted')
              feedback(data)
            })
          })
        }
      }
    })
  }
})
