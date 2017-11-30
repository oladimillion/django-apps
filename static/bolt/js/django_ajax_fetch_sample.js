
let url = "/bolt/api/post/";

function status(res){
  if(res.status >= 200 && res.status < 300){
    return Promise.resolve(res)
  }
  else {
    return Promise.reject(new Error(res.statusText))
  }
}

function json(res){
  return res.json();
}

function display(data){
  console.log(data)
}


let payload = {name: "oladimeji"};
let data = new FormData()
data.append("post", JSON.stringify(payload));

function post(){
  fetch(url, {
  method: "post",
  body: data
  })
  .then(status)
  .then(json)
  .then(display)
  .catch(display)
}

function onclick(event){
  post();
}

const sendButton = document.getElementById("send");
sendButton.onclick = onclick;
