import {IMAGE_PATH_PREFIX} from '../consts/API.js'

export default function ImageView({$app, initialState}) {
  this.state = initialState
  this.$target = document.createElement('div')
  this.$target.className = 'Modal ImageViewer'

  $app.appendChild(this.$target)

  this.setState = (nextState) => {
    console.log(nextState, "imageViewer")
    this.state = nextState
    this.render()
  }
  this.render = () => {
    this.$target.innerHTML = `<div class="content">${this.state ? `<img src="${IMAGE_PATH_PREFIX}${this.state}">`: ""}</div>`
    this.$target.style.display = this.state ? 'block' : 'none'
  }
  this.render()
}