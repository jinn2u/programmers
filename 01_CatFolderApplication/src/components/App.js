import CatContainer from "./CatComponent/Container.js";
import Component from "./component.js";

export default class App extends Component {
  constructor(...rest) {
    super(...rest);

    this.render();
  }

  template() {
    return `
      <h1>고양이 사진첩</h1>
      <main class="App">
      </main>
    `;
  }

  render() {
    this.$target.innerHTML = this.template();
    new CatContainer(document.querySelector(".App"));
  }
}
