<script>
  let octaveCount = 2
  let elementHeight = 150
  let octWidthFactor = 1.5
  let strokeWidth = 1
  let blackKeyHeight = 60
  let blackKeyWidth = 50
  let markedKeys = '1 5 8'
  let markDiameter = 50
  let markColor = 'red'
  let markShape = 'circle'
  let blackKeyMarkShift = 50
  let whiteKeyMarkShift = 50

  function saveToFile() {
    var keys = document.getElementById("thekeys")
    var blob = new Blob([keys.innerHTML], {type: "image/svg+xml;charset=utf-8"})
    saveAs(blob, "keys.svg")
  }

  function resetAllValues() {
    octaveCount = 2
    elementHeight = 150
    octWidthFactor = 1.5
    strokeWidth = 1
    blackKeyHeight = 60
    blackKeyWidth = 50
    markedKeys = '1 5 8'
    markDiameter = 50
    markColor = 'red'
    markShape = 'circle'
    blackKeyMarkShift = 50
    whiteKeyMarkShift = 50
  }

  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function removeDuplicates(arr) {
    let s = new Set(arr);
    let it = s.values();
    return Array.from(it);
  }

  function myReducer(total, item) {
    return total + " " + item;
  }

  function randomizeMarked() {
    let randomKeys = [random(1,12),random(1,12),random(1,12),random(1,12)]
    let uniqueKeys = removeDuplicates(randomKeys)
    uniqueKeys.sort(function(a, b){return a-b})
    markedKeys = uniqueKeys.reduce(myReducer,"").trim()
  }

  function clearMarked() {
    markedKeys = ''
  }

  function resetMarkColor() {
    markColor = 'red'
  }
</script>

<style>
  .range {
    display: flex;
    align-items: baseline;
    background-color: #ebf6f9;
    padding: 5px;
    margin-bottom: 10px;
    box-shadow: 4px 4px 4px lightgrey;
  }
  .range input, .range button, .range select {
    margin-left: 10px;
  }
  .controls {
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 0px;
  }
  .controls_container {
    display:flex;
    margin-bottom: 5px;
    align-items: center;
  }
  piano-keys {
    display: inline-block;
    margin-bottom: 10px;
  }
  .html_example {
    font-family: "Courier New", Courier, monospace;
    font-stretch: extra-expanded;
    display:inline-block;
    background-color: #d8edf3;
    padding: 10px;
  }
  #width_calculation {
    display:inline-block;
    background-color: #ebf6f9;
    padding: 10px;
    margin-bottom: 10px;
    min-width: 600px;
    box-shadow: 4px 4px 4px lightgrey;
  }
  #container {
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: Arial, Helvetica, sans-serif;
  }
  .keys_container {
    display:flex;
    flex-direction: column;
    background-color: #ebf6f9;
    align-items: center;
    padding:10px;
    margin-bottom: 10px;
    box-shadow: 4px 4px 4px lightgrey;
  }
  .bold_text {
    font-weight: bold;
    margin-bottom: 5px;
    font-family: Arial, Helvetica, sans-serif;
  }
  #title {
    background-color: #ebf6f9;
    display: flex;
    align-items: baseline;
    padding: 5px;
    box-shadow: 4px 4px 4px lightgrey;
    margin-bottom: 15px;
  }
  h2 {
    margin: 10px;
  }
  #description {
    font-size: 18px;
    font-style: italic;
    margin: 12px;
  }
  #footer {
    margin: 20px;
  }
</style>

