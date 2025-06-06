import { RootRoute, Route, Router } from '@tanstack/react-router';
import App from './App';

const rootRoute = new RootRoute();

const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/user-table-task/',
  component: App,
});

export const router = new Router({
  routeTree: rootRoute.addChildren([homeRoute]),
});
