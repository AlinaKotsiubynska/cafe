класс
const cafe = {
  oficiants: [
    {
      name: "Ann",
      isPresent: false,
      tables: [{ id: 1, id: 3, id: 9 }],
      tips: [],
    },
  ],
  tables: [
    {
      id: 1,
      service: "",
    },
  ],
  menu: [
    {
      id: "capuchino",
      name: "Капучино",
      price: 45,
    },
    {
      id: "late",
      name: "Лате",
      price: 40,
    },
    {
      id: "napoleon",
      name: "Торт Наполеон",
      price: 75,
    },
    {
      id: "water-0.5",
      name: "Вода без газа 0,5",
      price: 20,
    },
    {
      id: "zavarnoe",
      name: "Пирожное Заварное",
      price: 38,
    },
    {
      id: "espresso",
      name: "Еспрессо",
      price: 30,
    },
    {
      id: "marcepan",
      name: "Марцепан",
      price: 45,
    },
    {
      id: "fresh-orang-0.3",
      name: "Фреш Апельсиновый 0,3",
      price: 45,
    },
  ],
  orders: [],
  addNewOfficiant(name) {
    //  метод добавляет нового официанта
  },
  getPresentWorkers() {
    //  метод возвращает массив оффициантов присутствующих на смене
  },
  setupTables() {
    //  метод распределяет столики между присутствующими официантами
    //  добавляяет официантам в столики, которые за ними закреплены
    //  и добавляет столику оффицианта, который его обслуживает
  },
};