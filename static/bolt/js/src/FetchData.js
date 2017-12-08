
export default class FetchData{
// class FetchData{

  constructor(filter, search){
    this.filter = filter
    this.search = search
    this.elements = this.filter.elements

    this.json = this.json.bind(this)
    this.status = this.status.bind(this)
    this.debug = this.debug.bind(this)

    this.getData = this.getData.bind(this)
    this.wikiSearch = this.wikiSearch.bind(this)
    this.welcomeMsg = this.welcomeMsg.bind(this)
    this.showReponseData = this.showReponseData.bind(this)
    this.showErrorInfo = this.showErrorInfo.bind(this)
    this.boltMsg = this.boltMsg.bind(this)
    
  }

  debug(data){
    console.log(data)
    return data
  }

  welcomeMsg(){
    fetch("/bolt/api/welcome/")
      .then(this.status)
      .then(this.json)
      .then(this.showReponseData)
      .catch(this.showErrorInfo)
  }

  wikiSearch(data){
    let _search = encodeURIComponent(data)
    let url = `https://en.wikipedia.org/w/api.php?
      origin=*&action=opensearch&search=${_search}`


    fetch(url)
      .then(this.status)
      .then(this.json)
      .then(this.showReponseData)
      .catch(this.showErrorInfo)
  }

  showErrorInfo(data){
    this.elements.showInfo("Network Error")
  }

  showReponseData(data){
    let _data = data

    if(typeof _data == "object" && !Array.isArray(_data))
      _data = _data.msg

    let {msg, say} = this.filter.result(_data)
    this.boltMsg(msg, say)

        return data
  }

  boltMsg(msg, say){
    this.filter.texttoSpeech.speak(say)
    this.elements.elementAppendChild("bolt", msg)
    this.search.value = ""
  }

  getData(){

    const data = this.search.value

    if(!data){
      return
    }

    this.elements.elementAppendChild("self", data)

    if(this.filter.multipleChoice) {
      const {msg, say, multipleChoice} = this.filter.checkValidInput(data)
      this.boltMsg(msg, say)
      this.filter.multipleChoice = multipleChoice
      return
    }

    this.wikiSearch(data)

  }

  json(res){
    return res.json()
  }

  status(res){
    if(res.status >= 200 && res.status < 300){
      return Promise.resolve(res)
    }
    else {
      return Promise.reject(res.statusText)
    }
  }
}


