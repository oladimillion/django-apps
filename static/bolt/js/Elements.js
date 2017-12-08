
export default class Elements {

  constructor(parentElement, info){
    this.parentElement = parentElement
    this.info = info
    this.timerID = undefined

    this.showInfo = this.showInfo.bind(this)
    this.hideInfo = this.hideInfo.bind(this)
    this.getClassProperties = this.getClassProperties.bind(this)
    this.activateCtrlBtn = this.activateCtrlBtn.bind(this)
    this.deactivateCtrlBtn = this.deactivateCtrlBtn.bind(this)

  }

  createChildElement(className, content){

    const div = document.createElement("div")
    const contentSpan = document.createElement("span") 
    const timeSpan = document.createElement("span") 
    const textNode = document.createTextNode(content)
    const time = document.createTextNode(
                new Date(Date.now()).toLocaleTimeString("en-US", 
                  {hour: "numeric", minute: "numeric", hour12: true})
                )


    div.className = "chat " + className
    contentSpan.className = "content" 
    timeSpan.className = "time" 

    contentSpan.appendChild(textNode)
    timeSpan.appendChild(time)

    div.appendChild(contentSpan)
    div.appendChild(timeSpan)

    return div
  }

  elementAppendChild(type, content){
    const child = this.createChildElement(type, content)
    this.parentElement.appendChild(child)
    this.parentElement.scrollTop = this.parentElement.scrollHeight
  }

  getClassProperties(elementID){
    return elementID.className
  }

  showInfo(content){
    if(this.timerID){
      clearTimeout(this.timerID)
      this.timerID = undefined
    }

    this.info.innerHTML = content
    this.info.className = "info show"

    this.timerID = setTimeout(this.hideInfo, 4000)
  }

  hideInfo(){
    this.info.className = "info hide"
  }

  activateCtrlBtn(elementID){
    elementID.className = this.getClassProperties(elementID) + " active"
  }

  deactivateCtrlBtn(elementID){
    const re = /active/gi
    let className = this.getClassProperties(elementID)
    className = className.replace(re, "")
    elementID.className = className
  }

  toggleCtrlBtn(elementID, speedFunctionality){

    if(!speedFunctionality.start(elementID)){
      return false
    }

    const className = this.getClassProperties(elementID)
    if (className.indexOf("active") != -1){
      this.deactivateCtrlBtn(elementID)
    }
    else {
      this.activateCtrlBtn(elementID)
    }
  }

}


