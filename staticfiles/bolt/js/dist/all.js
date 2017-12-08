(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Elements = function () {
  function Elements(parentElement, info) {
    _classCallCheck(this, Elements);

    this.parentElement = parentElement;
    this.info = info;
    this.timerID = undefined;

    this.showInfo = this.showInfo.bind(this);
    this.hideInfo = this.hideInfo.bind(this);
    this.getClassProperties = this.getClassProperties.bind(this);
    this.activateCtrlBtn = this.activateCtrlBtn.bind(this);
    this.deactivateCtrlBtn = this.deactivateCtrlBtn.bind(this);
  }

  _createClass(Elements, [{
    key: "createChildElement",
    value: function createChildElement(className, content) {

      var div = document.createElement("div");
      var contentSpan = document.createElement("span");
      var timeSpan = document.createElement("span");
      var textNode = document.createTextNode(content);
      var time = document.createTextNode(new Date(Date.now()).toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true }));

      div.className = "chat " + className;
      contentSpan.className = "content";
      timeSpan.className = "time";

      contentSpan.appendChild(textNode);
      timeSpan.appendChild(time);

      div.appendChild(contentSpan);
      div.appendChild(timeSpan);

      return div;
    }
  }, {
    key: "elementAppendChild",
    value: function elementAppendChild(type, content) {
      var child = this.createChildElement(type, content);
      this.parentElement.appendChild(child);
      this.parentElement.scrollTop = this.parentElement.scrollHeight;
    }
  }, {
    key: "getClassProperties",
    value: function getClassProperties(elementID) {
      return elementID.className;
    }
  }, {
    key: "showInfo",
    value: function showInfo(content) {
      if (this.timerID) {
        clearTimeout(this.timerID);
        this.timerID = undefined;
      }

      this.info.innerHTML = content;
      this.info.className = "info show";

      this.timerID = setTimeout(this.hideInfo, 4000);
    }
  }, {
    key: "hideInfo",
    value: function hideInfo() {
      this.info.className = "info hide";
    }
  }, {
    key: "activateCtrlBtn",
    value: function activateCtrlBtn(elementID) {
      elementID.className = this.getClassProperties(elementID) + " active";
    }
  }, {
    key: "deactivateCtrlBtn",
    value: function deactivateCtrlBtn(elementID) {
      var re = /active/gi;
      var className = this.getClassProperties(elementID);
      className = className.replace(re, "");
      elementID.className = className;
    }
  }, {
    key: "toggleCtrlBtn",
    value: function toggleCtrlBtn(elementID, speedFunctionality) {

      if (!speedFunctionality.start(elementID)) {
        return false;
      }

      var className = this.getClassProperties(elementID);
      if (className.indexOf("active") != -1) {
        this.deactivateCtrlBtn(elementID);
      } else {
        this.activateCtrlBtn(elementID);
      }
    }
  }]);

  return Elements;
}();

