import workers from './db.workers.js';
import tables from './db.tables.js';
import menu from './db.menu.js';

class Cafe {
  constructor({ workers, tables, menu }) {
    this.workers = workers;
    this.tables = tables;
    this.menu = menu;
  }

  addNewOfficiant(name) {
    const newWorker = {
      name,
      isPresent: false,
      tables: [],
      tips: 0,
    };
    this.workers = [...this.workers, newWorker];
  }
  getPresentWorkers() {
    this.presentWorkers = this.workers.filter(({ isPresent }) => isPresent);
  }

  setupTables() {
    this.getPresentWorkers();
    const { presentWorkers } = this;
    const workerCount = presentWorkers.length;
    let currentWorker = 0;
    this.tables.forEach(table => {
      if (currentWorker >= workerCount) {
        currentWorker = 0;
      }
      table.service = presentWorkers[currentWorker].name;
      presentWorkers[currentWorker].tables.push({ id: table.table });
      currentWorker += 1;
    });
  }

  findTable(currentTable) {
    return this.tables.find(({ table }) => table === Number(currentTable));
  }
  addOrder(currentTable, dishId, num) {
    const table = this.findTable(currentTable);
    if (!table.order) {
      table.order = { [dishId]: num };
      return;
    }
    if (!table.order[dishId]) {
      table.order[dishId] = num;
      return;
    }
    table.order[dishId] += num;
  }

  removeDish(currentTable, dishId, num) {
    const table = this.findTable(currentTable);
    if (!table.order) return;
    table.order[dishId] -= num;
    if (table.order[dishId] < 1) return delete table.order[dishId];
  }

  removeOrder(currentTable) {
    const table = this.findTable(currentTable);
    if (!table.order) return;
    return delete table.order;
  }

  setOrder(tableNum) {
    const table = this.findTable(tableNum);
    const { order } = table;
    if (!order) return;
    table.preparing = Object.entries(order).map(([name, num]) => {
      const dish = this.menu.find(({ id }) => id === name);
      return `${dish.name} - ${num}`;
    });
    table.isPrep = false;
  }
}

const cafe = new Cafe({ workers, menu, tables });

export default cafe;
