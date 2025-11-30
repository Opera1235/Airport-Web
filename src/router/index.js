import { createRouter, createWebHistory } from 'vue-router';
import FlightListView from '../views/FlightListView.vue';

const routes = [
  {
    path: '/',
    name: 'flights',
    component: FlightListView,
  },
];

const router = createRouter({
  history: createWebHistory('/Airport-Web/'),
  routes,
});

export default router;

