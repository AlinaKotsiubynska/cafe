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
