import { RouteRecordRaw } from 'vue-router';

export function mapMenusToRoutes(userMenu: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = [];
  const allRoutes: RouteRecordRaw[] = [];
  const routeFils = require.context('../router/main', true, /\.ts/);
  routeFils.keys().forEach((key) => {
    const route = require('../router/main' + key.split('.')[1]);
    allRoutes.push(route.default);
  });
  const _recurstGetRoute = (menus: any[]) => {
    menus.forEach((menu) => {
      if (menu.type === 2) {
        const route = allRoutes.find((ele) => ele.path === menu.url);
        if (route) routes.push(route);
      } else {
        menu.children && _recurstGetRoute(menu.children);
      }
    });
  };

  _recurstGetRoute(userMenu);
  return routes;
}
