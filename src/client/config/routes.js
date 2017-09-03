import App from './../App'
import DummyPage from './../components/dummy/DummyPage'
import Home from './../components/dummy/DummyHome'


export const routes = [
  {
    component: App,
    routes: [
      {
        path: '/',
        component: Home,
        exact: true,
      },
      {
        path: '/page/:pageId',
        component: DummyPage,
      },
    ],
  },
]
