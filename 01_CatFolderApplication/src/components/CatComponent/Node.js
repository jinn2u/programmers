import Component from "../component.js";
import ImageViewer from "./ImageViewer.js";

export default class Node extends Component {
  state;
  constructor(...rest) {
    super(...rest);
    this.render();
  }

  template() {
    const { data, depth } = this.props;
    return `
    ${
      depth.length > 1
        ? `<div class="Node">
          <img src='./assets/prev.png'>
        </div>`
        : ""
    }
    ${data
      .map(
        (el) => `
        <div class="Node" data-id="${el.id}">
          <img src="./assets/${el.type.toLowerCase()}.png">
          <div>${el.name}</div>
        </div>
      `,
      )
      .join("")}
      <div class="Modal ImageViewer">
      </div>
      `;
  }

  render() {
    this.$target.innerHTML = this.template();
    this.mount();
  }

  mount() {
    const { handleClick: handleNodeClick } = this.props;

    document.querySelectorAll(".Node").forEach((el) =>
      el.addEventListener("click", (e) => {
        handleNodeClick(e.currentTarget.dataset.id, document.querySelector(".ImageViewer"), this.$target);
      }),
    );
  }
}
