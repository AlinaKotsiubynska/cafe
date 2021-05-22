import Render from './classRenderUpdated';
import { getMenu } from './serviceApi';
import menuListTmp from '../hbs/menuList.hbs';
import cafe from './classCafe';

const renderApi = new Render();

export default class User {
  #usersStatus = {
    VISITOR: 'visitor',
    SERVICE: 'service',
    COOK: 'cook',
    ADMIN: 'admin',
  };

  get usersStatus() {
    return this.#usersStatus;
  }

  constructor({ status }) {
    this.status = status;
    this.renderApi = new Render(status);
  }

  openMenuList = status => {
    const { refs, createMarkupWithTmp, addElementWithMarkup } = this.renderApi;
    if (!status) {
      getMenu().then(data => {
        const menuListMarkup = createMarkupWithTmp(menuListTmp, {items: data});
        
        addElementWithMarkup(refs.visitorPanel, 'afterbegin', menuListMarkup);
      });
    }
  };
}

class ServiceUser extends User {
  constructor({ password, login, ...dataUser }) {
    super(dataUser);
    this.login = login;
    this.password = password;
  }

  //   openPAnel = () => this.renderApi.
}
