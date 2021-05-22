import menuList from '../hbs/menuList.hbs';
import menuForms from '../hbs/menu-forms.hbs';
import buttonTmp from '../hbs/buttonTmp.hbs';
import tablesTmp from '../hbs/tablesTmp.hbs';

import { getMenu, getUser } from './serviceApi';

export default [
  {
    status: 'visitor',
    tmps: [
      {
        tmp: menuList,
        data: null,
        requestMethod: getMenu,
      },
    ],
  },
  {
    status: 'service',
    tmps: [
      {
        tmp: buttonTmp,
        data: {
          type: 'button',
          class: '',
          title: 'Check Present',
        },
      },
      {
        tmp: tablesTmp,
        data: null,
        requestMethod: getUser,
      },

      //   {
      //     tmp: menuForms,
      //     data: null,
      //     requestMethod: getMenu,
      //   },
    ],
  },
];
