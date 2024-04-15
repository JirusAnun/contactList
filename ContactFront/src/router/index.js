import { createRouter, createWebHistory } from "vue-router";
import Contact from "../views/Contact.vue";
import Login from "../views/Login.vue";
import AddContact from '../views/addContact.vue'
import EditContact from '../views/editContact.vue'

const routerHistory = createWebHistory();

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/contact", name: "Contact", component: Contact, meta: { requiresAuth: true }},
  { path: "/login", name: "Login", component: Login },
  { path: '/addContact', name: "AddContact", component: AddContact, meta: { requiresAuth: true }},
  { path: '/editContact/:contactID', name: "EditContact", component: EditContact, meta: { requiresAuth: true }}
];

const router = createRouter({
  history: routerHistory,
  routes,
});

const isAuthenticated = () => localStorage.getItem('isAuthenticated') === "true";

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !isAuthenticated()) {
    next('login');
  } else if (!requiresAuth && isAuthenticated()) {
    next('contact');
  } else {
    next();
  }
})

export default router;