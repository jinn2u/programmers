import Component from "../component.js";
import { IMAGE_VIEWER } from "../../util/constant.js";
export default class ImageViewer extends Component {
  state;
  constructor(...rest) {
    super(...rest);
    this.render();
  }

  template() {
    const { filePath } = this.props;
    return `
      
        <div class="content" >
          <img src="${IMAGE_VIEWER}${filePath}">
        </div>
      
    `;
  }
}
