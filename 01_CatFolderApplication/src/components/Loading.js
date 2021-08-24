import Component from "./component.js";

export default class Loading extends Component {
  state;
  constructor(...rest) {
    super(...rest);
    this.render();
  }

  template() {
    return `
      <div class="content"> 
        <img src="./assets/nyan-cat.gif">
      </div>
    `;
  }
}
