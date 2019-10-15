<script>
  import { onMount } from 'svelte';
  import Tone from 'tone'
  var polySynth = new Tone.PolySynth(3, Tone.Synth).toMaster();
  var notes = ['C4','C#4','D4','D#4','E4','F4','F#4','G4','G#4','A4','A#4','B4','C5','C#5','D5','D#5','E5','F5','F#5','G5','G#5','A5','A#5','B5']
  var markedKeys = ''
  var tempo = 140
  var playState = 'stopped'
  var buttonSign = 'right_triangle'
  var customKeys

  onMount(() => {
    customKeys = document.getElementById('keys')
  })

  function chord_1(time){
    var chordNotes = ['C#5', 'F#5', 'A5']
    customKeys.setMarkedKeys(chordNotes.map(x => notes.indexOf(x) + 1))
    polySynth.triggerAttackRelease(chordNotes, "16n", time)
  }

  function chord_2(time){
    var chordNotes = ['C#5', 'E5', 'A5']
    customKeys.setMarkedKeys(chordNotes.map(x => notes.indexOf(x) + 1))
    polySynth.triggerAttackRelease(chordNotes, "16n", time)
  }

  function chord_3(time){
    var chordNotes = ['B4', 'D5', 'A5']
    customKeys.setMarkedKeys(chordNotes.map(x => notes.indexOf(x) + 1))
    polySynth.triggerAttackRelease(chordNotes, "16n", time)
  }

  function chord_4(time){
    var chordNotes = ['B4', 'E5', 'G#5']
    customKeys.setMarkedKeys(chordNotes.map(x => notes.indexOf(x) + 1))
    polySynth.triggerAttackRelease(chordNotes, "16n", time)
  }

  function chord_5(time){
    var chordNotes = ['B4', 'E5', 'A5']
    customKeys.setMarkedKeys(chordNotes.map(x => notes.indexOf(x) + 1))
    polySynth.triggerAttackRelease(chordNotes, "16n", time)
  }

  Tone.Transport.schedule(chord_1, 0)
  Tone.Transport.schedule(() => customKeys.setMarkedKeys([]), '0:0:1')
  Tone.Transport.schedule(chord_1, '0:0:2')
  Tone.Transport.schedule(() => customKeys.setMarkedKeys([]), '0:0:3')
  Tone.Transport.schedule(chord_1, '0:1')
  Tone.Transport.schedule(() => customKeys.setMarkedKeys([]), '0:1:1')
  Tone.Transport.schedule(chord_1, '0:1:2')
  Tone.Transport.schedule(() => customKeys.setMarkedKeys([]), '0:1:3')
  Tone.Transport.schedule(chord_1, '0:2')
  Tone.Transport.schedule(() => customKeys.setMarkedKeys([]), '0:2:1')
  Tone.Transport.schedule(chord_1, '0:2:2')
  Tone.Transport.schedule(() => customKeys.setMarkedKeys([]), '0:2:3')
  Tone.Transport.schedule(chord_2, '0:3')
  Tone.Transport.schedule(() => customKeys.setMarkedKeys([]), '0:3:1')
  Tone.Transport.schedule(chord_2, '0:3:2')
  Tone.Transport.schedule(() => customKeys.setMarkedKeys([]), '0:3:3')
  Tone.Transport.schedule(chord_3, '1:0:0')
  Tone.Transport.schedule(() => customKeys.setMarkedKeys([]), '1:0:1')
  Tone.Transport.schedule(chord_3, '1:0:2')
  Tone.Transport.schedule(() => customKeys.setMarkedKeys([]), '1:0:3')
  Tone.Transport.schedule(chord_3, '1:1')
  Tone.Transport.schedule(() => customKeys.setMarkedKeys([]), '1:1:1')
  Tone.Transport.schedule(chord_3, '1:1:2')
  Tone.Transport.schedule(() => customKeys.setMarkedKeys([]), '1:1:3')
  Tone.Transport.schedule(chord_4, '1:2')
  Tone.Transport.schedule(() => customKeys.setMarkedKeys([]), '1:2:1')
  Tone.Transport.schedule(chord_4, '1:2:2')
  Tone.Transport.schedule(() => customKeys.setMarkedKeys([]), '1:2:3')
  Tone.Transport.schedule(chord_4, '1:3')
  Tone.Transport.schedule(() => customKeys.setMarkedKeys([]), '1:3:1')
  Tone.Transport.schedule(chord_4, '1:3:2')
  Tone.Transport.schedule(() => customKeys.setMarkedKeys([]), '1:3:3')
  Tone.Transport.schedule(chord_4, '2:0:0')
  Tone.Transport.schedule(() => customKeys.setMarkedKeys([]), '2:0:1')
  Tone.Transport.schedule(chord_4, '2:0:2')
  Tone.Transport.schedule(() => customKeys.setMarkedKeys([]), '2:0:3')
  Tone.Transport.schedule(chord_5, '2:1')
  Tone.Transport.schedule(() => customKeys.setMarkedKeys([]), '2:1:1')
  Tone.Transport.schedule(chord_5, '2:1:2')
  Tone.Transport.schedule(() => customKeys.setMarkedKeys([]), '2:1:3')
  Tone.Transport.schedule(chord_5, '2:2')
  Tone.Transport.schedule(() => customKeys.setMarkedKeys([]), '2:2:1')
  Tone.Transport.schedule(chord_4, '2:2:2')
  Tone.Transport.schedule(() => customKeys.setMarkedKeys([]), '2:2:3')
  Tone.Transport.schedule(chord_4, '2:3')
  Tone.Transport.schedule(() => customKeys.setMarkedKeys([]), '2:3:1')
  Tone.Transport.schedule(chord_4, '2:3:2')
  Tone.Transport.schedule(() => customKeys.setMarkedKeys([]), '2:3:3')

  Tone.Transport.loopEnd = '3m'
  Tone.Transport.loop = true
  Tone.Transport.bpm.value = tempo

  function togglePlayback() {
    Tone.Transport.toggle()
    playState = Tone.Transport.state
    buttonSign = playState === 'stopped' ? 'right_triangle' : 'square'
    setTimeout(() => { if(playState === 'stopped') { customKeys.setMarkedKeys([]) } }, 100)
  }

  function updateTempo() {
    Tone.Transport.bpm.value = tempo
  }

