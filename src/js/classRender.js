import cafe from './classCafe.js';
import menuTmp from '../hbs/menu-form.hbs';
console.log(cafe);
console.log();

class ClassRender {
  static refs = {
    body: document.querySelector('body'),
    form: document.createElement('form'),
    list: document.createElement('ul'),
    // openMenuBtn:  document.createElement('button'),
  };

  constructor() {
    this.tableNum = 1;
  }

  renderOpenMenuBtn() {
    const list = document.createElement('ul');
    cafe.tables.forEach(({ table }) => {
      const button = `<li><button type="button">${table}</button></li>`;
      list.insertAdjacentHTML('beforeend', button);
    });
    ClassRender.refs.body.insertAdjacentElement('afterbegin', list);

    list.addEventListener('click', evt => {
      if (evt.target.nodeName !== 'BUTTON') return;
      this.tableNum = Number(evt.target.textContent);
      this.renderMenuList(evt.target.textContent);
    });
  }
  renderMenuList = tableNum => {
    const { body } = ClassRender.refs;

    const markupMenu = menuTmp({ items: cafe.menu, table: tableNum });

    body.insertAdjacentHTML('afterbegin', markupMenu);

    const form = document.getElementById(`table-${tableNum}`);

    const list = form.querySelector('ul');

    list.addEventListener('click', this.handlerAddDish);

    form.addEventListener('submit', this.handlerSubmitOrder);
  };

  handlerAddDish = evt => {
    if (evt.target.nodeName !== 'BUTTON') {
      return;
    }

    const liRef = evt.target.parentNode;

    const input = liRef.querySelector('input');

    const id = liRef.id;
    const value = Number(input.value);

    cafe.addOrder(this.tableNum, id, value);
    console.log(cafe.tables[this.tableNum - 1].order);
  };

  handlerSubmitOrder = evt => {
    evt.preventDefault();

    cafe.setOrder(this.tableNum);

    console.log(cafe.tables[this.tableNum - 1]);
    evt.currentTarget.remove();
  };
}

const render = new ClassRender();
console.log(render);

// render.renderMenuList(cafe.menu)
render.renderOpenMenuBtn();
