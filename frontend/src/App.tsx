import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./layout/Layout"
import { Suspense } from "react"
import routes from "./routes"
import {Loader} from 'lucide-react'

const App = () => {
  const routing = routes.map((route) => {
    return (
      route.element && {
        path: route.path,
        element: <route.element />,
        exact: route.exact,
        name: route.name
      }
    )
  })
  const router = createBrowserRouter([
    {
      path:'/',
      element: <Layout />,
      children: routing || [],
    }
  ])
  return (
    <Suspense fallback={<Loader className="size-10 animate-spin" />}>
      <RouterProvider  router={router} />
    </Suspense>
    
  )
}

export default App