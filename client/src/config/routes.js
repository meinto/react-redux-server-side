import AppRoot from './../components/AppRoot'
import DummyPage from './../components/dummy/DummyPage'


export const routes = [
  {
    component: AppRoot,
    routes: [
      {
        path: '/page/:pageId',
        component: DummyPage,
      },
    ],
  },
]
