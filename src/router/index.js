import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login'
import Register from '../views/Register'
import Main from '../views/Main'
import Detail from '../views/Detail'
import Skill from '../views/Skill'
import Condition from '../views/Condition'

import Order from '../views/Order'
import Success from '../views/Success'
import Failure from '../views/Failure'
import Admin from "@/views/Admin";
import Allgoods from "@/views/Allgoods";
import Alluser from "@/views/Alluser";
import AccountStat from "@/views/AccountStat";
import Screen from "@/views/Screen";
import Update from "@/views/Update";
import Detect from "../views/Detect";
import AfterOrder from "../views/AfterOrder";
import Person from "../views/Person";
import PersonPage from "../views/PersonPage";
import PersonStat from "../views/PersonStat";
import PersonUpdate from "../views/PersonUpdate";

const routes = [
  {
    path: '/Person',
    name: 'Person',
    component: Person,
    children: [
      {
        path: 'AfterOrder',
        name: 'AfterOrder',
        component: AfterOrder
      },
      {
        path: 'PersonPage',
        name: 'PersonPage',
        component: PersonPage
      },
      {
        path: 'PersonStat',
        name: 'Personstat',
        component: PersonStat
      },
      {
        path: 'PersonUpdate',
        name:'PersonUpdate',
        component: PersonUpdate
      }
    ]
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home
  },
  {
    path: '/Order',
    name: 'Order',
    component: Order
  }, {
    path: '/Success',
    name: 'Success',
    component: Success
  },
  {
    path: '/Failure',
    name: 'Failure',
    component: Failure
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register
  }, {
    path: '/Main',
    name: 'Main',
    component: Main
  }, {
    path: '/Detail',
    name: 'Detail',
    component: Detail,

  },
  {
    path: '/Skill',
    name: 'Skill',
    component: Skill
  },
  {
    path: '/Condition',
    name: 'Condition',
    component: Condition
  },
  {
    path: '/Admin',
    name: 'Admin',
    component: Admin,
    children:[
      {
        path: 'Allgoods',
        name: 'Allgoods',
        component: Allgoods
      },
      {
        path: 'Alluser',
        name: 'Alluser',
        component: Alluser
      },
      {
        path: 'Screen',
        name: 'Screen',
        component:Screen
      },
      {
        path:'Update',
        name:'Update',
        component:Update
      },
      {
        path:'Account',
        name:'Account',
        component:AccountStat
      }
    ]
  },
  {
    path: '/Detect',
    name: 'Detect',
    component: Detect
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
