
class Pianokeys extends HTMLElement {
  constructor () {
    super()
    this.octaveCount = 1
    this.absElementHeight = 100
    this.markedKeysStr = ''
    this.markedKeysNumArray = []
    this.pianoKeys = undefined
    this.markColor = 'red'
    this.markShape = 'circle'
    this.markDiameter = 40
    this.octaveWidthFactor = 1.5
    this.octaveWidth = this.absElementHeight * this.octaveWidthFactor
    this.octaveHeight = this.absElementHeight
    this.blackKeyHeight = 60
    this.blackKeyWidth = 50
    this.whiteKeyWidth = this.octaveWidth / 7
    this.absMarkDiameter = this.markDiameter * this.whiteKeyWidth / 100
    this.absBlackKeyHeight = this.blackKeyHeight * this.octaveHeight / 100
    this.absBlackKeyWidth = this.blackKeyWidth * this.whiteKeyWidth / 100
    this.sWidth = 2 //stroke width
    this.absStrokeWidth = this.sWidth * this.absElementHeight / 100
    this.blackKeyMarkShift = 50
    this.whiteKeyMarkShift = 50
    // negative values = black keys, positive values = white keys, absolute value = ordinal number
    // 96 values = 96 keys = 40 blacks, 56 whites = 8 octaves
    this.keysLookUpArray = [1, -1, 2, -2, 3, 4, -3, 5, -4, 6, -5, 7, 8, -6, 9, -7, 10, 11, -8, 12, -9, 13, -10, 14, 15, -11, 16, -12, 17, 18, -13, 19, -14, 20, -15, 21, 22, -16, 23, -17, 24, 25, -18, 26, -19, 27, -20, 28, 29, -21, 30, -22, 31, 32, -23, 33, -24, 34, -25, 35, 36, -26, 37, -27, 38, 39, -28, 40, -29, 41, -30, 42, 43, -31, 44, -32, 45, 46, -33, 47, -34, 48, -35, 49, 50, -36, 51, -37, 52, 53, -38, 54, -39, 55, -40, 56]
    this.keysLookUpArrayLength = this.keysLookUpArray.length
  }

  static get observedAttributes () {
    return ['marked-keys',
      'oct-count',
      'height',
      'mark-color',
      'mark-shape',
      'mark-diameter',
      'b-key-h',
      'b-key-w',
      'stroke-w',
      'b-key-mark-shift',
      'w-key-mark-shift',
      'oct-w-factor']
  }

  disconnectedCallback () {
    this.pianoKeys = undefined
  }

  attributeChangedCallback (name, oldValue, newValue) {
    if (name === 'oct-count') {
      this.octaveCount = Number(newValue)
    } else if (name === 'height') {
      this.absElementHeight = Number(newValue)
      this.octaveWidth = this.absElementHeight * this.octaveWidthFactor
      this.whiteKeyWidth = this.octaveWidth / 7
      this.octaveHeight = this.absElementHeight
    } else if (name === 'marked-keys') {
      this.markedKeysStr = newValue
      this.markedKeysNumArray = []
    } else if (name === 'mark-color') {
      this.markColor = newValue
    } else if (name === 'mark-diameter') {
      this.markDiameter = Number(newValue)
    } else if (name === 'mark-shape') {
      this.markShape = newValue
    } else if (name === 'b-key-h') {
      this.blackKeyHeight = Number(newValue)
    } else if (name === 'b-key-w') {
      this.blackKeyWidth = Number(newValue)
    } else if (name === 'stroke-w') {
      this.sWidth = Number(newValue)
    } else if (name === 'b-key-mark-shift') {
      this.blackKeyMarkShift = Number(newValue)
    } else if (name === 'w-key-mark-shift') {
      this.whiteKeyMarkShift = Number(newValue)
    } else if (name === 'oct-w-factor') {
      this.octaveWidthFactor = Number(newValue)
      this.octaveWidth = this.absElementHeight * this.octaveWidthFactor
      this.whiteKeyWidth = this.octaveWidth / 7
    }

    this.absMarkDiameter = this.markDiameter * this.whiteKeyWidth / 100
    this.absBlackKeyHeight = this.blackKeyHeight * this.octaveHeight / 100
    this.absBlackKeyWidth = this.blackKeyWidth * this.whiteKeyWidth / 100
    this.absStrokeWidth = this.sWidth * this.absElementHeight / 100

    if (!this.pianoKeys || !this._checkAttributeValidity()) {
      return
    }

    if (name === 'oct-count' || name === 'b-key-h' || name === 'b-key-w' || name === 'stroke-w' || name === 'oct-w-factor' || name === 'height') {
      this.removeChild(this.querySelector('svg'))
      this.appendChild(this._generateKeys())
      this.pianoKeys = this.querySelector('#keys')
      this._setHeight()

      if (this.markedKeysStr || this.markedKeysNumArray.length > 0) {
        this._handleMarkedKeysInput(this.markedKeysStr, this.markedKeysNumArray)
      }
    } else if (name === 'marked-keys' || name === 'mark-color' || name === 'mark-shape' || name === 'mark-diameter' || name === 'b-key-mark-shift' || name === 'w-key-mark-shift') {
      while (this.pianoKeys.querySelector('.keymark') !== null) {
        this.pianoKeys.removeChild(this.pianoKeys.querySelector('.keymark'))
      }
      this._handleMarkedKeysInput(this.markedKeysStr, this.markedKeysNumArray)
    }
  }

