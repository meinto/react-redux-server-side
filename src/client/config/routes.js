import Layout from '../components/Layout'
import DummyPage from './../components/dummy/DummyPage'
import Counter from './../containers/dummy/DummyCounterContainer'
import NotFound from '../components/NotFound'
import Page from '../components/Page'

import { PAGE_TYPES, setPageType } from '../modules/seo/pageType'
import { checkIfPageExists$ } from '../modules/page/page'

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
  NOT_FOUND: {
    path: '/404',
    url: () => PATH.NOT_FOUND.path,
  },
  WILDCARD: {
    path: '/wildcard',
    url: () => PATH.WILDCARD.path,
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
      {
        path: PATH.NOT_FOUND.path,
        exact: true,
        component: NotFound,
      },
      {
        path: PATH.WILDCARD.path,
        component: Page,
        exact: true,
        epics: () => [
          checkIfPageExists$(),
          setPageType(PAGE_TYPES.PAGE),
        ],
      },
    ],
  },
]
