import { COLOR_DARK, COLOR_LIGHT } from "./util/Color.js"
import { DarkData, LocalData } from "./util/parsingData.js"
const LOCAL_DARK_KEY = 'user-color-scheme'

// darkmode, btn 나누기
const DarkModeBtn = class {

  constructor({$target}){
    this.$target = $target
    this.$darkBtn = undefined
    this.$btnState = undefined
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
    this.render()
  }
  onClick() {
    this.$darkBtn.addEventListener("click", ()=> {
      this.convertToggle()
      this.setButtonLabel()
      this.render()
    })
  }
  convertToggle(){
    const setBtnState = this.$btnState=== COLOR_DARK ? COLOR_LIGHT : COLOR_DARK
    this.$btnState = setBtnState 
    LocalData.setData(this.$btnState)
  }
  setButtonLabel() { 
    if(this.$btnState === COLOR_DARK) {
      this.$darkBtn.innerText ='🌕'
      return ;
    }
    this.$darkBtn.innerText =  '🌑'
  }
  render(){
    if(this.$btnState===COLOR_DARK) {
      document.documentElement.setAttribute('data-user-color-scheme', COLOR_DARK)
      return ;
    }
    document.documentElement.setAttribute('data-user-color-scheme', COLOR_LIGHT)
  }
}

export default DarkModeBtn