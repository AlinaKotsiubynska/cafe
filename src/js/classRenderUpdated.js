export default class Render {
  static refs = {
    body: document.body,
    adminPanel: document.createElement('section'),
    servicePanel: document.createElement('section'),
    cookPanel: document.createElement('section'),
    visitorPanel: document.createElement('section'),
  };

  get refs() {
    return Render.refs;
  }

  set refs({propName, node}){
    Render.refs[propName] = node;
  }

  constructor(status) {
    this.renderPanel(status);
  }

  renderPanel = status => {
    switch (status) {
      case 'admin':
        this.addPannelNodeWithId(this.refs.adminPanel, status + 'panel');
      case 'service':
        this.addPannelNodeWithId(this.refs.servicePanel, status + 'panel');
      case 'cook':
        this.addPannelNodeWithId(this.refs.cookPanel, status + 'panel');
      default:
        this.addPannelNodeWithId(this.refs.visitorPanel, 'visitor-panel');
    }
  };

  addPannelNodeWithId = (node, id) => {
    this.refs.body.append(node);
    node.id = id;
  };

  // addComponentToPannel = () => {
  //   const markup = this.createMarkupWithTmp();
  //   this.addElementsWithMarkup();
  // };

  createMarkupWithTmp = (tmpFunc, data) => (data ? tmpFunc(data) : tmpFunc());

  addElementWithMarkup = (parentNode, position, markup) => {
    parentNode.insertAdjacentHTML(position, markup);
  };

  addElementWithNode = (parentNode, position, childNode) => {
    parentNode.insertAdjacentElement(position, childNode);
  };

  clearElementContent = elementNode => {
    elementNode.innerHTML = '';
  };

  removeNode = (parentNode, childeNode) => parentNode.removeChild(childeNode);
}
