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
}
  // setupTables() {
  //   this.getPresentWorkers();
  //   let k = 0;  // 27-35 прописівает логику распределения столов среди официантов
  //   this.tables = this.tables.map((table, i) => {
  //     if (
  //       i >= this.presentWorkers.length - 1 &&
  //       i / (k+1) >= this.presentWorkers.length
  //     ) {
  //       k++;
  //     }
  //     const index = i - k * this.presentWorkers.length;
  //     table.service = this.presentWorkers[index].name; // здобавляет закрепленного официанта this.presentWorkers[index] в объект стола[i]
  //     this.presentWorkers[index].tables.push({ id: table.table }); // добавляет стол в свойство tables официанта 
  //     return table;
  //   });
    //  метод распределяет столики между присутствующими официантами
    //  добавляяет официантам в столики, которые за ними закреплены
    //  и добавляет столику оффицианта, который его обслуживает


{
  workers,
  tables,
  menu
}

// const { t, m, w } = setObj
const cafe = new Cafe({ workers, menu, tables });
console.log(cafe.setupTables());
console.log(cafe.tables);
console.table(cafe.presentWorkers);