</script>

<style>

  #right_triangle {
    width: 0;
    height: 0;
    border-top: 20px solid transparent;
    border-left: 40px solid black;
    border-bottom: 20px solid transparent;
  }

  #square {
    width: 40px;
    height: 40px;
    background: black;
  }

  .button {
    margin-top: 15px;
    border: 2px solid #aaa;
    border-radius: 2px;
    padding: 15px;
  }

  #container, #controls{
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 18px;
  }

  #tempo {
    display: flex;
    align-items: center;
    background-color: #ebf6f9;
    padding: 10px;
    margin-top: 15px;
    box-shadow: 4px 4px 4px lightgrey;
  }

  #introduction {
    width: 500px;
    margin: 20px;
  }

  #title {
    font-weight: bold;
    margin: 20px;
  }

  #footer {
    font-size: 14px;
    margin-top: 80px;
    margin-bottom: 20px;
    text-align: center;
  }

</style>

<div id="container">
   <div id="title">
    Toto - Hold the line
   </div>
   piano intro
  <div id="introduction">
    <a href="https://github.com/jutunen/custom-piano-keys" target="_blank">Custom-piano-keys</a> does not have any playback features. In the following, audio playback and scheduling features of the awesome <a href="https://tonejs.github.io/" target="_blank">Tone.js</a> library are utilized together with custom-piano-keys element to display the played notes in real-time. Press play!
  </div>
  <custom-piano-keys id='keys' height='150' oct-count='2' oct-w-factor='1.5' />
  <div id="controls">
    <button class="button" on:click={togglePlayback} type='button'><div id={buttonSign}></div></button>
    <div id="tempo">
      Tempo
      &nbsp;
      <input type="range" min="1" max="200" bind:value={tempo} on:input={updateTempo}>
      &nbsp;
      <input type="text" bind:value={tempo} on:input={updateTempo} size=1>
    </div>
  </div>
  <div id="footer">
    This page was made with &heartsuit; and  <a href="https://svelte.dev/" target="_blank">Svelte</a>
    <br>
    <br>
    This demo is available from <a href="https://github.com/jutunen/custom-piano-keys/tree/master/demos/second" target="_blank">GitHub
  </div>
</div>
