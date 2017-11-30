
class FetchData{

  constructor(element, filter, search){
    this.element = element
    this.filter = filter
    this.search = search

    this.getData = this.getData.bind(this)
    this.wikiSearch = this.wikiSearch.bind(this)
    this.welcomeMsg = this.welcomeMsg.bind(this)
    this.showReponseData = this.showReponseData.bind(this)
    this.showErrorInfo = this.showErrorInfo.bind(this)
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
      origin=*&action=opensearch&search=${_search}&limit=20`;


    fetch(url)
      .then(this.status)
      .then(this.json)
      .then(this.showReponseData)
      .catch(this.showErrorInfo)
  }

  showErrorInfo(data){
    this.element.showInfo("Network Error")
  }

  showReponseData(data){

    if(typeof data == "object" && !Array.isArray(data))
      data = data.msg


    this.element.elementAppendChild("bolt", this.filter.result(data));
    this.search.value = ""
    return data; 
  }

  getData(){

    const data = this.search.value

    if(!data){
      return
    }

    this.element.elementAppendChild("self", data);

    if(this.filter.multipleChoice) {
      this.filter.checkValidInput(data)
      this.search.value = ""
      return
    }

    this.wikiSearch(data);

  }

  json(res){
    return res.json();
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


