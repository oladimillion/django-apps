

export default class SpeechtoText{
// class SpeechtoText{

  constructor(SpeechRecognition, fetchData, texttoSpeech){
    this.fetchData = fetchData
    this.elements = this.fetchData.elements
    this.search = this.fetchData.search
    this.elementID = undefined
    this.running = false
    this.temp = false
    this.texttoSpeech = texttoSpeech

    this.error = this.error.bind(this);
    this.end = this.end.bind(this);
    this.start = this.start.bind(this);
    this.textFromSpeech = this.textFromSpeech.bind(this);

    if(SpeechRecognition){
      this.initilize(SpeechRecognition)
      this.available = true
    }
    else {
      this.available = false
    }
  }

  initilize(SpeechRecognition){
    this.recognition = new SpeechRecognition();
  
    this.recognition.interimResults = true;
    this.recognition.lang = "en-US";
    this.recognition.onresult = this.textFromSpeech
    this.recognition.onend = this.end 
    this.recognition.onerror = this.error
  }

  end(){
    if(this.running){
      this.recognition.start()
    }
    else{
      this.elements.deactivateCtrlBtn(this.elementID)
    }
    this.fetchData.getData()
  }

  error(e){
    if (e.error == "no-speech"){
      this.elements.showInfo("No speech")
    }
    else if (e.error == "audio-capture") {
      this.elements.showInfo("No audio input")
    }
    else if(e.error == "network"){
      this.elements.showInfo("Network Error")
    }
    if(!this.running)
        this.elements.deactivateCtrlBtn(this.elementID)
  }

  instance(){
    return this.recognition
  }

  start(elementID){
    this.elementID = elementID
    this.search.value = ""


    if(!this.available){
      this.elements.showInfo("Speech to text not supported")
      return false
    }

    if(!this.running){
      this.recognition.start()
      this.running = true
    }
    else {
      this.recognition.stop()
      this.running = false
    }

    // this.running = !this.running
    return true
  }

  support(){
    return this.available
  }

  textFromSpeech(e){
    this.search.value = ""
    
    const transcript = Array.from(e.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join("")

    if(!this.texttoSpeech.pause){
      this.search.value = transcript
    }

  }
}