<div id="container">
  <div id="description">
    custom-piano-keys web component is available from <a href="https://github.com/jutunen/custom-piano-keys" target="_blank">GitHub</a>
  </div>
  <div id="title">
    <piano-keys height=30 />
    <h2>custom-piano-keys demo</h2>
    <piano-keys height=30 />
  </div>
  <div class="controls_container">
    <div class="controls">
      <div class="range">
        Octave count
        <input type="range" min="0" max="10" bind:value={octaveCount}>
        <input type="text" bind:value={octaveCount} size=1>
      </div>
      <div class="range">
        Element height
        <input type="range" min="10" max="500" bind:value={elementHeight}>
        <input type="text" bind:value={elementHeight} size=1>
        px
      </div>
      <div class="range">
        Octave width factor
        <input type="range" min="0.2" max="10" step="0.1" bind:value={octWidthFactor}>
        <input type="text" bind:value={octWidthFactor} size=1>
      </div>
      <div class="range">
        Stroke width
        <input type="range" min="0" max="10" step="0.5" bind:value={strokeWidth}>
        <input type="text" bind:value={strokeWidth} size=1>
        %
      </div>
      <div class="range">
        Black key width
        <input type="range" min="1" max="100" bind:value={blackKeyWidth}>
        <input type="text" bind:value={blackKeyWidth} size=1>
        %
      </div>
      <div class="range">
        Black key height
        <input type="range" min="1" max="100" bind:value={blackKeyHeight}>
        <input type="text" bind:value={blackKeyHeight} size=1>
        %
      </div>
    </div>
    <div class="controls">
      <div class="range">
        Marked keys
        <input type="text" bind:value={markedKeys} size=7>
        <button on:click={randomizeMarked} type='button'>Randomize</button>
        <button on:click={clearMarked} type='button'>Clear</button>
      </div>
      <div class="range">
        Mark diameter
        <input type="range" min="1" max="100" bind:value={markDiameter}>
        <input type="text" bind:value={markDiameter} size=1>
        %
      </div>
      <div class="range">
        Mark color
        <input type="text" bind:value={markColor} size=5>
        <button on:click={resetMarkColor} type='button'>Reset</button>
      </div>
      <div class="range">
        Mark shape
        <select bind:value={markShape}>
          <option value='circle'>circle</option>
          <option value='rect'>rect</option>
        </select>
      </div>
      <div class="range">
        Black key mark shift
        <input type="range" min="1" max="100" bind:value={blackKeyMarkShift}>
        <input type="text" bind:value={blackKeyMarkShift} size=1>
        %
      </div>
      <div class="range">
        White key mark shift
        <input type="range" min="1" max="100" bind:value={whiteKeyMarkShift}>
        <input type="text" bind:value={whiteKeyMarkShift} size=1>
        %
      </div>
    </div>
  </div>

  <div class='buttons'>
    <button on:click={resetAllValues} type='button'>Reset all</button>
    &nbsp;
    &nbsp;
    <button on:click={saveToFile} type='button'>Save to file as SVG image</button>
  </div>

  <div class="keys_container">
    <custom-piano-keys id='thekeys' oct-count={octaveCount}
                height={elementHeight}
                oct-w-factor={octWidthFactor}
                stroke-w={strokeWidth}
                b-key-w={blackKeyWidth}
                b-key-h={blackKeyHeight}
                marked-keys={markedKeys}
                mark-diameter={markDiameter}
                mark-color={markColor}
                mark-shape={markShape}
                b-key-mark-shift={blackKeyMarkShift}
                w-key-mark-shift={whiteKeyMarkShift} />
    <div class="html_example">
      <div class="bold_text">HTML tag with all attributes:</div>
      {`<custom-piano-keys oct-count=${octaveCount} height=${elementHeight} oct-w-factor=${octWidthFactor} stroke-w=${strokeWidth} b-key-w=${blackKeyWidth} b-key-h=${blackKeyHeight} marked-keys='${markedKeys}'`}
      <br>
      {`mark-diameter=${markDiameter} mark-color=${markColor} mark-shape=${markShape} b-key-mark-shift=${blackKeyMarkShift} w-key-mark-shift=${whiteKeyMarkShift} />`}
    </div>
  </div>

  <div id="width_calculation">
   <div class="bold_text">Element width calculation:</div>
   {`Width = Height * Octave width factor * Octave count = ${elementHeight} * ${octWidthFactor} * ${octaveCount} = ${elementHeight*octWidthFactor*octaveCount}px`}
  </div>

  <div class="keys_container">
    <custom-piano-keys />
    <div class="html_example">
      <div class="bold_text">HTML tag without attributes:</div>
      {`<custom-piano-keys />`}
    </div>
  </div>

  <div id="footer">
    this page was made with &heartsuit; and  <a href="https://svelte.dev/" target="_blank">Svelte</a>
  </div>
</div>
