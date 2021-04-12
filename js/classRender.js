import cafe from './classCafe.js';
console.log(cafe);

class ClassRender {
  static refs = {
    body: document.querySelector('body')
  }

  renderMenuList = (menu) => {
    const list = document.createElement('ul')
    
    ClassRender.refs.body.insertAdjacentElement('afterbegin', list);
   
    menu.forEach(({name, id}) => {
      const item = `
      <li id="${id}">
      <p>${name}</p>
      <input type="text" value="1"/>
      <button type="button">Add</button>
    </li>
    `
    list.insertAdjacentHTML('beforeend', item);
    })


    list.addEventListener('click', evt => {
      if (evt.target.nodeName !== "BUTTON") {
        return;
      }
      
      const liRef = evt.target.parentNode;

      const input = liRef.querySelector('input');
      
      const id = liRef.id;
      const value = Number(input.value);

      cafe.addOrder(5, id, value);
      console.log(cafe.tables[4].order);
   })
  }
}

const render = new ClassRender();
console.log(render);

render.renderMenuList(cafe.menu)

