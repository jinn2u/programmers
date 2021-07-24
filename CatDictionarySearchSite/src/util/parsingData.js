const LOCAL_DARK_KEY = 'user-color-scheme'

export const DarkData = class{
  constructor(){
    this.isDark = false
    this.findDark()
  }
  getBrowserData(){
    const data = this._getData()
    return data
  }
  _getData(){
    throw "_getData must override"
  }
  static setData(){
    throw "_setData must override"
  }
  findDark(){
    this.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light"
  }
}
export const LocalData = class extends DarkData{
  constructor(key){
    super()
    this._data = key
  }
  _getData(){
    const value = localStorage.getItem(this._data)
    if(!value) {
      this.findDark()
      LocalData.setData(this.isDark)
      return this.isDark
    } 
    else return JSON.parse(value)
  }
  static setData(value=this.isDark){
    localStorage.setItem(LOCAL_DARK_KEY,JSON.stringify(value))
  }
}