exports.default = Elements;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FetchData = function () {
  // class FetchData{

  function FetchData(filter, search) {
    _classCallCheck(this, FetchData);

    this.filter = filter;
    this.search = search;
    this.elements = this.filter.elements;

    this.json = this.json.bind(this);
    this.status = this.status.bind(this);
    this.debug = this.debug.bind(this);

    this.getData = this.getData.bind(this);
    this.wikiSearch = this.wikiSearch.bind(this);
    this.welcomeMsg = this.welcomeMsg.bind(this);
    this.showReponseData = this.showReponseData.bind(this);
    this.showErrorInfo = this.showErrorInfo.bind(this);
    this.boltMsg = this.boltMsg.bind(this);
  }

  _createClass(FetchData, [{
    key: "debug",
    value: function debug(data) {
      console.log(data);
      return data;
    }
  }, {
    key: "welcomeMsg",
    value: function welcomeMsg() {
      fetch("/bolt/api/welcome/").then(this.status).then(this.json).then(this.showReponseData).catch(this.showErrorInfo);
    }
  }, {
    key: "wikiSearch",
    value: function wikiSearch(data) {
      var _search = encodeURIComponent(data);
      var url = "https://en.wikipedia.org/w/api.php?\n      origin=*&action=opensearch&search=" + _search;

      fetch(url).then(this.status).then(this.json).then(this.showReponseData).catch(this.showErrorInfo);
    }
  }, {
    key: "showErrorInfo",
    value: function showErrorInfo(data) {
      this.elements.showInfo("Network Error");
    }
  }, {
    key: "showReponseData",
    value: function showReponseData(data) {
      var _data = data;

      if ((typeof _data === "undefined" ? "undefined" : _typeof(_data)) == "object" && !Array.isArray(_data)) _data = _data.msg;

      var _filter$result = this.filter.result(_data),
          msg = _filter$result.msg,
          say = _filter$result.say;

      this.boltMsg(msg, say);

      return data;
    }
  }, {
    key: "boltMsg",
    value: function boltMsg(msg, say) {
      this.filter.texttoSpeech.speak(say);
      this.elements.elementAppendChild("bolt", msg);
      this.search.value = "";
    }
  }, {
    key: "getData",
    value: function getData() {

      var data = this.search.value;

      if (!data) {
        return;
      }

      this.elements.elementAppendChild("self", data);

      if (this.filter.multipleChoice) {
        var _filter$checkValidInp = this.filter.checkValidInput(data),
            msg = _filter$checkValidInp.msg,
            say = _filter$checkValidInp.say,
            multipleChoice = _filter$checkValidInp.multipleChoice;

        this.boltMsg(msg, say);
        this.filter.multipleChoice = multipleChoice;
        return;
      }

      this.wikiSearch(data);
    }
  }, {
    key: "json",
    value: function json(res) {
      return res.json();
    }
  }, {
    key: "status",
    value: function status(res) {
      if (res.status >= 200 && res.status < 300) {
        return Promise.resolve(res);
      } else {
        return Promise.reject(res.statusText);
      }
    }
  }]);

  return FetchData;
}();

exports.default = FetchData;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Filter = function () {
  // class Filter {

  function Filter(elements) {
    _classCallCheck(this, Filter);

    this.multipleChoice = false;
    this.dataArray = [];
    this.elements = elements;
    this.speechtoText = undefined;
    this.texttoSpeech = undefined;
    this.mic = undefined;
    this.timerID = undefined;

    this.addProperties = this.addProperties.bind(this);
    this.result = this.result.bind(this);
    this.checkValidInput = this.checkValidInput.bind(this);
    this.startVoiceCmd = this.startVoiceCmd.bind(this);
  }

  _createClass(Filter, [{
    key: "addProperties",
    value: function addProperties(speechtoText, texttoSpeech, mic) {
      this.speechtoText = speechtoText;
      this.texttoSpeech = texttoSpeech;
      this.mic = mic;
    }
  }, {
    key: "checkValidInput",
    value: function checkValidInput(data) {

      if (data == "quit") {
        var _info = "operation aborted";
        var _output = { msg: _info, say: "Goodbye.", multipleChoice: false };
        return _output;
      }

      data = Number(data);

      if (String(data) == String(NaN) || data > this.dataArray.length || data <= 0) {

        if (this.timerID) {
          clearTimeout(this.timerID);
          this.timerID = undefined;
        }

        // activate speech to text and mic button
        // this.timerID = setTimeout(this.startVoiceCmd, 40)

        var _info2 = "You entered invalid option.\n        \nTry again or\nEnter \"quit\" to abort";
        var _output2 = {
          msg: _info2,
          say: "Invalid choice, try again",
          multipleChoice: true
        };
        return _output2;
      }

      var info = this.dataArray[data - 1];
      var output = {
        msg: info,
        say: info,
        multipleChoice: false
      };
      return output;
    }
  }, {
    key: "createOptions",
    value: function createOptions(data) {

      var choice = "";
      var _data = data[1];

      this.multipleChoice = true;
      this.dataArray = data[2];

      for (var i = 0; i < _data.length; i++) {
        choice += " \n [" + (i + 1) + "] => " + _data[i] + " ";
      }return choice;
    }
  }, {
    key: "hasInvalidData",
    value: function hasInvalidData(data) {

      var error1 = "From an alternative name:";
      var error2 = "From a misspelling:";
      var error3 = "From a page move:";
      var error4 = "From an alternative name:";
      var error5 = "Something may refer to:";
      var error6 = "From an initialism:";

      var re = /^(.*:)$/gmi;

      if (re.test(data) || data.indexOf(error1) != -1 || data.indexOf(error2) != -1 || data.indexOf(error3) != -1 || data.indexOf(error4) != -1 || data.indexOf(error5) != -1 || data.indexOf(error6) != -1 || data == "") {

        return true;
      } else return false;
    }
  }, {
    key: "removeInvalidResult",
    value: function removeInvalidResult(data) {

      var title = data[0];
      var keyArray = data[1];
      var valueArray = data[2];

      var newKeyArray = [];
      var newValueArray = [];

      var length = valueArray.length;

      for (var i = 0; i < length; i++) {
        if (this.hasInvalidData(valueArray[i])) {
          continue;
        } else {
          newKeyArray.push(keyArray[i]);
          newValueArray.push(valueArray[i]);
        }
      }

      return [title, newKeyArray, newValueArray];
    }
  }, {
    key: "result",
    value: function result(data) {

      if (!Array.isArray(data)) {
        var output = { msg: data, say: data };
        return output;
      }

      if (!data[1].length || data[1].length == 1 && data[2][0] == "" || data[1].length == 1 && this.hasInvalidData(data[2][0])) {
        var _output3 = {
          msg: "\"" + data[0] + "\" not found",
          say: "Please narrow your search"
        };
        return _output3;
      } else if (data[1].length == 1 && data[2][0] != "" && !this.hasInvalidData(data[2][0])) {
        var _output4 = {
          msg: data[2][0],
          say: data[2][0]
        };
        return _output4;
      } else {
        data = this.removeInvalidResult(data);
        if (data[1].length == 1) {
          var _output6 = {
            msg: data[2][0],
            say: data[2][0]
          };
          return _output6;
        } else if (!data[1].length) {
          var _output7 = {
            msg: "\"" + data[0] + "\" not found",
            say: "Please narrow your search"
          };
          return _output7;
        }

        // activate speech to text and mic button
        // this.startVoiceCmd()

        var _output5 = {
          msg: "Choose from the options: " + this.createOptions(data),
          say: "choose from the options"
        };
        return _output5;
      }
    }
  }, {
    key: "startVoiceCmd",
    value: function startVoiceCmd() {
      this.speechtoText.start(this.mic);
      this.elements.activateCtrlBtn(this.mic);
    }
  }]);

  return Filter;
}();

