
class Filter {

  constructor(element){
    this.multipleChoice = false
    this.dataArray = []
    this.element = element
    this.speechtoText = undefined
    this.texttoSpeech = undefined
    this.mic = undefined
    this.timerID = undefined

    this.addProperties = this.addProperties.bind(this)
    this.result = this.result.bind(this)
    this.checkValidInput = this.checkValidInput.bind(this)
    this.startVoiceCmd = this.startVoiceCmd.bind(this)
  }

  addProperties(speechtoText, texttoSpeech, mic){
    this.speechtoText = speechtoText
    this.texttoSpeech = texttoSpeech
    this.mic = mic
  }

  checkValidInput(data){

    if(data == "quit"){
      const info = "operation aborted"
      const output = {msg: info, say: "Goodbye.", multipleChoice: false}
      return output
    }

    data = Number(data)

    if(
      String(data) == String(NaN)
      || data > this.dataArray.length
      || data <= 0){
      

      if(this.timerID){
        clearTimeout(this.timerID)
        this.timerID = undefined
      }

      // activate speech to text and mic button
      // this.timerID = setTimeout(this.startVoiceCmd, 40)

      const info = `You entered invalid option.
        \nTry again or\nEnter "quit" to abort`
      const output = {
        msg: info, 
        say: "Invalid choice, try again",
        multipleChoice: true
      }
      return output
    }

    const info = this.dataArray[data - 1]
    const output = {
      msg: info, 
      say: info,
      multipleChoice: false
    }
    return output
  }

  createOptions(data){

    let choice = "";
    let _data = data[1]

    this.multipleChoice = true
    this.dataArray = data[2]

    for (let i = 0; i < _data.length; i++)
      choice += ` \n [${i + 1}] => ${_data[i]} `

    return choice
  }

  hasInvalidData(data){

    const error1 = "From an alternative name:"
    const error2 = "From a misspelling:"
    const error3 = "From a page move:"
    const error4 = "From an alternative name:"
    const error5 = "Something may refer to:"
    const error6 = "From an initialism:"

    const re = /^(.*:)$/gmi

    if( re.test(data) 
        || data.indexOf(error1) != -1
        || data.indexOf(error2) != -1
        || data.indexOf(error3) != -1
        || data.indexOf(error4) != -1
        || data.indexOf(error5) != -1
        || data.indexOf(error6) != -1
        || data == ""){

      return true
    }
    else 
      return false
  }

  removeInvalidResult(data){

    const title = data[0]
    const keyArray = data[1]
    const valueArray = data[2]

    let newKeyArray = [];
    let newValueArray = []

    let length = valueArray.length;

    for (let i = 0; i < length; i++){
      if(this.hasInvalidData(valueArray[i])){
        continue
      }
      else {
        newKeyArray.push(keyArray[i])
        newValueArray.push(valueArray[i])
      }
    }

    return [title, newKeyArray, newValueArray]
  }

  result(data){

    if(!Array.isArray(data)){
      const output = {msg: data, say: data}
      return output;
    }

    if(!data[1].length 
      || data[1].length == 1 && data[2][0] == ""
      || data[1].length == 1 && this.hasInvalidData(data[2][0])
    ){
      const output = {
        msg: "\"" + data[0] + "\" not found", 
        say: "Please narrow your search"
      }
      return output;
    }
    else if(data[1].length == 1 
      && data[2][0] != "" 
      && !this.hasInvalidData(data[2][0])){
      const output = {
        msg: data[2][0], 
        say: data[2][0]
      }
      return output;
    }
    else{
      data = this.removeInvalidResult(data)
      if(data[1].length == 1){
        const output = {
          msg: data[2][0], 
          say: data[2][0]
        }
        return output;      
      } else if(!data[1].length){
        const output = {
          msg: "\"" + data[0] + "\" not found", 
          say: "Please narrow your search"
        }
        return output;
      }

      // activate speech to text and mic button
      // this.startVoiceCmd()

      const output = {
        msg: "Choose from the options: " + this.createOptions(data), 
        say: "choose from the options"
      }
      return output;
    }
  }

  startVoiceCmd(){
      this.speechtoText.start(this.mic)
      this.element.activateCtrlBtn(this.mic);
  }
}

