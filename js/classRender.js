import cafe from './classCafe.js';
console.log(cafe);

class ClassRender {
  static refs = {
    body: document.querySelector('body'),
    form: document.createElement('form'),
    list: document.createElement('ul'),
    // openMenuBtn:  document.createElement('button'),
  }

  constructor() {
    this.tableNum = 1;
  }

  renderOpenMenuBtn() {
    const list = document.createElement('ul');
    cafe.tables.forEach(({ table }) => {
      const button = `<li><button type="button">${table}</button></li>`
      list.insertAdjacentHTML('beforeend', button)
    })
    ClassRender.refs.body.insertAdjacentElement('afterbegin', list)

    list.addEventListener('click', (evt) => {
      if (evt.target.nodeName !== "BUTTON") return;
      this.tableNum = Number(evt.target.textContent)
      this.renderMenuList()
    })
  }
  renderMenuList = () => {
    const submitBtn = '<button type="submit"> Отправить заказ </button>';
    const { list, form, body } = ClassRender.refs;

    body.insertAdjacentElement('afterbegin', form);
    form.insertAdjacentElement('afterbegin', list)
    form.insertAdjacentHTML('beforeend', submitBtn)

    this.makelistMarkup(cafe.menu)
    form.addEventListener('submit', this.handlerSubmitOrder)
  }
  makelistMarkup(menu) {
    const { list } = ClassRender.refs;
    menu.forEach(({name, id}) => {
    const item = `
    <li id="${id}">
    <p>${name}</p>
    <input type="text" value="1"/>
    <button type="button">Add</button>
  </li>
  `
  list.insertAdjacentHTML('beforeend', item);
  })
  
  list.addEventListener('click', this.handlerAddDish)
  }
  handlerAddDish = evt => {
    if (evt.target.nodeName !== "BUTTON") {
      return;
    }
    
    const liRef = evt.target.parentNode;
  
    const input = liRef.querySelector('input');
    
    const id = liRef.id;
    const value = Number(input.value);
  
    cafe.addOrder(this.tableNum, id, value);
    console.log(cafe.tables[this.tableNum-1].order);
  }
  handlerSubmitOrder = evt => {
    evt.preventDefault()
    cafe.setOrder(this.tableNum)
    
    console.log(cafe.tables[this.tableNum-1]);
  }
}

const render = new ClassRender();
console.log(render);

// render.renderMenuList(cafe.menu)
render.renderOpenMenuBtn()

