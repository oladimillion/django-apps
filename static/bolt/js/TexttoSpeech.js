
class TexttoSpeech{
  constructor(synth, speechSynth, element){
    this.synth = synth
    this.speechSynth = speechSynth
    this.element = element

    this.running = false
    this.pause = false
    this.utterThis = undefined
    this.timerID = undefined

    this.start = this.start.bind(this)
    this.speak = this.speak.bind(this)
    this.ispaused = this.ispaused.bind(this)

    if(synth)
      this.available = true
    else
      this.available = false
  }

  speak(text){
    if(!this.running){
      return
    }

    this.pause = true

    const SpeechSynthesisUtterance = this.speechSynth
    const voices = this.synth.getVoices()
    this.utterThis = new SpeechSynthesisUtterance(text)
    this.utterThis.voice  = !!voices.length ? voices[0] : undefined  
    this.synth.speak(this.utterThis)

    this.utterThis.onend = (e) => {
      clearTimeout(this.timerID)
      this.timerID = undefined
      this.timerID = setTimeout(()=>this.pause = false, 10)
    }
  }

  ispaused(){
    return this.pause
  }

  start(elementID){

    if(!this.available){
      this.element.showInfo("Text to speech not supported")
      return false
    }

    this.running = !this.running

    return true
   }


}