  connectedCallback () {
    if (!this._checkAttributeValidity()) { return }
    this.appendChild(this._generateKeys())
    this.pianoKeys = this.querySelector('#keys')
    this._setHeight()
    if (this.hasAttribute('marked-keys')) {
      this._handleMarkedKeysInput(this.getAttribute('marked-keys'))
    }
  }

  setMarkedKeys ( keys ) {
    if(!Array.isArray(keys)) {
      return
    }
    while (this.pianoKeys.querySelector('.keymark') !== null) {
      this.pianoKeys.removeChild(this.pianoKeys.querySelector('.keymark'))
    }
    if(keys.length > 0) {
      this._addKeyMarks( keys )
    }
    this.markedKeysNumArray = keys.slice()
    this.markedKeysStr = ''
  }

  _checkAttributeValidity () {
    if (isNaN(this.octaveCount) || isNaN(this.absElementHeight) || isNaN(this.octaveWidthFactor) || isNaN(this.markDiameter) || isNaN(this.sWidth) || isNaN(this.blackKeyHeight) || isNaN(this.blackKeyWidth) || isNaN(this.blackKeyMarkShift) || isNaN(this.whiteKeyMarkShift)) {
      return false
    }
    return true
  }

  _setHeight () {
    var width = this.octaveCount * this.octaveWidthFactor * this.absElementHeight
    this.pianoKeys.style.height = this.absElementHeight + 'px'
    this.pianoKeys.style.width = width + 'px'
    this.pianoKeys.style.verticalAlign = 'middle'
  }

  _handleMarkedKeysInput (markedKeysStr, markedKeysArray = []) {
    if (markedKeysStr.length === 0 && markedKeysArray.length === 0) {
      return
    }

    if(markedKeysArray.length > 0) {
      this._addKeyMarks(markedKeysArray)
      return
    }

    var markedKeysNumberArray = markedKeysStr.trim().split(/\s+/).map(numStr => parseInt(numStr)).filter(this._keyValueIsValid, this)

    if (markedKeysNumberArray.length === 0) {
      return
    }

    this._addKeyMarks(markedKeysNumberArray)
  }

  _addKeyMarks (marksArray) {
    var lastVisibleKey = this.octaveCount * 12
    var whiteKeyBaseX = this.whiteKeyWidth / 2
    var whiteKeyBaseY = this.absBlackKeyHeight + ((this.octaveHeight - this.absBlackKeyHeight) * this.whiteKeyMarkShift / 100)
    var blackKeyBaseY = this.absBlackKeyHeight * this.blackKeyMarkShift / 100
    var x = 0
    var y = 0
    var lookedUpVal
    var actualColor = this.markColor
    var blackKeyXCoords = []
    this._generateBlackKeyXCoords(blackKeyXCoords)

    for (let i = 0; i < marksArray.length; i++) {
      if (marksArray[i] > lastVisibleKey) {
        break
      }
      lookedUpVal = this.keysLookUpArray[marksArray[i] - 1]
      if (lookedUpVal < 0) {
        // key is black
        x = blackKeyXCoords[Math.abs(lookedUpVal) - 1]
        y = blackKeyBaseY
        if (this.markColor === 'black' || this.markColor === '#000000') { actualColor = 'white' }
      } else {
        // key is white
        x = lookedUpVal * this.whiteKeyWidth - whiteKeyBaseX
        y = whiteKeyBaseY
        if (this.markColor === 'black' || this.markColor === '#000000') { actualColor = 'black' }
      }
      if (this.markShape === 'rect') {
        this._addRectangle(x, y, actualColor, this.absMarkDiameter)
      } else {
        this._addCircle(x, y, actualColor, this.absMarkDiameter)
      }
    }
  }

  _addCircle (x, y, markColor, markDiameter) {
    const r = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    r.setAttributeNS(null, 'fill', markColor)
    r.setAttributeNS(null, 'r', markDiameter / 2)
    r.setAttributeNS(null, 'cx', x)
    r.setAttributeNS(null, 'cy', y)
    r.setAttributeNS(null, 'class', 'keymark')
    this.pianoKeys.appendChild(r)
  }

