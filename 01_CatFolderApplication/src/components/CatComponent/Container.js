import Component from "../component.js";
import request from "../../util/api.js";
import Breadcrumb from "./Breadcrumb.js";
import Node from "./Node.js";
import { TYPE } from "../../util/constant.js";
import ImageViewer from "./ImageViewer.js";
import Loading from "../Loading.js";
class Container extends Component {
  state;
  constructor(...rest) {
    super(...rest);
    this.state = { catData: [], depth: [{ depth: "root", nodeId: "" }], isLoading: false };
    this.initialState();
  }
  async initialState() {
    const changedData = await this.init();
    this.state.catData = changedData;
    this.state.isLoading = false;
    this.render();
  }

  template() {
    return `
      <nav class="Breadcrumb"></nav>
      <div class="Nodes">
      </div>
      <div class="Loading">
      </div>
    `;
  }

  render() {
    this.$target.innerHTML = this.template();

    new Breadcrumb(document.querySelector(".Breadcrumb"), { depth: this.state.depth });

    new Node(document.querySelector(".Nodes"), {
      depth: this.state.depth.map((el) => el.depth),
      data: this.state.catData,
      handleClick: this.handleNodeClick.bind(this),
    });
    new Loading(document.querySelector(".Loading"));
    this.mount();
  }

  async handleNodeClick(id, viewerTarget) {
    const clickData = this.state.catData.find((el) => el.id === id);
    if (!clickData?.type) {
      const nextState = { ...this.state };
      nextState.depth.pop();
      const prevNodeId = nextState.depth[nextState.depth.length - 1].nodeId;
      const changedData = await this.init(prevNodeId);
      this.setState({ ...this.state, depth: nextState.depth, catData: changedData, isLoading: false });
    } else if (clickData.type === TYPE.FILE) {
      new ImageViewer(viewerTarget, { filePath: clickData.filePath });
      const viewer = document.querySelector(".ImageViewer");
      viewer.style.display = "block";
      const removeModalEvent = (e) => {
        if (e.target.tagName !== TYPE.IMG) {
          if (viewer.className.split(" ").length > 1) {
            viewer.style.display = "none";
          }
        }
      };
      // 파일을 누를 때마다 이벤트가 바인딩되는 문제가 있다.
      window.addEventListener("click", (e) => removeModalEvent(e));
    } else if (clickData.type === TYPE.DIRECTORY) {
      document.querySelector(".Loading").style.display = "block";
      this.setState({ ...this.state, isLoading: true });
      const changedData = await this.init(id);
      this.setState({
        ...this.state,
        depth: [...this.state.depth, { depth: clickData.name, nodeId: id }],
        catData: changedData,
        isLoading: false,
      });
    }
  }

  async init(id = "") {
    this.setState({ ...this.state, isLoading: true });
    try {
      return request(id);
    } catch (e) {
      alert(e.message);
    }
  }
  mount() {
    const Loading = document.querySelector(".Loading");
    const bradcrumb = document.querySelector(".Breadcrumb");
    if (this.state.isLoading) {
      Loading.style.display = "block";
    } else {
      Loading.style.display = "none";
    }
    bradcrumb.addEventListener("click", async (e) => {
      const changeId = e.target.closest("div").dataset.id;
      if (changeId === this.state.depth[this.state.depth.length - 1].nodeId) {
        return;
      }
      const idx = this.state.depth.findIndex((el) => el.nodeId === changeId);
      const depth = this.state.depth.slice(0, idx + 1);
      const changedData = await this.init(changeId);
      this.setState({ ...this.state, depth, catData: changedData, isLoading: false });
    });
  }
}

const CatContainer = Container;
export default CatContainer;
