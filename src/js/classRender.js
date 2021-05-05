import cafe from './classCafe.js';
import menuTmp from '../hbs/menu-form.hbs';
import preparingListTmp from '../hbs/preparingList.hbs';

class ClassRender {
  static refs = {
    body: document.querySelector('body'),
    form: document.createElement('form'),
    prepList: document.createElement('ul'),
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
    const tableId = evt.currentTarget.id.split('-').pop();
    const currentTable = cafe.findTable(Number(tableId));
    cafe.setOrder(Number(tableId));
    this.renderPreparedList({ tableNum: tableId, isPrep: currentTable.isPrep });
    evt.currentTarget.remove();
  };

  renderPreparedList = ({ tableNum, isPrep }) => {
    const prepListMarkUp = preparingListTmp({
      tableNum,
      isPrep: isPrep ? 'Уже готово' : 'Готовится',
    });
    let prepList = document.getElementById('prep-list');
    if (!prepList) {
      prepList = ClassRender.refs.prepList;
      prepList.setAttribute('id', 'prep-list');
      prepList.setAttribute('style', 'position: absolute; top: 0; left: 0');
      ClassRender.refs.body.insertAdjacentElement('afterbegin', prepList);
    }
    const isStart = prepList.querySelector(`[data-id="${tableNum}"]`)
      ? false
      : true;

    if (isStart) {
      prepList.insertAdjacentHTML('afterbegin', prepListMarkUp);
    }
    // setTimeout(() => {
    //   const item = prepList.querySelector(`[data-id="${tableNum}"]`);
    //   if (item) {
    //     cafe.removeOrder(Number(tableNum));
    //     item.children[1].textContent = !isPrep ? 'Уже готово' : 'Готовится';
    //     setTimeout(() => {
    //       item.remove();
    //     }, 2000);
    //   }
    // }, 2000);
  };
}

const render = new ClassRender();

render.renderOpenMenuBtn();
