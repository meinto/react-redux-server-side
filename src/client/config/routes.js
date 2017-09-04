import App from './../App'
import DummyPage from './../components/dummy/DummyPage'
import Counter from './../containers/dummy/DummyCounterContainer'


export const routes = [
  {
    component: App,
    routes: [
      {
        path: '/',
        component: Counter,
        exact: true,
      },
      {
        path: '/page/:pageId',
        component: DummyPage,
      },
    ],
  },
]
