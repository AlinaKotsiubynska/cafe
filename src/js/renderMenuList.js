import render from './classRender.js'
import menuTmp from '../hbs/menu-form.hbs'


const renderMenuList = (tableNum, cafe) => {
    const { body } = render.refs;

    const markupMenu = menuTmp({ items: cafe.menu, table: tableNum });
    body.insertAdjacentHTML('afterbegin', markupMenu);
    const form = document.getElementById(`table-${tableNum}`);
    const list = form.querySelector('ul');
    list.addEventListener('click', (e) => handlerAddDish(e, cafe, tableNum));
    form.addEventListener('submit', (e) => handlerSubmitOrder(e, cafe));
  };
  
 const handlerAddDish = (evt, cafe, tableNum) => {
    if (evt.target.nodeName !== 'BUTTON') {
      return;
    }

    const liRef = evt.target.parentNode;
    const input = liRef.querySelector('input');
    const id = liRef.id;
    const value = Number(input.value);
    cafe.addOrder(tableNum, id, value);
    console.log(cafe.tables[tableNum - 1].order);
  };

 const handlerSubmitOrder = (evt, cafe) => {
    evt.preventDefault();
    const tableId = evt.currentTarget.id.split('-').pop();
    const currentTable = cafe.findTable(Number(tableId));
    cafe.setOrder(Number(tableId));
    this.renderPreparedList({ tableNum: tableId, isPrep: currentTable.isPrep });
    evt.currentTarget.remove();
};
  
export { renderMenuList }