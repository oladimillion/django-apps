
class SpeechtoText{

  constructor(SpeechRecognition, element, fetchData, search){
    this.element = element
    this.fetchData = fetchData
    this.search = search
    this.error = this.error.bind(this);
    this.end = this.end.bind(this);
    this.elementID = undefined
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
    this.fetchData.getData()
    if(this.elementID)
      this.element.deactivateCtrlBtn(this.elementID)
    this.running = false
  }

  error(e){
    if(e.error.indexOf("network") != -1){
      this.element.showInfo("Network Error")
      if(this.elementID)
        this.element.deactivateCtrlBtn(this.elementID)
      this.running = false
    }
  }

  instance(){
    return this.recognition
  }

  start(elementID){

    this.elementID = elementID

    if(!this.available){
      this.element.showInfo("Speech to text not supported")
      return false
    }

    if(!this.running){
      this.recognition.start()
      this.running = true
    }

    return true
  }

  support(){
    return this.available
  }

  textFromSpeech(e){
    const transcript = Array.from(e.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join("");

    console.log(transcript)

    this.search.value = transcript
  }

}