exports.default = Filter;

},{}],4:[function(require,module,exports){
"use strict";

var _Elements = require("./Elements");

var _Elements2 = _interopRequireDefault(_Elements);

var _Filter = require("./Filter");

var _Filter2 = _interopRequireDefault(_Filter);

var _FetchData = require("./FetchData");

var _FetchData2 = _interopRequireDefault(_FetchData);

var _TexttoSpeech = require("./TexttoSpeech");

var _TexttoSpeech2 = _interopRequireDefault(_TexttoSpeech);

var _SpeechtoText = require("./SpeechtoText");

var _SpeechtoText2 = _interopRequireDefault(_SpeechtoText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sendButton = document.getElementById("send");
var search = document.getElementById("search");
var chatScroll = document.getElementById("chat-scroll");
var mic = document.getElementById("mic");
var speaker = document.getElementById("speaker");
var info = document.getElementById("info");

var elements = new _Elements2.default(chatScroll, info);
var filter = new _Filter2.default(elements);
var fetchData = new _FetchData2.default(filter, search);

var synth = window.speechSynthesis;
var speechSynth = window.SpeechSynthesisUtterance;
var texttoSpeech = new _TexttoSpeech2.default(synth, speechSynth, elements);

var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
var speechtoText = new _SpeechtoText2.default(SpeechRecognition, fetchData, texttoSpeech);

filter.addProperties(speechtoText, texttoSpeech, mic);

window.addEventListener("load", function (e) {
  fetchData.welcomeMsg();
  search.focus();
});

function setValue(e) {
  search.value = e.target.value;
}

search.addEventListener("change", setValue);
search.addEventListener("focus", setValue);

search.addEventListener("keyup", function (e) {
  if (e.keyCode == 13) fetchData.getData();
});

sendButton.addEventListener("click", function (e) {
  fetchData.getData();
});

mic.addEventListener("click", function (e) {
  elements.toggleCtrlBtn(this, speechtoText);
});

speaker.addEventListener("click", function (e) {
  elements.toggleCtrlBtn(this, texttoSpeech);
});

},{"./Elements":1,"./FetchData":2,"./Filter":3,"./SpeechtoText":5,"./TexttoSpeech":6}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SpeechtoText = function () {
  // class SpeechtoText{

  function SpeechtoText(SpeechRecognition, fetchData, texttoSpeech) {
    _classCallCheck(this, SpeechtoText);

    this.fetchData = fetchData;
    this.elements = this.fetchData.elements;
    this.search = this.fetchData.search;
    this.elementID = undefined;
    this.running = false;
    this.temp = false;
    this.texttoSpeech = texttoSpeech;

    this.error = this.error.bind(this);
    this.end = this.end.bind(this);
    this.start = this.start.bind(this);
    this.textFromSpeech = this.textFromSpeech.bind(this);

    if (SpeechRecognition) {
      this.initilize(SpeechRecognition);
      this.available = true;
    } else {
      this.available = false;
    }
  }

  _createClass(SpeechtoText, [{
    key: "initilize",
    value: function initilize(SpeechRecognition) {
      this.recognition = new SpeechRecognition();

      this.recognition.interimResults = true;
      this.recognition.lang = "en-US";
      this.recognition.onresult = this.textFromSpeech;
      this.recognition.onend = this.end;
      this.recognition.onerror = this.error;
    }
  }, {
    key: "end",
    value: function end() {
      if (this.running) {
        this.recognition.start();
      } else {
        this.elements.deactivateCtrlBtn(this.elementID);
      }
      this.fetchData.getData();
    }
  }, {
    key: "error",
    value: function error(e) {
      if (e.error == "no-speech") {
        this.elements.showInfo("No speech");
      } else if (e.error == "audio-capture") {
        this.elements.showInfo("No audio input");
      } else if (e.error == "network") {
        this.elements.showInfo("Network Error");
      }
      if (!this.running) this.elements.deactivateCtrlBtn(this.elementID);
    }
  }, {
    key: "instance",
    value: function instance() {
      return this.recognition;
    }
  }, {
    key: "start",
    value: function start(elementID) {
      this.elementID = elementID;
      this.search.value = "";

      if (!this.available) {
        this.elements.showInfo("Speech to text not supported");
        return false;
      }

      if (!this.running) {
        this.recognition.start();
        this.running = true;
      } else {
        this.recognition.stop();
        this.running = false;
      }

      // this.running = !this.running
      return true;
    }
  }, {
    key: "support",
    value: function support() {
      return this.available;
    }
  }, {
    key: "textFromSpeech",
    value: function textFromSpeech(e) {
      this.search.value = "";

      var transcript = Array.from(e.results).map(function (result) {
        return result[0];
      }).map(function (result) {
        return result.transcript;
      }).join("");

      if (!this.texttoSpeech.pause) {
        this.search.value = transcript;
      }
    }
  }]);

  return SpeechtoText;
}();

exports.default = SpeechtoText;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TexttoSpeech = function () {
  // class TexttoSpeech{
  function TexttoSpeech(synth, speechSynth, elements) {
    _classCallCheck(this, TexttoSpeech);

    this.synth = synth;
    this.speechSynth = speechSynth;
    this.elements = elements;

    this.running = false;
    this.pause = false;
    this.utterThis = undefined;
    this.timerID = undefined;

    this.start = this.start.bind(this);
    this.speak = this.speak.bind(this);
    this.ispaused = this.ispaused.bind(this);

    if (synth) this.available = true;else this.available = false;
  }

  _createClass(TexttoSpeech, [{
    key: "speak",
    value: function speak(text) {
      var _this = this;

      if (!this.running) {
        return;
      }

      this.pause = true;

      var SpeechSynthesisUtterance = this.speechSynth;
      var voices = this.synth.getVoices();
      this.utterThis = new SpeechSynthesisUtterance(text);
      this.utterThis.voice = !!voices.length ? voices[0] : undefined;
      this.synth.speak(this.utterThis);

      this.utterThis.onend = function (e) {
        clearTimeout(_this.timerID);
        _this.timerID = undefined;
        _this.timerID = setTimeout(function () {
          return _this.pause = false;
        }, 10);
      };
    }
  }, {
    key: "ispaused",
    value: function ispaused() {
      return this.pause;
    }
  }, {
    key: "start",
    value: function start(elementID) {

      if (!this.available) {
        this.elements.showInfo("Text to speech not supported");
        return false;
      }

      this.running = !this.running;

      return true;
    }
  }]);

  return TexttoSpeech;
}();

exports.default = TexttoSpeech;

},{}]},{},[4]);
