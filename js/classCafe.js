import workers from "./db.workers.js";
import tables from "./db.tables.js";
import menu from "./db.menu.js";

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
    this.tables.forEach((table) => {
      if (currentWorker >= workerCount) {
        currentWorker = 0;
      }
      table.service = presentWorkers[currentWorker].name;
      presentWorkers[currentWorker].tables.push({ id: table.table });
      currentWorker += 1;
    });
  }
  
  findTable(currentTable) {
    return this.tables.find(({ table }) => table === currentTable)
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
    if (table.order[dishId] < 1) return delete table.order[dishId]
  }
  
  removeOrder(currentTable) {
    const table = this.findTable(currentTable);
    if (!table.order) return;
    return delete table.order
  }

  setOrder(tableNum) {
    const table = this.findTable(tableNum);
    const { order } = table;
    console.log(order);
    if (!order) return
    table.preparing = Object.entries(order).map(([name, num]) => {
      const dish = this.menu.find(({ id }) => id === name);
      return `${dish.name} - ${num}`
    });
  }
}



const cafe = new Cafe({ workers, menu, tables });
console.log(cafe.setupTables());
console.log(cafe.tables);
console.table(cafe.presentWorkers);
cafe.addOrder(7, "espresso", 5);
cafe.addOrder(7, "napoleon", 5);
cafe.addOrder(7, "napoleon", 10);
cafe.addOrder(7, "espresso", 5);
// cafe.removeDish(7, "espresso", 100)
// cafe.removeOrder(7)
cafe.setOrder(7)
console.log(cafe.tables[6]);

export default cafe;