  _addRectangle (x, y, markColor, markDiameter) {
    const r = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    r.setAttributeNS(null, 'fill', markColor)
    r.setAttributeNS(null, 'x', x - (markDiameter / 2))
    r.setAttributeNS(null, 'y', y - (markDiameter / 2))
    r.setAttributeNS(null, 'width', markDiameter)
    r.setAttributeNS(null, 'height', markDiameter)
    // r.setAttributeNS(null, "transform", "rotate(45," + x + "," + y + ")")
    r.setAttributeNS(null, 'class', 'keymark')
    this.pianoKeys.appendChild(r)
  }

  _generateKeys () {
    var numberOfWhiteKeyGaps = this.octaveCount * 7 - 1
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttributeNS(null, 'id', 'keys')
    svg.setAttributeNS(null, 'width', this.octaveCount * this.octaveWidth)
    svg.setAttributeNS(null, 'height', this.octaveHeight)
    svg.setAttributeNS(null, 'viewBox', '0 0 ' + this.octaveCount * this.octaveWidth + ' ' + this.octaveHeight)
    var keysOuterRect = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    var strokeWidthHalf = this.absStrokeWidth / 2
    keysOuterRect.setAttributeNS(null, 'd', 'M' + strokeWidthHalf + ' ' + strokeWidthHalf + ' L' + strokeWidthHalf + ' ' + (this.octaveHeight - strokeWidthHalf) + ' L' + (this.octaveCount * this.octaveWidth - strokeWidthHalf) + ' ' + (this.octaveHeight - strokeWidthHalf) + ' L' + (this.octaveCount * this.octaveWidth - strokeWidthHalf) + ' ' + strokeWidthHalf + ' Z')
    keysOuterRect.setAttributeNS(null, 'stroke', 'black')
    keysOuterRect.setAttributeNS(null, 'stroke-width', this.absStrokeWidth)
    keysOuterRect.setAttributeNS(null, 'fill', 'white')
    svg.appendChild(keysOuterRect)
    this._generateAndAppendWhiteKeyGaps(svg, numberOfWhiteKeyGaps)
    this._generateAndAppendBlackKeys(svg)
    return svg
  }

  _generateBlackKeyXCoords (arrayRef) {
    var xIntervals = [this.whiteKeyWidth, this.whiteKeyWidth, 2 * this.whiteKeyWidth, this.whiteKeyWidth, this.whiteKeyWidth, 2 * this.whiteKeyWidth]
    var ii = 0
    var sum = 0

    for (let i = 0; i < this.octaveCount * 5; i++) {
      arrayRef[i] = xIntervals[ii] + sum
      sum = arrayRef[i]
      ii++
      if (ii > 5) {
        ii = 1
      }
    }
  }

  _generateAndAppendBlackKeys (parentNode) {
    var clone
    var xCoords = []
    this._generateBlackKeyXCoords(xCoords)

    var blackKey = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    blackKey.setAttributeNS(null, 'stroke', 'black')
    blackKey.setAttributeNS(null, 'stroke-width', this.absBlackKeyWidth)
    for (let i = 0; i < this.octaveCount * 5; i++) {
      clone = blackKey.cloneNode()
      clone.setAttributeNS(null, 'd', 'M' + xCoords[i] + ' 0 L' + xCoords[i] + ' ' + this.absBlackKeyHeight)
      parentNode.appendChild(clone)
    }
  }

  _generateAndAppendWhiteKeyGaps (parentNode, gapCount) {
    var clone
    var whiteKeyGap = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    whiteKeyGap.setAttributeNS(null, 'stroke', 'black')
    whiteKeyGap.setAttributeNS(null, 'stroke-width', this.absStrokeWidth)
    whiteKeyGap.setAttributeNS(null, 'd', 'M' + this.whiteKeyWidth + ' 0 L' + this.whiteKeyWidth + ' ' + this.octaveHeight)
    parentNode.appendChild(whiteKeyGap)
    var xCoord = 2 * this.whiteKeyWidth
    for (let i = 1; i < gapCount; i++) {
      clone = whiteKeyGap.cloneNode()
      clone.setAttributeNS(null, 'd', 'M' + xCoord + ' 0 L' + xCoord + ' ' + this.octaveHeight)
      parentNode.appendChild(clone)
      xCoord += this.whiteKeyWidth
    }
  }

  _keyValueIsValid (n) {
    if (isNaN(n) || typeof n !== 'number' || n < 1 || n > this.keysLookUpArrayLength) {
      return false
    }
    return true
  }
}

customElements.define('custom-piano-keys', Pianokeys)
