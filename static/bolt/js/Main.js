
const sendButton = document.getElementById("send")
const search = document.getElementById("search")
const chatScroll = document.getElementById("chat-scroll")
const mic = document.getElementById("mic")
const speaker = document.getElementById("speaker")
const info = document.getElementById("info")


const element = new Element(chatScroll, info)
const filter = new Filter(element)
const fetchData = new FetchData(filter, search)

const synth = window.speechSynthesis
const speechSynth = window.SpeechSynthesisUtterance
const texttoSpeech = new TexttoSpeech(synth, speechSynth, element)

const SpeechRecognition = window.SpeechRecognition
  || window.webkitSpeechRecognition;
const speechtoText = new SpeechtoText(
                      SpeechRecognition, 
                      fetchData, texttoSpeech)


filter.addProperties(speechtoText, texttoSpeech, mic)


window.addEventListener("load", (e) => {  
  fetchData.welcomeMsg()
  search.focus()
})


function setValue(e){
  search.value = e.target.value
}

search.addEventListener("change", setValue)
search.addEventListener("focus", setValue)

search.addEventListener("keyup", (e) => {
  if(e.keyCode == 13)
    fetchData.getData()
})

sendButton.addEventListener("click", (e) =>{ 
  fetchData.getData()
})

mic.addEventListener("click", function (e) { 
  element.toggleCtrlBtn(this, speechtoText)
})

speaker.addEventListener("click", function (e){ 
  element.toggleCtrlBtn(this, texttoSpeech)
})



