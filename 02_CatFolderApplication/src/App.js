import Nodes from "./components/Nodes.js"
import { request } from "./api/api.js"
import Breadcrumb from "./components/Breadcrumb.js"
import ImageView from "./components/ImageView.js"

const $app = document.querySelector(".app")

export default function App($app) {
  this.state = {
    isRoot: false,
    nodes: [],
    depth: [],
    selectedFilePath: ""
  }
  const imageView = new ImageView({
    $app,
    initialState: ""
  })
  const breadcrumb = new Breadcrumb({
    $app,
    initialState: this.state.depth
  })
  const nodes = new Nodes({
    $app,
    initialState: {
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    },
    onClick: async (node) => {
      try {
        if (node.type ==='DIRECTORY') {
          const nextNodes = await request(node.id)
          console.log(nextNodes)
          this.setState({
            ...this.state,
            isRoot: false,
            depth: [...this.state.depth, node],
            nodes: nextNodes
          })
        } else if (node.type === 'FILE') {
          console.log("yess",node.filePath)
          this.setState({
            ...this.state,
            selectedFilePath: node.filePath
          })
          imageView.setState(this.state.selectedFilePath)
        }
      } catch (e) {
        throw "file or directory is invalid"
      }
    },
    onBackClick: async () => {
      try {
        const nextState = { ...this.state }
        nextState.depth.pop()
        const prevNodeId = nextState.depth.length === 0 ? null : nextState.depth[nextState.depth.length-1].id
        if(prevNodeId === null) {
          const rootNodes = await request()
          this.setState({
            ...nextState,
            isRoot: true,
            nodes: rootNodes
          })
        } else {
          const prevNodes = await request(prevNodeId)
          this.setState({
            ...nextNodes,
            isRoot: false,
            nodes: prevNodes
          })
        }
      } catch (e) {
        throw "backClick is wrong"
      }
    }
  })
  this.setState = (nextState) => {
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