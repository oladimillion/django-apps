import Elements from "./Elements"
import Filter from "./Filter"
import FetchData from "./FetchData"
import TexttoSpeech from "./TexttoSpeech"
import SpeechtoText from "./SpeechtoText"

const sendButton = document.getElementById("send")
const search = document.getElementById("search")
const chatScroll = document.getElementById("chat-scroll")
const mic = document.getElementById("mic")
const speaker = document.getElementById("speaker")
const info = document.getElementById("info")


const elements = new Elements(chatScroll, info)
const filter = new Filter(elements)
const fetchData = new FetchData(filter, search)

const synth = window.speechSynthesis
const speechSynth = window.SpeechSynthesisUtterance
const texttoSpeech = new TexttoSpeech(synth, speechSynth, elements)

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
  elements.toggleCtrlBtn(this, speechtoText)
})

speaker.addEventListener("click", function (e){ 
  elements.toggleCtrlBtn(this, texttoSpeech)
})



