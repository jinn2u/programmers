import { DarkData, LocalData } from "./util/parsingData.js"
const LOCAL_DARK_KEY = 'user-color-scheme'

const DarkModeBtn = class {

  constructor({$target}){
    this.$target = $target
    this.$darkBtn = ""
    this.$btnState = ""
    this._createDarkModeBtn()
    this.prevLoad()
    this.onClick()
  }
  _createDarkModeBtn() {
    const darkmodeBtn = document.createElement('span')
    darkmodeBtn.className = 'darkmode-btn'
    darkmodeBtn.innerText = '🌕'
    this.$darkBtn = darkmodeBtn
    this.$target.appendChild(darkmodeBtn)
  }
  prevLoad() {
    const data = new LocalData(LOCAL_DARK_KEY)
    if(!data instanceof DarkData) throw "invalid data type"
    
    this.$btnState = data.getBrowserData()
    this.setButtonLabel()
  }
  onClick() {
    this.$darkBtn.addEventListener("click", ()=> {
      this.toggleSetting()
      this.setButtonLabel()
      this.render()
    })
  }
  toggleSetting(){
    const setBtnState = this.$btnState==="dark" ? "light" : "dark"
      this.$btnState = setBtnState 
      LocalData.setData(this.$btnState)
  }
  setButtonLabel() { 
    this.$darkBtn.innerText = this.$btnState === 'dark' ? '🌕' : '🌑';
  }
  render(){
    if(this.$btnState==="dark") {
      document.documentElement.setAttribute('data-user-color-scheme', "dark");
    } else {
      document.documentElement.setAttribute('data-user-color-scheme', "light");
    }
  }
}

export default DarkModeBtn