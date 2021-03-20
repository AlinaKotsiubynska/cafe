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
    //  метод возвращает массив оффициантов присутствующих на смене
  }
  setupTables() {
    this.getPresentWorkers();
    let k = 0;
    this.tables = this.tables.map((table, i) => {
      if (
        i >= this.presentWorkers.length - 1 &&
        i / (k+1) >= this.presentWorkers.length
      ) {
        k++;
      }
      const index = i - k * this.presentWorkers.length;
      table.service = this.presentWorkers[index].name; // добавляет официанта к столику
      this.presentWorkers[index].tables.push({ id: table.table });

      console.log(index, k);

      return table;
    });
    //  метод распределяет столики между присутствующими официантами
    //  добавляяет официантам в столики, которые за ними закреплены
    //  и добавляет столику оффицианта, который его обслуживает
  }
}
const cafe = new Cafe({ workers, menu, tables });
console.log(cafe.setupTables());
console.log(cafe.tables);
console.table(cafe.presentWorkers);
