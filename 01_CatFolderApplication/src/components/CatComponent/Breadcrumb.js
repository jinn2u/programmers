import Component from "../component.js";

export default class Breadcrumb extends Component {
  state;
  constructor(...rest) {
    super(...rest);
    this.render();
  }

  template() {
    const { depth } = this.props;
    return depth.map((el) => `<div data-id=${el.nodeId}>${el.depth}</div>`).join("");
  }
}
