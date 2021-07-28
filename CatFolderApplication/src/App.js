import Nodes from "./components/Nodes.js"
import { request } from "./api/api.js"
import Breadcrumb from "./components/Breadcrumb.js"

const $app = document.querySelector(".app")

export default function App($app) {
  this.state = {
    isRoot: false,
    nodes: [],
    depth: []
  }
  const breadcrumb = new Breadcrumb({
    $app,
    initialState: this.state.depth
  })
  const nodes = new Nodes({
    $app,
    initialState: {
      isRoot: this.state.isRoot,
      nodes: this.state.nodes
    }
  })
  this.setState = nextState => {
    this.state = nextState
    breadcrumb.setState(this.state.depth)
    nodes.setState({
      isRoot: this.state.isRoot,
      nodes: this.state.nodes
    })
  }
  const init = async () => {
    try{
      const rootNodes = await request()
      this.setState({
        ...this.state,
        isRoot: true,
        nodes: rootNodes
      })
    } catch(e) {

    }
  }
  init()
}