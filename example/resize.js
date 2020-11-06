async function resize(fileImg, resizeWidt, imgId = null) {
    const reader = await setPromiseOnloadFile(fileImg)
    const img = await setPromiseOnloadImage(reader)
    const elem = document.createElement('canvas') // create a canvas
  
    // scale the image to 600 (width) and keep aspect ratio
    const scaleFactor = resizeWidt / img.width
    elem.width = resizeWidt
    elem.height = img.height * scaleFactor
  
    // draw in canvas
    const ctx = elem.getContext('2d')
    ctx.drawImage(img, 0, 0, elem.width, elem.height)
  
    // get the base64-encoded Data URI from the resize image
    const srcEncoded = ctx.canvas.toDataURL('image/jpeg', 0.1)
  
    // assign it to thumb src
    if (imgId) document.getElementById(imgId).src = srcEncoded
    return srcEncoded
  }
  
  function setPromiseOnloadFile(fileImg) {
    return new Promise((resolve, reject) => {
      // create a FileReader
      const reader = new FileReader()
  
      // image turned to base64-encoded Data URI.
      reader.readAsDataURL(fileImg)
      reader.name = fileImg.name // get the image's name
      reader.size = fileImg.size // get the image's size
      reader.onload = () => resolve(reader)
      reader.onerror = reject
    })
  }
  
  function setPromiseOnloadImage(event) {
    return new Promise((resolve, reject) => {
      const img = new Image() // create a image
      img.src = event.result // result is base64-encoded Data URI
      img.name = event.name // set name (optional)
      img.size = event.size // set size (optional)
      img.onload = () => resolve(img)
      img.onerror = reject
    })
  }
  