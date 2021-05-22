import Render from '../classRenderUpdated';
import authForm from '../../hbs/authForm.hbs';
import { getUser } from '../serviceApi';
import User from '../classUser';

const render = new Render();

const loginUser = e => {
  e.preventDefault();
  const inputs = e.currentTarget.querySelectorAll('input');
  const data = {};
  inputs.forEach(({ name, value }) => {
    data[name] = value;
  });
  getUser(data.password).then(data => {
    const { refs, removeNode } = render;
    const user = new User({ status: data.status });
    removeNode(refs.body, refs.authForm);
    user.openMenuList(user.status);
  });
};

export default function renderAuthForm() {
  const markup = render.createMarkupWithTmp(authForm);
  render.addElementWithMarkup(render.refs.body, 'afterbegin', markup);
  render.refs = {
    propName: "authForm",
    node: document.getElementById('auth-form'),
  };
  render.refs.authForm.addEventListener('submit', loginUser);
}
