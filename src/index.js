import './styles.css';
import './js/classRender.js';
import render, { ClassRender } from './js/classRender.js';
import { getMenu, getWorkers, getTables } from './js/serviceApi.js';
import './js/adminPanel.js';
import Cafe from './js/classCafe.js'
import {renderAdminPanelOpenBtn} from './js/adminPanel.js'

async function mainRender () {
  const menu = await getMenu()
  const workers = await getWorkers()
  const tables = await getTables()
  const cafe = new Cafe({ workers, menu, tables });
  renderAdminPanelOpenBtn(cafe)
}

mainRender()


// getWorkers().then(workers => {
//   render.renderWorkersList(workers);
//   render.refs.list.addEventListener('change', render.handleInputChecked);
// });