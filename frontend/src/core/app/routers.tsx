// ===================
// © AngelaMos | 2025
// routers.tsx
// ===================

import { createBrowserRouter, type RouteObject } from 'react-router-dom'

const routes: RouteObject[] = [
  {
    path: '/',
    lazy: () => import('@/pages/grade'),
  },
  {
    path: '*',
    lazy: () => import('@/pages/grade'),
  },
]

export const router = createBrowserRouter(routes)
