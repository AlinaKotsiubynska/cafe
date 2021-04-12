import cafe from './classCafe.js';
console.log(cafe);

class ClassRender {
  static refs = {
    body: document.querySelector('body')
  }

  renderMenuList = (menu) => {
    const list = document.createElement('ul')
    
    ClassRender.refs.body.insertAdjacentElement('afterbegin', list);
   
    menu.forEach(({name}) => {
      const item = `
      <li>
      <p>${name}</p>
      <input type="text" value="1"/>
      <button type="button">Add</button>
    </li>
    `
    list.insertAdjacentHTML('beforeend', item);
    })
  
   }
}

const render = new ClassRender();
console.log(render);

render.renderMenuList(cafe.menu)
