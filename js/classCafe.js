класс
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
    }
    this.workers = [...this.workers, newWorker]
  }
  getPresentWorkers() {
    this.presentWorkers = this.workers.filter(({ isPresent }) => isPresent)
    //  метод возвращает массив оффициантов присутствующих на смене
  }
  setupTables() {
    
    //  метод распределяет столики между присутствующими официантами
    //  добавляяет официантам в столики, которые за ними закреплены
    //  и добавляет столику оффицианта, который его обслуживает
  }
};