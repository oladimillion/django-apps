
class Filter {

  constructor(chatScroll, element){
    this.multipleChoice = false
    this.dataArray = []
    this.element = element
  }

  checkValidInput(data){

    const element = this.element;

    if(data == "done"){

      const info = "operation aborted"
      this.multipleChoice = false
      element.elementAppendChild("bolt", info);

      return
    }

    data = Number(data)

    if(
      String(data) == String(NaN)
      || data > this.dataArray.length
      || data <= 0){
      
      const error = `You entered invalid option.
        \nTry again or\nEnter "done" to abort`

      element.elementAppendChild("bolt", error);
      return
    }
    
    element.elementAppendChild("bolt", this.dataArray[data - 1]);
    this.multipleChoice = false
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

    if( data.indexOf(error1) != -1
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
      return data;
    }

    if(!data[1].length 
      || data[1].length == 1 && data[2][0] == ""
      || data[1].length == 1 && this.hasInvalidData(data[2][0])
    )
      return "\"" + data[0] + "\" not found"
    else if(data[1].length == 1 
      && data[2][0] != "" 
      && !this.hasInvalidData(data[2][0])){
      return data[2][0]
    }
    else{
      data = this.removeInvalidResult(data)
      
      if(data[1].length == 1){
        return data[2][0]
      }

      return "choose one of the options: " + this.createOptions(data);
    }
  }
}

