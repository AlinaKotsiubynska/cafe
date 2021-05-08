import cafe from './classCafe.js';
import menuTmp from '../hbs/menu-form.hbs';
import preparingListTmp from '../hbs/preparingList.hbs';
import workersListModal from '../hbs/workersListModal.hbs';
import { getWorkers, updateWorker } from './serviceApi.js';

export class ClassRender {
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
  };

  addRefWithId = (refName, tag, id) => {
    ClassRender.refs[refName] = document.createElement(tag);
    ClassRender.refs[refName].setAttribute('id', id);
  };

  get refs() {
    return ClassRender.refs;
  }

  renderMarkup = (markup, node) => {
    node.innerHTML = markup;
  };

  renderWorkersList = workersList => {
    const markup = workersListModal(workersList);
    this.addRefWithId('list', 'ul', 'workers-list');
    const list = this.refs.list;
    this.refs.body.append(list);
    list.innerHTML = markup;
  };

  upgradeWorkerList = workersList => {
    const markup = workersListModal(workersList);
    this.refs.list.innerHTML = markup;
  };

  handleInputChecked = e => {
    const { name, value, checked } = e.target;
    const { list } = this.refs;
    const checkedItem = list.querySelectorAll('input')[+value - 1];
    updateWorker(Number(value), { isPresent: checked }).then(() =>
      checkedItem.setAttribute('checked', ''),
    );
  };
}

const render = new ClassRender();

export default render;

// render.renderOpenMenuBtn();
