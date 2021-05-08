import btn from '../hbs/buttonTmp.hbs'
import workersList from '../hbs/workersListModal.hbs'
import tablesList from '../hbs/tablesTmp.hbs'
import render from './classRender.js'
import { getWorkers, updateWorkers, getTables } from './serviceApi'
import { renderMenuList } from './renderMenuList.js'

const adminPanel = document.createElement('section')
const getData = new Promise(async (resolve) => {
  const workers = await getWorkers()
  const tables = await getTables()
  resolve({workers, tables})
})

const handlerOpenAdmin = (cafe) => getData.then(({ workers, tables }) => {
  const workersListEl = workersList({id: 'admin-workers', workers})
  const tablesListEl = tablesList({ id: 'admin-tables', tables })
  adminPanel.insertAdjacentHTML('afterbegin', workersListEl+tablesListEl)
  render.refs.body.append(adminPanel)
  const list = document.getElementById('admin-tables')
  list.addEventListener('click', evt => {
    if (evt.target.nodeName !== 'BUTTON') return;
    console.log(evt.target);
      if (evt.target.dataset.order) {
        renderMenuList(evt.target.dataset.order, cafe);
      }
    })
})

export const renderAdminPanelOpenBtn = (cafe) => {
  const openBtn = btn({ type: 'button', title: 'Open Admin', class: 'admin-open' })
  render.refs.body.insertAdjacentHTML('afterbegin', openBtn)
  document.querySelector('.admin-open').addEventListener('click', () => handlerOpenAdmin(cafe))
  }