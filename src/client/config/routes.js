import Layout from '../components/Layout'
import DummyPage from './../components/dummy/DummyPage'
import Counter from './../containers/dummy/DummyCounterContainer'


export const PATH = {
  HOME: {
    path: '/',
    url: () => PATH.HOME.path,
  },
  DUMMY: {
    path: '/page/:pageId',
    url: ({ dataId }) => PATH.DUMMY.path
      .replace(':dataId', dataId),
  },
}


export const routes = [
  {
    component: Layout,
    routes: [
      {
        path: PATH.HOME.path,
        component: Counter,
        exact: true,
      },
      {
        path: PATH.DUMMY.path,
        component: DummyPage,
        // epics: ({ pageId }) => {
        //   return [
        //     loadData$(pageId),
        //   ]
        // },
      },
    ],
  },
]
