import './styles.css';
import './js/classRender.js';
import render, { ClassRender } from './js/classRender.js';
import { getWorkers } from './js/serviceApi.js';


getWorkers().then(workers => {
  render.renderWorkersList(workers);
  render.refs.list.addEventListener('change', render.handleInputChecked);
});